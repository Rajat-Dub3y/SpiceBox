import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Returns Policy | The Eco Shop',
  description: 'Our return window, process, and refund timeline.',
};

// NOTE: [RETURN_WINDOW] and [RETURN_SHIPPING_PAYER] need Alexander's
// confirmed answer before this page goes live.
export default function RefundPolicyPage() {
  return (
    <main className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-center text-sm uppercase tracking-[0.25em] text-accent font-sans">
          Legal
        </p>
        <h1 className="text-center font-serif text-3xl leading-tight text-foreground sm:text-4xl">
          Refund &amp; Returns Policy
        </h1>
        <p className="mt-2 text-center font-sans text-sm text-muted-foreground">
          Last updated: September 25, 2026
        </p>

        <div className="mt-12 space-y-8 font-sans text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Return window</h2>
            <p>
              If you&apos;re not happy with your order, you can return it within
              [RETURN_WINDOW — e.g. &ldquo;30 days&rdquo;] of delivery for a full refund.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Condition</h2>
            <p>
              Items must be unused, in their original condition, and in the original
              packaging to qualify for a return.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">
              Who pays return shipping
            </h2>
            <p>
              [RETURN_SHIPPING_PAYER — e.g. &ldquo;We cover return shipping for defective
              items; the customer covers return shipping for other returns&rdquo;].
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">
              How to start a return
            </h2>
            <p>
              Email{' '}
              <a
                href="mailto:hello@theecoshop.co"
                className="underline hover:text-foreground"
              >
                hello@theecoshop.co
              </a>{' '}
              with your order number and the reason for your return. We&apos;ll reply with
              return instructions within one business day.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Refund timeline</h2>
            <p>
              Once we receive and inspect your return, we&apos;ll process your refund to the
              original payment method within 5–10 business days. You&apos;ll receive an
              email confirming the refund.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Damaged items</h2>
            <p>
              If your item arrives damaged, email us a photo within 7 days of delivery and
              we&apos;ll send a replacement or full refund at no cost to you.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-xl text-foreground">Questions</h2>
            <p>
              Reach out any time at{' '}
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