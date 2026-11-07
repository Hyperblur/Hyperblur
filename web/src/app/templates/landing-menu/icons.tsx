import type { ReactNode } from "react";
import type { Diet } from "./data";

export function Ico({ children, size = 18, stroke = 1.8 }: { children: ReactNode; size?: number; stroke?: number }) {
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
  down: <path d="M12 5v14M6 13l6 6 6-6" />,
  phone: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  minus: <path d="M6 12h12" />,
  plus: <path d="M12 6v12M6 12h12" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5v.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <path d="M15.5 5.2a3 3 0 0 1 0 5.6M17.5 14.4c1.6.7 2.7 2.3 3 4.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  train: (
    <>
      <rect x="6" y="3.5" width="12" height="13" rx="3" />
      <path d="M6 11h12M9 20l-1.5 1.5M15 20l1.5 1.5M9 14h.01M15 14h.01" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="16" r="3.5" />
      <circle cx="18" cy="16" r="3.5" />
      <path d="M6 16l4-7h5l3 7M10 9l2 7h-6M13 6h3" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7h.01" />
    </>
  ),
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 10 10.5 5 20 4c-.5 9.5-5.5 15-15 15z" />
      <path d="M5 19l8-8" />
    </>
  ),
};

const dietPaths: Record<Diet, ReactNode> = {
  vegan: (
    <>
      <path d="M4 14c0-5 3.5-8.5 10-9-.3 6.5-3.8 10-9 10" />
      <path d="M4 20c2-4 5-7 8-9" />
    </>
  ),
  vegetarian: (
    <>
      <path d="M12 21c-4-1-7-4.5-7-9 3 0 5.5 1.5 7 4 1.5-2.5 4-4 7-4 0 4.5-3 8-7 9z" />
      <path d="M12 16V8M12 8c0-2 1-3.5 3-4.5" />
    </>
  ),
  "gluten-free": (
    <>
      <path d="M12 21V8" />
      <path d="M12 12c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4zM12 12c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4zM12 8c-1.5-1-2-2.5-1.5-4.5 1.5 1 2 2.5 1.5 4.5z" />
      <path d="M4 4l16 16" />
    </>
  ),
  "dairy-free": (
    <>
      <path d="M9 3h6M9.5 3v3L7 10v10h10V10l-2.5-4V3" />
      <path d="M4 4l16 16" />
    </>
  ),
  spicy: (
    <>
      <path d="M7 9c-1.5 6 2 11 11 11-3-2-5-6-5-11" />
      <path d="M7 9c2-1.5 4.5-1.5 6 0M10 7.5c0-2 1-3.5 3-4" />
    </>
  ),
};

export function DietIcon({ diet, size = 13 }: { diet: Diet; size?: number }) {
  return (
    <Ico size={size} stroke={1.9}>
      {dietPaths[diet]}
    </Ico>
  );
}

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#1f4d3a" />
      <path d="M9 22c0-7.5 4.5-12 14-13-.5 9-5 13.5-12.5 13.5" fill="#9fc79a" />
      <path d="M9 23.5l8.5-8.5" stroke="#f6f1e7" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="22.5" cy="21.5" r="2.6" fill="#d9482b" />
    </svg>
  );
}
