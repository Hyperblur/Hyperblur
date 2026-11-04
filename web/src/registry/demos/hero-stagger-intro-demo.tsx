"use client";

import { useEffect, useState } from "react";
import { HeroStaggerIntro } from "@/registry/hyperblur/hero-stagger-intro";
import { thumb } from "@/registry/thumb";

export function HeroStaggerIntroDemo() {
  const [run, setRun] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setRun((v) => v + 1), 6400);
    return () => window.clearInterval(id);
  }, []);

  return thumb(<HeroStaggerIntro replay={run} />, { scale: 0.5, width: 720, y: -26 });
}
