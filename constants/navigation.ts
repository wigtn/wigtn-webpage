import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "About", id: "about" },
  { label: "Projects", id: "now" },
  { label: "Team", id: "team" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/wigtn",
  linkedin: "https://linkedin.com/company/wigtn",
} as const;
