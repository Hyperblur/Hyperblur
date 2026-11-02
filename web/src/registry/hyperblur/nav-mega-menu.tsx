"use client";

import * as React from "react";

export type NavMegaMenuIcon =
  "bolt" | "chart" | "shield" | "layers" | "code" | "globe" | "users" | "book" | "terminal" | "plug" | "spark" | "cube";

export interface NavMegaMenuLink {
  label: string;
  href: string;
}

export interface NavMegaMenuItem {
  label: string;
  description?: string;
  href: string;
  icon?: NavMegaMenuIcon;
  badge?: string;
}

export interface NavMegaMenuColumn {
  title: string;
  items: NavMegaMenuItem[];
}

export interface NavMegaMenuFeatured {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface NavMegaMenuEntry {
  id: string;
  label: string;
  href?: string;
  columns?: NavMegaMenuColumn[];
  featured?: NavMegaMenuFeatured;
  footer?: NavMegaMenuLink[];
}

export interface NavMegaMenuProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  menus?: NavMegaMenuEntry[];
  signIn?: NavMegaMenuLink | null;
  cta?: NavMegaMenuLink | null;
  accent?: string;
  openId?: string | null;
  defaultOpenId?: string | null;
  onOpenChange?: (id: string | null) => void;
  hoverDelay?: number;
  showBackdrop?: boolean;
}

const css = `
.hb-ke1 {
  --hb-ke1-accent: #8b5cf6;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ke1 *, .hb-ke1 *::before, .hb-ke1 *::after { box-sizing: border-box; }
.hb-ke1-bar {
  position: relative;
  z-index: 3;
  border-bottom: 1px solid rgba(255,255,255,.08);
  background: rgba(10,10,10,.92);
  backdrop-filter: saturate(140%) blur(12px);
}
.hb-ke1-row {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 1120px;
  height: 64px;
  margin: 0 auto;
  padding: 0 24px;
}
.hb-ke1-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: none;
  color: #ededed;
  font-size: 16px;
  font-weight: 650;
  letter-spacing: -.01em;
  text-decoration: none;
  border-radius: 8px;
}
.hb-ke1-mark {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(140deg, color-mix(in srgb, var(--hb-ke1-accent) 90%, #fff), color-mix(in srgb, var(--hb-ke1-accent) 55%, #000));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 6px 18px -6px var(--hb-ke1-accent);
}
.hb-ke1-mark svg { width: 16px; height: 16px; fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; }
.hb-ke1-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-ke1-top {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  margin: 0;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: color .18s ease, background-color .18s ease;
}
.hb-ke1-top:hover, .hb-ke1-top[aria-expanded="true"] { color: #ededed; background: rgba(255,255,255,.06); }
.hb-ke1-top svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; transition: transform .25s cubic-bezier(.2,.8,.2,1); }
.hb-ke1-top[aria-expanded="true"] svg { transform: rotate(180deg); }
.hb-ke1-end { display: flex; align-items: center; gap: 8px; margin-left: auto; flex: none; }
.hb-ke1-ghost, .hb-ke1-cta {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color .18s ease, color .18s ease, transform .15s ease, box-shadow .2s ease;
}
.hb-ke1-ghost { color: #a1a1a1; }
.hb-ke1-ghost:hover { color: #ededed; }
.hb-ke1-cta {
  gap: 6px;
  color: #0a0a0a;
  background: #ededed;
  box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
}
.hb-ke1-cta:hover { background: #fff; box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-ke1-accent) 25%, transparent); }
.hb-ke1-cta:active { transform: scale(.97); }
.hb-ke1-cta svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; transition: transform .2s ease; }
.hb-ke1-cta:hover svg { transform: translateX(2px); }
.hb-ke1 a:focus-visible, .hb-ke1 button:focus-visible { outline: 2px solid var(--hb-ke1-accent); outline-offset: 2px; }
.hb-ke1-panel {
  position: absolute;
  z-index: 4;
  top: 100%;
  left: 0;
  right: 0;
  padding: 10px 24px 0;
  pointer-events: none;
}
.hb-ke1-card {
  position: relative;
  max-width: 1072px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 18px;
  background:
    radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, var(--hb-ke1-accent) 10%, transparent), transparent 60%),
    linear-gradient(#121212, #0e0e0e);
  box-shadow: 0 1px 0 rgba(255,255,255,.06) inset, 0 30px 80px -20px rgba(0,0,0,.8), 0 0 0 1px rgba(0,0,0,.6);
  opacity: 0;
  visibility: hidden;
  transform: translate3d(0,-8px,0) scale(.985);
  transform-origin: 50% 0;
  transition: opacity .2s ease, transform .28s cubic-bezier(.2,.8,.2,1), visibility 0s linear .28s;
}
.hb-ke1-panel[data-open="true"] { pointer-events: auto; }
.hb-ke1-panel[data-open="true"] .hb-ke1-card {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition: opacity .2s ease, transform .32s cubic-bezier(.2,.8,.2,1), visibility 0s;
}
.hb-ke1-sheets { position: relative; }
.hb-ke1-sheet {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 1.15fr);
  gap: 8px;
  padding: 18px;
  transition: opacity .18s ease;
}
.hb-ke1-sheet[data-on="false"] { position: absolute; inset: 0; opacity: 0; visibility: hidden; }
.hb-ke1-col { min-width: 0; padding: 6px; }
.hb-ke1-colt {
  margin: 4px 10px 10px;
  color: #6f6f6f;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-ke1-list { display: grid; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-ke1-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  color: #ededed;
  text-decoration: none;
  transition: background-color .18s ease;
}
.hb-ke1-item:hover, .hb-ke1-item:focus-visible { background: rgba(255,255,255,.05); }
.hb-ke1-sheet[data-on="true"] .hb-ke1-item { animation: hb-ke1-in .42s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-ke1-i) * 26ms); }
.hb-ke1-ico {
  display: grid;
  place-items: center;
  flex: none;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 10px;
  background: linear-gradient(#1b1b1b, #141414);
  color: #a1a1a1;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
  transition: color .18s ease, border-color .18s ease, background .18s ease;
}
.hb-ke1-ico svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.hb-ke1-item:hover .hb-ke1-ico, .hb-ke1-item:focus-visible .hb-ke1-ico {
  color: var(--hb-ke1-accent);
  border-color: color-mix(in srgb, var(--hb-ke1-accent) 45%, transparent);
  background: color-mix(in srgb, var(--hb-ke1-accent) 12%, #141414);
}
.hb-ke1-txt { min-width: 0; }
.hb-ke1-lab { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 550; line-height: 1.3; }
.hb-ke1-badge {
  padding: 2px 7px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-ke1-accent) 18%, transparent);
  color: color-mix(in srgb, var(--hb-ke1-accent) 70%, #fff);
  font-size: 10.5px;
  font-weight: 600;
}
.hb-ke1-desc { margin-top: 3px; color: #8f8f8f; font-size: 12.5px; line-height: 1.45; }
.hb-ke1-feat {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 260px;
  margin: 6px;
  padding: 18px;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 14px;
  background: #0d0d10;
  color: #ededed;
  text-decoration: none;
}
.hb-ke1-feat::before {
  content: "";
  position: absolute;
  z-index: -2;
  inset: -40%;
  background: conic-gradient(from 0deg at 50% 50%, transparent 0deg, color-mix(in srgb, var(--hb-ke1-accent) 55%, transparent) 70deg, transparent 140deg, rgba(56,189,248,.35) 220deg, transparent 300deg);
  filter: blur(36px);
  animation: hb-ke1-spin 12s linear infinite;
}
.hb-ke1-feat::after {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  background:
    linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px) 0 0 / 22px 22px,
    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px) 0 0 / 22px 22px,
    linear-gradient(180deg, rgba(13,13,16,.1), rgba(13,13,16,.92) 70%);
}
.hb-ke1-chip {
  position: absolute;
  top: 18px;
  left: 18px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 999px;
  background: rgba(10,10,10,.5);
  font-size: 11.5px;
  font-weight: 550;
}
.hb-ke1-chip i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-ke1-accent); box-shadow: 0 0 10px var(--hb-ke1-accent); }
.hb-ke1-ft { margin: 0; font-size: 17px; font-weight: 650; letter-spacing: -.01em; line-height: 1.25; }
.hb-ke1-fd { margin: 6px 0 14px; color: #a1a1a1; font-size: 13px; line-height: 1.5; }
.hb-ke1-fl { display: inline-flex; align-items: center; gap: 6px; color: #ededed; font-size: 13px; font-weight: 550; }
.hb-ke1-fl svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; transition: transform .2s ease; }
.hb-ke1-feat:hover .hb-ke1-fl svg { transform: translateX(3px); }
.hb-ke1-foot {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 12px 24px;
  border-top: 1px solid rgba(255,255,255,.07);
  background: rgba(255,255,255,.02);
  font-size: 12.5px;
}
.hb-ke1-foot span { color: #6f6f6f; }
.hb-ke1-foot a { color: #a1a1a1; text-decoration: none; transition: color .15s ease; }
.hb-ke1-foot a:hover { color: #ededed; }
.hb-ke1-stage {
  position: relative;
  z-index: 1;
  height: 520px;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(#000 40%, transparent);
  mask-image: linear-gradient(#000 40%, transparent);
}
.hb-ke1-stage::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--hb-ke1-accent) 16%, transparent), transparent 70%),
    linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px) 0 0 / 48px 48px,
    linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px) 0 0 / 48px 48px;
}
.hb-ke1-hero { position: relative; max-width: 760px; margin: 0 auto; padding: 96px 24px 0; text-align: center; opacity: .42; }
.hb-ke1-pill { display: inline-block; padding: 5px 12px; border: 1px solid rgba(255,255,255,.12); border-radius: 999px; color: #a1a1a1; font-size: 12px; }
.hb-ke1-h { margin: 20px 0 14px; font-size: clamp(30px, 6cqi, 56px); font-weight: 650; letter-spacing: -.035em; line-height: 1.04; }
.hb-ke1-s { margin: 0 auto; max-width: 520px; color: #8f8f8f; font-size: 16px; line-height: 1.55; }
.hb-ke1-frame { width: min(920px, calc(100% - 48px)); height: 200px; margin: 44px auto 0; border: 1px solid rgba(255,255,255,.1); border-radius: 16px 16px 0 0; background: linear-gradient(#141414, #0c0c0c); }
.hb-ke1-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-ke1-in { from { opacity: 0; transform: translate3d(0,6px,0); } to { opacity: 1; transform: none; } }
@keyframes hb-ke1-spin { to { transform: rotate(1turn); } }
@container (max-width: 980px) {
  .hb-ke1-sheet { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-ke1-feat { min-height: 180px; grid-column: span 2; }
}
@container (max-width: 760px) {
  .hb-ke1-row { flex-wrap: wrap; height: auto; padding: 12px 16px 0; row-gap: 6px; }
  .hb-ke1-nav { order: 3; flex: 1 0 100%; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
  .hb-ke1-nav::-webkit-scrollbar { display: none; }
  .hb-ke1-ghost { display: none; }
  .hb-ke1-panel { padding: 8px 12px 0; }
  .hb-ke1-sheet { grid-template-columns: minmax(0, 1fr); padding: 10px; max-height: 70vh; overflow-y: auto; }
  .hb-ke1-feat { grid-column: auto; }
  .hb-ke1-desc { display: none; }
  .hb-ke1-foot { flex-wrap: wrap; gap: 10px 16px; padding: 12px 16px; }
  .hb-ke1-hero { padding-top: 64px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ke1 *, .hb-ke1 *::before, .hb-ke1 *::after { animation: none !important; transition: none !important; }
}
`;

const paths: Record<NavMegaMenuIcon, string[]> = {
  bolt: ["M13 2 4 14h7l-1 8 9-12h-7l1-8z"],
  chart: ["M4 20V10M10 20V4M16 20v-7M21 20H3"],
  shield: ["M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3z", "m9 12 2 2 4-4"],
  layers: ["m12 3 9 5-9 5-9-5 9-5z", "m3 13 9 5 9-5"],
  code: ["m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"],
  globe: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"],
  users: [
    "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-4A3.5 3.5 0 0 0 5 18.5V20",
    "M10.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    "M19 20v-1.5a3.5 3.5 0 0 0-2.5-3.3M15.5 5.2a3 3 0 0 1 0 5.6",
  ],
  book: ["M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16z", "M4 21.5A2.5 2.5 0 0 1 6.5 19H20"],
  terminal: ["M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "m7 10 3 2-3 2M13 15h4"],
  plug: ["M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8z", "M12 17v4"],
  spark: ["M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"],
  cube: ["m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3z", "m4 7.5 8 4.5 8-4.5M12 12v9"],
};

function Icon({ name }: { name: NavMegaMenuIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const defaultMenus: NavMegaMenuEntry[] = [
  {
    id: "product",
    label: "Product",
    columns: [
      {
        title: "Platform",
        items: [
          { label: "Insights", description: "Funnels, cohorts and retention in one query", href: "#", icon: "chart" },
          { label: "Flows", description: "Trigger journeys from live product events", href: "#", icon: "bolt", badge: "New" },
          { label: "Warehouse sync", description: "Two-way sync with Snowflake and BigQuery", href: "#", icon: "layers" },
        ],
      },
      {
        title: "Build",
        items: [
          { label: "Events API", description: "Typed SDKs for 14 languages", href: "#", icon: "code" },
          { label: "CLI", description: "Ship tracking plans from your terminal", href: "#", icon: "terminal" },
          { label: "Integrations", description: "Connect 180+ tools in a click", href: "#", icon: "plug" },
        ],
      },
      {
        title: "Trust",
        items: [
          { label: "Security", description: "SSO, SCIM and audit trails", href: "#", icon: "shield" },
          { label: "Data residency", description: "Host in the EU, US or Australia", href: "#", icon: "globe" },
          { label: "Status", description: "99.99% uptime over 12 months", href: "#", icon: "spark" },
        ],
      },
    ],
    featured: {
      eyebrow: "Lumen 4.2",
      title: "Flows: journeys that react in under 200ms",
      description: "Send the right nudge the moment a user hits a milestone, without a single cron job.",
      href: "#",
      cta: "See what shipped",
    },
    footer: [
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
      { label: "Book a demo", href: "#" },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    columns: [
      {
        title: "By team",
        items: [
          { label: "Product", description: "Find the features that drive retention", href: "#", icon: "cube" },
          { label: "Growth", description: "Experiment with every onboarding step", href: "#", icon: "spark" },
          { label: "Engineering", description: "Debug releases with session context", href: "#", icon: "terminal" },
        ],
      },
      {
        title: "By stage",
        items: [
          { label: "Startups", description: "Free up to 10M events a month", href: "#", icon: "bolt" },
          { label: "Scale-ups", description: "Governance without the overhead", href: "#", icon: "layers" },
          { label: "Enterprise", description: "Dedicated clusters and support", href: "#", icon: "shield" },
        ],
      },
      {
        title: "By industry",
        items: [
          { label: "Fintech", description: "PCI-ready event pipelines", href: "#", icon: "chart" },
          { label: "Marketplaces", description: "Two-sided funnels out of the box", href: "#", icon: "users" },
          { label: "Media", description: "Engagement scoring per article", href: "#", icon: "book" },
        ],
      },
    ],
    featured: {
      eyebrow: "Customer story",
      title: "How Fernway cut churn by 18% in one quarter",
      description: "Their product team replaced four dashboards with a single retention view.",
      href: "#",
      cta: "Read the story",
    },
    footer: [
      { label: "All customers", href: "#" },
      { label: "Partners", href: "#" },
    ],
  },
  {
    id: "developers",
    label: "Developers",
    columns: [
      {
        title: "Docs",
        items: [
          { label: "Quickstart", description: "Track your first event in five minutes", href: "#", icon: "bolt" },
          { label: "API reference", description: "Every endpoint with live examples", href: "#", icon: "code" },
        ],
      },
      {
        title: "Tools",
        items: [
          { label: "SDKs", description: "Web, iOS, Android, Node and Go", href: "#", icon: "cube" },
          { label: "Webhooks", description: "Signed payloads with automatic retries", href: "#", icon: "plug" },
        ],
      },
      {
        title: "Community",
        items: [
          { label: "Forum", description: "12,400 builders sharing recipes", href: "#", icon: "users" },
          { label: "Guides", description: "Patterns from production teams", href: "#", icon: "book" },
        ],
      },
    ],
    featured: {
      eyebrow: "Open source",
      title: "lumen-js passed 9,000 stars",
      description: "The tracking SDK is MIT licensed and tree-shakes to 3.1 kB.",
      href: "#",
      cta: "View on GitHub",
    },
  },
  { id: "pricing", label: "Pricing", href: "#" },
  { id: "customers", label: "Customers", href: "#" },
];

export function NavMegaMenu({
  brand = "Lumen",
  menus = defaultMenus,
  signIn = { label: "Sign in", href: "#" },
  cta = { label: "Start free", href: "#" },
  accent = "#8b5cf6",
  openId,
  defaultOpenId = null,
  onOpenChange,
  hoverDelay = 120,
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavMegaMenuProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState<string | null>(defaultOpenId);
  const current = openId !== undefined ? openId : inner;
  const rootRef = React.useRef<HTMLElement>(null);
  const tops = React.useRef<(HTMLElement | null)[]>([]);
  const openTimer = React.useRef<number | undefined>(undefined);
  const closeTimer = React.useRef<number | undefined>(undefined);
  const mega = menus.filter((m) => m.columns && m.columns.length);
  const active = mega.find((m) => m.id === current) ?? null;

  const setOpen = React.useCallback(
    (id: string | null) => {
      if (openId === undefined) setInner(id);
      onOpenChange?.(id);
    },
    [openId, onOpenChange],
  );

  React.useEffect(
    () => () => {
      window.clearTimeout(openTimer.current);
      window.clearTimeout(closeTimer.current);
    },
    [],
  );

  React.useEffect(() => {
    if (!active) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [active, setOpen]);

  function clearTimers() {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  }

  function hoverTop(e: React.PointerEvent, id: string | null) {
    if (e.pointerType !== "mouse") return;
    clearTimers();
    if (id === null) {
      if (active) closeTimer.current = window.setTimeout(() => setOpen(null), hoverDelay + 80);
      return;
    }
    if (active) setOpen(id);
    else openTimer.current = window.setTimeout(() => setOpen(id), hoverDelay);
  }

  function leaveRoot(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(null), hoverDelay + 100);
  }

  function items(id: string) {
    const panel = document.getElementById(`${uid}-${id}`);
    return panel ? Array.from(panel.querySelectorAll<HTMLElement>("[data-hb-ke1-item]")) : [];
  }

  function focusTop(index: number) {
    const list = tops.current.filter((n): n is HTMLElement => Boolean(n));
    if (!list.length) return;
    list[(index + list.length) % list.length].focus();
  }

  function onTopKey(e: React.KeyboardEvent, index: number, entry: NavMegaMenuEntry) {
    const hasMenu = Boolean(entry.columns && entry.columns.length);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusTop(index + 1);
      if (active && hasMenu) setOpen(null);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusTop(index - 1);
      if (active && hasMenu) setOpen(null);
    } else if (e.key === "ArrowDown" && hasMenu) {
      e.preventDefault();
      setOpen(entry.id);
      window.requestAnimationFrame(() => items(entry.id)[0]?.focus());
    } else if (e.key === "Escape") {
      setOpen(null);
    }
  }

  function onPanelKey(e: React.KeyboardEvent) {
    if (!active) return;
    const list = items(active.id);
    const at = list.indexOf(document.activeElement as HTMLElement);
    if (e.key === "Escape") {
      e.preventDefault();
      const index = menus.findIndex((m) => m.id === active.id);
      setOpen(null);
      tops.current[index]?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      list[(at + 1) % list.length]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      if (at <= 0) {
        const index = menus.findIndex((m) => m.id === active.id);
        tops.current[index]?.focus();
      } else list[at - 1]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      list[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      list[list.length - 1]?.focus();
    }
  }

  function onBlur(e: React.FocusEvent) {
    const next = e.relatedTarget as Node | null;
    if (active && next && rootRef.current && !rootRef.current.contains(next)) setOpen(null);
  }

  const arrow = (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );

  return (
    <header
      ref={rootRef}
      className={`hb-ke1 ${className}`}
      style={{ "--hb-ke1-accent": accent, ...style } as React.CSSProperties}
      onPointerLeave={leaveRoot}
      onPointerEnter={() => window.clearTimeout(closeTimer.current)}
      onBlur={onBlur}
      {...rest}
    >
      <style href="hb-nav-mega-menu" precedence="default">
        {css}
      </style>
      <div className="hb-ke1-bar">
        <div className="hb-ke1-row">
          <a href="#" className="hb-ke1-brand" aria-label={`${brand} home`}>
            <span className="hb-ke1-mark" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M4 3v10h8" />
                <path d="M8 3v6h4" />
              </svg>
            </span>
            {brand}
          </a>
          <ul className="hb-ke1-nav" aria-label="Main">
            {menus.map((entry, i) => {
              const hasMenu = Boolean(entry.columns && entry.columns.length);
              const open = current === entry.id && hasMenu;
              return (
                <li key={entry.id}>
                  {hasMenu ? (
                    <button
                      type="button"
                      ref={(n) => {
                        tops.current[i] = n;
                      }}
                      className="hb-ke1-top"
                      aria-expanded={open}
                      aria-controls={`${uid}-${entry.id}`}
                      onClick={() => setOpen(open ? null : entry.id)}
                      onPointerEnter={(e) => hoverTop(e, entry.id)}
                      onKeyDown={(e) => onTopKey(e, i, entry)}
                    >
                      {entry.label}
                      <svg viewBox="0 0 12 12" aria-hidden="true">
                        <path d="m3 4.5 3 3 3-3" />
                      </svg>
                    </button>
                  ) : (
                    <a
                      ref={(n) => {
                        tops.current[i] = n;
                      }}
                      href={entry.href ?? "#"}
                      className="hb-ke1-top"
                      onPointerEnter={(e) => hoverTop(e, null)}
                      onKeyDown={(e) => onTopKey(e, i, entry)}
                    >
                      {entry.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="hb-ke1-end">
            {signIn && (
              <a href={signIn.href} className="hb-ke1-ghost">
                {signIn.label}
              </a>
            )}
            {cta && (
              <a href={cta.href} className="hb-ke1-cta">
                {cta.label}
                {arrow}
              </a>
            )}
          </div>
        </div>
        <div className="hb-ke1-panel" data-open={active ? "true" : "false"} onKeyDown={onPanelKey}>
          <div className="hb-ke1-card">
            <div className="hb-ke1-sheets">
              {mega.map((entry) => {
                const on = active?.id === entry.id;
                let n = 0;
                return (
                  <div key={entry.id} id={`${uid}-${entry.id}`} data-on={on ? "true" : "false"} aria-label={entry.label} role="region">
                    <div className="hb-ke1-sheet" data-on={on ? "true" : "false"}>
                      {entry.columns!.map((col) => (
                        <div key={col.title} className="hb-ke1-col">
                          <p className="hb-ke1-colt">{col.title}</p>
                          <ul className="hb-ke1-list">
                            {col.items.map((item) => {
                              const i = n++;
                              return (
                                <li key={item.label}>
                                  <a
                                    href={item.href}
                                    className="hb-ke1-item"
                                    data-hb-ke1-item=""
                                    style={{ "--hb-ke1-i": i } as React.CSSProperties}
                                    onClick={() => setOpen(null)}
                                  >
                                    {item.icon && (
                                      <span className="hb-ke1-ico">
                                        <Icon name={item.icon} />
                                      </span>
                                    )}
                                    <span className="hb-ke1-txt">
                                      <span className="hb-ke1-lab">
                                        {item.label}
                                        {item.badge && <span className="hb-ke1-badge">{item.badge}</span>}
                                      </span>
                                      {item.description && <span className="hb-ke1-desc">{item.description}</span>}
                                    </span>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                      {entry.featured && (
                        <a href={entry.featured.href} className="hb-ke1-feat" data-hb-ke1-item="" onClick={() => setOpen(null)}>
                          <span className="hb-ke1-chip">
                            <i />
                            {entry.featured.eyebrow}
                          </span>
                          <p className="hb-ke1-ft">{entry.featured.title}</p>
                          <p className="hb-ke1-fd">{entry.featured.description}</p>
                          <span className="hb-ke1-fl">
                            {entry.featured.cta}
                            {arrow}
                          </span>
                        </a>
                      )}
                    </div>
                    {on && entry.footer && entry.footer.length > 0 && (
                      <div className="hb-ke1-foot">
                        <span>Also in {entry.label}</span>
                        {entry.footer.map((link) => (
                          <a key={link.label} href={link.href} data-hb-ke1-item="">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {showBackdrop && (
        <div className="hb-ke1-stage" aria-hidden="true">
          <div className="hb-ke1-hero">
            <span className="hb-ke1-pill">Trusted by 4,200 product teams</span>
            <p className="hb-ke1-h">Product analytics that answers back</p>
            <p className="hb-ke1-s">Ask a question about your users and get a chart, a cohort and the next experiment to run.</p>
          </div>
          <div className="hb-ke1-frame" />
        </div>
      )}
    </header>
  );
}
