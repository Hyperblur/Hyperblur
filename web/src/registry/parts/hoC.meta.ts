import type { EffectMeta } from "@/registry/meta";

const linkType = "{ label: string; href: string }";

function chrome(slug: string, d: { title: string; subtitle: string; caption: string; brand: string; nav: string; primary: string; accent: string; density: string; speed: string }) {
  return [
    { name: "title", type: "string", default: `"${d.title}"`, description: "Headline at the bottom left." },
    { name: "subtitle", type: "string", default: `"${d.subtitle}"`, description: "Gray paragraph under the headline. Empty hides it." },
    { name: "caption", type: "string", default: `"${d.caption}"`, description: "Small mono line above the install row. Empty hides it." },
    { name: "command", type: "string", default: `"npx hyperblur add ${slug}"`, description: "Shell command in the box with a copy button. Empty hides the box." },
    { name: "primaryCta", type: `${linkType} | null`, default: `{ label: "${d.primary}", href: "#" }`, description: "Solid accent button with a chevron next to the command. Pass null to hide it." },
    { name: "brand", type: "string", default: `"${d.brand}"`, description: "Wordmark next to the logo mark in the top bar." },
    { name: "nav", type: `${linkType}[]`, default: d.nav, description: "Centered mono links in the top bar. Hidden below 640px of container width." },
    { name: "navCta", type: `${linkType} | null`, default: '{ label: "Sign in", href: "#" }', description: "Outlined mono button at the right of the top bar. Pass null to hide it." },
    { name: "learnMore", type: `${linkType} | null`, default: '{ label: "Learn more", href: "#" }', description: "Small cue with a bobbing chevron at the bottom center. Pass null to hide it." },
    { name: "accent", type: "string", default: `"${d.accent}"`, description: "Rim color of the hologram, the scan line, the glow and the primary button. The button text switches between dark and white for contrast when a hex color is given." },
    { name: "density", type: "number", default: "1", description: d.density },
    { name: "speed", type: "number", default: "1", description: d.speed },
  ];
}

const tail = [
  { name: "headingAs", type: '"h1" | "h2"', default: '"h1"', description: "Heading level of the title. Use h2 when the page already has an h1." },
  { name: "onSearch", type: "() => void", default: "undefined", description: "Called when the search icon button in the top bar is pressed." },
  { name: "className", type: "string", default: '""', description: "Extra classes on the section." },
  { name: "style", type: "React.CSSProperties", default: "undefined", description: "Inline styles on the section." },
];

export const hoCMeta: EffectMeta[] = [
  {
    slug: "hero-dot-text",
    component: "HeroDotText",
    title: "Hero Dot Text",
    description: "A black hero where any word is drawn as extruded 3D letters made of tiny dots. The word swings like a pendulum, a scan band sweeps across it from left to right, the signal flickers now and then, and the dots part around the pointer.",
    category: "hero",
    tags: ["hero", "text", "hologram", "3d", "canvas", "dots"],
    props: [
      ...chrome("hero-dot-text", {
        title: "Type that floats off the page.",
        subtitle: "Any word becomes a hologram of extruded dots that sways, scans and leans toward the pointer. One canvas, zero dependencies.",
        caption: "Any word · 5 depth layers · MIT licensed",
        brand: "Glyphwork",
        nav: '[{ label: "Fonts", href: "#" }, { label: "Showcase", href: "#" }, { label: "Pricing", href: "#" }]',
        primary: "Try it free",
        accent: "#5ee7ff",
        density: "Multiplier for the point budget (up to about 18,000 points at 1 on wide screens, half that below 640px). The letters are re-sampled to fit the size of the hero. Kept between 0.2 and 2.",
        speed: "Multiplier for the swing, the scan sweep and the floating motes. 0 holds the word still while it keeps leaning toward the pointer.",
      }),
      { name: "word", type: "string", default: '"HYPERBLUR"', description: "The word to draw. It is rendered with the section font at weight 800 once the fonts have loaded, and re-sampled when it changes. Short words read best; an empty string draws nothing." },
      { name: "depth", type: "number", default: "0.18", description: "Extrusion depth as a share of the glyph height, from 0.02 to 1." },
      { name: "swing", type: "number", default: "32", description: "Pendulum amplitude around the vertical axis in degrees, from 0 to 80." },
      ...tail,
    ],
    usage: '<HeroDotText word="LAUNCH" title="Ship words that glow." accent="#7fb3ff" />',
  },
  {
    slug: "hero-dot-logo",
    component: "HeroDotLogo",
    title: "Hero Dot Logo",
    description: "A black hero that turns an SVG path into a spinning hologram of extruded dots, with dim back faces, lit side walls, an upward scan band, brief signal flicker and pointer tilt. Defaults to the Hyperblur mark.",
    category: "hero",
    tags: ["hero", "logo", "svg", "hologram", "3d", "canvas"],
    props: [
      ...chrome("hero-dot-logo", {
        title: "Your mark, projected in three dimensions.",
        subtitle: "Drop in any SVG path and it turns into a spinning hologram of extruded dots, back faces dimmed and edges lit. Plain source, no runtime.",
        caption: "Any SVG path · 6 depth layers · MIT licensed",
        brand: "Slipstream",
        nav: '[{ label: "Product", href: "#" }, { label: "Brand kit", href: "#" }, { label: "Changelog", href: "#" }]',
        primary: "Upload your mark",
        accent: "#2f7bff",
        density: "Multiplier for the point budget (up to about 18,000 points at 1 on wide screens, half that below 640px). The mark is re-sampled to fit the size of the hero. Kept between 0.2 and 2.",
        speed: "Multiplier for the spin, the scan sweep and the floating motes. 0 holds the mark still while it keeps tilting toward the pointer.",
      }),
      { name: "path", type: "string", default: '"M18.0 9.0 H33.0 L28.0 23.0 H13.0 Z M13.5 9.0 H16.1 L11.1 23.0 H8.5 Z M10.0 9.0 H11.6 L6.6 23.0 H5.0 Z M7.2 9.0 H8.1 L3.1 23.0 H2.2 Z"', description: "SVG path data (the d attribute) of the mark, filled with the nonzero rule. Several subpaths are fine. Falls back to the default mark when the path draws nothing." },
      { name: "viewBox", type: "string", default: '"0 0 36 32"', description: "The viewBox the path coordinates refer to, as four numbers." },
      { name: "depth", type: "number", default: "0.35", description: "Extrusion depth as a share of the mark height, from 0.02 to 1.5." },
      { name: "spin", type: "boolean", default: "true", description: "Full slow turn around the vertical axis. When false the mark swings gently instead." },
      ...tail,
    ],
    usage: '<HeroDotLogo path="M4 4 H28 V28 H4 Z M10 10 V22 H22 V10 Z" viewBox="0 0 32 32" accent="#7fb3ff" />',
  },
  {
    slug: "hero-dot-silhouette",
    component: "HeroDotSilhouette",
    title: "Hero Dot Silhouette",
    description: "A black hero that turns an SVG or PNG into a hologram of dots: the shape comes from the alpha channel (or from dark pixels when there is none) and the depth from the image tones. It sways gently with an upward scan band. Defaults to a rocket.",
    category: "hero",
    tags: ["hero", "image", "silhouette", "hologram", "canvas", "dots"],
    props: [
      ...chrome("hero-dot-silhouette", {
        title: "Launch day, rendered in light.",
        subtitle: "Feed it any SVG or PNG and the outline becomes a hologram of dots with relief taken from its tones. Ships as one file you own.",
        caption: "SVG or PNG · luminance relief · MIT licensed",
        brand: "Apogee",
        nav: '[{ label: "Missions", href: "#" }, { label: "Telemetry", href: "#" }, { label: "Careers", href: "#" }]',
        primary: "Book a launch",
        accent: "#ff8a4c",
        density: "Multiplier for the point budget (up to about 18,000 points at 1 on wide screens, half that below 640px). The image is re-sampled to fit the size of the hero. Kept between 0.2 and 2.",
        speed: "Multiplier for the sway, the scan sweep and the floating motes. 0 holds the shape still while it keeps leaning toward the pointer.",
      }),
      { name: "src", type: "string", default: "rocket SVG data URI", description: "Image to project: a data URI or a URL of an SVG or PNG. Transparent images use their alpha as the shape; opaque ones use dark pixels. Cross-origin images need CORS headers; if the image fails to load or cannot be read, the default rocket is shown." },
      { name: "relief", type: "number", default: "0.25", description: "Depth taken from the image tones plus a soft dome toward the middle of the shape, as a share of its height, from 0 to 1. Lighter areas come forward." },
      { name: "swing", type: "number", default: "28", description: "Sway amplitude around the vertical axis in degrees, from 0 to 80." },
      ...tail,
    ],
    usage: '<HeroDotSilhouette src="/logo-mark.png" title="Your product, in light." accent="#7fb3ff" />',
  },
];
