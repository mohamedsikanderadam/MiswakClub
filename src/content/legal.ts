/**
 * Temporary pre-launch legal copy.
 *
 * TODO(owner): replace every page below with policies reviewed by the business
 * before launch. Nothing here is legal advice and no policy terms are invented.
 */

export type LegalPage = {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

const placeholderNotice =
  "This page is a pre-launch placeholder. Miswak Club is not yet selling products, and the final policy will be published before launch.";

export const legalPages: Record<string, LegalPage> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    intro: placeholderNotice,
    sections: [
      {
        heading: "What we collect today",
        body: [
          "During the waitlist phase we collect only what you submit in the waitlist form: your first name, email address, and optionally your mobile number, country and how often you currently replace your Miswak.",
          "We also record basic campaign information (such as the link you arrived from) so we know which channels people find us through.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "We use your details to send you launch updates about Miswak Club and to understand demand before launch. We do not sell your data.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can unsubscribe from our emails at any time. To request removal from the waitlist, contact us and we will delete your record.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "Contact details will be published on this page before launch.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Service",
    intro: placeholderNotice,
    sections: [
      {
        heading: "Using this site",
        body: [
          "This website currently exists to share information about Miswak Club and to collect waitlist signups. No purchase can be made and no payment is processed.",
        ],
      },
      {
        heading: "Waitlist",
        body: [
          "Joining the waitlist does not create an order, reserve stock, or guarantee availability, pricing or a launch date.",
        ],
      },
      {
        heading: "Changes",
        body: [
          "Full terms covering purchases and subscriptions will be published before launch.",
        ],
      },
    ],
  },
  shipping: {
    slug: "shipping",
    title: "Shipping",
    intro: placeholderNotice,
    sections: [
      {
        heading: "Delivery markets",
        body: [
          "Delivery destinations, carriers, timeframes and costs have not been confirmed yet. Details will be announced closer to launch.",
        ],
      },
      {
        heading: "Help us prioritise",
        body: [
          "Telling us your country when you join the waitlist helps us decide which markets to open first.",
        ],
      },
    ],
  },
  "subscription-policy": {
    slug: "subscription-policy",
    title: "Subscription Policy",
    intro: placeholderNotice,
    sections: [
      {
        heading: "Subscriptions are not live",
        body: [
          "Miswak Club is pre-launch. No subscription can currently be started, and no payment details are collected anywhere on this site.",
        ],
      },
      {
        heading: "What we are designing",
        body: [
          "The subscription is being designed so members can choose their delivery frequency and manage their plan. Exact billing, pause and cancellation terms will be published before launch.",
        ],
      },
    ],
  },
};

export const legalSlugs = Object.keys(legalPages);
