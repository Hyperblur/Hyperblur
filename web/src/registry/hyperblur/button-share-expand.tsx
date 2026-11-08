"use client";

import * as React from "react";

export type ButtonShareExpandIcon = "link" | "mail" | "message" | "embed" | "download" | "qr";

export interface ButtonShareExpandAction {
  id: string;
  label: string;
  icon?: ButtonShareExpandIcon | React.ReactNode;
}

export interface ButtonShareExpandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "onChange"> {
  label?: string;
  actions?: ButtonShareExpandAction[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAction?: (id: string) => void;
  copyText?: string;
  accent?: string;
}

const defaultActions: ButtonShareExpandAction[] = [
  { id: "link", label: "Copy link", icon: "link" },
  { id: "mail", label: "Send by email", icon: "mail" },
  { id: "message", label: "Send as message", icon: "message" },
  { id: "embed", label: "Copy embed code", icon: "embed" },
];

const css = `
.hb-xa8 {
  --hb-xa8-c: #2f7bff;
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  padding: 4px;
  font-size: 14px;
  line-height: 1;
  color: #ededed;
  background: linear-gradient(180deg, #191919, #111);
  border-radius: 999px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), inset 0 0 0 1px #262626, 0 12px 30px -18px rgba(0, 0, 0, 0.9);
  transition: box-shadow 0.3s ease;
}
.hb-xa8 *, .hb-xa8 *::before, .hb-xa8 *::after { box-sizing: border-box; }
.hb-xa8[data-open="true"] { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 0 1px #333, 0 16px 34px -18px color-mix(in srgb, var(--hb-xa8-c) 40%, transparent); }
.hb-xa8-main {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  height: 2.6em;
  margin: 0;
  padding: 0 1.1em 0 0.85em;
  font: inherit;
  font-weight: 600;
  color: #0a0a0a;
  background: linear-gradient(180deg, #fff, #dcdcdc);
  border: 0;
  border-radius: 999px;
  box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.12), 0 2px 6px -2px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition: padding 0.45s cubic-bezier(0.7, 0, 0.2, 1), background 0.3s ease, color 0.3s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-xa8-main:active { transform: scale(0.96); }
.hb-xa8-main:focus-visible, .hb-xa8-act:focus-visible { outline: 2px solid var(--hb-xa8-c); outline-offset: 2px; }
.hb-xa8[data-open="true"] .hb-xa8-main { padding: 0 0.8em; color: #ededed; background: #262626; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06); }
.hb-xa8-glyph { position: relative; width: 1.1em; height: 1.1em; flex: none; }
.hb-xa8-glyph svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}
.hb-xa8-glyph svg + svg { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.hb-xa8[data-open="true"] .hb-xa8-glyph svg { opacity: 0; transform: rotate(90deg) scale(0.5); }
.hb-xa8[data-open="true"] .hb-xa8-glyph svg + svg { opacity: 1; transform: none; }
.hb-xa8-text {
  display: inline-block;
  overflow: hidden;
  max-width: 8em;
  transition: max-width 0.45s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.25s ease;
}
.hb-xa8[data-open="true"] .hb-xa8-text { max-width: 0; opacity: 0; }
.hb-xa8-tray {
  display: grid;
  grid-template-columns: 0fr;
  transition: grid-template-columns 0.5s cubic-bezier(0.7, 0, 0.2, 1);
}
.hb-xa8[data-open="true"] .hb-xa8-tray { grid-template-columns: 1fr; }
.hb-xa8-inner { display: flex; align-items: center; gap: 4px; min-width: 0; overflow: hidden; padding: 0 0 0 4px; }
.hb-xa8[data-open="true"] .hb-xa8-inner { animation: hb-xa8-ov 0.5s steps(1, end) forwards; }
.hb-xa8-act {
  position: relative;
  display: grid;
  place-items: center;
  width: 2.6em;
  height: 2.6em;
  flex: none;
  margin: 0;
  padding: 0;
  color: #d4d4d4;
  background: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.4) translateX(-8px);
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease, background 0.2s ease, color 0.2s ease;
  transition-delay: 0s;
  -webkit-tap-highlight-color: transparent;
}
.hb-xa8[data-open="true"] .hb-xa8-act { opacity: 1; transform: none; transition-delay: calc(0.12s + var(--hb-xa8-i) * 0.05s), calc(0.12s + var(--hb-xa8-i) * 0.05s), 0s, 0s; }
.hb-xa8-act:hover { color: #fff; background: #222; }
.hb-xa8-act svg { width: 1.15em; height: 1.15em; }
.hb-xa8-act[data-done="true"] { color: #0a0a0a; background: var(--hb-xa8-c); }
.hb-xa8-act[data-done="true"] svg { animation: hb-xa8-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xa8-tip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  padding: 0.45em 0.65em;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  color: #ededed;
  background: #1f1f1f;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px #2e2e2e, 0 6px 16px -6px rgba(0, 0, 0, 0.8);
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 4px);
  transition: opacity 0.18s ease, transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-xa8-act:hover .hb-xa8-tip, .hb-xa8-act:focus-visible .hb-xa8-tip, .hb-xa8-act[data-done="true"] .hb-xa8-tip { opacity: 1; transform: translate(-50%, 0); }
@keyframes hb-xa8-ov { from { overflow: hidden; } to { overflow: visible; } }
@keyframes hb-xa8-pop { 0% { transform: scale(0.4); } 100% { transform: scale(1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xa8, .hb-xa8-main, .hb-xa8-glyph svg, .hb-xa8-text, .hb-xa8-tray, .hb-xa8-act, .hb-xa8-tip { transition: none; }
  .hb-xa8[data-open="true"] .hb-xa8-act { transition: none; }
  .hb-xa8-act[data-done="true"] svg { animation: none; }
  .hb-xa8[data-open="true"] .hb-xa8-inner { animation: none; overflow: visible; }
}
`;

const paths: Record<ButtonShareExpandIcon, React.ReactNode> = {
  link: (
    <>
      <path d="M8.5 11.5l3-3" />
      <path d="M9.6 6.2l1.2-1.2a3 3 0 0 1 4.2 4.2l-1.2 1.2" />
      <path d="M10.4 13.8l-1.2 1.2a3 3 0 0 1-4.2-4.2l1.2-1.2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="14" height="10.5" rx="2" />
      <path d="M3.6 6.2l6.4 4.6 6.4-4.6" />
    </>
  ),
  message: <path d="M4 5.5A2 2 0 0 1 6 3.5h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-3.5 3v-3H6a2 2 0 0 1-2-2v-6Z" />,
  embed: (
    <>
      <path d="M7 6.5L3.5 10 7 13.5" />
      <path d="M13 6.5l3.5 3.5-3.5 3.5" />
      <path d="M11 5l-2 10" />
    </>
  ),
  download: (
    <>
      <path d="M10 3.5v9" />
      <path d="M6.5 9l3.5 3.5L13.5 9" />
      <path d="M4 15.5h12" />
    </>
  ),
  qr: (
    <>
      <rect x="3.5" y="3.5" width="5" height="5" rx="1" />
      <rect x="11.5" y="3.5" width="5" height="5" rx="1" />
      <rect x="3.5" y="11.5" width="5" height="5" rx="1" />
      <path d="M11.5 11.5h2v2M16.5 11.5v5h-5" />
    </>
  ),
};

function Glyph({ name }: { name: ButtonShareExpandIcon }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const check = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 10.5l3.5 3.5 7.5-8" />
  </svg>
);

function isIconName(v: unknown): v is ButtonShareExpandIcon {
  return typeof v === "string" && v in paths;
}

export function ButtonShareExpand({
  label = "Share",
  actions = defaultActions,
  open,
  defaultOpen = false,
  onOpenChange,
  onAction,
  copyText,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: ButtonShareExpandProps) {
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = open ?? inner;
  const [done, setDone] = React.useState<string | null>(null);
  const mainRef = React.useRef<HTMLButtonElement>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const trayId = React.useId();

  React.useEffect(() => () => clearTimeout(timer.current), []);

  function setOpen(next: boolean) {
    if (open === undefined) setInner(next);
    onOpenChange?.(next);
  }

  function fire(a: ButtonShareExpandAction) {
    if (copyText && (a.id === "link" || a.id === "embed")) {
      navigator.clipboard?.writeText(copyText).catch(() => {});
    }
    setDone(a.id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(null), 1400);
    onAction?.(a.id);
  }

  const vars = { "--hb-xa8-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-share-expand" precedence="default">{css}</style>
      <div
        role="group"
        aria-label={label}
        className={`hb-xa8 ${className}`}
        style={vars}
        data-open={isOpen || undefined}
        onKeyDown={(e) => {
          if (e.key === "Escape" && isOpen) {
            e.stopPropagation();
            setOpen(false);
            mainRef.current?.focus();
          }
          onKeyDown?.(e);
        }}
        {...rest}
      >
        <button
          ref={mainRef}
          type="button"
          className="hb-xa8-main"
          aria-expanded={isOpen}
          aria-controls={trayId}
          aria-label={isOpen ? `Close ${label.toLowerCase()} options` : label}
          onClick={() => setOpen(!isOpen)}
        >
          <span className="hb-xa8-glyph" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12.5V3.5" />
              <path d="M6.5 7L10 3.5 13.5 7" />
              <path d="M6 10H5a1.5 1.5 0 0 0-1.5 1.5v4A1.5 1.5 0 0 0 5 17h10a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 15 10h-1" />
            </svg>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
            </svg>
          </span>
          <span className="hb-xa8-text">{label}</span>
        </button>
        <div className="hb-xa8-tray" id={trayId}>
          <div className="hb-xa8-inner">
            {actions.map((a, i) => {
              const ok = done === a.id;
              const icon = isIconName(a.icon) ? <Glyph name={a.icon} /> : a.icon ?? <Glyph name="link" />;
              return (
                <button
                  type="button"
                  key={a.id}
                  className="hb-xa8-act"
                  style={{ "--hb-xa8-i": i } as React.CSSProperties}
                  data-done={ok || undefined}
                  tabIndex={isOpen ? 0 : -1}
                  aria-hidden={isOpen ? undefined : true}
                  aria-label={a.label}
                  onClick={() => fire(a)}
                >
                  {ok ? check : icon}
                  <span className="hb-xa8-tip" aria-hidden="true">
                    {ok ? (a.id === "link" || a.id === "embed" ? "Copied" : "Done") : a.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <span aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          {done ? `${actions.find((a) => a.id === done)?.label ?? ""} done` : ""}
        </span>
      </div>
    </>
  );
}
