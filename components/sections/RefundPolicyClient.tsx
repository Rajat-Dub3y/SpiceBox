'use client';

import { useState, useEffect } from 'react';
import {
  RotateCcw,
  Truck,
  ShieldCheck,
  Search,
  ChevronRight,
  Mail,
  Clock,
  CheckCircle2,
  Package,
  AlertCircle,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Box,
  BadgeCheck,
  RefreshCw,
  XCircle
} from 'lucide-react';

const SECTIONS = [
  { id: 'quick-process', title: '3-Step Return Overview', icon: RefreshCw },
  { id: 'return-window', title: 'Return Window', icon: Clock },
  { id: 'item-condition', title: 'Eligible Item Condition', icon: Package },
  { id: 'return-shipping', title: 'Who Pays Shipping', icon: Truck },
  { id: 'how-to-start', title: 'How to Start a Return', icon: Box },
  { id: 'refund-timeline', title: 'Refund Timeline & Method', icon: CheckCircle2 },
  { id: 'damaged-items', title: 'Damaged or Defective Items', icon: AlertCircle },
  { id: 'non-returnable', title: 'Exclusions & Hygiene Rules', icon: XCircle },
  { id: 'contact-us', title: 'Questions & Support', icon: Mail },
];

const FAQS = [
  {
    q: 'Can I exchange an item instead of receiving a refund?',
    a: 'Yes! If you prefer a replacement or store credit, mention it in your email to hello@theecoshop.co and we will expedite an eco-friendly swap.',
  },
  {
    q: 'Are eco-packaging peanuts and boxes recyclable?',
    a: '100%! Our peanuts are made from cornstarch and dissolve in water within minutes. Please reuse or compost the kraft box when making your return.',
  },
  {
    q: 'How long until the money appears back on my credit card?',
    a: 'Once inspected and approved, Stripe credits your account within 5–10 business days depending on your bank institution.',
  },
];

function RefundPolicyClient() {
  // State for dynamic placeholders requested for Alexander/Team review
  const [returnWindow, setReturnWindow] = useState<'30' | '14' | '60'>('30');
  const [shippingPayer, setShippingPayer] = useState<'defective_free' | 'customer_pays' | 'all_free'>('defective_free');
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // UI States
  const [activeSection, setActiveSection] = useState('quick-process');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-15% 0px -60% 0px',
        threshold: 0,
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@theecoshop.co');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Dynamic Rule Helper Text
  const getShippingRuleText = () => {
    switch (shippingPayer) {
      case 'defective_free':
        return 'We cover return shipping 100% for damaged or defective items. For general buyer-remorse returns, the customer provides return postage.';
      case 'all_free':
        return 'The Eco Shop provides complimentary prepaid return shipping labels on all eligible returns within the designated window.';
      case 'customer_pays':
        return 'Customers are responsible for purchasing return shipping labels through their preferred trackable carrier.';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#2C3531] font-sans selection:bg-[#3D5A45]/20 selection:text-[#1E3A2B]">

      {/* HEADER SECTION */}
      <header className="relative border-b border-[#E3E8E4] bg-gradient-to-b from-[#EFF3EF] via-[#FAF9F5] to-[#FAF9F5] px-6 pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-5xl text-center">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3D5A45]/20 bg-[#3D5A45]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#1E3A2B]">
            <RotateCcw className="h-3.5 w-3.5 text-[#3D5A45]" />
            Official Store Guarantees
          </div>

          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[#1E3A2B] sm:text-5xl">
            Refund &amp; Returns Policy
          </h1>

          <p className="mt-3 max-w-xl mx-auto text-base text-[#526258] sm:text-lg font-normal">
            Effortless, sustainable returns. We stand behind every eco-friendly item we craft and curate.
          </p>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-medium text-[#6B7E72]">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Effective: September 25, 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-[#3D5A45]" />
              The Eco Shop Guarantee
            </span>
          </div>

          {/* Quick Search Bar */}
          <div className="mt-8 mx-auto w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#87998C]" />
              <input
                type="text"
                placeholder="Search return rules (e.g., Damaged, Window, Postage)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#D5E0D8] bg-white/90 py-3 pl-10 pr-4 text-sm text-[#2C3531] shadow-sm backdrop-blur transition focus:border-[#1E3A2B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A2B]/10"
              />
            </div>
          </div>

          {/* KEY TRUST BADGES */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E3E8E4] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-sm font-semibold text-[#1E3A2B]">
                    {returnWindow}-Day Return Window
                  </h3>
                  <p className="text-xs text-[#6B7E72]">Generous time to inspect items.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E3E8E4] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-sm font-semibold text-[#1E3A2B]">Carbon-Neutral Shipping</h3>
                  <p className="text-xs text-[#6B7E72]">Offsetting 100% of transit emissions.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E3E8E4] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-sm font-semibold text-[#1E3A2B]">Instant Store Support</h3>
                  <p className="text-xs text-[#6B7E72]">1-business-day response rate.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {}
      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              
              <div className="rounded-2xl border border-[#E3E8E4] bg-white p-5 shadow-sm">
                <h2 className="mb-4 font-serif text-xs font-bold uppercase tracking-wider text-[#1E3A2B]">
                  Policy Table of Contents
                </h2>
                <nav className="space-y-1">
                  {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    const isMatchedSearch = searchQuery && section.title.toLowerCase().includes(searchQuery.toLowerCase());

                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-medium transition ${
                          isActive
                            ? 'bg-[#1E3A2B] text-white shadow-sm'
                            : isMatchedSearch
                            ? 'bg-[#E8EFEA] text-[#1E3A2B]'
                            : 'text-[#526258] hover:bg-[#F3F6F4] hover:text-[#1E3A2B]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#87998C] group-hover:text-[#1E3A2B]'}`} />
                          {section.title}
                        </span>
                        <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isActive ? 'translate-x-0.5 text-white' : 'opacity-0 group-hover:opacity-100 text-[#87998C]'}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* DIRECT SUPPORT CARD */}
              <div className="rounded-2xl border border-[#D5E0D8] bg-gradient-to-br from-[#E8EFEA] via-[#FAF9F5] to-[#FAF9F5] p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[#1E3A2B]">
                  <HeartHandshake className="h-5 w-5 text-[#3D5A45]" />
                  <h3 className="font-serif text-sm font-semibold">
                    Need Help With a Return?
                  </h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#526258]">
                  Our eco-care team responds within 24 hours. Send us your order number to get started.
                </p>
                <button
                  onClick={handleCopyEmail}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E3A2B] py-2.5 px-4 text-xs font-semibold text-white transition hover:bg-[#2D4D3A] active:scale-[0.99]"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5 text-[#78A181]" /> : <Mail className="h-3.5 w-3.5" />}
                  {isCopied ? 'Email Address Copied!' : 'hello@theecoshop.co'}
                </button>
              </div>

            </div>
          </aside>

          {}
          <main className="space-y-10 lg:col-span-8">
            
            {/* SECTION 1: VISUAL 3-STEP PROCESS */}
            <section id="quick-process" className="scroll-mt-24 rounded-2xl border border-[#E3E8E4] bg-white p-6 shadow-sm transition sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#1E3A2B]">
                    3-Step Return Process
                  </h2>
                  <p className="text-xs text-[#6B7E72]">Simple, clear, and plastic-free returns.</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="relative rounded-xl border border-[#E3E8E4] bg-[#FAF9F5] p-4 text-left">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3A2B] text-xs font-bold text-white mb-3">
                    1
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#1E3A2B]">Submit Request</h4>
                  <p className="mt-1 text-xs text-[#526258]">
                    Email <span className="font-medium text-[#1E3A2B]">hello@theecoshop.co</span> with your order number.
                  </p>
                </div>

                <div className="relative rounded-xl border border-[#E3E8E4] bg-[#FAF9F5] p-4 text-left">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3A2B] text-xs font-bold text-white mb-3">
                    2
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#1E3A2B]">Pack &amp; Dispatch</h4>
                  <p className="mt-1 text-xs text-[#526258]">
                    Reuse original paper packaging and drop off with standard carrier.
                  </p>
                </div>

                <div className="relative rounded-xl border border-[#E3E8E4] bg-[#FAF9F5] p-4 text-left">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3A2B] text-xs font-bold text-white mb-3">
                    3
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#1E3A2B]">Get Refunded</h4>
                  <p className="mt-1 text-xs text-[#526258]">
                    Funds returned via Stripe within 5–10 business days.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: RETURN WINDOW */}
            <section id="return-window" className="scroll-mt-24 rounded-2xl border border-[#E3E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5E0D8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <Clock className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E3A2B]">
                  1. Return Window
                </h2>
              </div>

              <div className="mt-4 text-sm leading-relaxed text-[#526258] space-y-3">
                <p>
                  If you are not completely satisfied with your purchase, you may initiate a return within{' '}
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#E8EFEA] px-2 py-0.5 font-semibold text-[#1E3A2B]">
                    {returnWindow} days
                  </span>{' '}
                  from the date of delivery.
                </p>
                <p>
                  The delivery date is verified via the carrier tracking number provided in your shipping confirmation email.
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-[#D5E0D8] bg-[#E8EFEA]/60 p-4 text-xs text-[#1E3A2B]">
                🌿 <strong>Eco Tip:</strong> Please take a moment to review product dimensions and ingredient lists before purchase to minimize return transportation emissions!
              </div>
            </section>

            {/* SECTION 3: CONDITION */}
            <section id="item-condition" className="scroll-mt-24 rounded-2xl border border-[#E3E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5E0D8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <Package className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E3A2B]">
                  2. Eligible Item Condition
                </h2>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#526258]">
                To ensure returned items can be responsibly processed or safely restocked, items must fulfill the following criteria:
              </p>

              <div className="mt-4 space-y-2.5">
                {[
                  'Item must be unused, unwashed, and in original pristine condition.',
                  'Must be returned in original eco-friendly box or kraft sleeve.',
                  'All tags, care guides, and components must remain intact.'
                ].map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl bg-[#FAF9F5] p-3 border border-[#E3E8E4]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3D5A45]" />
                    <span className="text-xs text-[#2C3531] font-medium">{rule}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4: WHO PAYS RETURN SHIPPING */}
            <section id="return-shipping" className="scroll-mt-24 rounded-2xl border border-[#E3E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5E0D8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <Truck className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E3A2B]">
                  3. Who Pays Return Shipping
                </h2>
              </div>

              <div className="mt-4 text-sm leading-relaxed text-[#526258]">
                <p className="font-medium text-[#1E3A2B]">
                  {getShippingRuleText()}
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
                <div className="p-3.5 rounded-xl border border-[#E3E8E4] bg-[#FAF9F5]">
                  <strong className="text-[#1E3A2B] block mb-1">Defective / Error Returns</strong>
                  We issue a prepaid, carbon-neutral shipping label at zero cost to you.
                </div>
                <div className="p-3.5 rounded-xl border border-[#E3E8E4] bg-[#FAF9F5]">
                  <strong className="text-[#1E3A2B] block mb-1">Standard Preference Returns</strong>
                  Return shipping cost is deducted from final refund total or paid directly at carrier drop-off.
                </div>
              </div>
            </section>

            {/* SECTION 5: HOW TO START */}
            <section id="how-to-start" className="scroll-mt-24 rounded-2xl border border-[#E3E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5E0D8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <Box className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E3A2B]">
                  4. How to Start a Return
                </h2>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#526258]">
                Starting a return takes under 2 minutes:
              </p>

              <ol className="mt-4 space-y-3 text-xs text-[#2C3531]">
                <li className="flex items-start gap-3 p-3 rounded-xl border border-[#E3E8E4] bg-[#FAF9F5]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1E3A2B] text-white font-bold text-[10px]">1</span>
                  <div>
                    Send an email to <a href="mailto:hello@theecoshop.co" className="font-semibold text-[#1E3A2B] underline">hello@theecoshop.co</a> with the subject line <em>&quot;Return Request - [Your Order Number]&quot;</em>.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl border border-[#E3E8E4] bg-[#FAF9F5]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1E3A2B] text-white font-bold text-[10px]">2</span>
                  <div>
                    State the reason for return and include a photo if the product arrived damaged or defective.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl border border-[#E3E8E4] bg-[#FAF9F5]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1E3A2B] text-white font-bold text-[10px]">3</span>
                  <div>
                    Our customer support team will reply within <strong>one business day</strong> with step-by-step instructions and return address details.
                  </div>
                </li>
              </ol>
            </section>

            {/* SECTION 6: REFUND TIMELINE */}
            <section id="refund-timeline" className="scroll-mt-24 rounded-2xl border border-[#E3E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5E0D8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E3A2B]">
                  5. Refund Timeline &amp; Method
                </h2>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#526258]">
                Once your package arrives at our warehouse, our quality control team inspects the returned items within 48 hours.
              </p>

              <div className="mt-4 rounded-xl border border-[#E3E8E4] bg-[#FAF9F5] p-4 text-xs space-y-2 text-[#2C3531]">
                <div className="flex justify-between border-b border-[#E3E8E4] pb-2">
                  <span className="text-[#6B7E72]">Inspection Period:</span>
                  <span className="font-semibold text-[#1E3A2B]">1 – 2 Business Days</span>
                </div>
                <div className="flex justify-between border-b border-[#E3E8E4] pb-2">
                  <span className="text-[#6B7E72]">Payment Processor Credit (Stripe):</span>
                  <span className="font-semibold text-[#1E3A2B]">5 – 10 Business Days</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#6B7E72]">Refund Destination:</span>
                  <span className="font-semibold text-[#1E3A2B]">Original Payment Method Only</span>
                </div>
              </div>
            </section>

            {/* SECTION 7: DAMAGED ITEMS */}
            <section id="damaged-items" className="scroll-mt-24 rounded-2xl border border-[#E3E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5E0D8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E3A2B]">
                  6. Damaged or Defective Items
                </h2>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#526258]">
                If your order arrives damaged in transit, we apologize profusely and will make it right immediately at zero cost to you.
              </p>

              <div className="mt-4 rounded-xl border border-[#D5E0D8] bg-[#E8EFEA]/80 p-4 text-xs text-[#1E3A2B]">
                📸 <strong>Action Required:</strong> Email photos of the damaged item and outer package to <a href="mailto:hello@theecoshop.co" className="font-bold underline">hello@theecoshop.co</a> within <strong>7 days of delivery</strong>. We will issue a instant replacement dispatch or full refund.
              </div>
            </section>

            {/* SECTION 8: NON-RETURNABLE */}
            <section id="non-returnable" className="scroll-mt-24 rounded-2xl border border-[#E3E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5E0D8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <XCircle className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E3A2B]">
                  7. Non-Returnable Items
                </h2>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#526258]">
                Due to health, hygiene, and environmental safety regulations, the following categories cannot be returned once unsealed:
              </p>

              <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-xs text-[#2C3531]">
                <li className="flex items-center gap-2 rounded-lg bg-[#FAF9F5] p-2.5 border border-[#E3E8E4]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1E3A2B]" />
                  Personal care &amp; hygiene tools (e.g. bamboo toothbrushes)
                </li>
                <li className="flex items-center gap-2 rounded-lg bg-[#FAF9F5] p-2.5 border border-[#E3E8E4]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1E3A2B]" />
                  Opened skincare or cosmetic products
                </li>
                <li className="flex items-center gap-2 rounded-lg bg-[#FAF9F5] p-2.5 border border-[#E3E8E4]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1E3A2B]" />
                  Digital Gift Cards
                </li>
                <li className="flex items-center gap-2 rounded-lg bg-[#FAF9F5] p-2.5 border border-[#E3E8E4]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1E3A2B]" />
                  Final Clearance / &quot;As-Is&quot; archived items
                </li>
              </ul>
            </section>

            {/* EXPANDABLE FAQ SECTION */}
            <section className="rounded-2xl border border-[#E3E8E4] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#1E3A2B]">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E3A2B]">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="mt-6 divide-y divide-[#E3E8E4]">
                {FAQS.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex w-full items-center justify-between text-left text-sm font-semibold text-[#1E3A2B]"
                    >
                      <span>{faq.q}</span>
                      <ChevronRight className={`h-4 w-4 shrink-0 text-[#87998C] transition-transform ${openFaq === index ? 'rotate-90 text-[#1E3A2B]' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <p className="mt-2.5 text-xs leading-relaxed text-[#526258]">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: CONTACT US */}
            <section id="contact-us" className="scroll-mt-24 rounded-2xl bg-[#1E3A2B] p-8 text-white shadow-md">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-[#78A181]" />
                <h2 className="font-serif text-2xl font-semibold">
                  Questions About Your Order?
                </h2>
              </div>

              <p className="mt-2 text-sm text-[#D5E0D8] max-w-xl">
                We are here to ensure your sustainable shopping experience is completely worry-free. Get in touch with our support desk anytime.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#3D5A45] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#4D6F56] active:scale-[0.98]"
                >
                  <Mail className="h-4 w-4" />
                  hello@theecoshop.co
                </button>

                <a
                  href="https://theecoshop.co"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D5E0D8] hover:text-white transition"
                >
                  Return to Storefront
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}

export { RefundPolicyClient };