import "server-only";
import { countries, replacementFrequencies } from "@/config/site";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { WaitlistUser } from "@/lib/waitlist";

export type MemberFilters = {
  query?: string;
  country?: string;
  frequency?: string;
  source?: string;
};

export type WaitlistSnapshot = {
  configured: boolean;
  members: WaitlistUser[];
};

const MAX_ROWS = 5000;

/**
 * Loads waitlist rows for the dashboard. Phase 1 volumes are small enough to
 * aggregate in memory; move to SQL views if the list outgrows `MAX_ROWS`.
 */
export async function loadWaitlist(): Promise<WaitlistSnapshot> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { configured: false, members: [] };

  const { data, error } = await supabase
    .from("waitlist_users")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(MAX_ROWS);

  if (error) {
    console.error("[admin] waitlist query failed", error.message);
    return { configured: true, members: [] };
  }

  return { configured: true, members: (data ?? []) as WaitlistUser[] };
}

export function filterMembers(
  members: WaitlistUser[],
  filters: MemberFilters,
): WaitlistUser[] {
  const query = filters.query?.trim().toLowerCase();
  return members.filter((member) => {
    if (filters.country && member.country !== filters.country) return false;
    if (filters.frequency && member.replacement_frequency !== filters.frequency)
      return false;
    if (filters.source && (member.utm_source ?? "") !== filters.source)
      return false;
    if (!query) return true;
    return (
      member.email.includes(query) ||
      member.first_name.toLowerCase().includes(query) ||
      member.referral_code.toLowerCase().includes(query) ||
      (member.phone ?? "").toLowerCase().includes(query)
    );
  });
}

function countSince(members: WaitlistUser[], since: Date): number {
  return members.filter((member) => new Date(member.created_at) >= since).length;
}

function distribution(
  members: WaitlistUser[],
  pick: (member: WaitlistUser) => string | null,
): { key: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const member of members) {
    const key = pick(member) ?? "Unknown";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count);
}

const countryLabels = new Map<string, string>(
  countries.map((c) => [c.code, c.label]),
);
const frequencyLabels = new Map<string, string>(
  replacementFrequencies.map((f) => [f.value, f.label]),
);

export function buildStats(members: WaitlistUser[]) {
  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const referred = members.filter((member) => member.referred_by);
  const byId = new Map(members.map((member) => [member.id, member]));

  const referrerCounts = new Map<string, number>();
  for (const member of referred) {
    const key = member.referred_by as string;
    referrerCounts.set(key, (referrerCounts.get(key) ?? 0) + 1);
  }

  const topReferrers = [...referrerCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id, count]) => {
      const referrer = byId.get(id);
      return {
        label: referrer ? `${referrer.first_name} · ${referrer.email}` : id,
        code: referrer?.referral_code ?? "—",
        count,
      };
    });

  return {
    total: members.length,
    today: countSince(members, startOfToday),
    last7: countSince(members, new Date(now.getTime() - 7 * 86_400_000)),
    last30: countSince(members, new Date(now.getTime() - 30 * 86_400_000)),
    referredSignups: referred.length,
    topReferrers,
    byCountry: distribution(members, (m) =>
      m.country ? (countryLabels.get(m.country) ?? m.country) : null,
    ),
    byFrequency: distribution(members, (m) =>
      m.replacement_frequency
        ? (frequencyLabels.get(m.replacement_frequency) ??
          m.replacement_frequency)
        : null,
    ),
    bySource: distribution(members, (m) => m.utm_source),
    byCampaign: distribution(members, (m) => m.utm_campaign),
  };
}

const CSV_COLUMNS = [
  "created_at",
  "first_name",
  "email",
  "phone",
  "country",
  "replacement_frequency",
  "referral_code",
  "referred_by",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "landing_page",
  "status",
] as const;

function csvCell(value: unknown): string {
  const text = value === null || value === undefined ? "" : String(value);
  // Guard against spreadsheet formula injection on export.
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}

export function toCsv(members: WaitlistUser[]): string {
  const rows = members.map((member) =>
    CSV_COLUMNS.map((column) => csvCell(member[column])).join(","),
  );
  return [CSV_COLUMNS.join(","), ...rows].join("\r\n");
}
