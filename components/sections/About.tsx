import { Reveal } from '@/components/Reveal';

export function About() {
  return (
    <section id="about" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-accent font-sans">
            Our Story
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            It started with a drawer full of forgotten plastic.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 space-y-6 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Most spice boxes are disposable. They arrive bright and promising,
              then disappear into a drawer within a month — scratched, stained,
              and quietly replaced by the next one. We started The Eco Shop
              because we wanted something different in our own kitchen, and
              couldn&apos;t find it: a spice box worth keeping out on the counter.
            </p>
            <p>
              Each piece is carved by hand from solid Neem wood, a material used
              across Northern India for centuries in cooking and medicine. We
              chose Neem because it is naturally resistant to moisture and
              bacteria, and because it doesn&apos;t stay the same — it develops
              a richer, deeper patina with every year of use. No two pieces are
              identical, because a person made them, not a machine. The grain,
              the weight, the finish — all slightly different, all deliberate.
            </p>
            <p>
              We make in small batches. We don&apos;t rush the wood. And we
              design every box to outlast the drawer it might otherwise end up
              in.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
