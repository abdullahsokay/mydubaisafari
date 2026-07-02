"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, getCategory } from "@/lib/blog/categories";
import type { PostMeta } from "@/lib/blog/repository";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Client-side blog index (pills + featured + grid).
 * Filtering happens in the browser via ?category= so the /blog route can be
 * fully static — all markdown is read at build time, never at request time
 * (this is what fixed the 500 on Vercel serverless).
 */
export function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;

  const displayedPosts = category
    ? posts.filter((p) => p.category === category)
    : posts;
  const featured = !category ? posts[0] : null;
  const gridPosts = featured
    ? displayedPosts.filter((p) => p.slug !== featured.slug)
    : displayedPosts;

  const activeCat = category ? getCategory(category) : null;

  return (
    <>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
    </>
  );
}
