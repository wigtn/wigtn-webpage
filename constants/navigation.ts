import type { NavItem } from "@/types";

/**
 * Top-bar menu. Each entry either scrolls to a homepage section (`id`) or
 * navigates to a route (`href`). The four work-category entries deep-link
 * straight into the filtered /projects index so visitors land on the
 * relevant slice immediately.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "About", id: "about" },
  { label: "Services", href: "/projects/?category=products" },
  { label: "Research", href: "/projects/?category=research" },
  { label: "Hackathons", href: "/projects/?category=hackathon" },
  { label: "Tools", href: "/projects/?category=open-source" },
  { label: "Team", id: "team" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/wigtn",
  linkedin: "https://linkedin.com/company/wigtn",
} as const;
