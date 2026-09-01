import { Accordion } from "@/components/ui/Accordion";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/content/home";

export function Faq() {
  return (
    <Section id={faq.id} tone="white" aria-labelledby="faq-heading">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <Eyebrow className="text-sand">{faq.eyebrow}</Eyebrow>
            <Heading id="faq-heading" size="xl" className="mt-5 text-forest">
              {faq.headline}
            </Heading>
          </Reveal>
          <Reveal delay={90}>
            <Accordion items={faq.items} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
