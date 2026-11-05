"use client";

import * as React from "react";

export interface ModelOption {
  id: string;
  name: string;
  maker?: string;
  tags?: string[];
  speed: number;
  cost: number;
  context?: string;
}

export interface AgentModelPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  models?: ModelOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string, model: ModelOption) => void;
  defaultOpen?: boolean;
  listMaxHeight?: number;
  label?: string;
  accent?: string;
}

const defaultModels: ModelOption[] = [
  { id: "aster-pro", name: "Aster Pro", maker: "Northlight", tags: ["reasoning", "vision"], speed: 2, cost: 4, context: "200K" },
  { id: "aster-flash", name: "Aster Flash", maker: "Northlight", tags: ["fast", "tools"], speed: 5, cost: 1, context: "128K" },
  { id: "lumen-code", name: "Lumen Code", maker: "Halcyon", tags: ["code", "tools"], speed: 3, cost: 3, context: "256K" },
  { id: "vela-mini", name: "Vela Mini", maker: "Orbit Labs", tags: ["cheap", "fast"], speed: 5, cost: 1, context: "64K" },
  { id: "quill-long", name: "Quill Long", maker: "Halcyon", tags: ["long context"], speed: 3, cost: 2, context: "1M" },
];

const css = `
.hb-yf4 {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.3;
  color: #ededed;
  text-align: left;
}
.hb-yf4 *, .hb-yf4 *::before, .hb-yf4 *::after { box-sizing: border-box; font-family: inherit; }
.hb-yf4-label { display: block; margin: 0 0 6px 2px; font-size: 11px; font-weight: 500; color: #8f8f8f; }
.hb-yf4-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 44px;
  margin: 0;
  padding: 0 12px 0 8px;
  font: inherit;
  color: inherit;
  text-align: left;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}
.hb-yf4-trigger:hover { border-color: #3a3a3a; }
.hb-yf4-trigger[aria-expanded="true"] { border-color: var(--hb-yf4-a, #2f7bff); background: #131313; }
.hb-yf4-trigger:focus-visible { outline: 2px solid var(--hb-yf4-a, #2f7bff); outline-offset: 2px; }
.hb-yf4-orb { flex: none; width: 28px; height: 28px; border-radius: 9px; background: var(--hb-yf4-g); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12); }
.hb-yf4-cur { flex: 1; min-width: 0; }
.hb-yf4-name { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; font-weight: 600; letter-spacing: -0.01em; }
.hb-yf4-sub { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; color: #8f8f8f; }
.hb-yf4-chev { flex: none; width: 12px; height: 12px; color: #8f8f8f; transition: transform 0.2s ease; }
.hb-yf4-trigger[aria-expanded="true"] .hb-yf4-chev { transform: rotate(180deg); }
.hb-yf4-pop {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  max-height: var(--hb-yf4-mh, 260px);
  margin: 0;
  padding: 4px;
  overflow-y: auto;
  list-style: none;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
  transform-origin: top center;
  animation: hb-yf4-in 0.16s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  outline: none;
  scrollbar-width: thin;
  scrollbar-color: #333333 transparent;
}
.hb-yf4-opt { display: flex; align-items: center; gap: 10px; padding: 7px 8px; border-radius: 8px; cursor: pointer; }
.hb-yf4-opt .hb-yf4-name { font-size: 12.5px; }
.hb-yf4-opt[data-active="true"] { background: #1a1a1a; }
.hb-yf4-opt[aria-selected="true"] .hb-yf4-name { color: var(--hb-yf4-s, #7fb3ff); }
.hb-yf4-info { flex: 1; min-width: 0; }
.hb-yf4-tags { display: flex; gap: 4px; margin-top: 3px; overflow: hidden; }
.hb-yf4-tag { flex: none; padding: 0 6px; font-size: 10px; line-height: 15px; color: #a1a1a1; background: #1c1c1c; border: 1px solid #272727; border-radius: 999px; white-space: nowrap; }
.hb-yf4-meters { flex: none; display: grid; gap: 4px; }
.hb-yf4-meter { display: flex; align-items: center; justify-content: flex-end; gap: 6px; }
.hb-yf4-mlab { width: 32px; font-size: 9.5px; letter-spacing: 0.06em; text-transform: uppercase; color: #6b6b6b; }
.hb-yf4-pips { display: flex; gap: 2px; }
.hb-yf4-pip { width: 7px; height: 5px; border-radius: 2px; background: #2a2a2a; }
.hb-yf4-pip[data-on="true"] { background: var(--hb-yf4-m, #2f7bff); animation: hb-yf4-pip 0.35s ease both; animation-delay: calc(var(--hb-yf4-i, 0) * 45ms + 80ms); }
.hb-yf4-check { flex: none; width: 12px; height: 12px; color: var(--hb-yf4-s, #7fb3ff); }
@keyframes hb-yf4-in { from { opacity: 0; transform: translateY(-4px) scale(0.98); } to { opacity: 1; transform: none; } }
@keyframes hb-yf4-pip { from { opacity: 0; transform: scaleY(0.2); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-yf4-pop, .hb-yf4-pip[data-on="true"] { animation: none; }
  .hb-yf4-trigger, .hb-yf4-chev { transition: none; }
}
`;

function gradientFor(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i += 1) {
    h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  }
  const a = (h >>> 0) % 360;
  const b = (a + 48) % 360;
  return `linear-gradient(135deg, hsl(${a} 78% 62%), hsl(${b} 70% 42%))`;
}

function Meter({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  const on = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span className="hb-yf4-meter" role="img" aria-label={`${label} ${on} of 5`}>
      <span className="hb-yf4-mlab">{label}</span>
      <span className="hb-yf4-pips">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="hb-yf4-pip"
            data-on={i < on}
            style={{ "--hb-yf4-m": color, "--hb-yf4-i": i + delay } as React.CSSProperties}
          />
        ))}
      </span>
    </span>
  );
}

export function AgentModelPicker({
  models = defaultModels,
  value,
  defaultValue,
  onChange,
  defaultOpen = false,
  listMaxHeight = 260,
  label = "Model",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: AgentModelPickerProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const typed = React.useRef({ text: "", at: 0 });
  const [inner, setInner] = React.useState(defaultValue ?? models[0]?.id ?? "");
  const [open, setOpen] = React.useState(defaultOpen);
  const [active, setActive] = React.useState(() => Math.max(0, models.findIndex((m) => m.id === (defaultValue ?? models[0]?.id))));
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const selected = models.find((m) => m.id === current) ?? models[0];
  const listId = `${uid}-list`;
  const optId = (i: number) => `${uid}-opt-${i}`;

  React.useEffect(() => {
    if (!open) return;
    function away(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const el = list?.children[active] as HTMLElement | undefined;
    if (!list || !el) return;
    if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop - 4;
    else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight + 4;
    }
  }, [open, active]);

  function choose(i: number) {
    const m = models[i];
    if (!m) return;
    if (!controlled) setInner(m.id);
    onChange?.(m.id, m);
    setOpen(false);
  }

  function openAt(i: number) {
    setActive(i);
    setOpen(true);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const last = models.length - 1;
    const selectedIndex = Math.max(0, models.findIndex((m) => m.id === current));
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) openAt(selectedIndex);
      else setActive((a) => Math.min(last, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) openAt(selectedIndex);
      else setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Home" && open) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && open) {
      e.preventDefault();
      setActive(last);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) choose(active);
      else openAt(selectedIndex);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const stamp = e.timeStamp;
      const t = typed.current;
      t.text = stamp - t.at < 700 ? t.text + e.key.toLowerCase() : e.key.toLowerCase();
      t.at = stamp;
      const hit = models.findIndex((m) => m.name.toLowerCase().startsWith(t.text));
      if (hit >= 0) {
        if (open) setActive(hit);
        else choose(hit);
      }
    }
  }

  if (!selected) return null;

  return (
    <>
      <style href="hb-agent-model-picker" precedence="default">{css}</style>
      <div
        ref={rootRef}
        className={`hb-yf4 ${className}`}
        style={{ "--hb-yf4-a": accent, "--hb-yf4-s": "#7fb3ff", "--hb-yf4-mh": `${listMaxHeight}px`, ...style } as React.CSSProperties}
        {...rest}
      >
        {label ? <span id={`${uid}-label`} className="hb-yf4-label">{label}</span> : null}
        <button
          type="button"
          role="combobox"
          className="hb-yf4-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={label ? `${uid}-label` : undefined}
          aria-label={label ? undefined : "Model"}
          aria-activedescendant={open ? optId(active) : undefined}
          onClick={() => (open ? setOpen(false) : openAt(Math.max(0, models.findIndex((m) => m.id === current))))}
          onKeyDown={onKeyDown}
        >
          <span className="hb-yf4-orb" style={{ "--hb-yf4-g": gradientFor(selected.id) } as React.CSSProperties} aria-hidden="true" />
          <span className="hb-yf4-cur">
            <span className="hb-yf4-name">{selected.name}</span>
            <span className="hb-yf4-sub">
              {[selected.maker, selected.context ? `${selected.context} context` : null].filter(Boolean).join(" · ")}
            </span>
          </span>
          <svg className="hb-yf4-chev" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open ? (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={label ? `${uid}-label` : undefined}
            aria-label={label ? undefined : "Models"}
            tabIndex={-1}
            className="hb-yf4-pop"
            onMouseDown={(e) => e.preventDefault()}
          >
            {models.map((m, i) => (
              <li
                key={m.id}
                id={optId(i)}
                role="option"
                aria-selected={m.id === selected.id}
                data-active={i === active}
                className="hb-yf4-opt"
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(i)}
              >
                <span className="hb-yf4-orb" style={{ "--hb-yf4-g": gradientFor(m.id), width: 22, height: 22, borderRadius: 7 } as React.CSSProperties} aria-hidden="true" />
                <span className="hb-yf4-info">
                  <span className="hb-yf4-name">{m.name}</span>
                  <span className="hb-yf4-tags">
                    {(m.tags ?? []).map((t) => (
                      <span key={t} className="hb-yf4-tag">{t}</span>
                    ))}
                  </span>
                </span>
                <span className="hb-yf4-meters">
                  <Meter label="Speed" value={m.speed} color={accent} delay={0} />
                  <Meter label="Cost" value={m.cost} color="#f5b544" delay={0} />
                </span>
                {m.id === selected.id ? (
                  <svg className="hb-yf4-check" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.4 6.4l2.4 2.4 4.8-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
