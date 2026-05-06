import { useEffect, useState } from "react";
import { AnimatedLine } from "../charts/AnimatedLine";
import { Download, CheckCircle2, Users, Gavel, Clock, Star, HeartHandshake, ShieldCheck } from "lucide-react";

const useCount = (target: number) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf: number; const start = performance.now();
    const step = (t: number) => { const p = Math.min(1, (t - start) / 1200); setV(Math.floor(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
};

export const Impact = () => {
  const a = useCount(124), b = useCount(86), c = useCount(412), d = useCount(48);
  const kpis = [
    { Icon: Users, l: "Citizens Helped", v: a, color: "#C9A84C" },
    { Icon: CheckCircle2, l: "Cases Resolved", v: b, color: "#5BC68C", sq: "green" },
    { Icon: Clock, l: "Pro Bono Hours", v: c, color: "#C9A84C" },
    { Icon: Star, l: "Avg Rating", v: "4.8", color: "#C9A84C" },
  ];
  return (
    <div className="lp-fade space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="lp-display text-[28px] font-bold text-white">Your Pro Bono Impact</h2>
        <button className="lp-btn lp-btn-gold-solid"><Download size={12} /> Download</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.l} className={`lp-kpi ${k.sq === "green" ? "lp-kpi-green" : ""}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[.12em] text-[#888]">{k.l}</div>
                <div className="lp-display text-[36px] font-bold mt-1 leading-none" style={{ color: k.color }}>{k.v}</div>
              </div>
              <div className={`lp-icon-sq ${k.sq || ""}`}><k.Icon size={18} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lp-card p-6 lp-lift">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[10.5px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Reach</div>
              <div className="lp-display text-[26px] font-bold text-white leading-tight mt-0.5">Citizens Helped</div>
            </div>
            <div className="lp-icon-sq"><HeartHandshake size={18} /></div>
          </div>
          <div className="lp-display text-[64px] font-bold text-[#C9A84C] leading-none lp-pop">{a}</div>
          <div className="text-[12.5px] text-[#aaa] mt-3">Across Punjab, Sindh and Balochistan.</div>
          <div className="mt-5 h-[2px] w-full rounded-full" style={{ background: "linear-gradient(90deg,#C9A84C,transparent)" }} />
        </div>
        <div className="lp-card p-6 lp-lift">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[10.5px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Outcomes</div>
              <div className="lp-display text-[26px] font-bold text-white leading-tight mt-0.5">Cases Resolved</div>
            </div>
            <div className="lp-icon-sq green"><ShieldCheck size={18} /></div>
          </div>
          <div className="lp-display text-[64px] font-bold text-[#5BC68C] leading-none lp-pop">{b}</div>
          <div className="text-[12.5px] text-[#aaa] mt-3">Justice delivered with no fee, no friction.</div>
          <div className="mt-5 h-[2px] w-full rounded-full" style={{ background: "linear-gradient(90deg,#5BC68C,transparent)" }} />
        </div>
      </div>

      <div className="lp-card p-5">
        <div className="text-[11px] uppercase tracking-[.15em] text-[#C9A84C] font-semibold mb-3">Resolution Trend (last 5 months)</div>
        <div className="lp-chart-glow">
          <AnimatedLine labels={["Dec", "Jan", "Feb", "Mar", "Apr"]} series={[
            { name: "Resolved", color: "#5BC68C", data: [12, 16, 18, 22, 18] },
            { name: "New", color: "#C9A84C", data: [18, 20, 19, 24, 22] },
            { name: "Pending", color: "#7AA8DD", data: [6, 8, 7, 9, 8] },
          ]} />
        </div>
      </div>

      <div className="lp-card p-5">
        <div className="text-[11px] uppercase tracking-[.15em] text-[#C9A84C] font-semibold mb-3">Impact Timeline</div>
        <ul className="space-y-3">
          {[
            { id: "HD-2399", t: "Workplace harassment resolved", date: "12 Apr 2026" },
            { id: "HD-2398", t: "Wrongful arrest released", date: "08 Apr 2026" },
            { id: "HD-2397", t: "Consumer fraud refund secured", date: "01 Apr 2026" },
            { id: "HD-2396", t: "Tenancy dispute settled", date: "27 Mar 2026" },
          ].map(x => (
            <li key={x.id} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[rgba(201,168,76,.06)] transition-colors">
              <CheckCircle2 size={16} className="text-[#5BC68C]" />
              <span className="text-[13px] text-white flex-1">{x.t}</span>
              <span className="text-[11px] text-[#C9A84C] font-mono">{x.id}</span>
              <span className="text-[11px] text-[#888]">{x.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
