"use client";

import * as React from "react";

export interface InputSearchFilter {
  key: string;
  label: string;
  values: string[];
  color?: string;
}

export interface InputSearchToken {
  key: string;
  value: string;
  negate?: boolean;
}

export interface InputSearchFiltersValue {
  text: string;
  tokens: InputSearchToken[];
}

export interface InputSearchFiltersProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSubmit"> {
  filters?: InputSearchFilter[];
  defaultTokens?: InputSearchToken[];
  defaultText?: string;
  placeholder?: string;
  onChange?: (value: InputSearchFiltersValue) => void;
  onSubmit?: (value: InputSearchFiltersValue) => void;
  resultCount?: number;
  defaultOpen?: boolean;
  embedded?: boolean;
  accent?: string;
}

export const inputSearchDefaultFilters: InputSearchFilter[] = [
  { key: "status", label: "Status", values: ["open", "in-progress", "in-review", "closed"], color: "#3fbf7f" },
  { key: "assignee", label: "Assignee", values: ["maya", "jonas", "priya", "leo", "me"], color: "#7fb3ff" },
  { key: "label", label: "Label", values: ["bug", "design", "billing", "onboarding", "performance"], color: "#f5a524" },
  { key: "priority", label: "Priority", values: ["urgent", "high", "medium", "low"], color: "#ff6b8b" },
  { key: "updated", label: "Updated", values: ["today", "this-week", "this-month"], color: "#b18cff" },
];

const css = `
.hb-xg11 {
  --hb-xg11-c: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-xg11 *, .hb-xg11 *::before, .hb-xg11 *::after { box-sizing: border-box; }
.hb-xg11-field {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 5px 8px 5px 12px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: linear-gradient(180deg, #161616, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 1px 2px rgba(0, 0, 0, 0.5);
  cursor: text;
  transition: border-color 0.2s ease, box-shadow 0.25s ease;
}
.hb-xg11-field:hover { border-color: #333; }
.hb-xg11-field:focus-within {
  border-color: var(--hb-xg11-c);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 0 4px color-mix(in srgb, var(--hb-xg11-c) 16%, transparent);
}
.hb-xg11-lead { width: 15px; height: 15px; flex: none; color: #6f6f6f; }
.hb-xg11-flow { display: flex; flex: 1; flex-wrap: wrap; align-items: center; gap: 5px; min-width: 0; }
.hb-xg11-tok {
  display: inline-flex;
  align-items: center;
  height: 26px;
  max-width: 100%;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  background: #151515;
  font-size: 12px;
  overflow: hidden;
  animation: hb-xg11-tok 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}
.hb-xg11-tok[data-armed="true"] { border-color: #ff6b6b; box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.16); transform: translateY(-1px); }
.hb-xg11-tk {
  height: 100%;
  margin: 0;
  padding: 0 7px 0 8px;
  border: 0;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}
.hb-xg11-tk:focus-visible, .hb-xg11-tx:focus-visible { outline: 2px solid var(--hb-xg11-c); outline-offset: -2px; }
.hb-xg11-tk i { font-style: normal; color: #5a5a5a; }
.hb-xg11-tk b { font-weight: 500; color: var(--hb-xg11-t); }
.hb-xg11-tok[data-neg="true"] .hb-xg11-tk b { text-decoration: line-through; text-decoration-thickness: 1px; }
.hb-xg11-tok[data-neg="true"] .hb-xg11-tk i { color: #ff8a8a; }
.hb-xg11-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-xg11-t); box-shadow: 0 0 6px var(--hb-xg11-t); }
.hb-xg11-tx {
  display: grid;
  place-items: center;
  width: 22px;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-left: 1px solid #242424;
  background: transparent;
  color: #6f6f6f;
  cursor: pointer;
}
.hb-xg11-tx:hover { color: #ededed; background: rgba(255, 255, 255, 0.05); }
.hb-xg11-tx svg { width: 9px; height: 9px; }
.hb-xg11-in {
  flex: 1 0 90px;
  min-width: 90px;
  height: 28px;
  margin: 0;
  padding: 0 2px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 13.5px;
  caret-color: var(--hb-xg11-c);
}
.hb-xg11-in::placeholder { color: #5a5a5a; }
.hb-xg11-in[data-syntax="true"] { font-family: var(--font-mono), ui-monospace, monospace; font-size: 12.5px; color: #cfe0ff; }
.hb-xg11-count { flex: none; padding: 0 4px; font-size: 11.5px; color: #6f6f6f; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-xg11-count b { font-weight: 600; color: #ededed; }
.hb-xg11-kbd {
  display: inline-grid;
  place-items: center;
  height: 20px;
  padding: 0 6px;
  flex: none;
  border: 1px solid #2a2a2a;
  border-bottom-width: 2px;
  border-radius: 5px;
  font-size: 10.5px;
  color: #8f8f8f;
}
.hb-xg11-pop {
  position: absolute;
  z-index: 30;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  padding: 5px;
  border: 1px solid #2a2a2a;
  border-radius: 13px;
  background: rgba(19, 19, 19, 0.97);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 24px 48px -16px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  animation: hb-xg11-in 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xg11[data-embedded="true"] .hb-xg11-pop { position: relative; top: auto; margin-top: 6px; animation: none; }
.hb-xg11-list { margin: 0; padding: 0; list-style: none; max-height: 240px; overflow-y: auto; }
.hb-xg11-hd { display: flex; justify-content: space-between; padding: 5px 8px 4px; font-size: 10.5px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #6f6f6f; }
.hb-xg11-hd span:last-child { font-weight: 500; letter-spacing: 0; text-transform: none; }
.hb-xg11-opt {
  display: flex;
  align-items: center;
  gap: 9px;
  height: 32px;
  padding: 0 8px;
  border-radius: 8px;
  font-size: 12.5px;
  color: #d4d4d4;
  cursor: pointer;
}
.hb-xg11-opt[data-active="true"] { background: rgba(255, 255, 255, 0.06); color: #fff; }
.hb-xg11-opt code { font-family: var(--font-mono), ui-monospace, monospace; font-size: 11.5px; color: var(--hb-xg11-t, #8f8f8f); }
.hb-xg11-opt span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xg11-opt small { font-size: 11px; color: #6f6f6f; }
.hb-xg11-opt mark { background: none; color: #fff; font-weight: 600; }
.hb-xg11-tip { padding: 6px 8px 3px; border-top: 1px solid #1f1f1f; margin-top: 4px; font-size: 11px; color: #6f6f6f; }
.hb-xg11-tip code { font-family: var(--font-mono), ui-monospace, monospace; color: #a1a1a1; }
@keyframes hb-xg11-tok { from { opacity: 0; transform: scale(0.7); } }
@keyframes hb-xg11-in { from { opacity: 0; transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xg11 *, .hb-xg11-pop { transition: none !important; animation: none !important; }
}
`;

type Suggestion =
  | { kind: "key"; filter: InputSearchFilter }
  | { kind: "value"; filter: InputSearchFilter; value: string }
  | { kind: "text"; text: string };

function mark(text: string, q: string) {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function InputSearchFilters({
  filters = inputSearchDefaultFilters,
  defaultTokens = [],
  defaultText = "",
  placeholder = "Search issues or type status:",
  onChange,
  onSubmit,
  resultCount,
  defaultOpen = false,
  embedded = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: InputSearchFiltersProps) {
  const id = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [tokens, setTokens] = React.useState<InputSearchToken[]>(defaultTokens);
  const [text, setText] = React.useState(defaultText);
  const [open, setOpen] = React.useState(defaultOpen);
  const [active, setActive] = React.useState(0);
  const [armed, setArmed] = React.useState(false);

  const neg = text.startsWith("-");
  const body = neg ? text.slice(1) : text;
  const colon = body.indexOf(":");
  const keyPart = colon >= 0 ? body.slice(0, colon).toLowerCase() : "";
  const valPart = colon >= 0 ? body.slice(colon + 1).toLowerCase() : "";
  const keyFilter = colon >= 0 ? filters.find((f) => f.key === keyPart) : undefined;

  let mode: "keys" | "values" = "keys";
  let suggestions: Suggestion[] = [];
  if (keyFilter) {
    mode = "values";
    suggestions = keyFilter.values
      .filter((v) => v.includes(valPart) && !tokens.some((t) => t.key === keyFilter.key && t.value === v))
      .map((v) => ({ kind: "value" as const, filter: keyFilter, value: v }));
  } else {
    const q = body.trim().toLowerCase();
    suggestions = filters
      .filter((f) => !q || f.key.includes(q) || f.label.toLowerCase().includes(q))
      .map((f) => ({ kind: "key" as const, filter: f }));
    if (q && colon < 0) suggestions.push({ kind: "text", text: body.trim() });
  }

  function emit(t: InputSearchToken[], s: string) {
    onChange?.({ text: s.trim(), tokens: t });
  }

  function addToken(tok: InputSearchToken) {
    const next = [...tokens.filter((t) => !(t.key === tok.key && t.value === tok.value)), tok];
    setTokens(next);
    setText("");
    setActive(0);
    emit(next, "");
  }

  function apply(s: Suggestion | undefined) {
    if (!s) return;
    if (s.kind === "key") {
      setText(`${neg ? "-" : ""}${s.filter.key}:`);
      setActive(0);
      inputRef.current?.focus();
    } else if (s.kind === "value") {
      addToken({ key: s.filter.key, value: s.value, negate: neg || undefined });
    } else {
      setOpen(false);
      onSubmit?.({ text: s.text, tokens });
    }
  }

  function removeAt(i: number) {
    const next = tokens.filter((_, k) => k !== i);
    setTokens(next);
    setArmed(false);
    emit(next, text);
    inputRef.current?.focus();
  }

  function edit(i: number) {
    const t = tokens[i];
    const next = tokens.filter((_, k) => k !== i);
    setTokens(next);
    setText(`${t.negate ? "-" : ""}${t.key}:${t.value}`);
    setOpen(true);
    emit(next, "");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  React.useEffect(() => {
    if (!open || embedded) return;
    function down(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", down);
    return () => document.removeEventListener("pointerdown", down);
  }, [open, embedded]);

  React.useEffect(() => {
    function key(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (suggestions.length ? (a + 1) % suggestions.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (suggestions.length ? (a - 1 + suggestions.length) % suggestions.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && suggestions[active] && (text || mode === "values")) apply(suggestions[active]);
      else {
        setOpen(false);
        onSubmit?.({ text: text.trim(), tokens });
      }
    } else if (e.key === "Tab" && open && text && suggestions[active] && suggestions[active].kind !== "text") {
      e.preventDefault();
      apply(suggestions[active]);
    } else if (e.key === "Backspace" && text === "" && tokens.length) {
      e.preventDefault();
      if (armed) removeAt(tokens.length - 1);
      else setArmed(true);
    } else if (e.key === "Escape") {
      if (open) setOpen(false);
      else if (text) setText("");
    } else {
      setArmed(false);
    }
  }

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setArmed(false);
    setOpen(true);
    setActive(0);
    const m = /^(-?)([a-z]+):([\w-]+)\s$/i.exec(v);
    if (m) {
      const f = filters.find((x) => x.key === m[2].toLowerCase());
      const val = f?.values.find((x) => x === m[3].toLowerCase());
      if (f && val) {
        addToken({ key: f.key, value: val, negate: m[1] === "-" || undefined });
        return;
      }
    }
    setText(v);
    emit(tokens, v);
  }

  const colorOf = (key: string) => filters.find((f) => f.key === key)?.color ?? accent;
  const vars = { "--hb-xg11-c": accent, ...style } as React.CSSProperties;
  const listId = `${id}-list`;
  const syntax = colon >= 0 && !!keyFilter;

  return (
    <div ref={rootRef} className={`hb-xg11 ${className}`} style={vars} data-embedded={embedded} {...rest}>
      <style href="hb-input-search-filters" precedence="default">{css}</style>
      <div className="hb-xg11-field" onClick={(e) => e.target === e.currentTarget && inputRef.current?.focus()}>
        <svg className="hb-xg11-lead" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="7" cy="7" r="4.6" />
          <path d="M10.5 10.5L14 14" strokeLinecap="round" />
        </svg>
        <div className="hb-xg11-flow">
          {tokens.map((t, i) => (
            <span
              key={`${t.key}:${t.value}`}
              className="hb-xg11-tok"
              data-armed={armed && i === tokens.length - 1}
              data-neg={!!t.negate}
              style={{ "--hb-xg11-t": colorOf(t.key) } as React.CSSProperties}
            >
              <button type="button" className="hb-xg11-tk" onClick={() => edit(i)} aria-label={`Edit filter ${t.key} ${t.negate ? "is not" : "is"} ${t.value}`}>
                <span className="hb-xg11-dot" aria-hidden="true" />
                {t.key}
                <i>{t.negate ? "≠" : "="}</i>
                <b>{t.value}</b>
              </button>
              <button type="button" className="hb-xg11-tx" aria-label={`Remove filter ${t.key} ${t.value}`} onClick={() => removeAt(i)}>
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" strokeLinecap="round" />
                </svg>
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            className="hb-xg11-in"
            data-syntax={syntax}
            role="combobox"
            aria-label="Search with filters"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={open && suggestions[active] ? `${id}-o-${active}` : undefined}
            autoComplete="off"
            spellCheck={false}
            placeholder={tokens.length ? "Add filter or text" : placeholder}
            value={text}
            onChange={onInput}
            onKeyDown={onKey}
            onFocus={() => setOpen(true)}
            onBlur={() => setArmed(false)}
          />
        </div>
        {resultCount !== undefined && (
          <span className="hb-xg11-count" aria-live="polite">
            <b>{resultCount.toLocaleString("en-US")}</b> results
          </span>
        )}
        <kbd className="hb-xg11-kbd" aria-hidden="true">
          ⌘K
        </kbd>
      </div>
      {open && suggestions.length > 0 && (
        <div className="hb-xg11-pop">
          <div className="hb-xg11-hd">
            <span>{mode === "values" && keyFilter ? keyFilter.label : "Filter by"}</span>
            <span>{mode === "values" ? (neg ? "excluding" : "matching") : "Tab to complete"}</span>
          </div>
          <ul className="hb-xg11-list" role="listbox" id={listId} aria-label="Suggestions">
            {suggestions.map((s, i) => (
              <li
                key={s.kind === "value" ? `v-${s.value}` : s.kind === "key" ? `k-${s.filter.key}` : "t"}
                id={`${id}-o-${i}`}
                role="option"
                aria-selected={i === active}
                data-active={i === active}
                className="hb-xg11-opt"
                style={s.kind !== "text" ? ({ "--hb-xg11-t": s.filter.color ?? accent } as React.CSSProperties) : undefined}
                onPointerEnter={() => setActive(i)}
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => apply(s)}
              >
                {s.kind === "key" && (
                  <>
                    <code>{s.filter.key}:</code>
                    <span>{mark(s.filter.label, body.trim())}</span>
                    <small>{s.filter.values.length} values</small>
                  </>
                )}
                {s.kind === "value" && (
                  <>
                    <span className="hb-xg11-dot" aria-hidden="true" style={{ flex: "none" }} />
                    <span>{mark(s.value, valPart)}</span>
                    <small>{neg ? "is not" : "is"}</small>
                  </>
                )}
                {s.kind === "text" && (
                  <>
                    <code>“”</code>
                    <span>
                      Search for <mark>{s.text}</mark>
                    </span>
                    <small>Enter</small>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="hb-xg11-tip">
            Prefix with <code>-</code> to exclude, like <code>-status:closed</code>
          </div>
        </div>
      )}
    </div>
  );
}
