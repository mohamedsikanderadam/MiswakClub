import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-sans text-sm font-medium tracking-wide transition-all duration-300 ease-brand disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-white hover:bg-heritage hover:shadow-soft active:scale-[0.99]",
  secondary:
    "border border-forest/25 bg-transparent text-forest hover:border-forest hover:bg-forest/5",
  ghost: "text-forest underline decoration-sand/70 underline-offset-4 hover:decoration-forest",
  onDark: "bg-cream text-forest hover:bg-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-7",
  lg: "h-14 px-9 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
