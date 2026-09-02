"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import { Heading } from "@/components/ui/Layout";
import { countries, features, replacementFrequencies } from "@/config/site";
import { waitlistForm } from "@/content/home";
import { trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import type { WaitlistResponse } from "@/app/api/waitlist/route";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; referralUrl?: string }
  | { kind: "error"; message: string; errors?: Record<string, string> };

const countryOptions = countries.map((country) => ({
  value: country.code,
  label: country.label,
}));

const frequencyOptions = replacementFrequencies.map((item) => ({
  value: item.value,
  label: item.label,
}));

export function WaitlistForm({
  headingId,
  source,
  onDone,
}: {
  headingId: string;
  source: string;
  onDone?: () => void;
}) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const startedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    trackEvent("waitlist_form_viewed", { source });
  }, [source]);

  function handleFirstInput() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("waitlist_form_started", { source });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const attribution = getAttribution();

    setState({ kind: "submitting" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          email: data.get("email"),
          phone: data.get("phone") ?? undefined,
          country: data.get("country") ?? undefined,
          replacementFrequency: data.get("replacementFrequency") ?? undefined,
          company: data.get("company") ?? undefined,
          referralCode: attribution.referral_code,
          utmSource: attribution.utm_source,
          utmMedium: attribution.utm_medium,
          utmCampaign: attribution.utm_campaign,
          utmContent: attribution.utm_content,
          utmTerm: attribution.utm_term,
          landingPage: attribution.landing_page,
        }),
      });

      const body = (await response.json()) as WaitlistResponse;

      if (body.status === "created") {
        trackEvent("waitlist_signup_completed", { source });
        if (attribution.referral_code) {
          trackEvent("referral_signup_completed", {
            code: attribution.referral_code,
          });
        }
        form.reset();
        setState({ kind: "success", referralUrl: body.referralUrl });
        onDone?.();
        return;
      }

      if (body.status === "duplicate") {
        setState({ kind: "error", message: waitlistForm.errors.duplicate });
        return;
      }

      if (body.status === "invalid") {
        setState({
          kind: "error",
          message: body.errors?.form ?? "Please check the highlighted fields.",
          errors: body.errors,
        });
        return;
      }

      if (body.status === "rate_limited") {
        setState({ kind: "error", message: waitlistForm.errors.rateLimited });
        return;
      }

      setState({
        kind: "error",
        message:
          body.status === "unavailable"
            ? waitlistForm.errors.unavailable
            : waitlistForm.errors.generic,
      });
    } catch {
      setState({ kind: "error", message: waitlistForm.errors.network });
    }
  }

  if (state.kind === "success") {
    return (
      <SuccessState headingId={headingId} referralUrl={state.referralUrl} />
    );
  }

  const errors = state.kind === "error" ? state.errors : undefined;
  const submitting = state.kind === "submitting";

  return (
    <div>
      <Heading id={headingId} level={2} size="md" className="text-forest">
        {waitlistForm.heading}
      </Heading>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal/70">
        {waitlistForm.body}
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onInput={handleFirstInput}
        noValidate
        className="mt-6 flex flex-col gap-4"
      >
        <Input
          id="firstName"
          name="firstName"
          label={waitlistForm.fields.firstName}
          autoComplete="given-name"
          required
          maxLength={60}
          error={errors?.firstName}
        />
        <Input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          label={waitlistForm.fields.email}
          autoComplete="email"
          required
          maxLength={254}
          error={errors?.email}
        />
        {features.collectPhone ? (
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            label={waitlistForm.fields.phone}
            autoComplete="tel"
            maxLength={24}
            error={errors?.phone}
          />
        ) : null}
        {features.collectCountry ? (
          <Select
            id="country"
            name="country"
            label={waitlistForm.fields.country}
            placeholder={waitlistForm.countryPlaceholder}
            options={countryOptions}
            error={errors?.country}
          />
        ) : null}
        <Select
          id="replacementFrequency"
          name="replacementFrequency"
          label={waitlistForm.fields.frequency}
          placeholder={waitlistForm.frequencyPlaceholder}
          options={frequencyOptions}
          error={errors?.replacementFrequency}
        />

        {/* Honeypot — hidden from users and assistive technology. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        {state.kind === "error" ? (
          <p
            role="alert"
            className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-900"
          >
            {state.message}
          </p>
        ) : null}

        <Button type="submit" size="lg" fullWidth disabled={submitting}>
          {submitting ? waitlistForm.submitting : waitlistForm.submit}
        </Button>
        <p className="text-center text-xs text-charcoal/55">
          {waitlistForm.privacyNote}
        </p>
      </form>
    </div>
  );
}

function SuccessState({
  headingId,
  referralUrl,
}: {
  headingId: string;
  referralUrl?: string;
}) {
  const [copied, setCopied] = useState(false);
  const { success } = waitlistForm;

  async function copy() {
    if (!referralUrl) return;
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      trackEvent("referral_link_copied");
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    if (!referralUrl || !navigator.share) return;
    try {
      await navigator.share({
        title: "Miswak Club",
        text: "Fresh Miswak. Delivered. Join the waitlist:",
        url: referralUrl,
      });
    } catch {
      // Share sheet dismissed — nothing to do.
    }
  }

  return (
    <div>
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-pill bg-forest text-cream"
      >
        <svg width="16" height="12" viewBox="0 0 16 12">
          <path
            d="M1 6.2l4.4 4.3L15 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      </span>
      <Heading id={headingId} level={2} size="md" className="mt-5 text-forest">
        {success.headline}
      </Heading>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal/75">
        {success.body}
      </p>

      {features.enableReferrals && referralUrl ? (
        <div className="mt-7 rounded-lg border border-forest/12 bg-cream p-5">
          <p className="font-serif text-lg text-forest">
            {success.referralHeading}
          </p>
          <p className="mt-1 text-sm text-charcoal/70">{success.referralBody}</p>
          <p className="mt-4 truncate rounded-md border border-forest/12 bg-white px-3 py-2 font-mono text-xs text-charcoal/80">
            {referralUrl}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" size="sm" onClick={copy}>
              {copied ? success.copied : success.copy}
            </Button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Fresh Miswak. Delivered. Join the Miswak Club waitlist: ${referralUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-pill border border-forest/25 px-5 text-sm font-medium text-forest transition-colors hover:bg-forest/5"
            >
              {success.whatsapp}
            </a>
            {typeof navigator !== "undefined" && "share" in navigator ? (
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={nativeShare}
              >
                {success.share}
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
