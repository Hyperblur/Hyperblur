import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  Catalog,
  CatalogError,
  UnknownCategoryError,
  UnknownEffectError,
  importLine,
  itemKind,
  resolveSiteUrl,
} from "../src/catalog.ts";
import { SITE, mockFetch, siteRoutes } from "./fixtures.ts";

function makeCatalog(routes = siteRoutes(), now = () => 0) {
  const mock = mockFetch(routes);
  const catalog = new Catalog({ siteUrl: SITE, fetch: mock.fetch, now });
  return { catalog, calls: mock.calls };
}

describe("resolveSiteUrl", () => {
  it("defaults to the public site", () => {
    assert.equal(resolveSiteUrl({}), "https://hyperblur.vercel.app");
  });

  it("honors HYPERBLUR_SITE_URL and strips trailing slashes", () => {
    assert.equal(resolveSiteUrl({ HYPERBLUR_SITE_URL: "http://localhost:3000/" }), "http://localhost:3000");
  });

  it("rejects invalid URLs", () => {
    assert.throws(() => resolveSiteUrl({ HYPERBLUR_SITE_URL: "not a url" }), CatalogError);
    assert.throws(() => resolveSiteUrl({ HYPERBLUR_SITE_URL: "ftp://example.com" }), CatalogError);
  });
});

describe("search", () => {
  it("returns every effect in catalog order without a query", async () => {
    const { catalog } = makeCatalog();
    const { total, results } = await catalog.search();
    assert.equal(total, 11);
    assert.deepEqual(
      results.map((effect) => effect.slug),
      ["glitch-text", "vhs-overlay", "scanlines", "tilt-card", "pixel-reveal", "glass-card", "status-badge", "stat-tile", "pricing-card", "press-button", "hero-banner"].slice(0, 10),
    );
    const all = await catalog.search({ limit: 50 });
    assert.deepEqual(
      all.results.map((effect) => effect.slug),
      ["glitch-text", "vhs-overlay", "scanlines", "tilt-card", "pixel-reveal", "glass-card", "status-badge", "stat-tile", "pricing-card", "press-button", "hero-banner"],
    );
  });

  it("matches case-insensitively across slug, title, description and tags", async () => {
    const { catalog } = makeCatalog();
    const { results } = await catalog.search({ query: "GLITCH" });
    assert.deepEqual(
      results.map((effect) => effect.slug),
      ["glitch-text", "scanlines", "vhs-overlay"],
    );
  });

  it("ranks title and slug hits ahead of tag and description hits", async () => {
    const { catalog } = makeCatalog();
    const { results } = await catalog.search({ query: "overlay" });
    assert.equal(results[0]?.slug, "vhs-overlay");
    const retro = await catalog.search({ query: "crt" });
    assert.deepEqual(
      retro.results.map((effect) => effect.slug),
      ["scanlines"],
    );
  });

  it("requires every query word to match", async () => {
    const { catalog } = makeCatalog();
    const { results } = await catalog.search({ query: "retro chroma" });
    assert.deepEqual(
      results.map((effect) => effect.slug),
      ["vhs-overlay"],
    );
  });

  it("filters by category and applies the limit", async () => {
    const { catalog } = makeCatalog();
    const overlays = await catalog.search({ category: "overlay" });
    assert.deepEqual(
      overlays.results.map((effect) => effect.slug),
      ["vhs-overlay", "scanlines"],
    );
    const limited = await catalog.search({ category: "overlay", limit: 1 });
    assert.equal(limited.total, 2);
    assert.equal(limited.results.length, 1);
  });

  it("filters by categories that the index gained, including blocks and micro", async () => {
    const { catalog } = makeCatalog();
    const blocks = await catalog.search({ category: "blocks" });
    assert.deepEqual(
      blocks.results.map((effect) => effect.slug),
      ["hero-banner"],
    );
    const micro = await catalog.search({ category: "micro" });
    assert.deepEqual(
      micro.results.map((effect) => effect.slug),
      ["press-button"],
    );
    const components = await catalog.search({ category: "components", limit: 2 });
    assert.equal(components.total, 4);
    assert.equal(components.results.length, 2);
  });

  it("combines a category with a query", async () => {
    const { catalog } = makeCatalog();
    const { total, results } = await catalog.search({ category: "components", query: "card" });
    assert.equal(total, 2);
    assert.deepEqual(
      results.map((effect) => effect.slug).sort(),
      ["glass-card", "pricing-card"],
    );
    const none = await catalog.search({ category: "hover", query: "badge" });
    assert.equal(none.total, 0);
  });

  it("matches categories case-insensitively and ignores surrounding whitespace", async () => {
    const { catalog } = makeCatalog();
    const { results } = await catalog.search({ category: "  Hover " });
    assert.deepEqual(
      results.map((effect) => effect.slug),
      ["tilt-card"],
    );
  });

  it("rejects an unknown category and lists the available ones", async () => {
    const { catalog } = makeCatalog();
    await assert.rejects(catalog.search({ category: "sparkles" }), (error: unknown) => {
      assert.ok(error instanceof UnknownCategoryError);
      assert.ok(error instanceof CatalogError);
      assert.equal(error.category, "sparkles");
      assert.deepEqual(error.validCategories, ["text", "overlay", "hover", "motion", "components", "micro", "blocks"]);
      assert.equal(
        error.message,
        'Unknown category "sparkles". Available categories: text, overlay, hover, motion, components, micro, blocks.',
      );
      return true;
    });
    await assert.rejects(catalog.search({ category: "" }), UnknownCategoryError);
  });

  it("validates categories against the fetched index, not a fixed list", async () => {
    const routes = siteRoutes();
    const base = routes[`${SITE}/r/index.json`] as { items: Record<string, unknown>[] };
    routes[`${SITE}/r/index.json`] = {
      ...base,
      items: [...base.items, { ...base.items[0], slug: "extra-sparkle", title: "Extra Sparkle", category: "sparkles" }],
    };
    const { catalog } = makeCatalog(routes);
    const { results } = await catalog.search({ category: "sparkles" });
    assert.deepEqual(
      results.map((effect) => effect.slug),
      ["extra-sparkle"],
    );
    await assert.rejects(catalog.search({ category: "nothing" }), /Available categories: .*sparkles/);
  });

  it("returns an empty result when nothing matches", async () => {
    const { catalog } = makeCatalog();
    const { total, results } = await catalog.search({ query: "zzz" });
    assert.equal(total, 0);
    assert.equal(results.length, 0);
  });

  it("builds install commands and registry URLs from the configured site", async () => {
    const { catalog } = makeCatalog();
    const effect = await catalog.getEffect("glitch-text");
    assert.equal(effect.install, `npx shadcn@latest add ${SITE}/r/glitch-text.json`);
    assert.equal(effect.file, `${SITE}/r/glitch-text.json`);
    assert.equal(effect.docs, `${SITE}/effects/glitch-text`);
  });
});

describe("listCategories", () => {
  it("returns every category in index order with its count and three example titles", async () => {
    const { catalog } = makeCatalog();
    const categories = await catalog.listCategories();
    assert.deepEqual(categories, [
      { category: "text", count: 1, examples: ["Glitch Text"] },
      { category: "overlay", count: 2, examples: ["VHS Overlay", "Scanlines"] },
      { category: "hover", count: 1, examples: ["Tilt Card"] },
      { category: "motion", count: 1, examples: ["Pixel Reveal"] },
      { category: "components", count: 4, examples: ["Glass Card", "Status Badge", "Stat Tile"] },
      { category: "micro", count: 1, examples: ["Press Button"] },
      { category: "blocks", count: 1, examples: ["Hero Banner"] },
    ]);
  });

  it("covers every item exactly once", async () => {
    const { catalog } = makeCatalog();
    const categories = await catalog.listCategories();
    assert.equal(
      categories.reduce((sum, entry) => sum + entry.count, 0),
      11,
    );
  });
});

describe("itemKind", () => {
  it("calls components and micro interactions components, blocks blocks, and the rest effects", () => {
    assert.equal(itemKind("components"), "component");
    assert.equal(itemKind("micro"), "component");
    assert.equal(itemKind("blocks"), "block");
    for (const category of ["text", "motion", "overlay", "hover", "anything-else"]) {
      assert.equal(itemKind(category), "effect");
    }
  });
});

describe("getEffect", () => {
  it("returns the effect for a known slug, tolerating case and whitespace", async () => {
    const { catalog } = makeCatalog();
    const effect = await catalog.getEffect("  Tilt-Card ");
    assert.equal(effect.component, "TiltCard");
    assert.equal(effect.props[0]?.name, "max");
    assert.equal(importLine(effect), 'import { TiltCard } from "@/components/hyperblur/tilt-card";');
  });

  it("suggests close matches for typos", async () => {
    const { catalog } = makeCatalog();
    await assert.rejects(catalog.getEffect("glich-text"), /Did you mean "glitch-text"/);
    await assert.rejects(catalog.getEffect("scanline"), /Did you mean "scanlines"/);
  });

  it("throws UnknownEffectError listing valid slugs", async () => {
    const { catalog } = makeCatalog();
    await assert.rejects(catalog.getEffect("glitch"), (error: unknown) => {
      assert.ok(error instanceof UnknownEffectError);
      assert.deepEqual(error.validSlugs, ["glitch-text", "vhs-overlay", "scanlines", "tilt-card", "pixel-reveal", "glass-card", "status-badge", "stat-tile", "pricing-card", "press-button", "hero-banner"]);
      assert.match(error.message, /Unknown effect "glitch"/);
      assert.match(error.message, /Did you mean "glitch-text"/);
      assert.match(error.message, /Valid slugs: glitch-text, vhs-overlay, scanlines, tilt-card, pixel-reveal/);
      return true;
    });
  });
});

describe("getSource", () => {
  it("returns the registry file content and target", async () => {
    const { catalog } = makeCatalog();
    const source = await catalog.getSource("glitch-text");
    assert.equal(source.files.length, 1);
    assert.equal(source.files[0]?.target, "components/hyperblur/glitch-text.tsx");
    assert.match(source.files[0]?.content ?? "", /export function GlitchText/);
  });

  it("reports a missing registry item clearly", async () => {
    const { catalog } = makeCatalog();
    await assert.rejects(catalog.getSource("tilt-card"), /HTTP 404 Not Found/);
  });
});

describe("index caching", () => {
  it("fetches the index once within the TTL and again after it expires", async () => {
    let clock = 0;
    const { catalog, calls } = makeCatalog(siteRoutes(), () => clock);
    await catalog.search({ query: "glitch" });
    await catalog.getEffect("glitch-text");
    clock = 4 * 60 * 1000;
    await catalog.search();
    assert.equal(calls.filter((url) => url.endsWith("/r/index.json")).length, 1);
    clock = 5 * 60 * 1000 + 1;
    await catalog.search();
    assert.equal(calls.filter((url) => url.endsWith("/r/index.json")).length, 2);
  });

  it("shares one request between concurrent callers", async () => {
    const { catalog, calls } = makeCatalog();
    await Promise.all([catalog.search(), catalog.getEffect("scanlines"), catalog.listSlugs()]);
    assert.equal(calls.length, 1);
  });

  it("serves the stale index when a refresh fails", async () => {
    let clock = 0;
    let online = true;
    const routes = siteRoutes();
    const mock = mockFetch(routes);
    const flaky: typeof fetch = async (input, init) => {
      if (!online) throw new TypeError("fetch failed", { cause: { code: "ECONNREFUSED" } });
      return mock.fetch(input, init);
    };
    const catalog = new Catalog({ siteUrl: SITE, fetch: flaky, now: () => clock });
    await catalog.getIndex();
    online = false;
    clock = 10 * 60 * 1000;
    const { total } = await catalog.search();
    assert.equal(total, 11);
  });
});

describe("site errors", () => {
  it("explains when the site is unreachable", async () => {
    const failing: typeof fetch = async () => {
      throw new TypeError("fetch failed", { cause: { code: "ECONNREFUSED" } });
    };
    const catalog = new Catalog({ siteUrl: SITE, fetch: failing });
    await assert.rejects(catalog.search(), (error: unknown) => {
      assert.ok(error instanceof CatalogError);
      assert.match(error.message, /Could not reach the Hyperblur site at http:\/\/localhost:3000/);
      assert.match(error.message, /ECONNREFUSED/);
      assert.match(error.message, /HYPERBLUR_SITE_URL/);
      return true;
    });
  });

  it("reports HTTP errors and invalid JSON", async () => {
    const notFound = makeCatalog({}).catalog;
    await assert.rejects(notFound.search(), /responded with HTTP 404/);
    const broken = makeCatalog({ [`${SITE}/r/index.json`]: () => new Response("<html>", { status: 200 }) }).catalog;
    await assert.rejects(broken.search(), /did not return valid JSON/);
  });

  it("rejects an index with the wrong shape", async () => {
    const { catalog } = makeCatalog({ [`${SITE}/r/index.json`]: { items: [{ slug: 1 }] } });
    await assert.rejects(catalog.search(), /unexpected shape/);
  });

  it("does not cache failures", async () => {
    let online = false;
    const mock = mockFetch(siteRoutes());
    const flaky: typeof fetch = async (input, init) => {
      if (!online) throw new TypeError("fetch failed");
      return mock.fetch(input, init);
    };
    const catalog = new Catalog({ siteUrl: SITE, fetch: flaky });
    await assert.rejects(catalog.search(), CatalogError);
    online = true;
    const { total } = await catalog.search();
    assert.equal(total, 11);
  });
});
