import { Arrow, Logo } from "./ui";

const links = [
  { label: "Products", href: "#accept" },
  { label: "Developers", href: "#developers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
];

export function Nav() {
  return (
    <header className="relative z-20">
      <nav aria-label="Meridian" className="hbl-fn-wrap flex h-[72px] items-center justify-between gap-6">
        <a href="#top" className="hbl-fn-focus rounded-lg" aria-label="Meridian home">
          <Logo id="hbl-fn-nav-logo" />
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hbl-fn-nav-link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href="#signin" className="hbl-fn-link hidden px-2 py-1 text-sm sm:inline-block">
            Sign in
          </a>
          <a href="#start" className="hbl-fn-btn hbl-fn-btn-primary hbl-fn-btn-sm">
            Open an account
            <Arrow />
          </a>
        </div>
      </nav>
    </header>
  );
}
