/**
 * Generates a slug -> blurDataURL map for every raster image in public/Images.
 *
 * next/image can only derive a blurDataURL automatically from a *statically
 * imported* image. Every image on this site is referenced by a runtime string
 * (tour/blog data files), so `placeholder="blur"` needs an explicit value —
 * that's what this map provides.
 *
 * Run via `npm run blurmap` after adding or replacing images.
 * Output: src/lib/blur-map.json (committed, so builds stay hermetic).
 */
import { readdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "Images");
const OUT_FILE = path.join(ROOT, "src", "lib", "blur-map.json");

const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/** Poster frames are only ever used as the <video poster>, never blurred. */
const isPoster = (f) => f.endsWith(".poster.webp");

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (EXTS.has(path.extname(entry.name).toLowerCase()) && !isPoster(entry.name))
      out.push(full);
  }
  return out;
}

/**
 * 10px wide, quality 20. Small enough that ~120 entries stay a few KB
 * gzipped, big enough to carry the image's colour composition.
 */
async function blurFor(file) {
  const buf = await sharp(file)
    .resize(10, null, { fit: "inside" })
    .webp({ quality: 20 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

const files = await walk(IMAGES_DIR);
const map = {};
let failed = 0;

await Promise.all(
  files.map(async (file) => {
    // Key by public URL path ("/Images/..."), matching how src is written in JSX.
    const key = "/" + path.relative(PUBLIC_DIR, file).split(path.sep).join("/");
    try {
      map[key] = await blurFor(file);
    } catch (err) {
      failed++;
      console.warn(`  skip ${key}: ${err.message}`);
    }
  }),
);

// Sort keys so the file has a stable diff between runs.
const sorted = Object.fromEntries(Object.keys(map).sort().map((k) => [k, map[k]]));
await writeFile(OUT_FILE, JSON.stringify(sorted, null, 2) + "\n");

const bytes = (await stat(OUT_FILE)).size;
console.log(
  `blur-map: ${Object.keys(sorted).length} images -> ${(bytes / 1024).toFixed(1)}KB` +
    (failed ? ` (${failed} failed)` : ""),
);
