import Image from "next/image";
import { Container, Eyebrow, Heading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { JoinButton } from "@/components/waitlist/JoinButton";
import { hero } from "@/content/home";
import { siteConfig } from "@/config/site";

export function Hero({ waitlistCount }: { waitlistCount: number | null }) {
  return (
    <section className="relative overflow-hidden bg-cream pt-10 pb-16 sm:pt-16 sm:pb-24">
      {/* Warm light behind the product, kept subtle. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-18%] right-[-12%] size-[34rem] rounded-full bg-sand/12 blur-3xl"
      />
      <Container width="wide" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow className="text-sand">{hero.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <Heading level={1} size="display" className="mt-5 text-forest">
                {hero.headlineLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </Heading>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-charcoal/75 sm:text-lg">
                {hero.body}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-col items-start gap-4">
                <JoinButton source="hero" size="lg" className="w-full sm:w-auto">
                  {hero.cta}
                </JoinButton>
                <p className="text-sm text-charcoal/60">{hero.microcopy}</p>
                {waitlistCount ? (
                  <p className="text-sm font-medium text-forest">
                    Join {waitlistCount.toLocaleString("en")} people waiting for
                    launch
                  </p>
                ) : null}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-soft-sand/40 shadow-lift">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 font-serif text-lg text-forest/70 italic">
              {siteConfig.supportingLine}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
