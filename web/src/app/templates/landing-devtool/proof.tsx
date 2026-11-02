import { Marquee } from "@/registry/hyperblur/marquee";
import { ScrollVelocityText } from "@/registry/hyperblur/scroll-velocity-text";

const companies = [
  { name: "Quarrystack", shape: "M4 18L12 5l8 13z" },
  { name: "Halcyon", shape: "M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16zM12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z" },
  { name: "Tessellate", shape: "M4 4h7v7H4zM13 13h7v7h-7zM13 4h7v7h-7z" },
  { name: "Brightwire", shape: "M13 3L5 14h6l-1 7 8-11h-6z" },
  { name: "Moraine", shape: "M3 18l5-8 4 5 3-4 6 7z" },
  { name: "Parcelpoint", shape: "M12 3l8 4.5v9L12 21l-8-4.5v-9z" },
  { name: "Kestrel Pay", shape: "M4 12c4-7 12-7 16 0c-4 7-12 7-16 0z" },
  { name: "Lumawell", shape: "M12 3v18M3 12h18M6 6l12 12M18 6L6 18" },
];

export function Proof() {
  return (
    <section aria-labelledby="hbl-dv-proof" className="hbl-dv-rule relative">
      <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-[260px_minmax(0,1fr)]">
        <p id="hbl-dv-proof" className="font-mono text-[12.5px] leading-relaxed text-[#a3a39b]">
          <span className="text-[#f4f4f0]">2.1M builds a week</span> for 3,400 teams shipping TypeScript in production.
        </p>
        <div className="min-w-0">
          <Marquee speed={0.5} gap={56}>
            {companies.map((c) => (
              <span key={c.name} className="flex items-center gap-2.5 whitespace-nowrap text-[#a3a39b] transition-colors hover:text-[#f4f4f0]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
                  <path d={c.shape} />
                </svg>
                <span className="font-mono text-[17px] font-semibold tracking-[-0.05em]">{c.name}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

export function VelocityBand() {
  return (
    <section aria-label="Forge principles" className="hbl-dv-rule relative overflow-hidden border-b border-white/10 py-10 sm:py-14">
      <div className="hbl-dv-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <ScrollVelocityText
        text="build once / cache forever / preview every branch / roll back in one command /"
        baseSpeed={36}
        velocityFactor={0.6}
        gap={40}
        className="hbl-dv-svt relative text-[clamp(34px,6vw,76px)] text-[#f4f4f0]"
      />
      <ScrollVelocityText
        text="9.4s median deploy / 97.8% cache hits / 0.6s rollbacks / 3 regions by default /"
        baseSpeed={30}
        velocityFactor={0.6}
        direction={-1}
        gap={40}
        className="hbl-dv-svt hbl-dv-stroke relative mt-2 text-[clamp(34px,6vw,76px)]"
      />
    </section>
  );
}
