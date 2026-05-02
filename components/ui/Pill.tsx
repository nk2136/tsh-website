import { cn } from "@/lib/utils";

type PillProps = {
  children: React.ReactNode;
  variant?: "default" | "moss" | "terracotta" | "ink";
  className?: string;
};

const variants = {
  default:
    "bg-bone-200 text-ink-muted ring-1 ring-ink/[0.06]",
  moss: "bg-moss/10 text-moss-deep ring-1 ring-moss/20",
  terracotta:
    "bg-terracotta/10 text-terracotta-deep ring-1 ring-terracotta/30",
  ink: "bg-ink text-bone",
};

export function Pill({ children, variant = "default", className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
