import Link from "next/link";
import type { EffectMeta } from "@/registry/meta";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} />
    </svg>
  );
}

interface PagerProps {
  prev?: EffectMeta;
  next?: EffectMeta;
  position: number;
  total: number;
}

export function PagerTop({ prev, next, position, total }: PagerProps) {
  const base =
    "grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-2 hover:text-ink";
  const off = "pointer-events-none opacity-30";
  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="hidden font-mono text-xs text-muted sm:inline">
        {position} / {total}
      </span>
      {prev ? (
        <Link href={`/effects/${prev.slug}`} aria-label={`Previous: ${prev.title}`} title={prev.title} className={base}>
          <Arrow dir="left" />
        </Link>
      ) : (
        <span className={`${base} ${off}`} aria-hidden="true">
          <Arrow dir="left" />
        </span>
      )}
      {next ? (
        <Link href={`/effects/${next.slug}`} aria-label={`Next: ${next.title}`} title={next.title} className={base}>
          <Arrow dir="right" />
        </Link>
      ) : (
        <span className={`${base} ${off}`} aria-hidden="true">
          <Arrow dir="right" />
        </span>
      )}
    </div>
  );
}

export function PagerBottom({ prev, next }: PagerProps) {
  const card =
    "group flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-line-2";
  return (
    <div className="mt-12 flex gap-3 border-t border-line pt-6">
      {prev ? (
        <Link href={`/effects/${prev.slug}`} className={card}>
          <span className="text-muted transition-transform group-hover:-translate-x-0.5">
            <Arrow dir="left" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs text-muted">Previous</span>
            <span className="block truncate text-sm font-medium">{prev.title}</span>
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <Link href={`/effects/${next.slug}`} className={`${card} justify-end text-right`}>
          <span className="min-w-0">
            <span className="block text-xs text-muted">Next</span>
            <span className="block truncate text-sm font-medium">{next.title}</span>
          </span>
          <span className="text-muted transition-transform group-hover:translate-x-0.5">
            <Arrow dir="right" />
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </div>
  );
}

export function PagerMobileBar({ prev, next }: PagerProps) {
  const base = "flex min-w-0 flex-1 items-center gap-2 rounded-full border px-4 py-3 text-sm";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        {prev ? (
          <Link href={`/effects/${prev.slug}`} className={`${base} border-line bg-surface`}>
            <Arrow dir="left" />
            <span className="truncate">{prev.title}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link href={`/effects/${next.slug}`} className={`${base} justify-end border-ink bg-ink text-bg`}>
            <span className="truncate font-medium">{next.title}</span>
            <Arrow dir="right" />
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </div>
    </div>
  );
}
