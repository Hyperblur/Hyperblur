"use client";

import * as React from "react";

export type DownloadChangelogNoteType = "new" | "improved" | "fixed";

export interface DownloadChangelogRelease {
  version: string;
  date: string;
  name?: string;
  notes: { type: DownloadChangelogNoteType; text: string }[];
}

export interface DownloadChangelogDownload {
  label: string;
  detail: string;
  size: string;
  href: string;
  os: "mac" | "windows" | "linux";
}

export interface DownloadChangelogProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  summary?: string;
  highlights?: string[];
  releases?: DownloadChangelogRelease[];
  downloads?: DownloadChangelogDownload[];
  defaultExpanded?: number;
  onDownload?: (item: DownloadChangelogDownload) => void;
  allReleasesHref?: string;
  accent?: string;
}

const css = `
.hb-yha {
  --hb-yha-accent: #10b981;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  overflow: hidden;
  padding: clamp(64px, 8cqi, 104px) 20px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yha *, .hb-yha *::before, .hb-yha *::after { box-sizing: border-box; }
.hb-yha-in { position: relative; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 40px; align-items: start; max-width: 1120px; margin: 0 auto; }
.hb-yha-card {
  position: sticky;
  top: 24px;
  padding: 28px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 22px;
  background:
    radial-gradient(90% 50% at 0% 0%, color-mix(in srgb, var(--hb-yha-accent) 18%, transparent), transparent 70%),
    linear-gradient(180deg, #131313, #0d0d0d);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
}
.hb-yha-top { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.hb-yha-ver { display: inline-flex; align-items: center; height: 26px; padding: 0 10px; border: 1px solid color-mix(in srgb, var(--hb-yha-accent) 40%, transparent); border-radius: 8px; background: color-mix(in srgb, var(--hb-yha-accent) 12%, transparent); color: color-mix(in srgb, var(--hb-yha-accent) 60%, #fff); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; font-weight: 600; }
.hb-yha-latest { display: inline-flex; align-items: center; gap: 6px; color: #a1a1a1; font-size: 12.5px; font-weight: 500; }
.hb-yha-latest i { position: relative; width: 7px; height: 7px; border-radius: 50%; background: var(--hb-yha-accent); }
.hb-yha-latest i::after { content: ""; position: absolute; inset: -4px; border-radius: 50%; background: var(--hb-yha-accent); opacity: .5; animation: hb-yha-ping 1.8s ease-out infinite; }
.hb-yha-eyebrow { margin-top: 18px; color: #8f8f8f; font-size: 13px; }
.hb-yha-title { margin: 6px 0 0; font-size: clamp(26px, 3.4cqi, 36px); font-weight: 650; letter-spacing: -.035em; line-height: 1.1; }
.hb-yha-sum { margin: 12px 0 0; color: #8f8f8f; font-size: 14.5px; line-height: 1.6; }
.hb-yha-hl { display: grid; gap: 8px; margin: 18px 0 0; padding: 0; list-style: none; }
.hb-yha-hl li { display: flex; gap: 10px; color: #c9c9c9; font-size: 13.5px; line-height: 1.5; }
.hb-yha-hl svg { flex: none; width: 16px; height: 16px; margin-top: 2px; fill: none; stroke: var(--hb-yha-accent); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-yha-dls { display: grid; gap: 8px; margin-top: 24px; }
.hb-yha-dl {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 10px 14px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 14px;
  background: rgba(255,255,255,.025);
  color: #ededed;
  text-decoration: none;
  transition: background-color .2s ease, border-color .2s ease, transform .15s ease;
}
.hb-yha-dl:hover { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.14); }
.hb-yha-dl:active { transform: scale(.99); }
.hb-yha-dl:first-child { border-color: transparent; background: #ededed; color: #0a0a0a; }
.hb-yha-dl:first-child:hover { background: #fff; }
.hb-yha-dl:focus-visible { outline: 2px solid var(--hb-yha-accent); outline-offset: 2px; }
.hb-yha-os { display: grid; place-items: center; flex: none; width: 34px; height: 34px; border-radius: 10px; background: rgba(255,255,255,.06); }
.hb-yha-dl:first-child .hb-yha-os { background: rgba(0,0,0,.07); }
.hb-yha-os svg { width: 17px; height: 17px; fill: currentColor; }
.hb-yha-dt { flex: 1; min-width: 0; }
.hb-yha-dn { display: block; font-size: 14px; font-weight: 600; }
.hb-yha-dd { display: block; margin-top: 1px; color: #8f8f8f; font-size: 12px; }
.hb-yha-dl:first-child .hb-yha-dd { color: #525252; }
.hb-yha-sz { color: #8f8f8f; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-yha-dl:first-child .hb-yha-sz { color: #525252; }
.hb-yha-arrow { width: 16px; height: 16px; flex: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .25s cubic-bezier(.3,1.4,.5,1); }
.hb-yha-dl:hover .hb-yha-arrow { transform: translateY(2px); }
.hb-yha-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
.hb-yha-h { margin: 0; font-size: 18px; font-weight: 650; letter-spacing: -.01em; }
.hb-yha-filters { display: flex; gap: 4px; padding: 3px; border: 1px solid rgba(255,255,255,.08); border-radius: 999px; background: #101010; }
.hb-yha-f { height: 28px; padding: 0 12px; border: 0; border-radius: 999px; background: transparent; color: #8f8f8f; font: inherit; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: background-color .2s ease, color .2s ease; }
.hb-yha-f:hover { color: #ededed; }
.hb-yha-f[aria-pressed="true"] { background: rgba(255,255,255,.09); color: #fff; }
.hb-yha-f:focus-visible, .hb-yha-sum2:focus-visible, .hb-yha-all:focus-visible { outline: 2px solid var(--hb-yha-accent); outline-offset: 2px; }
.hb-yha-tl { position: relative; margin: 0; padding: 0 0 0 28px; list-style: none; }
.hb-yha-tl::before { content: ""; position: absolute; left: 6px; top: 8px; bottom: 8px; width: 1px; background: linear-gradient(180deg, var(--hb-yha-accent), rgba(255,255,255,.1) 30%, rgba(255,255,255,.04)); transform-origin: top; transform: scaleY(0); animation: hb-yha-line 1.2s cubic-bezier(.6,0,.2,1) .2s forwards; }
.hb-yha-rel { position: relative; padding-bottom: 14px; opacity: 0; transform: translateY(10px); animation: hb-yha-in .6s cubic-bezier(.2,.8,.2,1) forwards; animation-delay: calc(300ms + var(--hb-yha-i) * 110ms); }
.hb-yha-dot { position: absolute; left: -27px; top: 14px; width: 11px; height: 11px; border: 2px solid #0a0a0a; border-radius: 50%; background: #3a3a3a; box-shadow: 0 0 0 1px rgba(255,255,255,.12); }
.hb-yha-rel:first-child .hb-yha-dot { background: var(--hb-yha-accent); box-shadow: 0 0 0 1px var(--hb-yha-accent), 0 0 12px var(--hb-yha-accent); }
.hb-yha-box { border: 1px solid rgba(255,255,255,.07); border-radius: 16px; background: #0f0f0f; transition: border-color .2s ease; }
.hb-yha-box[data-open="true"] { border-color: rgba(255,255,255,.11); background: #111; }
.hb-yha-sum2 { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 50px; margin: 0; padding: 10px 16px; border: 0; border-radius: 16px; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.hb-yha-v2 { flex: none; height: 22px; padding: 0 8px; border-radius: 6px; background: rgba(255,255,255,.06); color: #d4d4d4; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; font-weight: 600; line-height: 22px; }
.hb-yha-rel:first-child .hb-yha-v2 { background: color-mix(in srgb, var(--hb-yha-accent) 16%, transparent); color: color-mix(in srgb, var(--hb-yha-accent) 60%, #fff); }
.hb-yha-rn { flex: 1; min-width: 0; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yha-date { flex: none; color: #6f6f6f; font-size: 12.5px; }
.hb-yha-chev { width: 14px; height: 14px; flex: none; fill: none; stroke: #8f8f8f; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .3s ease; }
.hb-yha-box[data-open="true"] .hb-yha-chev { transform: rotate(180deg); }
.hb-yha-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .4s cubic-bezier(.2,.8,.2,1); }
.hb-yha-box[data-open="true"] .hb-yha-body { grid-template-rows: 1fr; }
.hb-yha-body > div { min-height: 0; overflow: hidden; }
.hb-yha-notes { display: grid; gap: 9px; margin: 0; padding: 2px 16px 16px; list-style: none; }
.hb-yha-note { display: flex; align-items: flex-start; gap: 10px; color: #c4c4c4; font-size: 13.5px; line-height: 1.5; }
.hb-yha-type { flex: none; width: 70px; height: 20px; margin-top: 1px; border-radius: 6px; font-size: 10.5px; font-weight: 700; letter-spacing: .04em; line-height: 20px; text-align: center; text-transform: uppercase; }
.hb-yha-type[data-t="new"] { background: color-mix(in srgb, var(--hb-yha-accent) 15%, transparent); color: color-mix(in srgb, var(--hb-yha-accent) 70%, #fff); }
.hb-yha-type[data-t="improved"] { background: rgba(56,189,248,.13); color: #7dd3fc; }
.hb-yha-type[data-t="fixed"] { background: rgba(251,191,36,.12); color: #fcd34d; }
.hb-yha-empty { padding: 2px 16px 16px; color: #6f6f6f; font-size: 13px; }
.hb-yha-all { display: inline-flex; align-items: center; gap: 6px; margin: 6px 0 0 28px; color: #a1a1a1; font-size: 13.5px; font-weight: 600; text-decoration: none; }
.hb-yha-all:hover { color: #ededed; }
@keyframes hb-yha-ping { from { transform: scale(.5); opacity: .6; } to { transform: scale(1.6); opacity: 0; } }
@keyframes hb-yha-line { to { transform: scaleY(1); } }
@keyframes hb-yha-in { to { opacity: 1; transform: none; } }
@container (max-width: 860px) {
  .hb-yha-in { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .hb-yha-card { position: relative; top: 0; }
}
@container (max-width: 480px) {
  .hb-yha-card { padding: 22px; }
  .hb-yha-head { flex-direction: column; align-items: flex-start; }
  .hb-yha-date { display: none; }
  .hb-yha-note { flex-direction: column; gap: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yha *, .hb-yha *::before, .hb-yha *::after { animation: none !important; transition: none !important; }
  .hb-yha-tl::before { transform: none; }
  .hb-yha-rel { opacity: 1; transform: none; }
}
`;

const defaultReleases: DownloadChangelogRelease[] = [
  {
    version: "4.2.0",
    date: "Nov 3, 2026",
    name: "Offline mode and faster sync",
    notes: [
      { type: "new", text: "Work fully offline. Changes queue locally and merge when you reconnect." },
      { type: "improved", text: "Initial sync of large workspaces is up to 3x faster." },
      { type: "fixed", text: "Pasting tables from Excel no longer drops merged cells." },
    ],
  },
  {
    version: "4.1.2",
    date: "Oct 21, 2026",
    name: "Stability fixes",
    notes: [
      { type: "fixed", text: "App could freeze when closing a window during export on Windows 11." },
      { type: "fixed", text: "Linux tray icon now respects dark themes." },
    ],
  },
  {
    version: "4.1.0",
    date: "Oct 8, 2026",
    name: "Command menu everywhere",
    notes: [
      { type: "new", text: "Press Cmd K in any view to jump, create or run actions." },
      { type: "improved", text: "Search results rank recent documents first." },
    ],
  },
  {
    version: "4.0.0",
    date: "Sep 16, 2026",
    name: "The 4.0 redesign",
    notes: [
      { type: "new", text: "A new sidebar, tabs and split view across macOS, Windows and Linux." },
      { type: "improved", text: "Memory use cut by 40 percent on long sessions." },
    ],
  },
];

const defaultDownloads: DownloadChangelogDownload[] = [
  { label: "macOS", detail: "Apple Silicon, macOS 13 or later", size: "112 MB", href: "#", os: "mac" },
  { label: "macOS", detail: "Intel, macOS 12 or later", size: "118 MB", href: "#", os: "mac" },
  { label: "Windows", detail: "64-bit installer, Windows 10 or 11", size: "98 MB", href: "#", os: "windows" },
  { label: "Linux", detail: "AppImage, deb and rpm", size: "104 MB", href: "#", os: "linux" },
];

const defaultHighlights = ["Offline mode with automatic merge", "Sync up to 3x faster on big workspaces", "Signed and notarized builds for every platform"];

const osIcon: Record<DownloadChangelogDownload["os"], React.ReactNode> = {
  mac: <path d="M13.2 10.4c0-1.8 1.5-2.7 1.6-2.8-.9-1.3-2.2-1.5-2.7-1.5-1.1-.1-2.2.7-2.8.7-.6 0-1.5-.7-2.4-.6-1.3 0-2.4.7-3.1 1.9-1.3 2.3-.3 5.6.9 7.4.6.9 1.3 1.9 2.3 1.8.9 0 1.3-.6 2.4-.6s1.4.6 2.4.6 1.6-.9 2.2-1.8c.7-1 1-2 1-2.1-.1 0-1.8-.7-1.8-3zM11.4 4.9c.5-.6.8-1.4.7-2.3-.7 0-1.6.5-2.1 1.1-.5.5-.9 1.4-.8 2.2.8.1 1.6-.4 2.2-1z" />,
  windows: <path d="M3 4.6 8.7 3.8v5.5H3zM9.5 3.7 17 2.6v6.7H9.5zM3 10.1h5.7v5.5L3 14.8zM9.5 10.1H17v6.7l-7.5-1.1z" />,
  linux: <path d="M10 2.5c-1.9 0-2.8 1.6-2.8 3.4 0 1.1.2 1.6-.6 2.9-.9 1.3-2.1 3-2.1 5 0 .7.3 1.3.8 1.6-.4.4-.5 1-.1 1.4.6.6 2 .4 3 .9.8.3 1.3.3 1.8.3s1 0 1.8-.3c1-.5 2.4-.3 3-.9.4-.4.3-1-.1-1.4.5-.3.8-.9.8-1.6 0-2-1.2-3.7-2.1-5-.8-1.3-.6-1.8-.6-2.9 0-1.8-.9-3.4-2.8-3.4z" />,
};

const filterLabels: { id: "all" | DownloadChangelogNoteType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "improved", label: "Improved" },
  { id: "fixed", label: "Fixed" },
];

export function DownloadChangelog({
  eyebrow = "Released November 3, 2026",
  title = "Download Quill 4.2",
  summary = "Free for personal use. Updates install in the background and never touch your files.",
  highlights = defaultHighlights,
  releases = defaultReleases,
  downloads = defaultDownloads,
  defaultExpanded = 2,
  onDownload,
  allReleasesHref = "#",
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: DownloadChangelogProps) {
  const uid = React.useId();
  const [open, setOpen] = React.useState<Set<string>>(() => new Set(releases.slice(0, defaultExpanded).map((r) => r.version)));
  const [filter, setFilter] = React.useState<"all" | DownloadChangelogNoteType>("all");
  const latest = releases[0];

  function toggle(v: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  }

  return (
    <section className={`hb-yha ${className}`} style={{ "--hb-yha-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-download-changelog" precedence="default">
        {css}
      </style>
      <div className="hb-yha-in">
        <div className="hb-yha-card">
          {latest && (
            <div className="hb-yha-top">
              <span className="hb-yha-ver">v{latest.version}</span>
              <span className="hb-yha-latest">
                <i aria-hidden="true" />
                Latest release
              </span>
            </div>
          )}
          <div className="hb-yha-eyebrow">{eyebrow}</div>
          <h2 className="hb-yha-title">{title}</h2>
          {summary && <p className="hb-yha-sum">{summary}</p>}
          {highlights.length > 0 && (
            <ul className="hb-yha-hl">
              {highlights.map((h) => (
                <li key={h}>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          )}
          <div className="hb-yha-dls">
            {downloads.map((d) => (
              <a key={`${d.label}-${d.detail}`} href={d.href} className="hb-yha-dl" onClick={() => onDownload?.(d)} download>
                <span className="hb-yha-os">
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    {osIcon[d.os]}
                  </svg>
                </span>
                <span className="hb-yha-dt">
                  <span className="hb-yha-dn">Download for {d.label}</span>
                  <span className="hb-yha-dd">{d.detail}</span>
                </span>
                <span className="hb-yha-sz">{d.size}</span>
                <svg className="hb-yha-arrow" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 2.5v9M4 8l4 4 4-4M3 14h10" />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="hb-yha-head">
            <h3 className="hb-yha-h">Changelog</h3>
            <div className="hb-yha-filters" role="group" aria-label="Filter changes">
              {filterLabels.map((f) => (
                <button key={f.id} type="button" className="hb-yha-f" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <ol className="hb-yha-tl">
            {releases.map((r, i) => {
              const isOpen = open.has(r.version);
              const notes = filter === "all" ? r.notes : r.notes.filter((n) => n.type === filter);
              const bodyId = `${uid}-r${i}`;
              return (
                <li key={r.version} className="hb-yha-rel" style={{ "--hb-yha-i": i } as React.CSSProperties}>
                  <span className="hb-yha-dot" aria-hidden="true" />
                  <div className="hb-yha-box" data-open={isOpen ? "true" : "false"}>
                    <button type="button" className="hb-yha-sum2" aria-expanded={isOpen} aria-controls={bodyId} onClick={() => toggle(r.version)}>
                      <span className="hb-yha-v2">v{r.version}</span>
                      <span className="hb-yha-rn">{r.name ?? `Version ${r.version}`}</span>
                      <span className="hb-yha-date">{r.date}</span>
                      <svg className="hb-yha-chev" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="m4 6 4 4 4-4" />
                      </svg>
                    </button>
                    <div className="hb-yha-body" id={bodyId}>
                      <div>
                        {notes.length ? (
                          <ul className="hb-yha-notes">
                            {notes.map((n) => (
                              <li key={n.text} className="hb-yha-note">
                                <span className="hb-yha-type" data-t={n.type}>
                                  {n.type}
                                </span>
                                <span>{n.text}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="hb-yha-empty">No {filter} changes in this release.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          {allReleasesHref && (
            <a href={allReleasesHref} className="hb-yha-all">
              See all releases
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
