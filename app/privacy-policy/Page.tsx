'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Search, 
  ChevronRight, 
  Mail, 
  CreditCard, 
  Cookie, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Clock,
  Building2,
  ArrowUpRight
} from 'lucide-react';

const SECTIONS = [
  { id: 'who-we-are', title: 'Who We Are', icon: Building2 },
  { id: 'information-collected', title: 'Information We Collect', icon: Eye },
  { id: 'how-we-use-info', title: 'How We Use Information', icon: Sparkles },
  { id: 'payment-processing', title: 'Payment Processing', icon: CreditCard },
  { id: 'cookies-analytics', title: 'Cookies & Analytics', icon: Cookie },
  { id: 'data-retention', title: 'Data Retention', icon: Clock },
  { id: 'your-rights', title: 'Your Rights', icon: ShieldCheck },
  { id: 'contact-us', title: 'Contact Us', icon: Mail },
];

const FAQS = [
  {
    q: 'Do you sell my personal information to third parties?',
    a: 'No. We never sell, rent, or trade your personal data to advertisers or third parties.'
  },
  {
    q: 'Can I request for my stored data to be completely erased?',
    a: 'Yes! You have the full "Right to be Forgotten". Simply send an email to hello@theecoshop.co with your request, and we will purge your personal record.'
  },
  {
    q: 'Does The Eco Shop store my credit card details?',
    a: 'Never. All payment processing is directly handled by Stripe using end-to-end encryption. We never see or store full credit card numbers.'
  }
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('who-we-are');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
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
        rootMargin: '-20% 0px -60% 0px',
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
    setTimeout(() => setIsCopied(false), 2000);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D3436] font-sans selection:bg-[#5C765E]/20 selection:text-[#2D4A3E]">
      
      {/* HEADER SECTION */}
      <header className="relative border-b border-[#E2E8E4] bg-gradient-to-b from-[#F2F5F3] to-[#FAF9F6] px-6 pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5C765E]/20 bg-[#5C765E]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#2D4A3E]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#5C765E]" />
              Official Legal Document
            </div>

            <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[#1E332A] sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-3 max-w-xl text-base text-[#526058] sm:text-lg">
              Transparency matters. Learn how The Eco Shop collects, respects, and protects your personal data.
            </p>

            <div className="mt-4 flex items-center gap-4 text-xs font-medium text-[#6B7C72]">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Updated: Sept 25, 2026
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                Sustainable Inc. Ltd
              </span>
            </div>

            {/* Quick Search Bar */}
            <div className="mt-8 w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#87968E]" />
                <input
                  type="text"
                  placeholder="Search policy topics (e.g., Stripe, Cookies, Rights)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[#D5DDD8] bg-white/80 py-2.5 pl-10 pr-4 text-sm text-[#2D3436] shadow-sm backdrop-blur transition focus:border-[#2D4A3E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]/10"
                />
              </div>
            </div>

          </div>

          {/* KEY HIGHLIGHT CARDS */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E2E8E4] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2D4A3E]">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-[#1E332A]">Zero Data Selling</h3>
                  <p className="text-xs text-[#6B7C72]">We never trade or sell your details.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2E8E4] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2D4A3E]">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-[#1E332A]">Secure Payments</h3>
                  <p className="text-xs text-[#6B7C72]">256-bit encrypted via Stripe.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2E8E4] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2D4A3E]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-[#1E332A]">Full User Control</h3>
                  <p className="text-xs text-[#6B7C72]">Request or erase data anytime.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              
              {/* Navigation Menu Card */}
              <div className="rounded-2xl border border-[#E2E8E4] bg-white p-5 shadow-sm">
                <h2 className="mb-4 font-serif text-sm font-bold uppercase tracking-wider text-[#1E332A]">
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
                            ? 'bg-[#2D4A3E] text-white shadow-sm'
                            : isMatchedSearch
                            ? 'bg-[#E8EFEA] text-[#2D4A3E]'
                            : 'text-[#526058] hover:bg-[#F2F5F3] hover:text-[#1E332A]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#87968E] group-hover:text-[#2D4A3E]'}`} />
                          {section.title}
                        </span>
                        <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isActive ? 'translate-x-0.5 text-white' : 'opacity-0 group-hover:opacity-100 text-[#87968E]'}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Direct Support Card */}
              <div className="rounded-2xl border border-[#D5DDD8] bg-gradient-to-br from-[#E8EFEA] to-[#FAF9F6] p-5 shadow-sm">
                <h3 className="font-serif text-sm font-semibold text-[#1E332A]">
                  Have privacy concerns?
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#526058]">
                  Our privacy compliance officer is available to assist with any questions or deletion requests.
                </p>
                <button
                  onClick={handleCopyEmail}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2D4A3E] py-2.5 px-4 text-xs font-semibold text-white transition hover:bg-[#1E332A] active:scale-[0.99]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {isCopied ? 'Email Copied!' : 'hello@theecoshop.co'}
                </button>
              </div>

            </div>
          </aside>

          {}
          <main className="space-y-12 lg:col-span-8">
            
            {/* SECTION: Who We Are */}
            <section id="who-we-are" className="scroll-mt-24 rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5DDD8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2D4A3E]">
                  <Building2 className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E332A]">
                  1. Who We Are
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#526058]">
                <strong>The Eco Shop</strong> is operated by Sustainable Inc. Ltd (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;). We are committed to fostering a sustainable lifestyle through eco-friendly products while safeguarding the personal information you entrust to us.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#526058]">
                This privacy policy explains what information we collect when you visit{' '}
                <a href="https://theecoshop.co" className="font-medium text-[#2D4A3E] underline hover:text-[#1E332A]">
                  theecoshop.co
                </a>{' '}
                or place an order, and how we protect and use that data.
              </p>
            </section>

            {/* SECTION: Information We Collect */}
            <section id="information-collected" className="scroll-mt-24 rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5DDD8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2D4A3E]">
                  <Eye className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E332A]">
                  2. Information We Collect
                </h2>
              </div>
              
              <p className="mt-4 text-sm leading-relaxed text-[#526058]">
                We only collect data necessary to provide you with seamless shopping and exceptional customer service:
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3 rounded-xl bg-[#FAF9F6] p-3.5 border border-[#E2E8E4]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5C765E]" />
                  <div className="text-xs leading-relaxed text-[#2D3436]">
                    <strong className="text-[#1E332A]">Account & Contact Info:</strong> Your name, email address, phone number, and physical shipping address.
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-[#FAF9F6] p-3.5 border border-[#E2E8E4]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5C765E]" />
                  <div className="text-xs leading-relaxed text-[#2D3436]">
                    <strong className="text-[#1E332A]">Transaction Records:</strong> History of products purchased, order values, and interaction dates.
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-[#FAF9F6] p-3.5 border border-[#E2E8E4]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5C765E]" />
                  <div className="text-xs leading-relaxed text-[#2D3436]">
                    <strong className="text-[#1E332A]">Browsing Analytics:</strong> Standard non-identifying telemetry including pages viewed, device type, and approximate location via Google Analytics and Google Ads.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: How We Use Information */}
            <section id="how-we-use-info" className="scroll-mt-24 rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5DDD8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2D4A3E]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E332A]">
                  3. How We Use Your Information
                </h2>
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'To process and fulfill your eco-friendly order',
                  'To send real-time tracking & order confirmations',
                  'To respond quickly to customer service inquiries',
                  'To continuously improve site speed and browsing layout',
                  'To measure and optimize sustainable ad campaigns',
                  'To prevent fraudulent activity and secure your account'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 rounded-xl border border-[#E2E8E4] bg-[#FAF9F6] p-3 text-xs text-[#2D3436]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#5C765E]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-[#D5DDD8] bg-[#E8EFEA]/60 p-4 text-xs font-medium text-[#2D4A3E]">
                🌱 <strong>Zero Commercial Trading:</strong> We strictly do not sell, rent, or lease your personal information to third-party data brokers.
              </div>
            </section>

            {/* SECTION: Payment Processing */}
            <section id="payment-processing" className="scroll-mt-24 rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5DDD8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2D4A3E]">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E332A]">
                  4. Payment Processing & Security
                </h2>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#526058]">
                All payments processed on <strong>theecoshop.co</strong> are encrypted and securely handled directly through <strong>Stripe</strong>.
              </p>

              {/* Callout Box */}
              <div className="mt-6 flex flex-col gap-4 rounded-xl border border-[#D5DDD8] bg-[#FAF9F6] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#1E332A]">
                    Stripe Financial Encryption
                  </h4>
                  <p className="mt-1 text-xs text-[#6B7C72]">
                    We never see, receive, or store your credit card numbers on our servers.
                  </p>
                </div>
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-[#2D4A3E] border border-[#D5DDD8] shadow-sm hover:bg-[#F2F5F3] transition"
                >
                  Stripe Privacy Policy
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </section>

            {/* SECTION: Cookies & Analytics */}
            <section id="cookies-analytics" className="scroll-mt-24 rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5DDD8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2D4A3E]">
                  <Cookie className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E332A]">
                  5. Cookies & Analytics
                </h2>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#526058]">
                We use functional cookies and analytical tags to remember your shopping cart items, keep you logged in, and analyze web traffic performance through Google Analytics and Google Ads.
              </p>
              
              <p className="mt-3 text-sm leading-relaxed text-[#526058]">
                You can easily turn off or configure cookies via your browser preferences. A cookie consent banner is also presented upon your initial visit.
              </p>
            </section>

            {/* SECTION: Data Retention */}
            <section id="data-retention" className="scroll-mt-24 rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5DDD8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2D4A3E]">
                  <Clock className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E332A]">
                  6. Data Retention
                </h2>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#526058]">
                We retain your purchase history and personal information only for as long as needed to fulfill orders, settle tax or statutory legal compliance, resolve billing disputes, and enforce our terms.
              </p>
            </section>

            {/* SECTION: Your Rights */}
            <section id="your-rights" className="scroll-mt-24 rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-sm transition hover:border-[#D5DDD8] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2D4A3E]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E332A]">
                  7. Your Data Protection Rights
                </h2>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#526058]">
                Under global privacy laws (including GDPR & CCPA), you hold full authority over your data. You have the right to:
              </p>

              <div className="mt-4 space-y-2 text-xs text-[#2D3436]">
                <div className="p-3 rounded-xl border border-[#E2E8E4] bg-[#FAF9F6]">
                  <strong>1. Right of Access:</strong> Request a full copy of the personal information stored in our database.
                </div>
                <div className="p-3 rounded-xl border border-[#E2E8E4] bg-[#FAF9F6]">
                  <strong>2. Right to Erasure:</strong> Request that we permanently delete your records from our systems.
                </div>
                <div className="p-3 rounded-xl border border-[#E2E8E4] bg-[#FAF9F6]">
                  <strong>3. Right to Correction:</strong> Request amendments to inaccurate or outdated address details.
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <span className="text-xs text-[#6B7C72]">To submit a request, email:</span>
                <a href="mailto:hello@theecoshop.co" className="text-xs font-semibold text-[#2D4A3E] underline hover:text-[#1E332A]">
                  hello@theecoshop.co
                </a>
              </div>
            </section>

            {/* SECTION: Expandable FAQ */}
            <section id="faq" className="rounded-2xl border border-[#E2E8E4] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2D4A3E]">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1E332A]">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="mt-6 divide-y divide-[#E2E8E4]">
                {FAQS.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex w-full items-center justify-between text-left text-sm font-semibold text-[#1E332A]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-[#87968E] transition-transform ${openFaq === index ? 'rotate-180 text-[#2D4A3E]' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <p className="mt-2.5 text-xs leading-relaxed text-[#526058]">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION: Contact Us */}
            <section id="contact-us" className="scroll-mt-24 rounded-2xl bg-[#1E332A] p-8 text-white shadow-md">
              <h2 className="font-serif text-2xl font-semibold">
                Still have questions?
              </h2>
              <p className="mt-2 text-sm text-[#D5DDD8]">
                If you have queries regarding this Privacy Policy or wish to exercise your data rights, please contact our support team.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:hello@theecoshop.co"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5C765E] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#4A624C]"
                >
                  <Mail className="h-4 w-4" />
                  hello@theecoshop.co
                </a>
                <a
                  href="https://theecoshop.co"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D5DDD8] hover:text-white"
                >
                  Return to Store Home
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}