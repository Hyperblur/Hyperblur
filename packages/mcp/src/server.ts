import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { completable } from "@modelcontextprotocol/sdk/server/completable.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { Catalog, categoryNames, importLine, itemKind } from "./catalog.ts";
import type { CategorySummary, Effect, EffectProp, EffectSource } from "./catalog.ts";
import {
  INSTALL_TIMEOUT_MS,
  findInstalledFile,
  npxInvocation,
  runCommand,
  shadcnArgs,
  validateProjectDir,
} from "./install.ts";
import type { CommandRunner } from "./install.ts";

export const SERVER_NAME = "hyperblur";
export const SERVER_VERSION = "0.2.0";

export interface ServerOptions {
  catalog: Catalog;
  runner?: CommandRunner;
  installTimeoutMs?: number;
}

const SEARCH_DESCRIPTION = `Search the Hyperblur catalog of copy-paste React items. The catalog has effects, components, micro interactions and page blocks (for example glitch and neon text, motion blur, scanlines, film grain, VHS, reveals, cards and hero sections).

Use this first whenever the user asks for a visual effect, animation, text treatment, retro/cyberpunk look, hover interaction, UI component, micro interaction or page section in a React or Next.js project and you do not already know the exact slug. Leave "query" empty to browse the whole catalog, optionally narrowed by "category". Call list_categories to see the categories; an unknown category returns an error that lists the available ones.

Matching is case-insensitive against slug, title, description and tags; every word of the query must match somewhere, and items whose title or slug match rank first.

Returns a compact markdown list: slug, title, category, one-line description and the shadcn install command for each match, plus how many matched in total and the categories currently in the catalog. Next step: call get_effect with a slug to get props, usage and the import line.`;

const LIST_CATEGORIES_DESCRIPTION = `List every category in the Hyperblur catalog with its item count and three example titles. The catalog covers effects, components, micro interactions and page blocks, and its categories can grow over time.

Use this to orient yourself before searching, or to find the right value for the "category" input of search_effects.`;

const GET_DESCRIPTION = `Get the full reference for one Hyperblur item (an effect, component or block) by slug: title, description, category, tags, a props table (name, type, default or required, description), a JSX usage example, the exact import line, npm dependencies, the shadcn install command and the docs URL.

Use this after search_effects (or when the user names an item) and before writing code that renders the component, so the props you pass are real. It does not return the component source; use get_effect_source for that, or install_effect to add the file to a project.

An unknown slug returns an error that lists every valid slug.`;

const SOURCE_DESCRIPTION = `Get the complete TypeScript/React source of a Hyperblur effect, component or block, exactly as the shadcn registry ships it, along with the target path where the file belongs (for example components/hyperblur/glitch-text.tsx) and any npm dependencies it needs.

Use this when you need to write the component file yourself: the project does not use shadcn, has no components.json, running npx is not possible, or install_effect failed. Write the content to the target path (under src/ if the project keeps components there) and install any listed dependencies. Prefer install_effect when shadcn is available.`;

const INSTALL_DESCRIPTION = `Install a Hyperblur effect, component or block into a local React project by running "npx shadcn@latest add <registry-url> --yes" in projectDir. This writes the component file into the project (normally components/hyperblur/<slug>.tsx, or under src/ depending on components.json) and installs its npm dependencies.

Use this when the user wants the item added to a project on this machine and the project uses shadcn (has a components.json, or can be initialized by shadcn). projectDir must be the absolute path of the project root containing package.json; nothing runs if it does not. Existing files are kept unless overwrite is true. The command can take up to 3 minutes.

Returns the exit status, the combined shadcn output, and the path of the installed file. If it fails, read the output, or fall back to get_effect_source and write the file by hand.`;

export function createServer(options: ServerOptions): McpServer {
  const { catalog } = options;
  const runner = options.runner ?? runCommand;
  const installTimeoutMs = options.installTimeoutMs ?? INSTALL_TIMEOUT_MS;

  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION, title: "Hyperblur" },
    {
      instructions:
        "Hyperblur is a catalog of copy-paste React effects, components, micro interactions and page blocks distributed through the shadcn registry. See the categories with list_categories, find items with search_effects, read props and usage with get_effect, then add them with install_effect (runs shadcn) or get_effect_source (write the file yourself). Components are imported from @/components/hyperblur/<slug>.",
    },
  );

  server.registerTool(
    "search_effects",
    {
      title: "Search Hyperblur effects",
      description: SEARCH_DESCRIPTION,
      inputSchema: {
        query: z
          .string()
          .max(200)
          .optional()
          .describe('Words to look for, e.g. "glitch", "retro crt", "hover tilt", "text reveal". Omit to list everything.'),
        category: z
          .string()
          .optional()
          .describe("Restrict results to one category of the catalog, e.g. text, hover or micro. Call list_categories for the current list; an unknown value returns an error listing the available categories."),
        limit: z.number().int().min(1).max(50).default(10).describe("Maximum number of effects to return (1-50, default 10)."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async ({ query, category, limit }) =>
      guard(async () => {
        const { total, results } = await catalog.search({
          ...(query !== undefined ? { query } : {}),
          ...(category !== undefined ? { category } : {}),
          limit,
        });
        const categories = await catalog.listCategories();
        return text(formatSearch(results, total, query, category, categories.map((entry) => entry.category)));
      }),
  );

  server.registerTool(
    "list_categories",
    {
      title: "List Hyperblur categories",
      description: LIST_CATEGORIES_DESCRIPTION,
      inputSchema: {},
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async () => guard(async () => text(formatCategories(await catalog.listCategories()))),
  );

  server.registerTool(
    "get_effect",
    {
      title: "Get Hyperblur effect details",
      description: GET_DESCRIPTION,
      inputSchema: {
        slug: z.string().min(1).describe('Effect slug from search_effects, e.g. "glitch-text" or "tilt-card".'),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async ({ slug }) => guard(async () => text(formatEffect(await catalog.getEffect(slug)))),
  );

  server.registerTool(
    "get_effect_source",
    {
      title: "Get Hyperblur effect source",
      description: SOURCE_DESCRIPTION,
      inputSchema: {
        slug: z.string().min(1).describe('Effect slug from search_effects, e.g. "glitch-text".'),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async ({ slug }) => guard(async () => text(formatSource(await catalog.getSource(slug)))),
  );

  server.registerTool(
    "install_effect",
    {
      title: "Install Hyperblur effect",
      description: INSTALL_DESCRIPTION,
      inputSchema: {
        slug: z.string().min(1).describe('Effect slug from search_effects, e.g. "glitch-text".'),
        projectDir: z
          .string()
          .min(1)
          .describe('Absolute path to the React project root that contains package.json, e.g. "/Users/me/code/my-app".'),
        overwrite: z
          .boolean()
          .default(false)
          .describe("Replace the component file if it already exists. Default false keeps existing files."),
      },
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    },
    async ({ slug, projectDir, overwrite }) =>
      guard(async () => {
        const problem = await validateProjectDir(projectDir);
        if (problem) return error(problem);
        const effect = await catalog.getEffect(slug);
        const args = shadcnArgs(effect.file, overwrite);
        const invocation = npxInvocation(args);
        const result = await runner(invocation.command, invocation.args, { cwd: projectDir, timeoutMs: installTimeoutMs });
        const target =
          (await catalog
            .getSource(effect.slug)
            .then((source) => source.files[0]?.target)
            .catch(() => undefined)) ?? `components/hyperblur/${effect.slug}.tsx`;
        const installed = await findInstalledFile(projectDir, target);
        const commandLine = `npx ${args.join(" ")}`;
        const lines: string[] = [];
        const succeeded = result.exitCode === 0 && !result.timedOut && !result.spawnError;
        if (succeeded) {
          lines.push(`Installed **${effect.title}** (\`${effect.slug}\`) into ${projectDir}.`);
        } else if (result.spawnError) {
          lines.push(`Could not start npx: ${result.spawnError}. Make sure Node.js and npm are installed and on PATH, or use get_effect_source to write the file by hand.`);
        } else if (result.timedOut) {
          lines.push(`The shadcn command did not finish within ${Math.round(installTimeoutMs / 1000)} seconds and was stopped.`);
        } else {
          lines.push(`The shadcn command failed (exit code ${result.exitCode ?? `signal ${result.signal ?? "unknown"}`}). Check the output below; use get_effect_source to write the file by hand if shadcn is not set up in this project.`);
        }
        lines.push("", `- Command: \`${commandLine}\``, `- Working directory: \`${projectDir}\``);
        if (installed) {
          lines.push(`- Installed file: \`${installed}\``);
        } else if (succeeded) {
          lines.push(`- Installed file: expected at \`${target}\` relative to your components alias (see components.json)`);
        }
        if (succeeded) {
          lines.push(`- Import: \`${importLine(effect)}\``);
          if (effect.usage) lines.push(`- Usage: \`${effect.usage}\``);
        }
        lines.push("", "Output:", "```", result.output.trim() || "(no output)", "```");
        return succeeded ? text(lines.join("\n")) : error(lines.join("\n"));
      }),
  );

  server.registerResource(
    "catalog",
    "hyperblur://catalog",
    {
      title: "Hyperblur catalog",
      description: "The full Hyperblur catalog index as JSON: every item in the catalog (effects, components, micro interactions and page blocks) with its category, props, usage, install command and docs URL.",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(await catalog.getIndex(), null, 2) }],
    }),
  );

  server.registerPrompt(
    "add_effect",
    {
      title: "Add a Hyperblur effect, component or block",
      description: "Add a Hyperblur effect, component or block to the current project: look it up, then install it or write its source. Covers effects, components, micro interactions and page blocks.",
      argsSchema: {
        slug: completable(z.string().describe('Slug of the effect, component or block, e.g. "glitch-text".'), async (value) => {
          const slugs = await catalog.listSlugs().catch(() => [] as string[]);
          const prefix = (value ?? "").toLowerCase();
          return slugs.filter((slug) => slug.startsWith(prefix));
        }),
      },
    },
    ({ slug }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: [
              `Add the Hyperblur effect, component or block "${slug}" to this project.`,
              "",
              `1. Call get_effect with slug "${slug}" to read its props, usage and import line.`,
              "2. If the project uses shadcn (it has a components.json), call install_effect with the absolute path of the project root as projectDir.",
              "3. Otherwise, or if the install fails, call get_effect_source and write the file to its target path yourself, then install any listed dependencies.",
              "4. Render the component where it fits, using only the props listed by get_effect.",
            ].join("\n"),
          },
        },
      ],
    }),
  );

  return server;
}

export function formatSearch(
  results: Effect[],
  total: number,
  query?: string,
  category?: string,
  categories: string[] = categoryNames(results),
): string {
  const scope = [query ? `"${query}"` : undefined, category ? `category ${category}` : undefined].filter(Boolean).join(", ");
  const available = categories.length > 0 ? `Categories in the catalog: ${categories.join(", ")}.` : undefined;
  if (results.length === 0) {
    return [
      `No Hyperblur items match ${scope || "your search"}. Try a broader word (for example "text", "blur", "retro", "hover"), drop the category filter, or call search_effects with no query to list everything.`,
      available,
    ]
      .filter((line): line is string => line !== undefined)
      .join("\n");
  }
  const noun = collectiveNoun(results);
  const heading =
    results.length === total
      ? `Found ${total} Hyperblur ${total === 1 ? noun.singular : noun.plural}${scope ? ` for ${scope}` : ""}:`
      : `Showing ${results.length} of ${total} Hyperblur ${noun.plural}${scope ? ` for ${scope}` : ""} (raise limit to see more):`;
  const items = results.map(
    (effect) =>
      `- **${effect.title}** \`${effect.slug}\` (${effect.category}): ${effect.description}\n  Install: \`${effect.install}\``,
  );
  const footer = ["Call get_effect with a slug for props, usage and the import line."];
  if (available) footer.push(available);
  return [heading, "", ...items, "", ...footer].join("\n");
}

export function formatCategories(categories: CategorySummary[]): string {
  if (categories.length === 0) {
    return "The Hyperblur catalog has no categories yet.";
  }
  const total = categories.reduce((sum, entry) => sum + entry.count, 0);
  const lines = categories.map(
    (entry) => `- **${entry.category}** (${entry.count} ${entry.count === 1 ? "item" : "items"}): ${entry.examples.join(", ")}`,
  );
  return [
    `The Hyperblur catalog has ${total} items in ${categories.length} categories:`,
    "",
    ...lines,
    "",
    "Pass a category to search_effects to browse it, or call get_effect with a slug.",
  ].join("\n");
}

function collectiveNoun(results: Effect[]): { singular: string; plural: string } {
  const kinds = new Set(results.map((effect) => itemKind(effect.category)));
  const only = kinds.size === 1 ? [...kinds][0] : undefined;
  if (only === "effect") return { singular: "effect", plural: "effects" };
  if (only === "component") return { singular: "component", plural: "components" };
  if (only === "block") return { singular: "block", plural: "blocks" };
  return { singular: "item", plural: "items" };
}

export function formatEffect(effect: Effect): string {
  const lines = [
    `# ${effect.title} (\`${effect.slug}\`)`,
    "",
    effect.description,
    "",
    `- Category: ${effect.category}`,
    `- Tags: ${effect.tags.length > 0 ? effect.tags.join(", ") : "none"}`,
    `- Component: \`${effect.component}\``,
    `- Import: \`${importLine(effect)}\``,
    `- Install: \`${effect.install}\``,
    `- npm dependencies: ${effect.dependencies.length > 0 ? effect.dependencies.join(", ") : "none"}`,
    `- Docs: ${effect.docs}`,
    "",
    "## Props",
    "",
  ];
  if (effect.props.length === 0) {
    lines.push("This component takes no props of its own.");
  } else {
    lines.push("| Prop | Type | Default | Description |", "| --- | --- | --- | --- |");
    for (const prop of effect.props) {
      lines.push(`| \`${prop.name}\` | \`${cell(prop.type)}\` | ${defaultCell(prop)} | ${cell(prop.description)} |`);
    }
  }
  if (effect.usage) {
    lines.push("", "## Usage", "", "```tsx", importLine(effect), "", effect.usage, "```");
  }
  lines.push(
    "",
    `Next: install_effect adds this ${itemKind(effect.category)} with shadcn; get_effect_source returns the source to write by hand.`,
  );
  return lines.join("\n");
}

export function formatSource(source: EffectSource): string {
  const { effect } = source;
  const lines = [
    `# Source for ${effect.title} (\`${effect.slug}\`)`,
    "",
    `- Import after writing the file: \`${importLine(effect)}\``,
    `- npm dependencies: ${source.dependencies.length > 0 ? `${source.dependencies.join(", ")} (install them with the project's package manager)` : "none"}`,
  ];
  if (source.devDependencies.length > 0) {
    lines.push(`- npm dev dependencies: ${source.devDependencies.join(", ")}`);
  }
  if (source.registryDependencies.length > 0) {
    lines.push(`- shadcn registry dependencies: ${source.registryDependencies.join(", ")}`);
  }
  lines.push(
    "- Place the file at the target path below, relative to the project root (use src/ as a prefix if the project keeps components under src/).",
  );
  for (const file of source.files) {
    lines.push("", `## ${file.target}`, "", `\`\`\`${fence(file.target)}`, file.content.trimEnd(), "```");
  }
  return lines.join("\n");
}

function defaultCell(prop: EffectProp): string {
  if (prop.required) return "required";
  if (prop.default !== undefined) return `\`${cell(prop.default)}\``;
  return "optional";
}

function cell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function fence(target: string): string {
  const extension = target.split(".").pop() ?? "";
  return ["tsx", "ts", "jsx", "js", "css", "json"].includes(extension) ? extension : "";
}

function text(value: string): CallToolResult {
  return { content: [{ type: "text", text: value }] };
}

function error(value: string): CallToolResult {
  return { content: [{ type: "text", text: value }], isError: true };
}

async function guard(run: () => Promise<CallToolResult>): Promise<CallToolResult> {
  try {
    return await run();
  } catch (caught) {
    return error(caught instanceof Error ? caught.message : String(caught));
  }
}
