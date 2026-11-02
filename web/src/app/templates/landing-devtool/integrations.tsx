import { AnimatedBeam } from "@/registry/hyperblur/animated-beam";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Corners, ForgeMark, Glyph, SectionHead } from "./icons";

const branch = (
  <Glyph className="h-full w-full">
    <circle cx="6" cy="5" r="2" />
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="8" r="2" />
    <path d="M6 7v10" />
    <path d="M18 10c0 4-6 3-11 7" />
  </Glyph>
);
const merge = (
  <Glyph className="h-full w-full">
    <circle cx="6" cy="5" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="M6 7v12" />
    <path d="M6 9c0 5 5 9 10 9" />
  </Glyph>
);
const box = (
  <Glyph className="h-full w-full">
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
    <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
  </Glyph>
);
const chat = (
  <Glyph className="h-full w-full">
    <path d="M4 5h16v11H9l-5 4z" />
    <path d="M8 10h8" />
  </Glyph>
);
const globe = (
  <Glyph className="h-full w-full">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c3 3 3 15 0 18c-3-3-3-15 0-18z" />
  </Glyph>
);

const chips = [
  "GitHub",
  "GitLab",
  "Bitbucket",
  "pnpm workspaces",
  "Nx",
  "Turborepo",
  "Next.js",
  "Remix",
  "Astro",
  "Vite",
  "Bun",
  "Slack",
  "Linear",
  "Sentry",
  "Datadog",
  "OpenTelemetry",
];

export function Integrations() {
  return (
    <section className="hbl-dv-rule relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <FadeInView>
          <SectionHead
            center
            label="Integrations"
            title="Plugs into the stack you already run."
            body="Forge reads from your git host, your workspace config and your registry, then reports back to the places your team already looks."
          />
        </FadeInView>

        <FadeInView delay={0.1} className="mt-16">
          <div className="relative">
            <Corners />
            <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0d0d0e]">
              <div className="hbl-dv-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="relative mx-auto max-w-[820px] px-6 py-12 sm:px-12 sm:py-16">
                <div className="hbl-dv-beam h-[240px] sm:h-[340px]">
                  <AnimatedBeam
                    className="h-full"
                    color="#a3e635"
                    duration={2.8}
                    curvature={0.55}
                    sources={[
                      { icon: branch, label: "Git hosts" },
                      { icon: merge, label: "Monorepo tools" },
                      { icon: box, label: "Package registry" },
                      { icon: chat, label: "Team chat" },
                    ]}
                    hub={{ icon: <ForgeMark className="h-1/2 w-1/2" />, label: "Forge" }}
                    output={{ icon: globe, label: "Edge network" }}
                  />
                </div>
                <div className="mt-6 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#6f6f69]">
                  <span>Sources</span>
                  <span className="text-[#a3e635]">forge</span>
                  <span>Edge</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>

        <FadeInView delay={0.15} className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {chips.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 font-mono text-[12px] text-[#a3a39b] transition-colors hover:border-[#a3e635]/40 hover:text-[#f4f4f0]"
              >
                {c}
              </li>
            ))}
          </ul>
        </FadeInView>
      </div>
    </section>
  );
}
