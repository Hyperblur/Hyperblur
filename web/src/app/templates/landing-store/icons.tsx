import type { ReactNode } from "react";

function Glyph({ children, size = 18, className = "" }: { children: ReactNode; size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#23352b" />
      <path d="M9 25V15.5a7 7 0 0 1 14 0V25" fill="none" stroke="#f3eee6" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.4" fill="#b86b4b" />
      <path d="M7 25h18" stroke="#a9b8a0" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <Glyph>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </Glyph>
  );
}

export function BagIcon() {
  return (
    <Glyph size={20}>
      <path d="M5 8h14l-1.1 11.2a2 2 0 0 1-2 1.8H8.1a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </Glyph>
  );
}

export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <Glyph size={size}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Glyph>
  );
}

export function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <Glyph size={size}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Glyph>
  );
}

export function PlusIcon({ size = 16 }: { size?: number }) {
  return (
    <Glyph size={size}>
      <path d="M12 5v14M5 12h14" />
    </Glyph>
  );
}

export function MinusIcon({ size = 16 }: { size?: number }) {
  return (
    <Glyph size={size}>
      <path d="M5 12h14" />
    </Glyph>
  );
}

export function CloseIcon({ size = 18 }: { size?: number }) {
  return (
    <Glyph size={size}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Glyph>
  );
}

export function ChevronIcon({ dir = "right" }: { dir?: "left" | "right" }) {
  return <Glyph>{dir === "right" ? <path d="m9 5 7 7-7 7" /> : <path d="m15 5-7 7 7 7" />}</Glyph>;
}

export function EyeIcon() {
  return (
    <Glyph size={16}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </Glyph>
  );
}

export function TruckIcon() {
  return (
    <Glyph size={22}>
      <path d="M3 6.5h11v9H3zM14 9.5h3.6l3.4 3.4v2.6h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </Glyph>
  );
}

export function ReturnIcon() {
  return (
    <Glyph size={22}>
      <path d="M9 7 5 11l4 4" />
      <path d="M5 11h9.5a4.5 4.5 0 0 1 0 9H11" />
    </Glyph>
  );
}

export function ShieldIcon() {
  return (
    <Glyph size={22}>
      <path d="M12 3.5 5 6v5.5c0 4.3 2.9 7.6 7 9 4.1-1.4 7-4.7 7-9V6l-7-2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </Glyph>
  );
}

export function GiftIcon() {
  return (
    <Glyph size={22}>
      <path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13" />
      <path d="M12 7c-1.5-3-5-3.5-5-1.2C7 7 9 7 12 7Zm0 0c1.5-3 5-3.5 5-1.2C17 7 15 7 12 7Z" />
    </Glyph>
  );
}

export function PinIcon() {
  return (
    <Glyph size={18}>
      <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </Glyph>
  );
}

export function PhoneIcon() {
  return (
    <Glyph size={16}>
      <path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </Glyph>
  );
}

export function LeafIcon() {
  return (
    <Glyph size={20}>
      <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
      <path d="M5 19 13 11" />
    </Glyph>
  );
}

export function InstagramIcon() {
  return (
    <Glyph>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </Glyph>
  );
}

export function PinterestIcon() {
  return (
    <Glyph>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.5 20.5 12.6 11M9.6 13.4c-1.4-3 .6-5.9 3.3-5.9 2.4 0 3.8 1.7 3.4 4-.4 2.3-1.8 3.6-3.2 3.3" />
    </Glyph>
  );
}

export function TikTokIcon() {
  return (
    <Glyph>
      <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 4c.4 2.6 2.2 4.3 5 4.5" />
    </Glyph>
  );
}
