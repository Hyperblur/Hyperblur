"use client";

import * as React from "react";
import { ButtonSplitHalves } from "@/registry/hyperblur/button-split-halves";

const arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export function ButtonSplitHalvesDemo() {
  const [open, setOpen] = React.useState(false);
  const paused = React.useRef(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (paused.current) return;
      setOpen((value) => !value);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col items-start gap-3 rounded-2xl border border-[#262626] bg-[#0f0f0f] p-5 font-serif text-[#ededed]">
        <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#8f8f8f]">Careers at Lumen</span>
        <p className="m-0 text-[28px] leading-[1.05] tracking-tight">
          Build the quiet <em className="text-[#7fb3ff]">side</em> of the web.
        </p>
        <div
          className="font-sans"
          onPointerEnter={() => {
            paused.current = true;
            setOpen(false);
          }}
          onPointerLeave={() => {
            paused.current = false;
          }}
        >
          <ButtonSplitHalves reveal="12 open roles" icon={arrow} axis="y" variant="light" size="md" open={open}>
            See openings
          </ButtonSplitHalves>
        </div>
      </div>
    </div>
  );
}
