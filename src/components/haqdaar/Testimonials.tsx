import { useEffect, useState } from "react";

const items = [
  { quote: "HaqDaar told me I had rights I never knew existed. I got my salary back without hiring a lawyer.", name: "Fatima R.", role: "Factory Worker, Lahore" },
  { quote: "Managing incoming cases manually was impossible. HaqDaar's NGO portal changed our entire workflow.", name: "Case Coordinator", role: "AGHS Legal Aid Cell" },
  { quote: "The FIR complaint it generated was more accurate than what I could have drafted manually.", name: "Pro-Bono Advocate", role: "Lahore High Court" },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 4500);
    return () => clearInterval(id);
  }, []);
  const t = items[i];
  return (
    <section className="border-t border-gold/15 py-24">
      <div className="mx-auto max-w-[1000px] px-6 text-center lg:px-10">
        <div className="reveal label-accent">Voices from the Ground</div>
        <h2 className="reveal font-display mt-4 text-4xl font-bold text-white lg:text-5xl">What People Are Saying</h2>

        <div className="reveal relative mt-12 min-h-[260px]">
          {items.map((it, idx) => (
            <article
              key={idx}
              className="absolute inset-0 mx-auto max-w-2xl rounded-2xl bg-surface p-8 transition-opacity duration-700"
              style={{ borderTop: "4px solid hsl(43 53% 54%)", opacity: idx === i ? 1 : 0, pointerEvents: idx === i ? "auto" : "none" }}
            >
              <div className="font-display text-7xl leading-none text-gold">"</div>
              <p className="-mt-6 text-[17px] italic leading-[1.7] text-ivory">{it.quote}</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gold text-sm font-bold text-background">{it.name[0]}</div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">{it.name}</div>
                  <div className="text-xs text-ivory/80">{it.role}</div>
                </div>
              </div>
              <div className="mt-3 flex justify-center gap-0.5 text-gold">{"★★★★★"}</div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-1.5 bg-gold/30"}`}/>
          ))}
        </div>
      </div>
    </section>
  );
};
