"use client";

import * as React from "react";

export interface NavbarBannerStoriesLink {
  label: string;
  href: string;
}

export interface NavbarBannerStoriesMessage {
  tag: string;
  text: string;
  link?: NavbarBannerStoriesLink;
}

export interface NavbarBannerStoriesProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  messages?: NavbarBannerStoriesMessage[];
  interval?: number;
  defaultMessage?: number;
  onDismiss?: () => void;
  links?: NavbarBannerStoriesLink[];
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number) => void;
  onTrack?: (code: string) => void;
  signIn?: NavbarBannerStoriesLink | null;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-xi9 {
  --hb-xi9-accent: #ffb224;
  --hb-xi9-ease: cubic-bezier(.22,1,.36,1);
  --hb-xi9-dur: 5000ms;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0b0b0c;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xi9 *, .hb-xi9 *::before, .hb-xi9 *::after { box-sizing: border-box; }
.hb-xi9-ban { display: grid; grid-template-rows: 1fr; transition: grid-template-rows .5s var(--hb-xi9-ease); }
.hb-xi9-ban[data-gone="true"] { grid-template-rows: 0fr; }
.hb-xi9-banin { min-height: 0; overflow: hidden; }
.hb-xi9-strip {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  height: 44px;
  padding: 0 12px 0 16px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xi9-accent) 16%, #0b0b0c), #141210 40%, #141210 60%, color-mix(in srgb, var(--hb-xi9-accent) 10%, #0b0b0c));
  border-bottom: 1px solid color-mix(in srgb, var(--hb-xi9-accent) 22%, #1d1d1f);
  transition: opacity .3s ease;
}
.hb-xi9-ban[data-gone="true"] .hb-xi9-strip { opacity: 0; }
.hb-xi9-segs { display: flex; flex: none; gap: 4px; }
.hb-xi9-seg { position: relative; width: 22px; height: 3px; margin: 0; padding: 0; border: 0; border-radius: 3px; background: rgba(255,255,255,.14); overflow: hidden; cursor: pointer; }
.hb-xi9-seg::before { content: ""; position: absolute; inset: -8px -2px; }
.hb-xi9-fill { position: absolute; inset: 0; border-radius: inherit; background: var(--hb-xi9-accent); transform: scaleX(0); transform-origin: 0 50%; }
.hb-xi9-seg[data-state="done"] .hb-xi9-fill { transform: scaleX(1); }
.hb-xi9-seg[data-state="now"] .hb-xi9-fill { animation: hb-xi9-fill var(--hb-xi9-dur) linear forwards; }
.hb-xi9-strip:hover .hb-xi9-fill, .hb-xi9-strip:focus-within .hb-xi9-fill, .hb-xi9[data-paused="true"] .hb-xi9-fill { animation-play-state: paused; }
.hb-xi9-win { position: relative; flex: 1; min-width: 0; height: 44px; overflow: hidden; }
.hb-xi9-msg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 13px; color: #d9d6d0; white-space: nowrap; animation: hb-xi9-up .55s var(--hb-xi9-ease) both; }
.hb-xi9-msg[data-dir="down"] { animation-name: hb-xi9-down; }
.hb-xi9-tag { flex: none; padding: 2px 8px; border-radius: 6px; background: color-mix(in srgb, var(--hb-xi9-accent) 18%, transparent); color: var(--hb-xi9-accent); font-size: 11px; font-weight: 650; letter-spacing: .02em; box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-xi9-accent) 30%, transparent) inset; }
.hb-xi9-txt { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.hb-xi9-ml { flex: none; display: inline-flex; align-items: center; gap: 4px; color: #fff; font-weight: 600; text-decoration: none; border-radius: 4px; }
.hb-xi9-ml svg { width: 11px; height: 11px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; transition: transform .25s var(--hb-xi9-ease); }
.hb-xi9-ml:hover svg { transform: translateX(3px); }
.hb-xi9-ctl { display: flex; flex: none; align-items: center; gap: 2px; }
.hb-xi9-ib { display: grid; place-items: center; width: 28px; height: 28px; margin: 0; padding: 0; border: 0; border-radius: 8px; background: transparent; color: #8f8c86; cursor: pointer; transition: color .2s ease, background-color .2s ease; }
.hb-xi9-ib:hover { color: #fff; background: rgba(255,255,255,.07); }
.hb-xi9-ib svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-xi9-bar { position: relative; z-index: 2; border-bottom: 1px solid #1d1d1f; background: #0b0b0c; }
.hb-xi9-row { display: flex; align-items: center; gap: 24px; max-width: 1140px; height: 64px; margin: 0 auto; padding: 0 24px; }
.hb-xi9-brand { display: inline-flex; align-items: center; gap: 10px; color: #fff; font-family: var(--font-grotesk, inherit); font-size: 18px; font-weight: 700; letter-spacing: -.03em; text-decoration: none; border-radius: 6px; }
.hb-xi9-mark { position: relative; width: 26px; height: 26px; border-radius: 7px; background: var(--hb-xi9-accent); box-shadow: 0 1px 0 rgba(255,255,255,.4) inset, 0 4px 12px -4px color-mix(in srgb, var(--hb-xi9-accent) 80%, transparent); }
.hb-xi9-mark::before { content: ""; position: absolute; left: 6px; right: 6px; top: 8px; height: 10px; border: 2px solid #0b0b0c; border-radius: 2px; }
.hb-xi9-mark::after { content: ""; position: absolute; left: 12px; top: 8px; width: 2px; height: 5px; background: #0b0b0c; }
.hb-xi9-links { display: flex; align-items: center; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-xi9-link { position: relative; display: inline-flex; align-items: center; height: 36px; padding: 0 12px; border-radius: 9px; color: #9a9aa2; font-size: 14px; font-weight: 500; text-decoration: none; transition: color .2s ease, background-color .2s ease; }
.hb-xi9-link:hover { color: #fff; background: rgba(255,255,255,.05); }
.hb-xi9-link[aria-current="page"] { color: #fff; }
.hb-xi9-link[aria-current="page"]::after { content: ""; position: absolute; left: 12px; right: 12px; bottom: -14px; height: 2px; border-radius: 2px 2px 0 0; background: var(--hb-xi9-accent); }
.hb-xi9-end { display: flex; align-items: center; gap: 10px; margin-left: auto; }
.hb-xi9-track { position: relative; display: flex; align-items: center; height: 38px; padding: 0 4px 0 12px; border-radius: 10px; background: #141416; box-shadow: 0 0 0 1px #26262a inset; transition: box-shadow .25s ease, width .4s var(--hb-xi9-ease); }
.hb-xi9-track:focus-within { box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-xi9-accent) 60%, transparent) inset, 0 0 0 4px color-mix(in srgb, var(--hb-xi9-accent) 14%, transparent); }
.hb-xi9-track svg { flex: none; width: 15px; height: 15px; fill: none; stroke: #8f8c86; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.hb-xi9-track input { width: 168px; height: 100%; margin: 0 8px; padding: 0; border: 0; outline: none; background: transparent; color: #fafafa; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12.5px; letter-spacing: .02em; }
.hb-xi9-track input::placeholder { color: #6e6e76; font-family: var(--font-sans, inherit); letter-spacing: 0; }
.hb-xi9-go { height: 30px; margin: 0; padding: 0 12px; border: 0; border-radius: 7px; background: var(--hb-xi9-accent); color: #1a1205; font: inherit; font-size: 13px; font-weight: 650; cursor: pointer; box-shadow: 0 1px 0 rgba(255,255,255,.45) inset; transition: transform .15s var(--hb-xi9-ease), filter .2s ease; }
.hb-xi9-go:hover { filter: brightness(1.06); }
.hb-xi9-go:active { transform: scale(.96); }
.hb-xi9-go:disabled { opacity: .45; cursor: not-allowed; }
.hb-xi9-track[data-state="error"] { box-shadow: 0 0 0 1px rgba(248,113,113,.7) inset; animation: hb-xi9-shake .4s var(--hb-xi9-ease); }
.hb-xi9-track[data-state="ok"] { box-shadow: 0 0 0 1px rgba(52,211,153,.6) inset; }
.hb-xi9-in { display: inline-flex; align-items: center; height: 38px; padding: 0 14px; border-radius: 10px; color: #ededed; font-size: 14px; font-weight: 500; text-decoration: none; transition: background-color .2s ease; }
.hb-xi9-in:hover { background: rgba(255,255,255,.06); }
.hb-xi9-burger { display: none; place-items: center; width: 38px; height: 38px; margin: 0; padding: 0; border: 0; border-radius: 10px; background: #141416; color: #fff; cursor: pointer; box-shadow: 0 0 0 1px #26262a inset; }
.hb-xi9-burger svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
.hb-xi9-sheet { display: none; }
.hb-xi9 a:focus-visible, .hb-xi9 button:focus-visible { outline: 2px solid var(--hb-xi9-accent); outline-offset: 2px; }
.hb-xi9-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.hb-xi9-stage { position: relative; height: 600px; overflow: hidden; }
.hb-xi9-hero { display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px; align-items: center; max-width: 1140px; margin: 0 auto; padding: 64px 24px 0; }
.hb-xi9-h { margin: 0; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-size: clamp(34px, 5.6cqi, 60px); font-weight: 700; letter-spacing: -.045em; line-height: 1; }
.hb-xi9-h span { color: var(--hb-xi9-accent); }
.hb-xi9-p { max-width: 460px; margin: 18px 0 0; color: #8f8f96; font-size: 16px; line-height: 1.6; }
.hb-xi9-card { padding: 20px; border-radius: 18px; background: linear-gradient(180deg, #141416, #0f0f11); box-shadow: 0 0 0 1px #222226 inset, 0 30px 60px -30px rgba(0,0,0,.8); }
.hb-xi9-ct { display: flex; justify-content: space-between; color: #8f8f96; font-size: 12px; }
.hb-xi9-ct b { color: #fafafa; font-family: var(--font-mono, ui-monospace, monospace); font-weight: 500; }
.hb-xi9-steps { display: grid; gap: 14px; margin-top: 18px; }
.hb-xi9-st { display: grid; grid-template-columns: 14px 1fr auto; gap: 12px; align-items: center; color: #d4d4d8; font-size: 13.5px; }
.hb-xi9-st i { width: 10px; height: 10px; border-radius: 50%; border: 2px solid #3a3a40; font-style: normal; }
.hb-xi9-st[data-done="true"] i { border-color: var(--hb-xi9-accent); background: var(--hb-xi9-accent); }
.hb-xi9-st small { color: #6e6e76; font-size: 12px; }
@keyframes hb-xi9-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-xi9-up { from { opacity: 0; transform: translateY(70%); filter: blur(3px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes hb-xi9-down { from { opacity: 0; transform: translateY(-70%); filter: blur(3px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes hb-xi9-shake { 0%, 100% { transform: none; } 25% { transform: translateX(-4px); } 50% { transform: translateX(4px); } 75% { transform: translateX(-2px); } }
@keyframes hb-xi9-drop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
@container (max-width: 880px) {
  .hb-xi9-track input { width: 120px; }
  .hb-xi9-links .hb-xi9-hide { display: none; }
}
@container (max-width: 720px) {
  .hb-xi9-links, .hb-xi9-in, .hb-xi9-end > .hb-xi9-track { display: none; }
  .hb-xi9-burger { display: grid; }
  .hb-xi9-row { height: 58px; padding: 0 16px; }
  .hb-xi9-strip { padding: 0 6px 0 12px; gap: 10px; }
  .hb-xi9-segs { display: none; }
  .hb-xi9-msg { justify-content: flex-start; }
  .hb-xi9-ml span { display: none; }
  .hb-xi9-ctl .hb-xi9-nav { display: none; }
  .hb-xi9-sheet[data-open="true"] { position: relative; z-index: 2; display: grid; gap: 4px; padding: 12px 16px 16px; border-bottom: 1px solid #1d1d1f; background: #0d0d0e; animation: hb-xi9-drop .3s var(--hb-xi9-ease) both; }
  .hb-xi9-sheet .hb-xi9-track { margin-bottom: 8px; }
  .hb-xi9-sheet .hb-xi9-track input { flex: 1; width: auto; }
  .hb-xi9-sheet a { display: flex; align-items: center; height: 44px; padding: 0 4px; border-bottom: 1px solid #18181a; color: #d4d4d8; font-size: 15px; text-decoration: none; }
  .hb-xi9-sheet a[aria-current="page"] { color: var(--hb-xi9-accent); }
  .hb-xi9-hero { grid-template-columns: 1fr; padding-top: 40px; }
  .hb-xi9-card { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xi9 *, .hb-xi9 *::before, .hb-xi9 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultMessages: NavbarBannerStoriesMessage[] = [
  { tag: "Holiday cutoff", text: "Ship by Dec 18 for guaranteed delivery before Christmas.", link: { label: "See cutoff map", href: "#" } },
  { tag: "New", text: "Same-day lockers are live in Austin, Denver and Raleigh.", link: { label: "Find a locker", href: "#" } },
  { tag: "Rates", text: "2027 ground rates are locked for teams that renew this month.", link: { label: "Compare plans", href: "#" } },
];

const defaultLinks: NavbarBannerStoriesLink[] = [
  { label: "Ship", href: "#" },
  { label: "Track", href: "#" },
  { label: "Business", href: "#" },
  { label: "Locations", href: "#" },
  { label: "Support", href: "#" },
];

export function NavbarBannerStories({
  brand = "Parcel",
  messages = defaultMessages,
  interval = 5000,
  defaultMessage = 0,
  onDismiss,
  links = defaultLinks,
  active,
  defaultActive = 0,
  onActiveChange,
  onTrack,
  signIn = { label: "Sign in", href: "#" },
  accent = "#ffb224",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavbarBannerStoriesProps) {
  const uid = React.useId();
  const [msg, setMsg] = React.useState(defaultMessage);
  const [dir, setDir] = React.useState<"up" | "down">("up");
  const [gone, setGone] = React.useState(false);
  const [removed, setRemoved] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [inner, setInner] = React.useState(defaultActive);
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [state, setState] = React.useState<"idle" | "error" | "ok">("idle");
  const current = active ?? inner;
  const n = messages.length;
  const at = n ? ((msg % n) + n) % n : 0;

  const go = (next: number, d: "up" | "down") => {
    setDir(d);
    setMsg(((next % n) + n) % n);
  };

  const select = (i: number) => {
    if (active === undefined) setInner(i);
    onActiveChange?.(i);
    setOpen(false);
  };

  const track = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clean = code.replace(/\s+/g, "").toUpperCase();
    if (!/^[A-Z0-9]{8,22}$/.test(clean)) {
      setState("error");
      return;
    }
    setState("ok");
    onTrack?.(clean);
  };

  const field = (
    <form className="hb-xi9-track" data-state={state} onSubmit={track} role="search" aria-label="Track a package">
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 1.8l5.5 3v6.4L8 14.2l-5.5-3V4.8zM2.5 4.8L8 7.8l5.5-3M8 7.8v6.4" />
      </svg>
      <input
        value={code}
        placeholder="Tracking number"
        aria-label="Tracking number"
        aria-invalid={state === "error"}
        onChange={(e) => {
          setCode(e.target.value);
          if (state !== "idle") setState("idle");
        }}
      />
      <button type="submit" className="hb-xi9-go" disabled={!code.trim()}>
        {state === "ok" ? "Found" : "Track"}
      </button>
    </form>
  );

  const message = messages[at];

  return (
    <header
      className={`hb-xi9 ${className}`}
      data-paused={paused ? "true" : "false"}
      style={{ "--hb-xi9-accent": accent, "--hb-xi9-dur": `${interval}ms`, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) setOpen(false);
      }}
      {...rest}
    >
      <style href="hb-navbar-banner-stories" precedence="default">
        {css}
      </style>
      {!removed && message && (
        <div
          className="hb-xi9-ban"
          data-gone={gone ? "true" : "false"}
          onTransitionEnd={(e) => {
            if (gone && e.propertyName === "grid-template-rows") setRemoved(true);
          }}
        >
          <div className="hb-xi9-banin">
            <div className="hb-xi9-strip" role="region" aria-roledescription="carousel" aria-label="Announcements">
              <div className="hb-xi9-segs" role="tablist" aria-label="Choose announcement">
                {messages.map((m, i) => (
                  <button
                    key={m.tag + i}
                    type="button"
                    role="tab"
                    className="hb-xi9-seg"
                    aria-selected={i === at}
                    aria-label={`Announcement ${i + 1} of ${n}: ${m.tag}`}
                    data-state={i < at ? "done" : i === at ? "now" : "next"}
                    onClick={() => go(i, i < at ? "down" : "up")}
                  >
                    <span
                      key={i === at ? `now-${msg}` : "idle"}
                      className="hb-xi9-fill"
                      onAnimationEnd={() => {
                        if (i === at && n > 1) go(at + 1, "up");
                      }}
                    />
                  </button>
                ))}
              </div>
              <div className="hb-xi9-win" aria-live={paused ? "polite" : "off"}>
                <div key={msg} className="hb-xi9-msg" data-dir={dir}>
                  <span className="hb-xi9-tag">{message.tag}</span>
                  <span className="hb-xi9-txt">{message.text}</span>
                  {message.link && (
                    <a href={message.link.href} className="hb-xi9-ml" aria-label={message.link.label}>
                      <span>{message.link.label}</span>
                      <svg viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2.5 6h7M6.5 3l3 3-3 3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div className="hb-xi9-ctl">
                <button type="button" className="hb-xi9-ib hb-xi9-nav" aria-label="Previous announcement" onClick={() => go(at - 1, "down")}>
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M7.5 2.5L4 6l3.5 3.5" />
                  </svg>
                </button>
                <button type="button" className="hb-xi9-ib hb-xi9-nav" aria-label={paused ? "Resume announcements" : "Pause announcements"} aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    {paused ? <path d="M4 2.5l5 3.5-5 3.5z" /> : <path d="M4.2 2.5v7M7.8 2.5v7" />}
                  </svg>
                </button>
                <button type="button" className="hb-xi9-ib hb-xi9-nav" aria-label="Next announcement" onClick={() => go(at + 1, "up")}>
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M4.5 2.5L8 6 4.5 9.5" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="hb-xi9-ib"
                  aria-label="Dismiss announcements"
                  onClick={() => {
                    setGone(true);
                    onDismiss?.();
                    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setRemoved(true);
                  }}
                >
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M3 3l6 6M9 3L3 9" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="hb-xi9-bar">
        <nav className="hb-xi9-row" aria-label="Main">
          <a href="#" className="hb-xi9-brand" aria-label={`${brand} home`}>
            <span className="hb-xi9-mark" aria-hidden="true" />
            {brand}
          </a>
          <ul className="hb-xi9-links">
            {links.map((link, i) => (
              <li key={link.label} className={i > 2 ? "hb-xi9-hide" : undefined}>
                <a href={link.href} className="hb-xi9-link" aria-current={i === current ? "page" : undefined} onClick={() => select(i)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hb-xi9-end">
            {field}
            {signIn && (
              <a href={signIn.href} className="hb-xi9-in">
                {signIn.label}
              </a>
            )}
            <button
              type="button"
              className="hb-xi9-burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={`${uid}-sheet`}
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                {open ? <path d="M4 4l8 8M12 4l-8 8" /> : <path d="M2.5 5h11M2.5 11h11" />}
              </svg>
            </button>
          </div>
        </nav>
        <div id={`${uid}-sheet`} className="hb-xi9-sheet" data-open={open ? "true" : "false"}>
          {open && field}
          {links.map((link, i) => (
            <a key={link.label} href={link.href} aria-current={i === current ? "page" : undefined} onClick={() => select(i)}>
              {link.label}
            </a>
          ))}
          {signIn && (
            <a href={signIn.href} onClick={() => setOpen(false)}>
              {signIn.label}
            </a>
          )}
        </div>
        <span className="hb-xi9-sr" aria-live="polite">
          {state === "error" ? "Tracking numbers have 8 to 22 letters or digits." : state === "ok" ? "Package found." : ""}
        </span>
      </div>
      {showBackdrop && (
        <div className="hb-xi9-stage" aria-hidden="true">
          <div className="hb-xi9-hero">
            <div>
              <h2 className="hb-xi9-h">
                Ship anything, <span>anywhere</span>, by tomorrow.
              </h2>
              <p className="hb-xi9-p">Print a label in 30 seconds, drop it at one of 9,400 lockers and watch it move in real time.</p>
            </div>
            <div className="hb-xi9-card">
              <div className="hb-xi9-ct">
                <span>Tracking</span>
                <b>PX 4471 0928 US</b>
              </div>
              <div className="hb-xi9-steps">
                <div className="hb-xi9-st" data-done="true">
                  <i />
                  <span>Label created, Brooklyn NY</span>
                  <small>Dec 9</small>
                </div>
                <div className="hb-xi9-st" data-done="true">
                  <i />
                  <span>Departed hub, Newark NJ</span>
                  <small>Dec 10</small>
                </div>
                <div className="hb-xi9-st" data-done="true">
                  <i />
                  <span>Arrived at locker, Austin TX</span>
                  <small>Dec 11</small>
                </div>
                <div className="hb-xi9-st">
                  <i />
                  <span>Picked up</span>
                  <small>Waiting</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
