"use client";

import * as React from "react";

export type SocialProviderId =
  | "google"
  | "github"
  | "apple"
  | "x"
  | "linkedin"
  | "discord"
  | "facebook"
  | "microsoft"
  | "slack"
  | "spotify"
  | "twitch"
  | "figma"
  | "email"
  | "link";

export interface SocialProviderConfig {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  color?: string;
  bg?: string;
  fg?: string;
}

export type SocialProvider = SocialProviderId | SocialProviderConfig;

const BRANDS: Record<SocialProviderId, { label: string; color: string; bg: string; fg: string }> = {
  google: { label: "Google", color: "#4285f4", bg: "#ffffff", fg: "#1f1f1f" },
  github: { label: "GitHub", color: "#c9d1d9", bg: "#24292f", fg: "#ffffff" },
  apple: { label: "Apple", color: "#f5f5f7", bg: "#000000", fg: "#ffffff" },
  x: { label: "X", color: "#e7e9ea", bg: "#0f1419", fg: "#ffffff" },
  linkedin: { label: "LinkedIn", color: "#3b8fe0", bg: "#0a66c2", fg: "#ffffff" },
  discord: { label: "Discord", color: "#7983f5", bg: "#5865f2", fg: "#ffffff" },
  facebook: { label: "Facebook", color: "#4a95f5", bg: "#1877f2", fg: "#ffffff" },
  microsoft: { label: "Microsoft", color: "#36b3f0", bg: "#2f2f2f", fg: "#ffffff" },
  slack: { label: "Slack", color: "#e8587f", bg: "#4a154b", fg: "#ffffff" },
  spotify: { label: "Spotify", color: "#1ed760", bg: "#1db954", fg: "#04140a" },
  twitch: { label: "Twitch", color: "#a970ff", bg: "#9146ff", fg: "#ffffff" },
  figma: { label: "Figma", color: "#b17cff", bg: "#1e1e1e", fg: "#ffffff" },
  email: { label: "Email", color: "#f5b450", bg: "#2a2014", fg: "#ffe8c2" },
  link: { label: "Copy link", color: "#a1a1a1", bg: "#262626", fg: "#ededed" },
};

function Glyph({ id }: { id: string }) {
  let body: React.ReactNode;
  switch (id) {
    case "google":
      body = <path d="M18.4 7.2A8 8 0 1 0 20 12h-7.4" />;
      break;
    case "github":
      body = (
        <>
          <circle cx="7" cy="5.5" r="2.1" />
          <circle cx="7" cy="18.5" r="2.1" />
          <circle cx="17" cy="7" r="2.1" />
          <path d="M7 7.6v8.8M17 9.1v1.2a3 3 0 0 1-3 3h-4a3 3 0 0 0-3 3" />
        </>
      );
      break;
    case "apple":
      body = (
        <>
          <path d="M12 8.2c-1.7-1.3-4.7-1.2-6 1.1-1.5 2.6-.5 6.9 1.6 9.4 1.1 1.3 2.2 1.6 3.2 1.1.8-.4 1.6-.4 2.4 0 1 .5 2.1.2 3.2-1.1 2.1-2.5 3.1-6.8 1.6-9.4-1.3-2.3-4.3-2.4-6-1.1z" />
          <path d="M12 8.2c0-1.7.5-2.9 1.6-3.9" />
        </>
      );
      break;
    case "x":
      body = <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />;
      break;
    case "linkedin":
      body = (
        <>
          <circle cx="6.5" cy="6" r="1.3" fill="currentColor" stroke="none" />
          <path d="M6.5 10v8.5M11 18.5V10m0 3.4c0-2 1.5-3.4 3.3-3.4s3.2 1.4 3.2 3.4v5.1" />
        </>
      );
      break;
    case "discord":
      body = (
        <>
          <path d="M7.6 7.5h8.8a4 4 0 0 1 3.9 3.1l.9 4.1a2.3 2.3 0 0 1-3.9 2.1l-1.9-1.9H8.6l-1.9 1.9a2.3 2.3 0 0 1-3.9-2.1l.9-4.1a4 4 0 0 1 3.9-3.1z" />
          <path d="M8.2 10.4v2.8M6.8 11.8h2.8" />
          <circle cx="15.6" cy="11" r=".8" fill="currentColor" stroke="none" />
          <circle cx="17.2" cy="12.6" r=".8" fill="currentColor" stroke="none" />
        </>
      );
      break;
    case "facebook":
      body = <path d="M15.5 4.5h-1.8a2.7 2.7 0 0 0-2.7 2.7v12.3M8.5 11h6.5" />;
      break;
    case "microsoft":
      body = (
        <>
          <rect x="4.5" y="4.5" width="6.4" height="6.4" rx="1.4" />
          <rect x="13.1" y="4.5" width="6.4" height="6.4" rx="1.4" />
          <rect x="4.5" y="13.1" width="6.4" height="6.4" rx="1.4" />
          <rect x="13.1" y="13.1" width="6.4" height="6.4" rx="1.4" />
        </>
      );
      break;
    case "slack":
      body = <path d="M10 4.5 8.4 19.5M15.6 4.5 14 19.5M5 9.2h14.5M4.5 14.8H19" />;
      break;
    case "spotify":
      body = <path d="M4.5 10.5v3M8.25 7.5v9M12 4.5v15M15.75 8v8M19.5 10.5v3" />;
      break;
    case "twitch":
      body = (
        <>
          <path d="M6.5 4.5h11a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H12l-4 3.5V16H6.5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2z" />
          <path d="M10.2 8.5v3.2M14.4 8.5v3.2" />
        </>
      );
      break;
    case "figma":
      body = (
        <>
          <path d="M12 3.5 18 11l-6 9.5L6 11z" />
          <path d="M12 3.5v8" />
          <circle cx="12" cy="13" r="1.5" />
        </>
      );
      break;
    case "email":
      body = (
        <>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
          <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
        </>
      );
      break;
    case "link":
      body = (
        <>
          <path d="M10.2 13.8a3.6 3.6 0 0 0 5.1 0l3-3a3.6 3.6 0 0 0-5.1-5.1l-1.1 1.1" />
          <path d="M13.8 10.2a3.6 3.6 0 0 0-5.1 0l-3 3a3.6 3.6 0 0 0 5.1 5.1l1.1-1.1" />
        </>
      );
      break;
    default:
      body = <circle cx="12" cy="12" r="7" />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {body}
    </svg>
  );
}

interface ResolvedProvider {
  id: string;
  label: string;
  color: string;
  bg: string;
  fg: string;
  icon: React.ReactNode;
}

function resolveProvider(p: SocialProvider): ResolvedProvider {
  const cfg: SocialProviderConfig = typeof p === "string" ? { id: p } : p;
  const brand = BRANDS[cfg.id as SocialProviderId] as (typeof BRANDS)[SocialProviderId] | undefined;
  return {
    id: cfg.id,
    label: cfg.label ?? brand?.label ?? cfg.id,
    color: cfg.color ?? brand?.color ?? "#2f7bff",
    bg: cfg.bg ?? brand?.bg ?? cfg.color ?? "#2f7bff",
    fg: cfg.fg ?? brand?.fg ?? "#ffffff",
    icon: cfg.icon ?? <Glyph id={cfg.id} />,
  };
}

export interface SocialShareDialProps extends React.HTMLAttributes<HTMLDivElement> {
  providers?: SocialProvider[];
  url?: string;
  radius?: number;
  hint?: string;
  onShare?: (provider: string) => void;
}

const css = `
.hb-xc7 { --hb-xc7-r: 56px; --hb-xc7-it: 34px; display: inline-flex; flex-direction: column; align-items: center; gap: 4px; box-sizing: border-box; font-family: inherit; user-select: none; -webkit-user-select: none; }
.hb-xc7 *, .hb-xc7 *::before, .hb-xc7 *::after { box-sizing: border-box; }
.hb-xc7-stage { position: relative; width: calc(var(--hb-xc7-r) * 2 + var(--hb-xc7-it) + 10px); height: calc(var(--hb-xc7-r) * 2 + var(--hb-xc7-it) + 10px); touch-action: none; }
.hb-xc7-ring, .hb-xc7-wedge {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  -webkit-mask: radial-gradient(circle, transparent calc(var(--hb-xc7-r) - var(--hb-xc7-it) * 0.5 - 6px), #000 calc(var(--hb-xc7-r) - var(--hb-xc7-it) * 0.5 - 5px));
  mask: radial-gradient(circle, transparent calc(var(--hb-xc7-r) - var(--hb-xc7-it) * 0.5 - 6px), #000 calc(var(--hb-xc7-r) - var(--hb-xc7-it) * 0.5 - 5px));
  opacity: 0;
  transform: scale(0.55) rotate(-30deg);
  transition: opacity 0.22s ease, transform 0.5s cubic-bezier(0.34, 1.4, 0.5, 1);
  pointer-events: none;
}
.hb-xc7-ring { background: radial-gradient(circle, #191919 40%, #121212 72%); box-shadow: inset 0 0 0 1px #262626; }
.hb-xc7-ring::after { content: ""; position: absolute; inset: 0; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 2px 0 rgba(255, 255, 255, 0.04); }
.hb-xc7-wedge {
  --hb-xc7-c: #7fb3ff;
  background: conic-gradient(from calc(var(--hb-xc7-half) * -1), color-mix(in srgb, var(--hb-xc7-c) 30%, transparent) 0 var(--hb-xc7-step), transparent var(--hb-xc7-step));
  transform: scale(0.55) rotate(var(--hb-xc7-a, 0deg));
  transition: opacity 0.2s ease, transform 0.32s cubic-bezier(0.34, 1.3, 0.5, 1), background 0.2s ease;
}
.hb-xc7[data-open="true"] .hb-xc7-ring { opacity: 1; transform: scale(1) rotate(0deg); }
.hb-xc7[data-open="true"][data-hot="true"] .hb-xc7-wedge { opacity: 1; transform: scale(1) rotate(var(--hb-xc7-a, 0deg)); }
.hb-xc7-it {
  --hb-xc7-c: #7fb3ff;
  position: absolute;
  left: 50%;
  top: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--hb-xc7-it);
  height: var(--hb-xc7-it);
  margin: calc(var(--hb-xc7-it) * -0.5) 0 0 calc(var(--hb-xc7-it) * -0.5);
  padding: 0;
  border: 0;
  border-radius: 50%;
  font: inherit;
  font-size: 16px;
  color: #9a9a9a;
  background: transparent;
  cursor: pointer;
  opacity: 0;
  transform: rotate(var(--hb-xc7-deg)) translateY(0) rotate(calc(var(--hb-xc7-deg) * -1)) scale(0.3);
  transition: transform 0.46s cubic-bezier(0.34, 1.5, 0.5, 1), opacity 0.2s ease, color 0.2s ease;
  transition-delay: calc(var(--hb-xc7-n) * 22ms);
  pointer-events: none;
}
.hb-xc7-it svg { display: block; }
.hb-xc7[data-open="true"] .hb-xc7-it { opacity: 1; pointer-events: auto; transform: rotate(var(--hb-xc7-deg)) translateY(calc(var(--hb-xc7-r) * -1)) rotate(calc(var(--hb-xc7-deg) * -1)) scale(1); }
.hb-xc7-it[data-hot="true"] { color: var(--hb-xc7-c); transition-delay: 0s; }
.hb-xc7[data-open="true"] .hb-xc7-it[data-hot="true"] { transform: rotate(var(--hb-xc7-deg)) translateY(calc(var(--hb-xc7-r) * -1 - 3px)) rotate(calc(var(--hb-xc7-deg) * -1)) scale(1.18); }
.hb-xc7-it:focus-visible { outline: 2px solid #ededed; outline-offset: 1px; }
.hb-xc7-tg {
  --hb-xc7-c: #ededed;
  position: absolute;
  left: 50%;
  top: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin: -25px 0 0 -25px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  font: inherit;
  font-size: 19px;
  color: #0a0a0a;
  background: radial-gradient(circle at 50% 30%, #ffffff, #d9d9d9 70%);
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.18), inset 0 1px 0 #ffffff, 0 10px 24px -8px rgba(0, 0, 0, 0.8), 0 0 0 6px rgba(255, 255, 255, 0.04);
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  z-index: 2;
}
.hb-xc7-tg svg { display: block; }
.hb-xc7[data-open="true"] .hb-xc7-tg { transform: scale(0.84); color: var(--hb-xc7-c); background: radial-gradient(circle at 50% 30%, #262626, #161616 70%); box-shadow: inset 0 0 0 1px #333, inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 8px 20px -8px rgba(0, 0, 0, 0.9); }
.hb-xc7[data-done="true"] .hb-xc7-tg { color: #04140a; background: radial-gradient(circle at 50% 30%, #6af0a0, #2fcf72 70%); animation: hb-xc7-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xc7-tg:focus-visible { outline: 2px solid #7fb3ff; outline-offset: 4px; }
.hb-xc7-face { display: inline-flex; animation: hb-xc7-in 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xc7-cap { height: 18px; font-size: 12px; line-height: 18px; color: #8f8f8f; white-space: nowrap; }
.hb-xc7-cap b { font-weight: 600; color: #ededed; }
.hb-xc7-cap span { display: inline-block; animation: hb-xc7-in 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
@keyframes hb-xc7-pop { 0% { transform: scale(0.7); } 100% { transform: scale(1); } }
@keyframes hb-xc7-in { from { opacity: 0; transform: translateY(4px) scale(0.9); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xc7-ring, .hb-xc7-wedge, .hb-xc7-it, .hb-xc7-tg { transition: none; }
  .hb-xc7[data-done="true"] .hb-xc7-tg, .hb-xc7-face, .hb-xc7-cap span { animation: none; }
}
`;

const SHARE_ICON = (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 14.5V4M8 7.5 12 3.5l4 4" />
    <path d="M7.5 10.5H7a2.5 2.5 0 0 0-2.5 2.5v4.5A2.5 2.5 0 0 0 7 20h10a2.5 2.5 0 0 0 2.5-2.5V13a2.5 2.5 0 0 0-2.5-2.5h-.5" />
  </svg>
);

const CHECK_ICON = (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5.5 12.5 4.2 4.2 8.8-9.4" />
  </svg>
);

export function SocialShareDial({
  providers = ["x", "linkedin", "facebook", "email", "link", "slack"],
  url = "https://northwind.app/changelog/realtime-cursors",
  radius = 56,
  hint = "Hold and drag to share",
  onShare,
  className = "",
  style,
  ...rest
}: SocialShareDialProps) {
  const items = providers.map(resolveProvider);
  const n = Math.max(1, items.length);
  const step = 360 / n;
  const [open, setOpen] = React.useState(false);
  const [hot, setHot] = React.useState(-1);
  const [done, setDone] = React.useState<string | null>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const trigRef = React.useRef<HTMLButtonElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const press = React.useRef({ on: false, moved: false, t: 0, x: 0, y: 0 });
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  React.useEffect(() => {
    if (!open) return;
    function away(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHot(-1);
      }
    }
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  function pick(i: number) {
    const p = items[i];
    if (!p) return;
    if (p.id === "link" && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    onShare?.(p.id);
    setDone(p.label);
    setOpen(false);
    setHot(-1);
    trigRef.current?.focus();
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(null), 1800);
  }

  function aim(e: React.PointerEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > 6) press.current.moved = true;
    if (dist < 24) {
      setHot(-1);
      return;
    }
    const deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    setHot(Math.round((((deg % 360) + 360) % 360) / step) % n);
  }

  function close(refocus: boolean) {
    setOpen(false);
    setHot(-1);
    if (refocus) trigRef.current?.focus();
  }

  function onItemKey(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    else if (e.key === "Escape") {
      e.preventDefault();
      close(true);
      return;
    }
    if (next < 0) return;
    e.preventDefault();
    setHot(next);
    itemRefs.current[next]?.focus();
  }

  const hotItem = hot >= 0 ? items[hot] : undefined;
  const caption = done ? (
    <span key={`d-${done}`}>
      {done === "Copy link" ? "Link copied" : <>Shared to <b>{done}</b></>}
    </span>
  ) : open && hotItem ? (
    <span key={`h-${hotItem.id}`}>
      {hotItem.id === "link" ? "Release to copy link" : <>Share to <b>{hotItem.label}</b></>}
    </span>
  ) : (
    <span key={open ? "open" : "idle"}>{open ? "Pick a channel" : hint}</span>
  );

  return (
    <>
      <style href="hb-social-share-dial" precedence="default">{css}</style>
      <div
        ref={rootRef}
        className={`hb-xc7 ${className}`}
        style={
          {
            "--hb-xc7-r": `${radius}px`,
            "--hb-xc7-step": `${step.toFixed(3)}deg`,
            "--hb-xc7-half": `${(step / 2).toFixed(3)}deg`,
            ...style,
          } as React.CSSProperties
        }
        data-open={open ? "true" : undefined}
        data-hot={hot >= 0 ? "true" : undefined}
        data-done={done ? "true" : undefined}
        {...rest}
      >
        <div className="hb-xc7-stage">
          <span className="hb-xc7-ring" aria-hidden="true" />
          <span
            className="hb-xc7-wedge"
            aria-hidden="true"
            style={{ "--hb-xc7-a": `${(Math.max(0, hot) * step).toFixed(3)}deg`, "--hb-xc7-c": hotItem?.color ?? "#7fb3ff" } as React.CSSProperties}
          />
          <div role="menu" aria-label="Share to" aria-hidden={open ? undefined : true}>
            {items.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                role="menuitem"
                className="hb-xc7-it"
                style={{ "--hb-xc7-deg": `${(i * step).toFixed(3)}deg`, "--hb-xc7-n": i, "--hb-xc7-c": p.color } as React.CSSProperties}
                data-hot={hot === i ? "true" : undefined}
                tabIndex={open ? (hot === i || (hot < 0 && i === 0) ? 0 : -1) : -1}
                aria-label={p.id === "link" ? "Copy link" : `Share to ${p.label}`}
                onPointerEnter={() => setHot(i)}
                onFocus={() => setHot(i)}
                onKeyDown={(e) => onItemKey(e, i)}
                onClick={() => pick(i)}
              >
                {p.icon}
              </button>
            ))}
          </div>
          <button
            ref={trigRef}
            type="button"
            className="hb-xc7-tg"
            style={{ "--hb-xc7-c": hotItem?.color ?? "#ededed" } as React.CSSProperties}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Share"
            onPointerDown={(e) => {
              if (e.button !== 0) return;
              if (open) {
                press.current.on = false;
                close(false);
                return;
              }
              e.currentTarget.setPointerCapture(e.pointerId);
              press.current = { on: true, moved: false, t: e.timeStamp, x: e.clientX, y: e.clientY };
              setDone(null);
              setOpen(true);
            }}
            onPointerMove={(e) => {
              if (press.current.on) aim(e);
            }}
            onPointerUp={(e) => {
              if (!press.current.on) return;
              press.current.on = false;
              const quick = e.timeStamp - press.current.t < 280;
              if (press.current.moved && hot >= 0) pick(hot);
              else if (!quick || press.current.moved) close(false);
            }}
            onPointerCancel={() => {
              press.current.on = false;
              close(false);
            }}
            onClick={(e) => {
              if (e.detail !== 0) return;
              if (open) {
                close(false);
                return;
              }
              setDone(null);
              setOpen(true);
              setHot(0);
              window.requestAnimationFrame(() => itemRefs.current[0]?.focus());
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape" && open) {
                e.preventDefault();
                close(false);
              }
            }}
          >
            <span className="hb-xc7-face" key={done ? "done" : open && hotItem ? hotItem.id : "share"}>
              {done ? CHECK_ICON : open && hotItem ? hotItem.icon : SHARE_ICON}
            </span>
          </button>
        </div>
        <div className="hb-xc7-cap" aria-live="polite">
          {caption}
        </div>
      </div>
    </>
  );
}
