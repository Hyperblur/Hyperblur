"use client";

import * as React from "react";

export interface DownloadInstallManager {
  id: string;
  label: string;
  command: string;
}

export interface DownloadInstallRequirement {
  label: string;
  detail?: string;
}

export interface DownloadInstallLink {
  label: string;
  href: string;
}

export interface DownloadInstallTabsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  managers?: DownloadInstallManager[];
  manager?: string;
  defaultManager?: string;
  onManagerChange?: (id: string) => void;
  onCommandCopy?: (command: string) => void;
  verifyCommand?: string;
  verifyOutput?: string;
  startCommand?: string;
  requirements?: DownloadInstallRequirement[];
  version?: string;
  license?: string;
  links?: DownloadInstallLink[];
  accent?: string;
}

const css = `
@keyframes hb-kh7-type { from { width: 0; } }
@keyframes hb-kh7-blink { 50% { opacity: 0; } }
@keyframes hb-kh7-pop {
  0% { transform: scale(0.6); opacity: 0; }
  60% { transform: scale(1.12); opacity: 1; }
  100% { transform: scale(1); }
}
.hb-kh7 {
  --hb-kh7-accent: #10b981;
  --hb-kh7-ink: #161616;
  --hb-kh7-muted: #6b6b6b;
  --hb-kh7-mono: var(--font-mono, ui-monospace), SFMono-Regular, Menlo, Consolas, monospace;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #fbfbf9;
  color: var(--hb-kh7-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kh7 *, .hb-kh7 *::before, .hb-kh7 *::after { box-sizing: border-box; }
.hb-kh7::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(40% 50% at 80% 30%, color-mix(in srgb, var(--hb-kh7-accent) 12%, transparent), transparent 70%),
    linear-gradient(rgba(0, 0, 0, 0.035) 1px, transparent 1px) 0 0 / 100% 32px;
  mask-image: linear-gradient(90deg, transparent, #000 40%, #000 70%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 40%, #000 70%, transparent);
}
.hb-kh7-in {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px 80px;
}
.hb-kh7-copy { min-width: 0; }
.hb-kh7-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: color-mix(in srgb, var(--hb-kh7-accent) 70%, #000000);
  font-family: var(--hb-kh7-mono);
  font-size: 12.5px;
  font-weight: 500;
}
.hb-kh7-eyebrow::before { content: ">"; opacity: 0.6; }
.hb-kh7-title {
  margin: 14px 0 0;
  font-size: clamp(32px, 4.6cqw, 48px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.04em;
  text-wrap: balance;
}
.hb-kh7-sub {
  max-width: 460px;
  margin: 16px 0 0;
  color: var(--hb-kh7-muted);
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kh7-reqh {
  margin: 30px 0 0;
  color: var(--hb-kh7-ink);
  font-size: 13px;
  font-weight: 600;
}
.hb-kh7-reqs {
  display: grid;
  gap: 2px;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}
.hb-kh7-req {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  font-size: 14.5px;
}
.hb-kh7-req:last-child { border-bottom: 1px solid rgba(0, 0, 0, 0.07); }
.hb-kh7-ok {
  display: grid;
  flex: none;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--hb-kh7-accent) 15%, #ffffff);
  color: color-mix(in srgb, var(--hb-kh7-accent) 75%, #000000);
}
.hb-kh7-ok svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh7-req span:nth-child(2) { flex: 1; min-width: 0; }
.hb-kh7-req small { color: var(--hb-kh7-muted); font-size: 12.5px; white-space: nowrap; }
.hb-kh7-links { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: 22px; font-size: 14px; }
.hb-kh7-links a {
  color: var(--hb-kh7-ink);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  transition: border-color 0.2s ease, color 0.2s ease;
}
.hb-kh7-links a:hover { border-color: var(--hb-kh7-accent); color: color-mix(in srgb, var(--hb-kh7-accent) 70%, #000000); }
.hb-kh7-links a:focus-visible { outline: 2px solid var(--hb-kh7-accent); outline-offset: 3px; border-radius: 2px; }
.hb-kh7-card {
  position: relative;
  min-width: 0;
  align-self: start;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 1) inset, 0 1px 2px rgba(0, 0, 0, 0.04), 0 30px 60px -36px rgba(0, 0, 0, 0.3);
}
.hb-kh7-tabs {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--hb-kh7-n), minmax(0, 1fr));
  padding: 4px;
  border-radius: 14px;
  background: #f2f1ed;
}
.hb-kh7-ind {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc((100% - 8px) / var(--hb-kh7-n));
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 10px -4px rgba(0, 0, 0, 0.12);
  transform: translateX(calc(var(--hb-kh7-i) * 100%));
  transition: transform 0.35s cubic-bezier(0.3, 0.9, 0.3, 1);
}
.hb-kh7-tab {
  position: relative;
  z-index: 1;
  height: 34px;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--hb-kh7-muted);
  font-family: var(--hb-kh7-mono);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
}
.hb-kh7-tab:hover { color: var(--hb-kh7-ink); }
.hb-kh7-tab[aria-selected="true"] { color: var(--hb-kh7-ink); }
.hb-kh7-tab:focus-visible { outline: 2px solid var(--hb-kh7-accent); outline-offset: -2px; }
.hb-kh7-steps { display: grid; gap: 14px; padding: 18px 12px 8px; }
.hb-kh7-step { min-width: 0; }
.hb-kh7-sl {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: var(--hb-kh7-muted);
  font-size: 12.5px;
  font-weight: 500;
}
.hb-kh7-sl b {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--hb-kh7-ink);
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
}
.hb-kh7-box {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  height: 50px;
  padding: 0 6px 0 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background: #f8f7f4;
  font-family: var(--hb-kh7-mono);
  font-size: 13.5px;
}
.hb-kh7-box[data-main="true"] {
  height: 56px;
  border-color: color-mix(in srgb, var(--hb-kh7-accent) 35%, rgba(0, 0, 0, 0.08));
  background: color-mix(in srgb, var(--hb-kh7-accent) 5%, #ffffff);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kh7-accent) 9%, transparent);
}
.hb-kh7-ps { flex: none; color: color-mix(in srgb, var(--hb-kh7-accent) 75%, #000000); user-select: none; }
.hb-kh7-cmd {
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 0;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
}
.hb-kh7-cmd::-webkit-scrollbar { display: none; }
.hb-kh7-type {
  display: inline-block;
  flex: none;
  overflow: hidden;
  width: calc(var(--hb-kh7-len) * 1ch);
  white-space: pre;
  vertical-align: bottom;
  animation: hb-kh7-type calc(var(--hb-kh7-len) * 28ms) steps(var(--hb-kh7-len), end) both;
}
.hb-kh7-caret {
  display: inline-block;
  flex: none;
  width: 8px;
  height: 17px;
  margin-left: 2px;
  background: color-mix(in srgb, var(--hb-kh7-accent) 70%, #000000);
  animation: hb-kh7-blink 1s steps(1) infinite;
}
.hb-kh7-out {
  margin: 6px 0 0 14px;
  color: var(--hb-kh7-muted);
  font-family: var(--hb-kh7-mono);
  font-size: 12.5px;
}
.hb-kh7-copy {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 82px;
  height: 36px;
  margin: 0;
  padding: 0 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 9px;
  background: #ffffff;
  color: var(--hb-kh7-ink);
  font: inherit;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease, transform 0.12s ease;
}
.hb-kh7-copy:hover { border-color: rgba(0, 0, 0, 0.18); }
.hb-kh7-copy:active { transform: scale(0.96); }
.hb-kh7-copy:focus-visible { outline: 2px solid var(--hb-kh7-accent); outline-offset: 2px; }
.hb-kh7-copy[data-done="true"] {
  border-color: transparent;
  background: var(--hb-kh7-accent);
  color: #ffffff;
}
.hb-kh7-copy svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh7-copy[data-done="true"] svg { animation: hb-kh7-pop 0.35s ease both; }
.hb-kh7-box:not([data-main="true"]) .hb-kh7-copy { min-width: 0; width: 36px; padding: 0; }
.hb-kh7-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 14px;
  margin-top: 10px;
  padding: 12px 12px 6px;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  color: var(--hb-kh7-muted);
  font-size: 12.5px;
}
.hb-kh7-ver { display: inline-flex; align-items: center; gap: 8px; }
.hb-kh7-ver::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--hb-kh7-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-kh7-accent) 18%, transparent);
}
.hb-kh7-ver b { color: var(--hb-kh7-ink); font-weight: 600; font-family: var(--hb-kh7-mono); }
.hb-kh7-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@container (min-width: 720px) {
  .hb-kh7-in { padding: 96px 40px 104px; }
  .hb-kh7-steps { padding: 20px 16px 8px; }
}
@container (min-width: 860px) {
  .hb-kh7-in { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); align-items: center; gap: 64px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kh7 *, .hb-kh7 *::before, .hb-kh7 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultManagers: DownloadInstallManager[] = [
  { id: "npm", label: "npm", command: "npx shadcn@latest add https://hyperblur.dev/r/download-install-tabs.json" },
  { id: "pnpm", label: "pnpm", command: "pnpm dlx shadcn@latest add https://hyperblur.dev/r/download-install-tabs.json" },
  { id: "yarn", label: "yarn", command: "yarn dlx shadcn@latest add https://hyperblur.dev/r/download-install-tabs.json" },
  { id: "bun", label: "bun", command: "bunx --bun shadcn@latest add https://hyperblur.dev/r/download-install-tabs.json" },
];

const defaultRequirements: DownloadInstallRequirement[] = [
  { label: "Node.js 18 or later", detail: "LTS recommended" },
  { label: "A React project with Tailwind CSS", detail: "Next.js, Vite or Remix" },
  { label: "shadcn CLI initialized", detail: "components.json in the project" },
  { label: "Any package manager", detail: "npm, pnpm, yarn or bun" },
];

const defaultLinks: DownloadInstallLink[] = [
  { label: "Read the installation guide", href: "https://hyperblur.dev/docs/installation" },
  { label: "Browse the catalog", href: "https://hyperblur.dev/effects" },
  { label: "Source code", href: "https://github.com/Hyperblur/Hyperblur" },
];

function CopyIcon({ done }: { done: boolean }) {
  if (done) {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3.5 8.5l3 3 6-7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.8" />
      <path d="M10.5 3.5V3A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
    </svg>
  );
}

export function DownloadInstallTabs({
  eyebrow = "shadcn cli",
  title = "Add it to your project in one line",
  subtitle = "Pick your package manager, paste the command and the component lands in your project as plain source. No account and no runtime.",
  managers = defaultManagers,
  manager,
  defaultManager,
  onManagerChange,
  onCommandCopy,
  verifyCommand = "ls src/components/hyperblur/download-install-tabs.tsx",
  verifyOutput = "src/components/hyperblur/download-install-tabs.tsx",
  startCommand = "npm run dev",
  requirements = defaultRequirements,
  version = "998 items",
  license = "MIT license",
  links = defaultLinks,
  accent = "#10b981",
  className,
  style,
  ...rest
}: DownloadInstallTabsProps) {
  const [inner, setInner] = React.useState(defaultManager ?? managers[0]?.id ?? "");
  const current = manager ?? inner;
  const index = Math.max(
    0,
    managers.findIndex((m) => m.id === current),
  );
  const active = managers[index];
  const [copied, setCopied] = React.useState<string | null>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const pick = (i: number) => {
    const m = managers[i];
    if (!m) return;
    if (manager === undefined) setInner(m.id);
    onManagerChange?.(m.id);
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % managers.length;
    if (e.key === "ArrowLeft") next = (i - 1 + managers.length) % managers.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = managers.length - 1;
    if (next < 0) return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    pick(next);
  };

  const copy = (key: string, text: string) => {
    const done = () => {
      setCopied(key);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(null), 1600);
    };
    onCommandCopy?.(text);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      done();
    }
  };

  const vars = {
    "--hb-kh7-accent": accent,
    "--hb-kh7-n": String(Math.max(managers.length, 1)),
    "--hb-kh7-i": String(index),
  } as React.CSSProperties;

  return (
    <section className={["hb-kh7", className].filter(Boolean).join(" ")} style={{ ...vars, ...style }} {...rest}>
      <style href="hb-download-install-tabs" precedence="default">{css}</style>
      <div className="hb-kh7-in">
        <div className="hb-kh7-copy">
          {eyebrow ? <div className="hb-kh7-eyebrow">{eyebrow}</div> : null}
          <h2 className="hb-kh7-title">{title}</h2>
          {subtitle ? <p className="hb-kh7-sub">{subtitle}</p> : null}
          {requirements.length ? (
            <>
              <h3 className="hb-kh7-reqh">Requirements</h3>
              <ul className="hb-kh7-reqs">
                {requirements.map((r) => (
                  <li key={r.label} className="hb-kh7-req">
                    <span className="hb-kh7-ok" aria-hidden="true">
                      <svg viewBox="0 0 16 16">
                        <path d="M3.5 8.5l3 3 6-7" />
                      </svg>
                    </span>
                    <span>{r.label}</span>
                    {r.detail ? <small>{r.detail}</small> : null}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {links.length ? (
            <div className="hb-kh7-links">
              {links.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <div className="hb-kh7-card">
          <div className="hb-kh7-tabs" role="tablist" aria-label="Package manager">
            <span className="hb-kh7-ind" aria-hidden="true" />
            {managers.map((m, i) => (
              <button
                key={m.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${m.id}`}
                aria-selected={i === index}
                aria-controls={`${uid}-panel`}
                tabIndex={i === index ? 0 : -1}
                className="hb-kh7-tab"
                onClick={() => pick(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="hb-kh7-steps" role="tabpanel" id={`${uid}-panel`} aria-labelledby={active ? `${uid}-tab-${active.id}` : undefined}>
            {active ? (
              <div className="hb-kh7-step">
                <div className="hb-kh7-sl">
                  <b>1</b>Install
                </div>
                <div className="hb-kh7-box" data-main="true">
                  <span className="hb-kh7-ps" aria-hidden="true">$</span>
                  <code className="hb-kh7-cmd">
                    <span
                      key={active.id}
                      className="hb-kh7-type"
                      style={{ ["--hb-kh7-len" as string]: String(active.command.length) } as React.CSSProperties}
                    >
                      {active.command}
                    </span>
                    <span className="hb-kh7-caret" aria-hidden="true" />
                  </code>
                  <button
                    type="button"
                    className="hb-kh7-copy"
                    data-done={copied === "main" ? "true" : "false"}
                    aria-label={copied === "main" ? "Command copied" : `Copy ${active.label} command`}
                    onClick={() => copy("main", active.command)}
                  >
                    <CopyIcon done={copied === "main"} />
                    {copied === "main" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            ) : null}
            {verifyCommand ? (
              <div className="hb-kh7-step">
                <div className="hb-kh7-sl">
                  <b>2</b>Check the file
                </div>
                <div className="hb-kh7-box">
                  <span className="hb-kh7-ps" aria-hidden="true">$</span>
                  <code className="hb-kh7-cmd">{verifyCommand}</code>
                  <button
                    type="button"
                    className="hb-kh7-copy"
                    data-done={copied === "verify" ? "true" : "false"}
                    aria-label={copied === "verify" ? "Command copied" : "Copy check command"}
                    onClick={() => copy("verify", verifyCommand)}
                  >
                    <CopyIcon done={copied === "verify"} />
                  </button>
                </div>
                {verifyOutput ? <div className="hb-kh7-out">{verifyOutput}</div> : null}
              </div>
            ) : null}
            {startCommand ? (
              <div className="hb-kh7-step">
                <div className="hb-kh7-sl">
                  <b>3</b>Start your project
                </div>
                <div className="hb-kh7-box">
                  <span className="hb-kh7-ps" aria-hidden="true">$</span>
                  <code className="hb-kh7-cmd">{startCommand}</code>
                  <button
                    type="button"
                    className="hb-kh7-copy"
                    data-done={copied === "start" ? "true" : "false"}
                    aria-label={copied === "start" ? "Command copied" : "Copy start command"}
                    onClick={() => copy("start", startCommand)}
                  >
                    <CopyIcon done={copied === "start"} />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="hb-kh7-foot">
            <span className="hb-kh7-ver">
              Catalog <b>{version}</b>
            </span>
            {license ? <span>{license}</span> : null}
          </div>
          <span className="hb-kh7-sr" aria-live="polite">
            {copied ? "Copied to clipboard" : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
