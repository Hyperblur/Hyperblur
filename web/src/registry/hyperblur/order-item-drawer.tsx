"use client";

import * as React from "react";

export interface OrderItemOption {
  id: string;
  label: string;
  price?: number;
  hint?: string;
}

export interface OrderItemGroup {
  id: string;
  title: string;
  type: "single" | "multiple" | "remove";
  required?: boolean;
  min?: number;
  max?: number;
  options: OrderItemOption[];
  defaultSelected?: string[];
}

export interface OrderItemInfo {
  id: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  tint?: string;
}

export interface OrderItemAddPayload {
  itemId: string;
  quantity: number;
  selections: Record<string, string[]>;
  note: string;
  unitPrice: number;
  total: number;
}

export interface OrderItemDrawerLabels {
  dialog: string;
  close: string;
  required: string;
  optional: string;
  done: string;
  chooseOne: string;
  chooseUpTo: string;
  chooseBetween: string;
  chooseAtLeast: string;
  removeHint: string;
  missing: string;
  note: string;
  notePlaceholder: string;
  quantity: string;
  decrease: string;
  increase: string;
  add: string;
  added: string;
}

export interface OrderItemDrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  item?: OrderItemInfo;
  groups?: OrderItemGroup[];
  image?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAdd?: (payload: OrderItemAddPayload) => void;
  currency?: string;
  locale?: string;
  labels?: Partial<OrderItemDrawerLabels>;
  accent?: string;
  appearance?: "dark" | "light";
  inline?: boolean;
  defaultQuantity?: number;
  maxQuantity?: number;
  noteMaxLength?: number;
  closeOnAdd?: boolean;
}

const defaultLabels: OrderItemDrawerLabels = {
  dialog: "Customize item",
  close: "Close",
  required: "Required",
  optional: "Optional",
  done: "Done",
  chooseOne: "Choose 1",
  chooseUpTo: "Choose up to {max}",
  chooseBetween: "Choose {min} to {max}",
  chooseAtLeast: "Choose at least {min}",
  removeHint: "Tap to leave out",
  missing: "Please make a choice here",
  note: "Special instructions",
  notePlaceholder: "No onions, call me at the door",
  quantity: "Quantity",
  decrease: "Decrease quantity",
  increase: "Increase quantity",
  add: "Add to order",
  added: "Added to order",
};

const defaultItem: OrderItemInfo = {
  id: "steakhouse-burger",
  name: "Steakhouse Burger",
  description: "7 oz chuck and brisket patty, aged cheddar, charred onion jam, brioche bun.",
  price: 15.5,
  badge: "Most ordered",
  tint: "#ff8a3d",
};

const defaultGroups: OrderItemGroup[] = [
  {
    id: "doneness",
    title: "How should we cook it?",
    type: "single",
    required: true,
    options: [
      { id: "medium-rare", label: "Medium rare", hint: "Warm red center" },
      { id: "medium", label: "Medium", hint: "Pink center" },
      { id: "well-done", label: "Well done", hint: "Cooked through" },
    ],
    defaultSelected: ["medium"],
  },
  {
    id: "side",
    title: "Choose a side",
    type: "single",
    required: true,
    options: [
      { id: "fries", label: "Shoestring fries" },
      { id: "sweet-potato", label: "Sweet potato fries", price: 1.5 },
      { id: "rings", label: "Beer-battered onion rings", price: 2 },
      { id: "salad", label: "Little gem salad" },
    ],
  },
  {
    id: "extras",
    title: "Add extras",
    type: "multiple",
    max: 3,
    options: [
      { id: "bacon", label: "Applewood bacon", price: 2 },
      { id: "patty", label: "Extra patty", price: 4.5 },
      { id: "egg", label: "Fried egg", price: 1.5 },
      { id: "avocado", label: "Avocado", price: 2 },
      { id: "jalapeno", label: "Pickled jalapeños", price: 0.75 },
    ],
    defaultSelected: ["bacon"],
  },
  {
    id: "remove",
    title: "Remove ingredients",
    type: "remove",
    options: [
      { id: "pickles", label: "Pickles" },
      { id: "onion", label: "Onion jam" },
      { id: "sauce", label: "House sauce" },
      { id: "lettuce", label: "Lettuce" },
    ],
  },
];

const css = `
.hb-oa2 {
  --hb-oa2-accent: #ff6a3d;
  --hb-oa2-panel: #111111;
  --hb-oa2-raise: #171717;
  --hb-oa2-line: rgba(255, 255, 255, 0.08);
  --hb-oa2-line-strong: rgba(255, 255, 255, 0.16);
  --hb-oa2-text: #ededed;
  --hb-oa2-muted: #8f8f8f;
  --hb-oa2-error: #ff5d5d;
  --hb-oa2-ok: #3ddc84;
  box-sizing: border-box;
  container-name: hb-oa2-shell;
  container-type: inline-size;
  color: var(--hb-oa2-text);
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-oa2[data-appearance="light"] {
  --hb-oa2-panel: #ffffff;
  --hb-oa2-raise: #f4f2ed;
  --hb-oa2-line: rgba(20, 16, 10, 0.09);
  --hb-oa2-line-strong: rgba(20, 16, 10, 0.2);
  --hb-oa2-text: #16130f;
  --hb-oa2-muted: #6f685e;
  --hb-oa2-error: #d92d2d;
  --hb-oa2-ok: #13995a;
}
.hb-oa2 *, .hb-oa2 *::before, .hb-oa2 *::after { box-sizing: border-box; }
.hb-oa2-overlay { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: flex-end; justify-content: center; height: 100dvh; }
.hb-oa2-inline { position: relative; width: 100%; height: 100%; }
.hb-oa2-scrim { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.56); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); animation: hb-oa2-fade 0.3s ease both; }
.hb-oa2-panel { position: relative; display: flex; flex-direction: column; width: 100%; max-height: min(92dvh, 820px); background: var(--hb-oa2-panel); border: 1px solid var(--hb-oa2-line); border-bottom: 0; border-radius: 24px 24px 0 0; box-shadow: 0 -24px 60px -20px rgba(0, 0, 0, 0.6); outline: none; overflow: hidden; animation: hb-oa2-up 0.42s cubic-bezier(0.2, 0.9, 0.2, 1) both; }
.hb-oa2-inline .hb-oa2-panel { height: 100%; max-height: none; border-bottom: 1px solid var(--hb-oa2-line); border-radius: 20px; box-shadow: 0 30px 60px -36px rgba(0, 0, 0, 0.7); animation: none; }
.hb-oa2-grab { flex: none; width: 40px; height: 4px; margin: 8px auto 0; border-radius: 99px; background: var(--hb-oa2-line-strong); }
.hb-oa2-inline .hb-oa2-grab { display: none; }
.hb-oa2-close { position: absolute; top: 12px; right: 12px; z-index: 3; display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid var(--hb-oa2-line); border-radius: 50%; background: var(--hb-oa2-raise); color: var(--hb-oa2-text); cursor: pointer; transition: background 0.2s ease, transform 0.15s ease; }
.hb-oa2-close:hover { background: var(--hb-oa2-line-strong); }
.hb-oa2-close:active { transform: scale(0.92); }
.hb-oa2-close:focus-visible, .hb-oa2-step button:focus-visible, .hb-oa2-cta:focus-visible { outline: 2px solid var(--hb-oa2-accent); outline-offset: 2px; }
.hb-oa2-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; position: relative; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; padding: 14px 16px 8px; scroll-behavior: smooth; }
.hb-oa2-hero { display: grid; grid-template-columns: 76px minmax(0, 1fr); gap: 14px; align-items: center; padding-right: 40px; margin-bottom: 14px; }
.hb-oa2-inline .hb-oa2-hero { padding-right: 0; }
.hb-oa2-art { position: relative; display: grid; place-items: center; aspect-ratio: 1; border-radius: 16px; overflow: hidden; background: radial-gradient(circle at 50% 65%, color-mix(in srgb, var(--hb-oa2-tint) 42%, transparent), transparent 72%), var(--hb-oa2-raise); box-shadow: inset 0 0 0 1px var(--hb-oa2-line); }
.hb-oa2-art svg { width: 90%; height: auto; filter: drop-shadow(0 8px 8px rgba(0, 0, 0, 0.28)); }
.hb-oa2-badge { display: inline-flex; margin-bottom: 4px; padding: 2px 8px; border-radius: 999px; background: color-mix(in srgb, var(--hb-oa2-accent) 16%, transparent); color: var(--hb-oa2-accent); font-size: 11px; font-weight: 600; }
.hb-oa2-name { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2; }
.hb-oa2-desc { margin: 4px 0 0; color: var(--hb-oa2-muted); font-size: 12.5px; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hb-oa2-base { margin-top: 6px; font-size: 13.5px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-oa2-group { margin: 0 0 12px; padding: 12px; border: 1px solid var(--hb-oa2-line); border-radius: 16px; background: color-mix(in srgb, var(--hb-oa2-raise) 60%, transparent); transition: border-color 0.25s ease, background 0.25s ease; min-width: 0; }
.hb-oa2-group[data-error="true"] { border-color: color-mix(in srgb, var(--hb-oa2-error) 70%, transparent); background: color-mix(in srgb, var(--hb-oa2-error) 7%, transparent); animation: hb-oa2-nudge 0.42s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-oa2-legend { float: left; width: 100%; margin: 0 0 8px; padding: 0; }
.hb-oa2-ghead { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.hb-oa2-gtitle { display: block; font-size: 14px; font-weight: 600; letter-spacing: -0.01em; }
.hb-oa2-grule { display: block; margin-top: 2px; color: var(--hb-oa2-muted); font-size: 12px; }
.hb-oa2-group[data-error="true"] .hb-oa2-grule { color: var(--hb-oa2-error); }
.hb-oa2-pill { flex: none; display: inline-flex; align-items: center; gap: 4px; height: 22px; padding: 0 8px; border-radius: 999px; background: var(--hb-oa2-line); color: var(--hb-oa2-muted); font-size: 11px; font-weight: 600; }
.hb-oa2-pill[data-tone="required"] { background: color-mix(in srgb, var(--hb-oa2-accent) 16%, transparent); color: var(--hb-oa2-accent); }
.hb-oa2-pill[data-tone="error"] { background: color-mix(in srgb, var(--hb-oa2-error) 16%, transparent); color: var(--hb-oa2-error); }
.hb-oa2-pill[data-tone="done"] { background: color-mix(in srgb, var(--hb-oa2-ok) 14%, transparent); color: var(--hb-oa2-ok); }
.hb-oa2-opts { clear: both; display: grid; gap: 2px; }
.hb-oa2-opt { position: relative; display: flex; align-items: center; gap: 12px; min-height: 44px; padding: 8px 10px; border-radius: 12px; cursor: pointer; transition: background 0.2s ease; }
.hb-oa2-opt:hover { background: var(--hb-oa2-line); }
.hb-oa2-opt[data-disabled="true"] { cursor: not-allowed; opacity: 0.42; }
.hb-oa2-opt[data-disabled="true"]:hover { background: transparent; }
.hb-oa2-input { position: absolute; opacity: 0; width: 1px; height: 1px; margin: 0; pointer-events: none; }
.hb-oa2-mark { flex: none; display: grid; place-items: center; width: 20px; height: 20px; border: 1.5px solid var(--hb-oa2-line-strong); border-radius: 6px; color: transparent; transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.3, 1.6, 0.5, 1); }
.hb-oa2-mark[data-shape="radio"] { border-radius: 50%; }
.hb-oa2-mark[data-shape="radio"]::after { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #fff; transform: scale(0); transition: transform 0.22s cubic-bezier(0.3, 1.6, 0.5, 1); }
.hb-oa2-input:checked + .hb-oa2-mark { background: var(--hb-oa2-accent); border-color: var(--hb-oa2-accent); color: #fff; transform: scale(1.06); }
.hb-oa2-input:checked + .hb-oa2-mark[data-shape="radio"]::after { transform: scale(1); }
.hb-oa2-input:checked + .hb-oa2-mark[data-shape="remove"] { background: var(--hb-oa2-error); border-color: var(--hb-oa2-error); }
.hb-oa2-input:focus-visible + .hb-oa2-mark { outline: 2px solid var(--hb-oa2-accent); outline-offset: 2px; }
.hb-oa2-otext { flex: 1 1 auto; min-width: 0; }
.hb-oa2-olabel { display: block; font-size: 13.5px; line-height: 1.3; transition: color 0.2s ease; }
.hb-oa2-ohint { display: block; margin-top: 1px; color: var(--hb-oa2-muted); font-size: 11.5px; }
.hb-oa2-input:checked ~ .hb-oa2-otext .hb-oa2-olabel[data-strike="true"] { color: var(--hb-oa2-muted); text-decoration: line-through; text-decoration-color: var(--hb-oa2-error); }
.hb-oa2-oprice { flex: none; color: var(--hb-oa2-muted); font-size: 12.5px; font-variant-numeric: tabular-nums; }
.hb-oa2-input:checked ~ .hb-oa2-oprice { color: var(--hb-oa2-text); }
.hb-oa2-note { display: block; margin: 4px 0 8px; }
.hb-oa2-nhead { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; font-weight: 600; }
.hb-oa2-ncount { color: var(--hb-oa2-muted); font-size: 11.5px; font-weight: 500; font-variant-numeric: tabular-nums; }
.hb-oa2-textarea { display: block; width: 100%; min-height: 72px; padding: 10px 12px; border: 1px solid var(--hb-oa2-line-strong); border-radius: 12px; background: var(--hb-oa2-raise); color: var(--hb-oa2-text); font: inherit; font-size: 16px; line-height: 1.45; resize: vertical; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.hb-oa2-textarea::placeholder { color: var(--hb-oa2-muted); }
.hb-oa2-textarea:focus { outline: none; border-color: var(--hb-oa2-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-oa2-accent) 22%, transparent); }
.hb-oa2-foot { flex: none; display: flex; align-items: center; gap: 8px; padding: 10px 12px calc(10px + env(safe-area-inset-bottom, 0px)); border-top: 1px solid var(--hb-oa2-line); background: color-mix(in srgb, var(--hb-oa2-panel) 92%, transparent); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.hb-oa2-inline .hb-oa2-foot { padding-bottom: 10px; }
.hb-oa2-step { flex: none; display: inline-flex; align-items: center; height: 42px; padding: 3px; border: 1px solid var(--hb-oa2-line-strong); border-radius: 999px; }
.hb-oa2-step button { display: grid; place-items: center; width: 34px; height: 34px; padding: 0; border: 0; border-radius: 50%; background: transparent; color: var(--hb-oa2-text); cursor: pointer; transition: background 0.2s ease; }
.hb-oa2-step button:hover:not(:disabled) { background: var(--hb-oa2-line); }
.hb-oa2-step button:disabled { opacity: 0.35; cursor: not-allowed; }
.hb-oa2-qty { min-width: 22px; text-align: center; font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-oa2-cta { position: relative; flex: 1 1 auto; min-width: 0; display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 44px; padding: 0 16px; border: 0; border-radius: 999px; background: var(--hb-oa2-accent); color: #fff; font: inherit; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; cursor: pointer; transition: filter 0.2s ease, transform 0.15s ease, opacity 0.2s ease; }
.hb-oa2-cta:hover { filter: brightness(1.08); }
.hb-oa2-cta:active { transform: scale(0.98); }
.hb-oa2-cta[aria-disabled="true"] { opacity: 0.55; }
.hb-oa2-cta[data-added="true"] { background: var(--hb-oa2-ok); }
.hb-oa2-total { display: inline-block; font-variant-numeric: tabular-nums; animation: hb-oa2-tick 0.35s cubic-bezier(0.2, 0.8, 0.2, 1); }
.hb-oa2-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-oa2-fade { from { opacity: 0; } }
@keyframes hb-oa2-up { from { transform: translateY(100%); } }
@keyframes hb-oa2-side { from { transform: translateX(100%); } }
@keyframes hb-oa2-tick { from { opacity: 0; transform: translateY(6px); } }
@keyframes hb-oa2-nudge { 20% { transform: translateX(-5px); } 45% { transform: translateX(4px); } 70% { transform: translateX(-2px); } }
@container hb-oa2-shell (min-width: 720px) {
  .hb-oa2-overlay { justify-content: flex-end; align-items: stretch; }
  .hb-oa2-overlay .hb-oa2-panel { width: min(460px, 100%); height: 100dvh; max-height: none; border: 0; border-left: 1px solid var(--hb-oa2-line); border-radius: 0; box-shadow: -24px 0 60px -20px rgba(0, 0, 0, 0.6); animation-name: hb-oa2-side; }
  .hb-oa2-overlay .hb-oa2-grab { display: none; }
  .hb-oa2-overlay .hb-oa2-body { padding: 20px 22px 10px; }
  .hb-oa2-overlay .hb-oa2-hero { grid-template-columns: minmax(0, 1fr); padding-right: 0; }
  .hb-oa2-overlay .hb-oa2-art { aspect-ratio: 16 / 9; }
  .hb-oa2-overlay .hb-oa2-art svg { width: 52%; }
  .hb-oa2-overlay .hb-oa2-name { font-size: 22px; }
  .hb-oa2-overlay .hb-oa2-foot { padding: 14px 22px calc(14px + env(safe-area-inset-bottom, 0px)); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-oa2-scrim, .hb-oa2-panel, .hb-oa2-total, .hb-oa2-group[data-error="true"] { animation: none; }
  .hb-oa2-overlay .hb-oa2-panel { animation: none; }
  .hb-oa2-body { scroll-behavior: auto; }
  .hb-oa2 * { transition: none; }
}
`;

function BurgerArt({ uid }: { uid: string }) {
  return (
    <svg viewBox="0 0 120 96" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc06a" />
          <stop offset="1" stopColor="#cc6f25" />
        </linearGradient>
        <linearGradient id={`${uid}-meat`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#80421f" />
          <stop offset="1" stopColor="#3b1a0a" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="86" rx="44" ry="5" fill="rgba(0,0,0,0.3)" />
      <path d="M18 68 H102 a5 5 0 0 1 -4 8 C86 82 34 82 22 76 a5 5 0 0 1 -4 -8 Z" fill="#c4692a" />
      <rect x="14" y="54" width="92" height="15" rx="7.5" fill={`url(#${uid}-meat)`} />
      <path d="M16 52 H104 L98 58 L92 66 L86 58 L74 63 L66 56 L54 64 L46 56 L34 62 L26 56 Z" fill="#ffc53a" />
      <path d="M12 50 q7 -7 14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 v4 H12 Z" fill="#59c057" />
      <rect x="22" y="43" width="76" height="6" rx="3" fill="#e5473a" />
      <path d="M14 45 C14 12 106 12 106 45 Z" fill={`url(#${uid}-top)`} />
      <path d="M28 32 C34 22 48 18 60 18" stroke="rgba(255,255,255,0.35)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <g fill="#fff3d4">
        <ellipse cx="44" cy="28" rx="2.4" ry="1.3" transform="rotate(-18 44 28)" />
        <ellipse cx="58" cy="24" rx="2.4" ry="1.3" transform="rotate(8 58 24)" />
        <ellipse cx="72" cy="26" rx="2.4" ry="1.3" transform="rotate(-10 72 26)" />
        <ellipse cx="84" cy="31" rx="2.4" ry="1.3" transform="rotate(16 84 31)" />
        <ellipse cx="52" cy="34" rx="2.4" ry="1.3" transform="rotate(22 52 34)" />
        <ellipse cx="66" cy="33" rx="2.4" ry="1.3" transform="rotate(-4 66 33)" />
        <ellipse cx="78" cy="38" rx="2.4" ry="1.3" transform="rotate(12 78 38)" />
      </g>
    </svg>
  );
}

const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function initialSelections(groups: OrderItemGroup[]) {
  const out: Record<string, string[]> = {};
  for (const g of groups) out[g.id] = g.defaultSelected ? [...g.defaultSelected] : [];
  return out;
}

function minFor(group: OrderItemGroup) {
  if (group.type === "remove") return 0;
  if (group.type === "single") return group.required ? 1 : 0;
  return group.min ?? (group.required ? 1 : 0);
}

function fill(template: string, values: Record<string, number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export function OrderItemDrawer({
  item = defaultItem,
  groups = defaultGroups,
  image,
  open,
  defaultOpen = false,
  onOpenChange,
  onAdd,
  currency = "USD",
  locale = "en-US",
  labels: labelsProp,
  accent = "#ff6a3d",
  appearance = "dark",
  inline = false,
  defaultQuantity = 1,
  maxQuantity = 20,
  noteMaxLength = 140,
  closeOnAdd = true,
  className = "",
  style,
  ...rest
}: OrderItemDrawerProps) {
  const labels = { ...defaultLabels, ...labelsProp };
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const addedTimer = React.useRef(0);
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const isOpen = inline ? true : open ?? innerOpen;
  const [selections, setSelections] = React.useState(() => initialSelections(groups));
  const [quantity, setQuantity] = React.useState(defaultQuantity);
  const [note, setNote] = React.useState("");
  const [showErrors, setShowErrors] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const [announce, setAnnounce] = React.useState("");
  const [prev, setPrev] = React.useState({ open: isOpen, item: item.id });

  if (prev.open !== isOpen || prev.item !== item.id) {
    setPrev({ open: isOpen, item: item.id });
    if (isOpen) {
      setSelections(initialSelections(groups));
      setQuantity(defaultQuantity);
      setNote("");
      setShowErrors(false);
      setAdded(false);
    }
  }

  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency }), [locale, currency]);

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (open === undefined) setInnerOpen(value);
      onOpenChange?.(value);
    },
    [open, onOpenChange],
  );

  const unitPrice = groups.reduce((sum, g) => {
    if (g.type === "remove") return sum;
    const picked = selections[g.id] ?? [];
    return sum + g.options.reduce((s, o) => (picked.includes(o.id) ? s + (o.price ?? 0) : s), 0);
  }, item.price);
  const total = Math.round(unitPrice * quantity * 100) / 100;
  const missing = groups.filter((g) => (selections[g.id]?.length ?? 0) < minFor(g));
  const valid = missing.length === 0;

  React.useEffect(() => () => window.clearTimeout(addedTimer.current), []);

  React.useEffect(() => {
    if (!isOpen || inline) return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const inerted: HTMLElement[] = [];
    let node: HTMLElement = overlay;
    while (node.parentElement) {
      const parent: HTMLElement = node.parentElement;
      for (const sibling of Array.from(parent.children)) {
        if (sibling === node || !(sibling instanceof HTMLElement)) continue;
        if (sibling.inert || sibling.tagName === "STYLE" || sibling.tagName === "SCRIPT") continue;
        sibling.inert = true;
        inerted.push(sibling);
      }
      if (parent === document.body) break;
      node = parent;
    }
    const target = panelRef.current?.querySelector<HTMLElement>("[data-hb-oa2-initial]") ?? panelRef.current;
    target?.focus({ preventScroll: true });
    return () => {
      html.style.overflow = prevOverflow;
      inerted.forEach((el) => {
        el.inert = false;
      });
      opener?.focus({ preventScroll: true });
    };
  }, [isOpen, inline]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (inline) return;
    if (event.key === "Escape") {
      event.stopPropagation();
      setOpen(false);
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const toggle = (group: OrderItemGroup, optionId: string) => {
    setSelections((current) => {
      const picked = current[group.id] ?? [];
      if (group.type === "single") return { ...current, [group.id]: [optionId] };
      if (picked.includes(optionId)) return { ...current, [group.id]: picked.filter((id) => id !== optionId) };
      if (group.type === "multiple" && group.max !== undefined && picked.length >= group.max) return current;
      return { ...current, [group.id]: [...picked, optionId] };
    });
  };

  const submit = () => {
    if (!valid) {
      setShowErrors(true);
      const first = missing[0];
      setAnnounce(`${labels.missing}: ${first.title}`);
      const el = document.getElementById(`${uid}-g-${first.id}`);
      const body = bodyRef.current;
      if (el && body) {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        body.scrollTo({ top: Math.max(0, el.offsetTop - 12), behavior: reduced ? "auto" : "smooth" });
        el.querySelector<HTMLInputElement>("input:not([disabled])")?.focus({ preventScroll: true });
      }
      return;
    }
    const payload: OrderItemAddPayload = {
      itemId: item.id,
      quantity,
      selections: Object.fromEntries(groups.map((g) => [g.id, [...(selections[g.id] ?? [])]])),
      note: note.trim(),
      unitPrice: Math.round(unitPrice * 100) / 100,
      total,
    };
    onAdd?.(payload);
    setAnnounce(labels.added);
    if (!inline && closeOnAdd) {
      setOpen(false);
      return;
    }
    setAdded(true);
    window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setAdded(false), 1600);
  };

  const ruleFor = (g: OrderItemGroup) => {
    if (g.type === "remove") return labels.removeHint;
    if (g.type === "single") return labels.chooseOne;
    const min = minFor(g);
    if (g.max !== undefined && min > 0) return fill(labels.chooseBetween, { min, max: g.max });
    if (g.max !== undefined) return fill(labels.chooseUpTo, { max: g.max });
    if (min > 0) return fill(labels.chooseAtLeast, { min });
    return labels.optional;
  };

  if (!isOpen) return null;

  const vars = { "--hb-oa2-accent": accent, "--hb-oa2-tint": item.tint ?? accent, ...style } as React.CSSProperties;
  const titleId = `${uid}-title`;

  const panel = (
    <div
      ref={panelRef}
      className="hb-oa2-panel"
      role={inline ? "group" : "dialog"}
      aria-modal={inline ? undefined : true}
      aria-labelledby={titleId}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    >
      <div className="hb-oa2-grab" aria-hidden="true" />
      {inline ? null : (
        <button type="button" className="hb-oa2-close" aria-label={labels.close} onClick={() => setOpen(false)} data-hb-oa2-initial="">
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      )}
      <div className="hb-oa2-body" ref={bodyRef}>
        <div className="hb-oa2-hero">
          <div className="hb-oa2-art">{image ?? <BurgerArt uid={uid} />}</div>
          <div>
            {item.badge ? <span className="hb-oa2-badge">{item.badge}</span> : null}
            <h2 className="hb-oa2-name" id={titleId}>{item.name}</h2>
            <p className="hb-oa2-desc">{item.description}</p>
            <div className="hb-oa2-base">{money.format(item.price)}</div>
          </div>
        </div>
        {groups.map((g) => {
          const picked = selections[g.id] ?? [];
          const min = minFor(g);
          const satisfied = picked.length >= min;
          const error = showErrors && !satisfied;
          const atMax = g.type === "multiple" && g.max !== undefined && picked.length >= g.max;
          const tone = error ? "error" : min > 0 ? (satisfied ? "done" : "required") : "optional";
          const ruleId = `${uid}-r-${g.id}`;
          return (
            <fieldset
              key={g.id}
              id={`${uid}-g-${g.id}`}
              className="hb-oa2-group"
              data-error={error}
              aria-describedby={ruleId}
              aria-invalid={error || undefined}
            >
              <legend className="hb-oa2-legend">
                <span className="hb-oa2-ghead">
                  <span>
                    <span className="hb-oa2-gtitle">{g.title}</span>
                    <span className="hb-oa2-grule" id={ruleId}>{error ? labels.missing : ruleFor(g)}</span>
                  </span>
                  <span className="hb-oa2-pill" data-tone={tone}>
                    {tone === "done" ? (
                      <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2.5 6.5l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : null}
                    {tone === "done" ? labels.done : tone === "optional" ? labels.optional : labels.required}
                  </span>
                </span>
              </legend>
              <div className="hb-oa2-opts">
                {g.options.map((o) => {
                  const checked = picked.includes(o.id);
                  const disabled = !checked && atMax;
                  const shape = g.type === "single" ? "radio" : g.type === "remove" ? "remove" : "check";
                  return (
                    <label key={o.id} className="hb-oa2-opt" data-disabled={disabled}>
                      <input
                        className="hb-oa2-input"
                        type={g.type === "single" ? "radio" : "checkbox"}
                        name={`${uid}-${g.id}`}
                        value={o.id}
                        checked={checked}
                        disabled={disabled}
                        onChange={() => toggle(g, o.id)}
                      />
                      <span className="hb-oa2-mark" data-shape={shape} aria-hidden="true">
                        {shape === "check" ? (
                          <svg width="12" height="12" viewBox="0 0 12 12">
                            <path d="M2.5 6.5l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : shape === "remove" ? (
                          <svg width="12" height="12" viewBox="0 0 12 12">
                            <path d="M3 6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        ) : null}
                      </span>
                      <span className="hb-oa2-otext">
                        <span className="hb-oa2-olabel" data-strike={g.type === "remove"}>{o.label}</span>
                        {o.hint ? <span className="hb-oa2-ohint">{o.hint}</span> : null}
                      </span>
                      {o.price ? <span className="hb-oa2-oprice">+{money.format(o.price)}</span> : null}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
        <label className="hb-oa2-note">
          <span className="hb-oa2-nhead">
            {labels.note}
            <span className="hb-oa2-ncount">{note.length}/{noteMaxLength}</span>
          </span>
          <textarea
            className="hb-oa2-textarea"
            value={note}
            maxLength={noteMaxLength}
            placeholder={labels.notePlaceholder}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
          />
        </label>
      </div>
      <div className="hb-oa2-foot">
        <div className="hb-oa2-step" role="group" aria-label={labels.quantity}>
          <button type="button" aria-label={labels.decrease} disabled={quantity <= 1} onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <span className="hb-oa2-qty" aria-live="polite">{quantity}</span>
          <button type="button" aria-label={labels.increase} disabled={quantity >= maxQuantity} onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}>
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <button type="button" className="hb-oa2-cta" aria-disabled={!valid} data-added={added} onClick={submit}>
          {added ? (
            labels.added
          ) : (
            <>
              {labels.add} ·{" "}
              <span key={total} className="hb-oa2-total">{money.format(total)}</span>
            </>
          )}
        </button>
      </div>
      <span className="hb-oa2-sr" role="status" aria-live="polite">{announce}</span>
    </div>
  );

  if (inline) {
    return (
      <div className={`hb-oa2 hb-oa2-inline ${className}`} style={vars} data-appearance={appearance} {...rest}>
        <style href="hb-order-item-drawer" precedence="default">{css}</style>
        {panel}
      </div>
    );
  }

  return (
    <div ref={overlayRef} className={`hb-oa2 hb-oa2-overlay ${className}`} style={vars} data-appearance={appearance} {...rest}>
      <style href="hb-order-item-drawer" precedence="default">{css}</style>
      <div className="hb-oa2-scrim" aria-hidden="true" onClick={() => setOpen(false)} />
      {panel}
    </div>
  );
}
