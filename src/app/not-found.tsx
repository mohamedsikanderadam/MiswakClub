import { ButtonLink } from "@/components/ui/Button";
import { Container, Heading, Section } from "@/components/ui/Layout";
import { Logo } from "@/components/ui/Logo";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section tone="cream" spacing="loose" as="main">
      <Container width="narrow" className="text-center">
        <Logo variant="mark" className="mx-auto" />
        <p className="mt-8 font-sans text-[0.7rem] font-semibold tracking-[0.28em] text-sand uppercase">
          404
        </p>
        <Heading level={1} size="lg" className="mt-4 text-forest">
          This page isn&apos;t here.
        </Heading>
        <p className="mt-5 text-charcoal/70">
          The link may be old or mistyped. The Club is still waiting for you.
        </p>
        <ButtonLink href="/" className="mt-8">
          Back to home
        </ButtonLink>
      </Container>
    </Section>
  );
}
