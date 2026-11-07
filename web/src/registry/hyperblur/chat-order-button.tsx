"use client";

import * as React from "react";

export interface ChatOrderButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  phone?: string;
  message?: string;
  label?: string;
  sublabel?: string;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light" | "outline" | "solid";
  unread?: boolean | number;
  accent?: string;
  newTab?: boolean;
  unreadLabel?: string;
}

export function buildChatHref(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

const css = `
.hb-ob3 {
  --hb-ob3-h: 48px;
  --hb-ob3-icon: 30px;
  --hb-ob3-fs: 14.5px;
  --hb-ob3-bg: #0d0d0d;
  --hb-ob3-fg: #f2f2f2;
  --hb-ob3-sub: #9a9a9a;
  --hb-ob3-line: #2a2a2a;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 11px;
  height: var(--hb-ob3-h);
  padding: 0 20px 0 calc((var(--hb-ob3-h) - var(--hb-ob3-icon)) / 2);
  border: 1px solid var(--hb-ob3-line);
  border-radius: 999px;
  background: var(--hb-ob3-bg);
  color: var(--hb-ob3-fg);
  font-family: inherit;
  font-size: var(--hb-ob3-fs);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.005em;
  text-decoration: none;
  white-space: nowrap;
  isolation: isolate;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 22px -14px rgba(0, 0, 0, 0.7);
  transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.15s ease, background-color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-ob3 *, .hb-ob3 *::before, .hb-ob3 *::after { box-sizing: border-box; }
.hb-ob3::before {
  content: "";
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: inherit;
  background: radial-gradient(120% 140% at 12% 50%, color-mix(in srgb, var(--hb-ob3-accent) 30%, transparent) 0%, transparent 55%);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.hb-ob3:hover, .hb-ob3:focus-visible {
  border-color: color-mix(in srgb, var(--hb-ob3-accent) 55%, var(--hb-ob3-line));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 4px color-mix(in srgb, var(--hb-ob3-accent) 14%, transparent), 0 10px 34px -8px color-mix(in srgb, var(--hb-ob3-accent) 55%, transparent);
}
.hb-ob3:hover::before, .hb-ob3:focus-visible::before { opacity: 1; }
.hb-ob3:active { transform: scale(0.97); }
.hb-ob3:focus-visible { outline: 2px solid var(--hb-ob3-accent); outline-offset: 3px; }
.hb-ob3[data-size="sm"] { --hb-ob3-h: 38px; --hb-ob3-icon: 24px; --hb-ob3-fs: 13px; gap: 8px; padding-right: 15px; }
.hb-ob3[data-size="lg"] { --hb-ob3-h: 58px; --hb-ob3-icon: 38px; --hb-ob3-fs: 16px; gap: 13px; padding-right: 26px; }
.hb-ob3[data-variant="light"] { --hb-ob3-bg: #ffffff; --hb-ob3-fg: #111111; --hb-ob3-sub: #666666; --hb-ob3-line: #e4e4e4; box-shadow: 0 8px 22px -14px rgba(0, 0, 0, 0.35); }
.hb-ob3[data-variant="outline"] { --hb-ob3-bg: transparent; --hb-ob3-line: color-mix(in srgb, var(--hb-ob3-accent) 45%, transparent); box-shadow: none; }
.hb-ob3[data-variant="solid"] { --hb-ob3-bg: var(--hb-ob3-accent); --hb-ob3-fg: #06210f; --hb-ob3-sub: rgba(6, 33, 15, 0.7); --hb-ob3-line: transparent; }
.hb-ob3-icon {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: var(--hb-ob3-icon);
  height: var(--hb-ob3-icon);
  border-radius: 50%;
  background: color-mix(in srgb, var(--hb-ob3-accent) 14%, transparent);
  transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-ob3[data-variant="solid"] .hb-ob3-icon { background: rgba(255, 255, 255, 0.28); }
.hb-ob3:hover .hb-ob3-icon { transform: rotate(-8deg) scale(1.06); }
.hb-ob3-icon svg { width: 78%; height: 78%; overflow: visible; }
.hb-ob3-bubble { fill: var(--hb-ob3-accent); }
.hb-ob3[data-variant="solid"] .hb-ob3-bubble { fill: #ffffff; }
.hb-ob3-handset { color: #ffffff; }
.hb-ob3-handset rect { fill: currentColor; }
.hb-ob3-handset path { fill: none; stroke: currentColor; stroke-width: 2.1; stroke-linecap: round; }
.hb-ob3[data-variant="solid"] .hb-ob3-handset { color: var(--hb-ob3-accent); }
.hb-ob3:hover .hb-ob3-handset { animation: hb-ob3-ring 0.6s ease; transform-origin: 50% 50%; transform-box: fill-box; }
.hb-ob3-text { display: flex; flex-direction: column; gap: 3px; }
.hb-ob3-sub { color: var(--hb-ob3-sub); font-size: 0.76em; font-weight: 500; }
.hb-ob3-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  display: grid;
  place-items: center;
  min-width: 12px;
  height: 12px;
  padding: 0 3px;
  border: 2px solid var(--hb-ob3-bg);
  border-radius: 999px;
  background: #ff4d4f;
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
}
.hb-ob3[data-variant="outline"] .hb-ob3-dot { border-color: #0d0d0d; }
.hb-ob3-dot[data-count="true"] { top: -5px; right: -6px; min-width: 17px; height: 17px; }
.hb-ob3-dot::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.6);
  animation: hb-ob3-ping 1.8s ease-out infinite;
}
@keyframes hb-ob3-ring { 0%, 100% { transform: rotate(0); } 20% { transform: rotate(-14deg); } 40% { transform: rotate(12deg); } 60% { transform: rotate(-8deg); } 80% { transform: rotate(5deg); } }
@keyframes hb-ob3-ping { 0% { box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.55); } 80%, 100% { box-shadow: 0 0 0 7px rgba(255, 77, 79, 0); } }
@media (prefers-reduced-motion: reduce) {
  .hb-ob3, .hb-ob3::before, .hb-ob3-icon { transition: none; }
  .hb-ob3:hover .hb-ob3-icon { transform: none; }
  .hb-ob3:hover .hb-ob3-handset, .hb-ob3-dot::after { animation: none; }
}
`;

export function ChatOrderButton({
  phone = "1 555 555 0142",
  message = "Hi! I'd like to place an order for pickup.",
  label = "Order on chat",
  sublabel,
  size = "md",
  variant = "dark",
  unread = false,
  accent = "#25d366",
  newTab = true,
  unreadLabel = "unread",
  className,
  style,
  ...rest
}: ChatOrderButtonProps) {
  const count = typeof unread === "number" ? unread : 0;
  const showDot = unread === true || count > 0;
  return (
    <a
      href={buildChatHref(phone, message)}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={["hb-ob3", className].filter(Boolean).join(" ")}
      data-size={size}
      data-variant={variant}
      style={{ "--hb-ob3-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-chat-order-button" precedence="default">{css}</style>
      <span className="hb-ob3-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path className="hb-ob3-bubble" d="M6.2 2.6h11.6a3.8 3.8 0 0 1 3.8 3.8v8.2a3.8 3.8 0 0 1-3.8 3.8h-1.3l.9 3.3c.15.55-.47.98-.93.64l-5.2-3.94H6.2a3.8 3.8 0 0 1-3.8-3.8V6.4a3.8 3.8 0 0 1 3.8-3.8Z" />
          <g className="hb-ob3-handset">
            <rect x="7.4" y="6.4" width="3.6" height="2.4" rx="1.1" transform="rotate(-45 9.2 7.6)" />
            <rect x="12.6" y="11.6" width="3.6" height="2.4" rx="1.1" transform="rotate(-45 14.4 12.8)" />
            <path d="M8.9 8.4Q9.4 12.6 13.6 13.1" />
          </g>
        </svg>
        {showDot ? (
          <span className="hb-ob3-dot" data-count={count > 0 ? "true" : "false"}>
            {count > 0 ? (count > 9 ? "9+" : count) : null}
          </span>
        ) : null}
      </span>
      <span className="hb-ob3-text">
        <span>{label}</span>
        {sublabel ? <span className="hb-ob3-sub">{sublabel}</span> : null}
      </span>
      {showDot ? <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{count > 0 ? `, ${count} ${unreadLabel}` : `, ${unreadLabel}`}</span> : null}
    </a>
  );
}
