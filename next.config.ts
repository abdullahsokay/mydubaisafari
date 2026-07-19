import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // A stray package-lock.json in a parent dir (C:\Users\User) makes Next infer
  // the wrong workspace root. Pin it to this project so module resolution and
  // file watching stay scoped here.
  turbopack: {
    root: projectRoot,
  },

  images: {
    // Serve AVIF first (best compression), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Tour/blog photos are immutable files — cache optimized variants long.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // /blog is dynamic and reads src/content/blog at request time; Next can't
  // trace that dynamic fs path, so bundle the markdown into the serverless
  // function (fixes the 500 on the blog index in production).
  outputFileTracingIncludes: {
    "/blog": ["./src/content/blog/**/*"],
    "/blog/[slug]": ["./src/content/blog/**/*"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=()",
          },
          {
            // Allows:
            //  - self for all fetch/scripts/styles
            //  - Google Maps iframes (maps.google.com, *.google.com)
            //  - WhatsApp links open in new tab (no frame embed needed)
            //  - open-meteo API fetch (connect-src)
            //  - data: and blob: for canvas and inline video
            //  - fonts.googleapis.com / fonts.gstatic.com for next/font
            //  - Google Analytics 4: script from googletagmanager.com,
            //    beacons/config to google-analytics.com + analytics.google.com
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob: data:",
              "frame-src 'self' https://maps.google.com https://www.google.com",
              "connect-src 'self' https://api.open-meteo.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://wa.me",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
