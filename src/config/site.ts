/**
 * Business configuration for Miswak Club.
 *
 * Everything here is intentionally editable without touching UI code.
 * Values marked TODO(owner) are placeholders that the business owner must
 * confirm before launch — nothing here should be treated as approved copy.
 */

export const siteConfig = {
  name: "Miswak Club",
  tagline: "Fresh Miswak. Delivered.",
  supportingLine: "A timeless practice. Made effortless.",
  description:
    "Join Miswak Club for early access to a simple Miswak subscription designed to deliver fresh Miswak directly to your door.",
  /** Used for canonical URLs, sitemap and referral links. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://miswakclub.com",
  locale: "en",
  /** Phase 1 launch status. Drives "Launching soon" messaging. */
  launchStatus: "pre-launch" as "pre-launch" | "launched",
  /** TODO(owner): confirm the public contact address before launch. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  social: {
    // TODO(owner): add real profile URLs. Empty values are hidden in the UI.
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "",
    tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK ?? "",
    whatsapp: process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP ?? "",
  },
} as const;

export const features = {
  /** Only enable once a legitimate waitlist count exists. Never fabricate. */
  showWaitlistCount: process.env.NEXT_PUBLIC_SHOW_WAITLIST_COUNT === "true",
  /** Referral link sharing on the waitlist success state. */
  enableReferrals: process.env.NEXT_PUBLIC_ENABLE_REFERRALS !== "false",
  /** Optional waitlist form fields. */
  collectPhone: process.env.NEXT_PUBLIC_COLLECT_PHONE !== "false",
  collectCountry: process.env.NEXT_PUBLIC_COLLECT_COUNTRY !== "false",
  /** Sticky mobile CTA after the hero. */
  stickyMobileCta: true,
} as const;

/**
 * Delivery markets shown in the country select. The business is deliberately
 * not hardcoded to a single country — edit this list as markets are confirmed.
 */
export const countries = [
  { code: "AE", label: "United Arab Emirates" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "QA", label: "Qatar" },
  { code: "KW", label: "Kuwait" },
  { code: "BH", label: "Bahrain" },
  { code: "OM", label: "Oman" },
  { code: "GB", label: "United Kingdom" },
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
  { code: "OTHER", label: "Somewhere else" },
] as const;

export const replacementFrequencies = [
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Every 2 weeks" },
  { value: "monthly", label: "Monthly" },
  { value: "when_needed", label: "Only when needed" },
  { value: "not_using", label: "I don't currently use Miswak" },
] as const;

export type ReplacementFrequency =
  (typeof replacementFrequencies)[number]["value"];

/**
 * Phase 2 reward thresholds live here so the referral engine can gain rewards
 * without being rewritten. Nothing is promised to members while this is empty.
 */
export const referralRewards: { referrals: number; reward: string }[] = [];
