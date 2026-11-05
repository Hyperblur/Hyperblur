import type { ReactNode } from "react";
import { ButtonSpecular } from "@/registry/hyperblur/button-specular";
import { CardBorderGlow } from "@/registry/hyperblur/card-border-glow";
import { BentoPointerGlow } from "@/registry/hyperblur/bento-pointer-glow";
import { NavGooeyDemo } from "@/registry/demos/nav-gooey-demo";
import { SliderElasticDemo } from "@/registry/demos/slider-elastic-demo";

const crew = [
  { initials: "MR", name: "Maya Rao", color: "#2f7bff" },
  { initials: "LK", name: "Leo Kim", color: "#8b5cf6" },
  { initials: "SA", name: "Sana Ali", color: "#14b8a6" },
];

export const qvDemos: Record<string, ReactNode> = {
  "button-specular": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        className="box-border flex h-[184px] w-full max-w-[340px] flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl border border-[#262626] text-center"
        style={{ background: "radial-gradient(120% 90% at 50% 0%, #1b2438 0%, #0e0e10 64%)" }}
      >
        <div>
          <p className="font-sans m-0 text-[32px] leading-8 text-[#ededed]">Studio plan</p>
          <p className="font-grotesk m-0 mt-1.5 text-[12px] text-[#8f8f8f]">Unlimited projects, one calm price.</p>
        </div>
        <div className="flex items-center gap-2 text-[12px]">
          <ButtonSpecular tone="blue" style={{ padding: "0.8em 1.3em" }}>Start trial</ButtonSpecular>
          <ButtonSpecular tone="chrome" style={{ padding: "0.8em 1.3em" }}>Compare</ButtonSpecular>
          <ButtonSpecular tone="glass" style={{ padding: "0.8em 1.3em" }}>Demo</ButtonSpecular>
        </div>
      </div>
    </div>
  ),
  "card-border-glow": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[290px]">
        <CardBorderGlow>
          <div className="box-border flex flex-col gap-2.5 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-[#1b2438] text-[#7fb3ff]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
                  </svg>
                </span>
                <span className="font-grotesk text-[13px] font-semibold">Edge network</span>
              </div>
              <span className="font-mono flex items-center gap-1.5 rounded-full bg-[#10261a] px-2 py-0.5 text-[10px] text-[#4ade80]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                Live
              </span>
            </div>
            <div>
              <p className="font-mono m-0 text-[34px] font-medium leading-9 tracking-tight">99.98%</p>
              <p className="font-grotesk m-0 mt-0.5 text-[12px] text-[#8f8f8f]">uptime over the last 30 days</p>
            </div>
            <div className="font-mono flex gap-1.5 text-[10px] text-[#a1a1a1]">
              {["fra1", "iad1", "sin1", "syd1"].map((r) => (
                <span key={r} className="rounded-md border border-[#262626] bg-[#171717] px-1.5 py-0.5">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </CardBorderGlow>
      </div>
    </div>
  ),
  "bento-pointer-glow": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <BentoPointerGlow
          rowHeight={90}
          gap={6}
          radius={14}
          glowSize={160}
          items={[
            { id: "traffic", title: "Traffic", description: "Visits this week", caption: "Up 18% on last week", visual: "bars", size: "wide" },
            {
              id: "crew",
              title: "Crew",
              description: "Online now",
              caption: "Three editing live",
              size: "tall",
              visual: (
                <div className="flex w-full flex-col gap-2 pb-0.5">
                  {crew.map((p) => (
                    <div key={p.initials} className="flex items-center gap-2">
                      <span
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9px] font-bold text-white"
                        style={{ background: p.color }}
                      >
                        {p.initials}
                      </span>
                      <span className="truncate text-[11px] text-[#cfcfcf]">{p.name}</span>
                    </div>
                  ))}
                </div>
              ),
            },
            { id: "alerts", title: "Alerts", description: "Rules enabled", caption: "Three of four on", visual: "toggles" },
            { id: "latency", title: "Latency", description: "p95 response", caption: "112 ms, down 9%", visual: "spark" },
          ]}
        />
      </div>
    </div>
  ),
  "nav-gooey": <NavGooeyDemo />,
  "slider-elastic": <SliderElasticDemo />,
};
