import type { ReactNode } from "react";

export function TempoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="#ff6b3d" />
      <rect x="0.5" y="0.5" width="27" height="27" rx="7.5" stroke="#fff" strokeOpacity="0.25" />
      <rect x="7" y="7.5" width="14" height="3" rx="1.5" fill="#1a0b05" />
      <rect x="10.5" y="12.5" width="10.5" height="3" rx="1.5" fill="#1a0b05" fillOpacity="0.75" />
      <rect x="7" y="17.5" width="7.5" height="3" rx="1.5" fill="#1a0b05" fillOpacity="0.5" />
      <circle cx="19.5" cy="19" r="2" fill="#ffd166" />
    </svg>
  );
}

export function Logo() {
  return (
    <>
      <TempoMark />
      <span className="hbl-pr-display text-[19px] tracking-[-0.03em]">Tempo</span>
    </>
  );
}

export function Icon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function ArrowRight() {
  return (
    <Icon>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  );
}

export function CheckMark() {
  return (
    <span className="hbl-pr-check" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.2l2.3 2.3 4.7-4.9" />
      </svg>
    </span>
  );
}
