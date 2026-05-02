import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "narrow" | "default" | "wide" | "reading";
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  reading: "max-w-[680px]",
};

export function Container({
  size = "default",
  as: Tag = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto px-6 sm:px-8 lg:px-12", sizes[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
