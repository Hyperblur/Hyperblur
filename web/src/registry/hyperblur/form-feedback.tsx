"use client";

import * as React from "react";

export interface FormFeedbackValues {
  rating: number;
  category: string;
  message: string;
  page?: string;
}

export interface FormFeedbackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "title"> {
  title?: string;
  categories?: string[];
  page?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  floating?: boolean;
  defaultRating?: number;
  accent?: string;
  delay?: number;
  onSubmit?: (values: FormFeedbackValues) => void | Promise<void>;
}

const moods = ["Frustrated", "Not great", "Okay", "Good", "Love it"];
const hues = ["#f0525f", "#f5864a", "#f5c542", "#9be15d", "#3ddc84"];

const css = `
.hb-xh7 {
  --hb-xh7-a: #3ddc84;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  width: 100%;
  max-width: 340px;
  margin-left: auto;
}
.hb-xh7 *, .hb-xh7 *::before, .hb-xh7 *::after { box-sizing: border-box; }
.hb-xh7[data-floating="true"] { position: fixed; right: 20px; bottom: 20px; z-index: 60; width: calc(100vw - 40px); max-height: calc(100dvh - 40px); }
.hb-xh7-panel {
  width: 100%;
  overflow: hidden;
  border: 1px solid #2a2a2a;
  border-radius: 18px;
  background: linear-gradient(180deg, #161616, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 60px -20px rgba(0,0,0,0.9);
  transform-origin: bottom right;
  animation: hb-xh7-open 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xh7-top { display: flex; align-items: center; justify-content: space-between; padding: 14px 14px 0 16px; }
.hb-xh7-title { margin: 0; font-size: 14px; font-weight: 600; letter-spacing: -0.01em; }
.hb-xh7-x { display: grid; place-items: center; width: 28px; height: 28px; border: 0; border-radius: 8px; background: transparent; color: #8a8a8a; cursor: pointer; transition: background 0.2s ease, color 0.2s ease; }
.hb-xh7-x:hover { background: #222; color: #fff; }
.hb-xh7-x:focus-visible { outline: 2px solid var(--hb-xh7-c); }
.hb-xh7-x svg { width: 14px; height: 14px; }
.hb-xh7-body { display: grid; gap: 12px; padding: 10px 16px 16px; }
.hb-xh7-mood { display: flex; align-items: center; gap: 14px; }
.hb-xh7-face { flex: none; width: 58px; height: 58px; }
.hb-xh7-face circle.hb-xh7-skin { fill: var(--hb-xh7-c); transition: fill 0.4s ease; }
.hb-xh7-face .hb-xh7-feat { fill: none; stroke: #121212; stroke-width: 3.2; stroke-linecap: round; transition: d 0.45s cubic-bezier(0.34, 1.4, 0.64, 1); }
.hb-xh7-face .hb-xh7-eye { fill: #121212; transition: ry 0.35s ease, cy 0.35s ease; }
.hb-xh7-face .hb-xh7-cheek { fill: #ff7aa2; opacity: var(--hb-xh7-ch); transition: opacity 0.4s ease; }
.hb-xh7-scale { flex: 1; display: grid; gap: 7px; min-width: 0; }
.hb-xh7-word { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; color: var(--hb-xh7-c); transition: color 0.4s ease; }
.hb-xh7-dots { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; }
.hb-xh7-dot { height: 8px; padding: 0; border: 0; border-radius: 999px; background: #262626; cursor: pointer; transition: background 0.3s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh7-dot[data-on="true"] { background: var(--hb-xh7-c); }
.hb-xh7-dot:hover { transform: scaleY(1.5); }
.hb-xh7-dot:focus-visible { outline: 2px solid var(--hb-xh7-c); outline-offset: 2px; }
.hb-xh7-cats { display: flex; gap: 6px; }
.hb-xh7-cat { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 30px; border: 1px solid #272727; border-radius: 9px; background: #121212; color: #a6a6a6; font: inherit; font-size: 12px; cursor: pointer; transition: all 0.2s ease; }
.hb-xh7-cat:hover { border-color: #383838; color: #e5e5e5; }
.hb-xh7-cat[aria-checked="true"] { border-color: color-mix(in srgb, var(--hb-xh7-c) 60%, #272727); color: #fff; background: color-mix(in srgb, var(--hb-xh7-c) 10%, #121212); }
.hb-xh7-cat:focus-visible { outline: 2px solid var(--hb-xh7-c); outline-offset: 1px; }
.hb-xh7-cat svg { width: 13px; height: 13px; }
.hb-xh7-area { width: 100%; height: 74px; padding: 9px 11px; border: 1px solid #272727; border-radius: 11px; background: #0b0b0b; color: #ededed; font: inherit; font-size: 13px; line-height: 1.45; resize: none; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.hb-xh7-area::placeholder { color: #545454; }
.hb-xh7-area:focus { border-color: var(--hb-xh7-c); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xh7-c) 18%, transparent); }
.hb-xh7-area[aria-invalid="true"] { border-color: #f05260; }
.hb-xh7-err { margin: -6px 0 0; font-size: 11.5px; color: #ff8a95; }
.hb-xh7-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.hb-xh7-page { display: inline-flex; align-items: center; gap: 7px; min-width: 0; font-size: 11.5px; color: #7a7a7a; cursor: pointer; }
.hb-xh7-page input { width: 14px; height: 14px; margin: 0; accent-color: var(--hb-xh7-c); }
.hb-xh7-page code { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; color: #a1a1a1; }
.hb-xh7-send { flex: none; display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 13px; border: 0; border-radius: 9px; background: #f2f2f2; color: #0a0a0a; font: inherit; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), background 0.2s ease; }
.hb-xh7-send:hover { background: #fff; }
.hb-xh7-send:active { transform: scale(0.96); }
.hb-xh7-send:focus-visible { outline: 2px solid var(--hb-xh7-c); outline-offset: 2px; }
.hb-xh7-spin { width: 12px; height: 12px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.2); border-top-color: #0a0a0a; animation: hb-xh7-rot 0.7s linear infinite; }
.hb-xh7-done { display: grid; justify-items: center; gap: 8px; padding: 8px 18px 22px; text-align: center; }
.hb-xh7-done .hb-xh7-face { width: 72px; height: 72px; animation: hb-xh7-bounce 0.7s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh7-done h4 { margin: 4px 0 0; font-size: 15px; font-weight: 600; }
.hb-xh7-done p { margin: 0; font-size: 12.5px; color: #8f8f8f; line-height: 1.5; }
.hb-xh7-launch { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 16px 0 12px; border: 1px solid #2c2c2c; border-radius: 999px; background: linear-gradient(180deg, #1c1c1c, #141414); color: #ededed; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 10px 24px -10px rgba(0,0,0,0.9); transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease; animation: hb-xh7-open 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh7-launch:hover { transform: translateY(-2px); border-color: #3a3a3a; }
.hb-xh7-launch:focus-visible { outline: 2px solid var(--hb-xh7-a); outline-offset: 2px; }
.hb-xh7-launch svg { width: 20px; height: 20px; }
@keyframes hb-xh7-open { from { opacity: 0; transform: translateY(10px) scale(0.94); } to { opacity: 1; transform: none; } }
@keyframes hb-xh7-rot { to { transform: rotate(360deg); } }
@keyframes hb-xh7-bounce { 0% { transform: scale(0.5) rotate(-20deg); } 100% { transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xh7 *, .hb-xh7 *::before, .hb-xh7 *::after { animation: none !important; transition: none !important; }
}
`;

function Face({ rating }: { rating: number }) {
  const t = (rating - 1) / 4;
  const curve = (-9 + t * 21).toFixed(1);
  const mouthY = (44 - t * 2).toFixed(1);
  const mouth = `M19 ${mouthY} Q32 ${(Number(mouthY) + Number(curve)).toFixed(1)} 45 ${mouthY}`;
  const browTilt = ((1 - t) * 4).toFixed(1);
  const browL = `M17 ${(21 - Number(browTilt)).toFixed(1)} L26 ${(22 + Number(browTilt) * 0.4).toFixed(1)}`;
  const browR = `M38 ${(22 + Number(browTilt) * 0.4).toFixed(1)} L47 ${(21 - Number(browTilt)).toFixed(1)}`;
  const eyeRy = rating === 5 ? 1.6 : 3.4;
  return (
    <svg className="hb-xh7-face" viewBox="0 0 64 64" aria-hidden="true" style={{ "--hb-xh7-ch": rating >= 4 ? 0.55 : 0 } as React.CSSProperties}>
      <circle className="hb-xh7-skin" cx="32" cy="32" r="30" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <ellipse className="hb-xh7-cheek" cx="15" cy="38" rx="5" ry="3" />
      <ellipse className="hb-xh7-cheek" cx="49" cy="38" rx="5" ry="3" />
      <ellipse className="hb-xh7-eye" cx="23" cy="29" rx="3" ry={eyeRy} />
      <ellipse className="hb-xh7-eye" cx="41" cy="29" rx="3" ry={eyeRy} />
      <path className="hb-xh7-feat" d={browL} style={{ d: `path("${browL}")` } as React.CSSProperties} opacity={rating <= 2 ? 1 : 0} />
      <path className="hb-xh7-feat" d={browR} style={{ d: `path("${browR}")` } as React.CSSProperties} opacity={rating <= 2 ? 1 : 0} />
      <path className="hb-xh7-feat" d={mouth} style={{ d: `path("${mouth}")` } as React.CSSProperties} />
    </svg>
  );
}

const catIcons: Record<string, React.ReactNode> = {
  Bug: <path d="M8 5a3 3 0 0 1 3 3v2a3 3 0 0 1-6 0V8a3 3 0 0 1 3-3Zm0 0V3M5 9H2.5M13.5 9H11M5.5 12.5l-2 1.5M10.5 12.5l2 1.5M5.5 6 3.5 4.5M10.5 6l2-1.5" />,
  Idea: <path d="M6 13h4M6.5 15h3M8 1.5a4.5 4.5 0 0 0-2.6 8.2c.4.3.6.7.6 1.2V11h4v-.1c0-.5.2-.9.6-1.2A4.5 4.5 0 0 0 8 1.5Z" />,
  Praise: <path d="M8 14s-5.5-3.2-5.5-7A3 3 0 0 1 8 5a3 3 0 0 1 5.5 2c0 3.8-5.5 7-5.5 7Z" />,
};

export function FormFeedback({
  title = "Share feedback",
  categories = ["Bug", "Idea", "Praise"],
  page = "/dashboard/reports",
  open,
  defaultOpen = false,
  onOpenChange,
  floating = false,
  defaultRating = 4,
  accent = "#3ddc84",
  delay = 800,
  onSubmit,
  className,
  style,
  ...rest
}: FormFeedbackProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = open ?? inner;
  const [rating, setRating] = React.useState(Math.min(5, Math.max(1, defaultRating)));
  const [category, setCategory] = React.useState(categories[1] ?? categories[0] ?? "");
  const [message, setMessage] = React.useState("");
  const [attach, setAttach] = React.useState(true);
  const [tried, setTried] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle");
  const launcher = React.useRef<HTMLButtonElement>(null);
  const area = React.useRef<HTMLTextAreaElement>(null);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const setOpen = (next: boolean) => {
    if (open === undefined) setInner(next);
    onOpenChange?.(next);
    if (!next) window.requestAnimationFrame(() => launcher.current?.focus());
  };

  const color = hues[rating - 1];
  const error = message.trim().length < 10 ? "Add a sentence or two so we can act on it." : "";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (error) {
      setTried(true);
      area.current?.focus();
      return;
    }
    setStatus("sending");
    try {
      await Promise.all([
        Promise.resolve(onSubmit?.({ rating, category, message: message.trim(), page: attach ? page : undefined })),
        new Promise((r) => window.setTimeout(r, delay)),
      ]);
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  };

  const reset = () => {
    setStatus("idle");
    setMessage("");
    setTried(false);
  };

  return (
    <div
      className={["hb-xh7", className].filter(Boolean).join(" ")}
      data-floating={floating}
      style={{ ...style, "--hb-xh7-a": accent, "--hb-xh7-c": color } as React.CSSProperties}
      onKeyDown={(e) => { if (e.key === "Escape" && isOpen) setOpen(false); }}
      {...rest}
    >
      <style href="hb-form-feedback" precedence="default">{css}</style>
      {isOpen ? (
        <div className="hb-xh7-panel" role="dialog" aria-labelledby={`${uid}-t`}>
          <div className="hb-xh7-top">
            <h3 className="hb-xh7-title" id={`${uid}-t`}>{title}</h3>
            <button type="button" className="hb-xh7-x" aria-label="Close feedback" onClick={() => { setOpen(false); if (status === "sent") reset(); }}>
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m3 3 8 8M11 3l-8 8" /></svg>
            </button>
          </div>
          {status === "sent" ? (
            <div className="hb-xh7-done" role="status" style={{ "--hb-xh7-c": hues[4] } as React.CSSProperties}>
              <Face rating={5} />
              <h4>Thanks, it is on our board.</h4>
              <p>Your {category.toLowerCase()} note reached the team that owns this page.</p>
              <button type="button" className="hb-xh7-send" onClick={reset}>Send another</button>
            </div>
          ) : (
            <form className="hb-xh7-body" onSubmit={submit} noValidate>
              <div className="hb-xh7-mood">
                <Face rating={rating} />
                <div className="hb-xh7-scale">
                  <span className="hb-xh7-word" aria-live="polite">{moods[rating - 1]}</span>
                  <div className="hb-xh7-dots" role="radiogroup" aria-label="How do you feel about this page?">
                    {moods.map((m, i) => (
                      <button
                        key={m}
                        type="button"
                        role="radio"
                        aria-checked={rating === i + 1}
                        aria-label={m}
                        tabIndex={rating === i + 1 ? 0 : -1}
                        className="hb-xh7-dot"
                        data-on={i < rating}
                        onClick={() => setRating(i + 1)}
                        onKeyDown={(e) => {
                          const d = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 0;
                          if (!d) return;
                          e.preventDefault();
                          const next = Math.min(5, Math.max(1, rating + d));
                          setRating(next);
                          const group = e.currentTarget.parentElement;
                          window.requestAnimationFrame(() => (group?.children[next - 1] as HTMLElement | undefined)?.focus());
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="hb-xh7-cats" role="radiogroup" aria-label="Type of feedback">
                {categories.map((c) => (
                  <button key={c} type="button" role="radio" aria-checked={category === c} className="hb-xh7-cat" onClick={() => setCategory(c)}>
                    {catIcons[c] ? (
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{catIcons[c]}</svg>
                    ) : null}
                    {c}
                  </button>
                ))}
              </div>
              <textarea
                ref={area}
                className="hb-xh7-area"
                aria-label="Your feedback"
                placeholder={category === "Bug" ? "What happened, and what did you expect?" : category === "Praise" ? "What made your day?" : "What would make this page better?"}
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                aria-invalid={tried && error ? true : undefined}
                aria-describedby={tried && error ? `${uid}-e` : undefined}
              />
              {tried && error ? <p className="hb-xh7-err" id={`${uid}-e`}>{error}</p> : null}
              <div className="hb-xh7-foot">
                <label className="hb-xh7-page">
                  <input type="checkbox" checked={attach} onChange={(e) => setAttach(e.target.checked)} />
                  <code>{page}</code>
                </label>
                <button type="submit" className="hb-xh7-send" aria-busy={status === "sending"}>
                  {status === "sending" ? <span className="hb-xh7-spin" aria-hidden="true" /> : null}
                  {status === "sending" ? "Sending" : "Send"}
                </button>
              </div>
            </form>
          )}
        </div>
      ) : null}
      <button ref={launcher} type="button" className="hb-xh7-launch" aria-expanded={isOpen} onClick={() => setOpen(!isOpen)}>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="9" fill={color} />
          <circle cx="7" cy="8.5" r="1.2" fill="#121212" />
          <circle cx="13" cy="8.5" r="1.2" fill="#121212" />
          <path d="M6.5 12.2q3.5 3 7 0" fill="none" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {isOpen ? "Close" : "Feedback"}
      </button>
    </div>
  );
}
