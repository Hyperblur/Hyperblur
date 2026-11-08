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

export interface SocialLoginGlassProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  providers?: SocialProvider[];
  labelPrefix?: string;
  backdrop?: boolean;
  onSelect?: (provider: string) => void | Promise<unknown>;
  pendingDuration?: number;
  disabled?: boolean;
}

const css = `
.hb-xc3 { position: relative; width: 100%; box-sizing: border-box; font-family: inherit; isolation: isolate; }
.hb-xc3 *, .hb-xc3 *::before, .hb-xc3 *::after { box-sizing: border-box; }
.hb-xc3[data-backdrop="true"] { padding: 14px; border-radius: 22px; overflow: hidden; background: #0b0b12; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06); }
.hb-xc3-amb { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
.hb-xc3-amb span { position: absolute; border-radius: 50%; filter: blur(26px); opacity: 0.75; animation: hb-xc3-drift 14s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate; }
.hb-xc3-amb span:nth-child(1) { width: 55%; height: 70%; left: -8%; top: -20%; background: #3b5bff; }
.hb-xc3-amb span:nth-child(2) { width: 45%; height: 60%; right: -6%; top: 10%; background: #c43bff; animation-delay: -5s; animation-duration: 17s; }
.hb-xc3-amb span:nth-child(3) { width: 50%; height: 55%; left: 25%; bottom: -30%; background: #ff7a3b; opacity: 0.55; animation-delay: -9s; }
.hb-xc3-list { display: flex; flex-direction: column; gap: 9px; }
.hb-xc3-b {
  --hb-xc3-c: #7fb3ff;
  --hb-xc3-x: 50%;
  --hb-xc3-y: 50%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  height: 44px;
  margin: 0;
  padding: 0 16px 0 7px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.005em;
  color: rgba(255, 255, 255, 0.92);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035));
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  backdrop-filter: blur(18px) saturate(170%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 -10px 18px -14px rgba(255, 255, 255, 0.18), 0 10px 26px -14px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  text-align: left;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, opacity 0.3s ease;
}
.hb-xc3-b:hover:not(:disabled), .hb-xc3-b:focus-visible { transform: translateY(-1px); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.26), inset 0 0 0 1px rgba(255, 255, 255, 0.16), inset 0 -10px 18px -14px rgba(255, 255, 255, 0.24), 0 14px 30px -14px color-mix(in srgb, var(--hb-xc3-c) 45%, rgba(0, 0, 0, 0.8)); }
.hb-xc3-b:active:not(:disabled) { transform: scale(0.985); transition-duration: 0.12s; }
.hb-xc3-b:focus-visible { outline: 2px solid rgba(255, 255, 255, 0.85); outline-offset: 3px; }
.hb-xc3-b:disabled { cursor: default; }
.hb-xc3[data-busy="true"] .hb-xc3-b:not([data-pending="true"]) { opacity: 0.4; }
.hb-xc3[data-off="true"] .hb-xc3-b { opacity: 0.45; cursor: not-allowed; }
.hb-xc3-orb {
  position: absolute;
  z-index: -1;
  left: var(--hb-xc3-x);
  top: 50%;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--hb-xc3-c) 0%, color-mix(in srgb, var(--hb-xc3-c) 40%, transparent) 38%, transparent 68%);
  filter: blur(14px);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.7);
  transition: opacity 0.45s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.hb-xc3-spec {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: radial-gradient(90px circle at var(--hb-xc3-x) var(--hb-xc3-y), rgba(255, 255, 255, 0.26), transparent 70%);
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}
.hb-xc3-b:hover:not(:disabled) .hb-xc3-orb, .hb-xc3-b:focus-visible .hb-xc3-orb { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
.hb-xc3-b:hover:not(:disabled) .hb-xc3-spec { opacity: 1; }
.hb-xc3-b[data-pending="true"] .hb-xc3-orb { opacity: 0.65; transform: translate(-50%, -50%) scale(1); animation: hb-xc3-scan 1.6s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate; }
.hb-xc3-chip {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 16px;
  color: #ffffff;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.06));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.12), 0 4px 10px -4px rgba(0, 0, 0, 0.5);
}
.hb-xc3-chip svg { display: block; }
.hb-xc3-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0 55%, #ffffff 100%);
  -webkit-mask: radial-gradient(circle, transparent 15.5px, #000 16px);
  mask: radial-gradient(circle, transparent 15.5px, #000 16px);
  animation: hb-xc3-spin 0.9s linear infinite;
}
.hb-xc3-l { position: relative; z-index: 1; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25); }
.hb-xc3-l b { font-weight: 600; color: #ffffff; }
.hb-xc3-k { position: relative; z-index: 1; flex: none; font-size: 11px; color: rgba(255, 255, 255, 0.55); transition: color 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xc3-b:hover:not(:disabled) .hb-xc3-k { color: #ffffff; transform: translateX(2px); }
@keyframes hb-xc3-drift { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(14%, 10%) scale(1.15); } }
@keyframes hb-xc3-scan { from { left: 12%; } to { left: 88%; } }
@keyframes hb-xc3-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xc3-amb span, .hb-xc3-b[data-pending="true"] .hb-xc3-orb { animation: none; }
  .hb-xc3-ring { animation-duration: 2.4s; }
  .hb-xc3-b, .hb-xc3-orb, .hb-xc3-spec, .hb-xc3-k { transition: none; }
  .hb-xc3-b:hover:not(:disabled), .hb-xc3-b:focus-visible, .hb-xc3-b:active:not(:disabled) { transform: none; }
}
`;

export function SocialLoginGlass({
  providers = ["apple", "google", "discord"],
  labelPrefix = "Continue with",
  backdrop = true,
  onSelect,
  pendingDuration = 1400,
  disabled = false,
  className = "",
  ...rest
}: SocialLoginGlassProps) {
  const [pending, run] = usePendingProvider(onSelect, pendingDuration);
  const items = providers.map(resolveProvider);

  function track(e: React.PointerEvent<HTMLButtonElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    el.style.setProperty("--hb-xc3-x", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--hb-xc3-y", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  }

  return (
    <>
      <style href="hb-social-login-glass" precedence="default">{css}</style>
      <div
        className={`hb-xc3 ${className}`}
        data-backdrop={backdrop ? "true" : undefined}
        data-busy={pending ? "true" : undefined}
        data-off={disabled ? "true" : undefined}
        aria-busy={pending ? true : undefined}
        {...rest}
      >
        {backdrop ? (
          <div className="hb-xc3-amb" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        ) : null}
        <div className="hb-xc3-list">
          {items.map((p) => {
            const isPending = pending === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className="hb-xc3-b"
                style={{ "--hb-xc3-c": p.color } as React.CSSProperties}
                data-pending={isPending ? "true" : undefined}
                disabled={disabled || (pending !== null && !isPending)}
                onPointerMove={track}
                onPointerEnter={track}
                onClick={() => {
                  if (!isPending) run(p.id);
                }}
              >
                <span className="hb-xc3-orb" aria-hidden="true" />
                <span className="hb-xc3-spec" aria-hidden="true" />
                <span className="hb-xc3-chip">
                  {p.icon}
                  {isPending ? <span className="hb-xc3-ring" aria-hidden="true" /> : null}
                </span>
                <span className="hb-xc3-l">
                  {isPending ? `Waiting for ${p.label}` : labelPrefix} {isPending ? null : <b>{p.label}</b>}
                </span>
                <span className="hb-xc3-k" aria-hidden="true">
                  {isPending ? "..." : (
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 11 11 5M6 5h5v5" />
                    </svg>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
