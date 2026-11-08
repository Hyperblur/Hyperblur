import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

export default function ThanksPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">You are in. Thank you.</h1>
      <p className="mt-4 leading-7 text-muted">
        Your license key is on its way to the email you used at checkout. It usually arrives within a minute, from
        support@hyperblur.dev. Check your spam folder if you do not see it.
      </p>
      <ol className="mt-8 space-y-3 text-sm leading-6 text-ink/80">
        <li>1. Add the Hyperblur Pro registry to your components.json and export your key as HYPERBLUR_KEY.</li>
        <li>2. Run npx shadcn@latest add @hyperblur-pro/ followed by the item name.</li>
        <li>3. For agents, set HYPERBLUR_TOKEN to the same key and use the MCP server.</li>
      </ol>
      <p className="mt-6 text-sm text-muted">
        The exact registry snippet is in the email and on the <Link href="/pro#how" className="underline">Pro page</Link>. Nothing arrived after ten minutes? Write to support@hyperblur.dev.
      </p>
    </section>
  );
}
