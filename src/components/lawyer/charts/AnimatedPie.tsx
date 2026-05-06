import { useEffect, useState } from "react";

export type PieSlice = { label: string; value: number; color: string };

export const AnimatedPie = ({ data, size = 220, label = "Total" }: { data: PieSlice[]; size?: number; label?: string }) => {
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = size / 2, cy = size / 2, r = size / 2 - 12, ir = r * 0.55;

  useEffect(() => {
    let raf: number; const start = performance.now(); const dur = 1100;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  let acc = 0;
  const slices = data.map((d, i) => {
    const start = acc / total * Math.PI * 2;
    acc += d.value;
    const end = start + (d.value / total) * Math.PI * 2 * progress;
    const explode = hover === i ? 8 : 0;
    const mid = (start + end) / 2;
    const ox = Math.cos(mid - Math.PI / 2) * explode;
    const oy = Math.sin(mid - Math.PI / 2) * explode;
    const large = end - start > Math.PI ? 1 : 0;
    const sx = cx + Math.cos(start - Math.PI / 2) * r;
    const sy = cy + Math.sin(start - Math.PI / 2) * r;
    const ex = cx + Math.cos(end - Math.PI / 2) * r;
    const ey = cy + Math.sin(end - Math.PI / 2) * r;
    const isx = cx + Math.cos(end - Math.PI / 2) * ir;
    const isy = cy + Math.sin(end - Math.PI / 2) * ir;
    const iex = cx + Math.cos(start - Math.PI / 2) * ir;
    const iey = cy + Math.sin(start - Math.PI / 2) * ir;
    const path = `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey} L ${isx} ${isy} A ${ir} ${ir} 0 ${large} 0 ${iex} ${iey} Z`;
    return { path, color: d.color, ox, oy, label: d.label, value: d.value, pct: Math.round((d.value / total) * 100) };
  });

  return (
    <div className="relative inline-block">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {slices.map((s, i) => (
          <g key={i} transform={`translate(${s.ox} ${s.oy})`} style={{ color: s.color }}>
            <path d={s.path} fill={s.color} className="lp-pie-slice"
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              style={{
                filter: hover === i ? `drop-shadow(0 0 16px ${s.color}) drop-shadow(0 0 28px ${s.color})` : "none",
                opacity: hover === null ? 1 : (hover === i ? 1 : 0.18),
                transition: "opacity .25s ease, filter .25s ease"
              }} />
          </g>
        ))}
        {hover === null ? (
          <>
            <text x={cx} y={cy - 6} textAnchor="middle" fill="#fff" fontFamily="Cormorant Garamond" fontSize="28" fontWeight="700">{total}</text>
            <text x={cx} y={cy + 14} textAnchor="middle" fill="#888880" fontSize="10" letterSpacing="2">{label.toUpperCase()}</text>
          </>
        ) : (
          <>
            <text x={cx} y={cy - 8} textAnchor="middle" fill={slices[hover].color} fontFamily="Cormorant Garamond" fontSize="26" fontWeight="700">{slices[hover].value}</text>
            <text x={cx} y={cy + 12} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600" letterSpacing="1">{slices[hover].label.toUpperCase()}</text>
            <text x={cx} y={cy + 28} textAnchor="middle" fill="#888" fontSize="10">{slices[hover].pct}%</text>
          </>
        )}
      </svg>
      {hover !== null && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-[#1E1E1E] border border-[#C9A84C]/60 rounded-xl px-3 py-2 text-xs whitespace-nowrap shadow-xl z-10">
          <span style={{ color: slices[hover].color }}>●</span>{" "}
          <span className="text-white font-semibold">{slices[hover].label}</span>{" "}
          <span className="text-[#888]">{slices[hover].value} • {slices[hover].pct}%</span>
        </div>
      )}
    </div>
  );
};
