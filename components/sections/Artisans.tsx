import Image from 'next/image';
import { Reveal } from '@/components/Reveal';

export function Artisans() {
  return (
    <section id="craftsmanship" className="bg-secondary/30 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <p className="mb-3 font-sans text-sm uppercase tracking-[0.25em] text-accent">
                Craftsmanship
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                Made by hand in India
              </h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground">
                Each spice box is hand-carved by master woodworkers in Northern India using sustainably harvested Neem wood. Every piece takes up to three days of detailed carving, shaping, and hand-polishing to achieve its unique finish. By working directly with artisan families, we help preserve generations-old woodworking traditions while ensuring fair wages and safe workshop conditions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
                <Image
                  src="/artisan-1.jpg" // Replace with image supplied by Alexander
                  alt="Artisan hand-carving Neem wood"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
                <Image
                  src="/workshop.jpg" // Replace with image supplied by Alexander
                  alt="Woodworking workshop in Northern India"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}