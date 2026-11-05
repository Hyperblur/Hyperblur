"use client";

import * as React from "react";

export interface DownloadQrHandoffProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  url?: string;
  steps?: string[];
  refreshSeconds?: number;
  session?: { title: string; detail: string };
  onSend?: (phone: string) => void;
  storeLinks?: { label: string; href: string }[];
  accent?: string;
}

const css = `
.hb-yhc {
  --hb-yhc-accent: #8b5cf6;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  overflow: hidden;
  padding: clamp(64px, 8cqi, 104px) 20px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yhc *, .hb-yhc *::before, .hb-yhc *::after { box-sizing: border-box; }
.hb-yhc-in {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 40px;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(28px, 4.5cqi, 56px);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 28px;
  background:
    radial-gradient(60% 80% at 100% 50%, color-mix(in srgb, var(--hb-yhc-accent) 24%, transparent), transparent 70%),
    radial-gradient(40% 50% at 0% 0%, rgba(56,189,248,.08), transparent 70%),
    linear-gradient(180deg, #121212, #0c0c0c);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
  overflow: hidden;
}
.hb-yhc-in::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px); background-size: 32px 32px; -webkit-mask-image: radial-gradient(50% 70% at 80% 50%, #000, transparent); mask-image: radial-gradient(50% 70% at 80% 50%, #000, transparent); pointer-events: none; }
.hb-yhc-copy { position: relative; min-width: 0; }
.hb-yhc-eyebrow { display: inline-flex; align-items: center; gap: 8px; color: #a1a1a1; font-size: 13px; font-weight: 500; }
.hb-yhc-eyebrow svg { width: 15px; height: 15px; fill: none; stroke: var(--hb-yhc-accent); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-yhc-title { margin: 14px 0 0; font-size: clamp(28px, 4cqi, 44px); font-weight: 650; letter-spacing: -.035em; line-height: 1.06; }
.hb-yhc-sub { margin: 12px 0 0; max-width: 440px; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-yhc-steps { display: grid; gap: 12px; margin: 26px 0 0; padding: 0; list-style: none; counter-reset: hb-yhc-n; }
.hb-yhc-step { display: flex; align-items: center; gap: 12px; color: #c9c9c9; font-size: 14px; counter-increment: hb-yhc-n; }
.hb-yhc-step::before { content: counter(hb-yhc-n); display: grid; place-items: center; flex: none; width: 26px; height: 26px; border: 1px solid rgba(255,255,255,.12); border-radius: 50%; background: rgba(255,255,255,.04); color: #ededed; font-size: 12px; font-weight: 650; }
.hb-yhc-form { display: flex; gap: 8px; max-width: 420px; margin-top: 28px; padding: 5px; border: 1px solid rgba(255,255,255,.1); border-radius: 999px; background: rgba(0,0,0,.35); transition: border-color .2s ease, box-shadow .2s ease; }
.hb-yhc-form:focus-within { border-color: color-mix(in srgb, var(--hb-yhc-accent) 60%, transparent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-yhc-accent) 18%, transparent); }
.hb-yhc-input { flex: 1; min-width: 0; height: 40px; padding: 0 14px; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 14px; outline: none; }
.hb-yhc-input::placeholder { color: #6f6f6f; }
.hb-yhc-send { flex: none; height: 40px; padding: 0 18px; border: 0; border-radius: 999px; background: #ededed; color: #0a0a0a; font: inherit; font-size: 13.5px; font-weight: 650; cursor: pointer; transition: background-color .2s ease, transform .15s ease; }
.hb-yhc-send:hover { background: #fff; }
.hb-yhc-send:active { transform: scale(.97); }
.hb-yhc-send:focus-visible, .hb-yhc-store:focus-visible { outline: 2px solid var(--hb-yhc-accent); outline-offset: 2px; }
.hb-yhc-msg { min-height: 20px; margin: 10px 0 0 6px; color: #8f8f8f; font-size: 12.5px; }
.hb-yhc-msg[data-ok="true"] { color: color-mix(in srgb, var(--hb-yhc-accent) 55%, #fff); }
.hb-yhc-stores { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.hb-yhc-store { display: inline-flex; align-items: center; gap: 7px; height: 34px; padding: 0 14px; border: 1px solid rgba(255,255,255,.1); border-radius: 10px; color: #c4c4c4; font-size: 12.5px; font-weight: 600; text-decoration: none; transition: border-color .2s ease, color .2s ease; }
.hb-yhc-store:hover { border-color: rgba(255,255,255,.22); color: #fff; }
.hb-yhc-store svg { width: 14px; height: 14px; fill: currentColor; }
.hb-yhc-vis { position: relative; display: flex; justify-content: center; align-items: center; min-height: 400px; }
.hb-yhc-card {
  position: relative;
  z-index: 2;
  width: 270px;
  padding: 20px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 26px;
  background: linear-gradient(180deg, rgba(30,30,34,.92), rgba(18,18,20,.94));
  backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 40px 80px -30px rgba(0,0,0,.9), 0 0 60px -20px color-mix(in srgb, var(--hb-yhc-accent) 50%, transparent);
  animation: hb-yhc-float 7s ease-in-out infinite;
}
.hb-yhc-qr { position: relative; padding: 14px; border-radius: 18px; background: #fff; overflow: hidden; }
.hb-yhc-qr svg { display: block; width: 100%; height: auto; }
.hb-yhc-mod { fill: #0a0a0a; transition: opacity .4s ease; }
.hb-yhc-qr[data-fresh="true"] .hb-yhc-mod { animation: hb-yhc-fresh .6s ease; }
.hb-yhc-logo { position: absolute; top: 50%; left: 50%; display: grid; place-items: center; width: 46px; height: 46px; border: 4px solid #fff; border-radius: 13px; background: linear-gradient(135deg, var(--hb-yhc-accent), #312e81); color: #fff; transform: translate(-50%, -50%); }
.hb-yhc-logo svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-yhc-scan { position: absolute; left: 6px; right: 6px; top: 0; height: 2px; border-radius: 2px; background: var(--hb-yhc-accent); box-shadow: 0 0 12px 2px color-mix(in srgb, var(--hb-yhc-accent) 70%, transparent); animation: hb-yhc-scan 2.6s cubic-bezier(.45,0,.55,1) infinite; pointer-events: none; }
.hb-yhc-scan::after { content: ""; position: absolute; left: 0; right: 0; bottom: 2px; height: 46px; background: linear-gradient(0deg, color-mix(in srgb, var(--hb-yhc-accent) 22%, transparent), transparent); }
.hb-yhc-br { position: absolute; width: 22px; height: 22px; border: 3px solid var(--hb-yhc-accent); pointer-events: none; }
.hb-yhc-br[data-c="tl"] { top: 6px; left: 6px; border-right: 0; border-bottom: 0; border-radius: 8px 0 0 0; }
.hb-yhc-br[data-c="tr"] { top: 6px; right: 6px; border-left: 0; border-bottom: 0; border-radius: 0 8px 0 0; }
.hb-yhc-br[data-c="bl"] { bottom: 6px; left: 6px; border-right: 0; border-top: 0; border-radius: 0 0 0 8px; }
.hb-yhc-br[data-c="br"] { bottom: 6px; right: 6px; border-left: 0; border-top: 0; border-radius: 0 0 8px 0; }
.hb-yhc-meta { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 14px; color: #8f8f8f; font-size: 12px; }
.hb-yhc-meta b { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-yhc-tbar { height: 3px; margin-top: 8px; border-radius: 99px; background: rgba(255,255,255,.07); overflow: hidden; }
.hb-yhc-tbar i { display: block; height: 100%; width: calc(var(--hb-yhc-t) * 100%); border-radius: inherit; background: var(--hb-yhc-accent); transition: width 1s linear; }
.hb-yhc-phone { position: absolute; z-index: 1; right: 2%; bottom: 0; width: 150px; height: 300px; padding: 7px; border-radius: 30px; background: linear-gradient(145deg, #2b2b2e, #141416); box-shadow: inset 0 0 0 1px rgba(255,255,255,.1), 0 30px 60px -20px rgba(0,0,0,.9); transform: rotate(8deg); opacity: .9; }
.hb-yhc-ps { height: 100%; padding: 30px 12px 12px; border-radius: 24px; background: linear-gradient(180deg, #17151f, #0d0c12); overflow: hidden; }
.hb-yhc-pk { color: color-mix(in srgb, var(--hb-yhc-accent) 60%, #fff); font-size: 9px; font-weight: 700; letter-spacing: .08em; }
.hb-yhc-pt { margin-top: 6px; font-size: 12px; font-weight: 650; line-height: 1.3; }
.hb-yhc-pd { margin-top: 4px; color: #8f8f8f; font-size: 9.5px; }
.hb-yhc-slide { height: 70px; margin-top: 12px; border-radius: 10px; background: linear-gradient(135deg, color-mix(in srgb, var(--hb-yhc-accent) 60%, #0a0a0a), #1e1b4b); }
.hb-yhc-pl { height: 6px; margin-top: 8px; border-radius: 3px; background: rgba(255,255,255,.08); }
.hb-yhc-pb { display: block; height: 26px; margin-top: 14px; border-radius: 99px; background: var(--hb-yhc-accent); color: #fff; font-size: 9.5px; font-weight: 650; line-height: 26px; text-align: center; }
.hb-yhc-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-yhc-scan { 0% { top: 8px; } 50% { top: calc(100% - 10px); } 100% { top: 8px; } }
@keyframes hb-yhc-float { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-10px) rotate(-1deg); } }
@keyframes hb-yhc-fresh { from { opacity: 0; } to { opacity: 1; } }
@container (max-width: 860px) {
  .hb-yhc-in { grid-template-columns: minmax(0, 1fr); }
  .hb-yhc-vis { min-height: 380px; }
}
@container (max-width: 480px) {
  .hb-yhc-phone { display: none; }
  .hb-yhc-form { flex-direction: column; border-radius: 18px; }
  .hb-yhc-send { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yhc *, .hb-yhc *::before, .hb-yhc *::after { animation: none !important; transition: none !important; }
  .hb-yhc-scan { top: 50%; }
}
`;

const SIZE = 25;

function seedOf(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function bit(seed: number, x: number, y: number) {
  let h = (seed ^ Math.imul(x + 1, 374761393) ^ Math.imul(y + 1, 668265263)) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  h = (h ^ (h >>> 16)) >>> 0;
  return (h & 7) < 4;
}

function inFinder(x: number, y: number) {
  const zones = [
    [0, 0],
    [SIZE - 7, 0],
    [0, SIZE - 7],
  ];
  for (const [fx, fy] of zones) {
    if (x >= fx! - 1 && x <= fx! + 7 && y >= fy! - 1 && y <= fy! + 7) {
      const dx = x - fx!;
      const dy = y - fy!;
      if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return 0;
      const ring = Math.min(dx, dy, 6 - dx, 6 - dy);
      return ring === 1 ? 0 : 1;
    }
  }
  return -1;
}

function buildPath(text: string) {
  const seed = seedOf(text);
  let d = "";
  const c0 = Math.floor(SIZE / 2) - 3;
  const c1 = Math.floor(SIZE / 2) + 3;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let on: boolean;
      const f = inFinder(x, y);
      if (f !== -1) on = f === 1;
      else if (x >= c0 && x <= c1 && y >= c0 && y <= c1) on = false;
      else if (x >= 16 && x <= 20 && y >= 16 && y <= 20) {
        const ring = Math.max(Math.abs(x - 18), Math.abs(y - 18));
        on = ring !== 1;
      } else if (y === 6) on = x % 2 === 0;
      else if (x === 6) on = y % 2 === 0;
      else on = bit(seed, x, y);
      if (on) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return d;
}

const defaultSteps = ["Open the camera on your phone", "Point it at the code", "Tap the banner to pick up right where you are"];

const defaultStores = [
  { label: "iPhone", href: "#" },
  { label: "Android", href: "#" },
];

export function DownloadQrHandoff({
  eyebrow = "Slate for mobile",
  title = "Continue on your phone in one scan",
  subtitle = "Your open document, scroll position and unsaved comments travel with you. No sign in, no typing.",
  url = "https://slate.so/h/7KQ2-M9XW",
  steps = defaultSteps,
  refreshSeconds = 60,
  session = { title: "Q3 board deck", detail: "Slide 14 of 32, 3 comments" },
  onSend,
  storeLinks = defaultStores,
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: DownloadQrHandoffProps) {
  const uid = React.useId();
  const [tick, setTick] = React.useState(0);
  const [phone, setPhone] = React.useState("");
  const [sent, setSent] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const period = Math.max(0, Math.round(refreshSeconds));
  const gen = period > 0 ? Math.floor(tick / period) : 0;
  const left = period > 0 ? period - (tick % period) : 0;

  React.useEffect(() => {
    if (period <= 0) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [period]);

  const path = React.useMemo(() => buildPath(`${url}#${gen}`), [url, gen]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) {
      setError("Enter a full phone number, including the area code.");
      setSent(null);
      return;
    }
    setError(null);
    setSent(digits.slice(-4));
    onSend?.(phone.trim());
  }

  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");

  return (
    <section className={`hb-yhc ${className}`} style={{ "--hb-yhc-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-download-qr-handoff" precedence="default">
        {css}
      </style>
      <div className="hb-yhc-in">
        <div className="hb-yhc-copy">
          <span className="hb-yhc-eyebrow">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <rect x="4" y="1.5" width="8" height="13" rx="2" />
              <path d="M7 12h2" />
            </svg>
            {eyebrow}
          </span>
          <h2 className="hb-yhc-title">{title}</h2>
          {subtitle && <p className="hb-yhc-sub">{subtitle}</p>}
          <ol className="hb-yhc-steps">
            {steps.map((s) => (
              <li key={s} className="hb-yhc-step">
                {s}
              </li>
            ))}
          </ol>
          <form className="hb-yhc-form" onSubmit={submit} noValidate>
            <label htmlFor={`${uid}-phone`} className="hb-yhc-sr">
              Phone number
            </label>
            <input
              id={`${uid}-phone`}
              className="hb-yhc-input"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Or text me a link: +1 555 014 2297"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={`${uid}-msg`}
            />
            <button type="submit" className="hb-yhc-send">
              Send link
            </button>
          </form>
          <p id={`${uid}-msg`} className="hb-yhc-msg" data-ok={sent ? "true" : "false"} aria-live="polite">
            {error ?? (sent ? `Link sent to the number ending in ${sent}.` : "We only use your number to send this link.")}
          </p>
          {storeLinks.length > 0 && (
            <div className="hb-yhc-stores">
              {storeLinks.map((s) => (
                <a key={s.label} href={s.href} className="hb-yhc-store">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M8 1.5v8.2M4.8 6.6 8 9.8l3.2-3.2M2.5 12.5h11v2h-11z" />
                  </svg>
                  Get it for {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="hb-yhc-vis">
          <div className="hb-yhc-phone" aria-hidden="true">
            <div className="hb-yhc-ps">
              <div className="hb-yhc-pk">READY ON PHONE</div>
              <div className="hb-yhc-pt">{session.title}</div>
              <div className="hb-yhc-pd">{session.detail}</div>
              <div className="hb-yhc-slide" />
              <div className="hb-yhc-pl" style={{ width: "86%" }} />
              <div className="hb-yhc-pl" style={{ width: "64%" }} />
              <span className="hb-yhc-pb">Continue here</span>
            </div>
          </div>
          <div className="hb-yhc-card">
            <div className="hb-yhc-qr" key={gen} data-fresh={gen > 0 ? "true" : "false"} role="img" aria-label={`QR code that opens ${url}`}>
              <svg viewBox={`-1 -1 ${SIZE + 2} ${SIZE + 2}`} shapeRendering="crispEdges" aria-hidden="true">
                <path className="hb-yhc-mod" d={path} />
              </svg>
              <span className="hb-yhc-logo" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M11.5 4.5c-.8-1-2-1.5-3.5-1.5-2 0-3.5 1-3.5 2.5 0 3.5 7 2 7 5.5 0 1.5-1.5 2.5-3.5 2.5-1.6 0-2.9-.6-3.7-1.6" />
                </svg>
              </span>
              <span className="hb-yhc-scan" aria-hidden="true" />
              <span className="hb-yhc-br" data-c="tl" aria-hidden="true" />
              <span className="hb-yhc-br" data-c="tr" aria-hidden="true" />
              <span className="hb-yhc-br" data-c="bl" aria-hidden="true" />
              <span className="hb-yhc-br" data-c="br" aria-hidden="true" />
            </div>
            {period > 0 && (
              <>
                <div className="hb-yhc-meta">
                  <span>Code refreshes in</span>
                  <b>
                    {mm}:{ss}
                  </b>
                </div>
                <div className="hb-yhc-tbar" aria-hidden="true">
                  <i style={{ "--hb-yhc-t": (left / period).toFixed(3) } as React.CSSProperties} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
