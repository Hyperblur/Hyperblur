export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" stroke="#ece8df" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="6.5" ry="14.5" stroke="#ece8df" strokeWidth="1.5" />
      <path d="M1.5 16h29" stroke="#ece8df" strokeWidth="1.5" />
      <path d="M16 1.5c4.4 3.2 6.5 8.1 6.5 14.5H16V1.5z" fill="#ff4f2e" />
    </svg>
  );
}
