import { useState } from "react";

const faqs = [
  { q: "Is HaqDaar really free for citizens?", a: "Yes. HaqDaar is 100% free for every citizen of Pakistan. There are no hidden fees or paid tiers." },
  { q: "Can I use HaqDaar in Urdu?", a: "Yes. You can describe your problem and read your rights in both Urdu and English." },
  { q: "Will my information stay anonymous?", a: "Yes. You can submit cases without sharing personal details. The system warns you if you accidentally type identifying information." },
  { q: "How does the lawyer matching work?", a: "We match you with verified pro-bono lawyers based on specialty, availability, location, and rating, and return your top 3 options." },
  { q: "What documents can HaqDaar generate?", a: "FIR drafts, legal notices, labor court applications, NADRA appeals, tenancy notices, and harassment complaints, in PDF and Word." },
  { q: "What is the Quick Exit button and why does every page have it?", a: "The Quick Exit button is a red button permanently visible in the top-right corner of every single page on HaqDaar. If you are in a dangerous situation and someone walks in while you are using the platform, one click immediately closes the browser and redirects to an unrelated weather page. This was designed specifically for domestic violence and harassment survivors who may not be safe while seeking legal help." },
  { q: "How does HaqDaar know which Pakistani law applies to my problem?", a: "HaqDaar uses a technique called Retrieval Augmented Generation (RAG). Every section of Pakistani law — the Constitution, Labor Act, Protection of Women Against Violence Act, and more — is stored in a vector database. When you describe your problem, our AI reads your text and finds the 3 most relevant law sections by comparing meaning, not just keywords. This is then explained to you in plain Urdu or English." },
  { q: "What happens if my assigned lawyer does not respond?", a: "If your lawyer declines your case or does not respond, HaqDaar automatically notifies you and immediately shows you the next best available match — so you are never left without a path forward. You do not have to start the whole process again." },
  { q: "Can I use HaqDaar if I only speak Urdu?", a: "Yes, completely. Every part of HaqDaar — every button, label, error message, AI rights explanation, and generated legal document — exists in Urdu with proper right-to-left text layout. You can switch to Urdu using the language toggle at the top of every page." },
  { q: "Are the volunteer lawyers real and verified?", a: "Yes. Every lawyer on HaqDaar must provide their Pakistan Bar Council registration number before they can accept any case. Our admin team verifies this number before activating their account. Their specialization, location, current availability, and past citizen ratings are all visible to you before you send a request." },
  { q: "What if my problem does not fit any legal category?", a: "If our AI cannot confidently classify your problem, it will show you a list of the 7 legal categories and ask you to select the closest match. If still no relevant law is found, the system will connect you directly to a legal aid NGO and show you their contact details so you can get personal guidance." },
  { q: "How do I track what is happening with my case?", a: "After your case is submitted and a lawyer accepts it, you can log in to your Case Dashboard and see the full live status — every update your lawyer adds, every document shared, and any upcoming legal deadlines. You will also receive automatic email reminders 3 days before any important deadline so you never miss a critical date." },
  { q: "Is HaqDaar affiliated with the Pakistani government?", a: "HaqDaar is an independent academic platform developed at the University of Management and Technology (UMT), Lahore. It is not affiliated with any government body. We are actively seeking partnerships with organizations like AGHS Legal Aid Cell, Rozan, and the Aurat Foundation to provide real-world legal support." },
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
                className="group block w-full px-4 py-5 text-left transition-all duration-300 hover:px-6"
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
                    className={`text-[16px] font-medium transition-all duration-300 group-hover:text-gold ${
                      isOpen ? "text-gold" : "text-white"
                    }`}
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-[1.02]">
                      {f.q}
                    </span>
                  </span>
                  <span className={`text-gold transition-transform duration-300 group-hover:scale-125 ${isOpen ? "rotate-45" : ""}`}>+</span>
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
