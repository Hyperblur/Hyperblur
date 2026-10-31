import type { Metadata } from "next";
import { Code, DocHeader, DocLink, DocList, DocPager, DocSection, P } from "@/components/site/doc-parts";

export const metadata: Metadata = {
  title: "Introduction",
  description: "What Hyperblur is, what it is not, and how the catalog is organized.",
};

export default function IntroductionPage() {
  return (
    <article className="min-w-0">
      <DocHeader
        title="Introduction"
        lead="Copy-paste visual effects and components for React. One file each, no dependencies besides React."
      />

      <DocSection title="What Hyperblur is">
        <P>
          Hyperblur is a catalog of visual effects: glitch text, motion blur reveals, scanline and noise overlays,
          pointer-driven hover effects and small interface components. Every entry is a single TypeScript file that
          you add to your project and own from then on.
        </P>
        <P>
          Entries are published as a shadcn registry. One command copies the file into your codebase, with no extra
          packages to install and no runtime to configure. If you would rather not use the CLI, you can paste the
          source by hand.
        </P>
      </DocSection>

      <DocSection title="What it is not">
        <P>
          Hyperblur is not a library you import from npm. There is no <Code>hyperblur</Code> package to depend on, no
          version to keep in sync and no bundle you have no control over. The code lives in your repository, so you
          can read it, change it and delete what you do not use.
        </P>
      </DocSection>

      <DocSection title="How pages are organized">
        <P>
          Effects are grouped by category: text, motion and reveals, overlays and backgrounds, hover and pointer
          effects, components, and micro interactions. The <DocLink href="/effects">effects index</DocLink> lists all
          of them with live previews.
        </P>
        <P>Each effect page follows the same layout:</P>
        <DocList>
          <li>A live preview, the full source and the agent prompt in tabs.</li>
          <li>The install command for that effect.</li>
          <li>A usage example with the import line.</li>
          <li>A props table with types, defaults and descriptions.</li>
        </DocList>
      </DocSection>

      <DocSection title="Ways to use it">
        <DocList>
          <li>
            Install with the shadcn CLI and import the component. See <DocLink href="/docs/installation">Installation</DocLink>.
          </li>
          <li>
            Hand the work to a coding agent with a copied prompt, the MCP server or the Claude Code plugin. See{" "}
            <DocLink href="/docs/agents">Agents</DocLink>.
          </li>
        </DocList>
      </DocSection>

      <DocPager current="/docs/introduction" />
    </article>
  );
}
