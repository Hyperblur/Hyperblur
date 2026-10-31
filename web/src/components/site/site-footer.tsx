export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-display font-bold uppercase tracking-wide text-ink">
            Hyperblur
          </span>{" "}
          · visual effects for React
        </p>
        <p>
          Built with React, Tailwind and the shadcn registry. Free while in beta.
        </p>
      </div>
    </footer>
  );
}
