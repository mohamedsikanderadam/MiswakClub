import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { legalSlugs } from "@/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...legalSlugs.map((slug) => ({
      url: `${siteConfig.url}/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
