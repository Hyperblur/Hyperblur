"use client";

import * as React from "react";

export interface CtaLivePreviewFormData {
  workspace: string;
  size: string;
  email: string;
}

export interface CtaLivePreviewFormProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  domain?: string;
  sizes?: { label: string; seats: number }[];
  pricePerSeat?: number;
  currency?: string;
  buttonLabel?: string;
  defaultWorkspace?: string;
  defaultEmail?: string;
  onSubmit?: (data: CtaLivePreviewFormData) => void | Promise<void>;
  accent?: string;
}

const css = `
.hb-wc6 {
  --hb-wc6-accent: #4f46e5;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  color: #111318;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc6 *, .hb-wc6 *::before, .hb-wc6 *::after { box-sizing: border-box; }
.hb-wc6-inner { display: grid; gap: 40px; max-width: 1180px; margin: 0 auto; padding: 72px 20px; }
.hb-wc6-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 16px; color: var(--hb-wc6-accent); font-size: 13px; font-weight: 650; letter-spacing: .02em; }
.hb-wc6-eyebrow span { display: inline-grid; place-items: center; width: 20px; height: 20px; border-radius: 6px; background: color-mix(in srgb, var(--hb-wc6-accent) 12%, #fff); }
.hb-wc6-eyebrow svg { width: 12px; height: 12px; }
.hb-wc6-title { margin: 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(32px, 5cqi, 52px); font-weight: 600; line-height: 1.04; letter-spacing: -.035em; text-wrap: balance; }
.hb-wc6-sub { margin: 16px 0 28px; max-width: 460px; color: #5b6070; font-size: 16px; line-height: 1.55; }
.hb-wc6-form { display: grid; gap: 16px; max-width: 460px; }
.hb-wc6-lab { display: grid; gap: 7px; color: #30343e; font-size: 13px; font-weight: 600; }
.hb-wc6-ctl { position: relative; display: flex; align-items: center; height: 46px; border: 1px solid #dfe1e7; border-radius: 11px; background: #fff; box-shadow: 0 1px 2px rgba(16, 24, 40, .05); transition: border-color .2s ease, box-shadow .2s ease; }
.hb-wc6-ctl:focus-within { border-color: var(--hb-wc6-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-wc6-accent) 15%, transparent); }
.hb-wc6-ctl[data-error="true"] { border-color: #e5484d; box-shadow: 0 0 0 4px rgba(229, 72, 77, .12); }
.hb-wc6-in { flex: 1; min-width: 0; height: 100%; padding: 0 14px; border: 0; background: transparent; color: #111318; font: inherit; font-size: 15px; font-weight: 450; outline: none; }
.hb-wc6-in::placeholder { color: #a0a4ae; }
.hb-wc6-suffix { padding: 0 14px 0 0; color: #8a8f9b; font-size: 14px; white-space: nowrap; }
.hb-wc6-seg { position: relative; display: grid; grid-template-columns: repeat(var(--hb-wc6-n), minmax(0, 1fr)); padding: 4px; border-radius: 11px; background: #f1f2f5; box-shadow: inset 0 1px 2px rgba(16, 24, 40, .06); }
.hb-wc6-thumb { position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc((100% - 8px) / var(--hb-wc6-n)); border-radius: 8px; background: #fff; box-shadow: 0 1px 3px rgba(16, 24, 40, .12), 0 0 0 1px rgba(16, 24, 40, .04); transform: translateX(calc(var(--hb-wc6-i) * 100%)); transition: transform .4s cubic-bezier(.3, 1.3, .5, 1); }
.hb-wc6-opt { position: relative; z-index: 1; height: 36px; border: 0; border-radius: 8px; background: none; color: #6b7080; font: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: color .2s ease; }
.hb-wc6-opt[aria-checked="true"] { color: #111318; }
.hb-wc6-opt:focus-visible { outline: 2px solid var(--hb-wc6-accent); outline-offset: -2px; }
.hb-wc6-err { margin: -8px 0 0; color: #d93036; font-size: 12.5px; }
.hb-wc6-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 10px; height: 48px; margin-top: 4px; border: 0; border-radius: 12px; background: #111318; color: #fff; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; overflow: hidden; box-shadow: 0 1px 0 rgba(255, 255, 255, .15) inset, 0 10px 24px -10px rgba(17, 19, 24, .6); transition: transform .15s ease, background .25s ease; }
.hb-wc6-btn::before { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, .22) 50%, transparent 70%); transform: translateX(-100%); transition: transform .7s ease; }
.hb-wc6-btn:hover::before { transform: translateX(100%); }
.hb-wc6-btn:active { transform: scale(.985); }
.hb-wc6-btn:focus-visible { outline: 2px solid var(--hb-wc6-accent); outline-offset: 3px; }
.hb-wc6-btn[data-busy="true"] { cursor: progress; background: #2a2d36; }
.hb-wc6-spin { width: 16px; height: 16px; border: 2px solid rgba(255, 255, 255, .3); border-top-color: #fff; border-radius: 50%; animation: hb-wc6-spin .7s linear infinite; }
.hb-wc6-fine { margin: 0; color: #8a8f9b; font-size: 12.5px; }
.hb-wc6-done { display: grid; gap: 10px; max-width: 460px; padding: 22px; border: 1px solid color-mix(in srgb, var(--hb-wc6-accent) 25%, #e6e7ec); border-radius: 16px; background: color-mix(in srgb, var(--hb-wc6-accent) 5%, #fff); animation: hb-wc6-pop .5s cubic-bezier(.2, .9, .3, 1.2); }
.hb-wc6-done b { font-size: 17px; }
.hb-wc6-done p { margin: 0; color: #5b6070; font-size: 14.5px; line-height: 1.5; }
.hb-wc6-done button { justify-self: start; padding: 0; border: 0; background: none; color: var(--hb-wc6-accent); font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; }
.hb-wc6-stage { position: relative; display: grid; place-items: center; padding: 28px 0; }
.hb-wc6-stage::before { content: ""; position: absolute; inset: 0; border-radius: 28px; background: radial-gradient(90% 80% at 70% 20%, color-mix(in srgb, var(--hb-wc6-accent) 18%, #fff), #f4f4f7 60%); background-color: #f4f4f7; }
.hb-wc6-stage::after { content: ""; position: absolute; inset: 0; border-radius: 28px; background-image: radial-gradient(rgba(17, 19, 24, .08) 1px, transparent 1px); background-size: 16px 16px; mask-image: radial-gradient(circle at 50% 50%, #000, transparent 75%); }
.hb-wc6-win { position: relative; z-index: 1; width: min(100% - 32px, 460px); border-radius: 16px; background: #fff; box-shadow: 0 0 0 1px rgba(16, 24, 40, .06), 0 30px 60px -24px rgba(16, 24, 40, .35), 0 12px 24px -16px rgba(16, 24, 40, .2); overflow: hidden; transform: perspective(1200px) rotateY(-6deg) rotateX(3deg); transition: transform .6s cubic-bezier(.2, .9, .3, 1); }
.hb-wc6-stage:hover .hb-wc6-win { transform: perspective(1200px) rotateY(0) rotateX(0); }
.hb-wc6-chrome { display: flex; align-items: center; gap: 10px; height: 38px; padding: 0 12px; border-bottom: 1px solid #eef0f3; background: #fafafb; }
.hb-wc6-dots { display: flex; gap: 5px; }
.hb-wc6-dots i { width: 9px; height: 9px; border-radius: 50%; background: #e2e4e9; font-style: normal; }
.hb-wc6-url { display: flex; align-items: center; gap: 6px; flex: 1; min-width: 0; height: 24px; padding: 0 10px; border-radius: 7px; background: #f0f1f4; color: #6b7080; font-family: var(--font-mono), monospace; font-size: 11.5px; overflow: hidden; white-space: nowrap; }
.hb-wc6-url svg { flex: none; width: 10px; height: 10px; }
.hb-wc6-url b { color: #111318; font-weight: 600; overflow: hidden; text-overflow: ellipsis; }
.hb-wc6-app { display: grid; grid-template-columns: 120px minmax(0, 1fr); min-height: 268px; }
.hb-wc6-side { display: grid; align-content: start; gap: 4px; padding: 12px 10px; border-right: 1px solid #eef0f3; background: #fbfbfc; }
.hb-wc6-ws { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; min-width: 0; }
.hb-wc6-av { display: grid; place-items: center; flex: none; width: 26px; height: 26px; border-radius: 8px; color: #fff; font-size: 11px; font-weight: 700; background: var(--hb-wc6-ws); transition: background .4s ease; }
.hb-wc6-wsn { min-width: 0; overflow: hidden; color: #111318; font-size: 12.5px; font-weight: 650; text-overflow: ellipsis; white-space: nowrap; }
.hb-wc6-nav { display: flex; align-items: center; gap: 7px; height: 26px; padding: 0 7px; border-radius: 6px; color: #6b7080; font-size: 11.5px; }
.hb-wc6-nav[data-on="true"] { background: #eef0f3; color: #111318; font-weight: 600; }
.hb-wc6-nav i { width: 10px; height: 10px; border-radius: 3px; border: 1.5px solid currentColor; font-style: normal; }
.hb-wc6-main { display: grid; align-content: start; gap: 12px; padding: 14px; }
.hb-wc6-hello { margin: 0; font-size: 15px; font-weight: 650; letter-spacing: -.01em; }
.hb-wc6-hello span { color: #8a8f9b; font-weight: 500; }
.hb-wc6-kpis { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.hb-wc6-kpi { padding: 10px; border: 1px solid #eef0f3; border-radius: 10px; }
.hb-wc6-kpi small { display: block; color: #8a8f9b; font-size: 10.5px; font-weight: 550; }
.hb-wc6-kpi b { display: block; margin-top: 2px; font-size: 18px; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-wc6-meter { height: 5px; margin-top: 8px; border-radius: 3px; background: #eef0f3; overflow: hidden; }
.hb-wc6-meter span { display: block; height: 100%; border-radius: inherit; background: var(--hb-wc6-accent); width: var(--hb-wc6-w); transition: width .6s cubic-bezier(.2, .9, .3, 1); }
.hb-wc6-mem { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border: 1px dashed #dfe1e7; border-radius: 10px; color: #6b7080; font-size: 11.5px; min-width: 0; }
.hb-wc6-mem[data-filled="true"] { border-style: solid; color: #111318; background: #fafafb; }
.hb-wc6-mem span:nth-child(2) { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-wc6-mav { display: grid; place-items: center; flex: none; width: 22px; height: 22px; border-radius: 50%; background: #e9eaef; color: #4b5060; font-size: 10px; font-weight: 700; }
.hb-wc6-role { padding: 2px 7px; border-radius: 999px; background: color-mix(in srgb, var(--hb-wc6-accent) 12%, #fff); color: var(--hb-wc6-accent); font-size: 10px; font-weight: 650; }
.hb-wc6-live { position: absolute; top: 9px; right: 12px; display: inline-flex; align-items: center; gap: 6px; padding: 3px 8px; border-radius: 999px; background: #e7f8ef; color: #12804a; font-size: 10.5px; font-weight: 700; animation: hb-wc6-pop .5s cubic-bezier(.2, .9, .3, 1.3); }
.hb-wc6-live::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #18a058; }
.hb-wc6-sync { position: absolute; z-index: 2; bottom: 6px; left: 50%; display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px; background: #111318; color: #fff; font-size: 11px; font-weight: 600; transform: translateX(-50%); box-shadow: 0 8px 20px -8px rgba(17, 19, 24, .6); }
.hb-wc6-sync i { width: 6px; height: 6px; border-radius: 50%; background: #34d399; font-style: normal; animation: hb-wc6-blink 1.2s ease-in-out infinite; }
.hb-wc6-flash { animation: hb-wc6-flash .5s ease; }
@keyframes hb-wc6-spin { to { transform: rotate(360deg); } }
@keyframes hb-wc6-pop { from { opacity: 0; transform: translateY(6px) scale(.96); } }
@keyframes hb-wc6-blink { 50% { opacity: .3; } }
@keyframes hb-wc6-flash { 0% { background: color-mix(in srgb, var(--hb-wc6-accent) 22%, transparent); } 100% { background: transparent; } }
@container (min-width: 800px) {
  .hb-wc6-inner { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 56px; align-items: center; padding: 104px 40px; }
  .hb-wc6-stage { padding: 48px 0; }
  .hb-wc6-app { grid-template-columns: 140px minmax(0, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc6 *, .hb-wc6 *::before, .hb-wc6 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultSizes = [
  { label: "1-10", seats: 8 },
  { label: "11-50", seats: 32 },
  { label: "51-200", seats: 120 },
  { label: "200+", seats: 260 },
];

const palette = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#8b5cf6", "#14b8a6"];

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 28);
}

function initials(s: string) {
  const parts = s.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? parts[0][1] ?? "")).toUpperCase();
}

function tone(s: string) {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}

export function CtaLivePreviewForm({
  eyebrow = "Takes about 30 seconds",
  title = "Claim your workspace and watch it come alive.",
  subtitle = "Name it, pick a team size and invite yourself. The preview updates as you type, and everything you see is ready the moment you press create.",
  domain = "hollowpine.app",
  sizes = defaultSizes,
  pricePerSeat = 9,
  currency = "USD",
  buttonLabel = "Create workspace",
  defaultWorkspace = "Northwind Labs",
  defaultEmail = "",
  onSubmit,
  accent = "#4f46e5",
  className = "",
  style,
  ...rest
}: CtaLivePreviewFormProps) {
  const [workspace, setWorkspace] = React.useState(defaultWorkspace);
  const [size, setSize] = React.useState(0);
  const [email, setEmail] = React.useState(defaultEmail);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const segs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const id = React.useId();

  const slug = slugify(workspace) || "your-team";
  const seats = sizes[size]?.seats ?? 1;
  const price = new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(seats * pricePerSeat);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!workspace.trim()) {
      setError("Give your workspace a name.");
      return;
    }
    if (!validEmail) {
      setError("Enter a valid work email.");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      await onSubmit?.({ workspace: workspace.trim(), size: sizes[size]?.label ?? "", email });
      await new Promise((r) => setTimeout(r, 700));
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const segKey = (e: React.KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % sizes.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + sizes.length) % sizes.length;
    else return;
    e.preventDefault();
    setSize(n);
    segs.current[n]?.focus();
  };

  const vars = { "--hb-wc6-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-wc6 ${className}`} style={vars} {...rest}>
      <style href="hb-cta-live-preview-form" precedence="default">{css}</style>
      <div className="hb-wc6-inner">
        <div>
          <p className="hb-wc6-eyebrow">
            <span aria-hidden="true">
              <svg viewBox="0 0 12 12">
                <path d="M6.5 1L2.5 7h3l-.5 4 4-6h-3z" fill="currentColor" />
              </svg>
            </span>
            {eyebrow}
          </p>
          <h2 className="hb-wc6-title">{title}</h2>
          <p className="hb-wc6-sub">{subtitle}</p>
          {done ? (
            <div className="hb-wc6-done" role="status">
              <b>{workspace.trim()} is live.</b>
              <p>
                We sent a sign-in link to {email}. Your workspace lives at {slug}.{domain}.
              </p>
              <button type="button" onClick={() => setDone(false)}>
                Edit details
              </button>
            </div>
          ) : (
            <form className="hb-wc6-form" onSubmit={submit} noValidate>
              <label className="hb-wc6-lab" htmlFor={`${id}-w`}>
                Workspace name
                <span className="hb-wc6-ctl" data-error={error && !workspace.trim() ? "true" : "false"}>
                  <input id={`${id}-w`} className="hb-wc6-in" value={workspace} maxLength={40} placeholder="Acme Inc." onChange={(e) => setWorkspace(e.target.value)} />
                  <span className="hb-wc6-suffix">.{domain}</span>
                </span>
              </label>
              <div className="hb-wc6-lab">
                <span id={`${id}-s`}>Team size</span>
                <div className="hb-wc6-seg" role="radiogroup" aria-labelledby={`${id}-s`} style={{ "--hb-wc6-n": sizes.length, "--hb-wc6-i": size } as React.CSSProperties}>
                  <span className="hb-wc6-thumb" aria-hidden="true" />
                  {sizes.map((s, i) => (
                    <button
                      key={s.label}
                      ref={(el) => {
                        segs.current[i] = el;
                      }}
                      type="button"
                      role="radio"
                      aria-checked={size === i}
                      tabIndex={size === i ? 0 : -1}
                      className="hb-wc6-opt"
                      onClick={() => setSize(i)}
                      onKeyDown={(e) => segKey(e, i)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="hb-wc6-lab" htmlFor={`${id}-e`}>
                Work email
                <span className="hb-wc6-ctl" data-error={error && workspace.trim() && !validEmail ? "true" : "false"}>
                  <input id={`${id}-e`} className="hb-wc6-in" type="email" value={email} placeholder="maya@northwind.com" onChange={(e) => setEmail(e.target.value)} />
                </span>
              </label>
              {error ? (
                <p className="hb-wc6-err" role="alert">
                  {error}
                </p>
              ) : null}
              <button className="hb-wc6-btn" type="submit" data-busy={busy ? "true" : "false"}>
                {busy ? <span className="hb-wc6-spin" aria-hidden="true" /> : null}
                {busy ? "Creating" : buttonLabel}
              </button>
              <p className="hb-wc6-fine">Free for 14 days, then {price} a month. Cancel anytime.</p>
            </form>
          )}
        </div>
        <div className="hb-wc6-stage" aria-label="Live workspace preview" role="img">
          <div className="hb-wc6-win">
            <div className="hb-wc6-chrome">
              <span className="hb-wc6-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="hb-wc6-url">
                <svg viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M2.5 4.5V3a2.5 2.5 0 015 0v1.5M2 4.5h6v4.5H2z" fill="none" stroke="currentColor" strokeWidth="1.1" />
                </svg>
                <b key={slug} className="hb-wc6-flash">{slug}</b>.{domain}
              </span>
            </div>
            {done ? <span className="hb-wc6-live">Live</span> : null}
            <div className="hb-wc6-app">
              <div className="hb-wc6-side">
                <div className="hb-wc6-ws">
                  <span className="hb-wc6-av" style={{ "--hb-wc6-ws": tone(workspace) } as React.CSSProperties}>{initials(workspace || "Your team")}</span>
                  <span className="hb-wc6-wsn">{workspace.trim() || "Your team"}</span>
                </div>
                {["Home", "Projects", "Inbox", "Reports", "Settings"].map((n, i) => (
                  <span key={n} className="hb-wc6-nav" data-on={i === 0 ? "true" : "false"}>
                    <i aria-hidden="true" />
                    {n}
                  </span>
                ))}
              </div>
              <div className="hb-wc6-main">
                <p className="hb-wc6-hello">
                  Welcome aboard <span>· day 1</span>
                </p>
                <div className="hb-wc6-kpis">
                  <div className="hb-wc6-kpi">
                    <small>Seats</small>
                    <b key={seats} className="hb-wc6-flash">{seats}</b>
                    <div className="hb-wc6-meter">
                      <span style={{ "--hb-wc6-w": `${Math.min(100, (seats / 260) * 100).toFixed(0)}%` } as React.CSSProperties} />
                    </div>
                  </div>
                  <div className="hb-wc6-kpi">
                    <small>After trial</small>
                    <b key={price} className="hb-wc6-flash">{price}</b>
                    <div className="hb-wc6-meter">
                      <span style={{ "--hb-wc6-w": done ? "100%" : "18%" } as React.CSSProperties} />
                    </div>
                  </div>
                </div>
                <div className="hb-wc6-mem" data-filled={email ? "true" : "false"}>
                  <span className="hb-wc6-mav">{email ? email[0].toUpperCase() : "+"}</span>
                  <span>{email || "Your email appears here"}</span>
                  <span className="hb-wc6-role">Owner</span>
                </div>
                <div className="hb-wc6-mem">
                  <span className="hb-wc6-mav">+</span>
                  <span>Invite {Math.max(0, seats - 1)} teammates</span>
                </div>
              </div>
            </div>
          </div>
          <span className="hb-wc6-sync" aria-hidden="true">
            <i />
            Live preview
          </span>
        </div>
      </div>
    </section>
  );
}
