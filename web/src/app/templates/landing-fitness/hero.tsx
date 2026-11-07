import { DecodeText } from "@/registry/hyperblur/decode-text";
import { ScrollVelocityText } from "@/registry/hyperblur/scroll-velocity-text";
import { HeroArt } from "./hero-art";
import { BookingCard } from "./booking-card";
import { SpotsChip } from "./spots-chip";
import { ArrowIcon } from "./icons";

export function FitnessHero() {
  return (
    <section id="hbl-ft-top" aria-label="Ironbloom Athletic Club" className="hbl-ft-hero">
      <div className="hbl-ft-hero-grid" aria-hidden="true" />
      <div className="hbl-ft-wrap relative grid gap-12 pb-20 pt-12 md:pt-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10 lg:pb-28">
        <div className="min-w-0 lg:pt-6">
          <SpotsChip />
          <h1 className="hbl-ft-h1 mt-7">
            <span className="block">Strong is</span>
            <span className="block">
              built <span className="sr-only">daily.</span>
              <span aria-hidden="true">
                <DecodeText text="daily." duration={1.4} glyphs="0123456789#/+=KGX" className="hbl-ft-lime" />
              </span>
            </span>
          </h1>
          <p className="mt-7 max-w-[34rem] text-[17px] leading-relaxed hbl-ft-muted">
            Small-group strength and conditioning in Portland&apos;s Central Eastside. Twelve athletes per class, a coach who knows your numbers, and a gym that stays open around the clock.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#hbl-ft-claim" className="hbl-ft-btn">
              Claim a free week
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a href="#hbl-ft-schedule" className="hbl-ft-btn-ghost">
              See this week&apos;s classes
            </a>
          </div>
          <dl className="mt-12 grid max-w-[32rem] grid-cols-3 gap-4 border-t pt-6 hbl-ft-rule">
            <div className="min-w-0">
              <dt className="hbl-ft-mono-label">Per class</dt>
              <dd className="mt-1 font-mono text-2xl">12 max</dd>
            </div>
            <div className="min-w-0">
              <dt className="hbl-ft-mono-label">Access</dt>
              <dd className="mt-1 font-mono text-2xl">24/7</dd>
            </div>
            <div className="min-w-0">
              <dt className="hbl-ft-mono-label">Classes</dt>
              <dd className="mt-1 font-mono text-2xl">64/wk</dd>
            </div>
          </dl>
        </div>
        <div className="relative min-w-0">
          <HeroArt />
          <div className="relative z-[1] -mt-28 sm:-mt-40 lg:-mt-56 lg:ml-auto lg:max-w-[440px]">
            <BookingCard />
          </div>
        </div>
      </div>
      <div className="hbl-ft-bands" aria-hidden="true">
        <div className="hbl-ft-band hbl-ft-band-lime">
          <ScrollVelocityText
            text="Strength Foundations ✕ Engine HIIT ✕ Mobility Reset ✕ Fight Club Boxing ✕ Junior Athletes ✕ Open Gym ✕ "
            baseSpeed={42}
            velocityFactor={1.1}
            gap={0}
            className="hbl-ft-band-text"
          />
        </div>
        <div className="hbl-ft-band hbl-ft-band-dark">
          <ScrollVelocityText
            text="Lift heavy · Move well · Show up · Recover hard · Repeat · "
            direction={-1}
            baseSpeed={34}
            velocityFactor={0.9}
            gap={0}
            className="hbl-ft-band-text hbl-ft-band-outline"
          />
        </div>
      </div>
    </section>
  );
}
