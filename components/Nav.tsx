'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop / Order' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-gentle ${
        scrolled || open
          ? 'bg-cream/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(45,45,45,0.06)]'
          : 'bg-cream/70 backdrop-blur-sm'
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2" aria-label="From The Garden home">
          <span className="font-display text-2xl font-light tracking-tight text-ink transition-colors group-hover:text-blush">
            From The Garden
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            const className = `font-sans text-xs uppercase tracking-wider2 link-underline ${
              active ? 'text-blush' : 'text-ink hover:text-blush'
            }`;
            return (
              <Link key={link.href} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/shop"
          className="hidden lg:inline-flex btn-primary text-[11px] py-2.5 px-5"
        >
          Order a Bouquet
        </Link>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative h-10 w-10 inline-flex items-center justify-center text-ink"
        >
          <span className="sr-only">Toggle navigation</span>
          <span
            className={`absolute h-px w-6 bg-current transition-transform duration-300 ease-gentle ${
              open ? 'rotate-45' : '-translate-y-1.5'
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-current transition-opacity duration-200 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-current transition-transform duration-300 ease-gentle ${
              open ? '-rotate-45' : 'translate-y-1.5'
            }`}
          />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-gentle ${
          open ? 'max-h-[80vh]' : 'max-h-0'
        }`}
      >
        <nav className="container-x flex flex-col gap-1 pb-8 pt-2" aria-label="Mobile">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            const className = `block py-4 font-display text-3xl font-light tracking-tight transition-colors ${
              active ? 'text-blush' : 'text-ink hover:text-blush'
            }`;
            return (
              <Link key={link.href} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
          <Link href="/shop" className="btn-primary mt-6 self-start">
            Order a Bouquet
          </Link>
        </nav>
      </div>
    </header>
  );
}
