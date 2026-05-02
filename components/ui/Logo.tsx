import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "wordmark" | "mark";
  asLink?: boolean;
};

export function Logo({ className, variant = "wordmark", asLink = true }: LogoProps) {
  const inner =
    variant === "wordmark" ? (
      <span
        className={cn(
          "inline-flex items-baseline gap-[2px] font-display italic text-[1.7rem] leading-none tracking-[-0.04em]",
          className
        )}
        aria-label="tsh."
      >
        <span>tsh</span>
        <span className="text-terracotta">.</span>
      </span>
    ) : (
      <span
        className={cn(
          "relative inline-flex size-9 items-center justify-center rounded-lg bg-ink",
          className
        )}
        aria-label="TSH"
      >
        <span className="font-display italic text-bone text-lg leading-none">t</span>
        <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full bg-terracotta" />
      </span>
    );

  if (!asLink) return inner;

  return (
    <Link
      href="/"
      aria-label="Tech Staffing Hub — home"
      className="inline-flex items-center"
    >
      {inner}
    </Link>
  );
}
