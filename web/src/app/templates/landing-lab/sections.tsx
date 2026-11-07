import { DecodeText } from "@/registry/hyperblur/decode-text";
import { GlitchText } from "@/registry/hyperblur/glitch-text";
import { CountUp } from "@/registry/hyperblur/count-up";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Mark, ArrowRight } from "./icons";
import { Shelf } from "./shelf";
import { CityStudy } from "./city";
import { RequestForm } from "./request";
import { Replay } from "./replay";

export function Nav() {
  return (
    <header className="hbl-lb-nav">
      <div className="hbl-lb-wrap flex h-14 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Vector Lab home">
          <Mark className="h-5 w-5" />
          <span className="font-grotesk text-[14px] font-medium tracking-[0.14em] text-[#eef1f6]">VECTOR/LAB</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          <a href="#shelf" className="hbl-lb-navlink">Shelf</a>
          <a href="#featured" className="hbl-lb-navlink">Featured</a>
          <a href="#process" className="hbl-lb-navlink">Process</a>
          <a href="#request" className="hbl-lb-navlink">Request</a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="hbl-lb-label hidden lg:inline">
            <span className="hbl-lb-dot mr-2" aria-hidden="true" />
            Uplink stable
          </span>
          <a href="#shelf" className="hbl-lb-btn hbl-lb-btn-red hbl-lb-btn-sm">Browse the shelf</a>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="hbl-lb-grid hbl-lb-mask pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[520px] w-[980px] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,77,77,0.10),rgba(255,77,77,0))]"
        aria-hidden="true"
      />
      <div className="hbl-lb-wrap pb-20 pt-6 sm:pt-8">
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-3">
          <p className="hbl-lb-label">VL / Shelf OS 4.2</p>
          <p className="hbl-lb-label hidden sm:block">Last build 2026.11.04 · 48 studies</p>
          <p className="hbl-lb-label">
            <span className="hbl-lb-dot mr-2" aria-hidden="true" />
            Online
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-[860px] flex-col items-center text-center sm:mt-20">
          <p className="hbl-lb-kicker">
            <Replay>
              <DecodeText text="Free shelf · 48 studies · MIT" duration={0.8} stagger={0.025} glyphs="01/#<>+=XYZ" />
            </Replay>
          </p>
          <h1 className="hbl-lb-h1 mt-6">
            Experiments you
            <br />
            can{" "}
            <GlitchText text="take apart." intensity={1} speed={0.6} colors={["#ff4d4d", "#5eead4"]} />
          </h1>
          <p className="hbl-lb-copy mt-6 max-w-[580px] text-[16px] sm:text-[17px]">
            Vector Lab is a small studio&apos;s open shelf of web tools and 3D studies. Every piece runs in the browser, ships with its source, and costs nothing to take home.
          </p>
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a href="#shelf" className="hbl-lb-btn hbl-lb-btn-red w-full sm:w-auto">
              Browse the shelf
            </a>
            <a href="#request" className="hbl-lb-btn w-full sm:w-auto">
              Request a study
            </a>
          </div>
        </div>

        <div className="relative mt-14 sm:mt-16">
          <div className="pointer-events-none absolute -left-1 top-0 hidden flex-col gap-2 xl:flex" aria-hidden="true">
            <span className="hbl-lb-label [writing-mode:vertical-rl]">Orbit 01 · R 430</span>
          </div>
          <div className="pointer-events-none absolute -right-1 top-0 hidden flex-col gap-2 xl:flex" aria-hidden="true">
            <span className="hbl-lb-label [writing-mode:vertical-rl]">Shelf 04 · Season 2026</span>
          </div>
          <Shelf />
        </div>
      </div>
    </section>
  );
}

export function Featured() {
  const specs = [
    ["Seed", "One integer, 206 blocks"],
    ["Replay", "60 fps, pauses off-screen"],
    ["Light", "24-hour sun and window model"],
    ["Weight", "15 kb, zero dependencies"],
  ];
  return (
    <section id="featured" className="relative scroll-mt-16 border-t border-white/[0.07] py-24">
      <div className="hbl-lb-dots pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div className="hbl-lb-wrap grid gap-10 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:gap-12">
        <FadeInView className="min-w-0" distance={20}>
          <p className="hbl-lb-kicker">Featured study / VL-027</p>
          <h2 className="hbl-lb-h2 mt-5">Night Grid</h2>
          <p className="hbl-lb-copy mt-5 text-[15.5px]">
            A whole city from a single number. Blocks rise from a hash, a river cuts the grid, and a courier route replays as the lights come on. Drag the clock and watch the windows wake up.
          </p>
          <dl className="mt-7 border-t border-white/[0.07]">
            {specs.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] py-2.5">
                <dt className="hbl-lb-label">{k}</dt>
                <dd className="text-right font-mono text-[12.5px] text-[#d9dee8]">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#request" className="hbl-lb-btn hbl-lb-btn-red">Take the source</a>
            <a href="#shelf" className="hbl-lb-btn">Back to shelf</a>
          </div>
        </FadeInView>
        <FadeInView className="min-w-0" distance={30} delay={0.1}>
          <CityStudy />
        </FadeInView>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    t: "Browse",
    d: "Spin the ring, filter by kind and open any study right in the page. Nothing to install first.",
  },
  {
    n: "02",
    t: "Inspect",
    d: "Every study lists its size, stack and build. No accounts, no trackers, no email wall.",
  },
  {
    n: "03",
    t: "Take the source",
    d: "Copy one file or pull it with a single command. MIT licensed; credit is welcome, never required.",
  },
  {
    n: "04",
    t: "Remix and ship",
    d: "Fork it into your product. Make something good with it and we will put it on the next shelf.",
  },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-16 border-t border-white/[0.07] py-24">
      <div className="hbl-lb-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="hbl-lb-kicker">Process</p>
            <h2 className="hbl-lb-h2 mt-5 max-w-[560px]">How the shelf works</h2>
          </div>
          <p className="hbl-lb-copy max-w-[380px] text-[15px]">
            Four steps from a spinning card to code in your repository. The whole loop takes about a minute.
          </p>
        </div>
        <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className="min-w-0">
              <FadeInView className="hbl-lb-step h-full" delay={i * 0.08} distance={16}>
                <div className="flex items-center justify-between">
                  <span className="hbl-lb-step-n">{s.n}</span>
                  {i < steps.length - 1 ? <ArrowRight className="hidden h-4 w-4 text-[#4b5260] lg:block" /> : <span className="hbl-lb-dot hbl-lb-dot-red" aria-hidden="true" />}
                </div>
                <h3 className="mt-5 font-grotesk text-[20px] font-medium tracking-[-0.01em] text-[#eef1f6]">{s.t}</h3>
                <p className="hbl-lb-copy mt-2 text-[14.5px]">{s.d}</p>
              </FadeInView>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const stats = [
  { to: 48, suffix: "", label: "Studies on the shelf", note: "Two new every month" },
  { to: 212, suffix: "k", label: "Runs last month", note: "Counted without cookies" },
  { to: 14, suffix: " kb", label: "Median study size", note: "Gzipped, no dependencies" },
  { to: 37, suffix: "", label: "Community remixes", note: "Sent back to the shelf" },
];

export function Stats() {
  return (
    <section className="border-t border-white/[0.07] py-20">
      <div className="hbl-lb-wrap">
        <div className="grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="min-w-0 bg-[#05070b] p-5 sm:p-7">
              <p className="hbl-lb-label">{s.label}</p>
              <p className="hbl-lb-stat-v mt-4 tabular-nums">
                <CountUp to={s.to} suffix={s.suffix} duration={1.8} />
              </p>
              <div className="hbl-lb-tick mt-5" aria-hidden="true" />
              <p className="mt-3 font-mono text-[11px] text-[#5b6372]">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const queue = [
  { id: "VL-R-0398", t: "Audio-reactive floor grid", s: "Building", c: "text-[#ff4d4d]" },
  { id: "VL-R-0402", t: "Offline waypoint pins", s: "Queued", c: "text-[#7a8394]" },
  { id: "VL-R-0405", t: "Depth-of-field card stack", s: "Shipped", c: "text-[#5eead4]" },
];

export function Request() {
  return (
    <section id="request" className="scroll-mt-16 border-t border-white/[0.07] py-24">
      <div className="hbl-lb-wrap grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <FadeInView className="min-w-0" distance={20}>
          <p className="hbl-lb-kicker">Request line</p>
          <h2 className="hbl-lb-h2 mt-5">What should we make next?</h2>
          <p className="hbl-lb-copy mt-5 max-w-[460px] text-[15.5px]">
            We build one new study every two weeks, and about half of them start as a note sent through this form. Tell us the tool you keep wishing existed.
          </p>
          <div className="mt-8 border-t border-white/[0.07]">
            <p className="hbl-lb-label pt-4">Recent requests</p>
            <ul className="mt-3">
              {queue.map((q) => (
                <li key={q.id} className="flex items-baseline gap-3 border-b border-white/[0.07] py-2.5 font-mono text-[12px]">
                  <span className="shrink-0 text-[#5b6372]">{q.id}</span>
                  <span className="min-w-0 flex-1 truncate text-[#d9dee8]">{q.t}</span>
                  <span className={`shrink-0 uppercase tracking-[0.14em] ${q.c}`}>{q.s}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInView>
        <FadeInView className="min-w-0" distance={30} delay={0.1}>
          <RequestForm />
        </FadeInView>
      </div>
    </section>
  );
}

const footerCols = [
  { h: "Shelf", l: ["XR studies", "Map studies", "Tools", "Graphics"] },
  { h: "Studio", l: ["About", "Process", "Changelog", "Press kit"] },
  { h: "Elsewhere", l: ["GitHub", "RSS feed", "Newsletter", "Mastodon"] },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] pt-16">
      <div className="hbl-lb-wrap">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <Mark className="h-5 w-5" />
              <span className="font-grotesk text-[14px] font-medium tracking-[0.14em] text-[#eef1f6]">VECTOR/LAB</span>
            </div>
            <p className="hbl-lb-copy mt-4 max-w-[320px] text-[14px]">
              A free shelf of experimental web tools, made by a studio of three in a converted print shop in Rotterdam.
            </p>
            <a href="#shelf" className="hbl-lb-btn hbl-lb-btn-red hbl-lb-btn-sm mt-6">Browse the shelf</a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerCols.map((c) => (
              <div key={c.h} className="min-w-0">
                <p className="hbl-lb-label">{c.h}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.l.map((l) => (
                    <li key={l}>
                      <a href="#top" className="text-[14px] text-[#a6adbb] transition-colors hover:text-white">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p
          className="pointer-events-none mt-16 select-none text-center font-grotesk text-[clamp(56px,15vw,200px)] font-medium leading-[0.8] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(217,222,232,0.12)]"
          aria-hidden="true"
        >
          VECTOR/LAB
        </p>
      </div>
      <div className="hbl-lb-glow-line" aria-hidden="true" />
      <div className="hbl-lb-wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
        <p className="hbl-lb-label">
          <span className="hbl-lb-dot mr-2" aria-hidden="true" />
          All systems nominal
        </p>
        <p className="hbl-lb-label hidden md:block">Shelf 04 · 48 studies · Build 2026.11</p>
        <p className="hbl-lb-label">© 2026 Vector Lab · MIT</p>
      </div>
    </footer>
  );
}
