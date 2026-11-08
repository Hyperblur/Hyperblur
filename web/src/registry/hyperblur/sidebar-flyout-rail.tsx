"use client";

import * as React from "react";

const PATHS = {
  bolt: "M11 2.8L4.8 11h4.6L8.8 17.2 15.2 9h-4.6z",
  box: "M10 2.8l6.5 3.6v7.2L10 17.2l-6.5-3.6V6.4zM3.5 6.4L10 10l6.5-3.6M10 10v7.2",
  globe: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM3 10h14M10 3c2 2 2.8 4.4 2.8 7S12 15 10 17c-2-2-2.8-4.4-2.8-7S8 5 10 3z",
  db: "M10 7c3.6 0 6-1 6-2.2S13.6 2.6 10 2.6 4 3.6 4 4.8 6.4 7 10 7zM4 4.8v10.4c0 1.2 2.4 2.2 6 2.2s6-1 6-2.2V4.8M4 10c0 1.2 2.4 2.2 6 2.2s6-1 6-2.2",
  chart: "M4 16V9M10 16V4M16 16v-5",
  gear: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2.8v2M10 15.2v2M17.2 10h-2M4.8 10h-2M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4M15.1 15.1l-1.4-1.4M6.3 6.3L4.9 4.9",
} as const;

export type SidebarFlyoutRailIconName = keyof typeof PATHS;

export interface SidebarFlyoutRailLink {
  id: string;
  label: string;
  hint?: string;
}

export interface SidebarFlyoutRailSection {
  id: string;
  label: string;
  icon?: SidebarFlyoutRailIconName | React.ReactNode;
  description?: string;
  links: SidebarFlyoutRailLink[];
}

export interface SidebarFlyoutRailProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  sections?: SidebarFlyoutRailSection[];
  active?: string;
  defaultActive?: string;
  onChange?: (linkId: string, sectionId: string) => void;
  defaultOpenSection?: string | null;
  openDelay?: number;
  closeDelay?: number;
  flyoutWidth?: number;
  brand?: React.ReactNode;
  footer?: React.ReactNode;
  accent?: string;
}

const defaultSections: SidebarFlyoutRailSection[] = [
  {
    id: "functions",
    label: "Functions",
    icon: "bolt",
    description: "Serverless code on 38 regions",
    links: [
      { id: "fn-overview", label: "Overview", hint: "24 deployed" },
      { id: "fn-logs", label: "Live logs" },
      { id: "fn-cron", label: "Cron jobs", hint: "3" },
    ],
  },
  {
    id: "storage",
    label: "Storage",
    icon: "db",
    description: "Postgres, KV and blob buckets",
    links: [
      { id: "st-postgres", label: "Postgres", hint: "2 DBs" },
      { id: "st-kv", label: "Key value" },
      { id: "st-blob", label: "Blob buckets" },
      { id: "st-backups", label: "Backups" },
    ],
  },
  {
    id: "network",
    label: "Network",
    icon: "globe",
    description: "Domains, edge rules and firewall",
    links: [
      { id: "nw-domains", label: "Domains" },
      { id: "nw-firewall", label: "Firewall", hint: "On" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "chart",
    description: "Traffic, vitals and usage",
    links: [
      { id: "an-traffic", label: "Traffic" },
      { id: "an-vitals", label: "Web vitals" },
      { id: "an-usage", label: "Usage", hint: "72%" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: "gear",
    description: "Team, billing and tokens",
    links: [
      { id: "se-team", label: "Team" },
      { id: "se-billing", label: "Billing" },
      { id: "se-tokens", label: "Access tokens" },
    ],
  },
];

const css = `
.hb-xk9 {
  --hb-xk9-a: #2f7bff;
  --hb-xk9-fw: 212px;
  position: relative;
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  flex: none;
  width: 56px;
  height: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
}
.hb-xk9 *, .hb-xk9 *::before, .hb-xk9 *::after { box-sizing: border-box; }
.hb-xk9-rail { position: relative; display: flex; flex-direction: column; align-items: center; width: 56px; height: 100%; padding: 10px 0; border-right: 1px solid #1f1f1f; background: #0c0c0c; }
.hb-xk9-brand { display: grid; place-items: center; height: 34px; margin-bottom: 10px; }
.hb-xk9-list { display: flex; flex-direction: column; gap: 6px; margin: 0; padding: 0; list-style: none; }
.hb-xk9-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 11px;
  background: transparent;
  color: #7c7c84;
  cursor: pointer;
  transition: color .18s ease, background-color .18s ease, border-color .18s ease, transform .2s cubic-bezier(.22, 1, .36, 1);
}
.hb-xk9-icon svg { width: 18px; height: 18px; }
.hb-xk9-icon:hover, .hb-xk9-icon[data-open="true"] { background: #171717; border-color: #262626; color: #ededed; }
.hb-xk9-icon:active { transform: scale(.94); }
.hb-xk9-icon:focus-visible { outline: 2px solid var(--hb-xk9-a); outline-offset: 2px; }
.hb-xk9-icon[data-owner="true"] { color: #fff; }
.hb-xk9-icon[data-owner="true"]::before { content: ""; position: absolute; top: 10px; bottom: 10px; left: -10px; width: 3px; border-radius: 0 3px 3px 0; background: var(--hb-xk9-a); box-shadow: 0 0 10px var(--hb-xk9-a); }
.hb-xk9-foot { margin-top: auto; }
.hb-xk9-fly {
  position: absolute;
  top: 0;
  left: calc(56px + 8px);
  width: var(--hb-xk9-fw);
  height: var(--hb-xk9-h);
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  background: linear-gradient(180deg, #181818, #131313);
  box-shadow: 0 24px 48px -18px rgba(0, 0, 0, .95), 0 0 0 1px rgba(0, 0, 0, .4), inset 0 1px 0 rgba(255, 255, 255, .05);
  opacity: 0;
  pointer-events: none;
  transform: translate(-8px, var(--hb-xk9-y)) scale(.98);
  transform-origin: 0 var(--hb-xk9-ay);
  visibility: hidden;
  transition: opacity .16s ease, transform .3s cubic-bezier(.22, 1, .36, 1), height .32s cubic-bezier(.22, 1, .36, 1), visibility 0s linear .3s;
}
.hb-xk9-fly[data-open="true"] {
  opacity: 1;
  pointer-events: auto;
  transform: translate(0, var(--hb-xk9-y));
  visibility: visible;
  transition: opacity .18s ease, transform .34s cubic-bezier(.22, 1, .36, 1), height .32s cubic-bezier(.22, 1, .36, 1), visibility 0s;
}
.hb-xk9-notch {
  position: absolute;
  top: 0;
  left: -6px;
  width: 10px;
  height: 10px;
  border-bottom: 1px solid #2a2a2a;
  border-left: 1px solid #2a2a2a;
  background: #171717;
  transform: translateY(calc(var(--hb-xk9-ay) - 5px)) rotate(45deg);
  transition: transform .32s cubic-bezier(.22, 1, .36, 1);
}
.hb-xk9-clip { position: relative; height: 100%; overflow: hidden; border-radius: inherit; }
.hb-xk9-measure { position: absolute; top: 0; right: 0; left: 0; }
.hb-xk9-content { padding: 12px 8px 8px; animation: hb-xk9-in .32s cubic-bezier(.22, 1, .36, 1) both; }
.hb-xk9-content[data-dir="up"] { animation-name: hb-xk9-up; }
.hb-xk9-title { display: flex; align-items: center; justify-content: space-between; margin: 0 6px; font-size: 13px; font-weight: 600; letter-spacing: -.01em; }
.hb-xk9-title kbd { padding: 0 5px; border: 1px solid #2c2c2c; border-radius: 4px; color: #6f6f76; font-family: var(--font-mono, ui-monospace, monospace); font-size: 9.5px; line-height: 15px; }
.hb-xk9-desc { margin: 2px 6px 8px; color: #77777f; font-size: 11px; line-height: 15px; }
.hb-xk9-links { margin: 0; padding: 6px 0 0; border-top: 1px solid #222; list-style: none; }
.hb-xk9-link {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #b4b4ba;
  font: inherit;
  font-size: 12.5px;
  text-align: left;
  cursor: pointer;
  transition: background-color .14s ease, color .14s ease;
}
.hb-xk9-link:hover { background: rgba(255, 255, 255, .05); color: #fff; }
.hb-xk9-link:focus-visible { outline: 2px solid var(--hb-xk9-a); outline-offset: -2px; }
.hb-xk9-link[aria-current="page"] { background: color-mix(in srgb, var(--hb-xk9-a) 16%, transparent); color: #fff; }
.hb-xk9-ll { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk9-hint { color: #6f6f76; font-size: 10.5px; }
.hb-xk9-arrow { width: 12px; height: 12px; color: #6f6f76; opacity: 0; transform: translateX(-4px); transition: opacity .15s ease, transform .2s cubic-bezier(.22, 1, .36, 1); }
.hb-xk9-link:hover .hb-xk9-arrow, .hb-xk9-link:focus-visible .hb-xk9-arrow { opacity: 1; transform: none; }
@keyframes hb-xk9-in { from { opacity: 0; transform: translateY(10px); } }
@keyframes hb-xk9-up { from { opacity: 0; transform: translateY(-10px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xk9 *, .hb-xk9 *::before, .hb-xk9 *::after { transition: none !important; animation: none !important; }
}
`;

function Glyph({ icon }: { icon?: SidebarFlyoutRailIconName | React.ReactNode }) {
  if (typeof icon === "string" || icon === undefined) {
    const d = PATHS[(icon as SidebarFlyoutRailIconName | undefined) ?? "box"] ?? PATHS.box;
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    );
  }
  return <>{icon}</>;
}

export function SidebarFlyoutRail({
  sections = defaultSections,
  active,
  defaultActive,
  onChange,
  defaultOpenSection = null,
  openDelay = 90,
  closeDelay = 220,
  flyoutWidth = 212,
  brand,
  footer,
  accent = "#2f7bff",
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onBlur,
  ...rest
}: SidebarFlyoutRailProps) {
  const [inner, setInner] = React.useState(defaultActive ?? sections[0]?.links[0]?.id ?? "");
  const [openId, setOpenId] = React.useState<string | null>(defaultOpenSection);
  const [dir, setDir] = React.useState<"up" | "down">("down");
  const [railH, setRailH] = React.useState(300);
  const [h, setH] = React.useState(160);
  const current = active ?? inner;
  const rootRef = React.useRef<HTMLElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);
  const flyRef = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const flyId = React.useId();

  React.useEffect(() => {
    const el = measureRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const root = rootRef.current;
    const ro = new ResizeObserver(() => {
      setH(el.offsetHeight);
      if (root) setRailH(root.clientHeight);
    });
    ro.observe(el);
    if (root) ro.observe(root);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const openSection = React.useCallback(
    (id: string) => {
      if (openId && openId !== id) {
        const a = sections.findIndex((s) => s.id === openId);
        const b = sections.findIndex((s) => s.id === id);
        setDir(b > a ? "down" : "up");
      } else if (!openId) setDir("down");
      setOpenId(id);
    },
    [sections, openId],
  );

  function schedule(fn: () => void, ms: number) {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, ms);
  }

  function focusIcon(id: string) {
    rootRef.current?.querySelector<HTMLElement>(`[data-xk9-sec="${id}"]`)?.focus();
  }

  function onIconKey(e: React.KeyboardEvent<HTMLButtonElement>, id: string, i: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = e.key === "ArrowDown" ? Math.min(sections.length - 1, i + 1) : Math.max(0, i - 1);
      focusIcon(sections[n].id);
      if (openId) openSection(sections[n].id);
    } else if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openSection(id);
      window.setTimeout(() => flyRef.current?.querySelector<HTMLElement>("[data-xk9-link]")?.focus(), 30);
    } else if (e.key === "Escape" && openId) {
      e.preventDefault();
      setOpenId(null);
    }
  }

  function onFlyKey(e: React.KeyboardEvent<HTMLDivElement>) {
    const links = Array.from(flyRef.current?.querySelectorAll<HTMLElement>("[data-xk9-link]") ?? []);
    const at = links.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = e.key === "ArrowDown" ? Math.min(links.length - 1, at + 1) : Math.max(0, at - 1);
      links[n]?.focus();
    } else if ((e.key === "ArrowLeft" || e.key === "Escape") && openId) {
      e.preventDefault();
      const id = openId;
      setOpenId(null);
      focusIcon(id);
    }
  }

  function pick(link: SidebarFlyoutRailLink, sectionId: string) {
    if (active === undefined) setInner(link.id);
    onChange?.(link.id, sectionId);
    setOpenId(null);
    focusIcon(sectionId);
  }

  const section = sections.find((s) => s.id === openId);
  const iconTop = 10 + (brand ? 44 : 0) + Math.max(0, sections.findIndex((s) => s.id === openId)) * 44;
  const top = Math.max(6, Math.min(railH - h - 6, iconTop - 10));
  const ay = Math.max(14, Math.min(h - 14, iconTop + 19 - top));

  const vars = {
    "--hb-xk9-a": accent,
    "--hb-xk9-fw": `${flyoutWidth}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <nav
      ref={rootRef}
      aria-label="Product"
      className={`hb-xk9 ${className}`}
      style={vars}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        window.clearTimeout(timer.current);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        schedule(() => setOpenId(null), closeDelay);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenId(null);
      }}
      {...rest}
    >
      <style href="hb-sidebar-flyout-rail" precedence="default">{css}</style>
      <div className="hb-xk9-rail">
        {brand ? <div className="hb-xk9-brand">{brand}</div> : null}
        <ul className="hb-xk9-list" role="list">
          {sections.map((s, i) => {
            const owner = s.links.some((l) => l.id === current);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  className="hb-xk9-icon"
                  data-xk9-sec={s.id}
                  data-open={openId === s.id}
                  data-owner={owner}
                  aria-label={s.label}
                  aria-haspopup="true"
                  aria-expanded={openId === s.id}
                  aria-controls={flyId}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "touch") return;
                    if (openId) openSection(s.id);
                    else schedule(() => openSection(s.id), openDelay);
                  }}
                  onClick={() => (openId === s.id ? setOpenId(null) : openSection(s.id))}
                  onKeyDown={(e) => onIconKey(e, s.id, i)}
                >
                  <Glyph icon={s.icon} />
                </button>
              </li>
            );
          })}
        </ul>
        {footer ? <div className="hb-xk9-foot">{footer}</div> : null}
      </div>
      <div
        ref={flyRef}
        id={flyId}
        className="hb-xk9-fly"
        role="group"
        aria-label={section ? section.label : undefined}
        data-open={!!section}
        inert={!section}
        onKeyDown={onFlyKey}
        style={{ "--hb-xk9-y": `${top.toFixed(0)}px`, "--hb-xk9-h": `${h.toFixed(0)}px`, "--hb-xk9-ay": `${ay.toFixed(0)}px` } as React.CSSProperties}
      >
        <span className="hb-xk9-notch" aria-hidden="true" />
        <div className="hb-xk9-clip">
          <div ref={measureRef} className="hb-xk9-measure">
            {section ? (
              <div key={section.id} className="hb-xk9-content" data-dir={dir}>
                <div className="hb-xk9-title">
                  {section.label}
                  <kbd aria-hidden="true">{sections.indexOf(section) + 1}</kbd>
                </div>
                {section.description ? <p className="hb-xk9-desc">{section.description}</p> : null}
                <ul className="hb-xk9-links" role="list">
                  {section.links.map((l) => (
                    <li key={l.id}>
                      <button
                        type="button"
                        className="hb-xk9-link"
                        data-xk9-link=""
                        aria-current={l.id === current ? "page" : undefined}
                        onClick={() => pick(l, section.id)}
                      >
                        <span className="hb-xk9-ll">{l.label}</span>
                        {l.hint ? <span className="hb-xk9-hint">{l.hint}</span> : null}
                        <svg className="hb-xk9-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4.5 3l3 3-3 3" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
