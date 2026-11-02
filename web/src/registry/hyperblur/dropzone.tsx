"use client";

import * as React from "react";

export interface DropzoneFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "done";
  live: boolean;
}

export interface DropzoneRejection {
  name: string;
  reason: string;
}

export interface DropzoneInitialFile {
  name: string;
  size: number;
  progress?: number;
}

export interface DropzoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop" | "children"> {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  simulate?: boolean;
  disabled?: boolean;
  title?: string;
  hint?: string;
  size?: "md" | "sm";
  accent?: string;
  defaultFiles?: DropzoneInitialFile[];
  onFiles?: (files: File[]) => void;
  onReject?: (rejections: DropzoneRejection[]) => void;
  onRemove?: (file: DropzoneFile) => void;
}

const css = `
.hb-drz {
  --hb-drz-accent: #2f7bff;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  text-align: left;
}
.hb-drz *, .hb-drz *::before, .hb-drz *::after { box-sizing: border-box; }
.hb-drz-zone {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 148px;
  padding: 24px 20px;
  border-radius: 16px;
  background: #0f0f0f;
  text-align: center;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.hb-drz[data-size="sm"] .hb-drz-zone {
  flex-direction: row;
  justify-content: flex-start;
  gap: 12px;
  min-height: 0;
  padding: 12px 14px;
  text-align: left;
}
.hb-drz-zone:hover { background: #131313; }
.hb-drz-zone[data-drag="true"] {
  background: color-mix(in srgb, var(--hb-drz-accent) 9%, #0f0f0f);
  transform: scale(1.01);
}
.hb-drz-zone[aria-disabled="true"] { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
.hb-drz-zone:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-drz-accent); }
.hb-drz-border {
  position: absolute;
  inset: 0.75px;
  width: calc(100% - 1.5px);
  height: calc(100% - 1.5px);
  overflow: visible;
  pointer-events: none;
}
.hb-drz-border rect {
  fill: none;
  stroke: #333333;
  stroke-width: 1.5;
  stroke-dasharray: 6 6;
  transition: stroke 0.2s ease;
}
.hb-drz-zone:hover .hb-drz-border rect { stroke: #4a4a4a; }
.hb-drz-zone[data-drag="true"] .hb-drz-border rect {
  stroke: var(--hb-drz-accent);
  animation: hb-drz-march 0.7s linear infinite;
}
.hb-drz-icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #171717;
  color: #a1a1a1;
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-drz[data-size="sm"] .hb-drz-icon { width: 34px; height: 34px; border-radius: 10px; }
.hb-drz-icon svg { width: 20px; height: 20px; }
.hb-drz-zone[data-drag="true"] .hb-drz-icon {
  border-color: var(--hb-drz-accent);
  color: var(--hb-drz-accent);
  transform: translateY(-3px);
}
.hb-drz-copy { min-width: 0; }
.hb-drz-title { margin: 0; color: #ededed; font-size: 14px; font-weight: 500; line-height: 1.35; }
.hb-drz[data-size="sm"] .hb-drz-title { font-size: 13px; }
.hb-drz-title u { color: var(--hb-drz-accent); text-decoration: none; }
.hb-drz-hint { margin: 2px 0 0; color: #8f8f8f; font-size: 12px; line-height: 1.4; }
.hb-drz-errors {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-drz-error {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: #ff6369;
  font-size: 12px;
  line-height: 1.4;
  animation: hb-drz-rise 0.2s ease both;
}
.hb-drz-error svg { flex: none; width: 13px; height: 13px; margin-top: 1px; }
.hb-drz-list { display: flex; flex-direction: column; gap: 6px; margin: 0; padding: 0; list-style: none; }
.hb-drz-file {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 8px 8px 8px 10px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #111111;
  animation: hb-drz-rise 0.24s ease both;
}
.hb-drz-ext {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--hb-drz-accent) 14%, #171717);
  color: var(--hb-drz-accent);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.hb-drz-main { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.hb-drz-line { display: flex; align-items: baseline; gap: 8px; min-width: 0; }
.hb-drz-name { flex: 1; min-width: 0; overflow: hidden; color: #ededed; font-size: 12.5px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.hb-drz-size { flex: none; color: #8f8f8f; font-size: 11.5px; font-variant-numeric: tabular-nums; }
.hb-drz-bar { position: relative; height: 4px; overflow: hidden; border-radius: 999px; background: #232323; }
.hb-drz-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--hb-drz-accent);
  transform: scaleX(var(--hb-drz-p, 0));
  transform-origin: 0 50%;
  transition: transform 0.25s ease, background-color 0.3s ease;
}
.hb-drz-fill[data-live="true"]::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
  transform: translateX(-100%);
  animation: hb-drz-sweep 1.2s ease-in-out infinite;
}
.hb-drz-file[data-status="done"] .hb-drz-fill { background: #3dd68c; }
.hb-drz-side { display: flex; align-items: center; gap: 2px; }
.hb-drz-pct { min-width: 32px; color: #a1a1a1; font-size: 11.5px; font-variant-numeric: tabular-nums; text-align: right; }
.hb-drz-check { width: 18px; height: 18px; margin-right: 6px; color: #3dd68c; }
.hb-drz-check circle { fill: rgba(61, 214, 140, 0.14); stroke: none; }
.hb-drz-check path { stroke-dasharray: 14; stroke-dashoffset: 14; animation: hb-drz-draw 0.35s 0.05s ease forwards; }
.hb-drz-rm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #6f6f6f;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.hb-drz-rm:hover { background: rgba(255, 255, 255, 0.08); color: #ededed; }
.hb-drz-rm:focus-visible { outline: 2px solid var(--hb-drz-accent); outline-offset: 1px; }
.hb-drz-rm svg { width: 13px; height: 13px; }
@keyframes hb-drz-march { to { stroke-dashoffset: -24; } }
@keyframes hb-drz-sweep { to { transform: translateX(100%); } }
@keyframes hb-drz-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-drz-rise { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-drz-zone, .hb-drz-icon, .hb-drz-fill, .hb-drz-rm, .hb-drz-border rect { transition: none; }
  .hb-drz-zone[data-drag="true"] .hb-drz-border rect, .hb-drz-fill[data-live="true"]::after, .hb-drz-file, .hb-drz-error { animation: none; }
  .hb-drz-check path { animation: none; stroke-dashoffset: 0; }
}
`;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function hashText(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i += 1) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

function matchesAccept(file: File, accept: string) {
  const tokens = accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  if (tokens.length === 0) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return tokens.some((token) => {
    if (token.startsWith(".")) return name.endsWith(token);
    if (token.includes("/")) {
      const [group, sub] = token.split("/");
      return sub === "*" ? type.startsWith(`${group}/`) : type === token;
    }
    return false;
  });
}

function describeAccept(accept: string) {
  return accept
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => (t.startsWith(".") ? t.slice(1).toUpperCase() : t.split("/")[0]))
    .join(", ");
}

function extOf(name: string) {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1, dot + 5) : "file";
}

const uploadIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" />
    <path d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2" />
  </svg>
);

const alertIcon = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" />
    <path d="M8 4.75v3.5M8 11h.01" />
  </svg>
);

export function Dropzone({
  accept = "",
  maxSize = 10 * 1024 * 1024,
  maxFiles = 6,
  multiple = true,
  simulate = false,
  disabled = false,
  title = "Drop files here or browse",
  hint,
  size = "md",
  accent = "#2f7bff",
  defaultFiles,
  onFiles,
  onReject,
  onRemove,
  className = "",
  style,
  ...rest
}: DropzoneProps) {
  const [files, setFiles] = React.useState<DropzoneFile[]>(() =>
    (defaultFiles ?? []).map((f, i) => {
      const progress = Math.min(100, Math.max(0, f.progress ?? 100));
      return {
        id: `initial-${i}`,
        name: f.name,
        size: f.size,
        progress,
        status: progress >= 100 ? "done" : "uploading",
        live: false,
      };
    }),
  );
  const [errors, setErrors] = React.useState<string[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const input = React.useRef<HTMLInputElement>(null);
  const depth = React.useRef(0);
  const seq = React.useRef(0);
  const hintId = React.useId();

  const running = simulate && files.some((f) => f.live && f.status === "uploading");

  React.useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (!f.live || f.status !== "uploading") return f;
          const step = 2 + (hashText(f.id) % 5) + (hashText(`${f.id}${Math.floor(f.progress)}`) % 7);
          const progress = Math.min(100, f.progress + step);
          return { ...f, progress, status: progress >= 100 ? "done" : "uploading" };
        }),
      );
    }, 120);
    return () => window.clearInterval(timer);
  }, [running]);

  function ingest(list: FileList | File[] | null) {
    if (!list || disabled) return;
    let incoming = Array.from(list);
    if (incoming.length === 0) return;
    const problems: string[] = [];
    const rejected: DropzoneRejection[] = [];
    const reject = (name: string, reason: string) => {
      rejected.push({ name, reason });
      problems.push(`${name}: ${reason}`);
    };
    let base = files;
    if (!multiple) {
      incoming = incoming.slice(0, 1);
      base = [];
    }
    const accepted: File[] = [];
    for (const file of incoming) {
      if (accept && !matchesAccept(file, accept)) {
        reject(file.name, `type not accepted${describeAccept(accept) ? `, use ${describeAccept(accept)}` : ""}`);
      } else if (file.size > maxSize) {
        reject(file.name, `${formatBytes(file.size)} is over the ${formatBytes(maxSize)} limit`);
      } else if (base.length + accepted.length >= maxFiles) {
        reject(file.name, `only ${maxFiles} ${maxFiles === 1 ? "file is" : "files are"} allowed`);
      } else {
        accepted.push(file);
      }
    }
    setErrors(problems);
    if (rejected.length) onReject?.(rejected);
    if (accepted.length === 0) return;
    const entries: DropzoneFile[] = accepted.map((file) => {
      seq.current += 1;
      return {
        id: `file-${seq.current}-${file.name}`,
        name: file.name,
        size: file.size,
        progress: simulate ? 0 : 100,
        status: simulate ? "uploading" : "done",
        live: true,
      };
    });
    setFiles([...base, ...entries]);
    onFiles?.(accepted);
  }

  function remove(file: DropzoneFile) {
    setFiles((prev) => prev.filter((f) => f.id !== file.id));
    onRemove?.(file);
  }

  const limits = [
    accept ? describeAccept(accept) : "Any file type",
    `up to ${formatBytes(maxSize)}`,
  ].join(", ");
  const vars = { "--hb-drz-accent": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-drz ${className}`} style={vars} data-size={size} {...rest}>
      <style href="hb-dropzone" precedence="default">{css}</style>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-describedby={hintId}
        className="hb-drz-zone"
        data-drag={dragging}
        onClick={() => input.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            input.current?.click();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          depth.current += 1;
          if (!disabled) setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          depth.current = Math.max(0, depth.current - 1);
          if (depth.current === 0) setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          depth.current = 0;
          setDragging(false);
          ingest(e.dataTransfer.files);
        }}
      >
        <svg className="hb-drz-border" aria-hidden="true">
          <rect width="100%" height="100%" rx="15" />
        </svg>
        <span className="hb-drz-icon">{uploadIcon}</span>
        <div className="hb-drz-copy">
          <p className="hb-drz-title">{title}</p>
          <p id={hintId} className="hb-drz-hint">
            {hint ?? limits}
          </p>
        </div>
        <input
          ref={input}
          type="file"
          hidden
          tabIndex={-1}
          accept={accept || undefined}
          multiple={multiple}
          disabled={disabled}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            ingest(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
      {errors.length > 0 && (
        <ul className="hb-drz-errors" role="alert">
          {errors.slice(0, 3).map((message) => (
            <li key={message} className="hb-drz-error">
              {alertIcon}
              <span>{message}</span>
            </li>
          ))}
        </ul>
      )}
      {files.length > 0 && (
        <ul className="hb-drz-list" aria-label="Selected files">
          {files.map((file) => (
            <li key={file.id} className="hb-drz-file" data-status={file.status}>
              <span className="hb-drz-ext" aria-hidden="true">
                {extOf(file.name)}
              </span>
              <div className="hb-drz-main">
                <div className="hb-drz-line">
                  <span className="hb-drz-name" title={file.name}>
                    {file.name}
                  </span>
                  <span className="hb-drz-size">{formatBytes(file.size)}</span>
                </div>
                <div
                  className="hb-drz-bar"
                  role="progressbar"
                  aria-label={`Upload progress for ${file.name}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(file.progress)}
                >
                  <span
                    className="hb-drz-fill"
                    data-live={file.status === "uploading"}
                    style={{ "--hb-drz-p": (file.progress / 100).toFixed(3) } as React.CSSProperties}
                  />
                </div>
              </div>
              <div className="hb-drz-side">
                {file.status === "done" ? (
                  <svg className="hb-drz-check" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Uploaded">
                    <circle cx="10" cy="10" r="9" />
                    <path d="m6 10.3 2.7 2.7L14 7.6" />
                  </svg>
                ) : (
                  <span className="hb-drz-pct">{Math.round(file.progress)}%</span>
                )}
                <button type="button" className="hb-drz-rm" aria-label={`Remove ${file.name}`} onClick={() => remove(file)}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                    <path d="m3.5 3.5 9 9m0-9-9 9" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
