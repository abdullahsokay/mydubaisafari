import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog/repository";
import { BlogIndex, BlogIndexView } from "@/components/blog/blog-index";
import { BlogSearch } from "@/components/blog/blog-search";
import { DubaiWeather } from "@/components/blog/dubai-weather";
import { TripCostCalculator } from "@/components/blog/trip-cost-calculator";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { whatsappUrl } from "@/lib/site";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafarii.com";

export const metadata: Metadata = {
  title: "Dubai Travel Blog",
  description:
    "Expert guides, tips, and stories about Dubai desert safaris, dune adventures, and desert travel planning from the MyDubaiSafarii team.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Dubai Travel Blog",
    description:
      "Expert guides, tips, and stories about Dubai desert safaris, dune adventures, and desert travel planning from the MyDubaiSafarii team.",
    url: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  // Read at BUILD time — this page is fully static; category filtering is
  // client-side (see <BlogIndex/>), which fixed the /blog 500 on Vercel.
  const allPosts = getAllPosts();
  const WA = whatsappUrl("Hi! I'd like to know more about Dubai tours.");

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[520px] items-end overflow-hidden bg-midnight pb-14 pt-32 sm:min-h-[600px]">
        <Image
          src="/Images/blogpage.jpg"
          alt="Dubai desert dunes at sunset"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-center [filter:contrast(1.12)_saturate(1.15)_brightness(1.03)]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-midnight via-midnight/45 to-midnight/15" />
        <div className="relative z-10 mr-auto w-full max-w-xl px-6 sm:pl-10 lg:pl-16">
          <Badge tone="gold" className="mb-4">
            Travel Blog
          </Badge>
          <h1 className="font-heading text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl">
            Dubai Travel Guides &amp; Stories
          </h1>
          <p className="mt-3 text-lg text-white/85 drop-shadow-md">
            Expert guides, insider tips, and real stories from Dubai&apos;s
            golden dunes and desert camps — curated by the MyDubaiSafarii team.
          </p>
          <div className="mt-8 max-w-md">
            <BlogSearch posts={allPosts} />
          </div>
        </div>
      </section>

      {/* Pills + featured + grid (client-side category filter). The fallback
          renders the full unfiltered index so the static HTML contains every
          post for crawlers and there is no pop-in on first paint. */}
      <Suspense fallback={<BlogIndexView posts={allPosts} />}>
        <BlogIndex posts={allPosts} />
      </Suspense>

      {/* Plan Your Trip */}
      <section className="bg-sand/50 py-14">
        <Container>
          <div className="mb-8">
            <Badge tone="gold" className="mb-3">Plan Your Trip</Badge>
            <h2 className="font-heading text-3xl font-bold text-midnight">
              Plan Your Dubai Adventure
            </h2>
            <p className="mt-2 text-midnight/75 max-w-xl">
              Check live conditions and estimate your travel budget before you go.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <DubaiWeather />
            <TripCostCalculator />
          </div>
        </Container>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-brand-gradient py-16 text-center">
        <Container>
          <h2 className="font-heading text-3xl font-bold text-white">
            Ready to Experience Dubai?
          </h2>
          <p className="mt-3 text-white/80">
            Chat with our team on WhatsApp — we&apos;ll help you plan the perfect desert adventure.
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a7f40] px-8 py-3 font-semibold text-white hover:bg-[#155f30] transition-colors"
          >
            WhatsApp Us Now
          </a>
        </Container>
      </section>
    </>
  );
}
