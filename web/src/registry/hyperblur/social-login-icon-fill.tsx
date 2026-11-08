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

export interface SocialLoginIconFillProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  providers?: SocialProvider[];
  labelPrefix?: string;
  onSelect?: (provider: string) => void | Promise<unknown>;
  pendingDuration?: number;
  disabled?: boolean;
}

const css = `
.hb-xc5 { display: flex; flex-direction: column; gap: 8px; width: 100%; box-sizing: border-box; font-family: inherit; }
.hb-xc5 *, .hb-xc5 *::before, .hb-xc5 *::after { box-sizing: border-box; }
.hb-xc5-b {
  --hb-xc5-bg: #2f7bff;
  --hb-xc5-fg: #ffffff;
  --hb-xc5-c: #7fb3ff;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 48px;
  margin: 0;
  padding: 0 14px 0 6px;
  border: 0;
  border-radius: 14px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 500;
  color: #cfcfcf;
  background: #121212;
  box-shadow: inset 0 0 0 1px #242424, inset 0 1px 0 rgba(255, 255, 255, 0.04);
  cursor: pointer;
  text-align: left;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 0.35s ease, color 0.3s ease, opacity 0.25s ease, transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1);
}
.hb-xc5-b:hover:not(:disabled), .hb-xc5-b:focus-visible, .hb-xc5-b[data-pending="true"] {
  color: #f5f5f5;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xc5-c) 35%, #242424), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.hb-xc5-b:active:not(:disabled) { transform: scale(0.985); }
.hb-xc5-b:focus-visible { outline: 2px solid var(--hb-xc5-c); outline-offset: 2px; }
.hb-xc5-b:disabled { cursor: default; }
.hb-xc5[data-busy="true"] .hb-xc5-b:not([data-pending="true"]) { opacity: 0.35; }
.hb-xc5[data-off="true"] .hb-xc5-b { opacity: 0.4; cursor: not-allowed; }
.hb-xc5-w {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 18px;
  color: #9a9a9a;
  background: #1a1a1a;
  box-shadow: inset 0 0 0 1px #2a2a2a;
  isolation: isolate;
  transition: color 0.2s ease 0s;
}
.hb-xc5-w svg { position: relative; z-index: 2; display: block; }
.hb-xc5-liq {
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  transform: translateY(105%);
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.25, 1);
}
.hb-xc5-liq::before { content: ""; position: absolute; inset: 7px 0 0 0; background: var(--hb-xc5-bg); }
.hb-xc5-wave { position: absolute; top: 0; left: 0; width: 200%; height: 8px; color: var(--hb-xc5-bg); animation: hb-xc5-flow 1.6s linear infinite; }
.hb-xc5-wave svg { display: block; width: 100%; height: 100%; }
.hb-xc5-b:hover:not(:disabled) .hb-xc5-liq, .hb-xc5-b:focus-visible .hb-xc5-liq { transform: translateY(-12%); }
.hb-xc5-b:hover:not(:disabled) .hb-xc5-w, .hb-xc5-b:focus-visible .hb-xc5-w, .hb-xc5-b[data-pending="true"] .hb-xc5-w { color: var(--hb-xc5-fg); transition-delay: 0.18s; }
.hb-xc5-b[data-pending="true"] .hb-xc5-liq { animation: hb-xc5-slosh 1.2s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate; transition: none; }
.hb-xc5-b[data-pending="true"] .hb-xc5-wave { animation-duration: 0.7s; }
.hb-xc5-l { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xc5-l b { font-weight: 600; color: #ededed; }
.hb-xc5-b:hover:not(:disabled) .hb-xc5-l { transform: translateX(3px); }
.hb-xc5-chev { flex: none; width: 14px; height: 14px; color: #5a5a5a; transition: color 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xc5-b:hover:not(:disabled) .hb-xc5-chev, .hb-xc5-b:focus-visible .hb-xc5-chev { color: var(--hb-xc5-c); transform: translateX(2px); }
@keyframes hb-xc5-flow { to { transform: translateX(-50%); } }
@keyframes hb-xc5-slosh { from { transform: translateY(70%); } to { transform: translateY(-8%); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xc5-wave, .hb-xc5-b[data-pending="true"] .hb-xc5-liq { animation: none; }
  .hb-xc5-b[data-pending="true"] .hb-xc5-liq { transform: translateY(-12%); }
  .hb-xc5-b, .hb-xc5-liq, .hb-xc5-l, .hb-xc5-chev, .hb-xc5-w { transition: none; }
  .hb-xc5-b:hover:not(:disabled) .hb-xc5-l { transform: none; }
}
`;

const WAVE = "M0 4 C 10 0, 15 0, 25 4 S 40 8, 50 4 S 65 0, 75 4 S 90 8, 100 4 V 8 H 0 Z";

export function SocialLoginIconFill({
  providers = ["slack", "figma", "linkedin"],
  labelPrefix = "Continue with",
  onSelect,
  pendingDuration = 1400,
  disabled = false,
  className = "",
  ...rest
}: SocialLoginIconFillProps) {
  const [pending, run] = usePendingProvider(onSelect, pendingDuration);
  const items = providers.map(resolveProvider);

  return (
    <>
      <style href="hb-social-login-icon-fill" precedence="default">{css}</style>
      <div
        className={`hb-xc5 ${className}`}
        data-busy={pending ? "true" : undefined}
        data-off={disabled ? "true" : undefined}
        aria-busy={pending ? true : undefined}
        {...rest}
      >
        {items.map((p) => {
          const isPending = pending === p.id;
          return (
            <button
              key={p.id}
              type="button"
              className="hb-xc5-b"
              style={{ "--hb-xc5-bg": p.bg, "--hb-xc5-fg": p.fg, "--hb-xc5-c": p.color } as React.CSSProperties}
              data-pending={isPending ? "true" : undefined}
              disabled={disabled || (pending !== null && !isPending)}
              onClick={() => {
                if (!isPending) run(p.id);
              }}
            >
              <span className="hb-xc5-w">
                <span className="hb-xc5-liq" aria-hidden="true">
                  <span className="hb-xc5-wave">
                    <svg viewBox="0 0 100 8" preserveAspectRatio="none">
                      <path d={WAVE} fill="currentColor" />
                    </svg>
                  </span>
                </span>
                {p.icon}
              </span>
              <span className="hb-xc5-l">
                {isPending ? (
                  <>
                    Linking your <b>{p.label}</b> account
                  </>
                ) : (
                  <>
                    {labelPrefix} <b>{p.label}</b>
                  </>
                )}
              </span>
              {isPending ? null : (
                <svg className="hb-xc5-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m6 3.5 4.5 4.5L6 12.5" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
