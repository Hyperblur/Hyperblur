import Link from "next/link";
import type { ReactNode } from "react";
import { docPages } from "./docs-nav";

export function DocHeader({ title, lead }: { title: string; lead: string }) {
  return (
    <header>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-muted">{lead}</p>
    </header>
  );
}

export function DocSection({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-10 scroll-mt-20">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="max-w-2xl leading-7 text-ink/80">{children}</p>;
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="break-words rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[13px] text-ink/90">
      {children}
    </code>
  );
}

export function DocList({ children }: { children: ReactNode }) {
  return <ul className="max-w-2xl list-disc space-y-2 pl-5 leading-7 text-ink/80 marker:text-line-2">{children}</ul>;
}

export function DocLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className="text-ink underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-blue-soft"
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}

export function DocPager({ current }: { current: string }) {
  const index = docPages.findIndex((p) => p.href === current);
  const prev = docPages[index - 1];
  const next = docPages[index + 1];
  return (
    <div className="mt-12 flex items-center justify-between border-t border-line pt-6 text-sm">
      {prev ? (
        <Link href={prev.href} className="text-muted hover:text-ink">
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="text-muted hover:text-ink">
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
