import type { Category, Tour } from "./types";

// Seed catalog. Replaced by Supabase/Prisma data once the DB is provisioned —
// the repository is the only swap point (BUILD_PLAN §4.4).

export const CATEGORIES: Category[] = [
  {
    slug: "with-camp",
    name: "Desert Safari with Camp",
    tagline: "Dune bashing, camp, dinner & shows",
  },
  {
    slug: "safari-only",
    name: "Safari Only",
    tagline: "Dune bashing without the camp",
  },
];

const GRADIENTS = {
  ember: "bg-linear-to-br from-orange/70 to-midnight",
  dusk: "bg-linear-to-br from-navy to-midnight",
  gold: "bg-linear-to-br from-gold/70 to-navy",
  fusion: "bg-linear-to-br from-navy/80 to-orange/60",
  night: "bg-linear-to-tr from-midnight to-navy",
  sunset: "bg-linear-to-br from-orange/60 to-navy",
};

export const TOURS: Tour[] = [
  // ─── With-Camp Packages ───────────────────────────────────────────────────

  {
    slug: "shared-desert-safari",
    name: "Shared Desert Safari",
    categorySlug: "with-camp",
    shortDesc:
      "The classic Dubai desert experience — shared 4x4 dune bashing, Standard Camp dinner, belly-dance and tanoura shows. Best-value intro to the Arabian desert.",
    description:
      "Join fellow travellers for the quintessential Dubai desert safari. Your shared 4x4 Land Cruiser picks you up at 1:45–2:15 PM and whisks you to the Al Habab red dunes for 30–40 minutes of thrilling dune bashing. After the adrenaline rush, enjoy sandboarding, a camel ride, henna painting and a beautiful desert sunset. At the Standard Camp, unlimited tea, coffee, soft drinks and water are served throughout the evening. Shisha (hookah) is available for those who want it, and the self-service BBQ dinner features an international buffet alongside a vegetarian spread. As night falls, watch the mesmerising belly-dance, fire and tanoura shows under the stars before your driver returns you to your hotel by 9:00–9:30 PM.",
    durationMinutes: 420,
    pickupTime: "1:45 PM – 2:15 PM",
    meetingPoint: "Hotel pickup (Dubai city area)",
    priceAdult: 150,
    priceChild: 0,
    priceInfant: 0,
    currency: "AED",
    rating: 4.8,
    reviewCount: 2347,
    isFeatured: true,
    isBestseller: true,
    tag: "Best Seller",
    priceUnit: "person",
    pricingNote: "Children under 2 free",
    gallery: [GRADIENTS.ember, GRADIENTS.sunset, GRADIENTS.night],
    image: "/Images/stock/tours/shared-desert-safari.jpg",
    inclusions: [
      "Shared 4x4 Land Cruiser pickup & drop-off (max 7 guests)",
      "30–40 min Red Dunes dune bashing (Al Habab desert)",
      "Sandboarding",
      "Camel ride",
      "Sunset photography stop",
      "Henna painting",
      "Unlimited tea, coffee, soft drinks & water",
      "Shisha (hookah)",
      "Self-service BBQ dinner — international buffet",
      "Vegetarian buffet",
      "Live belly-dance show",
      "Tanoura show",
      "Fire show",
    ],
    exclusions: [
      "Quad bike / buggy rides (available as add-ons)",
      "Alcoholic beverages",
      "Gratuities",
    ],
    itinerary: [
      {
        time: "1:45 PM",
        title: "Hotel Pickup",
        description:
          "Your shared 4x4 Land Cruiser collects you from your Dubai city hotel (pickup window 1:45–2:15 PM).",
      },
      {
        time: "3:00 PM",
        title: "Red Dunes Dune Bashing",
        description:
          "Arrive at the Al Habab red dunes for 30–40 minutes of exhilarating dune bashing with an expert driver.",
      },
      {
        time: "4:00 PM",
        title: "Sandboarding & Camel Ride",
        description:
          "Try sandboarding down the dunes, then enjoy a traditional camel ride with a beautiful desert backdrop.",
      },
      {
        time: "5:30 PM",
        title: "Sunset at the Dunes",
        description:
          "Watch the sun melt into the desert horizon — the perfect golden-hour photography moment.",
      },
      {
        time: "6:00 PM",
        title: "Standard Camp Arrival",
        description:
          "Enter the Standard Camp for henna painting, Arabic coffee, dates, shisha and unlimited refreshments.",
      },
      {
        time: "7:30 PM",
        title: "BBQ Dinner",
        description:
          "Self-service international BBQ buffet with a generous vegetarian spread served under the desert sky.",
      },
      {
        time: "8:00 PM",
        title: "Live Entertainment",
        description:
          "Belly-dance, fire and tanoura shows performed in the camp amphitheatre.",
      },
      {
        time: "9:00 PM",
        title: "Return to Hotel",
        description:
          "Drop-off at your Dubai city hotel (approx. 9:00–9:30 PM).",
      },
    ],
    faqs: [
      {
        question: "Is hotel pickup included?",
        answer:
          "Yes — round-trip transfers from Dubai city hotels are included in a shared 4x4 (max 7 guests per vehicle).",
      },
      {
        question: "Is dune bashing safe for children?",
        answer:
          "Dune bashing is not recommended for children under 3, pregnant women or guests with back/neck conditions. Children under 2 ride free.",
      },
      {
        question: "Is the food vegetarian-friendly?",
        answer:
          "Yes. The BBQ buffet includes a dedicated vegetarian spread alongside the non-vegetarian options.",
      },
      {
        question: "What should I wear?",
        answer:
          "Comfortable, modest clothing and closed-toe shoes are recommended. Light layers work well as desert evenings can be cool.",
      },
    ],
    cancellationPolicy:
      "Free cancellation up to 24 hours before the experience. No refund for cancellations within 24 hours.",
  },

  {
    slug: "private-desert-safari",
    name: "Private Desert Safari",
    categorySlug: "with-camp",
    shortDesc:
      "All the magic of the classic desert safari — exclusively for your group. Private 4x4, Standard Camp dinner and full evening of shows.",
    description:
      "Everything in the Shared Desert Safari, but reserved entirely for your group. Your private 4x4 Land Cruiser picks you up at 1:45–2:15 PM for 30–40 minutes of Red Dunes dune bashing in the Al Habab desert. Sandboarding, a camel ride and henna painting follow before a stunning desert sunset. The Standard Camp self-service BBQ buffet dinner — with an international spread and full vegetarian options — is served alongside unlimited refreshments and shisha. The belly-dance, tanoura and fire shows round off a perfect Arabian evening before your private vehicle returns you to your hotel.",
    durationMinutes: 420,
    pickupTime: "1:45 PM – 2:15 PM",
    meetingPoint: "Hotel pickup (Dubai city area)",
    priceAdult: 750,
    priceChild: 0,
    priceInfant: 0,
    currency: "AED",
    rating: 4.7,
    reviewCount: 412,
    isFeatured: false,
    tag: "Private",
    priceUnit: "2 persons · private",
    pricingNote: "Price for 2 persons · extra guests on request",
    gallery: [GRADIENTS.sunset, GRADIENTS.ember, GRADIENTS.gold],
    image: "/Images/stock/tours/private-desert-safari.jpg",
    inclusions: [
      "Private 4x4 Land Cruiser pickup & drop-off",
      "30–40 min Red Dunes dune bashing (Al Habab desert)",
      "Sandboarding",
      "Camel ride",
      "Sunset photography stop",
      "Henna painting",
      "Unlimited tea, coffee, soft drinks & water",
      "Shisha (hookah)",
      "Self-service BBQ dinner — international buffet",
      "Vegetarian buffet",
      "Live belly-dance show",
      "Tanoura show",
      "Fire show",
    ],
    exclusions: [
      "Quad bike / buggy rides (available as add-ons)",
      "Alcoholic beverages",
      "Gratuities",
    ],
    itinerary: [
      {
        time: "1:45 PM",
        title: "Private Hotel Pickup",
        description:
          "Your private 4x4 Land Cruiser collects your group from your Dubai city hotel (pickup window 1:45–2:15 PM).",
      },
      {
        time: "3:00 PM",
        title: "Red Dunes Dune Bashing",
        description:
          "30–40 minutes of private dune bashing across the Al Habab red dunes with your dedicated driver.",
      },
      {
        time: "4:00 PM",
        title: "Sandboarding & Camel Ride",
        description:
          "Sandboard down the dunes and enjoy a camel ride at your own pace — no queues, just your group.",
      },
      {
        time: "5:30 PM",
        title: "Desert Sunset",
        description:
          "Your driver positions the 4x4 for the perfect sunset shot over the Al Habab dunes.",
      },
      {
        time: "6:00 PM",
        title: "Standard Camp",
        description:
          "Henna painting, Arabic coffee, dates, shisha and unlimited refreshments at the Standard Camp.",
      },
      {
        time: "7:30 PM",
        title: "Self-Service BBQ Dinner",
        description:
          "International BBQ buffet with full vegetarian spread at the Standard Camp.",
      },
      {
        time: "8:00 PM",
        title: "Live Entertainment",
        description: "Belly-dance, tanoura and fire shows in the camp.",
      },
      {
        time: "9:00 PM",
        title: "Private Drop-off",
        description: "Return to your Dubai city hotel in your private 4x4.",
      },
    ],
    faqs: [
      {
        question: "Is it truly private?",
        answer:
          "Yes — your group has a dedicated vehicle and driver. You are not joined by other guests.",
      },
      {
        question: "How many people can join?",
        answer:
          "The price covers 2 persons. Additional guests can be accommodated — contact us via WhatsApp for group pricing.",
      },
      {
        question: "Can we customise the schedule?",
        answer:
          "As a private booking, we can flex timing and stops within the overall programme. Message us in advance.",
      },
    ],
    cancellationPolicy:
      "Free cancellation up to 24 hours before the experience. No refund for cancellations within 24 hours.",
  },

  {
    slug: "premium-camp-safari",
    name: "Premium Camp Safari",
    categorySlug: "with-camp",
    shortDesc:
      "Upgrade to a Premium Camp and premium dinner for a noticeably more comfortable, higher-quality desert evening — private 4x4 throughout.",
    description:
      "The Premium Camp Safari elevates the classic desert experience with a step-up camp and premium self-service dinner. Your private 4x4 Land Cruiser collects your group at 1:45–2:15 PM for 30–40 minutes of Red Dunes dune bashing in the Al Habab desert. Sandboarding, a camel ride, henna painting and the desert sunset follow at your own pace. The Premium Camp offers nicer seating, décor and atmosphere, with a premium BBQ buffet dinner — richer selections, better presentation — served alongside unlimited drinks and shisha. Live belly-dance, tanoura and fire shows complete the evening.",
    durationMinutes: 420,
    pickupTime: "1:45 PM – 2:15 PM",
    meetingPoint: "Hotel pickup (Dubai city area)",
    priceAdult: 799,
    priceChild: 0,
    priceInfant: 0,
    currency: "AED",
    rating: 4.7,
    reviewCount: 289,
    isFeatured: false,
    tag: "Premium",
    priceUnit: "2 persons · private",
    pricingNote: "Price for 2 persons · private vehicle",
    gallery: [GRADIENTS.gold, GRADIENTS.ember, GRADIENTS.sunset],
    image: "/Images/stock/tours/premium-camp-safari.jpg",
    inclusions: [
      "Private 4x4 Land Cruiser pickup & drop-off",
      "30–40 min Red Dunes dune bashing (Al Habab desert)",
      "Sandboarding",
      "Camel ride",
      "Sunset photography stop",
      "Henna painting",
      "Unlimited tea, coffee, soft drinks & water",
      "Shisha (hookah)",
      "Premium self-service BBQ dinner & buffet",
      "Vegetarian buffet",
      "Live belly-dance show",
      "Tanoura show",
      "Fire show",
    ],
    exclusions: [
      "Quad bike / buggy rides (available as add-ons)",
      "Alcoholic beverages",
      "Gratuities",
    ],
    itinerary: [
      {
        time: "1:45 PM",
        title: "Private Hotel Pickup",
        description:
          "Private 4x4 Land Cruiser collects your group (pickup window 1:45–2:15 PM).",
      },
      {
        time: "3:00 PM",
        title: "Red Dunes Dune Bashing",
        description:
          "30–40 minutes of exhilarating dune bashing across the Al Habab red dunes.",
      },
      {
        time: "4:00 PM",
        title: "Desert Activities",
        description: "Sandboarding and a camel ride in the dunes.",
      },
      {
        time: "5:30 PM",
        title: "Sunset Stop",
        description:
          "Photograph the spectacular Al Habab sunset from the dunes.",
      },
      {
        time: "6:00 PM",
        title: "Premium Camp",
        description:
          "Henna painting, Arabic coffee and dates, shisha and unlimited drinks at the Premium Camp.",
      },
      {
        time: "7:30 PM",
        title: "Premium Dinner",
        description:
          "Self-service premium BBQ buffet with enhanced menu selections and full vegetarian spread.",
      },
      {
        time: "8:00 PM",
        title: "Live Shows",
        description: "Belly-dance, tanoura and fire performances.",
      },
      {
        time: "9:00 PM",
        title: "Return",
        description: "Private drop-off at your Dubai city hotel.",
      },
    ],
    faqs: [
      {
        question: "What makes this different from the Private Desert Safari?",
        answer:
          "The Premium Camp has upgraded décor, seating and ambience compared to the Standard Camp, and the buffet dinner features a richer, higher-quality selection.",
      },
      {
        question: "Is the vehicle private?",
        answer:
          "Yes — you have a dedicated private 4x4 Land Cruiser for your group throughout.",
      },
    ],
    cancellationPolicy:
      "Free cancellation up to 24 hours before the experience. No refund for cancellations within 24 hours.",
  },

  {
    slug: "vip-bedouin-camp",
    name: "VIP Bedouin Camp",
    categorySlug: "with-camp",
    shortDesc:
      "A step into authentic Bedouin luxury — private 4x4, VIP Bedouin Camp and full VIP table-service dinner under the stars.",
    description:
      "The VIP Bedouin Camp Safari brings together private transport, the drama of the Al Habab red dunes and the intimacy of a genuine VIP Bedouin camp experience. After pickup at 1:45–2:15 PM, your private 4x4 Land Cruiser heads to the dunes for 30–40 minutes of thrilling dune bashing. Sandboarding, a camel ride and henna painting follow, building anticipation for the camp. At the VIP Bedouin Camp, you are welcomed with Arabic coffee and dates before taking your dedicated VIP table. Dinner is served to you — a full BBQ and international buffet with vegetarian options, delivered table-side. The evening concludes with belly-dance, tanoura and fire shows in the camp before your private transfer home.",
    durationMinutes: 420,
    pickupTime: "1:45 PM – 2:15 PM",
    meetingPoint: "Hotel pickup (Dubai city area)",
    priceAdult: 899,
    priceChild: 0,
    priceInfant: 0,
    currency: "AED",
    rating: 4.8,
    reviewCount: 178,
    isFeatured: false,
    tag: "VIP",
    priceUnit: "2 persons · private",
    pricingNote: "Price for 2 persons · private vehicle",
    gallery: [GRADIENTS.gold, GRADIENTS.night, GRADIENTS.dusk],
    image: "/Images/stock/tours/vip-bedouin-camp.jpg",
    inclusions: [
      "Private 4x4 Land Cruiser pickup & drop-off",
      "30–40 min Red Dunes dune bashing (Al Habab desert)",
      "Sandboarding",
      "Camel ride",
      "Sunset photography stop",
      "Henna painting",
      "Unlimited tea, coffee, soft drinks & water",
      "Shisha (hookah)",
      "VIP Bedouin Camp with dedicated VIP table",
      "VIP table-service BBQ dinner — international buffet",
      "Vegetarian buffet",
      "Live belly-dance show",
      "Tanoura show",
      "Fire show",
    ],
    exclusions: [
      "Quad bike / buggy rides (available as add-ons)",
      "Alcoholic beverages",
      "Gratuities",
    ],
    itinerary: [
      {
        time: "1:45 PM",
        title: "Private Pickup",
        description:
          "Your private 4x4 collects your group from your Dubai city hotel (window 1:45–2:15 PM).",
      },
      {
        time: "3:00 PM",
        title: "Dune Bashing",
        description:
          "30–40 minutes of expert-guided dune bashing on the Al Habab red dunes.",
      },
      {
        time: "4:00 PM",
        title: "Sandboarding & Camel Ride",
        description:
          "Sandboard and ride camels privately — no waiting, no sharing.",
      },
      {
        time: "5:30 PM",
        title: "Sunset at the Dunes",
        description: "Capture the golden-hour desert sunset from the dunes.",
      },
      {
        time: "6:00 PM",
        title: "VIP Bedouin Camp",
        description:
          "Welcomed with Arabic coffee and dates at your dedicated VIP table; henna painting and shisha available.",
      },
      {
        time: "7:30 PM",
        title: "VIP Table-Service Dinner",
        description:
          "BBQ and international buffet served to your table by dedicated staff; full vegetarian spread included.",
      },
      {
        time: "8:00 PM",
        title: "Live Shows",
        description: "Belly-dance, tanoura and fire shows in the camp.",
      },
      {
        time: "9:00 PM",
        title: "Private Drop-off",
        description: "Return to your hotel in your private 4x4.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between VIP table service and self-service?",
        answer:
          "With VIP table service, food and drinks are brought to your dedicated table by staff. Self-service means you serve yourself from the buffet.",
      },
      {
        question: "Is a VIP table guaranteed?",
        answer:
          "Yes — your VIP Bedouin Camp table is reserved exclusively for your group throughout the evening.",
      },
    ],
    cancellationPolicy:
      "Free cancellation up to 24 hours before the experience. No refund for cancellations within 24 hours.",
  },

  {
    slug: "luxury-5star-vip-camp",
    name: "Luxury 5-Star VIP Camp",
    categorySlug: "with-camp",
    shortDesc:
      "Our most popular upgrade — 5-star luxury VIP camp, premium dinner, VIP table service and 10+ live traditional shows. Private 4x4 throughout.",
    description:
      "The Luxury 5-Star VIP Camp is the sweet spot between extravagance and value — and our guests' top-rated package. Your private 4x4 Land Cruiser departs at 1:45–2:15 PM for 30–40 minutes of Red Dunes dune bashing at Al Habab. Sandboarding, a camel ride and henna painting follow at your leisure. As the sun sets over the dunes, your driver delivers you to a 5-star luxury VIP camp where a reserved VIP table awaits. A premium dinner is served to you table-side by attentive staff, and the night unfolds with more than 10 live traditional shows — belly-dancing, tanoura, fire performances and more — creating an immersive Arabian evening that far exceeds the standard camp experience.",
    durationMinutes: 420,
    pickupTime: "1:45 PM – 2:15 PM",
    meetingPoint: "Hotel pickup (Dubai city area)",
    priceAdult: 1200,
    priceChild: 0,
    priceInfant: 0,
    currency: "AED",
    rating: 4.9,
    reviewCount: 634,
    isFeatured: true,
    tag: "Best Value",
    priceUnit: "2 persons · private",
    regularPrice: 1400,
    pricingNote: "Price for 2 persons · private vehicle",
    gallery: [GRADIENTS.gold, GRADIENTS.fusion, GRADIENTS.night],
    image: "/Images/stock/tours/luxury-5star-vip-camp.jpg",
    inclusions: [
      "Private 4x4 Land Cruiser pickup & drop-off",
      "30–40 min Red Dunes dune bashing (Al Habab desert)",
      "Sandboarding",
      "Camel ride",
      "Sunset photography stop",
      "Henna painting",
      "Unlimited tea, coffee, soft drinks & water",
      "Shisha (hookah)",
      "5-star luxury VIP camp with dedicated VIP table",
      "VIP table-service premium dinner — international buffet",
      "Vegetarian buffet",
      "10+ live traditional shows (belly-dance, tanoura, fire & more)",
    ],
    exclusions: [
      "Quad bike / buggy rides (available as add-ons)",
      "Alcoholic beverages",
      "Gratuities",
    ],
    itinerary: [
      {
        time: "1:45 PM",
        title: "Private Pickup",
        description:
          "Private 4x4 Land Cruiser collects your group (pickup window 1:45–2:15 PM).",
      },
      {
        time: "3:00 PM",
        title: "Red Dunes Dune Bashing",
        description:
          "30–40 minutes of exhilarating private dune bashing at Al Habab.",
      },
      {
        time: "4:00 PM",
        title: "Desert Activities",
        description: "Private sandboarding and camel ride in the dunes.",
      },
      {
        time: "5:30 PM",
        title: "Desert Sunset",
        description:
          "Watch the iconic desert sunset — the perfect photography moment.",
      },
      {
        time: "6:00 PM",
        title: "5-Star VIP Camp Arrival",
        description:
          "Enter the 5-star luxury VIP camp; Arabic coffee, dates, shisha and henna painting at your VIP table.",
      },
      {
        time: "7:30 PM",
        title: "Premium VIP Table-Service Dinner",
        description:
          "Premium BBQ and international buffet with full vegetarian spread, served to your table by staff.",
      },
      {
        time: "8:00 PM",
        title: "10+ Live Traditional Shows",
        description:
          "An extended programme of belly-dancing, tanoura, fire shows and more live performances.",
      },
      {
        time: "9:30 PM",
        title: "Private Drop-off",
        description: "Return to your Dubai city hotel in your private 4x4.",
      },
    ],
    faqs: [
      {
        question: "Why is this called Best Value?",
        answer:
          "It offers 5-star VIP camp facilities, premium dinner, table service and 10+ shows at a price lower than comparable experiences — regularly priced at AED 1,400, now AED 1,200 for two.",
      },
      {
        question: "How many shows are included?",
        answer:
          "More than 10 live traditional performances across belly-dancing, tanoura, fire shows and additional cultural acts.",
      },
      {
        question: "Is this suitable for a special occasion?",
        answer:
          "Absolutely. The VIP setting and extended entertainment programme make it ideal for anniversaries, birthdays and celebrations.",
      },
    ],
    cancellationPolicy:
      "Free cancellation up to 24 hours before the experience. No refund for cancellations within 24 hours.",
  },

  {
    slug: "noble-camp-safari",
    name: "Noble Camp Experience",
    categorySlug: "with-camp",
    shortDesc:
      "Our most luxurious camp package — the Luxury Noble Camp, premium dinner and 12 live traditional shows. Private 4x4 for your group.",
    description:
      "The Noble Camp Experience is the pinnacle of the MyDubaiSafarii desert portfolio. Your private 4x4 Land Cruiser departs at 1:45–2:15 PM for 30–40 minutes of private Red Dunes dune bashing at Al Habab — sandboarding, a camel ride and henna painting follow in total privacy. As dusk settles over the dunes, you are welcomed into the exclusive Luxury Noble Camp, where a premium self-service dinner awaits: an elevated BBQ and international buffet with a full vegetarian spread. Twelve live traditional shows — more than any other package — fill the night with belly-dancing, tanoura, fire performances and additional cultural acts, creating an evening of unrivalled Arabian hospitality.",
    durationMinutes: 450,
    pickupTime: "1:45 PM – 2:15 PM",
    meetingPoint: "Hotel pickup (Dubai city area)",
    priceAdult: 1499,
    priceChild: 0,
    priceInfant: 0,
    currency: "AED",
    rating: 4.9,
    reviewCount: 96,
    isFeatured: false,
    tag: "Luxury",
    priceUnit: "2 persons · private",
    pricingNote: "Price for 2 persons · private vehicle",
    gallery: [GRADIENTS.night, GRADIENTS.gold, GRADIENTS.dusk],
    image: "/Images/stock/tours/noble-camp-safari.jpg",
    inclusions: [
      "Private 4x4 Land Cruiser pickup & drop-off",
      "30–40 min Red Dunes dune bashing (Al Habab desert)",
      "Sandboarding",
      "Camel ride",
      "Sunset photography stop",
      "Henna painting",
      "Unlimited tea, coffee, soft drinks & water",
      "Shisha (hookah)",
      "Luxury Noble Camp",
      "Premium self-service BBQ dinner — international buffet",
      "Vegetarian buffet",
      "12 live traditional shows (belly-dance, tanoura, fire & more)",
    ],
    exclusions: [
      "Quad bike / buggy rides (available as add-ons)",
      "Alcoholic beverages",
      "Gratuities",
    ],
    itinerary: [
      {
        time: "1:45 PM",
        title: "Private Pickup",
        description:
          "Private 4x4 Land Cruiser collects your group (pickup window 1:45–2:15 PM).",
      },
      {
        time: "3:00 PM",
        title: "Red Dunes Dune Bashing",
        description:
          "30–40 minutes of exhilarating private dune bashing on the Al Habab red dunes.",
      },
      {
        time: "4:00 PM",
        title: "Desert Activities",
        description: "Private sandboarding, camel ride and desert photography.",
      },
      {
        time: "5:30 PM",
        title: "Sunset Photography",
        description:
          "Capture the most dramatic desert sunset from the crest of the dunes.",
      },
      {
        time: "6:00 PM",
        title: "Luxury Noble Camp",
        description:
          "Welcomed into the exclusive Noble Camp; henna painting, Arabic coffee, dates and shisha.",
      },
      {
        time: "7:30 PM",
        title: "Premium Self-Service Dinner",
        description:
          "Elevated BBQ and international buffet with premium menu selections and full vegetarian spread.",
      },
      {
        time: "8:00 PM",
        title: "12 Live Traditional Shows",
        description:
          "The evening's full programme of belly-dancing, tanoura, fire shows and further cultural performances — 12 acts in total.",
      },
      {
        time: "9:30 PM",
        title: "Private Drop-off",
        description: "Return to your Dubai city hotel in your private 4x4.",
      },
    ],
    faqs: [
      {
        question: "What makes the Noble Camp different from the 5-Star VIP Camp?",
        answer:
          "The Noble Camp is the highest-tier venue we offer: the most luxurious décor, furnishings and atmosphere, with 12 live shows (vs 10+) and premium self-service dinner.",
      },
      {
        question: "Is dinner self-service or table-service?",
        answer:
          "Dinner at the Noble Camp is premium self-service — an elevated buffet you serve yourself from, with a richer selection than standard packages.",
      },
    ],
    cancellationPolicy:
      "Free cancellation up to 48 hours before the experience. No refund for cancellations within 48 hours.",
  },

  // ─── Safari-Only Packages ─────────────────────────────────────────────────

  {
    slug: "afternoon-desert-safari",
    name: "Afternoon Desert Safari (No Camp)",
    categorySlug: "safari-only",
    shortDesc:
      "Pure dune-bashing action — private 4x4, Red Dunes, sandboarding, camel ride and desert photography. No camp, no dinner. Back in 4 hours.",
    description:
      "For guests who want the thrill of the dunes without an evening in camp, the Afternoon Desert Safari delivers exactly that: 4 hours of private desert adventure. Your private 4x4 Land Cruiser picks you up at 1:45–2:15 PM and heads straight to the Al Habab red dunes for 30–40 minutes of expert-guided dune bashing. Sandboarding, a camel ride and stunning desert photography opportunities follow, with your driver on hand for the best sunset vantage points before the return drive to your hotel. No camp, no dinner — just the pure desert experience in total privacy.",
    durationMinutes: 240,
    pickupTime: "1:45 PM – 2:15 PM",
    meetingPoint: "Hotel pickup (Dubai city area)",
    priceAdult: 650,
    priceChild: 0,
    priceInfant: 0,
    currency: "AED",
    rating: 4.7,
    reviewCount: 318,
    isFeatured: true,
    tag: "Private · No Camp",
    priceUnit: "2 persons · private",
    pricingNote: "Price for 2 persons · private vehicle",
    gallery: [GRADIENTS.ember, GRADIENTS.sunset, GRADIENTS.fusion],
    image: "/Images/stock/tours/afternoon-desert-safari.jpg",
    inclusions: [
      "Private 4x4 Land Cruiser pickup & drop-off",
      "30–40 min Red Dunes dune bashing (Al Habab desert)",
      "Sandboarding",
      "Camel ride",
      "Desert & sunset photography stops",
    ],
    exclusions: [
      "Camp, dinner or evening entertainment",
      "Quad bike / buggy rides (available as add-ons)",
      "Alcoholic beverages",
      "Gratuities",
    ],
    itinerary: [
      {
        time: "1:45 PM",
        title: "Private Hotel Pickup",
        description:
          "Private 4x4 Land Cruiser collects your group (pickup window 1:45–2:15 PM).",
      },
      {
        time: "3:00 PM",
        title: "Red Dunes Dune Bashing",
        description:
          "30–40 minutes of private, expert-guided dune bashing on the Al Habab red dunes.",
      },
      {
        time: "4:00 PM",
        title: "Sandboarding & Camel Ride",
        description:
          "Try sandboarding and enjoy a camel ride in the dunes — your private driver manages the timing.",
      },
      {
        time: "5:30 PM",
        title: "Sunset Photography",
        description:
          "Your driver positions the 4x4 at the best dune crest for golden-hour desert photography.",
      },
      {
        time: "6:00 PM",
        title: "Return to Hotel",
        description:
          "Private drop-off at your Dubai city hotel (approx. 6:00–6:30 PM).",
      },
    ],
    faqs: [
      {
        question: "Why would I choose this over a camp package?",
        answer:
          "Ideal if you have dinner plans, prefer a shorter outing, or simply want the pure dune-bashing experience without the camp evening.",
      },
      {
        question: "Are refreshments included?",
        answer:
          "No meals or drinks are provided on this package. We recommend bringing water.",
      },
      {
        question: "Can I add a camp dinner later?",
        answer:
          "This package is designed as a standalone safari. If you'd like camp and dinner, consider upgrading to one of our with-camp packages.",
      },
    ],
    cancellationPolicy:
      "Free cancellation up to 24 hours before the experience. No refund for cancellations within 24 hours.",
  },

  {
    slug: "morning-desert-safari",
    name: "Morning Desert Safari",
    categorySlug: "safari-only",
    shortDesc:
      "Cool, uncrowded and spectacular — private 4x4, 20–30 min Red Dunes dune bashing, camel ride and desert photography. Back by noon.",
    description:
      "The morning is the desert's best-kept secret: cooler air, pristine dune ridges and far fewer crowds. Your private 4x4 Land Cruiser picks you up at 8:00 AM and heads to the Al Habab red dunes for 20–30 minutes of energetic dune bashing. A camel ride and sandboarding session follow, with the driver capturing the unique quality of morning desert light for your photos. The four-hour excursion leaves your afternoon and evening completely free — ideal for guests with tight itineraries or those who want the desert experience without sacrificing dinner plans. No camp, no evening entertainment — just the pure joy of the morning dunes.",
    durationMinutes: 240,
    pickupTime: "8:00 AM",
    meetingPoint: "Hotel pickup (Dubai city area)",
    priceAdult: 600,
    priceChild: 0,
    priceInfant: 0,
    currency: "AED",
    rating: 4.6,
    reviewCount: 284,
    isFeatured: true,
    tag: "Morning Special",
    priceUnit: "2 persons · private",
    pricingNote: "Price for 2 persons · private vehicle",
    gallery: [GRADIENTS.sunset, GRADIENTS.ember, GRADIENTS.dusk],
    image: "/Images/stock/tours/morning-desert-safari.jpg",
    inclusions: [
      "Private 4x4 Land Cruiser pickup & drop-off",
      "20–30 min Red Dunes dune bashing (Al Habab desert)",
      "Camel ride",
      "Sandboarding",
      "Desert photography stops",
    ],
    exclusions: [
      "Camp, meals or entertainment",
      "Quad bike / buggy rides (available as add-ons)",
      "Alcoholic beverages",
      "Gratuities",
    ],
    itinerary: [
      {
        time: "8:00 AM",
        title: "Private Hotel Pickup",
        description:
          "Your private 4x4 Land Cruiser collects your group at 8:00 AM sharp.",
      },
      {
        time: "9:00 AM",
        title: "Red Dunes Dune Bashing",
        description:
          "20–30 minutes of expert morning dune bashing across the Al Habab red dunes.",
      },
      {
        time: "9:45 AM",
        title: "Camel Ride & Sandboarding",
        description:
          "Enjoy a camel ride and sandboard down the pristine morning dunes.",
      },
      {
        time: "10:30 AM",
        title: "Desert Photography",
        description:
          "Capture the soft morning light on the rippled dune surfaces — stunning for photography.",
      },
      {
        time: "12:00 PM",
        title: "Return to Hotel",
        description:
          "Private drop-off at your Dubai city hotel by noon, leaving your day free.",
      },
    ],
    faqs: [
      {
        question: "Why is dune bashing shorter in the morning?",
        answer:
          "Morning dune bashing is 20–30 minutes (vs 30–40 in the afternoon) — the morning desert is pristine and the cooler air still makes for a great ride; shorter duration keeps the excursion manageable before the heat builds.",
      },
      {
        question: "Is this suitable for families with young children?",
        answer:
          "Yes — the cooler morning temperature makes it much more comfortable for families. Dune bashing is not recommended for children under 3 or pregnant guests.",
      },
      {
        question: "Are meals or refreshments provided?",
        answer:
          "No meals or drinks are included. We recommend eating before pickup and bringing water.",
      },
    ],
    cancellationPolicy:
      "Free cancellation up to 24 hours before the experience. No refund for cancellations within 24 hours.",
  },
];
