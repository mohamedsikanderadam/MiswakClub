import { LegalArticle, legalMetadata } from "@/components/site/LegalArticle";

export const metadata = legalMetadata("shipping");

export default function Page() {
  return <LegalArticle slug="shipping" />;
}
