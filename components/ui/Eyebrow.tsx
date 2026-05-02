import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  number?: string | number;
  color?: "terracotta" | "moss" | "ink";
};

const colors = {
  terracotta: "text-terracotta",
  moss: "text-moss-deep",
  ink: "text-ink-muted",
};

export function Eyebrow({
  children,
  className,
  number,
  color = "terracotta",
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.18em] font-medium flex items-center gap-3",
        colors[color],
        className
      )}
    >
      {number !== undefined && (
        <>
          <span className="opacity-70">№ {String(number).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-current opacity-40" />
        </>
      )}
      {children}
    </p>
  );
}
