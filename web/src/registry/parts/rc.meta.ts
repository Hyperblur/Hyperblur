import type { EffectMeta } from "@/registry/meta";

const linkType = "{ label: string; href: string }";

export const rcMeta: EffectMeta[] = [
  {
    slug: "hero-dot-globe",
    component: "HeroDotGlobe",
    title: "Hero Dot Globe",
    description: "A pure black hero with a huge canvas sphere of thousands of tiny dots that spins on a tilted axis, leans toward the pointer and carries a bright belt drifting the other way. Sparse mono details frame a bottom-aligned headline and an install command.",
    category: "hero",
    tags: ["hero", "globe", "canvas", "dots", "landing", "developer"],
    props: [
      { name: "title", type: "string", default: '"Build interfaces that move people."', description: "Headline at the bottom left." },
      { name: "subtitle", type: "string", default: '"Motion-ready React components you install with one command and own as plain source. No runtime, no lock-in."', description: "Gray paragraph under the headline. Empty hides it." },
      { name: "caption", type: "string", default: '"v3.2 · 240+ components · MIT licensed"', description: "Small mono line above the install row. Empty hides it." },
      { name: "command", type: "string", default: '"npx shadcn@latest add https://hyperblur.dev/r/hero-dot-globe.json"', description: "Shell command in the box with a copy button. Empty hides the box." },
      { name: "primaryCta", type: `${linkType} | null`, default: '{ label: "Get started", href: "#" }', description: "Solid accent button with a chevron next to the command. Pass null to hide it." },
      { name: "brand", type: "string", default: '"Orbitkit"', description: "Wordmark next to the logo mark in the top bar." },
      { name: "nav", type: `${linkType}[]`, default: '[{ label: "Docs", href: "#" }, { label: "Examples", href: "#" }, { label: "Kit", href: "#" }]', description: "Centered mono links in the top bar. Hidden below 640px of container width." },
      { name: "navCta", type: `${linkType} | null`, default: '{ label: "Sign in", href: "#" }', description: "Outlined mono button at the right of the top bar. Pass null to hide it." },
      { name: "learnMore", type: `${linkType} | null`, default: '{ label: "Learn more", href: "#" }', description: "Small cue with a bobbing chevron at the bottom center. Pass null to hide it." },
      { name: "accent", type: "string", default: '"#ffb84d"', description: "Rim color of the sphere, the belt glow, the caption details and the primary button. The button text switches between dark and white for contrast when a hex color is given." },
      { name: "density", type: "number", default: "1", description: "Multiplier for the number of points (about 7,900 at 1). Kept between 0.2 and 2." },
      { name: "speed", type: "number", default: "1", description: "Multiplier for the rotation and belt drift. 0 keeps the sphere still but still tilting toward the pointer." },
      { name: "headingAs", type: '"h1" | "h2"', default: '"h1"', description: "Heading level of the title. Use h2 when the page already has an h1." },
      { name: "onSearch", type: "() => void", default: "undefined", description: "Called when the search icon button in the top bar is pressed." },
      { name: "className", type: "string", default: '""', description: "Extra classes on the section." },
      { name: "style", type: "React.CSSProperties", default: "undefined", description: "Inline styles on the section." },
    ],
    usage: '<HeroDotGlobe title="Ship motion without the math." command="npx shadcn@latest add https://hyperblur.dev/r/hero-dot-globe.json" accent="#7fb3ff" />',
  },
];
