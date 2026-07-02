# MyDubaiSafarii — Engineering Build Plan

> SCOPE CHANGE (2026-06): Reduced to a static tourism website with WhatsApp-based booking. Backend (Supabase/Prisma), payments, auth, and admin are REMOVED from scope. Sections below referring to them are historical.

> Derived from **SRS v1.0 (June 2026)**. This document sequences the SRS into a buildable,
> dependency-ordered plan: architecture decisions, data model, module breakdown, MVP cut,
> and milestones. It is the engineering counterpart to the SRS, not a replacement for it.

---

## 0. How to read this plan

- **§1 Architecture decisions** resolves ambiguities the SRS leaves open (e.g. "Express _or_ Next API routes"). Settle these before writing code.
- **§2 Build sequence** is the critical path — strict dependency order. Don't start a layer before its prerequisites exist.
- **§3 Data model** is the schema spine everything else hangs off.
- **§4 Module backlog** is the full task breakdown, grouped by feature area, tagged MVP / v1 / v1.5 / v2.
- **§5 Milestones** maps the backlog onto the SRS's 7 phases / 9–12 week timeline.
- **§6 Open decisions** are the things needing a human call before or during the build.

---

## 1. Architecture decisions (resolve these first)

The SRS lists options in several places. Recommended resolutions:

| #   | Topic                  | SRS says                              | Decision / recommendation                                                                                                                                       | Why                                                                                                         |
| --- | ---------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| A1  | App framework          | Next.js 14+                           | **Next.js App Router** (RSC + Server Actions + Route Handlers)                                                                                                  | SSR/SSG for SEO (§5.7), single deploy target (Vercel)                                                       |
| A2  | Backend                | "Node/Express **or** Next API routes" | **Next.js Route Handlers + Server Actions** — no separate Express service                                                                                       | One codebase, less infra, scales statelessly on Vercel (§5.5)                                               |
| A3  | ORM vs Supabase client | Both listed                           | **Prisma for schema/migrations + server-side data access; Supabase for Auth, Storage, Realtime**                                                                | Type-safe schema + clean migrations; Supabase owns identity. See A4.                                        |
| A4  | Authorization          | RLS implied + RBAC (§5.3)             | **App-layer RBAC as primary** (all DB access server-side via Prisma w/ pooled connection); **RLS as defense-in-depth** on tables exposed to the Supabase client | Avoids Prisma-vs-RLS friction while keeping a second guard rail                                             |
| A5  | State management       | "Zustand **or** Redux Toolkit"        | **Zustand**                                                                                                                                                     | Lighter, less boilerplate; app state is modest (cart/booking draft, UI)                                     |
| A6  | i18n library           | i18next                               | **next-intl** (consider over i18next)                                                                                                                           | First-class App Router support, RTL-friendly; revisit if team prefers i18next                               |
| A7  | Payments order         | Stripe, PayPal, Telr/NI, manual       | **DEFERRED (post-MVP).** Build the booking loop payment-free behind a `PaymentProvider` seam; first real rail = Stripe, then PayPal → local → bank transfer     | Client deferring payments; MVP confirms bookings via admin/manual approval, gateways drop in without rework |
| A8  | Caching / rate-limit   | Redis                                 | **Upstash Redis** (serverless, Vercel-friendly)                                                                                                                 | Works with stateless functions; no server to manage                                                         |
| A9  | DB connection          | Supabase Postgres                     | **Supabase pooled connection (PgBouncer) for serverless** + direct URL for migrations                                                                           | Prevents connection exhaustion on Vercel                                                                    |
| A10 | Forms / validation     | React Hook Form                       | **React Hook Form + Zod** (shared client/server schemas)                                                                                                        | One validation source for forms, Server Actions, and API                                                    |

**Monorepo?** Not needed for v1 — a single Next.js app. Revisit when native apps (v2) arrive.

---

## 2. Build sequence (critical path)

Strict dependency order. Each layer assumes the ones above it exist.

```
0. Foundation        repo, Next.js, TS, Tailwind, env, CI, Prisma, Supabase project
1. Design system     tokens (color/type), base UI components, layout shell, global nav/footer
2. Auth & RBAC       Supabase auth, profiles, roles, route guards, middleware
3. Tour catalog      schema + admin CRUD + public listing + detail page
4. Search & discovery filters, sort, autosuggest, map view, "recently viewed"
5. Availability      calendar, time slots, capacity model
6. Booking flow      multi-step draft → price engine → review → SUBMIT (no payment)
7. Payments          [DEFERRED] PaymentProvider seam now; Stripe checkout+webhooks later
8. Confirmations     PDF invoice, QR, email (SendGrid), .ics  (WhatsApp/SMS later)
                     ↳ MVP trigger = booking PENDING→CONFIRMED via admin/manual approval
9. Customer dashboard bookings, status timeline, downloads, profile
10. Reviews          submit + moderation + display
11. Admin dashboard  KPIs, bookings ops, customers, coupons, reviews moderation, reports
12. Coupons engine   discount rules (feeds booking price engine — can land alongside 6/7)
13. CMS / Blog       posts, SEO metadata, comments moderation
14. i18n + currency  locale routing, RTL (Arabic), currency conversion + display
15. AI features      trip assistant, recommendations, smart search, itinerary/budget
16. Notifications     WhatsApp Business API, SMS (Twilio), web push, marketing email
17. Hardening        perf budgets, a11y (WCAG AA), SEO, security pass, load test
18. Deploy           Vercel, Cloudflare DNS/WAF, Sentry, GA4, sitemap, monitoring
```

**Parallelization** (matches SRS §8): once §0–2 are done, **design (1) + frontend (3,4,6,9) + backend (5,8,12)** can run concurrently. Payments (7) is deferred and re-enters as its own track later. AI (15) and notifications (16) are independent and can slot in anytime after their data dependencies exist.

---

## 3. Data model (schema spine)

Core entities. `auth.users` is owned by Supabase Auth; everything else lives in `public` and is managed by Prisma.

```
profiles            user_id(FK auth.users) · full_name · phone · nationality · avatar_url
                    · role(enum) · marketing_opt_in · created_at
                      role: GUEST | CUSTOMER | AGENT | SUPPORT | ADMIN | SUPER_ADMIN  (§3.2 matrix)

tour_categories     id · slug · name · parent_id(nullable, for sub-cats) · sort_order
tours               id · slug · name · category_id · status(draft|active|archived)
                    · short_desc · description · itinerary(json) · duration_minutes
                    · pickup_time · price_adult · price_child · price_infant · currency_base(AED)
                    · meeting_point · lat · lng · cancellation_policy · inclusions(json)
                    · exclusions(json) · faqs(json) · is_featured · is_bestseller
                    · rating_avg(cache) · rating_count(cache) · created_at
tour_media          id · tour_id · type(image|video) · cloudinary_id · alt · sort_order
tour_addons         id · tour_id · name(photography|food|private_vehicle|…) · price
pickup_locations    id · name · area · lat · lng
tour_availability   id · tour_id · date · time_slot(nullable) · capacity · booked_count
                    · price_override(nullable)            ← inventory source of truth (§10 risk)

bookings            id · booking_ref(unique) · user_id · tour_id · date · time_slot
                    · adults · children · infants · pickup_location_id · addons(json)
                    · subtotal · discount_total · coupon_id(nullable) · total · currency
                    · status(enum) · special_requests · created_at
                      status: PENDING|CONFIRMED|IN_PROGRESS|COMPLETED|REVIEWED
                              |CANCELLED|REFUNDED|NO_SHOW                     (§4.4.2)
booking_status_log  id · booking_id · from_status · to_status · actor_id · note · at  (audit timeline)

payments            id · booking_id · provider(stripe|paypal|telr|manual) · provider_ref
                    · amount · currency · status(requires_action|succeeded|failed)
                    · three_ds · raw(json) · created_at
refunds             id · payment_id · amount · reason · processed_by · status · created_at

coupons             id · code(unique) · type(percent|flat) · value · currency
                    · valid_from · valid_to · usage_limit · per_customer_limit
                    · min_amount · scope(global|tour|category) · scope_ref(nullable) · active
coupon_redemptions  id · coupon_id · booking_id · user_id · amount · at

reviews             id · booking_id · user_id · tour_id · rating(1-5) · body
                    · media(json) · status(pending|approved|rejected|flagged)
                    · is_verified · helpful_count · business_reply · created_at
review_votes        id · review_id · user_id · at

wishlists           id · user_id · tour_id · at
loyalty_ledger      id · user_id · delta · reason · booking_id(nullable) · at   (v1.5)
referrals           id · referrer_id · referred_id · code · status · reward_at  (v1.5)

blog_posts          id · slug · title · excerpt · body(mdx/rich) · cover_cloudinary_id
                    · author_id · status(draft|published) · seo(json) · published_at
blog_comments       id · post_id · user_id · body · status(pending|approved) · at

support_threads     id · user_id · subject · status · created_at
support_messages    id · thread_id · sender_id · body · at
notifications       id · user_id · channel(email|sms|whatsapp|push) · template · payload(json)
                    · status · sent_at
newsletter_subs     id · email · locale · status · at
audit_log           id · actor_id · action · entity · entity_id · meta(json) · at
```

**Indexing priorities** (§5.5): `tours(slug)`, `tours(category_id,status)`, `tour_availability(tour_id,date)`, `bookings(user_id)`, `bookings(status)`, `reviews(tour_id,status)`, `coupons(code)`.

**The availability table is the single inventory truth.** Every booking decrements `booked_count` inside a transaction with a capacity check to prevent overbooking — this directly mitigates the SRS §10 "inaccurate availability" risk.

---

## 4. Module backlog (tagged by release)

Tags: **[MVP]** launch-blocking minimal loop · **[v1]** SRS v1 launch scope · **[v1.5]** fast-follow · **[v2]** deferred per SRS.

### 4.1 Foundation & DevX

- [MVP] Next.js 14 App Router + TypeScript strict + Tailwind + ESLint/Prettier
- [MVP] Supabase project (Postgres, Auth, Storage); Prisma schema + first migration
- [MVP] Env management (`.env`, Vercel/Supabase secrets), typed env validation (Zod)
- [MVP] CI: GitHub Actions — typecheck, lint, test, build (§5.6)
- [v1] Unit/integration test harness (Vitest + Testing Library); Playwright e2e for booking
- [v1] Sentry wiring; structured logging

### 4.2 Design system (§7)

- [MVP] Design tokens: palette (Midnight #0A0A0A, Navy #0B1E3F, Sand Gold #C9A961, Desert Orange #E07A2C, surfaces), type scale (12→64), Poppins/Sora + Inter
- [MVP] Core components: Button (incl. magnetic CTA), Input, Select, Card, Badge, Modal, Tabs, Toast, Skeleton, Rating stars, Price block
- [MVP] Layout shell: sticky transparent→solid navbar w/ mega-menu, footer, mobile bottom nav + drawer
- [v1] Motion: Framer Motion page transitions, GSAP ScrollTrigger parallax, hover-lift, custom cursor
- [v1] Cookie consent banner, language/currency switchers (UI shell)
- [v1] Optional Three.js hero scene (flagged — perf budget gate)

### 4.3 Auth & accounts (§4.1, §5.3)

- [MVP] Email+password register w/ email verification; login; password reset (30-min link)
- [MVP] Google social login (OAuth) ; profile creation hook → `profiles`
- [MVP] Route guards + middleware (RBAC by role); session via JWT w/ refresh rotation
- [v1] Facebook + Apple login
- [v1] Optional 2FA (TOTP); account lockout after 5 fails + CAPTCHA; rate-limited auth endpoints
- [v1] Profile management: edit info, avatar upload (Cloudinary), change password, comms prefs
- [v1] GDPR: data export + delete account / right-to-be-forgotten
- [v1] Booking history view; invoice PDF download; wishlist management

### 4.4 Tour catalog (§4.2)

- [MVP] Tour schema + categories seeded (Desert Safari, Adventure, City, Abu Dhabi, Yacht/Dhow, Transfers, Attraction tickets)
- [MVP] Public listing page: grid, tour cards (image, name, rating, price, duration), pagination
- [MVP] Tour detail: gallery+lightbox, tabs (Overview/Itinerary/Inclusions/Reviews/FAQ), sticky booking sidebar, embedded map, price block
- [v1] Map view toggle, grid/map switch, quick-view modal, related tours, empty states
- [v1] Recently viewed, Trending/Best Sellers sections

### 4.5 Search & discovery (§4.3)

- [MVP] Filter by category, price, date, duration, rating, group size; sort
- [v1] Global search bar w/ autosuggest; interactive map-based search
- [v1.5] AI "Recommended for You" (depends on §4.13)

### 4.6 Availability + booking flow (§4.4)

- [MVP] Availability calendar (live capacity) + time-slot selection
- [MVP] Multi-step booking: date → slot → pax (adult/child/infant) → pickup → add-ons → details → special requests → promo → review → **submit (creates PENDING booking, no payment)**
- [MVP] Price engine: pax × tiered price + add-ons − coupon, currency-aware; sticky live summary
- [MVP] Transactional capacity check (no overbooking)
- [MVP] `PaymentProvider` interface stubbed with a `ManualProvider` (booking goes PENDING; confirmed by admin) — keeps the seam for Stripe later
- [v1] Booking draft persistence (resume abandoned), progress indicator, T&C acceptance

### 4.7 Payments (§4.5) — DEFERRED (post-MVP, per client)

- [MVP] Booking state machine + `PaymentProvider` seam only (see §4.6); MVP confirms via admin/manual approval — **no live gateway**
- [later] Stripe: client-side tokenization, PaymentIntent, 3DS/SCA, webhook → auto-confirm booking
- [later] PayPal; refunds via admin w/ audit trail
- [later] Local UAE gateway (Telr / Network International) for AED; bank transfer (manual, B2B)

### 4.8 Confirmation & docs (§4.6)

- [MVP] Fires on booking **CONFIRMED** (admin/manual approval today; payment webhook later): unique booking ID, branded PDF invoice, QR code, confirmation email (SendGrid), `.ics` calendar invite
- [v1] WhatsApp Business API confirmation; optional SMS (Twilio)

### 4.9 Customer dashboard (§4.7)

- [MVP] Upcoming/past trips, booking detail w/ status timeline, download ticket+invoice
- [v1] Reschedule / cancel / refund request; direct support messaging; wishlist; settings
- [v1.5] Loyalty points + referral status

### 4.10 Reviews (§4.8)

- [v1] Submit rating+text, photo/video upload, verified-booking badge, moderation queue, business reply, helpful votes

### 4.11 Admin dashboard (§4.11)

- [MVP] Tour management CRUD (create/edit/archive/duplicate, media, inline pricing), availability calendar mgmt
- [MVP] Booking management: view/search/filter, approve/cancel/refund, daily manifest
- [v1] Overview KPIs + quick actions; customer management; coupons UI; reviews moderation
- [v1] CSV import/export (tours, bookings); reassign bookings to ops
- [v1] Analytics & reports: revenue trends, booking volume/seasonality, conversion funnel, traffic sources, top tours, demographics, custom date-range export

### 4.12 Coupons & promotions (§4.11.5)

- [v1] Percent/flat, time-limited, usage + per-customer limits, tour/global scope (feeds §4.6 price engine)
- [v1.5] Referral & loyalty codes

### 4.13 AI features (§4.12)

- [v1] AI Trip Assistant chat (OpenAI) for recommendations + FAQ
- [v1] Personalized recommendations (browsing/booking history)
- [v1] Smart (semantic) search; Smart Itinerary Generator; Budget Planner

### 4.14 Content / Blog (§4.10)

- [v1] Blog: posts w/ SEO-friendly slugs + structured metadata, comments moderation; ~12 starter articles
- [v1] Contact & support: form w/ topics, live chat widget, click-to-WhatsApp/call, FAQ knowledge base

### 4.15 i18n, currency, RTL (§5.4)

- [v1] Locale routing EN/AR/RU/HI/FR; RTL layout for Arabic; multi-currency display AED/USD/EUR/GBP/INR (FX source + caching)

### 4.16 Notifications (§4.13)

- [v1] Email (transactional + newsletter), SMS (OTP/reminders), WhatsApp (confirm/support), web push (offers, abandoned-booking nudge)

### 4.17 Cross-cutting hardening (§5)

- [v1] Perf budgets: LCP ≤2.0s, TTI ≤3.5s, API p95 ≤500ms; image optimization + lazy load; CDN
- [v1] A11y: WCAG 2.1 AA, keyboard nav, ARIA, 44px touch targets, high-contrast
- [v1] SEO: SSR, Schema.org (tours/reviews/breadcrumbs), OG/Twitter, sitemap, robots, canonicals; Lighthouse ≥90/95
- [v1] Security: HSTS, TLS1.3, bcrypt cost≥12, OWASP Top 10, dep scanning, rate limiting, encryption at rest
- [v1] Compliance: cookie consent, privacy/cookie pages, GDPR export/delete

### 4.18 Deferred (v2 per SRS §1.2)

- Native iOS/Android apps · Hotel & flight booking · Multi-vendor marketplace · Offline POS/kiosk

---

## 5. Milestones (mapped to SRS §8 phases)

| Phase (SRS)                                    | Milestone                                      | Backlog covered              | Exit criteria                                                                                                            |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **1. Discovery** (1 wk)                        | Decisions locked, data model frozen            | §1, §3, §6 open decisions    | This plan signed off; brand assets + tour data received                                                                  |
| **2. UI/UX Design** (2–3 wk)                   | Design system + key page mockups               | §4.2                         | Tokens + components + prototypes approved                                                                                |
| **3+4. Frontend + Backend** (3–4 wk, parallel) | **MVP booking loop end-to-end (payment-free)** | all **[MVP]** tags §4.1–4.11 | Guest can browse → book (submit, PENDING) → admin confirms → customer gets confirmation; admin can manage tours+bookings |
| (continued)                                    | **v1 feature-complete**                        | all **[v1]** tags            | Reviews, coupons, admin analytics, blog, AI, i18n, notifications live                                                    |
| **Payments track** (slots in when ready)       | Live gateways                                  | §4.7 `[later]`               | Stripe (then PayPal/local) drops into the `PaymentProvider` seam; auto-confirm replaces manual approval                  |
| **5. Integration & Test** (1–2 wk)             | QA + UAT                                       | §4.17                        | Lighthouse ≥90 (Perf/A11y/BP/SEO), 0 critical/high bugs; payment e2e gated to the payments track                         |
| **6. Deploy** (3–5 d)                          | Production launch                              | §4.18 deploy items           | Vercel + Cloudflare + Sentry + GA4 + sitemap live; DNS/SSL/HSTS verified                                                 |
| **7. Post-launch** (ongoing)                   | Maintenance + v1.5                             | §4 v1.5 tags                 | Loyalty/referral, local gateway, fast-follows                                                                            |

**Recommended first vertical slice (proof of life):** Foundation → design tokens → one seeded tour → tour detail page → single-step booking → submit (PENDING) → admin confirm → confirmation email. This exercises every layer thinly and de-risks the integration points early — and stays payment-free.

---

## 6. Open decisions / inputs needed before/early in build

These block or shape the build and need a human call (most map to SRS §2.4 dependencies):

1. **i18n library** — next-intl (recommended for App Router) vs i18next (SRS). → §1 A6
2. **Currency** — store all prices in AED base + convert for display, or store per-currency? FX source (manual rates vs API)? → §3, §4.15
3. **Auth provider scope** — Supabase Auth covers email + Google/Facebook/Apple; confirm Apple developer account availability.
4. ~~**Payment accounts**~~ — **DEFERRED by client.** Revisit when the payments track starts; merchant-account verification has long lead time, so flag it before that track, not now.
5. **WhatsApp Business API** — access/approval timeline (SRS assumes available before launch; long lead time — start now).
6. **Tour data shape** — structured import format (CSV columns) for initial inventory + pricing.
7. **Is full multi-language launch-blocking?** SRS §1.3 goal #5 says live at launch, but it's the single largest scope item. Confirm EN-first launch is _not_ acceptable, or descope to EN+AR at launch.
8. **Three.js hero** — keep (cinematic) or cut (perf/LCP budget)? Recommend gating behind the LCP ≤2.0s budget.
9. **Brand assets** — logo, photography, video delivery date (gates design phase).
10. **Cloudinary plan** — storage/transformation limits (SRS §2.5 constraint).

---

## 7. Top risks carried from SRS §10 (engineering view)

- **Overbooking / stale availability** → transactional capacity decrement (§3); mandatory availability sync; no client-trusted inventory.
- **Payment gateway approval lead time** → mitigated by _deferring_ payments: booking loop ships payment-free behind the `PaymentProvider` seam, so the launch isn't blocked on merchant-account approval. Apply for accounts before the payments track starts.
- **Scope creep** → MVP loop is the contract; everything else is tagged and sequenced — change-requests re-tag, not re-plan.
- **Multi-language cost** → biggest hidden cost; decide #7 above before committing the timeline.
- **Third-party outages** (OpenAI, WhatsApp, maps) → graceful fallbacks; AI/notifications are non-blocking to the booking loop by design.

---

_Generated as the engineering plan for SRS v1.0. Update alongside any SRS revision (record in Document Control)._
