import { Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { foundingMembers } from "@/content/home";

export function FoundingMembers() {
  return (
    <Section
      id={foundingMembers.id}
      tone="forest"
      spacing="loose"
      aria-labelledby="founding-heading"
    >
      <Container width="wide">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow className="text-sand">{foundingMembers.eyebrow}</Eyebrow>
              <Heading
                id="founding-heading"
                size="xl"
                className="mt-5 text-cream"
              >
                {foundingMembers.headline}
              </Heading>
              <p className="mt-6 max-w-lg leading-relaxed text-cream/80">
                {foundingMembers.body}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-9 flex flex-col gap-3">
                {foundingMembers.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-baseline gap-3 text-cream/85">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-pill bg-sand"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="rounded-lg bg-cream p-7 shadow-lift sm:p-9">
              <WaitlistForm headingId="founding-form-heading" source="founding_section" />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
