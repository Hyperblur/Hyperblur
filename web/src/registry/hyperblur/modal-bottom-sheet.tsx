"use client";

import * as React from "react";

export interface ModalSheetOption {
  id: string;
  name: string;
  seats: number;
  eta: string;
  arrival: string;
  price: string;
  tag?: string;
}

export interface ModalBottomSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  trigger?: React.ReactNode;
  title?: string;
  subtitle?: string;
  options?: ModalSheetOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  onConfirm?: (id: string) => void;
  payment?: string;
  defaultSnap?: "peek" | "full";
  accent?: string;
}

const defaultOptions: ModalSheetOption[] = [
  { id: "standard", name: "Standard", seats: 4, eta: "4 min", arrival: "Drop-off 9:52", price: "$18.40" },
  { id: "comfort", name: "Comfort", seats: 4, eta: "6 min", arrival: "Drop-off 9:54", price: "$24.10", tag: "Quiet ride" },
  { id: "xl", name: "XL", seats: 6, eta: "9 min", arrival: "Drop-off 9:57", price: "$31.75" },
  { id: "green", name: "Electric", seats: 4, eta: "7 min", arrival: "Drop-off 9:55", price: "$21.90", tag: "Zero emission" },
];

const css = `
.hb-xe2 { --hb-xe2-accent: #d4f75a; display: inline-block; box-sizing: border-box; color: #ededed; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe2 *, .hb-xe2 *::before, .hb-xe2 *::after { box-sizing: border-box; }
.hb-xe2[data-embedded] { container-type: size; position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: #0c0d0c; }
.hb-xe2-map { position: absolute; inset: 0; opacity: 0.9; background:
  linear-gradient(90deg, transparent 0 46%, #1a1c1a 46% 49%, transparent 49%),
  linear-gradient(0deg, transparent 0 30%, #1a1c1a 30% 33%, transparent 33% 70%, #171917 70% 72%, transparent 72%),
  linear-gradient(32deg, transparent 0 62%, #191b19 62% 64%, transparent 64%),
  radial-gradient(60% 50% at 70% 20%, #131613, #0c0d0c); }
.hb-xe2-trigger { position: relative; display: inline-flex; align-items: center; gap: 9px; height: 40px; padding: 0 16px 0 12px; border: 0; border-radius: 999px; background: #f2f2ef; color: #0a0a0a; font: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer; box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.9), inset 0 -2px 0 rgba(0, 0, 0, 0.08); transition: transform 0.2s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe2-trigger:active { transform: scale(0.96); }
.hb-xe2-trigger i { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: #0a0a0a; color: var(--hb-xe2-accent); font-style: normal; }
.hb-xe2-trigger svg { width: 12px; height: 12px; }
.hb-xe2-trigger:focus-visible, .hb-xe2-handle:focus-visible, .hb-xe2-opt:focus-visible, .hb-xe2-cta:focus-visible, .hb-xe2-link:focus-visible { outline: 2px solid var(--hb-xe2-accent); outline-offset: 2px; }
.hb-xe2-layer { position: fixed; inset: 0; z-index: 1000; height: 100dvh; display: flex; align-items: flex-end; justify-content: center; overflow: hidden; }
.hb-xe2[data-embedded] .hb-xe2-layer { position: absolute; height: auto; z-index: 2; }
.hb-xe2-scrim { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.5); animation: hb-xe2-fade 0.3s ease both; }
.hb-xe2-layer[data-state="closed"] .hb-xe2-scrim { animation: hb-xe2-fade-out 0.3s ease both; }
.hb-xe2-sheet { position: relative; width: min(520px, 100%); height: min(86dvh, 640px); animation: hb-xe2-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.hb-xe2[data-embedded] .hb-xe2-sheet { width: calc(100% - 16px); height: calc(100% - 10px); }
.hb-xe2-layer[data-state="closed"] .hb-xe2-sheet { animation: hb-xe2-down 0.3s cubic-bezier(0.5, 0, 0.75, 0) both; }
.hb-xe2-panel { position: absolute; left: 0; right: 0; bottom: 0; height: calc(var(--hb-xe2-h, 100%) - var(--hb-xe2-drag, 0px)); max-height: calc(100% + 24px); display: flex; flex-direction: column; border: 1px solid #262826; border-bottom: 0; border-radius: 22px 22px 0 0; background: linear-gradient(180deg, #171917, #111211 120px); box-shadow: 0 -30px 60px -20px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05); outline: none; overflow: hidden; transition: height 0.46s cubic-bezier(0.2, 0.9, 0.25, 1); touch-action: none; }
.hb-xe2-panel[data-dragging="true"] { transition: none; }
.hb-xe2-grab { flex: none; padding: 8px 18px 0; cursor: grab; user-select: none; }
.hb-xe2-panel[data-dragging="true"] .hb-xe2-grab { cursor: grabbing; }
.hb-xe2-handle { display: block; width: 44px; height: 14px; margin: 0 auto 4px; padding: 0; border: 0; background: transparent; cursor: inherit; border-radius: 8px; }
.hb-xe2-handle::before { content: ""; display: block; width: 36px; height: 4px; margin: 5px auto; border-radius: 4px; background: #3a3d3a; transition: background-color 0.2s ease, width 0.25s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe2-grab:hover .hb-xe2-handle::before { background: #5a5e5a; width: 44px; }
.hb-xe2-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; padding-bottom: 10px; }
.hb-xe2-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 17px; font-weight: 600; letter-spacing: -0.02em; }
.hb-xe2-sub { margin: 2px 0 0; display: flex; align-items: center; gap: 6px; color: #8d918d; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe2-sub b { width: 6px; height: 6px; flex: none; border-radius: 50%; background: var(--hb-xe2-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xe2-accent) 20%, transparent); }
.hb-xe2-link { flex: none; border: 0; background: none; padding: 4px 2px; color: #b5b9b5; font: inherit; font-size: 12px; cursor: pointer; border-radius: 6px; }
.hb-xe2-link:hover { color: #fff; }
.hb-xe2-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 0 12px 12px; }
.hb-xe2-list { display: grid; gap: 6px; margin: 0; padding: 0; }
.hb-xe2-opt { position: relative; display: grid; grid-template-columns: 46px 1fr auto; align-items: center; gap: 12px; width: 100%; padding: 9px 12px 9px 8px; border: 1px solid transparent; border-radius: 14px; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease; }
.hb-xe2-opt:hover { background: #181a18; }
.hb-xe2-opt:active { transform: scale(0.99); }
.hb-xe2-opt[aria-checked="true"] { border-color: color-mix(in srgb, var(--hb-xe2-accent) 60%, transparent); background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xe2-accent) 9%, #141614), #141614); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04); }
.hb-xe2-car { display: grid; place-items: center; height: 34px; border-radius: 10px; background: radial-gradient(80% 70% at 50% 100%, #252825, #171917); color: #cfd3cf; }
.hb-xe2-opt[aria-checked="true"] .hb-xe2-car { color: var(--hb-xe2-accent); }
.hb-xe2-car svg { width: 34px; height: 18px; }
.hb-xe2-name { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; }
.hb-xe2-seats { display: inline-flex; align-items: center; gap: 2px; color: #7f837f; font-size: 11.5px; font-weight: 500; }
.hb-xe2-seats svg { width: 10px; height: 10px; }
.hb-xe2-meta { display: block; margin-top: 2px; color: #8d918d; font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe2-tag { margin-left: 4px; padding: 1px 6px; border-radius: 999px; background: #1f221f; color: #b9bdb9; font-size: 10.5px; }
.hb-xe2-price { font-variant-numeric: tabular-nums; font-size: 14px; font-weight: 600; }
.hb-xe2-foot { flex: none; display: grid; gap: 10px; padding: 10px 16px calc(14px + env(safe-area-inset-bottom)); border-top: 1px solid #1f211f; background: #111211; }
.hb-xe2-pay { display: flex; align-items: center; justify-content: space-between; color: #a6aaa6; font-size: 12px; }
.hb-xe2-card { display: inline-flex; align-items: center; gap: 8px; color: #ededed; }
.hb-xe2-card i { width: 24px; height: 16px; border-radius: 4px; background: linear-gradient(135deg, #3d5afe, #1a237e); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15); }
.hb-xe2-cta { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 46px; border: 0; border-radius: 14px; background: var(--hb-xe2-accent); color: #0a0a0a; font: inherit; font-size: 14.5px; font-weight: 650; cursor: pointer; overflow: hidden; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 10px 24px -12px color-mix(in srgb, var(--hb-xe2-accent) 80%, transparent); transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), filter 0.2s ease; }
.hb-xe2-cta:hover { filter: brightness(1.05); }
.hb-xe2-cta:active { transform: scale(0.98); }
.hb-xe2-cta[data-done="true"] { background: #ededed; }
.hb-xe2-cta svg { width: 15px; height: 15px; }
.hb-xe2-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@container (max-height: 320px) {
  .hb-xe2-pay { display: none; }
  .hb-xe2-cta { height: 40px; font-size: 13.5px; border-radius: 12px; }
  .hb-xe2-foot { padding: 8px 12px 10px; }
  .hb-xe2-opt { padding-top: 7px; padding-bottom: 7px; }
}
@keyframes hb-xe2-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-xe2-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xe2-up { from { transform: translateY(100%); } to { transform: none; } }
@keyframes hb-xe2-down { from { transform: none; } to { transform: translateY(100%); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe2-scrim, .hb-xe2-sheet, .hb-xe2-layer[data-state="closed"] .hb-xe2-scrim, .hb-xe2-layer[data-state="closed"] .hb-xe2-sheet { animation: none; }
  .hb-xe2-layer[data-state="closed"] { opacity: 0; }
  .hb-xe2-panel, .hb-xe2-opt, .hb-xe2-cta, .hb-xe2-trigger, .hb-xe2-handle::before { transition: none; }
}
`;

const focusable =
  'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])';

function useLayer(
  open: boolean,
  embedded: boolean,
  panel: React.RefObject<HTMLElement | null>,
  onClose: () => void,
  userOpened: React.RefObject<boolean>,
) {
  const closeRef = React.useRef(onClose);
  React.useEffect(() => {
    closeRef.current = onClose;
  });
  React.useEffect(() => {
    if (!open) return;
    const node = panel.current;
    const steal = !embedded || userOpened.current;
    const previous = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const overflow = html.style.overflow;
    if (!embedded) html.style.overflow = "hidden";
    if (steal && node) {
      const target = node.querySelector<HTMLElement>("[data-autofocus]") ?? node.querySelector<HTMLElement>(focusable) ?? node;
      target.focus({ preventScroll: true });
    }
    const onKey = (e: KeyboardEvent) => {
      if (!node) return;
      if (embedded && !node.contains(document.activeElement)) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(focusable)).filter((el) => el.getClientRects().length > 0);
      if (!items.length) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!node.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (!embedded) html.style.overflow = overflow;
      if (steal && previous && previous.isConnected && previous !== document.body) previous.focus({ preventScroll: true });
    };
  }, [open, embedded, panel, userOpened]);
}

const carPath = "M3 13.5h1.6a2.4 2.4 0 0 0 4.8 0h13.2a2.4 2.4 0 0 0 4.8 0H31V10l-3.2-1.2-3.6-3.8H11.4L7.2 8.6 3 9.6v3.9Z";

export function ModalBottomSheet({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  trigger = "Choose a ride",
  title = "Choose a ride",
  subtitle = "Pickup at 221 Mercer St · 3 min walk",
  options = defaultOptions,
  value,
  defaultValue = "comfort",
  onChange,
  onConfirm,
  payment = "Visa •• 4242",
  defaultSnap = "peek",
  accent = "#d4f75a",
  className = "",
  style,
  ...rest
}: ModalBottomSheetProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [present, setPresent] = React.useState(isOpen);
  const [snap, setSnap] = React.useState<"peek" | "full">(defaultSnap);
  const [picked, setPicked] = React.useState(defaultValue);
  const [done, setDone] = React.useState(false);
  const selected = value ?? picked;
  const userOpened = React.useRef(false);
  const panel = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef<{ y: number; t: number; last: number; lastT: number; v: number; d: number } | null>(null);
  const timer = React.useRef(0);
  const id = React.useId();
  const peek = embedded ? 30 : 42;

  if (isOpen && !present) setPresent(true);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) {
        userOpened.current = true;
        setSnap(defaultSnap);
        setDone(false);
      }
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange, defaultSnap],
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);

  React.useEffect(() => {
    if (isOpen || !present) return;
    const t = setTimeout(() => setPresent(false), 300);
    return () => clearTimeout(t);
  }, [isOpen, present]);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  useLayer(isOpen, embedded, panel, close, userOpened);

  function choose(next: string) {
    if (value === undefined) setPicked(next);
    onChange?.(next);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    const now = e.timeStamp;
    drag.current = { y: e.clientY, t: now, last: e.clientY, lastT: now, v: 0, d: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    panel.current?.setAttribute("data-dragging", "true");
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const s = drag.current;
    const p = panel.current;
    if (!s || !p) return;
    const raw = e.clientY - s.y;
    const sheet = p.parentElement?.offsetHeight ?? p.offsetHeight;
    const top = snap === "full" ? 0 : -(sheet * peek) / 100;
    const d = raw < top ? top + (raw - top) * 0.22 : raw;
    const dt = Math.max(e.timeStamp - s.lastT, 1);
    s.v = (e.clientY - s.last) / dt;
    s.last = e.clientY;
    s.lastT = e.timeStamp;
    s.d = d;
    p.style.setProperty("--hb-xe2-drag", `${d.toFixed(1)}px`);
  }

  function onPointerUp() {
    const s = drag.current;
    const p = panel.current;
    drag.current = null;
    if (!s || !p) return;
    p.removeAttribute("data-dragging");
    p.style.setProperty("--hb-xe2-drag", "0px");
    const h = p.parentElement?.offsetHeight ?? p.offsetHeight;
    const base = snap === "full" ? 0 : (h * peek) / 100;
    const pos = base + s.d;
    const peekPx = (h * peek) / 100;
    if (Math.abs(s.d) < 4) return;
    if (s.v > 0.55) {
      if (snap === "full" && pos < peekPx + h * 0.25) setSnap("peek");
      else close();
      return;
    }
    if (s.v < -0.55) {
      setSnap("full");
      return;
    }
    if (pos > (peekPx + h) / 2) close();
    else if (pos > peekPx / 2) setSnap("peek");
    else setSnap("full");
  }

  function onHandleKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSnap("full");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (snap === "full") setSnap("peek");
      else close();
    }
  }

  function onListKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    e.preventDefault();
    const i = options.findIndex((o) => o.id === selected);
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = options[(i + step + options.length) % options.length];
    choose(next.id);
    const el = e.currentTarget.querySelector<HTMLElement>(`[data-id="${next.id}"]`);
    el?.focus();
  }

  function confirm() {
    if (done) return;
    setDone(true);
    onConfirm?.(selected);
    timer.current = window.setTimeout(close, 900);
  }

  const current = options.find((o) => o.id === selected) ?? options[0];
  const vars = { "--hb-xe2-accent": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-xe2 ${className}`} data-embedded={embedded || undefined} style={vars} {...rest}>
      <style href="hb-xe2-css" precedence="default">{css}</style>
      {embedded && <div className="hb-xe2-map" aria-hidden="true" />}
      {trigger !== null && (
        <button type="button" className="hb-xe2-trigger" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setOpen(true)}>
          <i aria-hidden="true">
            <svg viewBox="0 0 12 12" fill="currentColor"><path d="M6 1a3.6 3.6 0 0 0-3.6 3.6C2.4 7.3 6 11 6 11s3.6-3.7 3.6-6.4A3.6 3.6 0 0 0 6 1Zm0 4.9a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z" /></svg>
          </i>
          {trigger}
        </button>
      )}
      {present && (
        <div className="hb-xe2-layer" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xe2-scrim" onClick={close} aria-hidden="true" />
          <div className="hb-xe2-sheet">
            <div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-t`}
              tabIndex={-1}
              className="hb-xe2-panel"
              style={{ "--hb-xe2-h": snap === "full" ? "100%" : `${100 - peek}%` } as React.CSSProperties}
            >
              <div
                className="hb-xe2-grab"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                <button
                  type="button"
                  className="hb-xe2-handle"
                  aria-label={snap === "full" ? "Collapse sheet" : "Expand sheet"}
                  aria-expanded={snap === "full"}
                  onClick={() => setSnap(snap === "full" ? "peek" : "full")}
                  onKeyDown={onHandleKey}
                />
                <div className="hb-xe2-head">
                  <div style={{ minWidth: 0 }}>
                    <h2 id={`${id}-t`} className="hb-xe2-title">{title}</h2>
                    <p className="hb-xe2-sub"><b aria-hidden="true" />{subtitle}</p>
                  </div>
                  <button type="button" className="hb-xe2-link" onClick={close}>Cancel</button>
                </div>
              </div>
              <div className="hb-xe2-body">
                <div role="radiogroup" aria-label="Ride type" className="hb-xe2-list" onKeyDown={onListKey}>
                  {options.map((o) => {
                    const on = o.id === selected;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        tabIndex={on ? 0 : -1}
                        data-id={o.id}
                        data-autofocus={on ? "" : undefined}
                        className="hb-xe2-opt"
                        onClick={() => choose(o.id)}
                      >
                        <span className="hb-xe2-car" aria-hidden="true">
                          <svg viewBox="0 0 34 18" fill="currentColor">
                            <path d={carPath} />
                            <circle cx="7" cy="13.5" r="1.7" fill="#0c0d0c" />
                            <circle cx="25" cy="13.5" r="1.7" fill="#0c0d0c" />
                          </svg>
                        </span>
                        <span style={{ minWidth: 0 }}>
                          <span className="hb-xe2-name">
                            {o.name}
                            <span className="hb-xe2-seats">
                              <svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><circle cx="5" cy="3" r="2" /><path d="M1.5 9.5a3.5 3.5 0 0 1 7 0Z" /></svg>
                              {o.seats}
                            </span>
                          </span>
                          <span className="hb-xe2-meta">
                            {o.eta} away · {o.arrival}
                            {o.tag && <span className="hb-xe2-tag">{o.tag}</span>}
                          </span>
                        </span>
                        <span className="hb-xe2-price">{o.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="hb-xe2-foot">
                <div className="hb-xe2-pay">
                  <span className="hb-xe2-card"><i aria-hidden="true" />{payment}</span>
                  <span>Personal</span>
                </div>
                <button type="button" className="hb-xe2-cta" data-done={done ? "true" : undefined} onClick={confirm}>
                  {done ? (
                    <>
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.4 3 3 6-6.4" /></svg>
                      Finding your driver
                    </>
                  ) : (
                    <>Confirm {current?.name} · {current?.price}</>
                  )}
                </button>
                <span className="hb-xe2-sr" aria-live="polite">{done ? `${current?.name} requested` : ""}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
