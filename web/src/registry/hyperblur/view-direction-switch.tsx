"use client";

import * as React from "react";

export interface DirectionView {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface ViewDirectionSwitchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  views?: DirectionView[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  controls?: "tabs" | "steps" | "none";
  autoPlay?: number;
  duration?: number;
  accent?: string;
}

const bar = (label: string, used: string, pct: number) => (
  <div className="hb-za8-meter">
    <div className="hb-za8-meter-top">
      <span>{label}</span>
      <b>{used}</b>
    </div>
    <div className="hb-za8-track">
      <i style={{ width: `${pct}%` }} />
    </div>
  </div>
);

const defaults: DirectionView[] = [
  {
    id: "plan",
    label: "Plan",
    content: (
      <div className="hb-za8-card">
        <div className="hb-za8-row">
          <div>
            <b className="hb-za8-big">Studio</b>
            <span className="hb-za8-sub">Billed monthly, renews on Nov 28</span>
          </div>
          <b className="hb-za8-price">$24</b>
        </div>
        <button type="button" className="hb-za8-btn">Change plan</button>
      </div>
    ),
  },
  {
    id: "usage",
    label: "Usage",
    content: (
      <div className="hb-za8-card">
        {bar("Projects", "8 of 10", 80)}
        {bar("Storage", "41 of 50 GB", 82)}
        {bar("Seats", "4 of 5", 80)}
      </div>
    ),
  },
  {
    id: "invoices",
    label: "Invoices",
    content: (
      <div className="hb-za8-card">
        {[
          ["Oct 28", "$24.00"],
          ["Sep 28", "$24.00"],
          ["Aug 28", "$24.00"],
          ["Jul 28", "$19.00"],
        ].map(([date, amount]) => (
          <div key={date} className="hb-za8-line">
            <span>{date}</span>
            <span className="hb-za8-paid">Paid</span>
            <b>{amount}</b>
          </div>
        ))}
      </div>
    ),
  },
];

const css = `
.hb-za8 {
  --hb-za8-c: #2f7bff;
  --hb-za8-t: 440ms;
  --hb-za8-d: 1;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-za8 *, .hb-za8 *::before, .hb-za8 *::after { box-sizing: border-box; }
.hb-za8-tabs {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--hb-za8-n), minmax(0, 1fr));
  padding: 3px;
  margin-bottom: 10px;
  background: #141414;
  border: 1px solid #262626;
  border-radius: 11px;
}
.hb-za8-pill {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc((100% - 6px) / var(--hb-za8-n));
  background: #262626;
  border-radius: 8px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 4px 10px rgba(0, 0, 0, 0.3);
  transform: translateX(calc(var(--hb-za8-i) * 100%));
  transition: transform var(--hb-za8-t) cubic-bezier(0.22, 0.9, 0.24, 1);
}
.hb-za8-tab {
  position: relative;
  z-index: 1;
  height: 30px;
  margin: 0;
  padding: 0 8px;
  overflow: hidden;
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  color: #8f8f8f;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: transparent;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.25s ease;
}
.hb-za8-tab:hover { color: #cfcfcf; }
.hb-za8-tab[aria-selected="true"] { color: #ffffff; }
.hb-za8-tab:focus-visible { outline: 2px solid var(--hb-za8-c); outline-offset: -2px; }
.hb-za8-stage { position: relative; overflow: hidden; }
.hb-za8-view { position: relative; width: 100%; }
.hb-za8-view[data-role="in"] { animation: hb-za8-in var(--hb-za8-t) cubic-bezier(0.22, 0.9, 0.24, 1) both; }
.hb-za8-view[data-role="out"] {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  animation: hb-za8-out var(--hb-za8-t) cubic-bezier(0.22, 0.9, 0.24, 1) both;
}
.hb-za8-steps { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 10px; }
.hb-za8-dots { display: flex; align-items: center; gap: 6px; }
.hb-za8-dot {
  width: 6px;
  height: 6px;
  margin: 0;
  padding: 0;
  background: #333333;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  transition: width 0.35s cubic-bezier(0.22, 0.9, 0.24, 1), background 0.25s ease;
}
.hb-za8-dot[aria-current="step"] { width: 18px; background: var(--hb-za8-c); }
.hb-za8-dot:focus-visible { outline: 2px solid var(--hb-za8-c); outline-offset: 3px; }
.hb-za8-nav {
  height: 30px;
  min-width: 68px;
  margin: 0;
  padding: 0 14px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: #ededed;
  background: #171717;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
}
.hb-za8-nav[data-primary="true"] { color: #0a0a0a; background: #ededed; border-color: #ededed; }
.hb-za8-nav:hover:not(:disabled) { background: #202020; }
.hb-za8-nav[data-primary="true"]:hover:not(:disabled) { background: #ffffff; }
.hb-za8-nav:active:not(:disabled) { transform: scale(0.96); }
.hb-za8-nav:disabled { opacity: 0.35; cursor: not-allowed; }
.hb-za8-nav:focus-visible { outline: 2px solid var(--hb-za8-c); outline-offset: 2px; }
.hb-za8-card { display: flex; flex-direction: column; gap: 10px; padding: 12px; background: #111111; border: 1px solid #262626; border-radius: 12px; }
.hb-za8-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hb-za8-big { display: block; font-size: 16px; font-weight: 650; letter-spacing: -0.02em; }
.hb-za8-sub { display: block; margin-top: 2px; font-size: 12px; color: #8f8f8f; }
.hb-za8-price { font-size: 22px; font-weight: 650; letter-spacing: -0.03em; }
.hb-za8-btn { align-self: flex-start; margin: 0; padding: 6px 12px; font: inherit; font-size: 12px; font-weight: 600; color: #ededed; background: #1c1c1c; border: 1px solid #2f2f2f; border-radius: 8px; cursor: pointer; }
.hb-za8-meter { display: flex; flex-direction: column; gap: 5px; }
.hb-za8-meter-top { display: flex; justify-content: space-between; font-size: 12px; color: #a1a1a1; }
.hb-za8-meter-top b { font-weight: 600; color: #ededed; font-variant-numeric: tabular-nums; }
.hb-za8-track { height: 5px; overflow: hidden; background: #262626; border-radius: 999px; }
.hb-za8-track i { display: block; height: 100%; background: var(--hb-za8-c); border-radius: inherit; }
.hb-za8-line { display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: #cfcfcf; }
.hb-za8-line span:first-child { flex: 1 1 auto; }
.hb-za8-line b { font-weight: 600; color: #ededed; font-variant-numeric: tabular-nums; }
.hb-za8-paid { padding: 1px 7px; font-size: 11px; color: #4cd08a; background: rgba(76, 208, 138, 0.12); border-radius: 999px; }
@keyframes hb-za8-in {
  from { opacity: 0; transform: translateX(calc(var(--hb-za8-d) * 34px)); filter: blur(3px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}
@keyframes hb-za8-out {
  from { opacity: 1; transform: none; filter: blur(0); }
  to { opacity: 0; transform: translateX(calc(var(--hb-za8-d) * -34px)); filter: blur(3px); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-za8-pill, .hb-za8-tab, .hb-za8-dot, .hb-za8-nav { transition: none; }
  .hb-za8-view[data-role="in"], .hb-za8-view[data-role="out"] { animation: none; }
}
`;

export function ViewDirectionSwitch({
  views,
  value,
  defaultValue,
  onChange,
  controls = "tabs",
  autoPlay = 0,
  duration = 440,
  accent = "#2f7bff",
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: ViewDirectionSwitchProps) {
  const items = views && views.length ? views : defaults;
  const total = items.length;
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue ?? items[0].id);
  const currentId = controlled ? value : inner;
  const found = items.findIndex((v) => v.id === currentId);
  const index = found === -1 ? 0 : found;
  const [shown, setShown] = React.useState(index);
  const [leaving, setLeaving] = React.useState<{ index: number; dir: 1 | -1; key: number } | null>(null);
  const [busy, setBusy] = React.useState(false);
  const baseId = React.useId();
  const stageRef = React.useRef<HTMLDivElement>(null);
  const inRef = React.useRef<HTMLDivElement>(null);
  const outRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const latest = React.useRef(onChange);

  React.useEffect(() => {
    latest.current = onChange;
  }, [onChange]);

  if (index !== shown) {
    setLeaving((prev) => ({ index: shown, dir: index > shown ? 1 : -1, key: (prev ? prev.key : 0) + 1 }));
    setShown(index);
  }

  React.useLayoutEffect(() => {
    const stage = stageRef.current;
    const out = outRef.current;
    const into = inRef.current;
    if (!leaving || !stage || !out || !into) return;
    stage.getAnimations().forEach((a) => a.cancel());
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const from = out.offsetHeight;
    const to = into.offsetHeight;
    if (Math.abs(from - to) < 1) return;
    stage.animate([{ height: `${from}px` }, { height: `${to}px` }], {
      duration,
      easing: "cubic-bezier(0.22, 0.9, 0.24, 1)",
    });
  }, [leaving, duration]);

  React.useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => setLeaving(null), duration + 40);
    return () => window.clearTimeout(t);
  }, [leaving, duration]);

  const go = React.useCallback(
    (next: number, focus = false) => {
      const clamped = Math.min(total - 1, Math.max(0, next));
      if (clamped === index) return;
      const id = items[clamped].id;
      if (!controlled) setInner(id);
      latest.current?.(id);
      if (focus) tabRefs.current[clamped]?.focus();
    },
    [controlled, index, items, total],
  );

  React.useEffect(() => {
    if (!autoPlay || busy) return;
    const t = window.setTimeout(() => go(index >= total - 1 ? 0 : index + 1), autoPlay);
    return () => window.clearTimeout(t);
  }, [autoPlay, busy, index, total, go]);

  const dir = leaving ? leaving.dir : 1;
  const vars = {
    "--hb-za8-c": accent,
    "--hb-za8-n": total,
    "--hb-za8-i": index,
    "--hb-za8-d": dir,
    "--hb-za8-t": `${duration}ms`,
    ...style,
  } as React.CSSProperties;

  const panelId = `${baseId}-panel`;

  return (
    <div
      className={`hb-za8 ${className}`}
      style={vars}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        setBusy(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setBusy(false);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        setBusy(true);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        setBusy(false);
      }}
      {...rest}
    >
      <style href="hb-view-direction-switch" precedence="default">{css}</style>
      {controls === "tabs" ? (
        <div
          className="hb-za8-tabs"
          role="tablist"
          aria-label="Views"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go((index + 1) % total, true);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              go((index - 1 + total) % total, true);
            } else if (e.key === "Home") {
              e.preventDefault();
              go(0, true);
            } else if (e.key === "End") {
              e.preventDefault();
              go(total - 1, true);
            }
          }}
        >
          <span className="hb-za8-pill" aria-hidden="true" />
          {items.map((v, i) => (
            <button
              key={v.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${v.id}`}
              className="hb-za8-tab"
              aria-selected={i === index}
              aria-controls={panelId}
              tabIndex={i === index ? 0 : -1}
              onClick={() => go(i)}
            >
              {v.label}
            </button>
          ))}
        </div>
      ) : null}
      <div ref={stageRef} className="hb-za8-stage">
        {leaving && items[leaving.index] ? (
          <div ref={outRef} key={`out-${leaving.key}`} className="hb-za8-view" data-role="out" aria-hidden="true">
            {items[leaving.index].content}
          </div>
        ) : null}
        <div
          ref={inRef}
          key={`in-${items[index].id}`}
          id={panelId}
          className="hb-za8-view"
          data-role={leaving ? "in" : undefined}
          role={controls === "tabs" ? "tabpanel" : "region"}
          aria-labelledby={controls === "tabs" ? `${baseId}-tab-${items[index].id}` : undefined}
          aria-label={controls === "tabs" ? undefined : items[index].label}
          aria-live={controls === "tabs" ? undefined : "polite"}
        >
          {items[index].content}
        </div>
      </div>
      {controls === "steps" ? (
        <div className="hb-za8-steps">
          <button type="button" className="hb-za8-nav" disabled={index === 0} onClick={() => go(index - 1)}>
            Back
          </button>
          <div className="hb-za8-dots" role="group" aria-label="Steps">
            {items.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className="hb-za8-dot"
                aria-label={`${v.label}, step ${i + 1} of ${total}`}
                aria-current={i === index ? "step" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button type="button" className="hb-za8-nav" data-primary="true" disabled={index === total - 1} onClick={() => go(index + 1)}>
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
