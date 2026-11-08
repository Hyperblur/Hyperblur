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

export interface SocialLoginOutlineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  providers?: SocialProvider[];
  labelPrefix?: string;
  columns?: 1 | 2;
  onSelect?: (provider: string) => void | Promise<unknown>;
  pendingDuration?: number;
  disabled?: boolean;
}

const css = `
.hb-xc2 { display: grid; grid-template-columns: repeat(var(--hb-xc2-cols, 1), minmax(0, 1fr)); gap: 9px; width: 100%; box-sizing: border-box; font-family: inherit; }
.hb-xc2 *, .hb-xc2 *::before, .hb-xc2 *::after { box-sizing: border-box; }
.hb-xc2-b {
  --hb-xc2-c: #7fb3ff;
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  height: 44px;
  margin: 0;
  padding: 0 14px;
  border: 0;
  border-radius: 11px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 500;
  color: #d4d4d4;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0));
  box-shadow: inset 0 0 0 1px #2a2a2a, inset 0 1px 0 rgba(255, 255, 255, 0.04);
  cursor: pointer;
  text-align: left;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.25s ease, background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.25s ease, transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1);
}
.hb-xc2-b:hover:not(:disabled), .hb-xc2-b:focus-visible, .hb-xc2-b[data-pending="true"] {
  color: #f5f5f5;
  background-color: color-mix(in srgb, var(--hb-xc2-c) 5%, transparent);
  box-shadow: inset 0 0 0 1px #1d1d1d, 0 0 0 0 transparent, 0 10px 26px -14px color-mix(in srgb, var(--hb-xc2-c) 55%, transparent);
}
.hb-xc2-b:active:not(:disabled) { transform: scale(0.985); }
.hb-xc2-b:focus-visible { outline: none; }
.hb-xc2-b:disabled { cursor: default; }
.hb-xc2[data-busy="true"] .hb-xc2-b:not([data-pending="true"]) { opacity: 0.35; }
.hb-xc2[data-off="true"] .hb-xc2-b { opacity: 0.4; cursor: not-allowed; }
.hb-xc2-tr { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.hb-xc2-tr rect {
  fill: none;
  stroke: var(--hb-xc2-c);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-dasharray: 0 100;
  stroke-dashoffset: 0;
  opacity: 0;
  transition: stroke-dasharray 0.7s cubic-bezier(0.65, 0, 0.25, 1), opacity 0.2s ease;
}
.hb-xc2-tr rect + rect { stroke-dashoffset: 50; }
.hb-xc2-b:hover:not(:disabled) .hb-xc2-tr rect, .hb-xc2-b:focus-visible .hb-xc2-tr rect { stroke-dasharray: 50 50; opacity: 1; }
.hb-xc2-b[data-pending="true"] .hb-xc2-tr rect { opacity: 1; stroke-dasharray: 18 32; animation: hb-xc2-run 1.1s linear infinite; transition: none; }
.hb-xc2-i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 18px;
  height: 18px;
  font-size: 18px;
  color: #8f8f8f;
  transition: color 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xc2-b:hover:not(:disabled) .hb-xc2-i, .hb-xc2-b:focus-visible .hb-xc2-i, .hb-xc2-b[data-pending="true"] .hb-xc2-i { color: var(--hb-xc2-c); transform: scale(1.08) rotate(-4deg); }
.hb-xc2-i svg { display: block; }
.hb-xc2-l { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xc2-l b { font-weight: 600; color: #ededed; }
.hb-xc2-a {
  flex: none;
  width: 16px;
  height: 16px;
  color: var(--hb-xc2-c);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xc2-b:hover:not(:disabled) .hb-xc2-a, .hb-xc2-b:focus-visible .hb-xc2-a { opacity: 1; transform: translateX(0); }
.hb-xc2-st { flex: none; font-size: 11px; font-weight: 500; color: var(--hb-xc2-c); font-variant-numeric: tabular-nums; }
@keyframes hb-xc2-run { to { stroke-dashoffset: -100; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xc2-b, .hb-xc2-i, .hb-xc2-a, .hb-xc2-tr rect { transition: none; }
  .hb-xc2-b[data-pending="true"] .hb-xc2-tr rect { animation: none; stroke-dasharray: 100 0; }
  .hb-xc2-b:hover:not(:disabled) .hb-xc2-i { transform: none; }
}
`;

function Trace() {
  const ref = React.useRef<SVGSVGElement>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const box = entry.contentRect;
      setSize((prev) => (prev.w === box.width && prev.h === box.height ? prev : { w: box.width, h: box.height }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const w = Math.max(0, size.w - 1.5);
  const h = Math.max(0, size.h - 1.5);
  return (
    <svg ref={ref} className="hb-xc2-tr" aria-hidden="true">
      {w > 0 ? (
        <>
          <rect x="0.75" y="0.75" width={w.toFixed(2)} height={h.toFixed(2)} rx="10.5" pathLength={100} />
          <rect x="0.75" y="0.75" width={w.toFixed(2)} height={h.toFixed(2)} rx="10.5" pathLength={100} />
        </>
      ) : null}
    </svg>
  );
}

export function SocialLoginOutline({
  providers = ["google", "github", "microsoft"],
  labelPrefix = "Continue with",
  columns = 1,
  onSelect,
  pendingDuration = 1400,
  disabled = false,
  className = "",
  style,
  ...rest
}: SocialLoginOutlineProps) {
  const [pending, run] = usePendingProvider(onSelect, pendingDuration);
  const items = providers.map(resolveProvider);

  return (
    <>
      <style href="hb-social-login-outline" precedence="default">{css}</style>
      <div
        className={`hb-xc2 ${className}`}
        style={{ "--hb-xc2-cols": columns, ...style } as React.CSSProperties}
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
              className="hb-xc2-b"
              style={{ "--hb-xc2-c": p.color } as React.CSSProperties}
              data-pending={isPending ? "true" : undefined}
              disabled={disabled || (pending !== null && !isPending)}
              aria-label={`${labelPrefix} ${p.label}`}
              onClick={() => {
                if (!isPending) run(p.id);
              }}
            >
              <Trace />
              <span className="hb-xc2-i">{p.icon}</span>
              <span className="hb-xc2-l">
                {columns === 2 ? <b>{p.label}</b> : (
                  <>
                    {labelPrefix} <b>{p.label}</b>
                  </>
                )}
              </span>
              {isPending ? (
                <span className="hb-xc2-st">Opening</span>
              ) : (
                <svg className="hb-xc2-a" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h9.5M8.5 4l4 4-4 4" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
