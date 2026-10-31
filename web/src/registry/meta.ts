/**
 * Catalog metadata. Pure data: no React here, so the registry build
 * script can import it from Node without a bundler.
 */

export type EffectCategory = "text" | "overlay" | "motion" | "hover";

export interface EffectProp {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface EffectMeta {
  /** file name in src/registry/hyperblur and registry item name */
  slug: string;
  /** exported component name */
  component: string;
  title: string;
  description: string;
  category: EffectCategory;
  tags: string[];
  props: EffectProp[];
  /** one-line usage example */
  usage: string;
  /** npm packages the component needs besides react */
  dependencies?: string[];
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hyperblur.dev";

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
      { name: "color", type: "string", default: '"#0b0e14"', description: "Block color (match your background)." },
    ],
    usage: '<PixelReveal><h1>HYPERBLUR</h1></PixelReveal>',
  },
];

export function getEffect(slug: string): EffectMeta | undefined {
  return effects.find((e) => e.slug === slug);
}

export function installCommand(meta: EffectMeta): string {
  return `npx shadcn@latest add ${SITE_URL}/r/${meta.slug}.json`;
}

/** The text behind the "Copy prompt" button: everything an agent needs. */
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
