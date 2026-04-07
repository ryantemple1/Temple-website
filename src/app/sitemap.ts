import { MetadataRoute } from "next";
import { services } from "@/data/services";

const BASE_URL = "https://www.templelandscaping.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date("2026-04-04"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2026-04-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date("2026-04-04"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/lawn-care`,
      lastModified: new Date("2026-04-04"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/exterior-cleaning`,
      lastModified: new Date("2026-04-04"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date("2026-04-04"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages];
}
