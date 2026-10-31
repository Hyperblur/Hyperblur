"use client";

import * as React from "react";

export interface LoginProvider {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  providers?: LoginProvider[];
  onSubmit?: (values: LoginValues) => void;
  loading?: boolean;
  error?: string | null;
  accent?: string;
  signupHref?: string;
  forgotHref?: string;
  submitLabel?: string;
  loadingLabel?: string;
  footerText?: string;
  signupLabel?: string;
}

const css = `
@keyframes hb-lc-spin { to { transform: rotate(360deg); } }
@keyframes hb-lc-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-lc {
  --hb-accent: #2f7bff;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 56px 16px;
  background: #0a0a0a;
  color: #f2f2f5;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.hb-lc *, .hb-lc *::before, .hb-lc *::after { box-sizing: border-box; }
.hb-lc-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 24px;
  background: rgba(255, 255, 255, .03);
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, .9);
}
.hb-lc-head { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
.hb-lc-logo { display: grid; place-items: center; min-height: 40px; margin-bottom: 8px; color: var(--hb-accent); }
.hb-lc-title { margin: 0; font-size: 22px; font-weight: 700; line-height: 1.25; letter-spacing: -.02em; }
.hb-lc-sub { margin: 0; color: rgba(255, 255, 255, .6); font-size: 14px; line-height: 1.5; }
.hb-lc-social { display: flex; flex-direction: column; gap: 10px; }
.hb-lc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 46px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  color: #f2f2f5;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease, opacity .2s ease, box-shadow .2s ease;
}
.hb-lc-btn:hover:not(:disabled) { background: rgba(255, 255, 255, .09); border-color: rgba(255, 255, 255, .3); }
.hb-lc-btn:focus-visible { outline: 2px solid var(--hb-accent); outline-offset: 3px; }
.hb-lc-btn:disabled { opacity: .55; cursor: default; }
.hb-lc-btn svg { flex: none; }
.hb-lc-btn[data-primary="true"] {
  border-color: var(--hb-accent);
  background: var(--hb-accent);
  color: #fff;
  box-shadow: 0 8px 28px -10px var(--hb-accent);
}
.hb-lc-btn[data-primary="true"]:hover:not(:disabled) { background: color-mix(in srgb, var(--hb-accent) 82%, #ffffff); border-color: transparent; }
.hb-lc-btn[data-primary="true"]:disabled { opacity: .75; }
.hb-lc-or {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, .4);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .08em;
}
.hb-lc-or::before, .hb-lc-or::after { content: ""; flex: 1 1 0; height: 1px; background: rgba(255, 255, 255, .1); }
.hb-lc-form { display: flex; flex-direction: column; gap: 14px; margin: 0; }
.hb-lc-set { display: flex; flex-direction: column; gap: 14px; min-width: 0; margin: 0; padding: 0; border: 0; }
.hb-lc-field { position: relative; }
.hb-lc-input {
  display: block;
  width: 100%;
  height: 54px;
  padding: 22px 16px 6px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 14px;
  background: rgba(255, 255, 255, .04);
  color: #f2f2f5;
  font: inherit;
  font-size: 15px;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
}
.hb-lc-input:hover { border-color: rgba(255, 255, 255, .26); }
.hb-lc-input:focus {
  border-color: var(--hb-accent);
  background: rgba(255, 255, 255, .06);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-accent) 28%, transparent);
}
.hb-lc-input[aria-invalid="true"] { border-color: #ff5d6c; }
.hb-lc-input[aria-invalid="true"]:focus { box-shadow: 0 0 0 3px rgba(255, 93, 108, .28); }
.hb-lc-input:disabled { opacity: .6; }
.hb-lc-label {
  position: absolute;
  top: 50%;
  left: 17px;
  max-width: calc(100% - 34px);
  overflow: hidden;
  color: rgba(255, 255, 255, .5);
  font-size: 15px;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  transform: translate3d(0, -50%, 0);
  transition: top .18s ease, font-size .18s ease, color .18s ease;
}
.hb-lc-input:focus + .hb-lc-label,
.hb-lc-input:not(:placeholder-shown) + .hb-lc-label {
  top: 17px;
  font-size: 11px;
  color: rgba(255, 255, 255, .62);
}
.hb-lc-input:-webkit-autofill + .hb-lc-label { top: 17px; font-size: 11px; }
.hb-lc-input:focus + .hb-lc-label { color: var(--hb-accent); }
.hb-lc-row { display: flex; justify-content: flex-end; margin-top: -4px; }
.hb-lc-link {
  color: rgba(255, 255, 255, .6);
  font-size: 13px;
  text-decoration: none;
  transition: color .2s ease;
}
.hb-lc-link:hover { color: #fff; text-decoration: underline; }
.hb-lc-link:focus-visible { outline: 2px solid var(--hb-accent); outline-offset: 3px; border-radius: 4px; }
.hb-lc-link[data-accent="true"] { color: var(--hb-accent); font-weight: 600; }
.hb-lc-link[data-accent="true"]:hover { color: color-mix(in srgb, var(--hb-accent) 70%, #ffffff); }
.hb-lc-error {
  padding: 11px 14px;
  border: 1px solid rgba(255, 93, 108, .35);
  border-radius: 12px;
  background: rgba(255, 93, 108, .1);
  color: #ffb3bb;
  font-size: 13px;
  line-height: 1.45;
  animation: hb-lc-in .25s ease both;
}
.hb-lc-spin {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, .35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: hb-lc-spin .7s linear infinite;
}
.hb-lc-foot { margin: 0; color: rgba(255, 255, 255, .55); font-size: 13px; text-align: center; }
.hb-lc-foot .hb-lc-link { margin-left: 4px; }
@media (max-width: 767px) {
  .hb-lc { padding: 32px 16px; }
  .hb-lc-card { padding: 24px 20px; border-radius: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-lc-btn, .hb-lc-input, .hb-lc-label, .hb-lc-link { transition: none; }
  .hb-lc-error { animation: none; }
  .hb-lc-spin { animation-duration: 2.4s; }
}
`;

function Mark() {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="10" fill="currentColor" />
      <path d="M9 21.5L16 9l7 12.5H9Z" fill="#0a0a0a" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.87h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.97-4.32 2.97-7.34Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.04.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.41 13.91a6 6 0 0 1 0-3.82V7.51H3.07a10 10 0 0 0 0 8.98l3.34-2.58Z" />
      <path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.95 2.99 14.7 2 12 2a10 10 0 0 0-8.93 5.51l3.34 2.58C7.2 7.74 9.4 5.98 12 5.98Z" />
    </svg>
  );
}

const defaultProviders: LoginProvider[] = [
  { label: "Continue with GitHub", icon: <GithubIcon /> },
  { label: "Continue with Google", icon: <GoogleIcon /> },
];

export function LoginCard({
  logo = <Mark />,
  title = "Welcome back",
  subtitle = "Sign in to your account to continue.",
  providers = defaultProviders,
  onSubmit,
  loading = false,
  error = null,
  accent = "#2f7bff",
  signupHref = "#",
  forgotHref = "#",
  submitLabel = "Sign in",
  loadingLabel = "Signing in",
  footerText = "Don't have an account?",
  signupLabel = "Sign up",
  className = "",
  style,
  ...rest
}: LoginCardProps) {
  const uid = React.useId();
  const titleId = `${uid}-title`;
  const emailId = `${uid}-email`;
  const passwordId = `${uid}-password`;
  const errorId = `${uid}-error`;
  const invalid = error ? true : undefined;
  const describedBy = error ? errorId : undefined;
  const vars = { "--hb-accent": accent, ...style } as React.CSSProperties;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    const data = new FormData(e.currentTarget);
    onSubmit?.({
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
    });
  }

  return (
    <section className={`hb-lc ${className}`} style={vars} aria-labelledby={titleId} {...rest}>
      <style href="hb-login-card" precedence="default">{css}</style>
      <div className="hb-lc-card">
        <div className="hb-lc-head">
          {logo != null ? <div className="hb-lc-logo">{logo}</div> : null}
          <h2 className="hb-lc-title" id={titleId}>
            {title}
          </h2>
          {subtitle ? <p className="hb-lc-sub">{subtitle}</p> : null}
        </div>
        {providers.length > 0 ? (
          <>
            <div className="hb-lc-social">
              {providers.map((provider) => (
                <button
                  type="button"
                  className="hb-lc-btn"
                  key={provider.label}
                  disabled={loading}
                  onClick={provider.onClick}
                >
                  {provider.icon}
                  {provider.label}
                </button>
              ))}
            </div>
            <div className="hb-lc-or" aria-hidden="true">
              or
            </div>
          </>
        ) : null}
        <form className="hb-lc-form" onSubmit={handleSubmit} aria-busy={loading || undefined}>
          {error ? (
            <div className="hb-lc-error" id={errorId} role="alert">
              {error}
            </div>
          ) : null}
          <fieldset className="hb-lc-set" disabled={loading}>
            <div className="hb-lc-field">
              <input
                className="hb-lc-input"
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                placeholder=" "
                required
                aria-invalid={invalid}
                aria-describedby={describedBy}
              />
              <label className="hb-lc-label" htmlFor={emailId}>
                Email
              </label>
            </div>
            <div className="hb-lc-field">
              <input
                className="hb-lc-input"
                id={passwordId}
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder=" "
                required
                aria-invalid={invalid}
                aria-describedby={describedBy}
              />
              <label className="hb-lc-label" htmlFor={passwordId}>
                Password
              </label>
            </div>
          </fieldset>
          <div className="hb-lc-row">
            <a className="hb-lc-link" href={forgotHref}>
              Forgot password?
            </a>
          </div>
          <button type="submit" className="hb-lc-btn" data-primary="true" disabled={loading}>
            {loading ? <span className="hb-lc-spin" aria-hidden="true" /> : null}
            {loading ? loadingLabel : submitLabel}
          </button>
        </form>
        <p className="hb-lc-foot">
          {footerText}
          <a className="hb-lc-link" data-accent="true" href={signupHref}>
            {signupLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
