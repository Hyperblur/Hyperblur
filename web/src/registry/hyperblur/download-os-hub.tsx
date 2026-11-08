"use client";

import * as React from "react";

export type OsHubPlatformId = "macos" | "windows" | "linux" | "ios" | "android";

export interface OsHubVariant {
  label: string;
  file: string;
  size: string;
  href: string;
}

export interface OsHubPlatform {
  id: OsHubPlatformId;
  label: string;
  requirement: string;
  variants: OsHubVariant[];
  steps: string[];
}

export interface OsHubDownload {
  platform: OsHubPlatformId;
  variant: OsHubVariant;
}

export interface DownloadOsHubProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  appName?: string;
  version?: string;
  title?: string;
  subtitle?: string;
  platform?: OsHubPlatformId | "auto";
  platforms?: OsHubPlatform[];
  releaseNotes?: { label: string; href: string };
  accent?: string;
  onDownload?: (download: OsHubDownload) => void;
}

const defaultPlatforms: OsHubPlatform[] = [
  {
    id: "macos",
    label: "macOS",
    requirement: "macOS 13 Ventura or later",
    variants: [
      { label: "Apple silicon", file: "Tern-4.2.1-arm64.dmg", size: "104 MB", href: "#" },
      { label: "Intel", file: "Tern-4.2.1-x64.dmg", size: "112 MB", href: "#" },
    ],
    steps: ["Open Tern-4.2.1.dmg", "Drag Tern into Applications", "Sign in with your workspace email"],
  },
  {
    id: "windows",
    label: "Windows",
    requirement: "Windows 10 (22H2) or later",
    variants: [
      { label: "x64", file: "TernSetup-4.2.1-x64.exe", size: "98 MB", href: "#" },
      { label: "ARM64", file: "TernSetup-4.2.1-arm64.exe", size: "95 MB", href: "#" },
    ],
    steps: ["Run TernSetup-4.2.1.exe", "Allow the installer to make changes", "Sign in with your workspace email"],
  },
  {
    id: "linux",
    label: "Linux",
    requirement: "glibc 2.31+, x86_64",
    variants: [
      { label: ".deb", file: "tern_4.2.1_amd64.deb", size: "91 MB", href: "#" },
      { label: ".rpm", file: "tern-4.2.1.x86_64.rpm", size: "92 MB", href: "#" },
      { label: "AppImage", file: "Tern-4.2.1.AppImage", size: "118 MB", href: "#" },
    ],
    steps: ["sudo apt install ./tern_4.2.1_amd64.deb", "Launch Tern from your app menu", "Sign in with your workspace email"],
  },
  {
    id: "ios",
    label: "iPhone",
    requirement: "iOS 16 or later",
    variants: [{ label: "App Store", file: "Tern for iPhone", size: "64 MB", href: "#" }],
    steps: ["Open the store page", "Tap Get", "Sign in with your workspace email"],
  },
  {
    id: "android",
    label: "Android",
    requirement: "Android 10 or later",
    variants: [{ label: "Play Store", file: "Tern for Android", size: "38 MB", href: "#" }],
    steps: ["Open the store page", "Tap Install", "Sign in with your workspace email"],
  },
];

const css = `
.hb-we7 {
  --hb-we7-accent: #22d3ee;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}
.hb-we7 *, .hb-we7 *::before, .hb-we7 *::after { box-sizing: border-box; }
.hb-we7-inner { position: relative; max-width: 960px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(18px, 4cqi, 40px); display: grid; justify-items: center; text-align: center; gap: 22px; }
.hb-we7-halo { position: absolute; left: 50%; top: 0; width: 900px; height: 520px; transform: translateX(-50%); background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-we7-accent) 16%, transparent), transparent); pointer-events: none; }
.hb-we7-icon { position: relative; width: 76px; height: 76px; border-radius: 20px; display: grid; place-items: center; background: linear-gradient(150deg, #1f2a2e, #0e1416); box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), inset 0 1px 0 rgba(255,255,255,.2), 0 20px 40px -16px color-mix(in srgb, var(--hb-we7-accent) 50%, #000); }
.hb-we7-icon svg { width: 40px; height: 40px; }
.hb-we7-title { position: relative; margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(30px, 5cqi, 52px); font-weight: 600; line-height: 1.02; letter-spacing: -.035em; text-wrap: balance; }
.hb-we7-sub { position: relative; margin: 0; max-width: 50ch; color: #a1a1a1; font-size: 15px; line-height: 1.6; }
.hb-we7-card { position: relative; width: 100%; max-width: 560px; display: grid; gap: 16px; padding: 22px; border-radius: 22px; text-align: left; background: linear-gradient(180deg, #141617, #0f1011); box-shadow: inset 0 0 0 1px rgba(255,255,255,.08), inset 0 1px 0 rgba(255,255,255,.06), 0 40px 80px -40px rgba(0,0,0,.9); overflow: hidden; }
.hb-we7-scan { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-we7-accent) 22%, transparent), transparent); transform: translateX(-100%); animation: hb-we7-scan 1.4s cubic-bezier(.6,0,.3,1) .1s both; }
.hb-we7-det { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: #8f8f8f; font-size: 13px; }
.hb-we7-det b { color: #ededed; font-weight: 600; }
.hb-we7-dot { display: inline-block; width: 7px; height: 7px; margin-right: 8px; border-radius: 50%; background: var(--hb-we7-accent); box-shadow: 0 0 10px var(--hb-we7-accent); vertical-align: 1px; }
.hb-we7-req { font-family: var(--font-mono, ui-monospace, monospace); font-size: 11.5px; color: #6b6b6b; white-space: nowrap; }
.hb-we7-vars { display: flex; gap: 6px; flex-wrap: wrap; }
.hb-we7-var { height: 32px; padding: 0 12px; border: 0; border-radius: 9px; cursor: pointer; font: inherit; font-size: 12.5px; font-weight: 500; color: #a1a1a1; background: rgba(255,255,255,.03); box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); transition: color .2s ease, box-shadow .2s ease, background .2s ease; }
.hb-we7-var:hover { color: #ededed; }
.hb-we7-var[aria-checked="true"] { color: #ededed; background: color-mix(in srgb, var(--hb-we7-accent) 10%, transparent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-we7-accent) 60%, transparent); }
.hb-we7-var:focus-visible { outline: 2px solid var(--hb-we7-accent); outline-offset: 2px; }
.hb-we7-go {
  position: relative; display: flex; align-items: center; justify-content: space-between; gap: 14px; width: 100%; min-height: 64px; padding: 0 10px 0 20px;
  border: 0; border-radius: 16px; cursor: pointer; overflow: hidden; color: #031216; font: inherit; text-align: left;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-we7-accent) 80%, #fff), var(--hb-we7-accent)); box-shadow: inset 0 1px 0 rgba(255,255,255,.5), 0 14px 30px -12px color-mix(in srgb, var(--hb-we7-accent) 70%, #000);
  transition: transform .25s cubic-bezier(.2,.8,.2,1), filter .2s ease;
}
.hb-we7-go:hover { filter: brightness(1.06); transform: translateY(-1px); }
.hb-we7-go:active { transform: scale(.985); }
.hb-we7-go:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-we7-go[data-s="loading"], .hb-we7-go[data-s="done"] { cursor: default; }
.hb-we7-go b { display: block; font-size: 16px; font-weight: 650; letter-spacing: -.01em; }
.hb-we7-go small { display: block; margin-top: 2px; font-size: 12px; opacity: .7; font-family: var(--font-mono, ui-monospace, monospace); }
.hb-we7-gi { position: relative; flex: none; width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; background: rgba(3,18,22,.14); }
.hb-we7-gi svg { width: 20px; height: 20px; }
.hb-we7-go[data-s="idle"]:hover .hb-we7-arrow { animation: hb-we7-bob .8s cubic-bezier(.4,0,.2,1) infinite; }
.hb-we7-fill { position: absolute; inset: 0; background: rgba(255,255,255,.35); transform-origin: left; transform: scaleX(0); pointer-events: none; }
.hb-we7-go[data-s="loading"] .hb-we7-fill { animation: hb-we7-fill 1.6s cubic-bezier(.3,.1,.2,1) forwards; }
.hb-we7-go[data-s="done"] .hb-we7-fill { transform: scaleX(1); opacity: 0; transition: opacity .4s ease; }
.hb-we7-next { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-we7-next li { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 12px; background: rgba(255,255,255,.025); box-shadow: inset 0 0 0 1px rgba(255,255,255,.06); font-size: 13.5px; color: #d4d4d4; animation: hb-we7-in .5s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-we7-k) * 120ms); min-width: 0; }
.hb-we7-next li span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.hb-we7-next i { flex: none; width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; font-style: normal; font-size: 11px; font-weight: 700; color: #031216; background: var(--hb-we7-accent); }
.hb-we7-retry { display: flex; justify-content: space-between; gap: 12px; color: #8f8f8f; font-size: 12.5px; }
.hb-we7-retry button, .hb-we7-retry a { padding: 0; border: 0; background: none; color: #ededed; font: inherit; cursor: pointer; text-decoration: underline; text-decoration-color: rgba(255,255,255,.25); text-underline-offset: 3px; }
.hb-we7-retry button:focus-visible, .hb-we7-retry a:focus-visible { outline: 2px solid var(--hb-we7-accent); outline-offset: 2px; border-radius: 2px; }
.hb-we7-others { position: relative; display: grid; gap: 12px; width: 100%; max-width: 760px; }
.hb-we7-ol { color: #6b6b6b; font-size: 12px; font-family: var(--font-mono, ui-monospace, monospace); letter-spacing: .08em; text-transform: uppercase; }
.hb-we7-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(118px, 1fr)); gap: 8px; }
.hb-we7-os { display: grid; justify-items: center; gap: 8px; padding: 14px 8px; border: 0; border-radius: 14px; cursor: pointer; font: inherit; color: #a1a1a1; background: rgba(255,255,255,.02); box-shadow: inset 0 0 0 1px rgba(255,255,255,.07); transition: color .2s ease, background .2s ease, box-shadow .2s ease, transform .25s cubic-bezier(.2,.8,.2,1); }
.hb-we7-os svg { width: 22px; height: 22px; }
.hb-we7-os span { font-size: 13px; font-weight: 500; }
.hb-we7-os small { font-size: 11px; color: #6b6b6b; }
.hb-we7-os:hover { color: #ededed; background: rgba(255,255,255,.04); transform: translateY(-2px); }
.hb-we7-os[aria-pressed="true"] { color: #ededed; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-we7-accent) 55%, transparent); }
.hb-we7-os:focus-visible { outline: 2px solid var(--hb-we7-accent); outline-offset: 2px; }
.hb-we7-notes { position: relative; color: #8f8f8f; font-size: 13px; text-decoration: none; }
.hb-we7-notes:hover { color: #ededed; }
.hb-we7-notes:focus-visible { outline: 2px solid var(--hb-we7-accent); outline-offset: 3px; border-radius: 3px; }
.hb-we7-swap { animation: hb-we7-in .45s cubic-bezier(.2,.8,.2,1) both; }
@keyframes hb-we7-scan { to { transform: translateX(100%); } }
@keyframes hb-we7-fill { to { transform: scaleX(1); } }
@keyframes hb-we7-bob { 50% { transform: translateY(3px); } }
@keyframes hb-we7-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@container (max-width: 480px) {
  .hb-we7-req { display: none; }
  .hb-we7-card { padding: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-we7 *, .hb-we7 *::before, .hb-we7 *::after { transition: none !important; animation: none !important; }
  .hb-we7-scan { display: none; }
  .hb-we7-go[data-s="loading"] .hb-we7-fill { transform: scaleX(1); }
}
`;

function detect(): OsHubPlatformId | null {
  if (typeof navigator === "undefined") return null;
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const ua = `${nav.userAgentData?.platform ?? ""} ${nav.platform ?? ""} ${nav.userAgent ?? ""}`;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/Mac/i.test(ua)) return "macos";
  if (/Win/i.test(ua)) return "windows";
  if (/Linux|X11|CrOS/i.test(ua)) return "linux";
  return null;
}

const noop = () => () => {};

function OsIcon({ id }: { id: OsHubPlatformId }) {
  if (id === "macos") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4.5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 20h8M12 16.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
  if (id === "windows") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5l7-1v7H4zM13 4.2l7-1.2v8.5h-7zM4 13h7v6.5l-7-1zM13 13h7v8l-7-1.2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>;
  if (id === "linux") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M7.5 10l2.5 2-2.5 2M12 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (id === "ios") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6.5" y="2.5" width="11" height="19" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6.5" y="2.5" width="11" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M10 18.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

export function DownloadOsHub({
  appName = "Tern",
  version = "4.2.1",
  title = "Get Tern for your desk",
  subtitle = "A quiet inbox for teams that answer customers all day. We picked the right installer for your computer; switch below if you need another.",
  platform = "auto",
  platforms = defaultPlatforms,
  releaseNotes = { label: "What is new in 4.2.1", href: "#" },
  accent = "#22d3ee",
  onDownload,
  className,
  style,
  ...rest
}: DownloadOsHubProps) {
  const detected = React.useSyncExternalStore(noop, detect, () => null);
  const [chosen, setChosen] = React.useState<OsHubPlatformId | null>(null);
  const [variantIdx, setVariantIdx] = React.useState(0);
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");
  const timer = React.useRef(0);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const autoId = platform === "auto" ? detected : platform;
  const currentId = chosen ?? autoId ?? platforms[0]?.id;
  const current = platforms.find((p) => p.id === currentId) ?? platforms[0];
  const variant = current.variants[Math.min(variantIdx, current.variants.length - 1)];
  const isDetected = !chosen && platform === "auto" && detected === current.id;

  const pick = (id: OsHubPlatformId) => {
    window.clearTimeout(timer.current);
    setChosen(id);
    setVariantIdx(0);
    setStatus("idle");
  };

  const start = () => {
    if (status !== "idle") return;
    onDownload?.({ platform: current.id, variant });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStatus("loading");
    timer.current = window.setTimeout(() => setStatus("done"), reduce ? 0 : 1600);
  };

  return (
    <section
      className={["hb-we7", className].filter(Boolean).join(" ")}
      style={{ "--hb-we7-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-download-os-hub" precedence="default">{css}</style>
      <div className="hb-we7-inner">
        <div className="hb-we7-halo" aria-hidden="true" />
        <div className="hb-we7-icon" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M6 24c6-1 10-5 14-12 2 6 7 10 14 11-7 2-12 5-14 11-3-6-8-9-14-10z" fill={accent} />
            <path d="M20 12c1 7 4 11 14 11" stroke="rgba(255,255,255,.6)" strokeWidth="1.2" />
          </svg>
        </div>
        <h2 className="hb-we7-title">{title}</h2>
        {subtitle ? <p className="hb-we7-sub">{subtitle}</p> : null}
        <div className="hb-we7-card">
          <span className="hb-we7-scan" key={current.id} aria-hidden="true" />
          <div className="hb-we7-det" aria-live="polite">
            <span>
              <span className="hb-we7-dot" aria-hidden="true" />
              {isDetected ? <>Detected <b>{current.label}</b></> : <>Showing <b>{current.label}</b></>}
            </span>
            <span className="hb-we7-req">{current.requirement}</span>
          </div>
          {current.variants.length > 1 ? (
            <div className="hb-we7-vars" role="radiogroup" aria-label={`${current.label} build`}>
              {current.variants.map((v, i) => (
                <button
                  key={v.label}
                  type="button"
                  role="radio"
                  aria-checked={v === variant}
                  className="hb-we7-var"
                  onClick={() => {
                    setVariantIdx(i);
                    setStatus("idle");
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          ) : null}
          <a
            className="hb-we7-go"
            href={variant.href}
            data-s={status}
            aria-live="polite"
            onClick={(e) => {
              if (variant.href === "#" || status !== "idle") e.preventDefault();
              start();
            }}
          >
            <span className="hb-we7-fill" aria-hidden="true" />
            <span style={{ position: "relative", minWidth: 0 }}>
              <b>
                {status === "idle" ? `Download for ${current.label}` : status === "loading" ? "Starting download" : "Download started"}
              </b>
              <small>{variant.file} · {variant.size}</small>
            </span>
            <span className="hb-we7-gi" aria-hidden="true">
              {status === "done" ? (
                <svg viewBox="0 0 20 20" fill="none"><path d="M5 10.5l3.2 3.2L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="none" className="hb-we7-arrow"><path d="M10 3v10m-4-4l4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
            </span>
          </a>
          {status === "done" ? (
            <>
              <ol className="hb-we7-next">
                {current.steps.map((s, i) => (
                  <li key={s} style={{ "--hb-we7-k": i } as React.CSSProperties}>
                    <i>{i + 1}</i>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <div className="hb-we7-retry">
                <span>Download did not start?</span>
                <button type="button" onClick={() => setStatus("idle")}>Try again</button>
              </div>
            </>
          ) : (
            <div className="hb-we7-retry">
              <span>Version {version} · signed and notarized</span>
              {releaseNotes ? <a href={releaseNotes.href}>{releaseNotes.label}</a> : null}
            </div>
          )}
        </div>
        <div className="hb-we7-others">
          <span className="hb-we7-ol">Other platforms</span>
          <div className="hb-we7-row">
            {platforms.map((p) => (
              <button key={p.id} type="button" className="hb-we7-os" aria-pressed={p.id === current.id} onClick={() => pick(p.id)}>
                <OsIcon id={p.id} />
                <span>{p.label}</span>
                <small>{p.variants[0]?.size}</small>
              </button>
            ))}
          </div>
        </div>
        <span className="hb-we7-notes">{appName} {version} · Released November 4, 2026</span>
      </div>
    </section>
  );
}
