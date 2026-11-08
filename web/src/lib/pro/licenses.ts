import { createHash, randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

export type Plan = "pro" | "team";
export type LicenseStatus = "active" | "canceled" | "refunded" | "past_due";

export interface License {
  id: number;
  email: string;
  plan: Plan;
  seats: number;
  status: LicenseStatus;
  keyPrefix: string;
  providerId: string | null;
  createdAt: string;
  paidUntil: string | null;
}

const dataDir = process.env.PRO_DATA_DIR ?? path.join(process.cwd(), ".pro-data");

let db: DatabaseSync | null = null;

function open(): DatabaseSync {
  if (db) return db;
  fs.mkdirSync(dataDir, { recursive: true });
  const conn = new DatabaseSync(path.join(dataDir, "licenses.db"));
  conn.exec(`
    CREATE TABLE IF NOT EXISTS license (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      plan TEXT NOT NULL,
      seats INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'active',
      key_hash TEXT NOT NULL UNIQUE,
      key_prefix TEXT NOT NULL,
      provider_id TEXT UNIQUE,
      created_at TEXT NOT NULL,
      paid_until TEXT
    );
    CREATE TABLE IF NOT EXISTS usage (
      license_id INTEGER NOT NULL,
      day TEXT NOT NULL,
      requests INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (license_id, day)
    );
    CREATE TABLE IF NOT EXISTS seen_ip (
      license_id INTEGER NOT NULL,
      day TEXT NOT NULL,
      ip_hash TEXT NOT NULL,
      PRIMARY KEY (license_id, day, ip_hash)
    );
    CREATE TABLE IF NOT EXISTS webhook_event (
      id TEXT PRIMARY KEY,
      received_at TEXT NOT NULL
    );
  `);
  db = conn;
  return conn;
}

export function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

function newKey(): string {
  return `hbp_${randomBytes(24).toString("base64url")}`;
}

function row(r: Record<string, unknown>): License {
  return {
    id: r.id as number,
    email: r.email as string,
    plan: r.plan as Plan,
    seats: r.seats as number,
    status: r.status as LicenseStatus,
    keyPrefix: r.key_prefix as string,
    providerId: (r.provider_id as string | null) ?? null,
    createdAt: r.created_at as string,
    paidUntil: (r.paid_until as string | null) ?? null,
  };
}

export function createLicense(input: {
  email: string;
  plan: Plan;
  seats?: number;
  providerId?: string | null;
  paidUntil?: string | null;
}): { license: License; key: string } {
  const conn = open();
  const key = newKey();
  const seats = input.seats ?? (input.plan === "team" ? 10 : 1);
  conn
    .prepare(
      `INSERT INTO license (email, plan, seats, status, key_hash, key_prefix, provider_id, created_at, paid_until)
       VALUES (?, ?, ?, 'active', ?, ?, ?, ?, ?)`,
    )
    .run(
      input.email.toLowerCase(),
      input.plan,
      seats,
      hashKey(key),
      key.slice(0, 10),
      input.providerId ?? null,
      new Date().toISOString(),
      input.paidUntil ?? null,
    );
  const created = conn.prepare("SELECT * FROM license WHERE key_hash = ?").get(hashKey(key)) as Record<string, unknown>;
  return { license: row(created), key };
}

export function findByKey(key: string): License | null {
  const r = open().prepare("SELECT * FROM license WHERE key_hash = ?").get(hashKey(key));
  return r ? row(r as Record<string, unknown>) : null;
}

export function findByProviderId(providerId: string): License | null {
  const r = open().prepare("SELECT * FROM license WHERE provider_id = ?").get(providerId);
  return r ? row(r as Record<string, unknown>) : null;
}

export function findByEmail(email: string): License[] {
  return open()
    .prepare("SELECT * FROM license WHERE email = ? ORDER BY id DESC")
    .all(email.toLowerCase())
    .map((r) => row(r as Record<string, unknown>));
}

export function listLicenses(): License[] {
  return open()
    .prepare("SELECT * FROM license ORDER BY id DESC")
    .all()
    .map((r) => row(r as Record<string, unknown>));
}

export function setStatus(id: number, status: LicenseStatus, paidUntil?: string | null) {
  const conn = open();
  if (paidUntil === undefined) {
    conn.prepare("UPDATE license SET status = ? WHERE id = ?").run(status, id);
  } else {
    conn.prepare("UPDATE license SET status = ?, paid_until = ? WHERE id = ?").run(status, paidUntil, id);
  }
}

export function rotateKey(id: number): string {
  const key = newKey();
  open()
    .prepare("UPDATE license SET key_hash = ?, key_prefix = ? WHERE id = ?")
    .run(hashKey(key), key.slice(0, 10), id);
  return key;
}

export function isEntitled(license: License, now = new Date()): boolean {
  if (license.status === "active" || license.status === "past_due") {
    if (!license.paidUntil) return license.status === "active";
    return new Date(license.paidUntil).getTime() > now.getTime();
  }
  if (license.status === "canceled" && license.paidUntil) {
    return new Date(license.paidUntil).getTime() > now.getTime();
  }
  return false;
}

export function recordUse(licenseId: number, ip: string): { requestsToday: number; ipsToday: number } {
  const conn = open();
  const day = new Date().toISOString().slice(0, 10);
  conn
    .prepare(
      `INSERT INTO usage (license_id, day, requests) VALUES (?, ?, 1)
       ON CONFLICT(license_id, day) DO UPDATE SET requests = requests + 1`,
    )
    .run(licenseId, day);
  conn
    .prepare("INSERT OR IGNORE INTO seen_ip (license_id, day, ip_hash) VALUES (?, ?, ?)")
    .run(licenseId, day, createHash("sha256").update(ip).digest("hex").slice(0, 16));
  const u = conn.prepare("SELECT requests FROM usage WHERE license_id = ? AND day = ?").get(licenseId, day) as {
    requests: number;
  };
  const i = conn.prepare("SELECT COUNT(*) AS n FROM seen_ip WHERE license_id = ? AND day = ?").get(licenseId, day) as {
    n: number;
  };
  conn.prepare("DELETE FROM seen_ip WHERE day < date('now', '-30 day')").run();
  return { requestsToday: u.requests, ipsToday: i.n };
}

export function markEventSeen(id: string): boolean {
  const res = open()
    .prepare("INSERT OR IGNORE INTO webhook_event (id, received_at) VALUES (?, ?)")
    .run(id, new Date().toISOString());
  return Number(res.changes) > 0;
}
