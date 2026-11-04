"use client";

import * as React from "react";

export interface PaySuccessCheckProps extends React.HTMLAttributes<HTMLDivElement> {
  amount?: string;
  reference?: string;
  title?: string;
  message?: string;
  accent?: string;
  loop?: boolean;
  loopDelay?: number;
}

const css = `
.hb-qf4 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  text-align: center;
}
.hb-qf4 *, .hb-qf4 *::before, .hb-qf4 *::after { box-sizing: border-box; }
.hb-qf4-in { display: flex; flex-direction: column; align-items: center; width: 100%; }
.hb-qf4-badge { position: relative; width: 80px; height: 80px; flex: none; }
.hb-qf4-glow {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--hb-qf4-x) 38%, transparent), transparent 68%);
  animation: hb-qf4-glow 0.9s ease-out 0.35s both;
}
.hb-qf4-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-qf4-disc { fill: color-mix(in srgb, var(--hb-qf4-x) 14%, transparent); transform-origin: 40px 40px; animation: hb-qf4-fill 0.5s ease-out 0.5s both; }
.hb-qf4-ring {
  fill: none;
  stroke: var(--hb-qf4-x);
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-dasharray: 1 1.2;
  stroke-dashoffset: 0;
  transform: rotate(-90deg);
  transform-origin: 40px 40px;
  animation: hb-qf4-draw 0.65s cubic-bezier(0.5, 0, 0.2, 1) both;
}
.hb-qf4-tick {
  fill: none;
  stroke: var(--hb-qf4-x);
  stroke-width: 4.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1 1.2;
  stroke-dashoffset: 0;
  animation: hb-qf4-draw 0.45s cubic-bezier(0.5, 0, 0.2, 1) 0.55s both;
}
.hb-qf4-dot {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--s);
  height: var(--s);
  margin: calc(var(--s) / -2) 0 0 calc(var(--s) / -2);
  background: var(--c);
  border-radius: 50%;
  opacity: 0;
  animation: hb-qf4-burst 0.9s cubic-bezier(0.15, 0.7, 0.3, 1) 0.8s both;
}
.hb-qf4-dot[data-sq="true"] { border-radius: 1px; }
.hb-qf4-title {
  margin: 12px 0 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.005em;
  animation: hb-qf4-up 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) 0.85s both;
}
.hb-qf4-amt {
  margin: 2px 0 0;
  font-size: 30px;
  font-weight: 650;
  letter-spacing: -0.03em;
  line-height: 1.15;
  font-variant-numeric: tabular-nums;
  animation: hb-qf4-up 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) 0.95s both;
}
.hb-qf4-msg { margin: 2px 0 0; color: #8f8f8f; font-size: 12.5px; animation: hb-qf4-up 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) 1.02s both; }
.hb-qf4-ref {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 4px 10px;
  color: #a1a1a1;
  font-size: 11.5px;
  background: #151515;
  border: 1px solid #262626;
  border-radius: 999px;
  animation: hb-qf4-up 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) 1.1s both;
}
.hb-qf4-ref b { color: #ededed; font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace; font-size: 11.5px; font-weight: 500; letter-spacing: 0.02em; }
@keyframes hb-qf4-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-qf4-fill { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
@keyframes hb-qf4-glow { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
@keyframes hb-qf4-burst {
  0% { opacity: 1; transform: translate(0, 0) scale(0.2); }
  70% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1); }
}
@keyframes hb-qf4-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-qf4-glow, .hb-qf4-disc, .hb-qf4-ring, .hb-qf4-tick, .hb-qf4-dot, .hb-qf4-title, .hb-qf4-amt, .hb-qf4-msg, .hb-qf4-ref { animation: none; }
}
`;

const palette = ["#3ddc97", "#7fb3ff", "#ffd166", "#ff8fa3"];

const dots = Array.from({ length: 14 }, (_, i) => {
  const angle = ((i * 360) / 14 + (i % 2 ? 9 : 0)) * (Math.PI / 180);
  const dist = 46 + ((i * 37) % 11);
  return {
    dx: (Math.cos(angle) * dist).toFixed(1),
    dy: (Math.sin(angle) * dist).toFixed(1),
    size: 3 + (i % 3),
    color: palette[i % palette.length],
    square: i % 4 === 1,
    delay: ((i * 53) % 9) * 0.015,
  };
});

export function PaySuccessCheck({
  amount = "$48.00",
  reference = "NV-48210",
  title = "Payment successful",
  message = "A receipt is on its way to your inbox.",
  accent = "#3ddc97",
  loop = false,
  loopDelay = 5200,
  className = "",
  style,
  ...rest
}: PaySuccessCheckProps) {
  const [run, setRun] = React.useState(0);

  React.useEffect(() => {
    if (!loop) return;
    const id = window.setInterval(() => setRun((r) => r + 1), Math.max(2500, loopDelay));
    return () => window.clearInterval(id);
  }, [loop, loopDelay]);

  const vars = { "--hb-qf4-x": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-qf4 ${className}`} style={vars} role="status" {...rest}>
      <style href="hb-pay-success-check" precedence="default">{css}</style>
      <div key={run} className="hb-qf4-in">
        <div className="hb-qf4-badge" aria-hidden="true">
          <span className="hb-qf4-glow" />
          <svg className="hb-qf4-svg" viewBox="0 0 80 80">
            <circle className="hb-qf4-disc" cx="40" cy="40" r="34" />
            <circle className="hb-qf4-ring" cx="40" cy="40" r="34" pathLength="1" />
            <path className="hb-qf4-tick" d="M26 41.5l9.5 9.5L55 30" pathLength="1" />
          </svg>
          {dots.map((d, i) => (
            <span
              key={i}
              className="hb-qf4-dot"
              data-sq={d.square}
              style={
                {
                  "--dx": `${d.dx}px`,
                  "--dy": `${d.dy}px`,
                  "--s": `${d.size}px`,
                  "--c": d.color,
                  animationDelay: `${(0.8 + d.delay).toFixed(3)}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <p className="hb-qf4-title">{title}</p>
        <p className="hb-qf4-amt">{amount}</p>
        {message && <p className="hb-qf4-msg">{message}</p>}
        {reference && (
          <span className="hb-qf4-ref">
            Reference <b>{reference}</b>
          </span>
        )}
      </div>
    </div>
  );
}
