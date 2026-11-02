"use client";

import * as React from "react";

export interface DownloadAppBadge {
  platform: "ios" | "android";
  caption: string;
  label: string;
  href: string;
}

export interface DownloadAppBadgesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  appName?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  badges?: DownloadAppBadge[];
  rating?: number;
  ratingCount?: string;
  downloads?: string;
  qrLabel?: string;
  qrHint?: string;
  qrValue?: string;
  onBadgeClick?: (platform: "ios" | "android") => void;
  accent?: string;
}

const css = `
@keyframes hb-kh6-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -10px, 0); }
}
@keyframes hb-kh6-draw { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }
@keyframes hb-kh6-ring {
  0% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.25); opacity: 0; }
}
@keyframes hb-kh6-bar { from { transform: scaleX(0); } }
.hb-kh6 {
  --hb-kh6-accent: #f5a524;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kh6 *, .hb-kh6 *::before, .hb-kh6 *::after { box-sizing: border-box; }
.hb-kh6::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(38% 50% at 72% 50%, color-mix(in srgb, var(--hb-kh6-accent) 16%, transparent), transparent 70%),
    radial-gradient(30% 40% at 10% 10%, rgba(255, 255, 255, 0.03), transparent 70%);
}
.hb-kh6-in {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px 80px;
}
.hb-kh6-copy { min-width: 0; }
.hb-kh6-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 12px 0 4px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: #c4c4c4;
  font-size: 12.5px;
}
.hb-kh6-eyebrow b {
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--hb-kh6-accent);
  color: #1a1203;
  font-size: 11px;
  font-weight: 700;
}
.hb-kh6-title {
  margin: 18px 0 0;
  font-size: clamp(34px, 4.8cqw, 54px);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.045em;
  text-wrap: balance;
}
.hb-kh6-title span { color: var(--hb-kh6-accent); }
.hb-kh6-sub {
  max-width: 460px;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kh6-get {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 16px;
  margin-top: 30px;
}
.hb-kh6-badges { display: flex; flex-direction: column; gap: 10px; }
.hb-kh6-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 172px;
  height: 54px;
  padding: 0 18px 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  background: linear-gradient(180deg, #1a1a1a, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 10px 24px -14px rgba(0, 0, 0, 0.9);
  color: #ffffff;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
}
.hb-kh6-badge:hover { border-color: rgba(255, 255, 255, 0.3); transform: translateY(-2px); }
.hb-kh6-badge:focus-visible { outline: 2px solid var(--hb-kh6-accent); outline-offset: 3px; }
.hb-kh6-badge svg { flex: none; width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh6-bt { display: flex; flex-direction: column; line-height: 1.1; }
.hb-kh6-bt small { color: #a1a1a1; font-size: 11px; }
.hb-kh6-bt strong { margin-top: 2px; font-size: 17px; font-weight: 600; letter-spacing: -0.01em; }
.hb-kh6-qr {
  display: none;
  align-items: center;
  gap: 14px;
  padding: 10px 16px 10px 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
}
.hb-kh6-qrcode {
  flex: none;
  width: 98px;
  height: 98px;
  padding: 7px;
  border-radius: 12px;
  background: #ffffff;
}
.hb-kh6-qrcode svg { display: block; width: 100%; height: 100%; }
.hb-kh6-qrcode path { fill: #0a0a0a; }
.hb-kh6-qrt { max-width: 128px; }
.hb-kh6-qrt strong { display: block; font-size: 14px; font-weight: 600; }
.hb-kh6-qrt span { display: block; margin-top: 4px; color: #8f8f8f; font-size: 12.5px; line-height: 1.45; }
.hb-kh6-rate {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;
  margin-top: 26px;
  color: #8f8f8f;
  font-size: 13.5px;
}
.hb-kh6-stars { display: inline-flex; gap: 2px; color: var(--hb-kh6-accent); }
.hb-kh6-stars svg { width: 16px; height: 16px; fill: currentColor; }
.hb-kh6-rate b { color: #ededed; font-weight: 600; }
.hb-kh6-sep { width: 1px; height: 14px; background: rgba(255, 255, 255, 0.14); }
.hb-kh6-stage {
  position: relative;
  width: 100%;
  max-width: 520px;
  height: 520px;
  margin: 0 auto;
}
.hb-kh6-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid color-mix(in srgb, var(--hb-kh6-accent) 30%, transparent);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
}
.hb-kh6-ring-a { width: 360px; height: 360px; animation: hb-kh6-ring 4s ease-out infinite; }
.hb-kh6-ring-b { width: 360px; height: 360px; animation: hb-kh6-ring 4s ease-out 2s infinite; }
.hb-kh6-ring-c { width: 470px; height: 470px; border-color: rgba(255, 255, 255, 0.05); }
.hb-kh6-phone {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 236px;
  height: 484px;
  padding: 9px;
  border-radius: 44px;
  background: linear-gradient(145deg, #2a2a2a, #121212 40%, #1d1d1d);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.8), 0 50px 90px -30px rgba(0, 0, 0, 0.95), 0 0 80px -20px color-mix(in srgb, var(--hb-kh6-accent) 35%, transparent);
  transform: translate(-50%, -50%);
}
.hb-kh6-screen {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 12px 14px 0;
  border-radius: 36px;
  background:
    radial-gradient(120% 60% at 50% 0%, color-mix(in srgb, var(--hb-kh6-accent) 22%, transparent), transparent 60%),
    #0c0c0c;
}
.hb-kh6-island {
  position: absolute;
  top: 9px;
  left: 50%;
  width: 74px;
  height: 22px;
  margin-left: -37px;
  border-radius: 999px;
  background: #000000;
}
.hb-kh6-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 22px;
  padding: 0 8px;
  font-size: 11px;
  font-weight: 600;
}
.hb-kh6-status i { display: inline-block; width: 16px; height: 8px; border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 3px; }
.hb-kh6-hi { margin-top: 16px; color: #a1a1a1; font-size: 11.5px; }
.hb-kh6-bal { margin-top: 2px; font-size: 30px; font-weight: 600; letter-spacing: -0.04em; font-variant-numeric: tabular-nums; }
.hb-kh6-bal small { color: #8f8f8f; font-size: 16px; }
.hb-kh6-delta { display: inline-flex; margin-top: 4px; padding: 2px 7px; border-radius: 999px; background: rgba(74, 222, 128, 0.12); color: #4ade80; font-size: 10.5px; font-weight: 600; }
.hb-kh6-chart { display: block; width: 100%; height: 56px; margin-top: 10px; }
.hb-kh6-line { fill: none; stroke: var(--hb-kh6-accent); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 300; animation: hb-kh6-draw 2.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both; }
.hb-kh6-area { fill: color-mix(in srgb, var(--hb-kh6-accent) 16%, transparent); }
.hb-kh6-dotc { fill: #ffffff; stroke: var(--hb-kh6-accent); stroke-width: 2; }
.hb-kh6-cats { display: grid; gap: 9px; margin-top: 12px; }
.hb-kh6-cat { font-size: 11px; }
.hb-kh6-cat > div:first-child { display: flex; justify-content: space-between; color: #bdbdbd; }
.hb-kh6-cat > div:first-child span:last-child { color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-kh6-track { height: 5px; margin-top: 5px; border-radius: 3px; background: rgba(255, 255, 255, 0.08); overflow: hidden; }
.hb-kh6-fill { height: 100%; border-radius: 3px; transform-origin: left; animation: hb-kh6-bar 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-delay: calc(var(--i) * 120ms + 400ms); }
.hb-kh6-txs { display: grid; gap: 2px; margin-top: 14px; }
.hb-kh6-tx { display: flex; align-items: center; gap: 9px; padding: 7px 0; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 11.5px; }
.hb-kh6-txi { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 8px; background: rgba(255, 255, 255, 0.06); color: #d4d4d4; font-size: 10px; font-weight: 700; }
.hb-kh6-tx span:nth-child(2) { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.hb-kh6-tx b { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-kh6-tabs {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  height: 52px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(12, 12, 12, 0.92);
}
.hb-kh6-tabs i { width: 18px; height: 18px; border-radius: 6px; background: rgba(255, 255, 255, 0.14); }
.hb-kh6-tabs i:first-child { background: var(--hb-kh6-accent); }
.hb-kh6-float {
  position: absolute;
  z-index: 2;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: rgba(22, 22, 22, 0.82);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 24px 50px -20px rgba(0, 0, 0, 0.9);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  font-size: 12px;
  animation: hb-kh6-bob 6s ease-in-out infinite;
}
.hb-kh6-fa { top: 64px; left: 0; animation-delay: -1s; }
.hb-kh6-fb { top: 216px; right: 0; width: 214px; animation-delay: -3s; }
.hb-kh6-fc { bottom: 54px; left: 8px; animation-delay: -4.5s; }
.hb-kh6-flbl { color: #8f8f8f; font-size: 11px; }
.hb-kh6-fval { display: flex; align-items: center; gap: 6px; margin-top: 3px; color: #4ade80; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.hb-kh6-fval svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh6-note { display: flex; align-items: flex-start; gap: 10px; }
.hb-kh6-appico { display: grid; flex: none; place-items: center; width: 30px; height: 30px; border-radius: 9px; background: var(--hb-kh6-accent); color: #1a1203; font-size: 13px; font-weight: 800; }
.hb-kh6-note strong { display: flex; justify-content: space-between; gap: 8px; font-size: 12.5px; font-weight: 600; }
.hb-kh6-note strong span { color: #6f6f6f; font-weight: 400; font-size: 11px; }
.hb-kh6-note p { margin: 2px 0 0; color: #a1a1a1; font-size: 11.5px; line-height: 1.4; }
.hb-kh6-goal { display: flex; align-items: center; gap: 12px; }
.hb-kh6-goal svg { flex: none; width: 42px; height: 42px; transform: rotate(-90deg); }
.hb-kh6-goal circle { fill: none; stroke-width: 5; }
.hb-kh6-goal strong { display: block; font-size: 13px; font-weight: 600; }
.hb-kh6-goal span { display: block; margin-top: 2px; color: #8f8f8f; font-size: 11.5px; font-variant-numeric: tabular-nums; }
@container (min-width: 560px) {
  .hb-kh6-qr { display: flex; }
}
@container (max-width: 459px) {
  .hb-kh6-stage { height: 470px; }
  .hb-kh6-phone { transform: translate(-50%, -50%) scale(0.88); }
  .hb-kh6-ring-c { display: none; }
  .hb-kh6-fb { width: 190px; }
  .hb-kh6-float { padding: 10px 12px; }
  .hb-kh6-fa { top: 40px; }
  .hb-kh6-fc { bottom: 36px; }
  .hb-kh6-badge { min-width: 0; width: 100%; }
  .hb-kh6-badges { width: 100%; }
}
@container (min-width: 720px) {
  .hb-kh6-in { padding: 88px 40px 96px; }
}
@container (min-width: 880px) {
  .hb-kh6-in { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 48px; padding: 72px 40px 80px; }
  .hb-kh6-stage { height: 560px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kh6 *, .hb-kh6 *::before, .hb-kh6 *::after { animation: none !important; transition: none !important; }
  .hb-kh6-ring-a, .hb-kh6-ring-b { opacity: 0.4; }
}
`;

const defaultBadges: DownloadAppBadge[] = [
  { platform: "ios", caption: "Download for", label: "iPhone", href: "#" },
  { platform: "android", caption: "Get it for", label: "Android", href: "#" },
];

function hash(n: number) {
  let x = (n + 7) * 2654435761;
  x = (x ^ (x >>> 15)) * 2246822519;
  x = x ^ (x >>> 13);
  return (x >>> 0) / 4294967295;
}

function seedOf(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 33 + text.charCodeAt(i)) | 0;
  return Math.abs(h) % 9973;
}

function qrPath(seed: number) {
  const size = 25;
  const finder = (r: number, c: number) => {
    const inBox = (r0: number, c0: number) => r >= r0 - 1 && r <= r0 + 7 && c >= c0 - 1 && c <= c0 + 7;
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0);
  };
  const ring = (r0: number, c0: number, r: number, c: number) => {
    const dr = r - r0;
    const dc = c - c0;
    if (dr < 0 || dc < 0 || dr > 6 || dc > 6) return false;
    if (dr === 0 || dr === 6 || dc === 0 || dc === 6) return true;
    return dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
  };
  let d = "";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      let on = false;
      if (finder(r, c)) {
        on = ring(0, 0, r, c) || ring(0, size - 7, r, c) || ring(size - 7, 0, r, c);
      } else if (r === 6 || c === 6) {
        on = (r + c) % 2 === 0;
      } else if (r >= 16 && r <= 20 && c >= 16 && c <= 20) {
        on = r === 16 || r === 20 || c === 16 || c === 20 || (r === 18 && c === 18);
      } else {
        on = hash(r * 31 + c * 7 + seed) > 0.52;
      }
      if (on) d += `M${c} ${r}h1v1h-1z`;
    }
  }
  return d;
}

function BadgeGlyph({ platform }: { platform: "ios" | "android" }) {
  if (platform === "android") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
        <circle cx="12" cy="5.6" r="0.6" />
        <path d="M10 18.5h4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="2.5" width="12" height="19" rx="3.2" />
      <path d="M10.2 4.8h3.6M10.5 19h3" />
    </svg>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" />
    </svg>
  );
}

const chart = [18, 22, 20, 28, 26, 34, 31, 40, 38, 46, 44, 52];

function chartPaths() {
  const w = 200;
  const h = 70;
  const pts = chart.map((v, i) => [(i / (chart.length - 1)) * w, h - 6 - (v / 56) * (h - 14)] as const);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  const last = pts[pts.length - 1];
  return { line, area, cx: last[0].toFixed(1), cy: last[1].toFixed(1) };
}

const paths = chartPaths();

const cats = [
  { n: "Groceries", v: "$412 / $560", p: 0.74, c: "#f5a524" },
  { n: "Dining out", v: "$138 / $300", p: 0.46, c: "#f97362" },
  { n: "Transport", v: "$64 / $200", p: 0.32, c: "#60a5fa" },
];

const txs = [
  { i: "WF", n: "Whole Foods Market", v: "-$48.20" },
  { i: "MT", n: "Metro card top-up", v: "-$20.00" },
  { i: "PY", n: "Payroll, Brightline", v: "+$2,640" },
];

export function DownloadAppBadges({
  appName = "Tally",
  eyebrow = "Tally 3.0 is here for phones",
  title = "Your budget, finally in your pocket",
  subtitle = "See what is safe to spend before you tap your card. Tally sorts every purchase, warns you before a bill and keeps your goals on track.",
  badges = defaultBadges,
  rating = 4.9,
  ratingCount = "38,200 ratings",
  downloads = "1.2M downloads",
  qrLabel = "Scan to install",
  qrHint = "Point your phone camera here and we will open the right store.",
  qrValue = "https://tally.example/get",
  onBadgeClick,
  accent = "#f5a524",
  className,
  style,
  ...rest
}: DownloadAppBadgesProps) {
  const qr = React.useMemo(() => qrPath(seedOf(qrValue)), [qrValue]);
  const goal = 0.68;
  const circ = 2 * Math.PI * 17;

  return (
    <section
      className={["hb-kh6", className].filter(Boolean).join(" ")}
      style={{ ["--hb-kh6-accent" as string]: accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-download-app-badges" precedence="default">{css}</style>
      <div className="hb-kh6-in">
        <div className="hb-kh6-copy">
          {eyebrow ? (
            <span className="hb-kh6-eyebrow">
              <b>New</b>
              {eyebrow}
            </span>
          ) : null}
          <h2 className="hb-kh6-title">{title}</h2>
          {subtitle ? <p className="hb-kh6-sub">{subtitle}</p> : null}
          <div className="hb-kh6-get">
            <div className="hb-kh6-badges">
              {badges.map((b) => (
                <a key={b.platform + b.label} className="hb-kh6-badge" href={b.href} onClick={() => onBadgeClick?.(b.platform)}>
                  <BadgeGlyph platform={b.platform} />
                  <span className="hb-kh6-bt">
                    <small>{b.caption}</small>
                    <strong>{b.label}</strong>
                  </span>
                </a>
              ))}
            </div>
            <div className="hb-kh6-qr">
              <div className="hb-kh6-qrcode" role="img" aria-label={`QR code linking to ${qrValue}`}>
                <svg viewBox="0 0 25 25" shapeRendering="crispEdges" aria-hidden="true">
                  <path d={qr} />
                </svg>
              </div>
              <div className="hb-kh6-qrt">
                <strong>{qrLabel}</strong>
                <span>{qrHint}</span>
              </div>
            </div>
          </div>
          <div className="hb-kh6-rate">
            <span className="hb-kh6-stars" role="img" aria-label={`Rated ${rating} out of 5`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} />
              ))}
            </span>
            <span>
              <b>{rating.toFixed(1)}</b> from {ratingCount}
            </span>
            {downloads ? (
              <>
                <span className="hb-kh6-sep" aria-hidden="true" />
                <span>{downloads}</span>
              </>
            ) : null}
          </div>
        </div>
        <div className="hb-kh6-stage" aria-hidden="true">
          <span className="hb-kh6-ring hb-kh6-ring-c" />
          <span className="hb-kh6-ring hb-kh6-ring-a" />
          <span className="hb-kh6-ring hb-kh6-ring-b" />
          <div className="hb-kh6-phone">
            <div className="hb-kh6-screen">
              <span className="hb-kh6-island" />
              <div className="hb-kh6-status">
                <span>9:41</span>
                <i />
              </div>
              <div className="hb-kh6-hi">Safe to spend until Friday</div>
              <div className="hb-kh6-bal">
                $1,284<small>.50</small>
              </div>
              <span className="hb-kh6-delta">+12% vs last month</span>
              <svg className="hb-kh6-chart" viewBox="0 0 200 70" preserveAspectRatio="none">
                <path className="hb-kh6-area" d={paths.area} />
                <path className="hb-kh6-line" d={paths.line} />
                <circle className="hb-kh6-dotc" cx={paths.cx} cy={paths.cy} r="3.5" />
              </svg>
              <div className="hb-kh6-cats">
                {cats.map((c, i) => (
                  <div key={c.n} className="hb-kh6-cat">
                    <div>
                      <span>{c.n}</span>
                      <span>{c.v}</span>
                    </div>
                    <div className="hb-kh6-track">
                      <div
                        className="hb-kh6-fill"
                        style={{ width: `${(c.p * 100).toFixed(0)}%`, background: c.c, ["--i" as string]: i } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="hb-kh6-txs">
                {txs.map((t) => (
                  <div key={t.n} className="hb-kh6-tx">
                    <span className="hb-kh6-txi">{t.i}</span>
                    <span>{t.n}</span>
                    <b style={t.v.startsWith("+") ? { color: "#4ade80" } : undefined}>{t.v}</b>
                  </div>
                ))}
              </div>
              <div className="hb-kh6-tabs">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
          <div className="hb-kh6-float hb-kh6-fa">
            <div className="hb-kh6-flbl">Saved this month</div>
            <div className="hb-kh6-fval">
              <svg viewBox="0 0 16 16">
                <path d="M8 13V3M4 7l4-4 4 4" />
              </svg>
              $320.00
            </div>
          </div>
          <div className="hb-kh6-float hb-kh6-fb">
            <div className="hb-kh6-note">
              <span className="hb-kh6-appico">{appName.charAt(0)}</span>
              <div>
                <strong>
                  Rent paid <span>now</span>
                </strong>
                <p>$1,450 to Parkside Lofts. You are still $212 under budget.</p>
              </div>
            </div>
          </div>
          <div className="hb-kh6-float hb-kh6-fc">
            <div className="hb-kh6-goal">
              <svg viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="17" stroke="rgba(255,255,255,0.1)" />
                <circle
                  cx="21"
                  cy="21"
                  r="17"
                  stroke={accent}
                  strokeLinecap="round"
                  strokeDasharray={`${(circ * goal).toFixed(2)} ${circ.toFixed(2)}`}
                />
              </svg>
              <div>
                <strong>Japan trip</strong>
                <span>$2,040 of $3,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
