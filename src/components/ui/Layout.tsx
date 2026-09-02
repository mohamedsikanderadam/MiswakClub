import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const widths = {
    default: "max-w-6xl",
    narrow: "max-w-3xl",
    wide: "max-w-[88rem]",
  } as const;
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", widths[width], className)}>
      {children}
    </div>
  );
}

type Tone = "cream" | "white" | "sand" | "forest";

const tones: Record<Tone, string> = {
  cream: "bg-cream text-charcoal",
  white: "bg-white text-charcoal",
  sand: "bg-soft-sand text-charcoal",
  forest: "bg-forest text-cream",
};

export function Section({
  children,
  id,
  tone = "cream",
  className,
  as: Tag = "section",
  spacing = "default",
  "aria-labelledby": ariaLabelledBy,
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  as?: ElementType;
  spacing?: "default" | "tight" | "loose" | "none";
  "aria-labelledby"?: string;
}) {
  const spacings = {
    none: "",
    tight: "py-14 sm:py-20",
    default: "py-20 sm:py-28",
    loose: "py-24 sm:py-36",
  } as const;
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        tones[tone],
        spacings[spacing],
        id && "scroll-mt-20",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-sans text-[0.7rem] font-semibold tracking-[0.28em] uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  level = 2,
  size = "lg",
  className,
  id,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  size?: "sm" | "md" | "lg" | "xl" | "display";
  className?: string;
  id?: string;
}) {
  const Tag = `h${level}` as ElementType;
  const sizes = {
    sm: "text-xl sm:text-2xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl leading-[1.1] sm:text-4xl md:text-5xl",
    xl: "text-4xl leading-[1.05] sm:text-5xl md:text-6xl",
    display: "text-[clamp(2.75rem,11vw,5.5rem)] leading-[0.95]",
  } as const;
  return (
    <Tag id={id} className={cn(sizes[size], className)}>
      {children}
    </Tag>
  );
}

export function Badge({
  children,
  tone = "sand",
  className,
}: {
  children: ReactNode;
  tone?: "sand" | "forest" | "outline";
  className?: string;
}) {
  const toneClasses = {
    sand: "bg-sand/15 text-[#8a6428]",
    forest: "bg-forest text-cream",
    outline: "border border-current text-forest",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] uppercase",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "cream" | "forest";
}) {
  const toneClasses = {
    white: "bg-white border-forest/10",
    cream: "bg-cream border-forest/10",
    forest: "bg-heritage/40 border-cream/15 text-cream",
  } as const;
  return (
    <div
      className={cn("rounded-lg border p-7", toneClasses[tone], className)}
    >
      {children}
    </div>
  );
}
