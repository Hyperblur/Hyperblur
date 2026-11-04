import type { ReactNode } from "react";
import { PayCardForm } from "@/registry/hyperblur/pay-card-form";
import { PayMethodPicker } from "@/registry/hyperblur/pay-method-picker";
import { PaySuccessCheck } from "@/registry/hyperblur/pay-success-check";
import { PayFailedRetry } from "@/registry/hyperblur/pay-failed-retry";
import { PaySlideToPay } from "@/registry/hyperblur/pay-slide-to-pay";
import { PayOrderSummary } from "@/registry/hyperblur/pay-order-summary";
import { PayTipSelector } from "@/registry/hyperblur/pay-tip-selector";
import { PayInvoiceCard } from "@/registry/hyperblur/pay-invoice-card";
import { PayWalletBalance } from "@/registry/hyperblur/pay-wallet-balance";
import { PayCardPreviewDemo } from "@/registry/demos/pay-card-preview-demo";
import { PayCouponFieldDemo } from "@/registry/demos/pay-coupon-field-demo";
import { PaySubscriptionToggleDemo } from "@/registry/demos/pay-subscription-toggle-demo";

const methods = [
  {
    id: "card",
    label: "Card",
    description: "Instant confirmation",
    icon: "card" as const,
    badge: "Popular",
    detail: "Enter your card on the next step.",
  },
  {
    id: "bank",
    label: "Bank transfer",
    description: "1 to 2 business days",
    icon: "bank" as const,
    detail: "Pay from your bank app after checkout.",
  },
  {
    id: "wallet",
    label: "Wallet balance",
    description: "Pay from stored funds",
    icon: "wallet" as const,
    detail: "Your balance is applied first.",
  },
];

export const qfDemos: Record<string, ReactNode> = {
  "pay-card-preview": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <PayCardPreviewDemo />
    </div>
  ),
  "pay-card-form": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative h-[190px] w-[340px] overflow-hidden">
        <div className="absolute left-1/2 top-1/2 w-[560px] -translate-x-1/2 -translate-y-1/2 scale-[0.6]">
          <PayCardForm
            defaultValues={{ number: "4242424242424242", name: "Alex Morgan", expiry: "0829" }}
            submitLabel="Pay $48.00"
            theme="midnight"
          />
        </div>
      </div>
    </div>
  ),
  "pay-method-picker": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <PayMethodPicker methods={methods} defaultValue="bank" />
      </div>
    </div>
  ),
  "pay-success-check": (
    <div className="font-grotesk flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <PaySuccessCheck amount="$48.00" reference="NV-48210" message="" loop />
      </div>
    </div>
  ),
  "pay-failed-retry": (
    <div className="font-mono flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <PayFailedRetry
          title="Payment declined"
          message="Your bank did not approve this."
          reasons={["Insufficient funds", "Card expired"]}
          loop
        />
      </div>
    </div>
  ),
  "pay-slide-to-pay": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-3 rounded-2xl border border-[#262626] bg-[#0f0f0f] p-4 text-left text-[#ededed]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display m-0 text-[15px] font-bold uppercase tracking-[0.12em]">Fernhill Plants</p>
            <p className="m-0 text-xs text-[#8f8f8f]">Boston fern, clay pot, soil mix</p>
          </div>
          <p className="m-0 text-xl font-semibold tabular-nums">$128.40</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#a1a1a1]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3ddc97]" />
          Ships Thursday, free returns for 30 days
        </div>
        <PaySlideToPay label="Slide to pay" confirmLabel="Payment sent" amount="$128.40" />
      </div>
    </div>
  ),
  "pay-order-summary": (
    <div className="font-grotesk flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[378px]" style={{ zoom: 0.9 }}>
        <PayOrderSummary
          items={[
            { id: "mug", name: "Ceramic mug", detail: "Matte sand", price: 1800, quantity: 2, swatch: "#d9b98c" },
            { id: "apron", name: "Linen apron", detail: "Olive, one size", price: 4200, quantity: 1, swatch: "#6f8a5b" },
          ]}
          discount={780}
          discountLabel="Code SAVE10"
          defaultOpen
        />
      </div>
    </div>
  ),
  "pay-tip-selector": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <PayTipSelector subtotal={4200} defaultPercent={15} />
      </div>
    </div>
  ),
  "pay-coupon-field": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <PayCouponFieldDemo />
    </div>
  ),
  "pay-subscription-toggle": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <PaySubscriptionToggleDemo />
    </div>
  ),
  "pay-invoice-card": (
    <div className="font-mono flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[378px]" style={{ zoom: 0.9 }}>
        <PayInvoiceCard
          number="INV-2041"
          status="due"
          billedTo="Orchard Studio"
          dueDate="Nov 11"
          items={[
            { name: "Brand identity sprint", quantity: 1, price: 240000 },
            { name: "Illustration set", quantity: 6, price: 18000 },
          ]}
        />
      </div>
    </div>
  ),
  "pay-wallet-balance": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[378px]" style={{ zoom: 0.9 }}>
        <PayWalletBalance maxActivity={2} />
      </div>
    </div>
  ),
};
