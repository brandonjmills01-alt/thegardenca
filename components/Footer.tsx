import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/80">
      <div className="container-x py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="eyebrow text-blush">Stay in bloom</p>
            <h2 className="h-display mt-4 text-4xl text-cream sm:text-5xl">
              Join the list — get 10% off your first bouquet.
            </h2>
            <p className="mt-4 max-w-md text-cream/70">
              Weekly drops, market locations, and seasonal notes. No spam, just blooms.
            </p>
            <NewsletterForm />
          </div>

          <div>
            <p className="eyebrow text-blush">Explore</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="link-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="link-underline">
                  Shop / Order
                </Link>
              </li>
              <li>
                <Link href="/events" className="link-underline">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="link-underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-blush">Find us</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://instagram.com/fromthegarden.dmv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  @fromthegarden.dmv
                </a>
              </li>
              <li>
                <a href="mailto:hello@thegardenca.com" className="link-underline">
                  hello@thegardenca.com
                </a>
              </li>
              <li className="text-cream/60">Serving DC · Maryland · Virginia</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} From The Garden. All rights reserved.</p>
          <p className="font-sans uppercase tracking-wider2">Fresh blooms. Real community.</p>
        </div>
      </div>
    </footer>
  );
}
