import type { CSSProperties, ReactNode } from "react";
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
import { SplitText } from "@/registry/hyperblur/split-text";
import { BlurText } from "@/registry/hyperblur/blur-text";
import { RotatingText } from "@/registry/hyperblur/rotating-text";
import { ScrollVelocityText } from "@/registry/hyperblur/scroll-velocity-text";
import { StrokeText } from "@/registry/hyperblur/stroke-text";
import { SplitFlapText } from "@/registry/hyperblur/split-flap-text";
import { BlobCursor } from "@/registry/hyperblur/blob-cursor";
import { ClickSpark } from "@/registry/hyperblur/click-spark";
import { CursorTrail } from "@/registry/hyperblur/cursor-trail";


const icons = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  bag: "M5 8h14l-1 12H6zM9 8V6.5a3 3 0 0 1 6 0V8",
  folder: "M3 7h6l2 2h10v10H3z",
  mail: "M3 6h18v12H3zM3.5 7l8.5 6 8.5-6",
  music: "M9 18V6l10-2v12M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM19 16a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z",
  camera: "M4 7h4l2-2h4l2 2h4v12H4zM12 9.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  bold: "M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z",
  link: "M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15.5 9h.01",
  comment: "M5 5h14v10H10l-5 4z",
  square: "M5 5h14v14H5z",
  circle: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z",
  type: "M5 6h14M12 6v13",
  play: "M8 5v14l11-7z",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18",
  bolt: "M13 3L5 14h6l-1 7 8-11h-6z",
  ring: "M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z",
};

const bg = {
  kyoto:
    "radial-gradient(45% 55% at 72% 38%, #ffd8a8 0%, rgba(255,216,168,0) 60%), radial-gradient(90% 80% at 10% 100%, #8a2f5c 0%, rgba(138,47,92,0) 65%), linear-gradient(180deg, #ff9a6b 0%, #c4507a 48%, #3a1d4f 100%)",
  album:
    "radial-gradient(60% 60% at 30% 30%, #ff8fc7 0%, rgba(255,143,199,0) 60%), radial-gradient(70% 70% at 80% 80%, #2f7bff 0%, rgba(47,123,255,0) 65%), linear-gradient(135deg, #2a0f3d, #0b1230)",
  cinema:
    "radial-gradient(40% 45% at 70% 58%, rgba(255,176,96,0.95) 0%, rgba(255,176,96,0) 70%), radial-gradient(80% 80% at 15% 25%, #14454f 0%, rgba(20,69,79,0) 70%), linear-gradient(180deg, #1c2f36 0%, #4a2a18 62%, #140c09 100%)",
  vhs:
    "radial-gradient(28% 30% at 50% 56%, #ffe0b0 0%, rgba(255,224,176,0) 70%), linear-gradient(180deg, #24164f 0%, #7b2f7a 35%, #e0607e 57%, #3a2a6b 57.5%, #160d33 100%)",
  poster:
    "radial-gradient(70% 90% at 100% 0%, #ff2fa0 0%, rgba(255,47,160,0) 60%), radial-gradient(80% 90% at 0% 100%, #2f7bff 0%, rgba(47,123,255,0) 60%), linear-gradient(135deg, #1a0b2e, #0a0a14)",
  card:
    "radial-gradient(120% 90% at 100% 0%, #5b8cff 0%, rgba(91,140,255,0) 50%), radial-gradient(90% 80% at 0% 100%, #19c3f5 0%, rgba(25,195,245,0) 55%), linear-gradient(135deg, #0b1d4d, #050b1f)",
  linen:
    "radial-gradient(70% 60% at 30% 25%, #f4e4c8 0%, rgba(244,228,200,0) 70%), linear-gradient(160deg, #d8bf96, #8a6e4b)",
  desktop:
    "radial-gradient(70% 90% at 85% 0%, #ff9a6b 0%, rgba(255,154,107,0) 55%), radial-gradient(80% 90% at 0% 30%, #6a3cff 0%, rgba(106,60,255,0) 60%), linear-gradient(180deg, #1b1446 0%, #0c0a1f 100%)",
  lisbon:
    "radial-gradient(50% 60% at 75% 30%, #ffd59e 0%, rgba(255,213,158,0) 65%), linear-gradient(180deg, #ffb38a 0%, #e0607e 55%, #4a2a5c 100%)",
  reykjavik:
    "radial-gradient(60% 50% at 30% 30%, #9be8ff 0%, rgba(155,232,255,0) 65%), linear-gradient(180deg, #2e6c8f 0%, #123a5a 55%, #08182a 100%)",
  marrakesh:
    "radial-gradient(50% 60% at 60% 35%, #ffe08a 0%, rgba(255,224,138,0) 60%), linear-gradient(180deg, #f29d4b 0%, #b5452f 55%, #3d1712 100%)",
  raw: "linear-gradient(180deg, #7d8186 0%, #9a9da1 46%, #55585c 46.5%, #2f3134 100%)",
  graded:
    "radial-gradient(34% 34% at 64% 44%, #ffe2b0 0%, rgba(255,226,176,0) 70%), linear-gradient(180deg, #1f3a74 0%, #ff8a5c 46%, #3a1f45 46.5%, #120c1c 100%)",
};

const tiles = [
  { h: 66, name: "Dune", bg: "radial-gradient(70% 60% at 70% 30%, #ffd59e, rgba(255,213,158,0) 70%), linear-gradient(180deg, #e8955a, #7a3a22)" },
  { h: 56, name: "Tide", bg: "radial-gradient(70% 60% at 30% 30%, #9be8ff, rgba(155,232,255,0) 70%), linear-gradient(180deg, #2b7fa8, #0c2a44)" },
  { h: 70, name: "Bloom", bg: "radial-gradient(70% 60% at 50% 40%, #ffb3d6, rgba(255,179,214,0) 70%), linear-gradient(180deg, #c2457a, #3a1240)" },
  { h: 48, name: "Moss", bg: "radial-gradient(70% 60% at 40% 30%, #c8ff9e, rgba(200,255,158,0) 70%), linear-gradient(180deg, #4f8a3a, #13261a)" },
  { h: 62, name: "Dusk", bg: "radial-gradient(70% 60% at 60% 30%, #c4b5fd, rgba(196,181,253,0) 70%), linear-gradient(180deg, #5b3fd0, #160f3a)" },
  { h: 54, name: "Steel", bg: "radial-gradient(70% 60% at 30% 30%, #e6ecf5, rgba(230,236,245,0) 70%), linear-gradient(180deg, #6b7a90, #1c222c)" },
];

const stars = [
  [8, 12, 1], [18, 30, 1.5], [27, 8, 1], [36, 22, 1], [47, 6, 1.5], [58, 18, 1], [66, 9, 1], [74, 28, 1.5], [83, 14, 1], [92, 24, 1], [12, 44, 1], [88, 40, 1],
];

const inbox = [
  { name: "Ada Park", color: "#2f7bff", time: "9:41", text: "Q4 roadmap draft is ready for review" },
  { name: "Omar Haddad", color: "#ff7a59", time: "9:12", text: "Pushed the checkout fixes to staging" },
  { name: "Lena Brooks", color: "#19b37d", time: "8:57", text: "Lunch at Rossio? Booking for four" },
  { name: "Kenji Mori", color: "#a855f7", time: "Mon", text: "Invoice #2041 has been paid" },
  { name: "Sara Lind", color: "#f5b301", time: "Sun", text: "New brand photos are in the drive" },
];

function Scene({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={style}>
      {children}
    </div>
  );
}

function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center px-5 text-center ${className}`}>
      {children}
    </div>
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 ${className}`}>{children}</span>;
}

function Photo({ bg: background, className = "", children }: { bg: string; className?: string; children?: ReactNode }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background }}>
      {children}
    </div>
  );
}

function Avatar({ name, color, size = 28 }: { name: string; color: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-sans font-semibold text-white ring-2 ring-bg"
      style={{ width: size, height: size, background: color, fontSize: Math.round(size * 0.38) }}
    >
      {initials}
    </span>
  );
}

function Icon({ d, className = "h-4 w-4", fill = false }: { d: string; className?: string; fill?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function AppIcon({ d, background, dark = false }: { d: string; background: string; dark?: boolean }) {
  return (
    <span className={`flex h-full w-full items-center justify-center rounded-[22%] ${dark ? "text-[#e8336d]" : "text-white"}`} style={{ background }}>
      <Icon d={d} className="h-1/2 w-1/2" />
    </span>
  );
}

function Hills({ fill, className = "h-10" }: { fill: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 60" preserveAspectRatio="none" className={`absolute inset-x-0 bottom-0 w-full ${className}`} aria-hidden="true">
      <path d="M0 38 Q 50 14 110 32 T 220 28 T 320 22 T 400 30 V60 H0Z" fill={fill} />
    </svg>
  );
}

function Corners() {
  const base = "absolute h-4 w-4 border-white/40";
  return (
    <>
      <span className={`${base} left-4 top-4 border-l border-t`} />
      <span className={`${base} right-4 top-4 border-r border-t`} />
      <span className={`${base} bottom-4 left-4 border-b border-l`} />
      <span className={`${base} bottom-4 right-4 border-b border-r`} />
    </>
  );
}

function thumb(node: ReactNode, { scale = 0.34, width = 960, y = 0 }: { scale?: number; width?: number; y?: number } = {}) {
  const transform = `translateX(calc(50cqw - ${(width * scale) / 2}px)) scale(${scale}) translateY(${-y}px)`;
  return (
    <div className="hb-thumb @container absolute inset-0 overflow-hidden">
      <div className="origin-top-left [transform:var(--hb-thumb)]" style={{ width, "--hb-thumb": transform } as CSSProperties}>
        {node}
      </div>
    </div>
  );
}

import { buttonsDemos } from "@/registry/parts/buttons.demos";
import { appUiDemos } from "@/registry/parts/app-ui.demos";
import { appUiMoreDemos } from "@/registry/parts/app-ui-more.demos";
import { agentKitDemos } from "@/registry/parts/agent-kit.demos";
import { transitionsDemos } from "@/registry/parts/transitions.demos";
import { socialDemos } from "@/registry/parts/social.demos";

const baseDemos: Record<string, ReactNode> = {
  "glitch-text": (
    <Scene
      style={{
        background:
          "radial-gradient(60% 80% at 12% 15%, rgba(255,47,160,0.18), rgba(255,47,160,0) 60%), radial-gradient(60% 80% at 88% 85%, rgba(25,195,245,0.18), rgba(25,195,245,0) 60%)",
      }}
    >
      <div className="absolute left-4 top-3.5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff2fa0]" />
        <Label>CH 07 · feed lost</Label>
      </div>
      <Label className="absolute right-4 top-3.5">03:14:07</Label>
      <Stage>
        <GlitchText text="OFFLINE" intensity={3} className="font-display text-5xl font-bold tracking-wider text-white" />
      </Stage>
      <div className="absolute inset-x-4 bottom-3.5 flex items-center justify-between">
        <Label>Node fra-02</Label>
        <Label className="text-[#19c3f5]/80">Retrying in 4s</Label>
      </div>
    </Scene>
  ),
  "motion-blur-text": (
    <Scene style={{ background: "radial-gradient(70% 60% at 50% 115%, rgba(47,123,255,0.4), rgba(47,123,255,0) 70%)" }}>
      <Stage className="gap-2">
        <span className="font-grotesk text-[11px] font-medium uppercase tracking-[0.32em] text-blue-soft">Model R · Launch mode</span>
        <MotionBlurText text="2.1 seconds" direction="left" distance={60} trigger="hover" className="font-serif text-5xl italic text-white" />
        <span className="font-mono text-[11px] text-white/45">0–100 km/h · 1,020 hp</span>
      </Stage>
    </Scene>
  ),
  "decode-text": (
    <Scene style={{ background: "linear-gradient(180deg, #05141c 0%, #0a0a0a 100%)" }}>
      <Stage className="gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#19c3f5]/40 bg-[#19c3f5]/10 text-[#19c3f5]">
          <Icon d={icons.lock} />
        </span>
        <DecodeText text="ACCESS GRANTED" trigger="hover" className="font-mono text-[26px] font-semibold tracking-[0.06em] text-[#7fe3ff]" />
        <Label>Key 7F3A · 91C2 · E04B</Label>
      </Stage>
    </Scene>
  ),
  "neon-text": (
    <Scene
      style={{
        background:
          "radial-gradient(70% 70% at 50% 45%, rgba(255,47,160,0.16), rgba(255,47,160,0) 70%), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, rgba(255,255,255,0) 1px 22px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, rgba(255,255,255,0) 1px 44px), #0b0709",
      }}
    >
      <Stage className="gap-2">
        <NeonText text="Open late" color="#ff2fa0" className="font-serif text-6xl italic" />
        <span className="font-grotesk text-[11px] uppercase tracking-[0.4em] text-white/55">Bar Lumen · Est. 1987</span>
      </Stage>
    </Scene>
  ),
  "wave-text": (
    <Scene style={{ background: "radial-gradient(120% 70% at 50% 125%, #0e6f8a 0%, rgba(14,111,138,0) 60%), linear-gradient(180deg, #06121c 0%, #0a0a0a 75%)" }}>
      <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-10 w-full" aria-hidden="true">
        <path d="M0 30 C 50 12 100 48 150 30 S 250 12 300 30 S 375 44 400 30 V60 H0Z" fill="rgba(25,195,245,0.10)" />
        <path d="M0 40 C 60 26 110 54 170 40 S 280 26 330 40 S 385 50 400 42 V60 H0Z" fill="rgba(25,195,245,0.14)" />
      </svg>
      <div className="absolute inset-x-4 top-3.5 flex justify-between">
        <Label>Malibu · Surfrider</Label>
        <Label className="text-[#19c3f5]">6–8 ft</Label>
      </div>
      <Stage className="gap-2">
        <WaveText text="Surf's up" amplitude={9} className="font-grotesk text-5xl font-semibold tracking-tight text-white" />
        <span className="font-mono text-[11px] text-white/50">14 s period · offshore · 18°C</span>
      </Stage>
    </Scene>
  ),
  typewriter: (
    <Scene style={{ background: "radial-gradient(80% 60% at 50% 0%, rgba(47,123,255,0.18), rgba(47,123,255,0) 70%)" }}>
      <Stage>
        <div className="w-full max-w-[300px] overflow-hidden rounded-xl border border-white/10 bg-[#0e0e10] text-left shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[10px] text-white/40">~/studio — zsh</span>
          </div>
          <div className="space-y-1.5 px-4 py-3 font-mono">
            <div className="text-[11px] text-white/40">$ npx shadcn add</div>
            <div className="text-xl text-white">
              <span className="text-blue-soft">@hyperblur/</span>
              <Typewriter words={["aurora", "silk", "dock", "beams"]} />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/80">
              <Icon d={icons.check} className="h-3 w-3" />1 file written in 0.8s
            </div>
          </div>
        </div>
      </Stage>
    </Scene>
  ),
  "gradient-text": (
    <Scene style={{ background: "radial-gradient(60% 55% at 50% 50%, rgba(127,179,255,0.12), rgba(127,179,255,0) 70%)" }}>
      <Stage className="gap-1">
        <span className="font-serif text-lg italic text-white/60">Introducing</span>
        <GradientText
          text="Aurora Pro"
          colors={["#2f7bff", "#19c3f5", "#ff2fa0", "#2f7bff"]}
          className="font-grotesk text-[44px] font-bold leading-tight tracking-tight"
        />
        <span className="mt-1 font-mono text-[11px] text-white/45">Ships Nov 12 · from $49</span>
      </Stage>
    </Scene>
  ),
  "split-text": (
    <Scene style={{ background: "radial-gradient(80% 70% at 80% 100%, rgba(255,170,110,0.12), rgba(255,170,110,0) 70%), #0c0b0a" }}>
      <div className="absolute inset-x-5 top-3.5 flex items-baseline justify-between border-b border-white/10 pb-2">
        <span className="font-serif text-base italic text-white/80">Field Notes</span>
        <Label>Issue 42 · Winter</Label>
      </div>
      <Stage className="gap-3 pt-8">
        <SplitText text="Slow mornings" trigger="mount" stagger={0.04} className="font-serif text-5xl leading-none text-white" />
        <span className="font-grotesk text-[11px] uppercase tracking-[0.3em] text-white/45">A guide to doing less</span>
      </Stage>
    </Scene>
  ),
  "blur-text": (
    <Scene style={{ background: "radial-gradient(80% 70% at 50% 50%, rgba(47,123,255,0.14), rgba(47,123,255,0) 70%)" }}>
      <Corners />
      <div className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d5e]" />
        <Label className="text-white/70">Rec 00:12</Label>
      </div>
      <Stage className="gap-3">
        <BlurText
          text="Everything comes into focus"
          trigger="mount"
          className="block max-w-[250px] font-sans text-[26px] font-semibold leading-[1.1] tracking-tight text-white"
        />
        <Label>f/1.8 · 1/250 s · ISO 200</Label>
      </Stage>
    </Scene>
  ),
  "rotating-text": (
    <Scene style={{ background: "radial-gradient(70% 60% at 50% 40%, rgba(47,123,255,0.14), rgba(47,123,255,0) 70%)" }}>
      <Stage className="gap-4">
        <div className="font-grotesk text-[32px] font-semibold leading-tight tracking-tight text-white">
          Built for
          <br />
          <RotatingText words={["designers", "founders", "engineers", "dreamers"]} className="text-blue" />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2">
            <Avatar name="Mia Chen" color="#ff7a59" size={24} />
            <Avatar name="Leo Ruiz" color="#2f7bff" size={24} />
            <Avatar name="Ines Sato" color="#19b37d" size={24} />
          </div>
          <span className="text-xs text-white/55">Loved by 12,400 teams</span>
        </div>
      </Stage>
    </Scene>
  ),
  "scroll-velocity-text": (
    <Scene>
      <div className="absolute inset-0 flex flex-col justify-center gap-1 pb-4">
        <ScrollVelocityText text="New season drop" baseSpeed={60} gap={40} className="font-grotesk text-5xl font-bold uppercase tracking-tight text-white" />
        <ScrollVelocityText text="Free shipping over $80" baseSpeed={45} direction={-1} gap={40} className="font-serif text-4xl italic text-blue-soft" />
      </div>
      <Label className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">Scroll to speed up</Label>
    </Scene>
  ),
  "stroke-text": (
    <Scene className="bg-[#0b0b0d]">
      <div className="absolute inset-x-5 top-3.5 flex justify-between">
        <Label>Gallery 4</Label>
        <Label>Nov 8 – Jan 12</Label>
      </div>
      <Stage className="gap-1">
        <StrokeText text="VOID" strokeWidth={1.5} color="#ffffff" fill="#2f7bff" className="font-grotesk text-[88px] font-bold leading-none tracking-tight" />
        <span className="font-serif text-base italic text-white/55">Sculpture after absence</span>
      </Stage>
      <Label className="absolute bottom-3.5 right-5">Hover to fill</Label>
    </Scene>
  ),
  "split-flap-text": (
    <Scene className="bg-[#0b0b0c]">
      <div className="absolute inset-x-4 top-3.5 flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ffc94d]">Departures</span>
        <span className="font-mono text-xs text-white/70">08:42</span>
      </div>
      <Stage className="gap-3 pt-6">
        <SplitFlapText text="LISBON" padTo={6} className="text-[36px] text-[#ffe9a8]" />
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
          <span>HB 207</span>
          <span>Gate B12</span>
          <span className="text-emerald-400">On time</span>
        </div>
      </Stage>
    </Scene>
  ),
  "speed-lines": (
    <Scene style={{ background: "linear-gradient(180deg, #071226 0%, #0a0a0a 100%)" }}>
      <SpeedLines color="#7fb3ff" count={18} angle={0} speed={1.4} opacity={0.4} />
      <Stage className="gap-1">
        <Label className="text-blue-soft/80">Avg. delivery · Brooklyn</Label>
        <div className="flex items-baseline gap-2 font-grotesk text-white">
          <span className="text-7xl font-bold leading-none tracking-tight">38</span>
          <span className="text-2xl font-medium text-white/70">min</span>
        </div>
        <span className="text-xs text-white/55">Courier on the way, 2.4 km left</span>
      </Stage>
    </Scene>
  ),
  "pixel-reveal": (
    <Scene>
      <Stage>
        <PixelReveal rows={8} cols={14} duration={1.4} className="w-full max-w-[290px] overflow-hidden rounded-2xl">
          <Photo bg={bg.kyoto} className="h-[140px] w-full">
            <Hills fill="#1c0f2a" className="h-12" />
            <div className="absolute bottom-3 left-4 text-left">
              <div className="font-serif text-2xl italic leading-tight text-white">Kyoto, 6:12 am</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">X100V · 23 mm · f/2</div>
            </div>
          </Photo>
        </PixelReveal>
      </Stage>
    </Scene>
  ),
  "shutter-reveal": (
    <Scene>
      <Stage className="gap-2.5">
        <ShutterReveal trigger="hover" bars={7} className="rounded-2xl">
          <div className="flex w-[264px] items-center gap-3.5 rounded-2xl border border-white/10 bg-[#121214] p-3 text-left">
            <Photo bg={bg.album} className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg">
              <span className="h-5 w-5 rounded-full border-4 border-white/30" />
            </Photo>
            <div className="min-w-0 flex-1">
              <Label className="text-blue-soft">Now playing</Label>
              <div className="mt-0.5 truncate font-serif text-xl leading-tight text-white">Midnight Drive</div>
              <div className="truncate text-xs text-white/50">Nova Lane · Afterglow</div>
              <div className="mt-2 h-1 rounded-full bg-white/10">
                <div className="h-full w-2/5 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </ShutterReveal>
        <Label>Hover to replay</Label>
      </Stage>
    </Scene>
  ),
  "fade-in-view": (
    <Scene>
      <Stage className="gap-2">
        <FadeInView direction="up" once={false} className="w-full max-w-[290px]">
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#111113] p-3 text-left">
            <Avatar name="Lena Park" color="#ff7a59" size={30} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-medium text-white">Lena Park</span>
                <span className="font-mono text-[10px] text-white/40">2m</span>
              </div>
              <div className="truncate text-xs text-white/55">Shipped the new onboarding flow</div>
            </div>
          </div>
        </FadeInView>
        <FadeInView direction="up" once={false} delay={0.15} className="w-full max-w-[290px]">
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#111113] p-3 text-left">
            <Avatar name="Omar Haddad" color="#2f7bff" size={30} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-medium text-white">Omar Haddad</span>
                <span className="font-mono text-[10px] text-white/40">5m</span>
              </div>
              <div className="truncate text-xs text-white/55">Left 3 comments on Checkout v2</div>
            </div>
          </div>
        </FadeInView>
      </Stage>
    </Scene>
  ),
  marquee: (
    <Scene>
      <div className="absolute inset-0 flex flex-col justify-center gap-4">
        <Label className="text-center">Trusted by product teams at</Label>
        <Marquee gap={40} className="font-grotesk text-2xl font-semibold tracking-tight text-white/80">
          <span className="flex items-center gap-2"><Icon d={icons.circle} className="h-5 w-5 text-blue" fill />Northwind</span>
          <span className="flex items-center gap-2"><Icon d={icons.bolt} className="h-5 w-5 text-[#ffd166]" fill />Lumen</span>
          <span className="flex items-center gap-2"><Icon d={icons.square} className="h-5 w-5 text-[#ff2fa0]" />Arcadia</span>
          <span className="flex items-center gap-2"><Icon d={icons.globe} className="h-5 w-5 text-[#19c3f5]" />Polaris</span>
          <span className="flex items-center gap-2"><Icon d={icons.ring} className="h-5 w-5 text-[#19b37d]" />Kitefield</span>
        </Marquee>
        <Marquee direction="right" gap={10} speed={0.7}>
          <span className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">SOC 2 Type II</span>
          <span className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">99.99% uptime</span>
          <span className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">GDPR ready</span>
          <span className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">SSO and SCIM</span>
          <span className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">24/7 support</span>
        </Marquee>
      </div>
    </Scene>
  ),
  "count-up": (
    <Scene style={{ background: "radial-gradient(70% 60% at 50% 100%, rgba(25,179,125,0.12), rgba(25,179,125,0) 70%)" }}>
      <Stage>
        <div className="w-full max-w-[290px] rounded-2xl border border-white/10 bg-[#111113] p-3.5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/55">Monthly revenue</span>
            <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">+12.4%</span>
          </div>
          <CountUp to={48290} prefix="$" className="mt-0.5 block font-grotesk text-[40px] font-semibold leading-tight tracking-tight text-white" />
          <svg viewBox="0 0 260 40" preserveAspectRatio="none" className="mt-1 h-9 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="hb-demo-count-up" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#34d399" stopOpacity="0.35" />
                <stop offset="1" stopColor="#34d399" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 32 L26 28 L52 30 L78 22 L104 25 L130 17 L156 20 L182 12 L208 15 L234 7 L260 4 V40 H0Z" fill="url(#hb-demo-count-up)" />
            <path d="M0 32 L26 28 L52 30 L78 22 L104 25 L130 17 L156 20 L182 12 L208 15 L234 7 L260 4" fill="none" stroke="#34d399" strokeWidth="1.8" />
          </svg>
          <div className="mt-1 flex justify-between font-mono text-[9px] text-white/35">
            <span>Oct 1</span>
            <span>Oct 31</span>
          </div>
        </div>
      </Stage>
    </Scene>
  ),
  scanlines: (
    <Scene className="p-3">
      <div
        className="relative h-full w-full overflow-hidden rounded-[22px] border border-white/10"
        style={{
          background: "radial-gradient(90% 80% at 50% 45%, #14482f 0%, #071a12 60%, #030a07 100%)",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.85)",
        }}
      >
        <div className="absolute inset-x-5 top-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#8dffb0]/70">
          <span>1UP 004210</span>
          <span>Credit 01</span>
        </div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 font-mono text-[#8dffb0]"
          style={{ textShadow: "0 0 12px rgba(141,255,176,0.6)" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-70">High score</span>
          <span className="text-4xl font-bold tracking-[0.1em]">128,400</span>
          <span className="mt-2 text-xs uppercase tracking-[0.3em]">Insert coin</span>
        </div>
        <Scanlines opacity={0.4} lineHeight={3} />
      </div>
    </Scene>
  ),
  "grid-floor": (
    <Scene style={{ background: "linear-gradient(180deg, #0d0418 0%, #2a0a3a 56%, #0a0a0a 58%)" }}>
      <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden">
        <div
          className="absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2 translate-y-1/2 rounded-full"
          style={{
            background: "linear-gradient(180deg, #ffd36b 0%, #ff6a3d 50%, #ff2fa0 100%)",
            boxShadow: "0 0 60px rgba(255,106,61,0.45)",
            maskImage:
              "linear-gradient(to bottom, #000 0 30%, transparent 30% 34%, #000 34% 40%, transparent 40% 44%, #000 44% 48%, transparent 48% 52%, #000 52%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0 30%, transparent 30% 34%, #000 34% 40%, transparent 40% 44%, #000 44% 48%, transparent 48% 52%, #000 52%)",
          }}
        />
      </div>
      <GridFloor color="#ff2fa0" horizon={0.58} cell={40} />
      <div className="absolute inset-x-0 top-4 text-center font-display text-2xl font-bold uppercase tracking-[0.32em] text-white" style={{ textShadow: "0 0 18px rgba(255,47,160,0.6)" }}>
        Night Drive
      </div>
      <Label className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/70">Vol. 2 · 11 tracks</Label>
    </Scene>
  ),
  "film-grain": (
    <Scene>
      <Photo bg={bg.cinema} className="absolute inset-0">
        <Hills fill="#0f0a08" className="h-16" />
      </Photo>
      <div className="absolute inset-x-0 top-0 h-5 bg-black" />
      <div className="absolute inset-x-0 bottom-0 h-5 bg-black" />
      <Label className="absolute left-4 top-7 text-white/70">Scene 14 · Take 3</Label>
      <Label className="absolute right-4 top-7 text-white/70">35 mm</Label>
      <div className="absolute inset-x-4 bottom-8 text-center font-serif text-xl italic text-[#fff3c4]" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}>
        &ldquo;I thought we had more time.&rdquo;
      </div>
      <FilmGrain opacity={0.35} />
    </Scene>
  ),
  "vhs-overlay": (
    <Scene>
      <Photo bg={bg.vhs} className="absolute inset-0" />
      <div className="absolute left-4 top-3.5 flex items-center gap-1.5 font-mono text-sm font-semibold text-white" style={{ textShadow: "0 0 6px rgba(255,255,255,0.6)" }}>
        <Icon d={icons.play} className="h-3.5 w-3.5" fill />
        PLAY
      </div>
      <span className="absolute right-4 top-3.5 font-mono text-sm font-semibold text-white" style={{ textShadow: "0 0 6px rgba(255,255,255,0.6)" }}>
        SP
      </span>
      <div className="absolute inset-x-4 bottom-3.5 flex justify-between font-mono text-sm font-semibold text-white" style={{ textShadow: "0 0 6px rgba(255,255,255,0.6)" }}>
        <span>JUL 14 1994</span>
        <span>0:42:17</span>
      </div>
      <VhsOverlay intensity={2} />
    </Scene>
  ),
  aurora: (
    <Scene style={{ background: "linear-gradient(180deg, #030814 0%, #06121f 60%, #0a0a0a 100%)" }}>
      {stars.map(([x, y, s]) => (
        <span key={`${x}-${y}`} className="absolute rounded-full bg-white/70" style={{ left: `${x}%`, top: `${y}%`, width: s, height: s }} />
      ))}
      <Aurora colors={["#19f5a0", "#19c3f5", "#8b5cf6"]} opacity={0.6} />
      <Hills fill="#04060a" className="h-12" />
      <Stage className="gap-1 pb-6">
        <Label className="text-[#8dffd0]/80">Tromsø · 69.6° N</Label>
        <span className="font-serif text-4xl text-white">Northern lights</span>
        <span className="font-mono text-[11px] text-white/55">Kp 6 · tonight 22:00 – 02:00</span>
      </Stage>
    </Scene>
  ),
  plasma: (
    <Scene>
      <Plasma colors={["#0b0614", "#7c3aed", "#ff2fa0"]} opacity={0.9} />
      <Stage>
        <div className="rounded-2xl border border-white/15 bg-black/35 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d5e]" />
            <Label className="text-white/80">Live now</Label>
          </div>
          <div className="mt-1 font-grotesk text-3xl font-bold uppercase tracking-[0.08em] text-white">Mira Sol</div>
          <div className="font-mono text-[11px] text-white/60">Warehouse 9 · 23:00 – late</div>
        </div>
      </Stage>
    </Scene>
  ),
  particles: (
    <Scene style={{ background: "radial-gradient(70% 70% at 50% 50%, rgba(47,123,255,0.12), rgba(47,123,255,0) 70%)" }}>
      <Particles count={55} color="#cfe0ff" lineColor="#2f7bff" linkDistance={90} speed={0.8} />
      <Stage className="gap-1">
        <span className="font-grotesk text-6xl font-semibold leading-none tracking-tight text-white">312</span>
        <span className="text-sm text-white/70">edge locations, 14 ms median</span>
        <Label className="mt-2">Global network · live</Label>
      </Stage>
    </Scene>
  ),
  "light-rays": (
    <Scene style={{ background: "linear-gradient(180deg, #140e06 0%, #0a0a0a 100%)" }}>
      <LightRays color="#ffcf8a" origin="top" rays={10} intensity={0.7} />
      <div className="absolute bottom-7 right-6 h-5 w-32 rounded-[50%] bg-[#ffcf8a]/25 blur-lg" />
      <div className="absolute bottom-9 right-[52px] flex flex-col items-center">
        <div className="h-4 w-6 rounded-t-sm bg-gradient-to-b from-[#f0d49a] to-[#9a7a45]" />
        <div className="h-1.5 w-4 bg-[#c9a76b]/60" />
        <div
          className="flex h-[72px] w-[60px] items-center justify-center rounded-xl border border-white/25"
          style={{ background: "linear-gradient(160deg, rgba(255,236,200,0.6), rgba(255,180,90,0.25) 45%, rgba(120,70,20,0.55))" }}
        >
          <span className="font-serif text-[11px] italic text-[#3a2410]">Lumière</span>
        </div>
      </div>
      <div className="absolute bottom-9 left-5 text-left">
        <div className="font-serif text-[28px] leading-none text-white">Eau Lumière</div>
        <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">50 ml · $128</div>
      </div>
    </Scene>
  ),
  beams: (
    <Scene>
      <Beams color="#19c3f5" count={7} angle={0} />
      <Stage className="gap-2.5">
        <span className="rounded-full border border-[#19c3f5]/30 bg-[#19c3f5]/10 px-2.5 py-0.5 font-mono text-[10px] text-[#9be8ff]">v2.4 · Edge functions</span>
        <span className="max-w-[260px] font-sans text-2xl font-semibold leading-tight tracking-tight text-white">Deploy at the speed of thought</span>
        <div className="flex gap-2">
          <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-black">Start free</span>
          <span className="rounded-full border border-white/20 bg-black/30 px-3.5 py-1.5 text-xs text-white/80">Read docs</span>
        </div>
      </Stage>
    </Scene>
  ),
  hyperspeed: (
    <Scene className="bg-black">
      <Hyperspeed accent="#8b5cf6" color="#e6ecff" count={260} />
      <Stage className="gap-1">
        <Label className="text-white/60">Jump sequence engaged</Label>
        <span className="font-display text-4xl font-bold uppercase tracking-[0.2em] text-white">Warp 9</span>
        <span className="font-mono text-[11px] text-[#c4b5fd]">ETA 00:03:12 · Kepler-22b</span>
      </Stage>
    </Scene>
  ),
  silk: (
    <Scene>
      <Silk color="#b48cff" secondary="#ff8fc7" layers={5} amplitude={0.6} />
      <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,rgba(10,10,10,0.55),rgba(10,10,10,0)_75%)]" />
      <Stage className="gap-1.5">
        <Label className="text-white/75">Autumn / Winter 26</Label>
        <span className="font-serif text-[40px] leading-none text-white">Maison Velours</span>
        <span className="mt-1 text-xs tracking-wide text-white/70">The cashmere edit, now online</span>
      </Stage>
    </Scene>
  ),
  "chromatic-hover": (
    <Scene>
      <Stage className="gap-2">
        <ChromaticHover strength={4}>
          <Photo bg={bg.poster} className="flex h-[118px] w-[230px] flex-col justify-between rounded-2xl border border-white/10 p-3.5 text-left">
            <div className="flex justify-between">
              <Label className="text-white/75">Drop 04</Label>
              <Label className="text-white/75">$180</Label>
            </div>
            <div className="font-grotesk text-[34px] font-bold uppercase leading-[0.95] tracking-tight text-white">
              Pulse
              <br />
              Runner
            </div>
          </Photo>
        </ChromaticHover>
        <Label>Hover the card</Label>
      </Stage>
    </Scene>
  ),
  magnetic: (
    <Scene className="hb-dots">
      <Stage className="gap-4">
        <Magnetic strength={0.4} radius={140}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_40px_-8px_rgba(47,123,255,0.8)]">
            Join the waitlist
            <Icon d={icons.arrow} />
          </span>
        </Magnetic>
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2">
            <Avatar name="Rui Costa" color="#19b37d" size={22} />
            <Avatar name="Ana Weber" color="#ff7a59" size={22} />
            <Avatar name="Tom Okafor" color="#a855f7" size={22} />
          </div>
          <span className="text-xs text-white/55">2,384 people already in</span>
        </div>
      </Stage>
      <Label className="absolute left-1/2 top-3.5 -translate-x-1/2 whitespace-nowrap">Move the cursor near</Label>
    </Scene>
  ),
  "tilt-card": (
    <Scene style={{ background: "radial-gradient(60% 60% at 50% 55%, rgba(47,123,255,0.16), rgba(47,123,255,0) 70%)" }}>
      <Stage>
        <TiltCard maxTilt={14} className="rounded-2xl">
          <Photo bg={bg.card} className="flex h-[132px] w-[220px] flex-col justify-between rounded-2xl border border-white/15 p-4 text-left">
            <div className="flex items-start justify-between">
              <span className="font-grotesk text-sm font-semibold tracking-wide text-white">Northwind</span>
              <Label className="text-white/70">Metal</Label>
            </div>
            <div className="h-6 w-8 rounded-md bg-gradient-to-br from-[#f4d78b] to-[#b8913f]" />
            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono text-sm tracking-[0.18em] text-white">•••• 4821</div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-white/65">Alex Morgan</div>
              </div>
              <span className="font-mono text-[10px] text-white/70">09/29</span>
            </div>
          </Photo>
        </TiltCard>
      </Stage>
    </Scene>
  ),
  "dot-grid": (
    <Scene>
      <DotGrid size={20} glowColor="#2f7bff" radius={140} intensity={0.8} />
      <div className="absolute left-4 top-3.5 flex items-center gap-0.5 rounded-lg border border-white/10 bg-black/50 p-1 text-white/70">
        <span className="rounded-md bg-blue p-1 text-white"><Icon d={icons.square} className="h-3.5 w-3.5" /></span>
        <span className="p-1"><Icon d={icons.circle} className="h-3.5 w-3.5" /></span>
        <span className="p-1"><Icon d={icons.type} className="h-3.5 w-3.5" /></span>
      </div>
      <Label className="absolute right-4 top-5">Zoom 100%</Label>
      <Stage className="gap-1.5">
        <span className="font-serif text-4xl italic text-white">Infinite canvas</span>
        <span className="text-xs text-white/50">move the cursor across the grid</span>
      </Stage>
    </Scene>
  ),
  "glow-border": (
    <Scene>
      <Stage>
        <GlowBorder color="#2f7bff" radius={180} rounded={18} className="bg-[#0f1115]">
          <div className="w-[236px] p-3.5 text-left">
            <div className="flex items-center justify-between">
              <span className="font-grotesk text-sm font-semibold text-white">Pro</span>
              <span className="rounded-full bg-blue/15 px-2 py-0.5 text-[10px] font-medium text-blue-soft">Most popular</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-grotesk text-4xl font-semibold tracking-tight text-white">$24</span>
              <span className="text-xs text-white/50">per month</span>
            </div>
            <ul className="mt-2 space-y-1 text-xs text-white/70">
              <li className="flex items-center gap-2">
                <Icon d={icons.check} className="h-3.5 w-3.5 text-blue-soft" />
                Unlimited projects
              </li>
              <li className="flex items-center gap-2">
                <Icon d={icons.check} className="h-3.5 w-3.5 text-blue-soft" />
                Priority support
              </li>
            </ul>
          </div>
        </GlowBorder>
      </Stage>
    </Scene>
  ),
  "ripple-click": (
    <Scene>
      <Stage className="gap-2.5">
        <div className="flex w-full max-w-[280px] items-center gap-3 rounded-2xl border border-white/10 bg-[#111113] p-3 text-left">
          <Photo bg={bg.linen} className="h-[76px] w-[64px] shrink-0 rounded-xl" />
          <div className="min-w-0 flex-1">
            <div className="truncate font-serif text-xl leading-tight text-white">Linen overshirt</div>
            <div className="text-xs text-white/50">Sand · M · $64</div>
            <RippleClick color="rgba(255,255,255,0.45)" className="mt-2.5 rounded-full bg-blue">
              <span className="inline-flex cursor-pointer select-none items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white">
                <Icon d={icons.bag} className="h-3.5 w-3.5" />
                Add to bag
              </span>
            </RippleClick>
          </div>
        </div>
        <Label>Click the button</Label>
      </Stage>
    </Scene>
  ),
  "blob-cursor": (
    <Scene className="bg-[#0b0b0d]">
      <BlobCursor color="#ff6a3d" size={56} />
      <Stage className="gap-2">
        <span className="font-grotesk text-[11px] uppercase tracking-[0.35em] text-white/50">Studio Ondine</span>
        <span className="font-serif text-[44px] leading-none text-white">
          Make it <span className="italic text-[#ffb08a]">move</span>
        </span>
        <span className="text-xs text-white/45">move the cursor</span>
      </Stage>
    </Scene>
  ),
  "click-spark": (
    <Scene style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(255,209,102,0.10), rgba(255,209,102,0) 70%)" }}>
      <ClickSpark color="#ffd166" count={10} size={14} radius={30} />
      <Stage className="gap-1.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffd166]/15 text-[#ffd166]">
          <Icon d={icons.check} className="h-5 w-5" />
        </span>
        <span className="font-serif text-3xl text-white">Order confirmed</span>
        <span className="font-mono text-[11px] text-white/50">#HB-20931 · arrives Thursday</span>
        <Label className="mt-1">Click anywhere</Label>
      </Stage>
    </Scene>
  ),
  "cursor-trail": (
    <Scene className="bg-[#0b0c10]">
      <CursorTrail color="#19c3f5" variant="ribbon" length={28} size={7} />
      <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
        <span className="h-3 w-3 rounded-full bg-[#19c3f5] ring-2 ring-white/40" />
        <span className="h-3 w-3 rounded-full bg-[#ff2fa0]" />
        <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
        <span className="h-3 w-3 rounded-full bg-white" />
        <span className="h-3 w-px bg-white/15" />
        <span className="whitespace-nowrap font-mono text-[10px] text-white/55">Brush 7 px</span>
      </div>
      <Stage className="gap-1 pt-6">
        <span className="font-serif text-4xl italic text-white/85">Draw something</span>
        <span className="text-xs text-white/45">the cursor leaves a ribbon</span>
      </Stage>
    </Scene>
  ),
  dock: (
    <Scene style={{ background: bg.desktop }}>
      <div className="absolute inset-x-0 top-0 flex h-6 items-center justify-between bg-black/25 px-3 text-[10px] text-white/80">
        <span className="font-semibold">Files</span>
        <span className="font-mono">Tue 9:41</span>
      </div>
      <div className="absolute left-4 top-9 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-left backdrop-blur-md">
        <div className="text-[10px] text-white/70">Lisbon</div>
        <div className="font-serif text-2xl leading-none text-white">21°</div>
      </div>
      <div className="absolute inset-x-0 bottom-3 flex justify-center">
        <Dock
          size={36}
          magnification={1.6}
          distance={100}
          items={[
            { id: "files", label: "Files", icon: <AppIcon d={icons.folder} background="linear-gradient(180deg, #6cb6ff, #2f7bff)" /> },
            { id: "mail", label: "Mail", icon: <AppIcon d={icons.mail} background="linear-gradient(180deg, #7fe3ff, #1a8fd6)" /> },
            { id: "music", label: "Music", icon: <AppIcon d={icons.music} background="linear-gradient(180deg, #ff7aa8, #e8336d)" /> },
            { id: "photos", label: "Photos", icon: <AppIcon d={icons.camera} background="linear-gradient(180deg, #ffd36b, #ff8a3d)" /> },
            { id: "calendar", label: "Calendar", icon: <AppIcon d={icons.calendar} background="linear-gradient(180deg, #ffffff, #dedede)" dark /> },
          ]}
        />
      </div>
    </Scene>
  ),
  "pill-nav": (
    <Scene style={{ background: "radial-gradient(80% 60% at 50% 110%, rgba(47,123,255,0.2), rgba(47,123,255,0) 70%)" }}>
      <div className="absolute inset-x-0 top-4 flex justify-center">
        <PillNav
          defaultActive="work"
          items={[
            { id: "work", label: "Work" },
            { id: "lab", label: "Lab" },
            { id: "shop", label: "Shop" },
            { id: "about", label: "About" },
          ]}
        />
      </div>
      <div className="absolute inset-x-5 bottom-4 text-left">
        <Label>Ondine Studio · 2019 – 2026</Label>
        <div className="mt-1 font-serif text-[26px] leading-[1.15] text-white">
          Selected work for <span className="italic text-blue-soft">curious</span> brands
        </div>
      </div>
    </Scene>
  ),
  accordion: (
    <Scene>
      <div className="absolute inset-0 mx-auto flex max-w-sm flex-col justify-center px-6 text-left">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">Help center</span>
          <Label>Shipping</Label>
        </div>
        <div className="text-[13px] text-white">
          <Accordion
            defaultOpen={["ship"]}
            items={[
              { id: "ship", title: "When will my order ship?", content: "Same day if you order before 2 pm." },
              { id: "return", title: "Can I return a gift?", content: "Yes, within 30 days, no receipt needed." },
            ]}
          />
        </div>
      </div>
    </Scene>
  ),
  carousel: (
    <Scene>
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="h-[140px] w-full max-w-[320px]">
          <Carousel className="h-full rounded-2xl" gap={12}>
            <Photo bg={bg.lisbon} className="h-full w-full rounded-2xl border border-white/10">
              <Hills fill="#2a1430" className="h-10" />
              <div className="absolute left-4 top-3 text-left">
                <div className="font-serif text-2xl leading-tight text-white">Lisbon</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/75">4 nights</div>
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white">from $420</span>
            </Photo>
            <Photo bg={bg.reykjavik} className="h-full w-full rounded-2xl border border-white/10">
              <Hills fill="#06121f" className="h-12" />
              <div className="absolute left-4 top-3 text-left">
                <div className="font-serif text-2xl leading-tight text-white">Reykjavík</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/75">6 nights</div>
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white">from $780</span>
            </Photo>
            <Photo bg={bg.marrakesh} className="h-full w-full rounded-2xl border border-white/10">
              <Hills fill="#2a0f0b" className="h-9" />
              <div className="absolute left-4 top-3 text-left">
                <div className="font-serif text-2xl leading-tight text-white">Marrakesh</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/75">5 nights</div>
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white">from $510</span>
            </Photo>
          </Carousel>
        </div>
      </div>
    </Scene>
  ),
  stepper: (
    <Scene>
      <div className="absolute inset-0 flex items-center justify-center px-5">
        <div className="w-full max-w-[320px] text-left">
          <Stepper
            initialStep={1}
            labels={{ back: "Back", next: "Continue", finish: "Place order" }}
            steps={[
              { id: "cart", title: "Cart", content: <p className="text-[13px] text-white/70">2 items · $148.00</p> },
              { id: "ship", title: "Shipping", content: <p className="text-[13px] text-white/70">Express to Lisbon, arrives <span className="text-white">Thursday</span></p> },
              { id: "pay", title: "Payment", content: <p className="text-[13px] text-white/70">Card on file ending 21</p> },
              { id: "done", title: "Review", content: <p className="text-[13px] text-white/70">Total $156.00 with shipping</p> },
            ]}
          />
        </div>
      </div>
    </Scene>
  ),
  "image-compare": (
    <Scene>
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <ImageCompare
          initial={45}
          labels={{ before: "Raw", after: "Graded" }}
          className="h-[144px] w-full max-w-[320px] rounded-2xl border border-white/10"
          before={
            <Photo bg={bg.raw}>
              <Hills fill="#3a3c40" className="h-14" />
            </Photo>
          }
          after={
            <Photo bg={bg.graded}>
              <Hills fill="#1a1024" className="h-14" />
            </Photo>
          }
        />
      </div>
    </Scene>
  ),
  masonry: (
    <Scene>
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <Masonry columns={3} gap={8} stagger={0.06} className="w-full max-w-[300px]">
          {tiles.map((tile) => (
            <Photo key={tile.name} bg={tile.bg} className="w-full rounded-lg border border-white/10">
              <div style={{ height: tile.h }} />
              <span className="absolute bottom-1.5 left-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/85">{tile.name}</span>
            </Photo>
          ))}
        </Masonry>
      </div>
    </Scene>
  ),
  "animated-list": (
    <Scene>
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <AnimatedList
          className="max-w-[280px] text-left"
          maxHeight={156}
          initialSelected={0}
          items={inbox.map((m) => (
            <div key={m.name} className="flex items-center gap-3">
              <Avatar name={m.name} color={m.color} size={28} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[13px] font-medium text-white">{m.name}</span>
                  <span className="font-mono text-[10px] text-white/40">{m.time}</span>
                </div>
                <div className="truncate text-xs text-white/50">{m.text}</div>
              </div>
            </div>
          ))}
        />
      </div>
    </Scene>
  ),
  "bento-grid": (
    <Scene>
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <BentoGrid columns={3} gap={8} rowHeight={76} className="max-w-[320px] text-left">
          <BentoCard
            colSpan={2}
            title="Realtime sync"
            description="Edits land in 40 ms"
            style={{ background: "radial-gradient(90% 120% at 100% 0%, rgba(47,123,255,0.35), rgba(47,123,255,0) 60%), rgba(255,255,255,0.04)" }}
          />
          <BentoCard rowSpan={2} title="Uptime" style={{ background: "radial-gradient(100% 70% at 50% 100%, rgba(25,179,125,0.28), rgba(25,179,125,0) 70%), rgba(255,255,255,0.04)" }}>
            <div className="flex h-full items-end gap-1">
              <span className="h-[55%] flex-1 rounded-sm bg-emerald-400/60" />
              <span className="h-[70%] flex-1 rounded-sm bg-emerald-400/70" />
              <span className="h-[62%] flex-1 rounded-sm bg-emerald-400/60" />
              <span className="h-[88%] flex-1 rounded-sm bg-emerald-400/80" />
              <span className="h-full flex-1 rounded-sm bg-emerald-300" />
            </div>
          </BentoCard>
          <BentoCard title="SSO" style={{ background: "radial-gradient(100% 100% at 0% 100%, rgba(255,47,160,0.25), rgba(255,47,160,0) 70%), rgba(255,255,255,0.04)" }} />
          <BentoCard title="API" style={{ background: "radial-gradient(100% 100% at 100% 100%, rgba(25,195,245,0.25), rgba(25,195,245,0) 70%), rgba(255,255,255,0.04)" }} />
        </BentoGrid>
      </div>
    </Scene>
  ),
  "hold-button": (
    <Scene>
      <Stage>
        <div className="flex w-full max-w-[280px] flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#111113] px-4 py-4">
          <div className="text-center">
            <div className="text-sm font-medium text-white">Delete project “Atlas”?</div>
            <div className="mt-0.5 text-xs text-white/50">214 files and 3 deploys will be removed.</div>
          </div>
          <HoldButtonDemo />
        </div>
      </Stage>
    </Scene>
  ),
  "spring-toggle": (
    <Scene>
      <Stage>
        <div className="w-full max-w-[280px] divide-y divide-white/5 rounded-2xl border border-white/10 bg-[#111113] px-4 text-left">
          <div className="flex items-center justify-between gap-3 py-2">
            <div>
              <div className="text-[13px] font-medium text-white">Push notifications</div>
              <div className="text-[11px] text-white/45">Mentions and replies</div>
            </div>
            <SpringToggle defaultChecked aria-label="Push notifications" />
          </div>
          <div className="flex items-center justify-between gap-3 py-2">
            <div>
              <div className="text-[13px] font-medium text-white">Weekly digest</div>
              <div className="text-[11px] text-white/45">Every Monday at 9:00</div>
            </div>
            <SpringToggle aria-label="Weekly digest" />
          </div>
          <div className="flex items-center justify-between gap-3 py-2">
            <div>
              <div className="text-[13px] font-medium text-white">Do not disturb</div>
              <div className="text-[11px] text-white/45">22:00 – 07:00</div>
            </div>
            <SpringToggle defaultChecked color="#a855f7" aria-label="Do not disturb" />
          </div>
        </div>
      </Stage>
    </Scene>
  ),
  "segmented-control": (
    <Scene>
      <Stage>
        <div className="w-full max-w-[280px] rounded-2xl border border-white/10 bg-[#111113] p-3.5 text-left">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-grotesk text-xl font-semibold text-white">18,204</span>
              <span className="text-[11px] text-white/50">visitors</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-300">+8.1%</span>
          </div>
          <div className="mt-2.5">
            <SegmentedControl
              aria-label="Range"
              size="sm"
              fullWidth
              defaultValue="week"
              options={[
                { value: "day", label: "Day" },
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
              ]}
            />
          </div>
          <div className="mt-2.5 flex h-10 items-end gap-1.5">
            <span className="h-[40%] flex-1 rounded-sm bg-white/15" />
            <span className="h-[62%] flex-1 rounded-sm bg-white/15" />
            <span className="h-[48%] flex-1 rounded-sm bg-white/15" />
            <span className="h-[80%] flex-1 rounded-sm bg-white/15" />
            <span className="h-[70%] flex-1 rounded-sm bg-white/15" />
            <span className="h-full flex-1 rounded-sm bg-blue" />
            <span className="h-[56%] flex-1 rounded-sm bg-white/15" />
          </div>
        </div>
      </Stage>
    </Scene>
  ),
  tooltip: (
    <Scene>
      <Stage className="gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#111113] p-1.5 text-white/75">
          <Tooltip content="Bold  ⌘B">
            <span className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg hover:bg-white/10"><Icon d={icons.bold} /></span>
          </Tooltip>
          <Tooltip content="Insert link  ⌘K">
            <span className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg hover:bg-white/10"><Icon d={icons.link} /></span>
          </Tooltip>
          <Tooltip content="Add image">
            <span className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg hover:bg-white/10"><Icon d={icons.image} /></span>
          </Tooltip>
          <span className="mx-1 h-5 w-px bg-white/10" />
          <Tooltip content="Comment  ⌥⌘M">
            <span className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-blue/15 text-blue-soft"><Icon d={icons.comment} /></span>
          </Tooltip>
        </div>
        <Label>Hover a tool</Label>
      </Stage>
    </Scene>
  ),
  "scrub-field": (
    <Scene>
      <Stage>
        <div className="flex w-full max-w-[300px] items-center gap-3 rounded-2xl border border-white/10 bg-[#111113] p-3 text-left">
          <div className="flex h-[88px] w-[72px] shrink-0 items-center justify-center rounded-lg bg-white/[0.03] hb-dots">
            <span className="h-12 w-12 rounded-xl" style={{ background: "linear-gradient(135deg, #7fb3ff, #2f7bff)" }} />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <Label>Layout</Label>
            <ScrubField label="W" defaultValue={320} min={0} max={1200} suffix="px" />
            <ScrubField label="R" defaultValue={12} min={0} max={48} suffix="px" />
          </div>
        </div>
      </Stage>
    </Scene>
  ),
  "flip-card": (
    <Scene>
      <Stage className="gap-2">
        <FlipCard
          front={
            <div className="flex flex-col items-center">
              <Avatar name="Nora Vance" color="#2f7bff" size={34} />
              <div className="mt-2 font-serif text-2xl leading-none text-white">Nora Vance</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">Product designer</div>
            </div>
          }
          back={
            <div className="flex flex-col items-center gap-1 text-xs text-white/75">
              <span className="font-grotesk text-sm font-semibold text-blue-soft">Ondine Studio</span>
              <span>nora@ondine.studio</span>
              <span className="font-mono text-[11px] text-white/50">Lisbon · GMT+0</span>
            </div>
          }
        />
        <Label>Hover to flip</Label>
      </Stage>
    </Scene>
  ),
  "toast-stack": <ToastStackDemo />,
  "lattice-loader": (
    <Scene>
      <Stage>
        <div className="grid w-full max-w-[300px] grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-[#111113] px-2 py-3.5">
            <LatticeLoader size={34} label="Syncing" />
            <span className="text-[11px] text-white/70">Syncing</span>
            <Label className="text-[9px]">12 files</Label>
          </div>
          <div className="flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-[#111113] px-2 py-3.5">
            <LatticeLoader size={34} shape="ring" color="#19c3f5" label="Uploading" />
            <span className="text-[11px] text-white/70">Uploading</span>
            <Label className="text-[9px]">64%</Label>
          </div>
          <div className="flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-[#111113] px-2 py-3.5">
            <LatticeLoader size={34} shape="bars" color="#ffffff" label="Rendering" />
            <span className="text-[11px] text-white/70">Rendering</span>
            <Label className="text-[9px]">frame 82</Label>
          </div>
        </div>
      </Stage>
    </Scene>
  ),
  "star-rating": (
    <Scene>
      <Stage>
        <div className="w-full max-w-[290px] rounded-2xl border border-white/10 bg-[#111113] p-3.5 text-left">
          <div className="flex items-center gap-3">
            <Photo bg="radial-gradient(60% 60% at 40% 30%, #fff1c9, rgba(255,241,201,0) 70%), linear-gradient(160deg, #3a3a3e, #121214)" className="h-10 w-10 shrink-0 rounded-lg" />
            <div className="min-w-0">
              <div className="truncate text-[13px] font-medium text-white">Arc desk lamp</div>
              <div className="text-[11px] text-white/45">2,318 reviews</div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <StarRating defaultValue={4.5} precision={0.5} size={24} />
            <span className="font-grotesk text-sm font-semibold text-white">4.5</span>
          </div>
          <p className="mt-1.5 font-serif text-[15px] italic leading-snug text-white/70">&ldquo;Warm light, zero glare. My desk finally feels calm.&rdquo;</p>
        </div>
      </Stage>
    </Scene>
  ),
  "features-section": thumb(<FeaturesSection />, { scale: 0.34, y: 56 }),
  "testimonials-section": thumb(<TestimonialsSection />, { scale: 0.34, y: 60 }),
  "faq-section": thumb(<FaqSection />, { scale: 0.36, y: 56 }),
  "cta-banner": thumb(<CtaBanner />, { scale: 0.4, y: 40 }),
  "hero-section": thumb(<HeroSection />, { scale: 0.36, y: 56 }),
  "pricing-section": thumb(<PricingSection />, { scale: 0.34, y: 240 }),
  "login-card": thumb(<LoginCard />, { scale: 0.48, width: 560, y: 48 }),
};

export const demos: Record<string, ReactNode> = {
  ...baseDemos,
  ...buttonsDemos,
  ...transitionsDemos,
  ...appUiDemos,
  ...appUiMoreDemos,
  ...agentKitDemos,
  ...socialDemos,
};
