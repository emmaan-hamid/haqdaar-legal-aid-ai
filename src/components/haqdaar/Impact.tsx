import { useEffect, useRef, useState } from "react";

const items = [
  { num: 70, suffix: "%", label: "of Pakistanis Cannot Afford a Lawyer — HaqDaar Exists for Them" },
  { num: 450000, suffix: "+", label: "Legal Help Requests Filed in Pakistan Annually", format: true },
  { num: 10, suffix: " Sec", label: "Average Time for AI Rights Analysis" },
  { num: 100, suffix: "%", label: "Free — No Subscription, No Hidden Fees, Ever" },
];

const Counter = ({ target, suffix, format }: { target: number; suffix: string; format?: boolean }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const dur = 1400;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setVal(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return (
    <div ref={ref} className="font-display text-5xl font-bold text-gold lg:text-6xl">
      {format ? val.toLocaleString() : val}{suffix}
    </div>
  );
};

export const Impact = () => (
  <section className="border-t border-gold/15 py-24">
    <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
      <div className="reveal text-center">
        <div className="label-accent">The Numbers Speak</div>
        <h2 className="font-display mt-4 text-4xl font-bold text-white lg:text-5xl">Impact, Measured.</h2>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={i}
            className="reveal card-surface rounded-xl p-7 text-center"
            style={{ transitionDelay: `${i * 80}ms`, borderLeft: "3px solid hsl(43 53% 54%)" }}
          >
            <Counter target={it.num} suffix={it.suffix} format={it.format} />
            <div className="mt-3 text-[13.5px] leading-[1.6] text-ivory/85">{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
