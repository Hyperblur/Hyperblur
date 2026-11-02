import { Accordion } from "@/registry/hyperblur/accordion";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

const items = [
  {
    id: "budget",
    title: "What does a project usually cost?",
    content: "Identity projects start at $48,000 and websites at $65,000. Most clients book both, which runs between $95,000 and $160,000 depending on scope. You get a fixed quote after the intro call.",
  },
  {
    id: "size",
    title: "Do you work with early-stage companies?",
    content: "Yes, about a third of our clients are pre-Series A. We keep two seed-stage slots a year with a lighter scope and a payment plan tied to your raise.",
  },
  {
    id: "remote",
    title: "We are not in Lisbon or New York. Is that a problem?",
    content: "Not at all. We have shipped for teams in eleven countries. Workshops happen in person at the start, everything else runs on a shared Friday review.",
  },
  {
    id: "handover",
    title: "Can our team edit the website after launch?",
    content: "That is the point. We build on a CMS your editors pick, train them in a recorded session and stay on call for ninety days after launch.",
  },
];

export function AgencyFaq() {
  return (
    <section aria-labelledby="hbl-ag-faq-title" className="border-b hbl-ag-rule py-24 md:py-32">
      <div className="hbl-ag-wrap grid gap-12 md:grid-cols-12 md:gap-0">
        <FadeInView className="min-w-0 md:col-span-5 md:pr-12">
          <p className="hbl-ag-kicker">Before you write</p>
          <h2 id="hbl-ag-faq-title" className="mt-6 font-grotesk text-[clamp(36px,4.4vw,60px)] font-bold uppercase leading-[0.92] tracking-[-0.045em]">
            Fair <span className="hbl-ag-serif">questions</span>
          </h2>
        </FadeInView>
        <FadeInView delay={0.1} className="min-w-0 md:col-span-7">
          <Accordion items={items} defaultOpen={["budget"]} className="hbl-ag-faq" />
        </FadeInView>
      </div>
    </section>
  );
}
