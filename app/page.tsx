import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Artisans } from '@/components/sections/Artisans'; 
import { Promise } from '@/components/sections/Promise';
import { Product } from '@/components/sections/Product';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';  
import { Checkout } from '@/components/sections/Checkout';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <About />
      <Promise />
      <Product />
      <Testimonials />
      <FAQ />
      <Checkout />
      <Footer />
    </main>
  );
}