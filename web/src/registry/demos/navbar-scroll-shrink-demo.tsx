"use client";

import * as React from "react";
import { NavbarScrollShrink } from "@/registry/hyperblur/navbar-scroll-shrink";

export function NavbarScrollShrinkDemo() {
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 2600);
    return () => window.clearInterval(id);
  }, []);

  const compact = tick % 2 === 1;
  return <NavbarScrollShrink compact={compact} progress={compact ? 0.46 : 0.08} />;
}
