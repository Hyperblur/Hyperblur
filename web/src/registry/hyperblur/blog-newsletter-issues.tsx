"use client";

import * as React from "react";

export interface BlogNewsletterIssue {
  number: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  href: string;
  topics?: string[];
}

export interface BlogNewsletterIssuesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  name?: string;
  title?: string;
  subtitle?: string;
  issues?: BlogNewsletterIssue[];
  subscribers?: string;
  cadence?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  archive?: { label: string; href: string };
  accent?: string;
  onSubscribe?: (email: string) => void | Promise<void>;
}

const defaultIssues: BlogNewsletterIssue[] = [
  {
    number: 148,
    title: "The quiet death of the settings page",
    excerpt: "Why the best products are moving preferences into the moment you need them, with five examples from apps we use daily.",
    date: "Nov 2, 2026",
    readTime: "7 min read",
    href: "#",
    topics: ["Product", "UX"],
  },
  {
    number: 147,
    title: "Pricing pages that stopped hiding the number",
    excerpt: "We read 212 SaaS pricing pages. The ones that convert best share three habits, and none of them is a toggle.",
    date: "Oct 26, 2026",
    readTime: "9 min read",
    href: "#",
    topics: ["Growth"],
  },
  {
    number: 146,
    title: "What a 40 person team learned from deleting Jira",
    excerpt: "A field report from Lagos and Berlin on replacing tickets with a weekly written plan.",
    date: "Oct 19, 2026",
    readTime: "6 min read",
    href: "#",
    topics: ["Teams"],
  },
  {
    number: 145,
    title: "Fonts are the new brand colors",
    excerpt: "Variable type, optical sizes and why every startup suddenly ships a custom grotesk.",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    href: "#",
    topics: ["Design"],
  },
];

const css = `
.hb-yj7 {
  --hb-yj7-accent: #10b981;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yj7 *, .hb-yj7 *::before, .hb-yj7 *::after { box-sizing: border-box; }
.hb-yj7::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(40% 50% at 82% 30%, color-mix(in srgb, var(--hb-yj7-accent) 11%, transparent), transparent 70%);
  pointer-events: none;
}
.hb-yj7-inner {
  display: grid;
  gap: 40px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px;
}
@container (min-width: 880px) {
  .hb-yj7-inner { grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr); gap: 56px; align-items: start; padding: 100px 32px; }
}
.hb-yj7-mast { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.hb-yj7-logo {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--hb-yj7-accent), color-mix(in srgb, var(--hb-yj7-accent) 35%, #0a0a0a));
  color: #04120c;
  font: 700 15px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3);
}
.hb-yj7-name { font-size: 15px; font-weight: 600; letter-spacing: -.01em; }
.hb-yj7-name span { display: block; color: #8f8f8f; font-size: 12.5px; font-weight: 400; }
.hb-yj7-title { margin: 0; font-size: clamp(30px, 4.4cqw, 44px); line-height: 1.06; letter-spacing: -.03em; font-weight: 650; text-wrap: balance; }
.hb-yj7-sub { margin: 14px 0 28px; max-width: 520px; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-yj7-list { display: grid; margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(255, 255, 255, .08); }
.hb-yj7-item { border-bottom: 1px solid rgba(255, 255, 255, .08); opacity: 0; transform: translateY(12px); }
.hb-yj7-seen .hb-yj7-item { animation: hb-yj7-rise .6s cubic-bezier(.2, .8, .2, 1) forwards; animation-delay: calc(var(--hb-yj7-i) * 90ms); }
.hb-yj7-row {
  position: relative;
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto;
  gap: 4px 18px;
  align-items: baseline;
  padding: 20px 8px;
  color: inherit;
  text-decoration: none;
  border-radius: 12px;
  transition: background .25s ease;
}
.hb-yj7-row:hover, .hb-yj7-row:focus-visible { background: rgba(255, 255, 255, .025); }
.hb-yj7-row:focus-visible { outline: 2px solid var(--hb-yj7-accent); outline-offset: -2px; }
.hb-yj7-num {
  color: #4a4a4a;
  font: 500 22px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: -.04em;
  font-variant-numeric: tabular-nums;
  transition: color .25s ease;
}
.hb-yj7-row:hover .hb-yj7-num, .hb-yj7-row:focus-visible .hb-yj7-num { color: var(--hb-yj7-accent); }
.hb-yj7-t { font-size: 17px; font-weight: 600; line-height: 1.35; letter-spacing: -.015em; }
.hb-yj7-t span {
  background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat;
  transition: background-size .35s cubic-bezier(.2, .8, .2, 1);
}
.hb-yj7-row:hover .hb-yj7-t span, .hb-yj7-row:focus-visible .hb-yj7-t span { background-size: 100% 1px; }
.hb-yj7-time { color: #6b6b6b; font-size: 12.5px; white-space: nowrap; font-variant-numeric: tabular-nums; }
.hb-yj7-meta { grid-column: 2 / -1; display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; color: #6b6b6b; font-size: 12.5px; }
.hb-yj7-topic { padding: 2px 8px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 999px; color: #a1a1a1; font-size: 11.5px; }
.hb-yj7-ex { grid-column: 2 / -1; display: grid; grid-template-rows: 0fr; transition: grid-template-rows .4s cubic-bezier(.2, .8, .2, 1); }
.hb-yj7-ex > span { overflow: hidden; color: #8f8f8f; font-size: 14px; line-height: 1.55; }
.hb-yj7-ex > span > span { display: block; padding-top: 8px; max-width: 560px; }
.hb-yj7-row:hover .hb-yj7-ex, .hb-yj7-row:focus-visible .hb-yj7-ex, .hb-yj7-first .hb-yj7-ex { grid-template-rows: 1fr; }
.hb-yj7-archive { display: inline-flex; align-items: center; gap: 8px; margin-top: 22px; color: #a1a1a1; font-size: 14px; text-decoration: none; transition: color .2s ease; }
.hb-yj7-archive:hover { color: #ededed; }
.hb-yj7-archive:focus-visible { outline: 2px solid var(--hb-yj7-accent); outline-offset: 3px; border-radius: 4px; }
@container (max-width: 520px) {
  .hb-yj7-row { grid-template-columns: 44px minmax(0, 1fr); }
  .hb-yj7-num { font-size: 16px; }
  .hb-yj7-time { display: none; }
}
.hb-yj7-box {
  position: relative;
  padding: 28px;
  border-radius: 22px;
  background:
    radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, var(--hb-yj7-accent) 16%, transparent), transparent 60%),
    linear-gradient(180deg, #151515, #0f0f0f);
  border: 1px solid rgba(255, 255, 255, .08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 30px 60px -30px rgba(0, 0, 0, .8);
}
@container (min-width: 880px) { .hb-yj7-box { position: sticky; top: 24px; margin-top: 52px; } }
.hb-yj7-box::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: conic-gradient(from var(--hb-yj7-angle, 0deg), transparent 0 70%, var(--hb-yj7-accent) 85%, transparent 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  animation: hb-yj7-spin 6s linear infinite;
  pointer-events: none;
}
@property --hb-yj7-angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.hb-yj7-env {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, .05);
  border: 1px solid rgba(255, 255, 255, .08);
  color: var(--hb-yj7-accent);
}
.hb-yj7-box h3 { margin: 18px 0 0; font-size: 22px; line-height: 1.2; letter-spacing: -.02em; font-weight: 640; }
.hb-yj7-box p { margin: 10px 0 0; color: #8f8f8f; font-size: 14.5px; line-height: 1.55; }
.hb-yj7-form { display: grid; gap: 10px; margin-top: 22px; }
.hb-yj7-input {
  width: 100%;
  height: 46px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 12px;
  background: #0a0a0a;
  color: #ededed;
  font: inherit;
  font-size: 14.5px;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.hb-yj7-input::placeholder { color: #5f5f5f; }
.hb-yj7-input:focus { outline: none; border-color: var(--hb-yj7-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-yj7-accent) 18%, transparent); }
.hb-yj7-input[aria-invalid="true"] { border-color: #f87171; }
.hb-yj7-btn {
  height: 46px;
  border: 0;
  border-radius: 12px;
  background: #ededed;
  color: #0a0a0a;
  font: inherit;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s ease, transform .2s ease;
}
.hb-yj7-btn:hover { background: #fff; }
.hb-yj7-btn:active { transform: scale(.98); }
.hb-yj7-btn:focus-visible { outline: 2px solid var(--hb-yj7-accent); outline-offset: 2px; }
.hb-yj7-btn:disabled { opacity: .6; cursor: default; }
.hb-yj7-err { margin: 0; color: #f87171; font-size: 13px; }
.hb-yj7-ok {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
  padding: 14px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--hb-yj7-accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--hb-yj7-accent) 30%, transparent);
  font-size: 14px;
  animation: hb-yj7-rise .4s ease both;
}
.hb-yj7-stats { display: flex; flex-wrap: wrap; gap: 14px 24px; margin-top: 22px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, .06); }
.hb-yj7-stats b { display: block; font-size: 18px; font-weight: 640; letter-spacing: -.02em; }
.hb-yj7-stats span { color: #6b6b6b; font-size: 12.5px; }
.hb-yj7-faces { display: flex; margin-top: 18px; align-items: center; gap: 10px; color: #8f8f8f; font-size: 13px; }
.hb-yj7-faces i {
  width: 26px;
  height: 26px;
  margin-left: -8px;
  border-radius: 50%;
  border: 2px solid #121212;
}
.hb-yj7-faces i:first-child { margin-left: 0; }
@keyframes hb-yj7-rise { to { opacity: 1; transform: none; } }
@keyframes hb-yj7-spin { to { --hb-yj7-angle: 360deg; } }
@media (prefers-reduced-motion: reduce) {
  .hb-yj7 *, .hb-yj7 *::before, .hb-yj7 *::after { animation: none !important; transition: none !important; }
  .hb-yj7-item { opacity: 1; transform: none; }
}
`;

const faces = ["#f59e0b", "#6366f1", "#ec4899", "#22d3ee", "#84cc16"];

export function BlogNewsletterIssues({
  name = "The Sunday Diff",
  title = "One sharp essay on product and design, every Sunday",
  subtitle = "Short, opinionated and free. Written by the team at Fieldwork for people who make software.",
  issues = defaultIssues,
  subscribers = "38,400",
  cadence = "Sundays, 7am",
  placeholder = "you@company.com",
  buttonLabel = "Subscribe",
  successMessage = "You are in. Issue 149 lands on Sunday.",
  archive = { label: "Browse all 148 issues", href: "#" },
  accent = "#10b981",
  onSubscribe,
  className,
  style,
  ...rest
}: BlogNewsletterIssuesProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "error" | "loading" | "done">("idle");
  const [seen, setSeen] = React.useState(false);
  const listRef = React.useRef<HTMLUListElement>(null);
  const inputId = React.useId();

  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await onSubscribe?.(email.trim());
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className={["hb-yj7", seen ? "hb-yj7-seen" : "", className].filter(Boolean).join(" ")}
      style={{ "--hb-yj7-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-blog-newsletter-issues" precedence="default">{css}</style>
      <div className="hb-yj7-inner">
        <div>
          <div className="hb-yj7-mast">
            <span className="hb-yj7-logo" aria-hidden="true">
              {name.replace(/^The\s+/i, "").charAt(0)}
            </span>
            <span className="hb-yj7-name">
              {name}
              <span>Issue {issues[0]?.number ?? 1} is out</span>
            </span>
          </div>
          <h2 className="hb-yj7-title">{title}</h2>
          {subtitle ? <p className="hb-yj7-sub">{subtitle}</p> : null}
          <ul className="hb-yj7-list" ref={listRef}>
            {issues.map((it, i) => (
              <li key={it.number} className={i === 0 ? "hb-yj7-item hb-yj7-first" : "hb-yj7-item"} style={{ "--hb-yj7-i": i } as React.CSSProperties}>
                <a className="hb-yj7-row" href={it.href}>
                  <span className="hb-yj7-num">#{it.number}</span>
                  <span className="hb-yj7-t">
                    <span>{it.title}</span>
                  </span>
                  <span className="hb-yj7-time">{it.readTime}</span>
                  <span className="hb-yj7-meta">
                    {it.date}
                    {(it.topics ?? []).map((t) => (
                      <span className="hb-yj7-topic" key={t}>
                        {t}
                      </span>
                    ))}
                  </span>
                  <span className="hb-yj7-ex">
                    <span>
                      <span>{it.excerpt}</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {archive ? (
            <a className="hb-yj7-archive" href={archive.href}>
              {archive.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
        </div>
        <aside className="hb-yj7-box">
          <span className="hb-yj7-env" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3>Get the next issue</h3>
          <p>No tracking pixels, no sponsored takes. Unsubscribe with one click.</p>
          {status === "done" ? (
            <div className="hb-yj7-ok" role="status">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="m5.5 10.3 3 3 6-6.2" stroke="var(--hb-yj7-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {successMessage}
            </div>
          ) : (
            <form className="hb-yj7-form" onSubmit={submit} noValidate>
              <label htmlFor={inputId} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                Email address
              </label>
              <input
                id={inputId}
                className="hb-yj7-input"
                type="email"
                autoComplete="email"
                placeholder={placeholder}
                value={email}
                aria-invalid={status === "error"}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
              />
              <button className="hb-yj7-btn" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Subscribing…" : buttonLabel}
              </button>
              {status === "error" ? (
                <p className="hb-yj7-err" role="alert">
                  Please enter a valid email address.
                </p>
              ) : null}
            </form>
          )}
          <div className="hb-yj7-faces">
            <span style={{ display: "flex" }} aria-hidden="true">
              {faces.map((c, i) => (
                <i key={i} style={{ background: `linear-gradient(135deg, ${c}, #1a1a1a)` }} />
              ))}
            </span>
            Read by designers at 900+ companies
          </div>
          <div className="hb-yj7-stats">
            <div>
              <b>{subscribers}</b>
              <span>readers</span>
            </div>
            <div>
              <b>61%</b>
              <span>open rate</span>
            </div>
            <div>
              <b>{cadence}</b>
              <span>delivery</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
