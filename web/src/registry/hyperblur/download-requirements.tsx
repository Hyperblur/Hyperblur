"use client";

import * as React from "react";

export interface DownloadRequirementsRow {
  label: string;
  minimum: string;
  recommended: string;
  level?: [number, number];
}

export interface DownloadRequirementsPlatform {
  id: string;
  label: string;
  os: "mac" | "windows" | "linux";
  version: string;
  file: string;
  size: string;
  checksum: string;
  href: string;
  formats: { label: string; href: string }[];
  rows: DownloadRequirementsRow[];
}

export interface DownloadRequirementsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  platforms?: DownloadRequirementsPlatform[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  onDownload?: (platform: DownloadRequirementsPlatform) => void;
  accent?: string;
}

const css = `
.hb-yhb {
  --hb-yhb-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  overflow: hidden;
  padding: clamp(64px, 8cqi, 104px) 20px;
  background: #ffffff;
  color: #111;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yhb *, .hb-yhb *::before, .hb-yhb *::after { box-sizing: border-box; }
.hb-yhb::before { content: ""; position: absolute; inset: 0 0 auto; height: 320px; background: linear-gradient(180deg, #f4f6fb, transparent); pointer-events: none; }
.hb-yhb-in { position: relative; max-width: 1120px; margin: 0 auto; }
.hb-yhb-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 28px; }
.hb-yhb-eyebrow { color: var(--hb-yhb-accent); font-size: 13px; font-weight: 650; }
.hb-yhb-title { margin: 10px 0 0; font-size: clamp(28px, 4cqi, 42px); font-weight: 650; letter-spacing: -.035em; line-height: 1.08; }
.hb-yhb-sub { margin: 12px 0 0; max-width: 520px; color: #666; font-size: 15px; line-height: 1.6; }
.hb-yhb-tabs { position: relative; display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1fr; flex: none; padding: 4px; border: 1px solid rgba(0,0,0,.08); border-radius: 999px; background: #f4f4f5; }
.hb-yhb-pill { position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc((100% - 8px) / var(--hb-yhb-n)); border-radius: 999px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.1), 0 6px 16px -6px rgba(0,0,0,.18); transform: translateX(calc(var(--hb-yhb-i) * 100%)); transition: transform .45s cubic-bezier(.3,1.25,.5,1); }
.hb-yhb-tab { position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; gap: 7px; height: 36px; padding: 0 18px; border: 0; border-radius: 999px; background: transparent; color: #666; font: inherit; font-size: 13.5px; font-weight: 600; white-space: nowrap; cursor: pointer; transition: color .2s ease; }
.hb-yhb-tab[aria-selected="true"] { color: #111; }
.hb-yhb-tab svg { width: 15px; height: 15px; fill: currentColor; }
.hb-yhb-tab:focus-visible, .hb-yhb a:focus-visible, .hb-yhb-copy:focus-visible { outline: 2px solid var(--hb-yhb-accent); outline-offset: 2px; }
.hb-yhb-card { display: grid; grid-template-columns: minmax(0, 1fr) 340px; border: 1px solid rgba(0,0,0,.08); border-radius: 22px; background: #fff; box-shadow: 0 1px 0 rgba(0,0,0,.02), 0 30px 60px -40px rgba(20,30,60,.3); overflow: hidden; }
.hb-yhb-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.hb-yhb-table thead th { height: 46px; padding: 0 22px; border-bottom: 1px solid rgba(0,0,0,.07); background: #fafafa; color: #777; font-size: 12px; font-weight: 600; letter-spacing: .04em; text-align: left; text-transform: uppercase; }
.hb-yhb-table thead th:last-child { color: var(--hb-yhb-accent); }
.hb-yhb-table td, .hb-yhb-table tbody th { padding: 15px 22px; text-align: left; border-bottom: 1px solid rgba(0,0,0,.05); vertical-align: top; line-height: 1.45; }
.hb-yhb-table tr:last-child td, .hb-yhb-table tr:last-child th { border-bottom: 0; }
.hb-yhb-row { opacity: 0; transform: translateY(6px); animation: hb-yhb-in .45s cubic-bezier(.2,.8,.2,1) forwards; animation-delay: calc(var(--hb-yhb-r) * 45ms); }
.hb-yhb-row:hover td, .hb-yhb-row:hover th { background: #fafbff; }
.hb-yhb-lb { width: 24%; color: #111; font-weight: 600; }
.hb-yhb-min { color: #555; }
.hb-yhb-rec { color: #111; font-weight: 500; }
.hb-yhb-meter { position: relative; height: 4px; margin-top: 8px; max-width: 160px; border-radius: 99px; background: #eef0f4; overflow: hidden; }
.hb-yhb-meter i { position: absolute; inset: 0 auto 0 0; width: calc(var(--hb-yhb-l) * 100%); border-radius: inherit; background: #c7cbd4; transform-origin: left; animation: hb-yhb-grow .7s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(150ms + var(--hb-yhb-r) * 45ms); }
.hb-yhb-rec .hb-yhb-meter i { background: var(--hb-yhb-accent); }
.hb-yhb-side { display: flex; flex-direction: column; padding: 26px; border-left: 1px solid rgba(0,0,0,.07); background: linear-gradient(180deg, #fbfcff, #f6f8fd); }
.hb-yhb-glyph { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 15px; background: #111; color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 10px 24px -10px rgba(0,0,0,.5); animation: hb-yhb-pop .5s cubic-bezier(.3,1.5,.5,1); }
.hb-yhb-glyph svg { width: 24px; height: 24px; fill: currentColor; }
.hb-yhb-pn { margin-top: 16px; font-size: 18px; font-weight: 650; letter-spacing: -.01em; }
.hb-yhb-pv { margin-top: 2px; color: #777; font-size: 13px; }
.hb-yhb-file { margin-top: 18px; padding: 12px 14px; border: 1px solid rgba(0,0,0,.07); border-radius: 12px; background: #fff; }
.hb-yhb-fn { display: flex; justify-content: space-between; gap: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; }
.hb-yhb-fn span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-yhb-fn span:last-child { flex: none; color: #777; }
.hb-yhb-sha { display: flex; align-items: center; gap: 8px; margin-top: 8px; color: #888; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; }
.hb-yhb-sha code { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: inherit; }
.hb-yhb-copy { flex: none; height: 24px; padding: 0 8px; border: 1px solid rgba(0,0,0,.1); border-radius: 7px; background: #fff; color: #444; font: inherit; font-family: inherit; font-size: 11px; font-weight: 600; cursor: pointer; transition: background-color .15s ease, color .15s ease; }
.hb-yhb-copy:hover { background: #f4f4f5; }
.hb-yhb-copy[data-done="true"] { border-color: transparent; background: color-mix(in srgb, var(--hb-yhb-accent) 12%, #fff); color: var(--hb-yhb-accent); }
.hb-yhb-dl {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  margin-top: 16px;
  border-radius: 999px;
  background: var(--hb-yhb-accent);
  color: #fff;
  font-size: 14.5px;
  font-weight: 650;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 10px 24px -10px var(--hb-yhb-accent);
  overflow: hidden;
  transition: transform .15s ease, filter .2s ease;
}
.hb-yhb-dl::after { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,.35), transparent 70%); transform: translateX(-100%); animation: hb-yhb-shine 3.2s ease-in-out 1s infinite; }
.hb-yhb-dl:hover { filter: brightness(1.08); }
.hb-yhb-dl:active { transform: scale(.98); }
.hb-yhb-dl svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-yhb-also { margin-top: 18px; color: #777; font-size: 12px; }
.hb-yhb-fmts { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.hb-yhb-fmt { height: 26px; padding: 0 10px; border: 1px solid rgba(0,0,0,.09); border-radius: 999px; background: #fff; color: #333; font-size: 12px; font-weight: 600; line-height: 24px; text-decoration: none; transition: border-color .15s ease, color .15s ease; }
.hb-yhb-fmt:hover { border-color: var(--hb-yhb-accent); color: var(--hb-yhb-accent); }
.hb-yhb-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-yhb-in { to { opacity: 1; transform: none; } }
@keyframes hb-yhb-grow { from { transform: scaleX(0); } }
@keyframes hb-yhb-pop { from { transform: scale(.6) rotate(-12deg); opacity: 0; } }
@keyframes hb-yhb-shine { 0%, 60% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
@container (max-width: 900px) {
  .hb-yhb-head { flex-direction: column; align-items: flex-start; }
  .hb-yhb-card { grid-template-columns: minmax(0, 1fr); }
  .hb-yhb-side { border-left: 0; border-top: 1px solid rgba(0,0,0,.07); }
}
@container (max-width: 520px) {
  .hb-yhb-tabs { display: grid; width: 100%; }
  .hb-yhb-tab { padding: 0 8px; }
  .hb-yhb-table thead { display: none; }
  .hb-yhb-table tr { display: grid; grid-template-columns: 1fr 1fr; padding: 12px 16px; border-bottom: 1px solid rgba(0,0,0,.05); }
  .hb-yhb-table td, .hb-yhb-table tbody th { padding: 2px 0; border: 0; }
  .hb-yhb-lb { grid-column: 1 / -1; width: auto; margin-bottom: 4px; }
  .hb-yhb-min::before { content: "Minimum"; display: block; color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; }
  .hb-yhb-rec::before { content: "Recommended"; display: block; color: var(--hb-yhb-accent); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yhb *, .hb-yhb *::before, .hb-yhb *::after { animation: none !important; transition: none !important; }
  .hb-yhb-row { opacity: 1; transform: none; }
}
`;

const defaultPlatforms: DownloadRequirementsPlatform[] = [
  {
    id: "mac",
    label: "macOS",
    os: "mac",
    version: "Version 2.8.1, universal build",
    file: "Framecut-2.8.1.dmg",
    size: "486 MB",
    checksum: "9f2c41e07ab8d3c6512fe0a9b47d8e21c3f05a6be1d9472c80f3e6a5d14b29c7",
    href: "#",
    formats: [
      { label: ".pkg", href: "#" },
      { label: "Homebrew", href: "#" },
      { label: "Mac App Store", href: "#" },
    ],
    rows: [
      { label: "Operating system", minimum: "macOS 13 Ventura", recommended: "macOS 15 Sequoia or later" },
      { label: "Processor", minimum: "Intel Core i5, 4 cores", recommended: "Apple M2 or newer" },
      { label: "Memory", minimum: "8 GB", recommended: "16 GB or more", level: [0.25, 0.5] },
      { label: "Storage", minimum: "4 GB free, SSD", recommended: "20 GB free for media cache", level: [0.15, 0.6] },
      { label: "Graphics", minimum: "Metal 2 support", recommended: "Apple GPU, 10 cores" },
      { label: "Display", minimum: "1440 x 900", recommended: "Retina 2560 x 1600" },
    ],
  },
  {
    id: "windows",
    label: "Windows",
    os: "windows",
    version: "Version 2.8.1, 64-bit",
    file: "Framecut-Setup-2.8.1-x64.exe",
    size: "452 MB",
    checksum: "3b7e90d1c2fa4486e5b0a17c9de2f3184a6c05e7b9d18f2a3c60e4b75d2981af",
    href: "#",
    formats: [
      { label: ".msi", href: "#" },
      { label: "winget", href: "#" },
      { label: "ARM64", href: "#" },
    ],
    rows: [
      { label: "Operating system", minimum: "Windows 10, 22H2", recommended: "Windows 11, 24H2" },
      { label: "Processor", minimum: "Intel i5 8th gen or Ryzen 5 2600", recommended: "Intel i7 12th gen or Ryzen 7 5800" },
      { label: "Memory", minimum: "8 GB", recommended: "32 GB", level: [0.25, 1] },
      { label: "Storage", minimum: "4 GB free, SSD", recommended: "NVMe SSD, 50 GB free", level: [0.15, 0.85] },
      { label: "Graphics", minimum: "DirectX 12, 2 GB VRAM", recommended: "RTX 3060 or RX 6700, 8 GB VRAM" },
      { label: "Display", minimum: "1366 x 768", recommended: "2560 x 1440 at 125% scale" },
    ],
  },
  {
    id: "linux",
    label: "Linux",
    os: "linux",
    version: "Version 2.8.1, x86_64",
    file: "framecut-2.8.1-x86_64.AppImage",
    size: "471 MB",
    checksum: "c81d5f0e3a9b72e46d1f8c0b5a3e7d92f64b1c08e5a7d3f29b06c4e81a7d5f30",
    href: "#",
    formats: [
      { label: ".deb", href: "#" },
      { label: ".rpm", href: "#" },
      { label: "Flatpak", href: "#" },
    ],
    rows: [
      { label: "Distribution", minimum: "Ubuntu 22.04, Fedora 39", recommended: "Ubuntu 24.04, Fedora 41" },
      { label: "Processor", minimum: "x86_64 with AVX2, 4 cores", recommended: "8 cores or more" },
      { label: "Memory", minimum: "8 GB", recommended: "16 GB or more", level: [0.25, 0.5] },
      { label: "Storage", minimum: "4 GB free", recommended: "20 GB free on ext4 or btrfs", level: [0.15, 0.6] },
      { label: "Graphics", minimum: "Vulkan 1.2 driver", recommended: "Mesa 24 or NVIDIA 550+" },
      { label: "Desktop", minimum: "X11 or Wayland", recommended: "Wayland with PipeWire" },
    ],
  },
];

const osIcon: Record<DownloadRequirementsPlatform["os"], React.ReactNode> = {
  mac: <path d="M13.2 10.4c0-1.8 1.5-2.7 1.6-2.8-.9-1.3-2.2-1.5-2.7-1.5-1.1-.1-2.2.7-2.8.7-.6 0-1.5-.7-2.4-.6-1.3 0-2.4.7-3.1 1.9-1.3 2.3-.3 5.6.9 7.4.6.9 1.3 1.9 2.3 1.8.9 0 1.3-.6 2.4-.6s1.4.6 2.4.6 1.6-.9 2.2-1.8c.7-1 1-2 1-2.1-.1 0-1.8-.7-1.8-3zM11.4 4.9c.5-.6.8-1.4.7-2.3-.7 0-1.6.5-2.1 1.1-.5.5-.9 1.4-.8 2.2.8.1 1.6-.4 2.2-1z" />,
  windows: <path d="M3 4.6 8.7 3.8v5.5H3zM9.5 3.7 17 2.6v6.7H9.5zM3 10.1h5.7v5.5L3 14.8zM9.5 10.1H17v6.7l-7.5-1.1z" />,
  linux: <path d="M10 2.5c-1.9 0-2.8 1.6-2.8 3.4 0 1.1.2 1.6-.6 2.9-.9 1.3-2.1 3-2.1 5 0 .7.3 1.3.8 1.6-.4.4-.5 1-.1 1.4.6.6 2 .4 3 .9.8.3 1.3.3 1.8.3s1 0 1.8-.3c1-.5 2.4-.3 3-.9.4-.4.3-1-.1-1.4.5-.3.8-.9.8-1.6 0-2-1.2-3.7-2.1-5-.8-1.3-.6-1.8-.6-2.9 0-1.8-.9-3.4-2.8-3.4z" />,
};

export function DownloadRequirements({
  eyebrow = "System requirements",
  title = "Make sure Framecut runs smoothly",
  subtitle = "Framecut edits 4K timelines in real time on most machines from the last five years. Pick your platform to check.",
  platforms = defaultPlatforms,
  value,
  defaultValue,
  onValueChange,
  onDownload,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: DownloadRequirementsProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState(defaultValue ?? platforms[0]?.id ?? "");
  const [copied, setCopied] = React.useState(false);
  const currentId = value ?? inner;
  const index = Math.max(0, platforms.findIndex((p) => p.id === currentId));
  const current = platforms[index];
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  function pick(i: number) {
    const p = platforms[i];
    if (!p) return;
    if (value === undefined) setInner(p.id);
    setCopied(false);
    onValueChange?.(p.id);
  }

  function onKey(e: React.KeyboardEvent) {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % platforms.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + platforms.length) % platforms.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = platforms.length - 1;
    if (next < 0) return;
    e.preventDefault();
    pick(next);
    tabsRef.current?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  }

  async function copy() {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(current.checksum);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      className={`hb-yhb ${className}`}
      style={{ "--hb-yhb-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-download-requirements" precedence="default">
        {css}
      </style>
      <div className="hb-yhb-in">
        <header className="hb-yhb-head">
          <div>
            <span className="hb-yhb-eyebrow">{eyebrow}</span>
            <h2 className="hb-yhb-title">{title}</h2>
            {subtitle && <p className="hb-yhb-sub">{subtitle}</p>}
          </div>
          <div
            ref={tabsRef}
            className="hb-yhb-tabs"
            role="tablist"
            aria-label="Platform"
            onKeyDown={onKey}
            style={{ "--hb-yhb-n": platforms.length, "--hb-yhb-i": index } as React.CSSProperties}
          >
            <span className="hb-yhb-pill" aria-hidden="true" />
            {platforms.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`${uid}-t-${p.id}`}
                aria-selected={i === index}
                aria-controls={`${uid}-panel`}
                tabIndex={i === index ? 0 : -1}
                className="hb-yhb-tab"
                onClick={() => pick(i)}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  {osIcon[p.os]}
                </svg>
                {p.label}
              </button>
            ))}
          </div>
        </header>
        {current && (
          <div className="hb-yhb-card" id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-t-${current.id}`}>
            <table className="hb-yhb-table">
              <caption className="hb-yhb-sr">{`${current.label} system requirements`}</caption>
              <thead>
                <tr>
                  <th scope="col">Component</th>
                  <th scope="col">Minimum</th>
                  <th scope="col">Recommended</th>
                </tr>
              </thead>
              <tbody key={current.id}>
                {current.rows.map((r, i) => (
                  <tr key={r.label} className="hb-yhb-row" style={{ "--hb-yhb-r": i } as React.CSSProperties}>
                    <th scope="row" className="hb-yhb-lb">
                      {r.label}
                    </th>
                    <td className="hb-yhb-min">
                      {r.minimum}
                      {r.level && (
                        <span className="hb-yhb-meter" style={{ display: "block", "--hb-yhb-l": r.level[0].toFixed(3) } as React.CSSProperties} aria-hidden="true">
                          <i />
                        </span>
                      )}
                    </td>
                    <td className="hb-yhb-rec">
                      {r.recommended}
                      {r.level && (
                        <span className="hb-yhb-meter" style={{ display: "block", "--hb-yhb-l": r.level[1].toFixed(3) } as React.CSSProperties} aria-hidden="true">
                          <i />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <aside className="hb-yhb-side" key={`side-${current.id}`}>
              <span className="hb-yhb-glyph" aria-hidden="true">
                <svg viewBox="0 0 20 20">{osIcon[current.os]}</svg>
              </span>
              <div className="hb-yhb-pn">Framecut for {current.label}</div>
              <div className="hb-yhb-pv">{current.version}</div>
              <div className="hb-yhb-file">
                <div className="hb-yhb-fn">
                  <span>{current.file}</span>
                  <span>{current.size}</span>
                </div>
                <div className="hb-yhb-sha">
                  <code title={current.checksum}>SHA-256 {current.checksum}</code>
                  <button type="button" className="hb-yhb-copy" data-done={copied ? "true" : "false"} onClick={copy} aria-label="Copy SHA-256 checksum">
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <span className="hb-yhb-sr" aria-live="polite">
                  {copied ? "Checksum copied" : ""}
                </span>
              </div>
              <a href={current.href} className="hb-yhb-dl" onClick={() => onDownload?.(current)} download>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
                </svg>
                Download for {current.label}
              </a>
              {current.formats.length > 0 && (
                <>
                  <div className="hb-yhb-also">Also available</div>
                  <div className="hb-yhb-fmts">
                    {current.formats.map((f) => (
                      <a key={f.label} href={f.href} className="hb-yhb-fmt">
                        {f.label}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
