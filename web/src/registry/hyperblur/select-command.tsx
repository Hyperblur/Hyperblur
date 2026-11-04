"use client";

import * as React from "react";

export interface SelectCommandOption {
  value: string;
  label: string;
  group?: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectCommandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  options: SelectCommandOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  maxHeight?: number;
  placement?: "bottom" | "top";
  defaultOpen?: boolean;
  label?: string;
  name?: string;
  disabled?: boolean;
  accent?: string;
}

const css = `
.hb-qna {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font: inherit;
  color: #ededed;
}
.hb-qna *, .hb-qna *::before, .hb-qna *::after { box-sizing: border-box; }
.hb-qna-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 0 12px 0 14px;
  border: 1px solid #262626;
  border-radius: 11px;
  background: #111;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-qna-trigger:hover { border-color: #3a3a3a; }
.hb-qna-trigger:focus-visible,
.hb-qna[data-open="true"] .hb-qna-trigger {
  outline: 0;
  border-color: var(--hb-qna-a);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qna-a) 18%, transparent);
}
.hb-qna-trigger:disabled { opacity: 0.5; cursor: not-allowed; }
.hb-qna-value { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qna-value[data-empty="true"] { color: #6f6f6f; }
.hb-qna-chev { flex: none; width: 16px; height: 16px; color: #8f8f8f; transition: transform 0.25s cubic-bezier(0.3, 1.2, 0.5, 1); }
.hb-qna[data-open="true"] .hb-qna-chev { transform: rotate(180deg); }
.hb-qna-chev path, .hb-qna-search svg path, .hb-qna-search svg circle { fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-qna-panel {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 30;
  overflow: hidden;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  background: #121212;
  box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.02);
}
.hb-qna[data-placement="bottom"] .hb-qna-panel { top: calc(100% + 6px); transform-origin: top center; animation: hb-qna-in 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.1); }
.hb-qna[data-placement="top"] .hb-qna-panel { bottom: calc(100% + 6px); transform-origin: bottom center; animation: hb-qna-in 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.1); }
.hb-qna-search { display: flex; align-items: center; gap: 8px; height: 38px; padding: 0 12px; border-bottom: 1px solid #222; color: #6f6f6f; }
.hb-qna-search svg { flex: none; width: 15px; height: 15px; }
.hb-qna-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14px;
}
.hb-qna-input::placeholder { color: #5f5f5f; }
.hb-qna-list { margin: 0; padding: 4px; overflow-y: auto; list-style: none; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: #2a2a2a transparent; }
.hb-qna-group { padding: 8px 10px 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #6f6f6f; }
.hb-qna-opt {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 14px;
  color: #d4d4d4;
  cursor: pointer;
}
.hb-qna-opt[data-active="true"] { background: color-mix(in srgb, var(--hb-qna-a) 18%, #1a1a1a); color: #fff; }
.hb-qna-opt[aria-disabled="true"] { opacity: 0.4; cursor: not-allowed; }
.hb-qna-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qna-desc { flex: none; margin-left: auto; font-size: 12px; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-qna-opt[data-active="true"] .hb-qna-desc { color: #a1a1a1; }
.hb-qna-mark { border-radius: 3px; background: color-mix(in srgb, var(--hb-qna-a) 38%, transparent); color: #fff; }
.hb-qna-check { flex: none; width: 14px; height: 14px; margin-left: auto; color: var(--hb-qna-a); }
.hb-qna-check path { fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-qna-desc + .hb-qna-check { margin-left: 4px; }
.hb-qna-empty { padding: 14px 10px; font-size: 13px; text-align: center; color: #6f6f6f; }
.hb-qna-sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
@keyframes hb-qna-in {
  0% { opacity: 0; transform: scale(0.97) translateY(-4px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qna-trigger, .hb-qna-chev { transition: none; }
  .hb-qna[data-placement] .hb-qna-panel { animation: none; }
}
`;

type Row =
  | { type: "group"; name: string }
  | { type: "option"; option: SelectCommandOption; index: number };

function arrange(options: SelectCommandOption[], query: string) {
  const q = query.trim().toLowerCase();
  const matched = options.filter((o) => !q || o.label.toLowerCase().includes(q));
  const buckets = new Map<string, SelectCommandOption[]>();
  for (const option of matched) {
    const key = option.group ?? "";
    const list = buckets.get(key);
    if (list) list.push(option);
    else buckets.set(key, [option]);
  }
  const flat: SelectCommandOption[] = [];
  const rows: Row[] = [];
  buckets.forEach((list, group) => {
    if (group) rows.push({ type: "group", name: group });
    for (const option of list) {
      rows.push({ type: "option", option, index: flat.length });
      flat.push(option);
    }
  });
  return { flat, rows };
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  const at = q ? text.toLowerCase().indexOf(q) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <mark className="hb-qna-mark">{text.slice(at, at + q.length)}</mark>
      {text.slice(at + q.length)}
    </>
  );
}

export function SelectCommand({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyText = "No results found",
  maxHeight = 240,
  placement = "bottom",
  defaultOpen = false,
  label = "Select",
  name,
  disabled = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: SelectCommandProps) {
  const baseId = React.useId();
  const listId = `${baseId}-list`;
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<string | undefined>(defaultValue);
  const current = controlled ? value : inner;
  const [open, setOpen] = React.useState(defaultOpen);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(() => {
    const first = arrange(options, "").flat.findIndex((o) => !o.disabled);
    const picked = arrange(options, "").flat.findIndex((o) => o.value === (value ?? defaultValue));
    return picked >= 0 ? picked : Math.max(0, first);
  });
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const focusInput = React.useRef(false);

  const { flat, rows } = arrange(options, query);
  const selected = options.find((o) => o.value === current);
  const activeOption = flat[active];

  React.useEffect(() => {
    if (!open || !focusInput.current) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.setSelectionRange(el.value.length, el.value.length);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    function onDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ block: "nearest" });
  }, [open, active, query]);

  function openPanel(initial = "") {
    if (disabled) return;
    const next = arrange(options, initial).flat;
    const picked = initial ? -1 : next.findIndex((o) => o.value === current);
    const first = next.findIndex((o) => !o.disabled);
    focusInput.current = true;
    setQuery(initial);
    setActive(picked >= 0 ? picked : Math.max(0, first));
    setOpen(true);
  }

  function closePanel(returnFocus: boolean) {
    setOpen(false);
    setQuery("");
    if (returnFocus) triggerRef.current?.focus();
  }

  function choose(option: SelectCommandOption | undefined) {
    if (!option || option.disabled) return;
    if (!controlled) setInner(option.value);
    onValueChange?.(option.value);
    closePanel(true);
  }

  function move(delta: number) {
    if (flat.length === 0) return;
    let i = active;
    for (let n = 0; n < flat.length; n += 1) {
      i = (i + delta + flat.length) % flat.length;
      if (!flat[i].disabled) {
        setActive(i);
        return;
      }
    }
  }

  function onTriggerKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openPanel();
    } else if (e.key.length === 1 && e.key !== " " && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      openPanel(e.key);
    }
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      const i = flat.findIndex((o) => !o.disabled);
      if (i >= 0) setActive(i);
    } else if (e.key === "End") {
      e.preventDefault();
      for (let i = flat.length - 1; i >= 0; i -= 1) {
        if (!flat[i].disabled) {
          setActive(i);
          break;
        }
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(activeOption);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      closePanel(true);
    } else if (e.key === "Tab") {
      closePanel(true);
    }
  }

  const vars = { "--hb-qna-a": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-select-command" precedence="default">{css}</style>
      <div
        ref={rootRef}
        className={`hb-qna ${className}`}
        style={vars}
        data-open={open}
        data-placement={placement}
        {...rest}
      >
        <button
          ref={triggerRef}
          type="button"
          className="hb-qna-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-label={selected ? `${label}: ${selected.label}` : label}
          disabled={disabled}
          onClick={() => (open ? closePanel(false) : openPanel())}
          onKeyDown={onTriggerKey}
        >
          <span className="hb-qna-value" data-empty={!selected}>
            {selected ? selected.label : placeholder}
          </span>
          <svg className="hb-qna-chev" viewBox="0 0 16 16" focusable="false" aria-hidden="true">
            <path d="M4 6.2l4 4 4-4" />
          </svg>
        </button>
        {open ? (
          <div className="hb-qna-panel">
            <div className="hb-qna-search">
              <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
                <circle cx="7" cy="7" r="4.6" />
                <path d="M10.5 10.5L14 14" />
              </svg>
              <input
                ref={inputRef}
                className="hb-qna-input"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={activeOption ? `${baseId}-o${active}` : undefined}
                aria-label={`Search ${label.toLowerCase()}`}
                placeholder={searchPlaceholder}
                value={query}
                autoComplete="off"
                spellCheck={false}
                onChange={(e) => {
                  const next = e.target.value;
                  setQuery(next);
                  const first = arrange(options, next).flat.findIndex((o) => !o.disabled);
                  setActive(Math.max(0, first));
                }}
                onKeyDown={onInputKey}
              />
            </div>
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label={label}
              className="hb-qna-list"
              style={{ maxHeight }}
            >
              {rows.map((row) => {
                if (row.type === "group") {
                  return (
                    <li key={`g-${row.name}`} role="presentation" className="hb-qna-group" aria-hidden="true">
                      {row.name}
                    </li>
                  );
                }
                const { option, index } = row;
                const isSelected = option.value === current;
                return (
                  <li
                    key={option.value}
                    id={`${baseId}-o${index}`}
                    role="option"
                    className="hb-qna-opt"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    data-active={index === active}
                    onPointerDown={(e) => e.preventDefault()}
                    onPointerMove={() => {
                      if (!option.disabled && index !== active) setActive(index);
                    }}
                    onClick={() => choose(option)}
                  >
                    <span className="hb-qna-label">
                      <Highlight text={option.label} query={query} />
                    </span>
                    {option.description ? <span className="hb-qna-desc">{option.description}</span> : null}
                    {isSelected ? (
                      <svg className="hb-qna-check" viewBox="0 0 16 16" focusable="false" aria-hidden="true">
                        <path d="M3.5 8.4l3 3 6-6.6" />
                      </svg>
                    ) : null}
                  </li>
                );
              })}
              {flat.length === 0 ? <li className="hb-qna-empty" role="presentation">{emptyText}</li> : null}
            </ul>
          </div>
        ) : null}
        {name ? <input type="hidden" name={name} value={current ?? ""} /> : null}
        <span className="hb-qna-sr" role="status" aria-live="polite">
          {open ? `${flat.length} ${flat.length === 1 ? "option" : "options"} available` : ""}
        </span>
      </div>
    </>
  );
}
