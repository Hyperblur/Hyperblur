"use client";

import * as React from "react";
import { Mark } from "./icons";

const rows = [
  { k: "Mount shelf volume", at: 0.14 },
  { k: "Index 48 studies", at: 0.32 },
  { k: "Warm shader cache", at: 0.52 },
  { k: "Calibrate orbit", at: 0.7 },
  { k: "Link status signal", at: 0.88 },
];

const KEY = "hbl-lb-boot";
const DURATION = 2600;

type Phase = "boot" | "out" | "done";

export function Boot() {
  const [phase, setPhase] = React.useState<Phase>("boot");
  const [p, setP] = React.useState(0);
  const skipBtn = React.useRef<HTMLButtonElement>(null);

  const finish = React.useCallback(() => {
    try {
      window.sessionStorage.setItem(KEY, "1");
    } catch {}
    setP(1);
    setPhase((cur) => (cur === "boot" ? "out" : cur));
  }, []);

  React.useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      const id = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(id);
    }
    skipBtn.current?.focus({ preventScroll: true });
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setP(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  React.useEffect(() => {
    if (phase !== "out") return;
    window.dispatchEvent(new Event("hbl-lb-booted"));
    const id = window.setTimeout(() => setPhase("done"), 720);
    return () => window.clearTimeout(id);
  }, [phase]);

  if (phase === "done") return null;

  const pct = Math.round(p * 100);

  return (
    <div className="hbl-lb-boot" data-phase={phase} role="dialog" aria-modal="true" aria-label="Loading Vector Lab">
      <div className="hbl-lb-grid hbl-lb-mask pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="hbl-lb-boot-card hbl-lb-panel relative p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Mark className="h-6 w-6" />
            <div>
              <p className="font-grotesk text-[15px] font-medium tracking-[0.12em] text-[#eef1f6]">VECTOR/LAB</p>
              <p className="hbl-lb-label">Shelf OS 4.2</p>
            </div>
          </div>
          <p className="hbl-lb-label tabular-nums" aria-live="polite">
            <span className="text-[#eef1f6]">{String(pct).padStart(3, "0")}</span>%
          </p>
        </div>

        <div className="hbl-lb-bar mt-6" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Boot progress">
          <div className="hbl-lb-bar-fill" style={{ transform: `scaleX(${p.toFixed(4)})` }} />
        </div>

        <ul className="mt-6 space-y-2.5">
          {rows.map((r, i) => {
            const state = p >= r.at ? "ok" : p >= (i === 0 ? 0 : rows[i - 1].at) ? "run" : "wait";
            return (
              <li key={r.k} className="hbl-lb-row" data-state={state}>
                <span className="text-[#4b5260]">{String(i + 1).padStart(2, "0")}</span>
                <span className="hbl-lb-row-k">{r.k}</span>
                <span className="hbl-lb-row-fill" aria-hidden="true" />
                <span className="hbl-lb-row-s w-[44px] text-right">
                  {state === "ok" ? "OK" : state === "run" ? <span className="hbl-lb-cursor" aria-label="Running" /> : "--"}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-7 flex items-center justify-between gap-4">
          <p className="hbl-lb-label">
            <span className="hbl-lb-dot mr-2" aria-hidden="true" />
            {p >= 1 ? "Ready" : "Booting"}
          </p>
          <button ref={skipBtn} type="button" onClick={finish} className="hbl-lb-btn hbl-lb-btn-sm">
            Skip · Esc
          </button>
        </div>
      </div>
      <div className="hbl-lb-boot-edge" aria-hidden="true" />
    </div>
  );
}
