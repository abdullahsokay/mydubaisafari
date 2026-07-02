import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

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
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob: data:",
              "frame-src 'self' https://maps.google.com https://www.google.com",
              "connect-src 'self' https://api.open-meteo.com",
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
