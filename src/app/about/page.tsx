import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  BadgeCheck,
  MessageCircle,
  ShieldCheck,
  Clock,
  Map,
  Eye,
  Target,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site";

import { Reveal } from "@/components/about/reveal";
import { TiltCard } from "@/components/about/tilt-card";
import { Counter } from "@/components/about/counter";
import { ParallaxHero } from "@/components/about/parallax-hero";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafarii.com";

export const metadata: Metadata = {
  title: "About Us",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About MyDubaiSafarii",
    description:
      "Learn about MyDubaiSafarii — a Dubai-based desert safari company founded by lifelong desert lovers, offering authentic Bedouin experiences and thrilling adventures.",
    url: `${SITE_URL}/about`,
  },
};

const whyCards = [
  {
    icon: Users,
    title: "Expert Local Guides",
    desc: "Born-and-bred Dubai locals who know every dune, trail, and desert secret.",
  },
  {
    icon: BadgeCheck,
    title: "Best Price Guarantee",
    desc: "Found it cheaper? We'll match it — no questions, no hassle.",
  },
  {
    icon: MessageCircle,
    title: "Instant WhatsApp Booking",
    desc: "Confirm your safari in under 2 minutes — straight from your phone.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    desc: "Fully insured vehicles, certified drivers, and pre-trip safety checks every time.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Day or night, our team is one message away for any travel need.",
  },
  {
    icon: Map,
    title: "Tailored Itineraries",
    desc: "Solo, family, corporate — we craft each journey around you.",
  },
];

const trustedPlatforms = [
  "TripAdvisor",
  "Google Reviews",
  "Instagram",
  "Viator",
  "GetYourGuide",
  "Klook",
];

export default function AboutPage() {
  return (
    <main>
      {/* 1 ─ Parallax Hero */}
      <ParallaxHero />

      {/* 2 ─ Our Story */}
      <section className="bg-surface py-14 sm:py-24">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left: text */}
            <div>
              <Reveal>
                <Badge tone="gold" className="mb-4">
                  Our Story
                </Badge>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="font-heading text-3xl font-bold text-midnight sm:text-h2">
                  A Passion for the Desert,{" "}
                  <span className="text-orange">Born in Dubai</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 leading-relaxed text-navy/80">
                  MyDubaiSafarii was founded by a team of lifelong desert lovers who grew
                  tired of seeing visitors experience Dubai through the same rehearsed
                  script. We set out to change that — to offer journeys as wild, warm, and
                  genuine as the Emirate itself.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-4 leading-relaxed text-navy/80">
                  Every safari we run is rooted in authentic Bedouin hospitality: generous
                  service, time-honoured traditions, and an obsession with safety that lets
                  you relax and soak in every golden moment.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <p className="mt-4 leading-relaxed text-navy/80">
                  From heart-pounding dune bashing and camel rides at twilight to overnight
                  desert camping and starlit BBQ evenings, our experiences are designed
                  to become the highlight of your entire trip.
                </p>
              </Reveal>
            </div>

            {/* Right: TiltCard with image */}
            <Reveal delay={200}>
              <TiltCard className="rounded-3xl">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Images/sand.jpg"
                    alt="Dubai desert dunes at golden hour"
                    className="h-[480px] w-full object-cover object-center"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-midnight/70 via-transparent to-transparent" />

                  {/* Floating stat badge */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-surface/90 px-5 py-3 shadow-xl backdrop-blur-sm">
                    <span className="text-3xl font-bold text-gold font-heading">4.9</span>
                    <div>
                      <div className="flex gap-0.5 text-gold text-sm">★★★★★</div>
                      <p className="text-xs text-midnight/70 font-body">1 200+ verified reviews</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2b ─ Vision & Mission */}
      <section className="bg-sand py-14 sm:py-20">
        <Container>
          <Reveal className="mb-12 text-center">
            <Badge tone="gold" className="mb-4">
              Our Purpose
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-midnight sm:text-h2">
              Driven by Passion, Guided by Purpose
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Vision */}
              <TiltCard className="h-full rounded-2xl">
                <div className="flex h-full flex-col gap-5 rounded-2xl bg-surface p-8 shadow-md ring-1 ring-dune/20 transition-shadow hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient shadow-md">
                    <Eye className="h-6 w-6 text-surface" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-midnight">
                    Our Vision
                  </h3>
                  <p className="leading-relaxed text-navy/75">
                    To become Dubai&apos;s most loved adventure and travel company — inspiring
                    travellers from every corner of the world to discover the magic, beauty,
                    and culture of the Emirates.
                  </p>
                </div>
              </TiltCard>

              {/* Mission */}
              <TiltCard className="h-full rounded-2xl">
                <div className="flex h-full flex-col gap-5 rounded-2xl bg-surface p-8 shadow-md ring-1 ring-dune/20 transition-shadow hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient shadow-md">
                    <Target className="h-6 w-6 text-surface" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-midnight">
                    Our Mission
                  </h3>
                  <p className="leading-relaxed text-navy/75">
                    To craft safe, thrilling, and genuinely meaningful desert journeys
                    across Dubai&apos;s golden dunes, ancient Bedouin trails, and starlit
                    sands — delivered with the warmth of true Arabian hospitality.
                  </p>
                </div>
              </TiltCard>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3 ─ Stats band */}
      <section className="bg-midnight py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-12 text-center lg:grid-cols-4">
            {[
              { value: 500, suffix: "+", decimals: 0, label: "Happy Guests" },
              { value: 6, suffix: "+", decimals: 0, label: "Signature Experiences" },
              { value: 4.9, suffix: "★", decimals: 1, label: "Average Rating" },
              { value: 100, suffix: "%", decimals: 0, label: "Verified Reviews" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div>
                  <p className="font-heading text-4xl font-extrabold text-palegold sm:text-display">
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </p>
                  <p className="mt-2 font-body text-sm font-medium uppercase tracking-widest text-dune/70">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3b ─ Trusted By strip */}
      <section className="bg-surface py-12">
        <Container>
          <Reveal className="text-center">
            <p className="mb-6 font-heading text-base font-semibold uppercase tracking-widest text-midnight/50">
              Trusted by travellers across the globe
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {trustedPlatforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-midnight/10 bg-sand px-5 py-2 font-heading font-semibold text-midnight/70"
                >
                  {platform}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 4 ─ Why Choose Us */}
      <section className="bg-sand py-14 sm:py-24">
        <Container>
          <Reveal className="mb-14 text-center">
            <Badge tone="orange" className="mb-4">
              Why Choose Us
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-midnight sm:text-h2">
              The MyDubaiSafarii Difference
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-navy/80">
              Six reasons thousands of travellers choose us year after year.
            </p>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <TiltCard className="h-full rounded-2xl">
                  <div className="flex h-full flex-col gap-4 rounded-2xl bg-surface p-8 shadow-md ring-1 ring-dune/20 transition-shadow hover:shadow-xl">
                    {/* Icon circle */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient shadow-md">
                      <card.icon className="h-6 w-6 text-surface" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-midnight">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-navy/75">{card.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4b ─ Meet the Team / Founder's Note */}
      <section className="bg-sand py-14 sm:py-20">
        <Container>
          <Reveal className="mb-12 text-center">
            <Badge tone="gold" className="mb-4">
              Our People
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-midnight sm:text-h2">
              The People Behind Your Adventure
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-col items-center rounded-2xl bg-surface p-8 text-center shadow-md ring-1 ring-dune/20 sm:p-10">
                {/* Team avatar */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient shadow-lg">
                  <span className="font-heading text-xl font-bold text-surface">MDS</span>
                </div>

                {/* Quote */}
                <blockquote className="text-lg leading-relaxed text-navy/80 sm:text-xl">
                  &ldquo;Dubai isn&apos;t just where we work — it&apos;s our home, and the
                  desert is our playground. Every safari and adventure we run is built on
                  one promise: to treat every guest like family and make their desert
                  story unforgettable.&rdquo;
                </blockquote>

                {/* Signature */}
                <p className="mt-6 font-heading font-semibold text-midnight">
                  — The MyDubaiSafarii Team
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 5 ─ CTA band */}
      <section className="bg-brand-gradient py-14 sm:py-24">
        <Container>
          <Reveal className="flex flex-col items-center text-center">
            <h2 className="font-heading text-4xl font-extrabold text-surface max-w-2xl leading-tight sm:text-h1">
              Ready to write your Dubai story?
            </h2>
            <p className="mt-5 max-w-xl text-lg text-palegold/90">
              Book in seconds — no long forms, no waiting. Just you, the desert, and us.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <a
                href={whatsappUrl("Hi! I want to book a Dubai safari.")}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "bg-[#1a7f40] text-white hover:bg-[#155f30] shadow-lg"
                )}
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/tours"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-surface/60 text-surface hover:bg-surface/10"
                )}
              >
                Explore Tours
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
