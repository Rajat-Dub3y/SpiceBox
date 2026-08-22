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

type Step = 'email' | 'otp' | 'payment' | 'shipping';

export function Checkout() {
  const [step, setStep] = React.useState<Step>('email');
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // TODO: Replace with real OTP verification call (e.g. Supabase auth or custom email-code flow)
  async function handleOtpRequest() {
    setLoading(true);
    // TODO: POST email to backend to send a 6-digit verification code
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setStep('otp');
  }

  // TODO: Replace with real OTP verification call
  async function handleOtpVerify() {
    setLoading(true);
    // TODO: POST email + otp to backend to verify the code
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setStep('payment');
  }

  // TODO: Replace with real Stripe PaymentIntent creation
  async function handleCreatePaymentIntent() {
    setLoading(true);
    // TODO: POST to /api/create-payment-intent — returns clientSecret for Stripe.js Payment Element
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setStep('shipping');
  }

  // TODO: Replace with real order submission (writes to Supabase, triggers confirmation)
  async function handleSubmitOrder(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: POST order + payment method + shipping address to backend
    // TODO: Webhook-driven confirmation will update order status from 'pending' to 'confirmed'
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    // TODO: show confirmation state instead of alert
    alert('Order placed! (This is a placeholder — no real charge was made.)');
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

        {/* Step content */}
        <div className="mt-12 rounded-lg border bg-card p-6 shadow-sm sm:p-8">
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
                  onClick={() => setStep('email')}
                  className="w-full text-center font-sans text-xs text-muted-foreground hover:text-foreground"
                >
                  Use a different email
                </button>
              </div>
            </Reveal>
          )}

          {/* Step 3: Payment (Stripe Payment Element mount point) */}
          {step === 'payment' && (
            <Reveal>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="font-sans text-sm text-muted-foreground">
                    Payment method
                  </p>
                  <span className="font-serif text-2xl text-foreground">
                    ${PRODUCT.price.toFixed(2)}
                  </span>
                </div>
                {/*
                  // TODO: Stripe Payment Element will be mounted here.
                  // After creating a PaymentIntent via handleCreatePaymentIntent,
                  // initialize Stripe.js with the returned clientSecret and
                  // mount the Payment Element into this container:
                  //
                  //   const stripe = Stripe(publishableKey);
                  //   const elements = stripe.elements({ clientSecret });
                  //   const pe = elements.create('payment');
                  //   pe.mount('#stripe-payment-element');
                */}
                <div
                  id="stripe-payment-element"
                  className="flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-border bg-secondary/30 p-8"
                >
                  <div className="text-center">
                    <CreditCard
                      className="mx-auto h-10 w-10 text-muted-foreground/40"
                      strokeWidth={1.5}
                    />
                    <p className="mt-3 font-sans text-xs text-muted-foreground">
                      Secure payment form loads here at checkout
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleCreatePaymentIntent}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Processing…' : 'Continue to shipping'}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </Reveal>
          )}

          {/* Step 4: Shipping address */}
          {step === 'shipping' && (
            <Reveal>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="Jane" className="mt-2" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-2" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Street address</Label>
                  <Input
                    id="address"
                    placeholder="1234 Market St"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                  <Input id="address2" placeholder="Apt 5" className="mt-2" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="San Francisco" className="mt-2" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP code</Label>
                    <Input
                      id="zip"
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
        </div>
      </div>
    </section>
  );
}
