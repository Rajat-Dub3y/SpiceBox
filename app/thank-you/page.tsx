'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';

interface SessionDetails {
  orderNumber: string;
  email: string | null;
  amountTotal: number | null;
  currency: string | null;
}

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading');
  const [details, setDetails] = React.useState<SessionDetails | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      setErrorMessage('No order reference was provided.');
      return;
    }

    let cancelled = false;

    async function fetchSession() {
      try {
        const res = await fetch(`/api/checkout/session/${sessionId}`);
        const data = await res.json();
        if (!res.ok) {
          console.error('[thank-you] Session lookup failed:', data);
          if (!cancelled) {
            setStatus('error');
            setErrorMessage(data.error || 'Could not confirm your order.');
          }
          return;
        }
        if (!cancelled) {
          setDetails(data);
          setStatus('success');
        }
      } catch (err) {
        console.error('[thank-you] Network error:', err);
        if (!cancelled) {
          setStatus('error');
          setErrorMessage('Network error. Please refresh this page.');
        }
      }
    }

    fetchSession();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <main className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-xl text-center">
        {status === 'loading' && (
          <p className="font-sans text-sm text-muted-foreground">
            Confirming your order…
          </p>
        )}

        {status === 'error' && (
          <div>
            <h1 className="font-serif text-2xl text-foreground">
              We couldn&apos;t confirm that order
            </h1>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              {errorMessage}
            </p>
            <p className="mt-4 font-sans text-xs text-muted-foreground">
              If you were just charged, don&apos;t worry — check your email for a
              confirmation, or contact{' '}
              <a
                href="mailto:hello@theecoshop.co"
                className="underline hover:text-foreground"
              >
                hello@theecoshop.co
              </a>
              .
            </p>
          </div>
        )}

        {status === 'success' && details && (
          <div>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Check className="h-7 w-7" />
            </div>
            <h1 className="mt-4 font-serif text-2xl text-foreground sm:text-3xl">
              Order confirmed
            </h1>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              Thank you — a confirmation email is on its way
              {details.email ? ` to ${details.email}` : ''}.
            </p>

            <div className="mt-8 rounded-lg border bg-card p-6 text-left shadow-sm">
              <div className="flex items-center justify-between font-sans text-sm">
                <span className="text-muted-foreground">Order number</span>
                <span className="font-medium text-foreground">
                  {details.orderNumber}
                </span>
              </div>
              {details.amountTotal !== null && details.currency && (
                <div className="mt-3 flex items-center justify-between font-sans text-sm">
                  <span className="text-muted-foreground">Total paid</span>
                  <span className="font-medium text-foreground">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: details.currency.toUpperCase(),
                    }).format(details.amountTotal / 100)}
                  </span>
                </div>
              )}
            </div>

            <p className="mt-6 font-sans text-xs text-muted-foreground">
              We&apos;ll email you again with tracking details once your order ships.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}