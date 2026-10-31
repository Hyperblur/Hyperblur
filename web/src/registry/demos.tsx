import type { ReactNode } from "react";
import { GlitchText } from "@/registry/hyperblur/glitch-text";
import { MotionBlurText } from "@/registry/hyperblur/motion-blur-text";
import { SpeedLines } from "@/registry/hyperblur/speed-lines";
import { Scanlines } from "@/registry/hyperblur/scanlines";
import { ChromaticHover } from "@/registry/hyperblur/chromatic-hover";
import { PixelReveal } from "@/registry/hyperblur/pixel-reveal";
import { DecodeText } from "@/registry/hyperblur/decode-text";
import { NeonText } from "@/registry/hyperblur/neon-text";
import { WaveText } from "@/registry/hyperblur/wave-text";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { ShutterReveal } from "@/registry/hyperblur/shutter-reveal";
import { GridFloor } from "@/registry/hyperblur/grid-floor";
import { FilmGrain } from "@/registry/hyperblur/film-grain";
import { VhsOverlay } from "@/registry/hyperblur/vhs-overlay";
import { DotGrid } from "@/registry/hyperblur/dot-grid";
import { GlowBorder } from "@/registry/hyperblur/glow-border";
import { RippleClick } from "@/registry/hyperblur/ripple-click";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Marquee } from "@/registry/hyperblur/marquee";
import { Aurora } from "@/registry/hyperblur/aurora";
import { Typewriter } from "@/registry/hyperblur/typewriter";
import { GradientText } from "@/registry/hyperblur/gradient-text";
import { CountUp } from "@/registry/hyperblur/count-up";
import { Dock } from "@/registry/hyperblur/dock";
import { PillNav } from "@/registry/hyperblur/pill-nav";
import { Accordion } from "@/registry/hyperblur/accordion";
import { Carousel } from "@/registry/hyperblur/carousel";
import { Stepper } from "@/registry/hyperblur/stepper";
import { ImageCompare } from "@/registry/hyperblur/image-compare";
import { Masonry } from "@/registry/hyperblur/masonry";
import { AnimatedList } from "@/registry/hyperblur/animated-list";
import { BentoGrid, BentoCard } from "@/registry/hyperblur/bento-grid";
import { SpringToggle } from "@/registry/hyperblur/spring-toggle";
import { SegmentedControl } from "@/registry/hyperblur/segmented-control";
import { HoldButtonDemo } from "@/registry/demos/hold-button-demo";
import { Tooltip } from "@/registry/hyperblur/tooltip";
import { ScrubField } from "@/registry/hyperblur/scrub-field";
import { FlipCard } from "@/registry/hyperblur/flip-card";
import { LatticeLoader } from "@/registry/hyperblur/lattice-loader";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { ToastStackDemo } from "@/registry/demos/toast-stack-demo";
import { FeaturesSection } from "@/registry/hyperblur/features-section";
import { TestimonialsSection } from "@/registry/hyperblur/testimonials-section";
import { FaqSection } from "@/registry/hyperblur/faq-section";
import { CtaBanner } from "@/registry/hyperblur/cta-banner";
import { Plasma } from "@/registry/hyperblur/plasma";
import { Particles } from "@/registry/hyperblur/particles";
import { LightRays } from "@/registry/hyperblur/light-rays";
import { Beams } from "@/registry/hyperblur/beams";
import { Hyperspeed } from "@/registry/hyperblur/hyperspeed";
import { Silk } from "@/registry/hyperblur/silk";
import { HeroSection } from "@/registry/hyperblur/hero-section";
import { PricingSection } from "@/registry/hyperblur/pricing-section";
import { LoginCard } from "@/registry/hyperblur/login-card";

const display = "font-display text-4xl font-bold uppercase tracking-wide";

function thumb(node: ReactNode) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="origin-top-left scale-[0.34]" style={{ width: 960 }}>
        {node}
      </div>
    </div>
  );
}

export const demos: Record<string, ReactNode> = {
  "glitch-text": <GlitchText text="GLITCH" className={display} />,
  "motion-blur-text": (
    <MotionBlurText text="HYPER" trigger="hover" className={`${display} text-blue`} />
  ),
  "speed-lines": (
    <div className="relative h-full w-full">
      <SpeedLines />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>SPEED</div>
    </div>
  ),
  scanlines: (
    <div className="relative h-full w-full bg-gradient-to-br from-[#2a2a2a] to-bg">
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>CRT</div>
      <Scanlines />
    </div>
  ),
  "chromatic-hover": (
    <ChromaticHover>
      <span className={display}>HOVER ME</span>
    </ChromaticHover>
  ),
  "pixel-reveal": (
    <PixelReveal>
      <span className={`${display} px-4 py-2 text-blue`}>REVEAL</span>
    </PixelReveal>
  ),
  "decode-text": <DecodeText text="DECRYPT" trigger="hover" className={`${display} text-blue`} />,
  "neon-text": <NeonText text="NEON" className={display} />,
  "wave-text": <WaveText text="WAVE" className={display} />,
  magnetic: (
    <Magnetic>
      <span className={`${display} inline-block rounded-md border border-white/20 px-6 py-3`}>PULL</span>
    </Magnetic>
  ),
  "tilt-card": (
    <TiltCard className="rounded-xl">
      <div className={`${display} rounded-xl border border-white/20 bg-white/5 px-8 py-10`}>TILT</div>
    </TiltCard>
  ),
  "shutter-reveal": (
    <ShutterReveal trigger="hover">
      <span className={`${display} px-4 py-2`}>SHUTTER</span>
    </ShutterReveal>
  ),
  "grid-floor": (
    <div className="relative h-full w-full">
      <GridFloor />
      <div className={`${display} absolute inset-0 flex items-start justify-center pt-8`}>GRID</div>
    </div>
  ),
  "film-grain": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#2a2a2a] to-bg">
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>GRAIN</div>
      <FilmGrain opacity={0.3} />
    </div>
  ),
  "vhs-overlay": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#2a2a2a] to-bg">
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>VHS</div>
      <VhsOverlay />
    </div>
  ),
  "dot-grid": (
    <div className="relative h-full w-full">
      <DotGrid />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>DOTS</div>
    </div>
  ),
  "glow-border": (
    <GlowBorder className="bg-white/5">
      <div className={`${display} px-8 py-10`}>GLOW</div>
    </GlowBorder>
  ),
  "ripple-click": (
    <RippleClick className="rounded-full border border-white/20 bg-white/5">
      <span className={`${display} inline-block cursor-pointer select-none px-8 py-3`}>RIPPLE</span>
    </RippleClick>
  ),
  "fade-in-view": (
    <FadeInView direction="up" once={false}>
      <span className={display}>REVEAL</span>
    </FadeInView>
  ),
  marquee: (
    <Marquee className={display} gap={48}>
      <span>FAST</span>
      <span>LOOP</span>
      <span>SMOOTH</span>
      <span>ENDLESS</span>
      <span>SLIDE</span>
    </Marquee>
  ),
  aurora: (
    <div className="relative h-full w-full">
      <Aurora />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>AURORA</div>
    </div>
  ),
  typewriter: <Typewriter words={["DESIGN", "BUILD", "SHIP"]} className={`${display} text-blue`} />,
  "gradient-text": <GradientText text="GRADIENT" className={display} />,
  "count-up": <CountUp to={12480} suffix="+" className={`${display} text-blue`} />,
  dock: (
    <Dock
      size={40}
      magnification={1.7}
      items={[
        { id: "circle", label: "Circle", icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="8" /></svg> },
        { id: "square", label: "Square", icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" /></svg> },
        { id: "triangle", label: "Triangle", icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l10 18H2z" /></svg> },
        { id: "diamond", label: "Diamond", icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l10 10-10 10L2 12z" /></svg> },
        { id: "ring", label: "Ring", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><circle cx="12" cy="12" r="7" /></svg> },
      ]}
    />
  ),
  "pill-nav": (
    <PillNav
      defaultActive="home"
      items={[
        { id: "home", label: "Home" },
        { id: "work", label: "Work" },
        { id: "about", label: "About" },
        { id: "contact", label: "Contact" },
      ]}
    />
  ),
  accordion: (
    <div className="w-full max-w-sm px-6 text-sm">
      <Accordion
        defaultOpen={["one"]}
        items={[
          { id: "one", title: "What is it?", content: "A copy-paste component with no dependencies." },
          { id: "two", title: "How do I use it?", content: "Install it and pass an items array." },
        ]}
      />
    </div>
  ),
  carousel: (
    <div className="h-28 w-full max-w-xs">
      <Carousel className="h-full rounded-xl" gap={12}>
        <div className="flex items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-[#1b2a6b] to-[#2f7bff]">
          <span className={display}>ONE</span>
        </div>
        <div className="flex items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-[#5b1b6b] to-[#ff2fa0]">
          <span className={display}>TWO</span>
        </div>
        <div className="flex items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-[#0f4b52] to-[#19c3f5]">
          <span className={display}>THREE</span>
        </div>
      </Carousel>
    </div>
  ),
  stepper: (
    <div className="w-full max-w-sm px-4">
      <Stepper
        steps={[
          { id: "account", title: "Account", content: <p className="text-sm text-white/70">Pick a username.</p> },
          { id: "plan", title: "Plan", content: <p className="text-sm text-white/70">Choose how you want to pay.</p> },
          { id: "done", title: "Done", content: <p className="text-sm text-white/70">You are all set.</p> },
        ]}
      />
    </div>
  ),
  "image-compare": (
    <div className="w-full max-w-xs">
      <ImageCompare
        className="h-32 rounded-xl border border-white/20"
        before={
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2a2a2a] to-[#555]">
            <span className={display}>RAW</span>
          </div>
        }
        after={
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1b2a6b] to-[#2f7bff]">
            <span className={display}>GRADED</span>
          </div>
        }
      />
    </div>
  ),
  masonry: (
    <Masonry columns={3} gap={8} stagger={0.06} className="w-full max-w-xs">
      <div className="h-10 rounded-md bg-blue/70" />
      <div className="h-16 rounded-md bg-white/15" />
      <div className="h-12 rounded-md bg-white/10" />
      <div className="h-14 rounded-md bg-white/20" />
      <div className="h-9 rounded-md bg-blue/40" />
      <div className="h-11 rounded-md bg-white/10" />
    </Masonry>
  ),
  "animated-list": (
    <AnimatedList className="max-w-[220px]" maxHeight={150} initialSelected={0} items={["Profile", "Billing", "Team", "Sign out"]} />
  ),
  "bento-grid": (
    <BentoGrid columns={3} gap={8} rowHeight={56} className="max-w-xs">
      <BentoCard colSpan={2} title="Fast" />
      <BentoCard rowSpan={2} title="Tall" />
      <BentoCard title="Tiny" />
      <BentoCard title="Neat" />
    </BentoGrid>
  ),
  "hold-button": <HoldButtonDemo />,
  "spring-toggle": <SpringToggle label="Notifications" size="lg" defaultChecked />,
  "segmented-control": (
    <SegmentedControl
      aria-label="View"
      defaultValue="week"
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
    />
  ),
  tooltip: (
    <Tooltip content="Follows the pointer">
      <button type="button" className={`${display} cursor-pointer rounded-md border border-white/20 bg-white/5 px-6 py-3`}>
        HOVER
      </button>
    </Tooltip>
  ),
  "scrub-field": <ScrubField label="Width" defaultValue={50} min={0} max={100} suffix="px" />,
  "flip-card": <FlipCard front={<span className={display}>FLIP</span>} back={<span className={`${display} text-blue`}>BACK</span>} />,
  "toast-stack": <ToastStackDemo />,
  "lattice-loader": (
    <div className="flex items-center gap-10">
      <LatticeLoader size={44} />
      <LatticeLoader size={44} shape="ring" />
      <LatticeLoader size={44} shape="bars" />
    </div>
  ),
  "star-rating": <StarRating defaultValue={3.5} precision={0.5} size={32} />,
  "features-section": thumb(<FeaturesSection />),
  "testimonials-section": thumb(<TestimonialsSection />),
  "faq-section": thumb(<FaqSection />),
  "cta-banner": thumb(<CtaBanner />),
  plasma: (
    <div className="relative h-full w-full">
      <Plasma />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>PLASMA</div>
    </div>
  ),
  particles: (
    <div className="relative h-full w-full">
      <Particles />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>PARTICLES</div>
    </div>
  ),
  "light-rays": (
    <div className="relative h-full w-full">
      <LightRays />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>RAYS</div>
    </div>
  ),
  beams: (
    <div className="relative h-full w-full">
      <Beams />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>BEAMS</div>
    </div>
  ),
  hyperspeed: (
    <div className="relative h-full w-full">
      <Hyperspeed />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>WARP</div>
    </div>
  ),
  silk: (
    <div className="relative h-full w-full">
      <Silk />
      <div className={`${display} absolute inset-0 flex items-center justify-center`}>SILK</div>
    </div>
  ),
  "hero-section": thumb(<HeroSection />),
  "pricing-section": thumb(<PricingSection />),
  "login-card": thumb(<LoginCard />),
};
