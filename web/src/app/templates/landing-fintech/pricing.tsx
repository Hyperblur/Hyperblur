import { GlowBorder } from "@/registry/hyperblur/glow-border";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Arrow, Check, Em, SectionHeading } from "./ui";

const plans = [
  {
    name: "Launch",
    price: "$0",
    unit: "per month",
    blurb: "Pay only when money moves. For new marketplaces finding their first sellers.",
    features: ["All 135 currencies", "Instant payouts in 62 countries", "Hosted checkout and seller onboarding", "Email support"],
    cta: "Start building",
    featured: false,
  },
  {
    name: "Scale",
    price: "$499",
    unit: "per month",
    blurb: "Lower rates for marketplaces processing more than $2M a month.",
    features: ["Everything in Launch", "FX at 0.35% over mid-market", "Treasury rules and yield accounts", "Dedicated payments engineer"],
    cta: "Talk to sales",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "from $50M a year",
    blurb: "Interchange-plus pricing, local entities and a named risk team.",
    features: ["Everything in Scale", "Interchange-plus card pricing", "Custom settlement windows", "99.995% uptime SLA"],
    cta: "Contact us",
    featured: false,
  },
];

const fees = [
  { item: "Domestic cards", launch: "2.6% + 25¢", scale: "2.1% + 20¢", enterprise: "Interchange + 0.2%" },
  { item: "International cards", launch: "+1.0%", scale: "+0.6%", enterprise: "+0.3%" },
  { item: "Local methods (Pix, UPI, SEPA, iDEAL)", launch: "0.8%, capped at $5", scale: "0.5%, capped at $3", enterprise: "Custom cap" },
  { item: "Instant payout", launch: "$0.25", scale: "$0.10", enterprise: "From $0.03" },
  { item: "FX conversion over mid-market", launch: "0.50%", scale: "0.35%", enterprise: "From 0.15%" },
  { item: "Chargeback", launch: "$15, refunded if won", scale: "$10, refunded if won", enterprise: "$0" },
  { item: "Setup, monthly minimums, card storage", launch: "None", scale: "None", enterprise: "None" },
];

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="hbl-fn-pricing-title" className="hbl-fn-section hbl-fn-hair">
      <div className="hbl-fn-wrap">
        <FadeInView>
          <SectionHeading
            id="hbl-fn-pricing-title"
            eyebrow="Pricing"
            title={
              <>
                Fees you can <Em>actually</Em> read.
              </>
            }
            lead="Every rate is on this page. No setup fees, no minimums, no markup hidden inside the exchange rate."
          />
        </FadeInView>

        <div className="mt-14 grid gap-4 md:mt-16 lg:grid-cols-3">
          {plans.map((p, i) => (
            <FadeInView key={p.name} delay={0.06 * i} className="min-w-0">
              <GlowBorder color={p.featured ? "#34d399" : "#60a5fa"} rounded={22} radius={260} className="h-full">
                <div className={`hbl-fn-plan flex flex-col ${p.featured ? "hbl-fn-plan-featured" : "hbl-fn-card"}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-medium text-[#c8d4e6]">{p.name}</h3>
                    {p.featured ? <span className="hbl-fn-chip hbl-fn-chip-em">Most chosen</span> : null}
                  </div>
                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="hbl-fn-num text-[46px] font-semibold leading-none tracking-[-0.05em]">{p.price}</span>
                    <span className="text-[14px] text-[#8193ab]">{p.unit}</span>
                  </p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-[#94a3b8]">{p.blurb}</p>
                  <ul className="mt-6 space-y-3 text-[14.5px] text-[#dbe6f5]">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#start" className={`hbl-fn-btn mt-8 w-full ${p.featured ? "hbl-fn-btn-primary" : "hbl-fn-btn-ghost"}`}>
                    {p.cta}
                    <Arrow />
                  </a>
                </div>
              </GlowBorder>
            </FadeInView>
          ))}
        </div>

        <FadeInView delay={0.1} distance={24}>
          <div className="hbl-fn-card mt-6 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] px-5 py-4 md:px-6">
              <h3 className="text-[15px] font-medium">Full fee table</h3>
              <p className="text-[13px] text-[#8193ab]">Prices in USD. Local currency pricing available on Scale and Enterprise.</p>
            </div>
            <div className="hbl-fn-scroll">
              <table className="hbl-fn-table hbl-fn-num min-w-[720px]">
                <caption className="sr-only">Meridian fees by plan</caption>
                <thead>
                  <tr>
                    <th scope="col">Fee</th>
                    <th scope="col">Launch</th>
                    <th scope="col" className="text-[#6ee7b7]">Scale</th>
                    <th scope="col">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((f) => (
                    <tr key={f.item}>
                      <th scope="row">
                        {f.item}
                      </th>
                      <td>{f.launch}</td>
                      <td className="bg-[rgba(52,211,153,0.05)] text-[#eaf2ff]">{f.scale}</td>
                      <td>{f.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
