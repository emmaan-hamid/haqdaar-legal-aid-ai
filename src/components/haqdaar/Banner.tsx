export const Banner = () => (
  <section className="relative overflow-hidden border-t border-gold/15 py-28">
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, hsl(43 53% 54%) 0 1px, transparent 1px 80px)",
      }}
    />
    <div className="relative mx-auto max-w-[1100px] px-6 text-center lg:px-10">
      <div className="reveal pill pill-gold inline-flex items-center gap-2">
        Built for Pakistan. Free Forever for Citizens.
      </div>
      <h2 className="reveal font-display mx-auto mt-6 max-w-3xl text-5xl font-bold text-white lg:text-6xl">
        Your <span className="gold-text">Rights</span>, Just One Click Away.
      </h2>
      <p className="reveal mx-auto mt-5 max-w-xl text-[16.5px] text-ivory">
        No lawyer. No fees. No legal jargon. Just your rights, in your language, in seconds.
      </p>

      <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12.5px] text-muted-foreground">
        <span>End-to-End Encrypted</span>
        <span className="h-1 w-1 rounded-full bg-gold/70"/>
        <span>Urdu &amp; English</span>
        <span className="h-1 w-1 rounded-full bg-gold/70"/>
        <span>Rights in Under 10 Seconds</span>
      </div>
    </div>
  </section>
);
