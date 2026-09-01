import { LegalArticle, legalMetadata } from "@/components/site/LegalArticle";

export const metadata = legalMetadata("privacy");

export default function Page() {
  return <LegalArticle slug="privacy" />;
}
