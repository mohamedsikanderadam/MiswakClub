# Miswak Club — Phase 1 (waitlist)

Pre-launch website for Miswak Club, a subscription service that will deliver
fresh Miswak to members. Phase 1 does **not** process subscriptions or
payments: it tells the story and converts visitors into waitlist members.

Stack: Next.js (App Router) · TypeScript · Tailwind CSS 4 · Supabase ·
Vercel-ready.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you need (nothing is required to boot)
npm run dev                  # http://localhost:3000
```

Without Supabase credentials the site renders fully and the waitlist API
returns a graceful "temporarily unavailable" response instead of crashing.

Scripts:

| Command             | Purpose                            |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Dev server                         |
| `npm run build`     | Production build (also typechecks) |
| `npm run start`     | Serve the production build         |
| `npm run lint`      | ESLint                             |
| `npm run typecheck` | `tsc --noEmit`                     |

---

## Environment variables

All variables live in `.env.example`. Highlights:

| Variable                          | Required | Notes                                             |
| --------------------------------- | -------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | yes      | Canonical URLs, sitemap, referral links            |
| `SUPABASE_URL`                    | yes      | Server-only                                        |
| `SUPABASE_SERVICE_ROLE_KEY`       | yes      | **Server-only. Never expose to the browser.**      |
| `EMAIL_PROVIDER`                  | no       | `resend` (default) or `log`                        |
| `RESEND_API_KEY`, `EMAIL_FROM`    | no       | Required only when `EMAIL_PROVIDER=resend`         |
| `ADMIN_PASSWORD`                  | yes      | 12+ chars. `/admin` stays locked until it is set   |
| `ADMIN_SESSION_SECRET`            | no       | Independent signing secret for the admin cookie    |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`   | no       | GA4 loads only when set                            |
| `NEXT_PUBLIC_SHOW_WAITLIST_COUNT` | no       | Off by default — never display a fabricated count  |

Anything prefixed `NEXT_PUBLIC_` is visible in the browser. Keep secrets out of
that prefix.

---

## Database setup

1. Create a Supabase project.
2. Run `supabase/migrations/0001_waitlist.sql` (SQL editor, or `supabase db
   push` with the CLI).
3. Copy the project URL and **service role** key into your environment.

The migration creates:

- `waitlist_users` — member record, attribution (UTM + landing page),
  `referral_code`, `referred_by`, `status`, timestamps.
- `referrals` — one row per referred signup, linking referrer, referred member
  and conversion status.

Constraints and safety:

- Case-insensitive unique index on `email` (duplicates return a friendly
  message, never a 500).
- Unique `referral_code`.
- `status` restricted by check constraint.
- RLS enabled and all access revoked from `anon` / `authenticated` — the tables
  are reachable only through the server-side service-role client.

### Migrations

Add new SQL files to `supabase/migrations/` using the `NNNN_description.sql`
convention and apply them in order. Never edit an applied migration.

---

## Waitlist flow

`POST /api/waitlist`

1. Rate limited per IP (5 requests / minute).
2. Validated with Zod (`src/lib/validation.ts`); email is lowercased/trimmed.
3. Honeypot (`company`) submissions are accepted silently and discarded.
4. Insert via the server-only Supabase client; unique violations map to
   `duplicate`.
5. Referral row written when the visitor arrived with a valid `?ref=` code.
6. Welcome email dispatched — a failure here never fails the signup.

Response shape: `{ status: "created" | "duplicate" | "invalid" |
"rate_limited" | "unavailable" | "error", ... }`. Raw database errors are never
returned to the client.

### Referrals

- Codes are generated with `node:crypto` random bytes over an unambiguous
  alphabet (`src/lib/referral.ts`) — never derived from row IDs.
- Share URL format: `https://…/?ref=ABC12345`.
- Reward tiers are configured in `referralRewards` in `src/config/site.ts` and
  are intentionally empty: nothing is promised to members until the business
  confirms rewards.

### Attribution

`src/lib/attribution.ts` captures `utm_source`, `utm_medium`, `utm_campaign`,
`utm_content`, `utm_term`, `ref` and the landing page on first visit and keeps
first-touch values in `sessionStorage`, so attribution survives navigation
before signup.

---

## Email

`src/lib/email/` is provider-agnostic:

```ts
type EmailProvider = {
  name: string;
  isConfigured: () => boolean;
  send: (message: EmailMessage) => Promise<{ ok: boolean; error?: string }>;
};
```

`resend` is implemented against the Resend REST API; `log` prints the message
(useful locally and in preview). Add a provider by dropping a file in
`src/lib/email/providers/` and registering it in `src/lib/email/index.ts`.
Templates live in `src/lib/email/templates/`.

---

## Admin dashboard

`/admin` — password protected (`ADMIN_PASSWORD`), signed HttpOnly session
cookie, 12-hour expiry, rate-limited login, and `noindex`.

Shows: total members, today, last 7 and 30 days, referred signups, top
referrers, country / replacement-frequency / UTM source / campaign
distributions, a searchable and filterable member table, and CSV export
(`/api/admin/export`, honours the active filters). Empty states say there is no
data rather than showing placeholder numbers.

---

## Analytics

`trackEvent()` in `src/lib/analytics.ts` is a thin abstraction — it forwards to
GA4 when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set, logs in development, and is a
no-op otherwise. Swap the transport in one place to move to Plausible/PostHog.

Events: `waitlist_cta_clicked`, `waitlist_form_viewed`,
`waitlist_form_started`, `waitlist_signup_completed`, `referral_link_copied`,
`referral_signup_completed`, `subscription_preview_clicked`, `faq_opened`,
`social_clicked`.

---

## Editing content

| What                                  | Where                  |
| ------------------------------------- | ---------------------- |
| Homepage copy (hero → footer, FAQ)    | `src/content/home.ts`  |
| Legal page copy                       | `src/content/legal.ts` |
| Brand config, socials, feature flags  | `src/config/site.ts`   |
| Countries and replacement frequencies | `src/config/site.ts`   |
| Colours, type, spacing tokens         | `src/app/globals.css`  |

Components read from these files, so copy changes rarely require touching JSX.

### Images

Optimised assets live in `public/brand/` and `public/product/` and are rendered
through `next/image`. To swap one, replace the file (keep the filename) or
update the `image.src` value in `src/content/home.ts`. Always provide
descriptive `alt` text. Source imagery is the client-approved set; the logo is
used as supplied and is never redrawn.

---

## SEO

Metadata, Open Graph and Twitter cards are defined in `src/app/layout.tsx`;
`sitemap.xml` and `robots.txt` are generated (`src/app/sitemap.ts`,
`src/app/robots.ts`) and exclude `/admin` and `/api`. The homepage emits
Organization, WebSite and FAQPage structured data. Custom `404` and error
screens are in `src/app/not-found.tsx` and `src/app/error.tsx`.

---

## Security

- The Supabase service-role key is only ever used in `server-only` modules.
- All waitlist input is validated server-side; emails are normalised.
- Duplicate emails are handled by a database constraint, not a race-prone read.
- Referral codes are cryptographically random.
- Rate limiting is in-memory (`src/lib/rate-limit.ts`), which is correct for a
  single-region deployment. For multi-region, replace the store with Upstash
  Redis / Vercel KV — the function signature stays the same.
- Admin sessions are HMAC-signed HttpOnly cookies; the password comparison is
  timing-safe.
- CSV export escapes leading `=`, `+`, `-`, `@` to prevent spreadsheet formula
  injection.
- No secrets are committed; `.env*` is git-ignored apart from `.env.example`.

---

## Accessibility

Semantic landmarks, a skip link, labelled form controls with `aria-invalid` and
described errors, native `<details>` FAQ and `<dialog>` modal, visible focus
rings, and `prefers-reduced-motion` support (scroll reveals render content
immediately for those users).

---

## Deployment (Vercel + Supabase)

1. Import the repository into Vercel (framework preset: Next.js).
2. Add every variable from `.env.example` for Production and Preview.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Run the migration against the production Supabase project.
5. Deploy, then verify: waitlist signup, duplicate handling, `?ref=` capture,
   welcome email, `/admin` login, CSV export, `robots.txt`, `sitemap.xml`.

[`docs/go-live.md`](docs/go-live.md) walks through this end to end, including
the content and legal decisions that must be made first.

---

## Phase 2 and beyond

See [`docs/phase-2-architecture.md`](docs/phase-2-architecture.md) for how the
Phase 1 foundations extend into products, subscriptions, checkout and member
accounts.

The original brief is kept in
[`docs/MISWAK_CLUB_MASTER_BRIEF.md`](docs/MISWAK_CLUB_MASTER_BRIEF.md).

## Open items for the business

These are deliberately left blank rather than invented — search for
`TODO(owner)`:

- Public contact email and social profile URLs.
- Final pricing, plan sizes and delivery frequencies.
- Delivery markets and shipping terms.
- Reviewed legal copy for privacy, terms, shipping and subscription policy.
- Launch date.
