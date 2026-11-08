"use client";

import * as React from "react";

export interface HeroScrollStackLink {
  label: string;
  href: string;
}

export interface HeroScrollStackStep {
  title: string;
  text: string;
}

export interface HeroScrollStackProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: [HeroScrollStackStep, HeroScrollStackStep, HeroScrollStackStep, HeroScrollStackStep];
  cta?: HeroScrollStackLink | null;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const defaultSteps: [HeroScrollStackStep, HeroScrollStackStep, HeroScrollStackStep, HeroScrollStackStep] = [
  { title: "Issue cards", text: "Virtual cards with limits per team, merchant and month." },
  { title: "Approve spend", text: "Routing by amount and department, right from Slack or email." },
  { title: "Reconcile", text: "Receipts matched to bank lines the moment they land." },
  { title: "Close the month", text: "A clean ledger and an audit trail, ready for your accountant." },
];

const css = `
.hb-va6 {
  --hb-va6-accent: #2f7bff;
  position: relative;
  width: 100%;
  height: var(--hb-va6-h);
  color: #ededed;
  font-family: inherit;
  background: #0a0a0a;
}
.hb-va6[data-pinned="true"] { height: calc(var(--hb-va6-h) * var(--hb-va6-len)); }
.hb-va6 *, .hb-va6 *::before, .hb-va6 *::after { box-sizing: border-box; }
.hb-va6-stage {
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: 4cqw;
  height: var(--hb-va6-h);
  padding: 0 5cqw;
  overflow: hidden;
  container-type: size;
  background:
    radial-gradient(45% 60% at 78% 50%, color-mix(in srgb, var(--hb-va6-accent) 14%, transparent), transparent 70%),
    linear-gradient(180deg, #0a0a0a, #0c0d10);
}
.hb-va6-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  font-size: clamp(11px, 1.2cqw, 13px);
  font-weight: 500;
  color: color-mix(in srgb, var(--hb-va6-accent) 60%, #fff);
}
.hb-va6-eyebrow::before {
  content: "";
  width: 0.5em;
  height: 0.5em;
  border-radius: 2px;
  background: var(--hb-va6-accent);
  transform: rotate(45deg);
}
.hb-va6-title {
  margin: 0.5em 0 0;
  font-size: clamp(1.8rem, 5cqw, 4.4rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.045em;
}
.hb-va6-sub {
  max-width: 38ch;
  margin: 0.9em 0 0;
  font-size: clamp(12px, 1.4cqw, 16px);
  line-height: 1.55;
  color: #a1a1a1;
}
.hb-va6-steps { margin: 1.6em 0 0; padding: 0; list-style: none; display: grid; gap: 0.15em; }
.hb-va6-step {
  position: relative;
  display: grid;
  grid-template-columns: 1.9em 1fr;
  gap: 0.3em 0.6em;
  padding: 0.55em 0.7em;
  border-radius: 0.7em;
  font-size: clamp(11px, 1.25cqw, 14px);
  color: #6f6f6f;
  transition: color 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-va6-step b { font-weight: 600; }
.hb-va6-step span:last-child {
  grid-column: 2;
  display: none;
  font-size: 0.9em;
  line-height: 1.45;
  color: #a1a1a1;
}
.hb-va6-step[data-on="true"] { color: #ededed; background: rgba(255, 255, 255, 0.04); }
.hb-va6-step[data-on="true"] span:last-child { display: block; }
.hb-va6-num {
  display: grid;
  place-items: center;
  width: 1.7em;
  height: 1.7em;
  border-radius: 50%;
  border: 1px solid #2a2a2a;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.82em;
  transition: background 0.45s ease, border-color 0.45s ease, color 0.45s ease;
}
.hb-va6-step[data-on="true"] .hb-va6-num { background: var(--hb-va6-accent); border-color: var(--hb-va6-accent); color: #fff; }
.hb-va6-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  margin-top: 1.4em;
  padding: 0.7em 1.25em;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font-size: clamp(12px, 1.35cqw, 15px);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease;
}
.hb-va6-cta:hover { background: #fff; transform: translateY(-1px); }
.hb-va6-cta:focus-visible { outline: 2px solid var(--hb-va6-accent); outline-offset: 3px; }
.hb-va6-deck {
  position: relative;
  height: 62cqh;
  perspective: 1400px;
  perspective-origin: 50% -20%;
}
.hb-va6-panel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 2.2cqw;
  border-radius: 1.6cqw;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: linear-gradient(180deg, #17181b, #111214);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 -1.4cqw 3cqw -1cqw rgba(0, 0, 0, 0.75);
  transform-origin: 50% 0%;
  font-size: clamp(9px, 1.15cqw, 13px);
  will-change: transform, filter;
}
.hb-va6-ph {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2em;
  font-weight: 600;
}
.hb-va6-ph small {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.82em;
  font-weight: 400;
  color: #8f8f8f;
}
.hb-va6-card {
  position: relative;
  width: 58%;
  aspect-ratio: 1.6;
  padding: 1em;
  border-radius: 0.9em;
  background:
    radial-gradient(80% 90% at 85% 10%, rgba(255, 255, 255, 0.35), transparent 50%),
    linear-gradient(135deg, var(--hb-va6-accent), color-mix(in srgb, var(--hb-va6-accent) 40%, #0a0a0a));
  box-shadow: 0 1em 2em -0.8em color-mix(in srgb, var(--hb-va6-accent) 70%, transparent);
  font-family: var(--font-mono, ui-monospace, monospace);
  color: #fff;
}
.hb-va6-card span { position: absolute; left: 1em; bottom: 0.9em; letter-spacing: 0.12em; font-size: 0.9em; }
.hb-va6-card i { position: absolute; right: 1em; top: 0.9em; font-style: normal; font-weight: 700; }
.hb-va6-limit { margin-top: auto; }
.hb-va6-limit div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
  color: #a1a1a1;
}
.hb-va6-limit div b { color: #ededed; font-weight: 600; }
.hb-va6-track { height: 0.5em; border-radius: 1em; background: #222; overflow: hidden; }
.hb-va6-track span { display: block; width: 64%; height: 100%; border-radius: inherit; background: var(--hb-va6-accent); }
.hb-va6-row {
  display: grid;
  grid-template-columns: 2.2em 1fr auto auto;
  align-items: center;
  gap: 0.8em;
  padding: 0.7em 0;
  border-top: 1px solid #222;
}
.hb-va6-av {
  display: grid;
  place-items: center;
  width: 2.2em;
  height: 2.2em;
  border-radius: 50%;
  font-size: 0.8em;
  font-weight: 700;
  color: #0a0a0a;
}
.hb-va6-row small { display: block; color: #8f8f8f; }
.hb-va6-amt { font-family: var(--font-mono, ui-monospace, monospace); }
.hb-va6-chip {
  padding: 0.3em 0.75em;
  border-radius: 999px;
  font-size: 0.85em;
  font-weight: 600;
  background: color-mix(in srgb, var(--hb-va6-accent) 18%, transparent);
  color: color-mix(in srgb, var(--hb-va6-accent) 60%, #fff);
}
.hb-va6-chip[data-k="ok"] { background: rgba(52, 211, 153, 0.14); color: #6ee7b7; }
.hb-va6-ring {
  display: flex;
  align-items: center;
  gap: 1.2em;
  margin-bottom: 1em;
}
.hb-va6-ring svg { width: 4.4em; height: 4.4em; }
.hb-va6-ring b { display: block; font-size: 1.6em; letter-spacing: -0.02em; }
.hb-va6-ring small { color: #8f8f8f; }
.hb-va6-match {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0;
  border-top: 1px solid #222;
  color: #a1a1a1;
}
.hb-va6-match b { color: #6ee7b7; font-weight: 500; }
.hb-va6-bars {
  display: flex;
  align-items: flex-end;
  gap: 0.6em;
  height: 44%;
  margin-top: auto;
  padding-top: 1em;
}
.hb-va6-bars span {
  flex: 1;
  border-radius: 0.35em 0.35em 0.1em 0.1em;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-va6-accent) 85%, #fff), color-mix(in srgb, var(--hb-va6-accent) 30%, #111));
}
.hb-va6-bars span:nth-child(odd) { opacity: 0.55; }
.hb-va6-big { font-size: 2.6em; font-weight: 600; letter-spacing: -0.04em; line-height: 1; }
.hb-va6-big small { margin-left: 0.3em; font-size: 0.35em; font-weight: 500; letter-spacing: 0; color: #6ee7b7; }
@media (max-width: 640px) {
  .hb-va6-stage { grid-template-columns: 1fr; align-content: center; gap: 4cqh; }
  .hb-va6-steps { display: none; }
  .hb-va6-deck { height: 40cqh; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-va6-step, .hb-va6-num, .hb-va6-cta { transition: none; }
}
`;

function findScroller(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    const oy = getComputedStyle(node).overflowY;
    if ((oy === "auto" || oy === "scroll" || oy === "overlay") && node.scrollHeight > node.clientHeight + 1) return node;
    node = node.parentElement;
  }
  return null;
}

function ease(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function loopAt(ms: number, duration: number) {
  const d = Math.max(1, duration) * 1000;
  const back = d * 0.7;
  const hold = 1400;
  const t = ms % (d + hold + back + 700);
  if (t < d) return ease(t / d);
  if (t < d + hold) return 1;
  if (t < d + hold + back) return 1 - ease((t - d - hold) / back);
  return 0;
}

function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  apply: (p: number) => void,
  progress: number | undefined,
  autoPlay: boolean,
  duration: number,
) {
  const applyRef = React.useRef(apply);
  React.useLayoutEffect(() => {
    applyRef.current = apply;
  });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = (p: number) => applyRef.current(clamp01(p));
    if (typeof progress === "number") {
      run(progress);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      run(1);
      return;
    }
    let raf = 0;
    if (autoPlay) {
      let visible = true;
      let last = 0;
      let t = 0;
      const io = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      });
      io.observe(el);
      const loop = (now: number) => {
        const dt = last ? Math.min(64, now - last) : 0;
        last = now;
        if (visible) {
          t += dt;
          run(loopAt(t, duration));
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
      const span = r.height - vh;
      run(span > 1 ? -top / span : (vh - top) / (vh + r.height));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    const target: HTMLElement | Window = sc ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, progress, autoPlay, duration]);
}

const approvals = [
  { who: "Maya Chen", what: "Figma · annual", amt: "$1,440", c: "#7fb3ff", k: "ok" },
  { who: "Jonah Reyes", what: "Offsite · Lisbon", amt: "$8,920", c: "#f9a8d4", k: "wait" },
  { who: "Priya Nair", what: "AWS · October", amt: "$3,215", c: "#fcd34d", k: "ok" },
];

function Panels() {
  return [
    <React.Fragment key="cards">
      <div className="hb-va6-ph">
        Marketing team card <small>Virtual · USD</small>
      </div>
      <div className="hb-va6-card">
        <i>LEDGERLY</i>
        <span>•••• 4021 · 09/29</span>
      </div>
      <div className="hb-va6-limit">
        <div>
          <span>Monthly limit</span>
          <span>
            <b>$6,400</b> of $10,000
          </span>
        </div>
        <div className="hb-va6-track">
          <span />
        </div>
      </div>
    </React.Fragment>,
    <React.Fragment key="approve">
      <div className="hb-va6-ph">
        Waiting for approval <small>3 requests</small>
      </div>
      {approvals.map((a) => (
        <div key={a.who} className="hb-va6-row">
          <span className="hb-va6-av" style={{ background: a.c }}>
            {a.who
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
          <span>
            {a.who}
            <small>{a.what}</small>
          </span>
          <span className="hb-va6-amt">{a.amt}</span>
          <span className="hb-va6-chip" data-k={a.k}>
            {a.k === "ok" ? "Approved" : "Review"}
          </span>
        </div>
      ))}
    </React.Fragment>,
    <React.Fragment key="rec">
      <div className="hb-va6-ph">
        Bank reconciliation <small>October</small>
      </div>
      <div className="hb-va6-ring">
        <svg viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" fill="none" stroke="#222" strokeWidth="5" />
          <circle cx="22" cy="22" r="18" fill="none" stroke="#34d399" strokeWidth="5" strokeLinecap="round" strokeDasharray="112.4 113.1" transform="rotate(-90 22 22)" />
        </svg>
        <span>
          <b>1,284 / 1,290</b>
          <small>lines matched automatically</small>
        </span>
      </div>
      <div className="hb-va6-match">
        <span>Stripe payout · Oct 28</span>
        <b>Matched</b>
      </div>
      <div className="hb-va6-match">
        <span>Gusto payroll · Oct 31</span>
        <b>Matched</b>
      </div>
    </React.Fragment>,
    <React.Fragment key="close">
      <div className="hb-va6-ph">
        Month-end close <small>Last 8 months</small>
      </div>
      <div className="hb-va6-big">
        2.4 days<small>↓ 71% faster</small>
      </div>
      <div className="hb-va6-bars">
        {[92, 84, 77, 61, 48, 36, 29, 22].map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </React.Fragment>,
  ];
}

export function HeroScrollStack({
  eyebrow = "Ledgerly for finance teams",
  title = "Close the books before lunch",
  subtitle = "Cards, approvals and reconciliation in one ledger, so month-end stops eating the first week of the month.",
  steps = defaultSteps,
  cta = { label: "Book a 20-minute demo", href: "#" },
  accent = "#2f7bff",
  progress,
  autoPlay = false,
  duration = 6,
  length = 4,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollStackProps) {
  const ref = React.useRef<HTMLElement>(null);
  const panels = React.useRef<(HTMLDivElement | null)[]>([]);
  const items = React.useRef<(HTMLLIElement | null)[]>([]);
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;
  const content = Panels();
  const n = content.length;

  useScrollProgress(
    ref,
    (p) => {
      const s = p * (n - 1);
      panels.current.forEach((node, i) => {
        if (!node) return;
        const enter = i === 0 ? 1 : ease(clamp01((s - (i - 1) - 0.08) / 0.84));
        const depth = Math.max(0, s - i);
        const y = (1 - enter) * 118 - depth * 7;
        const scale = 1 - depth * 0.07;
        const rx = (1 - enter) * -14 + depth * 5;
        node.style.transform = `translate3d(0, ${y.toFixed(2)}%, 0) rotateX(${rx.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        node.style.filter = `brightness(${(1 - Math.min(depth, 3) * 0.22).toFixed(3)})`;
      });
      const active = Math.min(n - 1, Math.round(s));
      items.current.forEach((node, k) => {
        if (node) node.dataset.on = k === active ? "true" : "false";
      });
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-va6", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={{ "--hb-va6-accent": accent, "--hb-va6-h": height, "--hb-va6-len": length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-hero-scroll-stack" precedence="default">{css}</style>
      <div className="hb-va6-stage">
        <div>
          <span className="hb-va6-eyebrow">{eyebrow}</span>
          <Heading className="hb-va6-title">{title}</Heading>
          {subtitle ? <p className="hb-va6-sub">{subtitle}</p> : null}
          <ol className="hb-va6-steps">
            {steps.map((st, k) => (
              <li
                key={st.title}
                className="hb-va6-step"
                data-on={k === 0 ? "true" : "false"}
                ref={(node) => {
                  items.current[k] = node;
                }}
              >
                <span className="hb-va6-num">{k + 1}</span>
                <b>{st.title}</b>
                <span>{st.text}</span>
              </li>
            ))}
          </ol>
          {cta ? (
            <a className="hb-va6-cta" href={cta.href}>
              {cta.label}
            </a>
          ) : null}
        </div>
        <div className="hb-va6-deck" aria-hidden="true">
          {content.map((node, i) => (
            <div
              key={i}
              className="hb-va6-panel"
              ref={(el) => {
                panels.current[i] = el;
              }}
              style={{ zIndex: i + 1, transform: i === 0 ? undefined : "translate3d(0, 118%, 0)" }}
            >
              {node}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
