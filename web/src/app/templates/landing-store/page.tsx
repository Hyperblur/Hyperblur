import type { Metadata } from "next";
import { css } from "./styles";
import { CartProvider } from "./cart";
import { StoreNav } from "./nav";
import { StoreHero } from "./hero";
import { BenefitsBand, Categories, TrustStrip } from "./categories";
import { BestSellers } from "./bestsellers";
import { NewArrivals } from "./arrivals";
import { Story } from "./story";
import { Lookbook } from "./lookbook";
import { Reviews } from "./reviews";
import { Newsletter } from "./newsletter";
import { Visit } from "./visit";
import { Closing, Faq, StoreFooter } from "./closing";

export const metadata: Metadata = {
  title: "Haven Goods landing template",
  description:
    "A calm, tactile storefront for a home and lifestyle brand: floating product hero, live cart, colour swatches, quick view, new arrivals carousel, shoppable lookbook, reviews, newsletter offer, flagship hours and pickup booking.",
};

export default function HavenGoodsLandingPage() {
  return (
    <CartProvider>
      <div className="hbl-st-root font-sans">
        <style href="hbl-st" precedence="default">{css}</style>
        <StoreNav />
        <div>
          <StoreHero />
          <BenefitsBand />
          <TrustStrip />
          <Categories />
          <BestSellers />
          <NewArrivals />
          <Story />
          <Lookbook />
          <Reviews />
          <Newsletter />
          <Visit />
          <Faq />
          <Closing />
        </div>
        <StoreFooter />
      </div>
    </CartProvider>
  );
}
