import Link from "next/link";
import type { ReactNode } from "react";

interface ShowcaseTileProps {
  href: string;
  title: string;
  category: string;
  children: ReactNode;
  tall?: boolean;
}

export function ShowcaseTile({ href, title, category, children, tall = false }: ShowcaseTileProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-white/[0.06] bg-[#0f0f0f] p-3 transition-colors hover:border-white/[0.12]"
    >
      <div className={`relative flex ${tall ? "h-80" : "h-64"} items-center justify-center overflow-hidden rounded-xl border border-white/[0.04] bg-[#0a0a0a]`}>
        {children}
      </div>
      <div className="flex items-center justify-between px-2 pb-1 pt-3">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs text-muted">
          {category} <span className="transition-transform group-hover:translate-x-0.5">↗</span>
        </span>
      </div>
    </Link>
  );
}
