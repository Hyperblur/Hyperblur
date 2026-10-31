import { z } from "zod";

export const DEFAULT_SITE_URL = "https://hyperblur.vercel.app";
export const SITE_URL_ENV = "HYPERBLUR_SITE_URL";
export const INDEX_TTL_MS = 5 * 60 * 1000;
export const FETCH_TIMEOUT_MS = 15_000;
export const EXAMPLES_PER_CATEGORY = 3;

const propSchema = z.object({
  name: z.string(),
  type: z.string(),
  default: z.string().optional(),
  required: z.boolean().optional(),
  description: z.string().default(""),
});

const effectSchema = z.object({
  slug: z.string().min(1),
  component: z.string().min(1),
  title: z.string(),
  description: z.string().default(""),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  props: z.array(propSchema).default([]),
  usage: z.string().default(""),
  dependencies: z.array(z.string()).default([]),
  install: z.string().optional(),
  docs: z.string().optional(),
  file: z.string().optional(),
});

const indexSchema = z.object({
  name: z.string().default("hyperblur"),
  homepage: z.string().optional(),
  generatedAt: z.string().optional(),
  items: z.array(effectSchema),
});

const registryFileSchema = z.object({
  path: z.string(),
  type: z.string().optional(),
  target: z.string().optional(),
  content: z.string(),
});

const registryItemSchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).default([]),
  devDependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(registryFileSchema).min(1),
});

export type EffectProp = z.infer<typeof propSchema>;

export interface Effect {
  slug: string;
  component: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  props: EffectProp[];
  usage: string;
  dependencies: string[];
  install: string;
  docs: string;
  file: string;
}

export interface CatalogIndex {
  name: string;
  homepage: string;
  generatedAt?: string;
  items: Effect[];
}

export interface RegistryFile {
  path: string;
  target: string;
  content: string;
}

export interface EffectSource {
  effect: Effect;
  files: RegistryFile[];
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
}

export interface SearchOptions {
  query?: string;
  category?: string;
  limit?: number;
}

export interface CategorySummary {
  category: string;
  count: number;
  examples: string[];
}

export type ItemKind = "effect" | "component" | "block";

export interface SearchResult {
  total: number;
  results: Effect[];
}

export interface CatalogOptions {
  siteUrl?: string;
  fetch?: typeof fetch;
  ttlMs?: number;
  timeoutMs?: number;
  now?: () => number;
}

export class CatalogError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CatalogError";
  }
}

export class UnknownEffectError extends CatalogError {
  readonly slug: string;
  readonly validSlugs: string[];

  constructor(slug: string, validSlugs: string[]) {
    const suggestions = suggestSlugs(slug, validSlugs);
    const hint = suggestions.length > 0 ? ` Did you mean ${suggestions.map((s) => `"${s}"`).join(" or ")}?` : "";
    super(`Unknown effect "${slug}".${hint} Valid slugs: ${validSlugs.join(", ")}.`);
    this.name = "UnknownEffectError";
    this.slug = slug;
    this.validSlugs = validSlugs;
  }
}

export class UnknownCategoryError extends CatalogError {
  readonly category: string;
  readonly validCategories: string[];

  constructor(category: string, validCategories: string[]) {
    super(`Unknown category "${category}". Available categories: ${validCategories.join(", ")}.`);
    this.name = "UnknownCategoryError";
    this.category = category;
    this.validCategories = validCategories;
  }
}

export function itemKind(category: string): ItemKind {
  const normalized = category.trim().toLowerCase();
  if (normalized === "blocks") return "block";
  if (normalized === "components" || normalized === "micro") return "component";
  return "effect";
}

export function resolveSiteUrl(env: Record<string, string | undefined> = process.env): string {
  const raw = env[SITE_URL_ENV]?.trim() || DEFAULT_SITE_URL;
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new CatalogError(`${SITE_URL_ENV} must be an absolute http(s) URL such as http://localhost:3000, got "${raw}".`);
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new CatalogError(`${SITE_URL_ENV} must use http or https, got "${raw}".`);
  }
  return raw.replace(/\/+$/, "");
}

export function importLine(effect: Effect): string {
  return `import { ${effect.component} } from "@/components/hyperblur/${effect.slug}";`;
}

export class Catalog {
  readonly siteUrl: string;
  readonly indexUrl: string;
  private readonly fetchImpl: typeof fetch;
  private readonly ttlMs: number;
  private readonly timeoutMs: number;
  private readonly now: () => number;
  private cached: { index: CatalogIndex; fetchedAt: number } | undefined;
  private pending: Promise<CatalogIndex> | undefined;
  private readonly sources = new Map<string, { source: EffectSource; fetchedAt: number }>();

  constructor(options: CatalogOptions = {}) {
    this.siteUrl = (options.siteUrl ?? DEFAULT_SITE_URL).replace(/\/+$/, "");
    this.indexUrl = `${this.siteUrl}/r/index.json`;
    this.fetchImpl = options.fetch ?? globalThis.fetch;
    this.ttlMs = options.ttlMs ?? INDEX_TTL_MS;
    this.timeoutMs = options.timeoutMs ?? FETCH_TIMEOUT_MS;
    this.now = options.now ?? Date.now;
  }

  itemUrl(slug: string): string {
    return `${this.siteUrl}/r/${slug}.json`;
  }

  installCommand(slug: string): string {
    return `npx shadcn@latest add ${this.itemUrl(slug)}`;
  }

  async getIndex(): Promise<CatalogIndex> {
    if (this.cached && this.now() - this.cached.fetchedAt < this.ttlMs) {
      return this.cached.index;
    }
    if (!this.pending) {
      this.pending = this.loadIndex()
        .then((index) => {
          this.cached = { index, fetchedAt: this.now() };
          return index;
        })
        .finally(() => {
          this.pending = undefined;
        });
    }
    try {
      return await this.pending;
    } catch (error) {
      if (this.cached) {
        return this.cached.index;
      }
      throw error;
    }
  }

  async listSlugs(): Promise<string[]> {
    const index = await this.getIndex();
    return index.items.map((item) => item.slug);
  }

  async search(options: SearchOptions = {}): Promise<SearchResult> {
    const index = await this.getIndex();
    const limit = Math.max(1, Math.floor(options.limit ?? 10));
    const category = options.category === undefined ? undefined : resolveCategory(options.category, index.items);
    const pool = category === undefined ? index.items : index.items.filter((item) => item.category === category);
    const tokens = tokenize(options.query ?? "");
    if (tokens.length === 0) {
      return { total: pool.length, results: pool.slice(0, limit) };
    }
    const phrase = tokens.join(" ");
    const ranked = pool
      .map((effect, position) => ({ effect, position, rank: rankEffect(effect, tokens, phrase) }))
      .filter((entry): entry is { effect: Effect; position: number; rank: Rank } => entry.rank !== undefined)
      .sort((a, b) => b.rank.tier - a.rank.tier || b.rank.score - a.rank.score || a.position - b.position);
    return { total: ranked.length, results: ranked.slice(0, limit).map((entry) => entry.effect) };
  }

  async listCategories(): Promise<CategorySummary[]> {
    const index = await this.getIndex();
    return summarizeCategories(index.items);
  }

  async getEffect(slug: string): Promise<Effect> {
    const index = await this.getIndex();
    const wanted = normalizeSlug(slug);
    const effect = index.items.find((item) => item.slug === wanted);
    if (!effect) {
      throw new UnknownEffectError(slug, index.items.map((item) => item.slug));
    }
    return effect;
  }

  async getSource(slug: string): Promise<EffectSource> {
    const effect = await this.getEffect(slug);
    const cached = this.sources.get(effect.slug);
    if (cached && this.now() - cached.fetchedAt < this.ttlMs) {
      return cached.source;
    }
    const raw = await this.fetchJson(effect.file, `the registry item for "${effect.slug}"`);
    const parsed = registryItemSchema.safeParse(raw);
    if (!parsed.success) {
      throw new CatalogError(`The registry item at ${effect.file} is not a valid shadcn registry item: ${z.prettifyError(parsed.error)}`);
    }
    const source: EffectSource = {
      effect,
      files: parsed.data.files.map((file) => ({
        path: file.path,
        target: file.target ?? `components/hyperblur/${baseName(file.path)}`,
        content: file.content,
      })),
      dependencies: parsed.data.dependencies,
      devDependencies: parsed.data.devDependencies,
      registryDependencies: parsed.data.registryDependencies,
    };
    this.sources.set(effect.slug, { source, fetchedAt: this.now() });
    return source;
  }

  private async loadIndex(): Promise<CatalogIndex> {
    const raw = await this.fetchJson(this.indexUrl, "the catalog index");
    const parsed = indexSchema.safeParse(raw);
    if (!parsed.success) {
      throw new CatalogError(`The catalog index at ${this.indexUrl} has an unexpected shape: ${z.prettifyError(parsed.error)}`);
    }
    const homepage = (parsed.data.homepage ?? DEFAULT_SITE_URL).replace(/\/+$/, "");
    return {
      name: parsed.data.name,
      homepage: this.siteUrl,
      ...(parsed.data.generatedAt ? { generatedAt: parsed.data.generatedAt } : {}),
      items: parsed.data.items.map((item) => ({
        slug: item.slug,
        component: item.component,
        title: item.title,
        description: item.description,
        category: item.category,
        tags: item.tags,
        props: item.props,
        usage: item.usage,
        dependencies: item.dependencies,
        install: this.installCommand(item.slug),
        docs: item.docs ? this.rebase(item.docs, homepage) : `${this.siteUrl}/effects/${item.slug}`,
        file: this.itemUrl(item.slug),
      })),
    };
  }

  private rebase(url: string, homepage: string): string {
    return url.startsWith(`${homepage}/`) ? `${this.siteUrl}${url.slice(homepage.length)}` : url;
  }

  private async fetchJson(url: string, what: string): Promise<unknown> {
    let response: Response;
    try {
      response = await this.fetchImpl(url, {
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(this.timeoutMs),
      });
    } catch (error) {
      throw new CatalogError(
        `Could not reach the Hyperblur site at ${this.siteUrl} while loading ${what} (${describeFetchError(error, this.timeoutMs)}). ` +
          `Check that the site is online and reachable from this machine, or set ${SITE_URL_ENV} to a reachable Hyperblur instance.`,
      );
    }
    if (!response.ok) {
      const status = `${response.status} ${response.statusText}`.trim();
      throw new CatalogError(`Failed to load ${what}: ${url} responded with HTTP ${status}.`);
    }
    try {
      return await response.json();
    } catch {
      throw new CatalogError(`Failed to load ${what}: ${url} did not return valid JSON.`);
    }
  }
}

export function categoryNames(items: Effect[]): string[] {
  return [...new Set(items.map((item) => item.category))];
}

export function summarizeCategories(items: Effect[]): CategorySummary[] {
  return categoryNames(items).map((category) => {
    const members = items.filter((item) => item.category === category);
    return {
      category,
      count: members.length,
      examples: members.slice(0, EXAMPLES_PER_CATEGORY).map((item) => item.title),
    };
  });
}

function resolveCategory(input: string, items: Effect[]): string {
  const names = categoryNames(items);
  const wanted = input.trim().toLowerCase();
  const match = names.find((name) => name.toLowerCase() === wanted);
  if (match === undefined) {
    throw new UnknownCategoryError(input, names);
  }
  return match;
}

interface Rank {
  tier: number;
  score: number;
}

function rankEffect(effect: Effect, tokens: string[], phrase: string): Rank | undefined {
  const slug = effect.slug.toLowerCase();
  const title = effect.title.toLowerCase();
  const description = effect.description.toLowerCase();
  const tags = effect.tags.map((tag) => tag.toLowerCase());
  let tier = 0;
  let score = 0;
  for (const token of tokens) {
    const inName = slug.includes(token) || title.includes(token);
    const exactTag = tags.includes(token);
    const partialTag = !exactTag && tags.some((tag) => tag.includes(token));
    const inDescription = description.includes(token);
    if (!inName && !exactTag && !partialTag && !inDescription) {
      return undefined;
    }
    if (inName) {
      tier = 1;
      score += 10;
    }
    if (exactTag) score += 5;
    if (partialTag) score += 3;
    if (inDescription) score += 1;
  }
  if (slug === phrase.replace(/ /g, "-") || title === phrase) {
    score += 100;
  } else if (slug.includes(phrase.replace(/ /g, "-")) || title.includes(phrase)) {
    score += 20;
  }
  return { tier, score };
}

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[\s,]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

function normalizeSlug(slug: string): string {
  return slug.trim().toLowerCase().replace(/\.json$/, "").replace(/\s+/g, "-");
}

function baseName(filePath: string): string {
  return filePath.split("/").pop() ?? filePath;
}

function suggestSlugs(input: string, validSlugs: string[]): string[] {
  const wanted = normalizeSlug(input);
  if (wanted.length === 0) return [];
  const parts = wanted.split("-").filter((part) => part.length > 2);
  const close = (a: string, b: string) => editDistance(a, b) <= Math.max(1, Math.floor(Math.min(a.length, b.length) / 4));
  return validSlugs
    .filter(
      (slug) =>
        slug.includes(wanted) ||
        wanted.includes(slug) ||
        parts.some((part) => slug.includes(part)) ||
        close(wanted, slug) ||
        slug.split("-").some((piece) => piece.length > 2 && close(wanted, piece)),
    )
    .slice(0, 3);
}

function editDistance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min((previous[j] ?? 0) + 1, (current[j - 1] ?? 0) + 1, (previous[j - 1] ?? 0) + cost);
    }
    previous = current;
  }
  return previous[b.length] ?? 0;
}

function describeFetchError(error: unknown, timeoutMs: number): string {
  if (error instanceof Error) {
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      return `timed out after ${Math.round(timeoutMs / 1000)}s`;
    }
    const cause = (error as { cause?: unknown }).cause;
    if (cause && typeof cause === "object") {
      const code = (cause as { code?: unknown }).code;
      const message = (cause as { message?: unknown }).message;
      if (typeof code === "string") return code;
      if (typeof message === "string" && message.length > 0) return message;
    }
    return error.message;
  }
  return String(error);
}
