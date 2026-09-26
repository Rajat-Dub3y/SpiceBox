import { Reveal } from '@/components/Reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    question: 'How long does shipping take?',
    answer: 'Orders ship directly from our US warehouse within 1–2 business days. Standard shipping typically takes 3–5 business days.',
  },
  {
    question: 'Is it food-safe?',
    answer: 'Yes, absolutely. Every box is treated with a 100% natural, food-safe oil finish. No harmful chemicals, varnishes, or toxins are used.',
  },
  {
    question: 'How do I care for Neem wood?',
    answer: 'Wipe clean with a damp cloth or dry towel. Do not submerge in water or place in the dishwasher. To maintain its rich luster over time, apply a drop of food-safe mineral or coconut oil every few months.',
  },
  {
    question: 'Can I return it?',
    answer: 'We offer a 30-day money-back guarantee. If you are not entirely satisfied with your purchase, return it in its original condition for a full refund.',
  }
];

export function FAQ() {
  return (
    <section id="faq" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center">
            <p className="mb-3 font-sans text-sm uppercase tracking-[0.25em] text-accent">
              Questions & Answers
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-12 w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-serif text-lg text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}