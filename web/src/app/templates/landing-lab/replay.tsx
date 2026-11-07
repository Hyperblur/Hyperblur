"use client";

import * as React from "react";

export function Replay({ children }: { children: React.ReactNode }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const on = () => setN((v) => v + 1);
    window.addEventListener("hbl-lb-booted", on);
    return () => window.removeEventListener("hbl-lb-booted", on);
  }, []);
  return <React.Fragment key={n}>{children}</React.Fragment>;
}
