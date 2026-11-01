"use client";

import * as React from "react";
import { PageTransition } from "@/registry/hyperblur/page-transition";

const pages = [
  { name: "Overview", bg: "bg-gradient-to-br from-[#1b2a6b] to-[#2f7bff]" },
  { name: "Pricing", bg: "bg-gradient-to-br from-[#5b1b6b] to-[#ff2fa0]" },
  { name: "Changelog", bg: "bg-gradient-to-br from-[#0f4b52] to-[#19c3f5]" },
];

export function PageTransitionDemo() {
  const [step, setStep] = React.useState(0);
  const page = pages[step % pages.length];

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-3">
      <PageTransition routeKey={page.name} variant="slide-left" className="w-full rounded-xl">
        <div className={`${page.bg} flex h-24 items-center justify-center rounded-xl border border-white/20`}>
          <span className="font-display text-2xl font-bold uppercase tracking-wide">{page.name}</span>
        </div>
      </PageTransition>
      <button
        type="button"
        className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        onClick={() => setStep((s) => s + 1)}
      >
        Next page
      </button>
    </div>
  );
}
