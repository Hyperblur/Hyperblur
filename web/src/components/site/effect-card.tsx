import Link from "next/link";
import type { ReactNode } from "react";
import type { EffectMeta } from "@/registry/meta";

const card =
  "group relative flex min-w-0 flex-col rounded-2xl border border-white/[0.06] bg-[#0f0f0f] p-3 transition-colors hover:border-white/[0.12]";
const preview =
  "relative flex h-44 items-center justify-center overflow-hidden rounded-xl border border-white/[0.04] bg-[#0a0a0a]";

export function EffectCard({ meta, demo }: { meta: EffectMeta; demo: ReactNode }) {
  const href = `/effects/${meta.slug}`;
  const isBlock = meta.category === "blocks";
  return (
    <div className={card}>
      <div className={preview} aria-hidden={isBlock ? "true" : undefined}>
        {isBlock ? <div className="pointer-events-none h-full w-full">{demo}</div> : demo}
      </div>
      <Link
        href={href}
        className={`flex items-start justify-between gap-3 px-2 pb-2 pt-4 ${isBlock ? "after:absolute after:inset-0 after:content-['']" : ""}`}
      >
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold">{meta.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{meta.description}</p>
        </div>
        <span className="mt-0.5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5">↗</span>
      </Link>
    </div>
  );
}
