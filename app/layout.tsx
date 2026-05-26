import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const body = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'From The Garden — Boutique Flower Bar | DMV',
  description:
    'A boutique flower bar bringing hand-crafted bouquets to the DMV — at pop-ups, farmers markets, and neighborhood spots across DC, Maryland, and Virginia.',
  metadataBase: new URL('https://thegardenca.com'),
  openGraph: {
    title: 'From The Garden — Boutique Flower Bar',
    description: 'Fresh blooms. Real community.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans bg-cream text-ink">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
