type IconProps = { className?: string };

export function LogoMark({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" stroke="#c8ff3d" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="8.5" fill="none" stroke="#c8ff3d" strokeWidth="2" strokeDasharray="4 3" />
      <rect x="4" y="14.6" width="24" height="2.8" rx="1.4" fill="#f1f0e8" />
      <rect x="8" y="10.5" width="3" height="11" rx="1" fill="#f1f0e8" />
      <rect x="21" y="10.5" width="3" height="11" rx="1" fill="#f1f0e8" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 2.5 3.4 2.6c-.6 0-1 .5-1 1.1.3 5.3 4.6 9.6 9.9 9.9.6 0 1.1-.4 1.1-1l.1-2.1-2.6-1.1-1.3 1.3c-1.6-.7-2.9-2-3.6-3.6l1.3-1.3z" />
    </svg>
  );
}

export function PinIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 14.5s4.5-4.2 4.5-8a4.5 4.5 0 0 0-9 0c0 3.8 4.5 8 4.5 8z" />
      <circle cx="8" cy="6.5" r="1.6" />
    </svg>
  );
}

export function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.8V8l2.2 1.4" />
    </svg>
  );
}

export function CheckIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

export function StrengthIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 16h26" />
      <rect x="6" y="9" width="4" height="14" rx="1" />
      <rect x="22" y="9" width="4" height="14" rx="1" />
      <rect x="2.5" y="12" width="2.5" height="8" rx="1" />
      <rect x="27" y="12" width="2.5" height="8" rx="1" />
    </svg>
  );
}

export function HiitIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M18 3 7 18h8l-2 11 12-16h-8z" />
    </svg>
  );
}

export function MobilityIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="16" cy="6" r="2.6" />
      <path d="M5 13c4 1.5 7.5 2 11 2s7-.5 11-2" />
      <path d="M16 15v5l-5 8M16 20l5 8" />
    </svg>
  );
}

export function BoxingIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M9 21V11a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v5a5 5 0 0 1-5 5z" />
      <path d="M9 14H7a3 3 0 0 0 0 6h2" />
      <path d="M10 21h13v6H10z" />
      <path d="M15 11h6" />
    </svg>
  );
}

export function KidsIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <path d="m16 4 3.4 7 7.6 1.1-5.5 5.4 1.3 7.6L16 21.5l-6.8 3.6 1.3-7.6L5 12.1 12.6 11z" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="14" height="14" rx="4" />
      <circle cx="10" cy="10" r="3.2" />
      <circle cx="14.2" cy="5.8" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <rect x="2" y="4.5" width="16" height="11" rx="3.5" />
      <path d="m8.5 7.6 4 2.4-4 2.4z" fill="currentColor" />
    </svg>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="m3 5.5 7 5.5 7-5.5" />
    </svg>
  );
}
