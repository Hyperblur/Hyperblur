"use client";

import * as React from "react";

export interface VideoChapter {
  title: string;
  start: number;
  tint?: string;
}

export interface VideoCaption {
  start: number;
  text: string;
}

export interface ModalVideoChaptersProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onProgress"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  trigger?: React.ReactNode;
  title?: string;
  src?: string;
  duration?: number;
  chapters?: VideoChapter[];
  captions?: VideoCaption[];
  autoPlay?: boolean;
  onProgress?: (seconds: number) => void;
  accent?: string;
}

const defaultChapters: VideoChapter[] = [
  { title: "Welcome to Relay", start: 0, tint: "#6d5dfc" },
  { title: "Planning a cycle", start: 72, tint: "#0ea5e9" },
  { title: "Triage inbox", start: 168, tint: "#f97316" },
  { title: "Roadmaps", start: 254, tint: "#10b981" },
  { title: "Shortcuts", start: 336, tint: "#ec4899" },
];

const defaultCaptions: VideoCaption[] = [
  { start: 0, text: "Hi, I’m Dana. Let’s take a quick look around Relay." },
  { start: 9, text: "Everything your team ships starts in a single workspace." },
  { start: 24, text: "On the left you will find teams, projects and views." },
  { start: 72, text: "Cycles keep work moving in two week rhythms." },
  { start: 96, text: "Drag issues into the cycle and Relay balances the load." },
  { start: 168, text: "New requests land in triage before they reach the backlog." },
  { start: 200, text: "Accept, merge or snooze them with a single key." },
  { start: 254, text: "Roadmaps roll projects up into quarterly goals." },
  { start: 336, text: "Press Command K to do anything without the mouse." },
  { start: 380, text: "That’s the tour. Go build something great." },
];

const css = `
.hb-xe9 { --hb-xe9-accent: #ffffff; display: inline-block; box-sizing: border-box; color: #ededed; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe9 *, .hb-xe9 *::before, .hb-xe9 *::after { box-sizing: border-box; }
.hb-xe9[data-embedded] { container-type: size; position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: #0a0a0a; }
.hb-xe9 button:focus-visible, .hb-xe9-scrub:focus-visible { outline: 2px solid var(--hb-xe9-accent); outline-offset: 2px; }
.hb-xe9-card { position: relative; display: grid; align-content: end; width: 240px; aspect-ratio: 16 / 9; padding: 10px; overflow: hidden; border: 0; border-radius: 12px; background: radial-gradient(60% 80% at 20% 20%, #6d5dfc, transparent 60%), radial-gradient(60% 80% at 90% 90%, #0ea5e9, transparent 60%), #111; color: #fff; font: inherit; text-align: left; cursor: pointer; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 16px 30px -16px rgba(0, 0, 0, 0.9); transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.2, 1); }
.hb-xe9-card:hover { transform: translateY(-2px); }
.hb-xe9-card:hover .hb-xe9-cplay { transform: translate(-50%, -50%) scale(1.08); }
.hb-xe9-cplay { position: absolute; top: 46%; left: 50%; display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; background: rgba(255, 255, 255, 0.92); color: #0a0a0a; transform: translate(-50%, -50%); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); transition: transform 0.3s cubic-bezier(0.3, 0.7, 0.4, 1.4); }
.hb-xe9-cplay svg { width: 15px; height: 15px; margin-left: 2px; }
.hb-xe9-clabel { position: relative; font-size: 12.5px; font-weight: 600; text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5); }
.hb-xe9-cdur { position: absolute; top: 8px; right: 8px; padding: 2px 6px; border-radius: 5px; background: rgba(0, 0, 0, 0.55); font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; }
.hb-xe9-layer { container-type: inline-size; position: fixed; inset: 0; z-index: 1000; height: 100dvh; display: grid; place-items: center; padding: 16px; }
.hb-xe9[data-embedded] .hb-xe9-layer { position: absolute; height: auto; z-index: 2; padding: 8px; }
.hb-xe9-scrim { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.82); animation: hb-xe9-fade 0.3s ease both; }
.hb-xe9-layer[data-state="closed"] .hb-xe9-scrim { animation: hb-xe9-fade-out 0.25s ease both; }
.hb-xe9-panel { position: relative; width: min(960px, 100%, calc((100dvh - 32px) * 16 / 9)); outline: none; animation: hb-xe9-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.hb-xe9[data-embedded] .hb-xe9-panel { width: min(100%, calc((100cqh - 16px) * 16 / 9)); }
.hb-xe9-layer[data-state="closed"] .hb-xe9-panel { animation: hb-xe9-out 0.25s ease both; }
.hb-xe9-player { position: relative; aspect-ratio: 16 / 9; max-height: calc(100dvh - 32px); overflow: hidden; border-radius: 14px; background: #000; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 40px 100px -30px rgba(0, 0, 0, 1); }
.hb-xe9[data-embedded] .hb-xe9-player { max-height: none; }
.hb-xe9-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hb-xe9-scene { position: absolute; inset: 0; display: grid; place-items: center; background: radial-gradient(50% 60% at 30% 30%, color-mix(in srgb, var(--hb-xe9-tint) 70%, transparent), transparent 70%), radial-gradient(60% 70% at 80% 80%, color-mix(in srgb, var(--hb-xe9-tint) 40%, #000), transparent 70%), #07070a; transition: background 0.6s ease; }
.hb-xe9-scene::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 3px); }
.hb-xe9-chap { position: relative; display: grid; justify-items: center; gap: 4px; text-align: center; animation: hb-xe9-kb 0.8s cubic-bezier(0.2, 0.9, 0.2, 1) both; }
.hb-xe9-chap small { font-family: var(--font-mono, ui-monospace, monospace); font-size: clamp(9px, 1.6cqw, 12px); letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255, 255, 255, 0.6); }
.hb-xe9-chap b { font-family: var(--font-grotesk, inherit); font-size: clamp(16px, 5cqw, 44px); font-weight: 600; letter-spacing: -0.03em; }
.hb-xe9-top { position: absolute; top: 0; left: 0; right: 0; display: flex; align-items: center; gap: 10px; padding: clamp(8px, 2cqw, 16px); background: linear-gradient(180deg, rgba(0, 0, 0, 0.6), transparent); }
.hb-xe9-title { flex: 1; min-width: 0; margin: 0; font-size: clamp(11.5px, 1.7cqw, 14px); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe9-x { flex: none; display: grid; place-items: center; width: 30px; height: 30px; border: 0; border-radius: 50%; background: rgba(255, 255, 255, 0.12); color: #fff; cursor: pointer; -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); transition: background-color 0.2s ease; }
.hb-xe9-x:hover { background: rgba(255, 255, 255, 0.24); }
.hb-xe9-x svg { width: 13px; height: 13px; }
.hb-xe9-big { position: absolute; top: 50%; left: 50%; display: grid; place-items: center; width: clamp(44px, 10cqw, 76px); height: clamp(44px, 10cqw, 76px); border: 0; border-radius: 50%; background: rgba(255, 255, 255, 0.94); color: #0a0a0a; cursor: pointer; transform: translate(-50%, -50%); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5); animation: hb-xe9-pop 0.35s cubic-bezier(0.3, 0.7, 0.4, 1.4) both; }
.hb-xe9-big svg { width: 36%; height: 36%; margin-left: 6%; }
.hb-xe9-cap { position: absolute; left: 50%; bottom: clamp(52px, 11cqw, 78px); max-width: 86%; padding: 4px 10px; border-radius: 6px; background: rgba(0, 0, 0, 0.72); color: #fff; font-size: clamp(10.5px, 1.9cqw, 16px); line-height: 1.4; text-align: center; transform: translateX(-50%); animation: hb-xe9-cap 0.25s ease both; }
.hb-xe9-ctrl { position: absolute; left: 0; right: 0; bottom: 0; display: grid; gap: clamp(4px, 1cqw, 8px); padding: clamp(18px, 4cqw, 36px) clamp(8px, 2cqw, 16px) clamp(6px, 1.6cqw, 12px); background: linear-gradient(0deg, rgba(0, 0, 0, 0.78), transparent); transition: opacity 0.3s ease; }
.hb-xe9-player[data-idle="true"] .hb-xe9-ctrl, .hb-xe9-player[data-idle="true"] .hb-xe9-top { opacity: 0; }
.hb-xe9-scrub { position: relative; display: flex; gap: 3px; height: 14px; align-items: center; cursor: pointer; touch-action: none; border-radius: 4px; }
.hb-xe9-seg { position: relative; flex: var(--hb-xe9-w) 1 0; height: 4px; border-radius: 3px; background: rgba(255, 255, 255, 0.22); overflow: hidden; transition: height 0.2s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe9-scrub:hover .hb-xe9-seg, .hb-xe9-scrub:focus-visible .hb-xe9-seg { height: 7px; }
.hb-xe9-seg i { position: absolute; inset: 0; background: var(--hb-xe9-accent); transform-origin: left; transform: scaleX(var(--hb-xe9-p)); font-style: normal; }
.hb-xe9-seg b { position: absolute; inset: 0; background: rgba(255, 255, 255, 0.35); transform-origin: left; transform: scaleX(var(--hb-xe9-h, 0)); }
.hb-xe9-tip { position: absolute; bottom: 18px; padding: 4px 8px; border-radius: 6px; background: #fff; color: #0a0a0a; font-size: 11px; font-weight: 600; white-space: nowrap; transform: translateX(-50%); pointer-events: none; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4); }
.hb-xe9-tip span { margin-left: 6px; font-family: var(--font-mono, ui-monospace, monospace); font-weight: 500; color: #555; }
.hb-xe9-row { display: flex; align-items: center; gap: clamp(2px, 0.8cqw, 8px); }
.hb-xe9-btn { display: grid; place-items: center; min-width: 30px; height: 30px; padding: 0 6px; border: 0; border-radius: 7px; background: transparent; color: #fff; font: inherit; font-size: 12px; font-weight: 600; cursor: pointer; transition: background-color 0.18s ease; }
.hb-xe9-btn:hover { background: rgba(255, 255, 255, 0.14); }
.hb-xe9-btn[aria-pressed="true"] { background: rgba(255, 255, 255, 0.92); color: #0a0a0a; }
.hb-xe9-btn svg { width: 16px; height: 16px; }
.hb-xe9-time { font-family: var(--font-mono, ui-monospace, monospace); font-size: clamp(10.5px, 1.6cqw, 12px); font-variant-numeric: tabular-nums; color: rgba(255, 255, 255, 0.85); white-space: nowrap; }
.hb-xe9-now { flex: 1; min-width: 0; color: rgba(255, 255, 255, 0.7); font-size: clamp(10.5px, 1.6cqw, 12.5px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
@container (max-width: 420px) {
  .hb-xe9-now, .hb-xe9-hide-sm { display: none; }
  .hb-xe9-row { justify-content: space-between; }
}
@keyframes hb-xe9-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-xe9-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xe9-in { from { opacity: 0; transform: translateY(24px) scale(0.94); } to { opacity: 1; transform: none; } }
@keyframes hb-xe9-out { from { opacity: 1; } to { opacity: 0; transform: scale(0.96); } }
@keyframes hb-xe9-kb { from { opacity: 0; transform: scale(1.06); filter: blur(6px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes hb-xe9-pop { from { opacity: 0; transform: translate(-50%, -50%) scale(0.7); } to { opacity: 1; transform: translate(-50%, -50%); } }
@keyframes hb-xe9-cap { from { opacity: 0; transform: translate(-50%, 4px); } to { opacity: 1; transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe9-scrim, .hb-xe9-panel, .hb-xe9-chap, .hb-xe9-big, .hb-xe9-cap, .hb-xe9-layer[data-state="closed"] .hb-xe9-panel, .hb-xe9-layer[data-state="closed"] .hb-xe9-scrim { animation: none; }
  .hb-xe9-layer[data-state="closed"] { opacity: 0; }
  .hb-xe9-scene, .hb-xe9-seg, .hb-xe9-ctrl, .hb-xe9-card, .hb-xe9-cplay, .hb-xe9-btn, .hb-xe9-x { transition: none; }
}
`;

const focusable =
  'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),video[controls],[tabindex]:not([tabindex="-1"])';

function useLayer(
  open: boolean,
  embedded: boolean,
  panel: React.RefObject<HTMLElement | null>,
  onClose: () => void,
  userOpened: React.RefObject<boolean>,
) {
  const closeRef = React.useRef(onClose);
  React.useEffect(() => {
    closeRef.current = onClose;
  });
  React.useEffect(() => {
    if (!open) return;
    const node = panel.current;
    const steal = !embedded || userOpened.current;
    const previous = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const overflow = html.style.overflow;
    if (!embedded) html.style.overflow = "hidden";
    if (steal && node) {
      const target = node.querySelector<HTMLElement>("[data-autofocus]") ?? node.querySelector<HTMLElement>(focusable) ?? node;
      target.focus({ preventScroll: true });
    }
    const onKey = (e: KeyboardEvent) => {
      if (!node) return;
      if (embedded && !node.contains(document.activeElement)) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(focusable)).filter((el) => el.getClientRects().length > 0);
      if (!items.length) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!node.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (!embedded) html.style.overflow = overflow;
      if (steal && previous && previous.isConnected && previous !== document.body) previous.focus({ preventScroll: true });
    };
  }, [open, embedded, panel, userOpened]);
}

function fmt(s: number) {
  const v = Math.max(0, Math.floor(s));
  return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, "0")}`;
}

const speeds = [1, 1.5, 2];

export function ModalVideoChapters({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  trigger = "Watch the tour",
  title = "Inside Relay: a six minute tour",
  src,
  duration = 400,
  chapters = defaultChapters,
  captions = defaultCaptions,
  autoPlay = true,
  onProgress,
  accent = "#ffffff",
  className = "",
  style,
  ...rest
}: ModalVideoChaptersProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [present, setPresent] = React.useState(isOpen);
  const [time, setTime] = React.useState(embedded ? 84 : 0);
  const [length, setLength] = React.useState(duration);
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [cc, setCc] = React.useState(true);
  const [speed, setSpeed] = React.useState(1);
  const [hover, setHover] = React.useState<number | null>(null);
  const [idle, setIdle] = React.useState(false);
  const userOpened = React.useRef(false);
  const panel = React.useRef<HTMLDivElement>(null);
  const video = React.useRef<HTMLVideoElement>(null);
  const bar = React.useRef<HTMLDivElement>(null);
  const idleTimer = React.useRef(0);
  const id = React.useId();

  if (isOpen && !present) setPresent(true);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) {
        userOpened.current = true;
        setPlaying(autoPlay);
      } else {
        setPlaying(false);
        video.current?.pause();
      }
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange, autoPlay],
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);

  React.useEffect(() => {
    if (isOpen || !present) return;
    const t = setTimeout(() => setPresent(false), 260);
    return () => clearTimeout(t);
  }, [isOpen, present]);

  React.useEffect(() => {
    if (src || !playing || !isOpen) return;
    const t = setInterval(() => {
      setTime((v) => {
        const n = v + 0.25 * speed;
        if (n >= length) {
          setPlaying(false);
          return length;
        }
        return n;
      });
    }, 250);
    return () => clearInterval(t);
  }, [src, playing, isOpen, speed, length]);

  React.useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = muted;
    v.playbackRate = speed;
    if (playing && isOpen) v.play().catch(() => setPlaying(false));
    else v.pause();
  }, [playing, muted, speed, isOpen, present]);

  const progressRef = React.useRef(onProgress);
  React.useEffect(() => {
    progressRef.current = onProgress;
  });
  const whole = Math.floor(time);
  React.useEffect(() => {
    progressRef.current?.(whole);
  }, [whole]);

  React.useEffect(() => () => clearTimeout(idleTimer.current), []);

  useLayer(isOpen, embedded, panel, close, userOpened);

  function seek(t: number) {
    const n = Math.min(Math.max(t, 0), length);
    setTime(n);
    if (video.current) video.current.currentTime = n;
  }

  function wake() {
    setIdle(false);
    clearTimeout(idleTimer.current);
    if (playing) idleTimer.current = window.setTimeout(() => setIdle(true), 2400);
  }

  function at(clientX: number) {
    const el = bar.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return (Math.min(Math.max(clientX - r.left, 0), r.width) / r.width) * length;
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const t = e.target as HTMLElement;
    if (t.getAttribute("role") === "slider") return;
    if (e.key === " " || e.key === "k") {
      if (t.tagName === "BUTTON" && e.key === " ") return;
      e.preventDefault();
      setPlaying((p) => !p);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      seek(time + 5);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      seek(time - 5);
    } else if (e.key === "m") {
      setMuted((m) => !m);
    } else if (e.key === "c") {
      setCc((c) => !c);
    }
    wake();
  }

  function onSliderKey(e: React.KeyboardEvent<HTMLDivElement>) {
    const map: Record<string, number> = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5, PageUp: 30, PageDown: -30 };
    if (e.key in map) {
      e.preventDefault();
      seek(time + map[e.key]);
    } else if (e.key === "Home") {
      e.preventDefault();
      seek(0);
    } else if (e.key === "End") {
      e.preventDefault();
      seek(length);
    }
  }

  const ci = Math.max(0, chapters.reduce((acc, c, i) => (time >= c.start ? i : acc), 0));
  const chapter = chapters[ci];
  const caption = captions.reduce<VideoCaption | null>((acc, c) => (time >= c.start ? c : acc), null);
  const hoverChapter = hover === null ? null : chapters.reduce((acc, c, i) => (hover >= c.start ? i : acc), 0);
  const vars = { "--hb-xe9-accent": accent, "--hb-xe9-tint": chapter?.tint ?? "#6d5dfc", ...style } as React.CSSProperties;
  const playIcon = <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" /></svg>;
  const pauseIcon = <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="3.5" y="2.5" width="3.2" height="11" rx="1" /><rect x="9.3" y="2.5" width="3.2" height="11" rx="1" /></svg>;

  return (
    <div className={`hb-xe9 ${className}`} data-embedded={embedded || undefined} style={vars} {...rest}>
      <style href="hb-xe9-css" precedence="default">{css}</style>
      {trigger !== null && (
        <button type="button" className="hb-xe9-card" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setOpen(true)}>
          <span className="hb-xe9-cdur">{fmt(length)}</span>
          <span className="hb-xe9-cplay" aria-hidden="true">{playIcon}</span>
          <span className="hb-xe9-clabel">{trigger}</span>
        </button>
      )}
      {present && (
        <div className="hb-xe9-layer" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xe9-scrim" onClick={close} aria-hidden="true" />
          <div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-t`}
            tabIndex={-1}
            className="hb-xe9-panel"
            onKeyDown={onKeyDown}
          >
            <div className="hb-xe9-player" data-idle={idle && playing ? "true" : undefined} onPointerMove={wake}>
              {src ? (
                <video
                  ref={video}
                  className="hb-xe9-video"
                  src={src}
                  playsInline
                  preload="metadata"
                  onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => setLength(e.currentTarget.duration || duration)}
                  onEnded={() => setPlaying(false)}
                  onClick={() => setPlaying((p) => !p)}
                />
              ) : (
                <div className="hb-xe9-scene" onClick={() => setPlaying((p) => !p)} aria-hidden="true">
                  <div key={ci} className="hb-xe9-chap">
                    <small>Chapter {String(ci + 1).padStart(2, "0")}</small>
                    <b>{chapter?.title}</b>
                  </div>
                </div>
              )}
              <div className="hb-xe9-top">
                <h2 id={`${id}-t`} className="hb-xe9-title">{title}</h2>
                <button type="button" className="hb-xe9-x" aria-label="Close video" onClick={close}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m4 4 8 8m0-8-8 8" /></svg>
                </button>
              </div>
              {!playing && (
                <button type="button" className="hb-xe9-big" aria-label="Play" onClick={() => setPlaying(true)}>{playIcon}</button>
              )}
              {cc && caption && (
                <p key={caption.start} className="hb-xe9-cap" aria-live="polite" style={{ margin: 0 }}>{caption.text}</p>
              )}
              <div className="hb-xe9-ctrl">
                <div
                  ref={bar}
                  className="hb-xe9-scrub"
                  role="slider"
                  tabIndex={0}
                  aria-label="Seek"
                  aria-valuemin={0}
                  aria-valuemax={Math.round(length)}
                  aria-valuenow={Math.round(time)}
                  aria-valuetext={`${fmt(time)} of ${fmt(length)}, ${chapter?.title ?? ""}`}
                  onKeyDown={onSliderKey}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    seek(at(e.clientX));
                  }}
                  onPointerMove={(e) => {
                    const t = at(e.clientX);
                    setHover(t);
                    if (e.currentTarget.hasPointerCapture(e.pointerId)) seek(t);
                  }}
                  onPointerLeave={() => setHover(null)}
                >
                  {chapters.map((c, i) => {
                    const end = chapters[i + 1]?.start ?? length;
                    const span = Math.max(end - c.start, 1);
                    const p = Math.min(Math.max((time - c.start) / span, 0), 1);
                    const h = hover === null ? 0 : Math.min(Math.max((hover - c.start) / span, 0), 1);
                    return (
                      <span
                        key={c.title}
                        className="hb-xe9-seg"
                        style={{ "--hb-xe9-w": span.toFixed(0), "--hb-xe9-p": p.toFixed(4), "--hb-xe9-h": h.toFixed(4) } as React.CSSProperties}
                      >
                        <b />
                        <i />
                      </span>
                    );
                  })}
                  {hover !== null && hoverChapter !== null && (
                    <span className="hb-xe9-tip" style={{ left: `${((hover / length) * 100).toFixed(2)}%` }}>
                      {chapters[hoverChapter]?.title}
                      <span>{fmt(hover)}</span>
                    </span>
                  )}
                </div>
                <div className="hb-xe9-row">
                  <button type="button" className="hb-xe9-btn" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying((p) => !p)}>
                    {playing ? pauseIcon : playIcon}
                  </button>
                  <button type="button" className="hb-xe9-btn hb-xe9-hide-sm" aria-label="Back 10 seconds" onClick={() => seek(time - 10)}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.5-3.6M3 2.5v2.5h2.5" /></svg>
                  </button>
                  <span className="hb-xe9-time">{fmt(time)} / {fmt(length)}</span>
                  <span className="hb-xe9-now">· {chapter?.title}</span>
                  <button type="button" className="hb-xe9-btn" aria-label="Captions" aria-pressed={cc} onClick={() => setCc((c) => !c)}>CC</button>
                  <button
                    type="button"
                    className="hb-xe9-btn"
                    aria-label={`Playback speed ${speed}x`}
                    onClick={() => setSpeed((s) => speeds[(speeds.indexOf(s) + 1) % speeds.length])}
                  >
                    {speed}x
                  </button>
                  <button type="button" className="hb-xe9-btn" aria-label={muted ? "Unmute" : "Mute"} aria-pressed={muted} onClick={() => setMuted((m) => !m)}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2.5 6v4h2.5L8.5 13V3L5 6Z" fill="currentColor" />
                      {muted ? <path d="m11 6 3.5 4m0-4L11 10" /> : <path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.6a6 6 0 0 1 0 8.8" />}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
