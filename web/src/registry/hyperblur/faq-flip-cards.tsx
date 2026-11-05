"use client";

import * as React from "react";

export interface FaqFlipItem {
  tag: string;
  question: string;
  answer: string;
}

export interface FaqFlipCardsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FaqFlipItem[];
  defaultFlipped?: number[];
  onFlip?: (index: number, flipped: boolean) => void;
  cta?: { label: string; href: string } | null;
  accent?: string;
}

const defaultItems: FaqFlipItem[] = [
  { tag: "Getting started", question: "How long does setup take?", answer: "Most studios are booking clients the same afternoon. Import your services from a spreadsheet and connect your calendar in about 15 minutes." },
  { tag: "Payments", question: "Which payment methods can clients use?", answer: "Cards, Apple Pay, Google Pay and bank transfers in 34 countries. Payouts arrive in your account within two business days." },
  { tag: "Scheduling", question: "Can clients reschedule on their own?", answer: "Yes, up to a cutoff you choose. Late changes can carry a fee, and the freed slot is offered to your waitlist automatically." },
  { tag: "Team", question: "Do I pay for every staff member?", answer: "Only for staff who take bookings. Front desk and managers are free, and you can pause a seat while someone is on leave." },
  { tag: "Data", question: "Can I bring my client history?", answer: "We import clients, notes and past visits from Mindbody, Vagaro, Square and CSV files. Our team checks every import before it goes live." },
  { tag: "Billing", question: "Is there a contract?", answer: "No. Plans are month to month and you can cancel from settings. Yearly billing saves two months if you want it." },
];

const css = `
.hb-yi8 {
  --hb-yi8-accent: #ff6a3d;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  color: #121212;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yi8 *, .hb-yi8 *::before, .hb-yi8 *::after { box-sizing: border-box; }
.hb-yi8::before {
  content: ""; position: absolute; left: 50%; top: 0; width: 900px; height: 420px; transform: translateX(-50%); pointer-events: none;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-yi8-accent) 12%, transparent), transparent);
}
.hb-yi8-inner { position: relative; max-width: 1120px; margin: 0 auto; padding: 72px 20px 80px; }
.hb-yi8-head { display: grid; gap: 18px; align-items: end; }
.hb-yi8-eyebrow { margin: 0 0 12px; font-size: 13px; font-weight: 600; color: var(--hb-yi8-accent); }
.hb-yi8-title { margin: 0; font-size: clamp(30px, 5cqi, 52px); line-height: 1.02; letter-spacing: -.045em; font-weight: 650; max-width: 15ch; }
.hb-yi8-sub { margin: 14px 0 0; max-width: 460px; font-size: 16px; line-height: 1.6; color: #666; }
.hb-yi8-tools { display: flex; align-items: center; gap: 12px; }
.hb-yi8-all {
  display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(18, 18, 18, .14);
  background: #fff; color: #121212; font: inherit; font-size: 14px; font-weight: 500; cursor: pointer; transition: background .2s, border-color .2s;
}
.hb-yi8-all:hover { background: #f5f5f4; border-color: rgba(18, 18, 18, .24); }
.hb-yi8-all svg { width: 15px; height: 15px; transition: transform .5s cubic-bezier(.3, 1.3, .5, 1); }
.hb-yi8-all[aria-pressed="true"] svg { transform: rotate(180deg); }
.hb-yi8-count { font-size: 13px; color: #8a8a8a; font-variant-numeric: tabular-nums; }
.hb-yi8-grid { display: grid; grid-template-columns: 1fr; gap: 14px; margin: 40px 0 0; padding: 0; list-style: none; }
.hb-yi8-cell { perspective: 1200px; animation: hb-yi8-rise .6s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-yi8-i) * 70ms); }
.hb-yi8-card {
  position: relative; display: block; width: 100%; height: 232px; padding: 0; border: 0; background: transparent; color: inherit; font: inherit; text-align: left;
  cursor: pointer; transform-style: preserve-3d; transition: transform .75s cubic-bezier(.3, 1.25, .45, 1); border-radius: 20px;
}
.hb-yi8-card[aria-pressed="true"] { transform: rotateY(180deg); }
.hb-yi8-cell[data-peek="true"] .hb-yi8-card[aria-pressed="false"] { animation: hb-yi8-peek 1.6s 1s cubic-bezier(.4, 0, .2, 1) both; }
.hb-yi8-card:focus-visible { outline: 2px solid var(--hb-yi8-accent); outline-offset: 4px; }
.hb-yi8-all:focus-visible, .hb-yi8-cta:focus-visible { outline: 2px solid var(--hb-yi8-accent); outline-offset: 3px; }
.hb-yi8-face {
  position: absolute; inset: 0; display: flex; flex-direction: column; padding: 22px; border-radius: 20px; backface-visibility: hidden; -webkit-backface-visibility: hidden;
  overflow: hidden;
}
.hb-yi8-front {
  background: linear-gradient(180deg, #fafaf9, #f3f3f1); border: 1px solid rgba(18, 18, 18, .08);
  box-shadow: 0 1px 0 #fff inset, 0 1px 2px rgba(18, 18, 18, .04); transition: box-shadow .3s, border-color .3s;
}
.hb-yi8-card:hover .hb-yi8-front { border-color: rgba(18, 18, 18, .16); box-shadow: 0 1px 0 #fff inset, 0 20px 40px -24px rgba(18, 18, 18, .35); }
.hb-yi8-front::after {
  content: ""; position: absolute; right: -40px; bottom: -40px; width: 140px; height: 140px; border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--hb-yi8-accent) 22%, transparent), transparent 70%); opacity: 0; transition: opacity .3s;
}
.hb-yi8-card:hover .hb-yi8-front::after { opacity: 1; }
.hb-yi8-top { display: flex; align-items: center; justify-content: space-between; }
.hb-yi8-tag { padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 500; background: #fff; border: 1px solid rgba(18, 18, 18, .08); color: #555; }
.hb-yi8-n { font-size: 13px; font-weight: 600; color: #b0b0ae; font-variant-numeric: tabular-nums; }
.hb-yi8-q { margin-top: auto; font-size: 21px; line-height: 1.2; letter-spacing: -.025em; font-weight: 600; max-width: 18ch; }
.hb-yi8-hint { display: flex; align-items: center; gap: 8px; margin-top: 16px; font-size: 13px; color: #8a8a8a; }
.hb-yi8-hint i { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: #121212; color: #fff; transition: transform .3s, background .3s; }
.hb-yi8-hint svg { width: 13px; height: 13px; }
.hb-yi8-card:hover .hb-yi8-hint i { transform: rotate(-30deg); background: var(--hb-yi8-accent); }
.hb-yi8-back {
  transform: rotateY(180deg); color: #fff;
  background: radial-gradient(120% 90% at 100% 0%, color-mix(in srgb, var(--hb-yi8-accent) 60%, transparent), transparent 60%), #141414;
  box-shadow: 0 24px 50px -24px color-mix(in srgb, var(--hb-yi8-accent) 60%, #000);
}
.hb-yi8-back .hb-yi8-tag { background: rgba(255, 255, 255, .1); border-color: rgba(255, 255, 255, .14); color: #fff; }
.hb-yi8-back .hb-yi8-n { color: rgba(255, 255, 255, .5); }
.hb-yi8-a { margin-top: auto; font-size: 15px; line-height: 1.55; color: rgba(255, 255, 255, .88); }
.hb-yi8-backq { display: block; margin-top: 14px; font-size: 13px; font-weight: 600; color: rgba(255, 255, 255, .55); }
.hb-yi8-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; margin-top: 28px; padding: 18px 20px; border-radius: 16px; background: #f7f5ef; border: 1px solid rgba(18, 18, 18, .06); }
.hb-yi8-foot p { margin: 0; font-size: 15px; color: #444; }
.hb-yi8-foot b { color: #121212; }
.hb-yi8-cta { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 18px; border-radius: 999px; background: #121212; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; transition: background .2s, transform .2s; }
.hb-yi8-cta:hover { background: var(--hb-yi8-accent); transform: translateY(-1px); }
.hb-yi8-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-yi8-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes hb-yi8-peek { 0%, 100% { transform: rotateY(0); } 35% { transform: rotateY(-28deg); } 60% { transform: rotateY(6deg); } }
@container (min-width: 600px) {
  .hb-yi8-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (min-width: 900px) {
  .hb-yi8-inner { padding: 104px 32px 112px; }
  .hb-yi8-head { grid-template-columns: minmax(0, 1fr) auto; }
  .hb-yi8-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .hb-yi8-card { height: 248px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yi8-cell, .hb-yi8-cell[data-peek="true"] .hb-yi8-card[aria-pressed="false"] { animation: none; }
  .hb-yi8-card, .hb-yi8-all svg, .hb-yi8-hint i, .hb-yi8-front, .hb-yi8-front::after, .hb-yi8-cta { transition: none; }
}
`;

export function FaqFlipCards({
  eyebrow = "Questions, answered",
  title = "Everything studios ask before switching.",
  subtitle = "Flip a card for the short answer. If yours is not here, our support team replies in under an hour on weekdays.",
  items = defaultItems,
  defaultFlipped = [],
  onFlip,
  cta = { label: "Chat with support", href: "#" },
  accent = "#ff6a3d",
  className = "",
  style,
  ...rest
}: FaqFlipCardsProps) {
  const [flipped, setFlipped] = React.useState<number[]>(defaultFlipped);
  const allOn = items.length > 0 && flipped.length === items.length;

  const toggle = (i: number) => {
    const next = !flipped.includes(i);
    setFlipped((f) => (next ? [...f, i] : f.filter((x) => x !== i)));
    onFlip?.(i, next);
  };

  const toggleAll = () => {
    setFlipped(allOn ? [] : items.map((_, i) => i));
  };

  const vars = { "--hb-yi8-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-yi8 ${className}`} style={vars} {...rest}>
      <style href="hb-faq-flip-cards" precedence="default">{css}</style>
      <div className="hb-yi8-inner">
        <div className="hb-yi8-head">
          <div>
            {eyebrow ? <p className="hb-yi8-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-yi8-title">{title}</h2>
            {subtitle ? <p className="hb-yi8-sub">{subtitle}</p> : null}
          </div>
          <div className="hb-yi8-tools">
            <span className="hb-yi8-count" aria-live="polite">{`${flipped.length} of ${items.length} open`}</span>
            <button type="button" className="hb-yi8-all" aria-pressed={allOn} onClick={toggleAll}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5" />
              </svg>
              {allOn ? "Flip all back" : "Reveal all"}
            </button>
          </div>
        </div>
        <ul className="hb-yi8-grid">
          {items.map((it, i) => {
            const on = flipped.includes(i);
            const n = String(i + 1).padStart(2, "0");
            return (
              <li key={it.question} className="hb-yi8-cell" data-peek={i === 0} style={{ "--hb-yi8-i": i } as React.CSSProperties}>
                <button type="button" className="hb-yi8-card" aria-pressed={on} onClick={() => toggle(i)}>
                  <span className="hb-yi8-face hb-yi8-front" aria-hidden={on}>
                    <span className="hb-yi8-top">
                      <span className="hb-yi8-tag">{it.tag}</span>
                      <span className="hb-yi8-n">{n}</span>
                    </span>
                    <span className="hb-yi8-q">{it.question}</span>
                    <span className="hb-yi8-hint">
                      <i>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </i>
                      Tap to flip
                    </span>
                  </span>
                  <span className="hb-yi8-face hb-yi8-back" aria-hidden={!on}>
                    <span className="hb-yi8-top">
                      <span className="hb-yi8-tag">{it.tag}</span>
                      <span className="hb-yi8-n">{n}</span>
                    </span>
                    <span className="hb-yi8-a">{it.answer}</span>
                    <span className="hb-yi8-backq">Tap to flip back</span>
                  </span>
                  <span className="hb-yi8-sr">{on ? `${it.question} ${it.answer}` : `${it.question}, show answer`}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {cta ? (
          <div className="hb-yi8-foot">
            <p>
              <b>Still deciding?</b> Get a walkthrough of your own studio setup.
            </p>
            <a className="hb-yi8-cta" href={cta.href}>
              {cta.label}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
