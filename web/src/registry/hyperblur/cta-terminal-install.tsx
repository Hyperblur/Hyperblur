"use client";

import * as React from "react";

export interface CtaTerminalInstallManager {
  id: string;
  label: string;
  command: string;
}

export interface CtaTerminalInstallLine {
  text: string;
  tone?: "ok" | "dim" | "info" | "accent";
}

export interface CtaTerminalInstallProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  managers?: CtaTerminalInstallManager[];
  output?: CtaTerminalInstallLine[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  autoPlay?: boolean;
  typingSpeed?: number;
  onCommandCopy?: (command: string) => void;
  accent?: string;
}

const css = `
.hb-wc8 {
  --hb-wc8-accent: #4ade80;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc8 *, .hb-wc8 *::before, .hb-wc8 *::after { box-sizing: border-box; }
.hb-wc8::before { content: ""; position: absolute; inset: 0; z-index: -1; background-image: linear-gradient(rgba(255, 255, 255, .04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .04) 1px, transparent 1px); background-size: 44px 44px; mask-image: radial-gradient(70% 60% at 50% 40%, #000, transparent); }
.hb-wc8::after { content: ""; position: absolute; left: 50%; top: 58%; z-index: -1; width: 70%; height: 50%; transform: translate(-50%, -50%); background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-wc8-accent) 16%, transparent), transparent); }
.hb-wc8-inner { display: grid; justify-items: center; gap: 0; max-width: 900px; margin: 0 auto; padding: 80px 18px; text-align: center; }
.hb-wc8-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 18px; padding: 5px 12px 5px 6px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 999px; background: rgba(255, 255, 255, .03); color: #a1a1a1; font-family: var(--font-mono), monospace; font-size: 12px; }
.hb-wc8-eyebrow b { padding: 2px 7px; border-radius: 999px; background: var(--hb-wc8-accent); color: #04140a; font-weight: 700; }
.hb-wc8-title { margin: 0; max-width: 16ch; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(34px, 6cqi, 60px); font-weight: 600; line-height: 1.02; letter-spacing: -.04em; text-wrap: balance; }
.hb-wc8-sub { margin: 18px 0 0; max-width: 520px; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-wc8-term { width: 100%; max-width: 720px; margin-top: 40px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 14px; background: linear-gradient(180deg, #121212, #0c0c0c); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 40px 80px -40px rgba(0, 0, 0, .9), 0 0 0 6px rgba(255, 255, 255, .02); text-align: left; overflow: hidden; }
.hb-wc8-bar { display: flex; align-items: center; gap: 12px; height: 44px; padding: 0 8px 0 14px; border-bottom: 1px solid rgba(255, 255, 255, .07); }
.hb-wc8-dots { display: flex; gap: 6px; }
.hb-wc8-dots i { width: 10px; height: 10px; border-radius: 50%; background: #2a2a2a; font-style: normal; }
.hb-wc8-tabs { position: relative; display: flex; gap: 2px; margin-left: auto; padding: 3px; border-radius: 9px; background: rgba(255, 255, 255, .04); }
.hb-wc8-tab { position: relative; z-index: 1; height: 28px; padding: 0 11px; border: 0; border-radius: 7px; background: none; color: #7a7a7a; font-family: var(--font-mono), monospace; font-size: 12px; cursor: pointer; transition: color .2s ease, background .2s ease; }
.hb-wc8-tab[aria-selected="true"] { background: #1f1f1f; color: #ededed; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06); }
.hb-wc8-tab:hover { color: #d4d4d4; }
.hb-wc8-tab:focus-visible, .hb-wc8-icon:focus-visible { outline: 2px solid var(--hb-wc8-accent); outline-offset: 1px; }
.hb-wc8-body { position: relative; min-height: 260px; padding: 18px 18px 20px; font-family: var(--font-mono), monospace; font-size: 13px; line-height: 1.75; }
.hb-wc8-cmd { display: flex; align-items: flex-start; gap: 10px; padding: 10px 10px 10px 12px; margin-bottom: 10px; border: 1px solid rgba(255, 255, 255, .07); border-radius: 10px; background: rgba(255, 255, 255, .025); }
.hb-wc8-ps { color: var(--hb-wc8-accent); user-select: none; }
.hb-wc8-text { flex: 1; min-width: 0; color: #ededed; overflow-wrap: anywhere; }
.hb-wc8-caret { display: inline-block; width: .55em; height: 1.1em; margin-left: 1px; vertical-align: -.18em; background: var(--hb-wc8-accent); animation: hb-wc8-blink 1s steps(1) infinite; }
.hb-wc8-tools { display: flex; gap: 4px; margin: -4px -4px -4px 0; }
.hb-wc8-icon { display: inline-grid; place-items: center; width: 30px; height: 30px; padding: 0; border: 1px solid rgba(255, 255, 255, .08); border-radius: 8px; background: #161616; color: #a1a1a1; cursor: pointer; transition: color .2s ease, border-color .2s ease, transform .15s ease; }
.hb-wc8-icon:hover { color: #fff; border-color: rgba(255, 255, 255, .2); }
.hb-wc8-icon:active { transform: scale(.92); }
.hb-wc8-icon[data-done="true"] { color: var(--hb-wc8-accent); border-color: color-mix(in srgb, var(--hb-wc8-accent) 50%, transparent); }
.hb-wc8-icon svg { width: 14px; height: 14px; }
.hb-wc8-out { margin: 0; padding: 0 2px; list-style: none; }
.hb-wc8-out li { white-space: pre-wrap; animation: hb-wc8-in .25s ease-out both; }
.hb-wc8-out li[data-tone="ok"] { color: #d4d4d4; }
.hb-wc8-out li[data-tone="ok"]::before { content: "\\2713  "; color: var(--hb-wc8-accent); }
.hb-wc8-out li[data-tone="dim"] { color: #666; }
.hb-wc8-out li[data-tone="info"] { color: #7dd3fc; }
.hb-wc8-out li[data-tone="accent"] { color: var(--hb-wc8-accent); font-weight: 600; }
.hb-wc8-prog { display: flex; align-items: center; gap: 10px; color: #8f8f8f; }
.hb-wc8-prog span:first-child { flex: 1; max-width: 220px; height: 6px; border-radius: 3px; background: #1f1f1f; overflow: hidden; }
.hb-wc8-prog i { display: block; height: 100%; width: var(--hb-wc8-p); border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-wc8-accent) 50%, #0a0a0a), var(--hb-wc8-accent)); transition: width .25s ease; font-style: normal; }
.hb-wc8-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 32px; }
.hb-wc8-btn { display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: 10px; font-size: 14.5px; font-weight: 600; text-decoration: none; transition: transform .2s ease, background .2s ease, border-color .2s ease; }
.hb-wc8-btn:focus-visible { outline: 2px solid var(--hb-wc8-accent); outline-offset: 3px; }
.hb-wc8-btn[data-kind="primary"] { background: #ededed; color: #0a0a0a; box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .12); }
.hb-wc8-btn[data-kind="primary"]:hover { background: #fff; transform: translateY(-1px); }
.hb-wc8-btn[data-kind="secondary"] { border: 1px solid rgba(255, 255, 255, .12); color: #ededed; }
.hb-wc8-btn[data-kind="secondary"]:hover { border-color: rgba(255, 255, 255, .28); }
.hb-wc8-btn svg { width: 15px; height: 15px; }
.hb-wc8-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-wc8-blink { 50% { opacity: 0; } }
@keyframes hb-wc8-in { from { opacity: 0; transform: translateY(4px); } }
@container (min-width: 720px) {
  .hb-wc8-inner { padding: 112px 32px; }
  .hb-wc8-body { padding: 22px 24px 26px; font-size: 13.5px; }
}
@container (max-width: 480px) {
  .hb-wc8-dots { display: none; }
  .hb-wc8-tabs { margin-left: 0; }
  .hb-wc8-tab { padding: 0 8px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc8 *, .hb-wc8 *::before, .hb-wc8 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultManagers: CtaTerminalInstallManager[] = [
  { id: "npm", label: "npm", command: "npx shadcn@latest add https://hyperblur.dev/r/cta-terminal-install.json" },
  { id: "pnpm", label: "pnpm", command: "pnpm dlx shadcn@latest add https://hyperblur.dev/r/cta-terminal-install.json" },
  { id: "yarn", label: "yarn", command: "yarn dlx shadcn@latest add https://hyperblur.dev/r/cta-terminal-install.json" },
  { id: "bun", label: "bun", command: "bunx --bun shadcn@latest add https://hyperblur.dev/r/cta-terminal-install.json" },
];

const defaultOutput: CtaTerminalInstallLine[] = [
  { text: "Checking registry", tone: "dim" },
  { text: "Updating files", tone: "dim" },
  { text: "Created src/components/hyperblur/cta-terminal-install.tsx", tone: "ok" },
  { text: "Import it and use it. No extra dependencies.", tone: "accent" },
  { text: "  Docs:  https://hyperblur.dev/effects/cta-terminal-install", tone: "info" },
];

export function CtaTerminalInstall({
  eyebrow = "MIT",
  title = "Up and running before your coffee cools.",
  subtitle = "One command adds the component to your project as plain source you own. No runtime and no lock-in.",
  managers = defaultManagers,
  output = defaultOutput,
  primary = { label: "Read the quickstart", href: "#" },
  secondary = { label: "Browse templates", href: "#" },
  autoPlay = true,
  typingSpeed = 38,
  onCommandCopy,
  accent = "#4ade80",
  className = "",
  style,
  ...rest
}: CtaTerminalInstallProps) {
  const [tab, setTab] = React.useState(0);
  const [run, setRun] = React.useState(0);
  const [typed, setTyped] = React.useState(Infinity);
  const [shown, setShown] = React.useState(Infinity);
  const [copied, setCopied] = React.useState(false);
  const root = React.useRef<HTMLElement>(null);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const command = managers[tab]?.command ?? "";

  React.useEffect(() => {
    if (!autoPlay) return;
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setRun((r) => r + 1);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay]);

  React.useEffect(() => {
    if (run === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      timers.push(
        setTimeout(() => {
          setTyped(Infinity);
          setShown(Infinity);
        }, 0),
      );
      return () => timers.forEach(clearTimeout);
    }
    const step = Math.max(8, typingSpeed);
    timers.push(
      setTimeout(() => {
        setTyped(0);
        setShown(0);
      }, 0),
    );
    for (let i = 1; i <= command.length; i++) {
      timers.push(setTimeout(() => setTyped(i), 120 + i * step + ((i * 7919) % 5) * 6));
    }
    const base = 120 + command.length * step + 380;
    for (let j = 1; j <= output.length + 1; j++) {
      timers.push(setTimeout(() => setShown(j), base + j * 260));
    }
    return () => timers.forEach(clearTimeout);
  }, [run, command, output.length, typingSpeed]);

  const choose = (i: number) => {
    setTab(i);
    setRun((r) => r + 1);
  };

  const tabKey = (e: React.KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % managers.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + managers.length) % managers.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = managers.length - 1;
    else return;
    e.preventDefault();
    choose(n);
    tabs.current[n]?.focus();
  };

  const copy = () => {
    navigator.clipboard?.writeText(command).catch(() => undefined);
    onCommandCopy?.(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const typing = typed < command.length;
  const progress = Math.min(1, shown / (output.length + 1));
  const installing = !typing && shown <= output.length;
  const vars = { "--hb-wc8-accent": accent, ...style } as React.CSSProperties;

  return (
    <section ref={root} className={`hb-wc8 ${className}`} style={vars} {...rest}>
      <style href="hb-cta-terminal-install" precedence="default">{css}</style>
      <div className="hb-wc8-inner">
        {eyebrow ? (
          <p className="hb-wc8-eyebrow">
            <b>{eyebrow}</b>
            copy-paste, one command
          </p>
        ) : null}
        <h2 className="hb-wc8-title">{title}</h2>
        {subtitle ? <p className="hb-wc8-sub">{subtitle}</p> : null}
        <div className="hb-wc8-term">
          <div className="hb-wc8-bar">
            <span className="hb-wc8-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <div className="hb-wc8-tabs" role="tablist" aria-label="Package manager">
              {managers.map((m, i) => (
                <button
                  key={m.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  className="hb-wc8-tab"
                  aria-selected={tab === i}
                  tabIndex={tab === i ? 0 : -1}
                  onClick={() => choose(i)}
                  onKeyDown={(e) => tabKey(e, i)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div className="hb-wc8-body" role="tabpanel">
            <div className="hb-wc8-cmd">
              <span className="hb-wc8-ps" aria-hidden="true">$</span>
              <span className="hb-wc8-text">
                <span aria-hidden="true">{command.slice(0, typed)}</span>
                <span className="hb-wc8-sr">{command}</span>
                {typing || shown > output.length ? <span className="hb-wc8-caret" aria-hidden="true" /> : null}
              </span>
              <span className="hb-wc8-tools">
                <button type="button" className="hb-wc8-icon" data-done={copied ? "true" : "false"} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
                  {copied ? (
                    <svg viewBox="0 0 14 14" aria-hidden="true">
                      <path d="M2.5 7.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 14 14" aria-hidden="true">
                      <path d="M4.5 4.5V2.5h7v7h-2M2.5 4.5h7v7h-7z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <button type="button" className="hb-wc8-icon" onClick={() => setRun((r) => r + 1)} aria-label="Replay">
                  <svg viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M2.5 7a4.5 4.5 0 104.5-4.5c-1.5 0-2.8.7-3.6 1.8M3 1.5v3h3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </span>
            </div>
            <ul className="hb-wc8-out" aria-live="polite">
              {!typing && shown > 0 && shown <= output.length ? (
                <li className="hb-wc8-prog" data-tone="dim">
                  <span>
                    <i style={{ "--hb-wc8-p": `${(progress * 100).toFixed(0)}%` } as React.CSSProperties} />
                  </span>
                  <span>{installing ? `${(progress * 100).toFixed(0)}%` : ""}</span>
                </li>
              ) : null}
              {output.slice(0, typing ? 0 : Math.min(shown, output.length)).map((l, i) => (
                <li key={`${run}-${i}`} data-tone={l.tone ?? "dim"}>
                  {l.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hb-wc8-actions">
          {primary ? (
            <a className="hb-wc8-btn" data-kind="primary" href={primary.href}>
              {primary.label}
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
          {secondary ? (
            <a className="hb-wc8-btn" data-kind="secondary" href={secondary.href}>
              {secondary.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
