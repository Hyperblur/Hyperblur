import type { Metadata } from "next";
import { css } from "./styles";
import { OrderBar, OrderProvider } from "./order";
import { BurgerNav } from "./nav";
import { BurgerHero } from "./hero";
import { FullMenu, Popular } from "./menu";
import { Combos, HowItWorks, Reviews, Ticker, Trust } from "./sections";
import { Visit } from "./visit";
import { BurgerFooter, Closing, Faq } from "./closing";

export const metadata: Metadata = {
  title: "Smash & Co. landing template",
  description:
    "A loud, dark landing page for a smash burger joint: quick-order hero, specials ticker, popular items carousel, full menu with tabs and a working order drawer, combos, how it works, three locations with hours and a map, reviews, FAQ and footer.",
};

export default function SmashAndCoLandingPage() {
  return (
    <OrderProvider>
      <div className="hbl-bg-root font-sans">
        <style href="hbl-bg" precedence="default">{css}</style>
        <BurgerNav />
        <div>
          <BurgerHero />
          <Ticker />
          <Trust />
          <Popular />
          <FullMenu />
          <Combos />
          <HowItWorks />
          <Visit />
          <Reviews />
          <Faq />
          <Closing />
        </div>
        <BurgerFooter />
        <OrderBar />
      </div>
    </OrderProvider>
  );
}
