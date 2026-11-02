"use client";

import * as React from "react";

export interface CtaGradientCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  note?: string;
  onSubmit?: (email: string) => void | Promise<void>;
  accent?: string;
  accent2?: string;
}

const css = `
.hb-kc8 {
  --hb-kc8-accent: #a855f7;
  --hb-kc8-accent2: #f97316;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  isolation: isolate;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kc8 *, .hb-kc8 *::before, .hb-kc8 *::after { box-sizing: border-box; }
.hb-kc8-inner { max-width: 1120px; margin: 0 auto; padding: 64px 16px; }
.hb-kc8-border {
  position: relative;
  padding: 1.5px;
  border-radius: 28px;
  background: linear-gradient(115deg, var(--hb-kc8-accent), var(--hb-kc8-accent2), rgba(255, 255, 255, .14) 40%, rgba(255, 255, 255, .14) 60%, var(--hb-kc8-accent2), var(--hb-kc8-accent));
  background-size: 300% 100%;
  animation: hb-kc8-flow 8s linear infinite;
  box-shadow: 0 40px 120px -50px color-mix(in srgb, var(--hb-kc8-accent) 70%, transparent);
}
.hb-kc8-border::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: inherit;
  background-size: 300% 100%;
  filter: blur(24px);
  opacity: .35;
  animation: hb-kc8-flow 8s linear infinite;
}
.hb-kc8-card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 56px 22px 48px;
  border-radius: 27px;
  background:
    radial-gradient(60% 80% at 0% 0%, color-mix(in srgb, var(--hb-kc8-accent) 22%, transparent), transparent 60%),
    radial-gradient(50% 70% at 100% 100%, color-mix(in srgb, var(--hb-kc8-accent2) 18%, transparent), transparent 60%),
    #0c0c0e;
  text-align: center;
}
.hb-kc8-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: radial-gradient(rgba(255, 255, 255, .09) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(60% 60% at 50% 50%, #000, transparent);
  mask-image: radial-gradient(60% 60% at 50% 50%, #000, transparent);
}
.hb-kc8-shape { position: absolute; z-index: -1; pointer-events: none; animation: hb-kc8-float var(--hb-kc8-t, 9s) ease-in-out var(--hb-kc8-d, 0s) infinite alternate; }
.hb-kc8-ring { width: 120px; height: 120px; border: 2px solid color-mix(in srgb, var(--hb-kc8-accent) 60%, transparent); border-radius: 50%; }
.hb-kc8-cube {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--hb-kc8-accent2) 80%, #fff), var(--hb-kc8-accent2));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .5), 0 20px 40px -16px var(--hb-kc8-accent2);
  opacity: .85;
}
.hb-kc8-pill { width: 110px; height: 36px; border-radius: 999px; background: linear-gradient(90deg, var(--hb-kc8-accent), color-mix(in srgb, var(--hb-kc8-accent) 40%, #fff)); opacity: .7; }
.hb-kc8-orb { width: 22px; height: 22px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff, var(--hb-kc8-accent) 60%); box-shadow: 0 0 24px var(--hb-kc8-accent); }
.hb-kc8-plus { width: 22px; height: 22px; color: rgba(255, 255, 255, .5); }
.hb-kc8-tri { width: 54px; height: 54px; color: color-mix(in srgb, var(--hb-kc8-accent2) 70%, transparent); }
.hb-kc8-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 5px 12px 5px 5px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  color: #c9c9c9;
  font-size: 13px;
  font-weight: 550;
}
.hb-kc8-faces { display: inline-flex; }
.hb-kc8-faces i {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  margin-left: -6px;
  border: 2px solid #0c0c0e;
  border-radius: 50%;
  color: #fff;
  font-size: 8.5px;
  font-style: normal;
  font-weight: 700;
}
.hb-kc8-faces i:first-child { margin-left: 0; }
.hb-kc8-title {
  margin: 22px auto 0;
  max-width: 760px;
  font-size: clamp(32px, 6cqi, 60px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
}
.hb-kc8-title span {
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-kc8-accent) 60%, #fff), color-mix(in srgb, var(--hb-kc8-accent2) 70%, #fff));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-kc8-sub { margin: 18px auto 0; max-width: 520px; color: #9a9a9a; font-size: 16px; line-height: 1.6; text-wrap: pretty; }
.hb-kc8-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 460px;
  margin: 32px auto 0;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 18px;
  background: rgba(10, 10, 10, .7);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06);
  transition: border-color .25s ease, box-shadow .25s ease;
}
.hb-kc8-form:focus-within { border-color: color-mix(in srgb, var(--hb-kc8-accent) 60%, transparent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kc8-accent) 18%, transparent); }
.hb-kc8-input {
  flex: 1;
  min-width: 0;
  height: 46px;
  padding: 0 14px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #fff;
  font: inherit;
  font-size: 15px;
  outline: none;
}
.hb-kc8-input::placeholder { color: #6a6a6a; }
.hb-kc8-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  padding: 0 20px;
  overflow: hidden;
  border: 0;
  border-radius: 12px;
  background: #fff;
  color: #0a0a0a;
  font: inherit;
  font-size: 14.5px;
  font-weight: 650;
  white-space: nowrap;
  cursor: pointer;
  transition: transform .2s cubic-bezier(.2, .8, .2, 1), background-color .2s ease;
}
.hb-kc8-btn:hover { background: #f0f0f0; }
.hb-kc8-btn:active { transform: scale(.98); }
.hb-kc8-btn:focus-visible { outline: 2px solid var(--hb-kc8-accent); outline-offset: 2px; }
.hb-kc8-btn:disabled { cursor: progress; opacity: .8; }
.hb-kc8-btn svg { width: 15px; height: 15px; transition: transform .25s ease; }
.hb-kc8-btn:hover svg { transform: translateX(3px); }
.hb-kc8-done {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 460px;
  min-height: 60px;
  margin: 32px auto 0;
  padding: 0 18px;
  border: 1px solid color-mix(in srgb, var(--hb-kc8-accent) 50%, transparent);
  border-radius: 18px;
  background: color-mix(in srgb, var(--hb-kc8-accent) 12%, #0c0c0e);
  color: #fff;
  font-size: 15px;
  font-weight: 550;
  animation: hb-kc8-in .5s cubic-bezier(.3, 1.4, .5, 1);
}
.hb-kc8-done svg { flex: none; width: 20px; height: 20px; color: color-mix(in srgb, var(--hb-kc8-accent) 50%, #fff); }
.hb-kc8-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.hb-kc8-note { margin: 14px 0 0; color: #6f6f6f; font-size: 13px; }
@keyframes hb-kc8-flow { to { background-position: 300% 0; } }
@keyframes hb-kc8-float {
  from { transform: translate3d(0, 0, 0) rotate(var(--hb-kc8-r, 0deg)); }
  to { transform: translate3d(var(--hb-kc8-x, 0px), var(--hb-kc8-y, -18px), 0) rotate(calc(var(--hb-kc8-r, 0deg) + 14deg)); }
}
@keyframes hb-kc8-in {
  from { opacity: 0; transform: translateY(8px) scale(.98); }
  to { opacity: 1; transform: none; }
}
@container (min-width: 640px) {
  .hb-kc8-inner { padding: 96px 32px; }
  .hb-kc8-card { padding: 88px 48px 72px; }
  .hb-kc8-form { flex-direction: row; align-items: center; }
}
@container (max-width: 639px) {
  .hb-kc8-shape[data-wide="true"] { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kc8-border, .hb-kc8-border::before, .hb-kc8-shape, .hb-kc8-done { animation: none; }
  .hb-kc8-form, .hb-kc8-btn, .hb-kc8-btn svg { transition: none; }
}
`;

const faces = [
  { i: "MR", c: "#7c5cff" },
  { i: "JS", c: "#0ea5a4" },
  { i: "AK", c: "#e2572b" },
  { i: "LT", c: "#2f7bff" },
];

function v(o: Record<string, string>) {
  return o as React.CSSProperties;
}

export function CtaGradientCard({
  eyebrow = "Joined by 18,000 product teams",
  title = "Your roadmap, finally in one calm place",
  subtitle = "Plan sprints, track releases and share progress with stakeholders without another status meeting. Free for teams up to ten.",
  placeholder = "you@company.com",
  buttonLabel = "Get early access",
  successMessage = "You are on the list. Check your inbox for a calendar invite.",
  note = "No credit card required. Unsubscribe in one click.",
  onSubmit,
  accent = "#a855f7",
  accent2 = "#f97316",
  className = "",
  style,
  ...rest
}: CtaGradientCardProps) {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "busy" | "done">("idle");
  const inputId = React.useId();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state !== "idle") return;
    setState("busy");
    try {
      await onSubmit?.(email.trim());
      setState("done");
    } catch {
      setState("idle");
    }
  };

  const words = title.split(" ");
  const head = words.slice(0, Math.max(1, words.length - 3)).join(" ");
  const tail = words.slice(Math.max(1, words.length - 3)).join(" ");

  const vars = { "--hb-kc8-accent": accent, "--hb-kc8-accent2": accent2, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kc8 ${className}`} style={vars} {...rest}>
      <style href="hb-cta-gradient-card" precedence="default">{css}</style>
      <div className="hb-kc8-inner">
        <div className="hb-kc8-border">
          <div className="hb-kc8-card">
            <span className="hb-kc8-shape hb-kc8-ring" data-wide="true" aria-hidden="true" style={v({ left: "-34px", top: "48px", "--hb-kc8-t": "10s", "--hb-kc8-y": "22px", "--hb-kc8-x": "10px" })} />
            <span className="hb-kc8-shape hb-kc8-cube" aria-hidden="true" style={v({ right: "8%", top: "36px", "--hb-kc8-r": "18deg", "--hb-kc8-t": "8s", "--hb-kc8-y": "20px" })} />
            <span className="hb-kc8-shape hb-kc8-pill" data-wide="true" aria-hidden="true" style={v({ left: "7%", bottom: "54px", "--hb-kc8-r": "-16deg", "--hb-kc8-t": "11s", "--hb-kc8-d": "-3s", "--hb-kc8-x": "14px" })} />
            <span className="hb-kc8-shape hb-kc8-orb" aria-hidden="true" style={v({ left: "16%", top: "26%", "--hb-kc8-t": "6s", "--hb-kc8-y": "-24px" })} />
            <span className="hb-kc8-shape hb-kc8-orb" data-wide="true" aria-hidden="true" style={v({ right: "18%", bottom: "26%", "--hb-kc8-t": "7s", "--hb-kc8-d": "-2s", "--hb-kc8-y": "18px" })} />
            <svg className="hb-kc8-shape hb-kc8-plus" viewBox="0 0 22 22" aria-hidden="true" style={v({ right: "26%", top: "18%", "--hb-kc8-t": "9s", "--hb-kc8-r": "0deg" })}>
              <path d="M11 3v16M3 11h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <svg className="hb-kc8-shape hb-kc8-plus" viewBox="0 0 22 22" aria-hidden="true" style={v({ left: "24%", bottom: "16%", "--hb-kc8-t": "12s", "--hb-kc8-d": "-5s" })}>
              <path d="M11 3v16M3 11h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <svg className="hb-kc8-shape hb-kc8-tri" data-wide="true" viewBox="0 0 54 54" aria-hidden="true" style={v({ right: "-10px", bottom: "40px", "--hb-kc8-r": "12deg", "--hb-kc8-t": "10s", "--hb-kc8-d": "-4s", "--hb-kc8-x": "-12px" })}>
              <path d="M27 6l22 40H5z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
            {eyebrow ? (
              <p className="hb-kc8-eyebrow">
                <span className="hb-kc8-faces" aria-hidden="true">
                  {faces.map((f) => (
                    <i key={f.i} style={{ background: f.c }}>{f.i}</i>
                  ))}
                </span>
                {eyebrow}
              </p>
            ) : null}
            <h2 className="hb-kc8-title">
              {head} <span>{tail}</span>
            </h2>
            {subtitle ? <p className="hb-kc8-sub">{subtitle}</p> : null}
            {state === "done" ? (
              <p className="hb-kc8-done" role="status">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6.5 10.3l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {successMessage}
              </p>
            ) : (
              <form className="hb-kc8-form" onSubmit={submit}>
                <label htmlFor={inputId} className="hb-kc8-sr">
                  Work email
                </label>
                <input
                  id={inputId}
                  className="hb-kc8-input"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="hb-kc8-btn" disabled={state === "busy"}>
                  {state === "busy" ? "Sending..." : buttonLabel}
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
            {note ? <p className="hb-kc8-note">{note}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
