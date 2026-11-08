"use client";

import * as React from "react";

export interface TransferPerson {
  name: string;
  role: string;
  colors?: [string, string];
}

export interface DialogTransferConfirmProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  trigger?: React.ReactNode;
  workspace?: string;
  description?: string;
  from?: TransferPerson;
  to?: TransferPerson;
  consequences?: string[];
  acknowledgement?: string;
  confirmLabel?: string;
  onConfirm?: () => void | Promise<void>;
  accent?: string;
}

const defaultFrom: TransferPerson = { name: "Sam Okafor", role: "Owner", colors: ["#fbbf24", "#f97316"] };
const defaultTo: TransferPerson = { name: "Jordan Lee", role: "Admin", colors: ["#67e8f9", "#6366f1"] };
const defaultConsequences = [
  "You become an Admin of the workspace",
  "Billing, invoices and the card on file move to Jordan",
  "Only the new owner can delete the workspace",
];

const css = `
.hb-xe6 { --hb-xe6-accent: #f43f5e; display: inline-block; box-sizing: border-box; color: #ededed; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe6 *, .hb-xe6 *::before, .hb-xe6 *::after { box-sizing: border-box; }
.hb-xe6[data-embedded] { position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: #0b0b0c; }
.hb-xe6-trigger { display: inline-flex; align-items: center; gap: 8px; height: 34px; padding: 0 13px; border: 1px solid color-mix(in srgb, var(--hb-xe6-accent) 35%, #2a2a2c); border-radius: 9px; background: color-mix(in srgb, var(--hb-xe6-accent) 8%, #121213); color: color-mix(in srgb, var(--hb-xe6-accent) 55%, #fff); font: inherit; font-size: 13px; font-weight: 550; cursor: pointer; transition: background-color 0.2s ease, transform 0.15s ease; }
.hb-xe6-trigger:hover { background: color-mix(in srgb, var(--hb-xe6-accent) 14%, #121213); }
.hb-xe6-trigger:active { transform: scale(0.97); }
.hb-xe6-trigger svg { width: 14px; height: 14px; }
.hb-xe6 button:focus-visible, .hb-xe6-check:focus-within .hb-xe6-box { outline: 2px solid var(--hb-xe6-accent); outline-offset: 2px; }
.hb-xe6-layer { position: fixed; inset: 0; z-index: 1000; height: 100dvh; display: grid; place-items: center; padding: 16px; }
.hb-xe6[data-embedded] .hb-xe6-layer { position: absolute; height: auto; z-index: 2; padding: 10px; }
.hb-xe6-scrim { position: absolute; inset: 0; background: rgba(3, 3, 4, 0.64); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); animation: hb-xe6-fade 0.25s ease both; }
.hb-xe6-layer[data-state="closed"] .hb-xe6-scrim { animation: hb-xe6-fade-out 0.2s ease both; }
.hb-xe6-panel { position: relative; width: 100%; max-width: 420px; max-height: 100%; overflow: auto; border: 1px solid #262628; border-radius: 18px; background: #121213; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 30px 80px -24px rgba(0, 0, 0, 0.9); outline: none; animation: hb-xe6-in 0.36s cubic-bezier(0.2, 0.9, 0.25, 1) both; }
.hb-xe6-layer[data-state="closed"] .hb-xe6-panel { animation: hb-xe6-out 0.2s ease both; }
.hb-xe6-stage { position: relative; display: grid; grid-template-columns: 1fr 96px 1fr; align-items: center; padding: 20px 18px 16px; border-bottom: 1px solid #1f1f21; background: radial-gradient(70% 120% at 50% 0%, color-mix(in srgb, var(--hb-xe6-accent) 10%, transparent), transparent 70%), linear-gradient(180deg, #161617, #121213); border-radius: 18px 18px 0 0; }
.hb-xe6-person { display: grid; justify-items: center; gap: 6px; text-align: center; min-width: 0; }
.hb-xe6-av { position: relative; display: grid; place-items: center; width: 46px; height: 46px; border-radius: 50%; color: #111; font-size: 15px; font-weight: 700; box-shadow: 0 0 0 3px #121213, 0 0 0 4px #2a2a2d, 0 10px 20px -8px rgba(0, 0, 0, 0.8); }
.hb-xe6-pname { font-size: 12.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
.hb-xe6-prole { margin-top: -4px; color: #85858a; font-size: 11px; transition: color 0.3s ease; }
.hb-xe6-track { position: relative; height: 2px; margin-bottom: 26px; border-radius: 2px; background: repeating-linear-gradient(90deg, #333336 0 4px, transparent 4px 9px); overflow: visible; }
.hb-xe6-pulse { position: absolute; font-style: normal; top: -2px; left: 0; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-xe6-accent); box-shadow: 0 0 10px var(--hb-xe6-accent); animation: hb-xe6-flow 1.8s cubic-bezier(0.6, 0, 0.4, 1) infinite; animation-delay: calc(var(--hb-xe6-i) * 0.6s); opacity: 0; }
.hb-xe6-crown { position: absolute; top: 12px; left: 18px; z-index: 1; width: calc((100% - 36px - 96px) / 2); display: flex; justify-content: center; pointer-events: none; transition: transform 0.9s cubic-bezier(0.65, 0, 0.25, 1); }
.hb-xe6-crown span { display: grid; place-items: center; width: 22px; height: 22px; margin-right: -30px; border-radius: 50%; background: linear-gradient(180deg, #fde68a, #f59e0b); color: #4a2a00; box-shadow: 0 0 0 2px #121213, 0 4px 10px -2px rgba(245, 158, 11, 0.6); }
.hb-xe6-crown svg { width: 12px; height: 12px; }
.hb-xe6-crown[data-moved="true"] { transform: translateX(calc(100% + 96px)); }
.hb-xe6-crown[data-moved="true"] span { animation: hb-xe6-hop 0.9s cubic-bezier(0.65, 0, 0.25, 1); }
.hb-xe6-body { padding: 16px 18px 0; }
.hb-xe6-title { margin: 0; font-size: 15.5px; font-weight: 600; letter-spacing: -0.012em; }
.hb-xe6-desc { margin: 4px 0 0; color: #9c9ca2; font-size: 12.5px; line-height: 1.5; }
.hb-xe6-list { list-style: none; margin: 12px 0 0; padding: 0; display: grid; gap: 7px; }
.hb-xe6-list li { display: grid; grid-template-columns: 16px 1fr; gap: 9px; align-items: start; color: #c8c8cd; font-size: 12.5px; line-height: 1.4; }
.hb-xe6-list svg { width: 14px; height: 14px; margin-top: 1px; color: #6c6c72; }
.hb-xe6-check { display: flex; align-items: flex-start; gap: 10px; margin-top: 14px; padding: 10px 11px; border-radius: 11px; background: #0d0d0e; box-shadow: inset 0 0 0 1px #232325; cursor: pointer; font-size: 12.5px; color: #d4d4d8; line-height: 1.4; transition: box-shadow 0.2s ease; }
.hb-xe6-check[data-on="true"] { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xe6-accent) 45%, transparent); }
.hb-xe6-check input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.hb-xe6-box { flex: none; display: grid; place-items: center; width: 17px; height: 17px; margin-top: 0; border-radius: 5px; border: 1.5px solid #47474c; transition: background-color 0.2s ease, border-color 0.2s ease; }
.hb-xe6-check[data-on="true"] .hb-xe6-box { border-color: var(--hb-xe6-accent); background: var(--hb-xe6-accent); }
.hb-xe6-box svg { width: 11px; height: 11px; color: #fff; stroke-dasharray: 16; stroke-dashoffset: 16; transition: stroke-dashoffset 0.25s ease 0.05s; }
.hb-xe6-check[data-on="true"] .hb-xe6-box svg { stroke-dashoffset: 0; }
.hb-xe6-err { margin: 10px 0 0; color: #ff8a8f; font-size: 12px; }
.hb-xe6-foot { display: flex; justify-content: flex-end; gap: 8px; padding: 16px 18px 18px; }
.hb-xe6-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; min-width: 88px; height: 36px; padding: 0 14px; border: 1px solid #2b2b2e; border-radius: 10px; background: transparent; color: #d4d4d8; font: inherit; font-size: 13px; font-weight: 550; white-space: nowrap; cursor: pointer; transition: background-color 0.15s ease, opacity 0.2s ease, transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe6-btn:hover:not(:disabled) { background: #1b1b1d; }
.hb-xe6-btn:active:not(:disabled) { transform: scale(0.97); }
.hb-xe6-btn[data-primary] { min-width: 160px; border-color: transparent; background: var(--hb-xe6-accent); color: #fff; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 8px 18px -10px var(--hb-xe6-accent); }
.hb-xe6-btn[data-primary]:hover:not(:disabled) { background: color-mix(in srgb, var(--hb-xe6-accent) 88%, #fff); }
.hb-xe6-btn[data-primary]:disabled { background: #2a2a2d; color: #6f6f75; box-shadow: none; cursor: not-allowed; }
.hb-xe6-btn[data-state="done"] { background: #1f9d5b; }
.hb-xe6-spin { width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.3); border-top-color: #fff; animation: hb-xe6-spin 0.7s linear infinite; }
.hb-xe6[data-embedded] .hb-xe6-stage { padding: 14px 18px 10px; }
.hb-xe6[data-embedded] .hb-xe6-crown { top: 6px; }
.hb-xe6[data-embedded] .hb-xe6-foot { padding: 14px 18px 16px; }
@keyframes hb-xe6-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-xe6-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xe6-in { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: none; } }
@keyframes hb-xe6-out { from { opacity: 1; } to { opacity: 0; transform: scale(0.97); } }
@keyframes hb-xe6-flow { 0% { left: 0; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { left: calc(100% - 6px); opacity: 0; } }
@keyframes hb-xe6-hop { 0%, 100% { translate: 0 0; } 50% { translate: 0 -16px; } }
@keyframes hb-xe6-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe6-scrim, .hb-xe6-panel, .hb-xe6-layer[data-state="closed"] .hb-xe6-panel, .hb-xe6-layer[data-state="closed"] .hb-xe6-scrim, .hb-xe6-crown[data-moved="true"] span { animation: none; }
  .hb-xe6-pulse { animation: none; opacity: 0; }
  .hb-xe6-layer[data-state="closed"] { opacity: 0; }
  .hb-xe6-crown, .hb-xe6-box, .hb-xe6-box svg, .hb-xe6-btn, .hb-xe6-check, .hb-xe6-trigger { transition: none; }
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

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function DialogTransferConfirm({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  trigger = "Transfer ownership",
  workspace = "Acme Robotics",
  description,
  from = defaultFrom,
  to = defaultTo,
  consequences = defaultConsequences,
  acknowledgement = "I understand only the new owner can transfer it back.",
  confirmLabel = "Transfer ownership",
  onConfirm,
  accent = "#f43f5e",
  className = "",
  style,
  ...rest
}: DialogTransferConfirmProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [present, setPresent] = React.useState(isOpen);
  const [ack, setAck] = React.useState(false);
  const [state, setState] = React.useState<"idle" | "busy" | "done" | "error">("idle");
  const userOpened = React.useRef(false);
  const panel = React.useRef<HTMLDivElement>(null);
  const timers = React.useRef<number[]>([]);
  const id = React.useId();

  if (isOpen && !present) setPresent(true);

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => clearTimeout(t));
  }, []);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) {
        userOpened.current = true;
        setAck(false);
        setState("idle");
      }
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );
  const close = React.useCallback(() => {
    if (state === "busy") return;
    setOpen(false);
  }, [state, setOpen]);

  React.useEffect(() => {
    if (isOpen || !present) return;
    const t = setTimeout(() => setPresent(false), 220);
    return () => clearTimeout(t);
  }, [isOpen, present]);

  useLayer(isOpen, embedded, panel, close, userOpened);

  function confirm() {
    if (!ack || state === "busy" || state === "done") return;
    setState("busy");
    const started = performance.now();
    Promise.resolve()
      .then(() => onConfirm?.())
      .then(
        () => {
          const wait = Math.max(0, 700 - (performance.now() - started));
          timers.current.push(
            window.setTimeout(() => {
              setState("done");
              timers.current.push(window.setTimeout(() => setOpen(false), 1600));
            }, wait),
          );
        },
        () => setState("error"),
      );
  }

  const moved = state === "done";
  const vars = { "--hb-xe6-accent": accent, ...style } as React.CSSProperties;
  const av = (p: TransferPerson) => ({ background: `linear-gradient(135deg, ${(p.colors ?? ["#e4e4e7", "#a1a1aa"])[0]}, ${(p.colors ?? ["#e4e4e7", "#a1a1aa"])[1]})` });

  return (
    <div className={`hb-xe6 ${className}`} data-embedded={embedded || undefined} style={vars} {...rest}>
      <style href="hb-xe6-css" precedence="default">{css}</style>
      {trigger !== null && (
        <button type="button" className="hb-xe6-trigger" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setOpen(true)}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 5.5h9m0 0-2.5-2.5m2.5 2.5L9 8M13.5 10.5h-9m0 0L7 8m-2.5 2.5L7 13" />
          </svg>
          {trigger}
        </button>
      )}
      {present && (
        <div className="hb-xe6-layer" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xe6-scrim" onClick={close} aria-hidden="true" />
          <div
            ref={panel}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`${id}-t`}
            aria-describedby={`${id}-d`}
            tabIndex={-1}
            className="hb-xe6-panel"
          >
            <div className="hb-xe6-stage" aria-hidden="true">
              <div className="hb-xe6-crown" data-moved={moved ? "true" : undefined}>
                <span>
                  <svg viewBox="0 0 12 12" fill="currentColor"><path d="M1.5 4 4 6l2-3.5L8 6l2.5-2-1 5.5h-7Z" /></svg>
                </span>
              </div>
              <div className="hb-xe6-person">
                <span className="hb-xe6-av" style={av(from)}>{initials(from.name)}</span>
                <span className="hb-xe6-pname">{from.name}</span>
                <span className="hb-xe6-prole">{moved ? "Admin" : from.role}</span>
              </div>
              <div className="hb-xe6-track">
                {!moved && [0, 1, 2].map((i) => <i key={i} className="hb-xe6-pulse" style={{ "--hb-xe6-i": i } as React.CSSProperties} />)}
              </div>
              <div className="hb-xe6-person">
                <span className="hb-xe6-av" style={av(to)}>{initials(to.name)}</span>
                <span className="hb-xe6-pname">{to.name}</span>
                <span className="hb-xe6-prole" style={moved ? { color: "#fbbf24" } : undefined}>{moved ? "Owner" : to.role}</span>
              </div>
            </div>
            <div className="hb-xe6-body">
              <h2 id={`${id}-t`} className="hb-xe6-title">Transfer {workspace}?</h2>
              <p id={`${id}-d`} className="hb-xe6-desc">
                {description ?? `${to.name} becomes the owner as soon as you confirm. Here is what changes for you.`}
              </p>
              {consequences.length > 0 && (
                <ul className="hb-xe6-list">
                  {consequences.map((c) => (
                    <li key={c}>
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                        <circle cx="8" cy="8" r="6" />
                        <path d="M8 5v3.5M8 10.8v.2" />
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              <label className="hb-xe6-check" data-on={ack ? "true" : undefined}>
                <input type="checkbox" checked={ack} disabled={state === "busy" || moved} onChange={(e) => setAck(e.target.checked)} data-autofocus="" />
                <span className="hb-xe6-box" aria-hidden="true">
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2.5 6.2 2.2 2.2L9.5 3.6" /></svg>
                </span>
                {acknowledgement}
              </label>
              {state === "error" && <p className="hb-xe6-err" role="alert">The transfer did not go through. Try again.</p>}
            </div>
            <div className="hb-xe6-foot">
              <button type="button" className="hb-xe6-btn" onClick={close} disabled={state === "busy"}>Cancel</button>
              <button
                type="button"
                className="hb-xe6-btn"
                data-primary=""
                data-state={state}
                disabled={!ack || state === "busy"}
                aria-busy={state === "busy" || undefined}
                onClick={confirm}
              >
                {state === "busy" && <span className="hb-xe6-spin" aria-hidden="true" />}
                <span aria-live="polite">{state === "busy" ? "Transferring" : moved ? `${to.name.split(" ")[0]} is the owner` : confirmLabel}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
