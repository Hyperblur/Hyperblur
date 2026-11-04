"use client";

import * as React from "react";
import { PaySubscriptionToggle, type PayInterval } from "@/registry/hyperblur/pay-subscription-toggle";

export function PaySubscriptionToggleDemo() {
  const [interval, setIntervalValue] = React.useState<PayInterval>("yearly");
  const touched = React.useRef(false);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (touched.current) return;
      setIntervalValue((v) => (v === "yearly" ? "monthly" : "yearly"));
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="font-grotesk w-full max-w-[368px]" style={{ zoom: 0.92 }}>
      <PaySubscriptionToggle
        name="Studio"
        monthlyPrice={15}
        yearlyPrice={144}
        features={["Unlimited projects", "Priority support", "Team seats", "PDF export"]}
        interval={interval}
        onChange={(next) => {
          touched.current = true;
          setIntervalValue(next);
        }}
      />
    </div>
  );
}
