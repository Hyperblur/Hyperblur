import type { Metadata } from "next";
import { css } from "./styles";
import { AgencyNav } from "./nav";
import { AgencyHero } from "./hero";
import { VelocityBand } from "./bands";
import { AgencyStudio } from "./studio";
import { AgencyWork } from "./work";
import { AgencyServices } from "./services";
import { AgencyProcess } from "./process";
import { AgencyStats } from "./stats";
import { AgencyTestimonial } from "./testimonial";
import { AgencyFaq } from "./faq";
import { AgencyContact } from "./contact";
import { AgencyFooter } from "./footer";

export const metadata: Metadata = {
  title: "Atlas & Oak landing template",
  description:
    "An editorial landing page for an independent brand and web studio: huge type, selected work with pixel reveals, services, process, awards and a magnetic contact call to action.",
};

export default function AtlasOakLandingPage() {
  return (
    <div className="hbl-ag-root font-sans">
      <style href="hbl-ag" precedence="default">{css}</style>
      <AgencyNav />
      <div>
        <AgencyHero />
        <VelocityBand text="Identity — Websites — Motion — Art direction — Naming — " />
        <AgencyStudio />
        <AgencyWork />
        <VelocityBand text="Make it memorable — Make it yours — " direction={-1} accent />
        <AgencyServices />
        <AgencyProcess />
        <AgencyStats />
        <AgencyTestimonial />
        <VelocityBand text="Atlas & Oak — Lisbon — Brooklyn — " outline />
        <AgencyFaq />
        <AgencyContact />
      </div>
      <AgencyFooter />
    </div>
  );
}
