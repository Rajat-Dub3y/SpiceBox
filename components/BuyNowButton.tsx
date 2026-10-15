'use client';

import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCT } from '@/lib/product';
import { trackBeginCheckout } from '@/lib/gtag-events';

function logError(context: string, err: unknown) {
  console.error(`[buy-now:${context}]`, err);
}

export function BuyNowButton() {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleBuyNow() {
    setErrorMessage(null);
    setLoading(true);

    // Fire before the network call — we want this logged even if the
    // redirect to Stripe fails or is slow, since intent was expressed here.
    trackBeginCheckout({
      itemId: PRODUCT.id,
      itemName: PRODUCT.name,
      price: PRODUCT.price,
    });

    try {
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        logError('create-session', { status: res.status, data });
        setErrorMessage(data.error || 'Could not start checkout. Please try again.');
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      logError('network', err);
      setErrorMessage('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div>
      {errorMessage && (
        <p
          role="alert"
          className="mb-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 font-sans text-sm text-destructive"
        >
          {errorMessage}
        </p>
      )}
      <Button onClick={handleBuyNow} disabled={loading} size="lg" className="w-full">
        {loading ? 'Redirecting to checkout…' : 'Buy Now'}
        {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}