"use client";

import * as React from "react";

export interface SelectComboboxAsyncOption {
  id: string;
  label: string;
  description?: string;
  badge?: string;
  meta?: string;
}

export interface SelectComboboxAsyncProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  label?: string;
  placeholder?: string;
  options?: SelectComboboxAsyncOption[];
  loadOptions?: (query: string, signal: AbortSignal) => Promise<SelectComboboxAsyncOption[]>;
  latency?: number;
  debounce?: number;
  maxResults?: number;
  recent?: SelectComboboxAsyncOption[];
  value?: SelectComboboxAsyncOption | null;
  defaultValue?: SelectComboboxAsyncOption | null;
  onChange?: (option: SelectComboboxAsyncOption | null) => void;
  defaultQuery?: string;
  defaultOpen?: boolean;
  embedded?: boolean;
  accent?: string;
}

export const selectComboboxAirports: SelectComboboxAsyncOption[] = [
  { id: "sfo", badge: "SFO", label: "San Francisco International", description: "San Francisco, United States", meta: "2h 10m" },
  { id: "jfk", badge: "JFK", label: "John F. Kennedy International", description: "New York, United States", meta: "5h 35m" },
  { id: "lhr", badge: "LHR", label: "Heathrow", description: "London, United Kingdom", meta: "10h 20m" },
  { id: "lgw", badge: "LGW", label: "Gatwick", description: "London, United Kingdom", meta: "10h 45m" },
  { id: "lis", badge: "LIS", label: "Humberto Delgado", description: "Lisbon, Portugal", meta: "11h 05m" },
  { id: "cdg", badge: "CDG", label: "Charles de Gaulle", description: "Paris, France", meta: "10h 55m" },
  { id: "ams", badge: "AMS", label: "Schiphol", description: "Amsterdam, Netherlands", meta: "10h 30m" },
  { id: "ber", badge: "BER", label: "Brandenburg", description: "Berlin, Germany", meta: "11h 15m" },
  { id: "bcn", badge: "BCN", label: "El Prat", description: "Barcelona, Spain", meta: "11h 40m" },
  { id: "gru", badge: "GRU", label: "Guarulhos International", description: "São Paulo, Brazil", meta: "12h 50m" },
  { id: "hnd", badge: "HND", label: "Haneda", description: "Tokyo, Japan", meta: "11h 25m" },
  { id: "sin", badge: "SIN", label: "Changi", description: "Singapore", meta: "17h 10m" },
  { id: "syd", badge: "SYD", label: "Kingsford Smith", description: "Sydney, Australia", meta: "15h 30m" },
  { id: "dxb", badge: "DXB", label: "Dubai International", description: "Dubai, United Arab Emirates", meta: "15h 40m" },
  { id: "yyz", badge: "YYZ", label: "Pearson International", description: "Toronto, Canada", meta: "4h 50m" },
  { id: "mex", badge: "MEX", label: "Benito Juárez International", description: "Mexico City, Mexico", meta: "4h 15m" },
  { id: "sea", badge: "SEA", label: "Seattle–Tacoma International", description: "Seattle, United States", meta: "2h 55m" },
  { id: "lax", badge: "LAX", label: "Los Angeles International", description: "Los Angeles, United States", meta: "1h 25m" },
];

const css = `
.hb-xg5 {
  --hb-xg5-c: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-xg5 *, .hb-xg5 *::before, .hb-xg5 *::after { box-sizing: border-box; }
.hb-xg5-label { display: block; margin: 0 0 7px; font-size: 12.5px; font-weight: 500; color: #a1a1a1; }
.hb-xg5-field {
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 6px 0 12px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: linear-gradient(180deg, #161616, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 1px 2px rgba(0, 0, 0, 0.5);
  transition: border-color 0.2s ease, box-shadow 0.25s ease;
}
.hb-xg5-field:hover { border-color: #333; }
.hb-xg5-field:focus-within {
  border-color: var(--hb-xg5-c);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 0 4px color-mix(in srgb, var(--hb-xg5-c) 16%, transparent);
}
.hb-xg5-lead { width: 16px; height: 16px; flex: none; color: #6f6f6f; transition: color 0.2s ease; }
.hb-xg5-field:focus-within .hb-xg5-lead { color: var(--hb-xg5-c); }
.hb-xg5-in {
  flex: 1;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0 8px 0 10px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  caret-color: var(--hb-xg5-c);
}
.hb-xg5-in::placeholder { color: #5a5a5a; }
.hb-xg5-spin {
  width: 16px;
  height: 16px;
  flex: none;
  margin-right: 6px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0 25%, var(--hb-xg5-c));
  -webkit-mask: radial-gradient(circle, transparent 5.5px, #000 6px);
  mask: radial-gradient(circle, transparent 5.5px, #000 6px);
  animation: hb-xg5-spin 0.7s linear infinite;
}
.hb-xg5-clear {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: none;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #6f6f6f;
  cursor: pointer;
}
.hb-xg5-clear:hover { color: #ededed; background: rgba(255, 255, 255, 0.05); }
.hb-xg5-clear:focus-visible { outline: 2px solid var(--hb-xg5-c); outline-offset: -2px; }
.hb-xg5-clear svg { width: 12px; height: 12px; }
.hb-xg5-pop {
  position: absolute;
  z-index: 30;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  background: rgba(19, 19, 19, 0.97);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 24px 48px -16px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transform-origin: top center;
  animation: hb-xg5-in 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xg5[data-embedded="true"] .hb-xg5-pop { position: relative; top: auto; margin-top: 6px; animation: none; }
.hb-xg5-list { margin: 0; padding: 5px; list-style: none; max-height: 260px; overflow-y: auto; scrollbar-width: thin; }
.hb-xg5-head { padding: 6px 8px 4px; font-size: 10.5px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #6f6f6f; }
.hb-xg5-opt {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  padding: 0 8px;
  border-radius: 9px;
  cursor: pointer;
  animation: hb-xg5-row 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--hb-xg5-i) * 35ms);
}
.hb-xg5-opt[data-active="true"] { background: rgba(255, 255, 255, 0.06); }
.hb-xg5-opt[data-active="true"]::before { content: ""; position: absolute; left: 0; top: 10px; bottom: 10px; width: 2px; border-radius: 2px; background: var(--hb-xg5-c); }
.hb-xg5-badge {
  display: grid;
  place-items: center;
  min-width: 38px;
  height: 24px;
  padding: 0 5px;
  border: 1px solid #2c2c2c;
  border-radius: 6px;
  background: linear-gradient(180deg, #1c1c1c, #141414);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #d4d4d4;
}
.hb-xg5-opt[data-active="true"] .hb-xg5-badge { border-color: color-mix(in srgb, var(--hb-xg5-c) 50%, #2c2c2c); color: #fff; }
.hb-xg5-text { flex: 1; min-width: 0; line-height: 1.2; }
.hb-xg5-text span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
.hb-xg5-text small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11.5px; color: #7a7a7a; }
.hb-xg5-text mark { background: none; color: #fff; font-weight: 600; box-shadow: inset 0 -2px 0 color-mix(in srgb, var(--hb-xg5-c) 70%, transparent); }
.hb-xg5-meta { flex: none; font-size: 11.5px; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-xg5-check { width: 14px; height: 14px; color: var(--hb-xg5-c); flex: none; }
.hb-xg5-sk { display: flex; align-items: center; gap: 10px; height: 40px; padding: 0 8px; }
.hb-xg5-sk i {
  display: block;
  height: 10px;
  border-radius: 5px;
  background: linear-gradient(90deg, #1a1a1a 0%, #262626 40%, #1a1a1a 80%);
  background-size: 220% 100%;
  animation: hb-xg5-shim 1.1s ease-in-out infinite;
}
.hb-xg5-sk i:first-child { width: 38px; height: 24px; border-radius: 6px; flex: none; }
.hb-xg5-sk div { display: flex; flex: 1; flex-direction: column; gap: 6px; }
.hb-xg5-empty { padding: 14px 10px; font-size: 12.5px; color: #8f8f8f; text-align: center; }
.hb-xg5-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 30px;
  padding: 0 11px;
  border-top: 1px solid #1f1f1f;
  font-size: 11px;
  color: #6f6f6f;
  font-variant-numeric: tabular-nums;
}
.hb-xg5-keys { display: flex; align-items: center; gap: 4px; }
.hb-xg5-keys kbd {
  display: inline-grid;
  place-items: center;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border: 1px solid #2a2a2a;
  border-bottom-width: 2px;
  border-radius: 4px;
  font-family: inherit;
  font-size: 10px;
  color: #a1a1a1;
}
.hb-xg5-dot { display: inline-block; width: 6px; height: 6px; margin-right: 6px; border-radius: 50%; background: #3fbf7f; box-shadow: 0 0 0 3px rgba(63, 191, 127, 0.15); vertical-align: 1px; }
.hb-xg5[data-loading="true"] .hb-xg5-dot { background: #e5a93b; box-shadow: 0 0 0 3px rgba(229, 169, 59, 0.15); }
@keyframes hb-xg5-spin { to { transform: rotate(360deg); } }
@keyframes hb-xg5-shim { 0% { background-position: 120% 0; } 100% { background-position: -120% 0; } }
@keyframes hb-xg5-in { from { opacity: 0; transform: translateY(-4px) scale(0.985); } }
@keyframes hb-xg5-row { from { opacity: 0; transform: translateY(4px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xg5 *, .hb-xg5-pop { animation: none !important; transition: none !important; }
}
`;

function highlight(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function SelectComboboxAsync({
  label = "Flying to",
  placeholder = "City, airport or code",
  options = selectComboboxAirports,
  loadOptions,
  latency = 420,
  debounce = 160,
  maxResults = 6,
  recent,
  value,
  defaultValue = null,
  onChange,
  defaultQuery = "",
  defaultOpen = false,
  embedded = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: SelectComboboxAsyncProps) {
  const id = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<SelectComboboxAsyncOption | null>(defaultValue);
  const selected = controlled ? value : inner;
  const [query, setQuery] = React.useState(defaultQuery || selected?.label || "");
  const [open, setOpen] = React.useState(defaultOpen);
  const [results, setResults] = React.useState<SelectComboboxAsyncOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [took, setTook] = React.useState<number | null>(null);
  const [active, setActive] = React.useState(0);
  const [searched, setSearched] = React.useState("");
  const recentList = recent ?? options.slice(0, 3);
  const q = query.trim();
  const showRecent = q === "" || (selected !== null && q === selected.label);

  React.useEffect(() => {
    if (!open || showRecent) return;
    const ctrl = new AbortController();
    const t0 = performance.now();
    const startT = window.setTimeout(() => setLoading(true), 0);
    const timer = window.setTimeout(() => {
      const run =
        loadOptions ??
        ((text: string, signal: AbortSignal) =>
          new Promise<SelectComboboxAsyncOption[]>((resolve, reject) => {
            const lower = text.toLowerCase();
            const hits = options.filter((o) =>
              [o.label, o.description ?? "", o.badge ?? ""].some((f) => f.toLowerCase().includes(lower)),
            );
            const wait = window.setTimeout(() => resolve(hits), Math.max(0, latency - 60 + (hits.length % 4) * 40));
            signal.addEventListener("abort", () => {
              window.clearTimeout(wait);
              reject(new DOMException("Aborted", "AbortError"));
            });
          }));
      run(q, ctrl.signal)
        .then((r) => {
          if (ctrl.signal.aborted) return;
          setResults(r.slice(0, maxResults));
          setSearched(q);
          setTook(Math.round(performance.now() - t0));
          setActive(0);
          setLoading(false);
        })
        .catch(() => {
          if (!ctrl.signal.aborted) setLoading(false);
        });
    }, debounce);
    return () => {
      ctrl.abort();
      window.clearTimeout(timer);
      window.clearTimeout(startT);
    };
  }, [q, open, showRecent, loadOptions, options, latency, debounce, maxResults]);

  React.useEffect(() => {
    if (!open || embedded) return;
    function down(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", down);
    return () => document.removeEventListener("pointerdown", down);
  }, [open, embedded]);

  const items = showRecent ? recentList : results;

  function choose(o: SelectComboboxAsyncOption | null) {
    if (!controlled) setInner(o);
    onChange?.(o);
    setQuery(o?.label ?? "");
    setOpen(false);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((a) => (items.length ? (a + 1) % items.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (items.length ? (a - 1 + items.length) % items.length : 0));
    } else if (e.key === "Home" && open) {
      setActive(0);
    } else if (e.key === "End" && open) {
      setActive(Math.max(0, items.length - 1));
    } else if (e.key === "Enter") {
      if (open && items[active]) {
        e.preventDefault();
        choose(items[active]);
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
      } else if (query) {
        setQuery("");
      }
    }
  }

  const stale = !showRecent && searched !== q;
  const showSkeleton = !showRecent && (loading || stale) && results.length === 0;
  const listId = `${id}-list`;
  const vars = { "--hb-xg5-c": accent, ...style } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`hb-xg5 ${className}`}
      style={vars}
      data-loading={loading}
      data-embedded={embedded}
      {...rest}
    >
      <style href="hb-select-combobox-async" precedence="default">{css}</style>
      {label && (
        <label className="hb-xg5-label" htmlFor={`${id}-in`}>
          {label}
        </label>
      )}
      <div className="hb-xg5-field">
        <svg className="hb-xg5-lead" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M14 9.6l-5.2-2.3V3.2a1.3 1.3 0 0 0-2.6 0v4.1L1 9.6v1.6l5.2-1.2v2.8l-1.6 1.1v1.1L8 14.2l2.4.8v-1.1l-1.6-1.1V10l5.2 1.2z" strokeLinejoin="round" />
        </svg>
        <input
          ref={inputRef}
          id={`${id}-in`}
          className="hb-xg5-in"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && items[active] ? `${id}-o-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onKeyDown={onKey}
        />
        {loading && <span className="hb-xg5-spin" aria-hidden="true" />}
        {query && (
          <button
            type="button"
            className="hb-xg5-clear"
            aria-label="Clear"
            onClick={() => {
              choose(null);
              setOpen(true);
              inputRef.current?.focus();
            }}
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      {open && (
        <div className="hb-xg5-pop">
          <ul className="hb-xg5-list" id={listId} role="listbox" aria-label={showRecent ? "Recent" : "Suggestions"} aria-busy={loading}>
            {showRecent && recentList.length > 0 && (
              <li className="hb-xg5-head" role="presentation">
                Recent
              </li>
            )}
            {showSkeleton
              ? [0, 1, 2].map((i) => (
                  <li key={`sk${i}`} className="hb-xg5-sk" role="presentation" aria-hidden="true">
                    <i />
                    <div>
                      <i style={{ width: `${70 - i * 12}%` }} />
                      <i style={{ width: `${45 + i * 8}%`, height: 8 }} />
                    </div>
                  </li>
                ))
              : items.map((o, i) => (
                  <li
                    key={`${searched}-${o.id}`}
                    id={`${id}-o-${i}`}
                    role="option"
                    aria-selected={selected?.id === o.id}
                    data-active={i === active}
                    className="hb-xg5-opt"
                    style={{ "--hb-xg5-i": i } as React.CSSProperties}
                    onPointerEnter={() => setActive(i)}
                    onPointerDown={(e) => e.preventDefault()}
                    onClick={() => choose(o)}
                  >
                    {o.badge && <span className="hb-xg5-badge">{o.badge}</span>}
                    <span className="hb-xg5-text">
                      <span>{highlight(o.label, showRecent ? "" : searched)}</span>
                      {o.description && <small>{highlight(o.description, showRecent ? "" : searched)}</small>}
                    </span>
                    {selected?.id === o.id ? (
                      <svg className="hb-xg5-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M3 7.4l2.6 2.6L11 4.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      o.meta && <span className="hb-xg5-meta">{o.meta}</span>
                    )}
                  </li>
                ))}
            {!showRecent && !showSkeleton && !loading && !stale && results.length === 0 && (
              <li className="hb-xg5-empty" role="presentation">
                Nothing matches “{q}”. Try a city or a three-letter code.
              </li>
            )}
          </ul>
          <div className="hb-xg5-foot" aria-live="polite">
            <span>
              <span className="hb-xg5-dot" aria-hidden="true" />
              {showRecent
                ? `${recentList.length} recent`
                : loading || stale
                  ? "Searching…"
                  : `${results.length} result${results.length === 1 ? "" : "s"}${took !== null ? ` · ${took} ms` : ""}`}
            </span>
            <span className="hb-xg5-keys" aria-hidden="true">
              <kbd>↑</kbd>
              <kbd>↓</kbd>
              <kbd>↵</kbd>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
