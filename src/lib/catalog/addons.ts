export type AddonOption = { label: string; price: number };

export type Addon = {
  id: string;
  name: string;
  durationMin: number;
  /** Display string for the info section on /tours */
  priceLabel: string;
  /** Concrete price choices used for the booking calculator */
  options: AddonOption[];
  note?: string;
};

export const ADDONS: Addon[] = [
  {
    id: "quad-bike",
    name: "Quad Bike",
    durationMin: 30,
    priceLabel: "AED 150 / 200 / 250",
    note: "By engine power · 1–2 riders can share",
    options: [
      { label: "150cc", price: 150 },
      { label: "200cc", price: 200 },
      { label: "250cc", price: 250 },
    ],
  },
  {
    id: "buggy-4seater",
    name: "4-Seater Buggy",
    durationMin: 30,
    priceLabel: "AED 600 / 700",
    options: [
      { label: "Standard", price: 600 },
      { label: "Premium", price: 700 },
    ],
  },
  {
    id: "polaris-rzr",
    name: "Polaris RZR 1000cc",
    durationMin: 30,
    priceLabel: "AED 600 (2-seater) / 800 (4-seater)",
    options: [
      { label: "2-seater", price: 600 },
      { label: "4-seater", price: 800 },
    ],
  },
  {
    id: "powerful-buggy",
    name: "Powerful 2-Seater Buggy",
    durationMin: 30,
    priceLabel: "AED 700–900",
    options: [
      { label: "AED 700", price: 700 },
      { label: "AED 800", price: 800 },
      { label: "AED 900", price: 900 },
    ],
  },
  {
    id: "canam-buggy",
    name: "Can-Am Buggy",
    durationMin: 30,
    priceLabel: "AED 1,200–1,400",
    options: [
      { label: "AED 1,200", price: 1200 },
      { label: "AED 1,400", price: 1400 },
    ],
  },
];
