"use client";

import * as React from "react";

export interface NavbarTabsStretchTab {
  label: string;
  href: string;
  count?: number;
}

export interface NavbarTabsStretchProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onChange"> {
  brand?: string;
  tabs?: NavbarTabsStretchTab[];
  value?: number;
  defaultValue?: number;
  onValueChange?: (index: number) => void;
  user?: { name: string; initials?: string } | null;
  onNew?: () => void;
  newLabel?: string;
  accent?: string;
  showBackdrop?: boolean;
}

const defaultTabs: NavbarTabsStretchTab[] = [
  { label: "Overview", href: "#overview" },
  { label: "Deployments", href: "#deployments", count: 12 },
  { label: "Analytics", href: "#analytics" },
  { label: "Logs", href: "#logs" },
  { label: "Storage", href: "#storage" },
  { label: "Integrations", href: "#integrations", count: 3 },
  { label: "Settings", href: "#settings" },
];

const ease = "cubic-bezier(.22,1,.36,1)";

const css = `
.hb-xj3 {
  --hb-xj3-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xj3 *, .hb-xj3 *::before, .hb-xj3 *::after { box-sizing: border-box; }
.hb-xj3[data-backdrop="true"] { min-height: 620px; overflow: hidden; }
.hb-xj3-head {
  position: relative;
  z-index: 3;
  border-bottom: 1px solid #1f1f1f;
  background: linear-gradient(180deg, #0f0f0f, #0b0b0b);
}
.hb-xj3-row { display: flex; align-items: center; gap: 12px; height: 58px; padding: 0 20px; }
.hb-xj3-brand { display: inline-flex; align-items: center; gap: 10px; color: #ededed; font-weight: 650; font-size: 15px; letter-spacing: -.02em; text-decoration: none; }
.hb-xj3-logo { width: 22px; height: 22px; flex: none; }
.hb-xj3-slash { color: #333; font-size: 22px; font-weight: 300; }
.hb-xj3-proj { display: inline-flex; align-items: center; gap: 8px; color: #d4d4d4; font-size: 14px; font-weight: 500; white-space: nowrap; }
.hb-xj3-proj i {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: conic-gradient(from 120deg, #f97316, #ec4899, #8b5cf6, #f97316);
  font-style: normal;
}
.hb-xj3-tag { height: 20px; padding: 0 7px; border: 1px solid #2a2a2a; border-radius: 6px; color: #8f8f8f; font-size: 11px; line-height: 18px; }
.hb-xj3-grow { flex: 1; }
.hb-xj3-new {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px 0 10px;
  border: 0;
  border-radius: 8px;
  background: #ededed;
  color: #0a0a0a;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
  transition: background-color .2s ease, transform .2s ${ease};
}
.hb-xj3-new:hover { background: #fff; }
.hb-xj3-new:active { transform: scale(.97); }
.hb-xj3-new svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; }
.hb-xj3-av {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 0 0 2px #0b0b0b, 0 0 0 3px #2a2a2a;
}
.hb-xj3-tabwrap { position: relative; padding: 0 12px; }
.hb-xj3-tabs {
  position: relative;
  display: flex;
  gap: 2px;
  margin: 0;
  padding: 0 0 0;
  list-style: none;
  overflow-x: auto;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}
.hb-xj3-tabs::-webkit-scrollbar { display: none; }
.hb-xj3-ghost {
  position: absolute;
  top: 6px;
  left: 0;
  height: 32px;
  width: var(--hb-xj3-gw, 0px);
  border-radius: 8px;
  background: rgba(255,255,255,.06);
  opacity: 0;
  transform: translateX(var(--hb-xj3-gx, 0px));
  transition: transform .35s ${ease}, width .35s ${ease}, opacity .2s ease;
  pointer-events: none;
}
.hb-xj3-tabs[data-hover="true"] .hb-xj3-ghost { opacity: 1; }
.hb-xj3-edge {
  position: absolute;
  bottom: 0;
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: linear-gradient(90deg, #ededed, var(--hb-xj3-accent), #ededed);
  background-size: 200% 100%;
  left: var(--hb-xj3-l, 0px);
  width: calc(var(--hb-xj3-r, 0px) - var(--hb-xj3-l, 0px));
  pointer-events: none;
}
.hb-xj3-edge::after {
  content: "";
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 0;
  height: 14px;
  background: radial-gradient(50% 100% at 50% 100%, color-mix(in srgb, var(--hb-xj3-accent) 45%, transparent), transparent);
  pointer-events: none;
}
.hb-xj3-tab {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 44px;
  padding: 0 12px;
  border: 0;
  background: none;
  color: #8f8f8f;
  font: inherit;
  font-size: 14px;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: color .2s ease;
}
.hb-xj3-tab:hover, .hb-xj3-tab[aria-selected="true"] { color: #ededed; }
.hb-xj3-tab:focus-visible { outline: none; }
.hb-xj3-tab:focus-visible::before { content: ""; position: absolute; inset: 7px 2px; border-radius: 8px; box-shadow: 0 0 0 2px var(--hb-xj3-accent); }
.hb-xj3-count {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: #1f1f1f;
  color: #a1a1a1;
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  transition: background-color .2s ease, color .2s ease;
}
.hb-xj3-tab[aria-selected="true"] .hb-xj3-count { background: color-mix(in srgb, var(--hb-xj3-accent) 22%, transparent); color: color-mix(in srgb, var(--hb-xj3-accent) 60%, #fff); }
.hb-xj3 a:focus-visible, .hb-xj3 button:not(.hb-xj3-tab):focus-visible { outline: 2px solid var(--hb-xj3-accent); outline-offset: 2px; }
@container (max-width: 640px) {
  .hb-xj3-row { padding: 0 14px; gap: 10px; }
  .hb-xj3-tag, .hb-xj3-word, .hb-xj3-newtext { display: none; }
  .hb-xj3-new { width: 32px; padding: 0; justify-content: center; }
  .hb-xj3-tabwrap { padding: 0 4px; }
  .hb-xj3-tabwrap::before, .hb-xj3-tabwrap::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 28px;
    pointer-events: none;
  }
  .hb-xj3-tabwrap::before { left: 0; background: linear-gradient(90deg, #0b0b0b, transparent); }
  .hb-xj3-tabwrap::after { right: 0; background: linear-gradient(270deg, #0b0b0b, transparent); }
}
.hb-xj3-page { padding: 28px 20px; display: grid; gap: 14px; }
.hb-xj3-ph { display: flex; justify-content: space-between; align-items: end; }
.hb-xj3-ph h2 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -.03em; }
.hb-xj3-ph p { margin: 4px 0 0; color: #8f8f8f; font-size: 13px; }
.hb-xj3-cards { display: grid; grid-template-columns: 2fr 1fr; gap: 14px; }
.hb-xj3-card { border: 1px solid #1f1f1f; border-radius: 12px; background: #111; padding: 16px; }
.hb-xj3-card h3 { margin: 0; color: #a1a1a1; font-size: 12px; font-weight: 500; }
.hb-xj3-card b { display: block; margin-top: 6px; font-size: 22px; font-weight: 600; letter-spacing: -.02em; }
.hb-xj3-spark { display: block; width: 100%; height: 120px; margin-top: 12px; }
.hb-xj3-dep { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-top: 1px solid #1c1c1c; font-size: 13px; color: #d4d4d4; }
.hb-xj3-dep:first-of-type { border-top: 0; margin-top: 8px; }
.hb-xj3-dep i { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; font-style: normal; box-shadow: 0 0 8px #22c55e; }
.hb-xj3-dep small { margin-left: auto; color: #6b6b6b; font-size: 12px; }
@container (max-width: 640px) { .hb-xj3-cards { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xj3 *, .hb-xj3 *::before, .hb-xj3 *::after { transition: none !important; animation: none !important; }
}
`;

export function NavbarTabsStretch({
  brand = "Northstar",
  tabs = defaultTabs,
  value,
  defaultValue = 1,
  onValueChange,
  user = { name: "Mara Lindqvist", initials: "ML" },
  onNew,
  newLabel = "New",
  accent = "#2f7bff",
  showBackdrop = true,
  className,
  style,
  ...rest
}: NavbarTabsStretchProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;
  const listRef = React.useRef<HTMLUListElement>(null);
  const edgeRef = React.useRef<HTMLSpanElement>(null);
  const ghostRef = React.useRef<HTMLLIElement>(null);
  const prevRef = React.useRef<number | null>(null);
  const tabRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const fillId = `hb-xj3-g${React.useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  React.useLayoutEffect(() => {
    const list = listRef.current;
    const edge = edgeRef.current;
    if (!list || !edge) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const place = (animate: boolean) => {
      const el = tabRefs.current[current];
      if (!el) return;
      const l = el.offsetLeft + 10;
      const r = el.offsetLeft + el.offsetWidth - 10;
      const prev = prevRef.current;
      if (!animate || reduce || prev === null || prev === current) {
        edge.style.transition = "none";
      } else {
        const right = current > prev;
        const lead = `.32s cubic-bezier(.3,.9,.3,1)`;
        const trail = `.5s cubic-bezier(.6,0,.2,1) .1s`;
        edge.style.transition = right ? `--hb-xj3-l ${trail}, --hb-xj3-r ${lead}` : `--hb-xj3-l ${lead}, --hb-xj3-r ${trail}`;
      }
      edge.style.setProperty("--hb-xj3-l", `${l}px`);
      edge.style.setProperty("--hb-xj3-r", `${r}px`);
      if (animate && prev !== current) {
        const pad = 40;
        if (el.offsetLeft - pad < list.scrollLeft) list.scrollTo({ left: el.offsetLeft - pad, behavior: reduce ? "auto" : "smooth" });
        else if (el.offsetLeft + el.offsetWidth + pad > list.scrollLeft + list.clientWidth)
          list.scrollTo({ left: el.offsetLeft + el.offsetWidth + pad - list.clientWidth, behavior: reduce ? "auto" : "smooth" });
      }
      prevRef.current = current;
    };
    place(true);
    const ro = new ResizeObserver(() => place(false));
    ro.observe(list);
    return () => ro.disconnect();
  }, [current, tabs]);

  const select = (i: number) => {
    if (value === undefined) setInner(i);
    onValueChange?.(i);
  };

  const hover = (i: number | null) => {
    const list = listRef.current;
    const ghost = ghostRef.current;
    if (!list || !ghost) return;
    if (i === null) {
      list.dataset.hover = "false";
      return;
    }
    const el = tabRefs.current[i];
    if (!el) return;
    const first = list.dataset.hover !== "true";
    if (first) ghost.style.transition = "opacity .2s ease";
    ghost.style.setProperty("--hb-xj3-gx", `${el.offsetLeft}px`);
    ghost.style.setProperty("--hb-xj3-gw", `${el.offsetWidth}px`);
    if (first) {
      void ghost.offsetWidth;
      ghost.style.transition = "";
    }
    list.dataset.hover = "true";
  };

  const onKey = (e: React.KeyboardEvent<HTMLAnchorElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <header
      className={["hb-xj3", className].filter(Boolean).join(" ")}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-xj3-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-navbar-tabs-stretch" precedence="default">
        {`@property --hb-xj3-l { syntax: "<length>"; inherits: true; initial-value: 0px; }
@property --hb-xj3-r { syntax: "<length>"; inherits: true; initial-value: 0px; }
${css}`}
      </style>
      <div className="hb-xj3-head">
        <div className="hb-xj3-row">
          <a className="hb-xj3-brand" href="#top" aria-label={brand}>
            <svg className="hb-xj3-logo" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2 14.6 9.4 22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6Z" fill="#ededed" />
            </svg>
            <span className="hb-xj3-word">{brand}</span>
          </a>
          <span className="hb-xj3-slash" aria-hidden="true">
            /
          </span>
          <span className="hb-xj3-proj">
            <i aria-hidden="true" />
            atlas-web
          </span>
          <span className="hb-xj3-tag">Hobby</span>
          <span className="hb-xj3-grow" />
          <button type="button" className="hb-xj3-new" onClick={onNew} aria-label={newLabel}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 3v10M3 8h10" />
            </svg>
            <span className="hb-xj3-newtext">{newLabel}</span>
          </button>
          {user && (
            <span className="hb-xj3-av" title={user.name} aria-label={user.name} role="img">
              {user.initials ?? user.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <nav className="hb-xj3-tabwrap" aria-label="Project">
          <ul className="hb-xj3-tabs" ref={listRef} role="tablist" onPointerLeave={() => hover(null)}>
            <li className="hb-xj3-ghost" ref={ghostRef} aria-hidden="true" role="presentation" />
            {tabs.map((t, i) => (
              <li key={t.href + i} role="presentation">
                <a
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  className="hb-xj3-tab"
                  href={t.href}
                  role="tab"
                  aria-selected={i === current}
                  tabIndex={i === current ? 0 : -1}
                  onClick={() => select(i)}
                  onPointerEnter={() => hover(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  {t.label}
                  {t.count !== undefined && <span className="hb-xj3-count">{t.count}</span>}
                </a>
              </li>
            ))}
            <li role="presentation" aria-hidden="true" style={{ position: "static" }}>
              <span className="hb-xj3-edge" ref={edgeRef} />
            </li>
          </ul>
        </nav>
      </div>
      {showBackdrop && (
        <div className="hb-xj3-page" aria-hidden="true">
          <div className="hb-xj3-ph">
            <div>
              <h2>{tabs[current]?.label}</h2>
              <p>atlas-web, production branch main</p>
            </div>
          </div>
          <div className="hb-xj3-cards">
            <div className="hb-xj3-card">
              <h3>Requests, last 7 days</h3>
              <b>1.84M</b>
              <svg className="hb-xj3-spark" viewBox="0 0 400 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={accent} stopOpacity=".35" />
                    <stop offset="1" stopColor={accent} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 92 L40 80 L80 86 L120 60 L160 68 L200 44 L240 52 L280 30 L320 38 L360 18 L400 24 L400 120 L0 120 Z" fill={`url(#${fillId})`} />
                <path d="M0 92 L40 80 L80 86 L120 60 L160 68 L200 44 L240 52 L280 30 L320 38 L360 18 L400 24" fill="none" stroke={accent} strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <div className="hb-xj3-card">
              <h3>Recent deployments</h3>
              <div className="hb-xj3-dep">
                <i />
                fix: cache headers
                <small>2m</small>
              </div>
              <div className="hb-xj3-dep">
                <i />
                feat: billing page
                <small>1h</small>
              </div>
              <div className="hb-xj3-dep">
                <i />
                chore: bump deps
                <small>5h</small>
              </div>
              <div className="hb-xj3-dep">
                <i />
                docs: api limits
                <small>1d</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
