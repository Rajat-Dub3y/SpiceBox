import { Instagram, Mail } from 'lucide-react';
import Image from 'next/image';

const POLICY_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/shipping-policy', label: 'Shipping' },
  { href: '/refund-policy', label: 'Returns' },
  { href: '/terms', label: 'Terms' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <Image
              src="/footer.png"
              alt="The Eco Shop"
              width={277}
              height={160}
              className="mx-auto h-auto w-32 sm:mx-0 sm:w-36"
            />
            <p className="mt-1 font-sans text-sm text-primary-foreground/60">
              Handmade wooden spice boxes, carved to last.
            </p>
          </div>

          {/* Contact + socials */}
          <div className="flex flex-col items-center gap-4 sm:items-end">
            <a
              href="mailto:hello@theecoshop.co"
              className="font-sans text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              hello@theecoshop.co
            </a>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/theecoshop_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </a>
              {/*
                LinkedIn icon removed — it previously pointed to
                linkedin.com/company/vimalac (wrong company). Add it back
                with the correct The Eco Shop LinkedIn URL once you have it:

                <a
                  href="[THE_ECO_SHOP_LINKEDIN_URL]"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
                >
                  <Linkedin className="h-5 w-5" strokeWidth={1.5} />
                </a>
              */}
              <a
                href="mailto:hello@theecoshop.co"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
              >
                <Mail className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Policy links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-primary-foreground/10 pt-8 sm:justify-start">
          {POLICY_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-xs text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Business contact block */}
        <div className="mt-6 text-center sm:text-left">
          <p className="font-sans text-xs text-primary-foreground/40">
            Sustainable Inc. Ltd
            {/*
              TODO: business address from Alexander — add on its own line
              once confirmed, e.g.:
              <br />[STREET ADDRESS, CITY, STATE ZIP]
            */}
          </p>
          <p className="mt-1 font-sans text-xs text-primary-foreground/40">
            &copy; {new Date().getFullYear()} The Eco Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}