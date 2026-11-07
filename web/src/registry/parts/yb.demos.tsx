import type { ReactNode } from "react";
import { LoaderGears } from "@/registry/hyperblur/loader-gears";
import { LoaderHourglass } from "@/registry/hyperblur/loader-hourglass";
import { LoaderDnaHelix } from "@/registry/hyperblur/loader-dna-helix";
import { LoaderBatteryFill } from "@/registry/hyperblur/loader-battery-fill";
import { LoaderSignalBars } from "@/registry/hyperblur/loader-signal-bars";
import { LoaderBookFlip } from "@/registry/hyperblur/loader-book-flip";
import { LoaderBouncingBalls } from "@/registry/hyperblur/loader-bouncing-balls";
import { LoaderRocketTrail } from "@/registry/hyperblur/loader-rocket-trail";

const frame = "flex h-full w-full items-center justify-center px-4";

export const ybDemos: Record<string, ReactNode> = {
  "loader-gears": (
    <div className={frame}>
      <div className="box-border w-full max-w-[340px] overflow-hidden rounded-xl border border-[#262626] bg-[#0f0f0f] text-left font-mono text-[#ededed]">
        <div className="flex items-center gap-1.5 border-b border-[#1f1f1f] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#3a3a3a]" />
          <span className="h-2 w-2 rounded-full bg-[#3a3a3a]" />
          <span className="h-2 w-2 rounded-full bg-[#3a3a3a]" />
          <span className="ml-2 text-[10px] text-[#8f8f8f]">search-index / rebuild.log</span>
        </div>
        <div className="flex items-center gap-4 p-4">
          <LoaderGears size={68} />
          <div className="min-w-0 flex-1 text-[11px] leading-5">
            <p className="m-0 truncate text-[#ededed]">Rebuilding search index</p>
            <p className="m-0 truncate text-[#8f8f8f]">1,284 of 3,906 documents</p>
            <p className="m-0 truncate text-[#7fb3ff]">shard 02 / 06 &middot; 41s</p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#1f1f1f]">
              <div className="h-full w-1/3 rounded-full bg-[#2f7bff]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  "loader-hourglass": (
    <div className={frame}>
      <div className="box-border flex w-full max-w-[340px] items-center gap-5 rounded-2xl border border-[#2c2519] bg-[#15110b] p-5 text-left font-sans text-[#f3ead9]">
        <LoaderHourglass size={72} color="#e8c46a" accent="#a9863f" />
        <div className="min-w-0 flex-1">
          <p className="m-0 font-sans text-[10px] uppercase tracking-[0.14em] text-[#b39a6a]">Maison Alba</p>
          <p className="m-0 mt-1 text-[26px] leading-[1.05]">Setting your table</p>
          <p className="m-0 mt-2 font-sans text-xs text-[#a89b82]">Friday, 7:30 pm &middot; 2 guests</p>
          <p className="m-0 mt-0.5 font-sans text-xs text-[#7d725e]">Usually under a minute</p>
        </div>
      </div>
    </div>
  ),
  "loader-dna-helix": (
    <div className={frame}>
      <div className="box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#101114] p-4 text-left font-grotesk text-[#ededed]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#8f8f8f]">Run 4821</span>
          <span className="rounded-full border border-[#262626] px-2 py-0.5 text-[10px] text-[#7fb3ff]">Sequencing</span>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <LoaderDnaHelix size={52} rungs={9} />
          <div className="min-w-0">
            <p className="m-0 text-base font-semibold leading-tight">Sample HG-0097</p>
            <p className="m-0 mt-0.5 text-xs text-[#8f8f8f]">Whole genome, 30x coverage</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#1f1f1f] pt-3">
          {[
            ["Reads", "1.2M"],
            ["Quality", "Q38"],
            ["Time left", "06:12"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="m-0 text-[10px] uppercase tracking-[0.08em] text-[#6f6f6f]">{k}</p>
              <p className="m-0 text-sm font-medium">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  "loader-battery-fill": (
    <div className={frame}>
      <div className="box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] p-3 text-left font-sans text-[#ededed]">
        <p className="m-0 px-1 pb-2 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Your devices</p>
        {[
          { name: "Fern Watch", note: "Charging, 42 min left", node: <LoaderBatteryFill size={44} /> },
          { name: "Fern Buds", note: "Fully charged", node: <LoaderBatteryFill size={44} value={100} color="#34d399" accent="#86efac" /> },
          { name: "Charging case", note: "25% remaining", node: <LoaderBatteryFill size={44} value={25} color="#fbbf24" accent="#fde68a" /> },
        ].map((d, i) => (
          <div
            key={d.name}
            className={`flex items-center justify-between gap-3 px-1 py-2 ${i > 0 ? "border-t border-[#1f1f1f]" : ""}`}
          >
            <div className="min-w-0">
              <p className="m-0 truncate text-[13px] font-medium leading-tight">{d.name}</p>
              <p className="m-0 truncate text-[11px] text-[#8f8f8f]">{d.note}</p>
            </div>
            <div className="flex w-[52px] flex-none justify-end">{d.node}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  "loader-signal-bars": (
    <div className={frame}>
      <div className="box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left font-sans text-[#ededed]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Wi-Fi</span>
          <span className="flex h-5 w-9 items-center justify-end rounded-full bg-[#2f7bff] px-0.5">
            <span className="h-4 w-4 rounded-full bg-white" />
          </span>
        </div>
        <div className="flex items-center gap-3 py-3">
          <LoaderSignalBars size={32} />
          <div className="min-w-0">
            <p className="m-0 text-[13px] font-medium leading-tight">Searching for networks</p>
            <p className="m-0 text-[11px] text-[#8f8f8f]">Keep your phone near the router</p>
          </div>
        </div>
        <div className="border-t border-[#1f1f1f] pt-2 text-xs text-[#a1a1a1]">
          <div className="flex items-center justify-between py-1">
            <span>Home 5G</span>
            <span className="text-[#6f6f6f]">Saved</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span>Cafe Guest</span>
            <span className="text-[#6f6f6f]">Open</span>
          </div>
        </div>
      </div>
    </div>
  ),
  "loader-book-flip": (
    <div className={frame}>
      <div className="box-border flex w-full max-w-[340px] items-center gap-5 rounded-2xl border border-[#262626] bg-[#111111] p-5 text-left font-sans text-[#ededed]">
        <div className="flex w-[84px] flex-none justify-center">
          <LoaderBookFlip size={76} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="m-0 font-sans text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Library</p>
          <p className="m-0 mt-1 text-2xl leading-[1.05]">Opening The Long Meridian</p>
          <p className="m-0 mt-2 font-sans text-xs text-[#8f8f8f]">Chapter 12 &middot; 31 min left</p>
          <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-[#1f1f1f]">
            <div className="h-full w-2/5 bg-[#7fb3ff]" />
          </div>
        </div>
      </div>
    </div>
  ),
  "loader-bouncing-balls": (
    <div className={frame}>
      <div className="box-border flex w-full max-w-[340px] flex-col items-center rounded-2xl border border-[#262626] bg-[#111111] px-4 py-4 text-center font-grotesk text-[#ededed]">
        <p className="m-0 text-[10px] uppercase tracking-[0.16em] text-[#8f8f8f]">Lobby &middot; Ranked duo</p>
        <div className="my-2">
          <LoaderBouncingBalls size={48} label="Finding players" />
        </div>
        <div className="flex items-center gap-1.5">
          {["AK", "MJ", "RS"].map((n, i) => (
            <span
              key={n}
              className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-semibold text-[#0a0a0a]"
              style={{ background: ["#7fb3ff", "#ff9bb8", "#ffc46b"][i] }}
            >
              {n}
            </span>
          ))}
          <span className="h-6 w-6 rounded-full border border-dashed border-[#3a3a3a]" />
          <span className="ml-2 text-xs text-[#a1a1a1]">3 of 4 ready</span>
        </div>
      </div>
    </div>
  ),
  "loader-rocket-trail": (
    <div className={frame}>
      <div className="box-border flex w-full max-w-[340px] items-center gap-4 rounded-2xl border border-[#262626] bg-[#0f0f0f] p-4 text-left text-[#ededed]">
        <div className="flex-none rounded-xl bg-[#0a0a0a] p-2" style={{ boxShadow: "inset 0 0 0 1px #1f1f1f" }}>
          <LoaderRocketTrail size={96} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="m-0 font-display text-sm font-bold uppercase tracking-[0.14em]">Deploying</p>
          <p className="m-0 mb-2 truncate text-[11px] text-[#8f8f8f]">hyperblur / main &middot; 4f25fbe</p>
          {[
            ["Build", true],
            ["Tests", true],
            ["Edge network", false],
          ].map(([step, done]) => (
            <p key={String(step)} className="m-0 flex items-center gap-2 text-xs leading-6">
              <span className={done ? "text-[#34d399]" : "text-[#7fb3ff]"}>{done ? "✓" : "•"}</span>
              <span className={done ? "text-[#a1a1a1]" : "text-[#ededed]"}>{String(step)}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
};
