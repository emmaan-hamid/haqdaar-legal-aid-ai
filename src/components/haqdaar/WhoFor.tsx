import { useEffect, useState } from "react";

const audience = [
  { title: "Workers and Laborers", desc: "Wrongful termination, unpaid wages." },
  { title: "Women and Abuse Survivors", desc: "Domestic violence and harassment, fully anonymous." },
  { title: "Small Business Owners", desc: "Consumer rights and contract issues." },
  { title: "NGOs and Legal Aid Organizations", desc: "Digital case intake and case management." },
];

export const WhoFor = () => {
  const [typed, setTyped] = useState("");
  const sentence = "I was fired from my job without notice.";
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(sentence.slice(0, ++i));
      if (i >= sentence.length) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-t border-gold/15">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]">
        <div className="reveal bg-background px-6 py-24 lg:px-16">
          <div className="label-accent">Built for Every Pakistani</div>
          <h2 className="font-display mt-4 text-4xl font-bold text-white lg:text-5xl">
            Justice Was Never Meant to Be Only for the Rich.
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-[1.7] text-ivory">
            Whether you are a factory worker, a woman in danger, a tenant being illegally evicted, or
            an NGO drowning in unmanaged cases, HaqDaar was built for you.
          </p>

          <ul className="mt-10 divide-y divide-gold/15">
            {audience.map((a) => (
              <li key={a.title} className="group flex items-start justify-between gap-6 py-5">
                <div>
                  <div className="text-[15.5px] font-medium text-white">{a.title}</div>
                  <div className="mt-1 text-sm text-ivory/80">{a.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grain relative bg-[#0F0F0F] px-6 py-24 lg:px-12">
          <div className="rounded-xl border border-gold/30 bg-surface" style={{ animation: "float-y 6s ease-in-out infinite" }}>
            <div className="flex items-center gap-2 border-b border-gold/15 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-elevated"/>
                <span className="h-2.5 w-2.5 rounded-full bg-elevated"/>
                <span className="h-2.5 w-2.5 rounded-full bg-elevated"/>
              </div>
              <div className="ml-3 flex-1 rounded-md bg-elevated px-3 py-1 text-[11px] text-muted-foreground">haqdaar.pk/ask</div>
            </div>
            <div className="space-y-4 p-5">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-elevated px-3.5 py-2.5 text-[13px] text-ivory">
                {typed}<span className="ml-0.5 inline-block w-px align-middle" style={{ height: "1em", background: "currentColor", animation: "blink-caret 1s steps(1) infinite" }}/>
              </div>
              {typed.length === sentence.length && (
                <div className="rounded-xl border border-gold/25 bg-elevated p-4 animate-fade-up">
                  <div className="label-accent">Pakistani Law Citation</div>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-ivory">
                    Labor Act 2012, Section 11 — your employer must provide 30 days written notice
                    before terminating employment.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Find a Lawyer", "Generate Legal Notice", "What to Do Next"].map((b) => (
                      <button key={b} className="rounded-full border border-gold/35 bg-background/30 px-3 py-1.5 text-[11.5px] text-ivory hover:border-gold">{b}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
