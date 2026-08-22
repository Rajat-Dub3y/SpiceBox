'use client';

import * as React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { PRODUCT, PRODUCT_IMAGES, PRODUCT_IMAGE_ALTS } from '@/lib/product';

export function Product() {
  return (
    <section id="product" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <Carousel
                opts={{ loop: true, align: 'center' }}
                className="w-full"
              >
                <CarouselContent>
                  {PRODUCT_IMAGES.map((src, i) => (
                    <CarouselItem key={src}>
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
                        <Image
                          src={src}
                          alt={PRODUCT_IMAGE_ALTS[i] ?? PRODUCT.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                          priority={i === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
              </Carousel>

              {/* Thumbnail strip */}
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {PRODUCT_IMAGES.slice(0, 6).map((src, i) => (
                  <div
                    key={src}
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-secondary"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Product details */}
          <div className="flex flex-col">
            <Reveal>
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-accent font-sans">
                The Product
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl text-balance">
                {PRODUCT.name}
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground">
                {PRODUCT.description}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-8 space-y-3">
                {PRODUCT.specs.map((spec) => (
                  <li
                    key={spec.label}
                    className="flex items-start gap-3 font-sans text-sm"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      strokeWidth={2}
                    />
                    <span>
                      <span className="font-medium text-foreground">
                        {spec.label}:
                      </span>{' '}
                      <span className="text-muted-foreground">{spec.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex items-baseline gap-3">
                <span className="font-serif text-4xl text-foreground">
                  ${PRODUCT.price.toFixed(2)}
                </span>
                <span className="font-sans text-sm text-muted-foreground">
                  {PRODUCT.currency} · includes spoon &amp; gift-ready packaging
                </span>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <Button
                asChild
                size="lg"
                className="mt-8 w-full sm:w-auto"
              >
                <a href="#checkout">Buy Now — ${PRODUCT.price.toFixed(2)}</a>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
