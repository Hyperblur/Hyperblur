import type { ReactNode } from "react";
import { CurtainBlinds } from "@/registry/hyperblur/curtain-blinds";
import { CurtainClipWipe } from "@/registry/hyperblur/curtain-clip-wipe";
import { CurtainDoors } from "@/registry/hyperblur/curtain-doors";
import { CurtainMixed } from "@/registry/hyperblur/curtain-mixed";
import { CurtainIris } from "@/registry/hyperblur/curtain-iris";
import { CurtainStaggerWipe } from "@/registry/hyperblur/curtain-stagger-wipe";
import { CurtainWipe } from "@/registry/hyperblur/curtain-wipe";

const frame = "w-full max-w-[340px] rounded-2xl border border-[#262626] text-left text-[#ededed]";

export const qyDemos: Record<string, ReactNode> = {
  "curtain-blinds": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <CurtainBlinds trigger="view" closeAfter={1700} loop slats={9} color="#1a1d26" accent="#ffb36b" className={frame}>
        <div
          className="flex h-[176px] flex-col justify-between p-4"
          style={{
            background:
              "radial-gradient(circle at 80% 24%, rgba(255,190,120,0.65), rgba(255,190,120,0) 34%), linear-gradient(165deg, #1d2a4a 0%, #101526 58%, #07090f 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">Now showing</span>
            <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] text-white/80">PG-13</span>
          </div>
          <div>
            <p className="font-serif m-0 text-[34px] italic leading-[1.05]">Midnight Ferry</p>
            <p className="m-0 mt-1 text-[11px] text-white/65">Fri 8:40 pm · Screen 3 · 1 h 52 min</p>
          </div>
        </div>
      </CurtainBlinds>
    </div>
  ),
  "curtain-clip-wipe": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <CurtainClipWipe trigger="view" closeAfter={1600} loop direction="diagonal" color="#15161a" className={frame}>
        <div className="font-grotesk flex h-[176px] items-center gap-4 bg-[#111111] p-4">
          <div
            className="relative h-[120px] w-[110px] shrink-0 rounded-xl"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, #2f7bff 0%, #1b3f8f 38%, rgba(27,63,143,0) 62%), linear-gradient(160deg, #1c1f27, #0d0e12)",
            }}
          >
            <div className="absolute left-1/2 top-[26px] h-[58px] w-[58px] -translate-x-1/2 rounded-full border-[6px] border-[#dfe7ff]/80 border-b-transparent" />
          </div>
          <div className="min-w-0">
            <p className="m-0 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">New arrival</p>
            <p className="m-0 mt-1 text-xl font-semibold leading-6">Aero One</p>
            <p className="m-0 text-xs text-[#a1a1a1]">Wireless over-ear, 40 h battery</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-base font-semibold">$129</span>
              <span className="rounded-full bg-[#ededed] px-3 py-1 text-[11px] font-semibold text-[#0a0a0a]">Add to bag</span>
            </div>
          </div>
        </div>
      </CurtainClipWipe>
    </div>
  ),
  "curtain-doors": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <CurtainDoors trigger="view" closeAfter={1500} loop color="#2a2118" accent="#ffb36b" className={frame}>
        <div
          className="flex h-[176px] flex-col items-center justify-center gap-1 p-4 text-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 115%, rgba(255,180,100,0.55), rgba(255,180,100,0) 60%), linear-gradient(180deg, #18120c, #0b0907)",
          }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">Reservation confirmed</span>
          <p className="m-0 text-2xl font-semibold tracking-tight">The Lantern Room</p>
          <p className="m-0 text-xs text-white/65">Table for two · Sat, Nov 14 · 8:00 pm</p>
          <span className="mt-2 rounded-full border border-[#ffb36b]/40 bg-[#ffb36b]/10 px-3 py-1 text-[11px] text-[#ffd2a3]">
            Booking #LR-2081
          </span>
        </div>
      </CurtainDoors>
    </div>
  ),
  "curtain-mixed": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <CurtainMixed trigger="view" closeAfter={1500} loop rows={4} cols={7} color="#131316" className={frame}>
        <div
          className="font-mono flex h-[176px] flex-col justify-between p-4"
          style={{
            background:
              "radial-gradient(circle at 22% 30%, rgba(255,92,138,0.6), rgba(255,92,138,0) 38%), radial-gradient(circle at 78% 72%, rgba(47,123,255,0.65), rgba(47,123,255,0) 42%), radial-gradient(circle at 70% 20%, rgba(255,214,102,0.45), rgba(255,214,102,0) 30%), #0d0d12",
          }}
        >
          <div className="flex justify-between text-[10px] uppercase tracking-[0.16em] text-white/70">
            <span>Issue 12</span>
            <span>Winter 2026</span>
          </div>
          <div>
            <p className="m-0 text-[26px] font-semibold leading-none tracking-tight">COLOR FIELD</p>
            <p className="m-0 mt-2 text-[11px] text-white/70">Twelve painters on light and silence</p>
          </div>
        </div>
      </CurtainMixed>
    </div>
  ),
  "curtain-iris": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <CurtainIris trigger="view" closeAfter={1500} loop origin="pointer" className={frame}>
        <div
          className="relative flex h-[176px] flex-col justify-end overflow-hidden p-4"
          style={{
            background:
              "radial-gradient(circle at 12% 20%, rgba(255,255,255,0.5) 0 1px, transparent 2px), radial-gradient(circle at 40% 12%, rgba(255,255,255,0.4) 0 1px, transparent 2px), radial-gradient(circle at 58% 64%, rgba(255,255,255,0.35) 0 1px, transparent 2px), radial-gradient(circle at 90% 85%, rgba(255,255,255,0.4) 0 1px, transparent 2px), radial-gradient(circle at 30% 85%, rgba(255,255,255,0.3) 0 1px, transparent 2px), linear-gradient(180deg, #0a0d1c, #05060b)",
          }}
        >
          <div className="absolute right-[34px] top-[30px] h-[58px] w-[58px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#f6deb0,#c9995b_60%,#7a5527)]" />
          <div className="absolute right-[8px] top-[52px] h-[16px] w-[110px] -rotate-12 rounded-[50%] border-2 border-[#e9cf9f]/70" />
          <p className="font-display m-0 text-[22px] font-bold uppercase leading-none tracking-wide">Saturn tonight</p>
          <p className="m-0 mt-1.5 text-[11px] text-white/65">At opposition · rises 5:48 pm · best after 9 pm</p>
        </div>
      </CurtainIris>
    </div>
  ),
  "curtain-stagger-wipe": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <CurtainStaggerWipe trigger="view" closeAfter={1500} loop bars={6} className={frame}>
        <div
          className="font-grotesk flex h-[176px] flex-col justify-between p-4"
          style={{
            background:
              "radial-gradient(circle at 88% 12%, rgba(127,179,255,0.45), rgba(127,179,255,0) 42%), linear-gradient(150deg, #13161d, #0a0a0a)",
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/60">Spring 2027 · Drop 03</span>
          <div>
            <p className="m-0 text-[30px] font-semibold leading-[1.02] tracking-tight">The Field Collection</p>
            <p className="m-0 mt-2 text-xs text-[#a1a1a1]">Linen, waxed cotton and recycled wool. Shop the drop →</p>
          </div>
        </div>
      </CurtainStaggerWipe>
    </div>
  ),
  "curtain-wipe": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <CurtainWipe trigger="view" closeAfter={1400} loop accent="#ff8a5c" color="#141016" className={frame}>
        <div
          className="flex h-[176px] flex-col justify-between p-4"
          style={{
            background:
              "radial-gradient(circle at 22% 18%, rgba(255,140,90,0.55), rgba(255,140,90,0) 40%), linear-gradient(200deg, #1c1622, #0a0a0f)",
          }}
        >
          <div className="flex items-center justify-between text-[11px] text-white/65">
            <span>Harbor Point</span>
            <span>Tue, Nov 10</span>
          </div>
          <svg viewBox="0 0 300 40" className="h-8 w-full" aria-hidden="true">
            <path d="M0 26 C 40 6, 70 6, 100 22 S 160 38, 200 20 S 260 4, 300 18" fill="none" stroke="#ff8a5c" strokeWidth="2" />
          </svg>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-serif m-0 text-[30px] leading-none">Low tide</p>
              <p className="m-0 mt-1 text-[11px] text-white/60">Sunset 4:52 pm · wind 9 kn NW</p>
            </div>
            <span className="text-xl font-semibold tabular-nums">6:42 pm</span>
          </div>
        </div>
      </CurtainWipe>
    </div>
  ),
};
