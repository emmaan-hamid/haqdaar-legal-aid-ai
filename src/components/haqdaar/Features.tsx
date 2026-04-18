const cards = [
  { title: "Legal Issue Classifier", body: "Reads Urdu and English, classifies into 7 categories: Labor, Property, Domestic Violence, Police, Consumer, Tenancy, Harassment.", tag: "Smart Categorization", h: "tall" },
  { title: "Rights Analyzer", body: "Retrieves the most relevant Pakistani law sections. Explains your rights and penalties in plain language.", tag: "Plain Language", h: "short" },
  { title: "Smart Lawyer Matching", body: "Scores by specialty, availability, proximity, and rating. Returns your top 3 matches.", tag: "Top 3 Matches", h: "medium" },
  { title: "Legal Document Generator", body: "Auto-drafts FIR, legal notices, labor court applications, NADRA appeals, tenancy notices, and harassment complaints. PDF and Word.", tag: "Instant Download", h: "short" },
  { title: "Anonymous Mode", body: "Submit completely anonymously. Zero personal data. The system warns if you type personal details. Quick Exit closes the page instantly.", tag: "Full Privacy", h: "tall" },
  { title: "Case Tracker and Alerts", body: "Track cases from submission to closure. Email and SMS reminders 3 days before deadlines. Rate your lawyer after closure.", tag: "Email, SMS, In-App", h: "medium" },
];

export const Features = () => (
  <section className="border-t border-gold/15 py-24">
    <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
      <div className="reveal text-center">
        <div className="label-accent">Powered by AI</div>
        <h2 className="font-display mt-4 text-5xl font-bold text-white lg:text-6xl">Three AI Engines. One Mission.</h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <div
            key={i}
            className="reveal card-surface rounded-xl p-5"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="mb-3 h-8 w-8 rounded-md bg-gold/15 ring-1 ring-gold/30"/>
            <h3 className="font-display text-xl font-semibold text-white">{c.title}</h3>
            <p className="mt-2 text-[13.5px] leading-[1.6] text-ivory">{c.body}</p>
            <div className="mt-4 inline-flex rounded-full border border-gold/25 px-2.5 py-1 text-[10.5px] uppercase tracking-wider text-gold">{c.tag}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
