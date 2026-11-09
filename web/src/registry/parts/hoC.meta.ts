import type { EffectMeta } from "@/registry/meta";

const linkType = "{ label: string; href: string }";

function chrome(slug: string, d: { title: string; subtitle: string; caption: string; brand: string; nav: string; navCta: string; learnMore: string; primary: string; accent: string; accentDesc: string; density: string; speed: string }) {
  return [
    { name: "title", type: "string", default: `"${d.title}"`, description: "Main headline of the hero." },
    { name: "subtitle", type: "string", default: `"${d.subtitle}"`, description: "Short paragraph under the headline. Empty hides it." },
    { name: "caption", type: "string", default: `"${d.caption}"`, description: "Small caption line next to the actions. Empty hides it." },
    { name: "command", type: "string", default: `"npx shadcn@latest add https://hyperblur.dev/r/${slug}.json"`, description: "Shell command in the box with a copy button. Empty hides the box." },
    { name: "primaryCta", type: `${linkType} | null`, default: `{ label: "${d.primary}", href: "#" }`, description: "Solid accent button with a chevron next to the command. Pass null to hide it." },
    { name: "brand", type: "string", default: `"${d.brand}"`, description: "Brand name in the top bar." },
    { name: "nav", type: `${linkType}[]`, default: d.nav, description: "Links in the top bar. They collapse on narrow containers." },
    { name: "navCta", type: `${linkType} | null`, default: `{ label: "${d.navCta}", href: "#" }`, description: "Call-to-action link in the top bar. Pass null to hide it." },
    { name: "learnMore", type: `${linkType} | null`, default: `{ label: "${d.learnMore}", href: "#" }`, description: "Secondary link near the bottom of the hero. Pass null to hide it." },
    { name: "accent", type: "string", default: `"${d.accent}"`, description: `${d.accentDesc} The button text switches between dark and white for contrast when a hex color is given.` },
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
    description: "The word itself is the hero: a giant poster word made of black dots that flies in, forms and drifts, repelling from the cursor, on off-white paper. Minimal mono text bar, small subtitle and CTA below.",
    category: "hero",
    tags: ["hero", "text", "typography", "canvas", "dots"],
    props: [
      ...chrome("hero-dot-text", {
        title: "Type that floats off the page.",
        subtitle: "Turn any word into a living field of dots. One canvas, no dependencies.",
        caption: "Any word · MIT licensed",
        brand: "Glyphwork",
        nav: '[{ label: "Fonts", href: "#" }, { label: "Showcase", href: "#" }, { label: "Pricing", href: "#" }]',
        navCta: "Log in",
        learnMore: "How it works",
        primary: "Get the kit",
        accent: "#0d0d0d",
        accentDesc: "Color of the dots that make up the word, plus the primary button.",
        density: "Multiplier for the number of dots. The letters are re-sampled to fit the size of the hero. Kept between 0.4 and 2.",
        speed: "Multiplier for the fly-in and drifting motion. 0 holds the word still.",
      }),
      { name: "word", type: "string", default: '"HYPERBLUR"', description: "The word to draw. It is rendered with the section font once the fonts have loaded, and re-sampled when it changes. Short words read best; an empty string draws nothing." },
      { name: "depth", type: "number", default: "0.18", description: "Depth of the dots' float as a share of the glyph height, from 0.02 to 1." },
      { name: "swing", type: "number", default: "32", description: "Sway amplitude in degrees, from 0 to 80." },
      ...tail,
    ],
    usage: '<HeroDotText word="LAUNCH" title="Ship words that glow." accent="#e11d48" />',
  },
  {
    slug: "hero-dot-logo",
    component: "HeroDotLogo",
    title: "Hero Dot Logo",
    description: "Light gray stage with a huge graphite dotted mark that swings like a pendulum, casting a soft dotted shadow. Electric lime accents, centered brand bar.",
    category: "hero",
    tags: ["hero", "logo", "svg", "3d", "canvas"],
    props: [
      ...chrome("hero-dot-logo", {
        title: "Your mark, in a thousand dots.",
        subtitle: "Paste any SVG path and it becomes a swinging dotted object with real depth and a soft dotted shadow. One file, no runtime.",
        caption: "Any SVG path · extruded dots · MIT licensed",
        brand: "Slipstream",
        nav: '[{ label: "Product", href: "#" }, { label: "Brand kit", href: "#" }, { label: "Pricing", href: "#" }, { label: "Changelog", href: "#" }]',
        navCta: "Sign in",
        learnMore: "Learn more",
        primary: "Upload your mark",
        accent: "#b6ff3c",
        accentDesc: "Electric accent on the mark's highlight dots, the copy button and the primary button.",
        density: "Multiplier for the number of dots. The mark is re-sampled to fit the size of the hero. Kept between 0.3 and 2.",
        speed: "Multiplier for the swing or spin. 0 holds the mark still while it keeps tilting toward the pointer.",
      }),
      { name: "path", type: "string", default: '"M18.0 9.0 H33.0 L28.0 23.0 H13.0 Z M13.5 9.0 H16.1 L11.1 23.0 H8.5 Z M10.0 9.0 H11.6 L6.6 23.0 H5.0 Z M7.2 9.0 H8.1 L3.1 23.0 H2.2 Z"', description: "SVG path data (the d attribute) of the mark, filled with the nonzero rule. Several subpaths are fine. Falls back to the default mark when the path draws nothing." },
      { name: "viewBox", type: "string", default: '"0 0 36 32"', description: "The viewBox the path coordinates refer to, as four numbers." },
      { name: "depth", type: "number", default: "0.35", description: "Extrusion depth as a share of the mark height, from 0.02 to 1.2." },
      { name: "swing", type: "number", default: "34", description: "Pendulum amplitude around the vertical axis in degrees, from 0 to 80. Ignored when spin is true." },
      { name: "spin", type: "boolean", default: "false", description: "Full slow turn around the vertical axis instead of the swing. The turn slows down through the front and back views and speeds through the edge-on view; back faces are dimmed." },
      ...tail,
    ],
    usage: '<HeroDotLogo path="M4 4 H28 V28 H4 Z M10 10 V22 H22 V10 Z" viewBox="0 0 32 32" accent="#ff5c8a" />',
  },
];
