import { useEffect, useRef, useState } from "react";

export type LineSeries = { name: string; color: string; data: number[] };

export const AnimatedLine = ({ labels, series, height = 240 }: { labels: string[]; series: LineSeries[]; height?: number }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [w, setW] = useState(600);
  const [hover, setHover] = useState<number | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const ro = new ResizeObserver((es) => { for (const e of es) setW(e.contentRect.width); });
    if (ref.current) ro.observe(ref.current);
    const t = setTimeout(() => setDrawn(true), 60);
    return () => { ro.disconnect(); clearTimeout(t); };
  }, []);

  const padL = 38, padR = 16, padT = 16, padB = 32;
  const innerW = w - padL - padR, innerH = height - padT - padB;
  const max = Math.max(1, ...series.flatMap(s => s.data));
  const niceMax = Math.ceil(max / 10) * 10;
  const x = (i: number) => padL + (i / (labels.length - 1)) * innerW;
  const y = (v: number) => padT + innerH - (v / niceMax) * innerH;

  return (
    <svg ref={ref} width="100%" height={height} className="overflow-visible">
      {/* grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
        <g key={i}>
          <line x1={padL} x2={w - padR} y1={padT + p * innerH} y2={padT + p * innerH} stroke="#222" strokeDasharray="3 4" />
          <text x={padL - 8} y={padT + p * innerH + 4} textAnchor="end" fill="#666" fontSize="10">{Math.round(niceMax * (1 - p))}</text>
        </g>
      ))}
      {labels.map((l, i) => (
        <text key={i} x={x(i)} y={height - 10} textAnchor="middle" fill="#888" fontSize="10">{l}</text>
      ))}
      {/* lines */}
      {series.map((s, si) => {
        const path = s.data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
        return (
          <g key={si}>
            <path d={path} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="lp-line-path"
              style={{ ['--glow' as any]: s.color, strokeDasharray: 2000, strokeDashoffset: drawn ? 0 : 2000, transition: `stroke-dashoffset 1.6s ease ${si * 0.2}s, filter .25s ease` }} />
            {s.data.map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r={hover === i ? 5 : 3.2} fill={s.color}
                style={{ transition: "r .2s ease, filter .2s ease", filter: hover === i ? `drop-shadow(0 0 8px ${s.color})` : "none", cursor: "none" }}
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
            ))}
          </g>
        );
      })}
      {hover !== null && (
        <g>
          <line x1={x(hover)} x2={x(hover)} y1={padT} y2={padT + innerH} stroke="#C9A84C" strokeOpacity=".4" strokeDasharray="3 3" />
          <foreignObject x={Math.min(x(hover) + 8, w - 140)} y={padT + 4} width="130" height="80">
            <div style={{ background: "#1E1E1E", border: "1px solid #C9A84C99", borderRadius: 10, padding: "6px 10px", fontSize: 11, color: "#E8E0D0" }}>
              <div style={{ color: "#C9A84C", fontSize: 10, marginBottom: 2 }}>{labels[hover]}</div>
              {series.map(s => (
                <div key={s.name} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span><span style={{ color: s.color }}>●</span> {s.name}</span><span style={{ color: "#fff" }}>{s.data[hover]}</span>
                </div>
              ))}
            </div>
          </foreignObject>
        </g>
      )}
    </svg>
  );
};
