import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { existsSync } from "fs";
import { join } from "path";
import {
  getPostBySlug,
  getRelatedPosts,
  listPostSlugs,
} from "@/lib/blog/repository";
import { formatPostDate } from "@/lib/blog/format";
import { getTourBySlug } from "@/lib/catalog/repository";
import { getCategory } from "@/lib/blog/categories";
import { getWearImages } from "@/lib/wear-gallery";
import { WearGallery } from "@/components/blog/wear-gallery";
import { OutfitCards } from "@/components/blog/outfit-cards";
import { DesertCampStory } from "@/components/blog/desert-camp-story";
import { SandboardingStory } from "@/components/blog/sandboarding-story";
import { LoopVideo } from "@/components/ui/loop-video";
import { ShareButtons } from "@/components/blog/share-buttons";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/ui/back-button";
import { whatsappUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listPostSlugs().map((slug) => ({ slug }));
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafarii.com";

/** Serialize JSON-LD safely — escapes < > & to prevent script tag breakout. */
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;
  const metaDesc = post.excerpt.slice(0, 155);
  return {
    title: post.title,
    description: metaDesc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: metaDesc,
      url: canonicalUrl,
      images: [{ url: post.cover }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const cat = getCategory(post.category);
  const relatedPosts = getRelatedPosts(post);
  const WA = whatsappUrl(`Hi! I'm interested in booking a tour after reading: ${post.title}`);

  // Resolve related tours
  const relatedTourDetails = post.relatedTours
    ? await Promise.all(post.relatedTours.map((s) => getTourBySlug(s)))
    : [];
  const validTours = relatedTourDetails.filter(Boolean);

  const pageUrl = `${SITE_URL}/blog/${slug}`;

  // Check for an optional blog video (e.g. blog-morning-vs-evening-desert-safari.mp4)
  const videoPath = join(process.cwd(), "public", "Images", `blog-${slug}.mp4`);
  const hasVideo = existsSync(videoPath);
  const videoSrc = `/Images/blog-${slug}.mp4`;

  // Wear gallery (only for the what-to-wear post)
  const wearImages =
    slug === "what-to-wear-desert-safari" ? getWearImages() : [];

  // JSON-LD: BlogPosting
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover.startsWith("http") ? post.cover : `${SITE_URL}${post.cover}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "MyDubaiSafarii",
      url: SITE_URL,
    },
    url: pageUrl,
  };

  // JSON-LD: FAQPage
  const faqSchema = post.faqs && post.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
    : null;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(blogPostingSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
        />
      )}

      {/* Hero */}
      <section className="relative flex min-h-[420px] items-end bg-midnight pb-12 pt-32">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-midnight/50 to-midnight/90" />
        <Container className="relative z-10">
          <BackButton
            fallback="/blog"
            className="mb-5 border-white/30 bg-white/10 text-white/90 hover:border-palegold hover:text-white"
          />
          {cat && (
            <Badge tone="gold" className="mb-4">
              {cat.name}
            </Badge>
          )}
          <h1 className="font-heading text-3xl font-bold text-white lg:text-5xl max-w-3xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/70">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatPostDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
            {post.location && (
              <>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" aria-hidden />
                  {post.location}
                </span>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* Main content */}
      <Container className="py-12">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12">
          {/* TOC — sticky sidebar */}
          {post.toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-2xl bg-surface p-6 shadow">
                <h2 className="mb-4 font-semibold text-midnight">Table of Contents</h2>
                <nav>
                  <ul className="space-y-2">
                    {post.toc.map((item) => (
                      <li
                        key={item.id}
                        className={item.level === 3 ? "ml-4" : ""}
                      >
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-midnight/70 hover:text-orange transition-colors"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          )}

          {/* Article */}
          <div>
            {/* Optional auto video banner */}
            {hasVideo && (
              <div className="mb-8 max-w-sm mx-auto aspect-[9/16] overflow-hidden rounded-2xl shadow-lg">
                <LoopVideo src={videoSrc} className="h-full w-full" />
              </div>
            )}

            {slug === "desert-camp-bbq-dinner-and-shows" ? (
              <DesertCampStory />
            ) : slug === "sandboarding-in-the-dubai-desert" ? (
              <SandboardingStory />
            ) : (
              <article
                className="article prose max-w-[75ch]"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            )}

            {slug === "what-to-wear-desert-safari" && <OutfitCards />}

            {/* FAQs */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-midnight">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {post.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="rounded-xl border border-midnight/10 bg-surface p-5 open:shadow-sm"
                    >
                      <summary className="cursor-pointer font-semibold text-midnight">
                        {faq.q}
                      </summary>
                      <p className="mt-3 text-midnight/70">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {wearImages.length > 0 && <WearGallery images={wearImages} />}

            {/* Google Map */}
            {post.location && (
              <section className="mt-12">
                <h2 className="mb-4 text-2xl font-bold text-midnight">Location</h2>
                <div className="overflow-hidden rounded-2xl shadow">
                  <iframe
                    title={post.location}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(post.location)}&output=embed`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </section>
            )}

            {/* Related Tours */}
            {validTours.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-midnight">
                  Related Tours
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {validTours.map((tour) => (
                    tour && (
                      <Link
                        key={tour.slug}
                        href={`/tours/${tour.slug}`}
                        className="group overflow-hidden rounded-2xl bg-surface shadow hover:shadow-lg transition-shadow"
                      >
                        {tour.image ? (
                          <Image
                            src={tour.image}
                            alt={tour.name}
                            width={400}
                            height={160}
                            loading="lazy"
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          tour.gallery?.[0] && (
                            <div
                              className={`h-40 w-full ${tour.gallery[0]}`}
                              aria-hidden="true"
                            />
                          )
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-midnight group-hover:text-orange transition-colors">
                            {tour.name}
                          </h3>
                          <p className="mt-1 text-sm text-midnight/60 line-clamp-2">
                            {tour.shortDesc}
                          </p>
                          <p className="mt-2 font-semibold text-orange">
                            From AED {tour.priceAdult}
                          </p>
                        </div>
                      </Link>
                    )
                  ))}
                </div>
              </section>
            )}

            {/* Share buttons */}
            <div className="mt-10 border-t border-midnight/10 pt-8">
              <ShareButtons title={post.title} />
            </div>
          </div>
        </div>
      </Container>

      {/* Book Now CTA */}
      <section className="bg-brand-gradient py-16 text-center">
        <Container>
          <h2 className="font-heading text-3xl font-bold text-white">
            Book Your Dubai Adventure
          </h2>
          <p className="mt-3 text-white/80">
            Ready to experience Dubai? Chat with our team on WhatsApp for instant booking.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a7f40] px-8 py-3 font-semibold text-white hover:bg-[#155f30] transition-colors"
            >
              WhatsApp Us Now
            </a>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Browse All Tours
            </Link>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-sand">
          <Container>
            <h2 className="mb-8 text-2xl font-bold text-midnight">
              Related Articles
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp) => {
                const rCat = getCategory(rp.category);
                return (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow hover:shadow-lg transition-shadow"
                  >
                    <Image
                      src={rp.cover}
                      alt={rp.title}
                      width={400}
                      height={200}
                      loading="lazy"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-48 w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      {rCat && (
                        <Badge tone="neutral" className="mb-2 w-fit text-xs">
                          {rCat.name}
                        </Badge>
                      )}
                      <h3 className="font-semibold text-midnight group-hover:text-orange transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-midnight/60 line-clamp-3">
                        {rp.excerpt}
                      </p>
                      <p className="mt-3 text-xs text-midnight/40">
                        {rp.author} · {formatPostDate(rp.date)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
