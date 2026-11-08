"use client";

import * as React from "react";

export interface CreateProjectValues {
  name: string;
  slug: string;
  team: string;
  visibility: "private" | "team" | "public";
}

export interface DialogCreateProjectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onSubmit"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  trigger?: React.ReactNode;
  title?: string;
  domain?: string;
  teams?: string[];
  takenSlugs?: string[];
  defaultName?: string;
  onSubmit?: (values: CreateProjectValues) => void | Promise<void>;
  accent?: string;
}

const visibilities: { id: CreateProjectValues["visibility"]; label: string; hint: string; icon: string }[] = [
  { id: "private", label: "Private", hint: "Only you", icon: "M5 8.5V6.5a3 3 0 0 1 6 0v2M4 8.5h8v5H4z" },
  { id: "team", label: "Team", hint: "Your team", icon: "M6 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.5 13a3.5 3.5 0 0 1 7 0M11 7.5a1.6 1.6 0 1 0 0-3.2M11.5 13H13.5a3 3 0 0 0-2.5-3" },
  { id: "public", label: "Public", hint: "Anyone", icon: "M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2.5 8h11M8 2.5c1.6 1.6 2.3 3.4 2.3 5.5S9.6 11.9 8 13.5C6.4 11.9 5.7 10.1 5.7 8S6.4 4.1 8 2.5Z" },
];

const css = `
.hb-xe7 { --hb-xe7-accent: #7c5cff; display: inline-block; box-sizing: border-box; color: #ededed; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe7 *, .hb-xe7 *::before, .hb-xe7 *::after { box-sizing: border-box; }
.hb-xe7[data-embedded] { position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: #0b0b0d; }
.hb-xe7-trigger { display: inline-flex; align-items: center; gap: 7px; height: 34px; padding: 0 14px 0 11px; border: 0; border-radius: 9px; background: var(--hb-xe7-accent); color: #fff; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 8px 18px -10px var(--hb-xe7-accent); transition: filter 0.2s ease, transform 0.15s ease; }
.hb-xe7-trigger:hover { filter: brightness(1.08); }
.hb-xe7-trigger:active { transform: scale(0.97); }
.hb-xe7-trigger svg { width: 14px; height: 14px; }
.hb-xe7 button:focus-visible { outline: 2px solid var(--hb-xe7-accent); outline-offset: 2px; }
.hb-xe7-layer { position: fixed; inset: 0; z-index: 1000; height: 100dvh; display: grid; place-items: center; padding: 16px; }
.hb-xe7[data-embedded] .hb-xe7-layer { position: absolute; height: auto; z-index: 2; padding: 10px; }
.hb-xe7-scrim { position: absolute; inset: 0; background: rgba(5, 4, 10, 0.6); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); animation: hb-xe7-fade 0.25s ease both; }
.hb-xe7-layer[data-state="closed"] .hb-xe7-scrim { animation: hb-xe7-fade-out 0.2s ease both; }
.hb-xe7-panel { position: relative; width: 100%; max-width: 460px; max-height: 100%; overflow: auto; border: 1px solid #27262d; border-radius: 16px; background: linear-gradient(180deg, #16151a, #111014); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 30px 80px -24px rgba(0, 0, 0, 0.9); outline: none; animation: hb-xe7-in 0.34s cubic-bezier(0.2, 0.9, 0.25, 1) both; transition: height 0.38s cubic-bezier(0.2, 0.9, 0.25, 1); }
.hb-xe7-layer[data-state="closed"] .hb-xe7-panel { animation: hb-xe7-out 0.2s ease both; }
.hb-xe7-form { display: grid; gap: 14px; padding: 16px 18px 0; }
.hb-xe7-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hb-xe7-title { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.hb-xe7-crumb { display: inline-flex; align-items: center; gap: 6px; color: #8a8993; font-size: 12px; }
.hb-xe7-crumb i { width: 14px; height: 14px; border-radius: 4px; background: linear-gradient(135deg, var(--hb-xe7-accent), #f472b6); font-style: normal; }
.hb-xe7-label { display: block; margin-bottom: 6px; color: #a09fa8; font-size: 12px; font-weight: 500; }
.hb-xe7-input { display: block; width: 100%; height: 38px; padding: 0 12px; border: 1px solid #2c2b33; border-radius: 10px; background: #0d0c10; color: #ededed; font: inherit; font-size: 14px; outline: none; transition: border-color 0.18s ease, box-shadow 0.18s ease; }
.hb-xe7-input::placeholder { color: #55545c; }
.hb-xe7-input:focus { border-color: var(--hb-xe7-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xe7-accent) 22%, transparent); }
.hb-xe7-input[aria-invalid="true"] { border-color: #f43f5e; box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.18); }
.hb-xe7-input[data-shake="a"] { animation: hb-xe7-shake-a 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xe7-input[data-shake="b"] { animation: hb-xe7-shake-b 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xe7-url { display: flex; align-items: center; gap: 6px; min-height: 20px; margin-top: 7px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11.5px; color: #6e6d76; }
.hb-xe7-url b { color: #d6d5dd; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe7-stat { display: inline-flex; align-items: center; gap: 4px; margin-left: auto; font-family: var(--font-sans, inherit); font-size: 11.5px; white-space: nowrap; }
.hb-xe7-stat[data-s="ok"] { color: #4fd18b; }
.hb-xe7-stat[data-s="taken"] { color: #ff7a8a; }
.hb-xe7-stat svg { width: 12px; height: 12px; }
.hb-xe7-spin { width: 11px; height: 11px; border-radius: 50%; border: 1.5px solid #3a3942; border-top-color: #a09fa8; animation: hb-xe7-spin 0.7s linear infinite; }
.hb-xe7-err { margin: 6px 0 0; color: #ff7a8a; font-size: 11.5px; }
.hb-xe7-seg { position: relative; display: grid; grid-template-columns: repeat(var(--hb-xe7-n), 1fr); padding: 3px; border-radius: 10px; background: #0d0c10; box-shadow: inset 0 0 0 1px #24232a; }
.hb-xe7-thumb { position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc((100% - 6px) / var(--hb-xe7-n)); border-radius: 7px; background: linear-gradient(180deg, #2a2932, #222128); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 2px 6px rgba(0, 0, 0, 0.4); transform: translateX(calc(var(--hb-xe7-i) * 100%)); transition: transform 0.36s cubic-bezier(0.3, 0.9, 0.3, 1.05); }
.hb-xe7-segbtn { position: relative; z-index: 1; height: 30px; border: 0; border-radius: 7px; background: transparent; color: #8a8993; font: inherit; font-size: 12.5px; font-weight: 550; cursor: pointer; transition: color 0.2s ease; }
.hb-xe7-segbtn[aria-checked="true"] { color: #f4f4f5; }
.hb-xe7-vis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.hb-xe7-card { display: grid; justify-items: start; gap: 2px; padding: 9px 10px; border: 1px solid #26252c; border-radius: 10px; background: #0f0e12; color: inherit; font: inherit; text-align: left; cursor: pointer; transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.15s ease; }
.hb-xe7-card:hover { border-color: #34333c; }
.hb-xe7-card:active { transform: scale(0.98); }
.hb-xe7-card[aria-checked="true"] { border-color: var(--hb-xe7-accent); background: color-mix(in srgb, var(--hb-xe7-accent) 9%, #0f0e12); }
.hb-xe7-card svg { width: 15px; height: 15px; color: #8a8993; margin-bottom: 3px; }
.hb-xe7-card[aria-checked="true"] svg { color: var(--hb-xe7-accent); }
.hb-xe7-card b { font-size: 12.5px; font-weight: 600; }
.hb-xe7-card span { color: #7a7983; font-size: 11px; }
.hb-xe7-foot { display: flex; align-items: center; gap: 8px; padding: 16px 18px; }
.hb-xe7-kbd { margin-right: auto; display: inline-flex; align-items: center; gap: 4px; color: #6e6d76; font-size: 11.5px; }
.hb-xe7-kbd kbd { display: inline-grid; place-items: center; min-width: 18px; height: 18px; padding: 0 4px; border-radius: 5px; background: #1c1b21; box-shadow: inset 0 -1px 0 #2e2d35, inset 0 0 0 1px #2a2930; color: #a09fa8; font-family: inherit; font-size: 10.5px; }
.hb-xe7-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; height: 34px; padding: 0 14px; border: 1px solid #2c2b33; border-radius: 9px; background: transparent; color: #cfced6; font: inherit; font-size: 13px; font-weight: 550; white-space: nowrap; cursor: pointer; transition: background-color 0.15s ease, transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe7-btn:hover { background: #1c1b21; }
.hb-xe7-btn:active { transform: scale(0.97); }
.hb-xe7-btn[data-primary] { min-width: 122px; border-color: transparent; background: var(--hb-xe7-accent); color: #fff; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22); }
.hb-xe7-btn[data-primary]:hover { background: color-mix(in srgb, var(--hb-xe7-accent) 88%, #fff); }
.hb-xe7-btn .hb-xe7-spin { border-color: rgba(255, 255, 255, 0.3); border-top-color: #fff; }
.hb-xe7-success { display: grid; justify-items: center; gap: 6px; padding: 26px 18px 18px; text-align: center; animation: hb-xe7-rise 0.45s cubic-bezier(0.2, 0.9, 0.25, 1) both; }
.hb-xe7-badge { display: grid; place-items: center; width: 48px; height: 48px; margin-bottom: 6px; border-radius: 14px; background: linear-gradient(135deg, var(--hb-xe7-accent), #f472b6); color: #fff; font-family: var(--font-grotesk, inherit); font-size: 20px; font-weight: 700; box-shadow: 0 12px 30px -10px var(--hb-xe7-accent), inset 0 1px 0 rgba(255, 255, 255, 0.3); }
.hb-xe7-success p { margin: 0; color: #9a99a3; font-size: 12.5px; }
.hb-xe7-success code { font-family: var(--font-mono, ui-monospace, monospace); color: #d6d5dd; font-size: 12px; }
.hb-xe7-success .hb-xe7-row { display: flex; gap: 8px; margin-top: 12px; }
.hb-xe7[data-embedded] .hb-xe7-form { gap: 10px; padding-top: 14px; }
.hb-xe7[data-embedded] .hb-xe7-card span { display: none; }
.hb-xe7[data-embedded] .hb-xe7-foot { padding: 12px 18px 14px; }
@keyframes hb-xe7-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-xe7-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xe7-in { from { opacity: 0; transform: translateY(10px) scale(0.97); } to { opacity: 1; transform: none; } }
@keyframes hb-xe7-out { from { opacity: 1; } to { opacity: 0; transform: scale(0.97); } }
@keyframes hb-xe7-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes hb-xe7-spin { to { transform: rotate(360deg); } }
@keyframes hb-xe7-shake-a { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }
@keyframes hb-xe7-shake-b { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe7-scrim, .hb-xe7-panel, .hb-xe7-success, .hb-xe7-input[data-shake], .hb-xe7-layer[data-state="closed"] .hb-xe7-panel, .hb-xe7-layer[data-state="closed"] .hb-xe7-scrim { animation: none; }
  .hb-xe7-layer[data-state="closed"] { opacity: 0; }
  .hb-xe7-panel, .hb-xe7-thumb, .hb-xe7-segbtn, .hb-xe7-card, .hb-xe7-btn, .hb-xe7-input, .hb-xe7-trigger { transition: none; }
}
`;

const focusable =
  'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])';

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

function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function DialogCreateProject({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  trigger = "New project",
  title = "Create project",
  domain = "acme.dev",
  teams = ["Design", "Engineering", "Growth"],
  takenSlugs = ["website", "api", "mobile-app"],
  defaultName = "Checkout redesign",
  onSubmit,
  accent = "#7c5cff",
  className = "",
  style,
  ...rest
}: DialogCreateProjectProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [present, setPresent] = React.useState(isOpen);
  const [name, setName] = React.useState(defaultName);
  const [team, setTeam] = React.useState(teams[1] ?? teams[0] ?? "");
  const [visibility, setVisibility] = React.useState<CreateProjectValues["visibility"]>("team");
  const [checked, setChecked] = React.useState(slugify(defaultName));
  const [error, setError] = React.useState("");
  const [shake, setShake] = React.useState<"a" | "b" | undefined>(undefined);
  const [phase, setPhase] = React.useState<"form" | "busy" | "done">("form");
  const [height, setHeight] = React.useState<number | undefined>(undefined);
  const userOpened = React.useRef(false);
  const panel = React.useRef<HTMLDivElement>(null);
  const content = React.useRef<HTMLDivElement>(null);
  const input = React.useRef<HTMLInputElement>(null);
  const id = React.useId();
  const slug = slugify(name);

  if (isOpen && !present) setPresent(true);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) {
        userOpened.current = true;
        setPhase("form");
        setError("");
      }
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );
  const close = React.useCallback(() => {
    if (phase !== "busy") setOpen(false);
  }, [phase, setOpen]);

  React.useEffect(() => {
    if (isOpen || !present) return;
    const t = setTimeout(() => setPresent(false), 220);
    return () => clearTimeout(t);
  }, [isOpen, present]);

  React.useEffect(() => {
    const t = setTimeout(() => setChecked(slug), 480);
    return () => clearTimeout(t);
  }, [slug]);

  React.useEffect(() => {
    const node = content.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setHeight(node.offsetHeight + 2));
    ro.observe(node);
    return () => ro.disconnect();
  }, [present]);

  useLayer(isOpen, embedded, panel, close, userOpened);

  React.useEffect(() => {
    if (phase === "done") panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });
  }, [phase]);

  const status: "none" | "checking" | "ok" | "taken" = !slug ? "none" : slug !== checked ? "checking" : takenSlugs.includes(slug) ? "taken" : "ok";

  function fail(message: string) {
    setError(message);
    setShake((s) => (s === "a" ? "b" : "a"));
    input.current?.focus();
  }

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (phase !== "form") return;
    if (name.trim().length < 2) return fail("Give the project a name with at least 2 characters.");
    if (status === "taken") return fail(`${domain}/${slug} is already in use. Try another name.`);
    setError("");
    setPhase("busy");
    const values: CreateProjectValues = { name: name.trim(), slug, team, visibility };
    const started = performance.now();
    Promise.resolve()
      .then(() => onSubmit?.(values))
      .then(
        () => {
          const wait = Math.max(0, 650 - (performance.now() - started));
          window.setTimeout(() => setPhase("done"), wait);
        },
        () => {
          setPhase("form");
          fail("Could not create the project. Try again.");
        },
      );
  }

  function onSegKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = teams.indexOf(team);
    const next = teams[(i + (e.key === "ArrowRight" ? 1 : -1) + teams.length) % teams.length];
    setTeam(next);
    e.currentTarget.querySelector<HTMLElement>(`[data-v="${next}"]`)?.focus();
  }

  function onVisKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = visibilities.findIndex((v) => v.id === visibility);
    const next = visibilities[(i + (e.key === "ArrowRight" ? 1 : -1) + 3) % 3].id;
    setVisibility(next);
    e.currentTarget.querySelector<HTMLElement>(`[data-v="${next}"]`)?.focus();
  }

  const vars = { "--hb-xe7-accent": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-xe7 ${className}`} data-embedded={embedded || undefined} style={vars} {...rest}>
      <style href="hb-xe7-css" precedence="default">{css}</style>
      {trigger !== null && (
        <button type="button" className="hb-xe7-trigger" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setOpen(true)}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M8 3.5v9M3.5 8h9" /></svg>
          {trigger}
        </button>
      )}
      {present && (
        <div className="hb-xe7-layer" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xe7-scrim" onClick={close} aria-hidden="true" />
          <div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-t`}
            tabIndex={-1}
            className="hb-xe7-panel"
            style={height ? { height } : undefined}
          >
            <div ref={content}>
              {phase === "done" ? (
                <div className="hb-xe7-success" role="status">
                  <span className="hb-xe7-badge" aria-hidden="true">{name.trim().charAt(0).toUpperCase()}</span>
                  <h2 id={`${id}-t`} className="hb-xe7-title">{name.trim()} is ready</h2>
                  <p>
                    Live at <code>{domain}/{slug}</code> for {visibility === "public" ? "everyone" : visibility === "team" ? team : "you"}.
                  </p>
                  <div className="hb-xe7-row">
                    <button type="button" className="hb-xe7-btn" onClick={() => setOpen(false)}>Close</button>
                    <button type="button" className="hb-xe7-btn" data-primary="" data-autofocus="" onClick={() => setOpen(false)}>Open project</button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
                  }}
                  noValidate
                >
                  <div className="hb-xe7-form">
                    <div className="hb-xe7-head">
                      <h2 id={`${id}-t`} className="hb-xe7-title">{title}</h2>
                      <span className="hb-xe7-crumb"><i aria-hidden="true" />{domain}</span>
                    </div>
                    <div>
                      <label className="hb-xe7-label" htmlFor={`${id}-n`}>Project name</label>
                      <input
                        ref={input}
                        id={`${id}-n`}
                        className="hb-xe7-input"
                        value={name}
                        placeholder="Mobile onboarding"
                        autoComplete="off"
                        data-autofocus=""
                        data-shake={shake}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={`${id}-u`}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (error) setError("");
                        }}
                      />
                      <div id={`${id}-u`} className="hb-xe7-url">
                        <span>{domain}/</span>
                        <b>{slug || "your-project"}</b>
                        {status === "checking" && <span className="hb-xe7-stat"><span className="hb-xe7-spin" aria-hidden="true" />Checking</span>}
                        {status === "ok" && (
                          <span className="hb-xe7-stat" data-s="ok">
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2.5 6.2 2.2 2.2L9.5 3.6" /></svg>
                            Available
                          </span>
                        )}
                        {status === "taken" && (
                          <span className="hb-xe7-stat" data-s="taken">
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m3.5 3.5 5 5m0-5-5 5" /></svg>
                            Taken
                          </span>
                        )}
                      </div>
                      {error && <p className="hb-xe7-err" role="alert">{error}</p>}
                    </div>
                    <div>
                      <span className="hb-xe7-label" id={`${id}-tm`}>Team</span>
                      <div
                        className="hb-xe7-seg"
                        role="radiogroup"
                        aria-labelledby={`${id}-tm`}
                        onKeyDown={onSegKey}
                        style={{ "--hb-xe7-n": teams.length, "--hb-xe7-i": Math.max(0, teams.indexOf(team)) } as React.CSSProperties}
                      >
                        <span className="hb-xe7-thumb" aria-hidden="true" />
                        {teams.map((t) => (
                          <button
                            key={t}
                            type="button"
                            role="radio"
                            aria-checked={t === team}
                            tabIndex={t === team ? 0 : -1}
                            data-v={t}
                            className="hb-xe7-segbtn"
                            onClick={() => setTeam(t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="hb-xe7-label" id={`${id}-v`}>Visibility</span>
                      <div className="hb-xe7-vis" role="radiogroup" aria-labelledby={`${id}-v`} onKeyDown={onVisKey}>
                        {visibilities.map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            role="radio"
                            aria-checked={v.id === visibility}
                            tabIndex={v.id === visibility ? 0 : -1}
                            data-v={v.id}
                            className="hb-xe7-card"
                            onClick={() => setVisibility(v.id)}
                          >
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={v.icon} /></svg>
                            <b>{v.label}</b>
                            <span>{v.hint}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hb-xe7-foot">
                    <span className="hb-xe7-kbd" aria-hidden="true"><kbd>⌘</kbd><kbd>↵</kbd> to create</span>
                    <button type="button" className="hb-xe7-btn" onClick={close}>Cancel</button>
                    <button type="submit" className="hb-xe7-btn" data-primary="" aria-busy={phase === "busy" || undefined}>
                      {phase === "busy" ? <><span className="hb-xe7-spin" aria-hidden="true" />Creating</> : "Create project"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
