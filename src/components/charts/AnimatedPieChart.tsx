import { useEffect, useRef, useState } from "react";

export type Slice = { label: string; value: number; color: string };

const defaults: Slice[] = [
  { label: "Labor", value: 28, color: "#C9A84C" },
  { label: "Property", value: 18, color: "#D4A017" },
  { label: "Domestic Violence", value: 16, color: "#C0392B" },
  { label: "Police Misconduct", value: 12, color: "#1E3A5F" },
  { label: "NADRA Issues", value: 10, color: "#8AB0E0" },
  { label: "Consumer Rights", value: 8, color: "#2C7A4D" },
  { label: "Harassment", value: 8, color: "#8B6BB1" },
];

export const AnimatedPieChart = ({ data = defaults, size = 260 }: { data?: Slice[]; size?: number }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = size / 2, cy = size / 2;
  const r = size * 0.4;
  const innerR = size * 0.2;

  let cumulative = 0;
  const slices = data.map((d) => {
    const start = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    cumulative += d.value;
    const end = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = cx + Math.cos(start) * r, y1 = cy + Math.sin(start) * r;
    const x2 = cx + Math.cos(end) * r, y2 = cy + Math.sin(end) * r;
    const ix1 = cx + Math.cos(end) * innerR, iy1 = cy + Math.sin(end) * innerR;
    const ix2 = cx + Math.cos(start) * innerR, iy2 = cy + Math.sin(start) * innerR;
    const path = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z`;
    const mid = (start + end) / 2;
    return { ...d, path, mid, pct: (d.value / total) * 100 };
  });

  return (
    <div className="relative inline-flex flex-col items-center w-full">
      <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
        <defs>
          <filter id="pie-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {visible && slices.map((s, i) => {
          const pop = hover === i ? 8 : 0;
          const tx = Math.cos(s.mid) * pop;
          const ty = Math.sin(s.mid) * pop;
          return (
            <g key={i} transform={`translate(${tx}, ${ty})`}
              style={{ transition: "transform 0.3s cubic-bezier(0.2,0.9,0.3,1.2), filter 0.3s", cursor: "none",
                filter: hover === i ? "url(#pie-glow)" : "none", transformOrigin: `${cx}px ${cy}px`,
                animation: `scaleIn 0.6s cubic-bezier(0.2,0.9,0.3,1.2) ${i * 0.08}s both` }}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <path d={s.path} fill={s.color} stroke="#0A0A0A" strokeWidth="2" opacity={hover === null || hover === i ? 1 : 0.45} />
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={innerR - 6} fill="#0A0A0A" />
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#fff" className="font-display" fontSize={size * 0.13} fontWeight="700">
          {hover !== null ? slices[hover].value : total}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#888880" fontSize="10" letterSpacing="1.5">
          {hover !== null ? slices[hover].label.toUpperCase() : "TOTAL"}
        </text>
      </svg>
      {hover !== null && (
        <div className="absolute pointer-events-none surface gold-border-strong rounded-xl px-3 py-2 text-[11px] shadow-2xl animate-scale-in"
          style={{ top: -10, left: "50%", transform: "translateX(-50%)" }}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: slices[hover].color }} />
            <span className="text-white font-semibold">{slices[hover].label}</span>
            <span className="text-gold">{slices[hover].pct.toFixed(1)}%</span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-5 w-full max-w-xs">
        {slices.map((s, i) => (
          <div key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            className="flex items-center gap-2 text-[11px] text-ivory/80 cursor-hover transition-all hover:text-gold">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: s.color }} />
            <span className="truncate">{s.label}</span>
            <span className="ml-auto text-muted-warm">{s.pct.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
