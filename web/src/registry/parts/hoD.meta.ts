import type { EffectMeta } from "@/registry/meta";

const linkType = "{ label: string; href: string }";

export const hoDMeta: EffectMeta[] = [
  {
    slug: "hero-dot-worldmap",
    component: "HeroDotWorldmap",
    title: "Hero Dot Worldmap",
    description: "A full-width dot-matrix world map in the style of live traffic and threat maps: pulsing city nodes, lifted arcs with bright heads and fading trails, impact rings, a ticking stats panel and a live feed of the last five events. Hover a city to see its label and routes.",
    category: "hero",
    tags: ["hero", "world map", "dots", "arcs", "network", "canvas"],
    props: [
      { name: "title", type: "string", default: '"Watch the whole network breathe."', description: "Headline at the bottom left, over the gradient." },
      { name: "subtitle", type: "string", default: '"Live traffic and threat telemetry from 28 regions, drawn on one map. Drop it into a status page, a NOC wall or a security console."', description: "Gray paragraph under the headline. Empty hides it." },
      { name: "caption", type: "string", default: '"28 regions · live arcs · MIT licensed"', description: "Small mono line above the install row. Empty hides it." },
      { name: "command", type: "string", default: '"npx hyperblur add hero-dot-worldmap"', description: "Shell command in the box with a copy button. Empty hides the box." },
      { name: "primaryCta", type: `${linkType} | null`, default: '{ label: "Open console", href: "#" }', description: "Solid accent button next to the command. Pass null to hide it." },
      { name: "brand", type: "string", default: '"Vantage"', description: "Wordmark next to the logo mark in the top bar." },
      { name: "nav", type: `${linkType}[]`, default: '[{ label: "Network", href: "#" }, { label: "Threats", href: "#" }, { label: "Docs", href: "#" }]', description: "Centered mono links in the top bar. Hidden below 640px of container width." },
      { name: "navCta", type: `${linkType} | null`, default: '{ label: "Sign in", href: "#" }', description: "Outlined mono button at the right of the top bar. Pass null to hide it." },
      { name: "learnMore", type: `${linkType} | null`, default: '{ label: "Learn more", href: "#" }', description: "Small cue with a bobbing chevron at the bottom center. Pass null to hide it." },
      { name: "accent", type: "string", default: '"#38d9c0"', description: "Color of normal traffic arcs, coastlines, node rings and the primary button. The button text switches between dark and white for contrast when a hex color is given." },
      { name: "alert", type: "string", default: '"#ff5a5f"', description: "Color of hot arcs (threats), their impact rings and the threat tags in the feed." },
      { name: "density", type: "number", default: "1", description: "Multiplier for the dot grid (about 15,000 dots at 1 on a wide desktop, fewer on small screens). Kept between 0.2 and 2." },
      { name: "speed", type: "number", default: "1", description: "Multiplier for the arcs, pulses and scan sweep. 0 freezes the map but keeps the pointer tilt and hover." },
      { name: "nodes", type: "{ name: string; lon: number; lat: number }[]", default: "28 world cities", description: "Activity nodes placed by longitude and latitude. The default list covers San Francisco, New York, Sao Paulo, London, Lagos, Johannesburg, Cairo, Dubai, Mumbai, Singapore, Tokyo, Sydney and more." },
      { name: "routes", type: "[string, string][]", default: "undefined", description: "Pairs of node names that arcs travel between, in either direction. When omitted, about three routes per node are picked pseudo-randomly." },
      { name: "rate", type: "number", default: "1.4", description: "Arcs launched per second. At 1.4 about 8 to 10 arcs are in the air at once. Markers that fall on water are moved to the nearest inland cell of the map. Kept between 0.2 and 6." },
      { name: "showFeed", type: "boolean", default: "true", description: "Shows the live feed of the last 5 events at the top right. Hidden below 980px of container width, where the stats panel shows the latest event instead." },
      { name: "showStats", type: "boolean", default: "true", description: "Shows the stats panel with events per second, live routes, blocked threats and the legend. Collapses to a single pill on small screens." },
      { name: "headingAs", type: '"h1" | "h2"', default: '"h1"', description: "Heading level of the title. Use h2 when the page already has an h1." },
      { name: "onSearch", type: "() => void", default: "undefined", description: "Called when the search icon button in the top bar is pressed." },
      { name: "className", type: "string", default: '""', description: "Extra classes on the section." },
      { name: "style", type: "React.CSSProperties", default: "undefined", description: "Inline styles on the section." },
    ],
    usage: '<HeroDotWorldmap title="Every request, everywhere." accent="#7fb3ff" routes={[["Tokyo", "Frankfurt"], ["New York", "London"], ["Sao Paulo", "Lagos"]]} />',
  },
];
