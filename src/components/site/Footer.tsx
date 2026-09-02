"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { Logo } from "@/components/ui/Logo";
import { footer, nav } from "@/content/home";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
};

export function Footer() {
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="bg-forest text-cream">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo tone="cream" />
            <p className="mt-4 font-serif text-2xl text-cream/90">
              {footer.tagline}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:gap-16">
            <nav aria-label="Footer">
              <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-sand uppercase">
                Explore
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {nav.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/80 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Legal">
              <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-sand uppercase">
                Legal
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {footer.legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/80 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {socials.length || siteConfig.contactEmail ? (
          <div className="mt-14 flex flex-wrap gap-5 border-t border-cream/15 pt-8">
            {socials.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("social_clicked", { network: key })}
                className="text-sm text-cream/80 underline decoration-sand/60 underline-offset-4 transition-colors hover:text-cream"
              >
                {socialLabels[key] ?? key}
              </a>
            ))}
            {siteConfig.contactEmail ? (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                onClick={() => trackEvent("social_clicked", { network: "email" })}
                className="text-sm text-cream/80 underline decoration-sand/60 underline-offset-4 transition-colors hover:text-cream"
              >
                Email
              </a>
            ) : null}
          </div>
        ) : null}

        <p className="mt-12 text-xs text-cream/55">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
