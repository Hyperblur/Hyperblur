import type { EffectMeta } from "@/registry/meta";

const linkType = "{ label: string; href: string }";

export const hoDMeta: EffectMeta[] = [
  {
    slug: "hero-dot-worldmap",
    component: "HeroDotWorldmap",
    title: "Hero Dot Worldmap",
    description: "Flat dotted world map across the full width on an ocean-blue gradient: light cyan square dots, golden arcs between cities with pulsing pings, headline over the calm Pacific.",
    category: "hero",
    tags: ["hero", "world map", "dots", "arcs", "network", "canvas"],
    props: [
      { name: "title", type: "string", default: '"Every route, live on one map."', description: "Main headline, placed over the calm Pacific." },
      { name: "subtitle", type: "string", default: '"Live traffic and threat telemetry from 28 regions on a single flat map. Built for status pages, NOC walls and security consoles."', description: "Short paragraph under the headline. Empty hides it." },
      { name: "caption", type: "string", default: '"28 regions · live arcs · MIT licensed"', description: "Small caption line next to the actions. Empty hides it." },
      { name: "command", type: "string", default: '"npx shadcn@latest add https://hyperblur.dev/r/hero-dot-worldmap.json"', description: "Shell command in the box with a copy button. Empty hides the box." },
      { name: "primaryCta", type: `${linkType} | null`, default: '{ label: "Open console", href: "#" }', description: "Solid accent button next to the command. Pass null to hide it." },
      { name: "brand", type: "string", default: '"Your brand"', description: "Brand name in the top bar. Applies only when showBar is true." },
      { name: "nav", type: `${linkType}[]`, default: '[{ label: "Network", href: "#" }, { label: "Routes", href: "#" }, { label: "Docs", href: "#" }]', description: "Links in the top bar. They collapse on narrow containers. Applies only when showBar is true." },
      { name: "navCta", type: `${linkType} | null`, default: '{ label: "Sign in", href: "#" }', description: "Call-to-action link in the top bar. Pass null to hide it. Applies only when showBar is true." },
      { name: "learnMore", type: `${linkType} | null`, default: '{ label: "Learn more", href: "#" }', description: "Secondary link near the bottom of the hero. Pass null to hide it." },
      { name: "accent", type: "string", default: '"#ffc857"', description: "Color of normal traffic arcs, node rings, the stats details and the primary button. The button text switches between dark and white for contrast when a hex color is given." },
      { name: "alert", type: "string", default: "#ff7a66", description: "Color of hot arcs (threats), their impact rings and the threat tags in the feed." },
      { name: "density", type: "number", default: "1", description: "Multiplier for the dot grid (more dots at higher values, fewer on small screens). Kept between 0.2 and 2." },
      { name: "speed", type: "number", default: "1", description: "Multiplier for the arcs and pulses. 0 freezes the map but keeps the pointer tilt and hover." },
      { name: "nodes", type: "{ name: string; lon: number; lat: number }[]", default: "28 world cities", description: "Activity nodes placed by longitude and latitude. The default list covers San Francisco, New York, Sao Paulo, London, Lagos, Johannesburg, Cairo, Dubai, Mumbai, Singapore, Tokyo, Sydney and more." },
      { name: "routes", type: "[string, string][]", default: "undefined", description: "Pairs of node names that arcs travel between, in either direction. When omitted, about three routes per node are picked pseudo-randomly." },
      { name: "rate", type: "number", default: "1.4", description: "Arcs launched per second. At 1.4 about 8 to 10 arcs are in the air at once. Markers that fall on water are moved to the nearest inland cell of the map. Kept between 0.2 and 6." },
      { name: "showFeed", type: "boolean", default: "true", description: "Shows the live feed of the last 5 events at the top right. Hidden below 980px of container width, where the stats panel shows the latest event instead." },
      { name: "showStats", type: "boolean", default: "true", description: "Shows the stats panel with events per second, live routes, blocked threats and the legend. Collapses to a single pill on small screens." },
      { name: "headingAs", type: '"h1" | "h2"', default: '"h1"', description: "Heading level of the title. Use h2 when the page already has an h1." },
      { name: "showBar", type: "boolean", default: "false", description: "Renders the top navigation bar (brand, links, search and button). Off by default so the block is just the effect." },
      { name: "onSearch", type: "() => void", default: "undefined", description: "Called when the search icon button in the top bar is pressed. Applies only when showBar is true." },
      { name: "className", type: "string", default: '""', description: "Extra classes on the section." },
      { name: "style", type: "React.CSSProperties", default: "undefined", description: "Inline styles on the section." },
    ],
    usage: '<HeroDotWorldmap title="Every request, everywhere." accent="#ffe08a" routes={[["Tokyo", "Frankfurt"], ["New York", "London"], ["Sao Paulo", "Lagos"]]} />',
  },
];
