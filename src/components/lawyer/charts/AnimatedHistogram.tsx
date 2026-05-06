import { useEffect, useRef, useState } from "react";

export const AnimatedHistogram = ({ labels, values, color = "#C9A84C", height = 220 }: { labels: string[]; values: number[]; color?: string; height?: number }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [w, setW] = useState(600);
  const [hover, setHover] = useState<number | null>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const ro = new ResizeObserver(es => { for (const e of es) setW(e.contentRect.width); });
    if (ref.current) ro.observe(ref.current);
    const t = setTimeout(() => setDrawn(true), 60);
    return () => { ro.disconnect(); clearTimeout(t); };
  }, []);
  const padL = 32, padR = 12, padT = 14, padB = 28;
  const innerW = w - padL - padR, innerH = height - padT - padB;
  const max = Math.max(1, ...values);
  const niceMax = Math.ceil(max / 5) * 5;
  const bw = innerW / values.length * 0.65;
  const gap = innerW / values.length * 0.35;
  return (
    <svg ref={ref} width="100%" height={height} className="overflow-visible">
      {[0, 0.5, 1].map((p, i) => (
        <g key={i}>
          <line x1={padL} x2={w - padR} y1={padT + p * innerH} y2={padT + p * innerH} stroke="#222" strokeDasharray="3 4" />
          <text x={padL - 6} y={padT + p * innerH + 4} textAnchor="end" fill="#666" fontSize="10">{Math.round(niceMax * (1 - p))}</text>
        </g>
      ))}
      {values.map((v, i) => {
        const h = (v / niceMax) * innerH;
        const x = padL + i * (bw + gap) + gap / 2;
        const y = padT + innerH - h;
        const active = hover === i;
        return (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "none" }}>
            <rect x={x} y={padT + innerH} width={bw} height={drawn ? h : 0} rx="4"
              fill={`url(#barGrad-${color.replace('#','')})`}
              style={{ transition: `height .9s cubic-bezier(.22,1,.36,1) ${i * 0.06}s, y .9s cubic-bezier(.22,1,.36,1) ${i * 0.06}s, filter .25s ease`, filter: active ? `drop-shadow(0 0 14px ${color})` : "none" }}
              {...(drawn ? { y } : {})} />
            <text x={x + bw / 2} y={height - 10} textAnchor="middle" fill="#888" fontSize="10">{labels[i]}</text>
            {active && <text x={x + bw / 2} y={y - 6} textAnchor="middle" fill={color} fontSize="11" fontWeight="600">{v}</text>}
          </g>
        );
      })}
      <defs>
        <linearGradient id={`barGrad-${color.replace('#','')}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
};
