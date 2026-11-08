"use client";

import * as React from "react";

export interface PopupCookieVendor {
  name: string;
  duration: string;
}

export interface PopupCookieCategory {
  id: string;
  label: string;
  description: string;
  required?: boolean;
  defaultEnabled?: boolean;
  vendors?: PopupCookieVendor[];
}

export interface PopupCookiePreferencesProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  categories?: PopupCookieCategory[];
  layout?: "card" | "bar";
  title?: string;
  description?: string;
  policyHref?: string;
  defaultOpen?: boolean;
  onConsent?: (choices: Record<string, boolean>) => void;
  embedded?: boolean;
  accent?: string;
}

const defaultCategories: PopupCookieCategory[] = [
  {
    id: "necessary",
    label: "Strictly necessary",
    description: "Sign-in, checkout and security. The site does not work without these.",
    required: true,
    vendors: [
      { name: "Session", duration: "Session" },
      { name: "CSRF token", duration: "Session" },
    ],
  },
  {
    id: "functional",
    label: "Preferences",
    description: "Remember your language, currency and recently viewed items.",
    defaultEnabled: true,
    vendors: [{ name: "Locale", duration: "1 year" }],
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Anonymous page views that tell us which features people actually use.",
    vendors: [
      { name: "Plausible", duration: "None" },
      { name: "Hotjar", duration: "1 year" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Measure ad campaigns and show you relevant offers on other sites.",
    vendors: [
      { name: "Meta Pixel", duration: "3 months" },
      { name: "Google Ads", duration: "13 months" },
    ],
  },
];

function refId(text: string) {
  let x = 2166136261;
  for (let i = 0; i < text.length; i++) x = Math.imul(x ^ text.charCodeAt(i), 16777619);
  const a = (x >>> 0).toString(16).toUpperCase().padStart(8, "0");
  return `${a.slice(0, 4)}-${a.slice(4)}`;
}

const css = `
.hb-xf4 { --hb-xf4-accent: #c08a4a; box-sizing: border-box; font-family: inherit; color: #ededed; }
.hb-xf4 *, .hb-xf4 *::before, .hb-xf4 *::after { box-sizing: border-box; }
.hb-xf4-dock { position: fixed; z-index: 900; left: 16px; bottom: 16px; width: min(392px, calc(100vw - 32px)); }
.hb-xf4[data-layout="bar"] .hb-xf4-dock { left: 16px; right: 16px; width: auto; max-width: 980px; margin: 0 auto; }
.hb-xf4-embedded .hb-xf4-dock { position: relative; left: auto; right: auto; bottom: auto; width: 100%; max-width: none; }
.hb-xf4-card { position: relative; border-radius: 20px; background: linear-gradient(180deg, #171717, #111 45%); border: 1px solid #2a2a2a; box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 30px 60px -24px rgba(0,0,0,.85); overflow: hidden; animation: hb-xf4-rise .5s cubic-bezier(.16,1,.3,1) both; }
.hb-xf4-main { display: grid; grid-template-columns: auto 1fr; gap: 14px; padding: 16px 16px 14px; align-items: start; }
.hb-xf4[data-layout="bar"] .hb-xf4-main { grid-template-columns: auto 1fr auto; align-items: center; }
.hb-xf4-dial { position: relative; width: 44px; height: 44px; flex: none; }
.hb-xf4-dial svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-xf4-arc { fill: none; stroke-width: 4; stroke-linecap: round; transition: stroke .35s cubic-bezier(.3,.7,.4,1), opacity .35s; }
.hb-xf4-dial b { position: absolute; inset: 0; display: grid; place-items: center; font-size: 11px; font-weight: 600; font-variant-numeric: tabular-nums; color: #ededed; }
.hb-xf4-title { margin: 0; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-xf4-desc { margin: 4px 0 0; font-size: 12.5px; line-height: 1.5; color: #a1a1a1; }
.hb-xf4-desc a { color: #ededed; text-decoration: underline; text-decoration-color: #555; text-underline-offset: 2px; }
.hb-xf4-desc a:focus-visible { outline: 2px solid var(--hb-xf4-accent); outline-offset: 2px; border-radius: 2px; }
.hb-xf4-actions { display: flex; gap: 6px; padding: 0 16px 16px; flex-wrap: wrap; }
.hb-xf4[data-layout="bar"] .hb-xf4-actions { padding: 0; flex-wrap: nowrap; }
.hb-xf4-btn { all: unset; box-sizing: border-box; flex: 1 1 auto; display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 34px; padding: 0 14px; border-radius: 10px; font-size: 12.5px; font-weight: 600; white-space: nowrap; cursor: pointer; transition: background .2s, border-color .2s, transform .15s cubic-bezier(.3,.7,.4,1), color .2s; }
.hb-xf4-btn:active { transform: scale(.97); }
.hb-xf4-btn:focus-visible { outline: 2px solid var(--hb-xf4-accent); outline-offset: 2px; }
.hb-xf4-primary { color: #0a0a0a; background: linear-gradient(#f4f4f4, #dcdcdc); box-shadow: inset 0 -1px 0 rgba(0,0,0,.18); }
.hb-xf4-primary:hover { background: #fff; }
.hb-xf4-quiet { color: #ededed; background: #1a1a1a; border: 1px solid #2c2c2c; }
.hb-xf4-quiet:hover { border-color: #3c3c3c; background: #1e1e1e; }
.hb-xf4-link { flex: 0 0 auto; color: #a1a1a1; padding: 0 8px; }
.hb-xf4-link:hover { color: #ededed; }
.hb-xf4-link svg { width: 12px; height: 12px; transition: transform .3s cubic-bezier(.3,.7,.4,1); }
.hb-xf4-link[aria-expanded="true"] svg { transform: rotate(180deg); }
.hb-xf4-prefs { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s cubic-bezier(.16,1,.3,1); }
.hb-xf4-prefs[data-open="true"] { grid-template-rows: 1fr; }
.hb-xf4-prefs > div { overflow: hidden; min-height: 0; }
.hb-xf4-list { list-style: none; margin: 0; padding: 0 10px 6px; display: grid; gap: 4px; max-height: min(48dvh, 320px); overflow: auto; }
.hb-xf4-row { border-radius: 12px; background: #141414; border: 1px solid #222; transition: border-color .25s; }
.hb-xf4-row[data-on="true"] { border-color: color-mix(in srgb, var(--hb-xf4-accent) 30%, #222); }
.hb-xf4-rowhead { display: flex; align-items: center; gap: 10px; padding: 10px 10px 10px 12px; }
.hb-xf4-rowtext { flex: 1; min-width: 0; }
.hb-xf4-rowlabel { display: flex; align-items: center; gap: 6px; margin: 0; font-size: 12.5px; font-weight: 600; }
.hb-xf4-count { font-size: 10.5px; font-weight: 500; color: #8f8f8f; padding: 1px 6px; border-radius: 999px; background: #1d1d1d; border: 1px solid #2a2a2a; }
.hb-xf4-rowdesc { margin: 3px 0 0; font-size: 11.5px; line-height: 1.45; color: #8f8f8f; }
.hb-xf4-more { all: unset; box-sizing: border-box; margin-top: 4px; font-size: 11px; color: color-mix(in srgb, var(--hb-xf4-accent) 75%, #fff); cursor: pointer; }
.hb-xf4-more:focus-visible { outline: 2px solid var(--hb-xf4-accent); outline-offset: 2px; border-radius: 3px; }
.hb-xf4-vendors { display: grid; gap: 2px; margin: 6px 0 0; padding: 0; list-style: none; animation: hb-xf4-fade .3s ease both; }
.hb-xf4-vendors li { display: flex; justify-content: space-between; font-size: 11px; color: #a1a1a1; padding: 4px 8px; border-radius: 6px; background: #101010; }
.hb-xf4-vendors span:last-child { font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; color: #7a7a7a; }
.hb-xf4-switch { all: unset; box-sizing: border-box; position: relative; width: 38px; height: 22px; border-radius: 999px; flex: none; background: #262626; box-shadow: inset 0 1px 2px rgba(0,0,0,.6); cursor: pointer; transition: background .3s cubic-bezier(.3,.7,.4,1); }
.hb-xf4-switch::after { content: ""; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(#fff, #d8d8d8); box-shadow: 0 2px 4px rgba(0,0,0,.4); transition: transform .35s cubic-bezier(.3,1.4,.5,1), width .2s; }
.hb-xf4-switch:active::after { width: 20px; }
.hb-xf4-switch[aria-checked="true"] { background: var(--hb-xf4-accent); }
.hb-xf4-switch[aria-checked="true"]::after { transform: translateX(16px); }
.hb-xf4-switch[aria-checked="true"]:active::after { transform: translateX(12px); }
.hb-xf4-switch:focus-visible { outline: 2px solid var(--hb-xf4-accent); outline-offset: 2px; }
.hb-xf4-switch[aria-disabled="true"] { cursor: not-allowed; opacity: .55; }
.hb-xf4-lock { display: grid; place-items: center; width: 22px; height: 22px; color: #6f6f6f; }
.hb-xf4-lock svg { width: 13px; height: 13px; }
.hb-xf4-save { display: flex; gap: 6px; padding: 8px 10px 12px; }
.hb-xf4-launch { all: unset; box-sizing: border-box; position: fixed; z-index: 900; left: 16px; bottom: 16px; display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 14px 0 6px; border-radius: 999px; background: #151515; border: 1px solid #2a2a2a; color: #ededed; font-size: 12px; box-shadow: 0 14px 30px -14px rgba(0,0,0,.8); cursor: pointer; animation: hb-xf4-rise .45s cubic-bezier(.16,1,.3,1) both; transition: border-color .2s; }
.hb-xf4-embedded .hb-xf4-launch { position: relative; left: auto; bottom: auto; }
.hb-xf4-launch:hover { border-color: #3a3a3a; }
.hb-xf4-launch:focus-visible { outline: 2px solid var(--hb-xf4-accent); outline-offset: 2px; }
.hb-xf4-launch .hb-xf4-dial { width: 28px; height: 28px; }
.hb-xf4-launch .hb-xf4-dial b { font-size: 9px; }
.hb-xf4-launch small { font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; color: #7a7a7a; }
.hb-xf4-embedded { display: grid; place-items: center; width: 100%; }
@keyframes hb-xf4-rise { from { opacity: 0; transform: translateY(16px) scale(.98); } }
@keyframes hb-xf4-fade { from { opacity: 0; transform: translateY(-3px); } }
@media (max-width: 560px) {
  .hb-xf4[data-layout="bar"] .hb-xf4-main { grid-template-columns: auto 1fr; }
  .hb-xf4[data-layout="bar"] .hb-xf4-actions { grid-column: 1 / -1; flex-wrap: wrap; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xf4 *, .hb-xf4 *::after { animation: none !important; transition: none !important; }
}
`;

function Dial({ categories, choices }: { categories: PopupCookieCategory[]; choices: Record<string, boolean> }) {
  const n = categories.length || 1;
  const r = 18;
  const c = 2 * Math.PI * r;
  const gap = 5;
  const seg = c / n - gap;
  const on = categories.filter((x) => choices[x.id]).length;
  return (
    <span className="hb-xf4-dial" aria-hidden="true">
      <svg viewBox="0 0 44 44">
        {categories.map((cat, i) => (
          <circle
            key={cat.id}
            className="hb-xf4-arc"
            cx="22"
            cy="22"
            r={r}
            strokeDasharray={`${seg.toFixed(2)} ${(c - seg).toFixed(2)}`}
            strokeDashoffset={(-(c / n) * i - gap / 2).toFixed(2)}
            style={{ stroke: choices[cat.id] ? "var(--hb-xf4-accent)" : "#2c2c2c" }}
          />
        ))}
      </svg>
      <b>{on}/{n}</b>
    </span>
  );
}

export function PopupCookiePreferences({
  categories = defaultCategories,
  layout = "card",
  title = "We use cookies, sparingly",
  description = "Only what keeps the store running is on by default. Choose what else you are comfortable with.",
  policyHref = "#cookies",
  defaultOpen = true,
  onConsent,
  embedded = false,
  accent = "#c08a4a",
  className = "",
  style,
  ...rest
}: PopupCookiePreferencesProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const initial = React.useMemo(() => {
    const out: Record<string, boolean> = {};
    for (const c of categories) out[c.id] = Boolean(c.required || c.defaultEnabled);
    return out;
  }, [categories]);
  const [view, setView] = React.useState<"banner" | "saved">(defaultOpen ? "banner" : "saved");
  const [prefs, setPrefs] = React.useState(false);
  const [choices, setChoices] = React.useState(initial);
  const [vendorsOpen, setVendorsOpen] = React.useState<string | null>(null);
  const [savedRef, setSavedRef] = React.useState("");
  const listRef = React.useRef<HTMLUListElement>(null);
  const launchRef = React.useRef<HTMLButtonElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const focusNext = React.useRef<"card" | "launch" | "list" | null>(null);

  React.useEffect(() => {
    const target = focusNext.current;
    if (!target) return;
    focusNext.current = null;
    const frame = requestAnimationFrame(() => {
      if (target === "launch") launchRef.current?.focus({ preventScroll: true });
      if (target === "card") cardRef.current?.querySelector<HTMLElement>(".hb-xf4-btn")?.focus({ preventScroll: true });
      if (target === "list") listRef.current?.querySelector<HTMLElement>(".hb-xf4-switch:not([aria-disabled='true'])")?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [view, prefs]);

  const commit = (next: Record<string, boolean>) => {
    setChoices(next);
    setSavedRef(refId(JSON.stringify(next)));
    onConsent?.(next);
    setPrefs(false);
    setVendorsOpen(null);
    focusNext.current = "launch";
    setView("saved");
  };

  const all = (value: boolean) => {
    const next: Record<string, boolean> = {};
    for (const c of categories) next[c.id] = c.required ? true : value;
    commit(next);
  };

  const togglePrefs = () => {
    const next = !prefs;
    if (next) focusNext.current = "list";
    setPrefs(next);
  };

  const vars = { "--hb-xf4-accent": accent } as React.CSSProperties;

  return (
    <div className={`hb-xf4 ${embedded ? "hb-xf4-embedded" : ""} ${className}`} data-layout={layout} style={{ ...vars, ...style }} {...rest}>
      <style href="hb-popup-cookie-preferences" precedence="default">{css}</style>
      {view === "saved" ? (
        <button
          ref={launchRef}
          type="button"
          className="hb-xf4-launch"
          aria-label="Cookie settings"
          onClick={() => {
            focusNext.current = "card";
            setView("banner");
          }}
        >
          <Dial categories={categories} choices={choices} />
          <span>Cookie settings</span>
          {savedRef && <small aria-live="polite">Saved · {savedRef}</small>}
        </button>
      ) : (
        <div className="hb-xf4-dock">
          <div
            ref={cardRef}
            className="hb-xf4-card"
            role="dialog"
            aria-modal="false"
            aria-labelledby={`${uid}-t`}
            aria-describedby={`${uid}-d`}
            onKeyDown={(e) => {
              if (e.key === "Escape" && prefs) {
                e.stopPropagation();
                focusNext.current = "card";
                setPrefs(false);
              }
            }}
          >
            <div className="hb-xf4-main">
              <Dial categories={categories} choices={choices} />
              <div style={{ minWidth: 0 }}>
                <p className="hb-xf4-title" id={`${uid}-t`}>{title}</p>
                <p className="hb-xf4-desc" id={`${uid}-d`}>
                  {description} <a href={policyHref}>Cookie policy</a>
                </p>
              </div>
              {layout === "bar" && !prefs && (
                <div className="hb-xf4-actions">
                  <button type="button" className="hb-xf4-btn hb-xf4-link" aria-expanded={prefs} aria-controls={`${uid}-p`} onClick={togglePrefs}>
                    Customize
                  </button>
                  <button type="button" className="hb-xf4-btn hb-xf4-quiet" onClick={() => all(false)}>Reject all</button>
                  <button type="button" className="hb-xf4-btn hb-xf4-primary" onClick={() => all(true)}>Accept all</button>
                </div>
              )}
            </div>
            {layout === "card" && !prefs && (
              <div className="hb-xf4-actions">
                <button type="button" className="hb-xf4-btn hb-xf4-quiet" onClick={() => all(false)}>Reject all</button>
                <button type="button" className="hb-xf4-btn hb-xf4-primary" onClick={() => all(true)}>Accept all</button>
                <button type="button" className="hb-xf4-btn hb-xf4-link" aria-expanded={prefs} aria-controls={`${uid}-p`} onClick={togglePrefs}>
                  Customize
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>
                </button>
              </div>
            )}
            <div className="hb-xf4-prefs" data-open={prefs} id={`${uid}-p`} inert={!prefs}>
              <div>
                <ul className="hb-xf4-list" ref={listRef}>
                  {categories.map((cat) => {
                    const on = Boolean(choices[cat.id]);
                    const vendors = cat.vendors ?? [];
                    return (
                      <li key={cat.id} className="hb-xf4-row" data-on={on}>
                        <div className="hb-xf4-rowhead">
                          <div className="hb-xf4-rowtext">
                            <p className="hb-xf4-rowlabel" id={`${uid}-${cat.id}`}>
                              {cat.label}
                              {vendors.length > 0 && <span className="hb-xf4-count">{vendors.length}</span>}
                            </p>
                            <p className="hb-xf4-rowdesc">{cat.description}</p>
                            {vendors.length > 0 && (
                              <button
                                type="button"
                                className="hb-xf4-more"
                                aria-expanded={vendorsOpen === cat.id}
                                onClick={() => setVendorsOpen((v) => (v === cat.id ? null : cat.id))}
                              >
                                {vendorsOpen === cat.id ? "Hide vendors" : "Show vendors"}
                              </button>
                            )}
                            {vendorsOpen === cat.id && (
                              <ul className="hb-xf4-vendors">
                                {vendors.map((v) => (
                                  <li key={v.name}><span>{v.name}</span><span>{v.duration}</span></li>
                                ))}
                              </ul>
                            )}
                          </div>
                          {cat.required && (
                            <span className="hb-xf4-lock" title="Always on">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
                            </span>
                          )}
                          <button
                            type="button"
                            role="switch"
                            className="hb-xf4-switch"
                            aria-checked={on}
                            aria-labelledby={`${uid}-${cat.id}`}
                            aria-disabled={cat.required ? true : undefined}
                            onClick={() => {
                              if (cat.required) return;
                              setChoices((c) => ({ ...c, [cat.id]: !c[cat.id] }));
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="hb-xf4-save">
                  <button type="button" className="hb-xf4-btn hb-xf4-link" onClick={() => { focusNext.current = "card"; setPrefs(false); }}>Back</button>
                  <button type="button" className="hb-xf4-btn hb-xf4-quiet" onClick={() => all(false)}>Reject all</button>
                  <button type="button" className="hb-xf4-btn hb-xf4-primary" onClick={() => commit(choices)}>Save choices</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
