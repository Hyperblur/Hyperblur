import type { Metadata } from "next";
import { MenuStyles } from "./styles";
import { Hero, MarketBand, Nav } from "./hero";
import { Faq, FinalCta, Footer, MenuSection, Reviews, Specials, Visit } from "./sections";

export const metadata: Metadata = {
  title: "Verde landing template",
  description:
    "A menu-first restaurant site: lunch, dinner, drinks and kids menus with illustrated dishes, dietary filters, allergen info on every plate, a scroll-spy section bar, a live reservation card, opening hours and a street map.",
};

export default function VerdeLandingTemplatePage() {
  return (
    <div className="hbl-mn">
      <MenuStyles />
      <Nav />
      <Hero />
      <MarketBand />
      <MenuSection />
      <Specials />
      <Reviews />
      <Visit />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
