"use client";

import * as React from "react";
import { SegmentedControl } from "@/registry/hyperblur/segmented-control";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ArrowIcon, CheckIcon } from "./icons";

const plans = [
  {
    name: "Open Gym",
    monthly: 79,
    annual: 63,
    blurb: "Your key fob, our racks. For lifters who already have a plan.",
    features: ["24/7 keyless access", "12 racks, 4 platforms, sled lane", "Member app with lift log", "Showers and lockers"],
    cta: "Start with Open Gym",
    hot: false,
  },
  {
    name: "Unlimited Classes",
    monthly: 159,
    annual: 127,
    blurb: "Every program, every day, plus everything in Open Gym.",
    features: ["Unlimited classes, all 5 programs", "Booking 7 days ahead", "Quarterly InBody scan", "1 guest pass a month", "Everything in Open Gym"],
    cta: "Claim a free week",
    hot: true,
  },
  {
    name: "Coached",
    monthly: 289,
    annual: 231,
    blurb: "A coach who writes your program and checks in every week.",
    features: ["Custom program, updated weekly", "4 private sessions a month", "Nutrition check-ins", "Video form reviews in the app", "Everything in Unlimited"],
    cta: "Book a consult",
    hot: false,
  },
];

const options = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual · save 20%" },
];

export function FitnessPlans() {
  const [cycle, setCycle] = React.useState("monthly");
  const annual = cycle === "annual";

  return (
    <section id="hbl-ft-plans" aria-labelledby="hbl-ft-plans-title" className="border-t py-24 hbl-ft-rule md:py-32">
      <div className="hbl-ft-wrap">
        <FadeInView className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="hbl-ft-kicker">Membership</p>
            <h2 id="hbl-ft-plans-title" className="hbl-ft-h2 mt-5">
              No contracts.
              <br />
              <span className="hbl-ft-lime">No excuses.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <SegmentedControl
              options={options}
              value={cycle}
              onChange={setCycle}
              color="#c8ff3d"
              aria-label="Billing cycle"
              className="hbl-ft-seg"
            />
            <p className="text-[13px] hbl-ft-muted">Pause anytime for up to 3 months. Cancel with one tap.</p>
          </div>
        </FadeInView>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {plans.map((p, i) => {
            const price = annual ? p.annual : p.monthly;
            return (
              <FadeInView key={p.name} delay={i * 0.08} className="min-w-0">
                <article className="hbl-ft-plan h-full" data-hot={p.hot ? "" : undefined}>
                  {p.hot ? <span className="hbl-ft-plan-badge">Most picked</span> : null}
                  <h3 className="font-grotesk text-2xl font-bold uppercase tracking-[-0.03em]">{p.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed hbl-ft-plan-muted">{p.blurb}</p>
                  <p className="mt-8 flex items-baseline gap-2">
                    <span key={price} className="hbl-ft-price font-mono text-[56px] leading-none tracking-[-0.05em]">
                      ${price}
                    </span>
                    <span className="text-sm hbl-ft-plan-muted">/ month</span>
                  </p>
                  <p className="mt-2 font-mono text-[12px] hbl-ft-plan-muted">
                    {annual ? `Billed $${price * 12} yearly` : "Billed monthly · no sign-up fee"}
                  </p>
                  <ul className="mt-8 space-y-3 text-[14px]">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="hbl-ft-plan-check">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#hbl-ft-claim" className={`${p.hot ? "hbl-ft-btn-dark" : "hbl-ft-btn-ghost"} mt-10 w-full justify-center`}>
                    {p.cta}
                    <ArrowIcon className="h-4 w-4" />
                  </a>
                </article>
              </FadeInView>
            );
          })}
        </div>
        <p className="mt-6 text-center text-[13px] hbl-ft-muted">
          Students, first responders and teachers get 15% off any plan. Drop-in class $28.
        </p>
      </div>
    </section>
  );
}
