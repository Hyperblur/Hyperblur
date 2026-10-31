import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { Catalog } from "../src/catalog.ts";
import { createServer } from "../src/server.ts";
import type { CommandRunner } from "../src/install.ts";
import { SITE, mockFetch, siteRoutes } from "./fixtures.ts";

function textOf(result: unknown): string {
  const content = (result as { content: { type: string; text?: string }[] }).content;
  return content.map((part) => part.text ?? "").join("\n");
}

describe("server", () => {
  let client: Client;
  let workdir: string;
  const runs: { command: string; args: string[]; cwd: string }[] = [];
  const runner: CommandRunner = async (command, args, options) => {
    runs.push({ command, args, cwd: options.cwd });
    return { exitCode: 0, signal: null, timedOut: false, output: "Created 1 file" };
  };

  before(async () => {
    workdir = await mkdtemp(path.join(tmpdir(), "hyperblur-mcp-"));
    const catalog = new Catalog({ siteUrl: SITE, fetch: mockFetch(siteRoutes()).fetch });
    const server = createServer({ catalog, runner });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    client = new Client({ name: "test", version: "0.0.0" });
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  });

  after(async () => {
    await client.close();
    await rm(workdir, { recursive: true, force: true });
  });

  it("lists the five tools, the catalog resource and the add_effect prompt", async () => {
    const { tools } = await client.listTools();
    assert.deepEqual(
      tools.map((tool) => tool.name).sort(),
      ["get_effect", "get_effect_source", "install_effect", "list_categories", "search_effects"],
    );
    const { resources } = await client.listResources();
    assert.equal(resources[0]?.uri, "hyperblur://catalog");
    const { prompts } = await client.listPrompts();
    assert.equal(prompts[0]?.name, "add_effect");
  });

  it("describes the whole catalog without a fixed category list", async () => {
    const { tools } = await client.listTools();
    const search = tools.find((tool) => tool.name === "search_effects");
    assert.ok(search);
    assert.match(search.description ?? "", /effects, components, micro interactions and page blocks/);
    const category = (search.inputSchema.properties as Record<string, { type?: string; enum?: unknown }>).category;
    assert.equal(category?.type, "string");
    assert.equal(category?.enum, undefined);
    const { resources } = await client.listResources();
    assert.match(resources[0]?.description ?? "", /components/);
    assert.match(resources[0]?.description ?? "", /blocks/);
    const { prompts } = await client.listPrompts();
    assert.match(prompts[0]?.description ?? "", /components/);
    assert.match(prompts[0]?.description ?? "", /blocks/);
  });

  it("search_effects returns a compact list", async () => {
    const result = await client.callTool({ name: "search_effects", arguments: { query: "glitch" } });
    const text = textOf(result);
    assert.match(text, /Found 3 Hyperblur effects for "glitch"/);
    assert.match(text, /\*\*Glitch Text\*\* `glitch-text` \(text\)/);
    assert.match(text, /npx shadcn@latest add http:\/\/localhost:3000\/r\/glitch-text\.json/);
  });

  it("search_effects accepts categories from the index and names them in the results", async () => {
    const micro = textOf(await client.callTool({ name: "search_effects", arguments: { category: "micro" } }));
    assert.match(micro, /Found 1 Hyperblur component for category micro:/);
    assert.match(micro, /\*\*Press Button\*\* `press-button` \(micro\)/);
    assert.match(micro, /Categories in the catalog: text, overlay, hover, motion, components, micro, blocks\./);
    const blocks = textOf(await client.callTool({ name: "search_effects", arguments: { category: "blocks" } }));
    assert.match(blocks, /Found 1 Hyperblur block for category blocks:/);
    assert.match(blocks, /`hero-banner`/);
    const overlay = textOf(await client.callTool({ name: "search_effects", arguments: { category: "overlay" } }));
    assert.match(overlay, /Found 2 Hyperblur effects for category overlay:/);
  });

  it("search_effects returns an error that lists the categories for an unknown one", async () => {
    const result = await client.callTool({ name: "search_effects", arguments: { category: "sparkles" } });
    assert.equal(result.isError, true);
    assert.equal(
      textOf(result),
      'Unknown category "sparkles". Available categories: text, overlay, hover, motion, components, micro, blocks.',
    );
  });

  it("search_effects reports no matches with the available categories", async () => {
    const result = await client.callTool({ name: "search_effects", arguments: { query: "zzz" } });
    assert.notEqual(result.isError, true);
    assert.match(textOf(result), /No Hyperblur items match "zzz"/);
    assert.match(textOf(result), /Categories in the catalog: text, overlay/);
  });

  it("list_categories returns counts and three example titles per category", async () => {
    const result = await client.callTool({ name: "list_categories", arguments: {} });
    assert.notEqual(result.isError, true);
    const text = textOf(result);
    assert.match(text, /11 items in 7 categories/);
    assert.match(text, /- \*\*text\*\* \(1 item\): Glitch Text/);
    assert.match(text, /- \*\*overlay\*\* \(2 items\): VHS Overlay, Scanlines/);
    assert.match(text, /- \*\*components\*\* \(4 items\): Glass Card, Status Badge, Stat Tile$/m);
    assert.doesNotMatch(text, /Pricing Card/);
    assert.match(text, /- \*\*micro\*\* \(1 item\): Press Button/);
    assert.match(text, /- \*\*blocks\*\* \(1 item\): Hero Banner/);
  });

  it("get_effect calls components and blocks by that name and effects by theirs", async () => {
    const micro = textOf(await client.callTool({ name: "get_effect", arguments: { slug: "press-button" } }));
    assert.match(micro, /- Category: micro/);
    assert.match(micro, /install_effect adds this component with shadcn/);
    assert.doesNotMatch(micro, /this effect/);
    const components = textOf(await client.callTool({ name: "get_effect", arguments: { slug: "glass-card" } }));
    assert.match(components, /install_effect adds this component with shadcn/);
    const block = textOf(await client.callTool({ name: "get_effect", arguments: { slug: "hero-banner" } }));
    assert.match(block, /install_effect adds this block with shadcn/);
    assert.doesNotMatch(block, /this (effect|component)/);
    const effect = textOf(await client.callTool({ name: "get_effect", arguments: { slug: "glitch-text" } }));
    assert.match(effect, /install_effect adds this effect with shadcn/);
  });

  it("get_effect returns props, import line and docs", async () => {
    const text = textOf(await client.callTool({ name: "get_effect", arguments: { slug: "glitch-text" } }));
    assert.match(text, /\| `text` \| `string` \| required \|/);
    assert.match(text, /\| `intensity` \| `1 \\\| 2 \\\| 3` \| `2` \|/);
    assert.match(text, /import \{ GlitchText \} from "@\/components\/hyperblur\/glitch-text";/);
    assert.match(text, /Docs: http:\/\/localhost:3000\/effects\/glitch-text/);
  });

  it("get_effect flags unknown slugs as errors", async () => {
    const result = await client.callTool({ name: "get_effect", arguments: { slug: "nope" } });
    assert.equal(result.isError, true);
    assert.match(textOf(result), /Valid slugs: glitch-text/);
  });

  it("get_effect_source returns the file and target", async () => {
    const text = textOf(await client.callTool({ name: "get_effect_source", arguments: { slug: "glitch-text" } }));
    assert.match(text, /## components\/hyperblur\/glitch-text\.tsx/);
    assert.match(text, /export function GlitchText/);
  });

  it("install_effect refuses to run without a package.json", async () => {
    const result = await client.callTool({
      name: "install_effect",
      arguments: { slug: "glitch-text", projectDir: workdir },
    });
    assert.equal(result.isError, true);
    assert.match(textOf(result), /No package\.json found/);
    const relative = await client.callTool({
      name: "install_effect",
      arguments: { slug: "glitch-text", projectDir: "my-app" },
    });
    assert.match(textOf(relative), /must be an absolute path/);
    assert.equal(runs.length, 0);
  });

  it("install_effect runs shadcn in the project directory", async () => {
    await writeFile(path.join(workdir, "package.json"), "{}");
    const result = await client.callTool({
      name: "install_effect",
      arguments: { slug: "glitch-text", projectDir: workdir, overwrite: true },
    });
    assert.notEqual(result.isError, true);
    assert.equal(runs.length, 1);
    assert.equal(runs[0]?.cwd, workdir);
    assert.deepEqual(runs[0]?.args.slice(-5), [
      "shadcn@latest",
      "add",
      `${SITE}/r/glitch-text.json`,
      "--yes",
      "--overwrite",
    ]);
    assert.match(textOf(result), /Created 1 file/);
  });

  it("serves the catalog resource and the add_effect prompt", async () => {
    const resource = await client.readResource({ uri: "hyperblur://catalog" });
    const first = resource.contents[0];
    assert.ok(first && "text" in first);
    const parsed = JSON.parse(String(first.text)) as { items: unknown[] };
    assert.equal(parsed.items.length, 11);
    const prompt = await client.getPrompt({ name: "add_effect", arguments: { slug: "tilt-card" } });
    const message = prompt.messages[0]?.content;
    assert.ok(message && message.type === "text");
    assert.match(message.text, /get_effect/);
    assert.match(message.text, /install_effect/);
    assert.match(message.text, /get_effect_source/);
  });
});
