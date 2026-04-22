const cards = [
  {
    title: "Quick Exit Button",
    body: "A red button is permanently visible on every single page. One click closes HaqDaar instantly and redirects your browser to a weather page. No trace left. Designed for domestic abuse survivors.",
    accent: "#DC2626",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z"/>
      </svg>
    ),
  },
  {
    title: "Zero Identity Required",
    body: "Submit your entire case, get your rights analysis, and receive a legal document — without ever entering your name, phone number, email, or CNIC. A reference code is your only identifier.",
    accent: "#C9A84C",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    title: "Volunteer Human Review",
    body: "High-risk cases (domestic violence, harassment) are automatically flagged and reviewed by a trained legal volunteer before any document or result is sent — ensuring your safety first.",
    accent: "#C9A84C",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/><path d="m16 11 2 2 4-4"/>
      </svg>
    ),
  },
];

export const Safety = () => (
  <section className="border-t border-gold/15 py-24">
    <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
      <div className="reveal text-center">
        <div className="label-accent">Your Safety Is Our Priority</div>
        <h2 className="font-display mt-4 text-4xl font-bold text-white lg:text-5xl">Built for the Most Vulnerable</h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] text-ivory/75">
          We designed every feature thinking about someone who is afraid, alone, and in danger.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {cards.map((c, i) => (
          <div
            key={i}
            className="reveal card-surface rounded-xl p-7"
            style={{ transitionDelay: `${i * 80}ms`, borderLeft: `3px solid ${c.accent}` }}
          >
            <div
              className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-md"
              style={{ background: `${c.accent}1f`, color: c.accent, border: `1px solid ${c.accent}55` }}
            >
              {c.icon}
            </div>
            <h3 className="font-display text-xl font-semibold text-white">{c.title}</h3>
            <p className="mt-2.5 text-[14px] leading-[1.65] text-ivory/85">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
