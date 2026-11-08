import { DatabaseSync } from "node:sqlite";
import { createHash, randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const dir = process.env.PRO_DATA_DIR ?? path.join(process.cwd(), ".pro-data");
fs.mkdirSync(dir, { recursive: true });
const db = new DatabaseSync(path.join(dir, "licenses.db"));
db.exec(`CREATE TABLE IF NOT EXISTS license (
  id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, plan TEXT NOT NULL, seats INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'active', key_hash TEXT NOT NULL UNIQUE, key_prefix TEXT NOT NULL,
  provider_id TEXT UNIQUE, created_at TEXT NOT NULL, paid_until TEXT)`);

const [cmd, ...args] = process.argv.slice(2);
const hash = (k) => createHash("sha256").update(k).digest("hex");

if (cmd === "issue") {
  const [email, plan = "pro", days = "365"] = args;
  if (!email) throw new Error("usage: issue <email> [pro|team] [days]");
  const key = `hbp_${randomBytes(24).toString("base64url")}`;
  const until = new Date(Date.now() + Number(days) * 86400000).toISOString();
  db.prepare(
    "INSERT INTO license (email, plan, seats, status, key_hash, key_prefix, created_at, paid_until) VALUES (?,?,?,?,?,?,?,?)",
  ).run(email.toLowerCase(), plan, plan === "team" ? 10 : 1, "active", hash(key), key.slice(0, 10), new Date().toISOString(), until);
  console.log(key);
} else if (cmd === "list") {
  for (const r of db.prepare("SELECT id,email,plan,seats,status,key_prefix,paid_until FROM license ORDER BY id").all()) {
    console.log(`${r.id}\t${r.email}\t${r.plan}\t${r.status}\t${r.key_prefix}…\t${r.paid_until ?? "-"}`);
  }
} else if (cmd === "revoke") {
  db.prepare("UPDATE license SET status='refunded' WHERE id=?").run(Number(args[0]));
  console.log("revoked");
} else if (cmd === "extend") {
  const until = new Date(Date.now() + Number(args[1] ?? 365) * 86400000).toISOString();
  db.prepare("UPDATE license SET status='active', paid_until=? WHERE id=?").run(until, Number(args[0]));
  console.log(until);
} else {
  console.log("commands: issue <email> [pro|team] [days] | list | revoke <id> | extend <id> [days]");
}
