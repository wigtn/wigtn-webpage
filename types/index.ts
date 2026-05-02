// Navigation Types
//
// A nav entry either scrolls to a section on the current page (`id`) or
// navigates to another route (`href`). Exactly one of the two should be set.
export interface NavItem {
  label: string;
  id?: string;
  href?: string;
}

// Team Types
export interface TeamMember {
  name: string;
  nameEn?: string;
  role: string;
  bio: string;
  expertise: string[];
  image?: string;
  imagePosition?: string;
  /** When true, the homepage Team grid renders this card spanning two
   *  columns to mark the founder / lead. Optional; defaults to false. */
  featured?: boolean;
  /** Current role outside of WIGTN — title + employer + parent-org tag.
   *  Rendered as the first credential line on the Team card so a reader
   *  sees what the member does today before the historical background. */
  currentRole?: string;
  /** Single-line background sentence shown above the bio on the homepage.
   *  Use it to surface a credential a B2B reader can verify (prior role,
   *  publication, partner affiliation). Leave blank to render nothing. */
  credential?: string;
  links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Product/Service Types
export interface Product {
  id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

// Process Step Types
export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Partner Types
export interface Partner {
  name: string;
  logo?: string;
  url?: string;
}

// Section Header Types
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

// Card Types
export interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

// Badge Types
export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "lime";
  className?: string;
}
