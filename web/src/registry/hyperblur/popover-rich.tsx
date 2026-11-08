"use client";

import * as React from "react";

export interface PopoverRichStage {
  label: string;
  seconds: number;
}

export interface PopoverRichDeployment {
  name: string;
  status: "ready" | "building" | "error";
  environment: string;
  url: string;
  branch: string;
  commit: string;
  message: string;
  author: string;
  age: string;
  stages: PopoverRichStage[];
}

export interface PopoverRichProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onToggle"> {
  deployment?: PopoverRichDeployment;
  placement?: "auto" | "top" | "bottom";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAction?: (action: "visit" | "logs" | "redeploy" | "copy") => void;
  embedded?: boolean;
  accent?: string;
}

const defaultDeployment: PopoverRichDeployment = {
  name: "Deployment #482",
  status: "ready",
  environment: "Production",
  url: "acme-store.app",
  branch: "main",
  commit: "a91c4e2",
  message: "Fix checkout tax rounding for EU carts",
  author: "Lena Ortiz",
  age: "4m ago",
  stages: [
    { label: "Build", seconds: 42 },
    { label: "Checks", seconds: 18 },
    { label: "Assign", seconds: 3 },
  ],
};

const statusText = { ready: "Ready", building: "Building", error: "Failed" };

const css = `
.hb-xf1 { --hb-xf1-accent: #2f7bff; position: relative; display: inline-flex; box-sizing: border-box; font-family: inherit; color: #ededed; vertical-align: middle; }
.hb-xf1 *, .hb-xf1 *::before, .hb-xf1 *::after { box-sizing: border-box; }
.hb-xf1-trigger { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 12px 0 10px; border-radius: 999px; font-family: inherit; font-size: 13px; font-weight: 500; line-height: 1; color: #ededed; cursor: pointer; background: linear-gradient(#1a1a1a, #131313); border: 1px solid #2a2a2a; box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.4); transition: border-color .2s, background .2s, transform .18s cubic-bezier(.3,.7,.4,1); white-space: nowrap; }
.hb-xf1-trigger:hover { border-color: #3a3a3a; background: linear-gradient(#1f1f1f, #161616); }
.hb-xf1-trigger:active { transform: scale(.97); }
.hb-xf1-trigger:focus-visible { outline: 2px solid var(--hb-xf1-accent); outline-offset: 2px; }
.hb-xf1-trigger[aria-expanded="true"] { border-color: color-mix(in srgb, var(--hb-xf1-accent) 55%, #2a2a2a); }
.hb-xf1-dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--hb-xf1-st); flex: none; }
.hb-xf1-dot::after { content: ""; position: absolute; inset: -3px; border-radius: 50%; border: 1px solid var(--hb-xf1-st); opacity: 0; animation: hb-xf1-ping 2.4s cubic-bezier(.2,.7,.3,1) infinite; }
.hb-xf1-chev { width: 12px; height: 12px; color: #8f8f8f; transition: transform .25s cubic-bezier(.3,.7,.4,1); }
.hb-xf1-trigger[aria-expanded="true"] .hb-xf1-chev { transform: rotate(180deg); }
.hb-xf1-pop { position: absolute; left: 50%; z-index: 60; width: min(320px, calc(100vw - 24px)); padding: 0; border-radius: 16px; background: linear-gradient(180deg, #181818, #111 60%); border: 1px solid #2a2a2a; box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 48px -12px rgba(0,0,0,0.7), 0 8px 16px -8px rgba(0,0,0,0.6); transform: translateX(calc(-50% + var(--hb-xf1-shift, 0px))); outline: none; }
.hb-xf1-pop[data-side="bottom"] { top: calc(100% + 12px); transform-origin: calc(50% - var(--hb-xf1-shift, 0px)) -12px; }
.hb-xf1-pop[data-side="top"] { bottom: calc(100% + 12px); transform-origin: calc(50% - var(--hb-xf1-shift, 0px)) calc(100% + 12px); }
.hb-xf1-pop[data-ready="false"] { visibility: hidden; }
.hb-xf1-pop[data-ready="true"] { animation: hb-xf1-in .32s cubic-bezier(.2,.9,.25,1.15) both; }
.hb-xf1-pop[data-state="closed"] { animation: hb-xf1-out .16s cubic-bezier(.4,0,1,1) both; pointer-events: none; }
.hb-xf1-arrow { position: absolute; left: calc(50% - var(--hb-xf1-shift, 0px)); width: 14px; height: 14px; margin-left: -7px; background: #181818; border: 1px solid #2a2a2a; transform: rotate(45deg); }
.hb-xf1-pop[data-side="bottom"] .hb-xf1-arrow { top: -7.5px; border-right: 0; border-bottom: 0; border-radius: 3px 0 0 0; }
.hb-xf1-pop[data-side="top"] .hb-xf1-arrow { bottom: -7.5px; border-left: 0; border-top: 0; background: #111; border-radius: 0 0 3px 0; }
.hb-xf1-head { display: flex; align-items: center; gap: 10px; padding: 14px 14px 12px; border-bottom: 1px solid #222; }
.hb-xf1-mark { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 9px; flex: none; background: radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--hb-xf1-accent) 60%, #fff 0%), color-mix(in srgb, var(--hb-xf1-accent) 40%, #000) 80%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 12px -4px color-mix(in srgb, var(--hb-xf1-accent) 70%, transparent); }
.hb-xf1-mark svg { width: 16px; height: 16px; color: #fff; }
.hb-xf1-titles { min-width: 0; flex: 1; }
.hb-xf1-title { margin: 0; font-size: 13.5px; font-weight: 600; letter-spacing: -0.01em; }
.hb-xf1-sub { margin: 2px 0 0; font-size: 11.5px; color: #8f8f8f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xf1-badge { display: inline-flex; align-items: center; gap: 6px; height: 22px; padding: 0 8px; border-radius: 999px; font-size: 11px; font-weight: 500; color: var(--hb-xf1-st); background: color-mix(in srgb, var(--hb-xf1-st) 12%, transparent); border: 1px solid color-mix(in srgb, var(--hb-xf1-st) 28%, transparent); flex: none; }
.hb-xf1-body { padding: 12px 14px 4px; display: grid; gap: 12px; }
.hb-xf1-commit { display: flex; gap: 10px; align-items: flex-start; }
.hb-xf1-avatar { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; flex: none; font-size: 10px; font-weight: 600; color: #fff; background: linear-gradient(135deg, #f0a35e, #c2456e); box-shadow: 0 0 0 2px #111, 0 0 0 3px #2a2a2a; }
.hb-xf1-msg { margin: 0; font-size: 12.5px; line-height: 1.4; color: #ededed; }
.hb-xf1-meta { display: flex; gap: 6px; align-items: center; margin-top: 4px; font-size: 11px; color: #8f8f8f; flex-wrap: wrap; }
.hb-xf1-code { font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; padding: 1px 5px; border-radius: 5px; background: #1c1c1c; border: 1px solid #262626; color: #a1a1a1; }
.hb-xf1-timeline { display: grid; gap: 6px; }
.hb-xf1-track { display: flex; gap: 3px; height: 6px; }
.hb-xf1-seg { height: 100%; border-radius: 3px; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xf1-accent) 75%, #fff 0%), var(--hb-xf1-accent)); transform-origin: left; animation: hb-xf1-grow .7s cubic-bezier(.2,.8,.2,1) both; }
.hb-xf1-seg:nth-child(2) { opacity: .7; }
.hb-xf1-seg:nth-child(3) { opacity: .45; }
.hb-xf1-legend { display: flex; justify-content: space-between; font-size: 10.5px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-xf1-legend b { color: #ededed; font-weight: 500; }
.hb-xf1-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; padding: 10px; }
.hb-xf1-act { all: unset; box-sizing: border-box; display: grid; justify-items: center; gap: 5px; padding: 8px 4px 7px; border-radius: 10px; font-size: 10.5px; color: #a1a1a1; cursor: pointer; transition: background .18s, color .18s, transform .15s cubic-bezier(.3,.7,.4,1); }
.hb-xf1-act svg { width: 16px; height: 16px; }
.hb-xf1-act:hover { background: #1c1c1c; color: #ededed; }
.hb-xf1-act:active { transform: scale(.95); }
.hb-xf1-act:focus-visible { outline: 2px solid var(--hb-xf1-accent); outline-offset: -2px; color: #ededed; }
.hb-xf1-act[data-done="true"] { color: #3ddc84; }
.hb-xf1-embedded { display: inline-flex; flex-direction: column; align-items: center; }
.hb-xf1-embedded .hb-xf1-pop { position: relative; top: auto; bottom: auto; left: auto; margin-top: 12px; transform: none; transform-origin: 50% -12px; }
.hb-xf1-embedded .hb-xf1-arrow { left: 50%; }
@keyframes hb-xf1-in { from { opacity: 0; scale: .9; filter: blur(2px); } to { opacity: 1; scale: 1; filter: blur(0); } }
@keyframes hb-xf1-out { to { opacity: 0; scale: .96; } }
@keyframes hb-xf1-grow { from { transform: scaleX(0); } }
@keyframes hb-xf1-ping { 0% { opacity: .8; transform: scale(.6); } 70%, 100% { opacity: 0; transform: scale(1.6); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xf1 *, .hb-xf1 *::after { animation: none !important; transition: none !important; }
}
`;

function Icon({ name }: { name: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "visit") return <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>;
  if (name === "logs") return <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><path d="M4 6h16M4 12h10M4 18h13" /></svg>;
  if (name === "redeploy") return <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5" /></svg>;
  if (name === "check") return <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>;
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

export function PopoverRich({
  deployment = defaultDeployment,
  placement = "auto",
  open,
  defaultOpen,
  onOpenChange,
  onAction,
  embedded = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PopoverRichProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const mounted = usePresence(isOpen, 170);
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ side: "bottom" as "bottom" | "top", shift: 0, ready: false });
  const [copied, setCopied] = React.useState(false);
  const copyTimer = React.useRef(0);
  const restore = React.useRef(false);

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (open === undefined) setInner(value);
      onOpenChange?.(value);
    },
    [open, onOpenChange],
  );

  React.useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  React.useEffect(() => {
    if (!isOpen || embedded) return;
    const frame = requestAnimationFrame(() => {
      const trigger = triggerRef.current;
      const pop = popRef.current;
      if (!trigger || !pop) return;
      const t = trigger.getBoundingClientRect();
      const h = pop.offsetHeight + 14;
      const w = pop.offsetWidth;
      let side: "top" | "bottom" = placement === "top" ? "top" : "bottom";
      if (placement === "auto") side = window.innerHeight - t.bottom < h && t.top > h ? "top" : "bottom";
      const center = t.left + t.width / 2;
      const min = 12 + w / 2;
      const max = window.innerWidth - 12 - w / 2;
      const target = Math.min(Math.max(center, min), Math.max(min, max));
      const shift = Math.max(-w / 2 + 22, Math.min(w / 2 - 22, target - center));
      setPos({ side, shift: Math.round(shift), ready: true });
      pop.focus({ preventScroll: true });
    });
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", onDown);
      setPos((p) => (p.ready ? { ...p, ready: false } : p));
    };
  }, [isOpen, embedded, placement, setOpen]);

  React.useEffect(() => {
    if (!isOpen && restore.current) {
      restore.current = false;
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  const close = () => {
    restore.current = true;
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      e.stopPropagation();
      close();
      return;
    }
    if ((e.key === "ArrowRight" || e.key === "ArrowLeft") && popRef.current) {
      const acts = Array.from(popRef.current.querySelectorAll<HTMLElement>(".hb-xf1-act"));
      const i = acts.indexOf(document.activeElement as HTMLElement);
      if (i < 0) return;
      e.preventDefault();
      acts[(i + (e.key === "ArrowRight" ? 1 : acts.length - 1)) % acts.length].focus();
    }
  };

  const act = (a: "visit" | "logs" | "redeploy" | "copy") => {
    onAction?.(a);
    if (a === "copy") {
      navigator.clipboard?.writeText(`https://${deployment.url}`).catch(() => {});
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
    }
  };

  const total = deployment.stages.reduce((s, x) => s + x.seconds, 0) || 1;
  const st = deployment.status === "ready" ? "#3ddc84" : deployment.status === "building" ? "#f5b445" : "#ff5d5d";
  const initials = deployment.author.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
  const vars = { "--hb-xf1-accent": accent, "--hb-xf1-st": st, "--hb-xf1-shift": `${embedded ? 0 : pos.shift}px` } as React.CSSProperties;

  return (
    <span ref={rootRef} className={`hb-xf1 ${embedded ? "hb-xf1-embedded" : ""} ${className}`} style={{ ...vars, ...style }} onKeyDown={onKeyDown} {...rest}>
      <style href="hb-popover-rich" precedence="default">{css}</style>
      <button
        ref={triggerRef}
        type="button"
        className="hb-xf1-trigger"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={`${uid}-pop`}
        onClick={() => (isOpen ? close() : setOpen(true))}
      >
        <span className="hb-xf1-dot" aria-hidden="true" />
        {deployment.name}
        <svg className="hb-xf1-chev" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {mounted && (
        <div
          ref={popRef}
          id={`${uid}-pop`}
          role="dialog"
          aria-labelledby={`${uid}-title`}
          tabIndex={-1}
          className="hb-xf1-pop"
          data-side={embedded ? "bottom" : pos.side}
          data-ready={embedded || pos.ready || !isOpen ? "true" : "false"}
          data-state={isOpen ? "open" : "closed"}
        >
          <span className="hb-xf1-arrow" aria-hidden="true" />
          <div className="hb-xf1-head">
            <span className="hb-xf1-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 3 22 20H2Z" fill="currentColor" /></svg>
            </span>
            <div className="hb-xf1-titles">
              <p className="hb-xf1-title" id={`${uid}-title`}>{deployment.url}</p>
              <p className="hb-xf1-sub">{deployment.environment} · {deployment.age}</p>
            </div>
            <span className="hb-xf1-badge"><span className="hb-xf1-dot" aria-hidden="true" />{statusText[deployment.status]}</span>
          </div>
          <div className="hb-xf1-body">
            <div className="hb-xf1-commit">
              <span className="hb-xf1-avatar" aria-hidden="true">{initials}</span>
              <div style={{ minWidth: 0 }}>
                <p className="hb-xf1-msg">{deployment.message}</p>
                <div className="hb-xf1-meta">
                  <span>{deployment.author}</span>
                  <span aria-hidden="true">·</span>
                  <span className="hb-xf1-code">{deployment.branch}</span>
                  <span className="hb-xf1-code">{deployment.commit}</span>
                </div>
              </div>
            </div>
            <div className="hb-xf1-timeline">
              <div className="hb-xf1-track" role="img" aria-label={deployment.stages.map((s) => `${s.label} ${s.seconds}s`).join(", ")}>
                {deployment.stages.map((s, i) => (
                  <span key={s.label} className="hb-xf1-seg" style={{ flex: `${s.seconds} 1 0`, animationDelay: `${(i * 0.12 + 0.1).toFixed(2)}s` }} />
                ))}
              </div>
              <div className="hb-xf1-legend" aria-hidden="true">
                {deployment.stages.map((s) => (
                  <span key={s.label}>{s.label} <b>{s.seconds}s</b></span>
                ))}
                <span>Total <b>{total}s</b></span>
              </div>
            </div>
          </div>
          <div className="hb-xf1-actions">
            <button type="button" className="hb-xf1-act" onClick={() => act("visit")}><Icon name="visit" />Visit</button>
            <button type="button" className="hb-xf1-act" onClick={() => act("logs")}><Icon name="logs" />Logs</button>
            <button type="button" className="hb-xf1-act" onClick={() => act("redeploy")}><Icon name="redeploy" />Redeploy</button>
            <button type="button" className="hb-xf1-act" data-done={copied} onClick={() => act("copy")} aria-live="polite">
              <Icon name={copied ? "check" : "copy"} />
              {copied ? "Copied" : "Copy URL"}
            </button>
          </div>
        </div>
      )}
    </span>
  );
}
