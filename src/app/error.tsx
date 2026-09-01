"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container, Heading, Section } from "@/components/ui/Layout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] unhandled error", error);
  }, [error]);

  return (
    <Section tone="cream" spacing="loose" as="main">
      <Container width="narrow" className="text-center">
        <Heading level={1} size="lg" className="text-forest">
          Something went wrong.
        </Heading>
        <p className="mt-5 text-charcoal/70">
          Sorry — that didn&apos;t load as expected. Please try again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
