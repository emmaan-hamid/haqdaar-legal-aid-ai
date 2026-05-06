import { useEffect, useState } from "react";
import { Inbox, Clock, Gavel, Users, Bell, MessageCircle, FileUp, AlertTriangle, Calendar, ChevronRight, CheckCircle2, UserPlus } from "lucide-react";
import { AnimatedPie } from "@/components/lawyer/charts/AnimatedPie";

const useCount = (target: number, dur = 1200) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf: number; const start = performance.now();
    const step = (t: number) => { const p = Math.min(1, (t - start) / dur); setV(Math.floor(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
};

export const NgoDashboard = ({ goto }: { goto: (s: any) => void }) => {
  const [status, setStatus] = useState<"active" | "limited" | "closed">("active");
  const [maxCases, setMaxCases] = useState(12);
  const helped = useCount(312);
  const resolved = useCount(187);

  const pending = [
    { id: "HD-3107", title: "Domestic abuse shelter request", cat: "Domestic Violence", urgency: "high", city: "Lahore", date: "Today", summary: "Mother of two seeks emergency shelter and protection order. Police report attached." },
    { id: "HD-3108", title: "Wage theft, garment workers", cat: "Labor Dispute", urgency: "high", city: "Karachi", date: "Today", summary: "20 garment workers report 4 months unpaid overtime. Documentation available." },
    { id: "HD-3109", title: "NADRA card denial", cat: "NADRA Issues", urgency: "med", city: "Quetta", date: "Yesterday", summary: "Citizen denied ID card without written reason. Family of 5 affected." },
    { id: "HD-3110", title: "Property fraud complaint", cat: "Property Fraud", urgency: "low", city: "Multan", date: "2 days", summary: "Forged signature used to transfer ancestral land." },
  ];
  const active = [
    { id: "HD-3101", title: "Workplace harassment case", cat: "Harassment", status: "progress", deadline: "5 days", staff: "Ayesha M." },
    { id: "HD-3102", title: "Eviction defense", cat: "Property", status: "await", deadline: "2 days", staff: "Bilal K." },
    { id: "HD-3103", title: "Police misconduct complaint", cat: "Police", status: "progress", deadline: "8 days", staff: "Unassigned" },
    { id: "HD-3104", title: "Consumer fraud refund", cat: "Consumer", status: "pending", deadline: "12 days", staff: "Sana R." },
  ];
  const acts = [
    { Icon: CheckCircle2, color: "#5BC68C", title: "Request Approved", desc: "Approved case", id: "HD-3106", time: "8m" },
    { Icon: UserPlus, color: "#C9A84C", title: "Case Assigned", desc: "Assigned to Ayesha M.", id: "HD-3101", time: "30m" },
    { Icon: MessageCircle, color: "#C9A84C", title: "New Message", desc: "Citizen replied on", id: "HD-3102", time: "1h" },
    { Icon: Bell, color: "#7AA8DD", title: "Status Updated", desc: "Status set to Awaiting", id: "HD-3102", time: "3h" },
    { Icon: FileUp, color: "#C9A84C", title: "Document Uploaded", desc: "Case file uploaded", id: "HD-3103", time: "1d" },
    { Icon: Users, color: "#C9A84C", title: "Staff Member Added", desc: "Sana R. joined the team", id: "—", time: "2d" },
  ];

  return (
    <div className="lp-fade space-y-6">
      <div className="rounded-2xl px-5 py-3 flex items-center gap-3 text-[12.5px]" style={{ background: "rgba(212,160,23,.1)", border: "1px solid rgba(212,160,23,.5)", color: "#E5BB3F" }}>
        <AlertTriangle size={16} /> Your organization registration is under review. You can browse the platform but cannot manage cases yet.
      </div>

      <div className="lp-card lp-welcome rounded-2xl px-6 py-5">
        <div className="lp-display text-[28px] text-[#C9A84C] font-bold leading-tight">Welcome, Aurat Foundation. Your work changes lives.</div>
        <div className="text-[#E8E0D0] text-[13px] mt-1">Your work changes lives.</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6">
        <div className="lp-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] uppercase tracking-[.15em] text-[#C9A84C] font-semibold">Organization Status</div>
            <div className="text-[11px] text-[#888]">Last updated: Today</div>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {([["active", "Active", "lp-btn-green"], ["limited", "Limited Capacity", "lp-btn-amber"], ["closed", "Temporarily Closed", "lp-btn-red"]] as const).map(([k, lbl, cls]) => (
              <button key={k} onClick={() => setStatus(k)} className={`lp-btn ${cls}`} style={status === k ? { background: cls.includes("green") ? "rgba(44,122,77,.18)" : cls.includes("amber") ? "rgba(212,160,23,.18)" : "rgba(192,57,43,.18)", boxShadow: `0 0 18px ${cls.includes("green") ? "rgba(44,122,77,.55)" : cls.includes("amber") ? "rgba(212,160,23,.55)" : "rgba(192,57,43,.55)"}` } : {}}>{lbl}</button>
            ))}
          </div>
          <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mb-2">Max Active Cases: <span className="text-[#C9A84C] font-bold text-[14px]">{maxCases}</span></div>
          <input type="range" min={1} max={20} value={maxCases} onChange={e => setMaxCases(+e.target.value)} className="lp-slider" />
          <div className="mt-5 rounded-xl px-4 py-3 text-[12.5px]" style={{ background: status === "active" ? "rgba(44,122,77,.1)" : status === "limited" ? "rgba(212,160,23,.1)" : "rgba(192,57,43,.1)", border: `1px solid ${status === "active" ? "rgba(44,122,77,.4)" : status === "limited" ? "rgba(212,160,23,.4)" : "rgba(192,57,43,.4)"}`, color: status === "active" ? "#5BC68C" : status === "limited" ? "#E5BB3F" : "#E57367" }}>
            {status === "active" && "Accepting new help requests."}
            {status === "limited" && "Operating at limited capacity."}
            {status === "closed" && "Temporarily not accepting new cases."}
          </div>
          <button className="lp-btn lp-btn-gold-solid mt-5">Update Status</button>
        </div>

        <div className="lp-card p-6 lp-card-hover" style={{ borderColor: "#C9A84C", borderWidth: 2 }}>
          <div className="text-[11px] uppercase tracking-[.15em] text-[#C9A84C] font-semibold mb-2">Our Impact</div>
          <div className="flex items-center gap-6">
            <AnimatedPie size={170} label="Cases" data={[
              { label: "Resolved", value: 187, color: "#C9A84C" },
              { label: "Active", value: 28, color: "#7AA8DD" },
              { label: "Pending", value: 12, color: "#E5BB3F" },
            ]} />
            <div className="space-y-3">
              <div>
                <div className="lp-display text-[40px] text-[#C9A84C] font-bold leading-none">{helped}</div>
                <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mt-1">Citizens Helped</div>
              </div>
              <div>
                <div className="lp-display text-[40px] text-[#5BC68C] font-bold leading-none">{resolved}</div>
                <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mt-1">Cases Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { Icon: Inbox, label: "Total Requests", val: 47, sub: "+9 this week", subColor: "#5BC68C" },
          { Icon: Clock, label: "Pending Review", val: 12, sub: "4 high urgency", subColor: "#E57367", cls: "lp-kpi-red" },
          { Icon: Gavel, label: "Active Cases", val: 28, sub: "Across 6 staff", subColor: "#7AA8DD" },
          { Icon: Users, label: "Citizens Helped", val: 312, sub: "+24 this month", subColor: "#5BC68C", cls: "lp-kpi-green" },
        ].map((k) => (
          <div key={k.label} className={`lp-kpi ${k.cls || ""}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[.12em] text-[#888] font-semibold">{k.label}</div>
                <div className="lp-display text-[34px] font-bold mt-1 leading-none" style={{ color: k.cls?.includes("green") ? "#5BC68C" : k.cls?.includes("red") ? "#E57367" : "#C9A84C" }}>{k.val}</div>
              </div>
              <k.Icon size={22} style={{ color: k.cls?.includes("green") ? "#5BC68C" : k.cls?.includes("red") ? "#E57367" : "#C9A84C" }} />
            </div>
            <div className="text-[10.5px] mt-2" style={{ color: k.subColor }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lp-card p-5 lp-glow-red lp-card-hover" style={{ borderColor: "rgba(192,57,43,.4)" }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="lp-display text-[20px] text-white font-bold">Incoming Help Requests</h3>
            <button onClick={() => goto("cases-requests")} className="text-[11px] text-[#E57367] hover:text-[#F08A7E] uppercase tracking-[.12em]">View All</button>
          </div>
          <div className="space-y-3 max-h-[420px] overflow-y-auto lp-scroll pr-2">
            {pending.map(p => (
              <div key={p.id} className="rounded-xl p-4 transition-all duration-300 lp-card-hover lp-glow-red" style={{ background: "#0F0F0F", border: "1px solid rgba(192,57,43,.25)" }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-[14px] font-semibold text-white leading-tight">{p.title}</div>
                  <span className={`lp-pill ${p.urgency === "high" ? "lp-pill-urgent" : p.urgency === "med" ? "lp-pill-med" : "lp-pill-low"}`} style={{ height: 18, padding: "0 7px", fontSize: 8.5 }}>{p.urgency === "high" ? "High" : p.urgency === "med" ? "Med" : "Low"}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2"><span className="lp-chip" style={{ fontSize: 9 }}>{p.cat}</span><span className="text-[11px] text-[#888]">{p.city} • {p.date}</span></div>
                <p className="text-[12px] text-[#aaa] line-clamp-2 mb-3">{p.summary}</p>
                <div className="flex gap-2">
                  <button className="lp-btn lp-btn-green lp-btn-sm">Approve</button>
                  <button className="lp-btn lp-btn-red lp-btn-sm">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="lp-display text-[20px] text-white font-bold">Active Cases</h3>
            <button onClick={() => goto("cases-active")} className="text-[11px] text-[#C9A84C] uppercase tracking-[.12em]">View All</button>
          </div>
          <div className="space-y-2">
            {active.map(c => (
              <div key={c.id} className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-[rgba(201,168,76,.05)]">
                <div className="text-[11px] text-[#C9A84C] font-mono w-[58px]">{c.id}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-white truncate">{c.title}</div>
                  <div className="text-[10.5px] text-[#888]">{c.cat} • {c.staff} • Due {c.deadline}</div>
                </div>
                <span className={`lp-pill ${c.status === "progress" ? "lp-pill-progress" : c.status === "await" ? "lp-pill-await" : "lp-pill-pending"}`} style={{ width: 70, justifyContent: "center", height: 18, fontSize: 8, padding: "0 4px" }}>
                  {c.status === "progress" ? "In Progress" : c.status === "await" ? "Awaiting" : "Pending"}
                </span>
                <button className="lp-btn lp-btn-gold-solid" style={{ height: 34, padding: "0 22px", fontSize: 12 }}>View</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lp-card p-5" style={{ borderColor: "#C9A84C" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#C9A84C]" />
            <h3 className="lp-display text-[20px] text-white font-bold">Recent Activities</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(201,168,76,.15)] text-[#C9A84C] font-semibold">{acts.length}</span>
          </div>
          <a href="#" className="text-[11px] text-[#C9A84C] uppercase tracking-[.12em]">See All</a>
        </div>
        <div className="max-h-[300px] overflow-y-auto lp-scroll pr-2">
          {acts.map((a, i) => (
            <div key={i} className="lp-act-row">
              <div className="w-9 h-9 rounded-full grid place-items-center" style={{ background: "rgba(201,168,76,.1)", color: a.color }}>
                <a.Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-white">{a.title}</div>
                <div className="text-[11px] text-[#888]">{a.desc} <span className="text-[#C9A84C]">{a.id}</span></div>
              </div>
              <div className="text-[10.5px] text-[#666] flex items-center gap-1">{a.time} <ChevronRight size={12} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};