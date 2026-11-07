import { CartButton } from "./order";
import { Ico, LogoMark, icons } from "./icons";

const links = [
  { label: "Menu", href: "#menu" },
  { label: "Combos", href: "#combos" },
  { label: "Locations", href: "#locations" },
  { label: "Reviews", href: "#reviews" },
];

export function BurgerNav() {
  return (
    <header className="hbl-bg-nav">
      <div className="hbl-bg-wrap hbl-bg-nav-row">
        <a href="#top" className="hbl-bg-brand" aria-label="Smash & Co., back to top">
          <LogoMark />
          <span className="hbl-bg-brand-name">
            Smash<span>&amp;</span>Co.
          </span>
        </a>
        <nav aria-label="Sections" className="hbl-bg-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hbl-bg-link">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hbl-bg-nav-end">
          <a href="tel:+17185550187" className="hbl-bg-phone">
            <Ico size={16}>{icons.phone}</Ico>
            <span>(718) 555-0187</span>
          </a>
          <CartButton />
          <a href="#menu" className="hbl-bg-btn hbl-bg-btn-red hbl-bg-nav-cta">
            Order<span className="hbl-bg-nav-cta-more">&nbsp;now</span>
          </a>
        </div>
      </div>
    </header>
  );
}
