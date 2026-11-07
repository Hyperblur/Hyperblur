import { Magnetic } from "@/registry/hyperblur/magnetic";
import { ScrollVelocityText } from "@/registry/hyperblur/scroll-velocity-text";
import { ArrowIcon, InstagramIcon, LogoMark, MailIcon, PhoneIcon, YoutubeIcon } from "./icons";

export function FitnessClosing() {
  return (
    <section aria-labelledby="hbl-ft-cta-title" className="hbl-ft-cta">
      <div className="hbl-ft-cta-band" aria-hidden="true">
        <ScrollVelocityText text="Your first week is free · " baseSpeed={50} velocityFactor={1.2} gap={0} className="hbl-ft-cta-velo" />
      </div>
      <div className="hbl-ft-wrap relative grid gap-10 py-20 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end md:py-28">
        <div className="min-w-0">
          <h2 id="hbl-ft-cta-title" className="font-grotesk text-[clamp(44px,8vw,112px)] font-bold uppercase leading-[0.86] tracking-[-0.055em]">
            Seven days.
            <br />
            Zero dollars.
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#0b0c0a]/75">
            Take every class on the schedule for a week, meet the coaches and see if Ironbloom feels like your gym. If it does not, you owe us nothing.
          </p>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-5 md:items-end">
          <Magnetic strength={0.3} radius={140}>
            <a href="#hbl-ft-claim" className="hbl-ft-btn-dark hbl-ft-btn-lg">
              Claim a free week
              <ArrowIcon className="h-5 w-5" />
            </a>
          </Magnetic>
          <p className="font-mono text-[13px] text-[#0b0c0a]/75">Next free intro: Thu 13 · 5:30 PM · 3 spots</p>
        </div>
      </div>
    </section>
  );
}

const cols = [
  {
    title: "Train",
    links: [
      { label: "Class schedule", href: "#hbl-ft-schedule" },
      { label: "Programs", href: "#hbl-ft-programs" },
      { label: "Personal coaching", href: "#hbl-ft-plans" },
      { label: "Junior Athletes", href: "#hbl-ft-programs" },
    ],
  },
  {
    title: "Club",
    links: [
      { label: "Coaches", href: "#hbl-ft-coaches" },
      { label: "Membership", href: "#hbl-ft-plans" },
      { label: "Visit us", href: "#hbl-ft-visit" },
      { label: "Gift cards", href: "#hbl-ft-plans" },
    ],
  },
];

export function FitnessFooter() {
  return (
    <footer className="hbl-ft-footer">
      <div className="hbl-ft-wrap grid gap-12 py-16 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div className="min-w-0">
          <a href="#hbl-ft-top" className="flex items-center gap-2.5" aria-label="Back to top">
            <LogoMark className="h-8 w-8" />
            <span className="font-grotesk text-[17px] font-bold uppercase tracking-[-0.02em]">
              Ironbloom Athletic Club
            </span>
          </a>
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed hbl-ft-muted">
            Small-group strength and conditioning on Portland&apos;s Central Eastside since 2014.
          </p>
          <div className="mt-6 flex gap-2">
            <a href="https://instagram.com" aria-label="Ironbloom on Instagram" className="hbl-ft-social">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" aria-label="Ironbloom on YouTube" className="hbl-ft-social">
              <YoutubeIcon className="h-5 w-5" />
            </a>
            <a href="mailto:coach@ironbloom.club" aria-label="Email Ironbloom" className="hbl-ft-social">
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title} className="min-w-0">
            <p className="hbl-ft-mono-label">{c.title}</p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hbl-ft-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="min-w-0">
          <p className="hbl-ft-mono-label">Find us</p>
          <address className="mt-4 space-y-2.5 text-[14px] not-italic hbl-ft-muted">
            <p>
              1418 SE Water Ave
              <br />
              Portland, OR 97214
            </p>
            <p>
              Staffed Mon to Thu 5 AM to 9 PM
              <br />
              Fri 5 AM to 8 PM · Sat and Sun mornings
            </p>
            <p>
              <a href="tel:+15035550148" className="hbl-ft-link inline-flex items-center gap-2 font-mono">
                <PhoneIcon className="h-4 w-4" />
                (503) 555-0148
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t hbl-ft-rule">
        <div className="hbl-ft-wrap flex flex-col gap-3 py-6 text-[12px] hbl-ft-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Ironbloom Athletic Club LLC</p>
          <p className="font-mono">Members train 24/7 · Coaches on the floor 98 hours a week</p>
        </div>
      </div>
      <div className="hbl-ft-mobilebar">
        <a href="#hbl-ft-claim" className="hbl-ft-btn w-full justify-center">
          Claim a free week
          <ArrowIcon className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
