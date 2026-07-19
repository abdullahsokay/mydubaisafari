import Link from "next/link";
import {
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
  TiktokIcon,
} from "@/components/icons/social";
import { Container } from "@/components/ui/container";
import { SITE, whatsappUrl } from "@/lib/site";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Explore",
    links: [
      ["Shared Desert Safari", "/tours/shared-desert-safari"],
      ["Private Safari", "/tours/private-desert-safari"],
      ["Morning Safari", "/tours/morning-desert-safari"],
      ["Add-ons", "/tours#add-ons"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Blog", "/blog"],
      ["Contact", "/contact"],
      ["Careers", "/careers"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Help Center", "/help"],
      ["Cancellation Policy", "/policy/cancellation"],
      ["Privacy Policy", "/policy/privacy"],
      ["Terms of Service", "/policy/terms"],
    ],
  },
];

const waHref = whatsappUrl("Hi! I'd like to know more about your tours.");

const SOCIALS = [
  { Icon: InstagramIcon, href: SITE.instagram, label: "Instagram" },
  { Icon: FacebookIcon, href: SITE.facebook, label: "Facebook" },
  { Icon: WhatsappIcon, href: waHref, label: "WhatsApp" },
  { Icon: TiktokIcon, href: SITE.tiktok, label: "TikTok" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-midnight text-surface">
      <Container className="py-16">
        <div className="grid gap-10 grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand + WhatsApp CTA */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-heading text-xl font-semibold text-surface"
            >
              MyDubai<span className="text-gold">Safari</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-surface/60">
              Dubai&rsquo;s desert safari specialists — confirmed in minutes via WhatsApp, best-price guarantee, 24/7 support.
            </p>
            <div className="mt-6">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1a7f40] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#155f30]"
              >
                <WhatsappIcon className="size-4" />
                Chat with us on WhatsApp
              </a>
              <p className="mt-2 text-xs text-surface/40">{SITE.whatsappDisplay}</p>
            </div>
            <div className="mt-5 space-y-1 text-xs text-surface/40">
              <p>{SITE.address}</p>
              <p>
                <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm font-semibold tracking-wide text-surface uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-surface/60 transition-colors hover:text-gold"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-surface/10 pt-8 sm:flex-row">
          <p className="text-sm text-surface/50">
            &copy; {year} MyDubaiSafari. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface/60 transition-colors hover:text-gold"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-surface/40">
            <span>Confirmed in minutes via WhatsApp</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
