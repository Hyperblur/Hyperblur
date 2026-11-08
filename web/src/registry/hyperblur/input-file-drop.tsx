"use client";

import * as React from "react";

export interface InputFileDropItem {
  id: string;
  name: string;
  size: number;
  type?: string;
  progress: number;
  status: "uploading" | "done" | "error";
  error?: string;
  file?: File;
  preview?: string;
}

export interface InputFileDropProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
  variant?: "panel" | "strip" | "avatar";
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  title?: string;
  hint?: string;
  defaultItems?: InputFileDropItem[];
  onFilesChange?: (items: InputFileDropItem[]) => void;
  onUpload?: (file: File, onProgress: (progress: number) => void) => Promise<void>;
  accent?: string;
  disabled?: boolean;
}

const css = `
.hb-xg7 {
  --hb-xg7-c: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-xg7 *, .hb-xg7 *::before, .hb-xg7 *::after { box-sizing: border-box; }
.hb-xg7[data-disabled="true"] { opacity: 0.5; pointer-events: none; }
.hb-xg7-zone {
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 16px;
  background:
    radial-gradient(120% 90% at 50% 0%, rgba(255, 255, 255, 0.035), transparent 60%),
    linear-gradient(180deg, #131313, #0e0e0e);
  cursor: pointer;
  outline: 0;
  transition: background 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xg7-zone:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-xg7-c); }
.hb-xg7-ants { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.hb-xg7-ants rect { fill: none; stroke: #333; stroke-width: 1.2; stroke-dasharray: 6 5; transition: stroke 0.25s ease; }
.hb-xg7-zone:hover .hb-xg7-ants rect { stroke: #4a4a4a; }
.hb-xg7[data-over="true"] .hb-xg7-ants rect { stroke: var(--hb-xg7-c); stroke-width: 1.6; animation: hb-xg7-march 0.6s linear infinite; }
.hb-xg7[data-over="true"] .hb-xg7-zone {
  background:
    radial-gradient(90% 120% at 50% 50%, color-mix(in srgb, var(--hb-xg7-c) 14%, transparent), transparent 70%),
    linear-gradient(180deg, #131313, #0e0e0e);
  transform: scale(1.012);
}
.hb-xg7[data-variant="panel"] .hb-xg7-zone { flex-direction: column; justify-content: center; gap: 4px; min-height: 150px; padding: 20px; text-align: center; }
.hb-xg7[data-variant="strip"] .hb-xg7-zone { gap: 12px; min-height: 60px; padding: 10px 10px 10px 12px; }
.hb-xg7-orb {
  position: relative;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: none;
  border-radius: 12px;
  background: linear-gradient(180deg, #232323, #161616);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 8px 18px -10px rgba(0, 0, 0, 0.9), 0 0 0 1px #262626;
  color: #a1a1a1;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.25s ease;
}
.hb-xg7[data-variant="panel"] .hb-xg7-orb { margin-bottom: 8px; }
.hb-xg7[data-variant="strip"] .hb-xg7-orb { width: 36px; height: 36px; border-radius: 10px; }
.hb-xg7-orb svg { width: 18px; height: 18px; }
.hb-xg7-orb svg path:last-child { transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xg7-zone:hover .hb-xg7-orb { color: #ededed; }
.hb-xg7[data-over="true"] .hb-xg7-orb { transform: translateY(-5px) scale(1.06); color: var(--hb-xg7-c); }
.hb-xg7[data-over="true"] .hb-xg7-orb svg path:last-child { transform: translateY(-2px); }
.hb-xg7-copy { min-width: 0; flex: 1; }
.hb-xg7-title { margin: 0; font-size: 13.5px; font-weight: 500; }
.hb-xg7-title u { text-decoration: none; color: var(--hb-xg7-c); box-shadow: inset 0 -1px 0 color-mix(in srgb, var(--hb-xg7-c) 50%, transparent); }
.hb-xg7-hint { margin: 2px 0 0; font-size: 11.5px; color: #6f6f6f; }
.hb-xg7[data-variant="strip"] .hb-xg7-title, .hb-xg7[data-variant="strip"] .hb-xg7-hint { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xg7-browse {
  flex: none;
  height: 30px;
  margin: 0;
  padding: 0 12px;
  border: 1px solid #2e2e2e;
  border-radius: 999px;
  background: linear-gradient(180deg, #1f1f1f, #171717);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  color: #ededed;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  pointer-events: none;
}
.hb-xg7-list { display: flex; flex-direction: column; gap: 6px; margin: 8px 0 0; padding: 0; list-style: none; }
.hb-xg7-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 6px 0 8px;
  border: 1px solid #222;
  border-radius: 12px;
  background: #111;
  overflow: hidden;
  animation: hb-xg7-row 0.38s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xg7-row::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: calc(var(--hb-xg7-p) * 100%);
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xg7-c) 40%, transparent), var(--hb-xg7-c));
  transition: width 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease 0.3s;
}
.hb-xg7-row[data-status="done"]::after, .hb-xg7-row[data-status="error"]::after { opacity: 0; }
.hb-xg7-row[data-status="error"] { border-color: rgba(255, 92, 92, 0.35); background: linear-gradient(90deg, rgba(255, 92, 92, 0.07), #111 60%); animation: hb-xg7-shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xg7-doc { position: relative; width: 26px; height: 32px; flex: none; }
.hb-xg7-doc svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-xg7-doc span {
  position: absolute;
  left: -3px;
  bottom: 4px;
  padding: 1px 3px;
  border-radius: 3px;
  background: var(--hb-xg7-t);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 7.5px;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  text-transform: uppercase;
}
.hb-xg7-meta { flex: 1; min-width: 0; line-height: 1.25; }
.hb-xg7-name { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12.5px; }
.hb-xg7-sub { display: block; font-size: 11px; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-xg7-row[data-status="error"] .hb-xg7-sub { color: #ff7a7a; }
.hb-xg7-row[data-status="done"] .hb-xg7-sub { color: #5fd38d; }
.hb-xg7-state { position: relative; display: grid; place-items: center; width: 22px; height: 22px; flex: none; }
.hb-xg7-state svg { width: 100%; height: 100%; }
.hb-xg7-pr { transform: rotate(-90deg); transform-origin: center; }
.hb-xg7-pr circle { fill: none; stroke-width: 2.2; }
.hb-xg7-pr circle:last-child { stroke: var(--hb-xg7-c); stroke-linecap: round; transition: stroke-dashoffset 0.25s ease; }
.hb-xg7-ok { color: #5fd38d; animation: hb-xg7-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xg7-x {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  flex: none;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #6f6f6f;
  cursor: pointer;
}
.hb-xg7-x:hover { background: rgba(255, 255, 255, 0.06); color: #ededed; }
.hb-xg7-x:focus-visible { outline: 2px solid var(--hb-xg7-c); outline-offset: -2px; }
.hb-xg7-x svg { width: 11px; height: 11px; }
.hb-xg7-av { display: flex; align-items: center; gap: 16px; }
.hb-xg7-avz {
  position: relative;
  display: grid;
  place-items: center;
  width: 88px;
  height: 88px;
  flex: none;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 30%, #1d1d1d, #101010);
  cursor: pointer;
  outline: 0;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xg7-avz:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-xg7-c); }
.hb-xg7[data-over="true"] .hb-xg7-avz { transform: scale(1.05); }
.hb-xg7-avz .hb-xg7-ants rect { stroke-dasharray: 4 4; }
.hb-xg7-img { position: absolute; inset: 6px; border-radius: 50%; background-size: cover; background-position: center; }
.hb-xg7-initials { font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 24px; font-weight: 600; color: #8f8f8f; letter-spacing: 0.02em; }
.hb-xg7-veil {
  position: absolute;
  inset: 6px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.hb-xg7-avz:hover .hb-xg7-veil, .hb-xg7[data-over="true"] .hb-xg7-veil { opacity: 1; }
.hb-xg7-ring { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); pointer-events: none; }
.hb-xg7-ring circle { fill: none; stroke: var(--hb-xg7-c); stroke-width: 3; stroke-linecap: round; transition: stroke-dashoffset 0.25s ease, opacity 0.4s ease; }
.hb-xg7-input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
@keyframes hb-xg7-march { to { stroke-dashoffset: -22; } }
@keyframes hb-xg7-row { from { opacity: 0; transform: translateY(-6px) scale(0.98); } }
@keyframes hb-xg7-pop { from { transform: scale(0.3); opacity: 0; } }
@keyframes hb-xg7-shake { 20%, 60% { transform: translateX(-4px); } 40%, 80% { transform: translateX(4px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xg7 *, .hb-xg7 *::after { transition: none !important; animation: none !important; }
}
`;

const typeColors: Record<string, string> = {
  pdf: "#e5484d",
  png: "#8e4ec6",
  jpg: "#8e4ec6",
  jpeg: "#8e4ec6",
  webp: "#8e4ec6",
  svg: "#d6409f",
  fig: "#a259ff",
  zip: "#c08532",
  csv: "#30a46c",
  xlsx: "#30a46c",
  doc: "#3e63dd",
  docx: "#3e63dd",
  mp4: "#e54666",
  mov: "#e54666",
  txt: "#6f6f6f",
  md: "#6f6f6f",
};

function extOf(name: string) {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(i + 1).toLowerCase() : "file";
}

function bytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function accepts(file: File, accept?: string) {
  if (!accept) return true;
  const list = accept.split(",").map((a) => a.trim().toLowerCase()).filter(Boolean);
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return list.some((a) =>
    a.startsWith(".") ? name.endsWith(a) : a.endsWith("/*") ? type.startsWith(a.slice(0, -1)) : type === a,
  );
}

function Ants({ radius }: { radius: number | "50%" }) {
  return (
    <svg className="hb-xg7-ants" aria-hidden="true">
      <rect x="0.75" y="0.75" rx={radius} ry={radius} style={{ width: "calc(100% - 1.5px)", height: "calc(100% - 1.5px)" }} />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11.5v1.8A1.7 1.7 0 0 0 4.7 15h8.6a1.7 1.7 0 0 0 1.7-1.7v-1.8" />
      <path d="M9 11V3.2M5.8 6.2L9 3l3.2 3.2" />
    </svg>
  );
}

export function InputFileDrop({
  variant = "panel",
  accept,
  maxSize = 10 * 1024 * 1024,
  multiple = true,
  title,
  hint,
  defaultItems = [],
  onFilesChange,
  onUpload,
  accent = "#2f7bff",
  disabled = false,
  className = "",
  style,
  ...rest
}: InputFileDropProps) {
  const id = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const depth = React.useRef(0);
  const counter = React.useRef(0);
  const [items, setItems] = React.useState<InputFileDropItem[]>(defaultItems);
  const [over, setOver] = React.useState(false);
  const itemsRef = React.useRef(items);
  const changeRef = React.useRef(onFilesChange);

  React.useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  React.useEffect(() => {
    changeRef.current = onFilesChange;
  }, [onFilesChange]);

  const mounted = React.useRef(false);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    changeRef.current?.(items);
  }, [items]);

  const update = React.useCallback((fn: (prev: InputFileDropItem[]) => InputFileDropItem[]) => {
    setItems(fn);
  }, []);

  const uploading = items.some((i) => i.status === "uploading" && !i.file);

  React.useEffect(() => {
    if (!uploading) return;
    let tick = 0;
    const t = window.setInterval(() => {
      tick++;
      update((prev) =>
        prev.map((it) => {
          if (it.status !== "uploading" || it.file) return it;
          const step = 0.015 + (hash(`${it.id}:${tick}`) % 100) / 2200;
          const p = Math.min(1, it.progress + step);
          return { ...it, progress: p, status: p >= 1 ? "done" : "uploading" };
        }),
      );
    }, 200);
    return () => window.clearInterval(t);
  }, [uploading, update]);

  React.useEffect(() => {
    return () => {
      for (const it of itemsRef.current) if (it.preview) URL.revokeObjectURL(it.preview);
    };
  }, []);

  function add(list: FileList | File[]) {
    const files = Array.from(list);
    if (!files.length) return;
    const chosen = variant === "avatar" || !multiple ? files.slice(0, 1) : files;
    const fresh: InputFileDropItem[] = chosen.map((f) => {
      counter.current += 1;
      const tooBig = f.size > maxSize;
      const wrong = !accepts(f, accept);
      const isImage = f.type.startsWith("image/");
      return {
        id: `${id}-${counter.current}`,
        name: f.name,
        size: f.size,
        type: f.type,
        progress: 0,
        status: tooBig || wrong ? "error" : "uploading",
        error: wrong ? "File type not allowed" : tooBig ? `Larger than ${bytes(maxSize)}` : undefined,
        file: onUpload ? f : undefined,
        preview: isImage && !tooBig && !wrong ? URL.createObjectURL(f) : undefined,
      };
    });
    if (variant === "avatar" || !multiple) {
      for (const it of itemsRef.current) if (it.preview) URL.revokeObjectURL(it.preview);
      update(() => fresh);
    } else update((prev) => [...prev, ...fresh]);
    if (onUpload) {
      fresh.forEach((it, k) => {
        if (it.status !== "uploading") return;
        onUpload(chosen[k], (p) =>
          update((prev) => prev.map((x) => (x.id === it.id ? { ...x, progress: Math.max(0, Math.min(1, p)) } : x))),
        )
          .then(() => update((prev) => prev.map((x) => (x.id === it.id ? { ...x, progress: 1, status: "done" } : x))))
          .catch((err: unknown) =>
            update((prev) =>
              prev.map((x) =>
                x.id === it.id ? { ...x, status: "error", error: err instanceof Error ? err.message : "Upload failed" } : x,
              ),
            ),
          );
      });
    }
  }

  function remove(target: InputFileDropItem) {
    if (target.preview) URL.revokeObjectURL(target.preview);
    update((prev) => prev.filter((x) => x.id !== target.id));
  }

  const zoneEvents = {
    role: "button" as const,
    tabIndex: disabled ? -1 : 0,
    "aria-describedby": `${id}-hint`,
    onClick: () => inputRef.current?.click(),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    onPaste: (e: React.ClipboardEvent) => {
      if (e.clipboardData.files.length) {
        e.preventDefault();
        add(e.clipboardData.files);
      }
    },
    onDragEnter: (e: React.DragEvent) => {
      e.preventDefault();
      depth.current += 1;
      setOver(true);
    },
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    onDragLeave: () => {
      depth.current = Math.max(0, depth.current - 1);
      if (depth.current === 0) setOver(false);
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      depth.current = 0;
      setOver(false);
      add(e.dataTransfer.files);
    },
  };

  const typeHint = hint ?? `${accept ? accept.replace(/,/g, ", ").replace(/image\/\*/g, "Images").toUpperCase() : "Any file"} up to ${bytes(maxSize)}`;
  const vars = { "--hb-xg7-c": accent, ...style } as React.CSSProperties;
  const input = (
    <input
      ref={inputRef}
      id={`${id}-in`}
      className="hb-xg7-input"
      type="file"
      accept={variant === "avatar" ? accept ?? "image/*" : accept}
      multiple={variant !== "avatar" && multiple}
      tabIndex={-1}
      aria-hidden="true"
      disabled={disabled}
      onChange={(e) => {
        if (e.target.files) add(e.target.files);
        e.target.value = "";
      }}
    />
  );

  if (variant === "avatar") {
    const it = items[0];
    const p = it?.status === "uploading" ? it.progress : it?.status === "done" ? 1 : 0;
    const c = 2 * Math.PI * 42;
    return (
      <div className={`hb-xg7 ${className}`} style={vars} data-variant={variant} data-over={over} data-disabled={disabled} {...rest}>
        <style href="hb-input-file-drop" precedence="default">{css}</style>
        <div className="hb-xg7-av">
          <div className="hb-xg7-avz" aria-label={it ? "Replace photo" : "Upload photo"} {...zoneEvents}>
            <Ants radius="50%" />
            {it?.preview ? <span className="hb-xg7-img" style={{ backgroundImage: `url(${it.preview})` }} /> : <span className="hb-xg7-initials">{(title ?? "Avery Lin").split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>}
            <span className="hb-xg7-veil" aria-hidden="true">
              {it ? "Replace" : "Upload"}
            </span>
            <svg className="hb-xg7-ring" viewBox="0 0 88 88" aria-hidden="true">
              <circle cx="44" cy="44" r="42" strokeDasharray={c.toFixed(2)} strokeDashoffset={(c * (1 - p)).toFixed(2)} style={{ opacity: it?.status === "uploading" ? 1 : 0 }} />
            </svg>
          </div>
          <div className="hb-xg7-copy">
            <p className="hb-xg7-title">{title ?? "Avery Lin"}</p>
            <p className="hb-xg7-hint" id={`${id}-hint`} aria-live="polite">
              {it?.status === "error"
                ? it.error
                : it?.status === "uploading"
                  ? `Uploading ${Math.round(it.progress * 100)}%`
                  : it?.status === "done"
                    ? "Photo updated"
                    : hint ?? "Drop a square photo, PNG or JPG up to 5 MB"}
            </p>
          </div>
        </div>
        {input}
      </div>
    );
  }

  return (
    <div className={`hb-xg7 ${className}`} style={vars} data-variant={variant} data-over={over} data-disabled={disabled} {...rest}>
      <style href="hb-input-file-drop" precedence="default">{css}</style>
      <div className="hb-xg7-zone" aria-label="Upload files" {...zoneEvents}>
        <Ants radius={16} />
        <span className="hb-xg7-orb">
          <UploadIcon />
        </span>
        <div className="hb-xg7-copy">
          <p className="hb-xg7-title">
            {over ? "Release to upload" : title ?? (
              <>
                Drop files here or <u>browse</u>
              </>
            )}
          </p>
          <p className="hb-xg7-hint" id={`${id}-hint`}>
            {typeHint}
          </p>
        </div>
        {variant === "strip" && (
          <span className="hb-xg7-browse" aria-hidden="true">
            Choose files
          </span>
        )}
      </div>
      {input}
      {items.length > 0 && (
        <ul className="hb-xg7-list" aria-label="Files">
          {items.map((it) => {
            const ext = extOf(it.name);
            const c = 2 * Math.PI * 8;
            return (
              <li
                key={it.id}
                className="hb-xg7-row"
                data-status={it.status}
                style={{ "--hb-xg7-p": it.progress.toFixed(3), "--hb-xg7-t": typeColors[ext] ?? "#5b5b5b" } as React.CSSProperties}
              >
                <span className="hb-xg7-doc" aria-hidden="true">
                  <svg viewBox="0 0 26 32" fill="none">
                    <path d="M4 1.5h12.5L23.5 8.5V28a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 28V4A2.5 2.5 0 0 1 4 1.5z" fill="#1b1b1b" stroke="#333" />
                    <path d="M16.5 1.5V7a1.5 1.5 0 0 0 1.5 1.5h5.5" stroke="#333" />
                  </svg>
                  <span>{ext.slice(0, 4)}</span>
                </span>
                <span className="hb-xg7-meta">
                  <span className="hb-xg7-name">{it.name}</span>
                  <span className="hb-xg7-sub">
                    {it.status === "error"
                      ? it.error
                      : it.status === "done"
                        ? `${bytes(it.size)} · Uploaded`
                        : `${bytes(Math.round(it.size * it.progress))} of ${bytes(it.size)} · ${Math.round(it.progress * 100)}%`}
                  </span>
                </span>
                <span className="hb-xg7-state" aria-hidden="true">
                  {it.status === "uploading" ? (
                    <svg className="hb-xg7-pr" viewBox="0 0 22 22">
                      <circle cx="11" cy="11" r="8" stroke="#262626" />
                      <circle cx="11" cy="11" r="8" strokeDasharray={c.toFixed(2)} strokeDashoffset={(c * (1 - it.progress)).toFixed(2)} />
                    </svg>
                  ) : it.status === "done" ? (
                    <svg className="hb-xg7-ok" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="9" fill="currentColor" opacity="0.16" />
                      <path d="M7 11.3l2.7 2.7L15 8.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 22 22" fill="none" style={{ color: "#ff6b6b" }}>
                      <circle cx="11" cy="11" r="9" fill="currentColor" opacity="0.16" />
                      <path d="M11 6.8v5M11 15v.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                <button type="button" className="hb-xg7-x" aria-label={`Remove ${it.name}`} onClick={() => remove(it)}>
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
