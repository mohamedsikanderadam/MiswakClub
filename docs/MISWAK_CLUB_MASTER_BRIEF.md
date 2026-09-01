# IMPORTANT FOR DEVIN

This document is the source of truth for the Miswak Club project.

Before making product, design, architectural, or implementation decisions:

1. Read this document completely.
2. Review the existing repository code.
3. Review all supplied brand and product assets.
4. Do not invent missing business information.
5. Flag assumptions clearly.
6. Prioritize Phase 1 requirements over future features.
7. Update this document if an approved product decision materially changes the specification.

---

# MISWAK CLUB: MASTER BUILD BRIEF

**Brand:** Miswak Club  
**Tagline:** Fresh Miswak. Delivered.  
**Phase 1:** Pre-launch website and waitlist  
**Primary objective:** Waitlist conversion  
**Future direction:** Subscription e-commerce platform

Build a production-quality, premium, mobile-first website that initially launches as a waitlist website while establishing a maintainable foundation for a future subscription platform.

Do not over-engineer Phase 1. Prioritize:

1. Brand quality
2. Conversion
3. Mobile experience
4. Performance
5. Maintainable architecture
6. Analytics
7. Future e-commerce extensibility

---

## 1. Business Concept

Miswak Club is a subscription service that will deliver fresh Miswak directly to customers.

People who use Miswak often forget to replace it, use the same one for too long, run out, struggle to find consistent quality, or repeatedly need to purchase it manually.

Miswak Club solves this through recurring delivery:

**Choose your Miswak → Choose your frequency → Receive it → Replace it → Repeat**

Phase 1 will not process subscriptions or payments. It will validate demand and build a waitlist before launch.

---

## 2. Brand Positioning

Miswak Club should feel like a premium modern wellness and lifestyle subscription brand rooted in Islamic tradition and natural oral care.

The positioning is:

**Tradition × Nature × Convenience × Modern Lifestyle**

The brand idea is:

**An ancient practice, made effortless for modern life.**

The brand must not resemble:

- An Islamic charity
- A traditional Islamic gift shop
- A generic Shopify store
- A pharmacy or clinical dental company
- An oud or perfume brand
- A cheap natural-products marketplace

### Brand personality

- Premium, refined but accessible
- Natural and authentic
- Clean and modern
- Calm and purposeful
- Trustworthy and informative
- Respectful of Miswak's heritage
- Convenient and subscription-first

---

## 3. Target Customer

### Primary audience

Muslims who already use Miswak or want to build the habit of using it.

### Secondary audience

People interested in natural oral care, sustainable products, traditional wellness practices, and minimalist lifestyle products.

The initial geographical focus must be configurable. Do not hardcode the business to a single country.

---

## 4. Brand Identity

### Logo

Use the supplied approved Miswak Club logo assets. Prepare support for:

1. Full primary logo
2. Wordmark
3. MC brand mark
4. Favicon

Do not redraw, distort, rotate, recolor, or materially modify the approved logo. Do not add shadows, gradients, decorative effects, or unrelated Islamic symbols. Maintain clear space approximately equal to the height of the M in the wordmark.

### Color palette

Create centralized design tokens.

| Token | Hex | Purpose |
|---|---:|---|
| Miswak Forest | `#183D2B` | Primary brand color, buttons, navigation, headings, footer |
| Heritage Green | `#31583E` | Supporting UI, icons, hover states |
| Miswak Sand | `#C59A5B` | Natural premium accent, used sparingly |
| Natural Cream | `#F7F3EA` | Primary background |
| Soft Sand | `#E8DDCA` | Secondary section background |
| Charcoal | `#252A26` | Primary body text |
| White | `#FFFFFF` | High-contrast applications |

Approximate visual balance:

- 60% cream or white
- 25% green
- 10% neutral or sand
- 5% accent

Do not overuse gold or sand accents.

### Typography

- **Headings:** Cormorant Garamond, or an equivalent sophisticated serif if technically preferable
- **Body and UI:** Manrope
- **Fallback:** Inter

The serif represents heritage and craftsmanship. The sans serif represents modernity and simplicity. Use a strong typographic hierarchy and generous whitespace.

### Photography direction

Use the supplied brand and product images wherever available. Do not replace approved assets with generic stock images.

Images should feel warm, tactile, natural, premium, authentic, and minimal. Favor Miswak, raw wood, linen, cotton, kraft paper, natural stone, cream surfaces, green foliage, and water. Use soft natural daylight and realistic shadows. Avoid artificial or overly polished CGI aesthetics.

Miswak must remain the visual hero.

---

## 5. Brand Voice and Messaging

The voice should be simple, confident, warm, educational, modern, respectful, and minimal.

Avoid:

- Exaggerated marketing language
- Overly corporate copy
- Excessive Islamic terminology
- Fear-based messaging
- Unverified medical claims
- Claims that Miswak replaces professional dental care

### Core messaging

**Primary tagline:** Fresh Miswak. Delivered.

**Supporting line:** A timeless practice. Made effortless.

Approved supporting concepts:

- Never run out of Miswak again.
- Fresh Miswak, right when you need it.
- Rooted in tradition. Designed for today.
- Naturally simple.
- Your Miswak. On repeat.
- The original oral-care routine. Made easier.

Use these selectively rather than placing every message on one page.

### Messaging pillars

1. **Freshness:** Fresh Miswak matters.
2. **Convenience:** Never run out of Miswak again.
3. **Tradition:** A timeless practice.
4. **Simplicity:** Delivered. Use it. Replace it. Repeat.

---

## 6. Phase 1 Website Objective

The primary conversion is:

# JOIN THE WAITLIST

Alternative CTA language may include:

- Get Early Access
- Become a Founding Member
- Join the Club

Avoid generic CTAs such as Submit or Learn More when a contextual CTA can be used.

Within approximately five seconds, a first-time visitor must understand:

1. What the service is
2. Why it is useful
3. How to join the waitlist

---

## 7. Homepage Structure

### 7.1 Navigation

Use minimal navigation.

- Left: Miswak Club logo
- Links: How It Works, Why Miswak, FAQ
- Right: Join the Waitlist
- Mobile: Hamburger menu and prominent waitlist CTA

The navigation may become subtly sticky after scrolling.

### 7.2 Hero

**Headline:**

# Fresh Miswak.
# Delivered.

**Supporting copy:**

A simple subscription designed to keep fresh Miswak within reach, without having to remember when to replace it.

**Primary CTA:** Join the Waitlist

**Microcopy:** Join the Club and get exclusive early access when we launch.

Use a premium Miswak Club product image prominently. The product should visually dominate. Avoid excessive above-the-fold content.

### 7.3 Social proof

Provide architecture for an optional waitlist count, such as:

**Join 1,248 people waiting for launch**

Do not fabricate numbers. Only show this element when an administrator enables it and a legitimate count exists. Default:

```ts
showWaitlistCount = false
```

### 7.4 Problem

**Headline:** Your Miswak shouldn't stay with you forever.

Explain concisely that people often forget to replace their Miswak, run out, keep one for too long, or struggle to find consistent quality.

Transition to:

**That's why we're building Miswak Club.**

### 7.5 How it works

**Headline:** Miswak. On repeat.

1. **Choose:** Choose how many Miswaks you need and how often you want them.
2. **Receive:** Fresh Miswak arrives directly at your door.
3. **Replace:** Use it. Replace it. Repeat.

Phase 1 CTA: **Get Early Access**. Do not enable checkout.

### 7.6 Subscription preview

Preview conceptual plans:

- **Essential:** 1 Miswak per delivery
- **Duo:** 2 Miswaks per delivery
- **Family:** Multiple Miswaks per delivery

Do not hardcode pricing or imply the plans are final. Show **Launching Soon** and provide a **Join the Waitlist** CTA. Store plan data in configurable structures.

### 7.7 Benefits

- **Freshness:** Regular replacement without needing to remember
- **Convenience:** Delivered directly to the customer's doorstep
- **Quality:** Consistent sourcing and product standards
- **Routine:** Easier to incorporate into daily life
- **Natural:** A simple natural product without unnecessary complexity

Avoid medical claims.

### 7.8 Product education

**Headline:** A tradition that goes back centuries.

Briefly introduce Miswak to unfamiliar visitors. Mention that it traditionally comes from *Salvadora persica* and has a long history of use for oral hygiene. Keep this concise and create future architecture for deeper educational articles.

### 7.9 The Club

**Headline:** More than a subscription.

Present the long-term membership idea. Potential future benefits include member pricing, flexible deliveries, referral rewards, early product access, member exclusives, and community benefits.

Do not promise features that have not launched. Present them as future direction where appropriate.

### 7.10 Founding members

**Headline:** Become a Founding Member.

**Copy:** We're getting ready to launch Miswak Club. Join the waitlist and be among the first to experience it.

Potential benefits:

- Early launch access
- Founding member offers
- Product updates
- Launch notifications

**CTA:** Join the Club

### 7.11 FAQ

Create an accessible accordion covering:

- What is Miswak Club?
- How will the subscription work?
- How often can I receive Miswak?
- Can I change my delivery frequency?
- Can I pause my subscription?
- Can I cancel anytime?
- Where will you deliver?
- How much will it cost?
- What type of Miswak will you use?
- When are you launching?

Where information is not finalized, say: **Details will be announced closer to launch.** Never invent business policies.

### 7.12 Footer

Include the logo, tagline, navigation, configured social links, and legal links.

Social placeholders:

- Instagram
- TikTok
- WhatsApp
- Email

Legal routes:

- `/privacy`
- `/terms`
- `/shipping`
- `/subscription-policy`

Do not publish fake contact details or present temporary legal copy as approved final wording.

---

## 8. Waitlist Experience

### Required fields

- First name
- Email

### Optional and configurable fields

- Mobile number
- Country

### Research field

**How often do you currently replace your Miswak?**

- Weekly
- Every 2 weeks
- Monthly
- Only when needed
- I don't currently use Miswak

Keep the form visually simple and minimize friction.

### Success state

**Headline:** You're in.

**Message:** Welcome to Miswak Club. We'll let you know when early access opens.

If referrals are enabled, display the member's referral URL and provide:

- Copy Link
- WhatsApp Share
- Native Share where supported

Example URL:

```text
/?ref=ABC123
```

Use secure random referral codes, never sequential database IDs.

### Duplicate submission

Normalize email addresses and prevent duplicate registrations. Respond gracefully:

**Looks like you're already in the Club.**

Never expose raw database errors.

---

## 9. Referral Architecture

Prepare a lightweight referral system that tracks:

- Referral code
- Referring member
- Referred member
- Timestamp
- Conversion status

Future campaign concept:

**Refer 3 friends and receive your first delivery free.**

Do not activate or promise this reward until it is configured. Allow future reward thresholds to be defined without rewriting the referral system.

---

## 10. Database

Preferred database: **Supabase PostgreSQL**

Suggested `waitlist_users` fields:

```text
id
first_name
email
phone
country
replacement_frequency
referral_code
referred_by
utm_source
utm_medium
utm_campaign
utm_content
utm_term
landing_page
created_at
status
```

Create proper migrations and constraints. Normalize email, enforce uniqueness appropriately, and handle duplicates gracefully.

Use secure Row Level Security policies. Never expose a service role key client-side.

---

## 11. Marketing Attribution

Capture and preserve, where technically reasonable:

- UTM source
- UTM medium
- UTM campaign
- UTM content
- UTM term
- Referral code
- Landing page

Preserve attribution throughout the signup session.

---

## 12. Email Confirmation

Build modular email functionality that can support providers such as Resend, Brevo, Mailchimp, or Klaviyo. Do not tightly couple the application to one provider unless it has been selected.

**Subject:** You're in the Miswak Club

The email should welcome the member, confirm their waitlist status, explain that they will receive early-access information, and include their referral URL if referrals are enabled.

Use branded responsive HTML email styling consistent with the website.

---

## 13. Admin Dashboard

Create a simple protected admin interface. It does not need to become an ERP.

Admins should be able to view:

- Total waitlist users
- Today's signups
- Signups in the last 7 and 30 days
- Country distribution
- Replacement-frequency distribution
- Referral signups
- Top referrers
- UTM source performance
- Campaign performance

Allow search, filtering, and CSV export.

Admin access must require authentication. Do not expose `/admin` publicly without access control.

Handle empty states honestly. Do not display misleading charts when there is no data.

---

## 14. Analytics

Prepare a clean analytics abstraction. GA4 may be used initially.

Track meaningful events such as:

```text
waitlist_cta_clicked
waitlist_form_viewed
waitlist_form_started
waitlist_signup_completed
referral_link_copied
referral_signup_completed
subscription_preview_clicked
faq_opened
social_clicked
```

Avoid unnecessary event noise. Document every event and its properties in the README.

---

## 15. Technical Stack

### Frontend and server

- Next.js, current stable version
- TypeScript in strict mode
- Tailwind CSS
- Modern Next.js conventions
- Next.js server-side functionality where appropriate

Do not create unnecessary microservices.

### Database

- Supabase PostgreSQL

### Hosting and source control

- Vercel
- GitHub

Structure the project for production deployment.

---

## 16. Code Quality and Design System

Use reusable components, a clear folder structure, environment variables, server-side validation, proper error handling, accessible controls, and secure data access.

Avoid giant components, duplicate business logic, one-off styling, and unnecessary dependencies.

Keep content and configuration separate from UI where practical. Basic business copy should not require rewriting React components.

Suggested components:

- Button
- Container
- Section
- Heading
- Eyebrow
- Card
- Input
- Select
- Modal
- Accordion
- Badge
- Logo
- ProductCard
- WaitlistForm
- StatCard

Use consistent spacing, typography, colors, border radius, shadows, and breakpoints.

---

## 17. Visual Experience

The site should feel editorial rather than templated.

Use:

- Large typography
- Large product photography
- Generous negative space
- Alternating cream and white sections
- Deep forest-green moments
- Occasional full-width visual sections
- Subtle Miswak Sand accents

Do not place every piece of information inside rounded cards. Avoid a generic SaaS landing-page appearance.

Potential image placements:

- Hero: premium Miswak Club box
- How It Works: individual Miswak
- Product: packaging lineup
- Freshness: Miswak fibre close-up
- Natural: Miswak on wood or foliage
- Delivery: open subscription box
- Lifestyle: Miswak Club pouch
- Education: natural Miswak imagery

Do not use every image at once. Preserve generous whitespace.

---

## 18. Mobile Experience

Assume a large share of visitors will arrive through Instagram, TikTok, WhatsApp, influencers, and paid social.

Design mobile-first and test at minimum:

- 375px
- 390px
- 430px
- Tablet
- Desktop

Consider a sticky mobile **Join the Club** CTA after the user scrolls beyond the hero. It must not obstruct content.

---

## 19. Micro-interactions

Use tasteful motion such as gentle image reveals, subtle text entrances, button hover states, FAQ transitions, product-card interactions, and restrained scroll reveals.

Do not use excessive animation. Respect `prefers-reduced-motion`.

---

## 20. Security

Implement:

- Server-side form validation
- Input sanitization
- Rate limiting where appropriate
- Spam and bot-protection architecture
- Secure Supabase policies and RLS
- Environment-variable protection
- No service keys exposed client-side
- Secure admin authentication
- CSRF considerations where relevant
- Safe user-facing error handling

Never expose credentials or commit secrets. Provide `.env.example` containing placeholders only.

---

## 21. SEO

Implement:

- Semantic HTML
- Correct heading hierarchy
- Meta title and description
- Open Graph and social preview metadata
- Canonical URL
- `robots.txt`
- `sitemap.xml`
- Structured data where appropriate
- Accessible alt text

Suggested title:

**Miswak Club | Fresh Miswak Delivered**

Suggested description:

**Join Miswak Club for early access to a simple Miswak subscription designed to deliver fresh Miswak directly to your door.**

---

## 22. Performance and Accessibility

Target excellent Core Web Vitals and approximately:

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

Optimize images, fonts, JavaScript, lazy loading, caching, and rendering strategy without unnecessarily sacrificing visual quality.

Follow WCAG-conscious practices:

- Proper contrast
- Keyboard navigation
- Visible focus states
- Accessible forms and labels
- Semantic HTML
- ARIA only where necessary
- Reduced-motion support

Do not use placeholder text as the only form label.

---

## 23. Internationalization

English is the Phase 1 language. Structure the application so Arabic and RTL support can be added later without unnecessary rework.

Do not automatically translate the website.

---

## 24. Error and Empty States

Design clear experiences for:

- Invalid email
- Duplicate email
- Network failure
- Database unavailable
- Rate limit reached
- Invalid referral code
- Form submission failure
- 404
- 500
- Admin views with no data

Users must never see raw technical errors.

---

## 25. Content Architecture

Make the following easy to configure:

- Headlines and CTAs
- FAQs
- Subscription previews
- Benefits
- Social URLs
- Contact details
- Launch status
- Waitlist counter
- Referral settings
- Countries
- Product information

Do not scatter site copy across UI components.

---

## 26. Future E-commerce Architecture

Do not build the following in Phase 1. Document how the current architecture can later support:

- Products and variants
- Subscription plans and delivery frequencies
- One-time purchases
- Recurring billing
- Customer accounts and addresses
- Orders and inventory
- Subscription pause, skip, cancellation, and frequency changes
- Plan upgrades and downgrades
- Promo codes and referral credits
- Failed-payment handling
- Customer notifications and dashboard
- Admin order management

Potential future frequencies include weekly, every two weeks, monthly, and other configurable options. Do not assume the final model.

Potential UAE-compatible payment providers include Stripe, Checkout.com, Network International, Amazon Payment Services, and Telr. Do not integrate payments until a provider is selected. Avoid designing the database around one processor.

Prepare clean future paths such as:

```text
/shop
/products/[slug]
/subscriptions
/our-miswak
/how-it-works
/journal
/journal/[slug]
/account
/account/subscription
/account/orders
```

These routes do not need to be fully built in Phase 1.

---

## 27. Trust and Claims

Prepare space for future sourcing information, product origin, packaging information, customer reviews, quality standards, product photography, and founder story.

Never fabricate:

- Certifications
- Reviews
- Subscriber numbers
- Sourcing claims
- Medical claims
- Shipping coverage
- Pricing
- Contact information
- Social profiles

---

## 28. Documentation

Create a comprehensive `README.md` covering:

- Project overview
- Technology stack
- Local development
- Environment variables
- Database and Supabase setup
- Migrations
- Admin setup
- Analytics events
- Email configuration
- Deployment and domain configuration
- Referral architecture
- Content editing
- Image management
- Security considerations
- Phase 2 architecture

Also provide:

- `.env.example`
- Database schema and migrations
- Deployment configuration
- Clear Phase 2 integration guidance

Never include real credentials in documentation.

---

## 29. Quality Assurance

Before completion, test:

- Desktop Chrome
- Desktop Edge
- Safari where available
- Mobile Chrome
- Mobile Safari
- All navigation and CTAs
- Waitlist submission
- Duplicate and invalid submissions
- Referral URLs
- UTM capture
- Email flow
- Admin authentication
- CSV export
- Responsive layout
- 404 and error states
- Loading states
- Accessibility

---

## 30. Final Pre-launch Audit

Before declaring the project complete, evaluate:

### Brand

Does the website look like a premium consumer brand?

### Customer comprehension

Can a visitor understand the service within five seconds?

### Conversion

Is joining the waitlist obvious and low-friction?

### Mobile

Does the website feel designed for mobile rather than merely responsive?

### Performance

Are assets and application behavior optimized?

### Security

Are credentials, database access, and admin areas protected?

### Analytics

Can acquisition and conversion be measured accurately?

### SEO

Are the essential technical and content fundamentals implemented?

### Extensibility

Can commerce be added later without rebuilding the website?

Review the final experience from the perspective of a customer encountering the brand for the first time.

---

## 31. Development Approach

Before writing large amounts of code:

1. Read this specification completely.
2. Inspect the existing repository.
3. Review the logo and all supplied imagery.
4. Define the information architecture.
5. Define the component architecture.
6. Define the database schema.
7. Define the design tokens.
8. Define analytics events.
9. Identify missing business information.
10. Flag assumptions instead of inventing details.

Then continue through:

**Design → Implementation → Database → Integration → Responsive testing → QA → Documentation**

Do not stop after scaffolding the application.

---

## 32. Phase 1 Definition of Done

Phase 1 is complete when the project includes:

- Production-quality Miswak Club website
- Fully responsive homepage
- Approved brand identity applied consistently
- Supplied product imagery implemented
- Working waitlist with database persistence
- Duplicate handling
- Referral tracking architecture
- UTM attribution
- Confirmation state
- Email confirmation architecture
- Protected admin dashboard
- Waitlist analytics and CSV export
- GA4 and event-tracking architecture
- SEO fundamentals
- Legal routes with clearly marked temporary content
- Robust loading, error, and empty states
- Mobile optimization
- Accessibility and security fundamentals
- Vercel deployment configuration
- Supabase configuration
- `.env.example`
- Database migrations
- Comprehensive README
- Phase 2 e-commerce architecture recommendations

---

## 33. Important Implementation Rules

Do not:

- Build unnecessary Phase 2 functionality
- Invent pricing, policies, reviews, subscribers, certifications, sourcing, claims, coverage, contacts, or social profiles
- Publish unfinished legal copy as final
- Add unnecessary dependencies or backend services
- Hardcode or expose secrets
- Expose Supabase service credentials
- Use generic stock photography when approved assets exist
- Change approved branding without instruction

When information is unknown, make it configurable and clearly flag it for the owner.

---

## 34. Final Product Principle

At every design and engineering decision, return to:

# Tradition × Nature × Convenience × Modern Lifestyle

The website should make Miswak feel like a desirable modern daily ritual without stripping away its authenticity.

- If something feels too traditional, simplify it.
- If it feels too clinical, warm it up.
- If it feels too luxurious, make it more natural.
- If it feels generic, restore the distinctive Miswak Club identity.
- If it adds complexity without improving the customer experience, remove it.

The finished website should make a first-time visitor immediately think:

**This is a modern, premium, and convenient way to get fresh Miswak.**

The obvious next action should be:

# JOIN THE CLUB

---

## Suggested Repository Structure

```text
/docs
  MISWAK_CLUB_MASTER_BRIEF.md

/assets
  /brand
  /product

README.md
```

Place approved logo assets in `/assets/brand` and approved product imagery in `/assets/product`. Treat those files as the initial approved visual references.

## Short Instruction to Send Devin

```text
Read docs/MISWAK_CLUB_MASTER_BRIEF.md completely before beginning development. Treat it as the primary product and design specification for the project. Review all assets inside /assets/brand and /assets/product. Build Phase 1 according to the specification, and do not implement Phase 2 features unless explicitly required to support future extensibility. Flag missing business information and assumptions instead of inventing details.
```
