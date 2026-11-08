"use client";

import * as React from "react";

export interface FaqScrollIndexGroup {
  title: string;
  items: { question: string; answer: string }[];
}

export interface FaqScrollIndexProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  groups?: FaqScrollIndexGroup[];
  contact?: { label: string; href: string; note?: string };
  stickyTop?: number;
  onGroupChange?: (index: number) => void;
  accent?: string;
}

const css = `
.hb-wc10 {
  --hb-wc10-accent: #a78bfa;
  --hb-wc10-top: 24px;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc10 *, .hb-wc10 *::before, .hb-wc10 *::after { box-sizing: border-box; }
.hb-wc10-inner { display: grid; gap: 40px; max-width: 1160px; margin: 0 auto; padding: 72px 20px; }
.hb-wc10-aside { display: grid; gap: 26px; align-content: start; }
.hb-wc10-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 14px; color: #8f8f8f; font-family: var(--font-mono), monospace; font-size: 12px; letter-spacing: .04em; text-transform: uppercase; }
.hb-wc10-eyebrow::before { content: ""; width: 18px; height: 1px; background: var(--hb-wc10-accent); }
.hb-wc10-title { margin: 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(32px, 4.6cqi, 48px); font-weight: 600; line-height: 1.02; letter-spacing: -.04em; text-wrap: balance; }
.hb-wc10-sub { margin: 14px 0 0; max-width: 380px; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-wc10-counter { display: none; align-items: baseline; gap: 10px; font-family: var(--font-grotesk), var(--font-sans), sans-serif; }
.hb-wc10-num { position: relative; display: inline-block; height: 1em; overflow: hidden; font-size: 64px; font-weight: 600; line-height: 1; letter-spacing: -.05em; font-variant-numeric: tabular-nums; }
.hb-wc10-num span { display: block; animation: hb-wc10-roll .55s cubic-bezier(.2, .9, .2, 1.1); }
.hb-wc10-of { color: #5f5f5f; font-size: 18px; font-weight: 500; }
.hb-wc10-nav { position: relative; display: flex; gap: 6px; margin: 0; padding: 0; list-style: none; overflow-x: auto; scrollbar-width: none; }
.hb-wc10-nav::-webkit-scrollbar { display: none; }
.hb-wc10-rail { display: none; }
.hb-wc10-g { display: flex; align-items: center; gap: 12px; width: 100%; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 999px; background: transparent; color: #8f8f8f; font: inherit; font-size: 13.5px; font-weight: 550; text-align: left; white-space: nowrap; cursor: pointer; transition: color .25s ease, background .25s ease, border-color .25s ease; }
.hb-wc10-g:hover { color: #ededed; }
.hb-wc10-g[aria-current="true"] { color: #fff; border-color: color-mix(in srgb, var(--hb-wc10-accent) 55%, transparent); background: color-mix(in srgb, var(--hb-wc10-accent) 12%, transparent); }
.hb-wc10-g:focus-visible, .hb-wc10-help a:focus-visible { outline: 2px solid var(--hb-wc10-accent); outline-offset: 2px; }
.hb-wc10-gi { color: #5f5f5f; font-family: var(--font-mono), monospace; font-size: 11.5px; transition: color .25s ease; }
.hb-wc10-g[aria-current="true"] .hb-wc10-gi { color: var(--hb-wc10-accent); }
.hb-wc10-gc { margin-left: auto; color: #5f5f5f; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-wc10-help { display: none; gap: 12px; padding: 16px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 14px; background: linear-gradient(180deg, #131313, #0f0f0f); }
.hb-wc10-help p { margin: 0; color: #8f8f8f; font-size: 13.5px; line-height: 1.5; }
.hb-wc10-help a { display: inline-flex; align-items: center; justify-content: space-between; gap: 8px; height: 40px; padding: 0 14px; border-radius: 10px; background: #ededed; color: #0a0a0a; font-size: 14px; font-weight: 600; text-decoration: none; transition: background .2s ease; }
.hb-wc10-help a:hover { background: #fff; }
.hb-wc10-help svg { width: 14px; height: 14px; }
.hb-wc10-faces { display: flex; align-items: center; gap: 10px; color: #ededed; font-size: 13px; font-weight: 550; }
.hb-wc10-faces span { display: flex; }
.hb-wc10-faces i { width: 24px; height: 24px; margin-left: -7px; border: 2px solid #121212; border-radius: 50%; font-style: normal; }
.hb-wc10-faces i:first-child { margin-left: 0; }
.hb-wc10-main { display: grid; gap: 56px; }
.hb-wc10-sec { scroll-margin-top: var(--hb-wc10-top); }
.hb-wc10-sh { display: flex; align-items: baseline; gap: 14px; margin: 0 0 8px; padding-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, .08); font-size: 22px; font-weight: 600; letter-spacing: -.02em; }
.hb-wc10-sh span { color: var(--hb-wc10-accent); font-family: var(--font-mono), monospace; font-size: 13px; font-weight: 500; }
.hb-wc10-qa { display: grid; gap: 0; margin: 0; }
.hb-wc10-row { display: grid; gap: 8px; padding: 20px 0; border-bottom: 1px solid rgba(255, 255, 255, .05); opacity: .45; transform: translateY(8px); transition: opacity .6s ease, transform .6s cubic-bezier(.2, .8, .2, 1); }
.hb-wc10-sec[data-seen="true"] .hb-wc10-row { opacity: 1; transform: none; }
.hb-wc10-sec[data-seen="true"] .hb-wc10-row:nth-child(2) { transition-delay: .08s; }
.hb-wc10-sec[data-seen="true"] .hb-wc10-row:nth-child(3) { transition-delay: .16s; }
.hb-wc10-sec[data-seen="true"] .hb-wc10-row:nth-child(4) { transition-delay: .24s; }
.hb-wc10-row dt { color: #ededed; font-size: 16px; font-weight: 600; line-height: 1.4; }
.hb-wc10-row dd { margin: 0; max-width: 620px; color: #9a9a9a; font-size: 14.5px; line-height: 1.7; }
@keyframes hb-wc10-roll { from { transform: translateY(100%); opacity: 0; } }
@container (min-width: 820px) {
  .hb-wc10-inner { grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: 80px; padding: 112px 40px; }
  .hb-wc10-aside { position: sticky; top: var(--hb-wc10-top); align-self: start; }
  .hb-wc10-counter { display: flex; }
  .hb-wc10-nav { flex-direction: column; gap: 2px; padding-left: 16px; overflow: visible; }
  .hb-wc10-rail { position: absolute; display: block; left: 0; top: 6px; bottom: 6px; width: 2px; border-radius: 1px; background: rgba(255, 255, 255, .08); }
  .hb-wc10-rail i { position: absolute; left: 0; top: 0; width: 100%; height: var(--hb-wc10-fill); border-radius: inherit; background: var(--hb-wc10-accent); box-shadow: 0 0 10px var(--hb-wc10-accent); transition: height .5s cubic-bezier(.2, .8, .2, 1); font-style: normal; }
  .hb-wc10-g { padding: 9px 10px; border-color: transparent; border-radius: 10px; }
  .hb-wc10-g[aria-current="true"] { border-color: transparent; background: rgba(255, 255, 255, .04); }
  .hb-wc10-help { display: grid; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc10 *, .hb-wc10 *::before, .hb-wc10 *::after { animation: none !important; transition: none !important; }
  .hb-wc10-row { opacity: 1; transform: none; }
}
`;

const defaultGroups: FaqScrollIndexGroup[] = [
  {
    title: "Getting started",
    items: [
      { question: "How long does onboarding take?", answer: "Most teams import their first project and invite colleagues in under fifteen minutes. Larger workspaces get a guided session with a specialist in the first week." },
      { question: "Can I import from my current tool?", answer: "Yes. Importers for the four most common project tools bring over tasks, comments, attachments and assignees, and keep the original creation dates." },
      { question: "Is there a free plan?", answer: "The Starter plan is free forever for up to three projects and five members, with no time limit and no card required." },
    ],
  },
  {
    title: "Plans and billing",
    items: [
      { question: "What happens when my trial ends?", answer: "You drop to Starter automatically. Nothing is deleted, and projects over the limit become read-only until you upgrade or archive them." },
      { question: "Do you charge for inactive members?", answer: "No. Members who have not signed in for 30 days are paused and removed from your next invoice automatically." },
      { question: "Which payment methods do you accept?", answer: "All major cards, SEPA direct debit, and invoices with 30-day terms on yearly Business plans." },
    ],
  },
  {
    title: "Privacy and security",
    items: [
      { question: "Who can see my workspace?", answer: "Only members you invite. Our support team can access it only after you grant temporary access from Settings, and every session is logged." },
      { question: "Are you GDPR compliant?", answer: "Yes. We sign a data processing agreement on request, store EU workspaces in the EU and list every subprocessor publicly." },
    ],
  },
  {
    title: "Support",
    items: [
      { question: "How fast do you reply?", answer: "The median first reply is 41 minutes on weekdays. Business plans include a named contact and a four-hour response guarantee." },
      { question: "Do you offer training?", answer: "Live training sessions run every Tuesday and Thursday, and recordings are in the help center." },
    ],
  },
];

const faces = ["#a78bfa", "#f472b6", "#38bdf8"];

export function FaqScrollIndex({
  eyebrow = "FAQ",
  title = "Everything you wanted to ask.",
  subtitle = "Grouped by topic. The index follows along as you read, so you always know where you are.",
  groups = defaultGroups,
  contact = { label: "Chat with the team", href: "#", note: "Cannot find your answer? We usually reply within the hour." },
  stickyTop = 24,
  onGroupChange,
  accent = "#a78bfa",
  className = "",
  style,
  ...rest
}: FaqScrollIndexProps) {
  const [current, setCurrent] = React.useState(0);
  const [seen, setSeen] = React.useState<boolean[]>(() => groups.map((_, i) => i === 0));
  const sections = React.useRef<(HTMLElement | null)[]>([]);
  const changeRef = React.useRef(onGroupChange);
  const lastRef = React.useRef(0);
  const id = React.useId();

  React.useEffect(() => {
    changeRef.current = onGroupChange;
  }, [onGroupChange]);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Map<number, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.index);
          if (e.isIntersecting) {
            visible.set(i, e.intersectionRatio);
            setSeen((s) => (s[i] ? s : s.map((v, k) => (k === i ? true : v))));
          } else {
            visible.delete(i);
          }
        });
        if (visible.size) {
          const first = Math.min(...Array.from(visible.keys()));
          if (lastRef.current !== first) {
            lastRef.current = first;
            setCurrent(first);
            changeRef.current?.(first);
          }
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, [groups.length]);

  const jump = (i: number) => {
    const el = sections.current[i];
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    lastRef.current = i;
    setCurrent(i);
    onGroupChange?.(i);
  };

  const fill = groups.length > 1 ? ((current + 0.5) / groups.length) * 100 : 100;
  const vars = { "--hb-wc10-accent": accent, "--hb-wc10-top": `${stickyTop}px`, ...style } as React.CSSProperties;

  return (
    <section className={`hb-wc10 ${className}`} style={vars} {...rest}>
      <style href="hb-faq-scroll-index" precedence="default">{css}</style>
      <div className="hb-wc10-inner">
        <aside className="hb-wc10-aside">
          <div>
            {eyebrow ? <p className="hb-wc10-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-wc10-title">{title}</h2>
            {subtitle ? <p className="hb-wc10-sub">{subtitle}</p> : null}
          </div>
          <div className="hb-wc10-counter" aria-hidden="true">
            <span className="hb-wc10-num">
              <span key={current}>{String(current + 1).padStart(2, "0")}</span>
            </span>
            <span className="hb-wc10-of">/ {String(groups.length).padStart(2, "0")}</span>
          </div>
          <nav aria-label="FAQ topics">
            <ul className="hb-wc10-nav">
              <li className="hb-wc10-rail" aria-hidden="true">
                <i style={{ "--hb-wc10-fill": `${fill.toFixed(1)}%` } as React.CSSProperties} />
              </li>
              {groups.map((g, i) => (
                <li key={g.title}>
                  <button type="button" className="hb-wc10-g" aria-current={current === i ? "true" : undefined} aria-controls={`${id}-s${i}`} onClick={() => jump(i)}>
                    <span className="hb-wc10-gi">{String(i + 1).padStart(2, "0")}</span>
                    {g.title}
                    <span className="hb-wc10-gc">{g.items.length}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {contact ? (
            <div className="hb-wc10-help">
              <div className="hb-wc10-faces">
                <span aria-hidden="true">
                  {faces.map((f, i) => (
                    <i key={f} style={{ background: `linear-gradient(135deg, ${f}, #222)`, zIndex: 3 - i }} />
                  ))}
                </span>
                Support is online
              </div>
              {contact.note ? <p>{contact.note}</p> : null}
              <a href={contact.href}>
                {contact.label}
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M2.5 7h8.5M7.5 3.5L11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          ) : null}
        </aside>
        <div className="hb-wc10-main">
          {groups.map((g, i) => (
            <section
              key={g.title}
              id={`${id}-s${i}`}
              ref={(el) => {
                sections.current[i] = el;
              }}
              className="hb-wc10-sec"
              data-index={i}
              data-seen={seen[i] ? "true" : "false"}
              aria-labelledby={`${id}-h${i}`}
            >
              <h3 className="hb-wc10-sh" id={`${id}-h${i}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {g.title}
              </h3>
              <dl className="hb-wc10-qa">
                {g.items.map((it) => (
                  <div key={it.question} className="hb-wc10-row">
                    <dt>{it.question}</dt>
                    <dd>{it.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
