"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { JoinButton } from "@/components/waitlist/JoinButton";
import { nav } from "@/content/home";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500 ease-brand",
        scrolled
          ? "border-b border-forest/10 bg-cream/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[88rem] items-center justify-between gap-6 px-6 sm:h-20 sm:px-8">
        <Link href="/" aria-label="Miswak Club home" className="shrink-0">
          <Logo priority />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 md:flex"
        >
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal/75 transition-colors hover:text-forest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <JoinButton
            source="header"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {nav.cta}
          </JoinButton>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-pill text-forest transition-colors hover:bg-forest/8 md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ease-brand",
                  menuOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ease-brand",
                  menuOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-forest/10 bg-cream md:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-forest/8 py-4 font-serif text-xl text-forest last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <JoinButton
              source="mobile_menu"
              size="lg"
              fullWidth
              className="mt-4 mb-2"
              onClickCapture={() => setMenuOpen(false)}
            >
              {nav.cta}
            </JoinButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
