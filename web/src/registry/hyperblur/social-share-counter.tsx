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

export interface SocialShareCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  providers?: SocialProvider[];
  counts?: Record<string, number>;
  label?: string;
  url?: string;
  locale?: string;
  onShare?: (provider: string, total: number) => void;
}

const css = `
.hb-xc8 { display: flex; flex-direction: column; gap: 12px; width: 100%; box-sizing: border-box; font-family: inherit; color: #ededed; }
.hb-xc8 *, .hb-xc8 *::before, .hb-xc8 *::after { box-sizing: border-box; }
.hb-xc8-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; }
.hb-xc8-total { display: flex; align-items: baseline; gap: 7px; min-width: 0; }
.hb-xc8-num { position: relative; font-size: 26px; font-weight: 650; letter-spacing: -0.03em; line-height: 1; font-variant-numeric: tabular-nums; }
.hb-xc8-lbl { font-size: 12px; color: #8f8f8f; }
.hb-xc8-delta { font-size: 11px; font-weight: 600; color: #3ddc84; font-variant-numeric: tabular-nums; animation: hb-xc8-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
.hb-xc8-roll { display: inline-flex; overflow: hidden; height: 1em; line-height: 1; }
.hb-xc8-col { display: inline-flex; flex-direction: column; transition: transform 0.7s cubic-bezier(0.2, 0.9, 0.2, 1); transition-delay: var(--hb-xc8-dl, 0ms); }
.hb-xc8-col span, .hb-xc8-sep { display: block; height: 1em; line-height: 1; text-align: center; }
.hb-xc8-bar { display: flex; gap: 2px; height: 6px; border-radius: 999px; overflow: hidden; background: #1a1a1a; }
.hb-xc8-seg { height: 100%; min-width: 3px; background: var(--hb-xc8-c); border-radius: 2px; transition: flex-grow 0.7s cubic-bezier(0.2, 0.9, 0.2, 1), filter 0.3s ease; }
.hb-xc8-seg[data-hot="true"] { filter: brightness(1.35); }
.hb-xc8-chips { display: grid; grid-template-columns: repeat(auto-fit, minmax(64px, 1fr)); gap: 6px; }
.hb-xc8-chip {
  --hb-xc8-c: #7fb3ff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 36px;
  margin: 0;
  padding: 0 10px;
  border: 0;
  border-radius: 10px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: #cfcfcf;
  background: #141414;
  box-shadow: inset 0 0 0 1px #262626, inset 0 1px 0 rgba(255, 255, 255, 0.04);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xc8-chip:hover, .hb-xc8-chip:focus-visible { color: #ffffff; background: color-mix(in srgb, var(--hb-xc8-c) 9%, #141414); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xc8-c) 40%, #262626); }
.hb-xc8-chip:active { transform: scale(0.94); }
.hb-xc8-chip:focus-visible { outline: 2px solid var(--hb-xc8-c); outline-offset: 2px; }
.hb-xc8-chip[data-hit="true"] { color: #ffffff; background: color-mix(in srgb, var(--hb-xc8-c) 18%, #141414); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xc8-c) 65%, transparent), 0 8px 18px -10px var(--hb-xc8-c); animation: hb-xc8-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xc8-ic { display: inline-flex; font-size: 15px; color: var(--hb-xc8-c); }
.hb-xc8-ic svg { display: block; }
.hb-xc8-plus { position: absolute; top: -4px; left: 50%; font-size: 11px; font-weight: 700; color: var(--hb-xc8-c); pointer-events: none; animation: hb-xc8-fly 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
@keyframes hb-xc8-pop { 0% { transform: scale(0.92); } 60% { transform: scale(1.05); } 100% { transform: scale(1); } }
@keyframes hb-xc8-fly { 0% { opacity: 0; transform: translate(-50%, 6px) scale(0.8); } 25% { opacity: 1; } 100% { opacity: 0; transform: translate(-50%, -18px) scale(1.1); } }
@keyframes hb-xc8-up { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xc8-col, .hb-xc8-seg, .hb-xc8-chip { transition: none; }
  .hb-xc8-chip[data-hit="true"], .hb-xc8-delta { animation: none; }
  .hb-xc8-plus { display: none; }
}
`;

function Roll({ value, locale }: { value: number; locale: string }) {
  const text = new Intl.NumberFormat(locale).format(value);
  const chars = text.split("");
  return (
    <span className="hb-xc8-roll" aria-hidden="true">
      {chars.map((ch, i) => {
        const fromRight = chars.length - 1 - i;
        const d = Number(ch);
        if (Number.isNaN(d) || ch === " ") {
          return (
            <span key={`s${fromRight}`} className="hb-xc8-sep">
              {ch}
            </span>
          );
        }
        return (
          <span
            key={`d${fromRight}`}
            className="hb-xc8-col"
            style={{ transform: `translateY(${-d}em)`, "--hb-xc8-dl": `${fromRight * 40}ms` } as React.CSSProperties}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => (
              <span key={k}>{k}</span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

const DEFAULT_COUNTS: Record<string, number> = { x: 4812, linkedin: 2307, facebook: 961, link: 1204 };

export function SocialShareCounter({
  providers = ["x", "linkedin", "facebook", "link"],
  counts = DEFAULT_COUNTS,
  label = "shares",
  url = "https://northwind.app/blog/shipping-faster",
  locale = "en-US",
  onShare,
  className = "",
  ...rest
}: SocialShareCounterProps) {
  const items = providers.map(resolveProvider);
  const [tally, setTally] = React.useState<Record<string, number>>(() => {
    const base: Record<string, number> = {};
    for (const p of items) base[p.id] = counts[p.id] ?? 0;
    return base;
  });
  const [hit, setHit] = React.useState<{ id: string; n: number } | null>(null);
  const [added, setAdded] = React.useState(0);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const total = items.reduce((sum, p) => sum + (tally[p.id] ?? 0), 0);
  const fmt = new Intl.NumberFormat(locale);

  function share(id: string) {
    if (id === "link" && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setTally((t) => ({ ...t, [id]: (t[id] ?? 0) + 1 }));
    setHit((h) => ({ id, n: (h?.n ?? 0) + 1 }));
    setAdded((a) => a + 1);
    onShare?.(id, total + 1);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setHit(null), 1200);
  }

  return (
    <>
      <style href="hb-social-share-counter" precedence="default">{css}</style>
      <div className={`hb-xc8 ${className}`} {...rest}>
        <div className="hb-xc8-top">
          <div className="hb-xc8-total">
            <span className="hb-xc8-num">
              <Roll value={total} locale={locale} />
              <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>
                {fmt.format(total)}
              </span>
            </span>
            <span className="hb-xc8-lbl">{label}</span>
          </div>
          {added > 0 ? (
            <span className="hb-xc8-delta" key={added}>
              +{added} today
            </span>
          ) : null}
        </div>
        <div className="hb-xc8-bar" aria-hidden="true">
          {items.map((p) => (
            <span
              key={p.id}
              className="hb-xc8-seg"
              data-hot={hit?.id === p.id ? "true" : undefined}
              style={{ flexGrow: Math.max(1, tally[p.id] ?? 0), "--hb-xc8-c": p.color } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="hb-xc8-chips">
          {items.map((p) => {
            const isHit = hit?.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className="hb-xc8-chip"
                style={{ "--hb-xc8-c": p.color } as React.CSSProperties}
                data-hit={isHit ? "true" : undefined}
                aria-label={`${p.id === "link" ? "Copy link" : `Share to ${p.label}`}, ${fmt.format(tally[p.id] ?? 0)} ${label}`}
                onClick={() => share(p.id)}
              >
                <span className="hb-xc8-ic">{p.icon}</span>
                <Roll value={tally[p.id] ?? 0} locale={locale} />
                {isHit ? (
                  <span className="hb-xc8-plus" key={hit.n} aria-hidden="true">
                    +1
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
