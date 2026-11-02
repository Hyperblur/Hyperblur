import { Wordmark } from "./ui";

const links = [
  { label: "Product", href: "#product" },
  { label: "Workflows", href: "#workflows" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
];

export function Nav() {
  return (
    <nav aria-label="Cadence" className="relative z-20 mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
      <a href="#top" className="hbl-ai-focus rounded-lg" aria-label="Cadence home">
        <Wordmark id="nav" />
      </a>
      <ul className="hidden items-center gap-1 md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="hbl-ai-navlink">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <a href="#cta" className="hbl-ai-navlink hidden sm:inline-flex">
          Sign in
        </a>
        <a href="#cta" className="hbl-ai-btn hbl-ai-btn-primary hbl-ai-btn-sm">
          Book a demo
        </a>
      </div>
    </nav>
  );
}
