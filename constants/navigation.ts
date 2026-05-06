import type { NavItem } from "@/types";

/**
 * Top-bar menu — homepage sections only. The four work-category entries
 * (Research / Awards / Open Source / Products) are deliberately removed
 * from the nav because they live as tabs *inside* the "What we build"
 * section. Surfacing them at both levels duplicated the index.
 *
 * "Contact" is also intentionally omitted — the contact email is the
 * single visible item in the footer, and a top-nav link to the bottom
 * of the page felt redundant with the footer that's always one scroll
 * away. The Footer's `id="contact"` anchor is preserved so any future
 * external link to /#contact still works.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "What we do", id: "what-we-do" },
  { label: "What we build", id: "what-we-build" },
  { label: "Who we are", id: "team" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/wigtn",
  linkedin: "https://linkedin.com/company/wigtn",
} as const;
