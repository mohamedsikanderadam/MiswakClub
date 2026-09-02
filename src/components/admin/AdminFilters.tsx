import { ButtonLink } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import { countries, replacementFrequencies } from "@/config/site";

export function AdminFilters({
  filters,
  sources,
  exportQuery,
  resultCount,
}: {
  filters: { query: string; country: string; frequency: string; source: string };
  sources: string[];
  exportQuery: string;
  resultCount: number;
}) {
  return (
    <form
      method="get"
      className="flex flex-col gap-4 rounded-lg border border-forest/10 bg-white p-5 lg:flex-row lg:items-end"
    >
      <div className="lg:flex-1">
        <Input
          id="q"
          name="q"
          label="Search"
          placeholder="Name, email, phone or referral code"
          defaultValue={filters.query}
        />
      </div>
      <Select
        id="country"
        name="country"
        label="Country"
        placeholder="All countries"
        defaultValue={filters.country}
        options={countries.map((country) => ({
          value: country.code,
          label: country.label,
        }))}
      />
      <Select
        id="frequency"
        name="frequency"
        label="Frequency"
        placeholder="All frequencies"
        defaultValue={filters.frequency}
        options={replacementFrequencies.map((item) => ({
          value: item.value,
          label: item.label,
        }))}
      />
      <Select
        id="source"
        name="source"
        label="UTM source"
        placeholder="All sources"
        defaultValue={filters.source}
        options={sources
          .filter((source) => source !== "Unknown")
          .map((source) => ({ value: source, label: source }))}
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="inline-flex h-12 items-center rounded-pill bg-forest px-6 text-sm font-medium text-white transition-colors hover:bg-heritage"
        >
          Apply
        </button>
        <ButtonLink
          href={`/api/admin/export${exportQuery ? `?${exportQuery}` : ""}`}
          variant="secondary"
          prefetch={false}
          download
        >
          Export CSV
        </ButtonLink>
      </div>
      <p className="text-sm text-charcoal/55 lg:pb-4">{resultCount} shown</p>
    </form>
  );
}
