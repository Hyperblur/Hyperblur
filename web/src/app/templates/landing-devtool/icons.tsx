import type { ReactNode } from "react";

export function Glyph({ children, className = "h-4 w-4" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ForgeMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="#a3e635" />
      <rect x="8" y="8" width="16" height="4" rx="1" fill="#0b0b0c" />
      <rect x="8" y="14" width="10" height="4" rx="1" fill="#0b0b0c" />
      <rect x="8" y="20" width="4" height="4" rx="1" fill="#0b0b0c" />
      <rect x="20" y="20" width="4" height="4" rx="1" fill="#0b0b0c" opacity="0.45" />
    </svg>
  );
}

export function ArrowRight({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </Glyph>
  );
}

export function Check({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Glyph>
  );
}

export function Corners() {
  return (
    <>
      <span className="hbl-dv-corner" data-c="tl" aria-hidden="true" />
      <span className="hbl-dv-corner" data-c="tr" aria-hidden="true" />
      <span className="hbl-dv-corner" data-c="bl" aria-hidden="true" />
      <span className="hbl-dv-corner" data-c="br" aria-hidden="true" />
    </>
  );
}

export function SectionHead({
  label,
  title,
  body,
  center = false,
}: {
  label: string;
  title: ReactNode;
  body?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="hbl-dv-label">{label}</p>
      <h2 className="hbl-dv-h2 mt-5 text-[#f4f4f0]">{title}</h2>
      {body ? <p className="mt-5 text-[16px] leading-relaxed text-[#a3a39b] sm:text-[17px]">{body}</p> : null}
    </div>
  );
}
