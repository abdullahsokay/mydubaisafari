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

const BASE = "/Images/dubai-desert-camp";

/* ───────────────────────────────────────────────────────────────────────────
 * Desert Camp "Dossier" — now rendered through the shared <BlogDossier>.
 * Same media mapping, captions, ember/live flags and (verbatim) copy as before;
 * the split-spread layout, gold spine, print frames and scene rail all live in
 * the reusable component so this and the sandboarding post share one design.
 * ──────────────────────────────────────────────────────────────────────── */

const sections: DossierSectionWithMedia[] = [
  /* 01 · The Setting — camp-1.mp4 hero (ember) + camp-2 / camp-8 supporters */
  {
    number: "01",
    kicker: "The Setting",
    id: "the-bedouin-camp-setting-the-scene",
    title: "The Bedouin Camp: Setting the Scene",
    media: {
      type: "video",
      hero: `${BASE}/camp-1.mp4`,
      alt: "Bedouin desert camp majlis at dusk",
      caption: "The Majlis",
      ratio: "aspect-[4/5]",
      ember: true,
      supporters: [
        {
          src: `${BASE}/camp-2.jpeg`,
          alt: "Low seating and woven carpets in the camp",
          ratio: "aspect-square",
        },
        {
          src: `${BASE}/camp-8.jpeg`,
          alt: "Arabian lanterns and cushioned majlis seating",
          ratio: "aspect-square",
        },
      ],
    },
    body: (
      <>
        <P>
          Traditional Bedouin camps were temporary settlements used by nomadic
          desert people across the Arabian Peninsula. The desert safari camp
          experience is inspired by this tradition — low seating, woven carpets,
          Arabian lanterns, and open-sided canvas pavilions that keep the breeze
          moving while sheltering from any wind.
        </P>
        <P>Most camps include dedicated areas for:</P>
        <Bullets
          items={[
            "Seating and dining (floor cushions and traditional low tables)",
            "A performance stage for live entertainment",
            "Henna artist stations",
            "Shisha lounge areas",
            "Souvenir and gift stalls",
            "Photography opportunities in traditional Emirati dress",
          ]}
        />
        <P>
          The atmosphere is communal and relaxed. You are sharing the camp with
          other guests from around the world, which creates a naturally social
          atmosphere.
        </P>
      </>
    ),
  },

  /* 02 · The Feast — camp-3 hero + camp-4 / camp-7 supporters */
  {
    number: "02",
    kicker: "The Feast",
    id: "the-bbq-dinner-buffet",
    title: "The BBQ Dinner Buffet",
    media: {
      type: "image",
      hero: `${BASE}/camp-3.jpeg`,
      alt: "BBQ buffet spread at the desert camp",
      caption: "Off the Grill",
      ratio: "aspect-[4/5]",
      supporters: [
        {
          src: `${BASE}/camp-4.jpeg`,
          alt: "Grilled kebabs and Arabic mains",
          ratio: "aspect-square",
        },
        {
          src: `${BASE}/camp-7.jpeg`,
          alt: "Mezze, salads and Arabic desserts",
          ratio: "aspect-square",
        },
      ],
    },
    body: (
      <>
        <P>
          The centrepiece of the evening is the BBQ dinner — a generous spread
          that blends Emirati and Arabic culinary traditions with international
          options to cater to every palate.
        </P>
        <H3 id="what-to-expect-on-the-buffet">What to Expect on the Buffet</H3>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-clay">
              Grills and mains
            </p>
            <Bullets
              items={[
                "Chicken and lamb kebabs, fresh off the live grill",
                "Whole spiced roast lamb (on premium evenings)",
                "Grilled fish at some camps",
                "Arabic-spiced rice dishes including kabsa and biryani",
              ]}
            />
          </div>
          <div className="space-y-2">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-clay">
              Mezze and salads
            </p>
            <Bullets
              items={[
                "Hummus, baba ganoush, and muhammara (red pepper dip)",
                "Tabbouleh, fattoush, and Arabic salad",
                "Fresh flatbread (khubz) from the camp kitchen",
              ]}
            />
          </div>
          <div className="space-y-2">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-clay">
              Desserts
            </p>
            <Bullets
              items={[
                "Umm Ali (a warm bread pudding — do not miss it)",
                "Fresh fruit platters",
                "Arabic sweets including baklava and luqaimat (fried dough balls with honey)",
              ]}
            />
          </div>
          <div className="space-y-2">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-clay">
              Drinks
            </p>
            <Bullets
              items={[
                "Soft drinks, water, fresh juice",
                "Arabic coffee (qahwa) and mint tea — served by roving camp staff",
              ]}
            />
          </div>
        </div>
        <P>
          Most camps cater clearly for vegetarians, and dietary requests can be
          accommodated with advance notice when booking.
        </P>
      </>
    ),
  },

  /* 03 · The Show — camp-2.mp4 hero (ember + live) + camp-0/5/6 supporters */
  {
    number: "03",
    kicker: "The Show",
    id: "the-entertainment-programme",
    title: "The Entertainment Programme",
    media: {
      type: "video",
      hero: `${BASE}/camp-2.mp4`,
      alt: "Fire show performance at the desert camp",
      caption: "Fireside",
      ratio: "aspect-video",
      ember: true,
      live: true,
      supporters: [
        {
          src: `${BASE}/camp-0.jpeg`,
          alt: "Tanoura dancer spinning in colour",
          ratio: "aspect-square",
          ember: true,
        },
        {
          src: `${BASE}/camp-5.jpeg`,
          alt: "Fire performer with flaming torches",
          ratio: "aspect-square",
          ember: true,
        },
        {
          src: `${BASE}/camp-6.jpeg`,
          alt: "Live entertainment under the desert sky",
          ratio: "aspect-square",
          ember: true,
        },
      ],
    },
    body: (
      <>
        <P>
          As dinner winds down, the performance area comes alive. A typical
          desert camp show runs approximately 60–90 minutes and includes three
          or four distinct performances.
        </P>
        <H3 id="tanoura-dance">Tanoura Dance</H3>
        <P>
          The tanoura is one of the most visually striking performances in the
          Arab world. A male Sufi-inspired dancer spins continuously for 20–30
          minutes wearing a tiered, multicoloured skirt that fans out
          horizontally as speed increases. The effect is mesmerising — a living
          kaleidoscope of colour. The dance has roots in Sufi spiritual
          tradition, and the spinning is meant to represent spiritual
          transcendence.
        </P>
        <H3 id="belly-dancing">Belly Dancing</H3>
        <P>
          An internationally recognised symbol of Middle Eastern culture, the
          belly dance performance at desert camps is professional and
          theatrical. Colourful costumes, intricate hip and torso movements, and
          audience participation moments make this a crowd-pleasing highlight,
          particularly with groups.
        </P>
        <H3 id="fire-show">Fire Show</H3>
        <P>
          As darkness fully falls, the fire performers take the stage — spinning
          lit poi, breathing fire, or walking with flaming torches. This is the
          most dramatic spectacle of the evening, best photographed with a slow
          shutter speed if you want light-trail effects.
        </P>
        <H3 id="live-arabic-music">Live Arabic Music</H3>
        <P>
          Many camps feature a live Arabic music duo or trio — oud (lute),
          percussion, and vocals — performing traditional Gulf music. This sets
          the background atmosphere for the henna and shisha portions of the
          evening.
        </P>
      </>
    ),
  },

  /* 04 · The Majlis — camp-9 single tall portrait hero */
  {
    number: "04",
    kicker: "The Majlis",
    id: "henna-art-and-shisha",
    title: "Henna Art and Shisha",
    media: {
      type: "image",
      hero: `${BASE}/camp-9.jpeg`,
      alt: "Shisha lounge and henna art in the majlis",
      caption: "Henna & Smoke",
      ratio: "aspect-[3/4]",
    },
    body: (
      <>
        <P>
          While performances run in the central area, guests can visit the henna
          artists for traditional temporary body art. The designs range from
          simple geometric patterns (a quick 5-minute piece for children) to
          elaborate hand/arm designs for those who want the full experience.
          Natural henna takes approximately 20–30 minutes to dry and should be
          left on for at least an hour before peeling for best colour.
        </P>
        <P>
          Shisha lounges are a staple of the camp experience. Sit on cushioned
          seating, take a shisha pipe, and watch the performers under a sky
          increasingly thick with stars. The desert&apos;s absence of light
          pollution makes it one of the best stargazing locations near Dubai.
        </P>
      </>
    ),
  },
];

const outro: DossierOutro = {
  kicker: "The Outro",
  id: "overnight-desert-experience",
  title: <span className="block">Overnight Desert Experience</span>,
  body: (
    <>
      <p className="text-[1.0625rem] leading-relaxed text-midnight/70">
        To experience the camp atmosphere at its most immersive, consider the{" "}
        <ALink href="/tours/luxury-5star-vip-camp">
          overnight desert safari
        </ALink>
        . After the dinner and shows, guests sleep under the stars in comfortable
        desert tents and wake to sunrise over the dunes — an experience that
        transforms a fun evening into a genuine escape.
      </p>
      <span className="mx-auto block h-px w-16 bg-gold/40" />
      <p className="text-[1.0625rem] leading-relaxed text-midnight/70">
        The desert camp is waiting.{" "}
        <ALink href="/tours/shared-desert-safari">
          Book your evening desert safari
        </ALink>{" "}
        or{" "}
        <ALink href="/tours/luxury-5star-vip-camp">
          overnight desert safari
        </ALink>{" "}
        with MyDubaiSafari and experience an Arabian night that no hotel dinner
        can replicate.{" "}
        <ALink href="/tours">Browse all our desert experiences</ALink>.
      </p>
    </>
  ),
};

export function DesertCampStory() {
  // Rail defaults to numerals 01–04 (one per section) — matches the original.
  return <BlogDossier sections={sections} outro={outro} />;
}
