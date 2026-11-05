import * as React from "react";

export function Ico({
  children,
  size = 18,
  stroke = 1.6,
  className,
}: {
  children: React.ReactNode;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export const icons = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  phone: (
    <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.5 5.7a2 2 0 0 1 2.1-2.2Z" />
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  scissors: (
    <>
      <circle cx="6.5" cy="17.5" r="2.8" />
      <circle cx="6.5" cy="6.5" r="2.8" />
      <path d="M8.6 8.4 20 18M8.6 15.6 20 6" />
    </>
  ),
  spark: <path d="M12 3.5 13.8 10l6.7 2-6.7 2L12 20.5 10.2 14l-6.7-2 6.7-2Z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  tiktok: <path d="M14 3.5v11a3.5 3.5 0 1 1-3.5-3.5M14 3.5c.5 2.6 2.4 4.3 5 4.5" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
};

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#3b1f2b" />
      <path
        d="M11 27c3-9 6-14 9-14s2.6 6 5.2 6S29 15 30 12"
        fill="none"
        stroke="#f4e4df"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M11 30.5c4-1.6 13-1.6 18 0" fill="none" stroke="#b88a4a" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="30" cy="12" r="1.8" fill="#d9577a" />
    </svg>
  );
}
