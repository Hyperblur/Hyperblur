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
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-2"
    >
      <div className={`relative flex ${tall ? "h-80" : "h-64"} items-center justify-center overflow-hidden bg-bg`}>
        {children}
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-3">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs text-muted">
          {category} <span className="transition-transform group-hover:translate-x-0.5">↗</span>
        </span>
      </div>
    </Link>
  );
}
