'use client';

import * as React from 'react';
import { Mail, Lock, CreditCard, Truck, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Reveal } from '@/components/Reveal';
import { PRODUCT } from '@/lib/product';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe-client';

type Step = 'email' | 'otp' | 'payment' | 'shipping' | 'confirmed';

export function Checkout() {
  const [step, setStep] = React.useState<Step>('email');
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const [verifiedToken, setVerifiedToken] = React.useState<string | null>(null);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [orderId, setOrderId] = React.useState<string | null>(null);

  async function handleOtpRequest() {
    setErrorMessage(null);
    setLoading(true);
    try {
      const res = await fetch('/api/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Could not send code. Please try again.');
        return;
      }
      setStep('otp');
    } catch {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Verifying OTP and creating the PaymentIntent happen back-to-back here,
  // since the "payment" step needs a clientSecret ready the moment it mounts
  // (so the Payment Element has somewhere to render into).
  async function handleOtpVerify() {
    setErrorMessage(null);
    setLoading(true);
    try {
      const verifyRes = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        setErrorMessage(verifyData.error || 'Incorrect code. Please try again.');
        return;
      }

      const token = verifyData.verifiedToken;
      setVerifiedToken(token);

      const intentRes = await fetch('/api/checkout/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verifiedToken: token, quantity: 1 }),
      });
      const intentData = await intentRes.json();
      if (!intentRes.ok) {
        setErrorMessage(intentData.error || 'Could not start checkout. Please try again.');
        return;
      }

      setClientSecret(intentData.clientSecret);
      setOrderId(intentData.orderId);
      setStep('payment');
    } catch {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Called by PaymentStepInner once stripe.confirmPayment() actually
  // succeeds — only then do we move to shipping.
  function handlePaymentSuccess() {
    setStep('shipping');
  }

  async function handleSubmitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get('firstName') || '');
    const lastName = String(formData.get('lastName') || '');
    const address = String(formData.get('address') || '');
    const address2 = String(formData.get('address2') || '');
    const city = String(formData.get('city') || '');
    const zip = String(formData.get('zip') || '');

    try {
      const res = await fetch(`/api/orders/${orderId}/shipping`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          shippingAddress: {
            name: `${firstName} ${lastName}`.trim(),
            line1: address,
            line2: address2 || undefined,
            city,
            zip,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Could not save shipping details. Please try again.');
        return;
      }
      setStep('confirmed');
    } catch {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const steps: { id: Step; label: string; icon: typeof Mail }[] = [
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'otp', label: 'Verify', icon: Lock },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'shipping', label: 'Shipping', icon: Truck },
  ];
  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <section id="checkout" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="mb-4 text-center text-sm uppercase tracking-[0.25em] text-accent font-sans">
            Checkout
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="text-center font-serif text-3xl leading-tight text-foreground sm:text-4xl text-balance">
            Complete your order
          </h2>
        </Reveal>

        {/* Step indicator */}
        {step !== 'confirmed' && (
          <Reveal delay={200}>
            <div className="mt-10 flex items-center justify-center gap-2 sm:gap-4">
              {steps.map((s, i) => {
                const isActive = i === currentStepIndex;
                const isDone = i < currentStepIndex;
                return (
                  <React.Fragment key={s.id}>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                          isActive
                            ? 'border-accent bg-accent text-accent-foreground'
                            : isDone
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border bg-card text-muted-foreground'
                        }`}
                      >
                        {isDone ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <s.icon className="h-4 w-4" strokeWidth={1.5} />
                        )}
                      </div>
                      <span
                        className={`font-sans text-xs ${
                          isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`h-0.5 w-8 sm:w-16 ${
                          i < currentStepIndex ? 'bg-accent' : 'bg-border'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* Step content */}
        <div className="mt-12 rounded-lg border bg-card p-6 shadow-sm sm:p-8">
          {errorMessage && (
            <div
              role="alert"
              className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 font-sans text-sm text-destructive"
            >
              {errorMessage}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 'email' && (
            <Reveal>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <p className="font-sans text-xs text-muted-foreground">
                  We&apos;ll send a verification code to this address.
                </p>
                <Button
                  onClick={handleOtpRequest}
                  disabled={!email || loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Sending code…' : 'Continue'}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </Reveal>
          )}

          {/* Step 2: OTP verification */}
          {step === 'otp' && (
            <Reveal>
              <div className="space-y-6">
                <div>
                  <p className="font-sans text-sm text-muted-foreground">
                    Enter the 6-digit code sent to{' '}
                    <span className="font-medium text-foreground">{email}</span>
                  </p>
                </div>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(v) => setOtp(v)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button
                  onClick={handleOtpVerify}
                  disabled={otp.length < 6 || loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Verifying…' : 'Verify code'}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                <button
                  onClick={() => {
                    setStep('email');
                    setErrorMessage(null);
                  }}
                  className="w-full text-center font-sans text-xs text-muted-foreground hover:text-foreground"
                >
                  Use a different email
                </button>
              </div>
            </Reveal>
          )}

          {/* Step 3: Payment — real Stripe Payment Element, mounted via Elements provider */}
          {step === 'payment' && clientSecret && (
            <Reveal>
              <Elements stripe={getStripe()} options={{ clientSecret }}>
                <PaymentStepInner
                  onSuccess={handlePaymentSuccess}
                  onError={setErrorMessage}
                />
              </Elements>
            </Reveal>
          )}

          {/* Step 4: Shipping address */}
          {step === 'shipping' && (
            <Reveal>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" name="firstName" placeholder="Jane" className="mt-2" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" name="lastName" placeholder="Doe" className="mt-2" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Street address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="1234 Market St"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                  <Input id="address2" name="address2" placeholder="Apt 5" className="mt-2" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" placeholder="San Francisco" className="mt-2" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      placeholder="94103"
                      className="mt-2"
                      inputMode="numeric"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select defaultValue="ca">
                    <SelectTrigger id="state" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ca">California</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-6">
                  <div>
                    <p className="font-sans text-xs text-muted-foreground">Total</p>
                    <p className="font-serif text-2xl text-foreground">
                      ${PRODUCT.price.toFixed(2)}
                    </p>
                  </div>
                  <Button type="submit" disabled={loading} size="lg">
                    {loading ? 'Placing order…' : 'Place order'}
                  </Button>
                </div>
              </form>
            </Reveal>
          )}

          {/* Step 5: Confirmation */}
          {step === 'confirmed' && (
            <Reveal>
              <div className="py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-serif text-2xl text-foreground">
                  Order confirmed
                </h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground">
                  Check your email for confirmation — we&apos;ll send another update once it ships.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

// Broken out because useStripe/useElements only work inside an <Elements>
// provider, which itself needs the clientSecret before it can render.
function PaymentStepInner({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = React.useState(false);

  async function handlePay() {
    if (!stripe || !elements) return;

    onError('');
    setSubmitting(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      // Same PaymentIntent stays alive — Payment Element resets itself so
      // the customer can just fix their card details and hit Pay again.
      // Nothing upstream (email, OTP, order) needs to restart.
      onError(
        error.message ||
          "Your payment couldn't be processed. You haven't been charged — please try again."
      );
      setSubmitting(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
      return;
    }

    onError('Payment did not complete. Please try again.');
    setSubmitting(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-sans text-sm text-muted-foreground">Payment method</p>
        <span className="font-serif text-2xl text-foreground">
          ${PRODUCT.price.toFixed(2)}
        </span>
      </div>
      <PaymentElement />
      <Button
        onClick={handlePay}
        disabled={!stripe || !elements || submitting}
        className="w-full"
        size="lg"
      >
        {submitting ? 'Processing…' : 'Pay'}
        {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}