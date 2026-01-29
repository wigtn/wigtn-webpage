import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <span className="text-label text-violet mb-4 block">{label}</span>
      )}
      <h2 className="text-section text-foreground">{title}</h2>
      {subtitle && (
        <p className="text-body mt-4 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
