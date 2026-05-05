import { useEffect, useRef, useState } from "react";

type Point = { label: string; production: number; sale: number; marketing: number };

const defaultData: Point[] = [
  { label: "Wk 1", production: 18, sale: 16, marketing: 5 },
  { label: "Wk 2", production: 26, sale: 14, marketing: 23 },
  { label: "Wk 3", production: 23, sale: 19, marketing: 19 },
  { label: "Wk 4", production: 35, sale: 19, marketing: 15 },
  { label: "Wk 5", production: 36, sale: 12, marketing: 29 },
  { label: "Wk 6", production: 31, sale: 17, marketing: 24 },
  { label: "Wk 7", production: 38, sale: 14, marketing: 27 },
  { label: "Wk 8", production: 42, sale: 18, marketing: 31 },
];

type Series = { key: keyof Omit<Point, "label">; color: string; label: string };
const series: Series[] = [
  { key: "production", color: "#C9A84C", label: "Resolved" },
  { key: "sale", color: "#8AB0E0", label: "Active" },
  { key: "marketing", color: "#6FCF97", label: "New" },
];

export const AnimatedLineChart = ({ data = defaultData, height = 280 }: { data?: Point[]; height?: number }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [chartHover, setChartHover] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const W = 720, H = height, P = { l: 44, r: 24, t: 24, b: 36 };
  const max = 50;
  const x = (i: number) => P.l + (i * (W - P.l - P.r)) / (data.length - 1);
  const y = (v: number) => P.t + (1 - v / max) * (H - P.t - P.b);
  const buildPath = (key: Series["key"]) => data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d[key])}`).join(" ");

  return (
    <div className="relative w-full" onMouseEnter={() => setChartHover(true)} onMouseLeave={() => setChartHover(false)}>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
          <filter id="glow-line"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {[0, 10, 20, 30, 40, 50].map((g) => (
          <g key={g}>
            <line x1={P.l} x2={W - P.r} y1={y(g)} y2={y(g)} stroke="rgba(201,168,76,0.08)" />
            <text x={P.l - 10} y={y(g) + 4} textAnchor="end" fill="#888880" fontSize="10">{g}</text>
          </g>
        ))}
        {data.map((d, i) => (
          <text key={i} x={x(i)} y={H - 12} textAnchor="middle" fill="#888880" fontSize="10">{d.label}</text>
        ))}
        {visible && series.map((s) => {
          const area = `${buildPath(s.key)} L ${x(data.length - 1)} ${H - P.b} L ${x(0)} ${H - P.b} Z`;
          return <path key={`a-${s.key}`} d={area} fill={`url(#grad-${s.key})`} className="animate-fade-in" style={{ animationDelay: "1.6s", animationDuration: "1s", opacity: 0, animationFillMode: "forwards" }} />;
        })}
        {visible && series.map((s, idx) => (
          <path key={s.key} d={buildPath(s.key)} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            filter={chartHover ? "url(#glow-line)" : undefined}
            style={{ strokeDasharray: 1600, strokeDashoffset: 1600, animation: `drawLine 1.8s ease-out ${idx * 0.25}s forwards`, transition: "filter 0.3s ease" }} />
        ))}
        {visible && series.map((s) => data.map((d, i) => (
          <circle key={`${s.key}-${i}`} cx={x(i)} cy={y(d[s.key])} r={hover === i ? 5 : 3} fill="#0A0A0A" stroke={s.color} strokeWidth="2"
            style={{ transition: "r 0.2s", filter: hover === i ? `drop-shadow(0 0 6px ${s.color})` : "none" }}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
        )))}
        {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke="rgba(201,168,76,0.35)" strokeDasharray="3 3" />}
        {data.map((_, i) => (
          <rect key={i} x={x(i) - 24} y={P.t} width="48" height={H - P.t - P.b} fill="transparent" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
        ))}
      </svg>
      {hover !== null && (
        <div className="absolute pointer-events-none surface gold-border-strong rounded-xl px-3 py-2 text-[11px] shadow-2xl"
          style={{ left: `calc(${(x(hover) / W) * 100}% + 8px)`, top: 12 }}>
          <div className="text-gold font-semibold mb-1">{data[hover].label}</div>
          {series.map((s) => (
            <div key={s.key} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              <span className="text-ivory/70 w-16">{s.label}</span>
              <span className="text-white font-semibold">{data[hover][s.key]}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center gap-6 mt-3">
        {series.map((s) => (
          <div key={s.key} className="flex items-center gap-2 text-[12px] text-ivory/80">
            <span className="w-3 h-3 rounded-sm" style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
};
