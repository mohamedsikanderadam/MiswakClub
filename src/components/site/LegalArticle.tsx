import type { Metadata } from "next";
import { Container, Heading, Section } from "@/components/ui/Layout";
import { siteConfig } from "@/config/site";
import { legalPages } from "@/content/legal";

export function legalMetadata(slug: string): Metadata {
  const page = legalPages[slug];
  return {
    title: page.title,
    description: page.intro,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${page.title} · ${siteConfig.name}`,
      description: page.intro,
      url: `${siteConfig.url}/${slug}`,
    },
  };
}

export function LegalArticle({ slug }: { slug: string }) {
  const page = legalPages[slug];

  return (
    <Section tone="cream" spacing="default">
      <Container width="narrow">
        <Heading level={1} size="lg" className="text-forest">
          {page.title}
        </Heading>
        <p className="mt-5 rounded-lg border border-sand/40 bg-sand/10 px-5 py-4 text-sm leading-relaxed text-charcoal/75">
          {page.intro}
        </p>
        <div className="mt-10 flex flex-col gap-9">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-2xl text-forest">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mt-3 leading-relaxed text-charcoal/75"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
