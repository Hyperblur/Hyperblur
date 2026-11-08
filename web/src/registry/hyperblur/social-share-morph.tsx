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

export interface SocialShareMorphProps extends React.HTMLAttributes<HTMLDivElement> {
  providers?: SocialProvider[];
  url?: string;
  label?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onShare?: (provider: string) => void;
  onCopyLink?: (url: string) => void;
}

const css = `
.hb-xc9 {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: 46px;
  padding: 4px;
  border-radius: 999px;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  background: linear-gradient(180deg, #1b1b1b, #121212);
  box-shadow: inset 0 0 0 1px #2a2a2a, inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 14px 30px -16px rgba(0, 0, 0, 0.9);
  transition: box-shadow 0.4s ease;
}
.hb-xc9 *, .hb-xc9 *::before, .hb-xc9 *::after { box-sizing: border-box; }
.hb-xc9[data-open="true"] { box-shadow: inset 0 0 0 1px #333, inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 18px 36px -16px rgba(0, 0, 0, 0.95); }
.hb-xc9-tg {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: none;
  height: 38px;
  min-width: 38px;
  margin: 0;
  padding: 0 11px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #0a0a0a;
  background: linear-gradient(180deg, #ffffff, #e2e2e2);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.12), 0 2px 6px -2px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), padding 0.45s cubic-bezier(0.65, 0, 0.25, 1);
}
.hb-xc9-tg:active { transform: scale(0.94); }
.hb-xc9-tg:focus-visible { outline: 2px solid #7fb3ff; outline-offset: 2px; }
.hb-xc9[data-open="true"] .hb-xc9-tg { padding: 0 9px; color: #ededed; background: #222; box-shadow: inset 0 0 0 1px #333; }
.hb-xc9-ico { position: relative; display: inline-block; width: 18px; height: 18px; flex: none; }
.hb-xc9-ico svg { position: absolute; inset: 0; width: 18px; height: 18px; transition: transform 0.45s cubic-bezier(0.34, 1.4, 0.5, 1), opacity 0.25s ease; }
.hb-xc9-ico svg + svg { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.hb-xc9[data-open="true"] .hb-xc9-ico svg:first-child { opacity: 0; transform: rotate(90deg) scale(0.5); }
.hb-xc9[data-open="true"] .hb-xc9-ico svg + svg { opacity: 1; transform: none; }
.hb-xc9-lw { display: grid; grid-template-columns: 1fr; transition: grid-template-columns 0.45s cubic-bezier(0.65, 0, 0.25, 1); }
.hb-xc9-lw > span { min-width: 0; overflow: hidden; white-space: nowrap; padding-left: 8px; transition: opacity 0.25s ease; }
.hb-xc9[data-open="true"] .hb-xc9-lw { grid-template-columns: 0fr; }
.hb-xc9[data-open="true"] .hb-xc9-lw > span { opacity: 0; }
.hb-xc9-pw { display: grid; grid-template-columns: 0fr; min-width: 0; transition: grid-template-columns 0.5s cubic-bezier(0.65, 0, 0.25, 1); }
.hb-xc9[data-open="true"] .hb-xc9-pw { grid-template-columns: 1fr; }
.hb-xc9-p { display: flex; align-items: center; gap: 2px; min-width: 0; overflow: hidden; padding-left: 4px; }
.hb-xc9-n {
  --hb-xc9-c: #7fb3ff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 36px;
  height: 36px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  font: inherit;
  font-size: 17px;
  color: #a1a1a1;
  background: transparent;
  cursor: pointer;
  opacity: 0;
  transform: translateX(-10px) scale(0.6);
  transition: opacity 0.2s ease, transform 0.45s cubic-bezier(0.34, 1.5, 0.5, 1), color 0.2s ease, background 0.2s ease;
  transition-delay: 0s;
}
.hb-xc9-n svg { display: block; }
.hb-xc9[data-open="true"] .hb-xc9-n { opacity: 1; transform: none; transition-delay: calc(0.12s + var(--hb-xc9-i) * 45ms), calc(0.12s + var(--hb-xc9-i) * 45ms), 0s, 0s; }
.hb-xc9-n:hover, .hb-xc9-n:focus-visible { color: var(--hb-xc9-c); background: color-mix(in srgb, var(--hb-xc9-c) 13%, transparent); }
.hb-xc9-n:focus-visible { outline: 2px solid var(--hb-xc9-c); outline-offset: -2px; }
.hb-xc9-n[data-sent="true"] { color: #3ddc84; }
.hb-xc9-div { flex: none; width: 1px; height: 20px; margin: 0 6px; background: #2e2e2e; }
.hb-xc9-cp {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 1 auto;
  min-width: 0;
  height: 36px;
  margin: 0;
  padding: 0 6px 0 12px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-size: 12px;
  color: #a1a1a1;
  background: #0c0c0c;
  box-shadow: inset 0 0 0 1px #262626;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.25s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
}
.hb-xc9[data-open="true"] .hb-xc9-cp { opacity: 1; transform: none; transition-delay: 0.26s, 0.26s, 0s; }
.hb-xc9-cp:hover, .hb-xc9-cp:focus-visible { box-shadow: inset 0 0 0 1px #3a3a3a; }
.hb-xc9-cp:focus-visible { outline: 2px solid #7fb3ff; outline-offset: 1px; }
.hb-xc9-cp::before { content: ""; position: absolute; inset: 0; z-index: -1; background: color-mix(in srgb, #3ddc84 16%, transparent); transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(0.65, 0, 0.25, 1); }
.hb-xc9-cp[data-copied="true"]::before { transform: scaleX(1); }
.hb-xc9-url { min-width: 0; max-width: 96px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; }
.hb-xc9-cl { display: inline-flex; align-items: center; gap: 4px; flex: none; height: 26px; padding: 0 9px; border-radius: 999px; font-size: 11.5px; font-weight: 600; color: #0a0a0a; background: #ededed; transition: background 0.3s ease, color 0.3s ease; }
.hb-xc9-cp[data-copied="true"] .hb-xc9-cl { color: #04140a; background: #3ddc84; }
.hb-xc9-cl svg { width: 12px; height: 12px; }
.hb-xc9-cl span { display: inline-block; animation: hb-xc9-in 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
@keyframes hb-xc9-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xc9, .hb-xc9-tg, .hb-xc9-ico svg, .hb-xc9-lw, .hb-xc9-lw > span, .hb-xc9-pw, .hb-xc9-n, .hb-xc9-cp, .hb-xc9-cp::before, .hb-xc9-cl { transition: none !important; }
  .hb-xc9-cl span { animation: none; }
}
`;

export function SocialShareMorph({
  providers = ["x", "linkedin", "email"],
  url = "https://northwind.app/r/q3-report",
  label = "Share",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onShare,
  onCopyLink,
  className = "",
  onKeyDown,
  ...rest
}: SocialShareMorphProps) {
  const items = providers.map(resolveProvider);
  const [inner, setInner] = React.useState(defaultOpen);
  const open = openProp ?? inner;
  const [copied, setCopied] = React.useState(false);
  const [sent, setSent] = React.useState<string | null>(null);
  const trigRef = React.useRef<HTMLButtonElement>(null);
  const firstRef = React.useRef<HTMLButtonElement>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const display = url.replace(/^https?:[/][/]/, "");

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  function setOpen(next: boolean, keyboard = false) {
    if (openProp === undefined) setInner(next);
    onOpenChange?.(next);
    if (!next) {
      setCopied(false);
      setSent(null);
    }
    if (next && keyboard) window.setTimeout(() => firstRef.current?.focus(), 140);
  }

  function flash(fn: () => void) {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, 1800);
  }

  function copy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    onCopyLink?.(url);
    flash(() => setCopied(false));
  }

  return (
    <>
      <style href="hb-social-share-morph" precedence="default">{css}</style>
      <div
        className={`hb-xc9 ${className}`}
        data-open={open ? "true" : undefined}
        role="group"
        aria-label={label}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            e.preventDefault();
            setOpen(false);
            trigRef.current?.focus();
          }
          onKeyDown?.(e);
        }}
        {...rest}
      >
        <button
          ref={trigRef}
          type="button"
          className="hb-xc9-tg"
          aria-expanded={open}
          aria-label={open ? "Close share options" : label}
          onClick={(e) => setOpen(!open, e.detail === 0)}
        >
          <span className="hb-xc9-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5.5" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="18.5" r="2.5" />
              <path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
              <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
            </svg>
          </span>
          <span className="hb-xc9-lw">
            <span>{label}</span>
          </span>
        </button>
        <div className="hb-xc9-pw" aria-hidden={open ? undefined : true}>
          <div className="hb-xc9-p">
            {items.map((p, i) => (
              <button
                key={p.id}
                ref={i === 0 ? firstRef : undefined}
                type="button"
                className="hb-xc9-n"
                style={{ "--hb-xc9-c": p.color, "--hb-xc9-i": i } as React.CSSProperties}
                data-sent={sent === p.id ? "true" : undefined}
                tabIndex={open ? 0 : -1}
                aria-label={`Share to ${p.label}`}
                onClick={() => {
                  setSent(p.id);
                  onShare?.(p.id);
                  flash(() => setSent(null));
                }}
              >
                {p.icon}
              </button>
            ))}
            <span className="hb-xc9-div" aria-hidden="true" />
            <button
              type="button"
              className="hb-xc9-cp"
              data-copied={copied ? "true" : undefined}
              tabIndex={open ? 0 : -1}
              aria-label={copied ? "Link copied" : `Copy link ${display}`}
              onClick={copy}
            >
              <span className="hb-xc9-url">{display}</span>
              <span className="hb-xc9-cl">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {copied ? <path d="m3.5 8.5 3 3 6-6.5" /> : <path d="M5.5 5.5V4a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 13.5 4v5a1.5 1.5 0 0 1-1.5 1.5h-1.5M4 5.5h5A1.5 1.5 0 0 1 10.5 7v5A1.5 1.5 0 0 1 9 13.5H4A1.5 1.5 0 0 1 2.5 12V7A1.5 1.5 0 0 1 4 5.5z" />}
                </svg>
                <span key={copied ? "c" : "n"}>{copied ? "Copied" : "Copy"}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
