import { useEffect, useState } from "react";
import { AnimatedLine } from "../charts/AnimatedLine";
import { AnimatedPie } from "../charts/AnimatedPie";
import { Download, CheckCircle2, Users, Clock, Star, Award } from "lucide-react";

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
  const a = useCount(124), b = useCount(86), c = useCount(412);
  const kpis = [
    { Icon: Users, l: "Citizens Helped", v: String(a), sub: "+12 this month", color: "#C9A84C" },
    { Icon: Award, l: "Cases Resolved", v: String(b), sub: "92% success rate", color: "#5BC68C", sq: "green" },
    { Icon: Clock, l: "Pro Bono Hours", v: String(c), sub: "Top 5% nationally", color: "#C9A84C" },
    { Icon: Star, l: "Average Rating", v: "4.8", suffix: "/10", sub: "4.8 of 5 stars", color: "#C9A84C" },
  ];
  return (
    <div className="lp-fade space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">Footprint</div>
          <h2 className="lp-display text-[40px] font-bold text-white leading-tight mt-1">Your Pro Bono Impact</h2>
          <p className="text-[13px] text-[#888] mt-1">Every closed case is a citizen reclaiming their rights.</p>
        </div>
        <button className="lp-btn lp-btn-gold-solid"><Download size={12} /> Download</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k: any) => (
          <div key={k.l} className={`lp-kpi ${k.sq === "green" ? "lp-kpi-green" : ""}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[.12em] text-[#888]">{k.l}</div>
                <div className="lp-display text-[44px] font-bold mt-1 leading-none lp-pop" style={{ color: k.color }}>
                  {k.v}{k.suffix && <span className="text-[20px] align-super">{k.suffix}</span>}
                </div>
                <div className="text-[11px] mt-2" style={{ color: k.sq === "green" ? "#5BC68C" : "#C9A84C" }}>{k.sub}</div>
              </div>
              <div className={`lp-icon-sq ${k.sq || ""}`}><k.Icon size={18} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lp-card p-6 lp-lift">
          <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">Distribution</div>
          <h3 className="lp-display text-[26px] font-bold text-white mt-1 mb-4">Cases by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 items-center">
            <AnimatedPie size={240} label="Total" data={[
              { label: "Labor", value: 28, color: "#C9A84C" },
              { label: "Property", value: 18, color: "#E5BB3F" },
              { label: "Domestic Violence", value: 16, color: "#E57367" },
              { label: "Police Misconduct", value: 12, color: "#7AA8DD" },
              { label: "NADRA Issues", value: 10, color: "#7BC9C0" },
              { label: "Consumer Rights", value: 8, color: "#5BC68C" },
              { label: "Harassment", value: 8, color: "#A37BC9" },
            ]} />
            <ul className="grid grid-cols-2 gap-y-1.5 text-[12px]">
              {[["Labor", "#C9A84C", "28%"], ["Property", "#E5BB3F", "18%"], ["Domestic Violence", "#E57367", "16%"], ["Police Misconduct", "#7AA8DD", "12%"], ["NADRA Issues", "#7BC9C0", "10%"], ["Consumer Rights", "#5BC68C", "8%"], ["Harassment", "#A37BC9", "8%"]].map(([l, col, p]) => (
                <li key={l} className="flex items-center justify-between gap-2 text-[#aaa] pr-3"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: col }} /> {l}</span><span className="text-[#888]">{p}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lp-card p-6 lp-lift lp-no-hover">
          <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">Activity</div>
          <h3 className="lp-display text-[26px] font-bold text-white mt-1 mb-4">Weekly Case Activity · Last 8 Weeks</h3>
          <div className="lp-chart-glow lp-chart-bg p-2">
            <AnimatedLine labels={["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8"]} series={[
              { name: "Resolved", color: "#C9A84C", data: [18, 26, 23, 35, 36, 31, 38, 42] },
              { name: "Active", color: "#7AA8DD", data: [16, 14, 19, 19, 12, 17, 14, 18] },
              { name: "New", color: "#5BC68C", data: [5, 23, 19, 15, 29, 24, 27, 31] },
            ]} height={240} />
          </div>
          <div className="flex justify-center gap-5 mt-2 text-[11px] text-[#aaa]">
            <span><span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ background: "#C9A84C" }} />Resolved</span>
            <span><span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ background: "#7AA8DD" }} />Active</span>
            <span><span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ background: "#5BC68C" }} />New</span>
          </div>
        </div>
      </div>

      <div className="lp-card p-6">
        <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">Chronicle</div>
        <h3 className="lp-display text-[26px] font-bold text-white mt-1 mb-4">Impact Timeline</h3>
        <ul className="space-y-3">
          {[
            { id: "HD 2299", t: "Recovered PKR 218,000 in unpaid wages for textile worker", date: "12 Mar 2026", title: "Resolved", color: "#C9A84C" },
            { id: "HD 2287", t: "Protection order granted within ten days for domestic violence survivor", date: "02 Mar 2026", title: "Court Order", color: "#5BC68C" },
            { id: "HD 2271", t: "Consumer refund of PKR 78,500 secured through provincial consumer court", date: "24 Feb 2026", title: "Settled", color: "#7AA8DD" },
            { id: "HD 2256", t: "NADRA CNIC reactivation through second tier appeal", date: "11 Feb 2026", title: "Resolved", color: "#C9A84C" },
          ].map(x => (
            <li key={x.id} className="lp-tl-row flex items-start gap-4 px-3 py-3 rounded-xl transition-colors hover:bg-[rgba(201,168,76,.06)]">
              <span className="lp-tl-dot mt-2" style={{ background: x.color }} />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-[#888]">{x.date}</div>
                <div className="text-[13.5px] text-white font-semibold">{x.id} {x.title}</div>
                <div className="text-[12.5px] text-[#aaa] mt-0.5">{x.t}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
