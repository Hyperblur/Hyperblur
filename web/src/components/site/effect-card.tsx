import Link from "next/link";
import type { ReactNode } from "react";
import type { EffectMeta } from "@/registry/meta";

export function EffectCard({ meta, demo }: { meta: EffectMeta; demo: ReactNode }) {
  return (
    <Link
      href={`/effects/${meta.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-blue"
    >
      <div className="hb-grid relative flex h-44 items-center justify-center overflow-hidden border-b border-line bg-bg">
        {demo}
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <h3 className="font-display text-lg font-bold uppercase tracking-wide group-hover:text-blue">
            {meta.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{meta.description}</p>
        </div>
        <span className="shrink-0 rounded border border-line px-2 py-0.5 font-mono text-[11px] uppercase text-muted">
          {meta.category}
        </span>
      </div>
    </Link>
  );
}
