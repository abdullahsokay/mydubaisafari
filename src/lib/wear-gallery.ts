import { readdirSync } from "fs";
import { join } from "path";

/** Reads guest outfit photos from public/Images/wear/. Empty if dir missing. */
export function getWearImages(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public/Images/wear"))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/Images/wear/${f}`);
  } catch {
    return [];
  }
}
