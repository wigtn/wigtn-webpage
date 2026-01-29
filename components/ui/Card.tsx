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
        variant === "default" && "hover:bg-gray-50 dark:hover:bg-gray-800/50",
        variant === "bordered" && "border border-gray-200 dark:border-gray-800 hover:border-violet/50 dark:hover:border-violet-light/50",
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-violet dark:text-violet-light">{icon}</div>
      )}
      {subtitle && (
        <span className="text-label text-gray-400 dark:text-gray-500 mb-2 block">{subtitle}</span>
      )}
      <h3 className="text-title text-foreground dark:text-white mb-3 group-hover:text-violet dark:group-hover:text-violet-light transition-colors">
        {title}
      </h3>
      <p className="text-body">{description}</p>
    </div>
  );
}
