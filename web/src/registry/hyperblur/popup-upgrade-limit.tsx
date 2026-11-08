"use client";

import * as React from "react";

export interface PopupUpgradePlan {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  allowance: string;
  features: string[];
  badge?: string;
}

export interface PopupUpgradeUsage {
  label: string;
  plan: string;
  used: number;
  limit: number;
  unit: string;
  queued?: number;
  resets: string;
}

export interface PopupUpgradeLimitProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  usage?: PopupUpgradeUsage;
  plans?: PopupUpgradePlan[];
  defaultPlan?: string;
  defaultBilling?: "monthly" | "yearly";
  currency?: string;
  locale?: string;
  onUpgrade?: (planId: string, billing: "monthly" | "yearly") => void;
  onDismiss?: () => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
  triggerLabel?: string;
  embedded?: boolean;
  accent?: string;
}

const defaultUsage: PopupUpgradeUsage = {
  label: "Render minutes",
  plan: "Hobby",
  used: 600,
  limit: 600,
  unit: "min",
  queued: 3,
  resets: "Dec 1",
};

const defaultPlans: PopupUpgradePlan[] = [
  { id: "pro", name: "Pro", monthly: 20, yearly: 16, allowance: "3,000 min", badge: "Popular", features: ["4K exports without watermark", "Priority render queue", "Custom brand kits"] },
  { id: "team", name: "Team", monthly: 48, yearly: 38, allowance: "10,000 min", features: ["Everything in Pro, for 5 seats", "Shared asset library", "Review links with comments"] },
];

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
.hb-xf7 { --hb-xf7-accent: #8b7bff; box-sizing: border-box; font-family: inherit; color: #ededed; }
.hb-xf7 *, .hb-xf7 *::before, .hb-xf7 *::after { box-sizing: border-box; }
.hb-xf7-embedded { position: relative; width: 100%; height: 100%; display: grid; place-items: center; }
.hb-xf7-trigger { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px; border-radius: 999px; font-size: 13px; font-weight: 600; color: #fff; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xf7-accent) 80%, #fff), var(--hb-xf7-accent)); box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 8px 20px -10px var(--hb-xf7-accent); cursor: pointer; transition: transform .15s cubic-bezier(.3,.7,.4,1); }
.hb-xf7-trigger:active { transform: scale(.97); }
.hb-xf7-trigger:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xf7-trigger svg { width: 14px; height: 14px; }
.hb-xf7-overlay { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 16px; min-height: 100dvh; }
.hb-xf7-embedded .hb-xf7-overlay { position: relative; inset: auto; min-height: 0; padding: 0; width: 100%; }
.hb-xf7-scrim { position: absolute; inset: 0; background: rgba(4,4,6,.76); backdrop-filter: blur(6px); animation: hb-xf7-fade .3s ease both; }
.hb-xf7-embedded .hb-xf7-scrim { display: none; }
.hb-xf7-overlay[data-state="closed"] .hb-xf7-scrim { animation: hb-xf7-fade .2s ease reverse both; }
.hb-xf7-panel { position: relative; width: min(460px, 100%); max-height: calc(100dvh - 32px); overflow: auto; border-radius: 22px; background: #101010; border: 1px solid #2a2a2a; box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 40px 80px -30px rgba(0,0,0,.9); outline: none; animation: hb-xf7-in .5s cubic-bezier(.16,1,.3,1) both; }
.hb-xf7-overlay[data-state="closed"] .hb-xf7-panel { animation: hb-xf7-out .2s cubic-bezier(.4,0,1,1) both; }
.hb-xf7-top { padding: 20px 20px 16px; background: radial-gradient(100% 120% at 0% 0%, color-mix(in srgb, #ff5d5d 12%, transparent), transparent 55%); border-bottom: 1px solid #1f1f1f; }
.hb-xf7-close { all: unset; position: absolute; top: 14px; right: 14px; display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; color: #8f8f8f; cursor: pointer; transition: background .2s, color .2s; }
.hb-xf7-close:hover { background: #1f1f1f; color: #ededed; }
.hb-xf7-close:focus-visible { outline: 2px solid var(--hb-xf7-accent); }
.hb-xf7-close svg { width: 14px; height: 14px; }
.hb-xf7-head { display: flex; gap: 12px; align-items: flex-start; padding-right: 28px; }
.hb-xf7-warn { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 10px; flex: none; color: #ff8a7a; background: rgba(255,93,93,.12); border: 1px solid rgba(255,93,93,.25); }
.hb-xf7-warn svg { width: 17px; height: 17px; }
.hb-xf7-title { margin: 0; font-size: 16px; font-weight: 600; letter-spacing: -.01em; }
.hb-xf7-sub { margin: 3px 0 0; font-size: 12.5px; line-height: 1.45; color: #a1a1a1; }
.hb-xf7-meter { margin-top: 14px; display: grid; gap: 7px; }
.hb-xf7-mtext { display: flex; justify-content: space-between; align-items: baseline; font-size: 11.5px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-xf7-mtext b { font-size: 12.5px; color: #ededed; font-weight: 600; }
.hb-xf7-ticks { display: flex; gap: 3px; align-items: center; height: 14px; }
.hb-xf7-tick { flex: 1; height: 100%; border-radius: 3px; background: #1f1f1f; animation: hb-xf7-tick .35s cubic-bezier(.3,.7,.4,1) both; }
.hb-xf7-tick[data-on="true"] { background: linear-gradient(#f5f5f5, #bdbdbd); }
.hb-xf7-tick[data-hot="true"] { background: linear-gradient(#ff8a7a, #e5483a); animation: hb-xf7-tick .35s cubic-bezier(.3,.7,.4,1) both, hb-xf7-hot 1.4s ease-in-out 1.2s infinite; }
.hb-xf7-over { flex: none; height: 100%; padding: 0 6px; margin-left: 3px; border-radius: 3px; display: grid; place-items: center; font-size: 9.5px; font-weight: 600; color: #ffb3a8; background: repeating-linear-gradient(-45deg, rgba(255,93,93,.25) 0 3px, rgba(255,93,93,.08) 3px 6px); border: 1px dashed rgba(255,93,93,.45); white-space: nowrap; }
.hb-xf7-mid { padding: 16px 20px 6px; display: grid; gap: 12px; }
.hb-xf7-bill { position: relative; display: grid; grid-template-columns: 1fr 1fr; padding: 3px; border-radius: 11px; background: #161616; border: 1px solid #242424; }
.hb-xf7-thumb { position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc(50% - 3px); border-radius: 8px; background: linear-gradient(#262626, #1e1e1e); box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 2px 6px rgba(0,0,0,.5); transition: transform .4s cubic-bezier(.3,1.3,.5,1); }
.hb-xf7-bill[data-v="yearly"] .hb-xf7-thumb { transform: translateX(100%); }
.hb-xf7-billbtn { all: unset; box-sizing: border-box; position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; gap: 6px; height: 30px; font-size: 12.5px; font-weight: 500; color: #8f8f8f; cursor: pointer; border-radius: 8px; transition: color .2s; }
.hb-xf7-billbtn[aria-checked="true"] { color: #ededed; }
.hb-xf7-billbtn:focus-visible { outline: 2px solid var(--hb-xf7-accent); outline-offset: -2px; }
.hb-xf7-save { font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 999px; color: #3ddc84; background: rgba(61,220,132,.12); }
.hb-xf7-plans { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.hb-xf7-plan { all: unset; box-sizing: border-box; position: relative; display: grid; gap: 2px; padding: 12px; border-radius: 14px; background: #141414; border: 1px solid #262626; cursor: pointer; transition: border-color .25s, background .25s, box-shadow .25s, transform .15s cubic-bezier(.3,.7,.4,1); }
.hb-xf7-plan:hover { border-color: #353535; }
.hb-xf7-plan:active { transform: scale(.985); }
.hb-xf7-plan:focus-visible { outline: 2px solid var(--hb-xf7-accent); outline-offset: 2px; }
.hb-xf7-plan[aria-checked="true"] { border-color: color-mix(in srgb, var(--hb-xf7-accent) 70%, #262626); background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xf7-accent) 12%, #141414), #141414); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xf7-accent) 16%, transparent), 0 14px 30px -18px var(--hb-xf7-accent); }
.hb-xf7-pname { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; }
.hb-xf7-badge { font-size: 9.5px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; padding: 2px 6px; border-radius: 999px; color: var(--hb-xf7-accent); background: color-mix(in srgb, var(--hb-xf7-accent) 14%, transparent); }
.hb-xf7-radio { position: absolute; top: 12px; right: 12px; width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #3a3a3a; display: grid; place-items: center; transition: all .25s; }
.hb-xf7-plan[aria-checked="true"] .hb-xf7-radio { border-color: var(--hb-xf7-accent); background: var(--hb-xf7-accent); }
.hb-xf7-radio svg { width: 9px; height: 9px; color: #fff; transform: scale(0); transition: transform .3s cubic-bezier(.3,1.6,.5,1); }
.hb-xf7-plan[aria-checked="true"] .hb-xf7-radio svg { transform: scale(1); }
.hb-xf7-price { display: flex; align-items: baseline; gap: 3px; margin-top: 6px; height: 28px; overflow: hidden; }
.hb-xf7-amount { display: inline-block; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -.03em; font-variant-numeric: tabular-nums; animation: hb-xf7-roll .45s cubic-bezier(.2,.9,.3,1.2) both; }
.hb-xf7-per { font-size: 11.5px; color: #8f8f8f; }
.hb-xf7-allow { font-size: 11.5px; color: #a1a1a1; }
.hb-xf7-feats { list-style: none; margin: 0; padding: 2px 2px 0; display: grid; gap: 7px; }
.hb-xf7-feat { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: #d4d4d4; animation: hb-xf7-feat .4s cubic-bezier(.2,.8,.2,1) both; }
.hb-xf7-check { display: grid; place-items: center; width: 18px; height: 18px; border-radius: 50%; flex: none; color: var(--hb-xf7-accent); background: color-mix(in srgb, var(--hb-xf7-accent) 15%, transparent); animation-delay: inherit; }
.hb-xf7-check svg { width: 10px; height: 10px; stroke-dasharray: 14; stroke-dashoffset: 14; animation: hb-xf7-draw .35s ease forwards; animation-delay: inherit; }
.hb-xf7-foot { display: flex; gap: 8px; padding: 16px 20px 20px; }
.hb-xf7-ghost { all: unset; box-sizing: border-box; display: grid; place-items: center; height: 40px; padding: 0 14px; border-radius: 11px; font-size: 13px; font-weight: 500; color: #a1a1a1; cursor: pointer; transition: color .2s, background .2s; white-space: nowrap; }
.hb-xf7-ghost:hover { color: #ededed; background: #181818; }
.hb-xf7-ghost:focus-visible { outline: 2px solid var(--hb-xf7-accent); outline-offset: 2px; }
.hb-xf7-go { all: unset; box-sizing: border-box; flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; height: 40px; padding: 0 14px; border-radius: 11px; font-size: 13.5px; font-weight: 600; color: #fff; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xf7-accent) 80%, #fff), var(--hb-xf7-accent)); box-shadow: inset 0 1px 0 rgba(255,255,255,.3), inset 0 -1px 0 rgba(0,0,0,.2), 0 12px 26px -12px var(--hb-xf7-accent); cursor: pointer; white-space: nowrap; transition: transform .15s cubic-bezier(.3,.7,.4,1), filter .2s; }
.hb-xf7-go:hover { filter: brightness(1.08); }
.hb-xf7-go:active { transform: scale(.98); }
.hb-xf7-go:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xf7-go svg { width: 14px; height: 14px; }
@keyframes hb-xf7-fade { from { opacity: 0; } }
@keyframes hb-xf7-in { from { opacity: 0; transform: translateY(14px) scale(.97); } }
@keyframes hb-xf7-out { to { opacity: 0; transform: translateY(8px) scale(.98); } }
@keyframes hb-xf7-tick { from { opacity: 0; transform: scaleY(.3); } }
@keyframes hb-xf7-hot { 50% { opacity: .55; } }
@keyframes hb-xf7-roll { from { opacity: 0; transform: translateY(70%); } }
@keyframes hb-xf7-feat { from { opacity: 0; transform: translateX(-6px); } }
@keyframes hb-xf7-draw { to { stroke-dashoffset: 0; } }
@media (max-width: 420px) {
  .hb-xf7-plans { grid-template-columns: 1fr; }
  .hb-xf7-foot { flex-direction: column-reverse; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xf7 *, .hb-xf7 *::before { animation: none !important; transition: none !important; }
  .hb-xf7-check svg { stroke-dashoffset: 0; }
}
`;

export function PopupUpgradeLimit({
  title = "You have used every render minute",
  usage = defaultUsage,
  plans = defaultPlans,
  defaultPlan,
  defaultBilling = "yearly",
  currency = "USD",
  locale = "en-US",
  onUpgrade,
  onDismiss,
  open,
  defaultOpen,
  onOpenChange,
  showTrigger = true,
  triggerLabel = "Export video",
  embedded = false,
  accent = "#8b7bff",
  className = "",
  style,
  ...rest
}: PopupUpgradeLimitProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const mounted = usePresence(isOpen, 220);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const touched = React.useRef(false);
  const [billing, setBilling] = React.useState<"monthly" | "yearly">(defaultBilling);
  const [planId, setPlanId] = React.useState(defaultPlan ?? plans[0]?.id ?? "");
  const plan = plans.find((p) => p.id === planId) ?? plans[0];

  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }), [locale, currency]);

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

  const ticks = 24;
  const ratio = Math.min(1, usage.used / Math.max(1, usage.limit));
  const lit = Math.round(ratio * ticks);
  const savePct = plans.length ? Math.round((1 - plans[0].yearly / plans[0].monthly) * 100) : 0;

  const onPlanKey = (e: React.KeyboardEvent, index: number) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
    const next = plans[(index + dir + plans.length) % plans.length];
    setPlanId(next.id);
    const nodes = e.currentTarget.parentElement?.querySelectorAll<HTMLElement>(".hb-xf7-plan");
    nodes?.[(index + dir + plans.length) % plans.length]?.focus();
  };

  const onBillKey = (e: React.KeyboardEvent) => {
    if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
    e.preventDefault();
    const next = billing === "monthly" ? "yearly" : "monthly";
    setBilling(next);
    e.currentTarget.querySelector<HTMLElement>(`[data-b="${next}"]`)?.focus();
  };

  const price = plan ? (billing === "yearly" ? plan.yearly : plan.monthly) : 0;

  return (
    <div
      className={`hb-xf7 ${embedded ? "hb-xf7-embedded" : ""} ${className}`}
      style={{ "--hb-xf7-accent": accent, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (embedded && e.key === "Escape" && isOpen) {
          e.stopPropagation();
          close();
        }
      }}
      {...rest}
    >
      <style href="hb-popup-upgrade-limit" precedence="default">{css}</style>
      {showTrigger && (!embedded || !mounted) && (
        <button ref={triggerRef} type="button" className="hb-xf7-trigger" aria-haspopup="dialog" onClick={() => setOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
          {triggerLabel}
        </button>
      )}
      {mounted && (
        <div className="hb-xf7-overlay" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xf7-scrim" onClick={close} aria-hidden="true" />
          <div ref={panelRef} className="hb-xf7-panel" role="dialog" aria-modal={embedded ? undefined : true} aria-labelledby={`${uid}-t`} aria-describedby={`${uid}-d`} tabIndex={-1}>
            <button type="button" className="hb-xf7-close" aria-label="Close" onClick={close}>
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m3 3 8 8M11 3l-8 8" /></svg>
            </button>
            <div className="hb-xf7-top">
              <div className="hb-xf7-head">
                <span className="hb-xf7-warn" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 2.5 20h19Z" /><path d="M12 10v4.5M12 17.5v.01" /></svg>
                </span>
                <div>
                  <h2 className="hb-xf7-title" id={`${uid}-t`}>{title}</h2>
                  <p className="hb-xf7-sub" id={`${uid}-d`}>Exports are paused until {usage.resets}. Upgrade now and the queue starts right away.</p>
                </div>
              </div>
              <div className="hb-xf7-meter">
                <div className="hb-xf7-mtext">
                  <span>{usage.label} · {usage.plan}</span>
                  <span><b>{usage.used.toLocaleString("en-US")}</b> / {usage.limit.toLocaleString("en-US")} {usage.unit}</span>
                </div>
                <div className="hb-xf7-ticks" role="meter" aria-label={usage.label} aria-valuemin={0} aria-valuemax={usage.limit} aria-valuenow={usage.used}>
                  {Array.from({ length: ticks }, (_, i) => (
                    <span
                      key={i}
                      className="hb-xf7-tick"
                      data-on={i < lit}
                      data-hot={i < lit && i >= ticks - 3 && ratio >= 0.9}
                      style={{ animationDelay: `${(0.15 + i * 0.035).toFixed(3)}s` }}
                    />
                  ))}
                  {usage.queued ? <span className="hb-xf7-over">+{usage.queued} queued</span> : null}
                </div>
              </div>
            </div>
            <div className="hb-xf7-mid">
              <div className="hb-xf7-bill" role="radiogroup" aria-label="Billing period" data-v={billing} onKeyDown={onBillKey}>
                <span className="hb-xf7-thumb" aria-hidden="true" />
                {(["monthly", "yearly"] as const).map((b) => (
                  <button key={b} type="button" role="radio" data-b={b} aria-checked={billing === b} tabIndex={billing === b ? 0 : -1} className="hb-xf7-billbtn" onClick={() => setBilling(b)}>
                    {b === "monthly" ? "Monthly" : "Yearly"}
                    {b === "yearly" && savePct > 0 && <span className="hb-xf7-save">-{savePct}%</span>}
                  </button>
                ))}
              </div>
              <div className="hb-xf7-plans" role="radiogroup" aria-label="Plan">
                {plans.map((p, i) => {
                  const amount = billing === "yearly" ? p.yearly : p.monthly;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={p.id === plan?.id}
                      tabIndex={p.id === plan?.id ? 0 : -1}
                      className="hb-xf7-plan"
                      onClick={() => setPlanId(p.id)}
                      onKeyDown={(e) => onPlanKey(e, i)}
                    >
                      <span className="hb-xf7-radio" aria-hidden="true">
                        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 5.2 2 2 4-4.4" /></svg>
                      </span>
                      <span className="hb-xf7-pname">{p.name}{p.badge && <span className="hb-xf7-badge">{p.badge}</span>}</span>
                      <span className="hb-xf7-price">
                        <span className="hb-xf7-amount" key={`${p.id}-${billing}`}>{money.format(amount)}</span>
                        <span className="hb-xf7-per">/mo</span>
                      </span>
                      <span className="hb-xf7-allow">{p.allowance} every month</span>
                    </button>
                  );
                })}
              </div>
              {plan && (
                <ul className="hb-xf7-feats" key={plan.id} aria-label={`${plan.name} includes`}>
                  {plan.features.map((f, i) => (
                    <li key={f} className="hb-xf7-feat" style={{ animationDelay: `${(0.08 + i * 0.08).toFixed(2)}s` }}>
                      <span className="hb-xf7-check" aria-hidden="true">
                        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="m2 5.2 2 2 4-4.4" /></svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="hb-xf7-foot">
              <button
                type="button"
                className="hb-xf7-ghost"
                onClick={() => {
                  onDismiss?.();
                  close();
                }}
              >
                Remind me tomorrow
              </button>
              <button
                type="button"
                className="hb-xf7-go"
                data-autofocus
                onClick={() => {
                  if (plan) onUpgrade?.(plan.id, billing);
                  close();
                }}
              >
                Upgrade to {plan?.name} · {money.format(price)}/mo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
