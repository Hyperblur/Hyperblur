export const SITE = "http://localhost:3000";

function extraItem(slug: string, component: string, title: string, description: string, category: string, tags: string[]) {
  return {
    slug,
    component,
    title,
    description,
    category,
    tags,
    props: [],
    usage: `<${component} />`,
    dependencies: [],
    install: `npx shadcn@latest add https://hyperblur.dev/r/${slug}.json`,
    docs: `https://hyperblur.dev/effects/${slug}`,
    file: `https://hyperblur.dev/r/${slug}.json`,
  };
}

export const index = {
  name: "hyperblur",
  homepage: "https://hyperblur.dev",
  generatedAt: "2026-10-31T00:00:00.000Z",
  items: [
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
      ],
      usage: '<GlitchText text="HYPERBLUR" intensity={2} />',
      dependencies: [],
      install: "npx shadcn@latest add https://hyperblur.dev/r/glitch-text.json",
      docs: "https://hyperblur.dev/effects/glitch-text",
      file: "https://hyperblur.dev/r/glitch-text.json",
    },
    {
      slug: "vhs-overlay",
      component: "VhsOverlay",
      title: "VHS Overlay",
      description: "Tracking lines, chroma bleed and a glitch band rolling over the content.",
      category: "overlay",
      tags: ["vhs", "retro", "overlay"],
      props: [],
      usage: "<VhsOverlay />",
      dependencies: [],
      install: "npx shadcn@latest add https://hyperblur.dev/r/vhs-overlay.json",
      docs: "https://hyperblur.dev/effects/vhs-overlay",
      file: "https://hyperblur.dev/r/vhs-overlay.json",
    },
    {
      slug: "scanlines",
      component: "Scanlines",
      title: "Scanlines",
      description: "CRT scanlines with a soft flicker.",
      category: "overlay",
      tags: ["crt", "retro", "glitchy"],
      props: [],
      usage: "<Scanlines />",
      dependencies: [],
      install: "npx shadcn@latest add https://hyperblur.dev/r/scanlines.json",
      docs: "https://hyperblur.dev/effects/scanlines",
      file: "https://hyperblur.dev/r/scanlines.json",
    },
    {
      slug: "tilt-card",
      component: "TiltCard",
      title: "Tilt Card",
      description: "A card that tilts in 3D toward the pointer.",
      category: "hover",
      tags: ["3d", "hover", "card"],
      props: [{ name: "max", type: "number", default: "12", description: "Maximum tilt in degrees." }],
      usage: "<TiltCard>...</TiltCard>",
      dependencies: [],
      install: "npx shadcn@latest add https://hyperblur.dev/r/tilt-card.json",
      docs: "https://hyperblur.dev/effects/tilt-card",
      file: "https://hyperblur.dev/r/tilt-card.json",
    },
    extraItem("pixel-reveal", "PixelReveal", "Pixel Reveal", "Reveals content through a dissolving grid of pixels.", "motion", ["reveal", "pixels"]),
    extraItem("glass-card", "GlassCard", "Glass Card", "A frosted panel with a soft border.", "components", ["card", "frosted"]),
    extraItem("status-badge", "StatusBadge", "Status Badge", "A compact pill that shows a state.", "components", ["badge", "pill"]),
    extraItem("stat-tile", "StatTile", "Stat Tile", "A metric with a label and a trend marker.", "components", ["metric", "tile"]),
    extraItem("pricing-card", "PricingCard", "Pricing Card", "A plan card with a feature list.", "components", ["pricing", "plan"]),
    extraItem("press-button", "PressButton", "Press Button", "A button that sinks slightly when pressed.", "micro", ["button", "press"]),
    extraItem("hero-banner", "HeroBanner", "Hero Banner", "A full-width section with a headline and a call to action.", "blocks", ["hero", "landing"]),
  ],
};

export const glitchItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "glitch-text",
  type: "registry:component",
  title: "Glitch Text",
  dependencies: [],
  registryDependencies: [],
  files: [
    {
      path: "registry/hyperblur/glitch-text.tsx",
      type: "registry:component",
      target: "components/hyperblur/glitch-text.tsx",
      content: '"use client";\n\nexport function GlitchText() {\n  return null;\n}\n',
    },
  ],
};

export interface MockFetch {
  fetch: typeof fetch;
  calls: string[];
}

export function mockFetch(routes: Record<string, unknown | (() => Response)>): MockFetch {
  const calls: string[] = [];
  const impl = async (input: string | URL | Request): Promise<Response> => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    calls.push(url);
    const route = routes[url];
    if (route === undefined) {
      return new Response("not found", { status: 404, statusText: "Not Found" });
    }
    if (typeof route === "function") {
      return (route as () => Response)();
    }
    return new Response(JSON.stringify(route), { status: 200, headers: { "content-type": "application/json" } });
  };
  return { fetch: impl as typeof fetch, calls };
}

export function siteRoutes(): Record<string, unknown> {
  return {
    [`${SITE}/r/index.json`]: index,
    [`${SITE}/r/glitch-text.json`]: glitchItem,
  };
}
