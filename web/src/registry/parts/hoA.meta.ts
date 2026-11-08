import type { EffectMeta } from "@/registry/meta";

const linkType = "{ label: string; href: string }";

const shared = (slug: string, d: { title: string; subtitle: string; caption: string; brand: string; accent: string; nav: string; navCta: string; primary: string; points: string }) => [
  { name: "title", type: "string", default: `"${d.title}"`, description: "Headline at the bottom left." },
  { name: "subtitle", type: "string", default: `"${d.subtitle}"`, description: "Gray paragraph under the headline. Empty hides it." },
  { name: "caption", type: "string", default: `"${d.caption}"`, description: "Small mono line above the install row. Empty hides it." },
  { name: "command", type: "string", default: `"npx hyperblur add ${slug}"`, description: "Shell command in the box with a copy button. Empty hides the box." },
  { name: "primaryCta", type: `${linkType} | null`, default: d.primary, description: "Solid accent button with a chevron next to the command. Pass null to hide it." },
  { name: "brand", type: "string", default: `"${d.brand}"`, description: "Wordmark next to the logo mark in the top bar." },
  { name: "nav", type: `${linkType}[]`, default: d.nav, description: "Centered mono links in the top bar. Hidden below 640px of container width." },
  { name: "navCta", type: `${linkType} | null`, default: d.navCta, description: "Outlined mono button at the right of the top bar. Pass null to hide it." },
  { name: "learnMore", type: `${linkType} | null`, default: '{ label: "Learn more", href: "#" }', description: "Small cue with a bobbing chevron at the bottom center. Pass null to hide it." },
  { name: "accent", type: "string", default: `"${d.accent}"`, description: "Rim color of the hologram, the projector glow, the caption details and the primary button. The button text switches between dark and white for contrast when a hex color is given." },
  { name: "density", type: "number", default: "1", description: `Multiplier for the number of dots (${d.points} at 1). Kept between 0.2 and 2. Narrow screens draw fewer dots automatically.` },
  { name: "speed", type: "number", default: "1", description: "Multiplier for the motion and the scan sweep. 0 freezes the animation while the hologram still leans toward the pointer." },
];

const tail = [
  { name: "headingAs", type: '"h1" | "h2"', default: '"h1"', description: "Heading level of the title. Use h2 when the page already has an h1." },
  { name: "onSearch", type: "() => void", default: "undefined", description: "Called when the search icon button in the top bar is pressed." },
  { name: "className", type: "string", default: '""', description: "Extra classes on the section." },
  { name: "style", type: "React.CSSProperties", default: "undefined", description: "Inline styles on the section." },
];

export const hoAMeta: EffectMeta[] = [
  {
    slug: "hero-dot-saturn",
    component: "HeroDotSaturn",
    title: "Hero Dot Saturn",
    description: "A black hero with a holographic ringed planet built from thousands of square dots: banded latitudes, three rings with gaps that pass in front of and behind the sphere, the planet shadow on the rings, a scan sweep and a dotted projector base.",
    category: "hero",
    tags: ["hero", "saturn", "planet", "hologram", "canvas", "dots"],
    props: [
      ...shared("hero-dot-saturn", {
        title: "Build products with their own gravity.",
        subtitle: "Interfaces that pull people in and keep them in orbit. Ship the source, own every line, and tune the motion to your brand.",
        caption: "3 rings · 15,000 dots · zero dependencies",
        brand: "Annulus",
        accent: "#c4a7ff",
        nav: '[{ label: "Platform", href: "#" }, { label: "Pricing", href: "#" }, { label: "Changelog", href: "#" }]',
        navCta: '{ label: "Log in", href: "#" }',
        primary: '{ label: "Start building", href: "#" }',
        points: "about 15,600",
      }),
      { name: "ringTilt", type: "number", default: "0.45", description: "Inclination of the ring plane toward the viewer, in radians. 0 shows the rings edge on; larger values open them up. Kept between -1.2 and 1.2." },
      { name: "bands", type: "number", default: "9", description: "Number of latitude bands on the planet. Bright and dim bands alternate. Kept between 2 and 24." },
      ...tail,
    ],
    usage: '<HeroDotSaturn title="Pull every user into orbit." accent="#ffc27a" ringTilt={0.35} />',
  },
  {
    slug: "hero-dot-dna",
    component: "HeroDotDna",
    title: "Hero Dot DNA",
    description: "A black hero with a holographic double helix of square dots standing on a projector base. Two strands joined by base pair rungs turn about their axis while bright pulses run along the strands and light up each rung they pass.",
    category: "hero",
    tags: ["hero", "dna", "helix", "hologram", "canvas", "biotech"],
    props: [
      ...shared("hero-dot-dna", {
        title: "Two strands. One source of truth.",
        subtitle: "Version every dataset and replay every experiment. A pipeline that pairs each change with its proof, from the first sample to the final figure.",
        caption: "6 turns · 60 base pairs · runs in any React app",
        brand: "Strandline",
        accent: "#38e8c6",
        nav: '[{ label: "Pipelines", href: "#" }, { label: "Research", href: "#" }, { label: "Docs", href: "#" }]',
        navCta: '{ label: "Request access", href: "#" }',
        primary: '{ label: "Run a sequence", href: "#" }',
        points: "about 10,000",
      }),
      { name: "turns", type: "number", default: "6", description: "Full turns of the helix, which gives twice as many strand crossings. Ten base pair rungs are drawn per turn. Kept between 2 and 16." },
      { name: "pulses", type: "number", default: "3", description: "Number of bright pulses traveling up the strands, alternating between the two. 0 turns them off. Kept between 0 and 8." },
      ...tail,
    ],
    usage: '<HeroDotDna title="Sequence everything." accent="#7fb3ff" pulses={4} />',
  },
  {
    slug: "hero-dot-orbit",
    component: "HeroDotOrbit",
    title: "Hero Dot Orbit",
    description: "A black hero with a holographic atom of square dots: a glowing nucleus of clustered spheres, faint dotted orbit rings at different tilts and bright electrons with fading trails, floating over a projector base and leaning toward the pointer.",
    category: "hero",
    tags: ["hero", "atom", "orbit", "hologram", "canvas", "science"],
    props: [
      ...shared("hero-dot-orbit", {
        title: "A stable core with everything in orbit.",
        subtitle: "One small, typed nucleus and every service moving around it at its own pace. Observable from the first request, and every line is yours to change.",
        caption: "1 nucleus · 5 orbits · one canvas at 60 fps",
        brand: "Valence",
        accent: "#5aa9ff",
        nav: '[{ label: "Runtime", href: "#" }, { label: "Integrations", href: "#" }, { label: "Status", href: "#" }]',
        navCta: '{ label: "Dashboard", href: "#" }',
        primary: '{ label: "Deploy the core", href: "#" }',
        points: "about 7,700",
      }),
      { name: "orbits", type: "number", default: "5", description: "Number of orbit rings, spread evenly around the nucleus. Kept between 1 and 8." },
      { name: "electrons", type: "number", default: "1", description: "Electrons per orbit, each with a short fading trail. Kept between 1 and 3." },
      ...tail,
    ],
    usage: '<HeroDotOrbit title="Everything revolves around your core." orbits={3} electrons={2} />',
  },
];
