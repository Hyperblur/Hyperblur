import type { ReactNode } from "react";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { PixelReveal } from "@/registry/hyperblur/pixel-reveal";
import { ImageCompare } from "@/registry/hyperblur/image-compare";
import { ChromaticHover } from "@/registry/hyperblur/chromatic-hover";
import { BlobCursor } from "@/registry/hyperblur/blob-cursor";
import { SplitText } from "@/registry/hyperblur/split-text";
import { InView } from "./in-view";
import { ArrowIcon } from "./icons";
import { BiennaleArt, HaldenArt, KettleAfter, KettleBefore, LowTideArt, MiraArt, NorthlineArt } from "./work-art";

type Case = {
  n: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  result: string;
  scope: string;
  art: ReactNode;
  aspect: string;
  layout: string;
};

const cases: Case[] = [
  {
    n: "01",
    title: "A roastery that tastes like it looks",
    client: "Halden Coffee",
    year: "2026",
    tags: ["Identity", "Packaging", "Shopify"],
    scope: "Naming system, 14 bag designs, wholesale site",
    result: "+42% wholesale accounts in six months",
    art: <HaldenArt />,
    aspect: "4 / 3",
    layout: "md:col-span-7",
  },
  {
    n: "02",
    title: "Wayfinding for 212 stations",
    client: "Northline Rail",
    year: "2025",
    tags: ["Wayfinding", "Website", "Type"],
    scope: "Signage system, custom typeface, journey planner",
    result: "Ticket desk queries down 31%",
    art: <NorthlineArt />,
    aspect: "4 / 5",
    layout: "md:col-span-5 md:mt-28",
  },
  {
    n: "03",
    title: "Healthcare with a softer voice",
    client: "Mira Health",
    year: "2025",
    tags: ["Brand", "App UI", "Motion"],
    scope: "Verbal identity, app redesign, onboarding film",
    result: "4.8 App Store rating, up from 3.9",
    art: <MiraArt />,
    aspect: "4 / 5",
    layout: "md:col-span-5",
  },
  {
    n: "04",
    title: "A station you can hear in the logo",
    client: "Low Tide Radio",
    year: "2024",
    tags: ["Identity", "Motion", "Sound"],
    scope: "Generative logo driven by the live broadcast",
    result: "Listeners up 2.3x in year one",
    art: <LowTideArt />,
    aspect: "4 / 3",
    layout: "md:col-span-7 md:mt-36",
  },
];

const biennale: Case = {
  n: "06",
  title: "Forty years old, finally loud",
  client: "Oslo Ceramics Biennale",
  year: "2026",
  tags: ["Campaign", "Website"],
  scope: "Poster system, exhibition site, ticketing",
  result: "Ticket sales +38% in the first season",
  art: <BiennaleArt />,
  aspect: "3 / 4",
  layout: "md:col-span-4 md:mt-44",
};

function CaseMeta({ item }: { item: Case }) {
  return (
    <div className="mt-6 flex items-start gap-5">
      <ChromaticHover strength={3} className="hbl-ag-numeral shrink-0 text-[52px] sm:text-[64px]">
        <span aria-hidden="true">{item.n}</span>
      </ChromaticHover>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-muted">
          {item.client} · {item.year}
        </p>
        <h3 className="hbl-ag-case-title mt-1.5 font-grotesk text-xl font-medium leading-snug tracking-[-0.025em] sm:text-2xl">
          {item.title}
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="hbl-ag-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <a href="#contact" className="hbl-ag-arrow" aria-label={`Ask about the ${item.client} project`}>
        <ArrowIcon size={16} />
      </a>
    </div>
  );
}

function Detail({ item }: { item: Case }) {
  return (
    <div className="hbl-ag-detail">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] opacity-60">Scope</p>
      <p className="mt-1 text-sm font-medium">{item.scope}</p>
      <p className="mt-3 font-grotesk text-lg font-bold tracking-[-0.02em] text-[#c2321a]">{item.result}</p>
    </div>
  );
}

function Thumb({ item, delay }: { item: Case; delay: number }) {
  return (
    <TiltCard maxTilt={4} scale={1.01} perspective={1200} className="w-full rounded-[6px]" style={{ display: "block" }}>
      <InView>
        <PixelReveal rows={6} cols={8} duration={0.8 + delay} color="#ff4f2e" className="w-full overflow-hidden rounded-[6px]" style={{ display: "block" }}>
          <div className="hbl-ag-thumb" style={{ aspectRatio: item.aspect }}>
            <div className="hbl-ag-art">{item.art}</div>
            <Detail item={item} />
          </div>
        </PixelReveal>
      </InView>
    </TiltCard>
  );
}

function CaseCard({ item, index }: { item: Case; index: number }) {
  return (
    <article className={`hbl-ag-case ${item.layout}`}>
      <FadeInView distance={40} delay={(index % 2) * 0.12}>
        <Thumb item={item} delay={(index % 2) * 0.2} />
        <CaseMeta item={item} />
      </FadeInView>
    </article>
  );
}

export function AgencyWork() {
  const kettle: Case = {
    n: "05",
    title: "A sixty-year-old rebrand, drag to compare",
    client: "Kettle & Crane",
    year: "2024",
    tags: ["Rebrand", "Retail", "E-commerce"],
    scope: "Identity, 38 store fronts, online shop",
    result: "Online revenue +64% year over year",
    art: null,
    aspect: "16 / 9",
    layout: "md:col-span-8",
  };

  return (
    <section id="work" className="relative overflow-hidden border-b hbl-ag-rule py-24 md:py-36">
      <div className="hbl-ag-wrap relative">
        <div className="grid gap-8 border-b hbl-ag-rule pb-12 md:grid-cols-12 md:items-end md:gap-0">
          <div className="min-w-0 md:col-span-8">
            <p className="hbl-ag-kicker">Selected work · 2024 – 2026</p>
            <h2 className="mt-6 font-grotesk text-[clamp(48px,8vw,128px)] font-bold uppercase leading-[0.86] tracking-[-0.05em]">
              <span className="sr-only">Work that made noise</span>
              <span aria-hidden="true">
                <SplitText text="Work that" by="words" stagger={0.08} distance={40} />
                <br />
                <span className="hbl-ag-serif hbl-ag-red">made noise</span>
              </span>
            </h2>
          </div>
          <div className="min-w-0 md:col-span-4 md:pl-8">
            <p className="leading-relaxed hbl-ag-muted">
              Six projects from the last three years. Hover a project for the brief and the number that mattered to the client.
            </p>
            <p className="mt-6 hbl-ag-numeral text-[88px] text-[#ece8df]/15" aria-hidden="true">06</p>
          </div>
        </div>

        <div className="mt-16 grid gap-16 md:grid-cols-12 md:gap-x-10 md:gap-y-24">
          {cases.map((item, i) => (
            <CaseCard key={item.n} item={item} index={i} />
          ))}

          <article className={`hbl-ag-case ${kettle.layout}`}>
            <FadeInView distance={40}>
              <InView>
                <PixelReveal rows={6} cols={10} duration={1} color="#ff4f2e" className="w-full overflow-hidden rounded-[6px]" style={{ display: "block" }}>
                  <ImageCompare
                    initial={42}
                    labels={{ before: "2019", after: "2026" }}
                    before={<KettleBefore />}
                    after={<KettleAfter />}
                    className="rounded-[6px]"
                  />
                </PixelReveal>
              </InView>
              <CaseMeta item={kettle} />
              <p className="mt-4 text-sm hbl-ag-muted md:pl-[84px]">
                {kettle.scope}. <span className="text-[#ece8df]">{kettle.result}.</span>
              </p>
            </FadeInView>
          </article>

          <CaseCard item={biennale} index={1} />
        </div>
      </div>
      <BlobCursor color="#ece8df" size={44} lag={0.14} blend="difference" />
    </section>
  );
}
