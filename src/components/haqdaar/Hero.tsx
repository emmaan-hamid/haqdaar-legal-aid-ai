import { useEffect, useState } from "react";

const headline = ["Know", "Your", "Rights.", "In", "Your", "Language.", "Resolved", "by", "AI."];

export const Hero = () => {
  const [typed, setTyped] = useState("");
  const sentence = "I was thrown out of my home without notice.";
  const [aiLines, setAiLines] = useState(0);
  const ai = [
    "Under the Pakistani Tenancy Law (1950), Section 6 —",
    "you cannot be evicted without 30 days' written notice.",
    "You may file a complaint at the Rent Controller's office.",
  ];

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(sentence.slice(0, ++i));
      if (i >= sentence.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typed.length < sentence.length) return;
    let i = 0;
    const id = setInterval(() => {
      setAiLines(++i);
      if (i >= ai.length) clearInterval(id);
    }, 700);
    return () => clearInterval(id);
  }, [typed]);

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

        {/* RIGHT - chat mock, shifted right to mirror left padding */}
        <div className="relative z-10 lg:pl-8 lg:pr-2">
          <div className="relative" style={{ animation: "float-y 5s ease-in-out infinite" }}>
            {/* back cards */}
            <div className="absolute inset-0 rounded-2xl bg-surface gold-border-soft" style={{ transform: "rotate(2deg) translate(14px,14px)" }}/>
            <div className="absolute inset-0 rounded-2xl bg-surface gold-border-soft" style={{ transform: "rotate(-3deg) translate(-12px,8px)" }}/>

            {/* front card */}
            <div className="relative rounded-2xl bg-surface p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]" style={{ border: "1px solid hsl(43 53% 54% / 0.45)", boxShadow: "0 0 0 1px hsl(43 53% 54% / 0.15), 0 30px 80px -20px rgba(0,0,0,0.6)" }}>
              <div className="flex items-center justify-between border-b border-gold/15 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-md bg-gold/15 grid place-items-center">
                    <span className="text-gold text-xs font-bold">H</span>
                  </div>
                  <div className="text-sm font-medium text-white">AI Legal Advisor</div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70"/>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"/>
                  </span>
                  Live
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-elevated px-3.5 py-2.5 text-[13.5px] text-ivory">
                  {typed}
                  <span className="ml-0.5 inline-block w-[1px] bg-ivory align-middle" style={{ height: "1em", animation: "blink-caret 1s steps(1) infinite" }}/>
                </div>

                <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-elevated px-3.5 py-3 text-[13px] leading-[1.6] text-ivory" style={{ borderLeft: "2px solid hsl(43 53% 54%)" }}>
                  {ai.slice(0, aiLines).map((l, i) => (
                    <div key={i} className="animate-fade-up">{l}</div>
                  ))}
                  {aiLines === 0 && typed.length >= sentence.length && (
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold"/>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold" style={{ animationDelay: "0.15s" }}/>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold" style={{ animationDelay: "0.3s" }}/>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Generate Notice", "Find a Lawyer", "Know Your Rights"].map((c) => (
                  <span key={c} className="rounded-full border border-gold/30 bg-background/40 px-3 py-1.5 text-[11.5px] text-ivory">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
