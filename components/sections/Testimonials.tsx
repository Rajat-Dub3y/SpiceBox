import { Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const testimonials = [
  {
    quote:
      "You can immediately tell this is solid craft. After six months of daily use in the kitchen, the wood has developed a rich, warm patina that looks even better than when it arrived. It feels so grounded and sturdy on the counter.",
    attribution: "Elena Rostova",
    location: "San Francisco, CA",
  },
  {
    quote:
      "Gifted this for a housewarming and the packaging was completely plastic-free and ready to present. Knowing that a tree was planted with the purchase made a beautiful, sustainable gift feel even more meaningful.",
    attribution: "Marcus Chen",
    location: "Los Angeles, CA",
  },
  {
    quote:
      "I finally ditched our cheap plastic spice carousel for this. The difference in build quality and look is night and day—it actually makes our kitchen counter feel organized and warm instead of cluttered.",
    attribution: "Sarah Jenkins",
    location: "San Diego, CA",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-secondary/50 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-center text-sm uppercase tracking-[0.25em] text-accent font-sans">
            Kind Words
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="text-center font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            From the kitchens where it lives.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={200 + i * 150}>
              <figure className="flex h-full flex-col rounded-lg border bg-card p-8 shadow-sm">
                <Quote
                  className="h-8 w-8 text-accent/40"
                  strokeWidth={1.5}
                />
                <blockquote className="mt-4 flex-1 font-sans text-sm leading-relaxed text-muted-foreground italic">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-sans text-sm font-medium text-foreground">
                    {t.attribution}
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                    {t.location}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
