"use client";

import * as React from "react";

export type InstallOutcome = "accepted" | "dismissed" | "unavailable";

export interface InstallAppLabels {
  region: string;
  install: string;
  notNow: string;
  close: string;
  iosIntro: string;
  iosTap: string;
  iosShare: string;
  iosToolbar: string;
  iosChoose: string;
  iosAdd: string;
  gotIt: string;
  installed: string;
}

export interface InstallAppBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  appName?: string;
  meta?: string;
  description?: string;
  benefits?: string[];
  icon?: React.ReactNode;
  snoozeDays?: number;
  storageKey?: string;
  delay?: number;
  forceVisible?: boolean;
  mode?: "auto" | "prompt" | "ios";
  placement?: "fixed" | "inline";
  appearance?: "dark" | "light";
  labels?: Partial<InstallAppLabels>;
  onInstall?: (outcome: InstallOutcome) => void;
  onDismiss?: () => void;
  accent?: string;
}

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const defaultLabels: InstallAppLabels = {
  region: "Install the app",
  install: "Install",
  notNow: "Not now",
  close: "Dismiss",
  iosIntro: "Add it to your iPhone in two steps:",
  iosTap: "Tap",
  iosShare: "Share",
  iosToolbar: "in the browser bar",
  iosChoose: "Choose",
  iosAdd: "Add to Home Screen",
  gotIt: "Got it",
  installed: "Added to your home screen",
};

const css = `
.hb-oc3 {
  --hb-oc3-accent: #2f7bff;
  --hb-oc3-bg: #121212;
  --hb-oc3-line: #262626;
  --hb-oc3-text: #ededed;
  --hb-oc3-muted: #a1a1a1;
  --hb-oc3-soft: #1b1b1b;
  box-sizing: border-box;
  color: var(--hb-oc3-text);
  font-family: inherit;
}
.hb-oc3 *, .hb-oc3 *::before, .hb-oc3 *::after { box-sizing: border-box; }
.hb-oc3[data-appearance="light"] {
  --hb-oc3-bg: #ffffff;
  --hb-oc3-line: #e7e4dd;
  --hb-oc3-text: #121622;
  --hb-oc3-muted: #5f6470;
  --hb-oc3-soft: #f4f2ed;
}
.hb-oc3[data-placement="inline"] { position: relative; width: 100%; max-width: 400px; }
.hb-oc3[data-placement="fixed"] {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 60;
}
@media (min-width: 640px) {
  .hb-oc3[data-placement="fixed"] { right: 20px; bottom: 20px; left: auto; width: 384px; }
}
.hb-oc3-card {
  container-type: inline-size;
  position: relative;
  padding: 14px;
  border: 1px solid var(--hb-oc3-line);
  border-radius: 18px;
  background: var(--hb-oc3-bg);
  box-shadow: 0 24px 48px -20px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.02) inset;
  animation: hb-oc3-up 0.5s cubic-bezier(0.2, 0.9, 0.25, 1) both;
}
.hb-oc3[data-placement="fixed"] .hb-oc3-card {
  padding-bottom: calc(14px + env(safe-area-inset-bottom, 0px));
  border-bottom-width: 0;
  border-radius: 20px 20px 0 0;
}
@media (min-width: 640px) {
  .hb-oc3[data-placement="fixed"] .hb-oc3-card { padding-bottom: 14px; border-bottom-width: 1px; border-radius: 18px; }
}
.hb-oc3[data-leaving="true"] .hb-oc3-card { animation: hb-oc3-down 0.26s ease-in both; }
@keyframes hb-oc3-up {
  from { opacity: 0; transform: translateY(26px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-oc3-down {
  to { opacity: 0; transform: translateY(26px); }
}
.hb-oc3-x {
  position: absolute;
  top: 10px;
  right: 10px;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--hb-oc3-muted);
  cursor: pointer;
  transition: background-color 0.16s ease, color 0.16s ease;
}
.hb-oc3-x:hover { background: var(--hb-oc3-soft); color: var(--hb-oc3-text); }
.hb-oc3-x svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-oc3-top { display: flex; align-items: center; gap: 12px; padding-right: 30px; }
.hb-oc3-icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 44px;
  height: 44px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 6px 16px -6px color-mix(in srgb, var(--hb-oc3-accent) 70%, transparent);
  animation: hb-oc3-pop 0.7s 0.18s cubic-bezier(0.3, 1.6, 0.5, 1) both;
}
.hb-oc3-icon > svg { width: 100%; height: 100%; display: block; }
@keyframes hb-oc3-pop {
  from { transform: scale(0.6) rotate(-8deg); opacity: 0; }
  to { transform: none; opacity: 1; }
}
.hb-oc3-name { display: flex; flex-direction: column; min-width: 0; }
.hb-oc3-name strong { overflow: hidden; font-size: 15px; font-weight: 600; letter-spacing: -0.01em; white-space: nowrap; text-overflow: ellipsis; }
.hb-oc3-name span { overflow: hidden; color: var(--hb-oc3-muted); font-size: 12px; white-space: nowrap; text-overflow: ellipsis; }
.hb-oc3-desc { margin: 10px 0 0; color: var(--hb-oc3-muted); font-size: 13px; line-height: 1.45; }
.hb-oc3-list { display: flex; flex-wrap: wrap; gap: 4px 14px; margin: 9px 0 0; padding: 0; list-style: none; }
.hb-oc3-list li { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; white-space: nowrap; }
.hb-oc3-list svg { width: 14px; height: 14px; flex: none; fill: none; stroke: var(--hb-oc3-accent); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.hb-oc3-actions { display: flex; gap: 8px; margin-top: 12px; }
.hb-oc3-btn {
  display: inline-flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 36px;
  margin: 0;
  padding: 0 14px;
  border: 1px solid var(--hb-oc3-line);
  border-radius: 999px;
  background: transparent;
  color: var(--hb-oc3-text);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.16s ease, filter 0.16s ease, transform 0.12s ease;
}
.hb-oc3-btn:hover { background: var(--hb-oc3-soft); }
.hb-oc3-btn[data-primary="true"] {
  position: relative;
  overflow: hidden;
  border-color: transparent;
  background: var(--hb-oc3-accent);
  color: #ffffff;
}
.hb-oc3-btn[data-primary="true"]::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.35) 50%, transparent 65%);
  transform: translateX(-120%);
  animation: hb-oc3-shine 3.4s 1s ease-in-out infinite;
}
@keyframes hb-oc3-shine {
  0%, 60% { transform: translateX(-120%); }
  85%, 100% { transform: translateX(120%); }
}
.hb-oc3-btn[data-primary="true"]:hover { filter: brightness(1.1); }
.hb-oc3-btn:active { transform: scale(0.97); }
.hb-oc3-btn svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-oc3-x:focus-visible, .hb-oc3-btn:focus-visible { outline: 2px solid var(--hb-oc3-accent); outline-offset: 2px; }
.hb-oc3-steps { display: flex; flex-direction: column; gap: 7px; margin: 10px 0 0; padding: 0; list-style: none; font-size: 13px; }
.hb-oc3-steps li { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.hb-oc3-n {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--hb-oc3-soft);
  color: var(--hb-oc3-muted);
  font-size: 11px;
  font-weight: 600;
}
.hb-oc3-key {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  padding: 0 8px;
  border: 1px solid var(--hb-oc3-line);
  border-radius: 7px;
  background: var(--hb-oc3-soft);
  font-weight: 500;
}
.hb-oc3-key svg { width: 14px; height: 14px; fill: none; stroke: var(--hb-oc3-accent); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-oc3-steps em { color: var(--hb-oc3-muted); font-style: normal; }
.hb-oc3-done {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  height: 36px;
  padding: 0 12px;
  border-radius: 999px;
  background: color-mix(in srgb, #3ccf91 14%, transparent);
  color: #3ccf91;
  font-size: 13px;
  font-weight: 500;
  animation: hb-oc3-up 0.35s ease both;
}
.hb-oc3-done svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
@container (max-width: 290px) {
  .hb-oc3-actions { flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-oc3 *, .hb-oc3 *::before, .hb-oc3 *::after { animation: none !important; transition: none !important; }
}
`;

function writeSnooze(key: string, until: number) {
  try {
    window.localStorage.setItem(key, String(until));
    return true;
  } catch {
    return false;
  }
}

function DefaultIcon({ accent }: { accent: string }) {
  const id = React.useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor="#0b1f4d" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" fill={`url(#${id}g)`} />
      <path d="M17 13c0 2 2 2 2 4M24 11c0 2 2 2 2 4M31 13c0 2 2 2 2 4" fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 23h28a14 14 0 0 1-28 0z" fill="#ffffff" />
      <path d="M13 23h22" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <rect x="18" y="36" width="12" height="3" rx="1.5" fill="#ffffff" fillOpacity="0.85" />
    </svg>
  );
}

export function InstallAppBanner({
  appName = "Corner Kitchen",
  meta = "Free · Installs in seconds",
  description = "Reorder in two taps and track every delivery.",
  benefits = ["Live order tracking", "Works offline"],
  icon,
  snoozeDays = 7,
  storageKey = "install-banner-snooze",
  delay = 1200,
  forceVisible = false,
  mode = "auto",
  placement = "fixed",
  appearance = "dark",
  labels,
  onInstall,
  onDismiss,
  accent = "#2f7bff",
  className,
  style,
  onKeyDown,
  ...rest
}: InstallAppBannerProps) {
  const t = { ...defaultLabels, ...labels };
  const [visible, setVisible] = React.useState(false);
  const [kind, setKind] = React.useState<"prompt" | "ios">("prompt");
  const [phase, setPhase] = React.useState<"idle" | "done">("idle");
  const [leaving, setLeaving] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const deferred = React.useRef<InstallPromptEvent | null>(null);
  const timers = React.useRef<number[]>([]);

  const later = React.useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((id) => window.clearTimeout(id));
  }, []);

  React.useEffect(() => {
    if (forceVisible || typeof window === "undefined") return;
    const nav = navigator as Navigator & { standalone?: boolean };
    const standalone = window.matchMedia?.("(display-mode: standalone)").matches || nav.standalone === true;
    if (standalone) return;
    let snoozed = false;
    try {
      const until = Number(window.localStorage.getItem(storageKey));
      snoozed = Number.isFinite(until) && until > Date.now();
    } catch {
      snoozed = false;
    }
    if (snoozed) return;
    let timer = 0;
    const onPrompt = (event: Event) => {
      event.preventDefault();
      deferred.current = event as InstallPromptEvent;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setKind("prompt");
        setVisible(true);
      }, delay);
    };
    const onInstalled = () => {
      deferred.current = null;
      setVisible(false);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    const ua = nav.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua) || (nav.platform === "MacIntel" && nav.maxTouchPoints > 1);
    const safari = /safari/i.test(ua) && !/crios|fxios|edgios|android/i.test(ua);
    if (ios && safari && mode !== "prompt") {
      timer = window.setTimeout(() => {
        setKind("ios");
        setVisible(true);
      }, delay);
    }
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [forceVisible, storageKey, delay, mode]);

  const shownKind = mode === "auto" ? kind : mode;
  const shown = forceVisible ? !paused : visible;

  const close = (snooze: boolean) => {
    if (snooze && !forceVisible) writeSnooze(storageKey, Date.now() + snoozeDays * 86400000);
    setLeaving(true);
    later(() => {
      setLeaving(false);
      setPhase("idle");
      if (forceVisible) {
        setPaused(true);
        later(() => setPaused(false), 1600);
      } else setVisible(false);
    }, 260);
  };

  const dismiss = () => {
    onDismiss?.();
    close(true);
  };

  const install = async () => {
    const event = deferred.current;
    if (!event) {
      onInstall?.("unavailable");
      if (forceVisible) {
        setPhase("done");
        later(() => close(false), 2200);
      }
      return;
    }
    try {
      await event.prompt();
      const choice = await event.userChoice;
      deferred.current = null;
      onInstall?.(choice.outcome);
      if (choice.outcome === "accepted") {
        setPhase("done");
        later(() => close(false), 2200);
      } else close(true);
    } catch {
      onInstall?.("unavailable");
    }
  };

  if (!shown) return null;

  return (
    <div
      className={["hb-oc3", className].filter(Boolean).join(" ")}
      role="region"
      aria-label={t.region}
      data-placement={placement}
      data-appearance={appearance}
      data-leaving={leaving ? "true" : undefined}
      style={{ "--hb-oc3-accent": accent, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Escape") dismiss();
      }}
      {...rest}
    >
      <style href="hb-install-app-banner" precedence="default">{css}</style>
      <div className="hb-oc3-card">
        <button type="button" className="hb-oc3-x" aria-label={t.close} onClick={dismiss}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <div className="hb-oc3-top">
          <span className="hb-oc3-icon">{icon ?? <DefaultIcon accent={accent} />}</span>
          <span className="hb-oc3-name">
            <strong>{appName}</strong>
            {meta && <span>{meta}</span>}
          </span>
        </div>
        {shownKind === "ios" ? (
          <>
            <p className="hb-oc3-desc">{t.iosIntro}</p>
            <ol className="hb-oc3-steps">
              <li>
                <span className="hb-oc3-n">1</span>
                {t.iosTap}
                <span className="hb-oc3-key">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3v12M8 7l4-4 4 4M7 11H5v10h14V11h-2" />
                  </svg>
                  {t.iosShare}
                </span>
                <em>{t.iosToolbar}</em>
              </li>
              <li>
                <span className="hb-oc3-n">2</span>
                {t.iosChoose}
                <span className="hb-oc3-key">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <path d="M12 8.5v7M8.5 12h7" />
                  </svg>
                  {t.iosAdd}
                </span>
              </li>
            </ol>
            <div className="hb-oc3-actions">
              <button type="button" className="hb-oc3-btn" onClick={dismiss}>
                {t.gotIt}
              </button>
            </div>
          </>
        ) : (
          <>
            {description && <p className="hb-oc3-desc">{description}</p>}
            {benefits.length > 0 && (
              <ul className="hb-oc3-list">
                {benefits.map((b) => (
                  <li key={b}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {phase === "done" ? (
              <div className="hb-oc3-done" role="status">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {t.installed}
              </div>
            ) : (
              <div className="hb-oc3-actions">
                <button type="button" className="hb-oc3-btn" onClick={dismiss}>
                  {t.notNow}
                </button>
                <button type="button" className="hb-oc3-btn" data-primary="true" onClick={() => void install()}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19h14" />
                  </svg>
                  {t.install}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
