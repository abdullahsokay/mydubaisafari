import { readdirSync } from "fs";
import { join } from "path";

/** Reads desert activity videos (buggy/jeep/camel) from public/Images/buggy-jeep-camel/. */
export function getActivityVideos(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public/Images/buggy-jeep-camel"))
      .filter((f) => /\.(mp4|webm|mov)$/i.test(f))
      .sort()
      .map((f) => `/Images/buggy-jeep-camel/${f}`);
  } catch {
    return [];
  }
}
