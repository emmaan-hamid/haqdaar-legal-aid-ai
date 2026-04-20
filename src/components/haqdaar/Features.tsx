const cards = [
  { title: "Legal Issue Classifier", body: "Reads Urdu and English, classifies into 7 categories: Labor, Property, Domestic Violence, Police, Consumer, Tenancy, Harassment.", tag: "Smart Categorization" },
  { title: "Rights Analyzer", body: "Retrieves the most relevant Pakistani law sections. Explains your rights and penalties in plain language.", tag: "Plain Language" },
  { title: "Smart Lawyer Matching", body: "Scores by specialty, availability, proximity, and rating. Returns your top 3 matches.", tag: "Top 3 Matches" },
  { title: "Legal Document Generator", body: "Auto-drafts FIR, legal notices, labor court applications, NADRA appeals, tenancy notices, and harassment complaints. PDF and Word.", tag: "Instant Download" },
];

export const Features = () => (
  <section className="border-t border-gold/15 py-24">
    <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
      <div className="reveal text-center">
        <div className="label-accent">Powered by AI</div>
        <h2 className="font-display mt-4 text-5xl font-bold text-white lg:text-6xl">Three AI Engines. One Mission.</h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <div
            key={i}
            className="reveal feature-card group relative flex h-full flex-col rounded-xl p-6"
            style={{
              transitionDelay: `${i * 80}ms`,
              minHeight: 280,
              border: "1.5px solid hsl(43 53% 54% / 0.45)",
              boxShadow: "inset 0 0 0 1px hsl(43 53% 54% / 0.12)",
            }}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-gold/15 text-[15px] font-semibold text-gold ring-1 ring-gold/40 transition-all duration-300 group-hover:bg-gold/25 group-hover:ring-gold">
              {i + 1}
            </div>
            <h3 className="font-display text-xl font-semibold text-white">{c.title}</h3>
            <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-ivory">{c.body}</p>
            <div className="mt-4 h-px w-full bg-gold/20"/>
            <div className="mt-4 inline-flex w-fit rounded-full border border-gold/25 px-2.5 py-1 text-[10.5px] uppercase tracking-wider text-gold">
              {c.tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
