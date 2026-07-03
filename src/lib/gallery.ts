import { readdirSync } from "fs";
import { join } from "path";

/**
 * Photos used as large editorial plates on /about — excluded from the home
 * marquee so no image appears twice on the site.
 */
const RESERVED = new Set([
  "631414459_18064862606654255_9132147263810183976_n.jpg",
  "640247413_18065993912654255_5399607698326251875_n.jpg",
  "641262509_18065993909654255_583259857927294763_n.jpg",
]);

/** Reads the home "Moments from the Desert" gallery from public/Images/desert-safari/. */
export function getGalleryImages(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public/Images/desert-safari"))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !RESERVED.has(f))
      .sort()
      .map((f) => `/Images/desert-safari/${f}`);
  } catch {
    return [];
  }
}
