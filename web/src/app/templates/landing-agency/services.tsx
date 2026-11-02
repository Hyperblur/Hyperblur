import { SpotlightGroup, SpotlightCard } from "@/registry/hyperblur/spotlight-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

const services = [
  {
    n: "01",
    title: "Brand identity",
    text: "Strategy, naming, logo, type and a system your team can actually run without us. We test every mark at 16 pixels and on a bus.",
    items: ["Positioning", "Naming", "Visual identity", "Guidelines"],
    span: "md:col-span-7",
    weeks: "8 – 12 weeks",
  },
  {
    n: "02",
    title: "Websites",
    text: "Art direction, design and production builds in Next.js with a CMS your editors like. Fast, accessible, launched with analytics wired in.",
    items: ["Art direction", "UX & design", "Next.js builds", "CMS"],
    span: "md:col-span-5",
    weeks: "10 – 16 weeks",
  },
  {
    n: "03",
    title: "Motion & film",
    text: "Logo animation, launch films and interface motion that make a brand feel alive before anyone reads a word.",
    items: ["Brand motion", "Launch films", "UI motion"],
    span: "md:col-span-5",
    weeks: "4 – 8 weeks",
  },
  {
    n: "04",
    title: "Art direction",
    text: "Campaigns, packaging and editorial shoots directed in house, so the identity survives contact with the real world.",
    items: ["Campaigns", "Packaging", "Photography", "Editorial"],
    span: "md:col-span-7",
    weeks: "Ongoing retainers",
  },
];

export function AgencyServices() {
  return (
    <section id="services" className="border-b hbl-ag-rule py-24 md:py-36">
      <div className="hbl-ag-wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-0">
          <FadeInView className="min-w-0 md:col-span-4">
            <p className="hbl-ag-kicker">Services</p>
          </FadeInView>
          <FadeInView delay={0.1} className="min-w-0 md:col-span-8">
            <h2 className="font-grotesk text-[clamp(40px,5.6vw,80px)] font-bold uppercase leading-[0.9] tracking-[-0.045em]">
              Four things, <span className="hbl-ag-serif">done</span> properly.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed hbl-ag-muted">
              Most clients start with identity and stay for the website. Every project is led by a founder and staffed by the people you meet on the first call.
            </p>
          </FadeInView>
        </div>

        <SpotlightGroup className="mt-16 grid gap-4 md:grid-cols-12">
          {services.map((service, i) => (
            <FadeInView key={service.n} delay={(i % 2) * 0.1} className={`min-w-0 ${service.span}`}>
              <SpotlightCard color="#ff4f2e" size={420} radius={6} idle={0} className="hbl-ag-service" style={{ background: "#121212" }}>
                <div className="flex h-full min-h-[340px] flex-col p-7 sm:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <span className="hbl-ag-service-num hbl-ag-numeral text-[96px] text-[#ece8df]/90 sm:text-[120px]" aria-hidden="true">
                      {service.n}
                    </span>
                    <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-muted">{service.weeks}</span>
                  </div>
                  <h3 className="mt-auto pt-10 font-grotesk text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{service.title}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed hbl-ag-muted">{service.text}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.items.map((item) => (
                      <li key={item} className="hbl-ag-tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="hbl-ag-service-fill" aria-hidden="true" />
              </SpotlightCard>
            </FadeInView>
          ))}
        </SpotlightGroup>
      </div>
    </section>
  );
}
