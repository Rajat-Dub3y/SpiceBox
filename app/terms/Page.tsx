import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Sale | The Eco Shop',
  description: 'The terms that govern purchases made on The Eco Shop.',
};

export default function TermsPage() {
  return (
    <main className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-center text-sm uppercase tracking-[0.25em] text-accent font-sans">
          Legal
        </p>
        <h1 className="text-center font-serif text-3xl leading-tight text-foreground sm:text-4xl">
          Terms of Sale
        </h1>
        <p className="mt-2 text-center font-sans text-sm text-muted-foreground">
          Last updated: September 25, 2026
        </p>

        <div className="mt-12 space-y-8 font-sans text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Overview</h2>
            <p>
              These terms govern any purchase made on theecoshop.co, operated by
              Sustainable Inc. Ltd. By placing an order, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Products</h2>
            <p>
              We make every effort to accurately display our products, including
              dimensions, materials, and finish. Because each item is handmade, small
              variations in grain, color, and finish between individual pieces are normal
              and not considered defects.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Pricing</h2>
            <p>
              All prices are listed in US dollars. The total shown at checkout — including
              any applicable shipping and tax — is the amount charged to your payment
              method.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Payment</h2>
            <p>
              Payments are processed securely through Stripe. By completing checkout, you
              authorize us to charge your selected payment method for the full order total.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">
              Order acceptance
            </h2>
            <p>
              Your order is confirmed once payment is successfully processed. We reserve
              the right to cancel and refund any order in cases of suspected fraud or
              error in pricing or availability.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">
              Shipping &amp; returns
            </h2>
            <p>
              Shipping details are set out in our{' '}
              <a href="/shipping-policy" className="underline hover:text-foreground">
                Shipping Policy
              </a>
              , and return details in our{' '}
              <a href="/refund-policy" className="underline hover:text-foreground">
                Refund &amp; Returns Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">
              Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, Sustainable Inc. Ltd is not liable
              for any indirect, incidental, or consequential damages arising from your use
              of our products or this site.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">
              Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. Continued use of the site after
              changes are posted constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Contact</h2>
            <p>
              Questions about these terms? Email{' '}
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