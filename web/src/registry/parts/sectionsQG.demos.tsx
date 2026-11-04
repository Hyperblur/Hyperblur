import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { CheckoutOnePage } from "@/registry/hyperblur/checkout-one-page";
import { CheckoutSplitSummary } from "@/registry/hyperblur/checkout-split-summary";
import { CheckoutStepperCard } from "@/registry/hyperblur/checkout-stepper-card";
import { CheckoutMobileSheet } from "@/registry/hyperblur/checkout-mobile-sheet";
import { CheckoutSubscriptionUpgrade } from "@/registry/hyperblur/checkout-subscription-upgrade";
import { CheckoutSuccessReceipt } from "@/registry/hyperblur/checkout-success-receipt";
import { CheckoutPaymentFailed } from "@/registry/hyperblur/checkout-payment-failed";
import { CheckoutBillingSettings } from "@/registry/hyperblur/checkout-billing-settings";
import { CheckoutInvoiceHistory } from "@/registry/hyperblur/checkout-invoice-history";
import { CheckoutPricingModal } from "@/registry/hyperblur/checkout-pricing-modal";

export const sectionsQGDemos: Record<string, ReactNode> = {
  "checkout-one-page": thumb(<CheckoutOnePage />),
  "checkout-split-summary": thumb(<CheckoutSplitSummary />),
  "checkout-stepper-card": thumb(<CheckoutStepperCard />),
  "checkout-mobile-sheet": thumb(<CheckoutMobileSheet />),
  "checkout-subscription-upgrade": thumb(<CheckoutSubscriptionUpgrade />),
  "checkout-success-receipt": thumb(<CheckoutSuccessReceipt />),
  "checkout-payment-failed": thumb(<CheckoutPaymentFailed />),
  "checkout-billing-settings": thumb(<CheckoutBillingSettings />),
  "checkout-invoice-history": thumb(<CheckoutInvoiceHistory />),
  "checkout-pricing-modal": thumb(<CheckoutPricingModal />),
};
