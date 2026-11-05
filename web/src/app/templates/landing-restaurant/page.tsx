import type { Metadata } from "next";
import { RestaurantStyles } from "./styles";
import { Hero, Nav } from "./hero";
import { DishBand, Press, Story } from "./story";
import { Menu } from "./menu";
import { Events, Room } from "./room";
import { Reviews, Tasting } from "./social";
import { Visit } from "./visit";
import { Faq, FinalCta, Footer } from "./closing";

export const metadata: Metadata = {
  title: "Ember & Olive landing template",
  description:
    "A warm, editorial landing page for a wood-fire Mediterranean restaurant: live reservation card, animated hearth with rising embers, tabbed menu board, room gallery, tasting menus, opening hours and a street map.",
};

export default function EmberOliveLandingTemplatePage() {
  return (
    <div className="hbl-rs">
      <RestaurantStyles />
      <Nav />
      <Hero />
      <Press />
      <Story />
      <DishBand />
      <Menu />
      <Room />
      <Events />
      <Reviews />
      <Tasting />
      <Visit />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
