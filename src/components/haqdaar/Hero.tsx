import heroRobot from "@/assets/hero-robot.png";

const headline = ["Know", "Your", "Rights.", "In", "Your", "Language.", "Resolved", "by", "AI."];

export const Hero = () => {
  return (
    <section className="relative grain min-h-[88vh] overflow-hidden pt-32 pb-16">
      {/* Watermark scales */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0"
        style={{ animation: "pulse-scale 8s ease-in-out infinite" }}
      >
        <svg width="640" height="640" viewBox="0 0 200 200" fill="none" stroke="hsl(43 53% 54%)" strokeWidth="0.4" opacity="0.8">
          <line x1="100" y1="20" x2="100" y2="170"/>
          <line x1="60" y1="50" x2="140" y2="50"/>
          <path d="M60 50 L40 100 L80 100 Z M140 50 L120 100 L160 100 Z"/>
          <ellipse cx="60" cy="100" rx="22" ry="4"/>
          <ellipse cx="140" cy="100" rx="22" ry="4"/>
          <path d="M85 170 h30 M80 175 h40"/>
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[55%_45%] lg:gap-8 lg:px-10">
        {/* LEFT */}
        <div className="relative z-10">
          <div className="pill pill-gold inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold"/>
            Pakistan's First AI Legal Aid Platform
          </div>

          <h1 className="font-display mt-7 text-white" style={{ fontSize: "clamp(48px, 7vw, 86px)", lineHeight: 1.04, fontWeight: 700 }}>
            {headline.map((w, i) => (
              <span
                key={i}
                className="word mr-3"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {i >= 6 ? <span className="gold-text">{w}</span> : w}
              </span>
            ))}
          </h1>

          <div className="mt-6 h-px w-10 bg-gold/70"/>

          <p className="mt-6 max-w-[480px] text-[17px] leading-[1.7] text-ivory">
            Type your legal problem in Urdu or English. HaqDaar's AI reads Pakistani law,
            explains your rights, finds you a free lawyer, and generates the documents you
            need in under 10 seconds. 100% free. 100% anonymous.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="btn-gold rounded-full px-6 text-sm font-semibold" style={{ height: 48 }}>
              Get My Rights Analyzed
            </button>
            <button className="btn-ghost rounded-full px-6 text-sm font-medium" style={{ height: 48 }}>
              I'm a Lawyer or NGO
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px] text-muted-foreground">
            <span>Bank-Level Encryption</span>
            <span className="h-1 w-1 rounded-full bg-gold/70"/>
            <span>Urdu &amp; English</span>
            <span className="h-1 w-1 rounded-full bg-gold/70"/>
            <span>Rights in Under 10 Seconds</span>
            <span className="h-1 w-1 rounded-full bg-gold/70"/>
            <span>100% Free</span>
          </div>
        </div>

        {/* RIGHT - reserve grid space; actual robot is absolute on the section */}
        <div className="relative z-10 hidden lg:block" style={{ minHeight: "78vh" }} />
      </div>

      {/* FREE-FLOATING ROBOT - transparent PNG, no blend tricks */}
      <img
        src={heroRobot}
        alt="AI robot holding scales of justice — HaqDaar legal aid"
        className="hero-robot-img"
      />
    </section>
  );
};
