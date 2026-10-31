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

  it("lists the four tools, the catalog resource and the add_effect prompt", async () => {
    const { tools } = await client.listTools();
    assert.deepEqual(
      tools.map((tool) => tool.name).sort(),
      ["get_effect", "get_effect_source", "install_effect", "search_effects"],
    );
    const { resources } = await client.listResources();
    assert.equal(resources[0]?.uri, "hyperblur://catalog");
    const { prompts } = await client.listPrompts();
    assert.equal(prompts[0]?.name, "add_effect");
  });

  it("search_effects returns a compact list", async () => {
    const result = await client.callTool({ name: "search_effects", arguments: { query: "glitch" } });
    const text = textOf(result);
    assert.match(text, /Found 3 Hyperblur effects for "glitch"/);
    assert.match(text, /\*\*Glitch Text\*\* `glitch-text` \(text\)/);
    assert.match(text, /npx shadcn@latest add http:\/\/localhost:3000\/r\/glitch-text\.json/);
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
    assert.equal(parsed.items.length, 4);
    const prompt = await client.getPrompt({ name: "add_effect", arguments: { slug: "tilt-card" } });
    const message = prompt.messages[0]?.content;
    assert.ok(message && message.type === "text");
    assert.match(message.text, /get_effect/);
    assert.match(message.text, /install_effect/);
    assert.match(message.text, /get_effect_source/);
  });
});
