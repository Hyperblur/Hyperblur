"use client";

import * as React from "react";

export interface OnboardingRole {
  id: string;
  label: string;
  hint: string;
  icon: string;
}

export interface OnboardingResult {
  role: string;
  workspace: string;
  color: string;
  invites: string[];
}

export interface ModalOnboardingStepsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  trigger?: React.ReactNode;
  product?: string;
  domain?: string;
  roles?: OnboardingRole[];
  colors?: string[];
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: (result: OnboardingResult) => void;
  accent?: string;
}

const defaultRoles: OnboardingRole[] = [
  { id: "design", label: "Design", hint: "Files, reviews, handoff", icon: "M3 13 13 3M9.5 3H13v3.5M3 9.5V13h3.5" },
  { id: "engineering", label: "Engineering", hint: "Issues, cycles, PRs", icon: "m5.5 4.5-3 3.5 3 3.5m5-7 3 3.5-3 3.5M9 3 7 13" },
  { id: "product", label: "Product", hint: "Roadmaps and specs", icon: "M3 12.5h10M4.5 12.5V8m3.5 4.5V4m3.5 8.5V6.5" },
  { id: "ops", label: "Operations", hint: "Requests and triage", icon: "M8 2.5v3M8 10.5v3M2.5 8h3M10.5 8h3M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" },
];

const defaultColors = ["#22d3ee", "#a78bfa", "#f472b6", "#fb923c", "#a3e635", "#f5f5f5"];

const stepGlyphs = [
  "M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm0 3v3l2 1.2",
  "M3 4.5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5ZM6 8h4M8 6v4",
  "M6 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.5 13a3.5 3.5 0 0 1 7 0M11.5 5.5v4M9.5 7.5h4",
  "m3.5 8.4 3 3 6-6.4",
];

const css = `
.hb-xe11 { --hb-xe11-accent: #22d3ee; display: inline-block; box-sizing: border-box; color: #ededed; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe11 *, .hb-xe11 *::before, .hb-xe11 *::after { box-sizing: border-box; }
.hb-xe11[data-embedded] { position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: #09090a; }
.hb-xe11-trigger { display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 8px 0 16px; border: 1px solid #2a2a2c; border-radius: 999px; background: linear-gradient(180deg, #19191b, #131315); color: #ededed; font: inherit; font-size: 13.5px; font-weight: 550; cursor: pointer; transition: border-color 0.2s ease, transform 0.15s ease; }
.hb-xe11-trigger:hover { border-color: #3a3a3e; }
.hb-xe11-trigger:active { transform: scale(0.97); }
.hb-xe11-trigger i { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: var(--hb-xe11-accent); color: #04191d; font-style: normal; }
.hb-xe11-trigger svg { width: 12px; height: 12px; }
.hb-xe11 button:focus-visible, .hb-xe11 input:focus-visible { outline: 2px solid var(--hb-xe11-accent); outline-offset: 2px; }
.hb-xe11-layer { position: fixed; inset: 0; z-index: 1000; height: 100dvh; display: grid; place-items: center; padding: 16px; }
.hb-xe11[data-embedded] .hb-xe11-layer { position: absolute; height: auto; z-index: 2; padding: 10px; }
.hb-xe11-scrim { position: absolute; inset: 0; background: rgba(2, 4, 6, 0.66); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); animation: hb-xe11-fade 0.3s ease both; }
.hb-xe11-layer[data-state="closed"] .hb-xe11-scrim { animation: hb-xe11-fade-out 0.22s ease both; }
.hb-xe11-panel { position: relative; width: 100%; max-width: 460px; max-height: 100%; overflow: auto; border: 1px solid #252528; border-radius: 22px; background: #111113; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 40px 90px -30px rgba(0, 0, 0, 0.95); outline: none; animation: hb-xe11-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; transition: height 0.42s cubic-bezier(0.2, 0.9, 0.25, 1); }
.hb-xe11-layer[data-state="closed"] .hb-xe11-panel { animation: hb-xe11-out 0.22s ease both; }
.hb-xe11-hero { position: relative; height: 92px; overflow: hidden; border-bottom: 1px solid #1f1f22; background: radial-gradient(60% 120% at 20% 0%, color-mix(in srgb, var(--hb-xe11-accent) 32%, transparent), transparent 70%), radial-gradient(50% 120% at 90% 100%, color-mix(in srgb, var(--hb-xe11-accent) 14%, transparent), transparent 70%), linear-gradient(180deg, #151517, #111113); }
.hb-xe11-hero::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px); background-size: 14px 14px; -webkit-mask-image: linear-gradient(90deg, transparent, #000 30%, #000 70%, transparent); mask-image: linear-gradient(90deg, transparent, #000 30%, #000 70%, transparent); }
.hb-xe11-tiles { position: absolute; inset: 0; display: grid; place-items: center; }
.hb-xe11-tile { position: absolute; display: grid; place-items: center; border-radius: 14px; background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04)); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 10px 24px -10px rgba(0, 0, 0, 0.8); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.25, 1.1); }
.hb-xe11-tile[data-k="main"] { width: 50px; height: 50px; color: #fff; }
.hb-xe11-tile[data-k="main"] svg { width: 22px; height: 22px; animation: hb-xe11-glyph 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.3) both; }
.hb-xe11-tile[data-k="a"], .hb-xe11-tile[data-k="b"] { width: 26px; height: 26px; border-radius: 8px; opacity: 0.8; }
.hb-xe11-tile[data-k="a"] { transform: translate(calc(-62px + var(--hb-xe11-s) * 10px), calc(-12px + var(--hb-xe11-s) * 6px)) rotate(calc(-12deg + var(--hb-xe11-s) * 8deg)); }
.hb-xe11-tile[data-k="b"] { transform: translate(calc(64px - var(--hb-xe11-s) * 8px), calc(14px - var(--hb-xe11-s) * 8px)) rotate(calc(10deg - var(--hb-xe11-s) * 6deg)); }
.hb-xe11-tile[data-k="a"]::after, .hb-xe11-tile[data-k="b"]::after { content: ""; width: 8px; height: 8px; border-radius: 3px; background: var(--hb-xe11-accent); }
.hb-xe11-x { position: absolute; top: 10px; right: 10px; z-index: 1; display: grid; place-items: center; width: 28px; height: 28px; border: 0; border-radius: 50%; background: rgba(0, 0, 0, 0.35); color: #c4c4c8; cursor: pointer; transition: background-color 0.15s ease; }
.hb-xe11-x:hover { background: rgba(0, 0, 0, 0.6); color: #fff; }
.hb-xe11-x svg { width: 12px; height: 12px; }
.hb-xe11-prog { position: absolute; left: 16px; top: 14px; display: flex; gap: 4px; }
.hb-xe11-bar { position: relative; width: 26px; height: 4px; border-radius: 4px; background: rgba(255, 255, 255, 0.14); overflow: hidden; }
.hb-xe11-bar i { position: absolute; inset: 0; background: var(--hb-xe11-accent); transform-origin: left; transform: scaleX(0); transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1); font-style: normal; }
.hb-xe11-bar[data-on="true"] i { transform: scaleX(1); }
.hb-xe11-step { padding: 16px 18px 0; animation: hb-xe11-next 0.42s cubic-bezier(0.2, 0.9, 0.25, 1) both; }
.hb-xe11-step[data-dir="back"] { animation-name: hb-xe11-back; }
.hb-xe11-kicker { margin: 0; color: var(--hb-xe11-accent); font-size: 11.5px; font-weight: 600; letter-spacing: 0.02em; }
.hb-xe11-title { margin: 3px 0 0; font-family: var(--font-grotesk, inherit); font-size: 18px; font-weight: 600; letter-spacing: -0.025em; }
.hb-xe11-sub { margin: 3px 0 0; color: #8f8f95; font-size: 12.5px; line-height: 1.45; }
.hb-xe11-roles { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 14px; }
.hb-xe11-role { display: grid; grid-template-columns: 28px 1fr; gap: 9px; align-items: center; padding: 10px; border: 1px solid #252528; border-radius: 12px; background: #0d0d0f; color: inherit; font: inherit; text-align: left; cursor: pointer; transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.15s ease; }
.hb-xe11-role:hover { border-color: #34343a; }
.hb-xe11-role:active { transform: scale(0.98); }
.hb-xe11-role[aria-checked="true"] { border-color: var(--hb-xe11-accent); background: color-mix(in srgb, var(--hb-xe11-accent) 8%, #0d0d0f); }
.hb-xe11-ri { display: grid; place-items: center; height: 28px; border-radius: 8px; background: #19191c; color: #a8a8ae; transition: background-color 0.2s ease, color 0.2s ease; }
.hb-xe11-role[aria-checked="true"] .hb-xe11-ri { background: var(--hb-xe11-accent); color: #04191d; }
.hb-xe11-ri svg { width: 14px; height: 14px; }
.hb-xe11-role b { display: block; font-size: 13px; font-weight: 600; }
.hb-xe11-role span span { display: block; color: #7d7d84; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe11-ws { display: flex; gap: 12px; align-items: center; margin-top: 14px; }
.hb-xe11-av { flex: none; display: grid; place-items: center; width: 52px; height: 52px; border-radius: 14px; background: var(--hb-xe11-c); color: #0a0a0a; font-family: var(--font-grotesk, inherit); font-size: 22px; font-weight: 700; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 10px 24px -10px var(--hb-xe11-c); transition: background-color 0.3s ease, box-shadow 0.3s ease; }
.hb-xe11-field { flex: 1; min-width: 0; }
.hb-xe11-input { display: block; width: 100%; height: 38px; padding: 0 12px; border: 1px solid #2a2a2e; border-radius: 10px; background: #0b0b0d; color: #ededed; font: inherit; font-size: 14px; outline: none; transition: border-color 0.18s ease; }
.hb-xe11 .hb-xe11-input:focus-visible { outline: none; border-color: var(--hb-xe11-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xe11-accent) 20%, transparent); }
.hb-xe11-url { margin-top: 6px; color: #6f6f76; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe11-url b { color: #cfcfd4; font-weight: 500; }
.hb-xe11-sw { display: flex; gap: 8px; margin-top: 12px; }
.hb-xe11-dot { width: 22px; height: 22px; padding: 0; border: 0; border-radius: 50%; background: var(--hb-xe11-c); cursor: pointer; box-shadow: 0 0 0 0 transparent; transition: box-shadow 0.2s ease, transform 0.2s cubic-bezier(0.3, 0.7, 0.4, 1.4); }
.hb-xe11-dot:hover { transform: scale(1.1); }
.hb-xe11-dot[aria-checked="true"] { box-shadow: 0 0 0 2px #111113, 0 0 0 4px var(--hb-xe11-c); }
.hb-xe11-chips { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-height: 44px; margin-top: 14px; padding: 6px; border: 1px solid #2a2a2e; border-radius: 12px; background: #0b0b0d; cursor: text; transition: border-color 0.18s ease; }
.hb-xe11-chips:focus-within { border-color: var(--hb-xe11-accent); }
.hb-xe11-chips[data-bad="a"] { animation: hb-xe11-shake-a 0.4s ease; border-color: #f43f5e; }
.hb-xe11-chips[data-bad="b"] { animation: hb-xe11-shake-b 0.4s ease; border-color: #f43f5e; }
.hb-xe11-chip { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 4px 0 4px; border-radius: 8px; background: #1b1b1e; box-shadow: inset 0 0 0 1px #2a2a2e; font-size: 12px; animation: hb-xe11-glyph 0.3s cubic-bezier(0.3, 0.7, 0.4, 1.3) both; }
.hb-xe11-chip i { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 6px; background: color-mix(in srgb, var(--hb-xe11-accent) 25%, #222); color: #fff; font-size: 10px; font-weight: 700; font-style: normal; text-transform: uppercase; }
.hb-xe11-chip button { display: grid; place-items: center; width: 18px; height: 18px; padding: 0; border: 0; border-radius: 5px; background: transparent; color: #7d7d84; cursor: pointer; }
.hb-xe11-chip button:hover { background: #2a2a2e; color: #fff; }
.hb-xe11-chip svg { width: 9px; height: 9px; }
.hb-xe11-chipin { flex: 1; min-width: 140px; height: 28px; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 13px; outline: none; padding: 0 6px; }
.hb-xe11 .hb-xe11-chipin:focus-visible { outline: none; }
.hb-xe11-help { margin: 7px 0 0; color: #6f6f76; font-size: 11.5px; }
.hb-xe11-help[data-bad="true"] { color: #ff7a8a; }
.hb-xe11-done { display: grid; justify-items: center; gap: 4px; padding-top: 4px; text-align: center; }
.hb-xe11-sum { width: 100%; margin: 14px 0 0; padding: 0; list-style: none; display: grid; gap: 6px; }
.hb-xe11-sum li { display: flex; justify-content: space-between; padding: 8px 10px; border-radius: 9px; background: #0d0d0f; box-shadow: inset 0 0 0 1px #1f1f22; color: #8f8f95; font-size: 12.5px; }
.hb-xe11-sum b { color: #ededed; font-weight: 550; }
.hb-xe11-foot { display: flex; align-items: center; gap: 8px; padding: 16px 18px 18px; }
.hb-xe11-count { margin-right: auto; color: #6f6f76; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-xe11-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 36px; padding: 0 14px; border: 1px solid #2a2a2e; border-radius: 999px; background: transparent; color: #cfcfd4; font: inherit; font-size: 13px; font-weight: 550; white-space: nowrap; cursor: pointer; transition: background-color 0.15s ease, opacity 0.2s ease, transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe11-btn:hover:not(:disabled) { background: #1b1b1e; }
.hb-xe11-btn:active:not(:disabled) { transform: scale(0.97); }
.hb-xe11-btn[data-primary] { min-width: 112px; border-color: transparent; background: #f4f4f5; color: #0a0a0a; }
.hb-xe11-btn[data-primary]:hover:not(:disabled) { background: #fff; }
.hb-xe11-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.hb-xe11-btn svg { width: 13px; height: 13px; transition: transform 0.25s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe11-btn[data-primary]:hover:not(:disabled) svg { transform: translateX(2px); }
.hb-xe11[data-embedded] .hb-xe11-hero { height: 60px; }
.hb-xe11[data-embedded] .hb-xe11-tile[data-k="main"] { width: 40px; height: 40px; border-radius: 12px; }
.hb-xe11[data-embedded] .hb-xe11-step { padding-top: 12px; }
.hb-xe11[data-embedded] .hb-xe11-roles { margin-top: 10px; }
.hb-xe11[data-embedded] .hb-xe11-role { padding: 8px 10px; }
.hb-xe11[data-embedded] .hb-xe11-foot { padding: 12px 18px 14px; }
@keyframes hb-xe11-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-xe11-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xe11-in { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: none; } }
@keyframes hb-xe11-out { from { opacity: 1; } to { opacity: 0; transform: scale(0.97); } }
@keyframes hb-xe11-next { from { opacity: 0; transform: translateX(22px); } to { opacity: 1; transform: none; } }
@keyframes hb-xe11-back { from { opacity: 0; transform: translateX(-22px); } to { opacity: 1; transform: none; } }
@keyframes hb-xe11-glyph { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: none; } }
@keyframes hb-xe11-shake-a { 20%, 60% { transform: translateX(-4px); } 40%, 80% { transform: translateX(4px); } }
@keyframes hb-xe11-shake-b { 20%, 60% { transform: translateX(-4px); } 40%, 80% { transform: translateX(4px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe11-scrim, .hb-xe11-panel, .hb-xe11-step, .hb-xe11-chip, .hb-xe11-chips[data-bad], .hb-xe11-tile[data-k="main"] svg, .hb-xe11-layer[data-state="closed"] .hb-xe11-panel, .hb-xe11-layer[data-state="closed"] .hb-xe11-scrim { animation: none; }
  .hb-xe11-layer[data-state="closed"] { opacity: 0; }
  .hb-xe11-panel, .hb-xe11-tile, .hb-xe11-bar i, .hb-xe11-role, .hb-xe11-ri, .hb-xe11-av, .hb-xe11-dot, .hb-xe11-btn, .hb-xe11-btn svg, .hb-xe11-trigger, .hb-xe11-input, .hb-xe11-chips { transition: none; }
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

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function slugify(v: string) {
  return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32);
}

export function ModalOnboardingSteps({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  trigger = "Get started",
  product = "Relay",
  domain = "relay.so",
  roles = defaultRoles,
  colors = defaultColors,
  defaultStep = 0,
  onStepChange,
  onComplete,
  accent = "#22d3ee",
  className = "",
  style,
  ...rest
}: ModalOnboardingStepsProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [present, setPresent] = React.useState(isOpen);
  const [step, setStep] = React.useState(defaultStep);
  const [dir, setDir] = React.useState<"next" | "back">("next");
  const [role, setRole] = React.useState(roles[1]?.id ?? "");
  const [workspace, setWorkspace] = React.useState("Northwind");
  const [color, setColor] = React.useState(colors[0] ?? accent);
  const [invites, setInvites] = React.useState<string[]>(["maya@northwind.io"]);
  const [draft, setDraft] = React.useState("");
  const [bad, setBad] = React.useState<"a" | "b" | undefined>(undefined);
  const [height, setHeight] = React.useState<number | undefined>(undefined);
  const userOpened = React.useRef(false);
  const panel = React.useRef<HTMLDivElement>(null);
  const content = React.useRef<HTMLDivElement>(null);
  const moved = React.useRef(false);
  const id = React.useId();
  const total = 3;

  if (isOpen && !present) setPresent(true);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) {
        userOpened.current = true;
        setStep(defaultStep);
      }
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange, defaultStep],
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);

  React.useEffect(() => {
    if (isOpen || !present) return;
    const t = setTimeout(() => setPresent(false), 240);
    return () => clearTimeout(t);
  }, [isOpen, present]);

  React.useEffect(() => {
    const node = content.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setHeight(node.offsetHeight + 2));
    ro.observe(node);
    return () => ro.disconnect();
  }, [present]);

  React.useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    const node = content.current;
    const target = node?.querySelector<HTMLElement>("[data-first]") ?? node?.querySelector<HTMLElement>(focusable);
    target?.focus({ preventScroll: true });
  }, [step]);

  useLayer(isOpen, embedded, panel, close, userOpened);

  function goto(next: number) {
    setDir(next > step ? "next" : "back");
    moved.current = true;
    setStep(next);
    onStepChange?.(next);
    if (next === total) onComplete?.({ role, workspace: workspace.trim(), color, invites });
  }

  function addInvite(raw: string) {
    const v = raw.trim().replace(/,$/, "");
    if (!v) return true;
    if (!emailRe.test(v) || invites.includes(v)) {
      setBad((b) => (b === "a" ? "b" : "a"));
      return false;
    }
    setInvites((l) => [...l, v]);
    setDraft("");
    setBad(undefined);
    return true;
  }

  const canNext = step === 0 ? !!role : step === 1 ? workspace.trim().length >= 2 : true;
  const titles = [
    { k: "Your role", t: `What brings you to ${product}?`, s: "We will tailor templates and views to how you work." },
    { k: "Workspace", t: "Name your workspace", s: "This is where your team plans, builds and ships." },
    { k: "Team", t: "Invite your team", s: "Add a few teammates now. You can always invite more later." },
    { k: "All set", t: `${workspace.trim() || "Your workspace"} is ready`, s: "We set up a starter project so you can dive in." },
  ][step];
  const roleLabel = roles.find((r) => r.id === role)?.label ?? "";
  const vars = { "--hb-xe11-accent": accent, "--hb-xe11-c": color, "--hb-xe11-s": step, ...style } as React.CSSProperties;
  const arrow = <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 8h9m-3.5-3.5L12.5 8 9 11.5" /></svg>;

  return (
    <div className={`hb-xe11 ${className}`} data-embedded={embedded || undefined} style={vars} {...rest}>
      <style href="hb-xe11-css" precedence="default">{css}</style>
      {trigger !== null && (
        <button type="button" className="hb-xe11-trigger" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setOpen(true)}>
          {trigger}
          <i aria-hidden="true">{arrow}</i>
        </button>
      )}
      {present && (
        <div className="hb-xe11-layer" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xe11-scrim" onClick={close} aria-hidden="true" />
          <div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-t`}
            aria-describedby={`${id}-d`}
            tabIndex={-1}
            className="hb-xe11-panel"
            style={height ? { height } : undefined}
          >
            <div ref={content}>
              <div className="hb-xe11-hero" aria-hidden="true">
                <div className="hb-xe11-prog">
                  {Array.from({ length: total }, (_, i) => (
                    <span key={i} className="hb-xe11-bar" data-on={i < step || step === total ? "true" : undefined}>
                      <i style={i === step && step < total ? { transform: "scaleX(0.35)" } : undefined} />
                    </span>
                  ))}
                </div>
                <div className="hb-xe11-tiles">
                  <span className="hb-xe11-tile" data-k="a" />
                  <span className="hb-xe11-tile" data-k="b" />
                  <span className="hb-xe11-tile" data-k="main">
                    <svg key={step} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={stepGlyphs[Math.min(step, 3)]} />
                    </svg>
                  </span>
                </div>
              </div>
              <button type="button" className="hb-xe11-x" aria-label="Close" onClick={close}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m4 4 8 8m0-8-8 8" /></svg>
              </button>
              <div key={step} className="hb-xe11-step" data-dir={dir}>
                <p className="hb-xe11-kicker">{step < total ? `Step ${step + 1} of ${total} · ${titles.k}` : titles.k}</p>
                <h2 id={`${id}-t`} className="hb-xe11-title">{titles.t}</h2>
                <p id={`${id}-d`} className="hb-xe11-sub">{titles.s}</p>
                {step === 0 && (
                  <div className="hb-xe11-roles" role="radiogroup" aria-label="Role">
                    {roles.map((r, i) => (
                      <button
                        key={r.id}
                        type="button"
                        role="radio"
                        aria-checked={r.id === role}
                        className="hb-xe11-role"
                        data-first={(role ? r.id === role : i === 0) ? "" : undefined}
                        data-autofocus={r.id === role ? "" : undefined}
                        onClick={() => setRole(r.id)}
                      >
                        <span className="hb-xe11-ri" aria-hidden="true">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={r.icon} /></svg>
                        </span>
                        <span style={{ minWidth: 0 }}>
                          <b>{r.label}</b>
                          <span>{r.hint}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {step === 1 && (
                  <>
                    <div className="hb-xe11-ws">
                      <span className="hb-xe11-av" aria-hidden="true">{(workspace.trim()[0] ?? "?").toUpperCase()}</span>
                      <div className="hb-xe11-field">
                        <input
                          className="hb-xe11-input"
                          aria-label="Workspace name"
                          value={workspace}
                          maxLength={32}
                          data-first=""
                          onChange={(e) => setWorkspace(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && canNext) goto(2);
                          }}
                        />
                        <div className="hb-xe11-url">{domain}/<b>{slugify(workspace) || "workspace"}</b></div>
                      </div>
                    </div>
                    <div className="hb-xe11-sw" role="radiogroup" aria-label="Workspace color">
                      {colors.map((c) => (
                        <button
                          key={c}
                          type="button"
                          role="radio"
                          aria-checked={c === color}
                          aria-label={`Color ${c}`}
                          className="hb-xe11-dot"
                          style={{ "--hb-xe11-c": c } as React.CSSProperties}
                          onClick={() => setColor(c)}
                        />
                      ))}
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="hb-xe11-chips" data-bad={bad} onClick={(e) => e.currentTarget.querySelector("input")?.focus()}>
                      {invites.map((m) => (
                        <span key={m} className="hb-xe11-chip">
                          <i aria-hidden="true">{m[0]}</i>
                          {m}
                          <button type="button" aria-label={`Remove ${m}`} onClick={() => setInvites((l) => l.filter((x) => x !== m))}>
                            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m2 2 6 6m0-6-6 6" /></svg>
                          </button>
                        </span>
                      ))}
                      <input
                        className="hb-xe11-chipin"
                        aria-label="Invite by email"
                        aria-describedby={`${id}-h`}
                        aria-invalid={bad ? true : undefined}
                        placeholder={invites.length ? "Add another" : "name@company.com"}
                        value={draft}
                        data-first=""
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v.endsWith(",") || v.endsWith(" ")) addInvite(v);
                          else {
                            setDraft(v);
                            if (bad) setBad(undefined);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addInvite(draft);
                          } else if (e.key === "Backspace" && !draft && invites.length) {
                            setInvites((l) => l.slice(0, -1));
                          }
                        }}
                        onBlur={() => draft && addInvite(draft)}
                      />
                    </div>
                    <p id={`${id}-h`} className="hb-xe11-help" data-bad={bad ? "true" : undefined}>
                      {bad ? "That does not look like a new, valid email." : "Press Enter or comma to add. They join as members."}
                    </p>
                  </>
                )}
                {step === total && (
                  <div className="hb-xe11-done">
                    <ul className="hb-xe11-sum">
                      <li><span>Workspace</span><b>{domain}/{slugify(workspace)}</b></li>
                      <li><span>Set up for</span><b>{roleLabel}</b></li>
                      <li><span>Invites sent</span><b>{invites.length}</b></li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="hb-xe11-foot">
                {step < total ? (
                  <>
                    <span className="hb-xe11-count">{step + 1} / {total}</span>
                    {step > 0 && <button type="button" className="hb-xe11-btn" onClick={() => goto(step - 1)}>Back</button>}
                    {step === 2 && invites.length === 0 ? (
                      <button type="button" className="hb-xe11-btn" data-primary="" onClick={() => goto(3)}>Skip for now</button>
                    ) : (
                      <button type="button" className="hb-xe11-btn" data-primary="" disabled={!canNext} onClick={() => goto(step + 1)}>
                        {step === 2 ? `Send ${invites.length} invite${invites.length === 1 ? "" : "s"}` : "Continue"}
                        {arrow}
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <span className="hb-xe11-count" />
                    <button type="button" className="hb-xe11-btn" data-primary="" data-first="" onClick={close}>
                      Open {workspace.trim() || "workspace"}
                      {arrow}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
