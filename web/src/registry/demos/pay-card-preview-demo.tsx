"use client";

import * as React from "react";
import { PayCardPreview, type PayCardField } from "@/registry/hyperblur/pay-card-preview";

const steps: (PayCardField | null)[] = ["number", "name", "expiry", "cvc", "cvc", null];

export function PayCardPreviewDemo() {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => setStep((s) => (s + 1) % steps.length), 1700);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="font-grotesk w-[268px]">
      <PayCardPreview
        number="4242 4242 4242 4242"
        name="Alex Morgan"
        expiry="08/29"
        cvc="318"
        bank="Northvale"
        theme="midnight"
        network="arc"
        focusField={steps[step]}
      />
    </div>
  );
}
