import { Marquee } from "@/registry/hyperblur/marquee";
import { LogoMark } from "./icons";

const columns = [
  { title: "Studio", links: [{ label: "Work", href: "#work" }, { label: "Services", href: "#services" }, { label: "Process", href: "#process" }, { label: "Recognition", href: "#studio" }] },
  { title: "Follow", links: [{ label: "Instagram", href: "#contact" }, { label: "LinkedIn", href: "#contact" }, { label: "Are.na", href: "#contact" }, { label: "Read.cv", href: "#contact" }] },
  { title: "Careers", links: [{ label: "Senior designer, Lisbon", href: "#contact" }, { label: "Creative developer, remote", href: "#contact" }, { label: "Internships, summer 2027", href: "#contact" }] },
];

export function AgencyFooter() {
  return (
    <footer className="relative overflow-hidden pt-20">
      <div className="hbl-ag-wrap grid gap-12 md:grid-cols-12 md:gap-0">
        <div className="min-w-0 md:col-span-5">
          <div className="flex items-center gap-3">
            <LogoMark size={34} />
            <span className="font-grotesk text-xl font-semibold tracking-[-0.03em]">
              Atlas <span className="hbl-ag-serif font-normal">&amp;</span> Oak
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed hbl-ag-muted">
            An independent brand and web studio. Nine people, two cities, one rule: nothing leaves the studio until it makes us a little nervous.
          </p>
        </div>
        <div className="grid min-w-0 grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-muted">{column.title}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hbl-ag-link text-[#ece8df]/80">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="mt-20 border-y hbl-ag-rule py-4" aria-hidden="true">
        <Marquee speed={0.4} gap={40} fade={false} pauseOnHover={false} className="font-mono text-[11px] uppercase tracking-[0.12em] hbl-ag-muted">
          {["Lisbon 38.71° N", "Brooklyn 40.70° N", "Identity", "Websites", "Motion", "Art direction", "Est. 2014"].map((item) => (
            <span key={item} className="flex items-center gap-10 whitespace-nowrap">
              {item}
              <span className="h-1 w-1 rounded-full bg-[#ff4f2e]" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="hbl-ag-wrap">
        <p className="hbl-ag-foot-mark mt-10 select-none overflow-hidden" aria-hidden="true">
          Atlas&amp;Oak
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t hbl-ag-rule py-6 text-xs hbl-ag-muted">
          <p>© 2026 Atlas &amp; Oak Studio Lda. A fictional studio.</p>
          <div className="flex gap-6">
            <a href="#top" className="hbl-ag-link">Privacy</a>
            <a href="#top" className="hbl-ag-link">Imprint</a>
            <a href="#top" className="hbl-ag-link">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
