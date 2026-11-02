"use client";

import { useState } from "react";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Check, SectionHead } from "./ui";

const plans = [
  {
    name: "Starter",
    blurb: "Prove it on one queue.",
    monthly: 0,
    yearly: 0,
    unit: "free forever",
    cta: "Start free",
    features: ["300 agent runs a month", "1 workflow", "Approvals in Slack or email", "7-day audit log"],
  },
  {
    name: "Growth",
    blurb: "For teams running real queues.",
    monthly: 480,
    yearly: 400,
    unit: "per month",
    cta: "Start 14-day trial",
    featured: true,
    features: [
      "10,000 agent runs a month",
      "Unlimited workflows",
      "Approval policies and spending caps",
      "1-year audit log and exports",
      "SSO and role-based access",
    ],
  },
  {
    name: "Enterprise",
    blurb: "For regulated back offices.",
    monthly: null,
    yearly: null,
    unit: "volume pricing",
    cta: "Talk to sales",
    features: [
      "Volume run pricing",
      "US or EU data residency",
      "SOC 2 report, DPA and BAA",
      "Private model routing",
      "Named solutions engineer",
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="hbl-ai-glow-band pointer-events-none absolute inset-x-0 top-40 h-[480px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionHead
          eyebrow="Pricing"
          title="Pay for finished work, not seats"
          body="A run is one task done end to end, like a triaged ticket or a matched invoice, however many steps it takes."
        />
        <FadeInView className="mt-10 flex justify-center">
          <div className="hbl-ai-toggle" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
              Yearly <span className="hbl-ai-save">2 months free</span>
            </button>
          </div>
        </FadeInView>
        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
          {plans.map((p, i) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <FadeInView key={p.name} delay={i * 0.08} className="min-w-0">
                <div className="hbl-ai-plan flex h-full flex-col p-7 sm:p-8" data-featured={p.featured ? "true" : undefined}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-grotesk text-lg font-semibold text-[#f2f3fa]">{p.name}</h3>
                    {p.featured ? <span className="hbl-ai-pop">Most teams pick this</span> : null}
                  </div>
                  <p className="mt-1.5 text-[14px] text-[#9aa0b4]">{p.blurb}</p>
                  <p className="mt-7 flex items-baseline gap-2">
                    <span className="font-grotesk text-5xl font-semibold tracking-[-0.04em] text-[#f4f5fb]">
                      {price === null ? "Custom" : `$${price}`}
                    </span>
                    <span className="text-[13px] text-[#7d8299]">
                      {price === null || price === 0 ? p.unit : yearly ? "per month, billed yearly" : p.unit}
                    </span>
                  </p>
                  <a
                    href="#cta"
                    className={`hbl-ai-btn mt-7 w-full justify-center ${p.featured ? "hbl-ai-btn-primary" : "hbl-ai-btn-ghost"}`}
                  >
                    {p.cta}
                  </a>
                  <ul className="mt-8 space-y-3 border-t border-white/[0.06] pt-7">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[14px] text-[#c9cce0]">
                        <span className="mt-0.5">
                          <Check tone={p.featured ? "violet" : "cyan"} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInView>
            );
          })}
        </div>
        <p className="mt-8 text-center text-[13px] text-[#7d8299]">
          Extra runs on Growth are $0.04 each. Nonprofits and startups under 20 people get 50% off the first year.
        </p>
      </div>
    </section>
  );
}
