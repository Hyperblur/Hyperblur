import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { effects, SITE_URL } from "../src/registry/meta.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src/registry/hyperblur");
const outDir = path.join(root, "public/r");
fs.mkdirSync(outDir, { recursive: true });

const items = [];
for (const meta of effects) {
  const file = path.join(srcDir, `${meta.slug}.tsx`);
  const content = fs.readFileSync(file, "utf8");
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: meta.slug,
    type: "registry:component",
    title: meta.title,
    description: meta.description,
    author: "Hyperblur <hello@hyperblur.dev>",
    dependencies: meta.dependencies ?? [],
    registryDependencies: [],
    categories: [meta.category, ...meta.tags],
    docs: `${SITE_URL}/effects/${meta.slug}`,
    files: [
      {
        path: `registry/hyperblur/${meta.slug}.tsx`,
        type: "registry:component",
        target: `components/hyperblur/${meta.slug}.tsx`,
        content,
      },
    ],
  };
  fs.writeFileSync(path.join(outDir, `${meta.slug}.json`), JSON.stringify(item, null, 2));
  items.push({
    name: meta.slug,
    type: "registry:component",
    title: meta.title,
    description: meta.description,
    categories: item.categories,
    files: [{ path: item.files[0].path, type: "registry:component", target: item.files[0].target }],
  });
}

const index = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "hyperblur",
  homepage: SITE_URL,
  items,
};
fs.writeFileSync(path.join(outDir, "registry.json"), JSON.stringify(index, null, 2));

const catalog = {
  name: "hyperblur",
  homepage: SITE_URL,
  generatedAt: new Date().toISOString(),
  items: effects.map((meta) => ({
    slug: meta.slug,
    component: meta.component,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    tags: meta.tags,
    props: meta.props,
    usage: meta.usage,
    dependencies: meta.dependencies ?? [],
    install: `npx shadcn@latest add ${SITE_URL}/r/${meta.slug}.json`,
    docs: `${SITE_URL}/effects/${meta.slug}`,
    file: `${SITE_URL}/r/${meta.slug}.json`,
  })),
};
fs.writeFileSync(path.join(outDir, "index.json"), JSON.stringify(catalog, null, 2));
console.log(`registry: ${items.length} items written to public/r/`);
