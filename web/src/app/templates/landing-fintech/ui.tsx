import type { ReactNode } from "react";

export function LogoMark({ id, size = 28 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6ee7b7" />
          <stop offset="0.55" stopColor="#34d399" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="#0b1630" stroke="rgba(148,163,184,0.28)" />
      <circle cx="16" cy="16" r="9.5" stroke={`url(#${id}-g)`} strokeWidth="1.8" />
      <ellipse cx="16" cy="16" rx="4.2" ry="9.5" stroke={`url(#${id}-g)`} strokeWidth="1.8" />
      <path d="M6.5 16h19" stroke={`url(#${id}-g)`} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ id }: { id: string }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark id={id} />
      <span className="text-[17px] font-semibold tracking-[-0.03em] text-[#eaf2ff]">Meridian</span>
    </span>
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

export function Arrow() {
  return (
    <Icon>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </Icon>
  );
}

export function Check({ className = "hbl-fn-check" }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M5 12.5l4.2 4.2L19 7" />
    </Icon>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  id,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-[760px] text-center" : "max-w-[560px]"}>
      <span className="hbl-fn-eyebrow">
        <span className="hbl-fn-eyebrow-dot" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 id={id} className="hbl-fn-h2 mt-5">{title}</h2>
      {lead ? <p className={`hbl-fn-lead mt-5 ${center ? "mx-auto max-w-[620px]" : ""}`}>{lead}</p> : null}
    </div>
  );
}

export function Em({ children }: { children: ReactNode }) {
  return <span className="hbl-fn-serif">{children}</span>;
}
