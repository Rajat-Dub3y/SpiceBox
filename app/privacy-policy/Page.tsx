import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Eco Shop',
  description: 'How The Eco Shop collects, uses, and protects your information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-center text-sm uppercase tracking-[0.25em] text-accent font-sans">
          Legal
        </p>
        <h1 className="text-center font-serif text-3xl leading-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-center font-sans text-sm text-muted-foreground">
          Last updated: September 25, 2026
        </p>

        <div className="mt-12 space-y-8 font-sans text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Who we are</h2>
            <p>
              The Eco Shop is operated by Sustainable Inc. Ltd (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; &ldquo;our&rdquo;). This policy explains what information
              we collect when you visit theecoshop.co or place an order, and how we use it.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">
              Information we collect
            </h2>
            <p>When you place an order, we collect:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Your name and email address</li>
              <li>Your shipping address</li>
              <li>
                Payment details — processed directly by our payment processor, Stripe. We
                never see or store your full card number.
              </li>
            </ul>
            <p className="mt-2">
              When you browse the site, we also collect standard analytics data (pages
              viewed, device type, approximate location) via Google Analytics, and may use
              Google Ads to measure the effectiveness of our advertising.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">
              How we use your information
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>To process and ship your order</li>
              <li>To send order confirmations and shipping updates</li>
              <li>To respond to customer service requests</li>
              <li>To understand site traffic and improve the shopping experience</li>
              <li>To measure and improve our advertising</li>
            </ul>
            <p className="mt-2">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">
              Payment processing
            </h2>
            <p>
              All payments are handled by Stripe. Stripe&apos;s use of your information is
              governed by their own privacy policy, available at{' '}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                stripe.com/privacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">
              Cookies &amp; analytics
            </h2>
            <p>
              We use cookies and similar technologies to operate the site, remember your
              cart, and understand how visitors use theecoshop.co, including through Google
              Analytics and Google Ads. You can control cookies through your browser
              settings, and we provide a cookie consent option on your first visit.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">
              Data retention
            </h2>
            <p>
              We retain order information for as long as necessary to fulfill your order,
              comply with our legal and tax obligations, and resolve any disputes.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Your rights</h2>
            <p>
              You can request a copy of the personal information we hold about you, or ask
              us to correct or delete it, by emailing{' '}
              <a
                href="mailto:hello@theecoshop.co"
                className="underline hover:text-foreground"
              >
                hello@theecoshop.co
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Contact us</h2>
            <p>
              Questions about this policy? Email us at{' '}
              <a
                href="mailto:hello@theecoshop.co"
                className="underline hover:text-foreground"
              >
                hello@theecoshop.co
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}