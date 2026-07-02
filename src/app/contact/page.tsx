import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { WhatsappIcon, InstagramIcon, FacebookIcon, TiktokIcon } from "@/components/icons/social";
import { SITE, whatsappUrl } from "@/lib/site";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafarii.com";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact MyDubaiSafarii",
    description:
      "Get in touch with MyDubaiSafarii via WhatsApp, email, or social media. We respond to booking enquiries within minutes.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  const waHref = whatsappUrl("Hi! I'd like to know more about your tours.");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;

  return (
    <div className="bg-sand pt-24 pb-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-semibold text-midnight leading-tight sm:text-h1">
            Get in touch
          </h1>
          <p className="mt-3 text-midnight/75">
            We&apos;d love to hear from you. Reach out on WhatsApp for the
            fastest response, or find us on social media.
          </p>
        </div>

        {/* Info cards: address, email, phone */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {/* Address */}
          <div className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="font-heading text-base font-semibold text-midnight">Our Location</h2>
            <p className="mt-2 text-sm text-midnight/75">{SITE.address}</p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-goldink hover:underline"
            >
              Get directions →
            </a>
          </div>

          {/* Email */}
          <div className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="font-heading text-base font-semibold text-midnight">Email Us</h2>
            <p className="mt-2 text-sm text-midnight/75">We&apos;ll get back to you within 24 hours.</p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-goldink hover:underline"
            >
              {SITE.email}
            </a>
          </div>

          {/* Phone */}
          <div className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="font-heading text-base font-semibold text-midnight">Call Us</h2>
            <p className="mt-2 text-sm text-midnight/75">Available daily for bookings and enquiries.</p>
            <a
              href={`tel:${SITE.phone}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-goldink hover:underline"
            >
              {SITE.phone}
            </a>
          </div>
        </div>

        {/* Social cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* WhatsApp */}
          <div className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#1a7f40] text-white">
              <WhatsappIcon className="size-6" />
            </div>
            <h2 className="mt-4 font-heading text-lg font-semibold text-midnight">
              WhatsApp
            </h2>
            <p className="mt-1 text-sm text-midnight/75">
              Fastest way to reach us. We typically reply within minutes.
            </p>
            <p className="mt-2 text-sm font-medium text-midnight">
              {SITE.whatsappDisplay}
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1a7f40] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#155f30]"
            >
              <WhatsappIcon className="size-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Instagram */}
          <div className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex size-12 items-center justify-center rounded-full bg-midnight text-surface">
              <InstagramIcon className="size-6" />
            </div>
            <h2 className="mt-4 font-heading text-lg font-semibold text-midnight">
              Instagram
            </h2>
            <p className="mt-1 text-sm text-midnight/75">
              See our latest tours and experiences.
            </p>
            <p className="mt-2 text-sm font-medium text-midnight">
              @mydubaisafari
            </p>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-midnight/20 px-5 py-2 text-sm font-medium text-midnight transition-colors hover:border-gold hover:text-gold"
            >
              Follow us
            </a>
          </div>

          {/* Facebook */}
          <div className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#1877F2] text-white">
              <FacebookIcon className="size-6" />
            </div>
            <h2 className="mt-4 font-heading text-lg font-semibold text-midnight">
              Facebook
            </h2>
            <p className="mt-1 text-sm text-midnight/75">
              Reviews, updates, and special deals.
            </p>
            <p className="mt-2 text-sm font-medium text-midnight">
              mydubaisafari
            </p>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-midnight/20 px-5 py-2 text-sm font-medium text-midnight transition-colors hover:border-gold hover:text-gold"
            >
              Like our page
            </a>
          </div>

          {/* TikTok */}
          <div className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex size-12 items-center justify-center rounded-full bg-midnight text-surface">
              <TiktokIcon className="size-6" />
            </div>
            <h2 className="mt-4 font-heading text-lg font-semibold text-midnight">
              TikTok
            </h2>
            <p className="mt-1 text-sm text-midnight/75">
              Short clips from our desert safaris and dune adventures.
            </p>
            <p className="mt-2 text-sm font-medium text-midnight">
              @mydubaisafari
            </p>
            <a
              href={SITE.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-midnight/20 px-5 py-2 text-sm font-medium text-midnight transition-colors hover:border-gold hover:text-gold"
            >
              Watch on TikTok
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
