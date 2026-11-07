import type { MetadataRoute } from "next";
import { SITE_URL, categories, effects } from "@/registry/meta";

const staticRoutes = [
  "",
  "/effects",
  "/components",
  "/blocks",
  "/docs/introduction",
  "/docs/installation",
  "/docs/agents",
  "/templates",
  "/templates/landing",
  "/templates/landing-ai",
  "/templates/landing-devtool",
  "/templates/landing-fintech",
  "/templates/landing-mobile",
  "/templates/landing-agency",
  "/templates/landing-productivity",
  "/templates/landing-clinic",
  "/templates/landing-restaurant",
  "/templates/landing-store",
  "/templates/landing-fitness",
  "/templates/landing-salon",
  "/templates/landing-lab",
  "/templates/pricing",
  "/templates/portfolio",
  "/templates/auth",
  "/templates/dashboard",
  "/templates/shop",
  "/templates/coming-soon",
  "/pro",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...categories.map((c) => ({
      url: `${SITE_URL}/category/${c.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...effects.map((effect) => ({
      url: `${SITE_URL}/effects/${effect.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
