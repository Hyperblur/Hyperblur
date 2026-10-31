import type { Metadata } from "next";
import { CodeBlock } from "@/components/site/code-block";
import { Code, DocHeader, DocLink, DocList, DocPager, DocSection, P } from "@/components/site/doc-parts";

export const metadata: Metadata = {
  title: "Installation",
  description: "Add a Hyperblur effect to a React project with the shadcn CLI, or copy the source by hand.",
};

const initCommand = "npx shadcn@latest init";
const addCommand = "npx shadcn@latest add https://hyperblur.vercel.app/r/glitch-text.json";
const useSnippet = `import { GlitchText } from "@/components/hyperblur/glitch-text"

export default function Hero() {
  return <GlitchText text="HYPERBLUR" intensity={2} />
}`;
const updateCommand = "npx shadcn@latest add https://hyperblur.vercel.app/r/glitch-text.json --overwrite";

export default function InstallationPage() {
  return (
    <article className="min-w-0">
      <DocHeader title="Installation" lead="Add an effect to your project with one command, or copy the source by hand." />

      <DocSection title="Prerequisites">
        <DocList>
          <li>A React project, such as Next.js, Vite or Remix.</li>
          <li>Tailwind CSS set up in that project.</li>
          <li>
            The shadcn CLI initialized, which means a <Code>components.json</Code> file at the project root.
          </li>
        </DocList>
        <P>If your project has not been set up for shadcn yet, run the init command and answer the prompts.</P>
        <CodeBlock code={initCommand} title="terminal" />
      </DocSection>

      <DocSection title="Install an effect">
        <P>
          Every effect page shows its own command. They all share the same shape: the registry URL, then the effect
          slug. Here is Glitch Text.
        </P>
        <CodeBlock code={addCommand} title="terminal" />
        <P>
          The CLI writes one file to <Code>components/hyperblur/glitch-text.tsx</Code>, inside your configured
          components directory. Any dependencies an effect needs are installed for you. Most need none.
        </P>
      </DocSection>

      <DocSection title="Use it">
        <P>Import the component from where it landed and render it. Check the effect page for its props.</P>
        <CodeBlock code={useSnippet} title="hero.tsx" />
        <P>
          Props are documented on each <DocLink href="/effects">effect page</DocLink>, with types and defaults. Effects
          respect <Code>prefers-reduced-motion</Code>, so people who ask their system for less motion get a calm
          version.
        </P>
      </DocSection>

      <DocSection title="Manual installation">
        <P>
          You do not need the CLI. Open the Code tab on any effect page, copy the source and save it as{" "}
          <Code>components/hyperblur/&lt;name&gt;.tsx</Code> in your project. Then import it as shown above. Make sure
          the <Code>@/</Code> alias in your import points at your source folder, or adjust the path.
        </P>
      </DocSection>

      <DocSection title="Updating">
        <P>
          The file belongs to you, so the CLI never overwrites it silently. To pull the latest version of an effect,
          run the add command again with <Code>--overwrite</Code>. Local edits to that file are replaced.
        </P>
        <CodeBlock code={updateCommand} title="terminal" />
      </DocSection>

      <DocPager current="/docs/installation" />
    </article>
  );
}
