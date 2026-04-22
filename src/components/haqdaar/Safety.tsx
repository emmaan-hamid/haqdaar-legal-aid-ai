import { ShieldAlert, Lock, UserCheck } from "lucide-react";

const cards = [
  {
    icon: ShieldAlert,
    accent: "hsl(var(--emergency))",
    title: "Quick Exit Button",
    body: "A red button is permanently visible on every single page. One click closes HaqDaar instantly and redirects your browser to a weather page. No trace left. Designed for domestic abuse survivors.",
  },
  {
    icon: Lock,
    accent: "hsl(43 53% 54%)",
    title: "Zero Identity Required",
    body: "Submit your entire case, get your rights analysis, and receive a legal document — without ever entering your name, phone number, email, or CNIC. A reference code is your only identifier.",
  },
  {
    icon: UserCheck,
    accent: "hsl(43 53% 54%)",
    title: "Volunteer Human Review",
    body: "High-risk cases (domestic violence, harassment) are automatically flagged and reviewed by a trained legal volunteer before any document or result is sent — ensuring your safety first.",
  },
];

export const Safety = () => (
  <section className="border-t border-gold/15 py-24">
    <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
      <div className="reveal text-center">
        <div className="label-accent">Your Safety Is Our Priority</div>
        <h2 className="font-display mt-4 text-4xl font-bold text-white lg:text-5xl">
          Built for the <span className="gold-text">Most Vulnerable</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15.5px] text-ivory/80">
          We designed every feature thinking about someone who is afraid, alone, and in danger.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className="reveal card-surface flex flex-col rounded-xl p-7"
              style={{ transitionDelay: `${i * 120}ms`, borderLeft: `3px solid ${c.accent}`, minHeight: 280 }}
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ background: `${c.accent.includes("emergency") ? "hsl(var(--emergency) / 0.12)" : "hsl(43 53% 54% / 0.12)"}`, color: c.accent }}
              >
                <Icon size={22}/>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white">{c.title}</h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-ivory/85">{c.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);