"use client";

import { useEffect, useState } from "react";
import { JoinButton } from "@/components/waitlist/JoinButton";
import { cn } from "@/lib/cn";
import { features } from "@/config/site";
import { foundingMembers } from "@/content/home";

/** Appears on small screens once the hero has scrolled away. */
export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!features.stickyMobileCta) return;
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!features.stickyMobileCta) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-forest/10 bg-cream/95 px-5 pt-3 backdrop-blur-md transition-transform duration-500 ease-brand sm:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <JoinButton
        source="sticky_mobile"
        fullWidth
        tabIndex={visible ? undefined : -1}
      >
        {foundingMembers.cta}
      </JoinButton>
    </div>
  );
}
