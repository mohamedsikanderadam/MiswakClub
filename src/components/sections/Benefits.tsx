import { Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { benefits } from "@/content/home";

export function Benefits() {
  return (
    <Section tone="sand" aria-labelledby="benefits-heading">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <Eyebrow className="text-[#8a6428]">{benefits.eyebrow}</Eyebrow>
            <Heading
              id="benefits-heading"
              size="xl"
              className="mt-5 text-forest"
            >
              {benefits.headline}
            </Heading>
          </Reveal>

          <dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {benefits.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <dt className="font-serif text-xl text-forest">{item.title}</dt>
                <dd className="mt-2 leading-relaxed text-charcoal/75">
                  {item.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
