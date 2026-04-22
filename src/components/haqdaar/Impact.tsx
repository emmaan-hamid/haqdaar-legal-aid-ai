import { useEffect, useRef, useState } from "react";

const items = [
  { num: "70%", label: "of Pakistanis Cannot Afford a Lawyer — HaqDaar Exists for Them" },
  { num: "450,000+", label: "Legal Help Requests Filed in Pakistan Annually" },
  { num: "10 Sec", label: "Average Time for AI Rights Analysis" },
  { num: "100%", label: "Free — No Subscription, No Hidden Fees, Ever" },
];

const Counter = ({ target }: { target: string }) => {
  const [val, setVal] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const m = target.match(/^([\d,]+)(.*)$/);
    if (!m) return;
    const numStr = m[1].replace(/,/g, "");
    const suffix = m[2];
    const num = parseInt(numStr);
    if (Number.isNaN(num)) return;
    setVal("0" + suffix);
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          let cur = 0;
          const step = Math.max(1, Math.ceil(num / 40));
          const id = setInterval(() => {
            cur += step;
            if (cur >= num) { cur = num; clearInterval(id); }
            setVal(cur.toLocaleString() + suffix);
          }, 25);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{val}</span>;
};

export const Impact = () => (
  <section className="border-t border-gold/15 py-24">
    <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
      <div className="reveal text-center">
        <div className="label-accent">The Numbers Speak</div>
        <h2 className="font-display mt-4 text-4xl font-bold text-white lg:text-5xl">
          Impact, Measured in Lives Changed
        </h2>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={i}
            className="reveal card-surface rounded-xl p-7 text-center"
            style={{ transitionDelay: `${i * 100}ms`, borderLeft: "3px solid hsl(43 53% 54%)" }}
          >
            <div className="font-display text-5xl font-bold text-gold lg:text-6xl">
              <Counter target={it.num}/>
            </div>
            <div className="mt-4 text-[13.5px] leading-relaxed text-ivory/85">{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);