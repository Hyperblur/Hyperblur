import fs from "node:fs";
import path from "node:path";

const dir = process.env.PRO_REGISTRY_DIR ?? path.join(process.cwd(), ".pro-registry");

const safe = /^[a-z0-9][a-z0-9-]*$/;

export interface ProCatalogItem {
  slug: string;
  component: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  props: unknown[];
  usage: string;
  dependencies: string[];
}

export function proCatalog(): { name: string; items: ProCatalogItem[] } {
  const file = path.join(dir, "catalog.json");
  if (!fs.existsSync(file)) return { name: "hyperblur-pro", items: [] };
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function proItem(name: string): string | null {
  if (!safe.test(name) || name === "index" || name === "catalog") return null;
  const file = path.join(dir, `${name}.json`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}
