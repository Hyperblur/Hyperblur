import { ArrowIcon, LogoMark, PhoneIcon } from "./icons";

const links = [
  { href: "#hbl-ft-schedule", label: "Schedule" },
  { href: "#hbl-ft-programs", label: "Programs" },
  { href: "#hbl-ft-coaches", label: "Coaches" },
  { href: "#hbl-ft-plans", label: "Membership" },
];

export function FitnessNav() {
  return (
    <nav aria-label="Ironbloom" className="hbl-ft-nav">
      <div className="hbl-ft-wrap flex h-16 items-center justify-between gap-4">
        <a href="#hbl-ft-top" className="flex min-w-0 items-center gap-2.5" aria-label="Ironbloom Athletic Club home">
          <LogoMark className="h-8 w-8 shrink-0" />
          <span className="font-grotesk text-[17px] font-bold uppercase tracking-[-0.02em]">
            Ironbloom<span className="hbl-ft-lime">.</span>
          </span>
        </a>
        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hbl-ft-link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <a href="tel:+15035550148" className="hbl-ft-link hidden items-center gap-2 font-mono text-[13px] md:inline-flex">
            <PhoneIcon className="h-4 w-4" />
            (503) 555-0148
          </a>
          <a href="#hbl-ft-claim" className="hbl-ft-btn hbl-ft-btn-sm">
            <span className="hidden sm:inline">Claim a free week</span>
            <span className="sm:hidden">Free week</span>
            <ArrowIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
