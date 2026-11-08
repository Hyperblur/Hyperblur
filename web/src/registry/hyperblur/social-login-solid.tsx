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

export interface SocialLoginSolidProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  providers?: SocialProvider[];
  labelPrefix?: string;
  lastUsed?: string;
  lastUsedLabel?: string;
  onSelect?: (provider: string) => void | Promise<unknown>;
  pendingDuration?: number;
  disabled?: boolean;
}

const css = `
.hb-xc1 { display: flex; flex-direction: column; gap: 11px; width: 100%; box-sizing: border-box; font-family: inherit; }
.hb-xc1 *, .hb-xc1 *::before, .hb-xc1 *::after { box-sizing: border-box; }
.hb-xc1-b {
  --hb-xc1-bg: #24292f;
  --hb-xc1-fg: #ffffff;
  position: relative;
  display: grid;
  grid-template-columns: 22px 1fr 22px;
  align-items: center;
  width: 100%;
  height: 44px;
  margin: 0;
  padding: 0 14px;
  border: 0;
  border-radius: 12px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: var(--hb-xc1-fg);
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xc1-bg) 84%, #ffffff) 0%, var(--hb-xc1-bg) 52%, color-mix(in srgb, var(--hb-xc1-bg) 92%, #000000) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.24),
    inset 0 0 0 1px rgba(255, 255, 255, 0.07),
    0 3px 0 color-mix(in srgb, var(--hb-xc1-bg) 55%, #000000),
    0 10px 20px -10px rgba(0, 0, 0, 0.9);
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transform: translateY(0);
  transition: transform 0.18s cubic-bezier(0.3, 0.7, 0.4, 1), box-shadow 0.18s cubic-bezier(0.3, 0.7, 0.4, 1), filter 0.2s ease, opacity 0.25s ease;
}
.hb-xc1-b:hover:not(:disabled) {
  filter: brightness(1.07);
  transform: translateY(-1px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    inset 0 0 0 1px rgba(255, 255, 255, 0.09),
    0 4px 0 color-mix(in srgb, var(--hb-xc1-bg) 55%, #000000),
    0 14px 24px -12px rgba(0, 0, 0, 0.95);
}
.hb-xc1-b:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    inset 0 0 0 1px rgba(255, 255, 255, 0.07),
    0 1px 0 color-mix(in srgb, var(--hb-xc1-bg) 55%, #000000),
    0 4px 10px -6px rgba(0, 0, 0, 0.9);
}
.hb-xc1-b:focus-visible { outline: 2px solid #7fb3ff; outline-offset: 3px; }
.hb-xc1-b:disabled { cursor: default; }
.hb-xc1[data-busy="true"] .hb-xc1-b:not([data-pending="true"]) { opacity: 0.38; filter: saturate(0.6); }
.hb-xc1[data-off="true"] .hb-xc1-b { opacity: 0.4; cursor: not-allowed; }
.hb-xc1-i { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; font-size: 19px; }
.hb-xc1-i svg { display: block; }
.hb-xc1-l { text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xc1-sp {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--hb-xc1-fg) 28%, transparent);
  border-top-color: var(--hb-xc1-fg);
  animation: hb-xc1-spin 0.75s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite;
}
.hb-xc1-b[data-pending="true"]::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(100deg, transparent 30%, color-mix(in srgb, var(--hb-xc1-fg) 16%, transparent) 50%, transparent 70%);
  background-size: 220% 100%;
  animation: hb-xc1-sheen 1.25s cubic-bezier(0.45, 0, 0.25, 1) infinite;
}
.hb-xc1-tag {
  position: absolute;
  top: 50%;
  right: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 20px;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--hb-xc1-fg);
  background: color-mix(in srgb, var(--hb-xc1-fg) 12%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xc1-fg) 16%, transparent);
  transform: translateY(-50%);
  pointer-events: none;
}
.hb-xc1-dot { position: relative; width: 6px; height: 6px; border-radius: 50%; background: #3ddc84; }
.hb-xc1-dot::after { content: ""; position: absolute; inset: -3px; border-radius: 50%; border: 1px solid #3ddc84; animation: hb-xc1-ping 1.8s cubic-bezier(0.2, 0.6, 0.3, 1) infinite; }
@container (max-width: 300px) { .hb-xc1-tag span:last-child { display: none; } }
@keyframes hb-xc1-spin { to { transform: rotate(360deg); } }
@keyframes hb-xc1-sheen { from { background-position: 120% 0; } to { background-position: -120% 0; } }
@keyframes hb-xc1-ping { 0% { transform: scale(0.6); opacity: 0.9; } 100% { transform: scale(1.8); opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xc1-b { transition: none; }
  .hb-xc1-b:hover:not(:disabled), .hb-xc1-b:active:not(:disabled) { transform: none; }
  .hb-xc1-sp { animation-duration: 2.4s; }
  .hb-xc1-b[data-pending="true"]::after, .hb-xc1-dot::after { animation: none; }
}
`;

export function SocialLoginSolid({
  providers = ["google", "github", "apple"],
  labelPrefix = "Continue with",
  lastUsed,
  lastUsedLabel = "Last used",
  onSelect,
  pendingDuration = 1400,
  disabled = false,
  className = "",
  style,
  ...rest
}: SocialLoginSolidProps) {
  const [pending, run] = usePendingProvider(onSelect, pendingDuration);
  const items = providers.map(resolveProvider);

  return (
    <>
      <style href="hb-social-login-solid" precedence="default">{css}</style>
      <div
        className={`hb-xc1 ${className}`}
        style={{ containerType: "inline-size", ...style }}
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
              className="hb-xc1-b"
              style={{ "--hb-xc1-bg": p.bg, "--hb-xc1-fg": p.fg } as React.CSSProperties}
              data-pending={isPending ? "true" : undefined}
              disabled={disabled || (pending !== null && !isPending)}
              aria-disabled={isPending || undefined}
              onClick={() => {
                if (!isPending) run(p.id);
              }}
            >
              <span className="hb-xc1-i">{isPending ? <span className="hb-xc1-sp" aria-hidden="true" /> : p.icon}</span>
              <span className="hb-xc1-l">
                {isPending ? `Connecting to ${p.label}` : `${labelPrefix} ${p.label}`}
              </span>
              <span aria-hidden="true" />
              {lastUsed === p.id && !isPending ? (
                <span className="hb-xc1-tag">
                  <span className="hb-xc1-dot" aria-hidden="true" />
                  <span>{lastUsedLabel}</span>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </>
  );
}
