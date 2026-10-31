import type { MetadataRoute } from "next";
import { SITE_URL, effects } from "@/registry/meta";

const staticRoutes = [
  "",
  "/effects",
  "/docs/introduction",
  "/docs/installation",
  "/docs/agents",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...effects.map((effect) => ({
      url: `${SITE_URL}/effects/${effect.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
