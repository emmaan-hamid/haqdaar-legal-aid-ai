import { useEffect, useState } from "react";
import { AnimatedPie } from "@/components/lawyer/charts/AnimatedPie";
import { AnimatedHistogram } from "@/components/lawyer/charts/AnimatedHistogram";
import { Download } from "lucide-react";

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

export const NgoImpact = () => {
  const a = useCount(312), b = useCount(187), c = useCount(6), d = useCount(14);
  return (
    <div className="lp-fade space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="lp-display text-[28px] font-bold text-white">NGO Impact Dashboard</h2>
        <button className="lp-btn lp-btn-gold-solid"><Download size={12} /> Download</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ l: "Citizens Helped", v: a }, { l: "Cases Resolved", v: b, c: "#5BC68C" }, { l: "Active Staff Members", v: c }, { l: "Avg Resolution (days)", v: d }].map(k => (
          <div key={k.l} className="lp-kpi">
            <div className="text-[10px] uppercase tracking-[.12em] text-[#888]">{k.l}</div>
            <div className="lp-display text-[36px] font-bold mt-1" style={{ color: k.c || "#C9A84C" }}>{k.v}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lp-card p-5">
          <div className="text-[11px] uppercase tracking-[.15em] text-[#C9A84C] font-semibold mb-3">Cases by Category</div>
          <div className="grid grid-cols-[auto_1fr] gap-5 items-center">
            <AnimatedPie size={220} label="Resolved" data={[
              { label: "Domestic Violence", value: 64, color: "#E57367" },
              { label: "Labor", value: 48, color: "#C9A84C" },
              { label: "Harassment", value: 28, color: "#7BC9C0" },
              { label: "Property", value: 22, color: "#7AA8DD" },
              { label: "Police", value: 14, color: "#5BC68C" },
              { label: "NADRA", value: 8, color: "#E5BB3F" },
              { label: "Consumer", value: 3, color: "#A37BC9" },
            ]} />
            <ul className="space-y-1.5 text-[12px]">
              {[["Domestic Violence", "#E57367"], ["Labor", "#C9A84C"], ["Harassment", "#7BC9C0"], ["Property", "#7AA8DD"], ["Police", "#5BC68C"], ["NADRA", "#E5BB3F"], ["Consumer", "#A37BC9"]].map(([l, col]) => (
                <li key={l} className="flex items-center gap-2 text-[#aaa]"><span className="w-2.5 h-2.5 rounded-full" style={{ background: col }} /> {l}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lp-card p-5">
          <div className="text-[11px] uppercase tracking-[.15em] text-[#C9A84C] font-semibold mb-3">Weekly Case Activity</div>
          <AnimatedHistogram labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"]} values={[6, 9, 7, 12, 10, 14, 13, 17]} color="#C9A84C" height={240} />
        </div>
      </div>
    </div>
  );
};