"use client";

import * as React from "react";
import { WheelOptionPicker } from "@/registry/hyperblur/wheel-option-picker";

const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));
const periods = ["AM", "PM"];

export function WheelOptionPickerDemo() {
  const [hour, setHour] = React.useState("6");
  const [minute, setMinute] = React.useState("45");
  const [period, setPeriod] = React.useState("AM");

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626] bg-[#111111] px-3 pb-2 pt-2.5 text-[#ededed]">
        <div className="flex h-5 items-center justify-between">
          <span className="font-grotesk text-[10px] font-medium uppercase tracking-[0.14em] text-[#7fb3ff]">Alarm</span>
          <span className="font-grotesk text-[11px] text-[#8f8f8f]">
            Wake at {hour}:{minute} {period}
          </span>
        </div>
        <div className="font-serif mt-1 grid grid-cols-[1fr_1fr_0.8fr] gap-1">
          <WheelOptionPicker
            options={hours}
            value={hour}
            onChange={setHour}
            itemHeight={28}
            rows={5}
            label="Hour"
            style={{ fontSize: 24 }}
          />
          <WheelOptionPicker
            options={minutes}
            value={minute}
            onChange={setMinute}
            itemHeight={28}
            rows={5}
            label="Minute"
            style={{ fontSize: 24 }}
          />
          <WheelOptionPicker
            options={periods}
            value={period}
            onChange={setPeriod}
            itemHeight={28}
            rows={5}
            label="Period"
            style={{ fontSize: 24 }}
          />
        </div>
      </div>
    </div>
  );
}
