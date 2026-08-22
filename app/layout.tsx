import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://neemandgrain.example'),
  title: 'Handmade Neem Wood Spice Box | Hexagonal Masala Box',
  description:
    'A hexagonal wooden spice box hand-carved from solid Neem wood, with six compartments, a hinged glass lid, and a hand-turned spoon. Small-batch, plastic-free, and built to last.',
  keywords: [
    'handmade wooden spice box',
    'hexagonal masala box',
    'Neem wood spice tin',
    'eco-friendly spice organizer',
    'sustainable kitchen gift',
    'plastic-free spice storage',
    'handmade kitchen decor',
  ],
  openGraph: {
    title: 'Handmade Neem Wood Spice Box | Hexagonal Masala Box',
    description:
      'A hexagonal wooden spice box hand-carved from solid Neem wood, with six compartments, a hinged glass lid, and a hand-turned spoon. Small-batch, plastic-free, and built to last.',
    type: 'website',
    images: [
      {
        url: 'https://i.etsystatic.com/56971455/r/il/ba4bac/8173093976/il_794xN.8173093976_8m0o.jpg',
        width: 794,
        height: 794,
        alt: 'Handmade hexagonal Neem wood spice box with glass lid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handmade Neem Wood Spice Box | Hexagonal Masala Box',
    description:
      'A hexagonal wooden spice box hand-carved from solid Neem wood. Small-batch, plastic-free, and built to last.',
    images: [
      'https://i.etsystatic.com/56971455/r/il/ba4bac/8173093976/il_794xN.8173093976_8m0o.jpg',
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Neem & Grain',
      url: 'https://neemandgrain.example',
      logo: 'https://i.etsystatic.com/56971455/r/il/ba4bac/8173093976/il_794xN.8173093976_8m0o.jpg',
      description:
        'Small-batch maker of handmade wooden spice boxes carved from solid Neem wood.',
      email: 'hello@neemandgrain.example',
      sameAs: [
        'https://instagram.com/neemandgrain',
        'https://linkedin.com/company/neemandgrain',
      ],
    },
    {
      '@type': 'Product',
      name: 'Hexagonal Neem Wood Spice Box',
      description:
        'A hexagonal wooden spice box hand-carved from solid Neem wood, with six triangular compartments, a hinged glass lid with a brass-tone clasp, and an included hand-turned wooden spoon. Arrives in plastic-free, gift-ready packaging.',
      image: [
        'https://i.etsystatic.com/56971455/r/il/ba4bac/8173093976/il_794xN.8173093976_8m0o.jpg',
        'https://i.etsystatic.com/56971455/r/il/41cf14/8173093964/il_794xN.8173093964_gjtc.jpg',
        'https://i.etsystatic.com/56971455/r/il/e71338/8173093950/il_794xN.8173093950_38mu.jpg',
      ],
      brand: {
        '@type': 'Brand',
        name: 'Neem & Grain',
      },
      offers: {
        '@type': 'Offer',
        url: 'https://neemandgrain.example',
        priceCurrency: 'USD',
        price: '54.99',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Neem & Grain',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a Neem wood spice box?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Neem wood spice box is a traditional Indian masala box (masala dabba) hand-carved from solid Neem wood. Neem is a hardwood used across Northern India for centuries in cooking and medicine, chosen because it is naturally moisture- and bacteria-resistant and develops a richer patina with age.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many compartments does the spice box have?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The hexagonal spice box has six triangular compartments arranged around a central point, each sized for a common household spice. A hand-turned wooden spoon is included.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the packaging plastic-free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The spice box arrives in plastic-free, gift-ready packaging made from recyclable kraft materials.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I care for a wooden spice box?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Wipe with a dry or lightly damp cloth. Avoid soaking or dishwashing. Occasionally rub with food-safe mineral oil to refresh the wood and deepen the patina.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
