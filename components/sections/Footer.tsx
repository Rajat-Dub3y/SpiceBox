import { Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="font-serif text-2xl text-primary-foreground">
              Neem &amp; Grain
            </p>
            <p className="mt-1 font-sans text-sm text-primary-foreground/60">
              Handmade wooden spice boxes, carved to last.
            </p>
          </div>

          {/* Contact + socials */}
          <div className="flex flex-col items-center gap-4 sm:items-end">
            <a
              href="mailto:hello@neemandgrain.example"
              className="font-sans text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              hello@neemandgrain.example
            </a>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/neemandgrain"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com/company/neemandgrain"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
              >
                <Linkedin className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:hello@neemandgrain.example"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
              >
                <Mail className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-6 text-center">
          <p className="font-sans text-xs text-primary-foreground/40">
            &copy; {new Date().getFullYear()} Neem &amp; Grain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
