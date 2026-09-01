import Image from "next/image";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { education } from "@/content/home";

export function Education() {
  return (
    <Section
      id={education.id}
      tone="forest"
      spacing="loose"
      aria-labelledby="education-heading"
    >
      <Container width="wide">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow className="text-sand">{education.eyebrow}</Eyebrow>
              <Heading
                id="education-heading"
                size="xl"
                className="mt-5 text-cream"
              >
                {education.headline}
              </Heading>
            </Reveal>
            <Reveal delay={90}>
              {education.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mt-6 max-w-xl leading-relaxed text-cream/80"
                >
                  {paragraph}
                </p>
              ))}
              <p className="mt-8 max-w-xl border-l border-sand/50 pl-4 text-sm text-cream/60">
                {education.note}
              </p>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={education.image.src}
                alt={education.image.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
