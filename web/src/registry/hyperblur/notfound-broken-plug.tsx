"use client";

import * as React from "react";

export interface NotfoundBrokenPlugLink {
  label: string;
  href: string;
}

export interface NotfoundBrokenPlugProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  code?: string;
  title?: string;
  subtitle?: string;
  retryLabel?: string;
  retryMessage?: string;
  primary?: NotfoundBrokenPlugLink;
  secondary?: NotfoundBrokenPlugLink;
  onRetry?: () => void;
  onReport?: () => void;
  accent?: string;
}

const css = `
.hb-kg4 {
  --hb-kg4-accent: #ffb020;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kg4 *, .hb-kg4 *::before, .hb-kg4 *::after { box-sizing: border-box; }
.hb-kg4::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(40% 36% at 50% 22%, color-mix(in srgb, var(--hb-kg4-accent) 18%, transparent), transparent 70%),
    radial-gradient(60% 40% at 50% 100%, rgba(255, 255, 255, .04), transparent 70%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, .025) 0 1px, transparent 1px 64px);
  pointer-events: none;
}
.hb-kg4-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 64px 20px 72px;
  text-align: center;
}
.hb-kg4-code {
  display: flex;
  justify-content: center;
  gap: .04em;
  margin: 0;
  font-size: clamp(96px, 16cqi, 156px);
  font-weight: 250;
  line-height: .9;
  letter-spacing: -.02em;
  color: color-mix(in srgb, var(--hb-kg4-accent) 30%, #fff);
  user-select: none;
}
.hb-kg4-char {
  text-shadow:
    0 0 4px color-mix(in srgb, var(--hb-kg4-accent) 90%, #fff),
    0 0 14px var(--hb-kg4-accent),
    0 0 36px var(--hb-kg4-accent),
    0 0 80px color-mix(in srgb, var(--hb-kg4-accent) 60%, transparent);
  animation: hb-kg4-flicker 5s linear infinite;
}
.hb-kg4-char:nth-child(2) { animation: hb-kg4-flicker-b 3.4s linear infinite; }
.hb-kg4-char:nth-child(3) { animation-delay: -1.7s; }
.hb-kg4[data-state="connecting"] .hb-kg4-char { animation: hb-kg4-steady .5s ease forwards; }
.hb-kg4-scene { position: relative; max-width: 720px; margin: 18px auto 0; }
.hb-kg4-scene svg { display: block; width: 100%; height: auto; overflow: visible; }
.hb-kg4-plug { transition: transform .9s cubic-bezier(.65, 0, .35, 1); }
.hb-kg4[data-state="connecting"] .hb-kg4-plug { transform: translateX(72px); transition-duration: .7s; }
.hb-kg4-spark {
  transform-box: fill-box;
  transform-origin: center;
  stroke: var(--hb-kg4-accent);
  animation: hb-kg4-spark 1.6s ease-out infinite;
  animation-delay: var(--hb-kg4-d);
}
.hb-kg4-hole { fill: #050505; }
.hb-kg4-glow { fill: var(--hb-kg4-accent); animation: hb-kg4-pulse 1.6s ease-in-out infinite; }
.hb-kg4-burst { opacity: 0; transform-box: fill-box; transform-origin: center; }
.hb-kg4[data-state="connecting"] .hb-kg4-burst { animation: hb-kg4-burst .6s ease-out .62s; }
.hb-kg4[data-state="connecting"] .hb-kg4-spark { animation: none; opacity: 0; }
.hb-kg4[data-state="connecting"] .hb-kg4-glow { animation: none; opacity: 1; }
.hb-kg4-title {
  margin: 26px 0 0;
  font-size: clamp(28px, 4.2cqi, 42px);
  font-weight: 650;
  line-height: 1.1;
  letter-spacing: -.03em;
  text-wrap: balance;
}
.hb-kg4-sub {
  margin: 12px auto 0;
  max-width: 480px;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kg4-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
}
.hb-kg4-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid transparent;
  border-radius: 999px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: transform .2s cubic-bezier(.2, .8, .2, 1), background-color .2s ease, border-color .2s ease, box-shadow .2s ease, opacity .2s ease;
}
.hb-kg4-btn svg { width: 16px; height: 16px; flex: none; }
.hb-kg4-btn:focus-visible, .hb-kg4-link:focus-visible { outline: 2px solid var(--hb-kg4-accent); outline-offset: 3px; }
.hb-kg4-retry {
  background: var(--hb-kg4-accent);
  color: #1a1204;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .4), 0 0 0 1px color-mix(in srgb, var(--hb-kg4-accent) 60%, #000), 0 10px 30px -10px var(--hb-kg4-accent);
}
.hb-kg4-retry:hover:not(:disabled) { transform: translateY(-1px); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .4), 0 0 0 1px color-mix(in srgb, var(--hb-kg4-accent) 60%, #000), 0 14px 36px -8px var(--hb-kg4-accent); }
.hb-kg4-retry:disabled { cursor: progress; opacity: .85; }
.hb-kg4[data-state="connecting"] .hb-kg4-retry svg { animation: hb-kg4-rot .8s linear infinite; }
.hb-kg4-ghost { border-color: rgba(255, 255, 255, .12); background: rgba(255, 255, 255, .03); color: #ededed; }
.hb-kg4-ghost:hover { transform: translateY(-1px); border-color: rgba(255, 255, 255, .28); background: rgba(255, 255, 255, .07); }
.hb-kg4-link {
  padding: 0 8px;
  border-radius: 6px;
  color: #a1a1a1;
  font-size: 14px;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, .2);
  text-underline-offset: 4px;
  transition: color .2s ease, text-decoration-color .2s ease;
}
.hb-kg4-link:hover { color: #ededed; text-decoration-color: var(--hb-kg4-accent); }
.hb-kg4-status {
  min-height: 20px;
  margin: 18px 0 0;
  color: #8f8f8f;
  font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 12px;
}
.hb-kg4-status b { color: var(--hb-kg4-accent); font-weight: 500; }
@container (min-width: 760px) {
  .hb-kg4-inner { padding: 80px 40px 88px; }
}
@keyframes hb-kg4-flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: .25; text-shadow: none; }
}
@keyframes hb-kg4-flicker-b {
  0%, 40%, 44%, 70%, 72%, 74%, 100% { opacity: 1; }
  42% { opacity: .15; text-shadow: none; }
  71%, 73% { opacity: .4; text-shadow: none; }
}
@keyframes hb-kg4-steady { from { opacity: .4; } to { opacity: 1; filter: brightness(1.25); } }
@keyframes hb-kg4-spark {
  0% { opacity: 0; transform: scale(.4); }
  12% { opacity: 1; transform: scale(1.1); }
  30% { opacity: .2; transform: scale(.9); }
  40% { opacity: 1; transform: scale(1); }
  60%, 100% { opacity: 0; transform: scale(.5); }
}
@keyframes hb-kg4-pulse { 0%, 100% { opacity: .15; } 50% { opacity: .9; } }
@keyframes hb-kg4-burst {
  0% { opacity: 0; transform: scale(.3); }
  30% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(1.6); }
}
@keyframes hb-kg4-rot { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-kg4-char, .hb-kg4-spark, .hb-kg4-glow, .hb-kg4[data-state="connecting"] .hb-kg4-burst, .hb-kg4[data-state="connecting"] .hb-kg4-retry svg { animation: none; }
  .hb-kg4-glow { opacity: .6; }
  .hb-kg4-plug, .hb-kg4-btn, .hb-kg4-link { transition: none; }
  .hb-kg4-btn:hover { transform: none; }
}
`;

const sparks = [
  { x: 336, y: 62, r: -30, d: "0s" },
  { x: 340, y: 98, r: 30, d: ".5s" },
  { x: 392, y: 58, r: 210, d: ".25s" },
  { x: 390, y: 102, r: 150, d: ".85s" },
];

function Spark({ x, y, r, d }: { x: number; y: number; r: number; d: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <g className="hb-kg4-spark" style={{ "--hb-kg4-d": d } as React.CSSProperties} strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M0 0h10" />
        <path d="M2-6l7-3" />
        <path d="M2 6l7 3" />
      </g>
    </g>
  );
}

export function NotfoundBrokenPlug({
  code = "404",
  title = "Looks like this link came unplugged",
  subtitle = "We couldn't connect you to that page. It may have been moved or deleted, or the address has a typo.",
  retryLabel = "Retry connection",
  retryMessage = "Reconnected. The line is fine, the page just isn't there.",
  primary = { label: "Go to homepage", href: "/" },
  secondary = { label: "Report a problem", href: "mailto:support@voltline.io?subject=Broken%20link" },
  onRetry,
  onReport,
  accent = "#ffb020",
  className = "",
  style,
  ...rest
}: NotfoundBrokenPlugProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [state, setState] = React.useState<"idle" | "connecting">("idle");
  const [attempts, setAttempts] = React.useState(0);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const vars = { "--hb-kg4-accent": accent, ...style } as React.CSSProperties;

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const retry = () => {
    if (state === "connecting") return;
    onRetry?.();
    setState("connecting");
    timer.current = setTimeout(() => {
      setState("idle");
      setAttempts((n) => n + 1);
    }, 1500);
  };

  return (
    <section className={`hb-kg4 ${className}`} style={vars} data-state={state} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-notfound-broken-plug" precedence="default">{css}</style>
      <div className="hb-kg4-inner">
        <p className="hb-kg4-code" aria-label={`Error ${code}`}>
          {code.split("").map((c, i) => (
            <span key={i} className="hb-kg4-char" aria-hidden="true">{c}</span>
          ))}
        </p>
        <div className="hb-kg4-scene" aria-hidden="true">
          <svg viewBox="0 0 720 150" fill="none">
            <defs>
              <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2a2a2a" />
                <stop offset="1" stopColor="#151515" />
              </linearGradient>
              <linearGradient id={`${uid}-prong`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f4f4f5" />
                <stop offset="1" stopColor="#9a9aa2" />
              </linearGradient>
            </defs>
            <path d="M-40 128C90 128 130 80 230 80" stroke="#202020" strokeWidth="11" strokeLinecap="round" />
            <path d="M-40 126C90 126 130 78 230 78" stroke="rgba(255,255,255,.07)" strokeWidth="2" strokeLinecap="round" />
            <path d="M760 128C620 128 590 80 456 80" stroke="#202020" strokeWidth="11" strokeLinecap="round" />
            <path d="M760 126C620 126 590 78 456 78" stroke="rgba(255,255,255,.07)" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="360" cy="140" rx="210" ry="6" fill="rgba(0,0,0,.6)" />
            <g className="hb-kg4-plug">
              <path d="M200 80h34" stroke="#202020" strokeWidth="14" strokeLinecap="round" />
              <rect x="228" y="56" width="66" height="48" rx="12" fill={`url(#${uid}-body)`} stroke="rgba(255,255,255,.12)" />
              <path d="M244 68v24M254 68v24M264 68v24" stroke="rgba(255,255,255,.1)" strokeWidth="2" strokeLinecap="round" />
              <rect x="294" y="62" width="10" height="36" rx="3" fill="#1d1d1d" stroke="rgba(255,255,255,.1)" />
              <rect x="304" y="67" width="28" height="7" rx="2" fill={`url(#${uid}-prong)`} />
              <rect x="304" y="86" width="28" height="7" rx="2" fill={`url(#${uid}-prong)`} />
            </g>
            <g>
              <rect x="400" y="50" width="60" height="60" rx="14" fill={`url(#${uid}-body)`} stroke="rgba(255,255,255,.12)" />
              <rect x="406" y="56" width="48" height="48" rx="10" fill="none" stroke="rgba(255,255,255,.06)" />
              <rect className="hb-kg4-hole" x="400" y="66" width="12" height="9" rx="2" />
              <rect className="hb-kg4-hole" x="400" y="85" width="12" height="9" rx="2" />
              <rect className="hb-kg4-glow" x="400" y="68" width="4" height="5" rx="1" />
              <rect className="hb-kg4-glow" x="400" y="87" width="4" height="5" rx="1" />
              <circle cx="444" cy="80" r="3" fill="#0a0a0a" stroke="rgba(255,255,255,.12)" />
            </g>
            {sparks.map((s, i) => (
              <Spark key={i} {...s} />
            ))}
            <g className="hb-kg4-burst" style={{ stroke: "var(--hb-kg4-accent)" }} strokeWidth="2.2" strokeLinecap="round">
              <path d="M400 80h-16M400 80l-12-12M400 80l-12 12M400 80V62M400 80v18" />
            </g>
          </svg>
        </div>
        <h1 id={`${uid}-title`} className="hb-kg4-title">{title}</h1>
        {subtitle && <p className="hb-kg4-sub">{subtitle}</p>}
        <div className="hb-kg4-actions">
          <button type="button" className="hb-kg4-btn hb-kg4-retry" onClick={retry} disabled={state === "connecting"}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8a5 5 0 1 1-1.6-3.7M13 2.5v3h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {state === "connecting" ? "Reconnecting" : retryLabel}
          </button>
          <a className="hb-kg4-btn hb-kg4-ghost" href={primary.href}>{primary.label}</a>
          <a className="hb-kg4-link" href={secondary.href} onClick={onReport}>{secondary.label}</a>
        </div>
        <p className="hb-kg4-status" aria-live="polite">
          {state === "connecting" ? "Connecting to the page..." : attempts > 0 ? <><b>Attempt {attempts}:</b> {retryMessage}</> : ""}
        </p>
      </div>
    </section>
  );
}
