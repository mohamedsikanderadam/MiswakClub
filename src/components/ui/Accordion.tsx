"use client";

import { trackEvent } from "@/lib/analytics";

export function Accordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-forest/12 border-y border-forest/12">
      {items.map((item) => (
        <details
          key={item.question}
          className="group"
          onToggle={(event) => {
            if (event.currentTarget.open) {
              trackEvent("faq_opened", { question: item.question });
            }
          }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-lg text-forest transition-colors marker:hidden hover:text-heritage sm:text-xl">
            {item.question}
            <span
              aria-hidden="true"
              className="relative size-4 shrink-0 text-sand"
            >
              <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 bg-current" />
              <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 rotate-90 bg-current transition-transform duration-300 ease-brand group-open:rotate-0" />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-[0.95rem] leading-relaxed text-charcoal/75">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
