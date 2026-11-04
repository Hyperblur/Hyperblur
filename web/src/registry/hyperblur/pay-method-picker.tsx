"use client";

import * as React from "react";

export type PayMethodIcon = "card" | "bank" | "wallet" | "voucher";

export interface PayMethod {
  id: string;
  label: string;
  description?: string;
  detail?: React.ReactNode;
  badge?: string;
  icon?: PayMethodIcon;
  disabled?: boolean;
}

export interface PayMethodPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  methods?: PayMethod[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  accent?: string;
  label?: string;
}

const defaultMethods: PayMethod[] = [
  {
    id: "card",
    label: "Credit or debit card",
    description: "Instant confirmation",
    icon: "card",
    badge: "Popular",
    detail: "Enter your card details on the next step. Nothing is charged until you confirm the order.",
  },
  {
    id: "bank",
    label: "Bank transfer",
    description: "Arrives in 1 to 2 business days",
    icon: "bank",
    detail: "We show the account details and a payment reference after checkout. The order ships once the transfer clears.",
  },
  {
    id: "wallet",
    label: "Wallet balance",
    description: "Pay from your stored balance",
    icon: "wallet",
    detail: "Your wallet balance is applied first. Any remainder can be paid by card.",
  },
  {
    id: "voucher",
    label: "Cash voucher",
    description: "Pay at a partner store",
    icon: "voucher",
    detail: "Print or save the voucher and pay within 3 days at any partner store. A small cash fee may apply.",
  },
];

const css = `
.hb-qf3 {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.35;
}
.hb-qf3 *, .hb-qf3 *::before, .hb-qf3 *::after { box-sizing: border-box; }
.hb-qf3-hl {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
  background: color-mix(in srgb, var(--hb-qf3-x) 12%, #111111);
  border: 1px solid var(--hb-qf3-x);
  border-radius: 12px;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qf3-x) 16%, transparent), 0 10px 30px -14px var(--hb-qf3-x);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), height 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}
.hb-qf3[data-ready="true"] .hb-qf3-hl { opacity: 1; }
.hb-qf3-item {
  position: relative;
  min-width: 0;
  background: #111111;
  border: 1px solid #262626;
  border-radius: 12px;
  transition: border-color 0.25s ease;
}
.hb-qf3-item[data-on="true"] { background: transparent; border-color: transparent; }
.hb-qf3-item:not([data-on="true"]):hover { border-color: #3a3a3a; }
.hb-qf3-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin: 0;
  padding: 7px 12px;
  color: inherit;
  font: inherit;
  text-align: left;
  background: none;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hb-qf3-row:focus-visible { outline: 2px solid var(--hb-qf3-x); outline-offset: 2px; }
.hb-qf3-row:disabled { cursor: not-allowed; opacity: 0.45; }
.hb-qf3-ico {
  display: grid;
  flex: none;
  place-items: center;
  width: 28px;
  height: 28px;
  color: #a1a1a1;
  background: #1a1a1a;
  border-radius: 8px;
  transition: color 0.25s ease, background-color 0.25s ease;
}
.hb-qf3-item[data-on="true"] .hb-qf3-ico { color: #fff; background: var(--hb-qf3-x); }
.hb-qf3-ico svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.hb-qf3-txt { display: flex; min-width: 0; flex: 1; flex-direction: column; }
.hb-qf3-name { overflow: hidden; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-qf3-desc { overflow: hidden; color: #8f8f8f; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-qf3-badge {
  flex: none;
  padding: 2px 8px;
  color: var(--hb-qf3-soft);
  font-size: 11px;
  font-weight: 600;
  background: color-mix(in srgb, var(--hb-qf3-x) 16%, transparent);
  border-radius: 999px;
}
.hb-qf3-dot {
  position: relative;
  flex: none;
  width: 18px;
  height: 18px;
  border: 1.5px solid #4a4a4a;
  border-radius: 50%;
  transition: border-color 0.25s ease;
}
.hb-qf3-dot::after {
  content: "";
  position: absolute;
  inset: 3px;
  background: var(--hb-qf3-x);
  border-radius: 50%;
  transform: scale(0);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-qf3-item[data-on="true"] .hb-qf3-dot { border-color: var(--hb-qf3-x); }
.hb-qf3-item[data-on="true"] .hb-qf3-dot::after { transform: scale(1); }
.hb-qf3-more {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-qf3-item[data-on="true"] .hb-qf3-more { grid-template-rows: 1fr; }
.hb-qf3-more > div { min-height: 0; overflow: hidden; }
.hb-qf3-more p {
  margin: 0;
  padding: 0 12px 9px 52px;
  color: #a1a1a1;
  font-size: 12.5px;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.3s ease 0.08s, transform 0.3s ease 0.08s;
}
.hb-qf3-item[data-on="true"] .hb-qf3-more p { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-qf3-hl, .hb-qf3-item, .hb-qf3-ico, .hb-qf3-dot, .hb-qf3-dot::after, .hb-qf3-more, .hb-qf3-more p { transition: none; }
}
`;

function Icon({ kind }: { kind: PayMethodIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {kind === "card" && (
        <>
          <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
          <path d="M3 10h18M7 15h3" />
        </>
      )}
      {kind === "bank" && <path d="M3 9.5L12 4l9 5.5M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3.5 20h17" />}
      {kind === "wallet" && (
        <>
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" />
          <rect x="3.5" y="8" width="17" height="11" rx="2.5" />
          <circle cx="16.5" cy="13.5" r="1" />
        </>
      )}
      {kind === "voucher" && (
        <>
          <path d="M4 8a2 2 0 0 0 0 4v0a2 2 0 0 0 0 4v1.5h16V16a2 2 0 0 1 0-4v0a2 2 0 0 1 0-4V6.5H4z" />
          <path d="M14 7v10" strokeDasharray="1.6 2.2" />
        </>
      )}
    </svg>
  );
}

export function PayMethodPicker({
  methods = defaultMethods,
  value,
  defaultValue,
  onChange,
  accent = "#2f7bff",
  label = "Payment method",
  className = "",
  style,
  ...rest
}: PayMethodPickerProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const hlRef = React.useRef<HTMLDivElement>(null);
  const rowRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [inner, setInner] = React.useState(defaultValue ?? methods[0]?.id ?? "");
  const current = value ?? inner;
  const activeIndex = Math.max(0, methods.findIndex((m) => m.id === current));

  const place = React.useCallback(() => {
    const root = rootRef.current;
    const hl = hlRef.current;
    const item = rowRefs.current[activeIndex]?.parentElement;
    if (!root || !hl || !item) return;
    const first = !root.dataset.ready;
    if (first) hl.style.transition = "none";
    hl.style.transform = `translateY(${item.offsetTop}px)`;
    hl.style.height = `${item.offsetHeight}px`;
    if (first) {
      void hl.offsetHeight;
      hl.style.transition = "";
      root.dataset.ready = "true";
    }
  }, [activeIndex]);

  React.useLayoutEffect(() => {
    place();
  }, [place, methods]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => place());
    ro.observe(root);
    rowRefs.current.forEach((el) => el?.parentElement && ro.observe(el.parentElement));
    return () => ro.disconnect();
  }, [place, methods]);

  function choose(id: string) {
    if (value === undefined) setInner(id);
    if (id !== current) onChange?.(id);
  }

  function onKey(event: React.KeyboardEvent, index: number) {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    let next = index;
    if (event.key === "Home") next = -1;
    if (event.key === "End") next = methods.length;
    const jump = event.key === "Home" ? 1 : event.key === "End" ? -1 : step;
    for (let i = 0; i < methods.length; i += 1) {
      next = (next + jump + methods.length) % methods.length;
      if (!methods[next].disabled) break;
    }
    rowRefs.current[next]?.focus();
    choose(methods[next].id);
  }

  const vars = {
    "--hb-qf3-x": accent,
    "--hb-qf3-soft": `color-mix(in srgb, ${accent} 55%, #fff)`,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      role="radiogroup"
      aria-label={label}
      className={`hb-qf3 ${className}`}
      style={vars}
      {...rest}
    >
      <style href="hb-pay-method-picker" precedence="default">{css}</style>
      <div ref={hlRef} className="hb-qf3-hl" aria-hidden="true" />
      {methods.map((m, i) => {
        const on = i === activeIndex;
        const detailId = `${uid}-${m.id}`;
        return (
          <div key={m.id} className="hb-qf3-item" data-on={on} role="none">
            <button
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              type="button"
              role="radio"
              className="hb-qf3-row"
              aria-checked={on}
              aria-describedby={m.detail ? detailId : undefined}
              tabIndex={on ? 0 : -1}
              disabled={m.disabled}
              onClick={() => choose(m.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="hb-qf3-ico">
                <Icon kind={m.icon ?? "card"} />
              </span>
              <span className="hb-qf3-txt">
                <span className="hb-qf3-name">{m.label}</span>
                {m.description && <span className="hb-qf3-desc">{m.description}</span>}
              </span>
              {m.badge && <span className="hb-qf3-badge">{m.badge}</span>}
              <span className="hb-qf3-dot" aria-hidden="true" />
            </button>
            {m.detail && (
              <div className="hb-qf3-more">
                <div>
                  <p id={detailId}>{m.detail}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
