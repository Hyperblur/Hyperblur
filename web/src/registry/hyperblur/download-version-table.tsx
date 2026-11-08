"use client";

import * as React from "react";

export type VersionChannel = "stable" | "beta" | "lts";

export interface VersionChange {
  kind: "added" | "improved" | "fixed";
  text: string;
}

export interface VersionRelease {
  version: string;
  date: string;
  channel: VersionChannel;
  size: string;
  summary: string;
  href: string;
  changes: VersionChange[];
}

export interface DownloadVersionTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  releases?: VersionRelease[];
  defaultOpenVersion?: string | null;
  accent?: string;
  onDownload?: (release: VersionRelease) => void;
  onOpenChange?: (version: string | null) => void;
}

const defaultReleases: VersionRelease[] = [
  {
    version: "6.3.0", date: "Nov 4, 2026", channel: "stable", size: "88 MB", summary: "Query plans you can read, and saved filters per table.", href: "#",
    changes: [
      { kind: "added", text: "Visual query plan with the slowest node highlighted" },
      { kind: "added", text: "Saved filters per table, synced across devices" },
      { kind: "improved", text: "Result grid renders 1M rows without stutter" },
      { kind: "fixed", text: "SSH tunnels reconnect after the laptop wakes from sleep" },
      { kind: "fixed", text: "JSON cells no longer lose trailing zeros" },
    ],
  },
  {
    version: "6.4.0-beta.2", date: "Nov 6, 2026", channel: "beta", size: "90 MB", summary: "Early access to schema diff between two databases.", href: "#",
    changes: [
      { kind: "added", text: "Schema diff between any two connections" },
      { kind: "improved", text: "Autocomplete ranks columns you use most" },
      { kind: "fixed", text: "Crash when renaming a view with dependents" },
    ],
  },
  {
    version: "6.2.4", date: "Oct 12, 2026", channel: "stable", size: "87 MB", summary: "Security patch for stored connection secrets.", href: "#",
    changes: [
      { kind: "fixed", text: "Connection secrets are re-encrypted with a per-device key" },
      { kind: "fixed", text: "Export to CSV respects the chosen delimiter" },
    ],
  },
  {
    version: "6.2.0", date: "Sep 18, 2026", channel: "stable", size: "86 MB", summary: "Split panes and a redesigned connection sidebar.", href: "#",
    changes: [
      { kind: "added", text: "Split the editor into up to four panes" },
      { kind: "improved", text: "Connection sidebar groups by environment" },
      { kind: "improved", text: "Dark theme contrast meets WCAG AA" },
      { kind: "fixed", text: "Time zones shown correctly for timestamptz" },
    ],
  },
  {
    version: "5.8.12", date: "Aug 30, 2026", channel: "lts", size: "79 MB", summary: "Long-term support build, patched until August 2027.", href: "#",
    changes: [
      { kind: "fixed", text: "Backported the secrets encryption fix from 6.2.4" },
      { kind: "fixed", text: "Driver update for Postgres 17 authentication" },
    ],
  },
  {
    version: "6.1.2", date: "Jul 22, 2026", channel: "stable", size: "85 MB", summary: "Faster startup on large workspaces.", href: "#",
    changes: [
      { kind: "improved", text: "Cold start is 40% faster with 200+ saved queries" },
      { kind: "fixed", text: "Keyboard shortcut conflicts on non-US layouts" },
    ],
  },
];

const channelLabel: Record<VersionChannel, string> = { stable: "Stable", beta: "Beta", lts: "LTS" };
const kindLabel: Record<VersionChange["kind"], string> = { added: "Added", improved: "Improved", fixed: "Fixed" };

const css = `
.hb-we8 {
  --hb-we8-accent: #4f46e5;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: #17171a;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-we8 *, .hb-we8 *::before, .hb-we8 *::after { box-sizing: border-box; }
.hb-we8-inner { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(18px, 4cqi, 40px); }
.hb-we8-head { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 24px; }
.hb-we8-eyebrow { margin: 0 0 10px; color: var(--hb-we8-accent); font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
.hb-we8-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4.2cqi, 46px); font-weight: 600; line-height: 1.05; letter-spacing: -.035em; }
.hb-we8-sub { margin: 10px 0 0; color: #66635b; font-size: 15px; line-height: 1.6; max-width: 48ch; }
.hb-we8-seg { position: relative; display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1fr; padding: 4px; border-radius: 12px; background: #ebe7dd; box-shadow: inset 0 1px 2px rgba(0,0,0,.06); }
.hb-we8-seg-pill { position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc((100% - 8px) / var(--hb-we8-n)); border-radius: 9px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 4px 10px -4px rgba(0,0,0,.12); transform: translateX(calc(var(--hb-we8-i) * 100%)); transition: transform .45s cubic-bezier(.3,1.2,.5,1); }
.hb-we8-seg button { position: relative; z-index: 1; height: 34px; padding: 0 14px; border: 0; background: none; cursor: pointer; color: #66635b; font: inherit; font-size: 13px; font-weight: 500; border-radius: 9px; white-space: nowrap; }
.hb-we8-seg button[aria-pressed="true"] { color: #17171a; }
.hb-we8-seg button:focus-visible { outline: 2px solid var(--hb-we8-accent); outline-offset: 1px; }
.hb-we8-box { position: relative; border-radius: 20px; background: #fff; box-shadow: 0 0 0 1px rgba(23,23,26,.08), 0 30px 60px -40px rgba(23,23,26,.4); overflow: hidden; min-height: 460px; }
.hb-we8-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.hb-we8-table th { padding: 14px 18px; text-align: left; font-size: 12px; font-weight: 500; color: #8a867c; background: #fbfaf6; border-bottom: 1px solid rgba(23,23,26,.07); white-space: nowrap; }
.hb-we8-table td { padding: 0; border-bottom: 1px solid rgba(23,23,26,.06); }
.hb-we8-table tr:last-child td { border-bottom: 0; }
.hb-we8-tr { animation: hb-we8-row .45s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-we8-k) * 40ms); }
.hb-we8-cell { display: block; padding: 16px 18px; }
.hb-we8-ver { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 13.5px; font-weight: 600; white-space: nowrap; }
.hb-we8-latest { height: 20px; padding: 0 7px; border-radius: 6px; font-family: inherit; font-size: 10.5px; font-weight: 600; line-height: 20px; color: #fff; background: var(--hb-we8-accent); }
.hb-we8-sum { display: block; margin-top: 4px; color: #66635b; font-size: 13px; font-family: inherit; font-weight: 400; white-space: normal; }
.hb-we8-ch { display: inline-flex; align-items: center; gap: 6px; height: 24px; padding: 0 9px; border-radius: 999px; font-size: 12px; font-weight: 500; white-space: nowrap; }
.hb-we8-ch::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.hb-we8-ch[data-c="stable"] { color: #15803d; background: #e8f6ec; }
.hb-we8-ch[data-c="beta"] { color: #b45309; background: #fdf1e1; }
.hb-we8-ch[data-c="lts"] { color: #4338ca; background: #eceafd; }
.hb-we8-muted { color: #66635b; white-space: nowrap; }
.hb-we8-open { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border: 0; border-radius: 9px; cursor: pointer; font: inherit; font-size: 13px; font-weight: 500; color: #17171a; background: #f2efe7; transition: background .2s ease, color .2s ease; white-space: nowrap; }
.hb-we8-open svg { width: 14px; height: 14px; transition: transform .3s cubic-bezier(.2,.8,.2,1); }
.hb-we8-open:hover { background: #17171a; color: #fff; }
.hb-we8-open:hover svg { transform: translateX(2px); }
.hb-we8-open[aria-expanded="true"] { background: var(--hb-we8-accent); color: #fff; }
.hb-we8-open:focus-visible { outline: 2px solid var(--hb-we8-accent); outline-offset: 2px; }
.hb-we8-scrim { position: absolute; inset: 0; z-index: 2; border: 0; padding: 0; background: rgba(247,245,239,.6); backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px); opacity: 0; pointer-events: none; transition: opacity .35s ease; cursor: default; }
.hb-we8-box[data-open="true"] .hb-we8-scrim { opacity: 1; pointer-events: auto; }
.hb-we8-drawer {
  position: absolute; top: 0; right: 0; bottom: 0; z-index: 3; width: min(440px, 100%); display: flex; flex-direction: column;
  background: #fff; box-shadow: -1px 0 0 rgba(23,23,26,.08), -30px 0 60px -30px rgba(23,23,26,.35);
  transform: translateX(104%); visibility: hidden; transition: transform .5s cubic-bezier(.2,.8,.2,1), visibility 0s linear .5s;
}
.hb-we8-box[data-open="true"] .hb-we8-drawer { transform: none; visibility: visible; transition: transform .5s cubic-bezier(.2,.8,.2,1), visibility 0s; }
.hb-we8-dh { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 20px 20px 16px; border-bottom: 1px solid rgba(23,23,26,.07); }
.hb-we8-dt { margin: 0; font-family: var(--font-mono, ui-monospace, monospace); font-size: 18px; font-weight: 600; }
.hb-we8-dd { margin: 6px 0 0; display: flex; align-items: center; gap: 8px; color: #8a867c; font-size: 12.5px; }
.hb-we8-icon { width: 34px; height: 34px; flex: none; display: grid; place-items: center; border: 0; border-radius: 10px; cursor: pointer; color: #17171a; background: #f2efe7; transition: background .2s ease; }
.hb-we8-icon:hover:not(:disabled) { background: #e6e2d8; }
.hb-we8-icon:disabled { opacity: .35; cursor: default; }
.hb-we8-icon:focus-visible { outline: 2px solid var(--hb-we8-accent); outline-offset: 2px; }
.hb-we8-icon svg { width: 14px; height: 14px; }
.hb-we8-icons { display: flex; gap: 6px; }
.hb-we8-db { flex: 1; overflow: auto; padding: 18px 20px; display: grid; align-content: start; gap: 18px; overscroll-behavior: contain; }
.hb-we8-db > * { animation: hb-we8-in .45s cubic-bezier(.2,.8,.2,1) both; }
.hb-we8-group h4 { display: flex; align-items: center; gap: 8px; margin: 0 0 10px; font-size: 12px; font-weight: 600; color: #8a867c; text-transform: uppercase; letter-spacing: .06em; }
.hb-we8-group h4 span { min-width: 20px; height: 18px; padding: 0 6px; border-radius: 6px; background: #f2efe7; color: #66635b; font-size: 11px; line-height: 18px; text-align: center; letter-spacing: 0; }
.hb-we8-group ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-we8-group li { position: relative; padding-left: 18px; font-size: 14px; line-height: 1.5; color: #2b2a27; }
.hb-we8-group li::before { content: ""; position: absolute; left: 2px; top: .55em; width: 7px; height: 7px; border-radius: 2px; background: var(--hb-we8-k); }
.hb-we8-df { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 20px; border-top: 1px solid rgba(23,23,26,.07); background: #fbfaf6; }
.hb-we8-df span { color: #8a867c; font-size: 12.5px; font-family: var(--font-mono, ui-monospace, monospace); }
.hb-we8-dl { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 16px; border-radius: 11px; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; background: var(--hb-we8-accent); box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 8px 18px -8px var(--hb-we8-accent); transition: transform .2s cubic-bezier(.2,.8,.2,1), filter .2s ease; }
.hb-we8-dl:hover { filter: brightness(1.08); transform: translateY(-1px); }
.hb-we8-dl:focus-visible { outline: 2px solid #17171a; outline-offset: 2px; }
.hb-we8-dl svg { width: 15px; height: 15px; }
.hb-we8 em, .hb-we8 i, .hb-we8 cite { font-style: normal; }
@keyframes hb-we8-row { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes hb-we8-in { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: none; } }
@container (max-width: 760px) {
  .hb-we8-c-size, .hb-we8-c-date { display: none; }
}
@container (max-width: 520px) {
  .hb-we8-c-ch { display: none; }
  .hb-we8-sum { display: none; }
  .hb-we8-open span { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-we8 *, .hb-we8 *::before, .hb-we8 *::after { transition: none !important; animation: none !important; }
}
`;

const kindColor: Record<VersionChange["kind"], string> = { added: "#16a34a", improved: "#4f46e5", fixed: "#d97706" };
const filters: { id: "all" | VersionChannel; label: string }[] = [
  { id: "all", label: "All" },
  { id: "stable", label: "Stable" },
  { id: "beta", label: "Beta" },
  { id: "lts", label: "LTS" },
];

export function DownloadVersionTable({
  eyebrow = "Pylon releases",
  title = "Every version, every change",
  subtitle = "Pick a channel, open any release to read what changed, and download the exact build you need.",
  releases = defaultReleases,
  defaultOpenVersion = null,
  accent = "#4f46e5",
  onDownload,
  onOpenChange,
  className,
  style,
  ...rest
}: DownloadVersionTableProps) {
  const [filter, setFilter] = React.useState<"all" | VersionChannel>("all");
  const [open, setOpen] = React.useState<string | null>(defaultOpenVersion);
  const drawerRef = React.useRef<HTMLDivElement | null>(null);
  const closeRef = React.useRef<HTMLButtonElement | null>(null);
  const opener = React.useRef<HTMLElement | null>(null);
  const uid = React.useId().replace(/:/g, "");
  const interacted = React.useRef(false);

  const list = releases.filter((r) => filter === "all" || r.channel === filter);
  const latestStable = releases.find((r) => r.channel === "stable")?.version;
  const openIdx = list.findIndex((r) => r.version === open);
  const release = releases.find((r) => r.version === open) ?? null;

  const setOpenState = React.useCallback(
    (v: string | null) => {
      interacted.current = true;
      setOpen(v);
      onOpenChange?.(v);
    },
    [onOpenChange],
  );

  React.useEffect(() => {
    if (!interacted.current) return;
    if (open) closeRef.current?.focus();
    else opener.current?.focus();
  }, [open]);

  const onDrawerKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setOpenState(null);
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = drawerRef.current?.querySelectorAll<HTMLElement>("button:not(:disabled), a[href]");
    if (!nodes || !nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const fi = Math.max(0, filters.findIndex((f) => f.id === filter));

  return (
    <section
      className={["hb-we8", className].filter(Boolean).join(" ")}
      style={{ "--hb-we8-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-download-version-table" precedence="default">{css}</style>
      <div className="hb-we8-inner">
        <div className="hb-we8-head">
          <div>
            {eyebrow ? <p className="hb-we8-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-we8-title">{title}</h2>
            {subtitle ? <p className="hb-we8-sub">{subtitle}</p> : null}
          </div>
          <div className="hb-we8-seg" role="group" aria-label="Release channel" style={{ "--hb-we8-n": filters.length, "--hb-we8-i": fi } as React.CSSProperties}>
            <span className="hb-we8-seg-pill" aria-hidden="true" />
            {filters.map((f) => (
              <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="hb-we8-box" data-open={release ? "true" : "false"}>
          <table className="hb-we8-table">
            <thead>
              <tr>
                <th>Version</th>
                <th className="hb-we8-c-ch">Channel</th>
                <th className="hb-we8-c-date">Released</th>
                <th className="hb-we8-c-size">Size</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody key={filter}>
              {list.map((r, i) => (
                <tr key={r.version} className="hb-we8-tr" style={{ "--hb-we8-k": i } as React.CSSProperties}>
                  <td>
                    <span className="hb-we8-cell">
                      <span className="hb-we8-ver">
                        {r.version}
                        {r.version === latestStable ? <span className="hb-we8-latest">Latest</span> : null}
                      </span>
                      <span className="hb-we8-sum">{r.summary}</span>
                    </span>
                  </td>
                  <td className="hb-we8-c-ch"><span className="hb-we8-cell"><span className="hb-we8-ch" data-c={r.channel}>{channelLabel[r.channel]}</span></span></td>
                  <td className="hb-we8-c-date"><span className="hb-we8-cell hb-we8-muted">{r.date}</span></td>
                  <td className="hb-we8-c-size"><span className="hb-we8-cell hb-we8-muted">{r.size}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <span className="hb-we8-cell">
                      <button
                        type="button"
                        className="hb-we8-open"
                        aria-expanded={open === r.version}
                        aria-controls={`${uid}-d`}
                        onClick={(e) => {
                          opener.current = e.currentTarget;
                          setOpenState(open === r.version ? null : r.version);
                        }}
                      >
                        <span>Changes</span>
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3.5L10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="hb-we8-scrim" tabIndex={-1} aria-hidden="true" onClick={() => setOpenState(null)} />
          <div
            ref={drawerRef}
            id={`${uid}-d`}
            className="hb-we8-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${uid}-dt`}
            onKeyDown={onDrawerKey}
          >
            {release ? (
              <>
                <div className="hb-we8-dh">
                  <div>
                    <h3 className="hb-we8-dt" id={`${uid}-dt`}>v{release.version}</h3>
                    <p className="hb-we8-dd">
                      <span className="hb-we8-ch" data-c={release.channel}>{channelLabel[release.channel]}</span>
                      {release.date}
                    </p>
                  </div>
                  <div className="hb-we8-icons">
                    <button type="button" className="hb-we8-icon" aria-label="Newer release" disabled={openIdx <= 0} onClick={() => setOpen(list[openIdx - 1]?.version ?? open)}>
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <button type="button" className="hb-we8-icon" aria-label="Older release" disabled={openIdx < 0 || openIdx >= list.length - 1} onClick={() => setOpen(list[openIdx + 1]?.version ?? open)}>
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <button ref={closeRef} type="button" className="hb-we8-icon" aria-label="Close changelog" onClick={() => setOpenState(null)}>
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                    </button>
                  </div>
                </div>
                <div className="hb-we8-db" key={release.version}>
                  <p style={{ margin: 0, color: "#66635b", fontSize: 14, lineHeight: 1.6 }}>{release.summary}</p>
                  {(["added", "improved", "fixed"] as const).map((kind) => {
                    const items = release.changes.filter((c) => c.kind === kind);
                    if (!items.length) return null;
                    return (
                      <div key={kind} className="hb-we8-group" style={{ "--hb-we8-k": kindColor[kind] } as React.CSSProperties}>
                        <h4>{kindLabel[kind]}<span>{items.length}</span></h4>
                        <ul>
                          {items.map((c) => (
                            <li key={c.text}>{c.text}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <div className="hb-we8-df">
                  <span>{release.size}</span>
                  <a className="hb-we8-dl" href={release.href} onClick={() => onDownload?.(release)}>
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2.5v8m-3.5-3.5L8 10.5 11.5 7M3 13.5h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Download v{release.version}
                  </a>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
