import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { RatingReviewCard } from "@/registry/hyperblur/rating-review-card";
import { MapDirectionsCard } from "@/registry/hyperblur/map-directions-card";
import { QrGenerator } from "@/registry/hyperblur/qr-generator";
import { LinkInBioCard } from "@/registry/hyperblur/link-in-bio-card";

export const ordDDemos: Record<string, ReactNode> = {
  "rating-review-card": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-sans">
        <RatingReviewCard quote={null} source="Corner Kitchen reviews" />
      </div>
    </div>
  ),
  "map-directions-card": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-sans">
        <MapDirectionsCard />
      </div>
    </div>
  ),
  "qr-generator": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-grotesk">
        <QrGenerator />
      </div>
    </div>
  ),
  "link-in-bio-card": thumb(<LinkInBioCard />, { y: 16 }),
};
