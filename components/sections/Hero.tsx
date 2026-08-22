'use client';

import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Candidate taglines (swap by changing which line is used below):
// 1. "A kitchen staple, reimagined by hand."
// 2. "Carved by hand. Made to outlast the drawer."
// 3. "The spice box, made the way it used to be — one piece at a time."
const TAGLINE = 'A kitchen staple, reimagined by hand.';

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Full-bleed background video (placeholder source — swap for real footage before launch) */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/photos/19208265/pexels-photo-19208265.jpeg?auto=compress&cs=tinysrgb&w=1920"
      >
        <source
          src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] font-sans text-white/70">
          Neem &amp; Grain
        </p>
        <h1 className="max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance">
          {TAGLINE}
        </h1>
        <p className="mt-6 max-w-xl font-sans text-base text-white/80 sm:text-lg">
          A hexagonal spice box hand-carved from solid Neem wood. Six compartments,
          a hinged glass lid, and a spoon turned by hand.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-10 bg-white text-primary hover:bg-white/90"
        >
          <a href="#product">
            Shop the Spice Box
            <ArrowDown className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-5 w-5 text-white/50" />
      </div>
    </section>
  );
}
