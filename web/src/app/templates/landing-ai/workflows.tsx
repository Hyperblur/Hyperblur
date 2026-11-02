import { SectionHead } from "./ui";
import { Showcase } from "./showcase";

export function Workflows() {
  return (
    <section id="workflows" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="hbl-ai-glow-band pointer-events-none absolute inset-x-0 top-24 h-[520px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionHead
          eyebrow="Watch a run"
          title="Every step in the open"
          body="Agents show their plan, the tools they called and the reasoning behind each move. When a step needs a person, the run pauses right there."
        />
        <Showcase />
      </div>
    </section>
  );
}
