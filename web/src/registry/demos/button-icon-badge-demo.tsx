"use client";

import * as React from "react";
import { ButtonIconBadge } from "@/registry/hyperblur/button-icon-badge";

export function ButtonIconBadgeDemo() {
  const [count, setCount] = React.useState(3);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setCount((c) => (c >= 14 ? c : c + 1));
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return <ButtonIconBadge count={count} onCountChange={setCount} ringColor="#0f0f0f" />;
}
