"use client";

import * as React from "react";

export type ReactionId = "like" | "love" | "haha" | "wow" | "sad";

export interface LikeReactionPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: ReactionId | null;
  defaultValue?: ReactionId | null;
  onChange?: (value: ReactionId | null) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  accent?: string;
  label?: string;
  holdDelay?: number;
}

const css = `
.hb-qb3 {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  font-family: inherit;
  --hb-qb3-a: #2f7bff;
}
.hb-qb3 *, .hb-qb3 *::before, .hb-qb3 *::after { box-sizing: border-box; }
.hb-qb3-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  margin: 0;
  padding: 0 14px 0 11px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #171717;
  color: #a1a1a1;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease, transform 0.12s ease;
}
.hb-qb3-btn:hover { border-color: #3a3a3a; color: #ededed; }
.hb-qb3-btn:active { transform: scale(0.96); }
.hb-qb3-btn:focus-visible { outline: 2px solid var(--hb-qb3-a); outline-offset: 2px; }
.hb-qb3-btn[data-on="true"] {
  border-color: color-mix(in srgb, var(--hb-qb3-t) 40%, #262626);
  background: color-mix(in srgb, var(--hb-qb3-t) 9%, #171717);
  color: var(--hb-qb3-t);
}
.hb-qb3-glyph {
  display: inline-flex;
  width: 20px;
  height: 20px;
  flex: none;
}
.hb-qb3-glyph svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-qb3-glyph[data-face="true"] svg { fill: none; stroke: none; }
.hb-qb3-glyph[data-face="true"] { animation: hb-qb3-land 0.45s cubic-bezier(0.3, 1.6, 0.5, 1); }
@keyframes hb-qb3-land {
  0% { transform: scale(0.4) rotate(-20deg); }
  100% { transform: scale(1) rotate(0deg); }
}
.hb-qb3-bubble {
  position: absolute;
  left: 0;
  bottom: calc(100% + 10px);
  z-index: 5;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  padding: 6px 8px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #171717;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
  transform-origin: 20% 100%;
  animation: hb-qb3-bubble 0.24s cubic-bezier(0.2, 0.9, 0.3, 1);
}
@keyframes hb-qb3-bubble {
  from { opacity: 0; transform: translateY(8px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.hb-qb3-slot {
  position: relative;
  display: block;
  width: 34px;
  height: 34px;
}
.hb-qb3-item {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transform-origin: 50% 100%;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.2s cubic-bezier(0.3, 1.5, 0.5, 1);
  animation: hb-qb3-in 0.4s cubic-bezier(0.3, 1.5, 0.5, 1) backwards;
  animation-delay: calc(var(--hb-qb3-i) * 45ms);
}
.hb-qb3-item svg { display: block; width: 100%; height: 100%; }
.hb-qb3-item:focus-visible { outline: 2px solid var(--hb-qb3-a); outline-offset: 2px; }
.hb-qb3-slot[data-active="true"] .hb-qb3-item { transform: translateY(-9px) scale(1.5); }
.hb-qb3-item[aria-checked="true"]::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 4px;
  height: 4px;
  margin-left: -2px;
  border-radius: 50%;
  background: var(--hb-qb3-a);
}
@keyframes hb-qb3-in {
  from { opacity: 0; transform: translateY(16px) scale(0.4); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.hb-qb3-tip {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 28px);
  padding: 4px 8px;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.hb-qb3-slot[data-active="true"] .hb-qb3-tip { opacity: 1; transform: translate(-50%, 0); }
.hb-qb3-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qb3-btn, .hb-qb3-item, .hb-qb3-tip { transition: none; }
  .hb-qb3-bubble, .hb-qb3-item, .hb-qb3-glyph[data-face="true"] { animation: none; }
}
`;

const ink = "#3a2a10";
const skin = "#ffcf4a";
const heart =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

const reactions: { id: ReactionId; name: string; tone: string }[] = [
  { id: "like", name: "Like", tone: "#5aa2ff" },
  { id: "love", name: "Love", tone: "#ff5a76" },
  { id: "haha", name: "Haha", tone: "#ffc83d" },
  { id: "wow", name: "Wow", tone: "#ffc83d" },
  { id: "sad", name: "Sad", tone: "#ffc83d" },
];

function Face({ id }: { id: ReactionId }) {
  let features: React.ReactNode;
  switch (id) {
    case "love":
      features = (
        <>
          <path transform="translate(7.2 8.7) scale(0.34)" d={heart} fill="#ff3b5c" />
          <path transform="translate(16.7 8.7) scale(0.34)" d={heart} fill="#ff3b5c" />
          <path d="M10.2 18.6c1.7 4.2 10 4.2 11.6 0" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
      break;
    case "haha":
      features = (
        <>
          <path d="M8.2 14.2q3-3.8 6 0M17.8 14.2q3-3.8 6 0" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M9 18h14c0 4.8-3 7.6-7 7.6S9 22.8 9 18z" fill={ink} />
          <path d="M12.2 23.6c1.2-1.8 6.4-1.8 7.6 0-1.4 1.3-6.2 1.3-7.6 0z" fill="#ff6f7d" />
        </>
      );
      break;
    case "wow":
      features = (
        <>
          <path d="M8.4 9.6q2.6-2.2 5.2-.4M18.4 9.2q2.6-1.8 5.2.4" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="11.2" cy="14" r="2" fill={ink} />
          <circle cx="20.8" cy="14" r="2" fill={ink} />
          <ellipse cx="16" cy="22.4" rx="3" ry="3.8" fill={ink} />
        </>
      );
      break;
    case "sad":
      features = (
        <>
          <path d="M8.4 12.2l5.4-2M23.6 12.2l-5.4-2" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="11.4" cy="15" r="1.8" fill={ink} />
          <circle cx="20.6" cy="15" r="1.8" fill={ink} />
          <path d="M11 23.4c1.6-3 8.4-3 10 0" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M23.2 17.6c1.2 1.6 1.8 2.7 1.8 3.5a1.8 1.8 0 11-3.6 0c0-.8.6-1.9 1.8-3.5z" fill="#5ab4ff" />
        </>
      );
      break;
    default:
      features = (
        <>
          <circle cx="11.2" cy="13.4" r="1.8" fill={ink} />
          <circle cx="20.8" cy="13.4" r="1.8" fill={ink} />
          <circle cx="8.2" cy="18.6" r="2" fill="#ff7a5a" opacity="0.4" />
          <circle cx="23.8" cy="18.6" r="2" fill="#ff7a5a" opacity="0.4" />
          <path d="M10.4 18.8c1.4 3.6 9.8 3.6 11.2 0" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" fill={skin} />
      <path d="M6 10.5C9 4.8 20.5 3 26 9.5 22 6.8 12 6.6 6 10.5z" fill="#fff" opacity="0.28" />
      {features}
    </svg>
  );
}

export function LikeReactionPicker({
  value,
  defaultValue = null,
  onChange,
  open,
  defaultOpen = false,
  onOpenChange,
  accent = "#2f7bff",
  label = "Like",
  holdDelay = 380,
  className = "",
  style,
  ...rest
}: LikeReactionPickerProps) {
  const valueControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState<ReactionId | null>(defaultValue);
  const current = valueControlled ? value : innerValue;

  const openControlled = open !== undefined;
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const isOpen = openControlled ? open : innerOpen;

  const [active, setActive] = React.useState(-1);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const bubbleRef = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const held = React.useRef(false);
  const pending = React.useRef<number | null>(null);

  function setOpen(next: boolean) {
    if (!openControlled) setInnerOpen(next);
    if (!next) setActive(-1);
    onOpenChange?.(next);
  }

  function choose(id: ReactionId) {
    const next = current === id ? null : id;
    if (!valueControlled) setInnerValue(next);
    onChange?.(next);
    if (bubbleRef.current?.contains(document.activeElement)) btnRef.current?.focus();
    setOpen(false);
  }

  function items() {
    return Array.from(bubbleRef.current?.querySelectorAll<HTMLButtonElement>("[role='menuitemradio']") ?? []);
  }

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  React.useEffect(() => {
    if (isOpen && pending.current !== null) {
      const list = items();
      list[Math.min(pending.current, list.length - 1)]?.focus();
      pending.current = null;
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    function down(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        if (!openControlled) setInnerOpen(false);
        setActive(-1);
        onOpenChange?.(false);
      }
    }
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (!openControlled) setInnerOpen(false);
        setActive(-1);
        onOpenChange?.(false);
        if (rootRef.current?.contains(document.activeElement)) btnRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [isOpen, openControlled, onOpenChange]);

  function startHold(e: React.PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    held.current = false;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      held.current = true;
      setOpen(true);
    }, holdDelay);
  }

  function endHold() {
    window.clearTimeout(timer.current);
  }

  function onBaseClick(e: React.MouseEvent) {
    if (held.current) {
      held.current = false;
      return;
    }
    if (e.detail === 0 && !isOpen) {
      const at = reactions.findIndex((r) => r.id === current);
      pending.current = at < 0 ? 0 : at;
    }
    setOpen(!isOpen);
  }

  function onBaseKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      if (isOpen) {
        const list = items();
        const at = reactions.findIndex((r) => r.id === current);
        list[at < 0 ? 0 : at]?.focus();
      } else {
        const at = reactions.findIndex((r) => r.id === current);
        pending.current = at < 0 ? 0 : at;
        setOpen(true);
      }
    }
  }

  function onItemKey(e: React.KeyboardEvent, index: number) {
    const list = items();
    let target = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") target = (index + 1) % list.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") target = (index - 1 + list.length) % list.length;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = list.length - 1;
    else if (e.key === "Tab") setOpen(false);
    if (target >= 0) {
      e.preventDefault();
      list[target]?.focus();
    }
  }

  const picked = reactions.find((r) => r.id === current);
  const vars = { "--hb-qb3-a": accent, "--hb-qb3-t": picked?.tone ?? accent, ...style } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-qb3 ${className}`} style={vars} {...rest}>
      <style href="hb-like-reaction-picker" precedence="default">{css}</style>
      <button
        ref={btnRef}
        type="button"
        className="hb-qb3-btn"
        data-on={picked ? "true" : "false"}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={picked ? `${label}: ${picked.name}` : label}
        onClick={onBaseClick}
        onKeyDown={onBaseKey}
        onPointerDown={startHold}
        onPointerUp={endHold}
        onPointerLeave={endHold}
        onPointerCancel={endHold}
        onContextMenu={(e) => e.preventDefault()}
      >
        {picked ? (
          <span key={picked.id} className="hb-qb3-glyph" data-face="true" aria-hidden="true">
            <Face id={picked.id} />
          </span>
        ) : (
          <span className="hb-qb3-glyph" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M3.2 11.2h3.6a.9.9 0 01.9.9v8a.9.9 0 01-.9.9H3.2a.9.9 0 01-.9-.9v-8a.9.9 0 01.9-.9z" />
              <path d="M9.4 11.4l3-6.6c.5-1.1 1.6-1.7 2.7-1.3 1.1.4 1.7 1.5 1.5 2.7l-.6 3.4h4.2a2 2 0 011.95 2.45l-1.4 6.3a2 2 0 01-1.95 1.55H11.4a2 2 0 01-2-2z" />
            </svg>
          </span>
        )}
        <span>{picked ? picked.name : label}</span>
      </button>
      {isOpen && (
        <div ref={bubbleRef} role="menu" aria-label="Choose a reaction" className="hb-qb3-bubble" onPointerLeave={() => setActive(-1)}>
          {reactions.map((r, i) => (
            <span key={r.id} className="hb-qb3-slot" data-active={active === i ? "true" : "false"}>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={current === r.id}
                aria-label={r.name}
                className="hb-qb3-item"
                style={{ "--hb-qb3-i": i } as React.CSSProperties}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(-1)}
                onKeyDown={(e) => onItemKey(e, i)}
                onClick={() => choose(r.id)}
              >
                <Face id={r.id} />
              </button>
              <span className="hb-qb3-tip" aria-hidden="true">
                {r.name}
              </span>
            </span>
          ))}
        </div>
      )}
      <span className="hb-qb3-sr" role="status" aria-live="polite">
        {picked ? `Reacted with ${picked.name}` : ""}
      </span>
    </div>
  );
}
