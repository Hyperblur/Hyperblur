"use client";

import * as React from "react";

export type FileKind = "folder" | "image" | "doc" | "sheet" | "code" | "video" | "audio" | "archive" | "pdf";
export type FileView = "list" | "grid";

export interface FileItem {
  id: string;
  name: string;
  kind: FileKind;
  size?: string;
  modified: string;
}

export const defaultFiles: FileItem[] = [
  { id: "f1", name: "Brand assets", kind: "folder", size: "24 items", modified: "Oct 30" },
  { id: "f2", name: "Q3 report.pdf", kind: "pdf", size: "2.4 MB", modified: "Oct 28" },
  { id: "f3", name: "Roadmap 2027.docx", kind: "doc", size: "184 KB", modified: "Oct 27" },
  { id: "f4", name: "Forecast.xlsx", kind: "sheet", size: "612 KB", modified: "Oct 26" },
  { id: "f5", name: "hero-shot.png", kind: "image", size: "3.1 MB", modified: "Oct 24" },
  { id: "f6", name: "Launch teaser.mp4", kind: "video", size: "48.7 MB", modified: "Oct 22" },
  { id: "f7", name: "tokens.json", kind: "code", size: "8 KB", modified: "Oct 20" },
  { id: "f8", name: "Podcast intro.wav", kind: "audio", size: "11.2 MB", modified: "Oct 18" },
  { id: "f9", name: "Archive 2026.zip", kind: "archive", size: "96 MB", modified: "Oct 12" },
];

export interface FileListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  files?: FileItem[];
  title?: string;
  view?: FileView;
  defaultView?: FileView;
  onViewChange?: (view: FileView) => void;
  selected?: string[];
  defaultSelected?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onDownload?: (ids: string[]) => void;
  onDelete?: (ids: string[]) => void;
  accent?: string;
}

const css = `
.hb-fls {
  --hb-fls-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  color: #ededed;
}
.hb-fls *, .hb-fls *::before, .hb-fls *::after { box-sizing: border-box; font-family: inherit; }
.hb-fls-bar { position: relative; height: 38px; margin-bottom: 4px; overflow: hidden; border-radius: 10px; }
.hb-fls-head {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 4px 0 8px;
  transition: transform .32s cubic-bezier(.2, .8, .2, 1), opacity .24s ease;
}
.hb-fls-title { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; }
.hb-fls-title span { margin-left: 8px; font-weight: 400; font-size: 12px; color: #8f8f8f; }
.hb-fls-toggle { display: inline-flex; padding: 2px; border: 1px solid #262626; border-radius: 9px; background: #111111; }
.hb-fls-vbtn {
  display: grid;
  place-items: center;
  width: 28px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  background: none;
  color: #8f8f8f;
  cursor: pointer;
  transition: background-color .18s ease, color .18s ease;
}
.hb-fls-vbtn svg { width: 14px; height: 14px; }
.hb-fls-vbtn:hover { color: #ededed; }
.hb-fls-vbtn[aria-pressed="true"] { background: #262626; color: #ededed; }
.hb-fls-sel {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 6px 0 12px;
  border: 1px solid color-mix(in srgb, var(--hb-fls-accent) 40%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--hb-fls-accent) 14%, #111111);
  transform: translateY(-110%);
  opacity: 0;
  visibility: hidden;
  transition: transform .32s cubic-bezier(.2, .8, .2, 1), opacity .24s ease, visibility 0s linear .32s;
}
.hb-fls[data-selecting="true"] .hb-fls-sel { transform: none; opacity: 1; visibility: visible; transition-delay: 0s; }
.hb-fls[data-selecting="true"] .hb-fls-head { transform: translateY(110%); opacity: 0; }
.hb-fls-count { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-weight: 500; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-fls-act {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: rgba(255, 255, 255, .08);
  color: #ededed;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .15s ease, border-color .15s ease;
}
.hb-fls-act svg { width: 13px; height: 13px; }
.hb-fls-act:hover { background: rgba(255, 255, 255, .14); }
.hb-fls-act[data-danger="true"] { color: #ff6b6b; background: rgba(255, 90, 90, .12); }
.hb-fls-act[data-danger="true"]:hover { background: rgba(255, 90, 90, .2); }
.hb-fls-x {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: none;
  color: #a1a1a1;
  cursor: pointer;
}
.hb-fls-x svg { width: 12px; height: 12px; }
.hb-fls-x:hover { background: rgba(255, 255, 255, .1); color: #ededed; }
.hb-fls-vbtn:focus-visible, .hb-fls-act:focus-visible, .hb-fls-x:focus-visible, .hb-fls-input:focus-visible + .hb-fls-box {
  outline: 2px solid color-mix(in srgb, var(--hb-fls-accent) 80%, transparent);
  outline-offset: 1px;
}
.hb-fls-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.hb-fls[data-view="grid"] .hb-fls-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 8px; }
.hb-fls-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  padding: 7px 8px;
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  transition: background-color .15s ease, border-color .15s ease;
}
.hb-fls-item:hover { background: rgba(255, 255, 255, .045); }
.hb-fls-item[data-selected="true"] {
  background: color-mix(in srgb, var(--hb-fls-accent) 13%, transparent);
  border-color: color-mix(in srgb, var(--hb-fls-accent) 38%, transparent);
}
.hb-fls-check { position: relative; flex: none; width: 18px; height: 18px; display: block; }
.hb-fls-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}
.hb-fls-box {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border: 1.5px solid #3a3a3a;
  border-radius: 5px;
  background: #0a0a0a;
  color: #fff;
  pointer-events: none;
  transition: background-color .15s ease, border-color .15s ease, transform .15s ease;
}
.hb-fls-box svg { width: 11px; height: 11px; opacity: 0; transform: scale(.5); transition: opacity .15s ease, transform .2s cubic-bezier(.3, 1.5, .5, 1); }
.hb-fls-input:checked + .hb-fls-box { background: var(--hb-fls-accent); border-color: var(--hb-fls-accent); }
.hb-fls-input:checked + .hb-fls-box svg { opacity: 1; transform: none; }
.hb-fls-icon { flex: none; width: 24px; height: 24px; color: var(--hb-fls-kind); }
.hb-fls-icon svg { width: 100%; height: 100%; display: block; }
.hb-fls-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-fls-meta { flex: none; width: 62px; text-align: right; font-size: 12px; color: #8f8f8f; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-fls-date { flex: none; width: 44px; text-align: right; font-size: 12px; color: #6b6b6b; white-space: nowrap; }
.hb-fls[data-view="grid"] .hb-fls-item {
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  padding: 10px 8px 8px;
  border-color: #1f1f1f;
  background: #111111;
}
.hb-fls[data-view="grid"] .hb-fls-item:hover { background: #151515; border-color: #2a2a2a; }
.hb-fls[data-view="grid"] .hb-fls-item[data-selected="true"] {
  background: color-mix(in srgb, var(--hb-fls-accent) 13%, #111111);
  border-color: color-mix(in srgb, var(--hb-fls-accent) 45%, transparent);
}
.hb-fls[data-view="grid"] .hb-fls-check {
  position: absolute;
  top: 7px;
  left: 7px;
  opacity: 0;
  transition: opacity .15s ease;
}
.hb-fls[data-view="grid"] .hb-fls-item:hover .hb-fls-check,
.hb-fls[data-view="grid"] .hb-fls-item[data-selected="true"] .hb-fls-check,
.hb-fls[data-view="grid"] .hb-fls-item:focus-within .hb-fls-check,
.hb-fls[data-view="grid"][data-selecting="true"] .hb-fls-check { opacity: 1; }
.hb-fls[data-view="grid"] .hb-fls-icon { width: 38px; height: 38px; margin: 4px auto 2px; }
.hb-fls[data-view="grid"] .hb-fls-name { flex: none; text-align: center; font-size: 12px; }
.hb-fls[data-view="grid"] .hb-fls-meta { width: auto; text-align: center; font-size: 11px; }
.hb-fls[data-view="grid"] .hb-fls-date { display: none; }
.hb-fls-empty { padding: 26px 12px; text-align: center; color: #8f8f8f; }
.hb-fls-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 300px) {
  .hb-fls-lbl { display: none; }
  .hb-fls[data-view="list"] .hb-fls-date { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-fls-head, .hb-fls-sel, .hb-fls-item, .hb-fls-box, .hb-fls-box svg, .hb-fls-vbtn, .hb-fls-act { transition: none !important; }
}
`;

const kindColor: Record<FileKind, string> = {
  folder: "#f5b84a",
  image: "#3ecf8e",
  doc: "#5b9bff",
  sheet: "#2fc7a4",
  code: "#a98bff",
  video: "#ff6fa8",
  audio: "#ff9a4a",
  archive: "#9a9aa6",
  pdf: "#ff6b6b",
};

const glyph: Record<Exclude<FileKind, "folder">, React.ReactNode> = {
  image: <path d="M8 18l3-4.2 2.2 2.8 1.6-2 2.2 3.4z" fill="currentColor" stroke="none" />,
  doc: <path d="M8.5 12.5h7M8.5 15.2h7M8.5 17.9h4.5" />,
  sheet: <path d="M8.5 12.5h7v6h-7zM8.5 15.5h7M12 12.5v6" />,
  code: <path d="M10.4 13l-2 2.4 2 2.4M13.6 13l2 2.4-2 2.4" />,
  video: <path d="M10.2 12.8v5.2l4.4-2.6z" fill="currentColor" stroke="none" />,
  audio: <path d="M9 14.5v2M11.5 12.5v6M14 13.5v4M16.2 15v1" />,
  archive: <path d="M12 12v1.6M12 15v1.6M10.6 18.2h2.8" />,
  pdf: <path d="M8.5 12.8h7M8.5 15.4h7M8.5 18h3.4" />,
};

function FileIcon({ kind }: { kind: FileKind }) {
  const style = { "--hb-fls-kind": kindColor[kind] } as React.CSSProperties;
  return (
    <span className="hb-fls-icon" style={style} aria-hidden="true">
      {kind === "folder" ? (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M3 7.2A2.2 2.2 0 0 1 5.2 5h4.1c.6 0 1.1.3 1.5.7l1 1.1c.2.2.5.3.8.3h6.2A2.2 2.2 0 0 1 21 9.3v8.5A2.2 2.2 0 0 1 18.8 20H5.2A2.2 2.2 0 0 1 3 17.8z"
            fill="currentColor"
            fillOpacity=".22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 3h7.2L19 8.3V19.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-15A1.5 1.5 0 0 1 6.5 3z" fill="currentColor" fillOpacity=".14" />
          <path d="M13.5 3v5.5H19" />
          {glyph[kind]}
        </svg>
      )}
    </span>
  );
}

export function FileList({
  files = defaultFiles,
  title = "Documents",
  view,
  defaultView = "list",
  onViewChange,
  selected,
  defaultSelected = [],
  onSelectionChange,
  onDownload,
  onDelete,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: FileListProps) {
  const sourceKey = files.map((f) => f.id).join("|");
  const [seenKey, setSeenKey] = React.useState(sourceKey);
  const [items, setItems] = React.useState<FileItem[]>(files);
  const [innerView, setInnerView] = React.useState<FileView>(defaultView);
  const [innerSelected, setInnerSelected] = React.useState<string[]>(defaultSelected);
  const refs = React.useRef(new Map<string, HTMLLIElement>());
  const before = React.useRef<Map<string, DOMRect> | null>(null);

  if (seenKey !== sourceKey) {
    setSeenKey(sourceKey);
    setItems(files);
  }

  const currentView = view ?? innerView;
  const chosen = selected ?? innerSelected;
  const ids = chosen.filter((id) => items.some((f) => f.id === id));
  const selecting = ids.length > 0;

  React.useLayoutEffect(() => {
    const first = before.current;
    before.current = null;
    if (!first) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    refs.current.forEach((el, id) => {
      const from = first.get(id);
      if (!from) return;
      const to = el.getBoundingClientRect();
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      if (!dx && !dy) return;
      el.animate(
        [
          { transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`, opacity: 0.55 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 380, easing: "cubic-bezier(.2, .8, .2, 1)" },
      );
    });
  }, [currentView]);

  const setView = (next: FileView) => {
    if (next === currentView) return;
    const snapshot = new Map<string, DOMRect>();
    refs.current.forEach((el, id) => snapshot.set(id, el.getBoundingClientRect()));
    before.current = snapshot;
    if (view === undefined) setInnerView(next);
    onViewChange?.(next);
  };

  const commit = (next: string[]) => {
    if (selected === undefined) setInnerSelected(next);
    onSelectionChange?.(next);
  };

  const toggle = (id: string) => {
    commit(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
  };

  const remove = () => {
    const gone = new Set(ids);
    setItems((prev) => prev.filter((f) => !gone.has(f.id)));
    commit([]);
    onDelete?.(ids);
  };

  const vars = { "--hb-fls-accent": accent, ...style } as React.CSSProperties;

  return (
    <div
      className={`hb-fls ${className}`}
      style={vars}
      data-view={currentView}
      data-selecting={selecting}
      {...rest}
    >
      <style href="hb-file-list" precedence="default">{css}</style>
      <div className="hb-fls-bar">
        <div className="hb-fls-head">
          <span className="hb-fls-title">
            {title}
            <span>{`${items.length} items`}</span>
          </span>
          <span className="hb-fls-toggle" role="group" aria-label="View">
            <button type="button" className="hb-fls-vbtn" aria-label="List view" aria-pressed={currentView === "list"} onClick={() => setView("list")}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M5.5 4h8M5.5 8h8M5.5 12h8M2.5 4h.01M2.5 8h.01M2.5 12h.01" />
              </svg>
            </button>
            <button type="button" className="hb-fls-vbtn" aria-label="Grid view" aria-pressed={currentView === "grid"} onClick={() => setView("grid")}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
                <rect x="2.5" y="2.5" width="4.6" height="4.6" rx="1" />
                <rect x="8.9" y="2.5" width="4.6" height="4.6" rx="1" />
                <rect x="2.5" y="8.9" width="4.6" height="4.6" rx="1" />
                <rect x="8.9" y="8.9" width="4.6" height="4.6" rx="1" />
              </svg>
            </button>
          </span>
        </div>
        <div className="hb-fls-sel" inert={!selecting} aria-hidden={!selecting}>
          <span className="hb-fls-count">{`${ids.length} selected`}</span>
          <button type="button" className="hb-fls-act" onClick={() => onDownload?.(ids)}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 2.5v7.5M4.8 7.2L8 10.4l3.2-3.2M3 13h10" />
            </svg>
            <span className="hb-fls-lbl">Download</span>
          </button>
          <button type="button" className="hb-fls-act" data-danger="true" onClick={remove}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 4.5h11M6 4.5V3h4v1.5M4 4.5l.6 8.2a1 1 0 0 0 1 .8h4.8a1 1 0 0 0 1-.8l.6-8.2" />
            </svg>
            <span className="hb-fls-lbl">Delete</span>
          </button>
          <button type="button" className="hb-fls-x" aria-label="Clear selection" onClick={() => commit([])}>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <span className="hb-fls-sr" role="status" aria-live="polite">
        {selecting ? `${ids.length} selected` : "No files selected"}
      </span>
      {items.length > 0 ? (
        <ul className="hb-fls-list" aria-label={title}>
          {items.map((file) => {
            const checked = ids.includes(file.id);
            return (
              <li
                key={file.id}
                className="hb-fls-item"
                data-selected={checked}
                ref={(el) => {
                  if (el) refs.current.set(file.id, el);
                  else refs.current.delete(file.id);
                }}
                onClick={() => toggle(file.id)}
              >
                <span className="hb-fls-check">
                  <input
                    type="checkbox"
                    className="hb-fls-input"
                    checked={checked}
                    aria-label={`Select ${file.name}`}
                    onChange={() => toggle(file.id)}
                    onClick={(event) => event.stopPropagation()}
                  />
                  <span className="hb-fls-box" aria-hidden="true">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.4 6.4l2.3 2.3 4.9-5" />
                    </svg>
                  </span>
                </span>
                <FileIcon kind={file.kind} />
                <span className="hb-fls-name">{file.name}</span>
                {file.size && <span className="hb-fls-meta">{file.size}</span>}
                <span className="hb-fls-date">{file.modified}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="hb-fls-empty">This folder is empty</div>
      )}
    </div>
  );
}
