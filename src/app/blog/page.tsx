import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostsByCategory } from "@/lib/blog/repository";
import { CATEGORIES, getCategory } from "@/lib/blog/categories";
import { BlogSearch } from "@/components/blog/blog-search";
import { DubaiWeather } from "@/components/blog/dubai-weather";
import { TripCostCalculator } from "@/components/blog/trip-cost-calculator";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { category } = await searchParams;

  const allPosts = getAllPosts();
  const displayedPosts = category ? getPostsByCategory(category) : allPosts;
  const featured = !category ? allPosts[0] : null;
  const gridPosts = featured
    ? displayedPosts.filter((p) => p.slug !== featured.slug)
    : displayedPosts;

  const activeCat = category ? getCategory(category) : null;
  const WA = whatsappUrl("Hi! I'd like to know more about Dubai tours.");

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[520px] items-end overflow-hidden bg-midnight pb-14 pt-32 sm:min-h-[600px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Images/blogpage.jpg"
          alt="Dubai desert dunes at sunset"
          width={1920}
          height={600}
          fetchPriority="high"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center [filter:contrast(1.12)_saturate(1.15)_brightness(1.03)]"
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

      {/* Category pills */}
      <section className="border-b border-midnight/10 bg-surface py-4">
        <Container>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                !category
                  ? "bg-midnight text-white"
                  : "bg-sand text-midnight hover:bg-gold/20",
              )}
            >
              All
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  category === cat.slug
                    ? "bg-midnight text-white"
                    : "bg-sand text-midnight hover:bg-gold/20",
                )}
              >
                {cat.emoji} {cat.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        {activeCat && (
          <h2 className="mb-8 text-2xl font-bold text-midnight">
            {activeCat.emoji} {activeCat.name}
          </h2>
        )}

        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-12 grid overflow-hidden rounded-3xl bg-surface shadow-md hover:shadow-xl transition-shadow lg:grid-cols-2"
          >
            <img
              src={featured.cover}
              alt={featured.title}
              width={800}
              height={500}
              loading="lazy"
              className="h-64 w-full object-cover lg:h-full"
            />
            <div className="flex flex-col justify-center p-8">
              {(() => {
                const cat = getCategory(featured.category);
                return cat ? (
                  <Badge tone="gold" className="mb-3 w-fit">
                    {cat.emoji} {cat.name}
                  </Badge>
                ) : null;
              })()}
              <h2 className="font-heading text-2xl font-bold text-midnight group-hover:text-orange transition-colors lg:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-midnight/75">{featured.excerpt}</p>
              <p className="mt-4 text-sm text-midnight/40">
                {featured.author} · {featured.date} · {featured.readingTime}
              </p>
              <span className="mt-6 inline-flex items-center font-semibold text-orange">
                Read article →
              </span>
            </div>
          </Link>
        )}

        {/* Grid */}
        {gridPosts.length === 0 ? (
          <p className="text-midnight/75">No articles in this category yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => {
              const cat = getCategory(post.category);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow hover:shadow-lg transition-shadow"
                >
                  <img
                    src={post.cover}
                    alt={post.title}
                    width={400}
                    height={200}
                    loading="lazy"
                    className="h-48 w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    {cat && (
                      <Badge tone="neutral" className="mb-2 w-fit text-xs">
                        {cat.emoji} {cat.name}
                      </Badge>
                    )}
                    <h3 className="font-semibold text-midnight group-hover:text-orange transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-midnight/75 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <p className="mt-3 text-xs text-midnight/40">
                      {post.author} · {post.date} · {post.readingTime}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Container>

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
