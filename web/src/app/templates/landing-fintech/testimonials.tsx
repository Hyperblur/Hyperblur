import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Em, SectionHeading } from "./ui";

const featured = {
  quote:
    "We used to pre-fund eleven bank accounts and wait three days to pay artisans in Brazil and Portugal. With Meridian a seller in Recife gets paid before she has packed the order. Our seller churn dropped by a third in one quarter.",
  name: "Ana Ferreira",
  role: "CFO, Tecelã",
  initials: "AF",
  color: "linear-gradient(135deg, #6ee7b7, #3b82f6)",
  metrics: [
    { value: "−34%", label: "Seller churn" },
    { value: "$11.6M", label: "Cash freed from pre-funding" },
  ],
};

const quotes = [
  {
    quote: "FX used to be a line item nobody could explain. Now it is 0.35% and our controller can reconcile Japan in an afternoon.",
    name: "Kenji Morimoto",
    role: "Head of Finance, Kanso Rentals",
    initials: "KM",
    color: "linear-gradient(135deg, #93c5fd, #a78bfa)",
  },
  {
    quote: "We went live in nine countries with one integration and one compliance review. The ledger alone replaced two internal services.",
    name: "Lerato Dube",
    role: "VP Engineering, Stallholder",
    initials: "LD",
    color: "linear-gradient(135deg, #fde68a, #34d399)",
  },
];

export function Testimonials() {
  return (
    <section id="customers" aria-labelledby="hbl-fn-voices-title" className="hbl-fn-section hbl-fn-hair">
      <div className="hbl-fn-wrap">
        <FadeInView>
          <SectionHeading
            id="hbl-fn-voices-title"
            eyebrow="Customers"
            title={
              <>
                Marketplaces that stopped <Em>waiting</Em> on banks.
              </>
            }
          />
        </FadeInView>
        <div className="mt-14 grid gap-4 md:mt-16 lg:grid-cols-5">
          <FadeInView className="min-w-0 lg:col-span-3">
            <figure className="hbl-fn-card flex h-full flex-col overflow-hidden p-7 md:p-10">
              <div className="hbl-fn-glow -right-20 -top-24 h-64 w-64 bg-[#34d399]" style={{ opacity: 0.3 }} aria-hidden="true" />
              <span className="hbl-fn-quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote className="relative mt-4 text-[clamp(20px,2.2vw,26px)] leading-[1.45] tracking-[-0.02em] text-[#eaf2ff]">
                {featured.quote}
              </blockquote>
              <div className="relative mt-auto flex flex-wrap items-end justify-between gap-6 pt-10">
                <figcaption className="flex items-center gap-3">
                  <span className="hbl-fn-avatar" style={{ background: featured.color }} aria-hidden="true">
                    {featured.initials}
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium">{featured.name}</span>
                    <span className="block text-[13px] text-[#8193ab]">{featured.role}</span>
                  </span>
                </figcaption>
                <dl className="flex gap-8">
                  {featured.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="text-[12px] text-[#8193ab]">{m.label}</dt>
                      <dd className="hbl-fn-num mt-1 text-[26px] font-semibold tracking-[-0.04em] text-[#6ee7b7]">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </figure>
          </FadeInView>
          <div className="grid min-w-0 gap-4 lg:col-span-2">
            {quotes.map((q, i) => (
              <FadeInView key={q.name} delay={0.08 * (i + 1)} className="min-w-0">
                <figure className="hbl-fn-card flex h-full flex-col p-7">
                  <blockquote className="text-[16.5px] leading-[1.6] text-[#dbe6f5]">“{q.quote}”</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-6">
                    <span className="hbl-fn-avatar" style={{ background: q.color }} aria-hidden="true">
                      {q.initials}
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-medium">{q.name}</span>
                      <span className="block text-[13px] text-[#8193ab]">{q.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
