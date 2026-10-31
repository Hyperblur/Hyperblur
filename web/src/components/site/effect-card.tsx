import Link from "next/link";
import type { ReactNode } from "react";
import type { EffectMeta } from "@/registry/meta";

export function EffectCard({ meta, demo }: { meta: EffectMeta; demo: ReactNode }) {
  return (
    <Link
      href={`/effects/${meta.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-2"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-line bg-bg">
        {demo}
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold">{meta.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{meta.description}</p>
        </div>
      </div>
    </Link>
  );
}
