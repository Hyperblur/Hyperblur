"use client";

import * as React from "react";

export type DownloadPlatformId = "macos" | "windows" | "linux";

export interface DownloadPlatformLink {
  label: string;
  href: string;
}

export interface DownloadPlatform {
  id: DownloadPlatformId;
  name: string;
  requirement: string;
  file: string;
  size: string;
  checksum: string;
  href: string;
  alternatives?: DownloadPlatformLink[];
}

export interface DownloadPlatformsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  appName?: string;
  title?: string;
  subtitle?: string;
  platform?: DownloadPlatformId;
  version?: string;
  released?: string;
  releaseNotes?: DownloadPlatformLink | null;
  allReleases?: DownloadPlatformLink | null;
  platforms?: DownloadPlatform[];
  onDownload?: (id: DownloadPlatformId) => void;
  onChecksumCopy?: (id: DownloadPlatformId, checksum: string) => void;
  accent?: string;
}

const css = `
@property --hb-kh5-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@keyframes hb-kh5-spin { to { --hb-kh5-angle: 360deg; } }
@keyframes hb-kh5-rise {
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-kh5 {
  --hb-kh5-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kh5 *, .hb-kh5 *::before, .hb-kh5 *::after { box-sizing: border-box; }
.hb-kh5-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(42% 36% at 50% 0%, color-mix(in srgb, var(--hb-kh5-accent) 24%, transparent), transparent 72%),
    radial-gradient(60% 40% at 50% 100%, rgba(255, 255, 255, 0.03), transparent 70%);
}
.hb-kh5-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px 80px;
}
.hb-kh5-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}
.hb-kh5-app {
  position: relative;
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background:
    radial-gradient(120% 120% at 20% 0%, color-mix(in srgb, var(--hb-kh5-accent) 85%, #ffffff), var(--hb-kh5-accent) 45%, color-mix(in srgb, var(--hb-kh5-accent) 50%, #000000));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -2px 6px rgba(0, 0, 0, 0.25), 0 14px 40px -10px color-mix(in srgb, var(--hb-kh5-accent) 70%, transparent);
}
.hb-kh5-app svg { width: 30px; height: 30px; fill: #ffffff; }
.hb-kh5-ver {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 22px;
  padding: 5px 6px 5px 12px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: #a1a1a1;
  font-size: 12.5px;
}
.hb-kh5-ver b { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-kh5-ver a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #ededed;
  text-decoration: none;
  transition: background-color 0.2s ease;
}
.hb-kh5-ver a:hover { background: rgba(255, 255, 255, 0.11); }
.hb-kh5-ver a:focus-visible { outline: 2px solid var(--hb-kh5-accent); outline-offset: 2px; }
.hb-kh5-title {
  margin: 18px 0 0;
  font-size: clamp(32px, 5cqw, 50px);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.04em;
  text-wrap: balance;
}
.hb-kh5-sub {
  max-width: 520px;
  margin: 14px 0 0;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kh5-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin: 44px 0 0;
  padding: 0;
  list-style: none;
}
.hb-kh5-card {
  --hb-kh5-ring: rgba(255, 255, 255, 0.08);
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 20px;
  border: 1px solid transparent;
  border-radius: 20px;
  background:
    linear-gradient(180deg, #141414, #0e0e0e) padding-box,
    linear-gradient(var(--hb-kh5-ring), var(--hb-kh5-ring)) border-box;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  animation: hb-kh5-rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--i) * 80ms);
  transition: transform 0.25s ease;
}
.hb-kh5-card:hover { --hb-kh5-ring: rgba(255, 255, 255, 0.16); transform: translateY(-3px); }
.hb-kh5-card[data-rec="true"] {
  order: -1;
  background:
    radial-gradient(90% 60% at 50% 0%, color-mix(in srgb, var(--hb-kh5-accent) 14%, transparent), transparent 70%) padding-box,
    linear-gradient(180deg, #151515, #0e0e0e) padding-box,
    conic-gradient(from var(--hb-kh5-angle), rgba(255, 255, 255, 0.1) 0deg, rgba(255, 255, 255, 0.1) 200deg, var(--hb-kh5-accent) 290deg, #ffffff 320deg, rgba(255, 255, 255, 0.1) 360deg) border-box;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 60px -36px color-mix(in srgb, var(--hb-kh5-accent) 60%, transparent);
  animation: hb-kh5-rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both, hb-kh5-spin 5s linear infinite;
  animation-delay: calc(var(--i) * 80ms), 0s;
}
.hb-kh5-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.hb-kh5-glyph {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: linear-gradient(180deg, #1c1c1c, #121212);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
  color: #d4d4d4;
}
.hb-kh5-card[data-rec="true"] .hb-kh5-glyph { color: #ffffff; border-color: color-mix(in srgb, var(--hb-kh5-accent) 45%, rgba(255, 255, 255, 0.1)); }
.hb-kh5-glyph svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh5-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-kh5-accent) 16%, transparent);
  color: color-mix(in srgb, var(--hb-kh5-accent) 55%, #ffffff);
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
}
.hb-kh5-badge::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.hb-kh5-name { margin: 16px 0 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
.hb-kh5-req { margin: 6px 0 0; color: #8f8f8f; font-size: 13.5px; line-height: 1.5; }
.hb-kh5-dl {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  height: 46px;
  margin: 18px 0 16px;
  padding: 0 8px 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: #ededed;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
}
.hb-kh5-dl:hover { background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.2); }
.hb-kh5-dl:active { transform: scale(0.985); }
.hb-kh5-dl:focus-visible { outline: 2px solid var(--hb-kh5-accent); outline-offset: 3px; }
.hb-kh5-card[data-rec="true"] .hb-kh5-dl { border-color: transparent; background: #ededed; color: #0a0a0a; }
.hb-kh5-card[data-rec="true"] .hb-kh5-dl:hover { background: #ffffff; }
.hb-kh5-dll { display: inline-flex; align-items: center; gap: 10px; }
.hb-kh5-dll svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.2s ease; }
.hb-kh5-dl:hover .hb-kh5-dll svg { transform: translateY(2px); }
.hb-kh5-size {
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  color: #bdbdbd;
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
.hb-kh5-card[data-rec="true"] .hb-kh5-size { background: rgba(0, 0, 0, 0.08); color: #3a3a3a; }
.hb-kh5-alt {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin: -4px 0 16px;
  color: #6f6f6f;
  font-size: 12.5px;
}
.hb-kh5-alt a { color: #a1a1a1; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.14); }
.hb-kh5-alt a:hover { color: #ededed; border-color: rgba(255, 255, 255, 0.4); }
.hb-kh5-alt a:focus-visible { outline: 2px solid var(--hb-kh5-accent); outline-offset: 2px; border-radius: 3px; }
.hb-kh5-sumbox {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 8px;
  min-width: 0;
  height: 34px;
  margin-top: auto;
  padding: 0 4px 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  background: #0a0a0a;
}
.hb-kh5-sumlbl { flex: none; color: #6f6f6f; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; }
.hb-kh5-hash {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  color: #a1a1a1;
  font-family: var(--font-mono, ui-monospace), SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-kh5-copy {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 6px;
  height: 26px;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.hb-kh5-copy:hover { background: rgba(255, 255, 255, 0.07); color: #ededed; }
.hb-kh5-copy:focus-visible { outline: 2px solid var(--hb-kh5-accent); outline-offset: 1px; }
.hb-kh5-copy[data-done="true"] { color: #4ade80; }
.hb-kh5-copy svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh5-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px 20px;
  margin-top: 32px;
  color: #6f6f6f;
  font-size: 13px;
}
.hb-kh5-foot a { color: #a1a1a1; text-decoration: none; }
.hb-kh5-foot a:hover { color: #ededed; }
.hb-kh5-foot a:focus-visible { outline: 2px solid var(--hb-kh5-accent); outline-offset: 2px; border-radius: 3px; }
.hb-kh5-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@container (min-width: 720px) {
  .hb-kh5-in { padding: 80px 40px 96px; }
}
@container (min-width: 820px) {
  .hb-kh5-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .hb-kh5-card[data-rec="true"] { order: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kh5 *, .hb-kh5 *::before, .hb-kh5 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultPlatforms: DownloadPlatform[] = [
  {
    id: "macos",
    name: "macOS",
    requirement: "macOS 13 Ventura or later. Universal build for Apple silicon and Intel.",
    file: ".dmg",
    size: "148 MB",
    checksum: "9f2c4e81b07d3a65c9e14f2b8d60a7e3f51c28b94d0e6a17c3b5f8e2d409a41e",
    href: "#",
    alternatives: [
      { label: ".zip archive", href: "#" },
      { label: "Homebrew", href: "#" },
    ],
  },
  {
    id: "windows",
    name: "Windows",
    requirement: "Windows 10 version 1909 or later. 64-bit and ARM64 installers.",
    file: ".exe",
    size: "131 MB",
    checksum: "4b7e0d2a91c6f835e2a07b4d9c18f3e65a20d7c4b91e8f36a5d02c7b4e19f80c",
    href: "#",
    alternatives: [
      { label: "ARM64", href: "#" },
      { label: ".msi for IT", href: "#" },
    ],
  },
  {
    id: "linux",
    name: "Linux",
    requirement: "Ubuntu 22.04, Fedora 38, Debian 12 or newer. x86_64 and arm64.",
    file: ".AppImage",
    size: "156 MB",
    checksum: "c3a81f60e9d24b7f05a6c2e8d13b974f6e0a5d28c7b14f93e6d0a2b8c5f71e3d",
    href: "#",
    alternatives: [
      { label: ".deb", href: "#" },
      { label: ".rpm", href: "#" },
      { label: "Flatpak", href: "#" },
    ],
  },
];

function Glyph({ id }: { id: DownloadPlatformId }) {
  if (id === "windows") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
        <path d="M3 9h18M6.5 6.8h.01M9 6.8h.01M11.5 6.8h.01" />
      </svg>
    );
  }
  if (id === "linux") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
        <path d="M7 10l3 2.2L7 14.4M12.5 15h4.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 9V6.5A2.5 2.5 0 1 0 6.5 9H9zM9 9h6M9 9v6M15 9V6.5A2.5 2.5 0 1 1 17.5 9H15zM15 9v6M9 15H6.5A2.5 2.5 0 1 0 9 17.5V15zM9 15h6M15 15h2.5a2.5 2.5 0 1 1-2.5 2.5V15z" />
    </svg>
  );
}

function short(hash: string) {
  return hash.length > 20 ? `${hash.slice(0, 10)}…${hash.slice(-8)}` : hash;
}

export function DownloadPlatforms({
  appName = "Cinder",
  title = "Download Cinder for your desktop",
  subtitle = "Local-first notes that open in under a second. Free for personal use, syncs only when you ask it to.",
  platform = "macos",
  version = "4.2.0",
  released = "October 28, 2026",
  releaseNotes = { label: "Release notes", href: "#" },
  allReleases = { label: "Browse all releases", href: "#" },
  platforms = defaultPlatforms,
  onDownload,
  onChecksumCopy,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: DownloadPlatformsProps) {
  const [copied, setCopied] = React.useState<DownloadPlatformId | null>(null);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = (p: DownloadPlatform) => {
    const done = () => {
      setCopied(p.id);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(null), 1800);
    };
    onChecksumCopy?.(p.id, p.checksum);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(p.checksum).then(done, done);
    } else {
      done();
    }
  };

  const current = platforms.find((p) => p.id === platform);

  return (
    <section
      className={["hb-kh5", className].filter(Boolean).join(" ")}
      style={{ ["--hb-kh5-accent" as string]: accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-download-platforms" precedence="default">{css}</style>
      <div className="hb-kh5-glow" aria-hidden="true" />
      <div className="hb-kh5-in">
        <header className="hb-kh5-head">
          <span className="hb-kh5-app" role="img" aria-label={`${appName} app icon`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.6 2.5c.5 3.1-1.3 4.6-2.9 6.2-1.4 1.4-2.7 2.9-2.7 5.4A5 5 0 0 0 12 19.2a5 5 0 0 0 5-5.1c0-1.9-.8-3.2-1.7-4.3-.2 1.3-.9 2.3-2 2.8.6-3.4-.1-7.2-.7-10.1zM12 21.5c-3.9 0-7-2.9-7-6.9 0-1.6.4-2.9 1.1-4.1-.1 1.2.2 2.4.9 3.2.3 2.6 2.3 4.6 5 4.6s4.7-2 5-4.6c.7-.8 1-2 .9-3.2.7 1.2 1.1 2.5 1.1 4.1 0 4-3.1 6.9-7 6.9z" />
            </svg>
          </span>
          <div className="hb-kh5-ver">
            <span>
              Version <b>{version}</b> · {released}
            </span>
            {releaseNotes ? (
              <a href={releaseNotes.href}>
                {releaseNotes.label}
                <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </div>
          <h2 className="hb-kh5-title">{title}</h2>
          {subtitle ? <p className="hb-kh5-sub">{subtitle}</p> : null}
        </header>
        <ul className="hb-kh5-grid">
          {platforms.map((p, i) => {
            const rec = p.id === platform;
            return (
              <li key={p.id} className="hb-kh5-card" data-rec={rec ? "true" : "false"} style={{ ["--i" as string]: i } as React.CSSProperties}>
                <div className="hb-kh5-top">
                  <span className="hb-kh5-glyph">
                    <Glyph id={p.id} />
                  </span>
                  {rec ? <span className="hb-kh5-badge">Recommended for you</span> : null}
                </div>
                <h3 className="hb-kh5-name">{p.name}</h3>
                <p className="hb-kh5-req">{p.requirement}</p>
                <a className="hb-kh5-dl" href={p.href} onClick={() => onDownload?.(p.id)}>
                  <span className="hb-kh5-dll">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M8 2.5v8M4.5 7.5L8 11l3.5-3.5M3 13.5h10" />
                    </svg>
                    Download {p.file}
                  </span>
                  <span className="hb-kh5-size">{p.size}</span>
                </a>
                {p.alternatives && p.alternatives.length ? (
                  <div className="hb-kh5-alt">
                    <span>Also:</span>
                    {p.alternatives.map((a) => (
                      <a key={a.label} href={a.href}>
                        {a.label}
                      </a>
                    ))}
                  </div>
                ) : null}
                <div className="hb-kh5-sumbox">
                  <span className="hb-kh5-sumlbl">SHA-256</span>
                  <span className="hb-kh5-hash" title={p.checksum}>
                    {short(p.checksum)}
                  </span>
                  <button
                    type="button"
                    className="hb-kh5-copy"
                    data-done={copied === p.id ? "true" : "false"}
                    aria-label={copied === p.id ? `${p.name} checksum copied` : `Copy ${p.name} checksum`}
                    onClick={() => copy(p)}
                  >
                    {copied === p.id ? (
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M3.5 8.5l3 3 6-7" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <rect x="5.5" y="5.5" width="8" height="8" rx="1.8" />
                        <path d="M10.5 3.5V3A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
                      </svg>
                    )}
                    {copied === p.id ? "Copied" : "Copy"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="hb-kh5-foot">
          {current ? <span>Detected {current.name}. Not right? Pick another build above.</span> : null}
          {allReleases ? <a href={allReleases.href}>{allReleases.label} →</a> : null}
        </div>
        <span className="hb-kh5-sr" aria-live="polite">
          {copied ? "Checksum copied to clipboard" : ""}
        </span>
      </div>
    </section>
  );
}
