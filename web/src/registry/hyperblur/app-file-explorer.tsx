"use client";

import * as React from "react";

export type ExplorerKind = "folder" | "code" | "image" | "doc" | "sheet" | "pdf" | "audio";

export interface ExplorerNode {
  id: string;
  name: string;
  kind: ExplorerKind;
  size?: string;
  modified?: string;
  children?: ExplorerNode[];
  lines?: string[];
  tint?: string;
  dimensions?: string;
  duration?: string;
}

export interface AppFileExplorerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tree?: ExplorerNode[];
  rootLabel?: string;
  path?: string[];
  defaultPath?: string[];
  onPathChange?: (path: string[]) => void;
  onOpen?: (node: ExplorerNode) => void;
  onShare?: (node: ExplorerNode) => void;
  accent?: string;
}

const sampleTree: ExplorerNode[] = [
  {
    id: "src",
    name: "src",
    kind: "folder",
    modified: "Today, 10:42",
    children: [
      {
        id: "components",
        name: "components",
        kind: "folder",
        modified: "Today, 10:42",
        children: [
          {
            id: "button",
            name: "Button.tsx",
            kind: "code",
            size: "2.1 KB",
            modified: "Today, 10:42",
            lines: [
              'import { forwardRef } from "react";',
              'import { cx } from "../lib/cx";',
              "",
              "export const Button = forwardRef(",
              "  function Button({ tone = \"primary\", ...props }, ref) {",
              "    return (",
              "      <button",
              "        ref={ref}",
              "        className={cx(\"btn\", `btn-${tone}`)}",
              "        {...props}",
              "      />",
              "    );",
              "  },",
              ");",
            ],
          },
          { id: "sheet", name: "Sheet.tsx", kind: "code", size: "4.8 KB", modified: "Yesterday", lines: ['import { useEffect } from "react";', "", "export function Sheet({ open, onClose }) {", "  useEffect(() => {", "    if (!open) return;", '    document.body.style.overflow = "hidden";', "  }, [open]);", "  return null;", "}"] },
          { id: "avatar", name: "Avatar.tsx", kind: "code", size: "1.3 KB", modified: "Oct 28", lines: ["export function Avatar({ name }) {", "  const initials = name.slice(0, 2);", "  return <span className=\"avatar\">{initials}</span>;", "}"] },
          { id: "tabbar", name: "TabBar.tsx", kind: "code", size: "3.6 KB", modified: "Oct 24", lines: ['import { usePathname } from "../router";', "", "export function TabBar() {", "  const path = usePathname();", "  return <nav aria-label=\"Main\" />;", "}"] },
        ],
      },
      { id: "hooks", name: "hooks", kind: "folder", modified: "Oct 30", children: [{ id: "session", name: "useSession.ts", kind: "code", size: "1.9 KB", modified: "Oct 30", lines: ['import { useSyncExternalStore } from "react";', 'import { store } from "./store";', "", "export function useSession() {", "  return useSyncExternalStore(store.subscribe, store.get);", "}"] }] },
      { id: "app", name: "App.tsx", kind: "code", size: "5.2 KB", modified: "Today, 09:15", lines: ['import { Router } from "./router";', 'import { TabBar } from "./components/TabBar";', "", "export default function App() {", "  return (", "    <Router>", "      <TabBar />", "    </Router>", "  );", "}"] },
      { id: "theme", name: "theme.ts", kind: "code", size: "860 B", modified: "Oct 12", lines: ["export const theme = {", '  accent: "#5b8cff",', "  radius: 12,", "};"] },
    ],
  },
  {
    id: "design",
    name: "design",
    kind: "folder",
    modified: "Nov 2",
    children: [
      { id: "hero", name: "onboarding-hero.png", kind: "image", size: "1.8 MB", modified: "Nov 2", tint: "#ff8a5b", dimensions: "2400 × 1600" },
      { id: "icons", name: "tab-icons@3x.png", kind: "image", size: "420 KB", modified: "Oct 29", tint: "#5b8cff", dimensions: "1080 × 360" },
      { id: "splash", name: "splash-dark.png", kind: "image", size: "960 KB", modified: "Oct 20", tint: "#9a7bff", dimensions: "1290 × 2796" },
    ],
  },
  {
    id: "docs",
    name: "docs",
    kind: "folder",
    modified: "Nov 4",
    children: [
      { id: "brief", name: "Launch brief.docx", kind: "doc", size: "86 KB", modified: "Nov 4" },
      { id: "metrics", name: "Beta metrics.xlsx", kind: "sheet", size: "212 KB", modified: "Nov 3" },
      { id: "msa", name: "Vendor MSA.pdf", kind: "pdf", size: "1.1 MB", modified: "Oct 18" },
    ],
  },
  {
    id: "audio",
    name: "audio",
    kind: "folder",
    modified: "Oct 26",
    children: [
      { id: "vo", name: "welcome-voiceover.wav", kind: "audio", size: "6.4 MB", modified: "Oct 26", duration: "0:38" },
      { id: "chime", name: "success-chime.wav", kind: "audio", size: "210 KB", modified: "Oct 26", duration: "0:02" },
    ],
  },
  { id: "readme", name: "README.md", kind: "doc", size: "3.4 KB", modified: "Oct 30" },
  { id: "pkg", name: "package.json", kind: "code", size: "1.2 KB", modified: "Nov 1", lines: ["{", '  "name": "harbor-mobile",', '  "version": "2.4.0",', '  "private": true', "}"] },
];

const kindLabel: Record<ExplorerKind, string> = { folder: "Folder", code: "Source file", image: "PNG image", doc: "Document", sheet: "Spreadsheet", pdf: "PDF document", audio: "WAV audio" };
const kindColor: Record<ExplorerKind, string> = { folder: "#6aa2ff", code: "#c4b5fd", image: "#ff9f7a", doc: "#8fb8ff", sheet: "#5ed39b", pdf: "#ff7a7a", audio: "#f5c25b" };

const hash = (s: string, i: number) => {
  let h = 2166136261 ^ i;
  for (let k = 0; k < s.length; k++) h = Math.imul(h ^ s.charCodeAt(k), 16777619);
  return (h >>> 0) / 4294967295;
};

function Icon({ kind }: { kind: ExplorerKind }) {
  const c = kindColor[kind];
  if (kind === "folder")
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M2.5 5.5A1.5 1.5 0 0 1 4 4h3.6l1.6 1.8H16a1.5 1.5 0 0 1 1.5 1.5v7.2A1.5 1.5 0 0 1 16 16H4a1.5 1.5 0 0 1-1.5-1.5Z" fill={c} opacity="0.9" />
        <path d="M2.5 8h15v6.5A1.5 1.5 0 0 1 16 16H4a1.5 1.5 0 0 1-1.5-1.5Z" fill={c} />
      </svg>
    );
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 2.5h6.5L15.5 6.5v10A1 1 0 0 1 14.5 17.5h-9.5A1 1 0 0 1 4 16.5v-13A1 1 0 0 1 5 2.5Z" fill="#1f1f1f" stroke={c} strokeWidth="1.2" />
      <path d="M11.5 2.5v4h4" fill="none" stroke={c} strokeWidth="1.2" />
      {kind === "code" && <path d="M8.2 10 6.6 11.6l1.6 1.6M11.8 10l1.6 1.6-1.6 1.6" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />}
      {kind === "image" && <path d="m6.5 14.5 2.4-3 1.7 2 1.4-1.5 1.5 2.5Z" fill={c} />}
      {(kind === "doc" || kind === "pdf") && <path d="M7 10h6M7 12.2h6M7 14.4h4" stroke={c} strokeWidth="1.1" strokeLinecap="round" />}
      {kind === "sheet" && <path d="M6.8 9.8h6.4v4.8H6.8ZM6.8 12.2h6.4M10 9.8v4.8" fill="none" stroke={c} strokeWidth="1.1" />}
      {kind === "audio" && <path d="M7 12.5v1M8.6 11v4M10.2 10v6M11.8 11.5v3M13.2 12.3v1.4" stroke={c} strokeWidth="1.1" strokeLinecap="round" />}
    </svg>
  );
}

const keywords = new Set(["import", "from", "export", "const", "function", "return", "default", "if", "type", "interface", "async", "await"]);

function Code({ lines }: { lines: string[] }) {
  return (
    <div className="hb-wj2-code" role="presentation">
      {lines.slice(0, 14).map((line, i) => (
        <div key={i} className="hb-wj2-ln">
          <span className="hb-wj2-no">{i + 1}</span>
          <span>
            {line.split(/("[^"]*"|`[^`]*`|\b[A-Za-z_]+\b|<\/?[A-Z][A-Za-z]*)/).map((part, k) => {
              if (!part) return null;
              if (/^["`]/.test(part)) return <span key={k} className="hb-wj2-s">{part}</span>;
              if (keywords.has(part)) return <span key={k} className="hb-wj2-k">{part}</span>;
              if (/^<\/?[A-Z]/.test(part)) return <span key={k} className="hb-wj2-t">{part}</span>;
              if (/^[A-Z][a-z]/.test(part)) return <span key={k} className="hb-wj2-f">{part}</span>;
              return <React.Fragment key={k}>{part}</React.Fragment>;
            })}
          </span>
        </div>
      ))}
    </div>
  );
}

function Preview({ node }: { node: ExplorerNode }) {
  const [playing, setPlaying] = React.useState(false);
  if (node.kind === "code") return <Code lines={node.lines ?? []} />;
  if (node.kind === "image") {
    const t = node.tint ?? "#5b8cff";
    return (
      <div className="hb-wj2-img" style={{ "--t": t } as React.CSSProperties}>
        <span className="hb-wj2-sun" />
        <span className="hb-wj2-hill" data-n="1" />
        <span className="hb-wj2-hill" data-n="2" />
        <span className="hb-wj2-dim">{node.dimensions}</span>
      </div>
    );
  }
  if (node.kind === "audio")
    return (
      <div className="hb-wj2-audio" data-playing={playing}>
        <button type="button" className="hb-wj2-play" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying((p) => !p)}>
          {playing ? (
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.2v9.6L12.5 8Z" fill="currentColor" /></svg>
          )}
        </button>
        <div className="hb-wj2-wave">
          {Array.from({ length: 42 }, (_, i) => {
            const v = 0.18 + 0.82 * Math.abs(Math.sin(i * 0.45 + hash(node.id, i) * 2.4)) * (0.55 + 0.45 * hash(node.id, i + 99));
            return <span key={i} style={{ height: `${(v * 100).toFixed(1)}%`, "--i": i } as React.CSSProperties} />;
          })}
        </div>
        <span className="hb-wj2-dur">{node.duration}</span>
      </div>
    );
  if (node.kind === "sheet")
    return (
      <div className="hb-wj2-sheet" role="presentation">
        {[["Week", "Signups", "D7 ret."], ["W40", "1,284", "41%"], ["W41", "1,612", "44%"], ["W42", "2,038", "47%"], ["W43", "2,415", "52%"]].map((row, r) => (
          <div key={r} className="hb-wj2-row" data-head={r === 0}>
            {row.map((c, k) => (
              <span key={k}>{c}</span>
            ))}
          </div>
        ))}
      </div>
    );
  if (node.kind === "folder") {
    const kids = node.children ?? [];
    return (
      <div className="hb-wj2-folder">
        <div className="hb-wj2-big"><Icon kind="folder" /></div>
        <div className="hb-wj2-chips">
          {kids.slice(0, 4).map((k) => (
            <span key={k.id}><Icon kind={k.kind} />{k.name}</span>
          ))}
          {kids.length > 4 && <span>+{kids.length - 4} more</span>}
        </div>
      </div>
    );
  }
  return (
    <div className="hb-wj2-page" data-kind={node.kind}>
      <b>{node.name.replace(/\.[a-z]+$/, "")}</b>
      {Array.from({ length: 7 }, (_, i) => (
        <span key={i} style={{ width: `${(58 + hash(node.id, i) * 40).toFixed(0)}%` }} />
      ))}
    </div>
  );
}

const css = `
.hb-wj2 {
  --hb-wj2-a: #2f7bff;
  box-sizing: border-box;
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 440px;
  font-family: inherit;
  font-size: 12.5px;
  color: #ededed;
  background: #0f0f0f;
  border: 1px solid #262626;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 70px -40px rgba(0,0,0,0.9);
}
.hb-wj2 *, .hb-wj2 *::before, .hb-wj2 *::after { box-sizing: border-box; font-family: inherit; }
.hb-wj2-bar { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: linear-gradient(180deg, #151515, #121212); border-bottom: 1px solid #222; }
.hb-wj2-icon { display: grid; place-items: center; flex: none; width: 28px; height: 28px; padding: 0; color: #a1a1a1; background: transparent; border: 1px solid transparent; border-radius: 8px; cursor: pointer; transition: background-color .15s ease, color .15s ease; }
.hb-wj2-icon svg { width: 15px; height: 15px; }
.hb-wj2-icon:hover:not(:disabled) { color: #fff; background: #1d1d1d; border-color: #2a2a2a; }
.hb-wj2-icon:disabled { opacity: 0.35; cursor: default; }
.hb-wj2-crumbs { display: flex; align-items: center; gap: 2px; min-width: 0; flex: 1; margin: 0; padding: 0; list-style: none; overflow: hidden; }
.hb-wj2-crumbs li { display: flex; align-items: center; min-width: 0; gap: 2px; }
.hb-wj2-crumbs li + li::before { content: ""; width: 5px; height: 5px; margin: 0 4px; border-top: 1.4px solid #555; border-right: 1.4px solid #555; transform: rotate(45deg); flex: none; }
.hb-wj2-crumb { min-width: 0; padding: 4px 7px; font: inherit; font-size: 12.5px; color: #a1a1a1; background: none; border: 0; border-radius: 6px; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: background-color .15s ease, color .15s ease; }
.hb-wj2-crumb:hover { color: #fff; background: #1d1d1d; }
.hb-wj2-crumb[aria-current="page"] { color: #fff; font-weight: 600; }
.hb-wj2-main { display: flex; flex: 1; min-height: 0; }
.hb-wj2-cols { display: flex; flex: 1; min-width: 0; overflow-x: auto; scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: #2a2a2a transparent; }
.hb-wj2-col { flex: none; width: 188px; margin: 0; padding: 6px; list-style: none; border-right: 1px solid #1d1d1d; overflow-y: auto; scrollbar-width: none; animation: hb-wj2-in .26s cubic-bezier(.2,.8,.2,1) both; }
.hb-wj2-item { display: flex; align-items: center; gap: 8px; width: 100%; height: 28px; padding: 0 8px; font: inherit; font-size: 12.5px; text-align: left; color: #d4d4d4; background: transparent; border: 0; border-radius: 7px; cursor: pointer; transition: background-color .12s ease, color .12s ease; }
.hb-wj2-item svg { flex: none; width: 16px; height: 16px; }
.hb-wj2-item span { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wj2-item i { flex: none; width: 5px; height: 5px; border-top: 1.4px solid #6a6a6a; border-right: 1.4px solid #6a6a6a; transform: rotate(45deg); font-style: normal; }
.hb-wj2-item:hover { background: #181818; }
.hb-wj2-item[aria-selected="true"] { color: #fff; background: #222; }
.hb-wj2-item[aria-selected="true"][data-active="true"] { background: linear-gradient(180deg, color-mix(in srgb, var(--hb-wj2-a) 92%, #fff 8%), var(--hb-wj2-a)); box-shadow: 0 1px 0 rgba(255,255,255,0.18) inset, 0 6px 16px -10px var(--hb-wj2-a); }
.hb-wj2-item[aria-selected="true"][data-active="true"] i { border-color: #fff; }
.hb-wj2-item:focus-visible { outline: 2px solid var(--hb-wj2-a); outline-offset: -2px; }
.hb-wj2-pv { display: flex; flex-direction: column; flex: none; width: 262px; padding: 14px; gap: 12px; background: linear-gradient(180deg, #121212, #0e0e0e); border-left: 1px solid #1d1d1d; overflow: hidden; animation: hb-wj2-fade .3s ease both; }
.hb-wj2-stage { display: grid; place-items: center; height: 150px; border-radius: 12px; background: #0a0a0a; border: 1px solid #1f1f1f; overflow: hidden; }
.hb-wj2-name { display: flex; align-items: center; gap: 8px; margin: 0; font-size: 13.5px; font-weight: 600; letter-spacing: -0.01em; }
.hb-wj2-name svg { width: 18px; height: 18px; flex: none; }
.hb-wj2-name span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wj2-meta { display: grid; grid-template-columns: auto 1fr; gap: 5px 12px; margin: 0; font-size: 11.5px; }
.hb-wj2-meta dt { color: #7a7a7a; }
.hb-wj2-meta dd { margin: 0; color: #d4d4d4; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-variant-numeric: tabular-nums; }
.hb-wj2-acts { display: flex; gap: 6px; margin-top: auto; }
.hb-wj2-act { flex: 1; height: 30px; font: inherit; font-size: 12px; font-weight: 500; color: #ededed; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; cursor: pointer; transition: background-color .15s ease, border-color .15s ease, transform .1s ease; }
.hb-wj2-act:hover { background: #222; border-color: #363636; }
.hb-wj2-act:active { transform: translateY(1px); }
.hb-wj2-act[data-primary="true"] { color: #fff; background: var(--hb-wj2-a); border-color: transparent; box-shadow: 0 1px 0 rgba(255,255,255,0.2) inset; }
.hb-wj2-act[data-primary="true"]:hover { background: color-mix(in srgb, var(--hb-wj2-a) 88%, #fff); }
.hb-wj2-act:focus-visible, .hb-wj2-crumb:focus-visible, .hb-wj2-icon:focus-visible, .hb-wj2-play:focus-visible { outline: 2px solid var(--hb-wj2-a); outline-offset: 1px; }
.hb-wj2-code { align-self: stretch; justify-self: stretch; padding: 10px 0; font-family: var(--font-mono), ui-monospace, monospace; font-size: 9.5px; line-height: 1.55; color: #cfcfcf; overflow: hidden; white-space: pre; }
.hb-wj2-ln { display: flex; gap: 10px; padding-right: 8px; }
.hb-wj2-no { flex: none; width: 22px; text-align: right; color: #4a4a4a; }
.hb-wj2-k { color: #c792ea; }
.hb-wj2-s { color: #a5d6a7; }
.hb-wj2-t { color: #7fb3ff; }
.hb-wj2-f { color: #ffcb6b; }
.hb-wj2-img { position: relative; align-self: stretch; justify-self: stretch; overflow: hidden; background: radial-gradient(120% 90% at 20% 10%, color-mix(in srgb, var(--t) 55%, #fff) 0%, var(--t) 38%, color-mix(in srgb, var(--t) 40%, #0a0a0a) 100%); }
.hb-wj2-sun { position: absolute; right: 22%; top: 18%; width: 34px; height: 34px; border-radius: 50%; background: #fff6e8; box-shadow: 0 0 30px rgba(255,246,232,0.8); }
.hb-wj2-hill { position: absolute; left: -20%; right: -20%; bottom: -40%; height: 80%; border-radius: 50%; background: color-mix(in srgb, var(--t) 45%, #0a0a0a); }
.hb-wj2-hill[data-n="2"] { left: 30%; right: -50%; bottom: -50%; background: color-mix(in srgb, var(--t) 25%, #0a0a0a); }
.hb-wj2-dim { position: absolute; left: 8px; bottom: 8px; padding: 2px 6px; font-size: 10px; color: #fff; background: rgba(0,0,0,0.45); border-radius: 5px; backdrop-filter: blur(6px); font-variant-numeric: tabular-nums; }
.hb-wj2-audio { display: flex; align-items: center; gap: 10px; width: 100%; padding: 0 14px; }
.hb-wj2-play { display: grid; place-items: center; flex: none; width: 34px; height: 34px; padding: 0; color: #0a0a0a; background: #f5c25b; border: 0; border-radius: 50%; cursor: pointer; box-shadow: 0 6px 18px -8px #f5c25b; transition: transform .15s ease; }
.hb-wj2-play:active { transform: scale(.94); }
.hb-wj2-play svg { width: 14px; height: 14px; }
.hb-wj2-wave { display: flex; align-items: center; gap: 2px; flex: 1; height: 54px; }
.hb-wj2-wave span { flex: 1; min-height: 3px; border-radius: 2px; background: #4a4030; transform-origin: center; }
.hb-wj2-audio[data-playing="true"] .hb-wj2-wave span { animation: hb-wj2-fill 4.2s linear infinite; animation-delay: calc(var(--i) * 0.1s - 4.2s); }
.hb-wj2-dur { flex: none; font-size: 10.5px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-wj2-sheet { display: grid; width: 86%; font-size: 10px; border: 1px solid #263a30; border-radius: 6px; overflow: hidden; font-variant-numeric: tabular-nums; }
.hb-wj2-row { display: grid; grid-template-columns: 1fr 1.2fr 1fr; }
.hb-wj2-row span { padding: 4px 6px; border-top: 1px solid #1d2a23; color: #cfe9db; }
.hb-wj2-row span + span { border-left: 1px solid #1d2a23; text-align: right; }
.hb-wj2-row[data-head="true"] span { color: #5ed39b; font-weight: 600; background: #10201a; border-top: 0; }
.hb-wj2-folder { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.hb-wj2-big svg { width: 54px; height: 54px; filter: drop-shadow(0 8px 16px rgba(80,140,255,0.35)); }
.hb-wj2-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; padding: 0 10px; }
.hb-wj2-chips span { display: inline-flex; align-items: center; gap: 4px; padding: 2px 7px 2px 4px; font-size: 10px; color: #bdbdbd; background: #171717; border: 1px solid #262626; border-radius: 999px; }
.hb-wj2-chips svg { width: 12px; height: 12px; }
.hb-wj2-page { display: flex; flex-direction: column; gap: 6px; width: 104px; height: 132px; padding: 12px 10px; background: #f4f1ea; border-radius: 4px; box-shadow: 0 12px 26px -10px rgba(0,0,0,0.8); transform: rotate(-2deg); }
.hb-wj2-page b { margin-bottom: 4px; font-size: 8.5px; line-height: 1.2; color: #1d1d1d; }
.hb-wj2-page span { height: 3px; border-radius: 2px; background: #cfcac0; }
.hb-wj2-page[data-kind="pdf"] b { color: #c33a3a; }
@keyframes hb-wj2-in { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: none; } }
@keyframes hb-wj2-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-wj2-fill { 0%, 49.9% { background: #f5c25b; } 50%, 100% { background: #4a4030; } }
@container (max-width: 620px) {
  .hb-wj2-pv { display: none; }
  .hb-wj2-col { width: 160px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wj2-col, .hb-wj2-pv, .hb-wj2-audio[data-playing="true"] .hb-wj2-wave span { animation: none; }
  .hb-wj2-cols { scroll-behavior: auto; }
}
`;

export function AppFileExplorer({
  tree = sampleTree,
  rootLabel = "harbor-mobile",
  path,
  defaultPath = ["src", "components", "button"],
  onPathChange,
  onOpen,
  onShare,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: AppFileExplorerProps) {
  const [inner, setInner] = React.useState(defaultPath);
  const current = path ?? inner;
  const [activeCol, setActiveCol] = React.useState(Math.max(0, current.length - 1));
  const [copied, setCopied] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const colsRef = React.useRef<HTMLDivElement>(null);

  const columns: ExplorerNode[][] = [tree];
  const chain: ExplorerNode[] = [];
  for (let i = 0; i < current.length; i++) {
    const node = columns[i]?.find((n) => n.id === current[i]);
    if (!node) break;
    chain.push(node);
    if (node.kind === "folder" && node.children) columns.push(node.children);
  }
  const selected = chain[chain.length - 1];

  const setPath = (next: string[]) => {
    if (path === undefined) setInner(next);
    onPathChange?.(next);
  };

  React.useEffect(() => {
    const el = colsRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [current.length]);

  React.useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(t);
  }, [copied]);

  const focusItem = (col: number, idx: number) => {
    requestAnimationFrame(() => {
      const el = rootRef.current?.querySelector<HTMLButtonElement>(`[data-col="${col}"][data-idx="${idx}"]`);
      el?.focus();
    });
  };

  const choose = (col: number, node: ExplorerNode) => {
    setActiveCol(col);
    setPath([...current.slice(0, col), node.id]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, col: number, idx: number) => {
    const items = columns[col];
    const node = items[idx];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(items.length - 1, Math.max(0, idx + (e.key === "ArrowDown" ? 1 : -1)));
      choose(col, items[next]);
      focusItem(col, next);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (node.kind === "folder" && node.children?.length) {
        setActiveCol(col + 1);
        setPath([...current.slice(0, col), node.id, node.children[0].id]);
        focusItem(col + 1, 0);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (col > 0) {
        const parentIdx = columns[col - 1].findIndex((n) => n.id === current[col - 1]);
        setActiveCol(col - 1);
        setPath(current.slice(0, col));
        focusItem(col - 1, Math.max(0, parentIdx));
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      onOpen?.(node);
    }
  };

  const crumbPath = chain.filter((n) => n.kind === "folder");
  const where = [rootLabel, ...crumbPath.map((n) => n.name)].join("/");
  const goUp = () => {
    const folderDepth = crumbPath.length;
    if (folderDepth === 0) return;
    setPath(current.slice(0, folderDepth - 1));
    setActiveCol(Math.max(0, folderDepth - 1));
  };

  return (
    <div ref={rootRef} className={["hb-wj2", className].filter(Boolean).join(" ")} style={{ "--hb-wj2-a": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-app-file-explorer" precedence="default">{css}</style>
      <div className="hb-wj2-bar">
        <button type="button" className="hb-wj2-icon" aria-label="Enclosing folder" disabled={crumbPath.length === 0} onClick={goUp}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12.5v-9M4 7.5 8 3.5l4 4" /></svg>
        </button>
        <ol className="hb-wj2-crumbs" aria-label="Path">
          <li>
            <button type="button" className="hb-wj2-crumb" aria-current={crumbPath.length === 0 ? "page" : undefined} onClick={() => { setPath([]); setActiveCol(0); }}>
              {rootLabel}
            </button>
          </li>
          {crumbPath.map((n, i) => (
            <li key={n.id}>
              <button type="button" className="hb-wj2-crumb" aria-current={i === crumbPath.length - 1 ? "page" : undefined} onClick={() => { setPath(current.slice(0, i + 1)); setActiveCol(i); }}>
                {n.name}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="hb-wj2-main">
        <div ref={colsRef} className="hb-wj2-cols">
          {columns.map((items, col) => (
            <ul key={`${col}-${current[col - 1] ?? "root"}`} className="hb-wj2-col" role="listbox" aria-label={col === 0 ? rootLabel : chain[col - 1]?.name}>
              {items.map((node, idx) => {
                const isSel = current[col] === node.id;
                const tab = isSel || (current[col] === undefined && idx === 0) ? 0 : -1;
                return (
                  <li key={node.id} role="presentation">
                    <button
                      type="button"
                      role="option"
                      className="hb-wj2-item"
                      aria-selected={isSel}
                      data-active={col === activeCol || (isSel && col === chain.length - 1)}
                      data-col={col}
                      data-idx={idx}
                      tabIndex={tab}
                      onClick={() => choose(col, node)}
                      onDoubleClick={() => onOpen?.(node)}
                      onKeyDown={(e) => onKey(e, col, idx)}
                    >
                      <Icon kind={node.kind} />
                      <span>{node.name}</span>
                      {node.kind === "folder" && <i aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
        {selected && (
          <aside key={selected.id} className="hb-wj2-pv" aria-label={`Preview of ${selected.name}`}>
            <div className="hb-wj2-stage">
              <Preview node={selected} />
            </div>
            <p className="hb-wj2-name">
              <Icon kind={selected.kind} />
              <span>{selected.name}</span>
            </p>
            <dl className="hb-wj2-meta">
              <dt>Kind</dt>
              <dd>{kindLabel[selected.kind]}</dd>
              <dt>{selected.kind === "folder" ? "Items" : "Size"}</dt>
              <dd>{selected.kind === "folder" ? `${selected.children?.length ?? 0} items` : selected.size ?? "–"}</dd>
              <dt>Modified</dt>
              <dd>{selected.modified ?? "–"}</dd>
              <dt>Where</dt>
              <dd title={where}>{where}</dd>
            </dl>
            <div className="hb-wj2-acts">
              <button type="button" className="hb-wj2-act" onClick={() => {
                const full = selected.kind === "folder" ? where : `${where}/${selected.name}`;
                navigator.clipboard?.writeText(full).catch(() => undefined);
                setCopied(true);
              }}>
                {copied ? "Copied" : "Copy path"}
              </button>
              <button type="button" className="hb-wj2-act" onClick={() => onShare?.(selected)}>
                Share
              </button>
              <button type="button" className="hb-wj2-act" data-primary="true" onClick={() => onOpen?.(selected)}>
                Open
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
