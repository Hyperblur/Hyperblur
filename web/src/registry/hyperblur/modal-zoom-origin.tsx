"use client";

import * as React from "react";

export interface ModalZoomCheck {
  label: string;
  detail: string;
  state?: "pass" | "warn";
}

export interface ModalZoomOriginProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  branch?: string;
  target?: string;
  checks?: ModalZoomCheck[];
  confirmLabel?: string;
  onConfirm?: () => void;
  accent?: string;
}

const defaultChecks: ModalZoomCheck[] = [
  { label: "Build passed", detail: "42s · 318 modules", state: "pass" },
  { label: "Preview approved", detail: "Maya Chen · 6 min ago", state: "pass" },
  { label: "2 environment variables changed", detail: "STRIPE_KEY, WEBHOOK_URL", state: "warn" },
];

const css = `
.hb-xe1 { --hb-xe1-accent: #2f7bff; display: inline-block; box-sizing: border-box; color: #ededed; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe1 *, .hb-xe1 *::before, .hb-xe1 *::after { box-sizing: border-box; }
.hb-xe1[data-embedded] { position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: radial-gradient(120% 90% at 50% 120%, rgba(47, 123, 255, 0.10), transparent 60%), #0b0b0c; }
.hb-xe1-trigger { display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px 0 12px; border: 1px solid rgba(255, 255, 255, 0.10); border-radius: 10px; background: linear-gradient(180deg, #1c1c1f, #141416); color: #ededed; font: inherit; font-size: 13px; font-weight: 550; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 6px 18px -8px rgba(0, 0, 0, 0.8); transition: transform 0.18s cubic-bezier(0.3, 0.7, 0.4, 1), border-color 0.2s ease, opacity 0.2s ease; }
.hb-xe1-trigger:hover { border-color: rgba(255, 255, 255, 0.18); }
.hb-xe1-trigger:active { transform: scale(0.97); }
.hb-xe1-trigger[data-open="true"] { opacity: 0; }
.hb-xe1-trigger svg { width: 14px; height: 14px; color: var(--hb-xe1-accent); }
.hb-xe1-trigger:focus-visible, .hb-xe1-btn:focus-visible, .hb-xe1-x:focus-visible { outline: 2px solid var(--hb-xe1-accent); outline-offset: 2px; }
.hb-xe1-layer { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; height: 100dvh; padding: 16px; }
.hb-xe1[data-embedded] .hb-xe1-layer { position: absolute; height: auto; padding: 10px; z-index: 2; }
.hb-xe1-scrim { position: absolute; inset: 0; background: rgba(4, 4, 6, 0.62); -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); animation: hb-xe1-fade 0.32s ease both; }
.hb-xe1-layer[data-closing="true"] .hb-xe1-scrim { animation: hb-xe1-fade-out 0.3s ease both; }
.hb-xe1-panel { position: relative; width: 100%; max-width: 420px; max-height: 100%; overflow: auto; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; background: linear-gradient(180deg, #161618 0%, #111112 100%); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 40px 80px -24px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(0, 0, 0, 0.6); outline: none; transform-origin: center; will-change: transform; }
.hb-xe1-content { animation: hb-xe1-in 0.38s 0.14s cubic-bezier(0.22, 1, 0.36, 1) both; }
.hb-xe1-layer[data-closing="true"] .hb-xe1-content { animation: hb-xe1-fade-out 0.12s ease both; }
.hb-xe1-head { display: flex; gap: 12px; padding: 18px 18px 0; }
.hb-xe1-mark { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 10px; background: radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--hb-xe1-accent) 55%, #fff 0%), var(--hb-xe1-accent)); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 8px 20px -6px color-mix(in srgb, var(--hb-xe1-accent) 70%, transparent); color: #fff; }
.hb-xe1-mark svg { width: 17px; height: 17px; }
.hb-xe1-title { margin: 0; font-size: 15.5px; font-weight: 600; letter-spacing: -0.012em; line-height: 1.3; }
.hb-xe1-desc { margin: 3px 0 0; color: #9a9a9e; font-size: 12.5px; line-height: 1.45; }
.hb-xe1-x { position: absolute; top: 12px; right: 12px; display: grid; place-items: center; width: 28px; height: 28px; border: 0; border-radius: 8px; background: transparent; color: #7c7c80; cursor: pointer; transition: background-color 0.15s ease, color 0.15s ease; }
.hb-xe1-x:hover { background: rgba(255, 255, 255, 0.07); color: #ededed; }
.hb-xe1-x svg { width: 13px; height: 13px; }
.hb-xe1-branch { display: flex; align-items: center; gap: 8px; margin: 14px 18px 0; padding: 9px 11px; border: 1px solid #232326; border-radius: 10px; background: #0c0c0d; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11.5px; color: #c9c9cc; }
.hb-xe1-chip { padding: 2px 7px; border-radius: 6px; background: #1b1b1e; box-shadow: inset 0 0 0 1px #2a2a2e; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
.hb-xe1-chip[data-target="true"] { color: #fff; background: color-mix(in srgb, var(--hb-xe1-accent) 22%, #111); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xe1-accent) 45%, transparent); }
.hb-xe1-arrow { flex: none; color: #5d5d62; }
.hb-xe1-checks { list-style: none; margin: 10px 0 0; padding: 0 18px; display: grid; gap: 2px; }
.hb-xe1-check { display: grid; grid-template-columns: 18px 1fr; gap: 10px; align-items: start; padding: 7px 0; border-bottom: 1px dashed #222225; }
.hb-xe1-check:last-child { border-bottom: 0; }
.hb-xe1-dot { display: grid; place-items: center; width: 18px; height: 18px; margin-top: 1px; border-radius: 50%; background: rgba(70, 200, 130, 0.14); color: #4fd18b; }
.hb-xe1-dot[data-state="warn"] { background: rgba(245, 180, 60, 0.14); color: #f5b63c; }
.hb-xe1-dot svg { width: 10px; height: 10px; }
.hb-xe1-label { display: block; font-size: 13px; font-weight: 500; line-height: 1.35; }
.hb-xe1-detail { display: block; margin-top: 1px; color: #85858a; font-size: 11.5px; }
.hb-xe1-foot { display: flex; justify-content: flex-end; gap: 8px; padding: 14px 18px 18px; }
.hb-xe1-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 7px; height: 34px; padding: 0 14px; overflow: hidden; border: 1px solid #2a2a2e; border-radius: 9px; background: #18181b; color: #d4d4d8; font: inherit; font-size: 13px; font-weight: 550; cursor: pointer; transition: background-color 0.15s ease, transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe1-btn:hover { background: #202024; }
.hb-xe1-btn:active { transform: scale(0.97); }
.hb-xe1-btn[data-primary] { min-width: 128px; border-color: transparent; background: var(--hb-xe1-accent); color: #fff; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 6px 16px -6px color-mix(in srgb, var(--hb-xe1-accent) 80%, transparent); }
.hb-xe1-btn[data-primary]:hover { background: color-mix(in srgb, var(--hb-xe1-accent) 88%, #fff); }
.hb-xe1-btn[data-status="busy"] { cursor: progress; }
.hb-xe1-btn[data-status="done"] { background: #1f9d5b; }
.hb-xe1-fill { position: absolute; font-style: normal; inset: 0; background: rgba(255, 255, 255, 0.18); transform-origin: left; transform: scaleX(0); animation: hb-xe1-fill 1.4s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
.hb-xe1-btn span { position: relative; display: inline-flex; align-items: center; gap: 7px; }
.hb-xe1-btn svg { width: 13px; height: 13px; }
.hb-xe1-tick { stroke-dasharray: 20; stroke-dashoffset: 20; animation: hb-xe1-draw 0.4s 0.05s ease-out forwards; }
@keyframes hb-xe1-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-xe1-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xe1-in { from { opacity: 0; transform: translateY(6px); filter: blur(4px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes hb-xe1-fill { to { transform: scaleX(1); } }
@keyframes hb-xe1-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe1-scrim, .hb-xe1-content, .hb-xe1-fill, .hb-xe1-tick { animation: none; }
  .hb-xe1-tick { stroke-dashoffset: 0; }
  .hb-xe1-fill { transform: scaleX(1); }
  .hb-xe1-trigger, .hb-xe1-btn, .hb-xe1-x { transition: none; }
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

function reduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ModalZoomOrigin({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  trigger = "Publish",
  title = "Publish to production",
  description = "This replaces the live site for 14,203 monthly visitors. You can roll back from Deployments.",
  branch = "feat/billing-v2",
  target = "main",
  checks = defaultChecks,
  confirmLabel = "Publish now",
  onConfirm,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: ModalZoomOriginProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [closing, setClosing] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "busy" | "done">("idle");
  const userOpened = React.useRef(false);
  const panel = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const timers = React.useRef<number[]>([]);
  const id = React.useId();

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => clearTimeout(t));
  }, []);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) userOpened.current = true;
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  const geometry = React.useCallback(() => {
    const p = panel.current;
    const t = triggerRef.current;
    if (!p) return null;
    const pr = p.getBoundingClientRect();
    if (!t || pr.width === 0) return { from: "translate(0px, 8px) scale(0.92)", radius: "16px" };
    const tr = t.getBoundingClientRect();
    const dx = tr.left + tr.width / 2 - (pr.left + pr.width / 2);
    const dy = tr.top + tr.height / 2 - (pr.top + pr.height / 2);
    const sx = Math.max(tr.width / pr.width, 0.05);
    const sy = Math.max(tr.height / pr.height, 0.05);
    return {
      from: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`,
      radius: `${(10 / sx).toFixed(1)}px / ${(10 / sy).toFixed(1)}px`,
    };
  }, []);

  React.useLayoutEffect(() => {
    if (!isOpen || reduced()) return;
    const p = panel.current;
    const g = geometry();
    if (!p || !g || typeof p.animate !== "function") return;
    p.animate(
      [
        { transform: g.from, borderRadius: g.radius, opacity: 0.5 },
        { transform: "translate(0px, 0px) scale(1, 1)", borderRadius: "16px", opacity: 1 },
      ],
      { duration: 480, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
  }, [isOpen, geometry]);

  const requestClose = React.useCallback(() => {
    if (closing) return;
    const p = panel.current;
    const g = geometry();
    setStatus("idle");
    if (!p || !g || reduced() || typeof p.animate !== "function") {
      setOpen(false);
      return;
    }
    setClosing(true);
    const anim = p.animate(
      [
        { transform: "translate(0px, 0px) scale(1, 1)", borderRadius: "16px", opacity: 1 },
        { transform: g.from, borderRadius: g.radius, opacity: 0 },
      ],
      { duration: 340, easing: "cubic-bezier(0.55, 0, 0.75, 0.2)", fill: "forwards" },
    );
    anim.onfinish = () => {
      setClosing(false);
      setOpen(false);
    };
  }, [closing, geometry, setOpen]);

  useLayer(isOpen, embedded, panel, requestClose, userOpened);

  function publish() {
    if (status !== "idle") return;
    setStatus("busy");
    timers.current.push(
      window.setTimeout(() => {
        setStatus("done");
        onConfirm?.();
        timers.current.push(window.setTimeout(() => requestClose(), 900));
      }, 1400),
    );
  }

  const vars = { "--hb-xe1-accent": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-xe1 ${className}`} data-embedded={embedded || undefined} style={vars} {...rest}>
      <style href="hb-xe1-css" precedence="default">{css}</style>
      {trigger !== null && (
        <button
          ref={triggerRef}
          type="button"
          className="hb-xe1-trigger"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          data-open={isOpen && !closing ? "true" : undefined}
          onClick={() => setOpen(true)}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 13V3m0 0L4 7m4-4 4 4" />
          </svg>
          {trigger}
        </button>
      )}
      {isOpen && (
        <div className="hb-xe1-layer" data-closing={closing ? "true" : undefined}>
          <div
            className="hb-xe1-scrim"
            onClick={requestClose}
            aria-hidden="true"
          />
          <div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-t`}
            aria-describedby={`${id}-d`}
            tabIndex={-1}
            className="hb-xe1-panel"
          >
            <div className="hb-xe1-content">
              <div className="hb-xe1-head">
                <span className="hb-xe1-mark" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 2.5 17 15H3L10 2.5Z" />
                  </svg>
                </span>
                <div style={{ minWidth: 0, paddingRight: 24 }}>
                  <h2 id={`${id}-t`} className="hb-xe1-title">{title}</h2>
                  <p id={`${id}-d`} className="hb-xe1-desc">{description}</p>
                </div>
              </div>
              <button type="button" className="hb-xe1-x" aria-label="Close" onClick={requestClose}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="m3.5 3.5 9 9m0-9-9 9" />
                </svg>
              </button>
              <div className="hb-xe1-branch">
                <span className="hb-xe1-chip">{branch}</span>
                <svg className="hb-xe1-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 8h10m-3-3 3 3-3 3" />
                </svg>
                <span className="hb-xe1-chip" data-target="true">{target}</span>
              </div>
              <ul className="hb-xe1-checks">
                {checks.map((c) => (
                  <li key={c.label} className="hb-xe1-check">
                    <span className="hb-xe1-dot" data-state={c.state ?? "pass"} aria-hidden="true">
                      {c.state === "warn" ? (
                        <svg viewBox="0 0 10 10" fill="currentColor"><rect x="4.2" y="1.5" width="1.6" height="4.6" rx="0.8" /><circle cx="5" cy="8" r="0.95" /></svg>
                      ) : (
                        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m2.2 5.2 1.9 1.9L7.8 3" /></svg>
                      )}
                    </span>
                    <span>
                      <span className="hb-xe1-label">{c.label}</span>
                      <span className="hb-xe1-detail">{c.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="hb-xe1-foot">
                <button type="button" className="hb-xe1-btn" onClick={requestClose}>Cancel</button>
                <button
                  type="button"
                  className="hb-xe1-btn"
                  data-primary=""
                  data-autofocus=""
                  data-status={status}
                  aria-busy={status === "busy" || undefined}
                  onClick={publish}
                >
                  {status === "busy" && <i className="hb-xe1-fill" aria-hidden="true" />}
                  <span aria-live="polite">
                    {status === "done" && (
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path className="hb-xe1-tick" d="m3 7.4 2.6 2.6L11 4.4" /></svg>
                    )}
                    {status === "idle" ? confirmLabel : status === "busy" ? "Publishing" : "Published"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
