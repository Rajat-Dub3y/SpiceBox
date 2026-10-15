// Thin wrappers around window.gtag so every call site logs consistently
// and doesn't need its own "is gtag loaded yet" check.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function callGtag(...args: unknown[]) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    // gtag.js hasn't loaded yet (e.g. ad blocker, or fired before Script
    // finished) — log and skip rather than throwing.
    console.warn('[gtag] window.gtag not available, skipping event:', args);
    return;
  }
  window.gtag(...args);
}

export function trackViewItem(params: {
  itemId: string;
  itemName: string;
  price: number; // dollars
  currency?: string;
}) {
  callGtag('event', 'view_item', {
    currency: params.currency || 'USD',
    value: params.price,
    items: [
      {
        item_id: params.itemId,
        item_name: params.itemName,
        price: params.price,
        quantity: 1,
      },
    ],
  });
}

export function trackBeginCheckout(params: {
  itemId: string;
  itemName: string;
  price: number;
  currency?: string;
}) {
  callGtag('event', 'begin_checkout', {
    currency: params.currency || 'USD',
    value: params.price,
    items: [
      {
        item_id: params.itemId,
        item_name: params.itemName,
        price: params.price,
        quantity: 1,
      },
    ],
  });
}

export function trackPurchase(params: {
  transactionId: string;
  value: number; // dollars
  currency?: string;
  itemId: string;
  itemName: string;
  buyerEmail?: string | null;
}) {
  const currency = params.currency || 'USD';

  // GA4 purchase event
  callGtag('event', 'purchase', {
    transaction_id: params.transactionId,
    value: params.value,
    currency,
    items: [
      {
        item_id: params.itemId,
        item_name: params.itemName,
        price: params.value,
        quantity: 1,
      },
    ],
  });

  // Enhanced Conversions: pass the buyer's email (unhashed) via
  // gtag('set', 'user_data', ...) — Google's tag hashes it (SHA-256)
  // client-side before it's ever sent. Do NOT hash this yourself; passing
  // an already-hashed value here causes a double-hash and breaks matching.
  if (params.buyerEmail) {
    callGtag('set', 'user_data', {
      email: params.buyerEmail,
    });
  }

  // Google Ads Purchase conversion. GOOGLE_ADS_CONVERSION_LABEL comes from
  // the specific conversion action you create in Google Ads (Goals >
  // Conversions > your "Purchase" action > "Use event snippet" shows the
  // send_to string, formatted as "AW-XXXXXXXXXX/XXXXXXXXXXXXXXXXXXXX").
  const sendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SEND_TO;
  if (sendTo) {
    callGtag('event', 'conversion', {
      send_to: sendTo,
      value: params.value,
      currency,
      transaction_id: params.transactionId,
    });
  } else {
    console.warn(
      '[gtag] NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SEND_TO not set — Google Ads conversion not fired'
    );
  }
}