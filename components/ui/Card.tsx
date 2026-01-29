import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  description: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered";
}

export function Card({
  title,
  description,
  subtitle,
  icon,
  className,
  variant = "default",
}: CardProps) {
  return (
    <div
      className={cn(
        "group p-6 rounded-lg transition-colors",
        variant === "default" && "hover:bg-gray-50",
        variant === "bordered" && "border border-gray-200 hover:border-violet/50",
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-violet">{icon}</div>
      )}
      {subtitle && (
        <span className="text-label text-gray-400 mb-2 block">{subtitle}</span>
      )}
      <h3 className="text-title text-foreground mb-3 group-hover:text-violet transition-colors">
        {title}
      </h3>
      <p className="text-body">{description}</p>
    </div>
  );
}
