"use client";

import { useState } from "react";
import { Ico, icons } from "./icons";

const plans = [
  {
    name: "Essential",
    who: "For one adult who wants the basics covered",
    monthly: 29,
    yearly: 290,
    perks: [
      "2 exams and hygienist cleans a year",
      "All routine X-rays",
      "10% off every other treatment",
      "Priority online booking",
    ],
  },
  {
    name: "Complete",
    who: "Our most chosen plan for adults",
    monthly: 45,
    yearly: 450,
    featured: true,
    perks: [
      "Everything in Essential",
      "1 emergency exam a year, any day",
      "20% off fillings, crowns and implants",
      "Take-home whitening touch-up kit",
      "Free aligner consult and 3D scan",
    ],
  },
  {
    name: "Family",
    who: "Up to 4 people at one address",
    monthly: 119,
    yearly: 1190,
    perks: [
      "Complete for every family member",
      "Sealants and fluoride for kids",
      "Back-to-back appointments",
      "One shared account and invoice",
    ],
  },
];

export function PlanCards() {
  const [yearly, setYearly] = useState(false);
  return (
    <>
      <div className="hbl-cl-plan-toggle" role="radiogroup" aria-label="Billing period">
        <button type="button" role="radio" aria-checked={!yearly} onClick={() => setYearly(false)}>
          Monthly
        </button>
        <button type="button" role="radio" aria-checked={yearly} onClick={() => setYearly(true)}>
          Yearly <span>2 months free</span>
        </button>
      </div>
      <div className="hbl-cl-plan-grid">
        {plans.map((p) => (
          <article key={p.name} className="hbl-cl-plan" data-featured={p.featured ? "true" : undefined}>
            {p.featured && <span className="hbl-cl-plan-tag">Most chosen</span>}
            <h3>{p.name}</h3>
            <p className="hbl-cl-plan-who">{p.who}</p>
            <p className="hbl-cl-plan-price">
              <b>${yearly ? p.yearly.toLocaleString("en-US") : p.monthly}</b>
              <span>{yearly ? "/ year" : "/ month"}</span>
            </p>
            <p className="hbl-cl-plan-save">
              {yearly ? `Saves $${(p.monthly * 12 - p.yearly).toLocaleString("en-US")} a year` : "Cancel anytime, no lock-in"}
            </p>
            <a href="#book" className={p.featured ? "hbl-cl-btn hbl-cl-btn-coral" : "hbl-cl-btn hbl-cl-btn-line"}>
              Join and book
            </a>
            <ul>
              {p.perks.map((perk) => (
                <li key={perk}>
                  <Ico size={16} stroke={2.2}>{icons.check}</Ico>
                  {perk}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
