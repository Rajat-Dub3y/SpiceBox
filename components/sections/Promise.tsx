'use client';

import * as React from 'react';
import { TreePine, Search, ScrollText } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const pillars = [
  {
    icon: TreePine,
    title: 'Tree Planted',
    body: 'For every spice box you order, we plant one tree through our reforestation partner.',
  },
  {
    icon: Search,
    title: 'Trackable Impact',
    body: 'You receive a unique tracking link so you can see where your tree was planted and follow its growth.',
  },
  {
    icon: ScrollText,
    title: 'Certificate of Planting',
    body: 'A digital certificate of planting is emailed to you, referencing our partner organization and the region of your tree.',
  },
];

export function Promise() {
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  return (
    <section
      id="promise"
      className="bg-secondary/50 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-center font-sans text-sm uppercase tracking-[0.25em] text-accent">
            Our Promise
          </p>
        </Reveal>

        {/* Video only visible once loaded */}
        <div
          className={`transition-opacity duration-700 ease-in-out ${
            isVideoLoaded ? 'opacity-100' : 'hidden opacity-0'
          }`}
        >
          <Reveal delay={50}>
            <div className="mx-auto my-10 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-md">
              <video
                src="/video-optimized.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onCanPlayThrough={() => setIsVideoLoaded(true)}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <h2 className="text-center font-serif text-3xl text-balance leading-tight text-foreground sm:text-4xl md:text-5xl">
            Every box gives something back to the forest it came from.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-xl text-center font-sans text-base text-muted-foreground sm:text-lg">
            We work with reforestation partners so that each order contributes
            to real, verified tree planting — not a vague promise, but something
            you can see and keep.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={300 + i * 150}>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-card">
                  <pillar.icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-serif text-xl text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}