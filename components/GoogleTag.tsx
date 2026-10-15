'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

// Add this once, in app/layout.tsx, inside <head> (or right after it) —
// it needs to run on every page, so it belongs in the root layout, not
// per-page.
export function GoogleTag() {
  if (!GA_MEASUREMENT_ID && !GOOGLE_ADS_ID) {
    // Neither env var is set yet — render nothing rather than loading a
    // broken gtag.js with no destination. Once you've created the GA4
    // property and Google Ads conversion action, set:
    //   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
    //   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID || GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;

          // Consent Mode v2 — default to denied until the visitor accepts
          // the cookie banner. Google still loads and pings gtag.js in this
          // state (for conversion modeling) but won't set ad/analytics
          // cookies or send identifying data until consent is granted.
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
          });

          gtag('js', new Date());

          ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ''}
          ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
        `}
      </Script>
    </>
  );
}