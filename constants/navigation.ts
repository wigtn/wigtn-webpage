import type { NavItem } from "@/types";

/**
 * Top-bar menu — homepage sections only. The four work-category entries
 * (Research / Awards / Open Source / Products) are deliberately removed
 * from the nav because they live as tabs *inside* the "What we build"
 * section. Surfacing them at both levels duplicated the index.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "What we do", id: "what-we-do" },
  { label: "What we build", id: "what-we-build" },
  { label: "Who we are", id: "team" },
  { label: "Contact", id: "contact" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/wigtn",
  linkedin: "https://linkedin.com/company/wigtn",
} as const;
