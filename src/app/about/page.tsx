import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Car,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Tent,
  Users,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site";
import { Reveal } from "@/components/about/reveal";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafarii.com";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet MyDubaiSafarii — a local Dubai crew guiding the Al Habab red dunes. Licensed drivers, small private groups, handpicked camps and WhatsApp-direct booking.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About MyDubaiSafarii",
    description:
      "Meet MyDubaiSafarii — a local Dubai crew guiding the Al Habab red dunes. Licensed drivers, small private groups, handpicked camps and WhatsApp-direct booking.",
    url: `${SITE_URL}/about`,
  },
};

/* ── Content ─────────────────────────────────────────────────────── */

const heroChips = [
  { icon: MapPin, label: "Al Habab red dunes" },
  { icon: ShieldCheck, label: "Licensed & insured" },
  { icon: MessageCircle, label: "WhatsApp-direct" },
];

const stats = [
  { value: "10k+", label: "Happy Guests" },
  { value: "4.9★", label: "Average Rating" },
  { value: "8", label: "Curated Packages" },
  { value: "24/7", label: "WhatsApp Support" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Licensed & insured drivers",
    desc: "Certified dune drivers in fully insured 4x4s — tyre pressures set, gear checked, and a proper safety briefing before the first descent.",
  },
  {
    icon: Users,
    title: "Small private groups",
    desc: "Your own vehicle and your own pace. No mega-convoys, no strangers squeezed onto your bench seat.",
  },
  {
    icon: Tent,
    title: "Handpicked desert camps",
    desc: "We only use camps we would bring our own families to — live fire, proper coffee, clean facilities and honest food.",
  },
  {
    icon: MessageCircle,
    title: "Instant WhatsApp confirmation",
    desc: "A human replies in minutes with times, prices and a confirmed pickup. No forms, no waiting on email.",
  },
  {
    icon: BadgeCheck,
    title: "Best-price promise",
    desc: "Found the same package for less? Send us the quote on WhatsApp and we will match it. Simple.",
  },
  {
    icon: Car,
    title: "Hotel pickup across Dubai",
    desc: "Door-to-door from any hotel, apartment or cruise terminal in Dubai — you just wait in the lobby.",
  },
];

const steps = [
  {
    title: "Choose your package",
    desc: "Browse our curated experiences — evening safaris, overnight camps, private charters — and pick the one that fits your crew.",
  },
  {
    title: "WhatsApp us",
    desc: "Tap the green button and tell us your date, hotel and group size. A real person replies in minutes, any hour.",
  },
  {
    title: "We confirm & pick you up",
    desc: "You get your pickup time and driver details on the spot. On the day, your 4x4 is waiting at the lobby.",
  },
];

const postcards = [
  {
    src: "/Images/desert-safari/641262509_18065993909654255_583259857927294763_n.jpg",
    alt: "Close portrait of a smiling guest wearing a traditional embroidered headscarf",
    kicker: "Hospitality",
    caption: "Welcomed like family",
  },
  {
    src: "/Images/desert-safari/723144659_18080327912654255_7038926133804453364_n.jpg",
    alt: "Guest walking beside camels through golden late-afternoon light on the dunes",
    kicker: "Golden hour",
    caption: "Walking with the caravan",
  },
  {
    src: "/Images/desert-safari/728003758_18080992646654255_7810894865877275181_n.jpg",
    alt: "Guest in a black and gold abaya standing before a blazing orange desert sunset",
    kicker: "Sunset",
    caption: "Dressed for the dunes",
  },
];

/* ── Page ────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main>
      {/* 1 ─ Hero */}
      <section className="relative overflow-hidden bg-midnight text-surface">
        {/* Sunrise + ember glows grounding the dark hero */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_12%_0%,rgba(250,231,172,0.12),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_88%_100%,rgba(164,91,47,0.3),transparent_70%)]" />

        <Container className="relative grid items-center gap-12 pt-28 pb-16 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
          {/* Left — copy */}
          <div>
            <Badge className="animate-rise rise-1 border border-palegold/40 bg-midnight/30 text-palegold ring-palegold/30 backdrop-blur-md">
              The team behind the dunes
            </Badge>

            <h1 className="animate-rise rise-2 mt-6 max-w-xl font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-h1">
              Born in Dubai.{" "}
              <span className="bg-linear-to-r from-palegold via-dune to-palegold bg-clip-text text-transparent">
                Raised on the red dunes.
              </span>
            </h1>

            <p className="animate-rise rise-3 mt-5 max-w-xl text-base leading-relaxed text-surface/80 sm:text-lg">
              We&rsquo;re the small local crew behind Dubai&rsquo;s warmest
              desert evenings — drivers, guides and camp hosts who&rsquo;ve
              spent years reading the Al Habab dunes, one WhatsApp message
              away.
            </p>

            <ul className="animate-rise rise-4 mt-8 flex flex-wrap gap-2.5">
              {heroChips.map((chip) => (
                <li
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface/10 px-3.5 py-1.5 text-xs font-medium text-surface/90 ring-1 ring-palegold/25 backdrop-blur-sm"
                >
                  <chip.icon className="size-3.5 text-palegold" aria-hidden />
                  {chip.label}
                </li>
              ))}
            </ul>

            <div className="animate-rise rise-4 mt-10 flex items-center gap-3" aria-hidden>
              <span className="h-px w-14 bg-linear-to-r from-transparent to-palegold/70" />
              <span className="h-1.5 w-1.5 rotate-45 bg-palegold" />
              <span className="h-px w-14 bg-linear-to-l from-transparent to-palegold/70" />
            </div>
          </div>

          {/* Right — signature photo plate */}
          <div className="animate-rise rise-3 relative mx-auto w-full max-w-md lg:ml-auto">
            {/* Offset gold frame echo */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-3 -right-3 hidden size-40 rounded-tr-3xl border-t border-r border-palegold/30 sm:block"
            />
            <div className="dune-media group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-luxe-lg ring-1 ring-palegold/25">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Images/desert-safari/631414459_18064862606654255_9132147263810183976_n.jpg"
                alt="Guest silhouetted against the low desert sun, throwing an arc of golden sand from a dune crest"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 z-[1] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-linear-to-t from-midnight/70 via-midnight/25 to-transparent" />
              <span
                aria-hidden
                className="pointer-events-none absolute top-4 left-4 z-[2] size-8 rounded-tl-2xl border-t border-l border-palegold/70"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 bottom-4 z-[2] size-8 rounded-br-2xl border-r border-b border-palegold/70"
              />
              <span aria-hidden className="sheen" />
              <p className="absolute bottom-4 left-4 z-[3] inline-flex items-center gap-1.5 rounded-full bg-midnight/45 px-3 py-1 text-xs font-medium text-surface ring-1 ring-palegold/30 backdrop-blur-md">
                <MapPin className="size-3.5 text-palegold" aria-hidden />
                Al Habab Desert, Dubai
              </p>
            </div>
          </div>
        </Container>

        {/* Gold hairline seam into the next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-palegold/50 to-transparent" />
      </section>

      {/* 2 ─ Our Story */}
      <section className="relative overflow-hidden bg-sand py-16 sm:py-24">
        {/* Soft sunrise wash behind the header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(217,182,133,0.25),transparent_70%)]" />

        <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div>
            <Reveal>
              <Badge tone="gold">Our Story</Badge>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-midnight sm:text-h2">
                The desert isn&rsquo;t our office.{" "}
                <span className="text-orange">It&rsquo;s our home.</span>
              </h2>
              <div
                aria-hidden
                className="mt-5 h-px w-24 bg-linear-to-r from-gold/70 to-transparent"
              />
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 leading-relaxed text-midnight/75">
                MyDubaiSafarii is a small, local outfit — drivers, guides and
                camp hosts who grew up with the desert on our doorstep.
                We&rsquo;ve spent years leading 4x4s through the Al Habab red
                dunes, and it shows in the small things: which ridge catches
                the last light, where the sand runs soft after a windy night,
                when to pause the convoy so nobody misses the sunset.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 leading-relaxed text-midnight/75">
                Our philosophy is simple: real Arabia, not a theme-park
                version of it. That means small groups instead of
                mega-convoys, camps with live fire and unhurried dinners, and
                a safety-first routine — certified drivers, checked equipment,
                clear briefings — that lets you switch off and enjoy the ride.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-4 leading-relaxed text-midnight/75">
                And no faceless booking portals. You message us on WhatsApp
                and the reply comes from the same crew that will drive you —
                so plans can change, questions get straight answers, and
                nothing is lost between you and the desert.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <figure className="mt-8 border-l-2 border-gold/70 pl-5">
                <blockquote className="font-heading text-lg text-midnight/85 italic">
                  &ldquo;If an evening in the desert is worth your holiday,
                  it&rsquo;s worth doing properly.&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-sm text-midnight/75">
                  — The MyDubaiSafarii crew
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Layered photo composition */}
          <Reveal delay={180}>
            <div className="relative mx-auto max-w-md pb-10 pl-6 sm:pl-10 lg:max-w-none">
              <div className="dune-media group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-luxe-lg ring-1 ring-palegold/25">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Images/desert-safari/640247413_18065993912654255_5399607698326251875_n.jpg"
                  alt="Guest in a traditional red headscarf resting on a red dune, safari 4x4s parked on the ridge behind"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 z-[1] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-linear-to-t from-midnight/60 via-midnight/20 to-transparent" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-4 right-4 z-[2] size-8 rounded-tr-2xl border-t border-r border-palegold/70"
                />
                <span aria-hidden className="sheen" />
                <p className="absolute right-4 bottom-4 z-[3] rounded-full bg-midnight/45 px-3 py-1 text-xs font-medium text-surface ring-1 ring-palegold/30 backdrop-blur-md">
                  Between drives &middot; Al Habab
                </p>
              </div>
              {/* Floating companion plate, matted on the sand background */}
              <div className="absolute bottom-0 left-0 w-36 overflow-hidden rounded-2xl border-4 border-sand shadow-luxe-lg sm:w-44">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Images/desert-safari/721387620_18079909151654255_5178452121857985887_n.jpg"
                  alt="Two guests posing with a camel on the red dunes"
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3 ─ Stats band */}
      <section className="relative overflow-hidden bg-midnight py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-palegold/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_100%_at_50%_100%,rgba(164,91,47,0.22),transparent_70%)]" />

        <Container className="relative">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4 lg:divide-x lg:divide-palegold/15">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90} className="px-4">
                <p className="font-heading text-4xl font-semibold text-palegold sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium tracking-[0.18em] text-surface/75 uppercase">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-palegold/40 to-transparent" />
      </section>

      {/* 4 ─ Why Ride With Us */}
      <section className="relative bg-sand py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(217,182,133,0.22),transparent_70%)]" />

        <Container className="relative">
          <Reveal className="flex flex-col items-center text-center">
            <Badge tone="orange">Why Ride With Us</Badge>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-midnight sm:text-h2">
              Six reasons the dunes feel different with us
            </h2>
            <div className="mt-4 flex items-center gap-3" aria-hidden>
              <span className="h-px w-10 bg-linear-to-r from-transparent to-gold/60" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              <span className="h-px w-10 bg-linear-to-l from-transparent to-gold/60" />
            </div>
            <p className="mt-3 max-w-xl text-midnight/75">
              Everything is set up the way we&rsquo;d want it as guests —
              checked, confirmed and honest.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 70} className="h-full">
                <div className="group relative flex h-full flex-col gap-4 rounded-2xl bg-surface p-7 shadow-luxe ring-1 ring-midnight/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe-lg">
                  {/* Gold corner tick */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-3 right-3 size-6 rounded-tr-xl border-t border-r border-palegold/50 transition-colors duration-300 group-hover:border-palegold"
                  />
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gold/15 text-goldink ring-1 ring-gold/30 transition-colors duration-300 group-hover:bg-gold/25">
                    <value.icon className="size-6" strokeWidth={1.8} aria-hidden />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-midnight">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-midnight/75">
                    {value.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5 ─ How It Works */}
      <section className="relative overflow-hidden bg-surface py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-palegold/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(250,231,172,0.2),transparent_70%)]" />

        <Container className="relative">
          <Reveal className="flex flex-col items-center text-center">
            <Badge tone="gold">Booking, Simplified</Badge>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-midnight sm:text-h2">
              From your phone to the dunes in three steps
            </h2>
            <p className="mt-3 max-w-xl text-midnight/75">
              No accounts, no checkout forms, no waiting. Just a conversation.
            </p>
          </Reveal>

          <div className="relative mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8">
            {/* Connecting line behind the numbered circles */}
            <div
              aria-hidden
              className="absolute top-7 right-[17%] left-[17%] hidden h-px bg-linear-to-r from-palegold/0 via-palegold/60 to-palegold/0 sm:block"
            />
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-[1] flex size-14 items-center justify-center rounded-full bg-gold font-heading text-xl font-semibold text-midnight shadow-[0_10px_24px_-10px_rgba(198,139,87,0.85)] ring-4 ring-gold/20">
                    {i + 1}
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-midnight">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-midnight/75">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={360} className="mt-14 text-center">
            <Link
              href="/tours"
              className={buttonVariants({ variant: "secondary", size: "md" })}
            >
              Start with step one — browse packages
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* 6 ─ Postcards photo mosaic */}
      <section className="relative overflow-hidden bg-sand pt-16 pb-24 sm:pt-20 lg:pb-32">
        <Container>
          <Reveal className="flex flex-col items-center text-center">
            <Badge tone="gold">Field Notes</Badge>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-midnight sm:text-h2">
              Postcards from the sand
            </h2>
            <p className="mt-3 max-w-xl text-midnight/75">
              Straight from our guests&rsquo; evenings on the Al Habab dunes —
              no filters needed.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {postcards.map((card, i) => (
              <div
                key={card.src}
                className={cn(i % 2 === 1 && "sm:translate-y-8")}
              >
                <Reveal delay={i * 90}>
                  <figure className="dune-media group relative h-80 overflow-hidden rounded-2xl shadow-luxe ring-1 ring-palegold/25 lg:h-96">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.src}
                      alt={card.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 z-[1] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-linear-to-t from-midnight/75 via-midnight/30 to-transparent" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-3 right-3 z-[2] size-7 rounded-tr-2xl border-t border-r border-palegold/80 transition-colors duration-300 group-hover:border-palegold"
                    />
                    <span aria-hidden className="sheen" />
                    <figcaption className="absolute inset-x-4 bottom-4 z-[3]">
                      <p className="text-[11px] font-medium tracking-[0.16em] text-palegold uppercase">
                        {card.kicker}
                      </p>
                      <p className="mt-0.5 font-heading text-sm font-semibold text-surface">
                        {card.caption}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7 ─ Final CTA band */}
      <section className="relative overflow-hidden bg-midnight py-20 text-surface sm:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-palegold/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(250,231,172,0.1),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_100%,rgba(164,91,47,0.35),transparent_70%)]" />

        <Container className="relative flex flex-col items-center text-center">
          <Reveal>
            <Badge className="border border-palegold/40 bg-midnight/30 text-palegold ring-palegold/30 backdrop-blur-md">
              Direct &middot; No middlemen
            </Badge>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-6 max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-h1">
              The dunes are waiting.{" "}
              <span className="bg-linear-to-r from-palegold via-dune to-palegold bg-clip-text text-transparent">
                Planning takes two minutes.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-5 max-w-xl text-surface/80 sm:text-lg">
              Tell us your date and hotel on WhatsApp — we&rsquo;ll suggest
              the right package, confirm your pickup and handle the rest.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <a
                href={whatsappUrl(
                  "Hi MyDubaiSafarii! I'd like to plan a desert safari — can you help me pick the right package?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "bg-[#1a7f40] text-white shadow-lg hover:bg-[#155f30]",
                )}
              >
                <MessageCircle className="size-5" aria-hidden />
                Chat on WhatsApp
              </a>
              <Link
                href="/tours"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-palegold/60 text-surface hover:border-gold hover:bg-surface/10 hover:text-surface",
                )}
              >
                Explore the tours
              </Link>
            </div>
          </Reveal>
          <Reveal delay={330}>
            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-surface/75">
              <li className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 text-palegold" aria-hidden />
                Replies in minutes, day or night
              </li>
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-palegold" aria-hidden />
                Licensed &amp; insured
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Car className="size-3.5 text-palegold" aria-hidden />
                Hotel pickup across Dubai
              </li>
            </ul>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
