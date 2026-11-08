"use client";

import * as React from "react";

export interface SocialFollowCountLabels {
  follow?: string;
  following?: string;
  followers?: string;
}

export interface SocialFollowCountProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  following?: boolean;
  defaultFollowing?: boolean;
  onFollowChange?: (following: boolean, count: number) => void;
  count?: number;
  avatars?: string[];
  viewerInitials?: string;
  accent?: string;
  locale?: string;
  labels?: SocialFollowCountLabels;
  disabled?: boolean;
}

const css = `
.hb-xc10 { --hb-xc10-a: #2f7bff; position: relative; display: inline-flex; align-items: stretch; height: 40px; max-width: 100%; box-sizing: border-box; font-family: inherit; border-radius: 999px; background: #121212; box-shadow: inset 0 0 0 1px #262626, inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 24px -16px rgba(0, 0, 0, 0.9); }
.hb-xc10 *, .hb-xc10 *::before, .hb-xc10 *::after { box-sizing: border-box; }
.hb-xc10-b {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex: none;
  margin: 3px;
  padding: 0 15px 0 12px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xc10-a) 82%, #ffffff), var(--hb-xc10-a));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28), 0 6px 14px -6px color-mix(in srgb, var(--hb-xc10-a) 70%, transparent);
  cursor: pointer;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xc10-b:active:not(:disabled) { transform: scale(0.95); }
.hb-xc10-b:focus-visible { outline: 2px solid var(--hb-xc10-a); outline-offset: 2px; }
.hb-xc10-b:disabled { opacity: 0.5; cursor: not-allowed; }
.hb-xc10[data-on="true"] .hb-xc10-b { color: #ededed; background: #1d1d1d; box-shadow: inset 0 0 0 1px #2e2e2e, inset 0 1px 0 rgba(255, 255, 255, 0.05); }
.hb-xc10-g { position: relative; width: 14px; height: 14px; flex: none; }
.hb-xc10-g svg { position: absolute; inset: 0; width: 14px; height: 14px; transition: transform 0.45s cubic-bezier(0.34, 1.5, 0.5, 1), opacity 0.2s ease; }
.hb-xc10-g svg + svg { opacity: 0; transform: rotate(-45deg) scale(0.4); }
.hb-xc10[data-on="true"] .hb-xc10-g svg:first-child { opacity: 0; transform: rotate(90deg) scale(0.4); }
.hb-xc10[data-on="true"] .hb-xc10-g svg + svg { opacity: 1; transform: none; color: #3ddc84; }
.hb-xc10-g path.hb-xc10-ck { stroke-dasharray: 16; stroke-dashoffset: 16; transition: stroke-dashoffset 0.35s cubic-bezier(0.65, 0, 0.35, 1) 0.12s; }
.hb-xc10[data-on="true"] .hb-xc10-g path.hb-xc10-ck { stroke-dashoffset: 0; }
.hb-xc10-txt { display: grid; }
.hb-xc10-txt > span { grid-area: 1 / 1; white-space: nowrap; transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease; }
.hb-xc10-txt > span + span { opacity: 0; transform: translateY(100%); }
.hb-xc10[data-on="true"] .hb-xc10-txt > span:first-child { opacity: 0; transform: translateY(-100%); }
.hb-xc10[data-on="true"] .hb-xc10-txt > span + span { opacity: 1; transform: none; }
.hb-xc10-meta { display: inline-flex; align-items: center; gap: 9px; min-width: 0; padding: 0 14px 0 6px; }
.hb-xc10-st { display: inline-flex; align-items: center; flex: none; }
.hb-xc10-av {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: -7px;
  border-radius: 50%;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.92);
  background: var(--hb-xc10-bg);
  box-shadow: 0 0 0 2px #121212;
  transition: margin 0.45s cubic-bezier(0.34, 1.4, 0.5, 1);
}
.hb-xc10-av:first-child { margin-left: 0; }
.hb-xc10-you { width: 0; margin-left: 0; overflow: hidden; transform: scale(0.2); opacity: 0; transition: width 0.45s cubic-bezier(0.34, 1.4, 0.5, 1), margin 0.45s cubic-bezier(0.34, 1.4, 0.5, 1), transform 0.45s cubic-bezier(0.34, 1.6, 0.5, 1), opacity 0.2s ease; background: linear-gradient(135deg, color-mix(in srgb, var(--hb-xc10-a) 70%, #ffffff), var(--hb-xc10-a)); }
.hb-xc10[data-on="true"] .hb-xc10-you { width: 24px; transform: scale(1); opacity: 1; }
.hb-xc10[data-on="true"] .hb-xc10-you + .hb-xc10-av { margin-left: -7px; }
.hb-xc10-you + .hb-xc10-av { margin-left: 0; }
.hb-xc10-n { display: inline-flex; align-items: baseline; gap: 5px; min-width: 0; white-space: nowrap; }
.hb-xc10-num { font-size: 13px; font-weight: 650; color: #ededed; font-variant-numeric: tabular-nums; }
.hb-xc10-lbl { font-size: 12px; color: #8f8f8f; overflow: hidden; text-overflow: ellipsis; }
.hb-xc10-roll { display: inline-flex; overflow: hidden; height: 1.15em; line-height: 1.15; }
.hb-xc10-col { display: inline-flex; flex-direction: column; transition: transform 0.65s cubic-bezier(0.2, 0.9, 0.2, 1); transition-delay: var(--hb-xc10-dl, 0ms); }
.hb-xc10-col span, .hb-xc10-sep { display: block; height: 1.15em; }
.hb-xc10-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-xc10-b, .hb-xc10-g svg, .hb-xc10-g path.hb-xc10-ck, .hb-xc10-txt > span, .hb-xc10-av, .hb-xc10-you, .hb-xc10-col { transition: none; }
  .hb-xc10-b:active:not(:disabled) { transform: none; }
}
`;

const PALETTE = ["#7c5cff", "#ff7a59", "#1fb5a8", "#e6489a", "#d9a21b", "#4a8cff"];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function Roll({ value, locale }: { value: number; locale: string }) {
  const chars = new Intl.NumberFormat(locale).format(value).split("");
  return (
    <span className="hb-xc10-roll" aria-hidden="true">
      {chars.map((ch, i) => {
        const fromRight = chars.length - 1 - i;
        const d = Number(ch);
        if (Number.isNaN(d) || ch === " ") {
          return (
            <span key={`s${fromRight}`} className="hb-xc10-sep">
              {ch}
            </span>
          );
        }
        return (
          <span
            key={`d${fromRight}`}
            className="hb-xc10-col"
            style={{ transform: `translateY(${(-d * 1.15).toFixed(2)}em)`, "--hb-xc10-dl": `${fromRight * 45}ms` } as React.CSSProperties}
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

export function SocialFollowCount({
  following: followingProp,
  defaultFollowing = false,
  onFollowChange,
  count = 12839,
  avatars = ["MR", "JS", "AK"],
  viewerInitials = "AM",
  accent = "#2f7bff",
  locale = "en-US",
  labels,
  disabled = false,
  className = "",
  style,
  ...rest
}: SocialFollowCountProps) {
  const [inner, setInner] = React.useState(defaultFollowing);
  const on = followingProp ?? inner;
  const baseFollowing = followingProp ?? defaultFollowing;
  const base = baseFollowing ? count - 1 : count;
  const value = base + (on ? 1 : 0);
  const t = { follow: "Follow", following: "Following", followers: "followers", ...labels };
  const fmt = new Intl.NumberFormat(locale);

  function toggle() {
    const next = !on;
    if (followingProp === undefined) setInner(next);
    onFollowChange?.(next, base + (next ? 1 : 0));
  }

  return (
    <>
      <style href="hb-social-follow-count" precedence="default">{css}</style>
      <div
        className={`hb-xc10 ${className}`}
        style={{ "--hb-xc10-a": accent, ...style } as React.CSSProperties}
        data-on={on ? "true" : undefined}
        {...rest}
      >
        <button type="button" className="hb-xc10-b" aria-pressed={on} disabled={disabled} onClick={toggle}>
          <span className="hb-xc10-g" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M8 3v10M3 8h10" />
            </svg>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path className="hb-xc10-ck" d="m3 8.5 3.2 3.2L13 4.8" />
            </svg>
          </span>
          <span className="hb-xc10-txt">
            <span aria-hidden={on || undefined}>{t.follow}</span>
            <span aria-hidden={!on || undefined}>{t.following}</span>
          </span>
        </button>
        <span className="hb-xc10-meta">
          <span className="hb-xc10-st" aria-hidden="true">
            <span className="hb-xc10-av hb-xc10-you">{viewerInitials}</span>
            {avatars.slice(0, 3).map((a, i) => (
              <span
                key={`${a}-${i}`}
                className="hb-xc10-av"
                style={{ "--hb-xc10-bg": PALETTE[hash(`${a}${i}`) % PALETTE.length] } as React.CSSProperties}
              >
                {a}
              </span>
            ))}
          </span>
          <span className="hb-xc10-n">
            <span className="hb-xc10-num">
              <Roll value={value} locale={locale} />
            </span>
            <span className="hb-xc10-lbl">{t.followers}</span>
            <span className="hb-xc10-sr" aria-live="polite">
              {fmt.format(value)} {t.followers}
            </span>
          </span>
        </span>
      </div>
    </>
  );
}
