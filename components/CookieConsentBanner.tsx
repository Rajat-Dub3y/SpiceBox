'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

const CONSENT_KEY = 'eco-shop-cookie-consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function grantConsent() {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
  }
}

export function CookieConsentBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') {
      // Returning visitor who already accepted — re-grant on every load,
      // since Consent Mode defaults to denied on each fresh page load.
      grantConsent();
      return;
    }
    if (stored !== 'declined') {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    window.localStorage.setItem(CONSENT_KEY, 'accepted');
    grantConsent();
    setVisible(false);
  }

  function handleDecline() {
    window.localStorage.setItem(CONSENT_KEY, 'declined');
    // Consent stays at its 'denied' default — nothing to update.
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card px-6 py-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-sans text-sm text-muted-foreground">
          We use cookies to understand site traffic and measure our advertising. You can
          accept or decline — see our{' '}
          <a href="/privacy-policy" className="underline hover:text-foreground">
            Privacy Policy
          </a>{' '}
          for details.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}