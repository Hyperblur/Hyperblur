import { SplitText } from "@/registry/hyperblur/split-text";
import { CurtainReveal } from "@/registry/hyperblur/curtain-reveal";
import { RotatingText } from "@/registry/hyperblur/rotating-text";
import { FilmGrain } from "@/registry/hyperblur/film-grain";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ArrowIcon } from "./icons";

const disciplines = ["identity systems", "websites", "launch films", "naming", "packaging"];

function Badge() {
  return (
    <a href="#work" className="hbl-ag-badge" aria-label="See selected work">
      <svg className="hbl-ag-badge-ring" viewBox="0 0 132 132" aria-hidden="true">
        <defs>
          <path id="hbl-ag-badge-path" d="M66 66m-52 0a52 52 0 1 1 104 0a52 52 0 1 1-104 0" />
        </defs>
        <text fill="#ece8df" style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10.5, letterSpacing: "0.22em" }}>
          <textPath href="#hbl-ag-badge-path">SELECTED WORK 2014–2026 · ATLAS &amp; OAK · </textPath>
        </text>
      </svg>
      <span className="hbl-ag-badge-core">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14" />
          <path d="M6 13l6 6 6-6" />
        </svg>
      </span>
    </a>
  );
}

function Reel() {
  return (
    <div className="hbl-ag-reel">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="rgba(236,232,223,0.12)" strokeWidth="1">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="520" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 100 + 10} x2="1200" y2={i * 100 + 10} />
          ))}
        </g>
        <circle cx="860" cy="210" r="168" fill="none" stroke="#ece8df" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle cx="860" cy="210" r="96" fill="#0e0e0e" fillOpacity="0.85" />
        <text x="860" y="226" textAnchor="middle" fill="#ece8df" style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic", fontSize: 52 }}>
          reel
        </text>
        <text x="64" y="452" fill="#ece8df" style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 132, letterSpacing: "-0.06em" }}>
          A&amp;O ’26
        </text>
      </svg>
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-4 font-mono text-[11px] uppercase tracking-[0.08em] sm:p-6">
        <span className="flex items-center gap-2">
          <span className="hbl-ag-live" aria-hidden="true" />
          Showreel 2026
        </span>
        <span className="hbl-ag-muted">01:48</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-4 sm:gap-6 sm:p-6">
        <button type="button" className="hbl-ag-reel-play" aria-label="Play the 2026 showreel">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
          </svg>
        </button>
        <div className="relative h-px min-w-0 flex-1 bg-[#ece8df]/25">
          <span className="hbl-ag-scrub absolute inset-0 block bg-[#ece8df]" />
        </div>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] sm:inline">Halden · Northline · Mira · Low Tide</span>
      </div>
    </div>
  );
}

export function AgencyHero() {
  return (
    <section id="top" className="relative overflow-hidden border-b hbl-ag-rule">
      <div className="hbl-ag-glow" aria-hidden="true" />
      <FilmGrain opacity={0.1} />
      <div className="hbl-ag-wrap relative">
        <div className="hbl-ag-cols" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="relative pb-16 pt-14 sm:pb-20 sm:pt-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="hbl-ag-kicker">Independent brand &amp; web studio</p>
            <p className="font-mono text-xs uppercase tracking-[0.08em] hbl-ag-muted">Lisbon / Brooklyn · Est. 2014</p>
          </div>

          <h1 className="hbl-ag-hero-title mt-10 sm:mt-14">
            <span className="sr-only">Brands with nerve.</span>
            <span className="block" aria-hidden="true">
              <SplitText text="Brands" by="chars" stagger={0.05} duration={0.8} distance={60} trigger="mount" />
            </span>
            <span className="block md:pl-[12%]" aria-hidden="true">
              <CurtainReveal color="#ff4f2e" duration={1.1} delay={0.55} className="inline-block align-top">
                <span className="block pb-[0.08em] pr-[0.04em]">
                  <span className="hbl-ag-serif">with</span> nerve<span className="hbl-ag-red">.</span>
                </span>
              </CurtainReveal>
            </span>
          </h1>

          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-0">
            <FadeInView delay={0.9} className="min-w-0 md:col-span-2 md:pr-10">
              <p className="max-w-md text-lg leading-relaxed text-[#ece8df]/85 sm:text-xl">
                We are nine people who make{" "}
                <RotatingText words={disciplines} interval={2000} className="font-serif text-[1.18em] italic text-[#ff4f2e]" ariaPrefix="We make " />
                <br />
                for companies that would rather be remembered than liked.
              </p>
            </FadeInView>
            <FadeInView delay={1.05} className="min-w-0 md:pl-6">
              <dl className="grid grid-cols-2 gap-6 md:grid-cols-1">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-muted">Latest launch</dt>
                  <dd className="mt-1.5 font-grotesk text-base font-medium">Oslo Ceramics Biennale</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] hbl-ag-muted">Now booking</dt>
                  <dd className="mt-1.5 font-grotesk text-base font-medium">January – March 2027</dd>
                </div>
              </dl>
            </FadeInView>
            <FadeInView delay={1.2} className="flex min-w-0 items-end justify-between gap-6 md:flex-col md:items-end md:justify-start">
              <Badge />
              <a href="#contact" className="hbl-ag-link inline-flex items-center gap-2 text-sm">
                Book an intro call
                <ArrowIcon size={14} />
              </a>
            </FadeInView>
          </div>

          <FadeInView delay={0.2} distance={40} className="mt-16 sm:mt-20">
            <CurtainReveal trigger="view" direction="vertical" color="#161616" duration={1.2} delay={0.1} className="rounded-[6px]">
              <Reel />
            </CurtainReveal>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
