import type { MetadataRoute } from "next";
import { ORG_NAME, TAGLINE } from "@/lib/brand";

export const dynamic = "force-static";

/* For the icon a phone shows when the site is added to a home screen, and the
 * colour around it. The icons are app/icon.png resized; the colours are the
 * dark theme's paper (#0E0E10), the site's default. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ORG_NAME,
    short_name: ORG_NAME,
    description: TAGLINE,
    start_url: "/",
    display: "browser",
    background_color: "#0e0e10",
    theme_color: "#0e0e10",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
