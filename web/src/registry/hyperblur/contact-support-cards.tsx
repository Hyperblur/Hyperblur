"use client";

import * as React from "react";

export interface ContactSupportLink {
  label: string;
  href: string;
}

export interface ContactSupportChannel {
  icon: "docs" | "community" | "priority";
  title: string;
  description: string;
  response: string;
  points: string[];
  cta: ContactSupportLink;
  badge?: string;
  featured?: boolean;
}

export interface ContactSupportValues {
  question: string;
}

export interface ContactSupportCardsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  channels?: ContactSupportChannel[];
  askLabel?: string;
  askPlaceholder?: string;
  successMessage?: string;
  onSubmit?: (values: ContactSupportValues) => void | Promise<unknown>;
  accent?: string;
}

const css = `
@keyframes hb-kf7-rise {
  from { opacity: 0; translate: 0 18px; }
  to { opacity: 1; translate: 0 0; }
}
@keyframes hb-kf7-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-kf7-ping {
  0% { transform: scale(1); opacity: .7; }
  100% { transform: scale(2.6); opacity: 0; }
}
@keyframes hb-kf7-spin { to { transform: rotate(360deg); } }
@keyframes hb-kf7-fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(var(--hb-kf7-v, .3)); }
}
.hb-kf7 {
  --hb-kf7-accent: #a78bfa;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 72px 16px 80px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kf7 *, .hb-kf7 *::before, .hb-kf7 *::after { box-sizing: border-box; }
.hb-kf7::before {
  content: "";
  position: absolute;
  top: -180px;
  left: 50%;
  z-index: -1;
  width: 900px;
  height: 480px;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kf7-accent) 14%, transparent), transparent);
  transform: translateX(-50%);
}
.hb-kf7-inner { max-width: 1120px; margin: 0 auto; }
.hb-kf7-head { display: flex; flex-direction: column; align-items: center; gap: 14px; margin-bottom: 44px; text-align: center; }
.hb-kf7-eyebrow { margin: 0; padding: 5px 12px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 999px; background: rgba(255, 255, 255, .03); color: #a1a1a1; font-size: 12px; font-weight: 550; }
.hb-kf7-title { margin: 0; font-size: clamp(32px, 6cqw, 54px); font-weight: 650; line-height: 1.02; letter-spacing: -.045em; }
.hb-kf7-sub { max-width: 520px; margin: 0; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-kf7-grid { display: grid; grid-template-columns: 1fr; gap: 14px; perspective: 1200px; }
.hb-kf7-card {
  --hb-kf7-rx: 0deg;
  --hb-kf7-ry: 0deg;
  --hb-kf7-mx: 50%;
  --hb-kf7-my: 0%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 22px;
  background: linear-gradient(180deg, #141414, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 30px 60px -40px rgba(0, 0, 0, .9);
  transform: rotateX(var(--hb-kf7-rx)) rotateY(var(--hb-kf7-ry));
  transform-style: preserve-3d;
  transition: transform .5s cubic-bezier(.2, .8, .2, 1), border-color .3s ease;
  animation: hb-kf7-rise .7s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(var(--hb-kf7-i) * 110ms);
  will-change: transform;
}
.hb-kf7-card[data-live="true"] { transition: transform .08s linear, border-color .3s ease; }
.hb-kf7-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(420px circle at var(--hb-kf7-mx) var(--hb-kf7-my), rgba(255, 255, 255, .06), transparent 45%);
  opacity: 0;
  transition: opacity .3s ease;
  pointer-events: none;
}
.hb-kf7-card:hover { border-color: rgba(255, 255, 255, .16); }
.hb-kf7-card:hover::before { opacity: 1; }
.hb-kf7-card[data-featured="true"] {
  border-color: color-mix(in srgb, var(--hb-kf7-accent) 45%, transparent);
  background:
    radial-gradient(120% 70% at 50% 0%, color-mix(in srgb, var(--hb-kf7-accent) 16%, transparent), transparent 60%),
    linear-gradient(180deg, #15131b, #0e0e10);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 30px 80px -40px color-mix(in srgb, var(--hb-kf7-accent) 60%, transparent);
}
.hb-kf7-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 22px; transform: translateZ(30px); }
.hb-kf7-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 13px;
  background: linear-gradient(160deg, #222, #141414);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08);
  color: #ededed;
}
.hb-kf7-card[data-featured="true"] .hb-kf7-icon { border-color: color-mix(in srgb, var(--hb-kf7-accent) 45%, transparent); color: var(--hb-kf7-accent); }
.hb-kf7-chip { display: inline-flex; align-items: center; gap: 7px; padding: 5px 10px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 999px; background: rgba(255, 255, 255, .03); color: #d4d4d4; font-size: 12px; font-weight: 550; white-space: nowrap; }
.hb-kf7-dot { position: relative; width: 6px; height: 6px; border-radius: 50%; background: #4ade80; }
.hb-kf7-dot::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: inherit; animation: hb-kf7-ping 2s ease-out infinite; }
.hb-kf7-chip[data-tone="1"] .hb-kf7-dot { background: #60a5fa; }
.hb-kf7-chip[data-tone="2"] .hb-kf7-dot { background: var(--hb-kf7-accent); }
.hb-kf7-ctitle { display: flex; align-items: center; gap: 10px; margin: 0; font-size: 20px; font-weight: 650; letter-spacing: -.02em; transform: translateZ(24px); }
.hb-kf7-badge { padding: 2px 8px; border-radius: 6px; background: var(--hb-kf7-accent); color: #160f2b; font-size: 11px; font-weight: 700; letter-spacing: .02em; }
.hb-kf7-cdesc { margin: 8px 0 20px; color: #8f8f8f; font-size: 14px; line-height: 1.55; }
.hb-kf7-viz { margin-bottom: 20px; padding: 12px; border: 1px solid rgba(255, 255, 255, .06); border-radius: 14px; background: rgba(0, 0, 0, .25); transform: translateZ(16px); }
.hb-kf7-search { display: flex; align-items: center; gap: 8px; color: #6f6f6f; font-size: 13px; }
.hb-kf7-search kbd { margin-left: auto; padding: 2px 6px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 6px; background: #161616; color: #a1a1a1; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; }
.hb-kf7-lines { display: grid; gap: 6px; margin-top: 10px; }
.hb-kf7-lines i { height: 6px; border-radius: 4px; background: rgba(255, 255, 255, .07); }
.hb-kf7-lines i:nth-child(1) { width: 82%; }
.hb-kf7-lines i:nth-child(2) { width: 64%; }
.hb-kf7-lines i:nth-child(3) { width: 74%; }
.hb-kf7-faces { display: flex; align-items: center; }
.hb-kf7-face { display: grid; place-items: center; width: 28px; height: 28px; margin-left: -8px; border: 2px solid #101010; border-radius: 50%; color: #fff; font-size: 10px; font-weight: 700; }
.hb-kf7-face:first-child { margin-left: 0; }
.hb-kf7-online { margin-left: 10px; color: #a1a1a1; font-size: 12px; }
.hb-kf7-online strong { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-kf7-meter { display: flex; justify-content: space-between; margin-bottom: 8px; color: #a1a1a1; font-size: 12px; }
.hb-kf7-meter strong { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-kf7-track { height: 6px; overflow: hidden; border-radius: 4px; background: rgba(255, 255, 255, .07); }
.hb-kf7-track i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--hb-kf7-accent), color-mix(in srgb, var(--hb-kf7-accent) 50%, #fff)); transform-origin: left; transform: scaleX(var(--hb-kf7-v, .3)); animation: hb-kf7-fill 1.2s .5s cubic-bezier(.2, .8, .2, 1) both; }
.hb-kf7-points { display: grid; gap: 9px; margin: 0 0 24px; padding: 0; list-style: none; }
.hb-kf7-points li { display: flex; align-items: flex-start; gap: 9px; color: #d4d4d4; font-size: 13px; line-height: 1.45; }
.hb-kf7-points svg { flex: none; margin-top: 2px; color: #6f6f6f; }
.hb-kf7-card[data-featured="true"] .hb-kf7-points svg { color: var(--hb-kf7-accent); }
.hb-kf7-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  margin-top: auto;
  color: #ededed;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
}
.hb-kf7-cta::after { content: ""; position: absolute; inset: 0; z-index: 1; border-radius: 22px; }
.hb-kf7-cta svg { transition: transform .25s ease; }
.hb-kf7-card:hover .hb-kf7-cta svg { transform: translateX(3px); }
.hb-kf7-cta:focus-visible { outline: none; }
.hb-kf7-cta:focus-visible::after { outline: 2px solid var(--hb-kf7-accent); outline-offset: 3px; }
.hb-kf7-card[data-featured="true"] .hb-kf7-cta { color: var(--hb-kf7-accent); }
.hb-kf7-ask { display: flex; flex-direction: column; align-items: center; gap: 12px; max-width: 640px; margin: 48px auto 0; }
.hb-kf7-asklabel { color: #a1a1a1; font-size: 14px; }
.hb-kf7-askform { position: relative; display: flex; align-items: center; gap: 8px; width: 100%; margin: 0; padding: 6px 6px 6px 16px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 999px; background: #111; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04); transition: border-color .2s ease, box-shadow .2s ease; }
.hb-kf7-askform:focus-within { border-color: var(--hb-kf7-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kf7-accent) 18%, transparent); }
.hb-kf7-askform[data-invalid="true"] { border-color: #f87171; }
.hb-kf7-askform > svg { flex: none; color: #6f6f6f; }
.hb-kf7-askinput { flex: 1; min-width: 0; height: 40px; padding: 0; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 15px; outline: none; }
.hb-kf7-askinput::placeholder { color: #5c5c5c; }
.hb-kf7-askbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: none;
  height: 40px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  transition: background .2s ease, transform .2s ease;
}
.hb-kf7-askbtn:hover:not(:disabled) { background: #fff; }
.hb-kf7-askbtn:active:not(:disabled) { transform: translateY(1px); }
.hb-kf7-askbtn:disabled { cursor: progress; opacity: .8; }
.hb-kf7-askbtn:focus-visible { outline: 2px solid var(--hb-kf7-accent); outline-offset: 2px; }
.hb-kf7-spin { width: 14px; height: 14px; border: 2px solid rgba(10, 10, 10, .25); border-top-color: #0a0a0a; border-radius: 50%; animation: hb-kf7-spin .7s linear infinite; }
.hb-kf7-err { margin: 0; color: #fca5a5; font-size: 13px; animation: hb-kf7-in .2s ease both; }
.hb-kf7-done { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px 14px; width: 100%; padding: 14px 18px; border: 1px solid color-mix(in srgb, var(--hb-kf7-accent) 35%, transparent); border-radius: 18px; background: color-mix(in srgb, var(--hb-kf7-accent) 8%, #0e0e0e); color: #ededed; font-size: 14px; text-align: center; animation: hb-kf7-in .3s ease both; }
.hb-kf7-done svg { flex: none; color: var(--hb-kf7-accent); }
.hb-kf7-again { padding: 4px 6px; border: 0; border-radius: 6px; background: transparent; color: var(--hb-kf7-accent); font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
.hb-kf7-again:hover { text-decoration: underline; text-underline-offset: 3px; }
.hb-kf7-again:focus-visible { outline: 2px solid var(--hb-kf7-accent); outline-offset: 2px; }
.hb-kf7-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (min-width: 620px) and (max-width: 879px) {
  .hb-kf7-grid { grid-template-columns: 1fr 1fr; }
  .hb-kf7-card[data-featured="true"] { grid-column: 1 / -1; }
}
@container (min-width: 880px) {
  .hb-kf7 { padding: 112px 32px 120px; }
  .hb-kf7-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .hb-kf7-card { padding: 28px; }
}
@container (max-width: 420px) {
  .hb-kf7-askform > svg { display: none; }
  .hb-kf7-askbtn { padding: 0 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kf7-card, .hb-kf7-dot::after, .hb-kf7-track i, .hb-kf7-err, .hb-kf7-done { animation: none; }
  .hb-kf7-card, .hb-kf7-card::before, .hb-kf7-cta svg, .hb-kf7-askform, .hb-kf7-askbtn { transition: none; }
  .hb-kf7-card { transform: none; }
  .hb-kf7-spin { animation-duration: 2s; }
}
`;

const defaultChannels: ContactSupportChannel[] = [
  {
    icon: "docs",
    title: "Documentation",
    description: "Guides, API reference and recipes for every feature, updated with each release.",
    response: "Instant answers",
    points: ["380 articles and 64 code recipes", "Versioned API reference", "Copy-ready snippets in 6 languages"],
    cta: { label: "Browse the docs", href: "#docs" },
  },
  {
    icon: "priority",
    title: "Priority support",
    description: "A named engineer who knows your setup, with a guaranteed first reply.",
    response: "15 min SLA",
    points: ["Shared Slack channel with our team", "Incident escalation around the clock", "Quarterly architecture reviews"],
    cta: { label: "Open a priority ticket", href: "#priority" },
    badge: "Pro",
    featured: true,
  },
  {
    icon: "community",
    title: "Community",
    description: "Ask the 24,000 builders in our forum and Discord. Staff drop in every day.",
    response: "Under 2 hours",
    points: ["Weekly office hours with the core team", "Searchable answers since 2021", "Templates shared by members"],
    cta: { label: "Join the community", href: "#community" },
  },
];

const faces = [
  { i: "AK", h: 262 },
  { i: "JT", h: 190 },
  { i: "RM", h: 24 },
  { i: "SL", h: 330 },
];

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise((resolve) => setTimeout(resolve, 900));
}

function ChannelIcon({ icon }: { icon: ContactSupportChannel["icon"] }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (icon === "community") {
    return (
      <svg {...common}>
        <circle cx="9" cy="8.5" r="3.2" />
        <path d="M3 19.5c.6-3.2 3-5 6-5s5.4 1.8 6 5" />
        <path d="M16 5.6a3 3 0 0 1 0 5.8M18 14.6c1.6.7 2.7 2.4 3 4.9" />
      </svg>
    );
  }
  if (icon === "priority") {
    return (
      <svg {...common}>
        <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M5 3.5h10l4 4v13H5v-17Z" />
      <path d="M14.5 3.5v4.5H19M8.5 12.5h7M8.5 16h5" />
    </svg>
  );
}

function Viz({ icon }: { icon: ContactSupportChannel["icon"] }) {
  if (icon === "community") {
    return (
      <div className="hb-kf7-viz" aria-hidden="true">
        <div className="hb-kf7-faces">
          {faces.map((f) => (
            <span key={f.i} className="hb-kf7-face" style={{ background: `linear-gradient(135deg, hsl(${f.h} 65% 55%), hsl(${(f.h + 40) % 360} 65% 40%))` }}>
              {f.i}
            </span>
          ))}
          <span className="hb-kf7-online">
            <strong>1,284</strong> online now
          </span>
        </div>
      </div>
    );
  }
  if (icon === "priority") {
    return (
      <div className="hb-kf7-viz" aria-hidden="true">
        <div className="hb-kf7-meter">
          <span>Median first reply today</span>
          <strong>6 min</strong>
        </div>
        <div className="hb-kf7-track">
          <i style={{ "--hb-kf7-v": 0.4 } as React.CSSProperties} />
        </div>
      </div>
    );
  }
  return (
    <div className="hb-kf7-viz" aria-hidden="true">
      <div className="hb-kf7-search">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="7" cy="7" r="4.5" />
          <path d="m10.5 10.5 3 3" />
        </svg>
        Search webhooks, auth, limits
        <kbd>/</kbd>
      </div>
      <div className="hb-kf7-lines">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function tiltMove(event: React.PointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  el.dataset.live = "true";
  el.style.setProperty("--hb-kf7-ry", `${((x - 0.5) * 10).toFixed(2)}deg`);
  el.style.setProperty("--hb-kf7-rx", `${((0.5 - y) * 8).toFixed(2)}deg`);
  el.style.setProperty("--hb-kf7-mx", `${(x * 100).toFixed(1)}%`);
  el.style.setProperty("--hb-kf7-my", `${(y * 100).toFixed(1)}%`);
}

function tiltLeave(event: React.PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  delete el.dataset.live;
  el.style.setProperty("--hb-kf7-ry", "0deg");
  el.style.setProperty("--hb-kf7-rx", "0deg");
}

export function ContactSupportCards({
  eyebrow = "Support",
  title = "How can we help?",
  subtitle = "Pick the fastest route to an answer. Every channel is staffed by the engineers who build the product.",
  channels = defaultChannels,
  askLabel = "Still stuck? Ask us directly.",
  askPlaceholder = "How do I rotate API keys without downtime?",
  successMessage = "Got it. Your question is in the queue and we usually reply in about 2 hours.",
  onSubmit,
  accent = "#a78bfa",
  className = "",
  style,
  ...rest
}: ContactSupportCardsProps) {
  const uid = React.useId();
  const [question, setQuestion] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [failure, setFailure] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const againRef = React.useRef<HTMLButtonElement>(null);
  const moved = React.useRef(false);

  React.useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    if (status === "success") againRef.current?.focus();
    else if (status === "idle") inputRef.current?.focus();
  }, [status]);

  const trimmed = question.trim();
  const error = !trimmed ? "Type your question first." : trimmed.length < 10 ? "Add a few more words so we can route it to the right person." : "";
  const shownError = failure || (submitted && error) || "";
  const loading = status === "loading";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setSubmitted(true);
    setFailure("");
    if (error) {
      inputRef.current?.focus();
      return;
    }
    setStatus("loading");
    try {
      await wait(onSubmit?.({ question: trimmed }));
      moved.current = true;
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setFailure(err instanceof Error && err.message ? err.message : "That didn't send. Please try again.");
    }
  }

  function again() {
    moved.current = true;
    setQuestion("");
    setSubmitted(false);
    setStatus("idle");
  }

  const vars = { "--hb-kf7-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kf7 ${className}`} style={vars} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-contact-support-cards" precedence="default">{css}</style>
      <div className="hb-kf7-inner">
        <header className="hb-kf7-head">
          {eyebrow ? <p className="hb-kf7-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-kf7-title" id={`${uid}-title`}>
            {title}
          </h2>
          {subtitle ? <p className="hb-kf7-sub">{subtitle}</p> : null}
        </header>
        <div className="hb-kf7-grid">
          {channels.map((channel, i) => (
            <article
              key={channel.title}
              className="hb-kf7-card"
              data-featured={channel.featured ? "true" : undefined}
              style={{ "--hb-kf7-i": i } as React.CSSProperties}
              onPointerMove={tiltMove}
              onPointerLeave={tiltLeave}
            >
              <div className="hb-kf7-top">
                <span className="hb-kf7-icon">
                  <ChannelIcon icon={channel.icon} />
                </span>
                <span className="hb-kf7-chip" data-tone={i % 3}>
                  <span className="hb-kf7-dot" aria-hidden="true" />
                  <span className="hb-kf7-sr">Response time: </span>
                  {channel.response}
                </span>
              </div>
              <h3 className="hb-kf7-ctitle">
                {channel.title}
                {channel.badge ? <span className="hb-kf7-badge">{channel.badge}</span> : null}
              </h3>
              <p className="hb-kf7-cdesc">{channel.description}</p>
              <Viz icon={channel.icon} />
              <ul className="hb-kf7-points">
                {channel.points.map((point) => (
                  <li key={point}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m3.5 8.3 3 3 6-6.6" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
              <a className="hb-kf7-cta" href={channel.cta.href}>
                {channel.cta.label}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </article>
          ))}
        </div>
        <div className="hb-kf7-ask">
          {status === "success" ? (
            <div className="hb-kf7-done" role="status">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12.5 2.8 2.7L16.5 9.5" />
              </svg>
              <span>{successMessage}</span>
              <button ref={againRef} type="button" className="hb-kf7-again" onClick={again}>
                Ask another
              </button>
            </div>
          ) : (
            <>
              <label className="hb-kf7-asklabel" htmlFor={`${uid}-q`}>
                {askLabel}
              </label>
              <form className="hb-kf7-askform" noValidate onSubmit={handleSubmit} data-invalid={shownError ? "true" : undefined} aria-busy={loading || undefined}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.4M12 17h.01" />
                </svg>
                <input
                  ref={inputRef}
                  id={`${uid}-q`}
                  className="hb-kf7-askinput"
                  name="question"
                  autoComplete="off"
                  placeholder={askPlaceholder}
                  value={question}
                  disabled={loading}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    if (failure) setFailure("");
                  }}
                  aria-invalid={shownError ? true : undefined}
                  aria-describedby={shownError ? `${uid}-err` : undefined}
                />
                <button type="submit" className="hb-kf7-askbtn" disabled={loading}>
                  {loading ? <span className="hb-kf7-spin" aria-hidden="true" /> : null}
                  {loading ? "Sending" : "Ask"}
                </button>
              </form>
              {shownError ? (
                <p className="hb-kf7-err" id={`${uid}-err`} role="alert">
                  {shownError}
                </p>
              ) : null}
              <span className="hb-kf7-sr" role="status">
                {loading ? "Sending your question" : ""}
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
