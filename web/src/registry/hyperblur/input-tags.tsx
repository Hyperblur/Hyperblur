"use client";

import * as React from "react";

export interface InputTagsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  max?: number;
  placeholder?: string;
  validate?: (tag: string) => boolean;
  label?: string;
  name?: string;
  disabled?: boolean;
  accent?: string;
}

const css = `
.hb-qn7 {
  box-sizing: border-box;
  width: 100%;
  font: inherit;
  color: #ededed;
}
.hb-qn7 *, .hb-qn7 *::before, .hb-qn7 *::after { box-sizing: border-box; }
.hb-qn7-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-height: 46px;
  padding: 6px 10px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #111;
  cursor: text;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-qn7-box:hover { border-color: #3a3a3a; }
.hb-qn7-box:focus-within {
  border-color: var(--hb-qn7-a);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qn7-a) 18%, transparent);
}
.hb-qn7[data-disabled="true"] .hb-qn7-box { opacity: 0.5; cursor: not-allowed; }
.hb-qn7-chip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  max-width: 100%;
  height: 28px;
  padding: 0 4px 0 10px;
  border: 1px solid color-mix(in srgb, var(--hb-qn7-a) 38%, #262626);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-qn7-a) 14%, #151515);
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  color: #ededed;
  animation: hb-qn7-in 0.3s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-qn7-chip[data-leaving="true"] { animation: hb-qn7-out 0.18s ease forwards; pointer-events: none; }
.hb-qn7-chip[data-dupe="true"] { animation: hb-qn7-dupe 0.4s ease; border-color: #ff5d6c; }
.hb-qn7-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qn7-x {
  display: grid;
  flex: none;
  place-items: center;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #a1a1a1;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-qn7-x:hover { background: rgba(255, 255, 255, 0.12); color: #fff; }
.hb-qn7-x:focus-visible { outline: 2px solid var(--hb-qn7-a); outline-offset: 0; }
.hb-qn7-x svg { width: 10px; height: 10px; display: block; }
.hb-qn7-x path { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-qn7-in {
  flex: 1;
  min-width: 80px;
  height: 28px;
  margin: 0;
  padding: 0 2px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14px;
}
.hb-qn7-in::placeholder { color: #5f5f5f; }
.hb-qn7-foot { display: flex; justify-content: space-between; gap: 12px; margin: 6px 4px 0; font-size: 12px; color: #6f6f6f; }
.hb-qn7-count { margin-left: auto; font-variant-numeric: tabular-nums; transition: color 0.2s ease; }
.hb-qn7-count[data-full="true"] { color: var(--hb-qn7-a); }
.hb-qn7-sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
@keyframes hb-qn7-in {
  0% { opacity: 0; transform: scale(0.55); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes hb-qn7-out {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.55); }
}
@keyframes hb-qn7-dupe {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qn7-box, .hb-qn7-x, .hb-qn7-count { transition: none; }
  .hb-qn7-chip, .hb-qn7-chip[data-leaving="true"], .hb-qn7-chip[data-dupe="true"] { animation: none; }
}
`;

export function InputTags({
  value,
  defaultValue = [],
  onValueChange,
  max,
  placeholder = "Add a tag",
  validate,
  label = "Tags",
  name,
  disabled = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: InputTagsProps) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<string[]>(defaultValue);
  const tags = controlled ? value : inner;
  const tagsRef = React.useRef(tags);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const timers = React.useRef<number[]>([]);
  const [draft, setDraft] = React.useState("");
  const [leaving, setLeaving] = React.useState<string[]>([]);
  const [dupe, setDupe] = React.useState<string | null>(null);
  const [announce, setAnnounce] = React.useState("");
  const full = max !== undefined && tags.length >= max;

  React.useEffect(() => {
    tagsRef.current = tags;
  });

  React.useEffect(() => {
    const list = timers.current;
    return () => {
      list.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  function commit(next: string[]) {
    tagsRef.current = next;
    if (!controlled) setInner(next);
    onValueChange?.(next);
  }

  function addMany(raw: string[]) {
    const next = [...tagsRef.current];
    let rejected: string | null = null;
    for (const part of raw) {
      const tag = part.trim();
      if (!tag) continue;
      if (next.includes(tag)) {
        rejected = tag;
        continue;
      }
      if (max !== undefined && next.length >= max) break;
      if (validate && !validate(tag)) continue;
      next.push(tag);
    }
    if (next.length !== tagsRef.current.length) {
      const added = next.slice(tagsRef.current.length);
      commit(next);
      setAnnounce(`Added ${added.join(", ")}`);
    }
    if (rejected) {
      setDupe(rejected);
      timers.current.push(window.setTimeout(() => setDupe(null), 450));
    }
  }

  function remove(tag: string) {
    if (leaving.includes(tag)) return;
    setLeaving((list) => [...list, tag]);
    const reduce = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timers.current.push(
      window.setTimeout(
        () => {
          commit(tagsRef.current.filter((t) => t !== tag));
          setLeaving((list) => list.filter((t) => t !== tag));
          setAnnounce(`Removed ${tag}`);
        },
        reduce ? 0 : 180,
      ),
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    if (!/[,\n]/.test(text)) {
      setDraft(text);
      return;
    }
    const parts = text.split(/[,\n]/);
    const rest = parts.pop() ?? "";
    addMany(parts);
    setDraft(rest.trimStart());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (draft.trim()) {
        addMany([draft]);
        setDraft("");
      }
      return;
    }
    if (e.key === "Backspace" && draft === "") {
      const live = tagsRef.current.filter((t) => !leaving.includes(t));
      const last = live[live.length - 1];
      if (last !== undefined) remove(last);
    }
  }

  function handleBlur() {
    if (draft.trim()) {
      addMany([draft]);
      setDraft("");
    }
  }

  const vars = { "--hb-qn7-a": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-input-tags" precedence="default">{css}</style>
      <div className={`hb-qn7 ${className}`} style={vars} data-disabled={disabled} {...rest}>
        <div
          className="hb-qn7-box"
          role="group"
          aria-label={label}
          onClick={(e) => {
            if (e.target === e.currentTarget) inputRef.current?.focus();
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="hb-qn7-chip"
              data-leaving={leaving.includes(tag)}
              data-dupe={dupe === tag}
            >
              <span className="hb-qn7-text">{tag}</span>
              <button
                type="button"
                className="hb-qn7-x"
                aria-label={`Remove ${tag}`}
                disabled={disabled}
                onClick={() => {
                  remove(tag);
                  inputRef.current?.focus();
                }}
              >
                <svg viewBox="0 0 10 10" focusable="false" aria-hidden="true">
                  <path d="M2 2l6 6M8 2L2 8" />
                </svg>
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            className="hb-qn7-in"
            value={draft}
            disabled={disabled}
            readOnly={full}
            placeholder={full ? "Limit reached" : tags.length === 0 ? placeholder : ""}
            aria-label={`${label}: type a tag and press Enter`}
            autoComplete="off"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
        {max !== undefined ? (
          <div className="hb-qn7-foot">
            <span className="hb-qn7-count" data-full={full}>
              {tags.length}/{max}
            </span>
          </div>
        ) : null}
        {name ? <input type="hidden" name={name} value={tags.join(",")} /> : null}
        <span className="hb-qn7-sr" role="status" aria-live="polite">
          {announce}
        </span>
      </div>
    </>
  );
}
