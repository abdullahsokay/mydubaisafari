# Blog Post Frontmatter Schema

Each `.md` file in this directory (excluding files starting with `_`) is a blog post.

## Required Fields

```yaml
title: string          # Full post title (H1)
category: string       # Category slug (see lib/blog/categories.ts)
date: string           # ISO date "YYYY-MM-DD"
author: string         # Author name
excerpt: string        # Short description (1–2 sentences) for cards & meta
cover: string          # Path to cover image e.g. /Images/sand.jpg
```

## Optional Fields

```yaml
location: string       # e.g. "Dubai, UAE" — triggers Google Map embed
relatedTours:          # Array of tour slugs to show in "Related Tours" section
  - tour-slug-1
  - tour-slug-2
faqs:                  # FAQ pairs — rendered as FAQ section + FAQPage JSON-LD
  - q: "Question?"
    a: "Answer."
```

## Body Conventions

- Use `##` for H2 sections and `###` for H3 sub-sections
- Internal links to `/tours` and other blog posts are encouraged
- End with a soft CTA mentioning MyDubaiSafarii
- Aim for 600–800 words for good SEO coverage
