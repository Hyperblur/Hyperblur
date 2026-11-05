"use client";

import * as React from "react";

export interface HowStepperStep {
  title: string;
  description: string;
}

export interface HowStepperScreensProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: HowStepperStep[];
  step?: number;
  defaultStep?: number;
  onStepChange?: (index: number) => void;
  autoplay?: boolean;
  interval?: number;
  accent?: string;
}

const defaultSteps: HowStepperStep[] = [
  { title: "Connect your repository", description: "Pick a GitHub or GitLab repo. We read the framework and set build settings for you." },
  { title: "Choose a starting point", description: "Start from a template or keep your own setup. Environment variables import from your .env file." },
  { title: "Invite your team", description: "Add reviewers by email. Everyone gets a preview link on every pull request." },
  { title: "Ship to production", description: "Merge to main and the build goes live on the edge in about forty seconds." },
];

const css = `
.hb-yj5 {
  --hb-yj5-accent: #22d3ee;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yj5 *, .hb-yj5 *::before, .hb-yj5 *::after { box-sizing: border-box; }
.hb-yj5::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(45% 55% at 75% 55%, color-mix(in srgb, var(--hb-yj5-accent) 10%, transparent), transparent 70%),
    radial-gradient(30% 30% at 10% 10%, rgba(255, 255, 255, .04), transparent 70%);
  pointer-events: none;
}
.hb-yj5-inner { max-width: 1120px; margin: 0 auto; padding: 72px 20px; }
@container (min-width: 820px) { .hb-yj5-inner { padding: 100px 32px; } }
.hb-yj5-head { max-width: 640px; margin-bottom: 44px; }
.hb-yj5-eyebrow {
  margin: 0 0 14px;
  color: var(--hb-yj5-accent);
  font: 500 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-yj5-title { margin: 0; font-size: clamp(30px, 4.6cqw, 46px); line-height: 1.06; letter-spacing: -.03em; font-weight: 650; text-wrap: balance; }
.hb-yj5-sub { margin: 14px 0 0; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-yj5-body { display: grid; gap: 28px; }
@container (min-width: 820px) { .hb-yj5-body { grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 48px; align-items: center; } }
.hb-yj5-list { display: grid; gap: 6px; }
.hb-yj5-step {
  position: relative;
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 14px;
  width: 100%;
  padding: 16px;
  border: 1px solid transparent;
  border-radius: 16px;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background .3s ease, border-color .3s ease;
}
.hb-yj5-step:hover { background: rgba(255, 255, 255, .03); }
.hb-yj5-step:focus-visible { outline: 2px solid var(--hb-yj5-accent); outline-offset: 2px; }
.hb-yj5-step[aria-selected="true"] {
  border-color: rgba(255, 255, 255, .08);
  background: linear-gradient(180deg, #141414, #101010);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
}
.hb-yj5-num {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 10px;
  color: #8f8f8f;
  font: 600 13px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  transition: all .3s ease;
}
.hb-yj5-step[aria-selected="true"] .hb-yj5-num { border-color: var(--hb-yj5-accent); background: color-mix(in srgb, var(--hb-yj5-accent) 14%, transparent); color: var(--hb-yj5-accent); }
.hb-yj5-done .hb-yj5-num { color: #ededed; }
.hb-yj5-step-title { display: block; padding-top: 7px; font-size: 16px; font-weight: 600; letter-spacing: -.01em; color: #a1a1a1; transition: color .3s ease; }
.hb-yj5-step[aria-selected="true"] .hb-yj5-step-title { color: #ededed; }
.hb-yj5-desc {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .4s cubic-bezier(.2, .8, .2, 1);
}
.hb-yj5-step[aria-selected="true"] .hb-yj5-desc { grid-template-rows: 1fr; }
.hb-yj5-desc > span { overflow: hidden; color: #8f8f8f; font-size: 14px; line-height: 1.55; }
.hb-yj5-desc > span > span { display: block; padding-top: 6px; }
.hb-yj5-prog {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: rgba(255, 255, 255, .06);
  overflow: hidden;
  opacity: 0;
}
.hb-yj5-step[aria-selected="true"] .hb-yj5-prog { opacity: 1; }
.hb-yj5-prog i {
  display: block;
  height: 100%;
  background: var(--hb-yj5-accent);
  transform-origin: left;
  transform: scaleX(0);
}
.hb-yj5-run .hb-yj5-step[aria-selected="true"] .hb-yj5-prog i { animation: hb-yj5-fill var(--hb-yj5-dur, 5s) linear forwards; }
.hb-yj5-paused .hb-yj5-prog i { animation-play-state: paused !important; }
.hb-yj5-window {
  position: relative;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background: linear-gradient(180deg, #131313, #0c0c0c);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 40px 80px -40px rgba(0, 0, 0, .9), 0 0 0 6px rgba(255, 255, 255, .02);
  overflow: hidden;
}
.hb-yj5-chrome {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, .06);
}
.hb-yj5-chrome i { width: 10px; height: 10px; border-radius: 50%; background: #262626; }
.hb-yj5-url {
  flex: 1;
  max-width: 300px;
  margin: 0 auto;
  padding: 5px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, .04);
  color: #8f8f8f;
  font: 500 11.5px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hb-yj5-stage { position: relative; min-height: 372px; }
@container (max-width: 560px) { .hb-yj5-row .hb-yj5-meta { display: none; } .hb-yj5-thumb { height: 54px; } }
.hb-yj5-screen {
  position: absolute;
  inset: 0;
  padding: 22px;
  opacity: 0;
  transform: translateY(14px) scale(.985);
  filter: blur(6px);
  transition: opacity .45s ease, transform .55s cubic-bezier(.2, .8, .2, 1), filter .45s ease;
  pointer-events: none;
}
.hb-yj5-screen[data-on="true"] { opacity: 1; transform: none; filter: none; pointer-events: auto; }
.hb-yj5-label { margin: 0 0 14px; color: #8f8f8f; font-size: 12px; font-weight: 500; letter-spacing: .04em; text-transform: uppercase; }
.hb-yj5-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, .06);
  border-radius: 12px;
  background: rgba(255, 255, 255, .02);
  font-size: 14px;
}
.hb-yj5-row + .hb-yj5-row { margin-top: 8px; }
.hb-yj5-ico {
  flex: none;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #1c1c1c;
  color: #a1a1a1;
}
.hb-yj5-meta { margin-left: auto; color: #6b6b6b; font-size: 12px; white-space: nowrap; }
.hb-yj5-pill {
  margin-left: auto;
  padding: 6px 12px;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.hb-yj5-pill-ghost { background: rgba(255, 255, 255, .06); color: #a1a1a1; }
.hb-yj5-tpls { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.hb-yj5-tpl {
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, .06);
  border-radius: 12px;
  background: rgba(255, 255, 255, .02);
  font-size: 13px;
  font-weight: 500;
}
.hb-yj5-tpl-on { border-color: var(--hb-yj5-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-yj5-accent) 18%, transparent); }
.hb-yj5-thumb { height: 74px; margin-bottom: 9px; border-radius: 8px; }
.hb-yj5-tpl small { display: block; margin-top: 2px; color: #6b6b6b; font-size: 11.5px; font-weight: 400; }
.hb-yj5-invite { display: flex; gap: 8px; margin-bottom: 14px; }
.hb-yj5-input {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 10px;
  background: #0a0a0a;
  color: #8f8f8f;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
}
.hb-yj5-input::after { content: ""; display: inline-block; width: 1px; height: 14px; margin-left: 2px; vertical-align: -2px; background: var(--hb-yj5-accent); animation: hb-yj5-caret 1s steps(1) infinite; }
.hb-yj5-av { flex: none; display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; color: #0a0a0a; font-size: 11px; font-weight: 700; }
.hb-yj5-log {
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, .06);
  border-radius: 12px;
  background: #080808;
  font: 400 12.5px/1.9 ui-monospace, SFMono-Regular, Menlo, monospace;
  color: #a1a1a1;
}
.hb-yj5-log div { opacity: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yj5-screen[data-on="true"] .hb-yj5-log div { animation: hb-yj5-line .35s ease forwards; }
.hb-yj5-ok { color: #4ade80; }
.hb-yj5-live {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--hb-yj5-accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--hb-yj5-accent) 30%, transparent);
  font-size: 13px;
}
.hb-yj5-live b { color: var(--hb-yj5-accent); font-weight: 600; }
.hb-yj5-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 10px #4ade80; }
@keyframes hb-yj5-fill { to { transform: scaleX(1); } }
@keyframes hb-yj5-caret { 50% { opacity: 0; } }
@keyframes hb-yj5-line { to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-yj5 *, .hb-yj5 *::before, .hb-yj5 *::after { animation: none !important; transition: none !important; }
  .hb-yj5-log div { opacity: 1; }
}
`;

const repos = [
  { name: "acme/storefront", meta: "Next.js · 2h ago", on: true },
  { name: "acme/docs", meta: "Astro · yesterday", on: false },
  { name: "acme/api-gateway", meta: "Node · 3d ago", on: false },
  { name: "acme/design-tokens", meta: "Vite · 1w ago", on: false },
];

const templates = [
  { name: "Commerce", note: "Cart, checkout, CMS", bg: "linear-gradient(135deg, #0e7490, #164e63 60%, #0a0a0a)" },
  { name: "SaaS starter", note: "Auth, billing, dashboard", bg: "linear-gradient(135deg, #6d28d9, #312e81 60%, #0a0a0a)" },
  { name: "Docs", note: "MDX, search, versioning", bg: "linear-gradient(135deg, #b45309, #78350f 60%, #0a0a0a)" },
  { name: "Blank", note: "Your own setup", bg: "repeating-linear-gradient(45deg, #161616 0 8px, #121212 8px 16px)" },
];

const people = [
  { name: "Priya Nair", email: "priya@acme.dev", role: "Owner", c: "#22d3ee" },
  { name: "Jonas Weber", email: "jonas@acme.dev", role: "Reviewer", c: "#a78bfa" },
  { name: "Léa Martin", email: "lea@acme.dev", role: "Pending", c: "#fbbf24" },
];

const logLines = [
  ["$", "git push origin main"],
  ["", "Cloning acme/storefront at 8f3c2a1"],
  ["", "Installing 412 packages in 6.2s"],
  ["", "Building 38 routes, 4 edge functions"],
  ["ok", "Compiled successfully in 21.4s"],
  ["ok", "Deployed to 18 regions"],
];

function Folder() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h2.8l1.4 1.5h4.8A1.5 1.5 0 0 1 14 6v5.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5v-7Z" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function Screen({ kind }: { kind: number }) {
  if (kind === 0) {
    return (
      <>
        <p className="hb-yj5-label">Import a repository</p>
        {repos.map((r) => (
          <div className="hb-yj5-row" key={r.name}>
            <span className="hb-yj5-ico">
              <Folder />
            </span>
            <span>{r.name}</span>
            <span className="hb-yj5-meta">{r.meta}</span>
            <span className={r.on ? "hb-yj5-pill" : "hb-yj5-pill hb-yj5-pill-ghost"}>{r.on ? "Import" : "Select"}</span>
          </div>
        ))}
      </>
    );
  }
  if (kind === 1) {
    return (
      <>
        <p className="hb-yj5-label">Pick a template</p>
        <div className="hb-yj5-tpls">
          {templates.map((t, i) => (
            <div className={i === 1 ? "hb-yj5-tpl hb-yj5-tpl-on" : "hb-yj5-tpl"} key={t.name}>
              <div className="hb-yj5-thumb" style={{ background: t.bg }} />
              {t.name}
              <small>{t.note}</small>
            </div>
          ))}
        </div>
      </>
    );
  }
  if (kind === 2) {
    return (
      <>
        <p className="hb-yj5-label">Team · 3 of 10 seats</p>
        <div className="hb-yj5-invite">
          <span className="hb-yj5-input">marcus@acme.dev</span>
          <span className="hb-yj5-pill" style={{ marginLeft: 0, alignSelf: "center" }}>
            Send invite
          </span>
        </div>
        {people.map((p) => (
          <div className="hb-yj5-row" key={p.email}>
            <span className="hb-yj5-av" style={{ background: p.c }}>
              {p.name
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </span>
            <span>
              {p.name}
              <span style={{ display: "block", color: "#6b6b6b", fontSize: 12 }}>{p.email}</span>
            </span>
            <span className="hb-yj5-meta">{p.role}</span>
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      <p className="hb-yj5-label">Production deployment</p>
      <div className="hb-yj5-log">
        {logLines.map(([k, t], i) => (
          <div key={i} style={{ animationDelay: `${(i * 0.22).toFixed(2)}s` }}>
            {k === "ok" ? <span className="hb-yj5-ok">✓ </span> : k ? <span style={{ color: "#ededed" }}>{k} </span> : <span>  </span>}
            {t}
          </div>
        ))}
      </div>
      <div className="hb-yj5-live">
        <span className="hb-yj5-dot" />
        Live at <b>storefront.acme.dev</b>
        <span className="hb-yj5-meta">41s total</span>
      </div>
    </>
  );
}

const urls = ["app.shipline.dev/new", "app.shipline.dev/new/template", "app.shipline.dev/acme/team", "app.shipline.dev/acme/deployments"];

export function HowStepperScreens({
  eyebrow = "How it works",
  title = "From repository to production in four steps",
  subtitle = "No config files to write and no servers to babysit. Click through the flow to see each screen.",
  steps = defaultSteps,
  step,
  defaultStep = 0,
  onStepChange,
  autoplay = true,
  interval = 5000,
  accent = "#22d3ee",
  className,
  style,
  ...rest
}: HowStepperScreensProps) {
  const [inner, setInner] = React.useState(defaultStep);
  const [paused, setPaused] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);
  const current = step ?? inner;
  const n = steps.length;
  const baseId = React.useId();

  const go = React.useCallback(
    (i: number) => {
      const next = ((i % n) + n) % n;
      if (step === undefined) setInner(next);
      setCycle((c) => c + 1);
      onStepChange?.(next);
    },
    [n, step, onStepChange],
  );

  React.useEffect(() => {
    if (!autoplay || paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go(current + 1), Math.max(1500, interval));
    return () => window.clearTimeout(id);
  }, [autoplay, paused, current, interval, go, n, cycle]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in map) {
      e.preventDefault();
      go(current + map[e.key]);
      const btns = e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]");
      btns[((current + map[e.key]) % n + n) % n]?.focus();
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const t = e.key === "Home" ? 0 : n - 1;
      go(t);
      e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]")[t]?.focus();
    }
  };

  const rootClass = ["hb-yj5", autoplay ? "hb-yj5-run" : "", paused ? "hb-yj5-paused" : "", className].filter(Boolean).join(" ");

  return (
    <section
      className={rootClass}
      style={{ "--hb-yj5-accent": accent, "--hb-yj5-dur": `${Math.max(1500, interval)}ms`, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-how-stepper-screens" precedence="default">{css}</style>
      <div className="hb-yj5-inner">
        <div className="hb-yj5-head">
          {eyebrow ? <p className="hb-yj5-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-yj5-title">{title}</h2>
          {subtitle ? <p className="hb-yj5-sub">{subtitle}</p> : null}
        </div>
        <div
          className="hb-yj5-body"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => {
            setPaused(false);
            setCycle((c) => c + 1);
          }}
        >
          <div className="hb-yj5-list" role="tablist" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {steps.map((s, i) => (
              <button
                key={s.title + i}
                type="button"
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={current === i}
                aria-controls={`${baseId}-panel`}
                tabIndex={current === i ? 0 : -1}
                className={i < current ? "hb-yj5-step hb-yj5-done" : "hb-yj5-step"}
                onClick={() => go(i)}
              >
                <span className="hb-yj5-num">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="hb-yj5-step-title">{s.title}</span>
                  <span className="hb-yj5-desc">
                    <span>
                      <span>{s.description}</span>
                    </span>
                  </span>
                </span>
                <span className="hb-yj5-prog" aria-hidden="true">
                  <i key={`${current}-${cycle}`} />
                </span>
              </button>
            ))}
          </div>
          <div className="hb-yj5-window" id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${current}`}>
            <div className="hb-yj5-chrome" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="hb-yj5-url">{urls[current % 4]}</span>
            </div>
            <div className="hb-yj5-stage">
              {steps.map((_, i) => (
                <div key={i} className="hb-yj5-screen" data-on={current === i} aria-hidden={current !== i}>
                  <Screen kind={i % 4} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
