import type { ReactNode } from "react";
import { DocHeader } from "./doc-parts";

export function LegalShell({
  title,
  lead,
  updated,
  children,
}: {
  title: string;
  lead: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto min-w-0 max-w-3xl px-4 py-12 sm:px-6">
      <DocHeader title={title} lead={lead} />
      <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>
      {children}
    </article>
  );
}
