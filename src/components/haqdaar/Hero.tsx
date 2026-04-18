import heroRobot from "@/assets/hero-robot.jpg";

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

      {/* Urdu watermark */}
      <div
        aria-hidden
        className="font-urdu pointer-events-none absolute right-[-40px] bottom-10 select-none text-[220px] text-white/[0.03]"
        style={{ transform: "rotate(-8deg)" }}
      >
        حق دار
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[58%_42%] lg:gap-8 lg:px-10">
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

        {/* RIGHT - animated robot showcase */}
        <div className="relative z-10 lg:pl-8 lg:pr-2">
          <div className="relative mx-auto" style={{ maxWidth: 460 }}>
            {/* orbiting glow rings */}
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(43 53% 54% / 0.25), transparent 65%)", animation: "pulse-scale 6s ease-in-out infinite" }}/>
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20"
              style={{ animation: "drift 14s ease-in-out infinite" }}/>
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
              style={{ animation: "drift 18s ease-in-out infinite reverse" }}/>

            {/* orbiting dots */}
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-gold" style={{ animation: "orbit 14s linear infinite", boxShadow: "0 0 12px hsl(43 53% 54%)" }}/>
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-gold/70" style={{ animation: "orbit-rev 20s linear infinite" }}/>

            {/* Pinterest stack — back cards */}
            <div className="absolute inset-0 rounded-3xl bg-surface gold-border-soft" style={{ transform: "rotate(3deg) translate(16px,18px)" }}/>
            <div className="absolute inset-0 rounded-3xl bg-surface gold-border-soft" style={{ transform: "rotate(-4deg) translate(-14px,10px)" }}/>

            {/* main image card */}
            <div
              className="relative overflow-hidden rounded-3xl bg-surface"
              style={{
                border: "1px solid hsl(43 53% 54% / 0.5)",
                boxShadow: "0 0 0 1px hsl(43 53% 54% / 0.15), 0 40px 100px -20px rgba(0,0,0,0.7), 0 0 60px -10px hsl(43 53% 54% / 0.35)",
                animation: "float-y 6s ease-in-out infinite",
              }}
            >
              <img
                src={heroRobot}
                alt="AI robot holding scales of justice — HaqDaar legal aid"
                width={1024}
                height={1280}
                className="block h-auto w-full"
              />
              {/* gold gradient overlay */}
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, hsl(0 0% 4% / 0.85) 100%)" }}/>
              {/* scanning gold line */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, hsl(43 53% 54% / 0.9), transparent)", boxShadow: "0 0 20px hsl(43 53% 54%)", animation: "scan-line 4s ease-in-out infinite" }}/>

              {/* corner brackets */}
              <span aria-hidden className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-gold/70"/>
              <span aria-hidden className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-gold/70"/>
              <span aria-hidden className="absolute left-3 bottom-3 h-5 w-5 border-l-2 border-b-2 border-gold/70"/>
              <span aria-hidden className="absolute right-3 bottom-3 h-5 w-5 border-r-2 border-b-2 border-gold/70"/>

              {/* live tag */}
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-gold/40 bg-background/70 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.2em] text-ivory backdrop-blur-md">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70"/>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"/>
                </span>
                AI · Live
              </div>

              {/* bottom caption */}
              <div className="absolute inset-x-4 bottom-4">
                <div className="font-display text-xl text-white">Justice, Reimagined.</div>
                <div className="text-[11.5px] text-ivory/80">AI trained on Pakistani law.</div>
              </div>
            </div>

            {/* floating chip — top right */}
            <div className="absolute -right-4 top-6 hidden rounded-xl border border-gold/40 bg-surface/90 px-3 py-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-md md:block"
              style={{ animation: "float-y 4.5s ease-in-out infinite" }}>
              <div className="text-[10px] uppercase tracking-[0.18em] text-gold">Rights</div>
              <div className="text-[12.5px] font-medium text-white">Analyzed in 8s</div>
            </div>

            {/* floating chip — bottom left */}
            <div className="absolute -left-4 bottom-12 hidden rounded-xl border border-gold/40 bg-surface/90 px-3 py-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-md md:block"
              style={{ animation: "float-y 5.5s ease-in-out infinite reverse" }}>
              <div className="text-[10px] uppercase tracking-[0.18em] text-gold">Lawyer</div>
              <div className="text-[12.5px] font-medium text-white">Matched · Free</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
