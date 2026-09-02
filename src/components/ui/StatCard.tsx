import { cn } from "@/lib/cn";

export function StatCard({
  label,
  value,
  hint,
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-forest/10 bg-white p-5",
        className,
      )}
    >
      <p className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-charcoal/55 uppercase">
        {label}
      </p>
      <p className="mt-2 font-serif text-3xl text-forest">{value}</p>
      {hint ? <p className="mt-1 text-xs text-charcoal/55">{hint}</p> : null}
    </div>
  );
}
