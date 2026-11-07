import type { Metadata } from "next";
import { ClinicStyles } from "./styles";
import { Hero, Nav, Trust } from "./hero";
import { Results, Services } from "./services";
import { FirstVisit, Team } from "./team";
import { Faq, FinalCta, Footer, Location, Plans, Reviews } from "./closing";

export const metadata: Metadata = {
  title: "Halcyon Dental landing template",
  description:
    "A calm, premium landing page for a family and cosmetic dental clinic: interactive booking card, before and after smile slider, first-visit stepper, membership plans, opening hours and a hand-drawn map.",
};

export default function HalcyonDentalTemplatePage() {
  return (
    <div className="hbl-cl">
      <ClinicStyles />
      <Nav />
      <Hero />
      <Trust />
      <Services />
      <Results />
      <FirstVisit />
      <Team />
      <Reviews />
      <Plans />
      <Location />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
