"use client";

import { useState } from "react";
import { SliderRangeDual } from "@/registry/hyperblur/slider-range-dual";

const buckets = [3, 5, 8, 12, 14, 18, 22, 19, 16, 14, 12, 9, 8, 7, 6, 5, 4, 4, 3, 2, 2, 1, 1, 1];
const top = Math.max(...buckets);
const maxPrice = 500;

export function SliderRangeDualDemo() {
  const [range, setRange] = useState<[number, number]>([120, 340]);
  const width = maxPrice / buckets.length;
  const inRange = (i: number) => {
    const mid = (i + 0.5) * width;
    return mid >= range[0] && mid <= range[1];
  };
  const stays = buckets.reduce((sum, n, i) => (inRange(i) ? sum + n : sum), 0);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <div className="flex items-baseline justify-between">
          <p className="font-grotesk m-0 text-sm font-semibold">Price per night</p>
          <span className="font-mono text-[11px] text-[#8f8f8f]">{stays} stays</span>
        </div>
        <div className="mt-3 flex h-10 items-end gap-[3px] px-[11px]">
          {buckets.map((n, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-[3px]"
              style={{
                height: `${Math.round((n / top) * 100)}%`,
                background: inRange(i) ? "#2f7bff" : "#262626",
                transition: "background 0.2s ease",
              }}
            />
          ))}
        </div>
        <SliderRangeDual
          min={0}
          max={maxPrice}
          step={10}
          minGap={30}
          value={range}
          onValueChange={setRange}
          formatValue={(n) => `$${n}`}
          label="Price"
        />
      </div>
    </div>
  );
}
