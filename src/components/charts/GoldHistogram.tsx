import { useEffect, useRef, useState } from "react";

const data = [
  { label: "Mon", v: 8 }, { label: "Tue", v: 14 }, { label: "Wed", v: 11 },
  { label: "Thu", v: 19 }, { label: "Fri", v: 16 }, { label: "Sat", v: 22 }, { label: "Sun", v: 18 },
  { label: "Wk 8", v: 24 },
];

export const GoldHistogram = ({ height = 220 }: { height?: number }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const W = 600, H = height, P = { l: 36, r: 18, t: 18, b: 30 };
  const max = 28;
  const bw = (W - P.l - P.r) / data.length;

  return (
    <div className="relative w-full">
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }}>
        <defs>
          <linearGradient id="bar-gold" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#E8C25E" /><stop offset="60%" stopColor="#C9A84C" /><stop offset="100%" stopColor="#8B7330" />
          </linearGradient>
          <filter id="bar-glow"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        {[0, 7, 14, 21, 28].map((g) => {
          const y = P.t + (1 - g / max) * (H - P.t - P.b);
          return (
            <g key={g}>
              <line x1={P.l} x2={W - P.r} y1={y} y2={y} stroke="rgba(201,168,76,0.08)" />
              <text x={P.l - 8} y={y + 4} textAnchor="end" fill="#888880" fontSize="10">{g}</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const h = (d.v / max) * (H - P.t - P.b);
          const x = P.l + i * bw + bw * 0.18;
          const y = H - P.b - h;
          const w = bw * 0.64;
          return (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              {visible && hover === i && <rect x={x - 4} y={y - 6} width={w + 8} height={h + 6} fill="#C9A84C" opacity="0.18" filter="url(#bar-glow)" rx="6" />}
              <rect x={x} width={w} rx="6" y={visible ? y : H - P.b} height={visible ? h : 0} fill="url(#bar-gold)"
                style={{ transition: `y 1s cubic-bezier(0.2,0.9,0.3,1.1) ${i * 0.08}s, height 1s cubic-bezier(0.2,0.9,0.3,1.1) ${i * 0.08}s, filter 0.25s`,
                  filter: hover === i ? "drop-shadow(0 0 12px rgba(201,168,76,0.85))" : "drop-shadow(0 4px 10px rgba(201,168,76,0.25))" }} />
              {hover === i && <text x={x + w / 2} y={y - 10} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">{d.v}</text>}
              <text x={x + w / 2} y={H - 10} textAnchor="middle" fill="#888880" fontSize="10">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
