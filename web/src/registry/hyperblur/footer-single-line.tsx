"use client";

import * as React from "react";

export interface FooterSingleLineLink {
  label: string;
  href: string;
}

export interface FooterSingleLineProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
  year?: number;
  links?: FooterSingleLineLink[];
  city?: string;
  timeZone?: string;
  showTop?: boolean;
  onTop?: () => void;
  appearance?: "light" | "dark";
  accent?: string;
}

const css = `
.hb-wc3 {
  --hb-wc3-accent: #ff5b2e;
  --hb-wc3-bg: #f7f5ef;
  --hb-wc3-ink: #141414;
  --hb-wc3-muted: #77746c;
  --hb-wc3-line: rgba(20, 20, 20, .12);
  container-type: inline-size;
  box-sizing: border-box;
  width: 100%;
  background: var(--hb-wc3-bg);
  color: var(--hb-wc3-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc3[data-appearance="dark"] {
  --hb-wc3-bg: #0a0a0a;
  --hb-wc3-ink: #ededed;
  --hb-wc3-muted: #8f8f8f;
  --hb-wc3-line: rgba(255, 255, 255, .1);
}
.hb-wc3 *, .hb-wc3 *::before, .hb-wc3 *::after { box-sizing: border-box; }
.hb-wc3-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas: "brand top" "nav nav" "clock clock";
  align-items: center;
  gap: 18px 16px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 26px 20px;
  border-top: 1px solid var(--hb-wc3-line);
  font-size: 14px;
}
.hb-wc3-brand { grid-area: brand; display: inline-flex; align-items: center; gap: 10px; min-width: 0; white-space: nowrap; }
.hb-wc3-glyph { position: relative; width: 22px; height: 22px; flex: none; }
.hb-wc3-glyph span { position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid var(--hb-wc3-ink); }
.hb-wc3-glyph span:last-child { inset: 5px; border: 0; background: var(--hb-wc3-accent); transition: transform .5s cubic-bezier(.3, 1.6, .4, 1); }
.hb-wc3-brand:hover .hb-wc3-glyph span:last-child { transform: scale(1.35); }
.hb-wc3-name { font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-weight: 600; letter-spacing: -.01em; }
.hb-wc3-copy { color: var(--hb-wc3-muted); }
.hb-wc3-nav { grid-area: nav; display: flex; flex-wrap: wrap; gap: 6px 22px; margin: 0; padding: 0; list-style: none; }
.hb-wc3-link { position: relative; display: inline-flex; overflow: hidden; height: 1.35em; color: var(--hb-wc3-ink); line-height: 1.35; text-decoration: none; }
.hb-wc3-link:focus-visible { outline: 2px solid var(--hb-wc3-accent); outline-offset: 4px; border-radius: 4px; }
.hb-wc3-ch { display: inline-block; white-space: pre; transition: transform .5s cubic-bezier(.7, 0, .2, 1); transition-delay: calc(var(--hb-wc3-i) * 18ms); }
.hb-wc3-ch::after { content: attr(data-c); position: absolute; left: 0; top: 100%; color: var(--hb-wc3-accent); }
.hb-wc3-ch { position: relative; }
.hb-wc3-link:hover .hb-wc3-ch, .hb-wc3-link:focus-visible .hb-wc3-ch { transform: translateY(-100%); }
.hb-wc3-clock { grid-area: clock; display: inline-flex; align-items: center; gap: 10px; color: var(--hb-wc3-muted); font-family: var(--font-mono), monospace; font-size: 12.5px; letter-spacing: .02em; white-space: nowrap; }
.hb-wc3-dot { position: relative; width: 7px; height: 7px; border-radius: 50%; background: #22c55e; }
.hb-wc3-dot::after { content: ""; position: absolute; inset: -3px; border-radius: 50%; border: 1px solid #22c55e; animation: hb-wc3-ping 2.2s cubic-bezier(0, 0, .2, 1) infinite; }
.hb-wc3-time { color: var(--hb-wc3-ink); font-variant-numeric: tabular-nums; }
.hb-wc3-colon { animation: hb-wc3-blink 1s steps(1) infinite; }
.hb-wc3-top {
  grid-area: top;
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--hb-wc3-line);
  border-radius: 50%;
  background: transparent;
  color: var(--hb-wc3-ink);
  cursor: pointer;
  overflow: hidden;
  transition: background .3s ease, color .3s ease, border-color .3s ease;
}
.hb-wc3-top:hover { background: var(--hb-wc3-ink); border-color: var(--hb-wc3-ink); color: var(--hb-wc3-bg); }
.hb-wc3-top:focus-visible { outline: 2px solid var(--hb-wc3-accent); outline-offset: 3px; }
.hb-wc3-top svg { width: 14px; height: 14px; grid-area: 1 / 1; transition: transform .45s cubic-bezier(.7, 0, .2, 1); }
.hb-wc3-top svg:last-child { transform: translateY(160%); }
.hb-wc3-top:hover svg:first-child { transform: translateY(-160%); }
.hb-wc3-top:hover svg:last-child { transform: translateY(0); }
@keyframes hb-wc3-ping { 70%, 100% { transform: scale(2.1); opacity: 0; } }
@keyframes hb-wc3-blink { 50% { opacity: .25; } }
@container (min-width: 760px) {
  .hb-wc3-row { grid-template-columns: auto minmax(0, 1fr) auto auto; grid-template-areas: "brand nav clock top"; gap: 32px; padding: 28px 40px; }
  .hb-wc3-nav { justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc3 *, .hb-wc3 *::before, .hb-wc3 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultLinks: FooterSingleLineLink[] = [
  { label: "Work", href: "#" },
  { label: "Journal", href: "#" },
  { label: "Studio", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Privacy", href: "#" },
];

function Roll({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((c, i) => (
        <span key={i} className="hb-wc3-ch" data-c={c} style={{ "--hb-wc3-i": i } as React.CSSProperties} aria-hidden="true">
          {c}
        </span>
      ))}
    </>
  );
}

export function FooterSingleLine({
  brand = "Lumen Studio",
  year = 2026,
  links = defaultLinks,
  city = "Lisbon",
  timeZone = "Europe/Lisbon",
  showTop = true,
  onTop,
  appearance = "light",
  accent = "#ff5b2e",
  className = "",
  style,
  ...rest
}: FooterSingleLineProps) {
  const [time, setTime] = React.useState<{ h: string; m: string } | null>(null);

  React.useEffect(() => {
    let fmt: Intl.DateTimeFormat;
    try {
      fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone });
    } catch {
      fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
    }
    const tick = () => {
      const parts = fmt.formatToParts(new Date());
      setTime({ h: parts.find((p) => p.type === "hour")?.value ?? "00", m: parts.find((p) => p.type === "minute")?.value ?? "00" });
    };
    const first = setTimeout(tick, 0);
    const timer = setInterval(tick, 15000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [timeZone]);

  const top = () => {
    onTop?.();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const vars = { "--hb-wc3-accent": accent, ...style } as React.CSSProperties;

  return (
    <footer className={`hb-wc3 ${className}`} style={vars} data-appearance={appearance} {...rest}>
      <style href="hb-footer-single-line" precedence="default">{css}</style>
      <div className="hb-wc3-row">
        <span className="hb-wc3-brand">
          <span className="hb-wc3-glyph" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="hb-wc3-name">{brand}</span>
          <span className="hb-wc3-copy">© {year}</span>
        </span>
        <ul className="hb-wc3-nav">
          {links.map((l) => (
            <li key={l.label}>
              <a className="hb-wc3-link" href={l.href} aria-label={l.label}>
                <Roll text={l.label} />
              </a>
            </li>
          ))}
        </ul>
        <span className="hb-wc3-clock">
          <span className="hb-wc3-dot" aria-hidden="true" />
          <span>{city}</span>
          <span className="hb-wc3-time" aria-label={time ? `Local time ${time.h}:${time.m}` : "Local time"}>
            {time ? time.h : "--"}
            <span className="hb-wc3-colon">:</span>
            {time ? time.m : "--"}
          </span>
        </span>
        {showTop ? (
          <button className="hb-wc3-top" type="button" onClick={top} aria-label="Back to top">
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M7 12V2.5M3 6.5l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M7 12V2.5M3 6.5l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}
      </div>
    </footer>
  );
}
