"use client";

import * as React from "react";

export type PopupShareRole = "view" | "comment" | "edit";

export interface PopupSharePerson {
  email: string;
  name?: string;
  role: PopupShareRole | "owner";
  pending?: boolean;
}

export interface PopupShareAccessProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onCopy"> {
  documentName?: string;
  link?: string;
  people?: PopupSharePerson[];
  defaultAccess?: "restricted" | "link";
  onInvite?: (emails: string[], role: PopupShareRole) => void;
  onAccessChange?: (access: "restricted" | "link") => void;
  onRoleChange?: (email: string, role: PopupShareRole | "remove") => void;
  onCopy?: (link: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
  triggerLabel?: string;
  embedded?: boolean;
  accent?: string;
}

const defaultPeople: PopupSharePerson[] = [
  { email: "nora@lumen.studio", name: "Nora Achebe (you)", role: "owner" },
  { email: "tom.reyes@lumen.studio", name: "Tom Reyes", role: "edit" },
  { email: "ines@partner.co", name: "Inès Moreau", role: "comment" },
];

const roleText: Record<PopupShareRole, string> = { view: "Can view", comment: "Can comment", edit: "Can edit" };

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useModal(active: boolean, panelRef: React.RefObject<HTMLElement | null>, onClose: () => void) {
  const closeRef = React.useRef(onClose);
  React.useEffect(() => {
    closeRef.current = onClose;
  });
  React.useEffect(() => {
    if (!active) return;
    const panel = panelRef.current;
    if (!panel) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    (panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel).focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(focusable)).filter((n) => n.getClientRects().length > 0);
      if (!nodes.length) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const cur = document.activeElement;
      if (e.shiftKey && (cur === first || cur === panel || !panel.contains(cur))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (cur === last || !panel.contains(cur))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [active, panelRef]);
}

function usePresence(open: boolean, ms: number) {
  const [mounted, setMounted] = React.useState(open);
  if (open && !mounted) setMounted(true);
  React.useEffect(() => {
    if (open || !mounted) return;
    const t = window.setTimeout(() => setMounted(false), ms);
    return () => window.clearTimeout(t);
  }, [open, mounted, ms]);
  return mounted;
}

function hue(s: string) {
  let x = 2166136261;
  for (let i = 0; i < s.length; i++) x = Math.imul(x ^ s.charCodeAt(i), 16777619);
  return (x >>> 0) % 360;
}

const isEmail = (v: string) => /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/.test(v);

const css = `
.hb-xf12 { --hb-xf12-accent: #2f7bff; box-sizing: border-box; font-family: inherit; color: #ededed; }
.hb-xf12 *, .hb-xf12 *::before, .hb-xf12 *::after { box-sizing: border-box; }
.hb-xf12-embedded { position: relative; width: 100%; height: 100%; display: grid; place-items: center; }
.hb-xf12-trigger { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px; height: 34px; padding: 0 14px 0 11px; border-radius: 10px; font-size: 13px; font-weight: 600; color: #fff; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xf12-accent) 85%, #fff), var(--hb-xf12-accent)); box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 6px 16px -8px var(--hb-xf12-accent); cursor: pointer; transition: transform .15s cubic-bezier(.3,.7,.4,1), filter .2s; }
.hb-xf12-trigger:hover { filter: brightness(1.08); }
.hb-xf12-trigger:active { transform: scale(.97); }
.hb-xf12-trigger:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xf12-trigger svg { width: 14px; height: 14px; }
.hb-xf12-overlay { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 16px; min-height: 100dvh; }
.hb-xf12-embedded .hb-xf12-overlay { position: relative; inset: auto; min-height: 0; padding: 0; width: 100%; }
.hb-xf12-scrim { position: absolute; inset: 0; background: rgba(0,0,0,.7); backdrop-filter: blur(4px); animation: hb-xf12-fade .3s ease both; }
.hb-xf12-embedded .hb-xf12-scrim { display: none; }
.hb-xf12-overlay[data-state="closed"] .hb-xf12-scrim { animation: hb-xf12-fade .2s ease reverse both; }
.hb-xf12-panel { position: relative; width: min(470px, 100%); max-height: calc(100dvh - 32px); overflow: auto; border-radius: 20px; background: #111; border: 1px solid #2a2a2a; box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 40px 80px -30px rgba(0,0,0,.9); outline: none; animation: hb-xf12-in .45s cubic-bezier(.16,1,.3,1) both; }
.hb-xf12-overlay[data-state="closed"] .hb-xf12-panel { animation: hb-xf12-out .2s cubic-bezier(.4,0,1,1) both; }
.hb-xf12-head { display: flex; align-items: center; gap: 10px; padding: 16px 16px 12px 18px; }
.hb-xf12-doc { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 8px; flex: none; color: #fff; background: linear-gradient(160deg, #3c7bff, #1e4fc4); box-shadow: inset 0 1px 0 rgba(255,255,255,.25); }
.hb-xf12-doc svg { width: 15px; height: 15px; }
.hb-xf12-title { flex: 1; min-width: 0; margin: 0; font-size: 15px; font-weight: 600; letter-spacing: -.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xf12-close { all: unset; display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; color: #8f8f8f; cursor: pointer; transition: background .2s, color .2s; flex: none; }
.hb-xf12-close:hover { background: #1f1f1f; color: #ededed; }
.hb-xf12-close:focus-visible { outline: 2px solid var(--hb-xf12-accent); }
.hb-xf12-close svg { width: 14px; height: 14px; }
.hb-xf12-invite { display: flex; gap: 6px; padding: 0 16px 0 18px; align-items: flex-start; }
.hb-xf12-field { flex: 1; min-width: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 5px; min-height: 38px; padding: 5px 6px 5px 8px; border-radius: 11px; background: #0b0b0b; border: 1px solid #2a2a2a; cursor: text; transition: border-color .2s, box-shadow .2s; }
.hb-xf12-field:focus-within { border-color: color-mix(in srgb, var(--hb-xf12-accent) 60%, #2a2a2a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xf12-accent) 16%, transparent); }
.hb-xf12-chip { display: inline-flex; align-items: center; gap: 5px; max-width: 100%; height: 24px; padding: 0 3px 0 3px; border-radius: 999px; font-size: 11.5px; background: #1c1c1c; border: 1px solid #2c2c2c; animation: hb-xf12-chip .3s cubic-bezier(.3,1.5,.5,1) both; }
.hb-xf12-chip[data-bad="true"] { color: #ffb0a8; border-color: rgba(255,93,93,.45); background: rgba(255,93,93,.1); }
.hb-xf12-chipava { width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; font-size: 9px; font-weight: 700; color: #fff; flex: none; }
.hb-xf12-chiptext { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xf12-chipx { all: unset; display: grid; place-items: center; width: 18px; height: 18px; border-radius: 50%; color: #8f8f8f; cursor: pointer; flex: none; }
.hb-xf12-chipx:hover { background: #2c2c2c; color: #ededed; }
.hb-xf12-chipx:focus-visible { outline: 2px solid var(--hb-xf12-accent); }
.hb-xf12-chipx svg { width: 9px; height: 9px; }
.hb-xf12-input { flex: 1; min-width: 120px; height: 26px; border: 0; outline: 0; background: transparent; color: #ededed; font: inherit; font-size: 13px; }
.hb-xf12-input::placeholder { color: #5f5f5f; }
.hb-xf12-select { position: relative; flex: none; }
.hb-xf12-select select { appearance: none; -webkit-appearance: none; height: 38px; padding: 0 28px 0 11px; border-radius: 11px; font: inherit; font-size: 12.5px; color: #ededed; background: #171717; border: 1px solid #2a2a2a; cursor: pointer; transition: border-color .2s; }
.hb-xf12-select select:hover { border-color: #3a3a3a; }
.hb-xf12-select select:focus-visible { outline: 2px solid var(--hb-xf12-accent); outline-offset: 1px; }
.hb-xf12-select svg { position: absolute; right: 10px; top: 50%; width: 10px; height: 10px; margin-top: -5px; color: #8f8f8f; pointer-events: none; }
.hb-xf12-mini select { height: 28px; border-color: transparent; background: transparent; color: #a1a1a1; padding-right: 24px; }
.hb-xf12-mini select:hover { background: #1a1a1a; border-color: #262626; color: #ededed; }
.hb-xf12-btn { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 38px; padding: 0 14px; border-radius: 11px; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: background .2s, transform .15s cubic-bezier(.3,.7,.4,1), filter .2s, opacity .2s; }
.hb-xf12-btn:active { transform: scale(.97); }
.hb-xf12-btn:focus-visible { outline: 2px solid var(--hb-xf12-accent); outline-offset: 2px; }
.hb-xf12-btn:disabled { opacity: .4; cursor: not-allowed; transform: none; }
.hb-xf12-primary { color: #fff; background: var(--hb-xf12-accent); box-shadow: inset 0 1px 0 rgba(255,255,255,.22); }
.hb-xf12-primary:not(:disabled):hover { filter: brightness(1.1); }
.hb-xf12-hint { margin: 6px 18px 0; min-height: 15px; font-size: 11px; color: #ff8a7a; }
.hb-xf12-sec { padding: 6px 16px 4px 18px; }
.hb-xf12-label { margin: 0 0 6px; font-size: 11.5px; font-weight: 500; color: #7a7a7a; }
.hb-xf12-people { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
.hb-xf12-person { display: flex; align-items: center; gap: 10px; padding: 6px 0; border-radius: 10px; animation: hb-xf12-row .4s cubic-bezier(.2,.8,.2,1) both; }
.hb-xf12-person[data-new="true"] { animation: hb-xf12-row .4s cubic-bezier(.2,.8,.2,1) both, hb-xf12-flash 1.4s ease .2s both; }
.hb-xf12-person[data-leaving="true"] { animation: hb-xf12-leave .28s cubic-bezier(.4,0,1,1) forwards; }
.hb-xf12-ava { width: 30px; height: 30px; border-radius: 50%; flex: none; display: grid; place-items: center; font-size: 11px; font-weight: 600; color: #fff; }
.hb-xf12-who { flex: 1; min-width: 0; }
.hb-xf12-name { display: flex; align-items: center; gap: 6px; margin: 0; font-size: 12.5px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xf12-mail { margin: 1px 0 0; font-size: 11px; color: #7a7a7a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xf12-pending { font-size: 9.5px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; padding: 1px 6px; border-radius: 999px; color: #f5b445; background: rgba(245,180,69,.12); }
.hb-xf12-owner { font-size: 12px; color: #6f6f6f; padding-right: 8px; }
.hb-xf12-access { display: flex; align-items: center; gap: 10px; padding: 8px 10px; margin: 0 16px 0 18px; border-radius: 13px; background: #151515; border: 1px solid #222; }
.hb-xf12-globe { position: relative; display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; flex: none; transition: background .35s, color .35s; color: #a1a1a1; background: #222; }
.hb-xf12-access[data-a="link"] .hb-xf12-globe { color: #3ddc84; background: rgba(61,220,132,.13); }
.hb-xf12-globe svg { position: absolute; width: 16px; height: 16px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.4,.5,1); }
.hb-xf12-access[data-a="link"] .hb-xf12-g-lock, .hb-xf12-access[data-a="restricted"] .hb-xf12-g-world { opacity: 0; transform: rotate(-90deg) scale(.4); }
.hb-xf12-acc-text { flex: 1; min-width: 0; }
.hb-xf12-acc-btn { all: unset; display: inline-flex; align-items: center; gap: 4px; font-size: 12.5px; font-weight: 600; cursor: pointer; border-radius: 5px; }
.hb-xf12-acc-btn:focus-visible { outline: 2px solid var(--hb-xf12-accent); outline-offset: 2px; }
.hb-xf12-acc-btn svg { width: 12px; height: 12px; color: #8f8f8f; }
.hb-xf12-acc-desc { margin: 1px 0 0; font-size: 11px; color: #7a7a7a; animation: hb-xf12-fade .3s ease both; }
.hb-xf12-foot { display: flex; justify-content: space-between; gap: 8px; padding: 14px 16px 16px 18px; }
.hb-xf12-copy { color: #ededed; background: #171717; border: 1px solid #2a2a2a; padding: 0 13px 0 11px; }
.hb-xf12-copy:hover { border-color: #3a3a3a; }
.hb-xf12-copy[data-done="true"] { color: #3ddc84; border-color: rgba(61,220,132,.35); background: rgba(61,220,132,.07); }
.hb-xf12-cicon { position: relative; width: 15px; height: 15px; }
.hb-xf12-cicon svg { position: absolute; inset: 0; width: 15px; height: 15px; transition: opacity .2s, transform .35s cubic-bezier(.3,1.5,.5,1); }
.hb-xf12-copy[data-done="true"] .hb-xf12-c-link, .hb-xf12-copy[data-done="false"] .hb-xf12-c-ok { opacity: 0; transform: scale(.4) rotate(-30deg); }
.hb-xf12-c-ok path { stroke-dasharray: 16; stroke-dashoffset: 16; }
.hb-xf12-copy[data-done="true"] .hb-xf12-c-ok path { stroke-dashoffset: 0; transition: stroke-dashoffset .35s ease .08s; }
.hb-xf12-done { color: #0a0a0a; background: linear-gradient(#f5f5f5, #dadada); box-shadow: inset 0 -1px 0 rgba(0,0,0,.2); }
.hb-xf12-done:hover { background: #fff; }
@keyframes hb-xf12-fade { from { opacity: 0; } }
@keyframes hb-xf12-in { from { opacity: 0; transform: translateY(14px) scale(.97); } }
@keyframes hb-xf12-out { to { opacity: 0; transform: translateY(8px) scale(.98); } }
@keyframes hb-xf12-chip { from { opacity: 0; transform: scale(.6); } }
@keyframes hb-xf12-row { from { opacity: 0; transform: translateY(-6px); } }
@keyframes hb-xf12-flash { 0% { background: color-mix(in srgb, var(--hb-xf12-accent) 18%, transparent); } 100% { background: transparent; } }
@keyframes hb-xf12-leave { to { opacity: 0; transform: translateX(16px); height: 0; padding: 0; } }
@media (max-width: 440px) {
  .hb-xf12-invite { flex-wrap: wrap; }
  .hb-xf12-field { flex-basis: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xf12 *, .hb-xf12 *::before { animation: none !important; transition: none !important; }
  .hb-xf12-person[data-leaving="true"] { display: none; }
}
`;

function Chevron() {
  return (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2.5 4 2.5 2.5L7.5 4" /></svg>
  );
}

export function PopupShareAccess({
  documentName = "Q4 Launch Plan",
  link = "https://docs.lumen.studio/d/q4-launch-plan",
  people: peopleProp = defaultPeople,
  defaultAccess = "restricted",
  onInvite,
  onAccessChange,
  onRoleChange,
  onCopy,
  open,
  defaultOpen,
  onOpenChange,
  showTrigger = true,
  triggerLabel = "Share",
  embedded = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PopupShareAccessProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const mounted = usePresence(isOpen, 220);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const touched = React.useRef(false);
  const timers = React.useRef<number[]>([]);
  const [people, setPeople] = React.useState(peopleProp);
  const [fresh, setFresh] = React.useState<string[]>([]);
  const [leaving, setLeaving] = React.useState<string[]>([]);
  const [chips, setChips] = React.useState<string[]>([]);
  const [draft, setDraft] = React.useState("");
  const [role, setRole] = React.useState<PopupShareRole>("edit");
  const [access, setAccess] = React.useState(defaultAccess);
  const [copied, setCopied] = React.useState(false);

  const setOpen = React.useCallback(
    (value: boolean) => {
      touched.current = true;
      if (open === undefined) setInner(value);
      onOpenChange?.(value);
    },
    [open, onOpenChange],
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);
  useModal(isOpen && !embedded, panelRef, close);

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  React.useEffect(() => {
    if (!embedded || !touched.current) return;
    if (isOpen) panelRef.current?.focus({ preventScroll: true });
    else triggerRef.current?.focus({ preventScroll: true });
  }, [embedded, isOpen]);

  const addChips = (raw: string) => {
    const parts = raw.split(/[\s,;]+/).map((p) => p.trim().toLowerCase()).filter(Boolean);
    if (!parts.length) return;
    setChips((c) => [...c, ...parts.filter((p) => !c.includes(p) && !people.some((x) => x.email === p))]);
    setDraft("");
  };

  const bad = chips.filter((c) => !isEmail(c));
  const good = chips.filter(isEmail);

  const invite = () => {
    const pendingDraft = draft.trim() ? draft.split(/[\s,;]+/).map((p) => p.trim().toLowerCase()).filter(isEmail) : [];
    const list = [...new Set([...good, ...pendingDraft])].filter((e) => !people.some((p) => p.email === e));
    if (!list.length || bad.length) return;
    onInvite?.(list, role);
    setPeople((p) => [...p, ...list.map((email) => ({ email, role, pending: true }))]);
    setFresh(list);
    setChips([]);
    setDraft("");
    inputRef.current?.focus();
  };

  const changeRole = (email: string, value: PopupShareRole | "remove") => {
    onRoleChange?.(email, value);
    if (value === "remove") {
      setLeaving((l) => [...l, email]);
      timers.current.push(
        window.setTimeout(() => {
          setPeople((p) => p.filter((x) => x.email !== email));
          setLeaving((l) => l.filter((x) => x !== email));
        }, 280),
      );
      return;
    }
    setPeople((p) => p.map((x) => (x.email === email ? { ...x, role: value } : x)));
  };

  const toggleAccess = () => {
    const next = access === "restricted" ? "link" : "restricted";
    setAccess(next);
    onAccessChange?.(next);
  };

  const copy = () => {
    navigator.clipboard?.writeText(link).catch(() => {});
    onCopy?.(link);
    setCopied(true);
    timers.current.push(window.setTimeout(() => setCopied(false), 1800));
  };

  const count = good.length + (draft.trim() && isEmail(draft.trim().toLowerCase()) ? 1 : 0);

  return (
    <div
      className={`hb-xf12 ${embedded ? "hb-xf12-embedded" : ""} ${className}`}
      style={{ "--hb-xf12-accent": accent, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (embedded && e.key === "Escape" && isOpen) {
          e.stopPropagation();
          close();
        }
      }}
      {...rest}
    >
      <style href="hb-popup-share-access" precedence="default">{css}</style>
      {showTrigger && (!embedded || !mounted) && (
        <button ref={triggerRef} type="button" className="hb-xf12-trigger" aria-haspopup="dialog" onClick={() => setOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M3 19c.8-3.2 3.2-5 6-5s5.2 1.8 6 5M17 8v6M14 11h6" /></svg>
          {triggerLabel}
        </button>
      )}
      {mounted && (
        <div className="hb-xf12-overlay" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xf12-scrim" onClick={close} aria-hidden="true" />
          <div ref={panelRef} className="hb-xf12-panel" role="dialog" aria-modal={embedded ? undefined : true} aria-labelledby={`${uid}-t`} tabIndex={-1}>
            <div className="hb-xf12-head">
              <span className="hb-xf12-doc" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4" /></svg>
              </span>
              <h2 className="hb-xf12-title" id={`${uid}-t`}>Share “{documentName}”</h2>
              <button type="button" className="hb-xf12-close" aria-label="Close" onClick={close}>
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m3 3 8 8M11 3l-8 8" /></svg>
              </button>
            </div>
            <div className="hb-xf12-invite">
              <div className="hb-xf12-field" onClick={() => inputRef.current?.focus()}>
                {chips.map((c) => {
                  const ok = isEmail(c);
                  return (
                    <span key={c} className="hb-xf12-chip" data-bad={!ok}>
                      <span className="hb-xf12-chipava" style={{ background: ok ? `hsl(${hue(c)} 55% 45%)` : "#5a2a2a" }} aria-hidden="true">
                        {ok ? c[0].toUpperCase() : "!"}
                      </span>
                      <span className="hb-xf12-chiptext">{c}</span>
                      <button type="button" className="hb-xf12-chipx" aria-label={`Remove ${c}`} onClick={() => setChips((x) => x.filter((y) => y !== c))}>
                        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m2.5 2.5 5 5M7.5 2.5l-5 5" /></svg>
                      </button>
                    </span>
                  );
                })}
                <input
                  ref={inputRef}
                  data-autofocus
                  className="hb-xf12-input"
                  type="text"
                  inputMode="email"
                  autoComplete="off"
                  value={draft}
                  placeholder={chips.length ? "" : "Add people by email"}
                  aria-label="Add people by email"
                  aria-describedby={`${uid}-h`}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (/[\s,;]$/.test(v)) addChips(v);
                    else setDraft(v);
                  }}
                  onPaste={(e) => {
                    const text = e.clipboardData.getData("text");
                    if (/[\s,;]/.test(text.trim())) {
                      e.preventDefault();
                      addChips(draft + text);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (draft.trim()) addChips(draft);
                      else invite();
                    } else if (e.key === "Backspace" && !draft && chips.length) {
                      setChips((c) => c.slice(0, -1));
                    }
                  }}
                  onBlur={() => draft.trim() && addChips(draft)}
                />
              </div>
              <span className="hb-xf12-select">
                <select value={role} aria-label="Permission for new people" onChange={(e) => setRole(e.target.value as PopupShareRole)}>
                  <option value="view">Can view</option>
                  <option value="comment">Can comment</option>
                  <option value="edit">Can edit</option>
                </select>
                <Chevron />
              </span>
              <button type="button" className="hb-xf12-btn hb-xf12-primary" disabled={count === 0 || bad.length > 0} onClick={invite}>
                Invite{count > 1 ? ` ${count}` : ""}
              </button>
            </div>
            <p className="hb-xf12-hint" id={`${uid}-h`} role="alert">
              {bad.length ? `${bad[0]} is not a valid email` : ""}
            </p>
            <div className="hb-xf12-sec">
              <p className="hb-xf12-label">People with access</p>
              <ul className="hb-xf12-people">
                {people.map((p) => {
                  const display = p.name ?? p.email.split("@")[0];
                  const init = display.replace(/\(.*\)/, "").trim().split(/[\s.]+/).map((s) => s[0]).join("").slice(0, 2).toUpperCase();
                  return (
                    <li key={p.email} className="hb-xf12-person" data-new={fresh.includes(p.email)} data-leaving={leaving.includes(p.email)}>
                      <span className="hb-xf12-ava" style={{ background: `linear-gradient(140deg, hsl(${hue(p.email)} 60% 55%), hsl(${(hue(p.email) + 40) % 360} 55% 38%))` }} aria-hidden="true">{init}</span>
                      <div className="hb-xf12-who">
                        <p className="hb-xf12-name">{display}{p.pending && <span className="hb-xf12-pending">Invited</span>}</p>
                        <p className="hb-xf12-mail">{p.email}</p>
                      </div>
                      {p.role === "owner" ? (
                        <span className="hb-xf12-owner">Owner</span>
                      ) : (
                        <span className="hb-xf12-select hb-xf12-mini">
                          <select value={p.role} aria-label={`Permission for ${display}`} onChange={(e) => changeRole(p.email, e.target.value as PopupShareRole | "remove")}>
                            {(Object.keys(roleText) as PopupShareRole[]).map((r) => (
                              <option key={r} value={r}>{roleText[r]}</option>
                            ))}
                            <option value="remove">Remove access</option>
                          </select>
                          <Chevron />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="hb-xf12-sec">
              <p className="hb-xf12-label">General access</p>
            </div>
            <div className="hb-xf12-access" data-a={access}>
              <span className="hb-xf12-globe" aria-hidden="true">
                <svg className="hb-xf12-g-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><rect x="5" y="11" width="14" height="10" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
                <svg className="hb-xf12-g-world" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5Z" /></svg>
              </span>
              <div className="hb-xf12-acc-text">
                <button type="button" className="hb-xf12-acc-btn" aria-pressed={access === "link"} onClick={toggleAccess}>
                  {access === "link" ? "Anyone with the link" : "Restricted"}
                  <Chevron />
                </button>
                <p className="hb-xf12-acc-desc" key={access}>
                  {access === "link" ? "Anyone on the internet with the link can view" : "Only people with access can open the link"}
                </p>
              </div>
            </div>
            <div className="hb-xf12-foot">
              <button type="button" className="hb-xf12-btn hb-xf12-copy" data-done={copied} onClick={copy} aria-live="polite">
                <span className="hb-xf12-cicon" aria-hidden="true">
                  <svg className="hb-xf12-c-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" /></svg>
                  <svg className="hb-xf12-c-ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                </span>
                {copied ? "Link copied" : "Copy link"}
              </button>
              <button type="button" className="hb-xf12-btn hb-xf12-done" onClick={close}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
