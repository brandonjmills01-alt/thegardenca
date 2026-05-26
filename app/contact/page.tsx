import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact · From The Garden',
  description:
    'Get in touch for events, weddings, pop-ups, and weekly bouquet questions. Serving DC, Maryland, and Virginia.',
};

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 80% 20%, rgba(212,116,138,0.20), transparent 55%), #FAF6F1',
          }}
        />
        <div className="container-x py-28 sm:py-36">
          <p className="eyebrow">Contact</p>
          <h1 className="h-display mt-6 max-w-4xl text-5xl sm:text-7xl lg:text-8xl">
            Let&apos;s <span className="italic text-blush">make something.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-ink/75">
            Tell us about your event, ask about a custom bouquet, or just say hello. We reply to every note
            within a few days.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section pt-0">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          {/* INFO */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-ink/10 bg-white/60 p-8">
              <p className="eyebrow">Hours</p>
              <p className="mt-3 font-display text-2xl">9:00 am – 5:00 pm</p>
              <p className="mt-1 text-sm text-ink/60">Open today · DMV time</p>
            </div>

            <div className="mt-6 space-y-5 text-ink/75">
              <div>
                <p className="eyebrow">Email</p>
                <a href="mailto:hello@thegardenca.com" className="mt-2 inline-block link-underline">
                  hello@thegardenca.com
                </a>
              </div>
              <div>
                <p className="eyebrow">Instagram</p>
                <a
                  href="https://instagram.com/fromthegarden.dmv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block link-underline"
                >
                  @fromthegarden.dmv
                </a>
              </div>
              <div>
                <p className="eyebrow">Serving</p>
                <p className="mt-2">Washington, DC · Maryland · Virginia</p>
              </div>
            </div>
          </aside>

          {/* FORM */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
