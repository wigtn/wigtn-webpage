export { Navigation } from "./Navigation";
export { Crew } from "./Crew";
export { WhatWeDo } from "./WhatWeDo";
export { Categories } from "./Categories";
export { Team } from "./Team";
export { Footer } from "./Footer";

// Retired from the homepage tree but kept exportable so the
// `/projects` page and any deep-linked routes that still import them
// continue to resolve. Safe to drop once we audit external consumers.
export { Marquee } from "./Marquee";
export { About } from "./About";
export { Pillars } from "./Pillars";
export { Products } from "./Products";
export { FeaturedWork } from "./FeaturedWork";
