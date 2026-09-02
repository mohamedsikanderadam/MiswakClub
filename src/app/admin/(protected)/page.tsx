import type { Metadata } from "next";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { Container } from "@/components/ui/Layout";
import { StatCard } from "@/components/ui/StatCard";
import { buildStats, filterMembers, loadWaitlist } from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "Waitlist dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const filters = {
    query: first(params.q),
    country: first(params.country),
    frequency: first(params.frequency),
    source: first(params.source),
  };

  const { configured, members } = await loadWaitlist();
  const stats = buildStats(members);
  const filtered = filterMembers(members, filters);
  const exportQuery = new URLSearchParams(
    Object.entries({
      q: filters.query,
      country: filters.country,
      frequency: filters.frequency,
      source: filters.source,
    }).filter(([, value]) => value),
  ).toString();

  if (!configured) {
    return (
      <Container width="wide">
        <h1 className="font-serif text-3xl text-forest">Waitlist</h1>
        <p className="mt-4 max-w-xl rounded-lg border border-sand/40 bg-sand/10 px-5 py-4 text-sm text-charcoal/80">
          Supabase is not configured. Set <code>SUPABASE_URL</code> and{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code>, run the migration in{" "}
          <code>supabase/migrations</code>, then reload.
        </p>
      </Container>
    );
  }

  return (
    <Container width="wide" className="flex flex-col gap-10">
      <div>
        <h1 className="font-serif text-3xl text-forest">Waitlist</h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Live figures from Supabase. Nothing here is estimated.
        </p>
      </div>

      <section aria-label="Signup totals" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total members" value={stats.total} />
        <StatCard label="Today" value={stats.today} />
        <StatCard label="Last 7 days" value={stats.last7} />
        <StatCard label="Last 30 days" value={stats.last30} />
        <StatCard
          label="Referred signups"
          value={stats.referredSignups}
          hint="Joined via a referral link"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Breakdown title="Countries" rows={stats.byCountry} />
        <Breakdown title="Replacement frequency" rows={stats.byFrequency} />
        <Breakdown title="UTM sources" rows={stats.bySource} />
        <Breakdown title="Campaigns" rows={stats.byCampaign} />
        <div className="rounded-lg border border-forest/10 bg-white p-5 lg:col-span-2">
          <h2 className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-charcoal/55 uppercase">
            Top referrers
          </h2>
          {stats.topReferrers.length === 0 ? (
            <p className="mt-3 text-sm text-charcoal/55">
              No referral signups yet.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {stats.topReferrers.map((referrer) => (
                <li
                  key={referrer.code}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="truncate text-charcoal/80">
                    {referrer.label}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-charcoal/55">
                    {referrer.code}
                  </span>
                  <span className="shrink-0 font-medium text-forest">
                    {referrer.count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section aria-label="Members">
        <AdminFilters
          filters={filters}
          sources={stats.bySource.map((row) => row.key)}
          exportQuery={exportQuery}
          resultCount={filtered.length}
        />

        <div className="mt-5 overflow-x-auto rounded-lg border border-forest/10 bg-white">
          <table className="w-full min-w-[56rem] text-left text-sm">
            <thead className="border-b border-forest/10 text-[0.7rem] tracking-[0.14em] text-charcoal/55 uppercase">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Joined</th>
                <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                <th scope="col" className="px-4 py-3 font-semibold">Email</th>
                <th scope="col" className="px-4 py-3 font-semibold">Country</th>
                <th scope="col" className="px-4 py-3 font-semibold">Frequency</th>
                <th scope="col" className="px-4 py-3 font-semibold">Source</th>
                <th scope="col" className="px-4 py-3 font-semibold">Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/8">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-charcoal/55">
                    {members.length === 0
                      ? "No one has joined the waitlist yet."
                      : "No members match these filters."}
                  </td>
                </tr>
              ) : (
                filtered.slice(0, 200).map((member) => (
                  <tr key={member.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-charcoal/70">
                      {new Date(member.created_at).toISOString().slice(0, 16).replace("T", " ")}
                    </td>
                    <td className="px-4 py-3">{member.first_name}</td>
                    <td className="px-4 py-3 text-charcoal/80">{member.email}</td>
                    <td className="px-4 py-3">{member.country ?? "—"}</td>
                    <td className="px-4 py-3">{member.replacement_frequency ?? "—"}</td>
                    <td className="px-4 py-3">{member.utm_source ?? "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs">{member.referral_code}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 200 ? (
          <p className="mt-3 text-xs text-charcoal/55">
            Showing the 200 most recent of {filtered.length} matches. Export the
            CSV for the full list.
          </p>
        ) : null}
      </section>
    </Container>
  );
}

function Breakdown({
  title,
  rows,
}: {
  title: string;
  rows: { key: string; count: number }[];
}) {
  return (
    <div className="rounded-lg border border-forest/10 bg-white p-5">
      <h2 className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-charcoal/55 uppercase">
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-charcoal/55">No data yet.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {rows.slice(0, 8).map((row) => (
            <li key={row.key} className="flex items-baseline justify-between gap-4">
              <span className="truncate text-charcoal/80">{row.key}</span>
              <span className="shrink-0 font-medium text-forest">{row.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
