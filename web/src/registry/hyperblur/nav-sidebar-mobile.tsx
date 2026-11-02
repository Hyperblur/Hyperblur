"use client";

import * as React from "react";

export type NavSidebarMobileIcon = "inbox" | "folder" | "calendar" | "users" | "chart" | "gear" | "help" | "star";

export interface NavSidebarMobileSubLink {
  label: string;
  href: string;
}

export interface NavSidebarMobileLink {
  label: string;
  href?: string;
  icon?: NavSidebarMobileIcon;
  badge?: string;
  children?: NavSidebarMobileSubLink[];
}

export interface NavSidebarMobileGroup {
  title: string;
  links: NavSidebarMobileLink[];
}

export interface NavSidebarMobileUser {
  name: string;
  role: string;
}

export interface NavSidebarMobileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  brand?: string;
  groups?: NavSidebarMobileGroup[];
  activeHref?: string;
  user?: NavSidebarMobileUser | null;
  cta?: { label: string; href: string } | null;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultExpanded?: string[];
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-ke3 {
  --hb-ke3-accent: #ff6b4a;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ke3 *, .hb-ke3 *::before, .hb-ke3 *::after { box-sizing: border-box; }
.hb-ke3[data-backdrop="true"] {
  display: flex;
  justify-content: center;
  padding: 28px 16px;
  overflow: hidden;
  background:
    radial-gradient(50% 60% at 50% 40%, color-mix(in srgb, var(--hb-ke3-accent) 14%, transparent), transparent 70%),
    radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px) 0 0 / 22px 22px,
    #0a0a0a;
}
.hb-ke3-phone {
  position: relative;
  z-index: 1;
  width: 344px;
  max-width: 100%;
  height: 560px;
  padding: 10px;
  border-radius: 48px;
  background: linear-gradient(145deg, #2a2a2d, #141416 40%, #1d1d20);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), 0 40px 90px -30px rgba(0,0,0,.9), 0 0 0 1px rgba(0,0,0,.6);
}
.hb-ke3-screen {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 38px;
  background: #0b0b0c;
  transform: translateZ(0);
}
.hb-ke3-notch { position: absolute; z-index: 40; top: 9px; left: 50%; width: 92px; height: 26px; border-radius: 999px; background: #000; transform: translateX(-50%); }
.hb-ke3-status { display: flex; justify-content: space-between; align-items: center; height: 44px; padding: 0 28px; color: #ededed; font-size: 13px; font-weight: 600; }
.hb-ke3-sig { display: inline-flex; gap: 2px; align-items: flex-end; }
.hb-ke3-sig i { display: block; width: 3px; border-radius: 1px; background: #ededed; }
.hb-ke3-bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 56px;
  padding: 0 10px;
  border-bottom: 1px solid rgba(255,255,255,.08);
  background: rgba(11,11,12,.9);
  backdrop-filter: blur(12px);
}
.hb-ke3-ib {
  display: grid;
  place-items: center;
  flex: none;
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #ededed;
  cursor: pointer;
  transition: background-color .18s ease;
}
.hb-ke3-ib:hover { background: rgba(255,255,255,.06); }
.hb-ke3-ib svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
.hb-ke3-burger { position: relative; width: 18px; height: 12px; }
.hb-ke3-burger i { position: absolute; left: 0; width: 100%; height: 1.8px; border-radius: 2px; background: currentColor; transition: transform .35s cubic-bezier(.2,.8,.2,1), opacity .2s ease, width .3s ease; }
.hb-ke3-burger i:nth-child(1) { top: 0; }
.hb-ke3-burger i:nth-child(2) { top: 5px; width: 70%; }
.hb-ke3-burger i:nth-child(3) { top: 10px; }
.hb-ke3[data-open="true"] .hb-ke3-burger i:nth-child(1) { transform: translateY(5px) rotate(45deg); }
.hb-ke3[data-open="true"] .hb-ke3-burger i:nth-child(2) { opacity: 0; width: 0; }
.hb-ke3[data-open="true"] .hb-ke3-burger i:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }
.hb-ke3-brand { display: inline-flex; align-items: center; gap: 8px; color: #ededed; font-size: 16px; font-weight: 650; letter-spacing: -.01em; text-decoration: none; }
.hb-ke3-logo { width: 22px; height: 22px; border-radius: 7px; background: linear-gradient(135deg, var(--hb-ke3-accent), color-mix(in srgb, var(--hb-ke3-accent) 40%, #7c3aed)); box-shadow: inset 0 1px 0 rgba(255,255,255,.3); }
.hb-ke3-sp { flex: 1; }
.hb-ke3-page { padding: 20px 18px; }
.hb-ke3-hi { margin: 0; color: #8f8f8f; font-size: 13px; }
.hb-ke3-h { margin: 4px 0 16px; font-size: 24px; font-weight: 650; letter-spacing: -.02em; }
.hb-ke3-card { margin-bottom: 10px; padding: 14px; border: 1px solid rgba(255,255,255,.08); border-radius: 16px; background: #131315; }
.hb-ke3-cl { height: 8px; margin-top: 8px; border-radius: 4px; background: rgba(255,255,255,.08); }
.hb-ke3-ct { font-size: 14px; font-weight: 600; }
.hb-ke3-cm { margin-top: 3px; color: #8f8f8f; font-size: 12px; }
.hb-ke3-scrim {
  position: fixed;
  z-index: 20;
  inset: 0;
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(3px);
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s ease, visibility 0s linear .3s;
}
.hb-ke3[data-open="true"] .hb-ke3-scrim { opacity: 1; visibility: visible; transition: opacity .3s ease; }
.hb-ke3-drawer {
  position: fixed;
  z-index: 30;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: min(86%, 320px);
  border-right: 1px solid rgba(255,255,255,.08);
  background: linear-gradient(180deg, #141416, #0e0e0f);
  box-shadow: 30px 0 80px -20px rgba(0,0,0,.8);
  visibility: hidden;
  transform: translate3d(-102%,0,0);
  transition: transform .42s cubic-bezier(.2,.8,.2,1), visibility 0s linear .42s;
}
.hb-ke3[data-open="true"] .hb-ke3-drawer { visibility: visible; transform: none; transition: transform .42s cubic-bezier(.2,.8,.2,1); }
.hb-ke3[data-backdrop="true"] .hb-ke3-drawer { padding-top: 44px; }
.hb-ke3-dh { display: flex; align-items: center; gap: 10px; height: 60px; padding: 0 10px 0 18px; border-bottom: 1px solid rgba(255,255,255,.07); }
.hb-ke3-search {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  margin: 14px 14px 4px;
  padding: 0 12px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 12px;
  background: #18181a;
  color: #8f8f8f;
}
.hb-ke3-search svg { width: 15px; height: 15px; flex: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-ke3-search input { flex: 1; min-width: 0; height: 100%; border: 0; outline: 0; background: transparent; color: #ededed; font: inherit; font-size: 14px; }
.hb-ke3-search input::placeholder { color: #6f6f6f; }
.hb-ke3-search:focus-within { border-color: color-mix(in srgb, var(--hb-ke3-accent) 55%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ke3-accent) 18%, transparent); }
.hb-ke3-scroll { flex: 1; overflow-y: auto; padding: 6px 10px 12px; scrollbar-width: thin; }
.hb-ke3-gt { margin: 16px 10px 6px; color: #6f6f6f; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-ke3-ul { margin: 0; padding: 0; list-style: none; }
.hb-ke3-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 42px;
  margin: 0;
  padding: 0 10px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #cfcfcf;
  font: inherit;
  font-size: 14.5px;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background-color .18s ease, color .18s ease;
}
.hb-ke3-row:hover { background: rgba(255,255,255,.05); color: #fff; }
.hb-ke3-row[data-active="true"] { color: #fff; background: rgba(255,255,255,.06); }
.hb-ke3-row svg.hb-ke3-ic { width: 18px; height: 18px; flex: none; fill: none; stroke: #8f8f8f; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.hb-ke3-row[data-active="true"] svg.hb-ke3-ic, .hb-ke3-row[aria-expanded="true"] svg.hb-ke3-ic { stroke: var(--hb-ke3-accent); }
.hb-ke3-badge { margin-left: auto; min-width: 22px; padding: 2px 7px; border-radius: 999px; background: var(--hb-ke3-accent); color: #fff; font-size: 11px; font-weight: 700; text-align: center; }
.hb-ke3-chev { width: 14px; height: 14px; margin-left: auto; fill: none; stroke: #8f8f8f; stroke-width: 2; transition: transform .3s cubic-bezier(.2,.8,.2,1); }
.hb-ke3-row[aria-expanded="true"] .hb-ke3-chev { transform: rotate(90deg); }
.hb-ke3-sub { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .32s cubic-bezier(.2,.8,.2,1); }
.hb-ke3-sub[data-open="true"] { grid-template-rows: 1fr; }
.hb-ke3-subin { min-height: 0; overflow: hidden; }
.hb-ke3-subul { position: relative; margin: 2px 0 6px 19px; padding: 0 0 0 12px; list-style: none; border-left: 1px solid rgba(255,255,255,.08); }
.hb-ke3-sl {
  position: relative;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  border-radius: 10px;
  color: #8f8f8f;
  font-size: 13.5px;
  text-decoration: none;
  transition: color .15s ease, background-color .15s ease;
}
.hb-ke3-sl:hover { color: #ededed; background: rgba(255,255,255,.04); }
.hb-ke3-sl[data-active="true"] { color: #fff; }
.hb-ke3-sl[data-active="true"]::before { content: ""; position: absolute; left: -13px; top: 9px; bottom: 9px; width: 2px; border-radius: 2px; background: var(--hb-ke3-accent); box-shadow: 0 0 10px var(--hb-ke3-accent); }
.hb-ke3-foot { display: flex; align-items: center; gap: 10px; padding: 12px 14px 16px; border-top: 1px solid rgba(255,255,255,.07); }
.hb-ke3-av { display: grid; place-items: center; flex: none; width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #22d3ee, #6366f1); color: #fff; font-size: 12.5px; font-weight: 700; }
.hb-ke3-un { font-size: 13.5px; font-weight: 600; }
.hb-ke3-ur { color: #8f8f8f; font-size: 12px; }
.hb-ke3-up { margin-left: auto; padding: 7px 12px; border-radius: 999px; background: #ededed; color: #0a0a0a; font-size: 12.5px; font-weight: 600; text-decoration: none; transition: background-color .15s ease; }
.hb-ke3-up:hover { background: #fff; }
.hb-ke3 a:focus-visible, .hb-ke3 button:focus-visible { outline: 2px solid var(--hb-ke3-accent); outline-offset: 2px; }
.hb-ke3-note {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #a1a1a1;
  font-size: 13px;
  white-space: nowrap;
}
.hb-ke3-note b { display: inline-flex; align-items: center; height: 26px; padding: 0 10px; border: 1px solid rgba(255,255,255,.12); border-radius: 999px; background: rgba(20,20,22,.8); color: #ededed; font-weight: 550; }
.hb-ke3-note i { display: block; width: 64px; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,.25), transparent); }
.hb-ke3-note[data-side="r"] { flex-direction: row-reverse; }
.hb-ke3-note[data-side="r"] i { background: linear-gradient(270deg, rgba(255,255,255,.25), transparent); }
.hb-ke3-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@container (max-width: 900px) {
  .hb-ke3-note { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ke3 *, .hb-ke3 *::before, .hb-ke3 *::after { animation: none !important; transition: none !important; }
}
`;

const icons: Record<NavSidebarMobileIcon, string[]> = {
  inbox: ["M3 13h5l1.5 3h5l1.5-3h5", "M5.5 5h13L21 13v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5l2.5-8z"],
  folder: ["M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"],
  calendar: ["M4 6h16v14H4z", "M4 10h16M9 3v4M15 3v4"],
  users: [
    "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-4A3.5 3.5 0 0 0 5 18.5V20",
    "M10.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    "M19 20v-1.5a3.5 3.5 0 0 0-2.5-3.3",
  ],
  chart: ["M4 20V10M10 20V4M16 20v-7M21 20H3"],
  gear: [
    "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    "M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.9a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.5a7 7 0 0 0-2 1.2l-2.4-.9-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-.9a7 7 0 0 0 2 1.2L10 21h4l.5-2.5a7 7 0 0 0 2-1.2l2.4.9 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z",
  ],
  help: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M9.5 9.5a2.5 2.5 0 0 1 4.8 1c0 1.7-2.3 2-2.3 3.5M12 17h.01"],
  star: ["m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"],
};

function Glyph({ name }: { name: NavSidebarMobileIcon }) {
  return (
    <svg className="hb-ke3-ic" viewBox="0 0 24 24" aria-hidden="true">
      {icons[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const defaultGroups: NavSidebarMobileGroup[] = [
  {
    title: "Workspace",
    links: [
      { label: "Inbox", href: "#inbox", icon: "inbox", badge: "12" },
      {
        label: "Projects",
        icon: "folder",
        children: [
          { label: "Website relaunch", href: "#relaunch" },
          { label: "Mobile app 3.0", href: "#mobile" },
          { label: "Q1 brand refresh", href: "#brand" },
        ],
      },
      { label: "Calendar", href: "#calendar", icon: "calendar" },
    ],
  },
  {
    title: "Team",
    links: [
      { label: "Members", href: "#members", icon: "users" },
      {
        label: "Reports",
        icon: "chart",
        children: [
          { label: "Weekly digest", href: "#weekly" },
          { label: "Velocity", href: "#velocity" },
        ],
      },
      { label: "Favorites", href: "#favorites", icon: "star" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Settings", href: "#settings", icon: "gear" },
      { label: "Help center", href: "#help", icon: "help" },
    ],
  },
];

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function NavSidebarMobile({
  brand = "Harbor",
  groups = defaultGroups,
  activeHref = "#relaunch",
  user = { name: "Iris Calder", role: "Design lead" },
  cta = { label: "Upgrade", href: "#" },
  open,
  defaultOpen = false,
  onOpenChange,
  defaultExpanded = ["Projects"],
  accent = "#ff6b4a",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavSidebarMobileProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = open ?? inner;
  const [expanded, setExpanded] = React.useState<string[]>(defaultExpanded);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const burgerRef = React.useRef<HTMLButtonElement>(null);
  const opened = React.useRef(false);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  React.useEffect(() => {
    if (!isOpen || !opened.current) return;
    opened.current = false;
    const id = window.requestAnimationFrame(() => {
      drawerRef.current?.querySelector<HTMLElement>(focusable)?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [isOpen]);

  function toggle() {
    if (!isOpen) opened.current = true;
    setOpen(!isOpen);
  }

  function close() {
    setOpen(false);
    burgerRef.current?.focus();
  }

  function onDrawerKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== "Tab" || !drawerRef.current) return;
    const nodes = Array.from(drawerRef.current.querySelectorAll<HTMLElement>(focusable)).filter((n) => n.offsetParent !== null);
    if (!nodes.length) return;
    const first = nodes[0]!;
    const last = nodes[nodes.length - 1]!;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function flip(label: string) {
    setExpanded((list) => (list.includes(label) ? list.filter((l) => l !== label) : [...list, label]));
  }

  const nav = (
    <>
      <div className="hb-ke3-bar">
        <button
          ref={burgerRef}
          type="button"
          className="hb-ke3-ib"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls={`${uid}-drawer`}
          onClick={toggle}
        >
          <span className="hb-ke3-burger" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
        <a href="#" className="hb-ke3-brand">
          <span className="hb-ke3-logo" aria-hidden="true" />
          {brand}
        </a>
        <span className="hb-ke3-sp" />
        <button type="button" className="hb-ke3-ib" aria-label="Notifications">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16zM10 20.5a2 2 0 0 0 4 0" />
          </svg>
        </button>
      </div>
      <div className="hb-ke3-scrim" aria-hidden="true" onClick={close} />
      <div
        ref={drawerRef}
        id={`${uid}-drawer`}
        className="hb-ke3-drawer"
        role="dialog"
        aria-modal={isOpen ? "true" : undefined}
        aria-label="Navigation"
        onKeyDown={onDrawerKey}
      >
        <div className="hb-ke3-dh">
          <span className="hb-ke3-brand">
            <span className="hb-ke3-logo" aria-hidden="true" />
            {brand}
          </span>
          <span className="hb-ke3-sp" />
          <button type="button" className="hb-ke3-ib" aria-label="Close menu" onClick={close}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <label className="hb-ke3-search">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
          <span className="hb-ke3-sr">Search</span>
          <input type="search" placeholder="Jump to..." />
        </label>
        <div className="hb-ke3-scroll">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="hb-ke3-gt" id={`${uid}-${group.title}`}>
                {group.title}
              </p>
              <ul className="hb-ke3-ul" aria-labelledby={`${uid}-${group.title}`}>
                {group.links.map((link) => {
                  if (link.children && link.children.length) {
                    const on = expanded.includes(link.label);
                    const subId = `${uid}-${group.title}-${link.label}`.replace(/\s+/g, "-");
                    return (
                      <li key={link.label}>
                        <button
                          type="button"
                          className="hb-ke3-row"
                          aria-expanded={on}
                          aria-controls={subId}
                          onClick={() => flip(link.label)}
                        >
                          {link.icon && <Glyph name={link.icon} />}
                          {link.label}
                          <svg className="hb-ke3-chev" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="m6 4 4 4-4 4" />
                          </svg>
                        </button>
                        <div id={subId} className="hb-ke3-sub" data-open={on ? "true" : "false"}>
                          <div className="hb-ke3-subin" inert={!on}>
                            <ul className="hb-ke3-subul">
                              {link.children.map((sub) => (
                                <li key={sub.label}>
                                  <a
                                    href={sub.href}
                                    className="hb-ke3-sl"
                                    data-active={sub.href === activeHref ? "true" : "false"}
                                    aria-current={sub.href === activeHref ? "page" : undefined}
                                    onClick={() => setOpen(false)}
                                  >
                                    {sub.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                    );
                  }
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href ?? "#"}
                        className="hb-ke3-row"
                        data-active={link.href === activeHref ? "true" : "false"}
                        aria-current={link.href === activeHref ? "page" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {link.icon && <Glyph name={link.icon} />}
                        {link.label}
                        {link.badge && <span className="hb-ke3-badge">{link.badge}</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        {user && (
          <div className="hb-ke3-foot">
            <span className="hb-ke3-av" aria-hidden="true">
              {user.name
                .split(/\s+/)
                .slice(0, 2)
                .map((p) => p.charAt(0).toUpperCase())
                .join("")}
            </span>
            <div>
              <div className="hb-ke3-un">{user.name}</div>
              <div className="hb-ke3-ur">{user.role}</div>
            </div>
            {cta && (
              <a href={cta.href} className="hb-ke3-up">
                {cta.label}
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div
      className={`hb-ke3 ${className}`}
      data-open={isOpen ? "true" : "false"}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-ke3-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-nav-sidebar-mobile" precedence="default">
        {css}
      </style>
      {showBackdrop ? (
        <>
          <span className="hb-ke3-note" style={{ left: "calc(50% - 400px)", top: "150px" }} aria-hidden="true">
            <b>Grouped links</b>
            <i />
          </span>
          <span className="hb-ke3-note" style={{ left: "calc(50% - 404px)", top: "300px" }} aria-hidden="true">
            <b>Accordion sub-links</b>
            <i />
          </span>
          <span className="hb-ke3-note" data-side="r" style={{ right: "calc(50% - 392px)", top: "120px" }} aria-hidden="true">
            <b>Esc to close</b>
            <i />
          </span>
          <span className="hb-ke3-note" data-side="r" style={{ right: "calc(50% - 400px)", top: "380px" }} aria-hidden="true">
            <b>Focus stays inside</b>
            <i />
          </span>
          <div className="hb-ke3-phone">
            <div className="hb-ke3-screen">
              <span className="hb-ke3-notch" aria-hidden="true" />
              <div className="hb-ke3-status" aria-hidden="true">
                <span>9:41</span>
                <span className="hb-ke3-sig">
                  <i style={{ height: 4 }} />
                  <i style={{ height: 6 }} />
                  <i style={{ height: 8 }} />
                  <i style={{ height: 10 }} />
                </span>
              </div>
              {nav}
              <div className="hb-ke3-page" aria-hidden="true">
                <p className="hb-ke3-hi">Tuesday, 4 November</p>
                <p className="hb-ke3-h">Good morning, Iris</p>
                <div className="hb-ke3-card">
                  <div className="hb-ke3-ct">Homepage hero review</div>
                  <div className="hb-ke3-cm">Due today, 3 comments</div>
                  <div className="hb-ke3-cl" style={{ width: "82%" }} />
                </div>
                <div className="hb-ke3-card">
                  <div className="hb-ke3-ct">App store screenshots</div>
                  <div className="hb-ke3-cm">Thursday, assigned to Omar</div>
                  <div className="hb-ke3-cl" style={{ width: "56%" }} />
                </div>
                <div className="hb-ke3-card">
                  <div className="hb-ke3-ct">Brand color audit</div>
                  <div className="hb-ke3-cm">Next week</div>
                  <div className="hb-ke3-cl" style={{ width: "30%" }} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        nav
      )}
    </div>
  );
}
