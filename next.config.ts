import type { NextConfig } from "next";

/* No `trailingSlash`. The Pages workflow runs actions/configure-pages with
 * static_site_generator: next, which supplies its own Next config, so the
 * deployed build has always exported flat files (`team.html`, not
 * `team/index.html`) and `trailingSlash: true` here only ever applied
 * locally. That split meant `wigtn.com/team` served 200 while `/team/` 404'd.
 * Matching the deployed behaviour keeps local and production URLs identical. */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
