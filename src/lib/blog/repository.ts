import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked, Renderer } from "marked";
import DOMPurify from "isomorphic-dompurify";

export interface PostMeta {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  cover: string;
  readingTime: string;
  location?: string;
  relatedTours?: string[];
  faqs?: { q: string; a: string }[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Post extends PostMeta {
  html: string;
  toc: TocItem[];
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function computeReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200) + " min read";
}

function parsePost(filename: string): PostMeta {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    category: data.category ?? "",
    date: data.date ?? "",
    author: data.author ?? "MyDubaiSafarii Team",
    excerpt: data.excerpt ?? "",
    cover: data.cover ?? "/Images/sand.jpg",
    readingTime: computeReadingTime(content),
    location: data.location,
    relatedTours: data.relatedTours,
    faqs: data.faqs,
  };
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  return files
    .map((f) => parsePost(f))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function listPostSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, slug + ".md");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: data.title ?? slug,
    category: data.category ?? "",
    date: data.date ?? "",
    author: data.author ?? "MyDubaiSafarii Team",
    excerpt: data.excerpt ?? "",
    cover: data.cover ?? "/Images/sand.jpg",
    readingTime: computeReadingTime(content),
    location: data.location,
    relatedTours: data.relatedTours,
    faqs: data.faqs,
  };

  const toc: TocItem[] = [];
  const seen = new Map<string, number>();
  const renderer = new Renderer();
  renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
    if (depth === 2 || depth === 3) {
      const base = slugifyHeading(text);
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      const id = n === 0 ? base : `${base}-${n + 1}`;
      toc.push({ id, text, level: depth });
      return `<h${depth} id="${id}">${text}</h${depth}>`;
    }
    return `<h${depth}>${text}</h${depth}>`;
  };
  const rawHtml = await marked.parse(content, { renderer });

  // Sanitize: allow standard formatting + media/iframe, strip scripts and js: URLs
  const html = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "a", "ul", "ol", "li", "blockquote",
      "strong", "em", "b", "i", "code", "pre",
      "br", "hr", "table", "thead", "tbody", "tr", "th", "td",
      "img", "figure", "figcaption",
      "video", "source", "iframe",
      "div", "span", "section", "article",
    ],
    ALLOWED_ATTR: [
      "href", "src", "alt", "title", "class", "id",
      "width", "height", "style", "loading", "decoding",
      "allowfullscreen", "referrerpolicy", "frameborder",
      "controls", "autoplay", "loop", "muted", "playsinline",
      "type", "target", "rel",
    ],
    ALLOW_DATA_ATTR: false,
  });

  return { ...meta, html, toc };
}

export function getRelatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, limit);
}
