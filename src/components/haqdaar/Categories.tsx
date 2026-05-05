const categories = ["Labor Law", "Employee Disputes", "Domestic Violence"];

export const Categories = () => (
  <section className="border-t border-gold/15 py-24">
    <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-10">
      <div className="reveal label-accent">Know Your Rights</div>
      <h2 className="reveal font-display mt-4 text-4xl font-bold text-white lg:text-5xl">
        Browse Pakistani Law. Before You Need It.
      </h2>
      <p className="reveal mx-auto mt-4 max-w-xl text-[16.5px] text-ivory">
        Don't wait for a crisis. Understand your rights now.
      </p>

      <div className="reveal relative mx-auto mt-10 max-w-2xl">
        <div className="group relative">
          <svg
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gold transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="e.g. tenant rights, wrongful termination, domestic violence law..."
            className="h-14 w-full rounded-full border border-gold/35 bg-surface pl-12 pr-5 text-[14px] text-ivory placeholder:text-muted-foreground transition-all duration-300 hover:border-gold hover:shadow-[0_0_30px_-5px_hsl(43_53%_54%/0.45)] focus:border-gold focus:outline-none focus:shadow-[0_0_0_4px_hsl(43_53%_54%/0.15),0_0_50px_-5px_hsl(43_53%_54%/0.6)]"
          />
        </div>
      </div>

      <div className="reveal mt-10 flex flex-wrap justify-center gap-4">
        {categories.map((c, i) => (
          <button
            key={c}
            className="pill border border-gold/30 bg-surface text-ivory transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_25px_-5px_hsl(43_53%_54%/0.4)]"
            style={{ transform: `rotate(${i % 2 ? 1 : -1.2}deg)`, padding: "12px 22px", fontSize: 14 }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  </section>
);
