import { useEffect, useState } from "react";
import { AnimatedPie } from "../charts/AnimatedPie";
import { AnimatedLine } from "../charts/AnimatedLine";
import { AnimatedHistogram } from "../charts/AnimatedHistogram";
import { Download, CheckCircle2 } from "lucide-react";

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
  return (
    <div className="lp-fade space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="lp-display text-[28px] font-bold text-white">Your Pro Bono Impact</h2>
        <button className="lp-btn lp-btn-gold-solid"><Download size={12} /> Download</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ l: "Citizens Helped", v: a }, { l: "Cases Resolved", v: b, c: "#5BC68C" }, { l: "Pro Bono Hours", v: c }, { l: "Avg Rating", v: "4.8★" }].map(k => (
          <div key={k.l} className="lp-kpi">
            <div className="text-[10px] uppercase tracking-[.12em] text-[#888]">{k.l}</div>
            <div className="lp-display text-[36px] font-bold mt-1" style={{ color: k.c || "#C9A84C" }}>{typeof k.v === "number" ? k.v : k.v}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lp-card p-5">
          <div className="text-[11px] uppercase tracking-[.15em] text-[#C9A84C] font-semibold mb-3">Cases by Category</div>
          <div className="grid grid-cols-[auto_1fr] gap-5 items-center">
            <AnimatedPie size={220} label="Resolved" data={[
              { label: "Labor", value: 28, color: "#C9A84C" },
              { label: "Property", value: 18, color: "#7AA8DD" },
              { label: "Domestic Violence", value: 14, color: "#E57367" },
              { label: "Police", value: 10, color: "#5BC68C" },
              { label: "NADRA", value: 8, color: "#E5BB3F" },
              { label: "Consumer", value: 5, color: "#A37BC9" },
              { label: "Harassment", value: 3, color: "#7BC9C0" },
            ]} />
            <ul className="space-y-1.5 text-[12px]">
              {[["Labor", "#C9A84C"], ["Property", "#7AA8DD"], ["Domestic Violence", "#E57367"], ["Police", "#5BC68C"], ["NADRA", "#E5BB3F"], ["Consumer", "#A37BC9"], ["Harassment", "#7BC9C0"]].map(([l, c]) => (
                <li key={l} className="flex items-center gap-2 text-[#aaa]"><span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /> {l}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lp-card p-5">
          <div className="text-[11px] uppercase tracking-[.15em] text-[#C9A84C] font-semibold mb-3">Weekly Case Activity</div>
          <AnimatedHistogram labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"]} values={[3, 5, 4, 7, 6, 9, 8, 11]} color="#C9A84C" height={240} />
        </div>
      </div>

      <div className="lp-card p-5">
        <div className="text-[11px] uppercase tracking-[.15em] text-[#C9A84C] font-semibold mb-3">Resolution Trend (last 5 months)</div>
        <AnimatedLine labels={["Dec", "Jan", "Feb", "Mar", "Apr"]} series={[
          { name: "Resolved", color: "#5BC68C", data: [12, 16, 18, 22, 18] },
          { name: "New", color: "#C9A84C", data: [18, 20, 19, 24, 22] },
          { name: "Pending", color: "#7AA8DD", data: [6, 8, 7, 9, 8] },
        ]} />
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
