import type { Metadata } from "next";
import { css } from "./styles";
import { FitnessNav } from "./nav";
import { FitnessHero } from "./hero";
import { FitnessTrust } from "./trust";
import { FitnessSchedule } from "./schedule";
import { FitnessPrograms } from "./programs";
import { FitnessCoaches } from "./coaches";
import { FitnessResults } from "./results";
import { FitnessPlans } from "./plans";
import { FitnessReviews } from "./reviews";
import { FitnessVisit } from "./visit";
import { FitnessFaq } from "./faq";
import { FitnessClosing, FitnessFooter } from "./closing";

export const metadata: Metadata = {
  title: "Ironbloom landing template",
  description:
    "A dark, high-energy landing page for a boutique strength and conditioning club: a free-week booking card, a live weekly class timetable, programs, coaches, results, membership plans, hours and a map.",
};

export default function IronbloomLandingPage() {
  return (
    <div className="hbl-ft-root font-sans">
      <style href="hbl-ft" precedence="default">{css}</style>
      <FitnessNav />
      <div>
        <FitnessHero />
        <FitnessTrust />
        <FitnessSchedule />
        <FitnessPrograms />
        <FitnessCoaches />
        <FitnessResults />
        <FitnessPlans />
        <FitnessReviews />
        <FitnessVisit />
        <FitnessFaq />
        <FitnessClosing />
      </div>
      <FitnessFooter />
    </div>
  );
}
