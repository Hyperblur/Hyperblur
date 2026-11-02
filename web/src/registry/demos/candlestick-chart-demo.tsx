"use client";

import * as React from "react";
import { CandlestickChart, sampleCandles } from "@/registry/hyperblur/candlestick-chart";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = ["00", "06", "12", "18"];

function build(range: "1D" | "1W" | "1M") {
  if (range === "1D") {
    return sampleCandles(24, 3412, 3).map((c, i) => ({ ...c, label: `${i < 10 ? "0" : ""}${i}:00` }));
  }
  if (range === "1W") {
    return sampleCandles(28, 3380, 8).map((c, i) => ({ ...c, label: `${DAYS[Math.floor(i / 4)]} ${HOURS[i % 4]}` }));
  }
  return sampleCandles(30, 3310, 5);
}

const sets = { "1D": build("1D"), "1W": build("1W"), "1M": build("1M") };
type Range = keyof typeof sets;

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

export function CandlestickChartDemo() {
  const [range, setRange] = React.useState<Range>("1W");
  const candles = sets[range];
  const first = candles[0];
  const last = candles[candles.length - 1];
  const change = ((last.close - first.open) / first.open) * 100;
  const rising = change >= 0;
  return (
    <div className="box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] p-3 text-left font-mono text-[#ededed]">
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[10.5px] tracking-wide text-[#8f8f8f]">ETH / USD</div>
          <div className="flex items-baseline gap-2">
            <span className="text-[19px] font-medium leading-6 tabular-nums">{usd.format(last.close)}</span>
            <span className={`text-[11px] tabular-nums ${rising ? "text-[#34d399]" : "text-[#fb7185]"}`}>
              {`${rising ? "+" : ""}${change.toFixed(2)}%`}
            </span>
          </div>
        </div>
        <div role="group" aria-label="Range" className="flex rounded-full border border-[#262626] bg-[#0a0a0a] p-0.5">
          {(Object.keys(sets) as Range[]).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={range === r}
              onClick={() => setRange(r)}
              className="cursor-pointer rounded-full border-0 bg-transparent px-2 py-0.5 text-[10.5px] text-[#8f8f8f] transition-colors hover:text-[#ededed] focus-visible:outline-2 focus-visible:outline-[#7fb3ff] aria-pressed:bg-[#262626] aria-pressed:text-[#ededed]"
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <CandlestickChart
        key={range}
        candles={candles}
        height={112}
        priceFormatter={(n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      />
    </div>
  );
}
