import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events · From The Garden',
  description:
    'Pop-ups, markets, weddings, and private events across the DMV. Find us this week or book us for yours.',
};

const UPCOMING = [
  {
    date: 'Saturday · Weekly',
    title: 'Pop-Up Flower Bar',
    location: 'Rotating DC · MD · VA',
    detail: 'Build your own bouquet from this week’s freshest stems. Walk-ups welcome.',
  },
  {
    date: 'Sundays',
    title: 'Farmers Market',
    location: 'Locations posted on Instagram',
    detail: 'Pre-tied bouquets, single stems, and bunches by the wrap. First come, first served.',
  },
  {
    date: 'By appointment',
    title: 'Private Workshops',
    location: 'Hosted at your space or ours',
    detail: 'Intimate flower-arranging classes for groups of 6–20. BYOB encouraged.',
  },
];

const SERVICES = [
  {
    name: 'Pop-Up Bars',
    body: 'Bring a flower bar to your storefront, brunch, launch, or block party. Guests pick stems and we wrap them up to take home.',
  },
  {
    name: 'Weddings',
    body: 'Bouquets, ceremony installations, and reception florals — seasonal, locally sourced, and styled to feel like you.',
  },
  {
    name: 'Showers & Dinners',
    body: 'From baby showers to milestone birthdays — soft, abundant arrangements that don’t overpower the table.',
  },
  {
    name: 'Corporate & Brand',
    body: 'Recurring office arrangements, photo florals, and on-brand pop-ups for product launches and openings.',
  },
];

export default function EventsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 70% 0%, rgba(122,158,142,0.25), transparent 55%), #FAF6F1',
          }}
        />
        <div className="container-x py-28 sm:py-36">
          <p className="eyebrow">Events</p>
          <h1 className="h-display mt-6 max-w-4xl text-5xl sm:text-7xl lg:text-8xl">
            Where you&apos;ll find us — <span className="italic text-blush">and where we can find you.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-ink/75">
            We pop up across DC, Maryland, and Virginia all season long. Catch us at a market, book us for
            your event, or host a workshop with friends.
          </p>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Upcoming</p>
              <h2 className="h-display mt-4 text-4xl sm:text-5xl">This season</h2>
            </div>
            <a
              href="https://instagram.com/fromthegarden.dmv"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block btn-ghost px-0"
            >
              Latest on Instagram →
            </a>
          </div>

          <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {UPCOMING.map((e) => (
              <li
                key={e.title}
                className="grid gap-6 py-8 transition-colors hover:bg-white/40 sm:grid-cols-[180px_1fr_auto] sm:items-center sm:px-2"
              >
                <p className="font-sans text-xs uppercase tracking-wider2 text-sage-dark">{e.date}</p>
                <div>
                  <h3 className="font-display text-2xl">{e.title}</h3>
                  <p className="mt-1 text-sm text-ink/60">{e.location}</p>
                  <p className="mt-3 max-w-xl text-ink/75">{e.detail}</p>
                </div>
                <Link href="/contact" className="btn-outline text-[11px] py-2 px-4 justify-self-start sm:justify-self-end">
                  Inquire
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section bg-white/60">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Bookings</p>
            <h2 className="h-display mt-4 text-4xl sm:text-5xl">Book From The Garden for your event.</h2>
            <p className="mt-6 text-ink/75">
              Every event is built around what&apos;s blooming and what you love. Tell us about yours and
              we&apos;ll send a proposal within a few days.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-ink/10 bg-cream p-8 transition-all duration-500 ease-gentle hover:-translate-y-1 hover:border-sage/40 hover:shadow-xl hover:shadow-sage/5"
              >
                <h3 className="font-display text-2xl">{s.name}</h3>
                <p className="mt-3 text-ink/70">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Request a Proposal
            </Link>
            <a
              href="https://instagram.com/fromthegarden.dmv"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              See Past Events
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
