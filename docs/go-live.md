# Going live (Phase 1 waitlist)

Order matters: content and credentials first, then deploy, then domain, then
verify. Budget an evening; the only slow step is DNS propagation.

Phase 1 is waitlist-only. There is **no ecommerce**: no cart, checkout,
payments or subscription management. Plans render as "Launching Soon" with no
pricing. See [`phase-2-architecture.md`](phase-2-architecture.md) for what
ecommerce would add.

---

## 1. Decide the content you must supply

The site deliberately contains no invented business facts. Before launch,
decide these and send them over (or edit the files directly):

| Item                                             | Where it lives                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------- |
| Public contact email                             | `NEXT_PUBLIC_CONTACT_EMAIL`                                                 |
| Instagram / TikTok / WhatsApp URLs               | `NEXT_PUBLIC_SOCIAL_*` (empty values are hidden, so launching without is OK) |
| Privacy, terms, shipping, subscription policy    | `src/content/legal.ts` — currently clearly-marked placeholders               |
| Any copy tweaks (hero, FAQ, plan descriptions)   | `src/content/home.ts`                                                       |
| Whether to show a public waitlist count          | `NEXT_PUBLIC_SHOW_WAITLIST_COUNT` (off by default; only enable once the real number is flattering) |

Pricing, plan sizes, delivery markets and launch date are intentionally absent
from the site — nothing needs to be decided about them to launch Phase 1.

**Legal is the one blocking item.** The four policy pages are placeholders and
must be replaced with copy you (or a lawyer) approve, because you are
collecting names, emails and phone numbers.

---

## 2. Supabase (the waitlist database)

1. Create a project at [supabase.com](https://supabase.com) (free tier is fine
   for a waitlist). Pick the region closest to your customers.
2. SQL Editor → paste the contents of
   `supabase/migrations/0001_waitlist.sql` → Run. This creates
   `waitlist_users` and `referrals` with RLS on and public access revoked.
3. Settings → API → copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** secret → `SUPABASE_SERVICE_ROLE_KEY`

The service_role key bypasses RLS. It is used only in server-side code — never
put it in a `NEXT_PUBLIC_*` variable and never paste it into a client app.

---

## 3. Email (Resend)

Optional for launch — without it, signups still work and are stored, they just
get no confirmation email.

1. Create a [Resend](https://resend.com) account → add and verify the
   `miswakclub.com` domain (adds DKIM/SPF DNS records).
2. API Keys → create one → `RESEND_API_KEY`.
3. Set `EMAIL_PROVIDER=resend` and `EMAIL_FROM="Miswak Club <hello@miswakclub.com>"`
   (the from-address must be on the verified domain).

Leave `EMAIL_PROVIDER=log` until the domain is verified; sending from an
unverified domain gets you marked as spam.

---

## 4. Admin credentials

```bash
# admin password (32 random chars) — store it in a password manager
openssl rand -base64 24
# session signing secret
openssl rand -hex 32
```

→ `ADMIN_PASSWORD` (must be at least 12 characters or `/admin` stays locked)
and `ADMIN_SESSION_SECRET`.

---

## 5. Deploy to Vercel

1. Merge the PR to `main`.
2. [vercel.com/new](https://vercel.com/new) → import `mohamedsikanderadam/MiswakClub`.
   The Next.js preset is detected automatically; no build settings to change.
3. Add environment variables (Settings → Environment Variables) for
   **Production** and **Preview**:

   ```
   NEXT_PUBLIC_SITE_URL=https://miswakclub.com
   SUPABASE_URL=...
   SUPABASE_SERVICE_ROLE_KEY=...
   EMAIL_PROVIDER=resend
   RESEND_API_KEY=...
   EMAIL_FROM=Miswak Club <hello@miswakclub.com>
   ADMIN_PASSWORD=...
   ADMIN_SESSION_SECRET=...
   NEXT_PUBLIC_CONTACT_EMAIL=...
   ```

   Optional: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_SOCIAL_*`,
   `NEXT_PUBLIC_SHOW_WAITLIST_COUNT`, `NEXT_PUBLIC_ENABLE_REFERRALS`,
   `NEXT_PUBLIC_COLLECT_PHONE`, `NEXT_PUBLIC_COLLECT_COUNTRY`.

   Consider a **separate Supabase project for Preview** so test signups don't
   pollute the real waitlist.

4. Deploy.

`NEXT_PUBLIC_SITE_URL` must be the final domain: it drives canonical URLs, the
sitemap and the referral share links. Getting it wrong means people share
links to the wrong host.

---

## 6. Domain

1. Vercel → Settings → Domains → add `miswakclub.com` and `www.miswakclub.com`.
2. At your registrar, follow the records Vercel shows (typically an `A` record
   for the apex and a `CNAME` for `www`). Keep the Resend DKIM/SPF records.
3. Wait for the TLS certificate to issue, then re-deploy once so
   `NEXT_PUBLIC_SITE_URL` is baked in correctly.

---

## 7. Analytics

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to a GA4 measurement ID and the tag loads
itself; leave it empty and nothing is loaded (no cookie banner needed for the
site itself). Events already firing: `waitlist_cta_clicked`,
`waitlist_form_viewed/started`, `waitlist_signup_completed`,
`referral_link_copied`, `subscription_preview_clicked`, `faq_opened`,
`social_clicked`.

---

## 8. Verify on production

- [ ] Homepage loads over HTTPS on the real domain; images load.
- [ ] Submit a real signup → success state with a referral link.
- [ ] Row appears in Supabase → `waitlist_users`.
- [ ] Confirmation email arrives (check spam).
- [ ] Submit the same email again → friendly "already on the list", not an error.
- [ ] Open your referral link `?ref=...` in a private window, sign up → a row
      appears in `referrals`.
- [ ] Visit `/?utm_source=test&utm_campaign=launch`, sign up, confirm the UTM
      columns are populated.
- [ ] `/admin` → login with `ADMIN_PASSWORD` → counts match; CSV export downloads.
- [ ] `/privacy`, `/terms`, `/shipping`, `/subscription-policy` show *approved*
      copy, not placeholders.
- [ ] `/robots.txt` and `/sitemap.xml` reference the real domain.
- [ ] Phone check: hero, mobile menu, sticky CTA, form.

Then delete your test signups from Supabase so the numbers stay honest.

---

## 9. After launch

- Watch `/admin` daily for the first week; UTM/campaign breakdowns tell you
  which channel is worth spending on.
- If you run paid traffic from more than one region, replace the in-memory rate
  limiter (`src/lib/rate-limit.ts`) with Upstash Redis or Vercel KV — the
  function signature is unchanged.
- Decide referral rewards before promoting referral links; `referralRewards` in
  `src/config/site.ts` is intentionally empty so nothing is promised.
- Ecommerce (checkout, subscriptions, member accounts) is a separate build —
  see [`phase-2-architecture.md`](phase-2-architecture.md).
