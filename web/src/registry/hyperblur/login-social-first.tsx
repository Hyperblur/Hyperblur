"use client";

import * as React from "react";

export interface LoginSocialFirstLink {
  label: string;
  href: string;
}

export type LoginSocialFirstGlyph = "ring" | "square" | "triangle" | "hex" | "bolt" | "key";

export interface LoginSocialFirstProvider {
  id: string;
  label: string;
  glyph?: LoginSocialFirstGlyph;
  color?: string;
}

export interface LoginSocialFirstValues {
  email: string;
  password: string;
}

export interface LoginSocialFirstProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  title?: string;
  subtitle?: string;
  providers?: LoginSocialFirstProvider[];
  lastUsed?: string | null;
  onProviderClick?: (id: string) => void;
  onSubmit?: (values: LoginSocialFirstValues) => boolean | void | Promise<boolean | void>;
  signup?: LoginSocialFirstLink;
  terms?: LoginSocialFirstLink;
  privacy?: LoginSocialFirstLink;
  accent?: string;
}

const css = `
.hb-qh3 {
  --hb-qh3-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #fbfaf7;
  color: #15171c;
  font-family: inherit;
  padding: clamp(64px, 9cqw, 112px) 20px;
}
.hb-qh3 *, .hb-qh3 *::before, .hb-qh3 *::after { box-sizing: border-box; }
.hb-qh3::before { content: ""; position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(rgba(21,23,28,.12) 1px, transparent 1px); background-size: 22px 22px; mask: radial-gradient(ellipse 70% 60% at 50% 30%, #000, transparent 75%); }
.hb-qh3::after { content: ""; position: absolute; left: 50%; top: -30%; width: 70%; height: 70%; transform: translateX(-50%); pointer-events: none; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-qh3-accent) 14%, transparent), transparent); }
.hb-qh3-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
.hb-qh3-head { text-align: center; margin-bottom: 32px; }
.hb-qh3-logo { display: inline-grid; place-items: center; width: 44px; height: 44px; border-radius: 13px; background: #15171c; color: #fff; box-shadow: 0 10px 24px -10px rgba(21,23,28,.5); margin-bottom: 18px; }
.hb-qh3-title { margin: 0; font-size: clamp(28px, 4.2cqw, 40px); letter-spacing: -.03em; line-height: 1.08; font-weight: 600; }
.hb-qh3-sub { margin: 10px auto 0; max-width: 440px; color: #5f6470; font-size: 15px; line-height: 1.55; }
.hb-qh3-card { padding: 22px; border-radius: 22px; background: #fff; border: 1px solid rgba(21,23,28,.08); box-shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 1px 2px rgba(21,23,28,.04), 0 24px 60px -30px rgba(21,23,28,.25); }
.hb-qh3-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.hb-qh3-prov { position: relative; display: flex; align-items: center; gap: 10px; height: 50px; padding: 0 14px; border-radius: 13px; border: 1px solid rgba(21,23,28,.1); background: #fff; color: #15171c; font: inherit; font-size: 14px; font-weight: 500; cursor: pointer; text-align: left; opacity: 0; animation: hb-qh3-in .5s cubic-bezier(.2,.7,.2,1) forwards; transition: border-color .2s, box-shadow .2s, transform .2s, background .2s; }
.hb-qh3-prov:hover { border-color: rgba(21,23,28,.22); background: #fcfcfb; box-shadow: 0 8px 20px -12px rgba(21,23,28,.35); transform: translateY(-2px); }
.hb-qh3-prov:active { transform: translateY(0); }
.hb-qh3-prov:focus-visible, .hb-qh3-btn:focus-visible, .hb-qh3-link:focus-visible { outline: 2px solid var(--hb-qh3-accent); outline-offset: 2px; }
.hb-qh3-glyph { flex: none; display: grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; background: color-mix(in srgb, var(--hb-qh3-g) 12%, white); color: var(--hb-qh3-g); transition: transform .4s cubic-bezier(.3,1.6,.5,1); }
.hb-qh3-prov:hover .hb-qh3-glyph { transform: rotate(-12deg) scale(1.08); }
.hb-qh3-plabel { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qh3-last { margin-left: auto; flex: none; height: 20px; padding: 0 8px; border-radius: 999px; display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; color: var(--hb-qh3-accent); background: color-mix(in srgb, var(--hb-qh3-accent) 10%, white); }
.hb-qh3-prov[data-last="true"] { border-color: color-mix(in srgb, var(--hb-qh3-accent) 45%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qh3-accent) 10%, transparent); }
.hb-qh3-div { display: flex; align-items: center; gap: 14px; margin: 22px 0 18px; color: #8b8f99; font-size: 12px; letter-spacing: .04em; text-transform: uppercase; }
.hb-qh3-div::before, .hb-qh3-div::after { content: ""; flex: 1; height: 1px; background: rgba(21,23,28,.09); }
.hb-qh3-form { display: grid; gap: 12px; }
.hb-qh3-fields { display: grid; gap: 12px; }
.hb-qh3-label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500; color: #3a3e48; }
.hb-qh3-input { width: 100%; height: 46px; padding: 0 14px; border-radius: 12px; border: 1px solid rgba(21,23,28,.14); background: #fbfbfa; color: #15171c; font: inherit; font-size: 14px; outline: none; transition: border-color .2s, box-shadow .2s, background .2s; }
.hb-qh3-input::placeholder { color: #a3a7b0; }
.hb-qh3-input:focus { background: #fff; border-color: var(--hb-qh3-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-qh3-accent) 14%, transparent); }
.hb-qh3-input[aria-invalid="true"] { border-color: #e5484d; box-shadow: 0 0 0 4px rgba(229,72,77,.1); }
.hb-qh3-err { margin: 6px 0 0; font-size: 12px; color: #d1343a; }
.hb-qh3-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 46px; border: 0; border-radius: 12px; background: #15171c; color: #fff; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .2s, transform .2s; }
.hb-qh3-btn:hover { background: #262a33; }
.hb-qh3-btn:disabled { cursor: progress; }
.hb-qh3-btn svg { transition: transform .25s; }
.hb-qh3-btn:hover svg { transform: translateX(3px); }
.hb-qh3-spin { width: 15px; height: 15px; border-radius: 50%; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; animation: hb-qh3-turn .7s linear infinite; }
.hb-qh3-alert { margin: 0; padding: 10px 12px; border-radius: 10px; background: #fff1f1; color: #b4262c; font-size: 13px; border: 1px solid #ffd6d6; }
.hb-qh3-ok { display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 12px; background: color-mix(in srgb, var(--hb-qh3-accent) 8%, white); border: 1px solid color-mix(in srgb, var(--hb-qh3-accent) 25%, transparent); font-size: 14px; animation: hb-qh3-in .4s ease both; }
.hb-qh3-ok i { flex: none; width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; background: var(--hb-qh3-accent); color: #fff; }
.hb-qh3-foot { margin: 22px 0 0; text-align: center; color: #6b707b; font-size: 13px; line-height: 1.6; }
.hb-qh3-link { color: #15171c; font-weight: 500; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(21,23,28,.25); border-radius: 3px; }
.hb-qh3-link:hover { text-decoration-color: currentColor; }
@container (min-width: 600px) {
  .hb-qh3-grid { grid-template-columns: repeat(3, 1fr); }
  .hb-qh3-card { padding: 28px; }
  .hb-qh3-fields { grid-template-columns: 1fr 1fr; }
}
@keyframes hb-qh3-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes hb-qh3-turn { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-qh3 *, .hb-qh3 *::before, .hb-qh3 *::after { animation: none !important; transition: none !important; }
  .hb-qh3-prov { opacity: 1; }
}
`;

function Glyph({ kind }: { kind: LoginSocialFirstGlyph }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      {kind === "ring" && <><circle cx="8" cy="8" r="5.5" {...common} /><circle cx="8" cy="8" r="2" fill="currentColor" /></>}
      {kind === "square" && <><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" fill="currentColor" /><rect x="9" y="2.5" width="4.5" height="4.5" rx="1" {...common} /><rect x="2.5" y="9" width="4.5" height="4.5" rx="1" {...common} /><rect x="9" y="9" width="4.5" height="4.5" rx="1" fill="currentColor" /></>}
      {kind === "triangle" && <path d="M8 2.5 14 13H2L8 2.5Z" {...common} />}
      {kind === "hex" && <path d="M8 1.8 13.4 5v6L8 14.2 2.6 11V5L8 1.8Z" {...common} />}
      {kind === "bolt" && <path d="M9 1.8 3.5 9H8l-1 5.2L12.5 7H8l1-5.2Z" fill="currentColor" />}
      {kind === "key" && <><circle cx="5.5" cy="8" r="3" {...common} /><path d="M8.5 8h5.5M12 8v2.5" {...common} /></>}
    </svg>
  );
}

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise<unknown>((resolve) => setTimeout(() => resolve(result), 900));
}

export function LoginSocialFirst({
  title = "Sign in to Parcel",
  subtitle = "Pick the account you use at work. We'll match you to your team's workspace automatically.",
  providers = [
    { id: "google", label: "Google", glyph: "ring", color: "#ea4335" },
    { id: "microsoft", label: "Microsoft", glyph: "square", color: "#0078d4" },
    { id: "apple", label: "Apple", glyph: "hex", color: "#15171c" },
    { id: "github", label: "GitHub", glyph: "triangle", color: "#6e40c9" },
    { id: "slack", label: "Slack", glyph: "bolt", color: "#e01e5a" },
    { id: "sso", label: "Single sign-on", glyph: "key", color: "#0f9d74" },
  ],
  lastUsed = "google",
  onProviderClick,
  onSubmit,
  signup = { label: "Start a free trial", href: "#signup" },
  terms = { label: "Terms", href: "#terms" },
  privacy = { label: "Privacy Policy", href: "#privacy" },
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: LoginSocialFirstProps) {
  const uid = React.useId();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "error" | "success">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const next: { email?: string; password?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid work email.";
    if (password.length < 8) next.password = "At least 8 characters.";
    setErrors(next);
    if (next.email || next.password) return;
    setStatus("loading");
    try {
      const result = await wait(onSubmit ? onSubmit({ email: email.trim(), password }) : true);
      setStatus(result === false ? "error" : "success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={`hb-qh3 ${className}`} style={{ "--hb-qh3-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-login-social-first" precedence="default">{css}</style>
      <div className="hb-qh3-inner">
        <div className="hb-qh3-head">
          <span className="hb-qh3-logo" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 6.5 10 3l7 3.5v7L10 17l-7-3.5v-7Z M3 6.5 10 10l7-3.5 M10 10v7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
          </span>
          <h2 className="hb-qh3-title">{title}</h2>
          <p className="hb-qh3-sub">{subtitle}</p>
        </div>
        <div className="hb-qh3-card">
          <div className="hb-qh3-grid">
            {providers.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="hb-qh3-prov"
                data-last={lastUsed === p.id}
                style={{ animationDelay: `${(i * 0.06).toFixed(2)}s`, "--hb-qh3-g": p.color ?? "#15171c" } as React.CSSProperties}
                onClick={() => onProviderClick?.(p.id)}
              >
                <span className="hb-qh3-glyph"><Glyph kind={p.glyph ?? "ring"} /></span>
                <span className="hb-qh3-plabel">{p.label}</span>
                {lastUsed === p.id && <span className="hb-qh3-last">Last used</span>}
              </button>
            ))}
          </div>
          <div className="hb-qh3-div">or use email</div>
          {status === "success" ? (
            <div className="hb-qh3-ok" role="status">
              <i aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16"><path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </i>
              Signed in as {email.trim()}. Opening your workspace.
            </div>
          ) : (
            <form className="hb-qh3-form" noValidate onSubmit={handleSubmit}>
              {status === "error" && <p className="hb-qh3-alert" role="alert">We couldn&apos;t sign you in with those details.</p>}
              <div className="hb-qh3-fields">
                <div>
                  <label className="hb-qh3-label" htmlFor={`${uid}-e`}>Work email</label>
                  <input id={`${uid}-e`} className="hb-qh3-input" type="email" autoComplete="email" placeholder="priya@northwind.co" value={email} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? `${uid}-ee` : undefined} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <p className="hb-qh3-err" id={`${uid}-ee`}>{errors.email}</p>}
                </div>
                <div>
                  <label className="hb-qh3-label" htmlFor={`${uid}-p`}>Password</label>
                  <input id={`${uid}-p`} className="hb-qh3-input" type="password" autoComplete="current-password" placeholder="Your password" value={password} aria-invalid={errors.password ? true : undefined} aria-describedby={errors.password ? `${uid}-pe` : undefined} onChange={(e) => setPassword(e.target.value)} />
                  {errors.password && <p className="hb-qh3-err" id={`${uid}-pe`}>{errors.password}</p>}
                </div>
              </div>
              <button type="submit" className="hb-qh3-btn" disabled={status === "loading"} aria-busy={status === "loading"}>
                {status === "loading" ? <><span className="hb-qh3-spin" aria-hidden="true" />Signing in</> : (
                  <>
                    Continue with email
                    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
        <p className="hb-qh3-foot">
          No account yet? <a className="hb-qh3-link" href={signup.href}>{signup.label}</a>
          <br />
          By continuing you agree to the <a className="hb-qh3-link" href={terms.href}>{terms.label}</a> and <a className="hb-qh3-link" href={privacy.href}>{privacy.label}</a>.
        </p>
      </div>
    </section>
  );
}
