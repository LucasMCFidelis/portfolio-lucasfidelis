import type { MetadataRoute } from "next";

import { appSections } from "@/utils/lists/appSections";
import { getSiteUrl } from "@/utils/siteConfig";

const routes = [
  { path: appSections.home.href, priority: 1 },
  { path: appSections.about.href, priority: 0.8 },
  { path: appSections.projects.href, priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return routes.map(({ path, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
