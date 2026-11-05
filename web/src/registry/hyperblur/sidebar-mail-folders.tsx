"use client";

import * as React from "react";

const ICONS = {
  inbox:
    "M3.5 11l1.7-5.6A1.2 1.2 0 0 1 6.3 4.5h7.4a1.2 1.2 0 0 1 1.1.9L16.5 11M3.5 11v3.6a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V11M3.5 11h4l.8 1.8h3.4l.8-1.8h4",
  star: "M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 13.9l-4.2 2.3.8-4.7L3.2 8.2l4.7-.7z",
  send: "M17 3L8.5 11.5M17 3l-5.5 14-3-5.5L3 8.5z",
  drafts: "M5 2.8h6.5L15 6.3v10.9H5zM11.5 2.8v3.5H15M7.5 10h5M7.5 13h5",
  trash: "M4 6h12M8 6V4.2h4V6M5.5 6l.7 10h7.6l.7-10M8.5 9v4.5M11.5 9v4.5",
  archive: "M3.5 5h13v3h-13zM4.5 8v8h11V8M8 11.5h4",
  pencil: "M12.8 4.2l3 3L7.5 15.5l-3.7.7.7-3.7zM11.3 5.7l3 3",
} as const;

export type SidebarMailIconName = keyof typeof ICONS;

export function SidebarMailIcon({ name }: { name: SidebarMailIconName }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export interface MailFolder {
  id: string;
  label: string;
  icon?: SidebarMailIconName;
  count?: number;
}

export interface MailLabel {
  id: string;
  label: string;
  color: string;
}

export interface MailStorage {
  used: number;
  total: number;
  unit?: string;
}

export interface SidebarMailFoldersProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  folders?: MailFolder[];
  labels?: MailLabel[];
  storage?: MailStorage | null;
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  onCompose?: () => void;
  composeLabel?: string;
  labelsTitle?: string;
  rowHeight?: number;
  accent?: string;
}

const defaultFolders: MailFolder[] = [
  { id: "inbox", label: "Inbox", icon: "inbox", count: 12 },
  { id: "starred", label: "Starred", icon: "star" },
  { id: "sent", label: "Sent", icon: "send" },
  { id: "drafts", label: "Drafts", icon: "drafts", count: 3 },
  { id: "archive", label: "Archive", icon: "archive" },
  { id: "trash", label: "Trash", icon: "trash" },
];

const defaultLabels: MailLabel[] = [
  { id: "work", label: "Work", color: "#2f7bff" },
  { id: "family", label: "Family", color: "#30a46c" },
  { id: "travel", label: "Travel", color: "#f5a623" },
];

const defaultStorage: MailStorage = { used: 11.4, total: 15, unit: "GB" };

const css = `
.hb-yc1 {
  --hb-yc1-a: #2f7bff;
  --hb-yc1-row: 30px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 8px;
  border-right: 1px solid #262626;
  background: #0f0f0f;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
}
.hb-yc1 *, .hb-yc1 *::before, .hb-yc1 *::after { box-sizing: border-box; }
.hb-yc1-compose {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 32px;
  margin: 0 0 8px;
  padding: 0 12px;
  border: 0;
  border-radius: 10px;
  background: var(--hb-yc1-a);
  color: #ffffff;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 18px color-mix(in srgb, var(--hb-yc1-a) 38%, transparent);
  transition: transform .18s ease, filter .18s ease, box-shadow .18s ease;
}
.hb-yc1-compose svg { width: 16px; height: 16px; flex: none; }
.hb-yc1-compose:hover { filter: brightness(1.1); }
.hb-yc1-compose:active { transform: scale(.97); }
.hb-yc1-compose:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
.hb-yc1-scroll { flex: 1; min-height: 0; margin: 0 -8px; padding: 0 8px; overflow-y: auto; scrollbar-width: none; }
.hb-yc1-scroll::-webkit-scrollbar { display: none; }
.hb-yc1-list { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-yc1-head {
  margin: 0;
  padding: 10px 8px 4px;
  color: #6f6f6f;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: .08em;
  line-height: 14px;
  text-transform: uppercase;
}
.hb-yc1-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  height: var(--hb-yc1-row);
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .16s ease, color .16s ease;
}
.hb-yc1-item:hover { background: #181818; color: #ededed; }
.hb-yc1-item:focus-visible { outline: 2px solid var(--hb-yc1-a); outline-offset: -2px; }
.hb-yc1-item[aria-current="true"] {
  background: color-mix(in srgb, var(--hb-yc1-a) 15%, transparent);
  color: #ffffff;
}
.hb-yc1-item[aria-current="true"]::before {
  content: "";
  position: absolute;
  top: 7px;
  bottom: 7px;
  left: -8px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--hb-yc1-a);
  animation: hb-yc1-bar .3s cubic-bezier(.2, .9, .2, 1) both;
}
.hb-yc1-ico { display: grid; flex: none; place-items: center; width: 16px; height: 16px; }
.hb-yc1-ico svg { width: 16px; height: 16px; }
.hb-yc1-item[aria-current="true"] .hb-yc1-ico { color: var(--hb-yc1-a); }
.hb-yc1-dot {
  flex: none;
  width: 8px;
  height: 8px;
  margin: 0 4px;
  border-radius: 999px;
  background: var(--hb-yc1-dot, #8f8f8f);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-yc1-dot, #8f8f8f) 22%, transparent);
}
.hb-yc1-txt { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc1-item[data-unread="true"] .hb-yc1-txt { color: #ededed; font-weight: 600; }
.hb-yc1-count {
  flex: none;
  min-width: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #262626;
  color: #ededed;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
}
.hb-yc1-item[aria-current="true"] .hb-yc1-count { background: var(--hb-yc1-a); color: #ffffff; }
.hb-yc1-store { flex: none; margin-top: 8px; padding: 10px 8px 2px; border-top: 1px solid #1f1f1f; }
.hb-yc1-srow { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; margin-bottom: 6px; color: #8f8f8f; font-size: 11px; line-height: 14px; }
.hb-yc1-srow b { color: #ededed; font-weight: 600; }
.hb-yc1-meter { position: relative; height: 4px; overflow: hidden; border-radius: 999px; background: #232323; }
.hb-yc1-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-yc1-m) 60%, #ffffff), var(--hb-yc1-m));
  transform: scaleX(var(--hb-yc1-p));
  transform-origin: left;
  animation: hb-yc1-fill .9s cubic-bezier(.2, .9, .2, 1) both;
}
@keyframes hb-yc1-bar {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@keyframes hb-yc1-fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(var(--hb-yc1-p)); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yc1-compose, .hb-yc1-item { transition: none; }
  .hb-yc1-item[aria-current="true"]::before, .hb-yc1-fill { animation: none; }
}
`;

function formatCount(n: number) {
  return n > 99 ? "99+" : String(n);
}

function formatAmount(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export function SidebarMailFolders({
  folders = defaultFolders,
  labels = defaultLabels,
  storage = defaultStorage,
  active,
  defaultActive,
  onChange,
  onCompose,
  composeLabel = "Compose",
  labelsTitle = "Labels",
  rowHeight = 30,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: SidebarMailFoldersProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const [inner, setInner] = React.useState(defaultActive ?? folders[0]?.id ?? "");
  const [focusId, setFocusId] = React.useState("");
  const current = active ?? inner;
  const ids = [...folders.map((f) => f.id), ...labels.map((l) => l.id)];
  const tabStop = ids.includes(focusId) ? focusId : ids.includes(current) ? current : ids[0];

  function select(id: string) {
    if (active === undefined) setInner(id);
    onChange?.(id);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Escape") {
      (document.activeElement as HTMLElement | null)?.blur();
      return;
    }
    const target = e.target as HTMLElement;
    if (!target.hasAttribute("data-yc1-item")) return;
    const items = Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-yc1-item]") ?? []);
    const at = items.indexOf(target);
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(items.length - 1, at + 1);
    else if (e.key === "ArrowUp") next = Math.max(0, at - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next >= 0) {
      e.preventDefault();
      items[next]?.focus();
    }
  }

  const pct = storage && storage.total > 0 ? Math.max(0, Math.min(1, storage.used / storage.total)) : 0;
  const meterColor = pct > 0.95 ? "#e5484d" : pct > 0.8 ? "#f5a623" : accent;
  const unit = storage?.unit ?? "GB";

  const vars = { "--hb-yc1-a": accent, "--hb-yc1-row": `${rowHeight}px`, ...style } as React.CSSProperties;

  return (
    <nav ref={rootRef} className={`hb-yc1 ${className}`} aria-label="Mailbox" style={vars} onKeyDown={handleKeyDown} {...rest}>
      <style href="hb-sidebar-mail-folders" precedence="default">{css}</style>
      <button type="button" className="hb-yc1-compose" onClick={onCompose}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={ICONS.pencil} />
        </svg>
        {composeLabel}
      </button>
      <div className="hb-yc1-scroll">
        <ul className="hb-yc1-list" role="list">
          {folders.map((f) => {
            const unread = (f.count ?? 0) > 0;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  className="hb-yc1-item"
                  data-yc1-item=""
                  data-unread={unread}
                  aria-current={f.id === current ? true : undefined}
                  tabIndex={f.id === tabStop ? 0 : -1}
                  onFocus={() => setFocusId(f.id)}
                  onClick={() => select(f.id)}
                >
                  <span className="hb-yc1-ico">
                    <SidebarMailIcon name={f.icon ?? "inbox"} />
                  </span>
                  <span className="hb-yc1-txt">{f.label}</span>
                  {unread ? (
                    <span className="hb-yc1-count" aria-label={`${f.count} unread`}>
                      {formatCount(f.count ?? 0)}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
        {labels.length > 0 ? (
          <>
            <p className="hb-yc1-head">{labelsTitle}</p>
            <ul className="hb-yc1-list" role="list">
              {labels.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    className="hb-yc1-item"
                    data-yc1-item=""
                    aria-current={l.id === current ? true : undefined}
                    tabIndex={l.id === tabStop ? 0 : -1}
                    onFocus={() => setFocusId(l.id)}
                    onClick={() => select(l.id)}
                  >
                    <span className="hb-yc1-dot" style={{ "--hb-yc1-dot": l.color } as React.CSSProperties} aria-hidden="true" />
                    <span className="hb-yc1-txt">{l.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
      {storage ? (
        <div className="hb-yc1-store">
          <div className="hb-yc1-srow">
            <span>
              <b>{formatAmount(storage.used)}</b> of {formatAmount(storage.total)} {unit}
            </span>
            <span>{Math.round(pct * 100)}%</span>
          </div>
          <div
            className="hb-yc1-meter"
            role="progressbar"
            aria-label="Storage used"
            aria-valuemin={0}
            aria-valuemax={storage.total}
            aria-valuenow={storage.used}
          >
            <span className="hb-yc1-fill" style={{ "--hb-yc1-m": meterColor, "--hb-yc1-p": pct.toFixed(3) } as React.CSSProperties} />
          </div>
        </div>
      ) : null}
    </nav>
  );
}
