import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateReferralCode } from "@/lib/referral";
import { normalizeEmail, type WaitlistInput } from "@/lib/validation";

export type WaitlistUser = {
  id: string;
  first_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  replacement_frequency: string | null;
  referral_code: string;
  referred_by: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  landing_page: string | null;
  status: string;
  created_at: string;
};

export type JoinResult =
  | { outcome: "created"; user: WaitlistUser }
  | { outcome: "duplicate"; referralCode: string | null }
  | { outcome: "unavailable" }
  | { outcome: "error" };

const PG_UNIQUE_VIOLATION = "23505";

/**
 * Inserts a waitlist member.
 *
 * Duplicate emails are reported as `duplicate` rather than an error, and the
 * referral relationship is recorded when the visitor arrived with a valid code.
 */
export async function joinWaitlist(input: WaitlistInput): Promise<JoinResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { outcome: "unavailable" };

  const email = normalizeEmail(input.email);

  const referrer = input.referralCode
    ? await findByReferralCode(input.referralCode)
    : null;

  const row = {
    first_name: input.firstName.trim(),
    email,
    phone: input.phone ?? null,
    country: input.country ?? null,
    replacement_frequency: input.replacementFrequency ?? null,
    referral_code: generateReferralCode(),
    referred_by: referrer?.id ?? null,
    utm_source: input.utmSource ?? null,
    utm_medium: input.utmMedium ?? null,
    utm_campaign: input.utmCampaign ?? null,
    utm_content: input.utmContent ?? null,
    utm_term: input.utmTerm ?? null,
    landing_page: input.landingPage ?? null,
  };

  const { data, error } = await supabase
    .from("waitlist_users")
    .insert(row)
    .select("*")
    .single<WaitlistUser>();

  if (error) {
    if (error.code === PG_UNIQUE_VIOLATION) {
      const existing = await findByEmail(email);
      return { outcome: "duplicate", referralCode: existing?.referral_code ?? null };
    }
    console.error("[waitlist] insert failed", error.message);
    return { outcome: "error" };
  }

  if (referrer) {
    const { error: referralError } = await supabase.from("referrals").insert({
      referral_code: referrer.referral_code,
      referrer_id: referrer.id,
      referred_user_id: data.id,
      status: "joined",
    });
    // A failed referral log must not fail the signup itself.
    if (referralError) {
      console.error("[waitlist] referral log failed", referralError.message);
    }
  }

  return { outcome: "created", user: data };
}

export async function findByEmail(email: string): Promise<WaitlistUser | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data } = await supabase
    .from("waitlist_users")
    .select("*")
    .eq("email", normalizeEmail(email))
    .maybeSingle<WaitlistUser>();
  return data ?? null;
}

export async function findByReferralCode(
  code: string,
): Promise<WaitlistUser | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data } = await supabase
    .from("waitlist_users")
    .select("*")
    .eq("referral_code", code.trim().toUpperCase())
    .maybeSingle<WaitlistUser>();
  return data ?? null;
}

/** Public waitlist count, used only when the owner enables the counter. */
export async function waitlistCount(): Promise<number | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { count, error } = await supabase
    .from("waitlist_users")
    .select("id", { count: "exact", head: true });
  if (error) return null;
  return count ?? null;
}
