"use client";

import * as React from "react";
import { HudStatusBar } from "@/registry/hyperblur/hud-status-bar";

const scenes = [
  { title: "Ion Drift", code: "EXP 014", stack: "WebGL", status: "Live", glow: "#ff4d4d" },
  { title: "Signal Garden", code: "EXP 027", stack: "Audio", status: "Beta", glow: "#ff8a4d" },
  { title: "Night Grid", code: "EXP 033", stack: "Shader", status: "Live", glow: "#ff4d8a" },
];

export function HudStatusBarDemo() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % scenes.length), 2600);
    return () => window.clearInterval(id);
  }, []);
  const s = scenes[i];
  return (
    <div className="box-border flex w-full max-w-[340px] flex-col overflow-hidden border border-white/[0.12] bg-[#0a0a0a]">
      <div
        className="relative flex h-[118px] flex-col justify-end p-3.5 transition-[background] duration-700"
        style={{
          background: `radial-gradient(80% 120% at 85% 110%, ${s.glow}38, transparent 60%), radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1.2px) 0 0 / 12px 12px`,
        }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#8f8f8f]">Now viewing</span>
        <span key={s.title} className="font-serif text-[30px] italic leading-[1.05] text-[#ededed]">
          {s.title}
        </span>
      </div>
      <HudStatusBar
        title={s.title}
        code={s.code}
        items={[
          { label: "Stack", value: s.stack },
          { label: "Status", value: s.status },
        ]}
        hints={[{ keys: "← →", label: "Browse" }]}
      />
    </div>
  );
}
