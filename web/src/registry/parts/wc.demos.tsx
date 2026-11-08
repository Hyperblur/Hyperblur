import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { FooterPointerWordmark } from "@/registry/hyperblur/footer-pointer-wordmark";
import { FooterNewsletterGroups } from "@/registry/hyperblur/footer-newsletter-groups";
import { FooterSingleLine } from "@/registry/hyperblur/footer-single-line";
import { FooterSitemapStatus } from "@/registry/hyperblur/footer-sitemap-status";
import { CtaMagneticOrb } from "@/registry/hyperblur/cta-magnetic-orb";
import { CtaLivePreviewForm } from "@/registry/hyperblur/cta-live-preview-form";
import { CtaBenefitPlane } from "@/registry/hyperblur/cta-benefit-plane";
import { CtaTerminalInstall } from "@/registry/hyperblur/cta-terminal-install";
import { FaqTopicIcons } from "@/registry/hyperblur/faq-topic-icons";
import { FaqScrollIndex } from "@/registry/hyperblur/faq-scroll-index";
import { FaqBranchingChat } from "@/registry/hyperblur/faq-branching-chat";
import { FaqCategoryDeck } from "@/registry/hyperblur/faq-category-deck";

const singleLineScene = (
  <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 416, background: "#f7f5ef" }}>
    <div style={{ padding: "0 40px 44px", color: "#141414" }}>
      <p style={{ margin: 0, color: "#77746c", fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase" }}>Next project</p>
      <p style={{ margin: "10px 0 0", fontFamily: "var(--font-grotesk), sans-serif", fontSize: 54, fontWeight: 600, lineHeight: 1, letterSpacing: "-.04em" }}>
        Harbor &amp; Pine, a hotel identity
      </p>
    </div>
    <FooterSingleLine />
  </div>
);

export const wcDemos: Record<string, ReactNode> = {
  "footer-pointer-wordmark": thumb(<FooterPointerWordmark />),
  "footer-newsletter-groups": thumb(<FooterNewsletterGroups />),
  "footer-single-line": thumb(singleLineScene, { scale: 0.5, width: 720 }),
  "footer-sitemap-status": thumb(<FooterSitemapStatus />),
  "cta-magnetic-orb": thumb(<CtaMagneticOrb />),
  "cta-live-preview-form": thumb(<CtaLivePreviewForm defaultEmail="maya@northwind.com" />, { y: 40 }),
  "cta-benefit-plane": thumb(<CtaBenefitPlane />),
  "cta-terminal-install": thumb(<CtaTerminalInstall autoPlay={false} />, { y: 30 }),
  "faq-topic-icons": thumb(<FaqTopicIcons />),
  "faq-scroll-index": thumb(<FaqScrollIndex />),
  "faq-branching-chat": thumb(<FaqBranchingChat />, { y: 80 }),
  "faq-category-deck": thumb(<FaqCategoryDeck />),
};
