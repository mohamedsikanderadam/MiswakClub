import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Approved brand assets only. The wordmark is set in the brand serif so the
 * lockup stays crisp at small sizes; the supplied mark is used as the emblem.
 */
export function Logo({
  variant = "lockup",
  tone = "forest",
  className,
  priority,
}: {
  variant?: "lockup" | "mark" | "full";
  tone?: "forest" | "cream";
  className?: string;
  priority?: boolean;
}) {
  const textColor = tone === "cream" ? "text-cream" : "text-forest";

  if (variant === "full") {
    return (
      <Image
        src="/brand/logo-primary.webp"
        alt="Miswak Club — Fresh Miswak. Delivered."
        width={1200}
        height={1200}
        priority={priority}
        className={cn("h-auto w-full", className)}
      />
    );
  }

  const mark = (
    <Image
      src="/brand/mark-mc.png"
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      priority={priority}
      className={cn(
        "size-9 shrink-0 object-contain sm:size-10",
        tone === "cream" && "brightness-0 invert",
      )}
    />
  );

  if (variant === "mark") {
    return (
      <span className={cn("inline-flex", className)}>
        {mark}
        <span className="sr-only">Miswak Club</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {mark}
      <span className={cn("flex flex-col leading-none", textColor)}>
        <span className="font-serif text-lg tracking-[0.14em] uppercase sm:text-xl">
          Miswak
        </span>
        <span className="font-sans text-[0.6rem] tracking-[0.42em] text-sand uppercase">
          Club
        </span>
      </span>
    </span>
  );
}
