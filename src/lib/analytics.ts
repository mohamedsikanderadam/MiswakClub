/**
 * Analytics abstraction. GA4 is the initial destination, but nothing in the UI
 * depends on it — swap the `send` implementation to change provider.
 *
 * Every event is documented in README.md.
 */

export type AnalyticsEvent =
  | "waitlist_cta_clicked"
  | "waitlist_form_viewed"
  | "waitlist_form_started"
  | "waitlist_signup_completed"
  | "referral_link_copied"
  | "referral_signup_completed"
  | "subscription_preview_clicked"
  | "faq_opened"
  | "social_clicked";

export type AnalyticsProperties = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function trackEvent(
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.debug(`[analytics] ${event}`, properties);
  }

  if (GA_MEASUREMENT_ID && typeof window.gtag === "function") {
    window.gtag("event", event, properties);
  }
}
