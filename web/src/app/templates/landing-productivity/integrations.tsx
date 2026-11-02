import { AnimatedBeam } from "@/registry/hyperblur/animated-beam";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { CheckMark, Icon, TempoMark } from "./icons";

const sources = [
  {
    label: "Team chat",
    icon: (
      <Icon>
        <path d="M9 4L7 20M17 4l-2 16M4 9h16M3 15h16" />
      </Icon>
    ),
  },
  {
    label: "Code hosting",
    icon: (
      <Icon>
        <circle cx="6" cy="5" r="2" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="8" r="2" />
        <path d="M6 7v10M18 10c0 4-4 4-10 7" />
      </Icon>
    ),
  },
  {
    label: "Calendar",
    icon: (
      <Icon>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 10h16M8 3v4M16 3v4M9 14h2M13 14h2M9 17h2" />
      </Icon>
    ),
  },
  {
    label: "Support desk",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M6.5 6.5l3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" />
      </Icon>
    ),
  },
];

const hub = { label: "Tempo", icon: <TempoMark size={30} /> };

const output = {
  label: "Your roadmap",
  icon: (
    <Icon>
      <path d="M4 6h9M4 12h14M4 18h6" />
    </Icon>
  ),
};

const points = [
  "Chat threads become issues with one emoji reaction",
  "Branches, PRs and deploys move cards for you",
  "Sprint ceremonies land on everyone's calendar",
  "Customer tickets link to the fix and close the loop",
];

export function Integrations() {
  return (
    <section id="integrations" className="scroll-mt-8 px-4 py-24 sm:px-6 lg:py-32" aria-labelledby="hbl-pr-int-title">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <FadeInView className="min-w-0" direction="right">
          <span className="hbl-pr-eyebrow">Integrations</span>
          <h2 id="hbl-pr-int-title" className="hbl-pr-h2">
            Plugs into the tools your team already lives in
          </h2>
          <p className="hbl-pr-sub max-w-[520px]">
            Tempo listens to chat, code, calendars and support, then keeps the roadmap honest without anyone copying links
            between tabs.
          </p>
          <ul className="mt-8 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-[#e4e4ea]">
                <CheckMark />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[13px] text-[#8b8b96]">60+ integrations, plus a typed REST and webhook API.</p>
        </FadeInView>
        <FadeInView className="min-w-0" direction="left" delay={0.1}>
          <div className="hbl-pr-panel overflow-hidden px-6 py-12 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,107,61,0.14),transparent_65%)]" aria-hidden="true" />
            <AnimatedBeam sources={sources} hub={hub} output={output} color="#ff6b3d" duration={3.2} curvature={0.55} />
            <div className="relative mt-10 flex flex-wrap justify-center gap-2">
              {["Issues", "Pull requests", "Deploys", "Events", "Tickets"].map((t) => (
                <span key={t} className="hbl-pr-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
