import type { Metadata } from "next";
import { SalonStyles } from "./styles";
import { Hero, Nav, ServiceMarquee, TrustStrip } from "./hero";
import { Lookbook, Services, Stylists, Transformation } from "./sections";
import { Faq, FinalCta, Footer, Memberships, Products, Reviews, Visit } from "./more";

export const metadata: Metadata = {
  title: "Maison Rue landing template",
  description:
    "A fashion-forward landing page for a hair salon and barbershop: blur-in serif headline, interactive stylist booking card, services menu, before/after slider, lookbook mosaic, memberships, reviews, product shelf, opening hours and a street map.",
};

export default function MaisonRueLandingTemplatePage() {
  return (
    <div className="hbl-sl">
      <SalonStyles />
      <Nav />
      <Hero />
      <TrustStrip />
      <ServiceMarquee />
      <Services />
      <Stylists />
      <Transformation />
      <Lookbook />
      <Memberships />
      <Reviews />
      <Products />
      <Visit />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
