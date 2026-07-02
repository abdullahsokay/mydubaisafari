"use client";

import {
  BlogDossier,
  H3,
  P,
  Bullets,
  ALink,
  type DossierSectionWithMedia,
  type DossierOutro,
} from "@/components/blog/blog-dossier";

const BASE = "/Images/sandboarding";

/* ───────────────────────────────────────────────────────────────────────────
 * Sandboarding "Dossier" — same cinematic treatment as the camp post via the
 * shared <BlogDossier>. Only two assets exist: sandboard.jpg (hero of "How
 * Sandboarding Works") and sandboard1.mp4 (hero of the step-by-step run, shown
 * via <LoopVideo> with the live/ember action treatment). The other three
 * sections are text-only. Copy is verbatim from the markdown source.
 * ──────────────────────────────────────────────────────────────────────── */

const sections: DossierSectionWithMedia[] = [
  /* 01 · How Sandboarding Works — sandboard.jpg hero (image) */
  {
    number: "01",
    kicker: "The Kit",
    id: "how-sandboarding-works",
    title: "How Sandboarding Works",
    media: {
      type: "image",
      hero: `${BASE}/sandboard.jpg`,
      alt: "A sandboard resting on the red dunes of the Dubai desert",
      caption: "On the Dunes",
      ratio: "aspect-[4/5]",
    },
    body: (
      <>
        <P>
          A sandboard looks like a snowboard but is specifically built (or
          modified) for sand. Key differences include:
        </P>
        <Bullets
          items={[
            <>
              <strong className="font-semibold text-midnight">
                Board base:
              </strong>{" "}
              Sandboards use a harder, smoother base material (often formica or
              laminex) that reduces friction against sand particles, which are
              more abrasive than snow crystals
            </>,
            <>
              <strong className="font-semibold text-midnight">Wax:</strong> The
              board base is regularly waxed with a paraffin-based wax before each
              session to maintain speed — without wax, sand friction slows the
              board significantly
            </>,
            <>
              <strong className="font-semibold text-midnight">
                Bindings (optional):
              </strong>{" "}
              For standing sandboarding, bindings hold your feet in position.
              Prone boarding (lying down) does not require bindings
            </>,
          ]}
        />
        <H3 id="the-two-styles">The Two Styles</H3>
        <P>
          <strong className="font-semibold text-midnight">
            Prone boarding (lying face down):
          </strong>{" "}
          This is the recommended starting point for beginners. You lie on the
          board, chest down, and push off from the dune&apos;s crest. Steering is
          done by shifting your weight and dragging a foot. Speeds are
          exhilarating and the risk of injury is minimal since you are already
          close to the surface.
        </P>
        <P>
          <strong className="font-semibold text-midnight">
            Standing boarding:
          </strong>{" "}
          Once you are comfortable prone, guides can set up bindings for a
          standing run. The technique closely resembles snowboarding — weight on
          the back foot to initiate, edge control to turn. The learning curve is
          steeper, but the feeling of carving down a dune face while standing is
          extraordinary.
        </P>
      </>
    ),
  },

  /* 02 · Where Do You Sandboard in Dubai? — TEXT ONLY */
  {
    number: "02",
    kicker: "The Terrain",
    id: "where-do-you-sandboard-in-dubai",
    title: "Where Do You Sandboard in Dubai?",
    body: (
      <>
        <P>
          Desert safari operators in Dubai use dunes in the Dubai Desert
          Conservation Reserve and the Al Lahbab &quot;Big Red&quot; dune area
          southeast of the city. The best dunes for sandboarding are those with:
        </P>
        <Bullets
          items={[
            "A steep enough face to generate speed (typically 20–30+ degree incline)",
            "A wide, open run-out at the bottom with no rocks or obstacles",
            "Consistent sand texture — fine-grained compacted faces work better than loose powder",
          ]}
        />
        <P>
          Your safari guide will assess dune conditions on the day and select the
          appropriate face for the group&apos;s experience level.
        </P>
      </>
    ),
  },

  /* 03 · Step-by-Step: Your First Sandboard Run — sandboard1.mp4 hero (video) */
  {
    number: "03",
    kicker: "The Run",
    id: "step-by-step-your-first-sandboard-run",
    title: "Step-by-Step: Your First Sandboard Run",
    media: {
      type: "video",
      hero: `${BASE}/sandboard1.mp4`,
      alt: "A sandboarder carving down a Dubai desert dune",
      caption: "The Descent",
      ratio: "aspect-[4/5]",
      ember: true,
      live: true,
    },
    body: (
      <ol className="space-y-3">
        {[
          <>
            <strong className="font-semibold text-midnight">
              The briefing:
            </strong>{" "}
            Your guide explains weight distribution, braking (drag your feet or
            hands in the sand), and how to bail safely if you lose control (aim
            to roll, not to grab the board)
          </>,
          <>
            <strong className="font-semibold text-midnight">The climb:</strong>{" "}
            Walk up the selected dune face. Take it slowly — loose sand requires
            effort. Use a diagonal line if the face is steep
          </>,
          <>
            <strong className="font-semibold text-midnight">
              Board positioning:
            </strong>{" "}
            Place the board perpendicular to the slope at the crest. Lie prone
            with your chest on the board, legs out behind
          </>,
          <>
            <strong className="font-semibold text-midnight">The push:</strong>{" "}
            Either push yourself off with your hands, or ask your guide to give
            you a starting push
          </>,
          <>
            <strong className="font-semibold text-midnight">The run:</strong>{" "}
            Keep your weight centred, head up, and enjoy the acceleration. Use
            your feet to steer by pressing into the sand on either side
          </>,
          <>
            <strong className="font-semibold text-midnight">The stop:</strong>{" "}
            At the bottom, drag both feet simultaneously into the sand for a firm
            stop. Or, if speed is too high, lean slightly to one side and allow
            the board to turn across the slope
          </>,
        ].map((step, i) => (
          <li
            key={i}
            className="flex gap-4 text-[1.0625rem] leading-relaxed text-midnight/70"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 font-heading text-sm font-semibold text-gold">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    ),
  },

  /* 04 · Tips for Getting the Most Out of Sandboarding — TEXT ONLY */
  {
    number: "04",
    kicker: "The Tips",
    id: "tips-for-getting-the-most-out-of-sandboarding",
    title: "Tips for Getting the Most Out of Sandboarding",
    body: (
      <Bullets
        items={[
          <>
            <strong className="font-semibold text-midnight">
              Wax the board before every run
            </strong>{" "}
            — guides handle this, but it makes a significant difference to speed
          </>,
          <>
            <strong className="font-semibold text-midnight">
              Start on a smaller dune
            </strong>{" "}
            to build confidence before tackling the steepest face available
          </>,
          <>
            <strong className="font-semibold text-midnight">
              Loosen your shoes
            </strong>{" "}
            slightly so sand can exit rather than building up inside
          </>,
          <>
            <strong className="font-semibold text-midnight">
              Stay hydrated
            </strong>{" "}
            — the climbing between runs in desert heat is more physically
            demanding than it looks
          </>,
          <>
            <strong className="font-semibold text-midnight">
              Do not fight the fall
            </strong>{" "}
            — when you wipe out (and you will, at least once), let yourself roll
            rather than bracing with your wrists
          </>,
        ]}
      />
    ),
  },

  /* 05 · Morning vs Evening for Sandboarding — TEXT ONLY */
  {
    number: "05",
    kicker: "The Timing",
    id: "morning-vs-evening-for-sandboarding",
    title: "Morning vs Evening for Sandboarding",
    body: (
      <P>
        Our{" "}
        <ALink href="/tours/morning-desert-safari">morning desert safari</ALink>{" "}
        is ideal for sandboarding: cooler temperatures make the climbing between
        runs far less exhausting, and the softer morning light photographs the
        activity beautifully. The{" "}
        <ALink href="/tours/shared-desert-safari">shared desert safari</ALink>{" "}
        includes sandboarding in the golden pre-sunset window — spectacular
        visually, though slightly warmer in summer months.
      </P>
    ),
  },
];

const outro: DossierOutro = {
  kicker: "The Outro",
  id: "book-your-sandboarding-safari",
  title: <span className="block">Ready to Make Your Run?</span>,
  body: (
    <p className="text-[1.0625rem] leading-relaxed text-midnight/70">
      Sandboarding in Dubai&apos;s desert is the kind of activity that adults and
      children alike talk about for years after.{" "}
      <ALink href="/tours">Book your desert safari with MyDubaiSafarii</ALink>{" "}
      and we will make sure the boards are waxed, the dunes are ready, and the
      camera is pointed in the right direction when you make your run.
    </p>
  ),
};

export function SandboardingStory() {
  return <BlogDossier sections={sections} outro={outro} />;
}
