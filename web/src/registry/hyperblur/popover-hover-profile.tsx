"use client";

import * as React from "react";

export interface PopoverHoverProfileUser {
  handle: string;
  name: string;
  role: string;
  location: string;
  localTime: string;
  bio: string;
  repos: number;
  followers: number;
  following: number;
  online?: boolean;
}

export interface PopoverHoverProfileProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  user?: PopoverHoverProfileUser;
  children?: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  side?: "bottom" | "top";
  defaultFollowing?: boolean;
  onFollowChange?: (following: boolean) => void;
  onMessage?: () => void;
  embedded?: boolean;
  accent?: string;
}

const defaultUser: PopoverHoverProfileUser = {
  handle: "mara.lin",
  name: "Mara Lindqvist",
  role: "Staff engineer, Payments",
  location: "Stockholm",
  localTime: "16:42",
  bio: "Making refunds boring. Previously ledger infra at Klarna. Writes about idempotency.",
  repos: 48,
  followers: 2148,
  following: 180,
  online: true,
};

function hash(s: string, i: number) {
  let x = 2166136261 ^ i;
  for (let k = 0; k < s.length; k++) x = Math.imul(x ^ s.charCodeAt(k), 16777619);
  x = Math.imul(x ^ (x >>> 15), 2246822507);
  return (x ^ (x >>> 13)) >>> 0;
}

const css = `
.hb-xf2 { --hb-xf2-accent: #2f7bff; --hb-xf2-delay: 380ms; position: relative; display: inline; box-sizing: border-box; font-family: inherit; }
.hb-xf2 *, .hb-xf2 *::before, .hb-xf2 *::after { box-sizing: border-box; }
.hb-xf2-mention { all: unset; position: relative; display: inline; font: inherit; font-weight: 600; color: color-mix(in srgb, var(--hb-xf2-accent) 55%, #fff); cursor: pointer; border-radius: 4px; padding: 0 2px; background: color-mix(in srgb, var(--hb-xf2-accent) 12%, transparent); transition: background .2s; }
.hb-xf2-mention:hover, .hb-xf2-mention[aria-expanded="true"] { background: color-mix(in srgb, var(--hb-xf2-accent) 22%, transparent); }
.hb-xf2-mention:focus-visible { outline: 2px solid var(--hb-xf2-accent); outline-offset: 2px; }
.hb-xf2-line { position: absolute; left: 2px; right: 2px; bottom: -2px; height: 2px; border-radius: 2px; background: var(--hb-xf2-accent); transform: scaleX(0); transform-origin: left; pointer-events: none; }
.hb-xf2-mention[data-intent="true"] .hb-xf2-line { transform: scaleX(1); transition: transform var(--hb-xf2-delay) cubic-bezier(.4,.1,.3,1); }
.hb-xf2-mention[aria-expanded="true"] .hb-xf2-line { transform: scaleX(1); opacity: 0; transition: opacity .2s; }
.hb-xf2-card { position: absolute; left: -8px; z-index: 60; width: 300px; max-width: calc(100vw - 24px); display: block; border-radius: 18px; overflow: hidden; background: #121212; border: 1px solid #2a2a2a; color: #ededed; text-align: left; font-weight: 400; line-height: 1.4; white-space: normal; box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 30px 60px -20px rgba(0,0,0,.8), 0 10px 20px -10px rgba(0,0,0,.6); outline: none; }
.hb-xf2-card[data-side="bottom"] { top: calc(100% + 10px); transform-origin: 24px -10px; }
.hb-xf2-card[data-side="top"] { bottom: calc(100% + 10px); transform-origin: 24px calc(100% + 10px); }
.hb-xf2-card[data-state="open"] { animation: hb-xf2-in .36s cubic-bezier(.16,1,.3,1) both; }
.hb-xf2-card[data-state="closed"] { animation: hb-xf2-out .15s ease-in both; pointer-events: none; }
.hb-xf2-card::before { content: ""; position: absolute; left: 0; right: 0; height: 14px; }
.hb-xf2-card[data-side="bottom"]::before { top: -14px; }
.hb-xf2-card[data-side="top"]::before { bottom: -14px; }
.hb-xf2-cover { position: relative; height: 56px; background: var(--hb-xf2-cover); }
.hb-xf2-cover::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(115deg, rgba(255,255,255,.07) 0 1px, transparent 1px 9px), linear-gradient(transparent 40%, #121212); }
.hb-xf2-top { display: flex; align-items: flex-end; justify-content: space-between; padding: 0 14px; margin-top: -26px; position: relative; z-index: 1; }
.hb-xf2-ava { position: relative; display: grid; place-items: center; width: 52px; height: 52px; border-radius: 50%; font-size: 17px; font-weight: 600; letter-spacing: -.02em; color: #fff; background: var(--hb-xf2-ava); box-shadow: 0 0 0 3px #121212, 0 6px 16px -6px rgba(0,0,0,.8); }
.hb-xf2-online { position: absolute; right: 1px; bottom: 2px; width: 12px; height: 12px; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 0 2.5px #121212; }
.hb-xf2-btns { display: flex; gap: 6px; padding-bottom: 2px; }
.hb-xf2-btn { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 30px; padding: 0 12px; border-radius: 999px; font-size: 12px; font-weight: 600; cursor: pointer; transition: background .2s, color .2s, border-color .2s, transform .15s cubic-bezier(.3,.7,.4,1); }
.hb-xf2-btn:active { transform: scale(.95); }
.hb-xf2-btn:focus-visible { outline: 2px solid var(--hb-xf2-accent); outline-offset: 2px; }
.hb-xf2-ghost { width: 30px; padding: 0; color: #a1a1a1; border: 1px solid #2c2c2c; background: #171717; }
.hb-xf2-ghost:hover { color: #ededed; border-color: #3a3a3a; }
.hb-xf2-ghost svg { width: 14px; height: 14px; }
.hb-xf2-follow { min-width: 84px; color: #0a0a0a; background: #ededed; box-shadow: inset 0 -1px 0 rgba(0,0,0,.15); }
.hb-xf2-follow:hover { background: #fff; }
.hb-xf2-follow[aria-pressed="true"] { color: #ededed; background: #1c1c1c; box-shadow: inset 0 0 0 1px #333; }
.hb-xf2-follow[aria-pressed="true"]:hover { color: #ff7a7a; box-shadow: inset 0 0 0 1px #5a2a2a; }
.hb-xf2-follow svg { width: 12px; height: 12px; }
.hb-xf2-main { padding: 10px 14px 0; }
.hb-xf2-name { display: flex; align-items: baseline; gap: 6px; margin: 0; font-size: 15px; font-weight: 600; letter-spacing: -.01em; }
.hb-xf2-handle { font-size: 12px; font-weight: 400; color: #8f8f8f; }
.hb-xf2-role { margin: 2px 0 0; font-size: 12px; color: #a1a1a1; }
.hb-xf2-bio { margin: 8px 0 0; font-size: 12.5px; color: #d4d4d4; }
.hb-xf2-where { display: flex; gap: 12px; margin-top: 8px; font-size: 11.5px; color: #8f8f8f; }
.hb-xf2-where span { display: inline-flex; align-items: center; gap: 4px; }
.hb-xf2-where svg { width: 12px; height: 12px; }
.hb-xf2-graph { display: block; width: 100%; height: auto; margin: 12px 0 0; }
.hb-xf2-cell { animation: hb-xf2-pop .5s cubic-bezier(.2,.8,.2,1) both; transform-box: fill-box; transform-origin: center; }
.hb-xf2-stats { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 12px; border-top: 1px solid #222; }
.hb-xf2-stat { padding: 10px 0 12px; text-align: center; font-size: 11px; color: #8f8f8f; }
.hb-xf2-stat + .hb-xf2-stat { border-left: 1px solid #222; }
.hb-xf2-num { display: block; height: 18px; overflow: hidden; font-size: 14px; font-weight: 600; color: #ededed; font-variant-numeric: tabular-nums; }
.hb-xf2-num span { display: block; animation: hb-xf2-roll .4s cubic-bezier(.2,.9,.3,1.2) both; }
.hb-xf2-embedded { display: inline-block; }
.hb-xf2-embedded .hb-xf2-card { position: relative; left: auto; top: auto; bottom: auto; margin-top: 10px; animation: none; }
@keyframes hb-xf2-in { from { opacity: 0; transform: translateY(-6px) scale(.94); } to { opacity: 1; transform: none; } }
@keyframes hb-xf2-out { to { opacity: 0; transform: translateY(-4px) scale(.97); } }
@keyframes hb-xf2-pop { from { opacity: 0; transform: scale(.2); } }
@keyframes hb-xf2-roll { from { transform: translateY(100%); opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xf2 *, .hb-xf2 *::before { animation: none !important; transition: none !important; }
}
`;

export function PopoverHoverProfile({
  user = defaultUser,
  children,
  openDelay = 380,
  closeDelay = 220,
  side = "bottom",
  defaultFollowing = false,
  onFollowChange,
  onMessage,
  embedded = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PopoverHoverProfileProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [open, setOpen] = React.useState(embedded);
  const [mounted, setMounted] = React.useState(embedded);
  const [intent, setIntent] = React.useState(false);
  const [following, setFollowing] = React.useState(defaultFollowing);
  const openTimer = React.useRef(0);
  const closeTimer = React.useRef(0);
  const unmountTimer = React.useRef(0);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const cardRef = React.useRef<HTMLSpanElement>(null);

  if (open && !mounted) setMounted(true);

  React.useEffect(
    () => () => {
      window.clearTimeout(openTimer.current);
      window.clearTimeout(closeTimer.current);
      window.clearTimeout(unmountTimer.current);
    },
    [],
  );

  const show = (now: boolean) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(unmountTimer.current);
    if (open) return;
    if (now) {
      setOpen(true);
      return;
    }
    setIntent(true);
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => {
      setIntent(false);
      setOpen(true);
    }, openDelay);
  };

  const hide = (now: boolean) => {
    window.clearTimeout(openTimer.current);
    setIntent(false);
    if (embedded) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      unmountTimer.current = window.setTimeout(() => setMounted(false), 160);
    }, now ? 0 : closeDelay);
  };

  const toggleFollow = () => {
    const next = !following;
    setFollowing(next);
    onFollowChange?.(next);
  };

  const followers = user.followers + (following && !defaultFollowing ? 1 : !following && defaultFollowing ? -1 : 0);
  const initials = user.name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
  const h1 = hash(user.handle, 1) % 360;
  const h2 = (h1 + 40 + (hash(user.handle, 2) % 80)) % 360;
  const vars = {
    "--hb-xf2-accent": accent,
    "--hb-xf2-delay": `${openDelay}ms`,
    "--hb-xf2-cover": `linear-gradient(120deg, hsl(${h1} 70% 42%), hsl(${h2} 75% 30%) 60%, hsl(${(h2 + 30) % 360} 60% 18%))`,
    "--hb-xf2-ava": `radial-gradient(circle at 30% 25%, hsl(${h1} 80% 66%), hsl(${h2} 70% 38%))`,
  } as React.CSSProperties;

  const cols = 26;
  const rows = 5;
  const cells: React.ReactNode[] = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const v = hash(user.handle, c * rows + r + 10) % 100;
      const trend = c / cols;
      const level = v < 30 - trend * 18 ? 0 : v < 60 ? 1 : v < 84 ? 2 : 3;
      const fill = level === 0 ? "#1d1d1d" : `color-mix(in srgb, ${accent} ${[0, 35, 65, 100][level]}%, #1d1d1d)`;
      cells.push(
        <rect
          key={`${c}-${r}`}
          className="hb-xf2-cell"
          x={c * 9}
          y={r * 9}
          width="7"
          height="7"
          rx="1.6"
          style={{ fill, animationDelay: `${(c * 0.012 + r * 0.02).toFixed(3)}s` }}
        />,
      );
    }
  }

  return (
    <span
      className={`hb-xf2 ${embedded ? "hb-xf2-embedded" : ""} ${className}`}
      style={{ ...vars, ...style }}
      onPointerEnter={(e) => e.pointerType === "mouse" && show(false)}
      onPointerLeave={(e) => e.pointerType === "mouse" && hide(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open && !embedded) {
          e.stopPropagation();
          hide(true);
          triggerRef.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide(false);
      }}
      {...rest}
    >
      <style href="hb-popover-hover-profile" precedence="default">{css}</style>
      <button
        ref={triggerRef}
        type="button"
        className="hb-xf2-mention"
        data-intent={intent}
        aria-expanded={open}
        aria-controls={`${uid}-card`}
        aria-haspopup="dialog"
        onFocus={() => show(true)}
        onClick={() => (open && !embedded ? hide(true) : show(true))}
      >
        {children ?? `@${user.handle}`}
        <span className="hb-xf2-line" aria-hidden="true" />
      </button>
      {mounted && (
        <span
          ref={cardRef}
          id={`${uid}-card`}
          role="dialog"
          aria-label={`${user.name} profile`}
          className="hb-xf2-card"
          data-side={side}
          data-state={open ? "open" : "closed"}
        >
          <span className="hb-xf2-cover" style={{ display: "block" }} aria-hidden="true" />
          <span className="hb-xf2-top">
            <span className="hb-xf2-ava" aria-hidden="true">
              {initials}
              {user.online && <span className="hb-xf2-online" />}
            </span>
            <span className="hb-xf2-btns">
              <button type="button" className="hb-xf2-btn hb-xf2-ghost" aria-label={`Message ${user.name}`} onClick={onMessage}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" /></svg>
              </button>
              <button type="button" className="hb-xf2-btn hb-xf2-follow" aria-pressed={following} onClick={toggleFollow}>
                {following ? (
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2.5 6.2 2.3 2.3 4.7-5" /></svg>
                ) : (
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 2v8M2 6h8" /></svg>
                )}
                {following ? "Following" : "Follow"}
              </button>
            </span>
          </span>
          <span className="hb-xf2-main" style={{ display: "block" }}>
            <span className="hb-xf2-name" style={{ display: "flex" }}>
              {user.name}
              <span className="hb-xf2-handle">@{user.handle}</span>
            </span>
            <span className="hb-xf2-role" style={{ display: "block" }}>{user.role}</span>
            <span className="hb-xf2-bio" style={{ display: "block" }}>{user.bio}</span>
            <span className="hb-xf2-where">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
                {user.location}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
                {user.localTime} local
              </span>
            </span>
            <svg className="hb-xf2-graph" viewBox={`0 0 ${cols * 9 - 2} ${rows * 9 - 2}`} role="img" aria-label="Contributions over the last six months">
              {cells}
            </svg>
          </span>
          <span className="hb-xf2-stats">
            <span className="hb-xf2-stat"><span className="hb-xf2-num">{user.repos}</span>Repos</span>
            <span className="hb-xf2-stat">
              <span className="hb-xf2-num" aria-live="polite"><span key={followers}>{followers.toLocaleString("en-US")}</span></span>
              Followers
            </span>
            <span className="hb-xf2-stat"><span className="hb-xf2-num">{user.following}</span>Following</span>
          </span>
        </span>
      )}
    </span>
  );
}
