"use client";

import * as React from "react";

export interface FooterNewsletterLink {
  label: string;
  href: string;
}

export interface FooterNewsletterColumn {
  title: string;
  links: FooterNewsletterLink[];
}

export interface FooterNewsletterFirstProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  proof?: string;
  brand?: string;
  columns?: FooterNewsletterColumn[];
  legal?: string;
  onSubscribe?: (email: string) => void | Promise<unknown>;
  accent?: string;
}

const defaultColumns: FooterNewsletterColumn[] = [
  { title: "Product", links: [{ label: "Overview", href: "#" }, { label: "Field app", href: "#" }, { label: "Integrations", href: "#" }, { label: "Changelog", href: "#" }, { label: "Pricing", href: "#" }] },
  { title: "Resources", links: [{ label: "Guides", href: "#" }, { label: "Templates", href: "#" }, { label: "API reference", href: "#" }, { label: "Community", href: "#" }] },
  { title: "Company", links: [{ label: "About", href: "#" }, { label: "Careers", href: "#" }, { label: "Press kit", href: "#" }, { label: "Contact", href: "#" }] },
  { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }, { label: "Security", href: "#" }, { label: "DPA", href: "#" }] },
  { title: "Follow", links: [{ label: "LinkedIn", href: "#" }, { label: "YouTube", href: "#" }, { label: "GitHub", href: "#" }, { label: "RSS", href: "#" }] },
];

const css = `
@property --hb-yi3-angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.hb-yi3 {
  --hb-yi3-accent: #1f8a5b;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #f7f5ef;
  color: #17160f;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yi3 *, .hb-yi3 *::before, .hb-yi3 *::after { box-sizing: border-box; }
.hb-yi3-inner { max-width: 1120px; margin: 0 auto; padding: 72px 20px 28px; }
.hb-yi3-hero { display: grid; gap: 28px; padding-bottom: 56px; border-bottom: 1px solid rgba(23, 22, 15, .12); }
.hb-yi3-eyebrow { display: inline-flex; align-items: center; gap: 10px; margin: 0; font-size: 13px; font-weight: 600; color: var(--hb-yi3-accent); }
.hb-yi3-issue { padding: 3px 8px; border-radius: 6px; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: #fff; background: var(--hb-yi3-accent); }
.hb-yi3-title { margin: 14px 0 0; font-size: clamp(34px, 6.6cqi, 76px); line-height: .98; letter-spacing: -.045em; font-weight: 600; max-width: 12ch; }
.hb-yi3-title em { font-style: italic; font-weight: 500; color: var(--hb-yi3-accent); }
.hb-yi3-sub { margin: 18px 0 0; max-width: 440px; font-size: 16px; line-height: 1.6; color: #5f5b4f; }
.hb-yi3-form { align-self: end; width: 100%; }
.hb-yi3-shell {
  position: relative; border-radius: 22px; padding: 2px;
  background: conic-gradient(from var(--hb-yi3-angle), rgba(23, 22, 15, .1) 0deg, rgba(23, 22, 15, .1) 250deg, var(--hb-yi3-accent) 310deg, color-mix(in srgb, var(--hb-yi3-accent) 40%, #f5d76e) 340deg, rgba(23, 22, 15, .1) 360deg);
  animation: hb-yi3-spin 5s linear infinite;
  box-shadow: 0 30px 60px -36px rgba(23, 22, 15, .45);
}
.hb-yi3-shell[data-state="error"] { background: #c2412d; animation: hb-yi3-shake .4s; }
.hb-yi3-field { display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 20px; background: #fffefb; }
.hb-yi3-field svg { width: 22px; height: 22px; margin-left: 12px; color: #8c877b; flex: none; }
.hb-yi3-input {
  flex: 1; min-width: 0; height: 56px; border: 0; outline: none; background: transparent; color: #17160f;
  font: inherit; font-size: clamp(17px, 2.2cqi, 22px); letter-spacing: -.01em;
}
.hb-yi3-input::placeholder { color: #a8a395; }
.hb-yi3-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 56px; padding: 0 22px; border: 0; border-radius: 14px; flex: none;
  background: #17160f; color: #fffefb; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .18) inset; transition: background .2s, transform .2s;
}
.hb-yi3-btn:hover:not(:disabled) { background: var(--hb-yi3-accent); transform: translateY(-1px); }
.hb-yi3-btn:disabled { cursor: progress; }
.hb-yi3-btn:focus-visible, .hb-yi3-col a:focus-visible, .hb-yi3-brand:focus-visible { outline: 2px solid var(--hb-yi3-accent); outline-offset: 3px; }
.hb-yi3-btn svg { width: 16px; height: 16px; margin: 0; color: currentColor; transition: transform .2s; }
.hb-yi3-btn:hover svg { transform: translateX(3px); }
.hb-yi3-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, .3); border-top-color: #fff; animation: hb-yi3-rot .7s linear infinite; }
.hb-yi3-meta { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-top: 14px; font-size: 13px; color: #6f6a5d; }
.hb-yi3-proof { display: inline-flex; align-items: center; gap: 10px; }
.hb-yi3-faces { display: flex; }
.hb-yi3-faces i { width: 22px; height: 22px; border-radius: 50%; margin-left: -6px; border: 2px solid #f7f5ef; }
.hb-yi3-faces i:first-child { margin-left: 0; }
.hb-yi3-err { color: #c2412d; font-weight: 500; }
.hb-yi3-ok {
  display: flex; align-items: center; gap: 14px; padding: 18px 20px; border-radius: 20px; background: #fffefb;
  border: 1px solid color-mix(in srgb, var(--hb-yi3-accent) 35%, transparent); animation: hb-yi3-up .5s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-yi3-ok span { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: var(--hb-yi3-accent); color: #fff; flex: none; }
.hb-yi3-ok svg { width: 22px; height: 22px; }
.hb-yi3-ok path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-yi3-draw .5s .15s ease-out forwards; }
.hb-yi3-ok p { margin: 0; font-size: 15px; line-height: 1.5; }
.hb-yi3-ok b { display: block; font-size: 17px; }
.hb-yi3-map { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 20px; padding: 48px 0; }
.hb-yi3-col h3 { margin: 0 0 14px; font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #8c877b; }
.hb-yi3-col ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.hb-yi3-col a { position: relative; color: #2d2b23; text-decoration: none; font-size: 15px; transition: color .2s; }
.hb-yi3-col a::after { content: ""; position: absolute; left: 0; right: 0; bottom: -2px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform .3s cubic-bezier(.2, .8, .2, 1); }
.hb-yi3-col a:hover { color: var(--hb-yi3-accent); }
.hb-yi3-col a:hover::after { transform: scaleX(1); transform-origin: left; }
.hb-yi3-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; padding-top: 22px; border-top: 1px solid rgba(23, 22, 15, .12); font-size: 13px; color: #6f6a5d; }
.hb-yi3-brand { display: inline-flex; align-items: center; gap: 10px; color: #17160f; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: -.02em; }
.hb-yi3-mark { width: 26px; height: 26px; border-radius: 8px; background: #17160f; display: grid; place-items: center; }
.hb-yi3-mark i { width: 10px; height: 10px; border-radius: 50%; border: 2.5px solid var(--hb-yi3-accent); }
.hb-yi3-status { display: inline-flex; align-items: center; gap: 8px; }
.hb-yi3-status::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #22a06b; box-shadow: 0 0 0 3px rgba(34, 160, 107, .18); }
@keyframes hb-yi3-spin { to { --hb-yi3-angle: 360deg; } }
@keyframes hb-yi3-rot { to { transform: rotate(360deg); } }
@keyframes hb-yi3-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes hb-yi3-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-yi3-shake { 25% { transform: translateX(-6px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-3px); } }
@container (min-width: 560px) {
  .hb-yi3-map { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@container (min-width: 860px) {
  .hb-yi3-inner { padding: 112px 32px 32px; }
  .hb-yi3-hero { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 56px; padding-bottom: 80px; }
  .hb-yi3-map { grid-template-columns: repeat(5, minmax(0, 1fr)); padding: 56px 0 64px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yi3-shell, .hb-yi3-ok, .hb-yi3-ok path { animation: none; stroke-dashoffset: 0; }
  .hb-yi3-btn, .hb-yi3-btn svg, .hb-yi3-col a, .hb-yi3-col a::after { transition: none; }
}
`;

const faceColors = ["#1f8a5b", "#e2553f", "#2f7bff", "#d4a017"];

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function FooterNewsletterFirst({
  eyebrow = "The Friday brief",
  title = "One good email, every Friday.",
  subtitle = "Product changes, field notes from teams running audits at scale, and one link worth your weekend. Four minutes to read.",
  placeholder = "you@company.com",
  buttonLabel = "Subscribe",
  proof = "Read by 38,412 operators",
  brand = "Fieldnote",
  columns = defaultColumns,
  legal = "© 2026 Fieldnote Labs, Inc.",
  onSubscribe,
  accent = "#1f8a5b",
  className = "",
  style,
  ...rest
}: FooterNewsletterFirstProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "error" | "loading" | "done">("idle");
  const timer = React.useRef<number | undefined>(undefined);
  const id = React.useId();

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!emailOk(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await onSubscribe?.(email.trim());
    } catch {
      setStatus("error");
      return;
    }
    timer.current = window.setTimeout(() => setStatus("done"), 800);
  };

  const vars = { "--hb-yi3-accent": accent, ...style } as React.CSSProperties;
  const titleParts = title.split(", ");

  return (
    <footer className={`hb-yi3 ${className}`} style={vars} {...rest}>
      <style href="hb-footer-newsletter-first" precedence="default">{css}</style>
      <div className="hb-yi3-inner">
        <div className="hb-yi3-hero">
          <div>
            {eyebrow ? (
              <p className="hb-yi3-eyebrow">
                <span className="hb-yi3-issue">No. 142</span>
                {eyebrow}
              </p>
            ) : null}
            <h2 className="hb-yi3-title">
              {titleParts.length > 1 ? (
                <>
                  {titleParts[0]}, <em>{titleParts.slice(1).join(", ")}</em>
                </>
              ) : (
                title
              )}
            </h2>
            {subtitle ? <p className="hb-yi3-sub">{subtitle}</p> : null}
          </div>
          <div className="hb-yi3-form">
            {status === "done" ? (
              <div className="hb-yi3-ok" role="status">
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <p>
                  <b>You are on the list.</b>
                  {`Issue 143 lands in ${email.trim()} this Friday at 8:00.`}
                </p>
              </div>
            ) : (
              <form noValidate onSubmit={submit} aria-busy={status === "loading" || undefined}>
                <label htmlFor={`${id}-email`} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
                  Email address
                </label>
                <div className="hb-yi3-shell" data-state={status === "error" ? "error" : "idle"}>
                  <div className="hb-yi3-field">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
                    </svg>
                    <input
                      id={`${id}-email`}
                      className="hb-yi3-input"
                      type="email"
                      autoComplete="email"
                      placeholder={placeholder}
                      value={email}
                      aria-invalid={status === "error"}
                      aria-describedby={`${id}-meta`}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                    />
                    <button type="submit" className="hb-yi3-btn" disabled={status === "loading"}>
                      {status === "loading" ? <span className="hb-yi3-spin" aria-hidden="true" /> : null}
                      {status === "loading" ? "Joining" : buttonLabel}
                      {status === "loading" ? null : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="hb-yi3-meta" id={`${id}-meta`}>
                  {status === "error" ? (
                    <span className="hb-yi3-err" role="alert">Enter a valid email so we know where to send it.</span>
                  ) : (
                    <span className="hb-yi3-proof">
                      <span className="hb-yi3-faces" aria-hidden="true">
                        {faceColors.map((c) => (
                          <i key={c} style={{ background: `linear-gradient(135deg, ${c}, #f7f5ef)` }} />
                        ))}
                      </span>
                      {proof}
                    </span>
                  )}
                  <span>No spam. Unsubscribe in one click.</span>
                </div>
              </form>
            )}
          </div>
        </div>
        <nav className="hb-yi3-map" aria-label="Footer">
          {columns.map((col) => (
            <div key={col.title} className="hb-yi3-col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="hb-yi3-bar">
          <a className="hb-yi3-brand" href="#">
            <span className="hb-yi3-mark" aria-hidden="true">
              <i />
            </span>
            {brand}
          </a>
          <span className="hb-yi3-status">All systems normal</span>
          <span>{legal}</span>
        </div>
      </div>
    </footer>
  );
}
