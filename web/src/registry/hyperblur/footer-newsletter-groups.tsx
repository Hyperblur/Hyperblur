"use client";

import * as React from "react";

export interface FooterNewsletterGroupsLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterNewsletterGroupsGroup {
  title: string;
  links: FooterNewsletterGroupsLink[];
}

export interface FooterNewsletterGroupsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  subscribers?: number;
  groups?: FooterNewsletterGroupsGroup[];
  copyright?: string;
  region?: string;
  onSubmit?: (email: string) => void | Promise<void>;
  accent?: string;
}

const css = `
.hb-wc2 {
  --hb-wc2-accent: #10b981;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc2 *, .hb-wc2 *::before, .hb-wc2 *::after { box-sizing: border-box; }
.hb-wc2-inner { max-width: 1160px; margin: 0 auto; padding: 56px 20px 28px; }
.hb-wc2-news {
  position: relative;
  display: grid;
  gap: 24px;
  padding: 28px 22px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 22px;
  overflow: hidden;
  background:
    radial-gradient(120% 140% at 100% 0%, color-mix(in srgb, var(--hb-wc2-accent) 16%, transparent), transparent 55%),
    linear-gradient(180deg, #131313, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 30px 80px -40px rgba(0, 0, 0, .8);
}
.hb-wc2-news::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(90deg, transparent 30%, #000);
  pointer-events: none;
}
.hb-wc2-copy { position: relative; z-index: 1; display: grid; gap: 10px; }
.hb-wc2-kicker { display: inline-flex; align-items: center; gap: 8px; margin: 0; color: var(--hb-wc2-accent); font-size: 12px; font-weight: 650; letter-spacing: .08em; text-transform: uppercase; }
.hb-wc2-kicker svg { width: 14px; height: 14px; }
.hb-wc2-title { margin: 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 28px; font-weight: 600; line-height: 1.1; letter-spacing: -.025em; }
.hb-wc2-sub { margin: 0; max-width: 440px; color: #8f8f8f; font-size: 15px; line-height: 1.55; }
.hb-wc2-form { position: relative; z-index: 1; display: grid; gap: 12px; align-content: center; }
.hb-wc2-field {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 14px;
  background: rgba(0, 0, 0, .45);
  transition: border-color .25s ease, box-shadow .25s ease;
}
.hb-wc2-field:focus-within { border-color: color-mix(in srgb, var(--hb-wc2-accent) 70%, transparent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-wc2-accent) 18%, transparent); }
.hb-wc2-field[data-error="true"] { border-color: #f05252; animation: hb-wc2-shake .4s cubic-bezier(.36, .07, .19, .97); }
.hb-wc2-input { flex: 1; min-width: 0; height: 40px; padding: 0 10px; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 15px; outline: none; }
.hb-wc2-input::placeholder { color: #5f5f5f; }
.hb-wc2-btn {
  position: relative;
  display: inline-grid;
  place-items: center;
  flex: none;
  height: 40px;
  min-width: 40px;
  padding: 0 18px;
  border: 0;
  border-radius: 10px;
  background: var(--hb-wc2-accent);
  color: #04140d;
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .4), 0 8px 24px -8px var(--hb-wc2-accent);
  transition: padding .45s cubic-bezier(.2, .9, .2, 1), filter .2s ease, transform .15s ease;
}
.hb-wc2-btn:hover { filter: brightness(1.08); }
.hb-wc2-btn:active { transform: scale(.97); }
.hb-wc2-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-wc2-btn[data-state="done"] { padding: 0 11px; cursor: default; }
.hb-wc2-btn[data-state="busy"] { cursor: progress; }
.hb-wc2-btn-label { transition: opacity .2s ease; }
.hb-wc2-btn[data-state="done"] .hb-wc2-btn-label, .hb-wc2-btn[data-state="busy"] .hb-wc2-btn-label { opacity: 0; width: 0; overflow: hidden; }
.hb-wc2-check { position: absolute; width: 18px; height: 18px; }
.hb-wc2-check path { stroke-dasharray: 20; stroke-dashoffset: 20; }
.hb-wc2-btn[data-state="done"] .hb-wc2-check path { animation: hb-wc2-draw .5s .15s cubic-bezier(.65, 0, .35, 1) forwards; }
.hb-wc2-spin { position: absolute; width: 16px; height: 16px; border: 2px solid rgba(4, 20, 13, .25); border-top-color: #04140d; border-radius: 50%; animation: hb-wc2-spin .7s linear infinite; }
.hb-wc2-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; color: #7a7a7a; font-size: 13px; }
.hb-wc2-faces { display: flex; }
.hb-wc2-face { width: 22px; height: 22px; margin-left: -6px; border: 2px solid #111; border-radius: 50%; }
.hb-wc2-face:first-child { margin-left: 0; }
.hb-wc2-count { display: inline-flex; overflow: hidden; height: 1.3em; color: #ededed; font-variant-numeric: tabular-nums; font-weight: 600; }
.hb-wc2-digit { display: inline-block; animation: hb-wc2-roll .5s cubic-bezier(.2, .9, .2, 1.2); }
.hb-wc2-ok { color: var(--hb-wc2-accent); }
.hb-wc2-cols { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; margin-top: 40px; }
.hb-wc2-group { border-bottom: 1px solid rgba(255, 255, 255, .07); }
.hb-wc2-gh { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 16px 2px; border: 0; background: none; color: #ededed; font: inherit; font-size: 14px; font-weight: 600; text-align: left; cursor: pointer; }
.hb-wc2-gh:focus-visible { outline: 2px solid var(--hb-wc2-accent); outline-offset: 2px; border-radius: 6px; }
.hb-wc2-gh svg { width: 14px; height: 14px; color: #6f6f6f; transition: transform .35s cubic-bezier(.3, 1.4, .5, 1); }
.hb-wc2-group[data-open="true"] .hb-wc2-gh svg { transform: rotate(45deg); color: var(--hb-wc2-accent); }
.hb-wc2-gt { display: none; margin: 0 0 16px; color: #6f6f6f; font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-wc2-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .4s cubic-bezier(.2, .8, .2, 1); }
.hb-wc2-group[data-open="true"] .hb-wc2-wrap { grid-template-rows: 1fr; }
.hb-wc2-wrap > div { min-height: 0; overflow: hidden; }
.hb-wc2-list { position: relative; display: grid; gap: 2px; margin: 0; padding: 0 0 14px; list-style: none; }
.hb-wc2-marker {
  position: absolute;
  left: -10px;
  right: -10px;
  top: 0;
  height: 34px;
  border-radius: 9px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-wc2-accent) 16%, transparent), rgba(255, 255, 255, .03));
  box-shadow: inset 2px 0 0 var(--hb-wc2-accent);
  opacity: 0;
  transform: translateY(var(--hb-wc2-y, 0px));
  transition: transform .35s cubic-bezier(.2, .9, .25, 1.1), opacity .2s ease;
  pointer-events: none;
}
.hb-wc2-list[data-hover="true"] .hb-wc2-marker { opacity: 1; }
.hb-wc2-li { position: relative; }
.hb-wc2-link { display: flex; align-items: center; gap: 8px; height: 34px; color: #a1a1a1; font-size: 14px; text-decoration: none; transition: color .2s ease, transform .3s cubic-bezier(.2, .9, .25, 1.1); }
.hb-wc2-link:hover, .hb-wc2-link:focus-visible { color: #fff; transform: translateX(6px); }
.hb-wc2-link:focus-visible { outline: none; }
.hb-wc2-arrow { width: 12px; height: 12px; margin-left: auto; opacity: 0; transform: translateX(-6px); transition: opacity .2s ease, transform .3s cubic-bezier(.2, .9, .25, 1.1); color: var(--hb-wc2-accent); }
.hb-wc2-link:hover .hb-wc2-arrow, .hb-wc2-link:focus-visible .hb-wc2-arrow { opacity: 1; transform: translateX(0); }
.hb-wc2-badge { padding: 2px 7px; border-radius: 999px; background: color-mix(in srgb, var(--hb-wc2-accent) 18%, transparent); color: var(--hb-wc2-accent); font-size: 11px; font-weight: 650; }
.hb-wc2-bottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: 32px; padding-top: 22px; border-top: 1px solid rgba(255, 255, 255, .07); color: #6f6f6f; font-size: 13px; }
.hb-wc2-brand { display: inline-flex; align-items: center; gap: 10px; color: #ededed; font-weight: 650; font-size: 15px; }
.hb-wc2-logo { width: 26px; height: 26px; border-radius: 8px; background: conic-gradient(from 210deg, var(--hb-wc2-accent), #0a0a0a 60%, var(--hb-wc2-accent)); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .15); }
.hb-wc2-region { display: inline-flex; align-items: center; gap: 8px; }
.hb-wc2-region svg { width: 14px; height: 14px; }
@keyframes hb-wc2-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-wc2-spin { to { transform: rotate(360deg); } }
@keyframes hb-wc2-roll { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes hb-wc2-shake { 20%, 60% { transform: translateX(-5px); } 40%, 80% { transform: translateX(5px); } }
@container (min-width: 720px) {
  .hb-wc2-inner { padding: 80px 40px 32px; }
  .hb-wc2-news { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 40px; padding: 40px; }
  .hb-wc2-title { font-size: 34px; }
  .hb-wc2-cols { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px; margin-top: 56px; }
  .hb-wc2-group { border: 0; }
  .hb-wc2-gh { display: none; }
  .hb-wc2-gt { display: block; }
  .hb-wc2-wrap { grid-template-rows: 1fr; }
  .hb-wc2-list { padding: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc2 *, .hb-wc2 *::before { animation: none !important; transition: none !important; }
  .hb-wc2-check path { stroke-dashoffset: 0; }
}
`;

const defaultGroups: FooterNewsletterGroupsGroup[] = [
  { title: "Product", links: [{ label: "Field maps", href: "#" }, { label: "Crew scheduling", href: "#" }, { label: "Offline mode", href: "#", badge: "New" }, { label: "Pricing", href: "#" }] },
  { title: "Solutions", links: [{ label: "Agriculture", href: "#" }, { label: "Forestry", href: "#" }, { label: "Utilities", href: "#" }, { label: "Survey teams", href: "#" }] },
  { title: "Learn", links: [{ label: "Field Notes", href: "#" }, { label: "Guides", href: "#" }, { label: "Webinars", href: "#" }, { label: "API reference", href: "#" }] },
  { title: "Company", links: [{ label: "About", href: "#" }, { label: "Careers", href: "#", badge: "6" }, { label: "Partners", href: "#" }, { label: "Contact", href: "#" }] },
];

const faces = ["#10b981", "#f59e0b", "#6366f1", "#ec4899"];

export function FooterNewsletterGroups({
  brand = "Terrain",
  title = "Field Notes, every other Thursday.",
  subtitle = "One email with what we shipped, a deep dive from a crew in the field, and nothing you will want to unsubscribe from.",
  placeholder = "you@company.com",
  buttonLabel = "Subscribe",
  successMessage = "You are in. The next issue lands Thursday.",
  subscribers = 18240,
  groups = defaultGroups,
  copyright = "© 2026 Terrain Systems",
  region = "English, United States",
  onSubmit,
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: FooterNewsletterGroupsProps) {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = React.useState(false);
  const [count, setCount] = React.useState(subscribers);
  const [open, setOpen] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState<number | null>(null);
  const markers = React.useRef<(HTMLLIElement | null)[]>([]);
  const id = React.useId();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state !== "idle") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    setState("busy");
    try {
      await onSubmit?.(email);
      await new Promise((r) => setTimeout(r, 600));
      setState("done");
      setCount((c) => c + 1);
    } catch {
      setState("idle");
      setError(true);
    }
  };

  const point = (g: number, li: HTMLLIElement) => {
    const m = markers.current[g];
    if (m) m.style.setProperty("--hb-wc2-y", `${li.offsetTop}px`);
    setHover(g);
  };

  const digits = count.toLocaleString("en-US");
  const vars = { "--hb-wc2-accent": accent, ...style } as React.CSSProperties;

  return (
    <footer className={`hb-wc2 ${className}`} style={vars} {...rest}>
      <style href="hb-footer-newsletter-groups" precedence="default">{css}</style>
      <div className="hb-wc2-inner">
        <div className="hb-wc2-news">
          <div className="hb-wc2-copy">
            <p className="hb-wc2-kicker">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 4.5h12v8H2zM2 4.5l6 4.5 6-4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              Newsletter
            </p>
            <h2 className="hb-wc2-title">{title}</h2>
            <p className="hb-wc2-sub">{subtitle}</p>
          </div>
          <form className="hb-wc2-form" onSubmit={submit} noValidate>
            <div className="hb-wc2-field" data-error={error ? "true" : "false"}>
              <label htmlFor={`${id}-e`} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>Email address</label>
              <input
                id={`${id}-e`}
                className="hb-wc2-input"
                type="email"
                value={email}
                placeholder={placeholder}
                disabled={state === "done"}
                aria-invalid={error}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(false);
                }}
              />
              <button className="hb-wc2-btn" type="submit" data-state={state} aria-label={state === "done" ? "Subscribed" : buttonLabel}>
                <span className="hb-wc2-btn-label">{buttonLabel}</span>
                {state === "busy" ? <span className="hb-wc2-spin" aria-hidden="true" /> : null}
                {state === "done" ? (
                  <svg className="hb-wc2-check" viewBox="0 0 18 18" aria-hidden="true">
                    <path d="M3.5 9.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </button>
            </div>
            <div className="hb-wc2-meta" aria-live="polite">
              {state === "done" ? (
                <span className="hb-wc2-ok">{successMessage}</span>
              ) : error ? (
                <span style={{ color: "#f87171" }}>Enter a valid email address.</span>
              ) : (
                <>
                  <span className="hb-wc2-faces" aria-hidden="true">
                    {faces.map((f, i) => (
                      <span key={f} className="hb-wc2-face" style={{ background: `linear-gradient(135deg, ${f}, #1f1f1f)`, zIndex: 4 - i }} />
                    ))}
                  </span>
                  <span>
                    Read by{" "}
                    <span className="hb-wc2-count">
                      {Array.from(digits).map((d, i) => (
                        <span key={`${i}-${d}`} className="hb-wc2-digit">{d}</span>
                      ))}
                    </span>{" "}
                    field teams
                  </span>
                </>
              )}
            </div>
          </form>
        </div>
        <nav className="hb-wc2-cols" aria-label="Footer">
          {groups.map((g, gi) => (
            <div key={g.title} className="hb-wc2-group" data-open={open === gi ? "true" : "false"}>
              <button className="hb-wc2-gh" type="button" aria-expanded={open === gi} aria-controls={`${id}-g${gi}`} onClick={() => setOpen((o) => (o === gi ? null : gi))}>
                {g.title}
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M7 2v10M2 7h10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              <p className="hb-wc2-gt">{g.title}</p>
              <div className="hb-wc2-wrap" id={`${id}-g${gi}`}>
                <div>
                  <ul className="hb-wc2-list" data-hover={hover === gi ? "true" : "false"} onPointerLeave={() => setHover(null)} onBlur={() => setHover(null)}>
                    <li
                      className="hb-wc2-marker"
                      aria-hidden="true"
                      role="presentation"
                      ref={(el) => {
                        markers.current[gi] = el;
                      }}
                    />
                    {g.links.map((l) => (
                      <li key={l.label} className="hb-wc2-li" onPointerEnter={(e) => point(gi, e.currentTarget)} onFocus={(e) => point(gi, e.currentTarget)}>
                        <a className="hb-wc2-link" href={l.href}>
                          {l.label}
                          {l.badge ? <span className="hb-wc2-badge">{l.badge}</span> : null}
                          <svg className="hb-wc2-arrow" viewBox="0 0 12 12" aria-hidden="true">
                            <path d="M2 6h7.5M6.5 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </nav>
        <div className="hb-wc2-bottom">
          <span className="hb-wc2-brand">
            <span className="hb-wc2-logo" aria-hidden="true" />
            {brand}
          </span>
          <span>{copyright}</span>
          <span className="hb-wc2-region">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M2 8h12M8 2c2 2 2 10 0 12M8 2c-2 2-2 10 0 12" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            {region}
          </span>
        </div>
      </div>
    </footer>
  );
}
