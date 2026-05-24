import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rafael.Dev - AI Automation & Web Development",
    short_name: siteConfig.name,
    description: siteConfig.shortDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#02050d",
    theme_color: "#2563eb",
    categories: ["business", "productivity", "education", "technology"],
    lang: "en",
    icons: [
      {
        src: siteConfig.appIcon,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: siteConfig.appIcon,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
