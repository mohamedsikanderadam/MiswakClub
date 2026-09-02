# Phase 2 architecture notes

Phase 1 ships a waitlist. Nothing in it should need to be thrown away when
subscriptions and payments go live. This document records the intended
expansion path.

## What Phase 1 already provides

- **Content/config separation** — copy in `src/content/`, business settings and
  feature flags in `src/config/site.ts`. Product and plan data can move to the
  database without rewriting components.
- **Design tokens** — colours, type, radii, shadows and easing in
  `src/app/globals.css`, consumed by shared primitives in
  `src/components/ui/`.
- **Server-only data layer** — `src/lib/supabase.ts` plus feature modules
  (`waitlist.ts`, `admin-data.ts`). New tables follow the same pattern.
- **Provider abstractions** — email (`src/lib/email/`) and analytics
  (`src/lib/analytics.ts`) are swappable behind a single interface.
- **Referral engine** — codes, referrer/referred links and conversion status
  already exist; `referralRewards` is the hook for rewards.
- **Attribution** — first-touch UTM data is stored per member, so acquisition
  cost can be tied to future revenue.

## Data model additions

| Table              | Purpose                                                        |
| ------------------ | -------------------------------------------------------------- |
| `products`         | Miswak SKUs, imagery, descriptions                              |
| `plans`            | Quantity × frequency, price, currency, active flag              |
| `customers`        | Auth-linked account; backfill from `waitlist_users` by email    |
| `subscriptions`    | Plan, status, next delivery date, pause window, cancellation    |
| `orders`           | Fulfilment record per delivery cycle                            |
| `addresses`        | Shipping addresses, one default per customer                    |
| `payments`         | Payment-processor references only — never raw card data         |
| `referral_rewards` | Earned/redeemed rewards, replacing the empty config array       |

`waitlist_users.status` moves from `pending` to `converted` when a member
subscribes, keeping Phase 1 conversion measurable.

## Payments

Use a hosted checkout (e.g. Stripe Billing) so card data never touches the app.
Add `src/lib/payments/` with the same provider-shaped interface used by email,
and a webhook route (`/api/webhooks/<provider>`) that is the single source of
truth for subscription state — never trust redirect parameters.

## Accounts

Supabase Auth (magic link) fits the existing client. Add authenticated RLS
policies scoped to `auth.uid()`; the service-role client stays server-only and
is reserved for admin operations.

## Member area

`/account` with delivery schedule, plan changes, pause/skip, address book,
order history and referral status. The admin dashboard grows revenue, churn and
fulfilment views alongside the existing waitlist stats.

## Launch sequencing

1. Migrate waitlist members into `customers` and invite founding members first.
2. Ship products/plans read-only behind a flag to validate content.
3. Enable checkout for a limited market, then widen delivery coverage.
4. Turn on referral rewards once the reward economics are set.

## Operational notes

- Replace the in-memory rate limiter with Redis/KV before running multi-region.
- Add an email queue (or provider webhooks) once transactional volume grows.
- Introduce integration tests around checkout and webhook handling — Phase 1
  has no test suite because its surface is a single form.
