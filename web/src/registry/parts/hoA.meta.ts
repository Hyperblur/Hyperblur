import type { EffectMeta } from "@/registry/meta";

const linkType = "{ label: string; href: string }";

const shared = (slug: string, d: { title: string; subtitle: string; caption: string; brand: string; accent: string; nav: string; navCta: string; primary: string; learnMore: string; points: string }) => [
  { name: "title", type: "string", default: `"${d.title}"`, description: "Main headline of the hero." },
  { name: "subtitle", type: "string", default: `"${d.subtitle}"`, description: "Short paragraph under the headline. Empty hides it." },
  { name: "caption", type: "string", default: `"${d.caption}"`, description: "Small caption line next to the actions. Empty hides it." },
  { name: "command", type: "string", default: `"npx shadcn@latest add https://hyperblur.dev/r/${slug}.json"`, description: "Shell command in the box with a copy button. Empty hides the box." },
  { name: "primaryCta", type: `${linkType} | null`, default: d.primary, description: "Solid accent button with a chevron next to the command. Pass null to hide it." },
  { name: "brand", type: "string", default: `"${d.brand}"`, description: "Brand name in the top bar." },
  { name: "nav", type: `${linkType}[]`, default: d.nav, description: "Links in the top bar. They collapse on narrow containers." },
  { name: "navCta", type: `${linkType} | null`, default: d.navCta, description: "Call-to-action link in the top bar. Pass null to hide it." },
  { name: "learnMore", type: `${linkType} | null`, default: d.learnMore, description: "Secondary link near the bottom of the hero. Pass null to hide it." },
  { name: "accent", type: "string", default: `"${d.accent}"`, description: "Accent color of the effect highlights (rings, strands or electrons), the logo mark, links and the primary button. The button text switches between dark and white for contrast when a hex color is given." },
  { name: "density", type: "number", default: "1", description: `Multiplier for the number of dots (${d.points} at 1). Kept between 0.2 and 2. Narrow screens draw fewer dots automatically.` },
  { name: "speed", type: "number", default: "1", description: "Multiplier for the motion. 0 freezes the animation." },
];

const tail = [
  { name: "headingAs", type: '"h1" | "h2"', default: '"h1"', description: "Heading level of the title. Use h2 when the page already has an h1." },
  { name: "onSearch", type: "() => void", default: "undefined", description: "Called when the search icon button in the top bar is pressed." },
  { name: "className", type: "string", default: '""', description: "Extra classes on the section." },
  { name: "style", type: "React.CSSProperties", default: "undefined", description: "Inline styles on the section." },
];

const barNotes: Record<string, string> = {
  brand: "Brand name in the top bar. Applies only when showBar is true.",
  nav: "Links in the top bar. They collapse on narrow containers. Applies only when showBar is true.",
  navCta: "Call-to-action link in the top bar. Pass null to hide it. Applies only when showBar is true.",
  onSearch: "Called when the search icon button in the top bar is pressed. Applies only when showBar is true.",
};

const barOnly = <T extends { name: string; description: string }>(list: T[]) =>
  list.map((p) => (barNotes[p.name] ? { ...p, description: barNotes[p.name] } : p));

export const hoAMeta: EffectMeta[] = [
  {
    slug: "hero-dot-saturn",
    component: "HeroDotSaturn",
    title: "Hero Dot Saturn",
    description: "Giant halftone planet in ink dots on warm paper cream, with terracotta rings that pass behind and in front of the centered serif headline; bar with centered brand and links split left and right.",
    category: "hero",
    tags: ["hero", "saturn", "planet", "halftone", "canvas", "dots"],
    props: [
      ...shared("hero-dot-saturn", {
        title: "Build products with their own gravity.",
        subtitle: "Interfaces that pull people in and keep them in orbit. Ship the source, own every line, and tune the motion to your brand.",
        caption: "3 rings · 15,000 dots · zero dependencies",
        brand: "Annulus",
        accent: "#c2542d",
        nav: '[{ label: "Journal", href: "#" }, { label: "Studio", href: "#" }, { label: "Pricing", href: "#" }]',
        navCta: '{ label: "Get started", href: "#" }',
        primary: '{ label: "Start building", href: "#" }',
        learnMore: '{ label: "Read the story", href: "#" }',
        points: "about 17,000",
      }),
      { name: "ringTilt", type: "number", default: "0.45", description: "Inclination of the ring plane toward the viewer, in radians. 0 shows the rings edge on; larger values open them up." },
      { name: "bands", type: "number", default: "9", description: "Number of latitude bands on the planet. Bright and dim bands alternate. Kept between 1 and 24." },
      ...tail,
    ],
    usage: '<HeroDotSaturn title="Pull every user into orbit." accent="#2f6f5e" ringTilt={0.35} />',
  },
  {
    slug: "hero-dot-dna",
    component: "HeroDotDna",
    title: "Hero Dot DNA",
    description: "Huge horizontal double helix running edge to edge over a deep teal gradient, slowly turning on its axis, with glowing mint and white dots, luminous rungs and pulses travelling left to right.",
    category: "hero",
    tags: ["hero", "dna", "helix", "canvas", "biotech"],
    props: [
      ...barOnly(shared("hero-dot-dna", {
        title: "Two strands. One source of truth.",
        subtitle: "Version every dataset and replay every experiment. A pipeline that pairs each change with its proof, from the first sample to the final figure.",
        caption: "6 turns · 60 base pairs · runs in any React app",
        brand: "Your brand",
        accent: "#5eead4",
        nav: '[{ label: "Pipelines", href: "#" }, { label: "Research", href: "#" }, { label: "Docs", href: "#" }]',
        navCta: '{ label: "Request access", href: "#" }',
        primary: '{ label: "Run a sequence", href: "#" }',
        learnMore: '{ label: "Learn more", href: "#" }',
        points: "about 5,600",
      })),
      { name: "showBar", type: "boolean", default: "false", description: "Renders the top navigation bar (brand, links, search and button). Off by default so the block is just the effect." },
      { name: "turns", type: "number", default: "6", description: "Full turns of the helix across the width. More turns give more strand crossings and rungs. Kept between 1 and 16." },
      { name: "pulses", type: "number", default: "3", description: "Number of bright pulses travelling along the strands from left to right. 0 turns them off. Kept between 0 and 8." },
      ...barOnly(tail),
    ],
    usage: '<HeroDotDna title="Sequence everything." accent="#7dd3fc" pulses={4} />',
  },
  {
    slug: "hero-dot-orbit",
    component: "HeroDotOrbit",
    title: "Hero Dot Orbit",
    description: "Big atom on an indigo-to-electric-blue glow: dense glowing nucleus, tilted dotted orbit rings and bright cyan electrons with fading trails, centered text below, floating rectangular bar.",
    category: "hero",
    tags: ["hero", "atom", "orbit", "canvas", "science"],
    props: [
      ...shared("hero-dot-orbit", {
        title: "A stable core with everything in orbit.",
        subtitle: "One small, typed nucleus and every service moving around it at its own pace. Observable from the first request, and every line is yours to change.",
        caption: "1 nucleus · 5 orbits · one canvas at 60 fps",
        brand: "Valence",
        accent: "#22d3ee",
        nav: '[{ label: "Platform", href: "#" }, { label: "Services", href: "#" }, { label: "Changelog", href: "#" }]',
        navCta: '{ label: "Start free", href: "#" }',
        primary: '{ label: "Open the console", href: "#" }',
        learnMore: '{ label: "See how it works", href: "#" }',
        points: "about 4,500",
      }),
      { name: "orbits", type: "number", default: "5", description: "Number of tilted dotted orbit rings around the nucleus. Kept between 1 and 9." },
      { name: "electrons", type: "number", default: "1", description: "Electrons per orbit, each with a fading trail. Kept between 1 and 4." },
      ...tail,
    ],
    usage: '<HeroDotOrbit title="Everything revolves around your core." orbits={3} electrons={2} accent="#a5f3fc" />',
  },
];
