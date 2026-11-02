import type { Metadata } from "next";
import Link from "next/link";
import { css } from "./styles";
import { Hero } from "./hero";
import { Proof } from "./proof";
import { Bento } from "./bento";
import { Workflows } from "./workflows";
import { Approvals } from "./approvals";
import { Integrations } from "./integrations";
import { Stats } from "./stats";
import { Testimonials } from "./testimonials";
import { Pricing } from "./pricing";
import { Faq } from "./faq";
import { Cta } from "./cta";
import { Footer } from "./footer";

export const metadata: Metadata = {
  title: "Cadence landing template",
  description:
    "A landing page for an agent platform with a live agent mockup, approval flows, integration beams and motion throughout, built from Hyperblur components.",
};

export default function LandingAiTemplate() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <p className="text-xs text-muted">Template · Cadence · Agent platform landing</p>
          <Link href="/templates" className="hb-btn hb-btn-ghost hb-btn-sm">
            All templates
          </Link>
        </div>
      </div>
      <div className="hbl-ai">
        <style href="hbl-ai" precedence="default">
          {css}
        </style>
        <Hero />
        <Proof />
        <Bento />
        <Workflows />
        <Stats />
        <Approvals />
        <Integrations />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
        <Footer />
      </div>
    </>
  );
}
