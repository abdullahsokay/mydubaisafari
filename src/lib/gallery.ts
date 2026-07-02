import { readdirSync } from "fs";
import { join } from "path";

/** Reads the home "Moments from the Desert" gallery from public/Images/desert-safari/. */
export function getGalleryImages(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public/Images/desert-safari"))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/Images/desert-safari/${f}`);
  } catch {
    return [];
  }
}
