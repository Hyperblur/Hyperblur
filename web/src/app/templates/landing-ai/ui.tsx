import type { ReactNode } from "react";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

export const icons = {
  check: "M5 12.5l4.5 4.5L19 7.5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  play: "M8 5.5v13l10.5-6.5z",
  inbox: "M3 13l3-8h12l3 8M3 13v6h18v-6M3 13h5l1.5 2.5h5L16 13h5",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5a7.5 7.5 0 0 1 15 0",
  shield: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6zM8.8 12.2l2.2 2.2 4.4-4.6",
  chat: "M5 5h14v10h-8l-4 4v-4H5z",
  mail: "M3 6h18v12H3zM3.5 7l8.5 6 8.5-6",
  ledger: "M4 4h16v16H4zM4 9h16M4 14h16M10 9v11",
  people: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18.5 14.5c1.9.9 3 2.9 3 5.5",
  database: "M12 4c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  bolt: "M13 3L5 14h6l-1 7 8-11h-6z",
  file: "M7 3h7l5 5v13H7zM14 3v5h5",
  lock: "M6 11h12v10H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18",
  x: "M6 6l12 12M18 6L6 18",
  laptop: "M5 5h14v10H5zM3 19h18",
  list: "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",
};

export function Icon({ d, className = "h-4 w-4", strokeWidth = 1.7 }: { d: string; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export function LogoMark({ id, size = 28 }: { id: string; size?: number }) {
  const g = `hbl-ai-logo-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" fill={`url(#${g})`} />
      <rect x="1.5" y="1.5" width="29" height="29" rx="8.5" fill="none" stroke="#ffffff" strokeOpacity="0.3" />
      <rect x="8" y="16" width="3.6" height="8" rx="1.8" fill="#ffffff" fillOpacity="0.65" />
      <rect x="14.2" y="11.5" width="3.6" height="12.5" rx="1.8" fill="#ffffff" fillOpacity="0.85" />
      <rect x="20.4" y="7" width="3.6" height="17" rx="1.8" fill="#ffffff" />
    </svg>
  );
}

export function Wordmark({ id }: { id: string }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark id={id} />
      <span className="font-grotesk text-[17px] font-semibold tracking-tight text-[#f2f3fa]">Cadence</span>
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <FadeInView className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className="hbl-ai-eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-grotesk text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#f2f3fa]">
        {title}
      </h2>
      {body ? <p className="mt-5 text-[17px] leading-relaxed text-[#9aa0b4]">{body}</p> : null}
    </FadeInView>
  );
}

export function Check({ tone = "violet" }: { tone?: "violet" | "cyan" }) {
  return (
    <span className="hbl-ai-check" data-tone={tone} aria-hidden="true">
      <Icon d={icons.check} className="h-3 w-3" strokeWidth={2.4} />
    </span>
  );
}
