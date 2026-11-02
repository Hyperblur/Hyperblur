import { ArrowRight, ForgeMark } from "./icons";

const links = [
  { label: "Product", href: "#product" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#faq" },
];

export function Nav() {
  return (
    <nav aria-label="Forge" className="relative z-20 border-b border-white/10 bg-[#0b0b0c]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 rounded-md">
          <ForgeMark />
          <span className="font-mono text-[15px] font-semibold tracking-[-0.04em] text-[#f4f4f0]">forge</span>
          <span className="hidden rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10.5px] text-[#a3a39b] sm:inline">
            v3.2
          </span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hbl-dv-navlink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#pricing" className="hbl-dv-navlink hidden sm:inline">
            Sign in
          </a>
          <a href="#start" className="hbl-dv-btn hbl-dv-btn-acid hbl-dv-btn-sm">
            Start deploying
            <ArrowRight />
          </a>
        </div>
      </div>
    </nav>
  );
}
