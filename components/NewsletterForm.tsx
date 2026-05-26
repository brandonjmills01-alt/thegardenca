'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="mt-8 flex w-full max-w-md gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      aria-label="Newsletter signup"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@example.com"
        className="flex-1 rounded-full bg-cream/10 px-5 py-3 text-sm text-cream placeholder:text-cream/40 outline-none ring-1 ring-cream/15 transition focus:ring-blush"
      />
      <button type="submit" className="btn-primary text-[11px]" disabled={sent}>
        {sent ? 'Subscribed' : 'Subscribe'}
      </button>
    </form>
  );
}
