import { TreePine, Search, ScrollText } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const pillars = [
  {
    icon: TreePine,
    title: 'Tree Planted',
    // [PLACEHOLDER: exact mechanic — e.g. "1 tree planted per order"]
    body: '[PLACEHOLDER: exact mechanic — e.g. For every spice box you order, we plant one tree through our reforestation partner.]',
  },
  {
    icon: Search,
    title: 'Trackable Impact',
    // [PLACEHOLDER: how tracking works — e.g. unique tracking link per order]
    body: '[PLACEHOLDER: how tracking works — e.g. You receive a unique tracking link so you can see where your tree was planted and follow its growth.]',
  },
  {
    icon: ScrollText,
    title: 'Certificate of Planting',
    // [PLACEHOLDER: certificate details — e.g. digital certificate with partner org name]
    body: '[PLACEHOLDER: certificate details — e.g. A digital certificate of planting is emailed to you, referencing our partner organization and the region of your tree.]',
  },
];

export function Promise() {
  return (
    <section
      id="promise"
      className="bg-secondary/50 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-center text-sm uppercase tracking-[0.25em] text-accent font-sans">
            Our Promise
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="text-center font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl text-balance">
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
