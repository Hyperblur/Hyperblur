import type { ReactNode } from "react";
import { MicroSlingButton } from "@/registry/hyperblur/micro-sling-button";
import { MicroDodgeField } from "@/registry/hyperblur/micro-dodge-field";
import { MicroSquishSwitch } from "@/registry/hyperblur/micro-squish-switch";
import { MicroWakeSlider } from "@/registry/hyperblur/micro-wake-slider";
import { MicroRubberSegment } from "@/registry/hyperblur/micro-rubber-segment";
import { MicroPulseHeart } from "@/registry/hyperblur/micro-pulse-heart";
import { MicroBellToggle } from "@/registry/hyperblur/micro-bell-toggle";
import { MicroCometDial } from "@/registry/hyperblur/micro-comet-dial";
import { MicroSwipeToastDemo } from "@/registry/demos/micro-swipe-toast-demo";
import { MicroSwipeRowDemo } from "@/registry/demos/micro-swipe-row-demo";

const card =
  "box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]";

const temps = Array.from({ length: 12 }, (_, i) => `${16 + i}°`);

export const qlDemos: Record<string, ReactNode> = {
  "micro-sling-button": (
    <div className="font-grotesk flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-1`}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]">release v2.4</span>
          <span className="rounded-full border border-[#2a2a2a] px-2 py-0.5 text-[10px] text-[#a1a1a1]">12 checks passed</span>
        </div>
        <p className="m-0 mt-1 text-[17px] font-semibold leading-6">Ready to go out?</p>
        <p className="m-0 text-xs text-[#8f8f8f]">Pull the band back, then let go.</p>
        <MicroSlingButton>Ship it</MicroSlingButton>
      </div>
    </div>
  ),
  "micro-dodge-field": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3`}>
        <div>
          <p className="font-serif m-0 text-[26px] italic leading-7">Join the waitlist</p>
          <p className="m-0 mt-1 text-xs text-[#8f8f8f]">We open the doors to 200 studios every Monday.</p>
        </div>
        <MicroDodgeField label="Work email" type="email" placeholder="you@studio.co" autoComplete="off" />
      </div>
    </div>
  ),
  "micro-swipe-toast": <MicroSwipeToastDemo />,
  "micro-swipe-row": <MicroSwipeRowDemo />,
  "micro-squish-switch": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-0 py-2`}>
        {[
          { label: "Airplane mode", on: false, idle: true },
          { label: "Wi-Fi", on: true, idle: false },
          { label: "Bluetooth", on: true, idle: false },
        ].map((r, i) => (
          <div
            key={r.label}
            className={`flex items-center justify-between py-2 ${i > 0 ? "border-t border-[#1f1f1f]" : ""}`}
          >
            <div>
              <p className="m-0 text-[13px] font-medium">{r.label}</p>
              <p className="m-0 font-mono text-[10px] text-[#6f6f6f]">{r.on ? "connected" : "off"}</p>
            </div>
            <MicroSquishSwitch size={32} defaultChecked={r.on} idle={r.idle} aria-label={r.label} />
          </div>
        ))}
      </div>
    </div>
  ),
  "micro-wake-slider": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2`}>
        <div className="flex items-center gap-3">
          <div
            className="h-11 w-11 shrink-0 rounded-lg"
            style={{
              background:
                "radial-gradient(70% 70% at 25% 25%, #ff9ed2 0%, transparent 65%), radial-gradient(80% 80% at 80% 90%, #2f7bff 0%, transparent 70%), #20103a",
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="font-display m-0 truncate text-sm font-semibold tracking-wide">Night Drive</p>
            <p className="m-0 truncate text-xs text-[#8f8f8f]">Aria Vale / Neon Static</p>
          </div>
          <span className="font-mono text-[11px] text-[#6f6f6f]">2:48</span>
        </div>
        <MicroWakeSlider label="Vol" unit="%" defaultValue={62} />
        <MicroWakeSlider label="Mix" unit="%" defaultValue={35} idle={false} />
      </div>
    </div>
  ),
  "micro-rubber-segment": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2`}>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono m-0 text-[10px] uppercase tracking-[0.1em] text-[#8f8f8f]">Revenue</p>
            <p className="font-serif m-0 text-[34px] leading-9">$48,210</p>
          </div>
          <span className="font-mono rounded-full bg-[#10261a] px-2 py-0.5 text-[11px] text-[#4ade80]">+12.4%</span>
        </div>
        <svg viewBox="0 0 300 28" className="h-7 w-full" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 22 C30 20 40 10 70 12 S110 24 140 16 S190 2 220 8 S270 14 300 4"
            fill="none"
            stroke="#2f7bff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <MicroRubberSegment
          aria-label="Range"
          defaultValue="30d"
          options={[
            { value: "7d", label: "7D" },
            { value: "30d", label: "30D" },
            { value: "90d", label: "90D" },
            { value: "1y", label: "1Y" },
          ]}
        />
      </div>
    </div>
  ),
  "micro-pulse-heart": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2.5`}>
        <div
          className="h-[72px] shrink-0 rounded-xl"
          style={{
            background:
              "radial-gradient(60% 90% at 20% 110%, #e8b04a 0%, transparent 60%), radial-gradient(70% 90% at 85% -10%, #f4e3a6 0%, transparent 55%), linear-gradient(160deg, #6b4a1f, #2a1a0a)",
          }}
        />
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-serif m-0 truncate text-[22px] italic leading-6">Lemon tagliatelle</p>
            <p className="font-grotesk m-0 text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]">35 min / serves 2</p>
          </div>
          <MicroPulseHeart size={44} label="Save recipe" />
        </div>
      </div>
    </div>
  ),
  "micro-bell-toggle": (
    <div className="font-grotesk flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3`}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#8f8f8f]">Alerts</span>
          <span className="font-mono text-[11px] text-[#6f6f6f]">prod / eu-west</span>
        </div>
        <div className="flex items-center gap-3.5">
          <MicroBellToggle size={52} label="Deploy alerts" />
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[15px] font-semibold">Deploy alerts</p>
            <p className="m-0 text-xs text-[#8f8f8f]">Ping me when a build fails or a rollback starts.</p>
          </div>
        </div>
        <div className="flex gap-2 text-[11px] text-[#a1a1a1]">
          <span className="rounded-full border border-[#2a2a2a] px-2.5 py-1">3 sent today</span>
          <span className="rounded-full border border-[#2a2a2a] px-2.5 py-1">Quiet 22:00 - 07:00</span>
        </div>
      </div>
    </div>
  ),
  "micro-comet-dial": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} flex-row items-center justify-between gap-3 py-3`}>
        <div className="min-w-0">
          <p className="font-mono m-0 text-[10px] uppercase tracking-[0.1em] text-[#8f8f8f]">Thermostat</p>
          <p className="font-serif m-0 text-[28px] italic leading-8">Living room</p>
          <p className="font-grotesk m-0 mt-2 text-xs leading-4 text-[#8f8f8f]">
            Flick the dial.
            <br />
            It clicks into place.
          </p>
        </div>
        <MicroCometDial size={146} detents={12} defaultValue={5} labels={temps} label="Target temperature" />
      </div>
    </div>
  ),
};
