import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "violet";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-1.5 text-xs font-mono tracking-wider rounded-full",
        variant === "default" && "bg-gray-100 text-gray-600",
        variant === "outline" && "border border-gray-300 text-gray-600",
        variant === "violet" && "border border-violet/30 text-violet",
        className
      )}
    >
      {children}
    </span>
  );
}
