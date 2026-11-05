import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { ContactBookingCalendar } from "@/registry/hyperblur/contact-booking-calendar";
import { ContactChatWidget } from "@/registry/hyperblur/contact-chat-widget";
import { FooterNewsletterFirst } from "@/registry/hyperblur/footer-newsletter-first";
import { FooterAppDownload } from "@/registry/hyperblur/footer-app-download";
import { CtaRotatingBand } from "@/registry/hyperblur/cta-rotating-band";
import { CtaStickyDock } from "@/registry/hyperblur/cta-sticky-dock";
import { FaqChatThread } from "@/registry/hyperblur/faq-chat-thread";
import { FaqFlipCards } from "@/registry/hyperblur/faq-flip-cards";
import { PricingSeatsSlider } from "@/registry/hyperblur/pricing-seats-slider";
import { PricingFeatureTable } from "@/registry/hyperblur/pricing-feature-table";
import { StatsMosaic } from "@/registry/hyperblur/stats-mosaic";
import { StatsBeforeAfter } from "@/registry/hyperblur/stats-before-after";

export const sectionsYIDemos: Record<string, ReactNode> = {
  "contact-booking-calendar": thumb(<ContactBookingCalendar />),
  "contact-chat-widget": thumb(<ContactChatWidget />),
  "footer-newsletter-first": thumb(<FooterNewsletterFirst />),
  "footer-app-download": thumb(<FooterAppDownload />),
  "cta-rotating-band": thumb(<CtaRotatingBand />),
  "cta-sticky-dock": thumb(<CtaStickyDock />, { y: 100 }),
  "faq-chat-thread": thumb(<FaqChatThread />),
  "faq-flip-cards": thumb(<FaqFlipCards defaultFlipped={[1]} />),
  "pricing-seats-slider": thumb(<PricingSeatsSlider />),
  "pricing-feature-table": thumb(<PricingFeatureTable />),
  "stats-mosaic": thumb(<StatsMosaic />),
  "stats-before-after": thumb(<StatsBeforeAfter />),
};
