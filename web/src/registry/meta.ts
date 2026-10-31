export type EffectCategory = "text" | "overlay" | "motion" | "hover";

export interface EffectProp {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface EffectMeta {
  slug: string;
  component: string;
  title: string;
  description: string;
  category: EffectCategory;
  tags: string[];
  props: EffectProp[];
  usage: string;
  dependencies?: string[];
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hyperblur.dev";

export const categories: { id: EffectCategory; label: string }[] = [
  { id: "text", label: "Text" },
  { id: "motion", label: "Motion & reveals" },
  { id: "overlay", label: "Overlays & backgrounds" },
  { id: "hover", label: "Hover & pointer" },
];

export const effects: EffectMeta[] = [
  {
    slug: "glitch-text",
    component: "GlitchText",
    title: "Glitch Text",
    description: "RGB-split slices that stutter across the text, like a corrupted signal.",
    category: "text",
    tags: ["glitch", "text", "cyberpunk"],
    props: [
      { name: "text", type: "string", required: true, description: "Text to render." },
      { name: "intensity", type: "1 | 2 | 3", default: "2", description: "How far the slices jump." },
      { name: "speed", type: "number", default: "1", description: "Animation speed multiplier." },
      { name: "colors", type: "[string, string]", default: '["#19c3f5", "#ff2fa0"]', description: "Colors of the two ghost layers." },
    ],
    usage: '<GlitchText text="HYPERBLUR" intensity={2} />',
  },
  {
    slug: "motion-blur-text",
    component: "MotionBlurText",
    title: "Motion Blur Text",
    description: "Text that snaps into place dragging a blurred trail behind it.",
    category: "text",
    tags: ["blur", "speed", "intro", "text"],
    props: [
      { name: "text", type: "string", required: true, description: "Text to render." },
      { name: "direction", type: '"left" | "right" | "up" | "down"', default: '"left"', description: "Where the text comes from." },
      { name: "distance", type: "number", default: "40", description: "Travel distance in pixels." },
      { name: "duration", type: "number", default: "0.7", description: "Seconds for the whole move." },
      { name: "trigger", type: '"mount" | "hover"', default: '"mount"', description: "Play once on mount, or replay on hover." },
    ],
    usage: '<MotionBlurText text="HYPERBLUR" direction="left" />',
  },
  {
    slug: "speed-lines",
    component: "SpeedLines",
    title: "Speed Lines",
    description: "Slanted bars streaking across a container. Drop it behind a hero or a card.",
    category: "motion",
    tags: ["speed", "background", "lines", "anime"],
    props: [
      { name: "color", type: "string", default: '"#2f7bff"', description: "Bar color." },
      { name: "count", type: "number", default: "14", description: "How many bars." },
      { name: "speed", type: "number", default: "1", description: "Speed multiplier." },
      { name: "angle", type: "number", default: "20", description: "Tilt in degrees." },
      { name: "opacity", type: "number", default: "0.35", description: "Bar opacity." },
    ],
    usage: '<div className="relative"><SpeedLines /><h1>...</h1></div>',
  },
  {
    slug: "scanlines",
    component: "Scanlines",
    title: "Scanlines",
    description: "CRT scanlines with a soft rolling band and optional flicker. Pure CSS overlay.",
    category: "overlay",
    tags: ["crt", "retro", "overlay", "tv"],
    props: [
      { name: "opacity", type: "number", default: "0.25", description: "Line darkness." },
      { name: "lineHeight", type: "number", default: "3", description: "Pixels per scanline." },
      { name: "flicker", type: "boolean", default: "true", description: "Subtle brightness flicker." },
      { name: "band", type: "boolean", default: "true", description: "Slow rolling bright band." },
    ],
    usage: '<div className="relative"><img ... /><Scanlines /></div>',
  },
  {
    slug: "chromatic-hover",
    component: "ChromaticHover",
    title: "Chromatic Hover",
    description: "Chromatic aberration that jitters on hover. Works on images, text, anything.",
    category: "hover",
    tags: ["hover", "rgb", "aberration", "image"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "What to wrap." },
      { name: "strength", type: "number", default: "3", description: "Offset of the color fringes in pixels." },
      { name: "always", type: "boolean", default: "false", description: "Run without hover." },
    ],
    usage: '<ChromaticHover><img src="/cover.png" /></ChromaticHover>',
  },
  {
    slug: "pixel-reveal",
    component: "PixelReveal",
    title: "Pixel Reveal",
    description: "Content appears as a grid of blocks dissolves in a pseudo-random order.",
    category: "motion",
    tags: ["pixel", "reveal", "intro", "8-bit"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "What to reveal." },
      { name: "rows", type: "number", default: "8", description: "Grid rows." },
      { name: "cols", type: "number", default: "14", description: "Grid columns." },
      { name: "duration", type: "number", default: "1.2", description: "Seconds until fully revealed." },
      { name: "color", type: "string", default: '"#0a0a0a"', description: "Block color (match your background)." },
    ],
    usage: '<PixelReveal><h1>HYPERBLUR</h1></PixelReveal>',
  },
  {
    slug: "decode-text",
    component: "DecodeText",
    title: "Decode Text",
    description: "Text that scrambles through random glyphs and settles left to right, like a decrypting terminal.",
    category: "text",
    tags: ["decode", "scramble", "hacker", "terminal", "intro", "text"],
    props: [
      { name: "text", type: "string", required: true, description: "Text to reveal." },
      { name: "duration", type: "number", default: "1.2", description: "Seconds the first character scrambles before it settles." },
      { name: "glyphs", type: "string", default: '"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@"', description: "Characters the scramble cycles through." },
      { name: "trigger", type: '"mount" | "hover"', default: '"mount"', description: "Play once on mount, or replay on hover." },
      { name: "stagger", type: "number", default: "0.04", description: "Seconds between one character settling and the next." },
    ],
    usage: '<DecodeText text="HYPERBLUR" trigger="hover" />',
  },
  {
    slug: "neon-text",
    component: "NeonText",
    title: "Neon Text",
    description: "Neon sign glow built from layered shadows, with an occasional tube flicker.",
    category: "text",
    tags: ["neon", "glow", "sign", "flicker", "retro", "text"],
    props: [
      { name: "text", type: "string", required: true, description: "Text to render." },
      { name: "color", type: "string", default: '"#2f7bff"', description: "Glow color." },
      { name: "flicker", type: "boolean", default: "true", description: "Occasional flicker, like a failing tube." },
      { name: "intensity", type: "1 | 2 | 3", default: "2", description: "How far the glow reaches." },
    ],
    usage: '<NeonText text="OPEN" color="#ff2fa0" intensity={2} />',
  },
  {
    slug: "wave-text",
    component: "WaveText",
    title: "Wave Text",
    description: "Letters bob up and down in a rolling wave, each one a beat behind the last.",
    category: "text",
    tags: ["wave", "bounce", "loop", "playful", "text"],
    props: [
      { name: "text", type: "string", required: true, description: "Text to render." },
      { name: "amplitude", type: "number", default: "8", description: "How far each letter travels, in pixels." },
      { name: "speed", type: "number", default: "1", description: "Animation speed multiplier." },
      { name: "stagger", type: "number", default: "0.06", description: "Seconds of delay between one letter and the next." },
    ],
    usage: '<WaveText text="HYPERBLUR" amplitude={8} />',
  },
  {
    slug: "magnetic",
    component: "Magnetic",
    title: "Magnetic",
    description: "Pulls its child toward the cursor while you hover close, then springs back with a little overshoot.",
    category: "hover",
    tags: ["hover", "magnet", "cursor", "button", "spring"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "What to pull toward the cursor." },
      { name: "strength", type: "number", default: "0.35", description: "Fraction of the cursor offset the child follows (0 to 1)." },
      { name: "radius", type: "number", default: "120", description: "Distance in pixels from the center where the pull reaches." },
      { name: "ease", type: "number", default: "0.4", description: "Seconds the spring back takes." },
    ],
    usage: "<Magnetic><button>Get started</button></Magnetic>",
  },
  {
    slug: "tilt-card",
    component: "TiltCard",
    title: "Tilt Card",
    description: "3D tilt that follows the cursor, with a glare highlight that tracks the pointer.",
    category: "hover",
    tags: ["hover", "3d", "tilt", "card", "glare"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Card content." },
      { name: "maxTilt", type: "number", default: "10", description: "Maximum tilt in degrees." },
      { name: "glare", type: "boolean", default: "true", description: "Show a glare highlight that follows the cursor." },
      { name: "scale", type: "number", default: "1.02", description: "Scale while hovered." },
      { name: "perspective", type: "number", default: "800", description: "Perspective distance in pixels." },
    ],
    usage: '<TiltCard className="rounded-xl"><div>...</div></TiltCard>',
  },
  {
    slug: "shutter-reveal",
    component: "ShutterReveal",
    title: "Shutter Reveal",
    description: "Content is uncovered by slanted bars that slide away one after another.",
    category: "motion",
    tags: ["reveal", "shutter", "intro", "bars", "slanted"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "What to reveal." },
      { name: "bars", type: "number", default: "8", description: "How many bars cover the content." },
      { name: "color", type: "string", default: '"#2f7bff"', description: "Bar color." },
      { name: "duration", type: "number", default: "0.9", description: "Seconds until the last bar has cleared." },
      { name: "direction", type: '"left" | "right"', default: '"left"', description: "Side the bars start clearing from." },
      { name: "trigger", type: '"mount" | "hover"', default: '"mount"', description: "Play once on mount, or replay on hover." },
    ],
    usage: '<ShutterReveal><h1>HYPERBLUR</h1></ShutterReveal>',
  },
  {
    slug: "grid-floor",
    component: "GridFloor",
    title: "Grid Floor",
    description: "Synthwave perspective grid scrolling toward the viewer, with a glowing horizon fade. Pure CSS.",
    category: "overlay",
    tags: ["synthwave", "grid", "retro", "background", "3d"],
    props: [
      { name: "color", type: "string", default: '"#2f7bff"', description: "Line color." },
      { name: "speed", type: "number", default: "1", description: "Scroll speed multiplier." },
      { name: "cell", type: "number", default: "48", description: "Grid cell size in pixels." },
      { name: "horizon", type: "number", default: "0.45", description: "Where the floor starts, from 0 (top) to 1 (bottom)." },
      { name: "glow", type: "boolean", default: "true", description: "Soft glow on the lines and the horizon." },
    ],
    usage: '<div className="relative"><GridFloor /><h1>...</h1></div>',
  },
  {
    slug: "film-grain",
    component: "FilmGrain",
    title: "Film Grain",
    description: "Animated film grain overlay built from SVG turbulence, cycling through four pre-rendered frames.",
    category: "overlay",
    tags: ["grain", "noise", "film", "overlay", "svg"],
    props: [
      { name: "opacity", type: "number", default: "0.18", description: "Grain strength." },
      { name: "size", type: "number", default: "1", description: "Grain scale. Larger values give coarser grain." },
      { name: "speed", type: "number", default: "1", description: "Frame rate multiplier." },
      { name: "monochrome", type: "boolean", default: "true", description: "Gray grain instead of colored." },
    ],
    usage: '<div className="relative"><img ... /><FilmGrain /></div>',
  },
  {
    slug: "vhs-overlay",
    component: "VhsOverlay",
    title: "VHS Overlay",
    description: "Worn tape look: drifting tracking bands, cyan and magenta color bleed, and a tiny vertical jitter.",
    category: "overlay",
    tags: ["vhs", "retro", "tape", "overlay", "glitch"],
    props: [
      { name: "intensity", type: "1 | 2 | 3", default: "2", description: "How strong the tape damage looks: 1 subtle, 3 heavy." },
      { name: "bands", type: "number", default: "2", description: "Number of drifting tracking bands." },
      { name: "speed", type: "number", default: "1", description: "Animation speed multiplier." },
    ],
    usage: '<div className="relative"><video ... /><VhsOverlay intensity={2} /></div>',
  },
];

export function getEffect(slug: string): EffectMeta | undefined {
  return effects.find((e) => e.slug === slug);
}

export function installCommand(meta: EffectMeta): string {
  return `npx shadcn@latest add ${SITE_URL}/r/${meta.slug}.json`;
}

export function agentPrompt(meta: EffectMeta): string {
  const propLines = meta.props
    .map(
      (p) =>
        `- ${p.name} (${p.type}${p.required ? ", required" : p.default ? `, default ${p.default}` : ""}): ${p.description}`,
    )
    .join("\n");
  const deps = meta.dependencies?.length
    ? `It depends on: ${meta.dependencies.join(", ")} (shadcn installs them).`
    : "It has no dependencies besides React.";
  return [
    `Add the "${meta.title}" effect from Hyperblur to this project.`,
    ``,
    `1. Install it with the shadcn CLI (works in Next.js, Vite, Remix, any React + Tailwind app):`,
    `   ${installCommand(meta)}`,
    `   This creates components/hyperblur/${meta.slug}.tsx. ${deps}`,
    `2. Import it: import { ${meta.component} } from "@/components/hyperblur/${meta.slug}"`,
    `3. Use it: ${meta.usage}`,
    ``,
    `Props:`,
    propLines,
    ``,
    `Notes: it is a client component ("use client"). Keep the file as installed; customize through props. Docs: ${SITE_URL}/effects/${meta.slug}`,
  ].join("\n");
}
