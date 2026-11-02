import type { Metadata } from "next";
import { FernlyStyles } from "./styles";
import { Hero, Nav } from "./hero";
import { Bento, Proof, Splits } from "./features";
import { Community, Plants, Reviews } from "./social";
import { Faq, FinalCta, Footer, Pricing } from "./closing";

export const metadata: Metadata = {
  title: "Fernly landing template",
  description:
    "A warm, light landing page for a houseplant care app: floating phone mockups, rotating serif headline, flip-card plant carousel, community proof and playful micro-interactions.",
};

export default function FernlyLandingTemplatePage() {
  return (
    <div className="hbl-mb">
      <FernlyStyles />
      <Nav />
      <Hero />
      <Proof />
      <Bento />
      <Splits />
      <Plants />
      <Community />
      <Reviews />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
