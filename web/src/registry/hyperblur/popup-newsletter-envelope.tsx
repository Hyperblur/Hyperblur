"use client";

import * as React from "react";

export interface PopupNewsletterEnvelopeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  description?: string;
  topics?: string[];
  defaultTopics?: string[];
  footnote?: string;
  onSubscribe?: (email: string, topics: string[]) => void | Promise<void>;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
  triggerLabel?: string;
  embedded?: boolean;
  accent?: string;
}

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useModal(active: boolean, panelRef: React.RefObject<HTMLElement | null>, onClose: () => void) {
  const closeRef = React.useRef(onClose);
  React.useEffect(() => {
    closeRef.current = onClose;
  });
  React.useEffect(() => {
    if (!active) return;
    const panel = panelRef.current;
    if (!panel) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    (panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel).focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(focusable)).filter((n) => n.getClientRects().length > 0);
      if (!nodes.length) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const cur = document.activeElement;
      if (e.shiftKey && (cur === first || cur === panel || !panel.contains(cur))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (cur === last || !panel.contains(cur))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [active, panelRef]);
}

function usePresence(open: boolean, ms: number) {
  const [mounted, setMounted] = React.useState(open);
  if (open && !mounted) setMounted(true);
  React.useEffect(() => {
    if (open || !mounted) return;
    const t = window.setTimeout(() => setMounted(false), ms);
    return () => window.clearTimeout(t);
  }, [open, mounted, ms]);
  return mounted;
}

const css = `
.hb-xf3 { --hb-xf3-accent: #ff7a45; box-sizing: border-box; font-family: inherit; color: #ededed; }
.hb-xf3 *, .hb-xf3 *::before, .hb-xf3 *::after { box-sizing: border-box; }
.hb-xf3-embedded { position: relative; width: 100%; height: 100%; display: grid; place-items: center; }
.hb-xf3-trigger { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 16px; border-radius: 999px; font-size: 13.5px; font-weight: 600; color: #0a0a0a; background: linear-gradient(#fff, #e2e2e2); box-shadow: inset 0 -1px 0 rgba(0,0,0,.2), 0 6px 18px -8px rgba(255,255,255,.35); cursor: pointer; transition: transform .18s cubic-bezier(.3,.7,.4,1); }
.hb-xf3-trigger:hover { transform: translateY(-1px); }
.hb-xf3-trigger:active { transform: scale(.97); }
.hb-xf3-trigger:focus-visible { outline: 2px solid var(--hb-xf3-accent); outline-offset: 3px; }
.hb-xf3-trigger svg { width: 15px; height: 15px; }
.hb-xf3-overlay { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 16px; min-height: 100dvh; }
.hb-xf3-embedded .hb-xf3-overlay { position: relative; inset: auto; min-height: 0; padding: 0; width: 100%; }
.hb-xf3-scrim { position: absolute; inset: 0; background: radial-gradient(120% 80% at 50% 40%, rgba(10,10,10,.55), rgba(0,0,0,.82)); backdrop-filter: blur(6px); animation: hb-xf3-fade .3s ease both; }
.hb-xf3-embedded .hb-xf3-scrim { display: none; }
.hb-xf3-overlay[data-state="closed"] .hb-xf3-scrim { animation: hb-xf3-fade .2s ease reverse both; }
.hb-xf3-panel { position: relative; container-type: inline-size; width: min(580px, 100%); max-height: calc(100dvh - 32px); overflow: auto; display: grid; grid-template-columns: 220px 1fr; border-radius: 22px; background: #111; border: 1px solid #2a2a2a; box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 40px 80px -30px rgba(0,0,0,.9); outline: none; animation: hb-xf3-pop .45s cubic-bezier(.16,1,.3,1) both; }
.hb-xf3-overlay[data-state="closed"] .hb-xf3-panel { animation: hb-xf3-drop .2s cubic-bezier(.4,0,1,1) both; }
.hb-xf3-art { position: relative; display: grid; place-items: center; overflow: hidden; background: radial-gradient(90% 70% at 50% 35%, color-mix(in srgb, var(--hb-xf3-accent) 32%, #111), #141414 75%); border-right: 1px solid #222; }
.hb-xf3-art::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px); background-size: 14px 14px; mask-image: radial-gradient(circle at 50% 45%, #000 20%, transparent 75%); }
.hb-xf3-env { position: relative; width: 150px; height: 150px; }
.hb-xf3-env svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-xf3-letter { transition: transform .7s cubic-bezier(.65,0,.35,1); animation: hb-xf3-float 3.2s ease-in-out infinite; }
.hb-xf3[data-phase="sending"] .hb-xf3-letter, .hb-xf3[data-phase="done"] .hb-xf3-letter { animation: none; transform: translateY(46px); }
.hb-xf3-flap { transform-origin: 75px 62px; transform: scaleY(-1); transition: transform .45s cubic-bezier(.65,0,.35,1) .45s; }
.hb-xf3[data-phase="sending"] .hb-xf3-flap, .hb-xf3[data-phase="done"] .hb-xf3-flap { transform: scaleY(1); }
.hb-xf3-flapback { transform-origin: 75px 62px; }
.hb-xf3-seal { transform-origin: 75px 92px; transform: scale(0) rotate(-40deg); opacity: 0; }
.hb-xf3[data-phase="done"] .hb-xf3-seal { animation: hb-xf3-stamp .5s cubic-bezier(.3,1.6,.5,1) both; }
.hb-xf3[data-phase="done"] .hb-xf3-env { animation: hb-xf3-lift .8s cubic-bezier(.2,.8,.2,1) .2s both; }
.hb-xf3-body { padding: 26px 26px 22px; display: grid; align-content: start; gap: 14px; min-width: 0; }
.hb-xf3-close { all: unset; position: absolute; top: 12px; right: 12px; display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; color: #8f8f8f; cursor: pointer; transition: background .2s, color .2s; z-index: 2; }
.hb-xf3-close:hover { background: #1f1f1f; color: #ededed; }
.hb-xf3-close:focus-visible { outline: 2px solid var(--hb-xf3-accent); outline-offset: 1px; }
.hb-xf3-close svg { width: 14px; height: 14px; }
.hb-xf3-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; color: color-mix(in srgb, var(--hb-xf3-accent) 70%, #fff); }
.hb-xf3-eyebrow i { font-style: normal; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-xf3-accent); box-shadow: 0 0 10px var(--hb-xf3-accent); }
.hb-xf3-title { margin: 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 24px; line-height: 1.1; font-weight: 600; letter-spacing: -.025em; }
.hb-xf3-desc { margin: -4px 0 0; font-size: 13px; line-height: 1.5; color: #a1a1a1; }
.hb-xf3-topics { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-xf3-topic { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 11px 0 9px; border-radius: 999px; font-size: 12px; color: #a1a1a1; border: 1px solid #2a2a2a; background: #151515; cursor: pointer; transition: all .2s cubic-bezier(.3,.7,.4,1); }
.hb-xf3-topic:hover { color: #ededed; border-color: #3a3a3a; }
.hb-xf3-topic:focus-visible { outline: 2px solid var(--hb-xf3-accent); outline-offset: 2px; }
.hb-xf3-topic[aria-pressed="true"] { color: #ededed; border-color: color-mix(in srgb, var(--hb-xf3-accent) 55%, #2a2a2a); background: color-mix(in srgb, var(--hb-xf3-accent) 12%, #151515); }
.hb-xf3-box { width: 14px; height: 14px; border-radius: 4px; display: grid; place-items: center; border: 1px solid #3a3a3a; transition: all .2s; }
.hb-xf3-topic[aria-pressed="true"] .hb-xf3-box { background: var(--hb-xf3-accent); border-color: var(--hb-xf3-accent); }
.hb-xf3-box svg { width: 10px; height: 10px; color: #0a0a0a; stroke-dasharray: 14; stroke-dashoffset: 14; transition: stroke-dashoffset .25s ease .05s; }
.hb-xf3-topic[aria-pressed="true"] .hb-xf3-box svg { stroke-dashoffset: 0; }
.hb-xf3-form { display: grid; gap: 6px; }
.hb-xf3-label { font-size: 12px; color: #a1a1a1; }
.hb-xf3-row { display: flex; gap: 6px; padding: 4px; border-radius: 14px; background: #0c0c0c; border: 1px solid #2a2a2a; box-shadow: inset 0 1px 2px rgba(0,0,0,.5); transition: border-color .2s, box-shadow .2s; }
.hb-xf3-row:focus-within { border-color: color-mix(in srgb, var(--hb-xf3-accent) 60%, #2a2a2a); box-shadow: inset 0 1px 2px rgba(0,0,0,.5), 0 0 0 4px color-mix(in srgb, var(--hb-xf3-accent) 16%, transparent); }
.hb-xf3-row[data-invalid="true"] { border-color: #ff5d5d; animation: hb-xf3-shake .4s cubic-bezier(.36,.07,.19,.97) both; }
.hb-xf3-row[data-invalid="true"][data-shake="1"] { animation-name: hb-xf3-shake2; }
.hb-xf3-input { flex: 1; min-width: 0; height: 36px; padding: 0 10px; border: 0; outline: 0; background: transparent; color: #ededed; font: inherit; font-size: 13.5px; }
.hb-xf3-input::placeholder { color: #5f5f5f; }
.hb-xf3-submit { all: unset; box-sizing: border-box; position: relative; display: inline-flex; align-items: center; justify-content: center; min-width: 108px; height: 36px; padding: 0 14px; border-radius: 10px; font-size: 13px; font-weight: 600; color: #fff; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xf3-accent) 85%, #fff), var(--hb-xf3-accent)); box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 6px 16px -6px var(--hb-xf3-accent); cursor: pointer; transition: transform .15s cubic-bezier(.3,.7,.4,1), filter .2s; }
.hb-xf3-submit:hover { filter: brightness(1.08); }
.hb-xf3-submit:active { transform: scale(.97); }
.hb-xf3-submit:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xf3-submit[aria-busy="true"] { cursor: progress; }
.hb-xf3-dots { display: inline-flex; gap: 4px; }
.hb-xf3-dots i { font-style: normal; width: 5px; height: 5px; border-radius: 50%; background: #fff; animation: hb-xf3-dot 1s ease-in-out infinite; }
.hb-xf3-dots i:nth-child(2) { animation-delay: .15s; }
.hb-xf3-dots i:nth-child(3) { animation-delay: .3s; }
.hb-xf3-error { margin: 0; font-size: 11.5px; color: #ff7a7a; min-height: 16px; }
.hb-xf3-foot { margin: 0; font-size: 11.5px; color: #6f6f6f; }
.hb-xf3-done { display: grid; gap: 10px; animation: hb-xf3-up .5s cubic-bezier(.16,1,.3,1) .35s both; }
.hb-xf3-mail { display: inline-flex; align-items: center; gap: 8px; width: fit-content; max-width: 100%; height: 30px; padding: 0 12px; border-radius: 999px; font-family: var(--font-mono), ui-monospace, monospace; font-size: 12px; color: #ededed; background: #171717; border: 1px solid #262626; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xf3-mail i { font-style: normal; width: 7px; height: 7px; border-radius: 50%; background: #3ddc84; flex: none; }
.hb-xf3-ghost { all: unset; box-sizing: border-box; width: fit-content; height: 34px; padding: 0 14px; border-radius: 10px; font-size: 13px; font-weight: 500; color: #ededed; border: 1px solid #2a2a2a; background: #171717; cursor: pointer; transition: border-color .2s; }
.hb-xf3-ghost:hover { border-color: #3a3a3a; }
.hb-xf3-ghost:focus-visible { outline: 2px solid var(--hb-xf3-accent); outline-offset: 2px; }
.hb-xf3-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 520px) {
  .hb-xf3-panel { grid-template-columns: 1fr; }
  .hb-xf3-art { height: 130px; border-right: 0; border-bottom: 1px solid #222; }
  .hb-xf3-env { transform: scale(.72); }
  .hb-xf3-body { padding: 20px; }
}
@keyframes hb-xf3-fade { from { opacity: 0; } }
@keyframes hb-xf3-pop { from { opacity: 0; transform: translateY(18px) scale(.96); } }
@keyframes hb-xf3-drop { to { opacity: 0; transform: translateY(10px) scale(.98); } }
@keyframes hb-xf3-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes hb-xf3-stamp { 0% { opacity: 0; transform: scale(2.2) rotate(-40deg); } 60% { opacity: 1; transform: scale(.9) rotate(6deg); } 100% { opacity: 1; transform: scale(1) rotate(0); } }
@keyframes hb-xf3-lift { 0% { transform: none; } 40% { transform: translateY(-8px) rotate(-3deg); } 100% { transform: translateY(-2px) rotate(-2deg); } }
@keyframes hb-xf3-shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(3px); } 30%, 50%, 70% { transform: translateX(-5px); } 40%, 60% { transform: translateX(5px); } }
@keyframes hb-xf3-shake2 { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(3px); } 30%, 50%, 70% { transform: translateX(-5px); } 40%, 60% { transform: translateX(5px); } }
@keyframes hb-xf3-dot { 0%, 100% { transform: translateY(0); opacity: .5; } 50% { transform: translateY(-3px); opacity: 1; } }
@keyframes hb-xf3-up { from { opacity: 0; transform: translateY(8px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xf3 *, .hb-xf3 *::before { animation: none !important; transition: none !important; }
  .hb-xf3[data-phase="done"] .hb-xf3-seal { opacity: 1; transform: none; }
}
`;

const defaultTopicList = ["Product updates", "Engineering notes", "Case studies"];

export function PopupNewsletterEnvelope({
  title = "The Friday Changelog",
  description = "One short email every Friday with what shipped, what broke and what we learned. Read by 18,400 builders.",
  topics = defaultTopicList,
  defaultTopics = ["Product updates", "Engineering notes"],
  footnote = "No spam. Unsubscribe with one click.",
  onSubscribe,
  open,
  defaultOpen,
  onOpenChange,
  showTrigger = true,
  triggerLabel = "Get the newsletter",
  embedded = false,
  accent = "#ff7a45",
  className = "",
  style,
  ...rest
}: PopupNewsletterEnvelopeProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const mounted = usePresence(isOpen, 220);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const touched = React.useRef(false);
  const [email, setEmail] = React.useState("");
  const [picked, setPicked] = React.useState<string[]>(defaultTopics);
  const [phase, setPhase] = React.useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = React.useState("");
  const [shakeKey, setShakeKey] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const setOpen = React.useCallback(
    (value: boolean) => {
      touched.current = true;
      if (open === undefined) setInner(value);
      onOpenChange?.(value);
    },
    [open, onOpenChange],
  );

  const close = React.useCallback(() => setOpen(false), [setOpen]);
  useModal(isOpen && !embedded, panelRef, close);

  React.useEffect(() => {
    if (!embedded || !touched.current) return;
    if (isOpen) panelRef.current?.focus({ preventScroll: true });
    else triggerRef.current?.focus({ preventScroll: true });
  }, [embedded, isOpen]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phase !== "idle") return;
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError(value ? "That address looks incomplete." : "Enter your email to subscribe.");
      setShakeKey((k) => k + 1);
      inputRef.current?.focus();
      return;
    }
    setError("");
    setPhase("sending");
    const wait = new Promise((r) => window.setTimeout(r, 900));
    try {
      await Promise.all([onSubscribe?.(value, picked), wait]);
      setPhase("done");
    } catch {
      setPhase("idle");
      setError("Something went wrong. Try again in a moment.");
    }
  };

  const toggleTopic = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <div
      className={`hb-xf3 ${embedded ? "hb-xf3-embedded" : ""} ${className}`}
      data-phase={phase}
      style={{ "--hb-xf3-accent": accent, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (embedded && e.key === "Escape" && isOpen) {
          e.stopPropagation();
          close();
        }
      }}
      {...rest}
    >
      <style href="hb-popup-newsletter-envelope" precedence="default">{css}</style>
      {showTrigger && (!embedded || !mounted) && (
        <button ref={triggerRef} type="button" className="hb-xf3-trigger" aria-haspopup="dialog" onClick={() => setOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>
          {triggerLabel}
        </button>
      )}
      {mounted && (
        <div className="hb-xf3-overlay" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xf3-scrim" onClick={close} aria-hidden="true" />
          <div
            ref={panelRef}
            className="hb-xf3-panel"
            role="dialog"
            aria-modal={embedded ? undefined : true}
            aria-labelledby={`${uid}-t`}
            aria-describedby={`${uid}-d`}
            tabIndex={-1}
          >
            <button type="button" className="hb-xf3-close" aria-label="Close" onClick={close}>
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m3 3 8 8M11 3l-8 8" /></svg>
            </button>
            <div className="hb-xf3-art" aria-hidden="true">
              <div className="hb-xf3-env">
                <svg viewBox="0 0 150 150">
                  <defs>
                    <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#2a2a2a" />
                      <stop offset="1" stopColor="#1a1a1a" />
                    </linearGradient>
                    <linearGradient id={`${uid}-paper`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#fafaf7" />
                      <stop offset="1" stopColor="#e6e3da" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="75" cy="132" rx="52" ry="5" fill="rgba(0,0,0,.45)" />
                  <path className="hb-xf3-flapback" d="M20 62 L75 98 L130 62 Z" fill="#232323" />
                  <rect x="20" y="62" width="110" height="64" rx="6" fill="#202020" />
                  <g className="hb-xf3-letter">
                    <rect x="32" y="20" width="86" height="80" rx="4" fill={`url(#${uid}-paper)`} />
                    <rect x="42" y="32" width="38" height="5" rx="2.5" fill={accent} />
                    <rect x="42" y="44" width="66" height="3.5" rx="1.75" fill="#c9c5ba" />
                    <rect x="42" y="52" width="58" height="3.5" rx="1.75" fill="#c9c5ba" />
                    <rect x="42" y="60" width="62" height="3.5" rx="1.75" fill="#c9c5ba" />
                  </g>
                  <path d="M20 68 L75 102 L130 68 L130 120 a6 6 0 0 1 -6 6 L26 126 a6 6 0 0 1 -6 -6 Z" fill={`url(#${uid}-body)`} />
                  <path d="M20 124 L66 92 M130 124 L84 92" stroke="#151515" strokeWidth="1.5" />
                  <path className="hb-xf3-flap" d="M20 62 L75 98 L130 62 Z" fill="#2c2c2c" stroke="#333" strokeWidth="1" strokeLinejoin="round" />
                  <g className="hb-xf3-seal">
                    <circle cx="75" cy="92" r="13" fill={accent} />
                    <circle cx="75" cy="92" r="9.5" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="m69.5 92.3 3.6 3.6 7.4-7.6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="hb-xf3-body">
              <span className="hb-xf3-eyebrow"><i />Weekly newsletter</span>
              {phase !== "done" ? (
                <>
                  <h2 className="hb-xf3-title" id={`${uid}-t`}>{title}</h2>
                  <p className="hb-xf3-desc" id={`${uid}-d`}>{description}</p>
                  <div className="hb-xf3-topics" role="group" aria-label="Topics">
                    {topics.map((t) => (
                      <button key={t} type="button" className="hb-xf3-topic" aria-pressed={picked.includes(t)} onClick={() => toggleTopic(t)}>
                        <span className="hb-xf3-box" aria-hidden="true">
                          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m2 5.2 2 2 4-4.4" /></svg>
                        </span>
                        {t}
                      </button>
                    ))}
                  </div>
                  <form className="hb-xf3-form" onSubmit={submit} noValidate>
                    <label className="hb-xf3-label" htmlFor={`${uid}-e`}>Email address</label>
                    <div className="hb-xf3-row" data-invalid={error ? "true" : "false"} data-shake={shakeKey % 2}>
                      <input
                        id={`${uid}-e`}
                        ref={inputRef}
                        data-autofocus
                        className="hb-xf3-input"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="you@company.com"
                        value={email}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={`${uid}-err`}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                      />
                      <button type="submit" className="hb-xf3-submit" aria-busy={phase === "sending"}>
                        {phase === "sending" ? (
                          <span className="hb-xf3-dots" aria-hidden="true"><i /><i /><i /></span>
                        ) : (
                          "Subscribe"
                        )}
                        {phase === "sending" && <span className="hb-xf3-sr">Subscribing</span>}
                      </button>
                    </div>
                    <p className="hb-xf3-error" id={`${uid}-err`} role="alert">{error}</p>
                  </form>
                  <p className="hb-xf3-foot">{footnote}</p>
                </>
              ) : (
                <div className="hb-xf3-done" role="status">
                  <h2 className="hb-xf3-title" id={`${uid}-t`}>Sealed and sent.</h2>
                  <p className="hb-xf3-desc" id={`${uid}-d`}>Confirm the address below and your first issue lands on Friday.</p>
                  <span className="hb-xf3-mail"><i aria-hidden="true" />{email.trim()}</span>
                  <button type="button" className="hb-xf3-ghost" data-autofocus onClick={close}>Back to reading</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
