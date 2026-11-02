import type { Metadata } from "next";
import Link from "next/link";
import { css } from "./styles";
import { Nav } from "./nav";
import { Hero } from "./hero";
import { Proof, VelocityBand } from "./proof";
import { Bento } from "./bento";
import { Commands } from "./commands";
import { Benchmarks } from "./benchmarks";
import { Integrations } from "./integrations";
import { Testimonials } from "./testimonials";
import { Pricing } from "./pricing";
import { Cta, Faq, Footer } from "./closing";

export const metadata: Metadata = {
  title: "Forge landing template",
  description:
    "A developer tool landing page for a TypeScript build and deploy CLI: a live terminal deploy, command palette, benchmarks and pricing, built from Hyperblur components.",
};

export default function LandingDevtoolPage() {
  return (
    <div className="hbl-dv">
      <style href="hbl-dv" precedence="default">{css}</style>
      <div className="border-b border-white/10 bg-[#0e0e0f]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <p className="font-mono text-[11.5px] text-[#a3a39b]">Template · Developer tool landing</p>
          <Link href="/templates" className="hbl-dv-navlink text-[11.5px]">
            All templates
          </Link>
        </div>
      </div>
      <Nav />
      <Hero />
      <Proof />
      <VelocityBand />
      <Bento />
      <Commands />
      <Benchmarks />
      <Integrations />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}
