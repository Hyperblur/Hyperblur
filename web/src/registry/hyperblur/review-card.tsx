"use client";

import * as React from "react";

export interface ReviewCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  rating?: number;
  name?: string;
  date?: string;
  title?: string;
  text?: string;
  verified?: boolean;
  helpful?: number;
  avatar?: string;
  lines?: number;
}

const css = `
.hb-rv {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 16px;
  border: 1px solid #262626;
  border-radius: 14px;
  background: #111111;
  color: #ededed;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
}
.hb-rv *, .hb-rv *::before, .hb-rv *::after { box-sizing: border-box; }
.hb-rv-top {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.hb-rv-av {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-radius: 50%;
  background: var(--hb-bg);
  color: var(--hb-fg);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.hb-rv-img {
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
}
.hb-rv-who {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.hb-rv-name {
  overflow: hidden;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-rv-ok {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 4px;
  color: #4ade80;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}
.hb-rv-ok svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-rv-date {
  flex: none;
  color: #8f8f8f;
  font-size: 12px;
  white-space: nowrap;
}
.hb-rv-rate {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.hb-rv-stars {
  display: inline-flex;
  flex: none;
}
.hb-rv-star {
  position: relative;
  flex: none;
  width: 14px;
  height: 14px;
}
.hb-rv-star svg {
  position: absolute;
  inset: 0;
  width: 14px;
  height: 14px;
  display: block;
}
.hb-rv-star-b { fill: rgba(255, 255, 255, 0.14); }
.hb-rv-star-f {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
}
.hb-rv-star-f svg { fill: #f5b301; }
.hb-rv-title {
  overflow: hidden;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-rv-text {
  margin: 0;
  color: #bdbdbd;
  font-size: 13px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.hb-rv-text[data-open="false"] {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--hb-l);
  line-clamp: var(--hb-l);
}
.hb-rv-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 28px;
}
.hb-rv-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 5px 10px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #171717;
  color: #8f8f8f;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  touch-action: manipulation;
  transition: color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
}
.hb-rv-btn:hover { color: #ededed; border-color: #3a3a3a; }
.hb-rv-btn:focus-visible { outline: 2px solid #ededed; outline-offset: 2px; }
.hb-rv-btn[aria-pressed="true"] {
  color: #ededed;
  border-color: #4a4a4a;
  background: #1f1f1f;
}
.hb-rv-btn svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-rv-btn[aria-pressed="true"] svg { fill: currentColor; fill-opacity: 0.2; }
.hb-rv-more {
  margin: 0;
  padding: 4px 2px;
  border: 0;
  background: none;
  color: #8f8f8f;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: #3a3a3a;
  cursor: pointer;
}
.hb-rv-more:hover { color: #ededed; }
.hb-rv-more:focus-visible { outline: 2px solid #ededed; outline-offset: 2px; border-radius: 4px; }
.hb-rv-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
`;

const starPath =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (Math.imul(h, 31) + input.charCodeAt(i)) >>> 0;
  return h;
}

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0][0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

export function ReviewCard({
  rating = 5,
  name = "Anonymous",
  date = "",
  title = "",
  text = "",
  verified = false,
  helpful = 0,
  avatar,
  lines = 3,
  className = "",
  style,
  ...rest
}: ReviewCardProps) {
  const id = React.useId();
  const bodyRef = React.useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = React.useState(false);
  const [clamped, setClamped] = React.useState(false);
  const [voted, setVoted] = React.useState(false);

  const max = 5;
  const value = Math.min(max, Math.max(0, Math.round(rating * 2) / 2));
  const clampLines = Math.max(1, Math.round(lines));
  const hue = hash(name) % 360;
  const votes = helpful + (voted ? 1 : 0);

  React.useEffect(() => {
    const el = bodyRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      if (el.dataset.open === "true") return;
      setClamped(el.scrollHeight > el.clientHeight + 1);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, clampLines]);

  const vars = {
    "--hb-l": clampLines,
    "--hb-bg": `hsl(${hue} 42% 30%)`,
    "--hb-fg": `hsl(${hue} 70% 88%)`,
    ...style,
  } as React.CSSProperties;

  return (
    <article className={`hb-rv ${className}`} style={vars} {...rest}>
      <style href="hb-review-card" precedence="default">{css}</style>
      <div className="hb-rv-top">
        <span className="hb-rv-av" aria-hidden="true">
          {initials(name)}
          {avatar && (
            <span
              className="hb-rv-img"
              style={{ backgroundImage: `url("${avatar.replace(/"/g, "%22")}")` }}
            />
          )}
        </span>
        <div className="hb-rv-who">
          <span className="hb-rv-name">{name}</span>
          {verified && (
            <span className="hb-rv-ok">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              Verified
            </span>
          )}
        </div>
        {date && <span className="hb-rv-date">{date}</span>}
      </div>
      <div className="hb-rv-rate">
        <span className="hb-rv-stars" role="img" aria-label={`Rated ${value} out of ${max}`}>
          {Array.from({ length: max }, (_, i) => {
            const fill = Math.min(1, Math.max(0, value - i));
            return (
              <span key={i} className="hb-rv-star" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="hb-rv-star-b">
                  <path d={starPath} />
                </svg>
                <span className="hb-rv-star-f" style={{ width: `${fill * 100}%` }}>
                  <svg viewBox="0 0 24 24">
                    <path d={starPath} />
                  </svg>
                </span>
              </span>
            );
          })}
        </span>
        {title && <span className="hb-rv-title">{title}</span>}
      </div>
      {text && (
        <p ref={bodyRef} id={id} className="hb-rv-text" data-open={open ? "true" : "false"}>
          {text}
        </p>
      )}
      <div className="hb-rv-foot">
        <button
          type="button"
          className="hb-rv-btn"
          aria-pressed={voted}
          onClick={() => setVoted((v) => !v)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 11v9H4a1 1 0 01-1-1v-7a1 1 0 011-1h3zM7 11l4-7c1.7 0 2.7 1.2 2.4 2.9L13 10h5.3a2 2 0 011.97 2.35l-1.1 6A2 2 0 0117.2 20H7" />
          </svg>
          <span>Helpful</span>
          {votes > 0 && <span>{votes.toLocaleString("en-US")}</span>}
        </button>
        {(clamped || open) && (
          <button
            type="button"
            className="hb-rv-more"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Show less" : "Read more"}
          </button>
        )}
      </div>
      <span className="hb-rv-sr" role="status" aria-live="polite">
        {voted ? `Marked helpful. ${votes} found this helpful.` : ""}
      </span>
    </article>
  );
}
