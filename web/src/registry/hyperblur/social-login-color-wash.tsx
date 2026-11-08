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

export interface SocialLoginColorWashProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  providers?: SocialProvider[];
  labelPrefix?: string;
  columns?: 1 | 2 | 3;
  onSelect?: (provider: string) => void | Promise<unknown>;
  pendingDuration?: number;
  disabled?: boolean;
}

const css = `
.hb-xc6 { display: grid; grid-template-columns: repeat(var(--hb-xc6-cols, 2), minmax(0, 1fr)); gap: 8px; width: 100%; box-sizing: border-box; font-family: inherit; }
.hb-xc6 *, .hb-xc6 *::before, .hb-xc6 *::after { box-sizing: border-box; }
.hb-xc6-b {
  --hb-xc6-bg: #2f7bff;
  --hb-xc6-fg: #ffffff;
  --hb-xc6-x: 50%;
  --hb-xc6-y: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  height: 42px;
  margin: 0;
  padding: 0 12px;
  border: 0;
  border-radius: 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: #d6d6d6;
  background: #141414;
  box-shadow: inset 0 0 0 1px #262626, inset 0 1px 0 rgba(255, 255, 255, 0.04);
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.32s cubic-bezier(0.65, 0, 0.35, 1), transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), opacity 0.25s ease, box-shadow 0.3s ease;
}
.hb-xc6-wash {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(120% 140% at var(--hb-xc6-x) var(--hb-xc6-y), color-mix(in srgb, var(--hb-xc6-bg) 82%, #ffffff) 0%, var(--hb-xc6-bg) 45%, color-mix(in srgb, var(--hb-xc6-bg) 85%, #000000) 100%);
  clip-path: circle(0% at var(--hb-xc6-x) var(--hb-xc6-y));
  transition: clip-path 0.55s cubic-bezier(0.65, 0, 0.35, 1);
}
.hb-xc6-b[data-wash="true"] .hb-xc6-wash, .hb-xc6-b[data-pending="true"] .hb-xc6-wash { clip-path: circle(150% at var(--hb-xc6-x) var(--hb-xc6-y)); }
.hb-xc6-b[data-wash="true"], .hb-xc6-b[data-pending="true"] { color: var(--hb-xc6-fg); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 10px 22px -12px var(--hb-xc6-bg); }
.hb-xc6-b:active:not(:disabled) { transform: scale(0.97); }
.hb-xc6-b:focus-visible { outline: 2px solid #ededed; outline-offset: 2px; }
.hb-xc6-b:disabled { cursor: default; }
.hb-xc6[data-busy="true"] .hb-xc6-b:not([data-pending="true"]) { opacity: 0.35; }
.hb-xc6[data-off="true"] .hb-xc6-b { opacity: 0.4; cursor: not-allowed; }
.hb-xc6-i { display: inline-flex; flex: none; font-size: 17px; transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xc6-i svg { display: block; }
.hb-xc6-b[data-wash="true"] .hb-xc6-i { transform: scale(1.12); }
.hb-xc6-l { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xc6-b[data-pending="true"]::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: repeating-linear-gradient(-45deg, transparent 0 8px, color-mix(in srgb, var(--hb-xc6-fg) 12%, transparent) 8px 16px);
  background-size: 22.6px 22.6px;
  animation: hb-xc6-stripe 0.7s linear infinite;
}
.hb-xc6-bar { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--hb-xc6-fg); opacity: 0.85; transform-origin: left; animation: hb-xc6-load var(--hb-xc6-d, 1400ms) cubic-bezier(0.3, 0.6, 0.2, 1) forwards; }
@keyframes hb-xc6-stripe { to { background-position: 22.6px 0; } }
@keyframes hb-xc6-load { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xc6-b, .hb-xc6-wash, .hb-xc6-i { transition: none; }
  .hb-xc6-b[data-pending="true"]::after, .hb-xc6-bar { animation: none; }
  .hb-xc6-b[data-wash="true"] .hb-xc6-i, .hb-xc6-b:active:not(:disabled) { transform: none; }
}
`;

function WashButton({
  p,
  label,
  isPending,
  disabled,
  duration,
  onPick,
}: {
  p: ResolvedProvider;
  label: string;
  isPending: boolean;
  disabled: boolean;
  duration: number;
  onPick: () => void;
}) {
  const [wash, setWash] = React.useState(false);

  function aim(e: React.PointerEvent<HTMLButtonElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    el.style.setProperty("--hb-xc6-x", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--hb-xc6-y", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  }

  return (
    <button
      type="button"
      className="hb-xc6-b"
      style={{ "--hb-xc6-bg": p.bg, "--hb-xc6-fg": p.fg, "--hb-xc6-d": `${duration}ms` } as React.CSSProperties}
      data-wash={wash && !disabled ? "true" : undefined}
      data-pending={isPending ? "true" : undefined}
      disabled={disabled}
      aria-label={`${label} ${p.label}`}
      onPointerEnter={(e) => {
        aim(e);
        setWash(true);
      }}
      onPointerLeave={(e) => {
        aim(e);
        setWash(false);
      }}
      onFocus={(e) => {
        e.currentTarget.style.setProperty("--hb-xc6-x", "0%");
        e.currentTarget.style.setProperty("--hb-xc6-y", "50%");
        setWash(true);
      }}
      onBlur={() => setWash(false)}
      onClick={() => {
        if (!isPending) onPick();
      }}
    >
      <span className="hb-xc6-wash" aria-hidden="true" />
      <span className="hb-xc6-i">{p.icon}</span>
      <span className="hb-xc6-l">{p.label}</span>
      {isPending ? <span className="hb-xc6-bar" aria-hidden="true" /> : null}
    </button>
  );
}

export function SocialLoginColorWash({
  providers = ["google", "github", "spotify", "twitch"],
  labelPrefix = "Continue with",
  columns = 2,
  onSelect,
  pendingDuration = 1400,
  disabled = false,
  className = "",
  style,
  ...rest
}: SocialLoginColorWashProps) {
  const [pending, run] = usePendingProvider(onSelect, pendingDuration);
  const items = providers.map(resolveProvider);

  return (
    <>
      <style href="hb-social-login-color-wash" precedence="default">{css}</style>
      <div
        className={`hb-xc6 ${className}`}
        style={{ "--hb-xc6-cols": columns, ...style } as React.CSSProperties}
        data-busy={pending ? "true" : undefined}
        data-off={disabled ? "true" : undefined}
        aria-busy={pending ? true : undefined}
        {...rest}
      >
        {items.map((p) => (
          <WashButton
            key={p.id}
            p={p}
            label={labelPrefix}
            isPending={pending === p.id}
            disabled={disabled || (pending !== null && pending !== p.id)}
            duration={pendingDuration}
            onPick={() => run(p.id)}
          />
        ))}
      </div>
    </>
  );
}
