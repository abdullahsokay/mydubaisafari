# MyDubaiSafari

Marketing and booking website for **MyDubaiSafari**, a Dubai desert safari tour operator. Guests browse safari packages, compare experiences, read travel guides, and book instantly over WhatsApp — no checkout friction, confirmed in minutes.

🔗 **Live:** [mydubaisafari.com](https://mydubaisafari.com)

## Features

- **Tour catalogue** — evening, morning, private, VIP and overnight camp safaris, grouped by category with a comparison table
- **WhatsApp booking** — a detailed booking form that generates a formatted enquiry (dates, guests, pickup, add-ons, price) and opens WhatsApp pre-filled
- **Adventure add-ons** — quad bikes and dune buggies with live price calculation
- **Travel blog** — SEO-optimised guides with auto table-of-contents, FAQs, author bios and internal linking
- **Guest reviews** with aggregate ratings
- **Rich SEO** — JSON-LD structured data (LocalBusiness, Product, Breadcrumb, FAQ, Article), dynamic sitemap, canonical URLs, Open Graph
- **Performance-first** — AVIF/WebP images, blur placeholders, lazy-loaded and re-encoded video, self-hosted fonts; sub-second LCP
- **Google Analytics 4** and Search Console ready (env-driven)

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- `sharp` for image processing · `marked` + `gray-matter` for the markdown blog
- Deployed on [Vercel](https://vercel.com)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript check (no emit) |
| `npm run blurmap` | Regenerate image blur placeholders |

## Environment Variables

Set these in your deployment environment (e.g. Vercel):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin (e.g. `https://mydubaisafari.com`) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag token (optional) |

## Project Structure

```
src/
  app/              App Router pages (home, tours, blog, booking, policies)
  components/       UI, layout, tours, blog, booking, SEO components
  content/blog/     Markdown blog posts (frontmatter + body)
  lib/              Catalog, blog, SEO schema and site config
public/Images/      Tour, blog and gallery media
scripts/            Build utilities (blur-map generator)
```

## License

Private and proprietary. All rights reserved.
