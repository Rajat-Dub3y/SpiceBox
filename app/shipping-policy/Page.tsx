import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | The Eco Shop',
  description: 'Shipping times, cost, and where we ship from.',
};

// NOTE: Every [BRACKETED] value below needs Alexander's confirmed numbers
// before this page goes live — see the "Website Fixes Before Launch" doc.
export default function ShippingPolicyPage() {
  return (
    <main className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-center text-sm uppercase tracking-[0.25em] text-accent font-sans">
          Legal
        </p>
        <h1 className="text-center font-serif text-3xl leading-tight text-foreground sm:text-4xl">
          Shipping Policy
        </h1>
        <p className="mt-2 text-center font-sans text-sm text-muted-foreground">
          Last updated: September 25, 2026
        </p>

        <div className="mt-12 space-y-8 font-sans text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Where we ship from</h2>
            <p>
              All orders ship from our warehouse in [WAREHOUSE_LOCATION, e.g. &ldquo;the
              United States&rdquo;].
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Where we ship to</h2>
            <p>
              We currently ship to [SHIPPING_REGIONS — e.g. &ldquo;addresses within the
              United States only&rdquo;].
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Processing time</h2>
            <p>
              Orders are processed and handed to our shipping carrier within [PROCESSING_TIME
              — e.g. &ldquo;1–2 business days&rdquo;] of purchase.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Delivery time</h2>
            <p>
              Once shipped, orders typically arrive within [DELIVERY_TIME — e.g.
              &ldquo;3–7 business days&rdquo;], depending on your location.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Shipping cost</h2>
            <p>
              [SHIPPING_COST — e.g. &ldquo;Free shipping on all US orders&rdquo; or the flat
              rate / calculated rate that applies]. Any shipping cost is shown before you
              complete payment at checkout — never as a surprise afterward.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Order tracking</h2>
            <p>
              You&apos;ll receive a confirmation email as soon as your order is placed, and a
              separate email with tracking information once it ships.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Questions</h2>
            <p>
              Email us at{' '}
              <a
                href="mailto:hello@theecoshop.co"
                className="underline hover:text-foreground"
              >
                hello@theecoshop.co
              </a>{' '}
              and we&apos;ll help track down your order.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}