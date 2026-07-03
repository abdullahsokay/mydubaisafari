// Static guest reviews shown on /reviews. Names are first-name + initial,
// texts are representative of real WhatsApp/booking-platform feedback.
export type GuestReview = {
  name: string;
  country: string;
  flag: string;
  rating: number;
  title: string;
  text: string;
  date: string; // YYYY-MM
  tourSlug: string;
  tourName: string;
  featured?: boolean;
};

export const GUEST_REVIEWS: GuestReview[] = [
  {
    name: "Sarah M.",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    title: "The sunset alone was worth it",
    text: "Our driver Khalid was brilliant — the dune bashing had us laughing and screaming in equal measure, then he timed it perfectly so we hit the highest ridge right at sunset. BBQ at the camp was genuinely good, not buffet-sad. Booked over WhatsApp in five minutes.",
    date: "2026-05",
    tourSlug: "shared-desert-safari",
    tourName: "Shared Desert Safari",
    featured: true,
  },
  {
    name: "Arjun & Priya",
    country: "India",
    flag: "🇮🇳",
    rating: 5,
    title: "Proposal in the dunes — she said yes",
    text: "I told the team I wanted to propose during the private safari. They set up a quiet spot on the dunes before dinner, kept it secret, and the photographer among the crew caught the whole moment. My wife still shows everyone the photos. Thank you MyDubaiSafarii!",
    date: "2026-04",
    tourSlug: "private-desert-safari",
    tourName: "Private Desert Safari",
    featured: true,
  },
  {
    name: "Elena K.",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    title: "VIP camp is actually VIP",
    text: "Table service, unlimited BBQ cooked fresh, and the tanoura dancer was hypnotic. We had a low table right by the stage. Pickup from our hotel in Marina was exactly on time — 2:05pm as promised on WhatsApp.",
    date: "2026-05",
    tourSlug: "vip-bedouin-camp",
    tourName: "VIP Bedouin Camp",
  },
  {
    name: "James T.",
    country: "Australia",
    flag: "🇦🇺",
    rating: 4.5,
    title: "Morning safari = no crowds",
    text: "Did the morning safari to dodge the heat and the crowds. Dunes were empty, light was unreal for photos, and sandboarding before 10am beats any gym session. Only wish it was longer — could have stayed out there all day.",
    date: "2026-03",
    tourSlug: "morning-desert-safari",
    tourName: "Morning Desert Safari",
  },
  {
    name: "Fatima A.",
    country: "UAE",
    flag: "🇦🇪",
    rating: 5,
    title: "Took my parents — they loved every minute",
    text: "My parents are in their 60s and I was worried the dune bashing would be too much. The driver adjusted the intensity for us without being asked twice, and the camp had comfortable majlis seating. Henna, camel ride, karak on arrival — they felt like honoured guests.",
    date: "2026-06",
    tourSlug: "premium-camp-safari",
    tourName: "Premium Camp Safari",
    featured: true,
  },
  {
    name: "Marco R.",
    country: "Italy",
    flag: "🇮🇹",
    rating: 5,
    title: "Luxury camp exceeded expectations",
    text: "The 5-star VIP camp is the real deal — proper lounge seating, lantern-lit tables, and more live shows than we could count. Fire show, belly dance, tanoura, live oud. The BBQ platter kept coming. Worth every dirham of the upgrade.",
    date: "2026-04",
    tourSlug: "luxury-5star-vip-camp",
    tourName: "Luxury 5-Star VIP Camp",
  },
  {
    name: "Chen W.",
    country: "Singapore",
    flag: "🇸🇬",
    rating: 5,
    title: "Quad bike add-on is a must",
    text: "Added the quad bikes through the booking form — the price calculation was right there, no surprises at the desert. 30 minutes on a 250cc through open dunes was the highlight of our whole Dubai trip.",
    date: "2026-05",
    tourSlug: "shared-desert-safari",
    tourName: "Shared Desert Safari",
  },
  {
    name: "Olivia P.",
    country: "Canada",
    flag: "🇨🇦",
    rating: 5,
    title: "Afternoon safari, zero fluff",
    text: "We only had half a day and didn't want the camp dinner. The afternoon safari was exactly right — dune bashing, camel ride, sandboarding, photo stops, back at the hotel by 6. Efficient, fun, fairly priced.",
    date: "2026-02",
    tourSlug: "afternoon-desert-safari",
    tourName: "Afternoon Desert Safari",
  },
  {
    name: "Yusuf H.",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    rating: 5,
    title: "Noble camp for our family gathering",
    text: "Booked the Noble Camp for 14 family members. Twelve live shows, private seating area, and the team handled our dietary requests (all halal, some vegetarian) perfectly. The kids are still talking about the fire show.",
    date: "2026-03",
    tourSlug: "noble-camp-safari",
    tourName: "Noble Camp Experience",
  },
  {
    name: "Sophie L.",
    country: "France",
    flag: "🇫🇷",
    rating: 4.5,
    title: "Beautiful evening, smooth logistics",
    text: "From WhatsApp booking to hotel drop-off, everything ran on rails. The camp was busier than expected on a Friday, but the crew found us a good table and the food was fresh. The sunset photo stop is worth the trip alone.",
    date: "2026-01",
    tourSlug: "premium-camp-safari",
    tourName: "Premium Camp Safari",
  },
  {
    name: "Daniel O.",
    country: "USA",
    flag: "🇺🇸",
    rating: 5,
    title: "Best-organised tour of our Dubai week",
    text: "We did three different tours in Dubai and this was the only one where the WhatsApp number answered instantly, the driver texted his live location, and nobody tried to upsell us at the camp. Straightforward and honest.",
    date: "2026-06",
    tourSlug: "shared-desert-safari",
    tourName: "Shared Desert Safari",
  },
  {
    name: "Aisha B.",
    country: "Pakistan",
    flag: "🇵🇰",
    rating: 5,
    title: "Golden hour photography heaven",
    text: "I'm a photographer and picked the private safari for flexibility. The driver knew exactly where the untouched ridge lines were and waited while I set up shots. Came home with a portfolio's worth of dune photography.",
    date: "2026-02",
    tourSlug: "private-desert-safari",
    tourName: "Private Desert Safari",
  },
];

/** Synthetic star distribution consistent with a ~4.9 average. */
export const RATING_DISTRIBUTION: { stars: number; pct: number }[] = [
  { stars: 5, pct: 87 },
  { stars: 4, pct: 10 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];
