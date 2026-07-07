"use client";

import Image from "next/image";
import { Reveal } from "@/components/about/reveal";
import { TiltCard } from "@/components/about/tilt-card";
import { LoopVideo } from "@/components/ui/loop-video";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ───────────────────────────────────────────────────────────────────────────
 * BlogDossier — reusable "Desert Dossier" editorial layout.
 *
 * Drives a cinematic, split-screen blog spread shared by multiple posts.
 * Media-bearing sections render as alternating spreads (media 7col / text 5col
 * on lg, sides flip per index, media STACKED FIRST on mobile). Text-only
 * sections render as a calm centered max-w-2xl prose block on the same spine.
 *
 * All visual signatures live here: gold center spine + numbered nodes, gold
 * "print" frames (double ring + warm shadow), hero in a TiltCard with Ken-Burns
 * hover, captioned scrim with animated gold underline, ember glow flag for
 * fire/action scenes, Reveal staggered assemble, sticky scene-rail dots.
 * ──────────────────────────────────────────────────────────────────────── */

/* ── Shared "gallery print" frame treatments ───────────────────────── */

const FRAME_BASE =
  "group relative overflow-hidden rounded-[1.75rem] ring-1 ring-gold/20";
const FRAME_SHADOW = "shadow-[0_30px_80px_-30px_rgba(30,27,24,0.55)]";
// Extra warm ember glow reserved for fire/action scenes.
const EMBER_GLOW =
  "shadow-[0_30px_80px_-20px_rgba(176,66,28,0.45),0_0_60px_-10px_rgba(176,66,28,0.6)]";

/* ── Internal data shapes (not consumed outside this file) ─────────── */

interface DossierSupporter {
  src: string;
  alt: string;
  ratio?: string;
  ember?: boolean;
}

interface DossierMedia {
  type: "image" | "video";
  /** Hero asset path (image or video). */
  hero: string;
  /** Permanent caption plate label on the hero. */
  caption: string;
  /** Alt text for the hero (images). */
  alt?: string;
  /** Hero aspect ratio utility, e.g. "aspect-[4/5]". */
  ratio?: string;
  /** Warm ember glow + corner-tick "live" treatment for fire/action scenes. */
  ember?: boolean;
  /** Animated gold corner ticks (signals a live/action scene). */
  live?: boolean;
  /** Optional stacked supporter stills beside the hero. */
  supporters?: DossierSupporter[];
}

interface DossierSection {
  /** Two-digit numeral shown on the spine node, e.g. "01". */
  number: string;
  /** Eyebrow badge label. */
  kicker: string;
  /** Section <h2> id — MUST match slugifyHeading for TOC anchors. */
  id: string;
  /** Section heading text. */
  title: string;
  /**
   * Body content. Either an array of paragraph strings/nodes (rendered as
   * spaced <p>s) or a fully custom ReactNode for rich prose (H3s, bullets…).
   */
  body: React.ReactNode | (React.ReactNode | string)[];
}

export interface DossierSectionWithMedia extends DossierSection {
  media?: DossierMedia;
}

export interface DossierOutro {
  kicker: string;
  id: string;
  title: React.ReactNode;
  body: React.ReactNode;
}

/* ── Frame chrome ──────────────────────────────────────────────────── */

/** Double-edge inset white hairline shared by every print. */
function FrameEdges() {
  return (
    <span className="pointer-events-none absolute inset-0 z-20 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
  );
}

/** Permanent captioned-plate scrim with an animated gold underline. */
function HeroCaption({ label }: { label: string }) {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-midnight/70 via-midnight/10 to-transparent" />
      <span className="pointer-events-none absolute bottom-5 left-6 z-20">
        <span className="block font-heading text-xs font-semibold uppercase tracking-[0.28em] text-palegold">
          {label}
        </span>
        <span className="dossier-underline mt-1.5 block h-px w-12 origin-left bg-gold" />
      </span>
    </>
  );
}

/* ── Image print (still) — Ken-Burns drift on hover ────────────────── */

function StillFrame({
  src,
  alt,
  ratio = "aspect-square",
  ember = false,
  className,
}: {
  src: string;
  alt: string;
  ratio?: string;
  ember?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        FRAME_BASE,
        ratio,
        ember ? EMBER_GLOW : FRAME_SHADOW,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="kenburns object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />
      <FrameEdges />
    </div>
  );
}

/* ── Hero print — sits inside TiltCard (3D tilt + gold glare) ───────── */

function HeroFrame({
  type,
  src,
  alt,
  caption,
  ratio = "aspect-[4/5]",
  ember = false,
  live = false,
}: {
  type: "image" | "video";
  src: string;
  alt: string;
  caption: string;
  ratio?: string;
  ember?: boolean;
  live?: boolean;
}) {
  return (
    <TiltCard className="rounded-[1.75rem]">
      <div className={cn(FRAME_BASE, ratio, ember ? EMBER_GLOW : FRAME_SHADOW)}>
        {type === "video" ? (
          <LoopVideo src={src} className="h-full w-full" />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="kenburns object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
        )}
        <HeroCaption label={caption} />
        <FrameEdges />

        {/* Animated gold corner-ticks — signals the "live" action scene. */}
        {live && (
          <>
            <span className="dossier-tick pointer-events-none absolute left-3 top-3 z-20 h-6 w-6 rounded-tl-xl border-l-2 border-t-2 border-gold/80" />
            <span className="dossier-tick pointer-events-none absolute right-3 top-3 z-20 h-6 w-6 rounded-tr-xl border-r-2 border-t-2 border-gold/80" />
            <span className="dossier-tick pointer-events-none absolute bottom-3 left-3 z-20 h-6 w-6 rounded-bl-xl border-b-2 border-l-2 border-gold/80" />
            <span className="dossier-tick pointer-events-none absolute bottom-3 right-3 z-20 h-6 w-6 rounded-br-xl border-b-2 border-r-2 border-gold/80" />
          </>
        )}
      </div>
    </TiltCard>
  );
}

/* ── Media cluster — hero (+ optional stacked supporters) ──────────── */

function MediaCluster({ media }: { media: DossierMedia }) {
  const { supporters } = media;

  const hero = (
    <HeroFrame
      type={media.type}
      src={media.hero}
      alt={media.alt ?? media.caption}
      caption={media.caption}
      ratio={media.ratio ?? (media.type === "video" ? "aspect-video" : "aspect-[4/5]")}
      ember={media.ember}
      live={media.live}
    />
  );

  // Hero only — single tall/standard print.
  if (!supporters || supporters.length === 0) {
    return <Reveal delay={120}>{hero}</Reveal>;
  }

  // Hero + supporters: side-stacked column on sm+, a tidy row on mobile.
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-12">
      <Reveal delay={120} className="sm:col-span-8">
        {hero}
      </Reveal>
      <div
        className={cn(
          "grid gap-5 sm:col-span-4 sm:grid-cols-1",
          supporters.length > 1 ? "grid-cols-2" : "grid-cols-1",
        )}
      >
        {supporters.map((s, i) => (
          <Reveal key={s.src} delay={220 + i * 90}>
            <StillFrame
              src={s.src}
              alt={s.alt}
              ratio={s.ratio ?? "aspect-square"}
              ember={s.ember}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ── Spine numeral node (welded onto the gold binding) ─────────────── */

function NumeralNode({ n }: { n: string }) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface font-heading text-sm font-semibold tracking-widest text-gold ring-1 ring-gold/40 shadow-[0_8px_24px_-10px_rgba(176,66,28,0.7)]">
      {n}
    </span>
  );
}

/* ── Section kicker eyebrow (numeral + Badge) ──────────────────────── */

function Eyebrow({ n, kicker }: { n: string; kicker: string }) {
  return (
    <Reveal delay={0} className="mb-5 flex items-center gap-4">
      <NumeralNode n={n} />
      <Badge tone="gold">{kicker}</Badge>
    </Reveal>
  );
}

/* ── Split spread wrapper ──────────────────────────────────────────── */
/* mediaSide handles the lg-flip; on mobile media always stacks first.   */

function Spread({
  mediaSide,
  media,
  text,
  tone = "surface",
}: {
  mediaSide: "left" | "right";
  media: React.ReactNode;
  text: React.ReactNode;
  tone?: "surface" | "sand";
}) {
  const mediaLeft = mediaSide === "left";
  return (
    <div className={cn(tone === "sand" ? "bg-sand" : "bg-surface")}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-8 px-1 py-16 sm:py-20 lg:grid-cols-12 lg:gap-x-12 lg:py-28">
        {/* MEDIA — 7 cols, flips side on lg, stacked first on mobile */}
        <div
          className={cn(
            "min-w-0 lg:col-span-7",
            mediaLeft
              ? "lg:order-1 lg:col-start-1"
              : "lg:order-2 lg:col-start-6",
          )}
        >
          {media}
        </div>
        {/* TEXT — 5 cols */}
        <div
          className={cn(
            "min-w-0 lg:col-span-5 lg:self-center",
            mediaLeft
              ? "lg:order-2 lg:col-start-8"
              : "lg:order-1 lg:col-start-1",
          )}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

/* ── Prose helpers (desert ink) ────────────────────────────────────── */

function H2({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 font-heading text-h2 font-bold leading-tight text-midnight"
    >
      {children}
    </h2>
  );
}

export function H3({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      id={id}
      className="scroll-mt-28 font-heading text-lg font-semibold text-midnight"
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[1.0625rem] leading-relaxed text-midnight/70">
      {children}
    </p>
  );
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex gap-3 text-[1.0625rem] leading-relaxed text-midnight/70"
        >
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function ALink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="font-medium text-orange underline decoration-orange/40 underline-offset-2 transition-colors hover:text-clay"
    >
      {children}
    </a>
  );
}

/* ── Body renderer (array of paragraphs OR custom node) ────────────── */

function isParagraphArray(
  body: DossierSection["body"],
): body is (React.ReactNode | string)[] {
  return Array.isArray(body);
}

function SectionBody({ body }: { body: DossierSection["body"] }) {
  if (isParagraphArray(body)) {
    return (
      <div className="space-y-5">
        {body.map((para, i) => (
          <P key={i}>{para}</P>
        ))}
      </div>
    );
  }
  return <>{body}</>;
}

/* ── The dossier ───────────────────────────────────────────────────── */

export function BlogDossier({
  sections,
  rail,
  outro,
}: {
  sections: DossierSectionWithMedia[];
  /** Sticky scene-rail numerals (lg+). Defaults to section count. */
  rail?: string[];
  /** Optional centered colophon/outro block. */
  outro?: DossierOutro;
}) {
  const railLabels =
    rail ?? sections.map((_, i) => String(i + 1).padStart(2, "0"));

  return (
    <div className="relative -mx-1">
      {/* Sticky "scene rail" — progress dots (xl only) */}
      <SceneRail labels={railLabels} />

      <div className="relative">
        {/* Living gold spine — runs the full height through the center gutter */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 border-l border-gold/25 lg:block"
        >
          <span className="dossier-spine absolute inset-0 block" />
        </div>

        {sections.map((section, i) => {
          const mediaSide: "left" | "right" = i % 2 === 0 ? "left" : "right";
          const tone: "surface" | "sand" = i % 2 === 0 ? "surface" : "sand";

          const textBlock = (
            <div className="space-y-5">
              <Eyebrow n={section.number} kicker={section.kicker} />
              <Reveal delay={0} className="space-y-5">
                <H2 id={section.id}>{section.title}</H2>
                <SectionBody body={section.body} />
              </Reveal>
            </div>
          );

          /* Media-bearing → alternating split spread. */
          if (section.media) {
            return (
              <section
                key={section.id}
                className="relative border-t border-gold/15"
              >
                <Spread
                  mediaSide={mediaSide}
                  tone={tone}
                  media={<MediaCluster media={section.media} />}
                  text={textBlock}
                />
              </section>
            );
          }

          /* Text-only → calm centered prose, still on the spine. */
          return (
            <section
              key={section.id}
              className={cn(
                "relative border-t border-gold/15",
                tone === "sand" ? "bg-sand" : "bg-surface",
              )}
            >
              <div className="mx-auto max-w-2xl px-4 py-16 sm:py-20 lg:py-24">
                <div className="flex justify-center">
                  <Eyebrow n={section.number} kicker={section.kicker} />
                </div>
                <Reveal delay={0} className="space-y-5 text-center">
                  <H2 id={section.id}>{section.title}</H2>
                  <div className="text-left">
                    <SectionBody body={section.body} />
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}

        {/* Optional outro / colophon — centered, text-only */}
        {outro && (
          <section className="relative border-t border-gold/15 bg-surface">
            <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:py-20 lg:py-24">
              <Reveal className="space-y-5">
                <Badge tone="gold" className="mx-auto">
                  {outro.kicker}
                </Badge>
                <H2 id={outro.id}>{outro.title}</H2>
                {outro.body}
              </Reveal>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ── Sticky scene rail — cinematic progress numerals (xl only) ─────── */

function SceneRail({ labels }: { labels: string[] }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-10 top-0 hidden h-full xl:block"
    >
      <div className="sticky top-1/2 flex -translate-y-1/2 flex-col items-center gap-5">
        {labels.map((label) => (
          <span
            key={label}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-[0.65rem] font-semibold text-gold ring-1 ring-gold/40"
          >
            {label}
          </span>
        ))}
        <span className="mt-1 h-16 w-px bg-gold/20" />
      </div>
    </div>
  );
}
