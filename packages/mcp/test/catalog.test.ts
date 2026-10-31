import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Catalog, CatalogError, UnknownEffectError, importLine, resolveSiteUrl } from "../src/catalog.ts";
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
    assert.equal(total, 4);
    assert.deepEqual(
      results.map((effect) => effect.slug),
      ["glitch-text", "vhs-overlay", "scanlines", "tilt-card"],
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
      assert.deepEqual(error.validSlugs, ["glitch-text", "vhs-overlay", "scanlines", "tilt-card"]);
      assert.match(error.message, /Unknown effect "glitch"/);
      assert.match(error.message, /Did you mean "glitch-text"/);
      assert.match(error.message, /Valid slugs: glitch-text, vhs-overlay, scanlines, tilt-card/);
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
    assert.equal(total, 4);
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
    assert.equal(total, 4);
  });
});
