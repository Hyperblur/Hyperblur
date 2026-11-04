"use client";

import * as React from "react";

export interface GlideOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

export interface GlideSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options?: GlideOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: GlideOption) => void;
  placeholder?: string;
  label?: string;
  accent?: string;
  disabled?: boolean;
  defaultOpen?: boolean;
}

const defaultOptions: GlideOption[] = [
  { value: "fra", label: "Frankfurt", hint: "eu-central" },
  { value: "iad", label: "Virginia", hint: "us-east" },
  { value: "sfo", label: "San Francisco", hint: "us-west" },
  { value: "sin", label: "Singapore", hint: "ap-south" },
  { value: "syd", label: "Sydney", hint: "ap-east" },
];

const css = `
.hb-qs3 {
  --hb-qs3-c: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font: inherit;
  font-size: 14px;
  color: #ededed;
}
.hb-qs3 *, .hb-qs3 *::before, .hb-qs3 *::after { box-sizing: border-box; font-family: inherit; }
.hb-qs3-t {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 0 12px;
  font: inherit;
  font-weight: 500;
  text-align: left;
  color: inherit;
  background: #111111;
  border: 1px solid #262626;
  border-radius: 10px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.25s ease;
}
.hb-qs3-t:hover { border-color: #3a3a3a; background: #141414; }
.hb-qs3-t:focus-visible { outline: 2px solid var(--hb-qs3-c); outline-offset: 2px; }
.hb-qs3[data-open="true"] .hb-qs3-t {
  border-color: var(--hb-qs3-c);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qs3-c) 22%, transparent);
}
.hb-qs3[data-disabled="true"] .hb-qs3-t { opacity: 0.45; cursor: not-allowed; }
.hb-qs3-v { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qs3-v[data-empty="true"] { color: #8f8f8f; }
.hb-qs3-a {
  flex: none;
  width: 16px;
  height: 16px;
  color: #8f8f8f;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease;
}
.hb-qs3[data-open="true"] .hb-qs3-a { transform: rotate(180deg); color: var(--hb-qs3-c); }
.hb-qs3-p {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 30;
  margin: 0;
  padding: 4px;
  list-style: none;
  background: #111111;
  border: 1px solid #262626;
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
  visibility: hidden;
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
  transform-origin: top center;
  transition: opacity 0.18s ease, transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0s linear 0.28s;
}
.hb-qs3[data-open="true"] .hb-qs3-p {
  visibility: visible;
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: opacity 0.18s ease, transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0s;
}
.hb-qs3-h {
  position: absolute;
  left: 4px;
  right: 4px;
  top: 0;
  height: var(--hb-qs3-h, 0px);
  border-radius: 8px;
  background: color-mix(in srgb, var(--hb-qs3-c) 20%, #1a1a1a);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-qs3-c) 38%, transparent);
  transform: translateY(var(--hb-qs3-y, 0px));
  pointer-events: none;
}
.hb-qs3-p[data-ready="true"] .hb-qs3-h {
  transition: transform 0.5s cubic-bezier(0.34, 1.5, 0.5, 1), height 0.3s cubic-bezier(0.34, 1.3, 0.5, 1);
}
.hb-qs3-o {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 34px;
  padding: 0 10px;
  border-radius: 8px;
  color: #a1a1a1;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: color 0.2s ease;
}
.hb-qs3-o[data-active="true"] { color: #fff; }
.hb-qs3-o[aria-disabled="true"] { opacity: 0.4; cursor: not-allowed; }
.hb-qs3-l { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; }
.hb-qs3-i { flex: none; font-size: 11px; color: #6f6f6f; letter-spacing: 0.02em; }
.hb-qs3-o[data-active="true"] .hb-qs3-i { color: #a9c8ff; }
.hb-qs3-k {
  flex: none;
  width: 14px;
  height: 14px;
  color: var(--hb-qs3-c);
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-qs3-o[aria-selected="true"] .hb-qs3-k { opacity: 1; transform: scale(1); }
@media (prefers-reduced-motion: reduce) {
  .hb-qs3-t, .hb-qs3-a, .hb-qs3-p, .hb-qs3-h, .hb-qs3-o, .hb-qs3-k { transition: none !important; }
}
`;

export function GlideSelect({
  options = defaultOptions,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  label = "Select",
  accent = "#2f7bff",
  disabled = false,
  defaultOpen = false,
  className = "",
  style,
  ...rest
}: GlideSelectProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const optionRefs = React.useRef<Array<HTMLLIElement | null>>([]);
  const buffer = React.useRef("");
  const bufferTimer = React.useRef(0);
  const baseId = React.useId();
  const [inner, setInner] = React.useState<string | undefined>(defaultValue);
  const [open, setOpen] = React.useState(defaultOpen);
  const [active, setActive] = React.useState(() => {
    if (!defaultOpen) return -1;
    const i = options.findIndex((o) => o.value === defaultValue);
    return i >= 0 ? i : options.findIndex((o) => !o.disabled);
  });
  const [ready, setReady] = React.useState(false);
  const current = value !== undefined ? value : inner;
  const selectedIndex = options.findIndex((o) => o.value === current);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const firstEnabled = React.useCallback(() => options.findIndex((o) => !o.disabled), [options]);

  React.useEffect(() => {
    return () => {
      window.clearTimeout(bufferTimer.current);
    };
  }, []);

  const hide = React.useCallback(() => {
    setOpen(false);
    setReady(false);
    setActive(-1);
  }, []);

  function show() {
    setOpen(true);
    setActive(selectedIndex >= 0 ? selectedIndex : firstEnabled());
  }

  React.useEffect(() => {
    if (!open) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setReady(true));
    });
    function onDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) hide();
    }
    document.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, hide]);

  React.useLayoutEffect(() => {
    const list = listRef.current;
    const el = optionRefs.current[active];
    if (!list || !el || !open) return;
    list.style.setProperty("--hb-qs3-y", `${el.offsetTop.toFixed(1)}px`);
    list.style.setProperty("--hb-qs3-h", `${el.offsetHeight.toFixed(1)}px`);
  }, [active, open]);

  function commit(index: number) {
    const option = options[index];
    if (!option || option.disabled) return;
    if (value === undefined) setInner(option.value);
    onChange?.(option.value, option);
    hide();
  }

  function step(from: number, dir: 1 | -1) {
    let i = from;
    for (let n = 0; n < options.length; n++) {
      i += dir;
      if (i < 0 || i >= options.length) return from;
      if (!options[i].disabled) return i;
    }
    return from;
  }

  function typeAhead(key: string) {
    window.clearTimeout(bufferTimer.current);
    buffer.current += key.toLowerCase();
    bufferTimer.current = window.setTimeout(() => {
      buffer.current = "";
    }, 650);
    const text = buffer.current;
    const from = open ? active : selectedIndex;
    const repeat = text.length > 1 && text.split("").every((c) => c === text[0]);
    const needle = repeat ? text[0] : text;
    const begin = repeat || text.length === 1 ? from + 1 : from;
    for (let n = 0; n < options.length; n++) {
      const i = (((begin + n) % options.length) + options.length) % options.length;
      const o = options[i];
      if (!o.disabled && o.label.toLowerCase().startsWith(needle)) {
        if (open) setActive(i);
        else if (value === undefined) setInner(o.value);
        if (!open) onChange?.(o.value, o);
        return;
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    const k = e.key;
    if (k === "ArrowDown" || k === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        show();
        return;
      }
      const base = active < 0 ? (k === "ArrowDown" ? -1 : options.length) : active;
      setActive(step(base, k === "ArrowDown" ? 1 : -1));
    } else if (k === "Home" || k === "End") {
      if (!open) return;
      e.preventDefault();
      if (k === "Home") setActive(firstEnabled());
      else {
        let i = options.length - 1;
        while (i > 0 && options[i].disabled) i--;
        setActive(i);
      }
    } else if (k === "Enter" || k === " ") {
      e.preventDefault();
      if (!open) show();
      else if (k === " " && buffer.current) typeAhead(" ");
      else commit(active);
    } else if (k === "Escape") {
      if (open) {
        e.preventDefault();
        hide();
      }
    } else if (k === "Tab") {
      hide();
    } else if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typeAhead(k);
    }
  }

  const vars = { "--hb-qs3-c": accent, ...style } as React.CSSProperties;
  const listId = `${baseId}-list`;

  return (
    <>
      <style href="hb-select-glide" precedence="default">{css}</style>
      <div
        ref={rootRef}
        className={`hb-qs3 ${className}`}
        style={vars}
        data-open={open}
        data-disabled={disabled}
        {...rest}
      >
        <button
          type="button"
          role="combobox"
          aria-label={label}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && active >= 0 ? `${baseId}-o${active}` : undefined}
          disabled={disabled}
          className="hb-qs3-t"
          onClick={() => (open ? hide() : show())}
          onKeyDown={onKeyDown}
        >
          <span className="hb-qs3-v" data-empty={!selected}>
            {selected ? selected.label : placeholder}
          </span>
          <svg className="hb-qs3-a" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3.5 6 8 10.5 12.5 6" />
          </svg>
        </button>
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          className="hb-qs3-p"
          data-ready={ready}
          onPointerLeave={() => setActive(selectedIndex >= 0 ? selectedIndex : active)}
        >
          <li className="hb-qs3-h" role="presentation" aria-hidden="true" />
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${baseId}-o${i}`}
              ref={(el) => {
                optionRefs.current[i] = el;
              }}
              role="option"
              aria-selected={i === selectedIndex}
              aria-disabled={o.disabled || undefined}
              data-active={i === active}
              className="hb-qs3-o"
              onPointerMove={() => {
                if (!o.disabled && active !== i) setActive(i);
              }}
              onClick={() => commit(i)}
            >
              <span className="hb-qs3-l">{o.label}</span>
              {o.hint ? <span className="hb-qs3-i">{o.hint}</span> : null}
              <svg className="hb-qs3-k" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
