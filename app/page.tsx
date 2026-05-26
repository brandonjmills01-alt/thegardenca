import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 20% 0%, rgba(212,116,138,0.18), transparent 55%), radial-gradient(ellipse at 90% 30%, rgba(122,158,142,0.20), transparent 55%), #FAF6F1',
          }}
        />
        <div className="container-x flex min-h-[88vh] flex-col justify-center py-24">
          <div className="max-w-3xl fade-in">
            <p className="eyebrow">Boutique flower bar · DMV</p>
            <h1 className="h-display mt-6 text-5xl sm:text-7xl lg:text-[5.5rem]">
              Fresh blooms. <br />
              <span className="italic text-blush">Real community.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75">
              From The Garden is a boutique flower bar bringing hand-crafted bouquets to the heart of the DMV
              — at pop-ups, farmers markets, and the neighborhood spots you already love.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary">
                Order a Bouquet
              </Link>
              <Link href="/events" className="btn-outline">
                See Upcoming Events
              </Link>
            </div>
          </div>
        </div>

        <div className="container-x pb-10">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-ink/10 pt-8 text-xs uppercase tracking-wider2 text-ink/50">
            <span>Washington, DC</span>
            <span className="h-1 w-1 rounded-full bg-ink/30" />
            <span>Maryland</span>
            <span className="h-1 w-1 rounded-full bg-ink/30" />
            <span>Virginia</span>
            <span className="h-1 w-1 rounded-full bg-ink/30" />
            <span>Pop-ups · Markets · Events</span>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="section">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">What we do</p>
            <h2 className="h-display mt-4 text-4xl sm:text-5xl lg:text-6xl">
              This isn&apos;t just a flower shop.
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-ink/75">
              <p>
                We believe fresh flowers belong in the everyday — not saved for special occasions. So we set up
                where life is already happening: at neighborhood pop-ups, in the cafes you frequent, alongside
                the small businesses we love.
              </p>
              <p>
                Every stem is seasonally sourced, and every bouquet is arranged with intention — the kind of
                care you can&apos;t fake and a chain shop can&apos;t scale.
              </p>
            </div>
            <Link href="/about" className="mt-10 inline-block btn-ghost px-0">
              Read our story →
            </Link>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-blush/30 to-blush/10" />
              <div className="aspect-[3/4] mt-10 rounded-2xl bg-gradient-to-br from-sage/30 to-sage/10" />
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-sage/20 to-cream" />
              <div className="aspect-[3/4] mt-10 rounded-2xl bg-gradient-to-br from-blush/20 to-cream" />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="section bg-white/60">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Offerings</p>
            <h2 className="h-display mt-4 text-4xl sm:text-5xl">A bouquet for every moment.</h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Weekly Bouquets',
                body: 'Hand-tied with the freshest stems of the week. Pre-order online or pick one up at the bar.',
              },
              {
                title: 'Pop-Up Flower Bar',
                body: 'Build your own bouquet with us at rotating markets, cafes, and neighborhood events.',
              },
              {
                title: 'Events & Weddings',
                body: 'Intimate florals for showers, dinners, and weddings — seasonal, local, and unmistakably you.',
              },
            ].map((o) => (
              <div
                key={o.title}
                className="group rounded-2xl border border-ink/10 bg-cream p-8 transition-all duration-500 ease-gentle hover:-translate-y-1 hover:border-blush/40 hover:shadow-xl hover:shadow-blush/5"
              >
                <div className="h-10 w-10 rounded-full bg-blush/15 transition-colors group-hover:bg-blush/30" />
                <h3 className="mt-6 font-display text-2xl">{o.title}</h3>
                <p className="mt-3 text-ink/70">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Find us</p>
            <h2 className="h-display mt-4 text-4xl sm:text-5xl">Better yet, see us in person.</h2>
            <p className="mt-6 max-w-xl text-ink/75">
              Our pop-up locations rotate across DC, Maryland, and Virginia. The freshest details — where to
              find us this weekend, this week&apos;s blooms, last-minute drops — all land on Instagram first.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://instagram.com/fromthegarden.dmv"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Follow on Instagram
              </a>
              <Link href="/events" className="btn-outline">
                View Calendar
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[5/6] overflow-hidden rounded-3xl bg-gradient-to-br from-sage/30 via-cream to-blush/30" />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-cream p-6 shadow-xl shadow-ink/5 ring-1 ring-ink/5 sm:block">
              <p className="eyebrow text-blush">Open today</p>
              <p className="mt-2 font-display text-2xl">9:00 am – 5:00 pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-ink text-cream">
        <div className="container-x text-center">
          <p className="eyebrow text-blush">For your table</p>
          <h2 className="h-display mx-auto mt-4 max-w-3xl text-4xl sm:text-6xl">
            Let us bring a little of the garden home with you.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="btn-primary">
              Shop Bouquets
            </Link>
            <Link
              href="/contact"
              className="btn border border-cream/30 text-cream hover:bg-cream hover:text-ink"
            >
              Book an Event
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
