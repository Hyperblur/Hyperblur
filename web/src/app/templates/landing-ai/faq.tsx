import { Accordion } from "@/registry/hyperblur/accordion";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { SectionHead } from "./ui";

const items = [
  {
    id: "unsure",
    title: "What happens when an agent is not sure?",
    content:
      "It stops and asks. Every workflow has a confidence floor, and anything below it is parked in the approval inbox with the evidence the agent gathered, so a person can decide in seconds.",
  },
  {
    id: "money",
    title: "Can agents move money on their own?",
    content:
      "Only if you allow it. By default, any action that pays, refunds or changes bank details needs a named approver. You can raise or lower the limit per workflow, and spending caps apply on top.",
  },
  {
    id: "systems",
    title: "Which systems does Cadence connect to?",
    content:
      "53 native connectors across helpdesks, inboxes, ERPs, ledgers, HR and payroll, chat and data warehouses. Anything else connects through REST or webhooks in about an hour.",
  },
  {
    id: "data",
    title: "Where is our data stored, and is it used for training?",
    content:
      "In the US or EU region you choose, encrypted at rest and in transit. Your data is never used to train models, and it is deleted 30 days after you cancel.",
  },
  {
    id: "setup",
    title: "How long does setup take?",
    content:
      "Most teams have a first workflow running in read-only mode the same afternoon, then switch it on after a week of reviewing its decisions. Growth includes a guided onboarding call.",
  },
  {
    id: "run",
    title: "What counts as a run?",
    content:
      "One task finished end to end, such as a triaged ticket, a matched invoice or an onboarded employee. Retries, tool calls and approval waits inside that task are included.",
  },
];

export function Faq() {
  return (
    <section className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="min-w-0">
          <SectionHead
            align="left"
            eyebrow="FAQ"
            title="Questions finance and security ask first"
            body="Still unsure? Our team answers within one business day, usually much faster."
          />
          <FadeInView delay={0.1}>
            <a href="#cta" className="hbl-ai-btn hbl-ai-btn-ghost mt-8">
              Read the security overview
            </a>
          </FadeInView>
        </div>
        <FadeInView delay={0.05} className="min-w-0">
          <Accordion items={items} defaultOpen={["unsure"]} className="hbl-ai-faq" />
        </FadeInView>
      </div>
    </section>
  );
}
