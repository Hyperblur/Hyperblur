import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Templates",
  description: "Full page templates assembled from Hyperblur blocks.",
};

export default function TemplatesIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Templates</h1>
      <p className="mt-2 max-w-xl text-muted">
        Full pages assembled only from Hyperblur blocks, to show how they compose into a real site.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Marketing</p>
            <h2 className="mt-2 text-lg font-semibold">Landing page</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Hero, logo strip, features, testimonials, pricing, FAQ and a closing call to action.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/templates/landing" className="hb-btn hb-btn-primary">
              Open
            </Link>
          </div>
        </article>

        <div className="flex items-center justify-center rounded-2xl border border-dashed border-line-2 p-6 text-center text-sm text-muted">
          More templates are coming.
        </div>
      </div>
    </div>
  );
}
