import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-display font-bold uppercase tracking-wide text-ink">
              Hyperblur
            </span>{" "}
            · visual effects for React
            <span className="hb-term-cursor" aria-hidden="true" />
          </p>
          <p>
            Built with React, Tailwind and the shadcn registry. Free while in
            beta.
          </p>
        </div>
        <nav
          aria-label="Legal"
          className="flex flex-wrap items-center gap-x-4 gap-y-1"
        >
          <Link href="/terms" className="hover:text-ink">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/refund" className="hover:text-ink">
            Refunds
          </Link>
          <a href="mailto:support@hyperblur.dev" className="hover:text-ink">
            support@hyperblur.dev
          </a>
        </nav>
      </div>
    </footer>
  );
}
