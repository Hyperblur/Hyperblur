"use client";

import * as React from "react";

export interface NavbarDockStacksEntry {
  title: string;
  hint?: string;
  href: string;
  tone?: string;
}

export interface NavbarDockStacksItem {
  label: string;
  icon: "home" | "projects" | "library" | "inbox" | "calendar" | "search" | "settings" | "chart" | React.ReactNode;
  href?: string;
  badge?: number;
  stack?: NavbarDockStacksEntry[];
  stackLink?: { label: string; href: string };
  divider?: boolean;
}

export interface NavbarDockStacksProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  items?: NavbarDockStacksItem[];
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number) => void;
  defaultOpenStack?: number | null;
  onStackOpenChange?: (index: number | null) => void;
  magnify?: number;
  accent?: string;
  showBackdrop?: boolean;
}

const defaultItems: NavbarDockStacksItem[] = [
  { label: "Home", icon: "home", href: "#home" },
  {
    label: "Projects",
    icon: "projects",
    stack: [
      { title: "Orbit rebrand", hint: "Edited 4m ago", href: "#orbit", tone: "linear-gradient(140deg,#f97316,#be123c)" },
      { title: "Q4 board deck", hint: "Edited 1h ago", href: "#deck", tone: "linear-gradient(140deg,#6366f1,#0ea5e9)" },
      { title: "Field research", hint: "Edited yesterday", href: "#research", tone: "linear-gradient(140deg,#10b981,#0f766e)" },
      { title: "Pricing page v3", hint: "Edited Mon", href: "#pricing", tone: "linear-gradient(140deg,#eab308,#a16207)" },
    ],
    stackLink: { label: "All projects", href: "#projects" },
  },
  {
    label: "Library",
    icon: "library",
    stack: [
      { title: "Brand guidelines", hint: "PDF, 18 MB", href: "#brand", tone: "linear-gradient(140deg,#a855f7,#6d28d9)" },
      { title: "Icon set 2.4", hint: "312 icons", href: "#icons", tone: "linear-gradient(140deg,#14b8a6,#155e75)" },
      { title: "Photo archive", hint: "1,204 photos", href: "#photos", tone: "linear-gradient(140deg,#f43f5e,#9f1239)" },
    ],
    stackLink: { label: "Open library", href: "#library" },
  },
  { label: "Inbox", icon: "inbox", href: "#inbox", badge: 5 },
  { label: "Calendar", icon: "calendar", href: "#calendar" },
  { label: "Search", icon: "search", href: "#search", divider: true },
  { label: "Settings", icon: "settings", href: "#settings" },
];

const ease = "cubic-bezier(.22,1,.36,1)";
const spring = "cubic-bezier(.34,1.5,.5,1)";

const css = `
.hb-xj9 {
  --hb-xj9-accent: #60a5fa;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xj9 *, .hb-xj9 *::before, .hb-xj9 *::after { box-sizing: border-box; }
.hb-xj9[data-backdrop="true"] {
  min-height: 620px;
  overflow: hidden;
  background:
    radial-gradient(70% 60% at 20% 0%, rgba(96,165,250,.16), transparent 60%),
    radial-gradient(60% 60% at 90% 30%, rgba(244,63,94,.12), transparent 60%),
    #0a0a0a;
}
.hb-xj9-top { position: relative; z-index: 4; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 14px 22px 0; }
.hb-xj9-brand { display: inline-flex; align-items: center; gap: 9px; height: 62px; color: #ededed; font-size: 15px; font-weight: 650; letter-spacing: -.02em; text-decoration: none; flex: 1; }
.hb-xj9-brand i { width: 22px; height: 22px; border-radius: 7px; background: linear-gradient(135deg, var(--hb-xj9-accent), #f43f5e); box-shadow: inset 0 1px 0 rgba(255,255,255,.35); font-style: normal; }
.hb-xj9-side { display: flex; align-items: center; justify-content: flex-end; gap: 10px; height: 62px; flex: 1; color: #a1a1a1; font-size: 13px; }
.hb-xj9-side b { color: #ededed; font-weight: 500; font-variant-numeric: tabular-nums; }
.hb-xj9-av { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #ef4444); box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 3px #2a2a2a; display: grid; place-items: center; color: #fff; font-size: 11px; font-weight: 700; }
.hb-xj9-dockwrap { position: relative; flex: none; }
.hb-xj9-dock {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  min-height: 62px;
  margin: 0;
  padding: 7px 8px;
  list-style: none;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,.1);
  background: linear-gradient(180deg, rgba(38,38,42,.72), rgba(20,20,23,.78));
  backdrop-filter: blur(20px) saturate(170%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.1), 0 24px 50px -20px rgba(0,0,0,.9);
}
.hb-xj9-dock > li { position: relative; display: flex; }
.hb-xj9-div { width: 1px; align-self: stretch; margin: 4px 2px; background: rgba(255,255,255,.12); }
.hb-xj9-item {
  --hb-xj9-s: 1;
  position: relative;
  display: grid;
  place-items: center;
  width: calc(46px * var(--hb-xj9-s));
  height: calc(46px * var(--hb-xj9-s));
  border: 0;
  border-radius: calc(13px * var(--hb-xj9-s));
  background: linear-gradient(180deg, #2c2c31, #1b1b1f);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.1), inset 0 0 0 1px rgba(255,255,255,.04), 0 6px 14px -8px rgba(0,0,0,.8);
  color: #d4d4d4;
  text-decoration: none;
  cursor: pointer;
  transition: width .2s ${ease}, height .2s ${ease}, border-radius .2s ${ease}, color .2s ease, background-color .2s ease;
}
.hb-xj9-dock[data-tracking="true"] .hb-xj9-item { transition: width .09s linear, height .09s linear, border-radius .09s linear, color .2s ease; }
.hb-xj9-item:hover, .hb-xj9-item[aria-expanded="true"] { color: #fff; }
.hb-xj9-item[aria-expanded="true"] { background: linear-gradient(180deg, #3a3a41, #24242a); }
.hb-xj9-item svg { width: 46%; height: 46%; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.hb-xj9-item[data-bounce="true"] { animation: hb-xj9-bounce .6s ${spring}; }
@keyframes hb-xj9-bounce { 0% { transform: translateY(0); } 35% { transform: translateY(8px); } 70% { transform: translateY(-2px); } 100% { transform: none; } }
.hb-xj9-run { position: absolute; left: 50%; bottom: -6px; width: 4px; height: 4px; border-radius: 50%; background: var(--hb-xj9-accent); box-shadow: 0 0 8px var(--hb-xj9-accent); transform: translateX(-50%); }
.hb-xj9-badge { position: absolute; top: -4px; right: -4px; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 999px; background: #ff453a; color: #fff; font-size: 10.5px; font-weight: 700; line-height: 18px; text-align: center; box-shadow: 0 0 0 2px #1a1a1d; }
.hb-xj9-tip {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  padding: 5px 9px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.1);
  background: #1c1c1f;
  color: #ededed;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, -4px);
  transition: opacity .15s ease, transform .25s ${ease};
}
.hb-xj9-dock > li:hover .hb-xj9-tip, .hb-xj9-item:focus-visible + .hb-xj9-tip { opacity: 1; transform: translate(-50%, 0); }
.hb-xj9-dock > li[data-open="true"] .hb-xj9-tip { opacity: 0; }
.hb-xj9-stack { position: absolute; top: calc(100% + 16px); left: 50%; z-index: 5; width: 0; margin: 0; padding: 0; list-style: none; }
.hb-xj9-card {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 11px;
  width: 236px;
  height: 52px;
  padding: 0 14px 0 8px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.1);
  background: linear-gradient(180deg, rgba(40,40,44,.94), rgba(24,24,27,.96));
  backdrop-filter: blur(16px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 18px 34px -16px rgba(0,0,0,.95);
  color: #ededed;
  text-decoration: none;
  transform-origin: 0 50%;
  transform: translate(calc(-26px + var(--hb-xj9-fx)), var(--hb-xj9-fy)) rotate(var(--hb-xj9-fr));
  animation: hb-xj9-fan .55s ${spring} both;
  animation-delay: calc(var(--hb-xj9-i) * 45ms);
  transition: transform .3s ${ease}, background-color .2s ease, border-color .2s ease;
}
@keyframes hb-xj9-fan { from { opacity: 0; transform: translate(-26px, -20px) rotate(0deg) scale(.5); } }
.hb-xj9-card:hover, .hb-xj9-card:focus-visible { border-color: rgba(255,255,255,.22); transform: translate(calc(-20px + var(--hb-xj9-fx)), var(--hb-xj9-fy)) rotate(var(--hb-xj9-fr)); }
.hb-xj9-tile { width: 36px; height: 36px; flex: none; border-radius: 9px; box-shadow: inset 0 1px 0 rgba(255,255,255,.3), inset 0 0 0 1px rgba(255,255,255,.08); }
.hb-xj9-ct { display: grid; min-width: 0; line-height: 1.2; }
.hb-xj9-ct b { font-size: 13.5px; font-weight: 550; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xj9-ct small { color: #8f8f8f; font-size: 11.5px; }
.hb-xj9-more { justify-content: center; height: 38px; color: var(--hb-xj9-accent); font-size: 13px; font-weight: 550; background: rgba(24,24,27,.85); }
.hb-xj9 a:focus-visible, .hb-xj9 button:focus-visible { outline: 2px solid var(--hb-xj9-accent); outline-offset: 3px; }
@container (max-width: 680px) {
  .hb-xj9-top { padding: 10px 10px 0; justify-content: center; }
  .hb-xj9-brand, .hb-xj9-side { display: none; }
  .hb-xj9-dockwrap { position: static; max-width: 100%; }
  .hb-xj9-dock { gap: 4px; padding: 6px; overflow-x: auto; scrollbar-width: none; border-radius: 20px; }
  .hb-xj9-dock::-webkit-scrollbar { display: none; }
  .hb-xj9-item { width: 42px; height: 42px; border-radius: 12px; }
  .hb-xj9-tip { display: none; }
  .hb-xj9-dock > li { position: static; }
  .hb-xj9-stack {
    position: absolute;
    top: calc(100% + 8px);
    left: 10px;
    right: 10px;
    width: auto;
    padding: 6px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,.1);
    background: rgba(22,22,25,.96);
    backdrop-filter: blur(16px);
    box-shadow: 0 30px 60px -20px rgba(0,0,0,.9);
    animation: hb-xj9-sheet .4s ${ease};
  }
  @keyframes hb-xj9-sheet { from { opacity: 0; transform: translateY(-8px); } }
  .hb-xj9-card { position: relative; width: 100%; height: 56px; border: 0; background: none; box-shadow: none; backdrop-filter: none; transform: none; animation: hb-xj9-row .4s ${ease} both; animation-delay: calc(var(--hb-xj9-i) * 40ms); }
  .hb-xj9-card:hover, .hb-xj9-card:focus-visible { transform: none; background: rgba(255,255,255,.05); }
  @keyframes hb-xj9-row { from { opacity: 0; transform: translateY(-6px); } }
  .hb-xj9-more { height: 44px; background: none; }
}
.hb-xj9-page { position: relative; z-index: 1; max-width: 980px; margin: 0 auto; padding: 60px 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.hb-xj9-page h2 { grid-column: 1 / -1; margin: 0 0 8px; font-size: 30px; font-weight: 600; letter-spacing: -.03em; }
.hb-xj9-page h2 small { display: block; margin-top: 4px; color: #8f8f8f; font-size: 14px; font-weight: 400; letter-spacing: 0; }
.hb-xj9-pc { height: 150px; border-radius: 16px; border: 1px solid #1f1f1f; background: #111; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; }
.hb-xj9-pc i { width: 100%; height: 70px; border-radius: 10px; font-style: normal; }
.hb-xj9-pc b { font-size: 13.5px; font-weight: 550; }
@container (max-width: 680px) { .hb-xj9-page { grid-template-columns: 1fr 1fr; padding: 40px 14px; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xj9 *, .hb-xj9 *::before, .hb-xj9 *::after { transition: none !important; animation: none !important; }
}
`;

const glyphs: Record<string, React.ReactNode> = {
  home: <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" />,
  projects: (
    <>
      <path d="M3.5 7.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h8a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 18.5H5A1.5 1.5 0 0 1 3.5 17z" />
    </>
  ),
  library: (
    <>
      <rect x="4" y="4" width="4" height="16" rx="1" />
      <rect x="10" y="4" width="4" height="16" rx="1" />
      <path d="m16.5 5.2 3.6-.9 3 13.6-3.6.9z" transform="translate(-2.5 .5)" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 13.5 6.3 6a1.5 1.5 0 0 1 1.4-1h8.6a1.5 1.5 0 0 1 1.4 1L20 13.5V18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M4 13.5h4.5l1 2h5l1-2H20" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m15.5 15.5 4 4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M6 18l1.6-1.6M16.4 7.6 18 6" />
    </>
  ),
  chart: <path d="M5 19V11M10 19V6M15 19v-5M20 19V9" />,
};

function Glyph({ icon }: { icon: NavbarDockStacksItem["icon"] }) {
  if (typeof icon === "string" && glyphs[icon]) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {glyphs[icon]}
      </svg>
    );
  }
  return <>{icon}</>;
}

function fan(i: number) {
  const x = i * i * 5 + i * 6;
  const y = i * 58;
  const r = i * 2.2;
  return { "--hb-xj9-fx": `${x.toFixed(1)}px`, "--hb-xj9-fy": `${y.toFixed(1)}px`, "--hb-xj9-fr": `${r.toFixed(2)}deg`, "--hb-xj9-i": i } as React.CSSProperties;
}

export function NavbarDockStacks({
  brand = "Atelier",
  items = defaultItems,
  active,
  defaultActive = 0,
  onActiveChange,
  defaultOpenStack = null,
  onStackOpenChange,
  magnify = 0.55,
  accent = "#60a5fa",
  showBackdrop = true,
  className,
  style,
  ...rest
}: NavbarDockStacksProps) {
  const [innerActive, setInnerActive] = React.useState(defaultActive);
  const [openStack, setOpenStackState] = React.useState<number | null>(defaultOpenStack);
  const [bounce, setBounce] = React.useState<number | null>(null);
  const dockRef = React.useRef<HTMLUListElement>(null);
  const btnRefs = React.useRef<(HTMLElement | null)[]>([]);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const current = active ?? innerActive;
  const baseId = React.useId();

  const setOpenStack = React.useCallback(
    (v: number | null) => {
      setOpenStackState(v);
      onStackOpenChange?.(v);
    },
    [onStackOpenChange],
  );

  React.useEffect(() => {
    if (openStack === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const btn = btnRefs.current[openStack];
        setOpenStack(null);
        btn?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpenStack(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openStack, setOpenStack]);

  const track = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return;
    const dock = dockRef.current;
    if (!dock) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (dock.scrollWidth > dock.clientWidth + 1) return;
    dock.dataset.tracking = "true";
    for (const el of btnRefs.current) {
      if (!el) continue;
      const box = el.getBoundingClientRect();
      const d = Math.abs(e.clientX - (box.left + box.width / 2));
      const k = Math.max(0, 1 - d / 130);
      const scale = 1 + magnify * Math.sin((k * Math.PI) / 2);
      el.style.setProperty("--hb-xj9-s", scale.toFixed(3));
    }
  };

  const reset = () => {
    const dock = dockRef.current;
    if (dock) dock.dataset.tracking = "false";
    for (const el of btnRefs.current) el?.style.setProperty("--hb-xj9-s", "1");
  };

  const activate = (i: number) => {
    const item = items[i];
    setBounce(i);
    if (item.stack) {
      setOpenStack(openStack === i ? null : i);
      return;
    }
    setOpenStack(null);
    if (active === undefined) setInnerActive(i);
    onActiveChange?.(i);
  };

  const onDockKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const at = btnRefs.current.findIndex((el) => el === document.activeElement);
    if (at < 0) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const n = items.length;
      const next = (at + (e.key === "ArrowRight" ? 1 : -1) + n) % n;
      btnRefs.current[next]?.focus();
    } else if (e.key === "ArrowDown" && items[at].stack) {
      e.preventDefault();
      if (openStack !== at) setOpenStack(at);
      requestAnimationFrame(() => document.getElementById(`${baseId}-s${at}`)?.querySelector<HTMLElement>("a")?.focus());
    }
  };

  const onStackKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const links = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const at = links.indexOf(document.activeElement as HTMLAnchorElement);
    e.preventDefault();
    const next = at < 0 ? 0 : (at + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
    links[next]?.focus();
  };

  return (
    <header
      className={["hb-xj9", className].filter(Boolean).join(" ")}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-xj9-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-navbar-dock-stacks" precedence="default">
        {css}
      </style>
      <div className="hb-xj9-top">
        <a className="hb-xj9-brand" href="#top">
          <i aria-hidden="true" />
          {brand}
        </a>
        <nav className="hb-xj9-dockwrap" aria-label="Main" ref={wrapRef}>
          <ul className="hb-xj9-dock" ref={dockRef} onPointerMove={track} onPointerLeave={reset} onKeyDown={onDockKey}>
            {items.map((it, i) => {
              const isStack = !!it.stack;
              const common = {
                ref: (el: HTMLElement | null) => {
                  btnRefs.current[i] = el;
                },
                className: "hb-xj9-item",
                "data-bounce": bounce === i ? "true" : undefined,
                onAnimationEnd: () => setBounce(null),
              };
              const inner = (
                <>
                  <Glyph icon={it.icon} />
                  {it.badge ? <span className="hb-xj9-badge">{it.badge}</span> : null}
                  {(i === current || openStack === i) && <span className="hb-xj9-run" aria-hidden="true" />}
                </>
              );
              return (
                <React.Fragment key={it.label + i}>
                  {it.divider && <li className="hb-xj9-div" aria-hidden="true" />}
                  <li data-open={openStack === i ? "true" : undefined}>
                    {isStack ? (
                      <button
                        {...common}
                        type="button"
                        aria-label={it.label}
                        aria-expanded={openStack === i}
                        aria-controls={`${baseId}-s${i}`}
                        onClick={() => activate(i)}
                      >
                        {inner}
                      </button>
                    ) : (
                      <a
                        {...common}
                        href={it.href ?? "#"}
                        aria-label={it.badge ? `${it.label}, ${it.badge} new` : it.label}
                        aria-current={i === current ? "page" : undefined}
                        onClick={() => activate(i)}
                      >
                        {inner}
                      </a>
                    )}
                    <span className="hb-xj9-tip" aria-hidden="true">
                      {it.label}
                    </span>
                    {isStack && openStack === i && (
                      <ul className="hb-xj9-stack" id={`${baseId}-s${i}`} aria-label={it.label} onKeyDown={onStackKey}>
                        {it.stack!.map((s, si) => (
                          <li key={s.href + si}>
                            <a className="hb-xj9-card" href={s.href} style={fan(si)} onClick={() => setOpenStack(null)}>
                              <span className="hb-xj9-tile" style={{ background: s.tone ?? "#333" }} aria-hidden="true" />
                              <span className="hb-xj9-ct">
                                <b>{s.title}</b>
                                {s.hint && <small>{s.hint}</small>}
                              </span>
                            </a>
                          </li>
                        ))}
                        {it.stackLink && (
                          <li>
                            <a className="hb-xj9-card hb-xj9-more" href={it.stackLink.href} style={fan(it.stack!.length)} onClick={() => setOpenStack(null)}>
                              {it.stackLink.label} →
                            </a>
                          </li>
                        )}
                      </ul>
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </nav>
        <div className="hb-xj9-side">
          <span>
            <b>3</b> online
          </span>
          <span className="hb-xj9-av" aria-label="Rhea Okafor" role="img">
            RO
          </span>
        </div>
      </div>
      {showBackdrop && (
        <div className="hb-xj9-page" aria-hidden="true">
          <h2>
            Good afternoon, Rhea
            <small>Pick up where you left off.</small>
          </h2>
          {[
            ["Orbit rebrand", "linear-gradient(140deg,#f97316,#be123c)"],
            ["Q4 board deck", "linear-gradient(140deg,#6366f1,#0ea5e9)"],
            ["Field research", "linear-gradient(140deg,#10b981,#0f766e)"],
          ].map(([t, g]) => (
            <div className="hb-xj9-pc" key={t}>
              <i style={{ background: g }} />
              <b>{t}</b>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
