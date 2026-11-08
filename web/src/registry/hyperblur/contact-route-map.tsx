"use client";

import * as React from "react";

export type ContactRouteMode = "walk" | "transit" | "bike";

export interface ContactRoute {
  mode: ContactRouteMode;
  label: string;
  minutes: number;
  distance: string;
  steps: string[];
}

export interface ContactRouteMapValues {
  name: string;
  email: string;
  message: string;
}

export interface ContactRouteMapProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  studio?: string;
  address?: string[];
  hours?: string;
  origin?: string;
  routes?: ContactRoute[];
  defaultMode?: ContactRouteMode;
  mapLink?: { label: string; href: string };
  onModeChange?: (mode: ContactRouteMode) => void;
  onSubmit?: (values: ContactRouteMapValues) => void | Promise<void>;
  accent?: string;
}

const defaultRoutes: ContactRoute[] = [
  { mode: "walk", label: "Walk", minutes: 17, distance: "1.3 km", steps: ["Exit Central Station via Gate B", "Follow Canal Street north for 400 m", "Turn right on Weaver Lane", "Studio is the red door at No. 14"] },
  { mode: "transit", label: "Tram", minutes: 9, distance: "3 stops", steps: ["Line 4 toward Harbour from platform 2", "Ride three stops to Mill Square", "Walk 2 minutes east on Weaver Lane", "Ring Halden at the red door"] },
  { mode: "bike", label: "Bike", minutes: 6, distance: "1.6 km", steps: ["Docking bay on the station forecourt", "Riverside cycle path, flat all the way", "Up Foundry Road to the bridge", "Racks right outside No. 14"] },
];

const paths: Record<ContactRouteMode, string> = {
  walk: "M128 440 L128 330 L376 330 L376 220 L624 220 L624 168",
  transit: "M128 440 L254 440 C 330 440 392 300 500 236 C 540 214 580 220 624 220 L624 168",
  bike: "M128 440 L500 440 L500 112 L624 112 L624 168",
};

const stops: Record<ContactRouteMode, [number, number][]> = {
  walk: [],
  transit: [[254, 440], [404, 330], [500, 236]],
  bike: [[500, 276]],
};

const cols = [0, 128, 254, 376, 500, 624, 752, 860];
const rows = [0, 112, 220, 330, 440, 560];

function hash(n: number) {
  let x = (n * 2654435761) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519) >>> 0;
  x ^= x >>> 13;
  return x >>> 0;
}

const blocks = (() => {
  const out: { x: number; y: number; w: number; h: number; kind: number }[] = [];
  let i = 0;
  for (let r = 0; r < rows.length - 1; r++) {
    for (let c = 0; c < cols.length - 1; c++) {
      const h = hash(i + 7);
      const x = cols[c] + 9;
      const y = rows[r] + 9;
      const w = cols[c + 1] - cols[c] - 18;
      const hh = rows[r + 1] - rows[r] - 18;
      const kind = r === 1 && c === 1 ? 2 : r === 3 && c === 5 ? 2 : h % 5 === 0 ? 1 : 0;
      if (kind === 0 && h % 3 === 0) {
        const split = Math.round(w * (0.38 + (h % 20) / 100));
        out.push({ x, y, w: split - 5, h: hh, kind });
        out.push({ x: x + split + 5, y, w: w - split - 5, h: hh, kind });
      } else {
        out.push({ x, y, w, h: hh, kind });
      }
      i++;
    }
  }
  return out;
})();

const css = `
@keyframes hb-wd1-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-wd1-travel { from { offset-distance: 0%; } to { offset-distance: 100%; } }
@keyframes hb-wd1-pulse { 0% { transform: scale(0.6); opacity: 0.9; } 100% { transform: scale(2.6); opacity: 0; } }
@keyframes hb-wd1-drop { 0% { transform: translateY(-26px); opacity: 0; } 60% { transform: translateY(3px); opacity: 1; } 100% { transform: none; } }
@keyframes hb-wd1-step { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: none; } }
@keyframes hb-wd1-spin { to { transform: rotate(360deg); } }
@keyframes hb-wd1-check { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
.hb-wd1 {
  --hb-wd1-accent: #10b981;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
.hb-wd1 *, .hb-wd1 *::before, .hb-wd1 *::after { box-sizing: border-box; }
.hb-wd1-in { position: relative; max-width: 1120px; margin: 0 auto; padding: 72px 20px 88px; }
.hb-wd1-head { display: grid; gap: 14px; margin-bottom: 32px; }
@container (min-width: 820px) { .hb-wd1-head { grid-template-columns: 1.1fr 1fr; align-items: end; gap: 40px; } }
.hb-wd1-eyebrow { display: inline-flex; align-items: center; gap: 8px; font: 500 12px/1 var(--font-mono, ui-monospace, monospace); letter-spacing: 0.08em; text-transform: uppercase; color: var(--hb-wd1-accent); }
.hb-wd1-eyebrow::before { content: ""; width: 18px; height: 1px; background: currentColor; }
.hb-wd1-title { margin: 10px 0 0; font: 600 clamp(30px, 4.6cqw, 48px)/1.04 var(--font-grotesk, inherit); letter-spacing: -0.03em; }
.hb-wd1-sub { margin: 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; max-width: 46ch; }
.hb-wd1-grid { display: grid; gap: 16px; }
@container (min-width: 880px) { .hb-wd1-grid { grid-template-columns: 1.45fr 1fr; gap: 0; align-items: center; } }
.hb-wd1-mapcard { position: relative; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); background: #0e0f10; overflow: hidden; box-shadow: inset 0 1px 0 rgba(255,255,255,0.05); }
.hb-wd1-svg { display: block; width: 100%; height: auto; aspect-ratio: 860 / 560; }
.hb-wd1-block { fill: #16181a; stroke: rgba(255,255,255,0.035); }
.hb-wd1-block[data-kind="1"] { fill: #1b1d20; }
.hb-wd1-block[data-kind="2"] { fill: color-mix(in srgb, var(--hb-wd1-accent) 12%, #121413); stroke: color-mix(in srgb, var(--hb-wd1-accent) 18%, transparent); }
.hb-wd1-river { fill: none; stroke: #0f1a24; stroke-width: 38; stroke-linecap: round; }
.hb-wd1-river-edge { fill: none; stroke: rgba(127,179,255,0.12); stroke-width: 40; stroke-linecap: round; }
.hb-wd1-streetname { font: 500 9px var(--font-mono, monospace); fill: #4a4d52; letter-spacing: 0.12em; text-transform: uppercase; }
.hb-wd1-ghost { fill: none; stroke: rgba(255,255,255,0.07); stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; }
.hb-wd1-route { fill: none; stroke: var(--hb-wd1-accent); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 0; animation: hb-wd1-draw 1.1s cubic-bezier(0.65, 0, 0.35, 1) both; filter: drop-shadow(0 0 6px color-mix(in srgb, var(--hb-wd1-accent) 60%, transparent)); }
.hb-wd1-route[data-mode="transit"] { stroke-dasharray: 1; }
.hb-wd1-rail { fill: none; stroke: #0e0f10; stroke-width: 1.6; stroke-dasharray: 6 8; stroke-linecap: round; }
.hb-wd1-stop { fill: #0e0f10; stroke: var(--hb-wd1-accent); stroke-width: 3; }
.hb-wd1-dot { offset-rotate: 0deg; animation: hb-wd1-travel 3.6s cubic-bezier(0.45, 0, 0.25, 1) 1.1s infinite; }
.hb-wd1-origin-pulse { transform-box: fill-box; transform-origin: center; animation: hb-wd1-pulse 2.2s cubic-bezier(0.2, 0.6, 0.3, 1) infinite; fill: #7fb3ff; }
.hb-wd1-pin { animation: hb-wd1-drop 0.7s cubic-bezier(0.3, 1.4, 0.5, 1) 0.9s both; }
.hb-wd1-label { font: 600 12px var(--font-sans, sans-serif); fill: #ededed; }
.hb-wd1-label-sub { font: 500 10px var(--font-mono, monospace); fill: #8f8f8f; }
.hb-wd1-chip-bg { fill: rgba(10,10,10,0.86); stroke: rgba(255,255,255,0.1); }
.hb-wd1-modes { position: absolute; left: 14px; top: 14px; display: flex; gap: 4px; padding: 4px; border-radius: 999px; background: rgba(10,10,10,0.78); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.hb-wd1-mode { appearance: none; border: 0; display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 999px; background: transparent; color: #a1a1a1; font: 500 12.5px/1 inherit; font-family: inherit; cursor: pointer; transition: background-color 0.25s ease, color 0.25s ease; }
.hb-wd1-mode:hover { color: #ededed; }
.hb-wd1-mode[aria-selected="true"] { background: #ededed; color: #0a0a0a; }
.hb-wd1-mode:focus-visible { outline: 2px solid var(--hb-wd1-accent); outline-offset: 2px; }
.hb-wd1-mode svg { width: 14px; height: 14px; }
.hb-wd1-eta { position: absolute; left: 14px; bottom: 14px; right: 14px; display: grid; gap: 10px; padding: 14px 16px; border-radius: 14px; background: rgba(10,10,10,0.82); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
@container (min-width: 600px) { .hb-wd1-eta { right: auto; width: min(320px, 52%); } }
.hb-wd1-eta-top { display: flex; align-items: baseline; gap: 10px; }
.hb-wd1-eta-min { font: 600 26px/1 var(--font-grotesk, inherit); letter-spacing: -0.02em; }
.hb-wd1-eta-min span { font-size: 13px; color: #8f8f8f; margin-left: 4px; font-weight: 500; }
.hb-wd1-eta-dist { margin-left: auto; font: 500 11px var(--font-mono, monospace); color: var(--hb-wd1-accent); }
.hb-wd1-steps { list-style: none; margin: 0; padding: 0; display: none; gap: 6px; counter-reset: hb-wd1-s; }
@container (min-width: 600px) { .hb-wd1-steps { display: grid; } }
.hb-wd1-steps li { position: relative; padding-left: 22px; font-size: 12px; color: #a1a1a1; line-height: 1.4; animation: hb-wd1-step 0.4s ease both; counter-increment: hb-wd1-s; }
.hb-wd1-steps li::before { content: counter(hb-wd1-s); position: absolute; left: 0; top: 0; width: 15px; height: 15px; border-radius: 50%; display: grid; place-items: center; font: 600 9px/1 var(--font-mono, monospace); color: #0a0a0a; background: #3a3d42; }
.hb-wd1-steps li:last-child::before { background: var(--hb-wd1-accent); }
.hb-wd1-form { position: relative; z-index: 2; display: grid; gap: 14px; padding: 26px; border-radius: 20px; background: linear-gradient(180deg, #161616, #111); border: 1px solid rgba(255,255,255,0.09); box-shadow: 0 30px 80px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06); }
@container (min-width: 880px) { .hb-wd1-form { margin-left: -56px; } }
.hb-wd1-studio { display: flex; gap: 12px; align-items: flex-start; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.07); }
.hb-wd1-studio-ic { flex: none; width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; background: color-mix(in srgb, var(--hb-wd1-accent) 16%, transparent); color: var(--hb-wd1-accent); }
.hb-wd1-studio-ic svg { width: 18px; height: 18px; }
.hb-wd1-studio strong { display: block; font-size: 14px; font-weight: 600; }
.hb-wd1-studio p { margin: 3px 0 0; font-size: 12.5px; color: #8f8f8f; line-height: 1.5; }
.hb-wd1-open { display: inline-flex; align-items: center; gap: 6px; margin-top: 6px; font: 500 11px var(--font-mono, monospace); color: var(--hb-wd1-accent); }
.hb-wd1-open::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 25%, transparent); }
.hb-wd1-maplink { margin-left: auto; flex: none; font-size: 12px; color: #ededed; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1px; transition: border-color 0.2s ease; }
.hb-wd1-maplink:hover { border-color: var(--hb-wd1-accent); }
.hb-wd1-maplink:focus-visible { outline: 2px solid var(--hb-wd1-accent); outline-offset: 3px; border-radius: 2px; }
.hb-wd1-row { display: grid; gap: 12px; }
@container (min-width: 480px) { .hb-wd1-row { grid-template-columns: 1fr 1fr; } }
.hb-wd1-field { display: grid; gap: 6px; }
.hb-wd1-field label { font-size: 12px; color: #a1a1a1; font-weight: 500; }
.hb-wd1-input { width: 100%; padding: 11px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.09); background: #0c0c0c; color: #ededed; font: 400 14px/1.4 inherit; font-family: inherit; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; resize: none; }
.hb-wd1-input::placeholder { color: #5b5b5b; }
.hb-wd1-input:focus { border-color: color-mix(in srgb, var(--hb-wd1-accent) 70%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wd1-accent) 18%, transparent); }
.hb-wd1-input[aria-invalid="true"] { border-color: #f87171; }
.hb-wd1-err { font-size: 11.5px; color: #f87171; min-height: 0; }
.hb-wd1-submit { appearance: none; border: 0; display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 44px; border-radius: 12px; background: var(--hb-wd1-accent); color: #04110b; font: 600 14px/1 inherit; font-family: inherit; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 24px -10px var(--hb-wd1-accent); transition: transform 0.2s cubic-bezier(0.3, 1.4, 0.5, 1), filter 0.2s ease; }
.hb-wd1-submit:hover { filter: brightness(1.08); }
.hb-wd1-submit:active { transform: scale(0.98); }
.hb-wd1-submit:disabled { cursor: progress; filter: saturate(0.6); }
.hb-wd1-submit:focus-visible { outline: 2px solid #ededed; outline-offset: 3px; }
.hb-wd1-spinner { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(4,17,11,0.25); border-top-color: #04110b; animation: hb-wd1-spin 0.7s linear infinite; }
.hb-wd1-done { display: grid; justify-items: center; text-align: center; gap: 10px; padding: 30px 8px; }
.hb-wd1-done svg { width: 52px; height: 52px; }
.hb-wd1-done circle { fill: color-mix(in srgb, var(--hb-wd1-accent) 16%, transparent); stroke: var(--hb-wd1-accent); stroke-width: 1.5; }
.hb-wd1-done path { fill: none; stroke: var(--hb-wd1-accent); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 24; animation: hb-wd1-check 0.5s ease 0.15s both; }
.hb-wd1-done strong { font-size: 17px; }
.hb-wd1-done p { margin: 0; font-size: 13px; color: #8f8f8f; max-width: 32ch; line-height: 1.5; }
.hb-wd1-again { appearance: none; background: none; border: 0; color: #ededed; font: 500 12.5px inherit; font-family: inherit; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
@media (prefers-reduced-motion: reduce) {
  .hb-wd1 *, .hb-wd1 *::before, .hb-wd1 *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; animation-delay: 0s !important; transition: none !important; }
  .hb-wd1-dot, .hb-wd1-origin-pulse { display: none; }
}
`;

function ModeIcon({ mode }: { mode: ContactRouteMode }) {
  if (mode === "walk") {
    return (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="2.6" r="1.4" />
        <path d="M6 15l2-5 2 2v3M8 10l-.6-3.4L5 8M7.4 6.6L10 5.6l1.6 2.4 1.6.6" />
      </svg>
    );
  }
  if (mode === "transit") {
    return (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="2" width="9" height="10" rx="2.4" />
        <path d="M3.5 7.5h9M6 14.5l1-2.5M10 14.5l-1-2.5M6 1h4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="3.6" cy="11" r="2.6" />
      <circle cx="12.4" cy="11" r="2.6" />
      <path d="M3.6 11L6.4 5.5h4.4L12.4 11M6.4 5.5L8.6 11l2.2-5.5M5.6 3.6h2" />
    </svg>
  );
}

export function ContactRouteMap({
  eyebrow = "Visit the studio",
  title = "Come by for coffee, leave with a plan",
  subtitle = "We are a six minute ride from Central Station. Pick how you are getting here and send us a note so someone is at the door.",
  studio = "Halden Studio",
  address = ["14 Weaver Lane, 2nd floor", "Mill Quarter, Rotterdam"],
  hours = "Open today until 18:00",
  origin = "Central Station",
  routes = defaultRoutes,
  defaultMode = "transit",
  mapLink = { label: "Open in maps", href: "#" },
  onModeChange,
  onSubmit,
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: ContactRouteMapProps) {
  const uid = React.useId().replace(/:/g, "");
  const [mode, setMode] = React.useState<ContactRouteMode>(routes.some((r) => r.mode === defaultMode) ? defaultMode : routes[0]?.mode ?? "walk");
  const [values, setValues] = React.useState<ContactRouteMapValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = React.useState<Partial<Record<keyof ContactRouteMapValues, string>>>({});
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle");
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const route = routes.find((r) => r.mode === mode) ?? routes[0];
  const d = paths[mode];

  const choose = (m: ContactRouteMode) => {
    setMode(m);
    onModeChange?.(m);
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + routes.length) % routes.length;
    choose(routes[n].mode);
    tabRefs.current[n]?.focus();
  };

  const update = (k: keyof ContactRouteMapValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof ContactRouteMapValues, string>> = {};
    if (!values.name.trim()) next.name = "Tell us who is coming";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Use a valid email";
    if (values.message.trim().length < 8) next.message = "A few more words, please";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    try {
      if (onSubmit) await onSubmit(values);
      else await new Promise((r) => setTimeout(r, 900));
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <section className={`hb-wd1 ${className}`} style={{ "--hb-wd1-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-contact-route-map" precedence="default">{css}</style>
      <div className="hb-wd1-in">
        <div className="hb-wd1-head">
          <div>
            <span className="hb-wd1-eyebrow">{eyebrow}</span>
            <h2 className="hb-wd1-title">{title}</h2>
          </div>
          <p className="hb-wd1-sub">{subtitle}</p>
        </div>
        <div className="hb-wd1-grid">
          <div className="hb-wd1-mapcard">
            <svg className="hb-wd1-svg" viewBox="0 0 860 560" role="img" aria-label={`Map from ${origin} to ${studio}, ${route?.minutes ?? 0} minutes by ${route?.label.toLowerCase() ?? mode}`}>
              <defs>
                <pattern id={`hb-wd1-grid-${uid}`} width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M16 0H0V16" fill="none" stroke="rgba(255,255,255,0.025)" />
                </pattern>
              </defs>
              <rect width="860" height="560" fill="#0c0d0e" />
              <rect width="860" height="560" fill={`url(#hb-wd1-grid-${uid})`} />
              {blocks.map((b, i) => (
                <rect key={i} className="hb-wd1-block" data-kind={b.kind} x={b.x} y={b.y} width={b.w} height={b.h} rx="6" />
              ))}
              <path className="hb-wd1-river-edge" d="M-20 300 C 120 360 160 520 320 600" />
              <path className="hb-wd1-river" d="M-20 300 C 120 360 160 520 320 600" />
              <text className="hb-wd1-streetname" x="140" y="200" transform="rotate(-90 140 200)">Canal Street</text>
              <text className="hb-wd1-streetname" x="400" y="226">Weaver Lane</text>
              <text className="hb-wd1-streetname" x="560" y="446">Foundry Road</text>
              <path className="hb-wd1-ghost" d={paths.walk} />
              <path className="hb-wd1-ghost" d={paths.transit} />
              <path className="hb-wd1-ghost" d={paths.bike} />
              <path key={mode} className="hb-wd1-route" data-mode={mode} d={d} pathLength={1} />
              {mode === "transit" && <path key={`${mode}-rail`} className="hb-wd1-rail" d={d} />}
              {stops[mode].map(([x, y], i) => (
                <circle key={`${mode}-${i}`} className="hb-wd1-stop" cx={x} cy={y} r="6" />
              ))}
              <circle className="hb-wd1-dot" r="6" fill="#ededed" style={{ offsetPath: `path("${d}")` } as React.CSSProperties} key={`${mode}-dot`} />
              <circle className="hb-wd1-origin-pulse" cx="128" cy="440" r="9" />
              <circle cx="128" cy="440" r="8" fill="#7fb3ff" stroke="#0a0a0a" strokeWidth="3" />
              <g transform="translate(144 452)">
                <rect className="hb-wd1-chip-bg" width="128" height="40" rx="10" />
                <text className="hb-wd1-label" x="12" y="17">{origin}</text>
                <text className="hb-wd1-label-sub" x="12" y="31">YOU START HERE</text>
              </g>
              <g className="hb-wd1-pin" key={`${mode}-pin`}>
                <path d="M624 168 c-14 -16 -22 -26 -22 -38 a22 22 0 0 1 44 0 c0 12 -8 22 -22 38z" fill="var(--hb-wd1-accent)" stroke="#0a0a0a" strokeWidth="2.5" />
                <circle cx="624" cy="130" r="7.5" fill="#0a0a0a" />
                <g transform="translate(656 104)">
                  <rect className="hb-wd1-chip-bg" width="118" height="40" rx="10" />
                  <text className="hb-wd1-label" x="12" y="17">{studio}</text>
                  <text className="hb-wd1-label-sub" x="12" y="31">NO. 14, RED DOOR</text>
                </g>
              </g>
            </svg>
            <div className="hb-wd1-modes" role="tablist" aria-label="How are you getting here">
              {routes.map((r, i) => (
                <button
                  key={r.mode}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={r.mode === mode}
                  tabIndex={r.mode === mode ? 0 : -1}
                  className="hb-wd1-mode"
                  onClick={() => choose(r.mode)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <ModeIcon mode={r.mode} />
                  {r.label}
                </button>
              ))}
            </div>
            {route && (
              <div className="hb-wd1-eta" aria-live="polite">
                <div className="hb-wd1-eta-top">
                  <span className="hb-wd1-eta-min">
                    {route.minutes}
                    <span>min</span>
                  </span>
                  <span className="hb-wd1-eta-dist">{route.distance}</span>
                </div>
                <ol className="hb-wd1-steps" key={mode}>
                  {route.steps.map((s, i) => (
                    <li key={s} style={{ animationDelay: `${(0.25 + i * 0.08).toFixed(2)}s` }}>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          <form className="hb-wd1-form" onSubmit={submit} noValidate>
            <div className="hb-wd1-studio">
              <span className="hb-wd1-studio-ic" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17V8l7-5 7 5v9M8 17v-5h4v5" />
                </svg>
              </span>
              <div>
                <strong>{studio}</strong>
                {address.map((l) => (
                  <p key={l}>{l}</p>
                ))}
                <span className="hb-wd1-open">{hours}</span>
              </div>
              <a className="hb-wd1-maplink" href={mapLink.href}>
                {mapLink.label}
              </a>
            </div>
            {status === "sent" ? (
              <div className="hb-wd1-done" role="status">
                <svg viewBox="0 0 52 52" aria-hidden="true">
                  <circle cx="26" cy="26" r="24" />
                  <path d="M17 27l6 6 12-13" />
                </svg>
                <strong>See you soon, {values.name.split(" ")[0]}</strong>
                <p>
                  We will keep the door open. Take the {route?.label.toLowerCase()} from {origin}, about {route?.minutes} minutes.
                </p>
                <button
                  type="button"
                  className="hb-wd1-again"
                  onClick={() => {
                    setStatus("idle");
                    setValues({ name: "", email: "", message: "" });
                  }}
                >
                  Send another note
                </button>
              </div>
            ) : (
              <>
                <div className="hb-wd1-row">
                  <div className="hb-wd1-field">
                    <label htmlFor={`${uid}-n`}>Name</label>
                    <input id={`${uid}-n`} className="hb-wd1-input" value={values.name} onChange={update("name")} placeholder="Ada Brandt" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-ne` : undefined} />
                    {errors.name && <span id={`${uid}-ne`} className="hb-wd1-err">{errors.name}</span>}
                  </div>
                  <div className="hb-wd1-field">
                    <label htmlFor={`${uid}-e`}>Email</label>
                    <input id={`${uid}-e`} type="email" className="hb-wd1-input" value={values.email} onChange={update("email")} placeholder="ada@northfield.io" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-ee` : undefined} />
                    {errors.email && <span id={`${uid}-ee`} className="hb-wd1-err">{errors.email}</span>}
                  </div>
                </div>
                <div className="hb-wd1-field">
                  <label htmlFor={`${uid}-m`}>What should we prepare?</label>
                  <textarea id={`${uid}-m`} rows={3} className="hb-wd1-input" value={values.message} onChange={update("message")} placeholder="Thursday around 15:00, we want to talk about our booking flow." aria-invalid={!!errors.message} aria-describedby={errors.message ? `${uid}-me` : undefined} />
                  {errors.message && <span id={`${uid}-me`} className="hb-wd1-err">{errors.message}</span>}
                </div>
                <button type="submit" className="hb-wd1-submit" disabled={status === "sending"}>
                  {status === "sending" ? <span className="hb-wd1-spinner" aria-hidden="true" /> : null}
                  {status === "sending" ? "Sending" : "Let us know you are coming"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
