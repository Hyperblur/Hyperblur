import Link from "next/link";
import type { ReactNode } from "react";
import type { EffectMeta } from "@/registry/meta";

const card =
  "group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-2";
const preview = "relative flex h-44 items-center justify-center overflow-hidden border-b border-line bg-bg";

export function EffectCard({ meta, demo }: { meta: EffectMeta; demo: ReactNode }) {
  const href = `/effects/${meta.slug}`;
  const body = (
    <div className="flex items-start justify-between gap-3 p-4">
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold">{meta.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{meta.description}</p>
      </div>
    </div>
  );

  if (meta.category === "blocks") {
    return (
      <div className={`${card} relative`}>
        <div className={preview} aria-hidden="true">
          <div className="pointer-events-none h-full w-full">{demo}</div>
        </div>
        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
          {body}
        </Link>
      </div>
    );
  }

  return (
    <Link href={href} className={card}>
      <div className={preview}>{demo}</div>
      {body}
    </Link>
  );
}
