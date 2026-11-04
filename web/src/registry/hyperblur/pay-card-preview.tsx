"use client";

import * as React from "react";

export type PayCardTheme = "midnight" | "aurora" | "ember" | "graphite" | "lagoon";
export type PayCardField = "number" | "name" | "expiry" | "cvc";
export type PayCardNetwork = "none" | "twin" | "tri" | "arc";

export interface PayCardPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: string;
  name?: string;
  expiry?: string;
  cvc?: string;
  focusField?: PayCardField | null;
  flipped?: boolean;
  theme?: PayCardTheme;
  network?: PayCardNetwork;
  bank?: string;
}

const css = `
.hb-qf1 {
  box-sizing: border-box;
  container-type: inline-size;
  width: 100%;
  max-width: 420px;
  font-family: inherit;
  perspective: 1200px;
}
.hb-qf1 *, .hb-qf1 *::before, .hb-qf1 *::after { box-sizing: border-box; }
.hb-qf1-sway {
  transform-style: preserve-3d;
  animation: hb-qf1-sway 8s ease-in-out infinite;
}
.hb-qf1-card {
  position: relative;
  width: 100%;
  aspect-ratio: 1.586;
  transform-style: preserve-3d;
  transition: transform 0.85s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-qf1[data-flipped="true"] .hb-qf1-card { transform: rotateY(180deg); }
.hb-qf1-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  color: #fff;
  border-radius: 5.2cqw;
  background:
    radial-gradient(120% 90% at 0% 0%, var(--hb-qf1-a), transparent 62%),
    linear-gradient(135deg, var(--hb-qf1-b), var(--hb-qf1-c));
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12) inset, 0 3cqw 7cqw -2cqw rgba(0, 0, 0, 0.65);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.hb-qf1[data-theme="midnight"] { --hb-qf1-a: #3b6dff; --hb-qf1-b: #14214f; --hb-qf1-c: #070b1c; }
.hb-qf1[data-theme="aurora"] { --hb-qf1-a: #2dd4a8; --hb-qf1-b: #3b2f8f; --hb-qf1-c: #0e0a2a; }
.hb-qf1[data-theme="ember"] { --hb-qf1-a: #ff8a4c; --hb-qf1-b: #8a1f3d; --hb-qf1-c: #1c0810; }
.hb-qf1[data-theme="graphite"] { --hb-qf1-a: #8a8f9c; --hb-qf1-b: #2b2e36; --hb-qf1-c: #0d0e12; }
.hb-qf1[data-theme="lagoon"] { --hb-qf1-a: #35d0ff; --hb-qf1-b: #0b5d8a; --hb-qf1-c: #04202e; }
.hb-qf1-face::after {
  content: "";
  position: absolute;
  inset: -20%;
  background: linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.14) 50%, transparent 60%);
  transform: translateX(-60%);
  animation: hb-qf1-sheen 6s ease-in-out infinite;
  pointer-events: none;
}
.hb-qf1-front {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6.4cqw 7cqw 6cqw;
}
.hb-qf1-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hb-qf1-bank {
  font-size: 4.2cqw;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.92;
}
.hb-qf1-nfc { width: 6.4cqw; height: 6.4cqw; fill: none; stroke: #fff; stroke-width: 1.7; stroke-linecap: round; opacity: 0.85; }
.hb-qf1-chip {
  position: relative;
  width: 12.6cqw;
  height: 9.6cqw;
  overflow: hidden;
  border-radius: 1.8cqw;
  background: linear-gradient(135deg, #f5dc9a, #c8a24e 55%, #efd58f);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25) inset;
}
.hb-qf1-chip::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent 32%, rgba(80, 55, 10, 0.5) 32% 34%, transparent 34% 66%, rgba(80, 55, 10, 0.5) 66% 68%, transparent 68%),
    linear-gradient(0deg, transparent 46%, rgba(80, 55, 10, 0.5) 46% 54%, transparent 54%);
}
.hb-qf1-mid { display: flex; align-items: center; justify-content: space-between; }
.hb-qf1-f {
  min-width: 0;
  margin: -1cqw -1.4cqw;
  padding: 1cqw 1.4cqw;
  border-radius: 1.6cqw;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.hb-qf1-f[data-active="true"] {
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 0 0 0.45cqw rgba(255, 255, 255, 0.6);
}
.hb-qf1-f[data-empty="true"] .hb-qf1-v, .hb-qf1-f[data-empty="true"] .hb-qf1-num { opacity: 0.45; }
.hb-qf1-num {
  display: flex;
  gap: 3.4cqw;
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 6.2cqw;
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0.3cqw 0.8cqw rgba(0, 0, 0, 0.35);
  transition: opacity 0.3s ease;
}
.hb-qf1-bot { display: flex; align-items: flex-end; justify-content: space-between; gap: 3cqw; }
.hb-qf1-meta { display: flex; min-width: 0; flex: 1; align-items: flex-end; gap: 5cqw; }
.hb-qf1-lab {
  display: block;
  margin-bottom: 0.6cqw;
  font-size: 2.5cqw;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.6;
}
.hb-qf1-v {
  display: block;
  overflow: hidden;
  font-size: 4cqw;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;
  transition: opacity 0.3s ease;
}
.hb-qf1-net { width: 14cqw; height: 9.6cqw; flex: none; }
.hb-qf1-back { transform: rotateY(180deg); }
.hb-qf1-stripe { position: absolute; left: 0; right: 0; top: 10cqw; height: 14cqw; background: #08080a; }
.hb-qf1-sign {
  position: absolute;
  left: 7cqw;
  right: 7cqw;
  top: 31cqw;
  display: flex;
  align-items: center;
  height: 10cqw;
  overflow: hidden;
  background: repeating-linear-gradient(135deg, #f1efe8 0 1.4cqw, #dcd9cf 1.4cqw 2.8cqw);
  border-radius: 1.2cqw;
}
.hb-qf1-sign .hb-qf1-f { margin: 0 0 0 auto; padding: 1cqw 2.4cqw; border-radius: 0; background: #fff; box-shadow: none; }
.hb-qf1-sign .hb-qf1-f[data-active="true"] { box-shadow: 0 0 0 0.6cqw var(--hb-qf1-a) inset; }
.hb-qf1-cvc {
  display: block;
  min-width: 11cqw;
  color: #14151a;
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 5cqw;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-align: right;
}
.hb-qf1-fine {
  position: absolute;
  left: 7cqw;
  right: 7cqw;
  bottom: 6cqw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.6cqw;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.6;
}
@keyframes hb-qf1-sway {
  0%, 100% { transform: rotateX(2deg) rotateY(-4deg); }
  50% { transform: rotateX(-2deg) rotateY(4deg); }
}
@keyframes hb-qf1-sheen {
  0%, 55% { transform: translateX(-60%); }
  85%, 100% { transform: translateX(60%); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qf1-sway, .hb-qf1-face::after { animation: none; }
  .hb-qf1-card { transition: none; }
}
`;

function groupDigits(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 19);
  const len = Math.max(16, digits.length);
  const chars = digits.padEnd(len, "•").split("");
  const out: string[] = [];
  for (let i = 0; i < len; i += 4) out.push(chars.slice(i, i + 4).join(""));
  return out;
}

function mergeExpiry(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  const slots = "MM/YY".split("");
  const at = [0, 1, 3, 4];
  for (let i = 0; i < digits.length; i += 1) slots[at[i]] = digits[i];
  return slots.join("");
}

function NetworkMark({ kind }: { kind: PayCardNetwork }) {
  if (kind === "none") return null;
  return (
    <svg className="hb-qf1-net" viewBox="0 0 56 38" aria-hidden="true">
      {kind === "twin" && (
        <>
          <circle cx="20" cy="19" r="14" fill="#fff" fillOpacity="0.7" />
          <circle cx="36" cy="19" r="14" fill="#fff" fillOpacity="0.38" />
        </>
      )}
      {kind === "tri" && (
        <>
          <path d="M6 33 L16 5 H24 L14 33 Z" fill="#fff" fillOpacity="0.4" />
          <path d="M20 33 L30 5 H38 L28 33 Z" fill="#fff" fillOpacity="0.62" />
          <path d="M34 33 L44 5 H52 L42 33 Z" fill="#fff" fillOpacity="0.85" />
        </>
      )}
      {kind === "arc" && (
        <>
          <path d="M8 31 A22 22 0 0 1 48 31" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="5" strokeLinecap="round" />
          <path d="M16 31 A14 14 0 0 1 40 31" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function PayCardPreview({
  number = "",
  name = "",
  expiry = "",
  cvc = "",
  focusField = null,
  flipped,
  theme = "midnight",
  network = "arc",
  bank = "Northvale",
  className = "",
  style,
  ...rest
}: PayCardPreviewProps) {
  const isBack = flipped ?? focusField === "cvc";
  const digits = number.replace(/\D/g, "");
  const groups = groupDigits(number);
  const shownName = name.trim().slice(0, 26);
  const cvcText = cvc.replace(/\D/g, "").slice(0, 4);
  const summary = `Payment card ${digits.length >= 4 ? `ending ${digits.slice(-4)}` : "preview"}`;

  return (
    <div
      role="img"
      aria-label={summary}
      className={`hb-qf1 ${className}`}
      style={style}
      data-theme={theme}
      data-flipped={isBack}
      {...rest}
    >
      <style href="hb-pay-card-preview" precedence="default">{css}</style>
      <div className="hb-qf1-sway">
        <div className="hb-qf1-card">
          <div className="hb-qf1-face hb-qf1-front">
            <div className="hb-qf1-top">
              <span className="hb-qf1-bank">{bank}</span>
              <svg className="hb-qf1-nfc" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9.5a4 4 0 0 1 0 5M9.5 7a8 8 0 0 1 0 10M13 4.5a12 12 0 0 1 0 15M16.5 2a16 16 0 0 1 0 20" />
              </svg>
            </div>
            <div className="hb-qf1-mid">
              <span className="hb-qf1-chip" />
            </div>
            <div className="hb-qf1-f" data-active={focusField === "number"} data-empty={digits.length === 0}>
              <div className="hb-qf1-num">
                {groups.map((g, i) => (
                  <span key={i}>{g}</span>
                ))}
              </div>
            </div>
            <div className="hb-qf1-bot">
              <div className="hb-qf1-meta">
                <div className="hb-qf1-f" data-active={focusField === "name"} data-empty={shownName.length === 0} style={{ flex: 1 }}>
                  <span className="hb-qf1-lab">Card holder</span>
                  <span className="hb-qf1-v">{shownName || "Full name"}</span>
                </div>
                <div className="hb-qf1-f" data-active={focusField === "expiry"} data-empty={expiry.replace(/\D/g, "").length === 0}>
                  <span className="hb-qf1-lab">Expires</span>
                  <span className="hb-qf1-v">{mergeExpiry(expiry)}</span>
                </div>
              </div>
              <NetworkMark kind={network} />
            </div>
          </div>
          <div className="hb-qf1-face hb-qf1-back">
            <div className="hb-qf1-stripe" />
            <div className="hb-qf1-sign">
              <div className="hb-qf1-f" data-active={focusField === "cvc"}>
                <span className="hb-qf1-cvc">{cvcText || "•••"}</span>
              </div>
            </div>
            <div className="hb-qf1-fine">
              <span>{bank}</span>
              <span>Security code</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
