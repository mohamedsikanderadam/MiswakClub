/**
 * Marketing attribution capture.
 *
 * UTM parameters and the referral code are read from the first page the
 * visitor lands on and kept in sessionStorage, so attribution survives
 * navigation before the waitlist form is submitted.
 */

const STORAGE_KEY = "mc_attribution";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referral_code?: string;
  landing_page?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

function read(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

function write(value: Attribution): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode); attribution is best-effort.
  }
}

/** Captures attribution from the current URL, preserving the first-touch values. */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const existing = read();
  const params = new URLSearchParams(window.location.search);
  const incoming: Attribution = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) incoming[key] = value.slice(0, 200);
  }

  const ref = params.get("ref");
  if (ref) incoming.referral_code = ref.slice(0, 64);

  const merged: Attribution = {
    landing_page: existing.landing_page ?? window.location.pathname,
    ...incoming,
    ...existing,
  };

  write(merged);
  return merged;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return read();
}
