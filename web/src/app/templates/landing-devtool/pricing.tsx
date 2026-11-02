import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ArrowRight, Check, SectionHead } from "./icons";

const plans = [
  {
    name: "Hobby",
    price: "$0",
    per: "forever",
    blurb: "For side projects and trying Forge on a real repo.",
    cta: "Start free",
    features: ["3 seats", "5 GB remote cache", "Unlimited previews", "1 region", "Community support"],
  },
  {
    name: "Team",
    price: "$24",
    per: "per seat / month",
    blurb: "For product teams shipping to production every day.",
    cta: "Start 14-day trial",
    pop: true,
    features: ["Unlimited seats", "250 GB remote cache", "Instant rollbacks", "3 regions included", "SSO with Google and GitHub", "Slack and Linear alerts"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "annual contract",
    blurb: "For platforms with compliance, scale and on-prem runners.",
    cta: "Talk to an engineer",
    features: ["Self-hosted cache nodes", "12 regions and private PoPs", "SAML, SCIM and audit log", "99.99% uptime SLA", "Dedicated Slack channel"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="hbl-dv-rule relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(163,230,53,0.07),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <FadeInView>
          <SectionHead
            center
            label="Pricing"
            title="Pay for seats, not for build minutes."
            body="Every plan includes the remote cache, previews and rollbacks. No per-minute billing, no surprise invoices after a busy release week."
          />
        </FadeInView>
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {plans.map((p, i) => (
            <FadeInView key={p.name} delay={0.08 * i} className="min-w-0">
              <div
                className="hbl-dv-plan relative flex h-full flex-col rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,#111112,#0c0c0d)] p-7 transition-colors hover:border-white/20 sm:p-8"
                data-pop={p.pop ? "true" : "false"}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[15px] font-semibold tracking-[-0.03em] text-[#f4f4f0]">{p.name}</h3>
                  {p.pop ? (
                    <span className="rounded-full bg-[#a3e635] px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-[#0b0b0c]">Most teams</span>
                  ) : null}
                </div>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-mono text-[44px] font-semibold leading-none tracking-[-0.06em] text-[#f4f4f0]">{p.price}</span>
                  <span className="font-mono text-[12px] text-[#6f6f69]">{p.per}</span>
                </p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-[#a3a39b]">{p.blurb}</p>
                <a
                  href="#start"
                  className={`hbl-dv-btn mt-7 w-full ${p.pop ? "hbl-dv-btn-acid" : "hbl-dv-btn-ghost"}`}
                >
                  {p.cta}
                  <ArrowRight />
                </a>
                <ul className="mt-8 space-y-3 border-t border-white/10 pt-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[14px] text-[#f4f4f0]/85">
                      <Check className={`h-4 w-4 shrink-0 ${p.pop ? "text-[#a3e635]" : "text-[#6f6f69]"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-[12px] text-[#6f6f69]">
          Open source maintainers get Team for free. Prices in USD, billed monthly or yearly with two months off.
        </p>
      </div>
    </section>
  );
}
