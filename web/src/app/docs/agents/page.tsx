import type { Metadata } from "next";
import { CodeBlock } from "@/components/site/code-block";
import { Code, DocHeader, DocLink, DocList, DocPager, DocSection, P } from "@/components/site/doc-parts";

export const metadata: Metadata = {
  title: "Agents",
  description: "Use Hyperblur with coding agents: a copyable prompt, an MCP server and a Claude Code plugin.",
};

const claudeCodeMcp = "claude mcp add hyperblur -- npx -y @hyperblur/mcp";
const mcpConfig = `{
  "mcpServers": {
    "hyperblur": {
      "command": "npx",
      "args": ["-y", "@hyperblur/mcp"]
    }
  }
}`;
const envCommand = "claude mcp add hyperblur -e HYPERBLUR_SITE_URL=http://localhost:3000 -- npx -y @hyperblur/mcp";
const pluginCommand = "claude plugin install hyperblur --marketplace Hyperblur/Hyperblur";

const tools: { name: string; returns: string }[] = [
  {
    name: "search_effects",
    returns:
      "Matches for a keyword and an optional category. Each result has the slug, title, category, description and install command.",
  },
  {
    name: "get_effect",
    returns:
      "The full reference for one effect: props table, usage example, import line, dependencies, install command and docs link.",
  },
  {
    name: "get_effect_source",
    returns: "The component source and its target path, for writing the file by hand when shadcn is not available.",
  },
  {
    name: "install_effect",
    returns:
      "Runs the shadcn add command in the project directory you give it, with an optional overwrite, and reports the output and the installed file.",
  },
];

export default function AgentsPage() {
  return (
    <article className="min-w-0">
      <DocHeader
        title="Agents"
        lead="Three ways to let a coding agent add effects for you: a prompt, an MCP server and a Claude Code plugin."
      />

      <DocSection title="Copy prompt">
        <P>
          Every effect page has a Copy prompt button. It puts a ready-to-paste instruction on your clipboard that works
          in Claude Code, Cursor, Lovable, v0 or any other agent that can edit a React project. No setup is needed.
        </P>
        <P>The prompt contains everything the agent needs to finish the job without browsing:</P>
        <DocList>
          <li>The exact shadcn install command for that effect.</li>
          <li>
            The file path it creates, and whether it has dependencies beyond React.
          </li>
          <li>The import line and a usage example.</li>
          <li>The full props list with types, defaults and descriptions.</li>
          <li>A link back to the effect page.</li>
        </DocList>
      </DocSection>

      <DocSection title="MCP server" id="mcp">
        <P>
          The <Code>@hyperblur/mcp</Code> server lets any MCP client search the catalog and install effects itself. It
          needs Node.js 20 or later. For installs, the project must have a <Code>package.json</Code> and be set up for
          shadcn.
        </P>
        <P>In Claude Code, add it with one command.</P>
        <CodeBlock code={claudeCodeMcp} title="terminal" />
        <P>
          In Cursor, add this to <Code>.cursor/mcp.json</Code> in your project, or to <Code>~/.cursor/mcp.json</Code>{" "}
          for all projects. In Claude Desktop, put the same block in <Code>claude_desktop_config.json</Code> under
          Settings, Developer, Edit Config, then restart the app.
        </P>
        <CodeBlock code={mcpConfig} title="mcp.json" />

        <h3 className="pt-2 text-base font-semibold">Tools</h3>
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-2 font-medium">Tool</th>
                <th className="px-4 py-2 font-medium">Returns</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tools.map((t) => (
                <tr key={t.name} className="align-top">
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-blue-soft">{t.name}</td>
                  <td className="px-4 py-2.5 text-muted">{t.returns}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="pt-2 text-base font-semibold">Configuration</h3>
        <P>
          The server reads the catalog from the site set in <Code>HYPERBLUR_SITE_URL</Code>, which defaults to{" "}
          <Code>https://hyperblur.vercel.app</Code>. Point it at your local site while developing Hyperblur itself.
        </P>
        <CodeBlock code={envCommand} title="terminal" />
      </DocSection>

      <DocSection title="Claude Code plugin" id="plugin">
        <P>
          The plugin bundles the MCP server and a skill that teaches Claude Code the workflow: search, read the props,
          install, wire the effect in, then report the file and the props worth tuning. Install it from the Hyperblur
          marketplace.
        </P>
        <CodeBlock code={pluginCommand} title="terminal" />
        <P>
          After that, ask for an effect in plain language, for example a glitching headline, and Claude Code picks the
          closest match and adds it. For manual setups, see <DocLink href="/docs/installation">Installation</DocLink>.
        </P>
      </DocSection>

      <DocPager current="/docs/agents" />
    </article>
  );
}
