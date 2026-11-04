"use client";

import { useState } from "react";
import { ToggleThemeSwitch } from "@/registry/hyperblur/toggle-theme-switch";

export function ToggleThemeSwitchDemo() {
  const [dark, setDark] = useState(true);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-3 rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-grotesk m-0 text-sm font-semibold leading-5">Appearance</p>
            <p className="font-grotesk m-0 text-xs leading-4 text-[#8f8f8f]">{dark ? "Dark theme is on" : "Light theme is on"}</p>
          </div>
          <ToggleThemeSwitch checked={dark} onCheckedChange={setDark} label="Dark mode" />
        </div>
        <div
          className="box-border flex h-[88px] flex-col justify-between rounded-xl border p-3"
          style={{
            background: dark ? "#0e0e10" : "#f6f3ec",
            borderColor: dark ? "#262626" : "#ddd7c9",
            transition: "background 0.5s ease, border-color 0.5s ease",
          }}
        >
          <div className="flex items-center justify-between">
            <p
              className="font-serif m-0 text-lg italic leading-5"
              style={{ color: dark ? "#f2efe8" : "#1d1b16", transition: "color 0.5s ease" }}
            >
              {dark ? "Good evening" : "Good morning"}
            </p>
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[10px]"
              style={{
                background: dark ? "#1e2a44" : "#dbe7ff",
                color: dark ? "#9cc2ff" : "#1f4fb3",
                transition: "background 0.5s ease, color 0.5s ease",
              }}
            >
              3 plants due
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="h-1.5 w-4/5 rounded-full" style={{ background: dark ? "#26262b" : "#e3ddcf", transition: "background 0.5s ease" }} />
            <span className="h-1.5 w-3/5 rounded-full" style={{ background: dark ? "#1d1d21" : "#ebe6da", transition: "background 0.5s ease" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
