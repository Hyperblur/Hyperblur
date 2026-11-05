"use client";

import * as React from "react";

export type AppFileKind = "folder" | "image" | "doc" | "sheet" | "video" | "pdf" | "zip" | "audio";

export interface AppFile {
  id: string;
  name: string;
  kind: AppFileKind;
  size?: number;
  items?: number;
  modified: string;
  owner: string;
}

export interface AppFileManagerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  files?: AppFile[];
  path?: string[];
  defaultView?: "grid" | "list";
  defaultSelected?: string[];
  usedBytes?: number;
  totalBytes?: number;
  accent?: string;
  onUpload?: (files: File[]) => void;
  onDelete?: (ids: string[]) => void;
  onOpenFile?: (file: AppFile) => void;
  onPathSelect?: (index: number) => void;
}

const GB = 1024 * 1024 * 1024;
const MB = 1024 * 1024;

const defaultFiles: AppFile[] = [
  { id: "f1", name: "Campaign assets", kind: "folder", items: 48, modified: "Nov 3", owner: "Maya Okafor" },
  { id: "f2", name: "Press kit", kind: "folder", items: 12, modified: "Oct 29", owner: "Sofia Lind" },
  { id: "f3", name: "hero-launch-v4.png", kind: "image", size: 4.8 * MB, modified: "Nov 4", owner: "Amara Chen" },
  { id: "f4", name: "Launch brief.docx", kind: "doc", size: 312 * 1024, modified: "Nov 2", owner: "Maya Okafor" },
  { id: "f5", name: "Budget Q4.xlsx", kind: "sheet", size: 128 * 1024, modified: "Nov 1", owner: "Tom Whitaker" },
  { id: "f6", name: "teaser-cut-03.mp4", kind: "video", size: 286 * MB, modified: "Oct 31", owner: "Diego Ramos" },
  { id: "f7", name: "Brand guidelines.pdf", kind: "pdf", size: 18.2 * MB, modified: "Oct 27", owner: "Sofia Lind" },
  { id: "f8", name: "product-shots.zip", kind: "zip", size: 642 * MB, modified: "Oct 24", owner: "Amara Chen" },
  { id: "f9", name: "billboard-night.jpg", kind: "image", size: 9.1 * MB, modified: "Oct 22", owner: "Amara Chen" },
  { id: "f10", name: "voiceover-final.wav", kind: "audio", size: 54 * MB, modified: "Oct 20", owner: "Kenji Mori" },
];

const kindMeta: Record<AppFileKind, { color: string; label: string; icon: string }> = {
  folder: { color: "#7fb3ff", label: "Folder", icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" },
  image: { color: "#c084fc", label: "Image", icon: "M4 5h16v14H4V5Zm0 11 5-5 4 4 2-2 5 5M15 9.5a1.5 1.5 0 1 0 0-.01" },
  doc: { color: "#60a5fa", label: "Document", icon: "M7 3h7l5 5v13H7V3Zm7 0v5h5M10 13h6M10 17h6" },
  sheet: { color: "#34d399", label: "Spreadsheet", icon: "M5 4h14v16H5V4Zm0 5h14M5 14h14M10 4v16" },
  video: { color: "#fb923c", label: "Video", icon: "M4 6h12v12H4V6Zm12 4 4-2v8l-4-2" },
  pdf: { color: "#f87171", label: "PDF", icon: "M7 3h7l5 5v13H7V3Zm7 0v5h5M9.5 16h5" },
  zip: { color: "#facc15", label: "Archive", icon: "M6 3h12v18H6V3Zm6 0v2m0 2v2m0 2v2m-1 2h2v3h-2v-3Z" },
  audio: { color: "#2dd4bf", label: "Audio", icon: "M9 18V6l10-2v12M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm10-2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" },
};

const places = [
  { label: "My files", icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" },
  { label: "Shared with me", icon: "M16 19a5 5 0 0 0-10 0M11 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm6-1a3 3 0 1 0-1-5.8M21 19a4.5 4.5 0 0 0-3-4.2" },
  { label: "Recent", icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2" },
  { label: "Starred", icon: "M12 4l2.5 5 5.5.8-4 3.9.9 5.5L12 16.6 7.1 19.2l.9-5.5-4-3.9 5.5-.8L12 4Z" },
  { label: "Trash", icon: "M5 7h14M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" },
];

function fmtSize(b?: number) {
  if (b === undefined) return "";
  if (b >= GB) return `${(b / GB).toFixed(1)} GB`;
  if (b >= MB) return `${(b / MB).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(b / 1024))} KB`;
}

function kindFromName(name: string, type: string): AppFileKind {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (type.startsWith("image/") || ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return "image";
  if (type.startsWith("video/") || ["mp4", "mov", "webm"].includes(ext)) return "video";
  if (type.startsWith("audio/") || ["mp3", "wav", "m4a"].includes(ext)) return "audio";
  if (ext === "pdf") return "pdf";
  if (["xls", "xlsx", "csv", "numbers"].includes(ext)) return "sheet";
  if (["zip", "rar", "7z", "gz"].includes(ext)) return "zip";
  return "doc";
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

const css = `
.hb-ye4 {
  --hb-ye4-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
}
.hb-ye4 *, .hb-ye4 *::before, .hb-ye4 *::after { box-sizing: border-box; }
.hb-ye4-shell { display: grid; grid-template-columns: 1fr; min-height: 600px; }
.hb-ye4-side { display: none; flex-direction: column; gap: 4px; padding: 18px 12px; border-right: 1px solid rgba(255,255,255,.08); background: #0d0d0d; }
.hb-ye4-new { display: flex; align-items: center; justify-content: center; gap: 8px; height: 36px; margin: 0 4px 12px; border: 0; border-radius: 10px; background: #ededed; color: #0a0a0a; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; box-shadow: inset 0 -1px 0 rgba(0,0,0,.15); }
.hb-ye4-new:hover { background: #fff; }
.hb-ye4-new svg { width: 15px; height: 15px; }
.hb-ye4-place { display: flex; align-items: center; gap: 10px; width: 100%; margin: 0; padding: 8px 10px; border: 0; border-radius: 8px; background: transparent; color: #a1a1a1; font: inherit; font-size: 13px; text-align: left; cursor: pointer; }
.hb-ye4-place:hover { background: #151515; color: #ededed; }
.hb-ye4-place[aria-current="page"] { background: #171717; color: #ededed; }
.hb-ye4-place svg { width: 16px; height: 16px; flex: none; }
.hb-ye4-place[aria-current="page"] svg { color: var(--hb-ye4-accent); }
.hb-ye4-storage { margin-top: auto; padding: 14px 10px 4px; border-top: 1px solid rgba(255,255,255,.06); }
.hb-ye4-storage-h { display: flex; justify-content: space-between; font-size: 12.5px; }
.hb-ye4-storage-h span { color: #8f8f8f; }
.hb-ye4-meter { display: flex; gap: 2px; height: 7px; margin: 9px 0 10px; border-radius: 999px; background: #1f1f1f; overflow: hidden; }
.hb-ye4-meter i { height: 100%; transform-origin: left; animation: hb-ye4-grow .9s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye4-legend { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 8px; color: #8f8f8f; font-size: 11.5px; }
.hb-ye4-legend span { display: flex; align-items: center; gap: 6px; }
.hb-ye4-legend i { width: 7px; height: 7px; border-radius: 2px; }
.hb-ye4-upgrade { margin-top: 12px; color: var(--hb-ye4-accent); font-size: 12.5px; font-weight: 500; text-decoration: none; }
.hb-ye4-main { position: relative; display: flex; flex-direction: column; min-width: 0; padding: 16px 18px 18px; }
.hb-ye4-top { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 14px; }
.hb-ye4-crumbs { display: flex; align-items: center; gap: 2px; margin: 0 auto 0 0; padding: 0; list-style: none; min-width: 0; font-size: 15px; }
.hb-ye4-crumbs li { display: flex; align-items: center; gap: 2px; min-width: 0; }
.hb-ye4-crumbs li + li::before { content: "/"; margin: 0 4px; color: #4a4a4a; }
.hb-ye4-crumb { margin: 0; padding: 3px 6px; border: 0; border-radius: 6px; background: transparent; color: #8f8f8f; font: inherit; cursor: pointer; white-space: nowrap; }
.hb-ye4-crumb:hover { background: #151515; color: #ededed; }
.hb-ye4-crumb[aria-current="page"] { color: #ededed; font-weight: 600; cursor: default; }
.hb-ye4-search { display: flex; align-items: center; gap: 8px; width: 220px; max-width: 100%; height: 34px; padding: 0 10px; border: 1px solid #262626; border-radius: 9px; background: #111; color: #737373; }
.hb-ye4-search:focus-within { outline: 2px solid var(--hb-ye4-accent); outline-offset: 1px; }
.hb-ye4-search svg { width: 15px; height: 15px; flex: none; }
.hb-ye4-search input { flex: 1; min-width: 0; height: 100%; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 13px; outline: none; }
.hb-ye4-seg { display: flex; gap: 2px; padding: 3px; border: 1px solid rgba(255,255,255,.08); border-radius: 9px; background: #101010; }
.hb-ye4-seg button { display: grid; place-items: center; width: 30px; height: 26px; margin: 0; padding: 0; border: 0; border-radius: 6px; background: transparent; color: #8f8f8f; cursor: pointer; }
.hb-ye4-seg button[aria-checked="true"] { background: #1f1f1f; color: #ededed; }
.hb-ye4-seg svg { width: 15px; height: 15px; }
.hb-ye4 button:focus-visible, .hb-ye4 a:focus-visible, .hb-ye4-check:focus-visible { outline: 2px solid var(--hb-ye4-accent); outline-offset: 1px; }
.hb-ye4-sum { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; color: #737373; font-size: 12px; }
.hb-ye4-area { position: relative; flex: 1; min-height: 0; }
.hb-ye4-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.hb-ye4-card { position: relative; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; background: #101010; cursor: pointer; overflow: hidden; transition: border-color .15s ease, transform .2s ease, box-shadow .2s ease; animation: hb-ye4-in .35s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye4-card:hover { border-color: rgba(255,255,255,.14); transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.35); }
.hb-ye4-card[data-selected="true"], .hb-ye4-tr[data-selected="true"] { border-color: color-mix(in srgb, var(--hb-ye4-accent) 70%, transparent); background: color-mix(in srgb, var(--hb-ye4-accent) 8%, #101010); }
.hb-ye4-card[data-new="true"], .hb-ye4-tr[data-new="true"] { animation: hb-ye4-flash 1.6s ease both; }
.hb-ye4-thumb { position: relative; display: grid; place-items: center; height: 96px; background: #151515; }
.hb-ye4-thumb svg { width: 34px; height: 34px; }
.hb-ye4-art { position: absolute; inset: 0; }
.hb-ye4-check { position: absolute; top: 8px; left: 8px; z-index: 1; width: 17px; height: 17px; margin: 0; accent-color: var(--hb-ye4-accent); cursor: pointer; opacity: 0; transition: opacity .15s ease; }
.hb-ye4-card:hover .hb-ye4-check, .hb-ye4-check:checked, .hb-ye4-check:focus-visible, .hb-ye4[data-selecting="true"] .hb-ye4-check { opacity: 1; }
.hb-ye4-info { display: flex; flex-direction: column; gap: 2px; padding: 9px 11px 10px; min-width: 0; }
.hb-ye4-name { overflow: hidden; font-size: 13px; font-weight: 500; white-space: nowrap; text-overflow: ellipsis; }
.hb-ye4-meta { color: #737373; font-size: 11.5px; }
.hb-ye4-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; }
.hb-ye4-table th { padding: 8px 10px; border-bottom: 1px solid rgba(255,255,255,.08); color: #737373; font-size: 11.5px; font-weight: 600; letter-spacing: .04em; text-align: left; text-transform: uppercase; }
.hb-ye4-table td { padding: 8px 10px; border-bottom: 1px solid rgba(255,255,255,.05); color: #a1a1a1; white-space: nowrap; }
.hb-ye4-table td:nth-child(2) { width: 100%; max-width: 0; color: #ededed; }
.hb-ye4-tr { cursor: pointer; animation: hb-ye4-in .3s ease both; }
.hb-ye4-tr:hover td { background: #111; }
.hb-ye4-tr[data-selected="true"] td { background: color-mix(in srgb, var(--hb-ye4-accent) 9%, transparent); }
.hb-ye4-tr .hb-ye4-check, .hb-ye4-table th .hb-ye4-check { position: static; opacity: 1; }
.hb-ye4-cellname { display: flex; align-items: center; gap: 10px; min-width: 0; }
.hb-ye4-cellname > span:last-child { overflow: hidden; text-overflow: ellipsis; }
.hb-ye4-ico { display: grid; place-items: center; width: 26px; height: 26px; flex: none; border-radius: 7px; }
.hb-ye4-ico svg { width: 15px; height: 15px; }
.hb-ye4-hide { display: none; }
.hb-ye4-empty { padding: 60px 20px; color: #737373; text-align: center; }
.hb-ye4-bulk { position: absolute; left: 50%; bottom: 18px; z-index: 4; display: flex; align-items: center; gap: 4px; padding: 6px; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; background: rgba(28,28,28,.94); box-shadow: 0 18px 40px rgba(0,0,0,.55); backdrop-filter: blur(10px); transform: translate(-50%, 0); animation: hb-ye4-up .3s cubic-bezier(.2,.9,.2,1) both; white-space: nowrap; }
.hb-ye4-bulk-n { padding: 0 10px 0 8px; font-size: 13px; font-weight: 600; }
.hb-ye4-bulk button { display: inline-flex; align-items: center; gap: 6px; height: 30px; margin: 0; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; color: #d4d4d4; font: inherit; font-size: 13px; cursor: pointer; }
.hb-ye4-bulk button:hover { background: #2a2a2a; color: #fff; }
.hb-ye4-bulk button[data-tone="danger"] { color: #ff8a8a; }
.hb-ye4-bulk svg { width: 15px; height: 15px; }
.hb-ye4-sep { width: 1px; height: 18px; margin: 0 2px; background: #333; }
.hb-ye4-drop { position: absolute; inset: 8px; z-index: 6; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; border: 2px dashed color-mix(in srgb, var(--hb-ye4-accent) 70%, transparent); border-radius: 14px; background: color-mix(in srgb, var(--hb-ye4-accent) 10%, rgba(10,10,10,.88)); backdrop-filter: blur(4px); pointer-events: none; animation: hb-ye4-fade .18s ease both; }
.hb-ye4-drop-ico { display: grid; place-items: center; width: 56px; height: 56px; border-radius: 16px; background: var(--hb-ye4-accent); color: #fff; animation: hb-ye4-bob 1.2s ease-in-out infinite; }
.hb-ye4-drop-ico svg { width: 26px; height: 26px; }
.hb-ye4-drop b { font-size: 16px; }
.hb-ye4-drop span { color: #a1a1a1; font-size: 13px; }
@keyframes hb-ye4-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes hb-ye4-up { from { opacity: 0; transform: translate(-50%, 14px); } to { opacity: 1; transform: translate(-50%, 0); } }
@keyframes hb-ye4-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-ye4-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-ye4-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes hb-ye4-flash { 0% { box-shadow: 0 0 0 2px var(--hb-ye4-accent); } 100% { box-shadow: 0 0 0 0 transparent; } }
@container (min-width: 700px) {
  .hb-ye4-shell { grid-template-columns: 220px 1fr; }
  .hb-ye4-side { display: flex; }
  .hb-ye4-main { padding: 20px 22px; }
  .hb-ye4-hide { display: table-cell; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ye4 *, .hb-ye4 *::before, .hb-ye4 *::after { animation: none !important; transition: none !important; }
}
`;

function Icon({ d, color }: { d: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Art({ file }: { file: AppFile }) {
  const h = hash(file.name);
  const a = h % 360;
  const b = (a + 40 + (h % 60)) % 360;
  if (file.kind === "image") {
    return (
      <svg className="hb-ye4-art" viewBox="0 0 160 96" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`hb-ye4-g${file.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={`hsl(${a} 70% 55%)`} />
            <stop offset="1" stopColor={`hsl(${b} 60% 22%)`} />
          </linearGradient>
        </defs>
        <rect width="160" height="96" fill={`url(#hb-ye4-g${file.id})`} />
        <circle cx={(110 + (h % 30)).toFixed(0)} cy="30" r="12" fill="rgba(255,255,255,.75)" />
        <path d="M0 96 L46 50 L78 78 L104 58 L160 96 Z" fill="rgba(0,0,0,.35)" />
      </svg>
    );
  }
  if (file.kind === "video") {
    return (
      <svg className="hb-ye4-art" viewBox="0 0 160 96" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="160" height="96" fill="#1a1410" />
        <rect y="0" width="160" height="96" fill={`hsl(${a} 50% 30% / .5)`} />
        <circle cx="80" cy="48" r="16" fill="rgba(0,0,0,.5)" stroke="rgba(255,255,255,.5)" />
        <path d="M75 40 L88 48 L75 56 Z" fill="#fff" />
        <rect x="8" y="84" width="144" height="3" rx="1.5" fill="rgba(255,255,255,.2)" />
        <rect x="8" y="84" width="58" height="3" rx="1.5" fill="#fb923c" />
      </svg>
    );
  }
  return null;
}

export function AppFileManager({
  files: filesProp = defaultFiles,
  path = ["My files", "Marketing", "Q4 Launch"],
  defaultView = "grid",
  defaultSelected = [],
  usedBytes = 68.4 * GB,
  totalBytes = 100 * GB,
  accent = "#2f7bff",
  onUpload,
  onDelete,
  onOpenFile,
  onPathSelect,
  className,
  style,
  ...rest
}: AppFileManagerProps) {
  const [files, setFiles] = React.useState<AppFile[]>(filesProp);
  const [view, setView] = React.useState<"grid" | "list">(defaultView);
  const [selected, setSelected] = React.useState<Set<string>>(() => new Set(defaultSelected));
  const [query, setQuery] = React.useState("");
  const [dragging, setDragging] = React.useState(false);
  const [fresh, setFresh] = React.useState<Set<string>>(new Set());
  const depth = React.useRef(0);
  const counter = React.useRef(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const allRef = React.useRef<HTMLInputElement>(null);

  const visible = files.filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase()));
  const allSelected = visible.length > 0 && visible.every((f) => selected.has(f.id));
  const someSelected = visible.some((f) => selected.has(f.id));

  React.useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = someSelected && !allSelected;
  }, [someSelected, allSelected, view]);

  React.useEffect(() => {
    if (!fresh.size) return;
    const t = window.setTimeout(() => setFresh(new Set()), 1800);
    return () => window.clearTimeout(t);
  }, [fresh]);

  const toggle = (id: string) => {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(visible.map((f) => f.id)));
  const clear = () => setSelected(new Set());

  const remove = () => {
    const ids = [...selected];
    setFiles((list) => list.filter((f) => !selected.has(f.id)));
    clear();
    onDelete?.(ids);
  };

  const addFiles = (list: File[]) => {
    if (!list.length) return;
    const added: AppFile[] = list.map((f) => {
      counter.current += 1;
      return { id: `up-${counter.current}`, name: f.name, kind: kindFromName(f.name, f.type), size: f.size, modified: "Just now", owner: "You" };
    });
    setFiles((cur) => [...added, ...cur]);
    setFresh(new Set(added.map((f) => f.id)));
    onUpload?.(list);
  };

  const onDragEnter = (e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes("Files")) return;
    e.preventDefault();
    depth.current += 1;
    setDragging(true);
  };
  const onDragOver = (e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes("Files")) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };
  const onDragLeave = () => {
    depth.current = Math.max(0, depth.current - 1);
    if (depth.current === 0) setDragging(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    depth.current = 0;
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (e.key === "Escape" && selected.size) clear();
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "a" && tag !== "INPUT") {
      e.preventDefault();
      setSelected(new Set(visible.map((f) => f.id)));
    }
    if ((e.key === "Delete" || e.key === "Backspace") && selected.size && tag !== "INPUT") {
      e.preventDefault();
      remove();
    }
  };

  const onItemKey = (e: React.KeyboardEvent, f: AppFile) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter") onOpenFile?.(f);
    if (e.key === " ") { e.preventDefault(); toggle(f.id); }
  };

  const used = files.reduce((n, f) => (f.id.startsWith("up-") ? n + (f.size ?? 0) : n), usedBytes);
  const segments = [
    { label: "Video", color: "#fb923c", share: 0.34 },
    { label: "Images", color: "#c084fc", share: 0.22 },
    { label: "Docs", color: "#60a5fa", share: 0.08 },
    { label: "Other", color: "#facc15", share: 0.044 },
  ];
  const pct = Math.min(1, used / totalBytes);
  const scale = pct / segments.reduce((n, s) => n + s.share, 0);
  const selecting = selected.size > 0;

  const sub = (f: AppFile) => (f.kind === "folder" ? `${f.items ?? 0} items` : fmtSize(f.size));

  return (
    <div
      className={["hb-ye4", className].filter(Boolean).join(" ")}
      style={{ "--hb-ye4-accent": accent, ...style } as React.CSSProperties}
      data-selecting={selecting}
      onKeyDown={onKeyDown}
      {...rest}
    >
      <style href="hb-app-file-manager" precedence="default">{css}</style>
      <div className="hb-ye4-shell">
        <nav className="hb-ye4-side" aria-label="Locations">
          <button type="button" className="hb-ye4-new" onClick={() => inputRef.current?.click()}><Icon d="M12 16V4m-5 5 5-5 5 5M5 20h14" />Upload</button>
          {places.map((p, i) => (
            <button key={p.label} type="button" className="hb-ye4-place" aria-current={i === 0 ? "page" : undefined}>
              <Icon d={p.icon} />
              {p.label}
            </button>
          ))}
          <div className="hb-ye4-storage">
            <div className="hb-ye4-storage-h"><b>Storage</b><span>{fmtSize(used)} of {fmtSize(totalBytes)}</span></div>
            <div className="hb-ye4-meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct * 100)} aria-label="Storage used">
              {segments.map((s, i) => (
                <i key={s.label} style={{ width: `${(s.share * scale * 100).toFixed(2)}%`, background: s.color, animationDelay: `${(i * 0.08).toFixed(2)}s` }} />
              ))}
            </div>
            <div className="hb-ye4-legend">
              {segments.map((s) => <span key={s.label}><i style={{ background: s.color }} />{s.label}</span>)}
            </div>
            <a className="hb-ye4-upgrade" href="#upgrade" style={{ display: "inline-block" }}>Get 2 TB for $9.99/mo</a>
          </div>
        </nav>
        <section
          className="hb-ye4-main"
          aria-label={path[path.length - 1]}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="hb-ye4-top">
            <ol className="hb-ye4-crumbs" aria-label="Breadcrumb">
              {path.map((p, i) => (
                <li key={`${p}-${i}`}>
                  <button type="button" className="hb-ye4-crumb" aria-current={i === path.length - 1 ? "page" : undefined} onClick={() => onPathSelect?.(i)}>{p}</button>
                </li>
              ))}
            </ol>
            <label className="hb-ye4-search">
              <Icon d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 2-4-4" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search in folder" aria-label="Search in folder" />
            </label>
            <div className="hb-ye4-seg" role="radiogroup" aria-label="View">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={view === v}
                  aria-label={v === "grid" ? "Grid view" : "List view"}
                  tabIndex={view === v ? 0 : -1}
                  onClick={() => setView(v)}
                  onKeyDown={(e) => { if (e.key.startsWith("Arrow")) { e.preventDefault(); setView(view === "grid" ? "list" : "grid"); } }}
                >
                  <Icon d={v === "grid" ? "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" : "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"} />
                </button>
              ))}
            </div>
          </div>
          <div className="hb-ye4-sum">
            <span>{visible.length} items{query && ` matching "${query}"`}</span>
            {view === "grid" && visible.length > 0 && (
              <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                <input ref={allRef} type="checkbox" className="hb-ye4-check" style={{ position: "static", opacity: 1 }} checked={allSelected} onChange={toggleAll} />
                Select all
              </label>
            )}
          </div>
          <div className="hb-ye4-area">
            {visible.length === 0 && <div className="hb-ye4-empty">No files match that search.</div>}
            {view === "grid" ? (
              <div className="hb-ye4-grid" role="list">
                {visible.map((f, i) => {
                  const k = kindMeta[f.kind];
                  return (
                    <div
                      key={f.id}
                      role="listitem"
                      tabIndex={0}
                      className="hb-ye4-card"
                      data-selected={selected.has(f.id)}
                      data-new={fresh.has(f.id)}
                      aria-label={`${f.name}, ${k.label}`}
                      style={{ animationDelay: `${(i * 0.03).toFixed(2)}s` }}
                      onClick={(e) => { if (selecting || e.metaKey || e.ctrlKey || e.shiftKey) toggle(f.id); else onOpenFile?.(f); }}
                      onKeyDown={(e) => onItemKey(e, f)}
                    >
                      <input type="checkbox" className="hb-ye4-check" checked={selected.has(f.id)} aria-label={`Select ${f.name}`} onClick={(e) => e.stopPropagation()} onChange={() => toggle(f.id)} />
                      <div className="hb-ye4-thumb" style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${k.color} 14%, #151515), #121212)` }}>
                        <Art file={f} />
                        {f.kind !== "image" && f.kind !== "video" && <Icon d={k.icon} color={k.color} />}
                      </div>
                      <div className="hb-ye4-info">
                        <span className="hb-ye4-name" title={f.name}>{f.name}</span>
                        <span className="hb-ye4-meta">{sub(f)} · {f.modified}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : visible.length > 0 && (
              <table className="hb-ye4-table">
                <thead>
                  <tr>
                    <th style={{ width: 32 }}><input ref={allRef} type="checkbox" className="hb-ye4-check" checked={allSelected} onChange={toggleAll} aria-label="Select all" /></th>
                    <th>Name</th>
                    <th className="hb-ye4-hide">Owner</th>
                    <th className="hb-ye4-hide">Modified</th>
                    <th style={{ textAlign: "right" }}>Size</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((f, i) => {
                    const k = kindMeta[f.kind];
                    return (
                      <tr
                        key={f.id}
                        className="hb-ye4-tr"
                        tabIndex={0}
                        data-selected={selected.has(f.id)}
                        data-new={fresh.has(f.id)}
                        style={{ animationDelay: `${(i * 0.025).toFixed(3)}s` }}
                        onClick={() => toggle(f.id)}
                        onDoubleClick={() => onOpenFile?.(f)}
                        onKeyDown={(e) => onItemKey(e, f)}
                      >
                        <td><input type="checkbox" className="hb-ye4-check" checked={selected.has(f.id)} aria-label={`Select ${f.name}`} onClick={(e) => e.stopPropagation()} onChange={() => toggle(f.id)} /></td>
                        <td>
                          <span className="hb-ye4-cellname">
                            <span className="hb-ye4-ico" style={{ background: `color-mix(in srgb, ${k.color} 16%, transparent)` }}><Icon d={k.icon} color={k.color} /></span>
                            <span>{f.name}</span>
                          </span>
                        </td>
                        <td className="hb-ye4-hide">{f.owner}</td>
                        <td className="hb-ye4-hide">{f.modified}</td>
                        <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{sub(f)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          {selecting && (
            <div className="hb-ye4-bulk" role="toolbar" aria-label="Bulk actions">
              <span className="hb-ye4-bulk-n" aria-live="polite">{selected.size} selected</span>
              <span className="hb-ye4-sep" />
              <button type="button"><Icon d="M16 6l-4-4-4 4m4-4v13M5 12v8h14v-8" />Share</button>
              <button type="button"><Icon d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm9 3v6m-3-3h6" />Move</button>
              <button type="button"><Icon d="M12 4v12m-5-5 5 5 5-5M5 20h14" />Download</button>
              <button type="button" data-tone="danger" onClick={remove}><Icon d="M5 7h14M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" />Delete</button>
              <span className="hb-ye4-sep" />
              <button type="button" aria-label="Clear selection" onClick={clear}><Icon d="M6 6l12 12M18 6 6 18" /></button>
            </div>
          )}
          {dragging && (
            <div className="hb-ye4-drop" aria-hidden="true">
              <span className="hb-ye4-drop-ico"><Icon d="M12 16V4m-5 5 5-5 5 5M5 20h14" /></span>
              <b>Drop to upload</b>
              <span>Files go into {path[path.length - 1]}</span>
            </div>
          )}
          <input ref={inputRef} type="file" multiple hidden onChange={(e) => { addFiles(Array.from(e.target.files ?? [])); e.target.value = ""; }} />
        </section>
      </div>
    </div>
  );
}

export default AppFileManager;
