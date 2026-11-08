"use client";

import * as React from "react";

export interface AuthSocialOrbitProvider {
  id: string;
  label: string;
  tint?: string;
  icon?: React.ReactNode;
}

export interface AuthSocialOrbitProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  brand?: string;
  title?: string;
  subtitle?: string;
  providers?: AuthSocialOrbitProvider[];
  lastUsed?: string | null;
  speed?: number;
  terms?: { label: string; href: string };
  onProvider?: (id: string) => boolean | void | Promise<boolean | void>;
  onEmail?: (email: string) => void;
}

const css = `
.hb-vf6 {
  --hb-vf6-tint: #e5e5e5;
  --hb-vf6-dur: 48s;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  display: grid;
  place-items: center;
  padding: 44px 20px;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
}
.hb-vf6 *, .hb-vf6 *::before, .hb-vf6 *::after { box-sizing: border-box; }
.hb-vf6::before { content: ""; position: absolute; left: 50%; top: 30%; width: 520px; height: 520px; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--hb-vf6-tint) 12%, transparent), transparent 62%); transition: background .6s; pointer-events: none; }
.hb-vf6-card { position: relative; width: 100%; max-width: 400px; text-align: center; }
.hb-vf6-ring { position: relative; width: 268px; height: 268px; margin: 0 auto 8px; }
.hb-vf6-track { position: absolute; inset: 24px; border-radius: 50%; border: 1px dashed #262626; }
.hb-vf6-track::after { content: ""; position: absolute; inset: 44px; border-radius: 50%; border: 1px solid #1a1a1a; }
.hb-vf6-orbit { position: absolute; inset: 0; animation: hb-vf6-turn var(--hb-vf6-dur) linear infinite; }
.hb-vf6-ring:hover .hb-vf6-orbit, .hb-vf6-ring:focus-within .hb-vf6-orbit, .hb-vf6-ring:hover .hb-vf6-spin, .hb-vf6-ring:focus-within .hb-vf6-spin, .hb-vf6[data-status="busy"] .hb-vf6-orbit, .hb-vf6[data-status="busy"] .hb-vf6-spin { animation-play-state: paused; }
.hb-vf6-beam { position: absolute; left: 50%; top: 50%; width: 2px; height: 110px; margin-left: -1px; transform-origin: 50% 0; background: linear-gradient(180deg, transparent 30%, var(--hb-vf6-tint)); opacity: .75; border-radius: 2px; transition: transform .55s cubic-bezier(.3,1.3,.5,1), background .5s; }
.hb-vf6-slot { position: absolute; left: 50%; top: 50%; width: 0; height: 0; }
.hb-vf6-spin { position: absolute; left: -26px; top: -26px; width: 52px; height: 52px; animation: hb-vf6-unturn var(--hb-vf6-dur) linear infinite; }
.hb-vf6-prov { position: relative; width: 52px; height: 52px; border-radius: 16px; display: grid; place-items: center; border: 1px solid #262626; background: linear-gradient(180deg, #171717, #101010); color: #cfcfcf; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 10px 24px -12px rgba(0,0,0,.9); transition: transform .45s cubic-bezier(.3,1.5,.5,1), border-color .3s, color .3s, box-shadow .4s; }
.hb-vf6-prov:hover, .hb-vf6-prov[data-active="true"] { color: #fff; border-color: color-mix(in srgb, var(--hb-vf6-c) 60%, #262626); transform: scale(1.14); box-shadow: inset 0 1px 0 rgba(255,255,255,.1), 0 0 0 4px color-mix(in srgb, var(--hb-vf6-c) 14%, transparent), 0 14px 30px -10px color-mix(in srgb, var(--hb-vf6-c) 50%, transparent); }
.hb-vf6-prov:focus-visible { outline: 2px solid var(--hb-vf6-c); outline-offset: 4px; }
.hb-vf6-last { position: absolute; left: 50%; bottom: -9px; transform: translateX(-50%); white-space: nowrap; height: 16px; padding: 0 6px; border-radius: 999px; font-size: 9.5px; font-weight: 600; line-height: 16px; color: #0a0a0a; background: #ededed; letter-spacing: .02em; }
.hb-vf6-core { position: absolute; left: 50%; top: 50%; width: 92px; height: 92px; margin: -46px 0 0 -46px; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle at 50% 30%, #1c1c1c, #0d0d0d 70%); border: 1px solid #262626; box-shadow: 0 0 0 8px #0a0a0a, 0 0 50px -10px color-mix(in srgb, var(--hb-vf6-tint) 50%, transparent); transition: box-shadow .5s; }
.hb-vf6-core::before { content: ""; position: absolute; inset: -5px; border-radius: 50%; background: conic-gradient(from 0deg, transparent, var(--hb-vf6-tint), transparent 40%); mask: radial-gradient(circle, transparent 47px, #000 48px); opacity: 0; transition: opacity .4s; }
.hb-vf6[data-status="busy"] .hb-vf6-core::before { opacity: 1; animation: hb-vf6-turn 1s linear infinite; }
.hb-vf6-core-in { position: absolute; display: grid; place-items: center; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.5,1); }
.hb-vf6-core-in[data-on="false"] { opacity: 0; transform: scale(.6); }
.hb-vf6-title { margin: 6px 0 0; font-size: 25px; letter-spacing: -.03em; line-height: 1.15; font-weight: 600; }
.hb-vf6-sub { margin: 8px auto 20px; max-width: 320px; color: #8f8f8f; font-size: 14px; line-height: 1.5; }
.hb-vf6-cta { position: relative; width: 100%; height: 50px; border: 0; border-radius: 14px; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; gap: 10px; font: inherit; font-size: 15px; font-weight: 600; color: #0a0a0a; background: #f2f2f2; cursor: pointer; box-shadow: inset 0 -2px 0 rgba(0,0,0,.08), 0 16px 36px -16px var(--hb-vf6-tint); transition: transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .5s, background .2s; }
.hb-vf6-cta:hover { background: #fff; }
.hb-vf6-cta:active { transform: scale(.985); }
.hb-vf6-cta:disabled { cursor: progress; }
.hb-vf6-cta:focus-visible, .hb-vf6-more:focus-visible, .hb-vf6-go:focus-visible, .hb-vf6-terms a:focus-visible { outline: 2px solid #ededed; outline-offset: 3px; }
.hb-vf6-label { display: inline-flex; align-items: center; gap: 10px; animation: hb-vf6-swap .4s cubic-bezier(.2,.8,.2,1) both; }
.hb-vf6-dots { display: inline-flex; gap: 4px; }
.hb-vf6-dots i { width: 5px; height: 5px; border-radius: 50%; background: currentColor; animation: hb-vf6-dot 1s ease-in-out infinite; }
.hb-vf6-dots i:nth-child(2) { animation-delay: .15s; }
.hb-vf6-dots i:nth-child(3) { animation-delay: .3s; }
.hb-vf6-more { margin-top: 14px; border: 0; background: none; color: #a1a1a1; font: inherit; font-size: 13.5px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; border-radius: 6px; transition: color .2s; }
.hb-vf6-more:hover { color: #ededed; }
.hb-vf6-more svg { transition: transform .35s cubic-bezier(.2,.8,.2,1); }
.hb-vf6-more[aria-expanded="true"] svg { transform: rotate(180deg); }
.hb-vf6-panel { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows .45s cubic-bezier(.2,.8,.2,1), opacity .3s; }
.hb-vf6-panel[data-open="true"] { grid-template-rows: 1fr; opacity: 1; }
.hb-vf6-panel > div { overflow: hidden; }
.hb-vf6-email { display: flex; gap: 8px; padding-top: 12px; }
.hb-vf6-input { flex: 1; min-width: 0; height: 44px; padding: 0 14px; border-radius: 12px; border: 1px solid #262626; background: #101010; color: #ededed; font: inherit; font-size: 14px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-vf6-input:focus { border-color: #5a5a5a; box-shadow: 0 0 0 4px rgba(255,255,255,.06); }
.hb-vf6-input[aria-invalid="true"] { border-color: #ef5f5f; }
.hb-vf6-go { width: 44px; height: 44px; flex: none; border-radius: 12px; border: 1px solid #262626; background: #171717; color: #ededed; display: grid; place-items: center; cursor: pointer; transition: background .2s; }
.hb-vf6-go:hover { background: #222; }
.hb-vf6-terms { margin: 18px 0 0; font-size: 12px; color: #6b6b6b; line-height: 1.5; }
.hb-vf6-terms a { color: #a1a1a1; text-decoration: none; border-bottom: 1px solid #333; }
@keyframes hb-vf6-turn { to { transform: rotate(360deg); } }
@keyframes hb-vf6-unturn { to { transform: rotate(-360deg); } }
@keyframes hb-vf6-swap { from { opacity: 0; transform: translateY(8px); filter: blur(4px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes hb-vf6-dot { 0%, 100% { opacity: .3; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vf6 *, .hb-vf6 *::before, .hb-vf6 *::after { animation: none !important; transition: none !important; }
}
`;

const glyphs: Record<string, React.ReactNode> = {
  google: <path d="M19.5 11h-7.2v2.8h4.2a4.6 4.6 0 1 1-1.4-4.9l2-2A7.4 7.4 0 1 0 19.6 12c0-.3 0-.7-.1-1Z" fill="currentColor" />,
  github: <g stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round"><circle cx="7" cy="5.5" r="2.2" /><circle cx="7" cy="18.5" r="2.2" /><circle cx="17" cy="8" r="2.2" /><path d="M7 7.7v8.6M17 10.2c0 4-6 3.5-9.2 6.5" /></g>,
  apple: <g fill="currentColor"><path d="M12 8.2c-3.6-1.6-7.2.4-7.2 5 0 4.2 2.9 7.8 5 7.8 1 0 1.4-.5 2.2-.5s1.2.5 2.2.5c2.1 0 5-3.6 5-7.8 0-4.6-3.6-6.6-7.2-5Z" /><path d="M12.4 7c-.1-2.2 1.4-3.8 3.6-4-.1 2.1-1.5 3.8-3.6 4Z" /></g>,
  microsoft: <g fill="currentColor"><rect x="4" y="4" width="7" height="7" rx="1.2" /><rect x="13" y="4" width="7" height="7" rx="1.2" opacity=".75" /><rect x="4" y="13" width="7" height="7" rx="1.2" opacity=".75" /><rect x="13" y="13" width="7" height="7" rx="1.2" opacity=".5" /></g>,
  x: <path d="M5 4.5 19 19.5M19 4.5 5 19.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
  slack: <path d="M9.5 4v16M14.5 4v16M4 9.5h16M4 14.5h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
};

const defaultProviders: AuthSocialOrbitProvider[] = [
  { id: "github", label: "GitHub", tint: "#d4d4d8" },
  { id: "google", label: "Google", tint: "#8ab4f8" },
  { id: "apple", label: "Apple", tint: "#f5f5f5" },
  { id: "microsoft", label: "Microsoft", tint: "#7dd3fc" },
  { id: "x", label: "X", tint: "#a3a3a3" },
  { id: "slack", label: "Slack", tint: "#e9a8ff" },
];

function Glyph({ p, size = 22 }: { p: AuthSocialOrbitProvider; size?: number }) {
  if (p.icon) return <>{p.icon}</>;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {glyphs[p.id] ?? <text x="12" y="16.5" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">{p.label.slice(0, 1)}</text>}
    </svg>
  );
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function AuthSocialOrbit({
  brand = "Kite",
  title = "One tap and you are in",
  subtitle = "Pick the account you already use. We only read your name, email and avatar.",
  providers = defaultProviders,
  lastUsed = "github",
  speed = 48,
  terms = { label: "Terms and Privacy Policy", href: "#terms" },
  onProvider,
  onEmail,
  className,
  style,
  ...rest
}: AuthSocialOrbitProps) {
  const id = React.useId();
  const startIndex = Math.max(0, providers.findIndex((p) => p.id === lastUsed));
  const [active, setActive] = React.useState(startIndex);
  const [status, setStatus] = React.useState<"idle" | "busy" | "done">("idle");
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailTouched, setEmailTouched] = React.useState(false);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const current = providers[Math.min(active, providers.length - 1)];
  const step = 360 / Math.max(1, providers.length);
  const radius = 110;

  const go = async (index: number) => {
    if (status === "busy") return;
    setActive(index);
    setStatus("busy");
    try {
      const p = providers[index];
      const r = onProvider ? await onProvider(p.id) : await new Promise<boolean>((res) => setTimeout(() => res(true), 1400));
      setStatus(r === false ? "idle" : "done");
    } catch {
      setStatus("idle");
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = providers.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    if (!isEmail(email)) return;
    onEmail?.(email.trim());
  };

  return (
    <section
      className={["hb-vf6", className].filter(Boolean).join(" ")}
      data-status={status}
      style={{ "--hb-vf6-tint": current?.tint ?? "#e5e5e5", "--hb-vf6-dur": `${speed}s`, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-auth-social-orbit" precedence="default">{css}</style>
      <div className="hb-vf6-card">
        <div className="hb-vf6-ring">
          <div className="hb-vf6-track" aria-hidden="true" />
          <div className="hb-vf6-orbit">
            <span className="hb-vf6-beam" aria-hidden="true" style={{ transform: `rotate(${(active * step + 180).toFixed(2)}deg)` }} />
            <div role="group" aria-label={`Sign in to ${brand} with`}>
              {providers.map((p, i) => {
                const a = i * step;
                const x = (Math.sin((a * Math.PI) / 180) * radius).toFixed(2);
                const y = (-Math.cos((a * Math.PI) / 180) * radius).toFixed(2);
                return (
                  <div key={p.id} className="hb-vf6-slot" style={{ transform: `translate(${x}px, ${y}px)` }}>
                    <div className="hb-vf6-spin">
                      <button
                        ref={(el) => { refs.current[i] = el; }}
                        type="button"
                        className="hb-vf6-prov"
                        data-active={i === active}
                        tabIndex={i === active ? 0 : -1}
                        aria-label={`Continue with ${p.label}${p.id === lastUsed ? ", last used" : ""}`}
                        style={{ "--hb-vf6-c": p.tint ?? "#e5e5e5" } as React.CSSProperties}
                        onMouseEnter={() => status !== "busy" && setActive(i)}
                        onFocus={() => status !== "busy" && setActive(i)}
                        onClick={() => go(i)}
                        onKeyDown={(e) => onKey(e, i)}
                      >
                        <Glyph p={p} />
                        {p.id === lastUsed ? <span className="hb-vf6-last" aria-hidden="true">LAST</span> : null}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hb-vf6-core" aria-hidden="true">
            <span className="hb-vf6-core-in" data-on={status !== "done"}>
              <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
                <path d="M20 4 34 20 20 36 6 20Z" stroke="#ededed" strokeWidth="2" strokeLinejoin="round" />
                <path d="M20 4v32M6 20h28" stroke="var(--hb-vf6-tint)" strokeWidth="1.6" />
              </svg>
            </span>
            <span className="hb-vf6-core-in" data-on={status === "done"}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M5 12.5 10 17l9-10" stroke="var(--hb-vf6-tint)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
        </div>
        <h2 className="hb-vf6-title">{status === "done" ? `Connected with ${current.label}` : title}</h2>
        <p className="hb-vf6-sub" aria-live="polite">{status === "done" ? `Taking you to ${brand}. This window will close on its own.` : subtitle}</p>
        <button type="button" className="hb-vf6-cta" onClick={() => go(active)} disabled={status !== "idle"} aria-busy={status === "busy"}>
          <span key={`${current.id}-${status}`} className="hb-vf6-label">
            <Glyph p={current} size={18} />
            {status === "busy" ? <>Opening {current.label} <span className="hb-vf6-dots" aria-hidden="true"><i /><i /><i /></span></> : status === "done" ? "Redirecting" : `Continue with ${current.label}`}
          </span>
        </button>
        <button type="button" className="hb-vf6-more" aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpen((o) => !o)}>
          Use email instead
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div id={`${id}-panel`} className="hb-vf6-panel" data-open={open}>
          <div>
            <form className="hb-vf6-email" onSubmit={submitEmail} noValidate>
              <input className="hb-vf6-input" type="email" placeholder="you@company.com" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} tabIndex={open ? 0 : -1} aria-invalid={emailTouched && !isEmail(email) ? true : undefined} />
              <button type="submit" className="hb-vf6-go" aria-label="Continue with email" tabIndex={open ? 0 : -1}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </form>
          </div>
        </div>
        <p className="hb-vf6-terms">By continuing you agree to the {brand} <a href={terms.href}>{terms.label}</a>.</p>
      </div>
    </section>
  );
}
