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

function usePendingProvider(onSelect: ((id: string) => void | Promise<unknown>) | undefined, duration: number) {
  const [pending, setPending] = React.useState<string | null>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const alive = React.useRef(true);

  React.useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      window.clearTimeout(timer.current);
    };
  }, []);

  const run = (id: string) => {
    if (pending) return;
    setPending(id);
    const out = onSelect?.(id);
    if (out && typeof (out as Promise<unknown>).then === "function") {
      (out as Promise<unknown>).then(
        () => {
          if (alive.current) setPending(null);
        },
        () => {
          if (alive.current) setPending(null);
        },
      );
      return;
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (alive.current) setPending(null);
    }, duration);
  };

  return [pending, run] as const;
}

export interface SocialLoginIconRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  providers?: SocialProvider[];
  labelPrefix?: string;
  hint?: string;
  tileSize?: number;
  onSelect?: (provider: string) => void | Promise<unknown>;
  pendingDuration?: number;
  disabled?: boolean;
}

const css = `
.hb-xc4 { --hb-xc4-s: 46px; --hb-xc4-g: 8px; display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; font-family: inherit; }
.hb-xc4 *, .hb-xc4 *::before, .hb-xc4 *::after { box-sizing: border-box; }
.hb-xc4-row { position: relative; display: flex; gap: var(--hb-xc4-g); padding: 5px; border-radius: 16px; background: #0e0e0e; box-shadow: inset 0 0 0 1px #222, inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 12px 30px -18px rgba(0, 0, 0, 0.9); }
.hb-xc4-ind {
  --hb-xc4-c: #7fb3ff;
  position: absolute;
  top: 5px;
  left: 5px;
  width: var(--hb-xc4-s);
  height: var(--hb-xc4-s);
  border-radius: 11px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xc4-c) 22%, #1a1a1a), color-mix(in srgb, var(--hb-xc4-c) 10%, #141414));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xc4-c) 45%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 20px -8px color-mix(in srgb, var(--hb-xc4-c) 60%, transparent);
  transform: translateX(calc(var(--hb-xc4-i, 0) * (var(--hb-xc4-s) + var(--hb-xc4-g))));
  opacity: 0;
  transition: transform 0.42s cubic-bezier(0.34, 1.32, 0.5, 1), opacity 0.25s ease, background 0.3s ease, box-shadow 0.3s ease;
  pointer-events: none;
}
.hb-xc4[data-on="true"] .hb-xc4-ind { opacity: 1; }
.hb-xc4-t {
  --hb-xc4-c: #7fb3ff;
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--hb-xc4-s);
  height: var(--hb-xc4-s);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 11px;
  font: inherit;
  font-size: 20px;
  color: #8a8a8a;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
}
.hb-xc4-t svg { display: block; }
.hb-xc4-t[data-active="true"], .hb-xc4-t[data-pending="true"] { color: var(--hb-xc4-c); }
.hb-xc4-t:active:not(:disabled) { transform: scale(0.9); }
.hb-xc4-t:focus-visible { outline: 2px solid #ededed; outline-offset: 2px; }
.hb-xc4-t:disabled { cursor: default; }
.hb-xc4[data-busy="true"] .hb-xc4-t:not([data-pending="true"]) { opacity: 0.3; }
.hb-xc4[data-off="true"] .hb-xc4-t { opacity: 0.35; cursor: not-allowed; }
.hb-xc4-ring {
  position: absolute;
  inset: -2px;
  border-radius: 13px;
  background: conic-gradient(from 0deg, transparent 0 50%, var(--hb-xc4-c) 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  padding: 2px;
  animation: hb-xc4-spin 0.9s linear infinite;
}
.hb-xc4-cap { position: relative; height: 18px; width: 100%; overflow: hidden; text-align: center; font-size: 12.5px; color: #8f8f8f; }
.hb-xc4-cap span { position: absolute; inset: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; animation: hb-xc4-roll 0.38s cubic-bezier(0.22, 1, 0.36, 1) both; }
.hb-xc4-cap b { font-weight: 600; color: #ededed; }
@keyframes hb-xc4-spin { to { transform: rotate(360deg); } }
@keyframes hb-xc4-roll { from { transform: translateY(70%); opacity: 0; filter: blur(2px); } to { transform: translateY(0); opacity: 1; filter: blur(0); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xc4-ind, .hb-xc4-t { transition: none; }
  .hb-xc4-t:active:not(:disabled) { transform: none; }
  .hb-xc4-cap span { animation: none; }
  .hb-xc4-ring { animation-duration: 2.4s; }
}
`;

export function SocialLoginIconRow({
  providers = ["google", "github", "apple", "x", "discord"],
  labelPrefix = "Continue with",
  hint = "Pick a provider to continue",
  tileSize = 46,
  onSelect,
  pendingDuration = 1400,
  disabled = false,
  className = "",
  style,
  ...rest
}: SocialLoginIconRowProps) {
  const [pending, run] = usePendingProvider(onSelect, pendingDuration);
  const items = providers.map(resolveProvider);
  const [active, setActive] = React.useState(-1);
  const [last, setLast] = React.useState(0);
  const [focusIdx, setFocusIdx] = React.useState(0);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const pendingIdx = pending ? items.findIndex((p) => p.id === pending) : -1;
  const shown = pendingIdx >= 0 ? pendingIdx : active;
  const pos = shown >= 0 ? shown : last;
  const cur = shown >= 0 ? items[shown] : undefined;

  function point(i: number) {
    setActive(i);
    if (i >= 0) setLast(i);
  }

  function onKey(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % items.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setFocusIdx(next);
    refs.current[next]?.focus();
  }

  const caption = pending && cur ? (
    <span key={`p-${cur.id}`}>
      Redirecting to <b>{cur.label}</b>
    </span>
  ) : cur ? (
    <span key={cur.id}>
      {labelPrefix} <b>{cur.label}</b>
    </span>
  ) : (
    <span key="hint">{hint}</span>
  );

  return (
    <>
      <style href="hb-social-login-icon-row" precedence="default">{css}</style>
      <div
        className={`hb-xc4 ${className}`}
        style={{ "--hb-xc4-s": `${tileSize}px`, ...style } as React.CSSProperties}
        data-on={shown >= 0 ? "true" : undefined}
        data-busy={pending ? "true" : undefined}
        data-off={disabled ? "true" : undefined}
        aria-busy={pending ? true : undefined}
        {...rest}
      >
        <div className="hb-xc4-row" role="toolbar" aria-label={hint} onPointerLeave={() => point(-1)}>
          <span
            className="hb-xc4-ind"
            aria-hidden="true"
            style={{ "--hb-xc4-i": pos, "--hb-xc4-c": items[pos]?.color ?? "#7fb3ff" } as React.CSSProperties}
          />
          {items.map((p, i) => {
            const isPending = pending === p.id;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                className="hb-xc4-t"
                style={{ "--hb-xc4-c": p.color } as React.CSSProperties}
                tabIndex={i === focusIdx ? 0 : -1}
                data-active={shown === i ? "true" : undefined}
                data-pending={isPending ? "true" : undefined}
                disabled={disabled || (pending !== null && !isPending)}
                aria-label={`${labelPrefix} ${p.label}`}
                onPointerEnter={() => point(i)}
                onFocus={() => {
                  setFocusIdx(i);
                  point(i);
                }}
                onBlur={() => point(-1)}
                onKeyDown={(e) => onKey(e, i)}
                onClick={() => {
                  if (!isPending) run(p.id);
                }}
              >
                {p.icon}
                {isPending ? <span className="hb-xc4-ring" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
        <div className="hb-xc4-cap" aria-live={pending ? "polite" : "off"}>
          {caption}
        </div>
      </div>
    </>
  );
}
