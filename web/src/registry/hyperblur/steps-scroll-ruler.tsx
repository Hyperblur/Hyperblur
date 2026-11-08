"use client";

import * as React from "react";

export interface RulerStep {
  when: string;
  title: string;
  body: string;
  owner: string;
  deliverables: string[];
}

export interface StepsScrollRulerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: RulerStep[];
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  accent?: string;
  onStepReach?: (index: number) => void;
}

const defaultSteps: RulerStep[] = [
  { when: "Day 1", title: "Kickoff and access", body: "A 45 minute call to agree on scope, then SSO, roles and a sandbox workspace set up before you hang up.", owner: "Solutions lead", deliverables: ["SSO live", "Sandbox"] },
  { when: "Week 1", title: "Import your history", body: "We move three years of tickets, contacts and attachments from your current tool, with a field map you sign off.", owner: "Migration engineer", deliverables: ["Field map", "Test import"] },
  { when: "Week 2", title: "Rebuild the workflows", body: "Routing rules, SLAs and macros recreated and tested against last month's real tickets, not demo data.", owner: "Workflow specialist", deliverables: ["31 rules", "SLA report"] },
  { when: "Week 3", title: "Train the team", body: "Two live sessions per shift plus a recorded walkthrough. Agents work a shadow queue for three days.", owner: "Enablement", deliverables: ["4 sessions", "Shadow queue"] },
  { when: "Week 4", title: "Go live", body: "We switch the inbound address at the quietest hour you choose and stay on a shared channel for the first week.", owner: "Solutions lead", deliverables: ["Cutover", "Hypercare"] },
  { when: "Day 60", title: "Review and tune", body: "A report on response times before and after, with the five changes we would make next, in priority order.", owner: "Account manager", deliverables: ["Impact report"] },
];

const css = `
.hb-we6 {
  --hb-we6-accent: #f5b83d;
  --hb-we6-p: 0;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-we6 *, .hb-we6 *::before, .hb-we6 *::after { box-sizing: border-box; }
.hb-we6-inner { display: grid; gap: clamp(28px, 5cqi, 64px); max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(18px, 4cqi, 40px); }
.hb-we6-aside { position: sticky; top: 0; z-index: 2; align-self: start; display: grid; gap: 18px; padding: 16px 0; background: linear-gradient(#0a0a0a 80%, transparent); }
.hb-we6-eyebrow { margin: 0; color: #8f8f8f; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; }
.hb-we6-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(26px, 4cqi, 44px); font-weight: 600; line-height: 1.05; letter-spacing: -.035em; text-wrap: balance; }
.hb-we6-sub { margin: 0; color: #a1a1a1; font-size: 15px; line-height: 1.6; max-width: 40ch; }
.hb-we6-meter { display: flex; align-items: flex-end; gap: 16px; padding: 18px 20px; border-radius: 18px; background: linear-gradient(180deg, #141414, #0f0f0f); box-shadow: inset 0 0 0 1px rgba(255,255,255,.07), inset 0 1px 0 rgba(255,255,255,.05); }
.hb-we6-num { display: flex; align-items: flex-start; font-family: var(--font-grotesk, inherit); font-size: clamp(48px, 7cqi, 76px); font-weight: 600; line-height: 1; letter-spacing: -.05em; font-variant-numeric: tabular-nums; }
.hb-we6-digit { position: relative; display: block; width: .62em; transition: width .3s ease; height: 1em; overflow: hidden; }
.hb-we6-strip { position: absolute; left: 0; top: 0; display: flex; flex-direction: column; transform: translateY(calc(var(--hb-we6-d) * -1em)); }
.hb-we6-strip span { display: block; height: 1em; text-align: center; }
.hb-we6-digit:first-child { width: var(--hb-we6-w2, 0em); }
.hb-we6-pct { margin-top: .12em; font-size: .4em; color: var(--hb-we6-accent); letter-spacing: 0; }
.hb-we6-ml { display: grid; gap: 4px; padding-bottom: 8px; min-width: 0; }
.hb-we6-ml span { color: #8f8f8f; font-size: 12px; }
.hb-we6-ml b { font-size: 15px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-we6-mini { display: flex; gap: 4px; }
.hb-we6-mini i { flex: 1; height: 4px; border-radius: 4px; background: #262626; font-style: normal; position: relative; overflow: hidden; }
.hb-we6-mini i::after { content: ""; position: absolute; inset: 0; background: var(--hb-we6-accent); transform-origin: left; transform: scaleX(clamp(0, calc((var(--hb-we6-p) - var(--hb-we6-a)) / var(--hb-we6-s)), 1)); }
.hb-we6-track { position: relative; min-width: 0; }
.hb-we6-list { position: relative; margin: 0; padding: 8px 0 8px 64px; list-style: none; display: grid; gap: clamp(28px, 4cqi, 48px); }
.hb-we6-rule { position: absolute; left: 14px; top: 0; bottom: 0; width: 28px; }
.hb-we6-ticks, .hb-we6-ticks-on { position: absolute; inset: 0; background: repeating-linear-gradient(180deg, currentColor 0 1px, transparent 1px 12px), repeating-linear-gradient(180deg, currentColor 0 2px, transparent 2px 60px); background-size: 12px 100%, 26px 100%; background-repeat: no-repeat; background-position: 0 0, 0 0; }
.hb-we6-ticks { color: #2e2e2e; }
.hb-we6-ticks-on { color: var(--hb-we6-accent); clip-path: inset(0 0 calc((1 - var(--hb-we6-p)) * 100%) 0); }
.hb-we6-spine { position: absolute; left: -1px; top: 0; bottom: 0; width: 2px; background: #262626; }
.hb-we6-spine::after { content: ""; position: absolute; inset: 0; background: var(--hb-we6-accent); transform-origin: top; transform: scaleY(var(--hb-we6-p)); box-shadow: 0 0 12px var(--hb-we6-accent); }
.hb-we6-head { position: absolute; left: -7px; top: calc(var(--hb-we6-p) * 100%); width: 14px; height: 14px; margin-top: -7px; border-radius: 50%; background: #0a0a0a; box-shadow: 0 0 0 2px var(--hb-we6-accent), 0 0 18px var(--hb-we6-accent); }
.hb-we6-item {
  --hb-we6-on: clamp(0, calc((var(--hb-we6-p) - var(--hb-we6-t)) * 14 + 1), 1);
  position: relative; opacity: calc(.18 + var(--hb-we6-on) * .82); transform: translateY(calc((1 - var(--hb-we6-on)) * 18px));
}
.hb-we6-card { display: grid; gap: 10px; padding: clamp(16px, 2.4cqi, 22px); border-radius: 18px; background: linear-gradient(180deg, #131313, #0f0f0f); box-shadow: inset 0 0 0 1px rgba(255,255,255,.07), inset 0 1px 0 rgba(255,255,255,.04); }
.hb-we6-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hb-we6-badge { display: inline-flex; align-items: center; height: 24px; padding: 0 10px; border-radius: 999px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11.5px; color: #0a0a0a; background: var(--hb-we6-accent); }
.hb-we6-owner { display: inline-flex; align-items: center; gap: 8px; color: #8f8f8f; font-size: 12px; white-space: nowrap; }
.hb-we6-owner i { width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; font-style: normal; font-size: 9px; font-weight: 700; color: #0a0a0a; background: hsl(var(--hb-we6-h) 60% 70%); }
.hb-we6-ct { margin: 0; font-size: clamp(17px, 2cqi, 20px); font-weight: 600; letter-spacing: -.015em; }
.hb-we6-cb { margin: 0; color: #a1a1a1; font-size: 14px; line-height: 1.6; }
.hb-we6-del { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-we6-del span { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; border-radius: 8px; background: rgba(255,255,255,.04); box-shadow: inset 0 0 0 1px rgba(255,255,255,.07); color: #cfcfcf; font-size: 12px; }
.hb-we6-del svg { width: 12px; height: 12px; color: var(--hb-we6-accent); }
.hb-we6-node { position: absolute; left: -57px; top: 22px; width: 12px; height: 12px; border-radius: 4px; transform: rotate(45deg); background: #0a0a0a; box-shadow: 0 0 0 2px color-mix(in srgb, var(--hb-we6-accent) calc(var(--hb-we6-on) * 100%), #333); }
@container (min-width: 860px) {
  .hb-we6-inner { grid-template-columns: minmax(0, 4fr) minmax(0, 6fr); align-items: start; }
  .hb-we6-aside { top: 24px; padding: 0; background: none; }
}
@container (max-width: 859px) {
  .hb-we6-sub { display: none; }
  .hb-we6-num { font-size: 44px; }
  .hb-we6-meter { padding: 12px 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-we6 { --hb-we6-p: 1 !important; }
  .hb-we6 *, .hb-we6 *::before, .hb-we6 *::after { transition: none !important; animation: none !important; }
}
`;

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function ease(x: number) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function findScroller(el: HTMLElement | null): HTMLElement | null {
  let n = el?.parentElement ?? null;
  while (n && n !== document.body) {
    const s = getComputedStyle(n);
    if (/(auto|scroll)/.test(s.overflowY) && n.scrollHeight > n.clientHeight + 1) return n;
    n = n.parentElement;
  }
  return null;
}

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export function StepsScrollRuler({
  eyebrow = "Onboarding plan",
  title = "Sixty days from signed to settled",
  subtitle = "Every customer gets the same measured plan, with a named owner for each stage. Scroll to follow it.",
  steps = defaultSteps,
  progress,
  autoPlay = false,
  duration = 9,
  accent = "#f5b83d",
  onStepReach,
  className,
  style,
  ...rest
}: StepsScrollRulerProps) {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const listRef = React.useRef<HTMLOListElement | null>(null);
  const [reached, setReached] = React.useState(0);
  const reachRef = React.useRef(onStepReach);
  const lastRef = React.useRef(0);
  React.useLayoutEffect(() => {
    reachRef.current = onStepReach;
  });
  const n = steps.length;

  const apply = React.useCallback(
    (raw: number) => {
      const root = rootRef.current;
      if (!root) return;
      const p = clamp01(raw);
      root.style.setProperty("--hb-we6-p", p.toFixed(4));
      const v = Math.round(p * 1000) / 10;
      const hundreds = Math.floor(v / 100);
      const tens = Math.floor((v % 100) / 10);
      const ones = v % 10;
      const roll = (base: number, frac: number) => base + (frac > 9 ? frac - 9 : 0);
      root.style.setProperty("--hb-we6-d2", String(hundreds));
      root.style.setProperty("--hb-we6-d1", roll(tens, ones).toFixed(3));
      root.style.setProperty("--hb-we6-d0", ones.toFixed(3));
      root.style.setProperty("--hb-we6-w2", hundreds ? ".62em" : "0em");
      const idx = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
      if (lastRef.current !== idx) {
        lastRef.current = idx;
        setReached(idx);
        reachRef.current?.(idx);
      }
    },
    [n],
  );

  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (typeof progress === "number") {
      apply(progress);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }
    let raf = 0;
    if (autoPlay) {
      let last = 0;
      let t = 0;
      let visible = true;
      const io = new IntersectionObserver((e) => {
        visible = e[0]?.isIntersecting ?? true;
      });
      io.observe(el);
      const d = Math.max(1, duration) * 1000;
      const loop = (now: number) => {
        const dt = last ? Math.min(64, now - last) : 0;
        last = now;
        if (visible) {
          t = (t + dt) % (d + 1800);
          apply(t < d ? ease(t / d) : 1);
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
      };
    }
    const sc = findScroller(el);
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const top = sc ? r.top - sc.getBoundingClientRect().top : r.top;
      const vh = sc ? sc.clientHeight : window.innerHeight;
      apply((vh * 0.6 - top) / Math.max(1, r.height));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    const target: HTMLElement | Window = sc ?? window;
    target.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      target.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [apply, progress, autoPlay, duration]);

  const strip = (name: string, list: string[]) => (
    <span className="hb-we6-digit">
      <span className="hb-we6-strip" style={{ "--hb-we6-d": `var(${name}, 0)` } as React.CSSProperties}>
        {list.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </span>
    </span>
  );

  const pct = Math.round(((reached + 1) / n) * 100);

  return (
    <section
      ref={rootRef}
      className={["hb-we6", className].filter(Boolean).join(" ")}
      style={{ "--hb-we6-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-steps-scroll-ruler" precedence="default">{css}</style>
      <div className="hb-we6-inner">
        <div className="hb-we6-aside">
          {eyebrow ? <p className="hb-we6-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-we6-title">{title}</h2>
          {subtitle ? <p className="hb-we6-sub">{subtitle}</p> : null}
          <div className="hb-we6-meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Plan progress">
            <span className="hb-we6-num" aria-hidden="true">
              {strip("--hb-we6-d2", ["0", "1"])}
              {strip("--hb-we6-d1", digits)}
              {strip("--hb-we6-d0", digits)}
              <span className="hb-we6-pct">%</span>
            </span>
            <span className="hb-we6-ml">
              <span>{steps[reached]?.when} · step {reached + 1} of {n}</span>
              <b>{steps[reached]?.title}</b>
            </span>
          </div>
          <div className="hb-we6-mini" aria-hidden="true">
            {steps.map((s, i) => (
              <i key={s.title} style={{ "--hb-we6-a": (i / n).toFixed(4), "--hb-we6-s": (1 / n).toFixed(4) } as React.CSSProperties} />
            ))}
          </div>
        </div>
        <div className="hb-we6-track">
        <span className="hb-we6-rule" aria-hidden="true">
          <span className="hb-we6-ticks" />
          <span className="hb-we6-ticks-on" />
          <span className="hb-we6-spine" />
          <span className="hb-we6-head" />
        </span>
        <ol ref={listRef} className="hb-we6-list">
          {steps.map((s, i) => (
            <li key={s.title} className="hb-we6-item" style={{ "--hb-we6-t": ((i + 0.15) / n).toFixed(4), "--hb-we6-h": (i * 57) % 360 } as React.CSSProperties}>
              <span className="hb-we6-node" aria-hidden="true" />
              <div className="hb-we6-card">
                <div className="hb-we6-top">
                  <span className="hb-we6-badge">{s.when}</span>
                  <span className="hb-we6-owner">
                    <i aria-hidden="true">{s.owner.split(" ").map((w) => w[0]).join("").slice(0, 2)}</i>
                    {s.owner}
                  </span>
                </div>
                <h3 className="hb-we6-ct">{s.title}</h3>
                <p className="hb-we6-cb">{s.body}</p>
                <div className="hb-we6-del">
                  {s.deliverables.map((d) => (
                    <span key={d}>
                      <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6.2l2.2 2.2L9.5 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
