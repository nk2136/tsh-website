"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "ink";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-terracotta disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-terracotta text-bone hover:bg-terracotta-deep shadow-[0_1px_0_rgba(27,27,27,0.06),0_8px_20px_-12px_rgba(168,95,62,0.6)] hover:shadow-[0_2px_0_rgba(27,27,27,0.06),0_16px_28px_-14px_rgba(168,95,62,0.7)] hover:-translate-y-px",
  outline:
    "bg-transparent text-ink ring-1 ring-ink/15 hover:ring-ink/30 hover:bg-ink/[0.04]",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.04]",
  ink: "bg-ink text-bone hover:bg-ink/85",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    withArrow,
    children,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...rest } = props as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as object)}>
        {inner}
      </Link>
    );
  }

  const { ...buttonRest } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {inner}
    </button>
  );
}
