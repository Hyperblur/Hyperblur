"use client";

import * as React from "react";

export interface AppearanceValues {
  theme: "dark" | "dim" | "light";
  accent: string;
  radius: number;
  density: "compact" | "default" | "comfy";
  fontSize: 13 | 14 | 15;
  sidebar: "left" | "right";
}

export interface AppAppearanceSettingsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: AppearanceValues;
  defaultValue?: Partial<AppearanceValues>;
  onChange?: (value: AppearanceValues) => void;
  onSave?: (value: AppearanceValues) => void;
  accents?: string[];
  workspace?: string;
}

const base: AppearanceValues = { theme: "dark", accent: "#2f7bff", radius: 10, density: "default", fontSize: 14, sidebar: "left" };
const defaultAccents = ["#2f7bff", "#8b5cf6", "#10b981", "#f59e0b", "#f43f5e", "#06b6d4"];
const accentNames: Record<string, string> = { "#2f7bff": "Blue", "#8b5cf6": "Violet", "#10b981": "Emerald", "#f59e0b": "Amber", "#f43f5e": "Rose", "#06b6d4": "Cyan" };

const themes = {
  dark: { bg: "#0b0b0c", panel: "#141416", line: "#26262a", text: "#ededed", mute: "#8b8b92", side: "#101012" },
  dim: { bg: "#1b1f27", panel: "#232833", line: "#333a47", text: "#e6e9ef", mute: "#97a0b0", side: "#181c23" },
  light: { bg: "#f6f6f4", panel: "#ffffff", line: "#e4e4e0", text: "#18181b", mute: "#71717a", side: "#efefec" },
};

const pads = { compact: 6, default: 9, comfy: 12 };

const css = `
.hb-wj4 {
  box-sizing: border-box;
  container-type: inline-size;
  width: 100%;
  font-family: inherit;
  font-size: 13px;
  color: #ededed;
  background: #0e0e0e;
  border: 1px solid #262626;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 70px -40px rgba(0,0,0,0.9);
}
.hb-wj4 *, .hb-wj4 *::before, .hb-wj4 *::after { box-sizing: border-box; font-family: inherit; }
.hb-wj4-wrap { display: grid; grid-template-columns: minmax(0, 300px) minmax(0, 1fr); }
.hb-wj4-form { display: flex; flex-direction: column; gap: 16px; padding: 18px; border-right: 1px solid #1f1f1f; }
.hb-wj4-h { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: -0.015em; }
.hb-wj4-sub { margin: 3px 0 0; font-size: 12px; color: #8f8f8f; }
.hb-wj4-f { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; border: 0; min-width: 0; }
.hb-wj4-l { display: flex; justify-content: space-between; font-size: 11.5px; font-weight: 500; color: #a1a1a1; }
.hb-wj4-l output { color: #ededed; font-variant-numeric: tabular-nums; }
.hb-wj4-themes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.hb-wj4-th { display: flex; flex-direction: column; gap: 6px; padding: 5px 5px 7px; font: inherit; font-size: 11.5px; color: #a1a1a1; background: #141414; border: 1px solid #262626; border-radius: 10px; cursor: pointer; transition: border-color .15s ease, color .15s ease, box-shadow .2s ease; }
.hb-wj4-th[aria-checked="true"] { color: #fff; border-color: var(--hb-wj4-a); box-shadow: 0 0 0 1px var(--hb-wj4-a); }
.hb-wj4-sw { position: relative; display: block; height: 34px; border-radius: 6px; overflow: hidden; }
.hb-wj4-sw::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 30%; background: var(--s); }
.hb-wj4-sw::after { content: ""; position: absolute; left: 38%; top: 9px; width: 46%; height: 4px; border-radius: 2px; background: var(--m); box-shadow: 0 9px 0 var(--m), -0px 18px 0 -1px var(--hb-wj4-a); }
.hb-wj4-acc { display: flex; gap: 8px; }
.hb-wj4-dot { position: relative; width: 24px; height: 24px; padding: 0; background: var(--d); border: 0; border-radius: 50%; cursor: pointer; box-shadow: 0 1px 0 rgba(255,255,255,0.25) inset, 0 4px 10px -4px var(--d); transition: transform .2s cubic-bezier(.3,1.6,.5,1); }
.hb-wj4-dot:hover { transform: scale(1.1); }
.hb-wj4-dot[aria-checked="true"]::after { content: ""; position: absolute; inset: -4px; border: 2px solid var(--d); border-radius: 50%; animation: hb-wj4-ring .3s cubic-bezier(.3,1.5,.5,1) both; }
.hb-wj4-range { width: 100%; height: 18px; margin: 0; accent-color: var(--hb-wj4-a); cursor: pointer; }
.hb-wj4-seg { position: relative; display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; padding: 3px; background: #141414; border: 1px solid #262626; border-radius: 9px; }
.hb-wj4-thumb { position: absolute; top: 3px; bottom: 3px; left: 3px; background: #262626; border-radius: 6px; box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset, 0 2px 6px rgba(0,0,0,0.5); transition: transform .3s cubic-bezier(.3,1.2,.4,1); }
.hb-wj4-opt { position: relative; z-index: 1; height: 26px; font: inherit; font-size: 11.5px; font-weight: 500; color: #8f8f8f; background: none; border: 0; border-radius: 6px; cursor: pointer; transition: color .15s ease; }
.hb-wj4-opt[aria-checked="true"] { color: #fff; }
.hb-wj4-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: auto; padding-top: 12px; border-top: 1px solid #1f1f1f; }
.hb-wj4-state { display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; color: #8f8f8f; }
.hb-wj4-state i { width: 6px; height: 6px; border-radius: 50%; background: #3a3a3a; font-style: normal; transition: background-color .2s ease, box-shadow .2s ease; }
.hb-wj4-state[data-dirty="true"] i { background: #f0b24a; box-shadow: 0 0 8px #f0b24a; }
.hb-wj4-state[data-saved="true"] i { background: #34c78a; box-shadow: 0 0 8px #34c78a; }
.hb-wj4-btns { display: flex; gap: 6px; }
.hb-wj4-btn { height: 30px; padding: 0 12px; font: inherit; font-size: 12px; font-weight: 500; color: #ededed; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; cursor: pointer; transition: background-color .15s ease, opacity .15s ease, transform .1s ease; }
.hb-wj4-btn:hover:not(:disabled) { background: #222; }
.hb-wj4-btn:active:not(:disabled) { transform: translateY(1px); }
.hb-wj4-btn:disabled { opacity: .4; cursor: default; }
.hb-wj4-btn[data-primary="true"] { color: #fff; background: var(--hb-wj4-a); border-color: transparent; box-shadow: 0 1px 0 rgba(255,255,255,0.2) inset; }
.hb-wj4-th:focus-visible, .hb-wj4-dot:focus-visible, .hb-wj4-opt:focus-visible, .hb-wj4-btn:focus-visible, .hb-wj4-range:focus-visible { outline: 2px solid var(--hb-wj4-a); outline-offset: 2px; }
.hb-wj4-stage { position: relative; display: grid; place-items: center; padding: 22px; background: radial-gradient(90% 70% at 70% 20%, color-mix(in srgb, var(--hb-wj4-a) 16%, transparent), transparent 70%), repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 22px), #0a0a0a; transition: background .4s ease; }
.hb-wj4-tag { position: absolute; top: 12px; left: 14px; display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; color: #8f8f8f; }
.hb-wj4-tag i { width: 6px; height: 6px; border-radius: 50%; background: #34c78a; font-style: normal; animation: hb-wj4-blink 2s ease-in-out infinite; }
.hb-wj4-app {
  --r: 10px;
  --p: 9px;
  display: flex;
  width: 100%;
  max-width: 440px;
  height: 300px;
  font-size: var(--fs);
  color: var(--tx);
  background: var(--bg);
  border: 1px solid var(--ln);
  border-radius: calc(var(--r) + 4px);
  overflow: hidden;
  box-shadow: 0 30px 60px -24px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03);
  transition: background-color .35s ease, color .35s ease, border-color .35s ease, border-radius .3s ease, font-size .2s ease;
}
.hb-wj4-app[data-side="right"] { flex-direction: row-reverse; }
.hb-wj4-side { display: flex; flex-direction: column; gap: 2px; flex: none; width: 34%; padding: var(--p); background: var(--sd); border-right: 1px solid var(--ln); transition: background-color .35s ease, padding .25s ease; }
.hb-wj4-app[data-side="right"] .hb-wj4-side { border-right: 0; border-left: 1px solid var(--ln); }
.hb-wj4-ws { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; font-size: .86em; font-weight: 600; }
.hb-wj4-ws span:first-child { display: grid; place-items: center; width: 18px; height: 18px; font-size: 9px; color: #fff; background: var(--hb-wj4-a); border-radius: calc(var(--r) * .5); transition: border-radius .3s ease, background-color .3s ease; }
.hb-wj4-nav { display: flex; align-items: center; gap: 6px; padding: calc(var(--p) * .55) calc(var(--p) * .8); font-size: .82em; color: var(--mt); border-radius: calc(var(--r) * .7); transition: padding .25s ease, border-radius .3s ease, background-color .3s ease, color .3s ease; }
.hb-wj4-nav b { width: 10px; height: 10px; border: 1.5px solid currentColor; border-radius: 3px; opacity: .8; }
.hb-wj4-nav[data-on="true"] { color: var(--tx); background: color-mix(in srgb, var(--hb-wj4-a) 16%, transparent); }
.hb-wj4-nav[data-on="true"] b { border-color: var(--hb-wj4-a); }
.hb-wj4-main { display: flex; flex-direction: column; gap: var(--p); flex: 1; min-width: 0; padding: calc(var(--p) * 1.3); transition: padding .25s ease, gap .25s ease; }
.hb-wj4-mh { display: flex; align-items: center; justify-content: space-between; }
.hb-wj4-mt { font-size: 1em; font-weight: 600; letter-spacing: -0.01em; }
.hb-wj4-cta { padding: calc(var(--p) * .45) calc(var(--p) * .9); font-size: .78em; font-weight: 600; color: #fff; background: var(--hb-wj4-a); border-radius: calc(var(--r) * .7); box-shadow: 0 4px 12px -4px var(--hb-wj4-a); transition: border-radius .3s ease, background-color .3s ease, padding .25s ease; }
.hb-wj4-kpis { display: grid; grid-template-columns: 1fr 1fr; gap: var(--p); transition: gap .25s ease; }
.hb-wj4-kpi { padding: var(--p); background: var(--pn); border: 1px solid var(--ln); border-radius: var(--r); transition: border-radius .3s ease, background-color .35s ease, padding .25s ease; }
.hb-wj4-kpi small { display: block; font-size: .7em; color: var(--mt); }
.hb-wj4-kpi strong { display: block; margin-top: 2px; font-size: 1.15em; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.hb-wj4-kpi em { font-size: .7em; font-style: normal; color: #22b07d; }
.hb-wj4-chart { flex: 1; min-height: 0; padding: var(--p); background: var(--pn); border: 1px solid var(--ln); border-radius: var(--r); transition: border-radius .3s ease, background-color .35s ease; }
.hb-wj4-chart svg { display: block; width: 100%; height: 100%; }
.hb-wj4-chart path { transition: stroke .3s ease, fill .3s ease; }
.hb-wj4-app[data-f="0"] { animation: hb-wj4-flash .5s ease; }
.hb-wj4-app[data-f="1"] { animation: hb-wj4-flashb .5s ease; }
@keyframes hb-wj4-flashb { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-wj4-a) 60%, transparent), 0 30px 60px -24px rgba(0,0,0,0.75); } 100% { box-shadow: 0 0 0 14px transparent, 0 30px 60px -24px rgba(0,0,0,0.75); } }
@keyframes hb-wj4-ring { from { transform: scale(.6); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes hb-wj4-blink { 50% { opacity: .35; } }
@keyframes hb-wj4-flash { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-wj4-a) 60%, transparent), 0 30px 60px -24px rgba(0,0,0,0.75); } 100% { box-shadow: 0 0 0 14px transparent, 0 30px 60px -24px rgba(0,0,0,0.75); } }
@container (max-width: 640px) {
  .hb-wj4-wrap { grid-template-columns: 1fr; }
  .hb-wj4-form { border-right: 0; border-bottom: 1px solid #1f1f1f; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wj4 *, .hb-wj4 *::after { transition: none !important; animation: none !important; }
}
`;

function Seg<T extends string | number>({ label, options, value, onChange }: { label: string; options: { v: T; t: string }[]; value: T; onChange: (v: T) => void }) {
  const idx = Math.max(0, options.findIndex((o) => o.v === value));
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className="hb-wj4-seg" role="radiogroup" aria-label={label}>
      <span className="hb-wj4-thumb" aria-hidden="true" style={{ width: `calc((100% - 6px) / ${options.length})`, transform: `translateX(${idx * 100}%)` }} />
      {options.map((o, i) => (
        <button
          key={String(o.v)}
          ref={(el) => { refs.current[i] = el; }}
          type="button"
          role="radio"
          aria-checked={i === idx}
          tabIndex={i === idx ? 0 : -1}
          className="hb-wj4-opt"
          onClick={() => onChange(o.v)}
          onKeyDown={(e) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            e.preventDefault();
            const n = (idx + (e.key === "ArrowRight" ? 1 : -1) + options.length) % options.length;
            onChange(options[n].v);
            refs.current[n]?.focus();
          }}
        >
          {o.t}
        </button>
      ))}
    </div>
  );
}

export function AppAppearanceSettings({
  value,
  defaultValue,
  onChange,
  onSave,
  accents = defaultAccents,
  workspace = "Lumen Ops",
  className,
  style,
  ...rest
}: AppAppearanceSettingsProps) {
  const initial = React.useMemo(() => ({ ...base, ...defaultValue }), [defaultValue]);
  const [inner, setInner] = React.useState<AppearanceValues>(initial);
  const [saved, setSaved] = React.useState<AppearanceValues>(initial);
  const [justSaved, setJustSaved] = React.useState(false);
  const [flash, setFlash] = React.useState(0);
  const v = value ?? inner;
  const dirty = (Object.keys(base) as (keyof AppearanceValues)[]).some((k) => v[k] !== saved[k]);
  const t = themes[v.theme];

  const set = <K extends keyof AppearanceValues>(k: K, val: AppearanceValues[K]) => {
    const next = { ...v, [k]: val };
    if (value === undefined) setInner(next);
    onChange?.(next);
    setJustSaved(false);
    setFlash((f) => f + 1);
  };

  const save = () => {
    setSaved(v);
    setJustSaved(true);
    onSave?.(v);
  };

  const reset = () => {
    if (value === undefined) setInner(saved);
    onChange?.(saved);
  };

  const bars = [34, 52, 41, 66, 58, 80, 72, 94];
  const line = bars.map((b, i) => `${i === 0 ? "M" : "L"}${(i * (200 / 7)).toFixed(1)} ${(100 - b).toFixed(1)}`).join(" ");

  return (
    <div className={["hb-wj4", className].filter(Boolean).join(" ")} style={{ "--hb-wj4-a": v.accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-app-appearance-settings" precedence="default">{css}</style>
      <div className="hb-wj4-wrap">
        <div className="hb-wj4-form">
          <div>
            <h3 className="hb-wj4-h">Appearance</h3>
            <p className="hb-wj4-sub">Changes preview instantly for everyone in {workspace}.</p>
          </div>
          <div className="hb-wj4-f">
            <span className="hb-wj4-l">Theme</span>
            <div className="hb-wj4-themes" role="radiogroup" aria-label="Theme">
              {(Object.keys(themes) as AppearanceValues["theme"][]).map((k) => (
                <button key={k} type="button" role="radio" aria-checked={v.theme === k} className="hb-wj4-th" onClick={() => set("theme", k)}>
                  <span className="hb-wj4-sw" style={{ background: themes[k].bg, "--s": themes[k].side, "--m": themes[k].line } as React.CSSProperties} />
                  {k === "dark" ? "Dark" : k === "dim" ? "Dim" : "Light"}
                </button>
              ))}
            </div>
          </div>
          <div className="hb-wj4-f">
            <span className="hb-wj4-l">Accent <output>{accentNames[v.accent] ?? v.accent}</output></span>
            <div className="hb-wj4-acc" role="radiogroup" aria-label="Accent color">
              {accents.map((a) => (
                <button key={a} type="button" role="radio" aria-checked={v.accent === a} aria-label={accentNames[a] ?? a} className="hb-wj4-dot" style={{ "--d": a } as React.CSSProperties} onClick={() => set("accent", a)} />
              ))}
            </div>
          </div>
          <label className="hb-wj4-f">
            <span className="hb-wj4-l">Corner radius <output>{v.radius}px</output></span>
            <input className="hb-wj4-range" type="range" min={0} max={18} step={1} value={v.radius} onChange={(e) => set("radius", parseInt(e.target.value, 10))} />
          </label>
          <div className="hb-wj4-f">
            <span className="hb-wj4-l">Density</span>
            <Seg label="Density" value={v.density} onChange={(d) => set("density", d)} options={[{ v: "compact", t: "Compact" }, { v: "default", t: "Default" }, { v: "comfy", t: "Comfy" }]} />
          </div>
          <div className="hb-wj4-f">
            <span className="hb-wj4-l">Text size and sidebar</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Seg label="Text size" value={v.fontSize} onChange={(f) => set("fontSize", f)} options={[{ v: 13 as const, t: "S" }, { v: 14 as const, t: "M" }, { v: 15 as const, t: "L" }]} />
              <Seg label="Sidebar position" value={v.sidebar} onChange={(s) => set("sidebar", s)} options={[{ v: "left", t: "Left" }, { v: "right", t: "Right" }]} />
            </div>
          </div>
          <div className="hb-wj4-foot">
            <span className="hb-wj4-state" data-dirty={dirty} data-saved={justSaved && !dirty} role="status">
              <i />
              {dirty ? "Unsaved changes" : justSaved ? "Saved" : "Up to date"}
            </span>
            <div className="hb-wj4-btns">
              <button type="button" className="hb-wj4-btn" disabled={!dirty} onClick={reset}>Reset</button>
              <button type="button" className="hb-wj4-btn" data-primary="true" disabled={!dirty} onClick={save}>Save</button>
            </div>
          </div>
        </div>
        <div className="hb-wj4-stage">
          <span className="hb-wj4-tag"><i />Live preview</span>
          <div
            className="hb-wj4-app"
            data-f={flash === 0 ? "none" : flash % 2}
            data-side={v.sidebar}
            aria-hidden="true"
            style={{ "--bg": t.bg, "--pn": t.panel, "--ln": t.line, "--tx": t.text, "--mt": t.mute, "--sd": t.side, "--r": `${v.radius}px`, "--p": `${pads[v.density]}px`, "--fs": `${v.fontSize}px` } as React.CSSProperties}
          >
            <div className="hb-wj4-side">
              <div className="hb-wj4-ws"><span>L</span><span>{workspace}</span></div>
              {["Overview", "Incidents", "Deploys", "Members", "Settings"].map((n, i) => (
                <div key={n} className="hb-wj4-nav" data-on={i === 0}><b />{n}</div>
              ))}
            </div>
            <div className="hb-wj4-main">
              <div className="hb-wj4-mh">
                <span className="hb-wj4-mt">Overview</span>
                <span className="hb-wj4-cta">New deploy</span>
              </div>
              <div className="hb-wj4-kpis">
                <div className="hb-wj4-kpi"><small>Uptime, 30d</small><strong>99.982%</strong><em>+0.04</em></div>
                <div className="hb-wj4-kpi"><small>p95 latency</small><strong>184 ms</strong><em>−12 ms</em></div>
              </div>
              <div className="hb-wj4-chart">
                <svg viewBox="0 0 200 100" preserveAspectRatio="none">
                  <path d={`${line} L200 100 L0 100 Z`} fill={`color-mix(in srgb, ${v.accent} 18%, transparent)`} />
                  <path d={line} fill="none" stroke={v.accent} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
