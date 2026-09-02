import { Benefits } from "@/components/sections/Benefits";
import { Club } from "@/components/sections/Club";
import { Education } from "@/components/sections/Education";
import { Faq } from "@/components/sections/Faq";
import { FoundingMembers } from "@/components/sections/FoundingMembers";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Plans } from "@/components/sections/Plans";
import { Problem } from "@/components/sections/Problem";
import { features, siteConfig } from "@/config/site";
import { faq } from "@/content/home";
import { waitlistCount } from "@/lib/waitlist";

export default async function HomePage() {
  const count = features.showWaitlistCount ? await waitlistCount() : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        slogan: siteConfig.tagline,
        logo: `${siteConfig.url}/brand/logo-primary.webp`,
      },
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Content is static, author-controlled copy from src/content.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero waitlistCount={count} />
      <Problem />
      <HowItWorks />
      <Plans />
      <Benefits />
      <Education />
      <Club />
      <FoundingMembers />
      <Faq />
    </>
  );
}
