import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../src/registry/hyperblur/", import.meta.url).pathname;
const owners = new Map();

for (const file of readdirSync(dir).filter((f) => f.endsWith(".tsx"))) {
  const source = readFileSync(join(dir, file), "utf8");
  const tokens = new Set([
    ...[...source.matchAll(/(?<![-a-z0-9])hb-[a-z0-9-]+/g)].map((m) => m[0]),
    ...[...source.matchAll(/@keyframes\s+([A-Za-z0-9_-]+)/g)].map((m) => `@${m[1]}`),
  ]);
  for (const token of tokens) {
    const list = owners.get(token) ?? [];
    list.push(file);
    owners.set(token, list);
  }
}

const clashes = [...owners].filter(([, files]) => files.length > 1);
if (clashes.length) {
  for (const [token, files] of clashes) console.error(`${token}: ${files.join(", ")}`);
  console.error(`${clashes.length} CSS names are shared between components`);
  process.exit(1);
}
console.log(`CSS names are unique across ${readdirSync(dir).length} components`);
