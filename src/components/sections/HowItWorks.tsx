import Image from "next/image";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { JoinButton } from "@/components/waitlist/JoinButton";
import { howItWorks } from "@/content/home";

export function HowItWorks() {
  return (
    <Section
      id={howItWorks.id}
      tone="cream"
      aria-labelledby="how-it-works-heading"
    >
      <Container width="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-sand">{howItWorks.eyebrow}</Eyebrow>
          <Heading
            id="how-it-works-heading"
            size="xl"
            className="mt-5 text-forest"
          >
            {howItWorks.headline}
          </Heading>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <ol className="flex flex-col">
            {howItWorks.steps.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 90}
                as="li"
                className="flex gap-6 border-t border-forest/12 py-7 last:border-b"
              >
                <span className="font-serif text-2xl text-sand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-forest">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md leading-relaxed text-charcoal/75">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal as="li" delay={280} className="pt-9">
              <JoinButton
                source="how_it_works"
                size="lg"
                className="w-full sm:w-auto"
              >
                {howItWorks.cta}
              </JoinButton>
            </Reveal>
          </ol>

          <Reveal delay={120}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white shadow-soft">
              <Image
                src={howItWorks.image.src}
                alt={howItWorks.image.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 48vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
