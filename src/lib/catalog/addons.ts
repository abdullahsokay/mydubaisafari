export type Addon = {
  name: string;
  durationMin: number;
  priceLabel: string;
  note?: string;
};

export const ADDONS: Addon[] = [
  {
    name: "Quad Bike",
    durationMin: 30,
    priceLabel: "AED 150 / 200 / 250",
    note: "By engine power · 1–2 riders can share",
  },
  {
    name: "4-Seater Buggy",
    durationMin: 30,
    priceLabel: "AED 600 / 700",
  },
  {
    name: "Polaris RZR 1000cc",
    durationMin: 30,
    priceLabel: "AED 600 (2-seater) / 800 (4-seater)",
  },
  {
    name: "Powerful 2-Seater Buggy",
    durationMin: 30,
    priceLabel: "AED 700–900",
  },
  {
    name: "Can-Am Buggy",
    durationMin: 30,
    priceLabel: "AED 1,200–1,400",
  },
];
