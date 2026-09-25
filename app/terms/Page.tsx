'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  ShieldCheck,
  CreditCard,
  Search,
  Check,
  Copy,
  ChevronRight,
  Mail,
  Scale,
  DollarSign,
  Package,
  Clock,
  Sparkles,
  Lock,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  Hammer
} from 'lucide-react';

const SECTIONS = [
  { id: 'overview', title: '1. Overview', icon: FileText },
  { id: 'products', title: '2. Product Variations', icon: Hammer },
  { id: 'pricing', title: '3. Pricing & Currency', icon: DollarSign },
  { id: 'payment', title: '4. Secure Payment Processing', icon: CreditCard },
  { id: 'order-acceptance', title: '5. Order Acceptance', icon: ShieldCheck },
  { id: 'shipping-returns', title: '6. Shipping & Returns Linkage', icon: Package },
  { id: 'limitation-liability', title: '7. Limitation of Liability', icon: Scale },
  { id: 'changes-terms', title: '8. Changes to Terms', icon: Clock },
  { id: 'contact', title: '9. Contact & Inquiries', icon: Mail },
];

export default function TermsOfSaleClient() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#1B3D2F] font-sans selection:bg-[#4A7C59]/20 selection:text-[#1B3D2F]">
      
      {}
      <header className="relative border-b border-[#E5E2D8] bg-gradient-to-b from-[#EEECE2] via-[#F7F6F0] to-[#F7F6F0] px-6 pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D3A373]/40 bg-[#D3A373]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#1B3D2F]">
            <Scale className="h-3.5 w-3.5 text-[#D3A373]" />
            Legal &amp; Store Agreements
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#1B3D2F] sm:text-5xl">
            Terms of Sale
          </h1>

          <p className="mt-3 text-center font-sans text-xs sm:text-sm text-[#4A7C59] font-medium">
            Last updated: September 25, 2026
          </p>

          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-[#3A4A40] leading-relaxed">
            Please read these terms carefully before placing an order on <span className="font-semibold text-[#1B3D2F]">theecoshop.co</span>. They govern your rights and purchases made with Sustainable Inc. Ltd.
          </p>

          {}
          <div className="mt-8 mx-auto w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A7C59]" />
              <input
                type="text"
                placeholder="Search terms (e.g., refunds, stripe, variations)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-[#D5CEC3] bg-white/90 py-3 pl-10 pr-4 text-sm text-[#1B3D2F] shadow-sm backdrop-blur transition focus:border-[#1B3D2F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3D2F]/10"
              />
            </div>
          </div>

          {}
          <div className="mt-10 grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEECE2] text-[#1B3D2F]">
                  <Hammer className="h-5 w-5 text-[#4A7C59]" />
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-xs font-semibold text-[#1B3D2F]">Artisan Craft</h3>
                  <p className="text-[11px] text-[#5C6E63]">Unique natural wood grain</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEECE2] text-[#1B3D2F]">
                  <DollarSign className="h-5 w-5 text-[#4A7C59]" />
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-xs font-semibold text-[#1B3D2F]">USD Currency</h3>
                  <p className="text-[11px] text-[#5C6E63]">Clear upfront checkout pricing</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEECE2] text-[#1B3D2F]">
                  <Lock className="h-5 w-5 text-[#4A7C59]" />
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-xs font-semibold text-[#1B3D2F]">Stripe Protection</h3>
                  <p className="text-[11px] text-[#5C6E63]">256-bit encrypted checkout</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEECE2] text-[#1B3D2F]">
                  <Mail className="h-5 w-5 text-[#4A7C59]" />
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-xs font-semibold text-[#1B3D2F]">Direct Support</h3>
                  <p className="text-[11px] text-[#5C6E63]">hello@theecoshop.co</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {}
      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              
              <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5 shadow-sm">
                <h2 className="mb-4 font-serif text-xs font-bold uppercase tracking-wider text-[#1B3D2F]">
                  Table of Contents
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
                            ? 'bg-[#1B3D2F] text-white shadow-sm'
                            : isMatchedSearch
                            ? 'bg-[#EEECE2] text-[#1B3D2F] font-bold'
                            : 'text-[#5C6E63] hover:bg-[#F7F6F0] hover:text-[#1B3D2F]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 truncate pr-2">
                          <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#4A7C59] group-hover:text-[#1B3D2F]'}`} />
                          <span className="truncate">{section.title}</span>
                        </span>
                        <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-transform ${isActive ? 'translate-x-0.5 text-white' : 'opacity-0 group-hover:opacity-100 text-[#5C6E63]'}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Support Card */}
              <div className="rounded-2xl border border-[#D5CEC3] bg-gradient-to-br from-[#EEECE2] via-[#F7F6F0] to-[#F7F6F0] p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[#1B3D2F]">
                  <HelpCircle className="h-5 w-5 text-[#4A7C59]" />
                  <h3 className="font-serif text-sm font-semibold">
                    Legal &amp; Sales Inquiries?
                  </h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#5C6E63]">
                  Have questions about these terms before purchasing? Reach out directly to our support desk.
                </p>
                <button
                  onClick={handleCopyEmail}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B3D2F] py-2.5 px-4 text-xs font-semibold text-white transition hover:bg-[#2A5240] active:scale-[0.99]"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5 text-[#A2C4AB]" /> : <Copy className="h-3.5 w-3.5" />}
                  {isCopied ? 'Email Address Copied!' : 'hello@theecoshop.co'}
                </button>
              </div>

            </div>
          </aside>

          {}
          <main className="space-y-8 lg:col-span-8">
            
            {/* SECTION 1: OVERVIEW */}
            <section id="overview" className="scroll-mt-28 rounded-2xl border border-[#E5E2D8] bg-white p-6 shadow-sm transition sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEECE2] text-[#1B3D2F]">
                  <FileText className="h-5 w-5 text-[#4A7C59]" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1B3D2F]">
                  1. Overview
                </h2>
              </div>

              <div className="mt-4 text-sm leading-relaxed text-[#3A4A40] space-y-3">
                <p>
                  These Terms of Sale (&ldquo;Terms&rdquo;) govern any purchase made on{' '}
                  <a href="https://theecoshop.co" className="font-medium text-[#1B3D2F] underline decoration-[#4A7C59]/40 hover:decoration-[#1B3D2F]">
                    theecoshop.co
                  </a>
                  , operated by <span className="font-semibold text-[#1B3D2F]">Sustainable Inc. Ltd</span>.
                </p>
                <p>
                  By completing a purchase or placing an order on our site, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our global Privacy Policy and Terms of Service.
                </p>
              </div>
            </section>

            {/* SECTION 2: PRODUCTS */}
            <section id="products" className="scroll-mt-28 rounded-2xl border border-[#E5E2D8] bg-white p-6 shadow-sm transition sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEECE2] text-[#1B3D2F]">
                  <Hammer className="h-5 w-5 text-[#4A7C59]" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1B3D2F]">
                  2. Product Handcrafting &amp; Natural Variations
                </h2>
              </div>

              <div className="mt-4 text-sm leading-relaxed text-[#3A4A40] space-y-3">
                <p>
                  We make every effort to display our eco-friendly items, including dimensions, sustainable materials, and surface finishes, as accurately as possible.
                </p>
                <p>
                  Because each item is handcrafted using raw, natural materials (such as organic wood, reclaimed timber, natural bamboo, and vegetable-dyed fibers), minor variations in grain structure, tone, weight, and finish between individual pieces are expected and celebrated.
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-[#E5E2D8] bg-[#F7F6F0] p-4 text-xs text-[#5C6E63] flex gap-3 items-start">
                <Sparkles className="h-5 w-5 text-[#D3A373] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1B3D2F] font-serif block mb-0.5">Artisan Uniqueness Guarantee:</strong>
                  These natural nuances are proof of organic craftsmanship and are not considered manufacturing defects or functional imperfections.
                </div>
              </div>
            </section>

            {/* SECTION 3: PRICING */}
            <section id="pricing" className="scroll-mt-28 rounded-2xl border border-[#E5E2D8] bg-white p-6 shadow-sm transition sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEECE2] text-[#1B3D2F]">
                  <DollarSign className="h-5 w-5 text-[#4A7C59]" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1B3D2F]">
                  3. Pricing &amp; Currency Transparency
                </h2>
              </div>

              <div className="mt-4 text-sm leading-relaxed text-[#3A4A40] space-y-3">
                <p>
                  All prices listed on our storefront are denominated in <span className="font-semibold text-[#1B3D2F]">United States Dollars (USD)</span>.
                </p>
                <p>
                  The grand total shown in your order summary at checkout — inclusive of applicable item costs, eco-packaging fees, regional tax, and shipping — represents the exact total charged to your selected payment method.
                </p>
                <p className="text-xs text-[#5C6E63]">
                  We maintain a strictly transparent checkout process; you will never be charged undisclosed handling surcharges or post-purchase checkout hidden fees.
                </p>
              </div>
            </section>

            {/* SECTION 4: PAYMENT */}
            <section id="payment" className="scroll-mt-28 rounded-2xl border border-[#E5E2D8] bg-white p-6 shadow-sm transition sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEECE2] text-[#1B3D2F]">
                  <CreditCard className="h-5 w-5 text-[#4A7C59]" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1B3D2F]">
                  4. Payment Processing
                </h2>
              </div>

              <div className="mt-4 text-sm leading-relaxed text-[#3A4A40] space-y-3">
                <p>
                  All online order payments are processed securely through our trusted payment infrastructure partner, <span className="font-semibold text-[#1B3D2F]">Stripe</span>.
                </p>
                <p>
                  By completing the checkout flow, you represent and warrant that you are authorized to use the designated card or payment account, and you authorize Sustainable Inc. Ltd to charge your selected card for the full order amount.
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#4A7C59]/20 bg-[#4A7C59]/5 p-4 text-xs text-[#1B3D2F]">
                <Lock className="h-5 w-5 text-[#4A7C59] shrink-0" />
                <span>
                  <strong>Bank-Grade Encryption:</strong> We do not store or inspect raw credit card numbers on our servers. All sensitive billing details are directly tokenized by Stripe under strict PCI-DSS Level 1 compliance.
                </span>
              </div>
            </section>

            {/* SECTION 5: ORDER ACCEPTANCE */}
            <section id="order-acceptance" className="scroll-mt-28 rounded-2xl border border-[#E5E2D8] bg-white p-6 shadow-sm transition sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEECE2] text-[#1B3D2F]">
                  <ShieldCheck className="h-5 w-5 text-[#4A7C59]" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1B3D2F]">
                  5. Order Acceptance &amp; Cancellation
                </h2>
              </div>

              <div className="mt-4 text-sm leading-relaxed text-[#3A4A40] space-y-3">
                <p>
                  Your receipt of an electronic order confirmation does not signify our final acceptance of your order. An order is confirmed once payment is authorized and queued for warehouse dispatch.
                </p>
                <p>
                  We reserve the right, at our sole discretion, to refuse or cancel any order for reasons including, but not limited to:
                </p>
                <ul className="list-disc pl-5 text-xs text-[#5C6E63] space-y-1.5">
                  <li>Unforeseen inventory shortages or material unavailability.</li>
                  <li>Inaccuracies or typographical errors in listed pricing or product details.</li>
                  <li>Automated risk flags identifying potential fraudulent activity or unauthorized transactions.</li>
                </ul>
                <p className="text-xs text-[#5C6E63]">
                  If your order is canceled after your card has been charged, we will promptly issue a full refund to your original payment method.
                </p>
              </div>
            </section>

            {/* SECTION 6: SHIPPING & RETURNS */}
            <section id="shipping-returns" className="scroll-mt-28 rounded-2xl border border-[#2A5240]/30 bg-gradient-to-br from-[#1B3D2F] to-[#2A5240] p-6 text-white shadow-md sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#A2C4AB]">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold">
                    6. Shipping &amp; Returns Linkage
                  </h2>
                  <p className="text-xs text-[#C5D8C9]">
                    Fulfillment timelines, rates, and return rights
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-[#E2EAE4] leading-relaxed">
                Detailed terms governing carbon-neutral freight transit, estimated carrier delivery times, and eligible return windows are set forth in our dedicated store policies:
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <a
                  href="/shipping-policy"
                  className="group flex items-center justify-between rounded-xl border border-[#4A7C59]/40 bg-[#0F2218]/80 p-4 transition hover:border-[#A2C4AB] hover:bg-[#0F2218]"
                >
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-white group-hover:text-[#A2C4AB]">
                      Shipping Policy &rarr;
                    </h3>
                    <p className="mt-1 text-xs text-[#C5D8C9]">
                      View coverage, dispatch timelines, and eco-packaging.
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#A2C4AB] transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="/refund-policy"
                  className="group flex items-center justify-between rounded-xl border border-[#4A7C59]/40 bg-[#0F2218]/80 p-4 transition hover:border-[#A2C4AB] hover:bg-[#0F2218]"
                >
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-white group-hover:text-[#A2C4AB]">
                      Refund &amp; Returns Policy &rarr;
                    </h3>
                    <p className="mt-1 text-xs text-[#C5D8C9]">
                      View our 30-day return window and eligibility steps.
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#A2C4AB] transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </section>

            {/* SECTION 7: LIMITATION OF LIABILITY */}
            <section id="limitation-liability" className="scroll-mt-28 rounded-2xl border border-[#E5E2D8] bg-white p-6 shadow-sm transition sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEECE2] text-[#1B3D2F]">
                  <Scale className="h-5 w-5 text-[#4A7C59]" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1B3D2F]">
                  7. Limitation of Liability
                </h2>
              </div>

              <div className="mt-4 text-sm leading-relaxed text-[#3A4A40] space-y-3">
                <p>
                  To the fullest extent permitted by applicable law, <span className="font-semibold text-[#1B3D2F]">Sustainable Inc. Ltd</span>, its directors, employees, and suppliers shall not be liable for any indirect, incidental, punitive, special, or consequential damages resulting from your purchase or use of products sold through this site.
                </p>
                <p className="text-xs text-[#5C6E63]">
                  In no event shall our total aggregate liability exceed the total dollar amount paid by you for the specific item giving rise to the claim.
                </p>
              </div>
            </section>

            {/* SECTION 8: CHANGES TO TERMS */}
            <section id="changes-terms" className="scroll-mt-28 rounded-2xl border border-[#E5E2D8] bg-white p-6 shadow-sm transition sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEECE2] text-[#1B3D2F]">
                  <Clock className="h-5 w-5 text-[#4A7C59]" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1B3D2F]">
                  8. Changes to These Terms
                </h2>
              </div>

              <div className="mt-4 text-sm leading-relaxed text-[#3A4A40] space-y-3">
                <p>
                  We reserve the right to update or modify these Terms of Sale at any time without prior individual notice.
                </p>
                <p>
                  The revised version will be effective as of the &ldquo;Last updated&rdquo; date posted at the top of this page. Your continued placement of orders following any updates constitutes acceptance of the amended terms.
                </p>
              </div>
            </section>

            {/* SECTION 9: CONTACT */}
            <section id="contact" className="scroll-mt-28 rounded-2xl bg-[#1B3D2F] p-8 text-white shadow-md">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-[#A2C4AB]" />
                <h2 className="font-serif text-2xl font-semibold">
                  9. Questions &amp; Support
                </h2>
              </div>

              <p className="mt-3 text-sm text-[#C5D8C9] leading-relaxed max-w-xl">
                Have questions or need clarification regarding these Terms of Sale? Email our support desk at{' '}
                <a
                  href="mailto:hello@theecoshop.co"
                  className="font-semibold text-white underline hover:text-[#A2C4AB] transition"
                >
                  hello@theecoshop.co
                </a>{' '}
                and our legal care team will be happy to assist you.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2A5240] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#3A6B53] active:scale-[0.98] border border-[#4A7C59]/40"
                >
                  <Mail className="h-4 w-4 text-[#A2C4AB]" />
                  {isCopied ? 'Email Copied to Clipboard!' : 'hello@theecoshop.co'}
                </button>

                <a
                  href="https://theecoshop.co"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C5D8C9] hover:text-white transition"
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