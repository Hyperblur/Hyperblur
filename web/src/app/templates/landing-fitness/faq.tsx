import { Accordion } from "@/registry/hyperblur/accordion";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

const items = [
  {
    id: "free",
    title: "What do I get in the free week?",
    content: "Seven days of unlimited classes and open gym from your first check-in, a 20-minute intro with a coach and an InBody scan. No card on file, nothing renews automatically.",
  },
  {
    id: "beginner",
    title: "I have never lifted. Is that a problem?",
    content: "About half of our members started from zero. Every class has a scaled version, and Strength Foundations teaches each lift from an empty bar before anything goes on it.",
  },
  {
    id: "access",
    title: "How does 24/7 access work?",
    content: "Members on any plan get a key fob after their first week. Doors open around the clock, cameras cover the floor and an emergency button sits at every rack.",
  },
  {
    id: "bring",
    title: "What should I bring?",
    content: "Water, closed shoes and clothes you can squat in. We have towels, chalk, belts, wrist wraps and boxing gloves to borrow. Showers have shampoo and soap.",
  },
  {
    id: "pause",
    title: "Can I pause or cancel my membership?",
    content: "Yes. Pause for up to three months a year or cancel in the app with one tap. Annual plans are refunded pro rata for the months you have not used.",
  },
  {
    id: "kids",
    title: "How old do kids need to be?",
    content: "Junior Athletes is for ages 8 to 14 and runs Monday, Wednesday and Saturday. Teens from 15 can join adult classes with a signed parent waiver.",
  },
];

export function FitnessFaq() {
  return (
    <section aria-labelledby="hbl-ft-faq-title" className="border-t py-24 hbl-ft-rule md:py-32">
      <div className="hbl-ft-wrap grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <FadeInView className="min-w-0">
          <p className="hbl-ft-kicker">FAQ</p>
          <h2 id="hbl-ft-faq-title" className="hbl-ft-h2 mt-5">
            Before your <span className="hbl-ft-lime">first rep</span>
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed hbl-ft-muted">
            Still unsure? Text the front desk at <span className="font-mono text-[#f1f0e8]">(503) 555-0148</span>, a coach answers within the hour.
          </p>
        </FadeInView>
        <FadeInView delay={0.08} className="min-w-0">
          <Accordion items={items} defaultOpen={["free"]} className="hbl-ft-faq" />
        </FadeInView>
      </div>
    </section>
  );
}
