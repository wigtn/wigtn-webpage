// Navigation Types
export interface NavItem {
  label: string;
  id: string;
}

// Team Types
export interface TeamMember {
  name: string;
  nameEn?: string;
  role: string;
  bio: string;
  expertise: string[];
  image?: string;
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
  label?: string;
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
