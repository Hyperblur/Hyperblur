import { SpotlightCard, SpotlightGroup } from "@/registry/hyperblur/spotlight-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { BoxingIcon, HiitIcon, KidsIcon, MobilityIcon, StrengthIcon } from "./icons";

const programs = [
  {
    name: "Strength",
    cls: "Strength Foundations",
    text: "Barbell squat, press, deadlift and pull, coached in 8-week blocks with tracked percentages. Every lift written down, every PR rung on the bell.",
    meta: "22 classes / week",
    level: 4,
    Icon: StrengthIcon,
    span: "md:col-span-2 lg:col-span-3",
    big: true,
  },
  {
    name: "HIIT",
    cls: "Engine HIIT",
    text: "45 minutes of intervals on bikes, rowers and sleds, paced by heart-rate zones on the wall screen.",
    meta: "16 classes / week",
    level: 5,
    Icon: HiitIcon,
    span: "lg:col-span-3",
    big: false,
  },
  {
    name: "Mobility",
    cls: "Mobility Reset",
    text: "Hips, thoracic spine and shoulders. Slow, strict and the reason your squat stops hurting.",
    meta: "10 classes / week",
    level: 2,
    Icon: MobilityIcon,
    span: "lg:col-span-2",
    big: false,
  },
  {
    name: "Boxing",
    cls: "Fight Club Boxing",
    text: "Pad work, footwork and bag rounds with a former Golden Gloves finalist. Gloves included.",
    meta: "9 classes / week",
    level: 4,
    Icon: BoxingIcon,
    span: "lg:col-span-2",
    big: false,
  },
  {
    name: "Kids",
    cls: "Junior Athletes",
    text: "Ages 8 to 14. Jumping, landing, throwing and the basics of lifting with a broomstick before a bar.",
    meta: "7 classes / week",
    level: 2,
    Icon: KidsIcon,
    span: "lg:col-span-2",
    big: false,
  },
];

export function FitnessPrograms() {
  return (
    <section id="hbl-ft-programs" aria-labelledby="hbl-ft-programs-title" className="py-24 md:py-32">
      <div className="hbl-ft-wrap">
        <FadeInView className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="hbl-ft-kicker">Programs</p>
            <h2 id="hbl-ft-programs-title" className="hbl-ft-h2 mt-5">
              Five ways
              <br />
              to get <span className="hbl-ft-lime">after it</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed hbl-ft-muted">
            Every membership includes every program. Mix a heavy Monday with a Thursday boxing round and a Sunday mobility reset.
          </p>
        </FadeInView>
        <SpotlightGroup className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {programs.map((p, i) => (
            <FadeInView key={p.name} delay={i * 0.06} className={`min-w-0 ${p.span}`}>
              <SpotlightCard color="#c8ff3d" size={380} radius={20} className="hbl-ft-prog h-full">
                <div className={`relative flex h-full flex-col p-6 md:p-7 ${p.big ? "lg:min-h-[300px]" : "min-h-[260px]"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="hbl-ft-prog-icon">
                      <p.Icon className="h-7 w-7" />
                    </span>
                    <span className="font-mono text-[12px] hbl-ft-muted">0{i + 1}</span>
                  </div>
                  <h3 className="mt-auto pt-10 font-grotesk text-[clamp(32px,4vw,52px)] font-bold uppercase leading-[0.9] tracking-[-0.045em]">
                    {p.name}
                  </h3>
                  <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.08em] hbl-ft-lime">{p.cls}</p>
                  <p className="mt-4 max-w-md text-[14px] leading-relaxed hbl-ft-muted">{p.text}</p>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t pt-4 hbl-ft-rule">
                    <span className="font-mono text-[12px] hbl-ft-muted">{p.meta}</span>
                    <span className="flex items-center gap-1" aria-label={`Intensity ${p.level} of 5`} role="img">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} className="hbl-ft-int" data-on={n <= p.level ? "" : undefined} />
                      ))}
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </FadeInView>
          ))}
        </SpotlightGroup>
      </div>
    </section>
  );
}
