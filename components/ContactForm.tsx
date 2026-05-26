'use client';

import { useState } from 'react';

type Status = 'idle' | 'sent';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sent');
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-ink/10 bg-cream p-8 sm:p-10"
      aria-label="Contact form"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" id="name" type="text" required />
        <Field label="Email" id="email" type="email" required />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field label="Phone (optional)" id="phone" type="tel" />
        <Select
          label="Inquiry type"
          id="topic"
          options={['Weekly bouquet', 'Wedding', 'Private event', 'Pop-up bar', 'Workshop', 'Something else']}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="block font-sans text-xs uppercase tracking-wider2 text-sage-dark">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-2 w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-ink outline-none transition focus:border-blush focus:ring-2 focus:ring-blush/20"
          placeholder="A few sentences about your event, date, and vibe…"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-ink/50">We&apos;ll never share your info.</p>
        <button type="submit" className="btn-primary" disabled={status === 'sent'}>
          {status === 'sent' ? 'Thanks — we’ll be in touch' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  type,
  required,
}: {
  label: string;
  id: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-sans text-xs uppercase tracking-wider2 text-sage-dark">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-ink outline-none transition focus:border-blush focus:ring-2 focus:ring-blush/20"
      />
    </div>
  );
}

function Select({ label, id, options }: { label: string; id: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={id} className="block font-sans text-xs uppercase tracking-wider2 text-sage-dark">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="mt-2 w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-ink outline-none transition focus:border-blush focus:ring-2 focus:ring-blush/20"
        defaultValue=""
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
