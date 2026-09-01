import Image from "next/image";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { club } from "@/content/home";

export function Club() {
  return (
    <Section tone="cream" aria-labelledby="club-heading">
      <Container width="wide">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-lg bg-white shadow-soft">
              <Image
                src={club.image.src}
                alt={club.image.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow className="text-sand">{club.eyebrow}</Eyebrow>
              <Heading id="club-heading" size="xl" className="mt-5 text-forest">
                {club.headline}
              </Heading>
              <p className="mt-6 max-w-lg leading-relaxed text-charcoal/75">
                {club.body}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {club.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-charcoal/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-pill bg-sand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-charcoal/55">{club.disclaimer}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
