"use client";

import * as React from "react";
import { SliderElastic } from "@/registry/hyperblur/slider-elastic";

const sweep = [34, 82, 56, 94, 22, 68];

export function SliderElasticDemo() {
  const [value, setValue] = React.useState(34);
  const touched = React.useRef(false);

  React.useEffect(() => {
    let n = 0;
    const id = window.setInterval(() => {
      if (touched.current) return;
      n = (n + 1) % sweep.length;
      setValue(sweep[n]);
    }, 1700);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="flex h-full w-full items-center justify-center px-4"
      onPointerDown={() => {
        touched.current = true;
      }}
      onKeyDown={() => {
        touched.current = true;
      }}
    >
      <div className="box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] px-4 pb-3 pt-4 text-[#ededed]">
        <div className="flex items-baseline justify-between">
          <p className="font-grotesk m-0 text-[13px] font-semibold">Screen brightness</p>
          <p className="font-mono m-0 text-[11px] text-[#8f8f8f]">Auto off</p>
        </div>
        <SliderElastic
          value={value}
          onChange={setValue}
          label="Screen brightness"
          bubble="always"
          formatValue={(v) => `${v}%`}
        />
        <div className="font-mono flex justify-between text-[10px] uppercase tracking-[0.08em] text-[#6b6b6b]">
          <span>Dim</span>
          <span>Bright</span>
        </div>
      </div>
    </div>
  );
}
