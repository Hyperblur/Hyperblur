import { ArrowIcon, LogoMark } from "./icons";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
];

export function AgencyNav() {
  return (
    <header className="relative z-10 border-b hbl-ag-rule">
      <div className="hbl-ag-wrap flex h-[72px] items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3" aria-label="Atlas & Oak, back to top">
          <LogoMark />
          <span className="font-grotesk text-[17px] font-semibold tracking-[-0.03em]">
            Atlas <span className="hbl-ag-serif text-[19px] font-normal">&amp;</span> Oak
          </span>
        </a>
        <nav aria-label="Studio" className="hidden items-center gap-9 text-sm md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hbl-ag-link">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-muted lg:inline-flex">
            <span className="hbl-ag-live" aria-hidden="true" />
            2 slots for Q1 2027
          </span>
          <a href="#contact" className="hbl-ag-pill">
            Start a project
            <ArrowIcon />
          </a>
        </div>
      </div>
      <nav aria-label="Studio sections" className="border-t hbl-ag-rule md:hidden">
        <div className="hbl-ag-wrap flex h-11 items-center justify-between text-[13px]">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hbl-ag-link">
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
