import Image from "next/image";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { problem } from "@/content/home";

export function Problem() {
  return (
    <Section tone="white" aria-labelledby="problem-heading">
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-cream">
              <Image
                src={problem.image.src}
                alt={problem.image.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow className="text-sand">{problem.eyebrow}</Eyebrow>
              <Heading
                id="problem-heading"
                className="mt-5 max-w-xl text-forest"
              >
                {problem.headline}
              </Heading>
              <p className="mt-6 max-w-xl leading-relaxed text-charcoal/75">
                {problem.body}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-8 flex flex-col gap-3">
                {problem.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-baseline gap-3 text-charcoal/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-pill bg-sand"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-10 font-serif text-2xl text-forest sm:text-3xl">
                {problem.transition}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
