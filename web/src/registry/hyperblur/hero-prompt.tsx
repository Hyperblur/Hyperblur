"use client";

import * as React from "react";

export interface HeroPromptAction {
  label: string;
  href: string;
}

export interface HeroPromptSuggestion {
  label: string;
  prompt: string;
}

export interface HeroPromptProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: HeroPromptAction | null;
  secondaryCta?: HeroPromptAction | null;
  placeholders?: string[];
  suggestions?: HeroPromptSuggestion[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  clearOnSubmit?: boolean;
  maxLength?: number;
  accent?: string;
}

const css = `
@keyframes hb-hrm-rise {
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hrm-pulse {
  0%, 100% { opacity: .55; transform: scale(1); }
  50% { opacity: .95; transform: scale(1.05); }
}
@keyframes hb-hrm-ph {
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hrm-sent {
  from { transform: scale(.6) rotate(-20deg); opacity: 0; }
  to { transform: scale(1) rotate(0); opacity: 1; }
}
.hb-hrm {
  --hb-hrm-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 560px;
  overflow: hidden;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  container-type: inline-size;
  padding: clamp(48px, 6.4cqi, 96px) clamp(16px, 4cqi, 48px) clamp(44px, 5.6cqi, 80px);
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  text-align: center;
  -webkit-font-smoothing: antialiased;
}
.hb-hrm *, .hb-hrm *::before, .hb-hrm *::after { box-sizing: border-box; }
.hb-hrm::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-image: radial-gradient(rgba(255, 255, 255, .09) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 60% 55% at 50% 40%, #000, transparent 80%);
  mask-image: radial-gradient(ellipse 60% 55% at 50% 40%, #000, transparent 80%);
}
.hb-hrm::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -30%;
  z-index: -2;
  height: 70%;
  pointer-events: none;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-hrm-accent) 22%, transparent), transparent);
}
.hb-hrm-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 820px;
}
.hb-hrm-a {
  animation: hb-hrm-rise .8s cubic-bezier(.22, .8, .24, 1) both;
  animation-delay: calc(var(--hb-hrm-i, 0) * 80ms);
}
.hb-hrm-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 22px;
  padding: 5px 12px 5px 6px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: rgba(23, 23, 23, .7);
  color: #a1a1a1;
  font-size: 13px;
  line-height: 1.2;
}
.hb-hrm-pill b {
  padding: 3px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-hrm-accent) 20%, transparent);
  color: color-mix(in srgb, var(--hb-hrm-accent) 50%, #ffffff);
  font-size: 11.5px;
  font-weight: 600;
}
.hb-hrm-title {
  margin: 0;
  max-width: 760px;
  font-size: clamp(34px, 5.7cqi, 64px);
  font-weight: 650;
  line-height: 1.04;
  letter-spacing: -.04em;
  text-wrap: balance;
}
.hb-hrm-hl {
  background: linear-gradient(95deg, color-mix(in srgb, var(--hb-hrm-accent) 60%, #ffffff), var(--hb-hrm-accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-hrm-sub {
  max-width: 560px;
  margin: 18px 0 0;
  color: #a1a1a1;
  font-size: clamp(15px, 1.8cqi, 18px);
  line-height: 1.55;
  text-wrap: pretty;
}
.hb-hrm-form {
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 700px;
  margin-top: clamp(26px, 3.4cqi, 36px);
}
.hb-hrm-glow {
  position: absolute;
  inset: -36px -28px;
  z-index: -1;
  border-radius: 48px;
  pointer-events: none;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-hrm-accent) 32%, transparent), transparent);
  filter: blur(18px);
  opacity: .4;
  transition: opacity .4s ease;
}
.hb-hrm-form:focus-within .hb-hrm-glow { animation: hb-hrm-pulse 2.6s ease-in-out infinite; }
.hb-hrm-box {
  position: relative;
  padding: 14px 12px 10px 18px;
  border: 1px solid #262626;
  border-radius: 22px;
  background: linear-gradient(180deg, #151515, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 24px 60px -30px rgba(0, 0, 0, .9);
  text-align: left;
  transition: border-color .25s ease, box-shadow .25s ease;
}
.hb-hrm-form:focus-within .hb-hrm-box {
  border-color: color-mix(in srgb, var(--hb-hrm-accent) 55%, #262626);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 0 0 4px color-mix(in srgb, var(--hb-hrm-accent) 14%, transparent), 0 24px 60px -30px rgba(0, 0, 0, .9);
}
.hb-hrm-area-wrap { position: relative; }
.hb-hrm-area {
  display: block;
  width: 100%;
  min-height: 56px;
  max-height: 220px;
  margin: 0;
  padding: 2px 4px 0 0;
  border: 0;
  outline: none;
  resize: none;
  overflow-y: auto;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 16.5px;
  line-height: 1.6;
  caret-color: var(--hb-hrm-accent);
}
.hb-hrm-ph {
  position: absolute;
  left: 0;
  top: 2px;
  right: 4px;
  overflow: hidden;
  color: #6b6b6b;
  font-size: 16.5px;
  line-height: 1.6;
  max-height: 3.2em;
  pointer-events: none;
  animation: hb-hrm-ph .45s ease both;
}
.hb-hrm-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}
.hb-hrm-hint {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #6f6f6f;
  font-size: 12px;
}
.hb-hrm-hint kbd {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border: 1px solid #2a2a2a;
  border-bottom-width: 2px;
  border-radius: 5px;
  background: #171717;
  color: #a1a1a1;
  font: inherit;
  font-size: 11px;
}
.hb-hrm-count {
  margin-left: auto;
  color: #5f5f5f;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.hb-hrm-count[data-near="true"] { color: #f5a524; }
.hb-hrm-send {
  display: grid;
  place-items: center;
  flex: none;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 12px;
  background: var(--hb-hrm-accent);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 6px 18px -6px var(--hb-hrm-accent);
  transition: transform .2s ease, opacity .2s ease, background .2s ease, box-shadow .2s ease;
}
.hb-hrm-send:hover:not(:disabled) { transform: translate3d(0, -1px, 0); background: color-mix(in srgb, var(--hb-hrm-accent) 85%, #ffffff); }
.hb-hrm-send:active:not(:disabled) { transform: scale(.94); }
.hb-hrm-send:disabled { cursor: not-allowed; opacity: .35; box-shadow: none; }
.hb-hrm-send:focus-visible { outline: 2px solid #ededed; outline-offset: 3px; }
.hb-hrm-send svg { display: block; }
.hb-hrm-send[data-sent="true"] { background: #22a06b; box-shadow: 0 6px 18px -6px #22a06b; opacity: 1; }
.hb-hrm-send[data-sent="true"] svg { animation: hb-hrm-sent .35s cubic-bezier(.22, .8, .24, 1) both; }
.hb-hrm-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}
.hb-hrm-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 34px;
  padding: 0 14px 0 11px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: rgba(17, 17, 17, .8);
  color: #c4c4c4;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: border-color .2s ease, background .2s ease, color .2s ease, transform .2s ease;
}
.hb-hrm-chip svg { flex: none; color: color-mix(in srgb, var(--hb-hrm-accent) 60%, #ffffff); }
.hb-hrm-chip:hover { border-color: #3a3a3a; background: #171717; color: #ededed; transform: translate3d(0, -1px, 0); }
.hb-hrm-chip[data-active="true"] { border-color: color-mix(in srgb, var(--hb-hrm-accent) 60%, #262626); color: #ededed; }
.hb-hrm-chip:focus-visible { outline: 2px solid var(--hb-hrm-accent); outline-offset: 2px; }
.hb-hrm-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: clamp(26px, 3.4cqi, 36px);
}
.hb-hrm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 22px;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
  transition: background .2s ease, border-color .2s ease, transform .2s ease;
}
.hb-hrm-btn:hover { background: #171717; border-color: #3a3a3a; transform: translate3d(0, -1px, 0); }
.hb-hrm-btn[data-primary="true"] { border-color: #ededed; background: #ededed; color: #0a0a0a; }
.hb-hrm-btn[data-primary="true"]:hover { background: #ffffff; border-color: #ffffff; }
.hb-hrm-btn:focus-visible { outline: 2px solid var(--hb-hrm-accent); outline-offset: 3px; }
.hb-hrm-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
@container (max-width: 560px) {
  .hb-hrm-hint { display: none; }
  .hb-hrm-box { padding: 12px 10px 10px 14px; border-radius: 18px; }
  .hb-hrm-area, .hb-hrm-ph { font-size: 16px; }
  .hb-hrm-glow { inset: -24px -12px; }
}
@container (max-width: 420px) {
  .hb-hrm-actions { flex-direction: column; align-items: stretch; width: 100%; }
  .hb-hrm-btn { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hrm-a, .hb-hrm-ph, .hb-hrm-form:focus-within .hb-hrm-glow, .hb-hrm-send[data-sent="true"] svg { animation: none; }
  .hb-hrm-form:focus-within .hb-hrm-glow { opacity: .8; }
  .hb-hrm-box, .hb-hrm-send, .hb-hrm-chip, .hb-hrm-btn, .hb-hrm-glow { transition: none; }
  .hb-hrm-send:hover:not(:disabled), .hb-hrm-chip:hover, .hb-hrm-btn:hover { transform: none; }
}
`;

const defaultPrimary: HeroPromptAction = { label: "Start building free", href: "#" };
const defaultSecondary: HeroPromptAction = { label: "Browse 1,200 examples", href: "#" };
const defaultPlaceholders = [
  "Describe the app you want to build...",
  "A booking page for my yoga studio...",
  "An internal dashboard for support tickets...",
  "A portfolio site with a dark theme and case studies...",
];
const defaultSuggestions: HeroPromptSuggestion[] = [
  { label: "Habit tracker", prompt: "Build a habit tracker with daily streaks, a weekly heatmap and a gentle reminder at 8pm." },
  { label: "Coffee shop site", prompt: "Make a landing page for a small coffee roaster with a menu, opening hours and pickup orders." },
  { label: "Gym CRM", prompt: "Create a CRM for a boutique gym that tracks members, class bookings and overdue payments." },
  { label: "Trip splitter", prompt: "Build an app that splits trip expenses between friends and shows who owes whom." },
];

function step(index: number) {
  return 14 + ((index * 2654435761) >>> 0) % 4 * 9;
}

function delay(index: number) {
  return { "--hb-hrm-i": index } as React.CSSProperties;
}

export function HeroPrompt({
  eyebrow = "Atlas 2 is here",
  title = "Describe the app. Get it running in minutes.",
  highlight = "running",
  subtitle = "Tell Atlas what you need in plain words. It drafts the screens, wires up the data and hands you a live preview you can share.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  placeholders = defaultPlaceholders,
  suggestions = defaultSuggestions,
  value,
  defaultValue = "",
  onChange,
  onSubmit,
  clearOnSubmit = true,
  maxLength = 2000,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: HeroPromptProps) {
  const id = React.useId();
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;
  const [phIndex, setPhIndex] = React.useState(0);
  const [active, setActive] = React.useState<number | null>(null);
  const [sent, setSent] = React.useState(false);
  const [announce, setAnnounce] = React.useState("");
  const areaRef = React.useRef<HTMLTextAreaElement>(null);
  const typeTimer = React.useRef<number | null>(null);
  const sentTimer = React.useRef<number | null>(null);

  const setText = React.useCallback(
    (next: string) => {
      const clipped = next.slice(0, maxLength);
      if (value === undefined) setInner(clipped);
      onChange?.(clipped);
    },
    [value, onChange, maxLength],
  );

  const stopTyping = React.useCallback(() => {
    if (typeTimer.current !== null) {
      window.clearTimeout(typeTimer.current);
      typeTimer.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (placeholders.length < 2) return;
    const timer = window.setInterval(() => setPhIndex((i) => (i + 1) % placeholders.length), 3200);
    return () => window.clearInterval(timer);
  }, [placeholders.length]);

  React.useEffect(
    () => () => {
      stopTyping();
      if (sentTimer.current !== null) window.clearTimeout(sentTimer.current);
    },
    [stopTyping],
  );

  React.useLayoutEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    area.style.height = "auto";
    area.style.height = `${Math.min(area.scrollHeight, 220)}px`;
  }, [current]);

  function typeInto(text: string, index: number) {
    stopTyping();
    setActive(index);
    const area = areaRef.current;
    area?.focus();
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(text);
      setActive(null);
      return;
    }
    let i = 0;
    const tick = () => {
      i = Math.min(text.length, i + 2);
      setText(text.slice(0, i));
      if (i < text.length) {
        typeTimer.current = window.setTimeout(tick, step(i));
      } else {
        typeTimer.current = null;
        setActive(null);
        requestAnimationFrame(() => {
          const el = areaRef.current;
          if (el) el.setSelectionRange(el.value.length, el.value.length);
        });
      }
    };
    tick();
  }

  function submit() {
    const text = current.trim();
    if (!text) return;
    stopTyping();
    setActive(null);
    onSubmit?.(text);
    if (clearOnSubmit) setText("");
    setSent(true);
    setAnnounce(`Prompt sent: ${text}`);
    if (sentTimer.current !== null) window.clearTimeout(sentTimer.current);
    sentTimer.current = window.setTimeout(() => setSent(false), 1600);
  }

  const at = highlight ? title.indexOf(highlight) : -1;
  const rootStyle = { "--hb-hrm-accent": accent, ...style } as React.CSSProperties;
  const empty = current.length === 0;
  const near = current.length > maxLength * 0.9;

  return (
    <section className={`hb-hrm ${className}`} style={rootStyle} {...rest}>
      <style href="hb-hero-prompt" precedence="default">{css}</style>
      <div className="hb-hrm-inner">
        {eyebrow ? (
          <p className="hb-hrm-pill hb-hrm-a" style={delay(0)}>
            <b>New</b>
            {eyebrow}
          </p>
        ) : null}
        <h2 className="hb-hrm-title hb-hrm-a" style={delay(1)}>
          {at >= 0 ? (
            <>
              {title.slice(0, at)}
              <span className="hb-hrm-hl">{highlight}</span>
              {title.slice(at + highlight.length)}
            </>
          ) : (
            title
          )}
        </h2>
        {subtitle ? (
          <p className="hb-hrm-sub hb-hrm-a" style={delay(2)}>
            {subtitle}
          </p>
        ) : null}

        <form
          className="hb-hrm-form hb-hrm-a"
          style={delay(3)}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <span className="hb-hrm-glow" aria-hidden="true" />
          <div className="hb-hrm-box">
            <div className="hb-hrm-area-wrap">
              <label htmlFor={`${id}-prompt`} className="hb-hrm-sr">
                Describe what you want to build
              </label>
              <textarea
                ref={areaRef}
                id={`${id}-prompt`}
                className="hb-hrm-area"
                rows={2}
                value={current}
                maxLength={maxLength}
                aria-describedby={`${id}-hint`}
                onChange={(e) => {
                  stopTyping();
                  setActive(null);
                  setText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    submit();
                  }
                }}
              />
              {empty && placeholders.length > 0 ? (
                <span key={phIndex} className="hb-hrm-ph" aria-hidden="true">
                  {placeholders[phIndex % placeholders.length]}
                </span>
              ) : null}
            </div>
            <div className="hb-hrm-bar">
              <span id={`${id}-hint`} className="hb-hrm-hint">
                <kbd>Enter</kbd> to send
                <kbd>Shift</kbd>
                <kbd>Enter</kbd> for a new line
              </span>
              <span className="hb-hrm-count" data-near={near ? "true" : undefined} aria-hidden="true">
                {current.length.toLocaleString("en-US")}/{maxLength.toLocaleString("en-US")}
              </span>
              <button
                type="submit"
                className="hb-hrm-send"
                aria-label="Send prompt"
                disabled={!sent && current.trim().length === 0}
                data-sent={sent ? "true" : undefined}
              >
                {sent ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <span className="hb-hrm-sr" aria-live="polite">
            {announce}
          </span>
        </form>

        {suggestions.length > 0 ? (
          <ul className="hb-hrm-chips hb-hrm-a" style={delay(4)} aria-label="Suggestions">
            {suggestions.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  className="hb-hrm-chip"
                  data-active={active === i ? "true" : undefined}
                  onClick={() => typeInto(s.prompt, i)}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.5l2.1 6.4 6.4 2.1-6.4 2.1L12 19.5l-2.1-6.4L3.5 11l6.4-2.1z" />
                  </svg>
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {primaryCta || secondaryCta ? (
          <div className="hb-hrm-actions hb-hrm-a" style={delay(5)}>
            {primaryCta ? (
              <a className="hb-hrm-btn" data-primary="true" href={primaryCta.href}>
                {primaryCta.label}
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-hrm-btn" href={secondaryCta.href}>
                {secondaryCta.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
