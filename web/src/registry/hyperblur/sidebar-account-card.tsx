"use client";

import * as React from "react";

const PATHS = {
  home: "M3.5 9.2L10 3.8l6.5 5.4V16a.8.8 0 0 1-.8.8H12v-4.5H8v4.5H4.3a.8.8 0 0 1-.8-.8z",
  pulse: "M2.5 10h3.2l2-5 4 10 2-5h3.8",
  folder: "M3 6.2a1.5 1.5 0 0 1 1.5-1.5h3.1l1.6 1.8h5.8A1.5 1.5 0 0 1 16.5 8v6.3a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 14.3z",
  calendar: "M4.5 5h11a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3.5 8.5h13M7 3.5v3M13 3.5v3",
  chat: "M4 4.5h12a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H9.5L6 17v-3.3H4a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z",
} as const;

export type SidebarAccountCardIconName = keyof typeof PATHS;
export type SidebarAccountCardStatus = "online" | "away" | "busy";

export interface SidebarAccountCardItem {
  id: string;
  label: string;
  icon?: SidebarAccountCardIconName | React.ReactNode;
  badge?: number;
}

export interface SidebarAccountCardUser {
  name: string;
  email: string;
  initials?: string;
  color?: string;
}

export interface SidebarAccountCardAccount {
  id: string;
  name: string;
  role?: string;
  color?: string;
}

export interface SidebarAccountCardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  items?: SidebarAccountCardItem[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  user?: SidebarAccountCardUser;
  status?: SidebarAccountCardStatus;
  defaultStatus?: SidebarAccountCardStatus;
  onStatusChange?: (status: SidebarAccountCardStatus) => void;
  accounts?: SidebarAccountCardAccount[];
  account?: string;
  defaultAccount?: string;
  onAccountChange?: (id: string) => void;
  seats?: { used: number; total: number } | null;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSettings?: () => void;
  onSignOut?: () => void;
  brand?: string;
  accent?: string;
}

const defaultItems: SidebarAccountCardItem[] = [
  { id: "home", label: "Overview", icon: "home" },
  { id: "activity", label: "Activity", icon: "pulse", badge: 6 },
  { id: "projects", label: "Projects", icon: "folder" },
  { id: "schedule", label: "Schedule", icon: "calendar" },
  { id: "messages", label: "Messages", icon: "chat" },
];

const defaultAccounts: SidebarAccountCardAccount[] = [
  { id: "acme", name: "Acme Robotics", role: "Owner", color: "#2f7bff" },
  { id: "loop", name: "Loop Health", role: "Editor", color: "#30a46c" },
];

const STATUS: Record<SidebarAccountCardStatus, { label: string; note: string; color: string }> = {
  online: { label: "Active", note: "Online now", color: "#30a46c" },
  away: { label: "Away", note: "Back in 30 min", color: "#f5a623" },
  busy: { label: "Focus", note: "Notifications paused", color: "#e5484d" },
};

const css = `
.hb-xk8 {
  --hb-xk8-a: #2f7bff;
  --hb-xk8-st: #30a46c;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 8px 8px;
  border-right: 1px solid #1f1f1f;
  background: #0d0d0d;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
}
.hb-xk8 *, .hb-xk8 *::before, .hb-xk8 *::after { box-sizing: border-box; }
.hb-xk8-brand { display: flex; align-items: center; gap: 8px; height: 28px; margin: 0 6px 8px; font-size: 13px; font-weight: 600; letter-spacing: -.01em; }
.hb-xk8-brand i { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 6px; background: #ededed; color: #0d0d0d; font-size: 11px; font-style: normal; font-weight: 800; }
.hb-xk8-list { display: flex; flex-direction: column; gap: 1px; margin: 0; padding: 0; list-style: none; transition: filter .35s ease, opacity .35s ease; }
.hb-xk8[data-open="true"] .hb-xk8-list { filter: blur(2px); opacity: .35; }
.hb-xk8-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 32px;
  margin: 0;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #9a9aa1;
  font: inherit;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-xk8-item svg { flex: none; width: 16px; height: 16px; }
.hb-xk8-item:hover { background: rgba(255, 255, 255, .04); color: #ededed; }
.hb-xk8-item:focus-visible, .hb-xk8-btn:focus-visible, .hb-xk8-opt:focus-visible, .hb-xk8-acct:focus-visible, .hb-xk8-act:focus-visible { outline: 2px solid var(--hb-xk8-a); outline-offset: -2px; }
.hb-xk8-item[aria-current="page"] { background: #1a1a1a; box-shadow: inset 0 0 0 1px #262626; color: #fff; }
.hb-xk8-il { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk8-n { padding: 0 6px; border-radius: 99px; background: var(--hb-xk8-a); color: #fff; font-size: 10.5px; font-weight: 600; line-height: 17px; }
.hb-xk8-scrim { position: absolute; inset: 0; z-index: 1; margin: 0; padding: 0; border: 0; background: transparent; cursor: default; }
.hb-xk8-card {
  position: absolute;
  right: 8px;
  bottom: 8px;
  left: 8px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #242424;
  border-radius: 13px;
  background: linear-gradient(180deg, #161616, #121212);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 8px 24px -14px rgba(0, 0, 0, .9);
  transition: border-color .3s ease, box-shadow .4s ease;
}
.hb-xk8[data-open="true"] .hb-xk8-card { border-color: #2e2e2e; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 24px 50px -16px rgba(0, 0, 0, 1); }
.hb-xk8-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s cubic-bezier(.22, 1, .36, 1); }
.hb-xk8[data-open="true"] .hb-xk8-panel { grid-template-rows: 1fr; }
.hb-xk8-pin { min-height: 0; overflow: hidden; }
.hb-xk8-pc { padding: 8px 8px 2px; opacity: 0; transform: translateY(8px); transition: opacity .2s ease, transform .35s cubic-bezier(.22, 1, .36, 1); }
.hb-xk8[data-open="true"] .hb-xk8-pc { opacity: 1; transform: none; transition-delay: .1s; }
.hb-xk8-seg { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); padding: 3px; border-radius: 9px; background: #0c0c0c; box-shadow: inset 0 0 0 1px #222; }
.hb-xk8-thumb { position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc((100% - 6px) / 3); border-radius: 7px; background: #222; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .07), 0 2px 6px rgba(0, 0, 0, .5); transform: translateX(calc(var(--hb-xk8-si) * 100%)); transition: transform .4s cubic-bezier(.34, 1.3, .5, 1); }
.hb-xk8-opt { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 5px; height: 24px; margin: 0; padding: 0; border: 0; border-radius: 7px; background: transparent; color: #8f8f8f; font: inherit; font-size: 11px; font-weight: 500; cursor: pointer; transition: color .2s ease; }
.hb-xk8-opt[aria-checked="true"] { color: #fff; }
.hb-xk8-opt i { width: 6px; height: 6px; border-radius: 99px; font-style: normal; }
.hb-xk8-cap { margin: 8px 4px 3px; color: #5f5f66; font-size: 10px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-xk8-acct { display: flex; align-items: center; gap: 8px; width: 100%; height: 30px; margin: 0; padding: 0 6px; border: 0; border-radius: 7px; background: transparent; color: #c4c4c9; font: inherit; font-size: 12px; text-align: left; cursor: pointer; transition: background-color .15s ease; }
.hb-xk8-acct:hover { background: rgba(255, 255, 255, .05); }
.hb-xk8-sq { display: grid; flex: none; place-items: center; width: 20px; height: 20px; border-radius: 6px; color: #fff; font-size: 10px; font-weight: 700; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25); }
.hb-xk8-an { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk8-role { color: #5f5f66; font-size: 10.5px; }
.hb-xk8-check { width: 14px; height: 14px; color: var(--hb-xk8-a); animation: hb-xk8-pop .3s cubic-bezier(.34, 1.56, .64, 1); }
.hb-xk8-seats { margin: 8px 4px 0; }
.hb-xk8-sr { display: flex; justify-content: space-between; color: #8f8f8f; font-size: 10.5px; }
.hb-xk8-sr b { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-xk8-meter { display: grid; grid-template-columns: repeat(var(--hb-xk8-t), 1fr); gap: 2px; margin-top: 5px; }
.hb-xk8-meter span { height: 4px; border-radius: 2px; background: #262626; }
.hb-xk8-meter span[data-on="true"] { background: var(--hb-xk8-a); }
.hb-xk8-acts { display: flex; gap: 4px; margin-top: 8px; padding-top: 6px; border-top: 1px solid #222; }
.hb-xk8-act { display: inline-flex; flex: 1; align-items: center; justify-content: center; gap: 6px; height: 28px; margin: 0; border: 0; border-radius: 7px; background: transparent; color: #a1a1a1; font: inherit; font-size: 11.5px; font-weight: 500; cursor: pointer; transition: background-color .15s ease, color .15s ease; }
.hb-xk8-act svg { width: 13px; height: 13px; }
.hb-xk8-act:hover { background: rgba(255, 255, 255, .05); color: #fff; }
.hb-xk8-act[data-danger="true"]:hover { background: rgba(229, 72, 77, .12); color: #ff8589; }
.hb-xk8-btn { display: flex; flex: none; align-items: center; gap: 10px; width: 100%; height: 52px; margin: 0; padding: 0 10px 0 8px; border: 0; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; transition: background-color .15s ease; }
.hb-xk8-btn:hover { background: rgba(255, 255, 255, .025); }
.hb-xk8-av { position: relative; display: grid; flex: none; place-items: center; width: 34px; height: 34px; border-radius: 99px; background: var(--hb-xk8-uc); box-shadow: 0 0 0 2px #121212, 0 0 0 3.5px var(--hb-xk8-st); color: #fff; font-size: 12px; font-weight: 700; transition: box-shadow .4s ease; }
.hb-xk8-av::after { content: ""; position: absolute; right: -1px; bottom: -1px; width: 10px; height: 10px; border: 2px solid #131313; border-radius: 99px; background: var(--hb-xk8-st); transition: background-color .4s ease; }
.hb-xk8-who { display: flex; flex: 1; flex-direction: column; min-width: 0; }
.hb-xk8-who b { overflow: hidden; font-size: 12.5px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk8-who span { overflow: hidden; color: #77777f; font-size: 11px; line-height: 15px; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk8-note { animation: hb-xk8-note .3s cubic-bezier(.22, 1, .36, 1); }
.hb-xk8-chev { flex: none; width: 16px; height: 16px; color: #6f6f76; transition: transform .45s cubic-bezier(.22, 1, .36, 1); }
.hb-xk8[data-open="true"] .hb-xk8-chev { transform: rotate(180deg); }
@keyframes hb-xk8-pop { from { opacity: 0; transform: scale(.3); } }
@keyframes hb-xk8-note { from { opacity: 0; transform: translateY(4px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xk8 *, .hb-xk8 *::before, .hb-xk8 *::after { transition: none !important; animation: none !important; }
}
`;

function Glyph({ icon }: { icon?: SidebarAccountCardIconName | React.ReactNode }) {
  if (typeof icon === "string" || icon === undefined) {
    const d = PATHS[(icon as SidebarAccountCardIconName | undefined) ?? "home"] ?? PATHS.home;
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    );
  }
  return <>{icon}</>;
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const order: SidebarAccountCardStatus[] = ["online", "away", "busy"];

export function SidebarAccountCard({
  items = defaultItems,
  active,
  defaultActive,
  onChange,
  user = { name: "Maya Chen", email: "maya@acme.dev", color: "#8b5cf6" },
  status,
  defaultStatus = "online",
  onStatusChange,
  accounts = defaultAccounts,
  account,
  defaultAccount,
  onAccountChange,
  seats = { used: 8, total: 10 },
  open,
  defaultOpen = false,
  onOpenChange,
  onSettings,
  onSignOut,
  brand = "Acme",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: SidebarAccountCardProps) {
  const [inner, setInner] = React.useState(defaultActive ?? items[0]?.id ?? "");
  const [innerStatus, setInnerStatus] = React.useState<SidebarAccountCardStatus>(defaultStatus);
  const [innerAccount, setInnerAccount] = React.useState(defaultAccount ?? accounts[0]?.id ?? "");
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const current = active ?? inner;
  const st = status ?? innerStatus;
  const acc = account ?? innerAccount;
  const isOpen = open ?? innerOpen;
  const cardRef = React.useRef<HTMLDivElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const panelId = React.useId();
  const touched = React.useRef(false);

  const setOpen = React.useCallback(
    (v: boolean) => {
      touched.current = true;
      if (open === undefined) setInnerOpen(v);
      onOpenChange?.(v);
    },
    [open, onOpenChange],
  );

  React.useEffect(() => {
    if (!isOpen || !touched.current) return;
    const first = cardRef.current?.querySelector<HTMLElement>('[role="radio"][aria-checked="true"]');
    first?.focus({ preventScroll: true });
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: PointerEvent) => {
      const nav = cardRef.current?.parentElement;
      if (nav && !nav.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [isOpen, setOpen]);

  function close() {
    setOpen(false);
    btnRef.current?.focus({ preventScroll: true });
  }

  function setStatus(s: SidebarAccountCardStatus) {
    if (status === undefined) setInnerStatus(s);
    onStatusChange?.(s);
  }

  function onSegKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = order.indexOf(st);
    const n = order[(i + (e.key === "ArrowRight" ? 1 : order.length - 1)) % order.length];
    setStatus(n);
    cardRef.current?.querySelector<HTMLElement>(`[data-xk8-st="${n}"]`)?.focus();
  }

  function pickAccount(id: string) {
    if (account === undefined) setInnerAccount(id);
    onAccountChange?.(id);
  }

  function onItemsKey(e: React.KeyboardEvent<HTMLUListElement>) {
    const btns = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
    const at = btns.indexOf(document.activeElement as HTMLButtonElement);
    if (at < 0) return;
    let n = -1;
    if (e.key === "ArrowDown") n = Math.min(btns.length - 1, at + 1);
    else if (e.key === "ArrowUp") n = Math.max(0, at - 1);
    if (n >= 0) {
      e.preventDefault();
      btns[n]?.focus();
    }
  }

  const info = STATUS[st];
  const ci = items.findIndex((i) => i.id === current);
  const vars = {
    "--hb-xk8-a": accent,
    "--hb-xk8-st": info.color,
    "--hb-xk8-uc": user.color ?? accent,
    ...style,
  } as React.CSSProperties;

  return (
    <nav aria-label="Main" className={`hb-xk8 ${className}`} data-open={isOpen} style={vars} {...rest}>
      <style href="hb-sidebar-account-card" precedence="default">{css}</style>
      <div className="hb-xk8-brand">
        <i aria-hidden="true">{brand.slice(0, 1)}</i>
        {brand}
      </div>
      <ul className="hb-xk8-list" role="list" onKeyDown={onItemsKey} inert={isOpen}>
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              className="hb-xk8-item"
              aria-current={item.id === current ? "page" : undefined}
              tabIndex={i === (ci >= 0 ? ci : 0) ? 0 : -1}
              onClick={() => {
                if (active === undefined) setInner(item.id);
                onChange?.(item.id);
              }}
            >
              <Glyph icon={item.icon} />
              <span className="hb-xk8-il">{item.label}</span>
              {item.badge ? <span className="hb-xk8-n">{item.badge}</span> : null}
            </button>
          </li>
        ))}
      </ul>
      {isOpen ? <button type="button" className="hb-xk8-scrim" tabIndex={-1} aria-hidden="true" onClick={close} /> : null}
      <div
        ref={cardRef}
        className="hb-xk8-card"
        onKeyDown={(e) => {
          if (e.key === "Escape" && isOpen) {
            e.stopPropagation();
            close();
          }
        }}
      >
        <div id={panelId} className="hb-xk8-panel" inert={!isOpen}>
          <div className="hb-xk8-pin">
            <div className="hb-xk8-pc">
              <div
                className="hb-xk8-seg"
                role="radiogroup"
                aria-label="Status"
                onKeyDown={onSegKey}
                style={{ "--hb-xk8-si": order.indexOf(st) } as React.CSSProperties}
              >
                <span className="hb-xk8-thumb" aria-hidden="true" />
                {order.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    className="hb-xk8-opt"
                    data-xk8-st={s}
                    aria-checked={s === st}
                    tabIndex={s === st ? 0 : -1}
                    onClick={() => setStatus(s)}
                  >
                    <i style={{ background: STATUS[s].color }} aria-hidden="true" />
                    {STATUS[s].label}
                  </button>
                ))}
              </div>
              {accounts.length ? (
                <>
                  <div className="hb-xk8-cap">Workspaces</div>
                  {accounts.map((a) => (
                    <button key={a.id} type="button" className="hb-xk8-acct" aria-pressed={a.id === acc} onClick={() => pickAccount(a.id)}>
                      <span className="hb-xk8-sq" style={{ background: a.color ?? accent }} aria-hidden="true">
                        {a.name.slice(0, 1)}
                      </span>
                      <span className="hb-xk8-an">{a.name}</span>
                      {a.id === acc ? (
                        <svg className="hb-xk8-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3.5 8.5l3 3 6-7" />
                        </svg>
                      ) : a.role ? (
                        <span className="hb-xk8-role">{a.role}</span>
                      ) : null}
                    </button>
                  ))}
                </>
              ) : null}
              {seats ? (
                <div className="hb-xk8-seats">
                  <div className="hb-xk8-sr">
                    <span>Seats</span>
                    <b>
                      {seats.used} of {seats.total}
                    </b>
                  </div>
                  <div
                    className="hb-xk8-meter"
                    role="meter"
                    aria-label="Seats used"
                    aria-valuemin={0}
                    aria-valuemax={seats.total}
                    aria-valuenow={seats.used}
                    style={{ "--hb-xk8-t": Math.max(1, Math.min(24, seats.total)) } as React.CSSProperties}
                  >
                    {Array.from({ length: Math.max(1, Math.min(24, seats.total)) }, (_, i) => (
                      <span key={i} data-on={i < seats.used} />
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="hb-xk8-acts">
                <button type="button" className="hb-xk8-act" onClick={onSettings}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2.8v2M10 15.2v2M17.2 10h-2M4.8 10h-2M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4M15.1 15.1l-1.4-1.4M6.3 6.3L4.9 4.9" />
                  </svg>
                  Settings
                </button>
                <button type="button" className="hb-xk8-act" data-danger="true" onClick={onSignOut}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M12.5 13.5L16 10l-3.5-3.5M16 10H8" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          ref={btnRef}
          type="button"
          className="hb-xk8-btn"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={`${user.name}, ${info.label}. Account menu`}
          onClick={() => setOpen(!isOpen)}
        >
          <span className="hb-xk8-av" aria-hidden="true">{user.initials ?? initialsOf(user.name)}</span>
          <span className="hb-xk8-who">
            <b>{user.name}</b>
            <span key={st} className="hb-xk8-note">{isOpen ? info.note : user.email}</span>
          </span>
          <svg className="hb-xk8-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10l4-4 4 4" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
