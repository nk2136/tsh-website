import { cn } from "@/lib/utils";

type CardVariant = "paper" | "ink" | "outline" | "raised";

type CardProps = {
  variant?: CardVariant;
  as?: "div" | "article" | "section" | "li";
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

const variants: Record<CardVariant, string> = {
  paper:
    "bg-bone-50 ring-1 ring-ink/[0.05] shadow-[0_1px_0_rgba(27,27,27,0.04)]",
  ink: "bg-ink text-bone",
  outline: "bg-transparent ring-1 ring-ink/[0.08]",
  raised:
    "bg-bone-50 ring-1 ring-ink/[0.05] shadow-paper hover:shadow-paper-lifted transition-shadow duration-500",
};

export function Card({
  variant = "paper",
  as: Tag = "div",
  className,
  children,
  id,
}: CardProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative rounded-2xl p-6 sm:p-8",
        variants[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
}
