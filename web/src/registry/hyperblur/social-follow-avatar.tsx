"use client";

import * as React from "react";

export interface SocialFollowAvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  name?: string;
  handle?: string;
  initials?: string;
  colors?: [string, string];
  count?: number;
  countLabel?: string;
  following?: boolean;
  defaultFollowing?: boolean;
  onFollowChange?: (following: boolean, count: number) => void;
  accent?: string;
  locale?: string;
}

const css = `
.hb-xc12 { --hb-xc12-a: #2f7bff; position: relative; display: inline-flex; align-items: center; gap: 14px; max-width: 100%; box-sizing: border-box; font-family: inherit; color: #ededed; }
.hb-xc12 *, .hb-xc12 *::before, .hb-xc12 *::after { box-sizing: border-box; }
.hb-xc12-av {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 68px;
  height: 68px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  font: inherit;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hb-xc12-av:focus-visible { outline: 2px solid var(--hb-xc12-a); outline-offset: 3px; }
.hb-xc12-face {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: #ffffff;
  background: linear-gradient(140deg, var(--hb-xc12-c1), var(--hb-xc12-c2));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -8px 16px -8px rgba(0, 0, 0, 0.35), 0 8px 18px -8px rgba(0, 0, 0, 0.8);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xc12-av:hover .hb-xc12-face { transform: scale(0.96); }
.hb-xc12-av:active .hb-xc12-face { transform: scale(0.9); }
.hb-xc12-ring { position: absolute; inset: 0; width: 68px; height: 68px; transform: rotate(-90deg); pointer-events: none; }
.hb-xc12-ring circle { fill: none; stroke-width: 2.5; stroke-linecap: round; }
.hb-xc12-ring circle:first-child { stroke: #262626; }
.hb-xc12-ring circle + circle { stroke: var(--hb-xc12-a); stroke-dasharray: 207.35; stroke-dashoffset: 207.35; transition: stroke-dashoffset 0.8s cubic-bezier(0.65, 0, 0.25, 1); }
.hb-xc12[data-on="true"] .hb-xc12-ring circle + circle { stroke-dashoffset: 0; }
.hb-xc12-badge {
  position: absolute;
  right: 2px;
  bottom: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #ffffff;
  background: var(--hb-xc12-a);
  box-shadow: 0 0 0 3px #0e0e0e, 0 4px 10px -2px color-mix(in srgb, var(--hb-xc12-a) 70%, transparent);
  transition: background 0.35s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
}
.hb-xc12-av:hover .hb-xc12-badge { transform: scale(1.1); }
.hb-xc12[data-on="true"] .hb-xc12-badge { background: #ededed; color: #0a0a0a; transform: rotate(360deg); box-shadow: 0 0 0 3px #0e0e0e, 0 4px 10px -2px rgba(0, 0, 0, 0.6); }
.hb-xc12-badge svg { position: absolute; width: 12px; height: 12px; transition: opacity 0.2s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xc12-badge svg + svg { opacity: 0; transform: scale(0.4); }
.hb-xc12[data-on="true"] .hb-xc12-badge svg:first-child { opacity: 0; transform: scale(0.4); }
.hb-xc12[data-on="true"] .hb-xc12-badge svg + svg { opacity: 1; transform: none; }
.hb-xc12-burst { position: absolute; left: 50%; top: 50%; width: 0; height: 0; pointer-events: none; }
.hb-xc12-burst span { position: absolute; left: -3px; top: -3px; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-xc12-p); opacity: 0; animation: hb-xc12-fly 0.75s cubic-bezier(0.2, 0.8, 0.3, 1) forwards; animation-delay: 0.32s; }
.hb-xc12-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.hb-xc12-name { font-size: 15px; font-weight: 650; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xc12-h { font-size: 12px; color: #8f8f8f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xc12-cnt { display: inline-flex; align-items: baseline; gap: 5px; margin-top: 4px; font-size: 12px; color: #8f8f8f; white-space: nowrap; }
.hb-xc12-num { font-weight: 650; color: #ededed; font-variant-numeric: tabular-nums; }
.hb-xc12-st { font-size: 11px; font-weight: 600; color: var(--hb-xc12-a); opacity: 0; transform: translateX(-4px); transition: opacity 0.3s ease 0.4s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.4s; }
.hb-xc12[data-on="true"] .hb-xc12-st { opacity: 1; transform: none; }
.hb-xc12-roll { display: inline-flex; overflow: hidden; height: 1.2em; line-height: 1.2; vertical-align: bottom; }
.hb-xc12-col { display: inline-flex; flex-direction: column; transition: transform 0.7s cubic-bezier(0.2, 0.9, 0.2, 1); transition-delay: var(--hb-xc12-dl, 0ms); }
.hb-xc12-col span, .hb-xc12-sep { display: block; height: 1.2em; }
.hb-xc12-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xc12-fly {
  0% { opacity: 1; transform: rotate(var(--hb-xc12-r)) translateY(-30px) scale(1); }
  100% { opacity: 0; transform: rotate(var(--hb-xc12-r)) translateY(-48px) scale(0.2); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xc12-face, .hb-xc12-ring circle + circle, .hb-xc12-badge, .hb-xc12-badge svg, .hb-xc12-st, .hb-xc12-col { transition: none; }
  .hb-xc12-burst { display: none; }
  .hb-xc12[data-on="true"] .hb-xc12-badge { transform: none; }
}
`;

function Roll({ value, locale }: { value: number; locale: string }) {
  const chars = new Intl.NumberFormat(locale).format(value).split("");
  return (
    <span className="hb-xc12-roll" aria-hidden="true">
      {chars.map((ch, i) => {
        const fromRight = chars.length - 1 - i;
        const d = Number(ch);
        if (Number.isNaN(d) || ch === " ") {
          return (
            <span key={`s${fromRight}`} className="hb-xc12-sep">
              {ch}
            </span>
          );
        }
        return (
          <span
            key={`d${fromRight}`}
            className="hb-xc12-col"
            style={{ transform: `translateY(${(-d * 1.2).toFixed(2)}em)`, "--hb-xc12-dl": `${(fromRight * 45 + 300).toFixed(0)}ms` } as React.CSSProperties}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => (
              <span key={k}>{k}</span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

const SPARKS = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
  r: `${(i * 45 + 22.5).toFixed(1)}deg`,
  c: ["#7fb3ff", "#ffd166", "#ff7aa8", "#6af0a0"][i % 4],
}));

export function SocialFollowAvatar({
  name = "Maya Okafor",
  handle = "@mayamakes",
  initials = "MO",
  colors = ["#ff8a5b", "#d6336c"],
  count = 2480,
  countLabel = "followers",
  following: followingProp,
  defaultFollowing = false,
  onFollowChange,
  accent = "#2f7bff",
  locale = "en-US",
  className = "",
  style,
  ...rest
}: SocialFollowAvatarProps) {
  const [inner, setInner] = React.useState(defaultFollowing);
  const [burst, setBurst] = React.useState(0);
  const on = followingProp ?? inner;
  const startOn = followingProp ?? defaultFollowing;
  const base = startOn ? count - 1 : count;
  const value = base + (on ? 1 : 0);
  const fmt = new Intl.NumberFormat(locale);

  function toggle() {
    const next = !on;
    if (followingProp === undefined) setInner(next);
    if (next) setBurst((b) => b + 1);
    onFollowChange?.(next, base + (next ? 1 : 0));
  }

  return (
    <>
      <style href="hb-social-follow-avatar" precedence="default">{css}</style>
      <div
        className={`hb-xc12 ${className}`}
        style={{ "--hb-xc12-a": accent, "--hb-xc12-c1": colors[0], "--hb-xc12-c2": colors[1], ...style } as React.CSSProperties}
        data-on={on ? "true" : undefined}
        {...rest}
      >
        <button type="button" className="hb-xc12-av" aria-pressed={on} aria-label={on ? `Unfollow ${name}` : `Follow ${name}`} onClick={toggle}>
          <svg className="hb-xc12-ring" viewBox="0 0 68 68" aria-hidden="true">
            <circle cx="34" cy="34" r="33" />
            <circle cx="34" cy="34" r="33" />
          </svg>
          <span className="hb-xc12-face" aria-hidden="true">
            {initials}
          </span>
          {on && burst > 0 ? (
            <span className="hb-xc12-burst" key={burst} aria-hidden="true">
              {SPARKS.map((s, i) => (
                <span key={i} style={{ "--hb-xc12-r": s.r, "--hb-xc12-p": s.c } as React.CSSProperties} />
              ))}
            </span>
          ) : null}
          <span className="hb-xc12-badge" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
              <path d="M8 3.5v9M3.5 8h9" />
            </svg>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="m3.5 8.5 3 3 6-6.5" />
            </svg>
          </span>
        </button>
        <div className="hb-xc12-info">
          <span className="hb-xc12-name">{name}</span>
          <span className="hb-xc12-h">{handle}</span>
          <span className="hb-xc12-cnt">
            <span className="hb-xc12-num">
              <Roll value={value} locale={locale} />
            </span>
            {countLabel}
            <span className="hb-xc12-st">Following</span>
            <span className="hb-xc12-sr" aria-live="polite">
              {fmt.format(value)} {countLabel}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
