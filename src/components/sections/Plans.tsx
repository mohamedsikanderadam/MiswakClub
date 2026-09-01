"use client";

import { Badge, Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { useWaitlist } from "@/components/waitlist/WaitlistProvider";
import { Button } from "@/components/ui/Button";
import { plans } from "@/content/home";
import { trackEvent } from "@/lib/analytics";

export function Plans() {
  const { open } = useWaitlist();

  return (
    <Section tone="white" aria-labelledby="plans-heading">
      <Container width="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-sand">{plans.eyebrow}</Eyebrow>
          <Heading id="plans-heading" size="xl" className="mt-5 text-forest">
            {plans.headline}
          </Heading>
          <p className="mt-6 leading-relaxed text-charcoal/75">{plans.body}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {plans.items.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 90}>
              <button
                type="button"
                onClick={() => {
                  trackEvent("subscription_preview_clicked", {
                    plan: plan.name,
                  });
                  open(`plan_${plan.name.toLowerCase()}`);
                }}
                className="group h-full w-full rounded-lg border border-forest/12 bg-cream p-7 text-left transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-forest/25 hover:shadow-soft"
              >
                <Badge>{plans.badge}</Badge>
                <h3 className="mt-5 font-serif text-3xl text-forest">
                  {plan.name}
                </h3>
                <p className="mt-2 text-charcoal/80">{plan.summary}</p>
                <p className="mt-1 text-sm text-charcoal/60">{plan.detail}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-forest">
                  {plans.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-brand group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-sm text-charcoal/55">
            Plan sizes, frequencies and pricing are not final and will be
            confirmed before launch.
          </p>
          <Button
            type="button"
            variant="secondary"
            className="mt-6"
            onClick={() => open("plans_footer")}
          >
            {plans.cta}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
