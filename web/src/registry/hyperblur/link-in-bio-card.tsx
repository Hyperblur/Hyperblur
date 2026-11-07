"use client";

import * as React from "react";

export type LinkInBioIcon = "menu" | "delivery" | "location" | "chat" | "camera" | "reviews" | "link";

export interface LinkInBioLink {
  id: string;
  label: string;
  href: string;
  icon?: LinkInBioIcon;
  hint?: string;
}

export interface LinkInBioContact {
  name: string;
  phone?: string;
  email?: string;
  url?: string;
  street?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
}

export interface LinkInBioStatus {
  tone: "open" | "closing" | "closed";
  label: string;
}

export interface LinkInBioLabels {
  share: string;
  copied: string;
  showQr: string;
  hideQr: string;
  qrCaption: string;
  saveContact: string;
  verified: string;
  footer: string;
}

export interface LinkInBioCardProps extends React.HTMLAttributes<HTMLElement> {
  name?: string;
  handle?: string;
  initials?: string;
  verified?: boolean;
  status?: LinkInBioStatus | null;
  bio?: string;
  primary?: { label: string; href: string } | null;
  links?: LinkInBioLink[];
  contact?: LinkInBioContact | null;
  shareUrl?: string;
  shareTitle?: string;
  appearance?: "light" | "dark";
  accent?: string;
  labels?: Partial<LinkInBioLabels>;
  onShare?: (method: "native" | "copy") => void;
  onLinkClick?: (link: LinkInBioLink) => void;
}

const defaultLabels: LinkInBioLabels = {
  share: "Share",
  copied: "Link copied",
  showQr: "Show QR code",
  hideQr: "Hide QR code",
  qrCaption: "Scan to open this page on another phone",
  saveContact: "Save contact",
  verified: "Verified business",
  footer: "Made with care in Brooklyn",
};

const defaultLinks: LinkInBioLink[] = [
  { id: "menu", label: "See the full menu", href: "https://cornerkitchen.example/menu", icon: "menu", hint: "Burgers, bowls, shakes" },
  { id: "delivery", label: "Delivery in 25 min", href: "https://cornerkitchen.example/order?mode=delivery", icon: "delivery", hint: "Free over $30" },
  { id: "location", label: "418 Maple Avenue", href: "https://www.google.com/maps/search/?api=1&query=418%20Maple%20Avenue%20Brooklyn", icon: "location", hint: "Park Slope, Brooklyn" },
  { id: "chat", label: "Order on chat", href: "https://wa.me/17185550142?text=Hi%2C%20I%27d%20like%20to%20order", icon: "chat", hint: "Replies in minutes" },
  { id: "photos", label: "Follow our kitchen", href: "https://cornerkitchen.example/photos", icon: "camera", hint: "@cornerkitchen" },
  { id: "reviews", label: "Read 1,284 reviews", href: "https://cornerkitchen.example/reviews", icon: "reviews", hint: "4.6 average" },
];

const defaultContact: LinkInBioContact = {
  name: "Corner Kitchen",
  phone: "+1 718 555 0142",
  email: "hello@cornerkitchen.example",
  url: "https://cornerkitchen.example",
  street: "418 Maple Avenue",
  city: "Brooklyn",
  region: "NY",
  postalCode: "11215",
  country: "USA",
};

function vEscape(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function buildVCard(contact: LinkInBioContact): string {
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${vEscape(contact.name)}`, `ORG:${vEscape(contact.name)}`];
  if (contact.phone) lines.push(`TEL;TYPE=WORK,VOICE:${vEscape(contact.phone)}`);
  if (contact.email) lines.push(`EMAIL;TYPE=INTERNET:${vEscape(contact.email)}`);
  if (contact.url) lines.push(`URL:${vEscape(contact.url)}`);
  if (contact.street || contact.city) {
    const parts = ["", "", contact.street, contact.city, contact.region, contact.postalCode, contact.country].map((p) => vEscape(p ?? ""));
    lines.push(`ADR;TYPE=WORK:${parts.join(";")}`);
  }
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

function hash(n: number): number {
  let x = (n * 374761393 + 668265263) | 0;
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

function seedOf(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

function PatternQr({ value }: { value: string }) {
  const n = 25;
  const seed = seedOf(value);
  const eye = (x: number, y: number) => (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
  let d = "";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (eye(x, y)) continue;
      if (hash(seed % 100000 + y * n + x) > 0.52) d += `M${x + 2} ${y + 2}h1v1h-1z`;
    }
  }
  const eyes = [
    [2, 2],
    [n - 5, 2],
    [2, n - 5],
  ];
  return (
    <svg viewBox={`0 0 ${n + 4} ${n + 4}`} shapeRendering="crispEdges" aria-hidden="true">
      <rect width={n + 4} height={n + 4} fill="#ffffff" />
      <path d={d} fill="#111111" />
      {eyes.map(([x, y]) => (
        <g key={`${x}-${y}`} fill="#111111">
          <path fillRule="evenodd" d={`M${x} ${y}h7v7h-7z M${x + 1} ${y + 1}v5h5v-5z`} />
          <rect x={x + 2} y={y + 2} width="3" height="3" />
        </g>
      ))}
    </svg>
  );
}

function LinkIcon({ icon }: { icon: LinkInBioIcon }) {
  const p = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (icon) {
    case "menu":
      return (
        <svg {...p}>
          <path d="M6 3h12v18H6z" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case "delivery":
      return (
        <svg {...p}>
          <circle cx="6.5" cy="17" r="2.5" />
          <circle cx="17.5" cy="17" r="2.5" />
          <path d="M9 17h6l-2-7H9M15 6h3l2 6M4 13h6" />
        </svg>
      );
    case "location":
      return (
        <svg {...p}>
          <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      );
    case "chat":
      return (
        <svg {...p}>
          <path d="M4 20l1.4-4A8 8 0 1 1 8.5 19z" />
          <path d="M9.5 9.5c.3 2 2 4 4.5 4.6l1-1.1 1.8.8" />
        </svg>
      );
    case "camera":
      return (
        <svg {...p}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="0.6" fill="currentColor" />
        </svg>
      );
    case "reviews":
      return (
        <svg {...p}>
          <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8L3.6 9.6l5.8-.8z" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
          <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
        </svg>
      );
  }
}

const css = `
.hb-od4 {
  --hb-od4-accent: #ff5a36;
  --hb-od4-page: #efebe3;
  --hb-od4-card: #ffffff;
  --hb-od4-line: rgba(20, 20, 20, 0.09);
  --hb-od4-row: #f7f5f0;
  --hb-od4-rowhover: #f0ede6;
  --hb-od4-text: #151515;
  --hb-od4-muted: #6f6b64;
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 56px 16px 64px;
  background:
    radial-gradient(40% 50% at 18% 12%, color-mix(in srgb, var(--hb-od4-accent) 22%, transparent), transparent 70%),
    radial-gradient(36% 40% at 84% 78%, color-mix(in srgb, #ffb341 26%, transparent), transparent 70%),
    var(--hb-od4-page);
  color: var(--hb-od4-text);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.45;
}
.hb-od4[data-appearance="dark"] {
  --hb-od4-page: #0a0a0a;
  --hb-od4-card: #121212;
  --hb-od4-line: rgba(255, 255, 255, 0.08);
  --hb-od4-row: #181818;
  --hb-od4-rowhover: #1f1f1f;
  --hb-od4-text: #ededed;
  --hb-od4-muted: #9a9a9a;
}
.hb-od4 *, .hb-od4 *::before, .hb-od4 *::after { box-sizing: border-box; }
.hb-od4::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(color-mix(in srgb, var(--hb-od4-text) 10%, transparent) 1px, transparent 1.2px);
  background-size: 18px 18px;
  mask-image: radial-gradient(70% 60% at 50% 40%, #000, transparent);
  -webkit-mask-image: radial-gradient(70% 60% at 50% 40%, #000, transparent);
  pointer-events: none;
}
.hb-od4-phone {
  position: relative;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid var(--hb-od4-line);
  border-radius: 30px;
  background: var(--hb-od4-card);
  box-shadow: 0 40px 80px -40px rgba(30, 20, 10, 0.45), 0 1px 0 rgba(255, 255, 255, 0.5) inset;
  animation: hb-od4-rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-od4-cover { position: relative; height: 132px; overflow: hidden; }
.hb-od4-cover > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.hb-od4-steam { animation: hb-od4-steam 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
.hb-od4-steam:nth-of-type(2) { animation-delay: 0.9s; }
.hb-od4-steam:nth-of-type(3) { animation-delay: 1.8s; }
.hb-od4-tools {
  position: absolute;
  inset: 12px 12px auto 12px;
  display: flex;
  justify-content: space-between;
}
.hb-od4-tool {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  min-width: 34px;
  justify-content: center;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  background: rgba(20, 12, 8, 0.32);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #ffffff;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.12s ease;
}
.hb-od4-tool:hover { background: rgba(20, 12, 8, 0.5); }
.hb-od4-tool:active { transform: scale(0.95); }
.hb-od4-tool[aria-pressed="true"] { background: #ffffff; color: #151515; }
.hb-od4-head { position: relative; padding: 0 22px; text-align: center; }
.hb-od4-avatar {
  position: relative;
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  margin: -44px auto 0;
  border: 4px solid var(--hb-od4-card);
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, #ffd27a, #ff8a3d 55%, #d9381e);
  color: #ffffff;
  font-family: var(--font-grotesk, inherit);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  box-shadow: 0 10px 24px -10px rgba(217, 56, 30, 0.6);
}
.hb-od4-name {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 12px 0 0;
  font-family: var(--font-grotesk, inherit);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
}
.hb-od4-tick { flex: none; color: var(--hb-od4-accent); }
.hb-od4-handle { margin: 2px 0 0; color: var(--hb-od4-muted); font-size: 13px; }
.hb-od4-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 10px;
  padding: 4px 10px 4px 8px;
  border: 1px solid var(--hb-od4-line);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}
.hb-od4-dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: #16a34a; }
.hb-od4-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: inherit;
  animation: hb-od4-pulse 2s ease-out infinite;
}
.hb-od4-status[data-tone="closing"] .hb-od4-dot { background: #f59e0b; }
.hb-od4-status[data-tone="closed"] .hb-od4-dot { background: #dc2626; }
.hb-od4-status[data-tone="closed"] .hb-od4-dot::after { animation: none; }
.hb-od4-bio { margin: 12px auto 0; max-width: 32ch; color: var(--hb-od4-muted); font-size: 13.5px; }
.hb-od4-body { display: flex; flex-direction: column; gap: 10px; padding: 18px 18px 20px; }
.hb-od4-primary {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 50px;
  overflow: hidden;
  border-radius: 16px;
  background: var(--hb-od4-accent);
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 12px 24px -12px var(--hb-od4-accent);
  transition: transform 0.15s ease, filter 0.2s ease;
}
.hb-od4-primary::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.35) 50%, transparent 70%);
  transform: translateX(-100%);
  animation: hb-od4-shine 3.6s 1s ease-in-out infinite;
}
.hb-od4-primary:hover { filter: brightness(1.06); }
.hb-od4-primary:active { transform: scale(0.98); }
.hb-od4-qrwrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-od4-qrwrap[data-open="true"] { grid-template-rows: 1fr; }
.hb-od4-qrin { min-height: 0; overflow: hidden; }
.hb-od4-qr {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border: 1px dashed var(--hb-od4-line);
  border-radius: 16px;
}
.hb-od4-qr svg { flex: none; width: 92px; height: 92px; border-radius: 8px; box-shadow: 0 0 0 1px var(--hb-od4-line); }
.hb-od4-qr p { margin: 0; color: var(--hb-od4-muted); font-size: 12.5px; }
.hb-od4-qr b { display: block; margin-bottom: 4px; color: var(--hb-od4-text); font-size: 13px; word-break: break-all; }
.hb-od4-links { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-od4-link {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 54px;
  padding: 8px 12px 8px 8px;
  border: 1px solid var(--hb-od4-line);
  border-radius: 16px;
  background: var(--hb-od4-row);
  color: inherit;
  text-decoration: none;
  animation: hb-od4-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--hb-od4-i) * 60ms + 250ms);
  transition: background 0.18s ease, transform 0.18s ease, border-color 0.18s ease;
}
.hb-od4-link:hover { background: var(--hb-od4-rowhover); transform: translateY(-1px); border-color: color-mix(in srgb, var(--hb-od4-accent) 30%, transparent); }
.hb-od4-ic {
  display: grid;
  flex: none;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--hb-od4-accent) 12%, var(--hb-od4-card));
  color: var(--hb-od4-accent);
}
.hb-od4-lt { display: flex; min-width: 0; flex: 1; flex-direction: column; }
.hb-od4-lt b { overflow: hidden; font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-od4-lt span { overflow: hidden; color: var(--hb-od4-muted); font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-od4-chev { flex: none; color: var(--hb-od4-muted); transition: transform 0.18s ease; }
.hb-od4-link:hover .hb-od4-chev { transform: translateX(3px); color: var(--hb-od4-accent); }
.hb-od4-save {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  margin-top: 4px;
  border: 1px solid var(--hb-od4-line);
  border-radius: 14px;
  background: transparent;
  color: var(--hb-od4-text);
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s ease;
}
.hb-od4-save:hover { background: var(--hb-od4-row); }
.hb-od4-foot { margin: 4px 0 0; color: var(--hb-od4-muted); font-size: 11.5px; text-align: center; }
.hb-od4-tool:focus-visible, .hb-od4-primary:focus-visible, .hb-od4-link:focus-visible, .hb-od4-save:focus-visible {
  outline: 2px solid var(--hb-od4-accent);
  outline-offset: 2px;
}
.hb-od4-toast {
  position: absolute;
  left: 50%;
  top: 56px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #151515;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  transform: translate(-50%, -6px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.hb-od4-toast[data-show="true"] { opacity: 1; transform: translate(-50%, 0); }
@container (min-width: 700px) {
  .hb-od4 { padding: 80px 24px 96px; }
}
@keyframes hb-od4-rise {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes hb-od4-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes hb-od4-pulse {
  0% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 0; transform: scale(2.6); }
}
@keyframes hb-od4-shine {
  0%, 60% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes hb-od4-steam {
  0%, 100% { opacity: 0; transform: translateY(4px) scaleY(0.8); }
  40% { opacity: 0.8; }
  70% { opacity: 0.2; transform: translateY(-8px) scaleY(1.1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-od4-phone, .hb-od4-link, .hb-od4-primary::after, .hb-od4-dot::after, .hb-od4-steam { animation: none; }
  .hb-od4-qrwrap, .hb-od4-link, .hb-od4-chev, .hb-od4-tool, .hb-od4-toast, .hb-od4-primary { transition: none; }
}
`;

function CoverArt() {
  return (
    <svg viewBox="0 0 420 132" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="hb-od4-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff7a3d" />
          <stop offset="0.55" stopColor="#e8452a" />
          <stop offset="1" stopColor="#8f1f1a" />
        </linearGradient>
        <linearGradient id="hb-od4-bun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc46b" />
          <stop offset="1" stopColor="#e08a2c" />
        </linearGradient>
        <radialGradient id="hb-od4-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd98a" stopOpacity="0.65" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="420" height="132" fill="url(#hb-od4-sky)" />
      <circle cx="300" cy="70" r="110" fill="url(#hb-od4-sun)" />
      <g fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2">
        <circle cx="300" cy="78" r="64" />
        <circle cx="300" cy="78" r="88" />
        <circle cx="300" cy="78" r="112" />
      </g>
      <g opacity="0.22" fill="#ffffff">
        {Array.from({ length: 18 }, (_, i) => (
          <rect key={i} x={(20 + ((i * 53) % 220)).toFixed(0)} y={(16 + ((i * 37) % 100)).toFixed(0)} width="7" height="2.4" rx="1.2" transform={`rotate(${(i * 47) % 180} ${(23 + ((i * 53) % 220)).toFixed(0)} ${(17 + ((i * 37) % 100)).toFixed(0)})`} />
        ))}
      </g>
      <g stroke="rgba(255,255,255,0.7)" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path className="hb-od4-steam" d="M282 30c-5-6 5-10 0-17" />
        <path className="hb-od4-steam" d="M300 26c-5-6 5-10 0-17" />
        <path className="hb-od4-steam" d="M318 30c-5-6 5-10 0-17" />
      </g>
      <g transform="translate(246 40)">
        <ellipse cx="54" cy="84" rx="62" ry="8" fill="rgba(60,10,5,0.35)" />
        <path d="M6 42c0-24 22-40 48-40s48 16 48 40z" fill="url(#hb-od4-bun)" />
        <g fill="#fff3d6">
          <ellipse cx="34" cy="20" rx="3" ry="1.6" transform="rotate(-20 34 20)" />
          <ellipse cx="54" cy="13" rx="3" ry="1.6" />
          <ellipse cx="74" cy="20" rx="3" ry="1.6" transform="rotate(20 74 20)" />
          <ellipse cx="44" cy="30" rx="3" ry="1.6" transform="rotate(-10 44 30)" />
          <ellipse cx="66" cy="31" rx="3" ry="1.6" transform="rotate(12 66 31)" />
        </g>
        <path d="M2 46c8-6 14 4 22-2s14 4 22-2 14 4 22-2 14 4 22-2 10 2 18-2v6H2z" fill="#5fbf4a" />
        <path d="M6 52h96l-14 12-6-6-8 9-8-9z" fill="#ffcc33" />
        <rect x="4" y="54" width="100" height="14" rx="7" fill="#5a2a16" />
        <path d="M6 72h96c0 8-8 12-16 12H22c-8 0-16-4-16-12z" fill="url(#hb-od4-bun)" />
      </g>
    </svg>
  );
}

export function LinkInBioCard({
  name = "Corner Kitchen",
  handle = "@cornerkitchen",
  initials,
  verified = true,
  status = { tone: "open", label: "Open now · until 10 pm" },
  bio = "Smash burgers, crispy fries and thick shakes on Maple Avenue since 2016. Pickup, delivery and late-night bites.",
  primary = { label: "Order now", href: "https://cornerkitchen.example/order" },
  links = defaultLinks,
  contact = defaultContact,
  shareUrl = "https://cornerkitchen.example/links",
  shareTitle,
  appearance = "light",
  accent = "#ff5a36",
  labels,
  onShare,
  onLinkClick,
  className = "",
  style,
  ...rest
}: LinkInBioCardProps) {
  const l = { ...defaultLabels, ...labels };
  const [qr, setQr] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const qrId = React.useId();
  const mono = initials ?? name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join("");

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const flash = () => {
    setToast(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(false), 1800);
  };

  const share = async () => {
    const data = { title: shareTitle ?? name, url: shareUrl };
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share(data);
        onShare?.("native");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      onShare?.("copy");
      flash();
    } catch {
      setToast(false);
    }
  };

  const saveContact = () => {
    if (!contact) return;
    const href = `data:text/vcard;charset=utf-8,${encodeURIComponent(buildVCard(contact))}`;
    const a = document.createElement("a");
    a.href = href;
    a.download = `${contact.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "contact"}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section
      className={`hb-od4 ${className}`}
      data-appearance={appearance}
      style={{ "--hb-od4-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-link-in-bio-card" precedence="default">{css}</style>
      <div className="hb-od4-phone">
        <div className="hb-od4-cover">
          <CoverArt />
          <div className="hb-od4-tools">
            <button
              type="button"
              className="hb-od4-tool"
              aria-pressed={qr}
              aria-controls={qrId}
              aria-label={qr ? l.hideQr : l.showQr}
              onClick={() => setQr((v) => !v)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" />
              </svg>
            </button>
            <button type="button" className="hb-od4-tool" onClick={share}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
              </svg>
              {l.share}
            </button>
          </div>
          <span className="hb-od4-toast" data-show={toast} role="status" aria-live="polite">
            {toast ? l.copied : ""}
          </span>
        </div>
        <div className="hb-od4-head">
          <div className="hb-od4-avatar" aria-hidden="true">{mono}</div>
          <h2 className="hb-od4-name">
            {name}
            {verified ? (
              <svg className="hb-od4-tick" width="20" height="20" viewBox="0 0 24 24" role="img" aria-label={l.verified}>
                <path
                  fill="currentColor"
                  d="M12 1.8l2.5 1.9 3.1-.2.9 3 2.6 1.8-1 3 1 3-2.6 1.8-.9 3-3.1-.2L12 22.2l-2.5-1.9-3.1.2-.9-3-2.6-1.8 1-3-1-3 2.6-1.8.9-3 3.1.2z"
                />
                <path d="M8 12.2l2.7 2.6L16.2 9.4" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </h2>
          {handle ? <p className="hb-od4-handle">{handle}</p> : null}
          {status ? (
            <span className="hb-od4-status" data-tone={status.tone}>
              <span className="hb-od4-dot" aria-hidden="true" />
              {status.label}
            </span>
          ) : null}
          {bio ? <p className="hb-od4-bio">{bio}</p> : null}
        </div>
        <div className="hb-od4-body">
          {primary ? (
            <a className="hb-od4-primary" href={primary.href}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 8h14l-1 12H6L5 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {primary.label}
            </a>
          ) : null}
          <div className="hb-od4-qrwrap" data-open={qr} id={qrId} aria-hidden={!qr}>
            <div className="hb-od4-qrin">
              <div className="hb-od4-qr">
                <PatternQr value={shareUrl} />
                <p>
                  <b>{shareUrl.replace(/^https?:[/][/]/, "")}</b>
                  {l.qrCaption}
                </p>
              </div>
            </div>
          </div>
          <ul className="hb-od4-links">
            {links.map((link, i) => (
              <li key={link.id}>
                <a
                  className="hb-od4-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--hb-od4-i": i } as React.CSSProperties}
                  onClick={() => onLinkClick?.(link)}
                >
                  <span className="hb-od4-ic">
                    <LinkIcon icon={link.icon ?? "link"} />
                  </span>
                  <span className="hb-od4-lt">
                    <b>{link.label}</b>
                    {link.hint ? <span>{link.hint}</span> : null}
                  </span>
                  <svg className="hb-od4-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          {contact ? (
            <button type="button" className="hb-od4-save" onClick={saveContact}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="10" cy="8" r="4" />
                <path d="M3 20c0-3.5 3-6 7-6 1.4 0 2.6.3 3.6.8M18 14v6M15 17h6" />
              </svg>
              {l.saveContact}
            </button>
          ) : null}
          {l.footer ? <p className="hb-od4-foot">{l.footer}</p> : null}
        </div>
      </div>
    </section>
  );
}
