import { useState } from "react";

const faqs = [
  { q: "Is HaqDaar really free for citizens?", a: "Yes. HaqDaar is 100% free for every citizen of Pakistan. There are no hidden fees or paid tiers." },
  { q: "Can I use HaqDaar in Urdu?", a: "Yes. You can describe your problem and read your rights in both Urdu and English." },
  { q: "Will my information stay anonymous?", a: "Yes. You can submit cases without sharing personal details. The system warns you if you accidentally type identifying information." },
  { q: "How does the lawyer matching work?", a: "We match you with verified pro-bono lawyers based on specialty, availability, location, and rating, and return your top 3 options." },
  { q: "What documents can HaqDaar generate?", a: "FIR drafts, legal notices, labor court applications, NADRA appeals, tenancy notices, and harassment complaints, in PDF and Word." },
];

export const Faq = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="border-t border-gold/15 py-24">
      <div className="mx-auto max-w-[900px] px-6 lg:px-10">
        <div className="reveal text-center">
          <div className="label-accent">Frequently Asked</div>
          <h2 className="font-display mt-4 text-4xl font-bold text-white lg:text-5xl">Questions, Answered.</h2>
        </div>
        <div className="reveal mt-12 divide-y divide-gold/15 border-y border-gold/15">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="block w-full px-4 py-5 text-left transition-all duration-300"
                style={
                  isOpen
                    ? {
                        background:
                          "linear-gradient(90deg, hsl(43 53% 54% / 0.10) 0%, hsl(43 53% 54% / 0.02) 100%)",
                        boxShadow:
                          "inset 3px 0 0 hsl(43 53% 54%), 0 0 40px -10px hsl(43 53% 54% / 0.35)",
                      }
                    : undefined
                }
              >
                <div className="flex items-center justify-between gap-6">
                  <span
                    className={`text-[16px] font-medium transition-colors ${
                      isOpen ? "text-gold" : "text-white"
                    }`}
                  >
                    {f.q}
                  </span>
                  <span className={`text-gold transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </div>
                <div
                  className="grid overflow-hidden transition-all duration-300"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="min-h-0">
                    <p className="pt-3 text-[14.5px] leading-[1.7] text-ivory">{f.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
