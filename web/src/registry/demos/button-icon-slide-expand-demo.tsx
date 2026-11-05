"use client";

import * as React from "react";
import { ButtonIconSlideExpand } from "@/registry/hyperblur/button-icon-slide-expand";

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const actions = [
  {
    label: "Share board",
    icon: (
      <svg {...stroke}>
        <path d="M4 12v7h16v-7" />
        <path d="M12 16V4" />
        <path d="M7.5 8.5L12 4l4.5 4.5" />
      </svg>
    ),
  },
  {
    label: "Download all",
    icon: (
      <svg {...stroke}>
        <path d="M12 4v12" />
        <path d="M7.5 11.5L12 16l4.5-4.5" />
        <path d="M5 20h14" />
      </svg>
    ),
  },
  {
    label: "Save to library",
    icon: (
      <svg {...stroke}>
        <path d="M7 4h10v16l-5-3.5L7 20z" />
      </svg>
    ),
  },
];

export function ButtonIconSlideExpandDemo() {
  const [active, setActive] = React.useState(0);
  const paused = React.useRef(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (paused.current) return;
      setActive((n) => (n + 1) % 4);
    }, 1900);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-4 rounded-2xl border border-[#262626] bg-[#0f0f0f] p-4 font-grotesk text-[#ededed]">
        <div className="flex items-end justify-between">
          <div>
            <p className="m-0 text-[11px] uppercase tracking-[0.14em] text-[#8f8f8f]">Moodboard</p>
            <p className="m-0 mt-1 text-lg font-semibold leading-none tracking-tight">Autumn campaign</p>
          </div>
          <span className="font-mono text-[11px] text-[#8f8f8f]">24 items</span>
        </div>
        <div
          className="flex items-center gap-2"
          onPointerEnter={() => {
            paused.current = true;
            setActive(-1);
          }}
          onPointerLeave={() => {
            paused.current = false;
          }}
        >
          {actions.map((action, i) => (
            <ButtonIconSlideExpand
              key={action.label}
              size="md"
              variant={i === 0 ? "solid" : "outline"}
              icon={action.icon}
              open={active === i}
            >
              {action.label}
            </ButtonIconSlideExpand>
          ))}
        </div>
      </div>
    </div>
  );
}
