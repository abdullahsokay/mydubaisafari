import Script from "next/script";

/**
 * Google Analytics 4 — loaded only when NEXT_PUBLIC_GA_ID is set (e.g. on
 * Vercel). Renders nothing otherwise, so it is safe to ship before the
 * property exists. Set the env var to your Measurement ID (G-XXXXXXXXXX).
 *
 * Loaded `afterInteractive` so it never blocks first paint. Note: the CSP in
 * next.config.ts must allow googletagmanager.com / google-analytics.com.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
