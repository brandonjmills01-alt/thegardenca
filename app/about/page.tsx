import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About · From The Garden',
  description:
    'A boutique flower bar built on fresh, local stems and the neighborhoods that make up the DMV.',
};

const VALUES = [
  {
    title: 'Seasonal & local',
    body: 'We source from growers in our region whenever the season allows. The blooms shift with the months — that’s the point.',
  },
  {
    title: 'Intentional, not mass',
    body: 'Each bouquet is hand-tied. No assembly line, no big-box uniformity — just careful work, one stem at a time.',
  },
  {
    title: 'Rooted in community',
    body: 'We set up alongside the small businesses, markets, and gathering places that already make the DMV feel like home.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 20% 20%, rgba(212,116,138,0.20), transparent 55%), #FAF6F1',
          }}
        />
        <div className="container-x py-28 sm:py-36">
          <p className="eyebrow">About</p>
          <h1 className="h-display mt-6 max-w-4xl text-5xl sm:text-7xl lg:text-8xl">
            A flower bar for the <span className="italic text-blush">everyday.</span>
          </h1>
        </div>
      </section>

      {/* STORY */}
      <section className="section pt-0">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="sticky top-28 aspect-[4/5] rounded-3xl bg-gradient-to-br from-blush/30 via-cream to-sage/30" />
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow">Our story</p>
            <h2 className="h-display mt-4 text-4xl sm:text-5xl">
              Built around the idea that flowers belong everywhere, all the time.
            </h2>
            <div className="mt-8 space-y-6 text-ink/75 [&_p]:max-w-xl">
              <p>
                From The Garden started with a simple frustration: fresh flowers had become a special-occasion
                purchase. Something you order for Mother&apos;s Day or grab in plastic at the grocery store.
                That wasn&apos;t how we grew up around flowers — and it wasn&apos;t the kind of shop we wanted
                to be.
              </p>
              <p>
                So we built a flower bar instead of a flower shop. We set up where you already are — at
                farmers markets, neighborhood cafes, holiday pop-ups — and we let you build a bouquet by hand,
                stem by stem, the way it should be.
              </p>
              <p>
                Every week, we source what&apos;s in season and arrange it the way it wants to be arranged.
                Loose, abundant, a little wild. Made to live on your kitchen counter, not just your wedding
                table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-white/60">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">What we believe</p>
            <h2 className="h-display mt-4 text-4xl sm:text-5xl">Three things, always.</h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div key={v.title} className="border-t border-ink/15 pt-8">
                <p className="font-display text-5xl text-blush">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-6 font-display text-2xl">{v.title}</h3>
                <p className="mt-3 text-ink/70">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow">Say hello</p>
            <h2 className="h-display mt-4 text-4xl sm:text-5xl">
              Come find us at the next pop-up.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link href="/events" className="btn-primary">
              See Events
            </Link>
            <Link href="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
