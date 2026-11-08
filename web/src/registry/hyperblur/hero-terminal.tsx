"use client";

import * as React from "react";

export interface HeroTerminalAction {
  label: string;
  href: string;
}

export interface HeroTerminalLine {
  kind: "command" | "info" | "progress" | "success" | "link";
  text: string;
  meta?: string;
  wait?: number;
}

export interface HeroTerminalProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  command?: string;
  script?: HeroTerminalLine[];
  windowTitle?: string;
  primaryCta?: HeroTerminalAction | null;
  secondaryCta?: HeroTerminalAction | null;
  accent?: string;
  loop?: boolean;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb7 {
  --hb-vb7-accent: #3ddc97;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 640px;
  padding: 56px clamp(16px, 5cqi, 48px) 0;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background:
    linear-gradient(rgba(255, 255, 255, .025) 1px, transparent 1px) 0 0 / 100% 32px,
    #070707;
  color: #ededed;
  font-family: inherit;
  text-align: center;
  -webkit-font-smoothing: antialiased;
}
.hb-vb7 *, .hb-vb7 *::before, .hb-vb7 *::after { box-sizing: border-box; }
.hb-vb7::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -30%;
  z-index: -1;
  width: 80%;
  height: 70%;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-vb7-accent) 18%, transparent), transparent);
  pointer-events: none;
}
.hb-vb7-in { animation: hb-vb7-up .8s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb7-d, 0ms); }
@keyframes hb-vb7-up {
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vb7-eyebrow {
  margin: 0;
  color: var(--hb-vb7-accent);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px;
  letter-spacing: .02em;
}
.hb-vb7-eyebrow::before { content: "~/"; margin-right: 6px; color: rgba(237, 237, 237, .35); }
.hb-vb7-title {
  max-width: 780px;
  margin: 14px 0 0;
  color: #f5f5f5;
  font-size: clamp(32px, 5.4cqi, 56px);
  font-weight: 640;
  line-height: 1.04;
  letter-spacing: -.045em;
  text-wrap: balance;
}
.hb-vb7-sub { max-width: 540px; margin: 14px 0 0; color: rgba(237, 237, 237, .55); font-size: clamp(14.5px, 1.6cqi, 16px); line-height: 1.55; }
.hb-vb7-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px; margin-top: 22px; }
.hb-vb7-cmd {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 6px 0 14px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 10px;
  background: #0f0f10;
  color: #ededed;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 13px;
}
.hb-vb7-cmd > span::before { content: "$ "; color: var(--hb-vb7-accent); }
.hb-vb7-copy {
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 7px;
  background: rgba(255, 255, 255, .06);
  color: rgba(237, 237, 237, .7);
  cursor: pointer;
  transition: background .2s ease, color .2s ease;
}
.hb-vb7-copy:hover { background: rgba(255, 255, 255, .12); color: #fff; }
.hb-vb7-copy:focus-visible, .hb-vb7-btn:focus-visible { outline: 2px solid var(--hb-vb7-accent); outline-offset: 2px; }
.hb-vb7-copy[data-done] { color: var(--hb-vb7-accent); }
.hb-vb7-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 10px;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  text-decoration: none;
  white-space: nowrap;
  transition: background .2s ease, border-color .2s ease, transform .2s cubic-bezier(.2, .8, .2, 1);
}
.hb-vb7-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .24); transform: translateY(-1px); }
.hb-vb7-btn[data-primary] { border-color: transparent; background: var(--hb-vb7-accent); color: #04120b; }
.hb-vb7-btn[data-primary]:hover { background: color-mix(in srgb, var(--hb-vb7-accent) 85%, #ffffff); }
.hb-vb7-win {
  width: 100%;
  max-width: 780px;
  margin-top: 36px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .1);
  border-bottom: 0;
  border-radius: 14px 14px 0 0;
  background: linear-gradient(180deg, #111112, #0b0b0c);
  box-shadow: 0 -1px 0 rgba(255, 255, 255, .04) inset, 0 40px 100px -20px rgba(0, 0, 0, .9), 0 0 0 6px rgba(255, 255, 255, .015);
  text-align: left;
}
.hb-vb7-chrome {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 38px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, .06);
  color: rgba(237, 237, 237, .45);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11.5px;
}
.hb-vb7-lights { display: flex; gap: 6px; }
.hb-vb7-lights span { width: 10px; height: 10px; border-radius: 50%; background: rgba(255, 255, 255, .12); }
.hb-vb7-tab { padding: 4px 10px; border-radius: 6px; background: rgba(255, 255, 255, .05); color: rgba(237, 237, 237, .8); }
.hb-vb7-branch { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; }
.hb-vb7-branch::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #f5a524; }
.hb-vb7-body {
  min-height: 250px;
  margin: 0;
  padding: 16px 18px 22px;
  color: rgba(237, 237, 237, .82);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 13px;
  line-height: 1.85;
  list-style: none;
}
.hb-vb7-line { display: flex; align-items: center; gap: 10px; min-width: 0; white-space: nowrap; animation: hb-vb7-line .35s cubic-bezier(.16, 1, .3, 1) both; }
@keyframes hb-vb7-line {
  from { opacity: 0; transform: translate3d(-4px, 0, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vb7-line[data-kind="command"] { color: #fafafa; animation: none; }
.hb-vb7-line[data-kind="command"]::before { content: "$"; color: var(--hb-vb7-accent); }
.hb-vb7-line[data-kind="info"] { color: rgba(237, 237, 237, .6); }
.hb-vb7-line[data-kind="info"]::before { content: "\\203A"; color: rgba(237, 237, 237, .35); }
.hb-vb7-line[data-kind="success"] svg, .hb-vb7-line[data-kind="link"] svg { flex: none; color: var(--hb-vb7-accent); }
.hb-vb7-text { overflow: hidden; text-overflow: ellipsis; }
.hb-vb7-meta { margin-left: auto; padding-left: 16px; color: rgba(237, 237, 237, .35); }
.hb-vb7-line[data-kind="link"] .hb-vb7-text { color: #fff; text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--hb-vb7-accent) 70%, transparent); text-underline-offset: 3px; }
.hb-vb7-track { position: relative; flex: 0 1 220px; height: 6px; overflow: hidden; border-radius: 6px; background: rgba(255, 255, 255, .07); }
.hb-vb7-track::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-vb7-accent) 50%, transparent), var(--hb-vb7-accent));
  transform-origin: 0 50%;
  animation: hb-vb7-fill var(--hb-vb7-w, 1.2s) cubic-bezier(.65, 0, .35, 1) both;
}
@keyframes hb-vb7-fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.hb-vb7-caret {
  display: inline-block;
  width: .6em;
  height: 1.15em;
  margin-left: 1px;
  background: var(--hb-vb7-accent);
  vertical-align: -.2em;
  animation: hb-vb7-blink 1.05s steps(1) infinite;
}
@keyframes hb-vb7-blink {
  50% { opacity: 0; }
}
.hb-vb7-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 560px) {
  .hb-vb7-body { font-size: 11.5px; padding: 12px 12px 18px; }
  .hb-vb7-meta, .hb-vb7-branch { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb7-in, .hb-vb7-line, .hb-vb7-track::after, .hb-vb7-caret { animation: none; }
  .hb-vb7-copy, .hb-vb7-btn { transition: none; }
}
`;

const defaultScript: HeroTerminalLine[] = [
  { kind: "command", text: "npx quill@latest deploy", wait: 500 },
  { kind: "info", text: "Detected Next.js 16 with the app router", meta: "0.2s", wait: 450 },
  { kind: "progress", text: "Installing 214 packages", meta: "1.4s", wait: 1300 },
  { kind: "info", text: "Building 48 routes and 3 edge functions", meta: "3.1s", wait: 700 },
  { kind: "success", text: "Uploaded 1.2 MB to 31 regions", meta: "0.6s", wait: 500 },
  { kind: "success", text: "Preview checks passed (Lighthouse 99)", meta: "0.4s", wait: 450 },
  { kind: "link", text: "https://acme-store.quill.run", meta: "live", wait: 0 },
];

const defaultPrimary: HeroTerminalAction = { label: "Read the quickstart", href: "#" };

function d(ms: number) {
  return { "--hb-vb7-d": `${ms}ms` } as React.CSSProperties;
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function Globe() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
    </svg>
  );
}

export function HeroTerminal({
  eyebrow = "quill deploy, now with preview checks",
  title = "From git push to global in one command",
  subtitle = "Quill installs, builds, tests and ships your app to 31 regions, and tells you exactly what happened along the way.",
  command = "npx quill@latest deploy",
  script = defaultScript,
  windowTitle = "zsh · acme-store",
  primaryCta = defaultPrimary,
  secondaryCta = null,
  accent = "#3ddc97",
  loop = true,
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroTerminalProps) {
  const Heading = headingAs;
  const vars = { "--hb-vb7-accent": accent, ...style } as React.CSSProperties;
  const [state, setState] = React.useState({ line: 0, chars: 0 });
  const [copied, setCopied] = React.useState(false);
  const root = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const node = root.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(node);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = window.setTimeout(() => setState({ line: script.length, chars: 0 }), 0);
      return () => window.clearTimeout(t);
    }
    if (!visible) return;
    const current = script[state.line];
    let t: number;
    if (!current) {
      if (!loop) return;
      t = window.setTimeout(() => setState({ line: 0, chars: 0 }), 4200);
    } else if (current.kind === "command" && state.chars < current.text.length) {
      t = window.setTimeout(() => setState((s) => ({ ...s, chars: s.chars + 1 })), 38 + (state.chars % 5) * 9);
    } else {
      t = window.setTimeout(() => setState((s) => ({ line: s.line + 1, chars: 0 })), current.wait ?? 500);
    }
    return () => window.clearTimeout(t);
  }, [state, script, loop, visible]);

  const copy = () => {
    navigator.clipboard?.writeText(command).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      },
      () => undefined,
    );
  };

  const done = state.line >= script.length;

  return (
    <section ref={root} className={`hb-vb7 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-terminal" precedence="default">{css}</style>
      {eyebrow ? (
        <p className="hb-vb7-eyebrow hb-vb7-in" style={d(40)}>
          {eyebrow}
        </p>
      ) : null}
      <Heading className="hb-vb7-title hb-vb7-in" style={d(120)}>
        {title}
      </Heading>
      {subtitle ? (
        <p className="hb-vb7-sub hb-vb7-in" style={d(200)}>
          {subtitle}
        </p>
      ) : null}
      <div className="hb-vb7-row hb-vb7-in" style={d(280)}>
        {command ? (
          <span className="hb-vb7-cmd">
            <span>{command}</span>
            <button type="button" className="hb-vb7-copy" data-done={copied ? "" : undefined} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
              {copied ? (
                <Check />
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="8" y="8" width="12" height="12" rx="2.5" />
                  <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                </svg>
              )}
            </button>
          </span>
        ) : null}
        {primaryCta ? (
          <a className="hb-vb7-btn" data-primary="" href={primaryCta.href}>
            {primaryCta.label}
          </a>
        ) : null}
        {secondaryCta ? (
          <a className="hb-vb7-btn" href={secondaryCta.href}>
            {secondaryCta.label}
          </a>
        ) : null}
      </div>
      <div className="hb-vb7-win hb-vb7-in" style={d(380)}>
        <div className="hb-vb7-chrome" aria-hidden="true">
          <span className="hb-vb7-lights">
            <span />
            <span />
            <span />
          </span>
          <span className="hb-vb7-tab">{windowTitle}</span>
          <span className="hb-vb7-branch">main</span>
        </div>
        <ol className="hb-vb7-body" aria-live="off">
          <li className="hb-vb7-sr">{script.map((line) => line.text).join(". ")}</li>
          {script.slice(0, Math.min(state.line + 1, script.length)).map((line, i) => {
            const active = i === state.line;
            if (line.kind === "command") {
              return (
                <li key={i} className="hb-vb7-line" data-kind="command" aria-hidden="true">
                  <span className="hb-vb7-text">{active ? line.text.slice(0, state.chars) : line.text}</span>
                  {active ? <span className="hb-vb7-caret" /> : null}
                </li>
              );
            }
            return (
              <li key={i} className="hb-vb7-line" data-kind={line.kind} aria-hidden="true">
                {line.kind === "success" ? <Check /> : null}
                {line.kind === "link" ? <Globe /> : null}
                <span className="hb-vb7-text">{line.text}</span>
                {line.kind === "progress" ? <span className="hb-vb7-track" style={{ "--hb-vb7-w": `${line.wait ?? 1200}ms` } as React.CSSProperties} /> : null}
                {line.meta ? <span className="hb-vb7-meta">{line.meta}</span> : null}
              </li>
            );
          })}
          {done ? (
            <li className="hb-vb7-line" data-kind="command" aria-hidden="true">
              <span className="hb-vb7-caret" />
            </li>
          ) : null}
        </ol>
      </div>
    </section>
  );
}
