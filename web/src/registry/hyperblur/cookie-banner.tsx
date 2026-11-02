"use client";

import * as React from "react";

export type CookiePlacement = "bottom-left" | "bottom-center" | "inline";

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieBannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange" | "title"> {
  title?: string;
  description?: string;
  placement?: CookiePlacement;
  defaultPreferences?: { analytics?: boolean; marketing?: boolean };
  onChange?: (preferences: CookiePreferences) => void;
  policyHref?: string;
  accent?: string;
}

const categories: { id: "necessary" | "analytics" | "marketing"; label: string; description: string }[] = [
  { id: "necessary", label: "Necessary", description: "Sign-in, security and load balancing. Always on." },
  { id: "analytics", label: "Analytics", description: "Anonymous usage stats that help us improve pages." },
  { id: "marketing", label: "Marketing", description: "Measures campaigns and personalizes ads." },
];

const css = `
.hb-ckb {
  --hb-ckb-a: #2f7bff;
  container: hb-ckb / inline-size;
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-ckb *, .hb-ckb *::before, .hb-ckb *::after { box-sizing: border-box; }
.hb-ckb[data-placement="bottom-left"],
.hb-ckb[data-placement="bottom-center"] {
  position: fixed;
  bottom: 16px;
  z-index: 2147482000;
  width: min(420px, calc(100vw - 32px));
}
.hb-ckb[data-placement="bottom-left"] { left: 16px; }
.hb-ckb[data-placement="bottom-center"] { left: 0; right: 0; margin: 0 auto; width: min(560px, calc(100vw - 32px)); }
.hb-ckb-card {
  padding: 16px;
  border-radius: 16px;
  background: #111111;
  box-shadow: inset 0 0 0 1px #2a2a2a, 0 18px 50px rgba(0, 0, 0, 0.5);
  animation: hb-ckb-in 0.5s cubic-bezier(0.2, 0.9, 0.2, 1) both;
}
.hb-ckb[data-closing="true"] .hb-ckb-card { animation: hb-ckb-out 0.28s cubic-bezier(0.4, 0, 1, 1) forwards; }
.hb-ckb-head { display: flex; align-items: center; gap: 9px; min-width: 0; }
.hb-ckb-icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--hb-ckb-a) 15%, transparent);
  color: color-mix(in srgb, var(--hb-ckb-a) 55%, #fff);
}
.hb-ckb-icon svg { width: 15px; height: 15px; }
.hb-ckb-title { margin: 0; color: #fff; font-size: 14.5px; font-weight: 600; letter-spacing: -0.005em; }
.hb-ckb-desc { margin: 8px 0 0; color: #a1a1a1; font-size: 13px; line-height: 1.5; }
.hb-ckb-desc a { color: #d4d4d4; text-underline-offset: 3px; }
.hb-ckb-desc a:hover { color: #fff; }
.hb-ckb-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.hb-ckb-btn {
  flex: 1 1 0;
  min-width: max-content;
  height: 36px;
  margin: 0;
  padding: 0 14px;
  border: 0;
  border-radius: 10px;
  background: #1c1c1c;
  box-shadow: inset 0 0 0 1px #2e2e2e;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  font-weight: 550;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease, filter 0.2s ease;
}
.hb-ckb-btn:hover { background: #242424; }
.hb-ckb-btn:active { transform: scale(0.97); }
.hb-ckb-btn[data-primary="true"] {
  background: var(--hb-ckb-a);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
  color: #fff;
}
.hb-ckb-btn[data-primary="true"]:hover { filter: brightness(1.1); }
.hb-ckb-more {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex: none;
  margin: 0 0 0 auto;
  padding: 3px 4px;
  border: 0;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 12.5px;
  cursor: pointer;
  transition: color 0.2s ease;
}
.hb-ckb-more:hover { color: #fff; }
.hb-ckb-more svg { width: 11px; height: 11px; transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.2, 1); }
.hb-ckb-more[aria-expanded="true"] svg { transform: rotate(180deg); }
.hb-ckb-btn:focus-visible,
.hb-ckb-more:focus-visible,
.hb-ckb-sw:focus-visible,
.hb-ckb-desc a:focus-visible {
  outline: 2px solid var(--hb-ckb-a);
  outline-offset: 2px;
  border-radius: 8px;
}
.hb-ckb-panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows 0.35s cubic-bezier(0.2, 0.9, 0.2, 1), visibility 0s linear 0.35s;
}
.hb-ckb-panel[data-open="true"] {
  grid-template-rows: 1fr;
  visibility: visible;
  transition: grid-template-rows 0.35s cubic-bezier(0.2, 0.9, 0.2, 1), visibility 0s;
}
.hb-ckb-inner { min-height: 0; overflow: hidden; }
.hb-ckb-list { margin: 12px 0 0; padding: 0; list-style: none; border-top: 1px solid #222; }
.hb-ckb-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 12px 0; border-bottom: 1px solid #222; }
.hb-ckb-txt { min-width: 0; }
.hb-ckb-lbl { display: flex; align-items: center; gap: 6px; color: #f2f2f2; font-size: 13px; font-weight: 550; }
.hb-ckb-lbl svg { width: 11px; height: 11px; color: #6b6b6b; }
.hb-ckb-sub { display: block; margin-top: 2px; color: #8f8f8f; font-size: 12px; line-height: 1.4; }
.hb-ckb-sw {
  position: relative;
  flex: none;
  width: 38px;
  height: 22px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #2c2c2c;
  cursor: pointer;
  transition: background 0.25s ease;
}
.hb-ckb-sw::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.hb-ckb-sw[aria-checked="true"] { background: var(--hb-ckb-a); }
.hb-ckb-sw[aria-checked="true"]::after { transform: translateX(16px); }
.hb-ckb-sw[aria-disabled="true"] { cursor: not-allowed; opacity: 0.55; }
.hb-ckb-save { width: 100%; margin-top: 12px; flex: none; }
@keyframes hb-ckb-in {
  from { opacity: 0; transform: translateY(28px) scale(0.98); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ckb-out {
  to { opacity: 0; transform: translateY(20px) scale(0.98); }
}
@container hb-ckb (max-width: 299px) {
  .hb-ckb-btn { flex-basis: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ckb-card, .hb-ckb[data-closing="true"] .hb-ckb-card { animation: none; }
  .hb-ckb[data-closing="true"] .hb-ckb-card { opacity: 0; }
  .hb-ckb-btn, .hb-ckb-more svg, .hb-ckb-panel, .hb-ckb-sw, .hb-ckb-sw::after { transition: none; }
}
`;

export function CookieBanner({
  title = "We value your privacy",
  description = "We use cookies to run the site and understand how it is used. Choose what you allow.",
  placement = "inline",
  defaultPreferences,
  onChange,
  policyHref,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: CookieBannerProps) {
  const uid = React.useId();
  const [prefs, setPrefs] = React.useState({
    analytics: defaultPreferences?.analytics ?? false,
    marketing: defaultPreferences?.marketing ?? false,
  });
  const [expanded, setExpanded] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const [gone, setGone] = React.useState(false);

  React.useEffect(() => {
    if (!closing) return;
    const id = window.setTimeout(() => setGone(true), 300);
    return () => window.clearTimeout(id);
  }, [closing]);

  if (gone) return null;

  function commit(next: { analytics: boolean; marketing: boolean }) {
    setPrefs(next);
    setClosing(true);
    onChange?.({ necessary: true, ...next });
  }

  const rootStyle = { "--hb-ckb-a": accent, ...style } as React.CSSProperties;

  return (
    <div
      className={`hb-ckb ${className}`}
      data-placement={placement}
      data-closing={closing ? "true" : "false"}
      style={rootStyle}
      {...rest}
    >
      <style href="hb-cookie-banner" precedence="default">{css}</style>
      <section className="hb-ckb-card" role="region" aria-labelledby={`${uid}-t`} aria-describedby={`${uid}-d`}>
        <div className="hb-ckb-head">
          <span className="hb-ckb-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-4-4 1 1 0 0 0-1-1z" />
              <path d="M8.5 11.5h.01M12 16h.01M15.5 13h.01" />
            </svg>
          </span>
          <h2 className="hb-ckb-title" id={`${uid}-t`}>{title}</h2>
          <button
            type="button"
            className="hb-ckb-more"
            aria-expanded={expanded}
            aria-controls={`${uid}-p`}
            onClick={() => setExpanded((v) => !v)}
          >
            Customize
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m3 4.5 3 3 3-3" />
            </svg>
          </button>
        </div>
        <p className="hb-ckb-desc" id={`${uid}-d`}>
          {description}
          {policyHref && (
            <>
              {" "}
              <a href={policyHref}>Cookie policy</a>
            </>
          )}
        </p>
        <div className="hb-ckb-actions">
          <button type="button" className="hb-ckb-btn" data-primary="true" onClick={() => commit({ analytics: true, marketing: true })}>
            Accept all
          </button>
          <button type="button" className="hb-ckb-btn" onClick={() => commit({ analytics: false, marketing: false })}>
            Reject non-essential
          </button>
        </div>
        <div className="hb-ckb-panel" id={`${uid}-p`} data-open={expanded ? "true" : "false"}>
          <div className="hb-ckb-inner">
            <ul className="hb-ckb-list">
              {categories.map((cat) => {
                const key = cat.id;
                const locked = key === "necessary";
                const on = key === "necessary" ? true : prefs[key];
                return (
                  <li className="hb-ckb-row" key={cat.id}>
                    <div className="hb-ckb-txt">
                      <span className="hb-ckb-lbl" id={`${uid}-${cat.id}`}>
                        {cat.label}
                        {locked && (
                          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="2.5" y="5.5" width="7" height="5" rx="1.2" />
                            <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
                          </svg>
                        )}
                      </span>
                      <span className="hb-ckb-sub" id={`${uid}-${cat.id}-d`}>{cat.description}</span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      className="hb-ckb-sw"
                      aria-checked={on}
                      aria-disabled={locked}
                      aria-labelledby={`${uid}-${cat.id}`}
                      aria-describedby={`${uid}-${cat.id}-d`}
                      tabIndex={expanded ? 0 : -1}
                      onClick={() => {
                        if (key !== "necessary") setPrefs((p) => ({ ...p, [key]: !p[key] }));
                      }}
                    />
                  </li>
                );
              })}
            </ul>
            <button type="button" className="hb-ckb-btn hb-ckb-save" tabIndex={expanded ? 0 : -1} onClick={() => commit(prefs)}>
              Save preferences
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
