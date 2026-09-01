import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { StickyMobileCta } from "@/components/site/StickyMobileCta";
import { WaitlistProvider } from "@/components/waitlist/WaitlistProvider";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <WaitlistProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyMobileCta />
    </WaitlistProvider>
  );
}
