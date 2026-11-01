"use client";

import * as React from "react";

export interface PromptBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onSubmit"> {
  models?: string[];
  defaultModel?: string;
  maxRows?: number;
  placeholder?: string;
  disabled?: boolean;
  color?: string;
  attachIcon?: React.ReactNode;
  micIcon?: React.ReactNode;
  onAttach?: () => void;
  onMic?: () => void;
  onSend?: (text: string, model: string) => void;
}

const css = `
.hb-pb {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 10px 8px 14px;
  border: 1px solid #262626;
  border-radius: 16px;
  color: #ededed;
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  background: #141414;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.hb-pb:focus-within {
  border-color: color-mix(in srgb, var(--hb-pb-color, #2f7bff) 70%, #262626);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-pb-color, #2f7bff) 16%, transparent);
}
.hb-pb[data-disabled="true"] { opacity: .55; }
.hb-pb-input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  resize: none;
  overflow-y: auto;
  color: #ededed;
  font: inherit;
  line-height: 20px;
  background: transparent;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
}
.hb-pb-input::placeholder { color: #6f6f6f; }
.hb-pb-bar { display: flex; align-items: center; gap: 4px; margin-top: 8px; }
.hb-pb-spacer { flex: 1 1 auto; }
.hb-pb-icon {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  color: #8f8f8f;
  cursor: pointer;
  background: transparent;
  transition: color .15s ease, background .15s ease;
}
.hb-pb-icon:hover:not(:disabled) { color: #ededed; background: #1f1f1f; }
.hb-pb-icon:disabled { cursor: not-allowed; }
.hb-pb-icon:focus-visible, .hb-pb-chip:focus-visible, .hb-pb-send:focus-visible {
  outline: 2px solid var(--hb-pb-color, #2f7bff);
  outline-offset: 1px;
}
.hb-pb-icon svg { width: 16px; height: 16px; }
.hb-pb-model { position: relative; }
.hb-pb-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  margin: 0;
  padding: 0 8px 0 10px;
  border: 1px solid #262626;
  border-radius: 999px;
  color: #c4c4c4;
  font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  cursor: pointer;
  background: #171717;
  transition: border-color .15s ease, color .15s ease;
}
.hb-pb-chip:hover:not(:disabled) { color: #ededed; border-color: #333333; }
.hb-pb-chip:disabled { cursor: not-allowed; }
.hb-pb-chip svg { width: 10px; height: 10px; transition: transform .2s ease; }
.hb-pb-chip[aria-expanded="true"] svg { transform: rotate(180deg); }
.hb-pb-menu {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 0;
  z-index: 5;
  min-width: 150px;
  margin: 0;
  padding: 4px;
  list-style: none;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #171717;
  box-shadow: 0 12px 32px rgba(0,0,0,.5);
  animation: hb-pb-pop .15s ease both;
}
@keyframes hb-pb-pop {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
}
.hb-pb-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 8px;
  border-radius: 8px;
  color: #c4c4c4;
  font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  cursor: pointer;
  outline: 0;
}
.hb-pb-option:hover, .hb-pb-option:focus-visible { color: #ededed; background: #232323; }
.hb-pb-option[aria-selected="true"] { color: #ededed; }
.hb-pb-option svg { width: 11px; height: 11px; color: var(--hb-pb-color, #2f7bff); }
.hb-pb-send {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: 0 0 0 2px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: #8f8f8f;
  cursor: not-allowed;
  background: #1f1f1f;
  transition: background .2s ease, color .2s ease, transform .15s ease;
}
.hb-pb-send:not(:disabled) { color: #ffffff; cursor: pointer; background: var(--hb-pb-color, #2f7bff); }
.hb-pb-send:not(:disabled):active { transform: scale(.92); }
.hb-pb-send svg { width: 14px; height: 14px; }
@media (prefers-reduced-motion: reduce) {
  .hb-pb, .hb-pb-icon, .hb-pb-chip, .hb-pb-chip svg, .hb-pb-send { transition: none; }
  .hb-pb-menu { animation: none; }
}
`;

const LINE = 20;

export function PromptBar({
  models = ["default"],
  defaultModel,
  maxRows = 6,
  placeholder = "Send a message",
  disabled = false,
  color = "#2f7bff",
  attachIcon,
  micIcon,
  onAttach,
  onMic,
  onSend,
  className = "",
  style,
  ...rest
}: PromptBarProps) {
  const uid = React.useId();
  const [value, setValue] = React.useState("");
  const [picked, setPicked] = React.useState(defaultModel ?? models[0] ?? "");
  const [open, setOpen] = React.useState(false);
  const area = React.useRef<HTMLTextAreaElement>(null);
  const root = React.useRef<HTMLDivElement>(null);
  const chip = React.useRef<HTMLButtonElement>(null);
  const menu = React.useRef<HTMLUListElement>(null);

  const model = models.includes(picked) ? picked : (models[0] ?? "");
  const canSend = !disabled && value.trim().length > 0;

  React.useLayoutEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, Math.max(1, maxRows) * LINE)}px`;
  }, [value, maxRows]);

  React.useEffect(() => {
    if (!open) return;
    const selected = menu.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    (selected ?? menu.current?.querySelector<HTMLElement>("li"))?.focus();
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  function send() {
    const text = value.trim();
    if (!text || disabled) return;
    onSend?.(text, model);
    setValue("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  }

  function choose(next: string) {
    setPicked(next);
    setOpen(false);
    chip.current?.focus();
  }

  function onMenuKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("li"));
    const at = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(at + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(at - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      chip.current?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div
      ref={root}
      className={`hb-pb ${className}`}
      style={{ "--hb-pb-color": color, ...style } as React.CSSProperties}
      data-disabled={disabled}
      {...rest}
    >
      <style href="hb-prompt-bar" precedence="default">{css}</style>
      <textarea
        ref={area}
        className="hb-pb-input"
        rows={1}
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="hb-pb-bar">
        <button className="hb-pb-icon" type="button" aria-label="Attach file" disabled={disabled} onClick={onAttach}>
          {attachIcon ?? (
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M13.2 7.6l-5 5a3.2 3.2 0 0 1-4.5-4.5l5.2-5.2a2.1 2.1 0 0 1 3 3L6.6 10.9a1 1 0 0 1-1.5-1.5l4.7-4.7" />
            </svg>
          )}
        </button>
        <button className="hb-pb-icon" type="button" aria-label="Use microphone" disabled={disabled} onClick={onMic}>
          {micIcon ?? (
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="5.8" y="1.8" width="4.4" height="7.4" rx="2.2" />
              <path d="M3.4 7.6a4.6 4.6 0 0 0 9.2 0M8 12.2v2" />
            </svg>
          )}
        </button>
        <span className="hb-pb-spacer" />
        <div className="hb-pb-model">
          <button
            ref={chip}
            className="hb-pb-chip"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={`${uid}-models`}
            aria-label={`Model: ${model}`}
            disabled={disabled}
            onClick={() => setOpen((v) => !v)}
          >
            {model}
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 4.5L6 8l3.5-3.5" />
            </svg>
          </button>
          {open ? (
            <ul
              ref={menu}
              id={`${uid}-models`}
              className="hb-pb-menu"
              role="listbox"
              aria-label="Model"
              onKeyDown={onMenuKeyDown}
            >
              {models.map((m) => (
                <li
                  key={m}
                  className="hb-pb-option"
                  role="option"
                  tabIndex={-1}
                  aria-selected={m === model}
                  onClick={() => choose(m)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      choose(m);
                    }
                  }}
                >
                  {m}
                  {m === model ? (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8.5l3.2 3.2L13 4.8" />
                    </svg>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <button className="hb-pb-send" type="button" aria-label="Send message" disabled={!canSend} onClick={send}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
