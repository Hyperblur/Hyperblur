import type { Metadata } from "next";
import { css } from "./styles";
import { Nav } from "./nav";
import { Hero } from "./hero";
import { Proof } from "./proof";
import { Accept } from "./accept";
import { Payouts } from "./payouts";
import { Treasury } from "./treasury";
import { Developers } from "./developers";
import { Testimonials } from "./testimonials";
import { Pricing } from "./pricing";
import { Cta, Faq, Footer } from "./closing";

export const metadata: Metadata = {
  title: "Meridian landing template",
  description:
    "A fintech landing page for Meridian, payments and treasury infrastructure for global marketplaces, built from Hyperblur components: mesh gradient hero, tilting payment cards, live treasury console, payout route map and a transparent fee table.",
};

export default function LandingFintechPage() {
  return (
    <div className="hbl-fn-root">
      <style href="hbl-fn" precedence="default">
        {css}
      </style>
      <Nav />
      <div>
        <Hero />
        <Proof />
        <Accept />
        <Payouts />
        <Treasury />
        <Developers />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </div>
      <Footer />
    </div>
  );
}
