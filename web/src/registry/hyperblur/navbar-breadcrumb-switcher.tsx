"use client";

import * as React from "react";

export interface NavbarBreadcrumbSwitcherProject {
  id: string;
  name: string;
  envs: string[];
}

export interface NavbarBreadcrumbSwitcherOrg {
  id: string;
  name: string;
  plan?: string;
  tone?: string;
  projects: NavbarBreadcrumbSwitcherProject[];
}

export interface NavbarBreadcrumbSwitcherValue {
  org: string;
  project: string;
  env: string;
}

type Level = "org" | "project" | "env";

export interface NavbarBreadcrumbSwitcherProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onChange" | "defaultValue"> {
  orgs?: NavbarBreadcrumbSwitcherOrg[];
  value?: NavbarBreadcrumbSwitcherValue;
  defaultValue?: NavbarBreadcrumbSwitcherValue;
  onValueChange?: (value: NavbarBreadcrumbSwitcherValue) => void;
  onCreate?: (level: Level) => void;
  status?: { label: string; tone?: "ready" | "building" | "error" } | null;
  user?: { name: string; initials?: string } | null;
  defaultOpen?: Level | null;
  accent?: string;
  showBackdrop?: boolean;
}

const defaultOrgs: NavbarBreadcrumbSwitcherOrg[] = [
  {
    id: "acme",
    name: "Acme Studio",
    plan: "Pro",
    tone: "linear-gradient(135deg,#f97316,#db2777)",
    projects: [
      { id: "marketing-site", name: "marketing-site", envs: ["Production", "Preview", "Development"] },
      { id: "payments-api", name: "payments-api", envs: ["Production", "Staging"] },
      { id: "docs", name: "docs", envs: ["Production", "Preview"] },
      { id: "mobile-app", name: "mobile-app", envs: ["Production", "Beta", "Internal"] },
    ],
  },
  {
    id: "ines",
    name: "Ines Duarte",
    plan: "Hobby",
    tone: "linear-gradient(135deg,#22c55e,#0ea5e9)",
    projects: [
      { id: "portfolio", name: "portfolio", envs: ["Production", "Preview"] },
      { id: "recipe-box", name: "recipe-box", envs: ["Production"] },
    ],
  },
  {
    id: "northwind",
    name: "Northwind Labs",
    plan: "Enterprise",
    tone: "linear-gradient(135deg,#6366f1,#a855f7)",
    projects: [
      { id: "dashboard", name: "dashboard", envs: ["Production", "Staging", "QA"] },
      { id: "edge-gateway", name: "edge-gateway", envs: ["Production", "Canary"] },
    ],
  },
];

const ease = "cubic-bezier(.22,1,.36,1)";

const css = `
.hb-xj10 {
  --hb-xj10-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xj10 *, .hb-xj10 *::before, .hb-xj10 *::after { box-sizing: border-box; }
.hb-xj10[data-backdrop="true"] { min-height: 620px; overflow: hidden; background: #0a0a0a; }
.hb-xj10-bar {
  position: relative;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 60px;
  padding: 0 16px;
  border-bottom: 1px solid #1f1f1f;
  background: #0c0c0c;
}
.hb-xj10-logo { display: grid; place-items: center; width: 32px; height: 32px; flex: none; color: #ededed; border-radius: 8px; text-decoration: none; }
.hb-xj10-logo svg { width: 22px; height: 22px; }
.hb-xj10-crumbs { display: flex; align-items: center; min-width: 0; margin: 0; padding: 0; list-style: none; }
.hb-xj10-crumbs > li { position: relative; display: flex; align-items: center; min-width: 0; }
.hb-xj10-sep { width: 22px; height: 22px; flex: none; color: #333; }
.hb-xj10-seg {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  height: 36px;
  padding: 0 6px 0 8px;
  border: 0;
  border-radius: 9px;
  background: none;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .2s ease;
}
.hb-xj10-seg:hover, .hb-xj10-seg[aria-expanded="true"] { background: rgba(255,255,255,.06); }
.hb-xj10-name { display: inline-block; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; animation: hb-xj10-swap .45s ${ease}; }
@keyframes hb-xj10-swap { from { opacity: 0; transform: translateY(6px); filter: blur(3px); } }
.hb-xj10-tile { width: 20px; height: 20px; flex: none; border-radius: 6px; box-shadow: inset 0 1px 0 rgba(255,255,255,.3); }
.hb-xj10-proj { display: grid; place-items: center; width: 20px; height: 20px; flex: none; border-radius: 50%; border: 1px solid #2f2f2f; background: #161616; color: #a1a1a1; font-size: 10px; font-weight: 700; text-transform: uppercase; }
.hb-xj10-plan { height: 20px; padding: 0 7px; border-radius: 999px; border: 1px solid #2a2a2a; color: #a1a1a1; font-size: 11px; font-weight: 500; line-height: 18px; white-space: nowrap; }
.hb-xj10-plan[data-plan="Pro"], .hb-xj10-plan[data-plan="Enterprise"] { border-color: color-mix(in srgb, var(--hb-xj10-accent) 45%, transparent); color: color-mix(in srgb, var(--hb-xj10-accent) 55%, #fff); background: color-mix(in srgb, var(--hb-xj10-accent) 10%, transparent); }
.hb-xj10-env { display: inline-flex; align-items: center; gap: 7px; }
.hb-xj10-edot { width: 8px; height: 8px; flex: none; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,.15); }
.hb-xj10-edot[data-env="other"] { background: #eab308; box-shadow: 0 0 0 3px rgba(234,179,8,.15); }
.hb-xj10-chev { width: 16px; height: 16px; flex: none; color: #6b6b6b; }
.hb-xj10-pop {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  z-index: 6;
  width: 300px;
  border: 1px solid #262626;
  border-radius: 14px;
  background: linear-gradient(180deg, #151515, #101010);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 30px 60px -20px rgba(0,0,0,.95);
  overflow: hidden;
  transform-origin: 20px 0;
  animation: hb-xj10-pop .3s ${ease};
}
@keyframes hb-xj10-pop { from { opacity: 0; transform: translateY(-4px) scale(.97); } }
.hb-xj10-find { display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 12px; border-bottom: 1px solid #1f1f1f; }
.hb-xj10-find svg { width: 15px; height: 15px; flex: none; fill: none; stroke: #6b6b6b; stroke-width: 2; stroke-linecap: round; }
.hb-xj10-find input { flex: 1; min-width: 0; height: 100%; border: 0; outline: none; background: none; color: #ededed; font: inherit; font-size: 13.5px; }
.hb-xj10-find input::placeholder { color: #6b6b6b; }
.hb-xj10-find kbd { height: 20px; padding: 0 6px; border: 1px solid #2a2a2a; border-radius: 5px; color: #8f8f8f; font-family: var(--font-mono, monospace); font-size: 10.5px; line-height: 18px; }
.hb-xj10-cap { padding: 10px 14px 4px; color: #6b6b6b; font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-xj10-list { max-height: 240px; margin: 0; padding: 4px 6px 6px; list-style: none; overflow-y: auto; overscroll-behavior: contain; }
.hb-xj10-opt { display: flex; align-items: center; gap: 10px; height: 40px; padding: 0 8px; border-radius: 9px; color: #d4d4d4; font-size: 13.5px; cursor: pointer; }
.hb-xj10-opt[data-active="true"] { background: rgba(255,255,255,.06); color: #fff; }
.hb-xj10-opt > span:nth-child(2) { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xj10-opt small { color: #6b6b6b; font-size: 11.5px; }
.hb-xj10-check { width: 16px; height: 16px; flex: none; fill: none; stroke: var(--hb-xj10-accent); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-xj10-none { padding: 18px 12px; color: #8f8f8f; font-size: 13px; text-align: center; }
.hb-xj10-new { display: flex; align-items: center; gap: 10px; width: 100%; height: 42px; padding: 0 14px; border: 0; border-top: 1px solid #1f1f1f; background: none; color: #a1a1a1; font: inherit; font-size: 13.5px; text-align: left; cursor: pointer; }
.hb-xj10-new:hover { color: #fff; background: rgba(255,255,255,.04); }
.hb-xj10-new svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-xj10-grow { flex: 1; }
.hb-xj10-status { display: inline-flex; align-items: center; gap: 8px; height: 30px; padding: 0 11px; border: 1px solid #222; border-radius: 999px; color: #a1a1a1; font-size: 12.5px; white-space: nowrap; }
.hb-xj10-pulse { position: relative; width: 7px; height: 7px; border-radius: 50%; background: #22c55e; }
.hb-xj10-pulse::after { content: ""; position: absolute; inset: -3px; border-radius: 50%; border: 1.5px solid currentColor; color: #22c55e; animation: hb-xj10-ping 2s ${ease} infinite; }
.hb-xj10-pulse[data-tone="building"] { background: #eab308; }
.hb-xj10-pulse[data-tone="building"]::after { color: #eab308; }
.hb-xj10-pulse[data-tone="error"] { background: #ef4444; }
.hb-xj10-pulse[data-tone="error"]::after { color: #ef4444; }
@keyframes hb-xj10-ping { from { transform: scale(.6); opacity: 1; } to { transform: scale(1.8); opacity: 0; } }
.hb-xj10-fb { height: 32px; padding: 0 12px; border: 1px solid #262626; border-radius: 8px; background: none; color: #a1a1a1; font: inherit; font-size: 13px; cursor: pointer; transition: color .2s ease, border-color .2s ease; }
.hb-xj10-fb:hover { color: #ededed; border-color: #333; }
.hb-xj10-av { display: grid; place-items: center; width: 30px; height: 30px; flex: none; border-radius: 50%; background: linear-gradient(135deg, #0ea5e9, #6366f1); color: #fff; font-size: 11px; font-weight: 700; }
.hb-xj10 a:focus-visible, .hb-xj10 button:focus-visible { outline: 2px solid var(--hb-xj10-accent); outline-offset: 2px; }
@container (max-width: 820px) {
  .hb-xj10-fb { display: none; }
}
@container (max-width: 640px) {
  .hb-xj10-bar { padding: 0 10px; gap: 4px; }
  .hb-xj10-crumbs > li { position: static; }
  .hb-xj10-orgname, .hb-xj10-plan, .hb-xj10-envname, .hb-xj10-status span:last-child { display: none; }
  .hb-xj10-status { padding: 0 9px; }
  .hb-xj10-sep { width: 16px; }
  .hb-xj10-seg { padding: 0 4px 0 6px; }
  .hb-xj10-pop { left: 8px; right: 8px; width: auto; top: calc(100% + 6px); }
}
.hb-xj10-sub { position: relative; z-index: 1; display: flex; gap: 2px; padding: 0 14px; border-bottom: 1px solid #1a1a1a; background: #0c0c0c; overflow-x: auto; scrollbar-width: none; }
.hb-xj10-sub span { position: relative; padding: 12px 10px; color: #8f8f8f; font-size: 13.5px; white-space: nowrap; }
.hb-xj10-sub span:first-child { color: #ededed; }
.hb-xj10-sub span:first-child::after { content: ""; position: absolute; left: 10px; right: 10px; bottom: -1px; height: 2px; background: #ededed; }
.hb-xj10-page { position: relative; z-index: 1; padding: 26px 20px; max-width: 980px; margin: 0 auto; }
.hb-xj10-page h2 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -.025em; }
.hb-xj10-page p { margin: 4px 0 18px; color: #8f8f8f; font-size: 13px; }
.hb-xj10-rows { border: 1px solid #1f1f1f; border-radius: 12px; overflow: hidden; }
.hb-xj10-row { display: grid; grid-template-columns: 1.4fr 1fr .6fr; align-items: center; gap: 12px; padding: 14px 16px; border-top: 1px solid #1a1a1a; background: #0f0f0f; font-size: 13px; color: #d4d4d4; }
.hb-xj10-row:first-child { border-top: 0; }
.hb-xj10-row code { color: #8f8f8f; font-family: var(--font-mono, monospace); font-size: 12px; }
.hb-xj10-row em { display: inline-flex; align-items: center; gap: 6px; font-style: normal; color: #a1a1a1; }
.hb-xj10-row em i { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; font-style: normal; }
.hb-xj10-row small { justify-self: end; color: #6b6b6b; font-size: 12px; }
@container (max-width: 640px) { .hb-xj10-row { grid-template-columns: 1fr auto; } .hb-xj10-row code { display: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xj10 *, .hb-xj10 *::before, .hb-xj10 *::after { transition: none !important; animation: none !important; }
}
`;

function Slash() {
  return (
    <svg className="hb-xj10-sep" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.5 4 8.5 20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Chev() {
  return (
    <svg className="hb-xj10-chev" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 6.5 3-3 3 3M5 9.5l3 3 3-3" />
    </svg>
  );
}

interface Option {
  id: string;
  label: string;
  meta?: string;
  tone?: string;
}

function Switcher({
  level,
  options,
  selected,
  onPick,
  onClose,
  onCreate,
  listId,
  focusOnMount,
}: {
  level: Level;
  options: Option[];
  selected: string;
  onPick: (id: string) => void;
  onClose: (refocus: boolean) => void;
  onCreate?: (level: Level) => void;
  listId: string;
  focusOnMount: boolean;
}) {
  const [q, setQ] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (focusOnMount) inputRef.current?.focus();
  }, [focusOnMount]);
  const [active, setActive] = React.useState(() => Math.max(0, options.findIndex((o) => o.id === selected)));
  const shown = options.filter((o) => o.label.toLowerCase().includes(q.trim().toLowerCase()));
  const at = Math.min(active, Math.max(0, shown.length - 1));
  const noun = level === "org" ? "team" : level === "project" ? "project" : "environment";

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!shown.length) return;
      setActive((at + (e.key === "ArrowDown" ? 1 : -1) + shown.length) % shown.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (shown[at]) onPick(shown[at].id);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onClose(true);
    } else if (e.key === "Tab") {
      onClose(false);
    }
  };

  return (
    <div className="hb-xj10-pop">
      <div className="hb-xj10-find">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="9" cy="9" r="5.5" />
          <path d="m13.2 13.2 3.3 3.3" />
        </svg>
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={shown[at] ? `${listId}-${at}` : undefined}
          aria-label={`Find ${noun}`}
          placeholder={`Find ${noun}…`}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKey}
        />
        <kbd>esc</kbd>
      </div>
      <div className="hb-xj10-cap">{level === "org" ? "Teams" : level === "project" ? "Projects" : "Environments"}</div>
      <ul className="hb-xj10-list" id={listId} role="listbox" aria-label={`${noun}s`}>
        {shown.length === 0 && (
          <li className="hb-xj10-none" role="presentation">
            No {noun} matches “{q}”
          </li>
        )}
        {shown.map((o, i) => (
          <li
            key={o.id}
            id={`${listId}-${i}`}
            role="option"
            aria-selected={o.id === selected}
            className="hb-xj10-opt"
            data-active={i === at ? "true" : "false"}
            onPointerMove={() => i !== at && setActive(i)}
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => onPick(o.id)}
          >
            {level === "org" ? (
              <span className="hb-xj10-tile" style={{ background: o.tone }} aria-hidden="true" />
            ) : level === "project" ? (
              <span className="hb-xj10-proj" aria-hidden="true">
                {o.label.slice(0, 1)}
              </span>
            ) : (
              <span className="hb-xj10-edot" data-env={o.label === "Production" ? undefined : "other"} aria-hidden="true" />
            )}
            <span>{o.label}</span>
            {o.meta && <small>{o.meta}</small>}
            {o.id === selected && (
              <svg className="hb-xj10-check" viewBox="0 0 16 16" aria-hidden="true">
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            )}
          </li>
        ))}
      </ul>
      {onCreate && (
        <button type="button" className="hb-xj10-new" onClick={() => onCreate(level)}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 3v10M3 8h10" />
          </svg>
          New {noun}
        </button>
      )}
    </div>
  );
}

export function NavbarBreadcrumbSwitcher({
  orgs = defaultOrgs,
  value,
  defaultValue,
  onValueChange,
  onCreate,
  status = { label: "Ready, deployed 2m ago", tone: "ready" },
  user = { name: "Ines Duarte", initials: "ID" },
  defaultOpen = null,
  accent = "#2f7bff",
  showBackdrop = true,
  className,
  style,
  ...rest
}: NavbarBreadcrumbSwitcherProps) {
  const fallback: NavbarBreadcrumbSwitcherValue = {
    org: orgs[0]?.id ?? "",
    project: orgs[0]?.projects[0]?.id ?? "",
    env: orgs[0]?.projects[0]?.envs[0] ?? "",
  };
  const [inner, setInner] = React.useState<NavbarBreadcrumbSwitcherValue>(defaultValue ?? fallback);
  const [open, setOpen] = React.useState<Level | null>(defaultOpen);
  const [touched, setTouched] = React.useState(false);
  const rootRef = React.useRef<HTMLElement>(null);
  const segRefs = React.useRef<Record<Level, HTMLButtonElement | null>>({ org: null, project: null, env: null });
  const baseId = React.useId();
  const current = value ?? inner;

  const org = orgs.find((o) => o.id === current.org) ?? orgs[0];
  const project = org?.projects.find((p) => p.id === current.project) ?? org?.projects[0];
  const env = project?.envs.includes(current.env) ? current.env : (project?.envs[0] ?? "");

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const pop = rootRef.current?.querySelector(".hb-xj10-pop");
      const seg = segRefs.current[open];
      if (pop?.contains(e.target as Node) || seg?.contains(e.target as Node)) return;
      setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const commit = (next: NavbarBreadcrumbSwitcherValue) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };

  const pick = (level: Level, id: string) => {
    if (level === "org") {
      const o = orgs.find((x) => x.id === id);
      const p = o?.projects[0];
      commit({ org: id, project: p?.id ?? "", env: p?.envs[0] ?? "" });
    } else if (level === "project") {
      const p = org?.projects.find((x) => x.id === id);
      commit({ org: org?.id ?? "", project: id, env: p?.envs[0] ?? "" });
    } else {
      commit({ org: org?.id ?? "", project: project?.id ?? "", env: id });
    }
    setOpen(null);
    segRefs.current[level]?.focus();
  };

  const close = (level: Level, refocus: boolean) => {
    setOpen(null);
    if (refocus) segRefs.current[level]?.focus();
  };

  const options: Record<Level, Option[]> = {
    org: orgs.map((o) => ({ id: o.id, label: o.name, meta: o.plan, tone: o.tone })),
    project: (org?.projects ?? []).map((p) => ({ id: p.id, label: p.name, meta: `${p.envs.length} env` })),
    env: (project?.envs ?? []).map((e) => ({ id: e, label: e })),
  };

  const seg = (level: Level, children: React.ReactNode, label: string) => (
    <li>
      <button
        ref={(el) => {
          segRefs.current[level] = el;
        }}
        type="button"
        className="hb-xj10-seg"
        aria-haspopup="listbox"
        aria-expanded={open === level}
        aria-label={label}
        onClick={() => {
          setTouched(true);
          setOpen(open === level ? null : level);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && open !== level) {
            e.preventDefault();
            setTouched(true);
            setOpen(level);
          }
        }}
      >
        {children}
        <Chev />
      </button>
      {open === level && (
        <Switcher
          key={`${level}-${current.org}-${current.project}`}
          level={level}
          options={options[level]}
          selected={level === "org" ? (org?.id ?? "") : level === "project" ? (project?.id ?? "") : env}
          onPick={(id) => pick(level, id)}
          onClose={(r) => close(level, r)}
          onCreate={onCreate}
          listId={`${baseId}-${level}`}
          focusOnMount={touched}
        />
      )}
    </li>
  );

  return (
    <header
      ref={rootRef}
      className={["hb-xj10", className].filter(Boolean).join(" ")}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-xj10-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-navbar-breadcrumb-switcher" precedence="default">
        {css}
      </style>
      <nav className="hb-xj10-bar" aria-label="Workspace">
        <a className="hb-xj10-logo" href="#top" aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3 21 19H3Z" fill="currentColor" />
          </svg>
        </a>
        <Slash />
        <ol className="hb-xj10-crumbs">
          {seg(
            "org",
            <>
              <span className="hb-xj10-tile" style={{ background: org?.tone }} aria-hidden="true" />
              <span className="hb-xj10-name hb-xj10-orgname" key={org?.id}>
                {org?.name}
              </span>
              {org?.plan && (
                <span className="hb-xj10-plan" data-plan={org.plan}>
                  {org.plan}
                </span>
              )}
            </>,
            `Team: ${org?.name}`,
          )}
          <li aria-hidden="true">
            <Slash />
          </li>
          {seg(
            "project",
            <>
              <span className="hb-xj10-proj" aria-hidden="true">
                {project?.name.slice(0, 1)}
              </span>
              <span className="hb-xj10-name" key={`${org?.id}-${project?.id}`}>
                {project?.name}
              </span>
            </>,
            `Project: ${project?.name}`,
          )}
          <li aria-hidden="true">
            <Slash />
          </li>
          {seg(
            "env",
            <span className="hb-xj10-env">
              <span className="hb-xj10-edot" data-env={env === "Production" ? undefined : "other"} aria-hidden="true" />
              <span className="hb-xj10-name hb-xj10-envname" key={`${project?.id}-${env}`}>
                {env}
              </span>
            </span>,
            `Environment: ${env}`,
          )}
        </ol>
        <span className="hb-xj10-grow" />
        {status && (
          <span className="hb-xj10-status" role="status">
            <span className="hb-xj10-pulse" data-tone={status.tone ?? "ready"} aria-hidden="true" />
            <span>{status.label}</span>
          </span>
        )}
        <button type="button" className="hb-xj10-fb">
          Feedback
        </button>
        {user && (
          <span className="hb-xj10-av" role="img" aria-label={user.name}>
            {user.initials ?? user.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </nav>
      {showBackdrop && (
        <>
          <div className="hb-xj10-sub" aria-hidden="true">
            <span>Deployments</span>
            <span>Logs</span>
            <span>Analytics</span>
            <span>Domains</span>
            <span>Settings</span>
          </div>
          <div className="hb-xj10-page" aria-hidden="true">
            <h2>{project?.name}</h2>
            <p>
              {org?.name} · {env}
            </p>
            <div className="hb-xj10-rows">
              {[
                ["Fix hydration on checkout", "a1f9c2e", "2m"],
                ["Add usage based billing", "7be04d1", "1h"],
                ["Move images to edge cache", "c33a8f0", "6h"],
                ["Bump framework to 16.4", "09d71aa", "1d"],
              ].map(([t, c, w]) => (
                <div className="hb-xj10-row" key={c}>
                  <em>
                    <i />
                    {t}
                  </em>
                  <code>{c}</code>
                  <small>{w} ago</small>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
