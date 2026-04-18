import heroRobot from "@/assets/hero-robot.jpg";

const headline = ["Know", "Your", "Rights.", "In", "Your", "Language.", "Resolved", "by", "AI."];

const particles = [
  { top: "28%", right: "38%", duration: "2.8s", delay: "0s" },
  { top: "32%", right: "33%", duration: "3.2s", delay: "0.3s" },
  { top: "25%", right: "30%", duration: "2.5s", delay: "0.6s" },
  { top: "38%", right: "36%", duration: "3.5s", delay: "0.9s" },
  { top: "30%", right: "42%", duration: "2.9s", delay: "0.2s" },
  { top: "22%", right: "35%", duration: "3.1s", delay: "0.5s" },
  { top: "42%", right: "29%", duration: "2.7s", delay: "0.8s" },
  { top: "35%", right: "40%", duration: "3.3s", delay: "0.4s" },
];

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

      {/* Atmospheric glows behind the robot */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          right: 0,
          bottom: 0,
          width: "55%",
          height: "100%",
          background: "radial-gradient(ellipse at 60% 60%, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.04) 35%, transparent 65%)",
          zIndex: 2,
          animation: "glowBreathe 6s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          right: "20%",
          top: "10%",
          width: 280,
          height: 280,
          background: "radial-gradient(circle, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.05) 50%, transparent 70%)",
          zIndex: 2,
          animation: "glowBreathe 4s ease-in-out infinite 1s",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          right: "5%",
          bottom: 0,
          width: 500,
          height: 60,
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 70%)",
          filter: "blur(24px)",
          zIndex: 2,
        }}
      />

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

        {/* RIGHT - reserve grid space; actual robot is absolute on the section */}
        <div className="relative z-10 hidden lg:block" style={{ minHeight: "70vh" }} />
      </div>

      {/* FREE-FLOATING ROBOT */}
      <img
        src={heroRobot}
        alt="AI robot holding scales of justice — HaqDaar legal aid"
        className="hero-robot-img"
      />

      {/* Floating chips */}
      <div
        className="absolute hidden md:block"
        style={{
          top: "14%",
          right: "3%",
          zIndex: 5,
          background: "rgba(12,12,12,0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(201,168,76,0.3)",
          borderLeft: "3px solid #C9A84C",
          borderRadius: 8,
          padding: "10px 16px",
          animation: "chipFloat1 3.4s ease-in-out infinite alternate",
        }}
      >
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#C9A84C", textTransform: "uppercase", letterSpacing: "0.12em" }}>Coverage</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "white", fontWeight: 700 }}>7 Legal Categories</div>
      </div>

      <div
        className="absolute hidden md:block"
        style={{
          top: "44%",
          right: "1%",
          zIndex: 5,
          background: "rgba(12,12,12,0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(201,168,76,0.3)",
          borderLeft: "3px solid #C9A84C",
          borderRadius: 8,
          padding: "10px 16px",
          animation: "chipFloat2 4.2s ease-in-out infinite alternate",
        }}
      >
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#C9A84C", textTransform: "uppercase", letterSpacing: "0.12em" }}>Privacy</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "white", fontWeight: 700 }}>Anonymous Mode</div>
      </div>

      <div
        className="absolute hidden md:block"
        style={{
          bottom: "20%",
          right: "4%",
          zIndex: 5,
          background: "rgba(12,12,12,0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(201,168,76,0.3)",
          borderLeft: "3px solid #C9A84C",
          borderRadius: 8,
          padding: "10px 16px",
          animation: "chipFloat3 3.8s ease-in-out infinite alternate",
        }}
      >
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#C9A84C", textTransform: "uppercase", letterSpacing: "0.12em" }}>Documents</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "white", fontWeight: 700 }}>Auto Legal Docs</div>
      </div>

      {/* Gold particles near scales */}
      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: p.top,
            right: p.right,
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#C9A84C",
            zIndex: 4,
            boxShadow: "0 0 6px rgba(201,168,76,0.8)",
            animation: `particleDrift ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </section>
  );
};
