const steps = [
  {
    n: "01",
    title: "Describe Your Problem",
    body: "Type in plain Urdu or English. Our AI understands everyday language. No legal terms required.",
    chip: "Supports: اردو and English",
  },
  {
    n: "02",
    title: "AI Reads Pakistani Law",
    body: "Our system classifies your case, retrieves the relevant Pakistani law sections, and explains your rights in simple words.",
    chip: "Instant Analysis",
  },
  {
    n: "03",
    title: "Act With Confidence",
    body: "Get matched to a free lawyer. Download your auto-generated FIR, legal notice, or court application. Track your case with deadline reminders.",
    chip: "Free, Anonymous, Instant",
  },
];

export const Process = () => (
  <section className="relative overflow-hidden border-t border-gold/15 py-24">
    {/* Floating context chips */}
    <div
      className="absolute hidden md:block"
      style={{
        top: "10%",
        right: "4%",
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
        left: "3%",
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
        bottom: "10%",
        right: "5%",
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
    {/* Minimalist animated background */}
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* faint grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(43 53% 54%)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>

      {/* radial glows */}
      <div className="absolute left-[20%] top-1/3 h-[420px] w-[420px] rounded-full" style={{ background: "radial-gradient(circle, hsl(43 53% 54% / 0.12), transparent 70%)", animation: "drift 12s ease-in-out infinite" }}/>
      <div className="absolute right-[15%] bottom-10 h-[360px] w-[360px] rounded-full" style={{ background: "radial-gradient(circle, hsl(43 53% 54% / 0.08), transparent 70%)", animation: "drift 16s ease-in-out infinite reverse" }}/>

      {/* orbiting dots */}
      <div className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-gold/40" style={{ animation: "orbit 18s linear infinite" }}/>
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-gold/30" style={{ animation: "orbit-rev 24s linear infinite" }}/>

      {/* connector dotted line */}
      <svg className="absolute left-0 top-1/2 hidden w-full -translate-y-1/2 lg:block" height="2" preserveAspectRatio="none">
        <line x1="0" y1="1" x2="100%" y2="1" stroke="hsl(43 53% 54% / 0.35)" strokeDasharray="4 8" strokeWidth="1"
          style={{ animation: "dash-flow 8s linear infinite" }}/>
      </svg>
    </div>

    <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
      <div className="reveal text-center">
        <div className="label-accent">The Process</div>
        <h2 className="font-display mt-4 text-5xl font-bold text-white lg:text-6xl">From Problem to Protection</h2>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] text-ivory">
          Three steps. No legal knowledge needed. No fees.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className="reveal card-surface relative flex h-full flex-col rounded-2xl p-7"
            style={{
              transitionDelay: `${i * 120}ms`,
              borderLeft: "3px solid hsl(43 53% 54%)",
              minHeight: 320,
            }}
          >
            <div className="font-display text-5xl font-bold text-gold">{s.n}</div>
            <h3 className="font-display mt-3 text-2xl font-semibold text-white">{s.title}</h3>
            <p className="mt-3 flex-1 text-[14.5px] leading-[1.65] text-ivory">{s.body}</p>
            <div className="mt-5 inline-flex w-fit rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5 text-[11px] text-ivory">
              {s.chip}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
