import { LegalArticle, legalMetadata } from "@/components/site/LegalArticle";

export const metadata = legalMetadata("subscription-policy");

export default function Page() {
  return <LegalArticle slug="subscription-policy" />;
}
