import type { ReactNode } from "react";

export function Ico({ children, size = 20, stroke = 1.7 }: { children: ReactNode; size?: number; stroke?: number }) {
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
    >
      {children}
    </svg>
  );
}

export const icons = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  phone: (
    <path d="M5 4h3.2l1.6 4-2.1 1.3a11 11 0 0 0 5 5l1.3-2.1 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6l7-3Z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  tooth: (
    <path d="M7.5 3.5c1.6 0 2.6.9 4.5.9s2.9-.9 4.5-.9c2.6 0 4 2.2 4 4.8 0 2.4-1 3.9-1.6 6.1-.6 2.3-.9 6.1-2.7 6.1-1.6 0-1.5-4.6-4.2-4.6s-2.6 4.6-4.2 4.6c-1.8 0-2.1-3.8-2.7-6.1C4 12.2 3.5 10.7 3.5 8.3c0-2.6 1.4-4.8 4-4.8Z" />
  ),
  sparkle: (
    <>
      <path d="M12 3.5l1.7 4.8 4.8 1.7-4.8 1.7L12 16.5l-1.7-4.8L5.5 10l4.8-1.7L12 3.5Z" />
      <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
    </>
  ),
  aligner: (
    <>
      <path d="M3.5 9c2.5-3 14.5-3 17 0-.6 4.8-3.8 8-8.5 8S4.1 13.8 3.5 9Z" />
      <path d="M8 8.2v4.6M12 7.6v5.6M16 8.2v4.6" />
    </>
  ),
  implant: (
    <>
      <path d="M7 3.5h10c1.2 0 1.8 1 1.5 2.1L17.4 9H6.6L5.5 5.6C5.2 4.5 5.8 3.5 7 3.5Z" />
      <path d="M8 11.5h8M8.6 14h6.8M9.2 16.5h5.6M10 19h4l-.7 2h-2.6L10 19Z" />
    </>
  ),
  kids: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.6 14.2a4.2 4.2 0 0 0 6.8 0M9 9.6h.01M15 9.6h.01" />
    </>
  ),
  bolt: <path d="M13 2.5L5 13.5h6l-1 8 8-11h-6l1-8Z" />,
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
  ),
  scan: (
    <>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <path d="M4 12h16" />
    </>
  ),
  chat: (
    <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 17h-7.5L7 20.5V17H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5Z" />
  ),
  cup: (
    <>
      <path d="M5 8.5h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-5Z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M8.5 3.5c-.6.9.6 1.6 0 2.5M12 3.5c-.6.9.6 1.6 0 2.5" />
    </>
  ),
  star: (
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5Z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.5 3.5 5.3 3.5 8.5s-1.1 6-3.5 8.5c-2.4-2.5-3.5-5.3-3.5-8.5S9.6 6 12 3.5Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.8 7.2h.01" />
    </>
  ),
  facebook: <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
    </>
  ),
};

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="hbl-cl-logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1fb5a6" />
          <stop offset="1" stopColor="#0f3b3a" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#hbl-cl-logo-g)" />
      <path
        d="M13.4 11c1.9 0 3.1 1 6.6 1s4.7-1 6.6-1c3.2 0 4.9 2.6 4.9 5.6 0 2.8-1.2 4.6-1.9 7.2-.7 2.7-1.1 6.2-3.2 6.2-1.9 0-1.8-4.4-6.4-4.4s-4.5 4.4-6.4 4.4c-2.1 0-2.5-3.5-3.2-6.2-.7-2.6-1.9-4.4-1.9-7.2 0-3 1.7-5.6 4.9-5.6Z"
        fill="#fbfdfc"
      />
      <path d="M15 17.2c2.8 1.6 7.2 1.6 10 0" stroke="#1fb5a6" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}
