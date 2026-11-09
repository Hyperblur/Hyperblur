import type { EffectMeta } from "@/registry/meta";

const linkType = "{ label: string; href: string }";

export const rdMeta: EffectMeta[] = [
  {
    slug: "hero-dot-earth",
    component: "HeroDotEarth",
    title: "Hero Dot Earth",
    description: "A pure black hero with a huge canvas planet of thousands of tiny dots where the continents stand out bright against a sparse ocean. It spins on a tilted axis, leans toward the pointer, with a bottom-aligned headline and an install command.",
    category: "hero",
    tags: ["hero", "globe", "earth", "continents", "canvas", "dots"],
    props: [
      { name: "title", type: "string", default: '"Software that reaches every continent."', description: "Headline at the bottom left." },
      { name: "subtitle", type: "string", default: '"Deploy once and serve every region from the nearest point of presence. Plain source you own, no runtime and no lock-in."', description: "Gray paragraph under the headline. Empty hides it." },
      { name: "caption", type: "string", default: '"6 continents · 40 edge regions · MIT licensed"', description: "Small mono line above the install row. Empty hides it." },
      { name: "command", type: "string", default: '"npx shadcn@latest add https://hyperblur.dev/r/hero-dot-earth.json"', description: "Shell command in the box with a copy button. Empty hides the box." },
      { name: "primaryCta", type: `${linkType} | null`, default: '{ label: "Get started", href: "#" }', description: "Solid accent button with a chevron next to the command. Pass null to hide it." },
      { name: "brand", type: "string", default: '"Meridian"', description: "Wordmark next to the logo mark in the top bar." },
      { name: "nav", type: `${linkType}[]`, default: '[{ label: "Docs", href: "#" }, { label: "Examples", href: "#" }, { label: "Kit", href: "#" }]', description: "Centered mono links in the top bar. Hidden below 640px of container width." },
      { name: "navCta", type: `${linkType} | null`, default: '{ label: "Sign in", href: "#" }', description: "Outlined mono button at the right of the top bar. Pass null to hide it." },
      { name: "learnMore", type: `${linkType} | null`, default: '{ label: "Learn more", href: "#" }', description: "Small cue with a bobbing chevron at the bottom center. Pass null to hide it." },
      { name: "accent", type: "string", default: '"#ffb84d"', description: "Rim color of the planet, the caption details and the primary button. The button text switches between dark and white for contrast when a hex color is given." },
      { name: "density", type: "number", default: "1", description: "Multiplier for the number of points (about 5,400 at 1, mostly on land). Kept between 0.2 and 2." },
      { name: "oceanDots", type: "number", default: "0.14", description: "Share of ocean points that are kept, from 0 to 1. Lower values make the continents stand out more; 1 draws the whole sphere evenly." },
      { name: "speed", type: "number", default: "1", description: "Multiplier for the rotation and the drifting dust. 0 keeps the sphere still but still tilting toward the pointer." },
      { name: "headingAs", type: '"h1" | "h2"', default: '"h1"', description: "Heading level of the title. Use h2 when the page already has an h1." },
      { name: "onSearch", type: "() => void", default: "undefined", description: "Called when the search icon button in the top bar is pressed." },
      { name: "className", type: "string", default: '""', description: "Extra classes on the section." },
      { name: "style", type: "React.CSSProperties", default: "undefined", description: "Inline styles on the section." },
    ],
    usage: '<HeroDotEarth title="Deploy close to every user." accent="#7fb3ff" oceanDots={0.2} />',
  },
];
