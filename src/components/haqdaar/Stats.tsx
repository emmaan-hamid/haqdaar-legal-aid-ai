import { useEffect, useRef, useState } from "react";

const items = [
  { num: "70%", label: "Pakistanis Can't Afford a Lawyer", desc: "HaqDaar bridges this gap" },
  { num: "06", label: "Legal Categories Covered", desc: "Labor, Property, Family, Criminal, Consumer, Harassment" },
  { num: "03", label: "AI Modules", desc: "Classifier, Matcher, Document Generator" },
  { num: "02", label: "Languages", desc: "Urdu (اردو) and English" },
  { num: "∞", label: "Anonymous Submissions", desc: "Zero personal data required" },
];

const Counter = ({ target }: { target: string }) => {
  const [val, setVal] = useState(target.match(/\d/) ? "0" : target);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!/\d/.test(target)) return;
    const num = parseInt(target);
    const suffix = target.replace(/\d/g, "");
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          let cur = 0;
          const step = Math.max(1, Math.ceil(num / 30));
          const id = setInterval(() => {
            cur += step;
            if (cur >= num) { cur = num; clearInterval(id); }
            setVal(cur.toString().padStart(target.length - suffix.length, "0") + suffix);
          }, 35);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{val}</span>;
};

export const Stats = () => (
  <section className="border-t border-b border-gold/15 py-20">
    <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 px-6 lg:grid-cols-5 lg:gap-0 lg:px-10">
      {items.map((it, i) => (
        <div
          key={i}
          className={`reveal px-6 ${i > 0 ? "lg:border-l lg:border-gold/15" : ""}`}
          style={{ transitionDelay: `${i * 100}ms` }}
        >
          <div className="font-display text-5xl font-bold text-gold lg:text-6xl">
            <Counter target={it.num}/>
          </div>
          <div className="mt-3 text-sm font-medium text-white">{it.label}</div>
          <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.desc}</div>
        </div>
      ))}
    </div>
  </section>
);
