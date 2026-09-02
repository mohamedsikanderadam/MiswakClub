import { z } from "zod";
import { countries, replacementFrequencies } from "@/config/site";

const frequencyValues = replacementFrequencies.map((item) => item.value);
const countryCodes = countries.map((country) => country.code);

const optionalString = (schema: z.ZodType<string>) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    schema.optional(),
  );

export const waitlistSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Please enter your first name.")
    .max(60, "That name is a little too long.")
    .regex(/^[^\d<>@{}]+$/u, "Please enter your first name."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, "Please enter your email address.")
    .max(254, "That email address is too long.")
    .email("Please enter a valid email address."),
  phone: optionalString(
    z
      .string()
      .trim()
      .min(6, "Please enter a valid mobile number.")
      .max(24, "Please enter a valid mobile number.")
      .regex(/^\+?[\d\s()-]+$/, "Please enter a valid mobile number."),
  ),
  country: optionalString(
    z.string().refine((value) => countryCodes.includes(value as never), {
      message: "Please choose a country from the list.",
    }),
  ),
  replacementFrequency: optionalString(
    z.string().refine((value) => frequencyValues.includes(value as never), {
      message: "Please choose one of the options.",
    }),
  ),
  referralCode: optionalString(z.string().trim().max(64)),
  utmSource: optionalString(z.string().trim().max(200)),
  utmMedium: optionalString(z.string().trim().max(200)),
  utmCampaign: optionalString(z.string().trim().max(200)),
  utmContent: optionalString(z.string().trim().max(200)),
  utmTerm: optionalString(z.string().trim().max(200)),
  landingPage: optionalString(z.string().trim().max(300)),
  /** Honeypot: real users never fill this. */
  company: optionalString(z.string().max(200)),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

/** Normalizes an email for duplicate detection. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function fieldErrors(
  error: z.ZodError<unknown>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
