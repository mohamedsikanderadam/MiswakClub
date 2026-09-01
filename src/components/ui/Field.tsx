"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const control =
  "h-12 w-full rounded-md border border-forest/20 bg-white px-4 font-sans text-base text-charcoal transition-colors placeholder:text-charcoal/40 focus:border-forest focus:outline-none disabled:opacity-60 aria-[invalid=true]:border-red-700";

function FieldShell({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-sans text-sm font-medium text-charcoal/80"
      >
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-charcoal/60">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({
  id,
  label,
  hint,
  error,
  className,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & ComponentProps<"input">) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        className={cn(control, className)}
        {...props}
      />
    </FieldShell>
  );
}

export function Select({
  id,
  label,
  hint,
  error,
  placeholder,
  options,
  className,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  options: readonly { value: string; label: string }[];
} & ComponentProps<"select">) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        className={cn(control, "appearance-none bg-no-repeat pr-10", className)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9'><path d='M1 1l6 6 6-6' fill='none' stroke='%23183d2b' stroke-width='1.5'/></svg>\")",
          backgroundPosition: "right 1rem center",
        }}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
