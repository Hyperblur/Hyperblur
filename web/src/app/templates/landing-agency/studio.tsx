import { Marquee } from "@/registry/hyperblur/marquee";
import { CountUp } from "@/registry/hyperblur/count-up";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

const clients = [
  { name: "Halden", className: "font-serif text-[34px] italic" },
  { name: "NORTHLINE", className: "font-grotesk text-[22px] font-bold tracking-[0.28em]" },
  { name: "mira", className: "font-grotesk text-[34px] font-bold tracking-[-0.06em]" },
  { name: "Low Tide Radio", className: "font-mono text-[18px] uppercase tracking-[0.04em]" },
  { name: "Kettle & Crane", className: "font-serif text-[30px]" },
  { name: "OCB", className: "font-grotesk text-[30px] font-bold tracking-[-0.02em]" },
  { name: "Papirfabrikken", className: "font-grotesk text-[24px] font-light tracking-[-0.02em]" },
  { name: "Lumen Bank", className: "font-serif text-[30px] italic" },
  { name: "SUNHOUSE", className: "font-mono text-[18px] font-semibold tracking-[0.3em]" },
  { name: "Vela", className: "font-grotesk text-[34px] font-medium tracking-[-0.05em]" },
];

const awards = [
  { name: "Awwwards", detail: "Site of the Day", count: 14, years: "2016 – 2026" },
  { name: "The FWA", detail: "FWA of the Day", count: 6, years: "2018 – 2025" },
  { name: "Type Directors Club", detail: "Certificate of Excellence", count: 2, years: "2021, 2024" },
  { name: "D&AD", detail: "Wood Pencil, Branding", count: 1, years: "2025" },
];

export function AgencyStudio() {
  return (
    <section id="studio" className="border-b hbl-ag-rule">
      <div className="border-b hbl-ag-rule py-10">
        <p className="hbl-ag-wrap mb-8 font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-muted">
          Trusted by 60+ teams who wanted to be noticed
        </p>
        <Marquee speed={0.6} gap={72} className="text-[#ece8df]/70">
          {clients.map((client) => (
            <span key={client.name} className={`whitespace-nowrap leading-none transition-colors hover:text-[#ece8df] ${client.className}`}>
              {client.name}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="hbl-ag-wrap grid gap-12 py-24 md:grid-cols-12 md:gap-0 md:py-32">
        <FadeInView className="min-w-0 md:col-span-5 md:pr-12">
          <p className="hbl-ag-kicker">Recognition</p>
          <h2 className="mt-6 font-grotesk text-[clamp(40px,5.4vw,72px)] font-bold uppercase leading-[0.9] tracking-[-0.045em]">
            Twenty three <span className="hbl-ag-serif">trophies,</span> zero shelves.
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed hbl-ag-muted">
            We keep the awards in a drawer and the client results on the wall. Both lists keep getting longer.
          </p>
        </FadeInView>
        <div className="min-w-0 md:col-span-7">
          <ul className="border-t hbl-ag-rule">
            {awards.map((award, i) => (
              <li key={award.name}>
                <FadeInView delay={i * 0.08}>
                  <div className="hbl-ag-award grid grid-cols-[1fr_auto] items-center gap-4 border-b hbl-ag-rule py-6 sm:grid-cols-[1fr_1fr_auto]">
                  <div className="min-w-0">
                    <p className="hbl-ag-award-name font-grotesk text-xl font-medium tracking-[-0.02em] sm:text-2xl">{award.name}</p>
                    <p className="mt-1 text-sm hbl-ag-muted sm:hidden">{award.detail}</p>
                  </div>
                  <div className="hidden min-w-0 sm:block">
                    <p className="text-sm">{award.detail}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-muted">{award.years}</p>
                  </div>
                  <p className="hbl-ag-numeral text-right text-[56px] sm:text-[72px]">
                    <CountUp to={award.count} duration={1.4} prefix="×" />
                  </p>
                  </div>
                </FadeInView>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
