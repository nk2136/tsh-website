import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: "bone" | "ink" | "ash" | "moss-tint" | "terracotta-tint";
  spacing?: "compact" | "default" | "loose";
};

const tones = {
  bone: "bg-bone text-ink",
  ink: "bg-ink text-bone",
  ash: "bg-ash/40 text-ink",
  "moss-tint": "bg-moss/[0.07] text-ink",
  "terracotta-tint": "bg-terracotta/[0.06] text-ink",
};

const spacings = {
  compact: "py-16 sm:py-20",
  default: "py-20 sm:py-28 lg:py-32",
  loose: "py-28 sm:py-36 lg:py-44",
};

export function Section({
  tone = "bone",
  spacing = "default",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn("relative", tones[tone], spacings[spacing], className)}
      {...rest}
    >
      {children}
    </section>
  );
}
