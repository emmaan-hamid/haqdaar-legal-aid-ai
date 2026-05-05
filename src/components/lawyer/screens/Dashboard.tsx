import { useEffect, useState } from "react";
import { Gavel, Clock, CheckCircle2, Star, Bell, MessageCircle, FileUp, AlertTriangle, Calendar, ChevronRight } from "lucide-react";
import { AnimatedPie } from "../charts/AnimatedPie";

const useCount = (target: number, dur = 1200) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf: number; const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
};

export const Dashboard = ({ goto }: { goto: (s: any) => void }) => {
  const [status, setStatus] = useState<"avail" | "busy" | "unavail">("avail");
  const [maxCases, setMaxCases] = useState(5);
  const helped = useCount(124);
  const resolved = useCount(86);

  const pending = [
    { id: "HD-2407", title: "Unpaid wages, factory workers", cat: "Labor Dispute", urgency: "high", city: "Faisalabad", date: "Today", summary: "Group of 12 workers report withheld salaries for 3 months. Documentation available." },
    { id: "HD-2408", title: "Domestic violence protection order", cat: "Domestic Violence", urgency: "high", city: "Lahore", date: "Today", summary: "Citizen seeking protection order. NGO Aurat Foundation involved." },
    { id: "HD-2409", title: "NADRA ID rejection appeal", cat: "NADRA Issues", urgency: "med", city: "Karachi", date: "Yesterday", summary: "ID application rejected without clear reason. Appeal documents ready." },
    { id: "HD-2410", title: "Property fraud, fake transfer", cat: "Property Fraud", urgency: "low", city: "Multan", date: "2 days", summary: "Forged transfer deed; FIR filed but no progress." },
  ];
  const active = [
    { id: "HD-2401", title: "Wrongful termination", cat: "Labor", status: "progress", deadline: "5 days" },
    { id: "HD-2402", title: "Tenancy eviction notice", cat: "Property", status: "await", deadline: "2 days" },
    { id: "HD-2403", title: "Police misconduct complaint", cat: "Police", status: "progress", deadline: "8 days" },
    { id: "HD-2404", title: "Consumer fraud refund", cat: "Consumer", status: "pending", deadline: "12 days" },
  ];
  const acts = [
    { Icon: CheckCircle2, color: "#5BC68C", title: "Case Accepted", desc: "You accepted the case", id: "HD-2406", time: "10m" },
    { Icon: MessageCircle, color: "#C9A84C", title: "New Message", desc: "Client sent a message", id: "HD-2401", time: "1h" },
    { Icon: Bell, color: "#7AA8DD", title: "Status Updated", desc: "Status set to Awaiting Response", id: "HD-2402", time: "3h" },
    { Icon: AlertTriangle, color: "#E57367", title: "Deadline Alert", desc: "Deadline in 2 days", id: "HD-2402", time: "5h" },
    { Icon: FileUp, color: "#C9A84C", title: "Document Uploaded", desc: "Lawyer notes uploaded", id: "HD-2403", time: "1d" },
    { Icon: Star, color: "#C9A84C", title: "Rating Received", desc: "Client rated 5 stars", id: "HD-2399", time: "2d" },
  ];

  return (
    <div className="lp-fade space-y-6">
      {/* Verification banner */}
      <div className="rounded-2xl px-5 py-3 flex items-center gap-3 text-[12.5px]" style={{ background: "rgba(212,160,23,.1)", border: "1px solid rgba(212,160,23,.5)", color: "#E5BB3F" }}>
        <AlertTriangle size={16} /> Your Bar Council registration is under review. You can browse the platform but cannot accept cases yet.
      </div>

      {/* Welcome */}
      <div className="lp-card lp-welcome rounded-2xl px-6 py-5">
        <div className="lp-display text-[28px] text-[#C9A84C] font-bold leading-tight">Welcome, Usman.</div>
        <div className="text-[#E8E0D0] text-[13px] mt-1">Your work changes lives.</div>
      </div>

      {/* Status + Pro bono */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6">
        <div className="lp-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] uppercase tracking-[.15em] text-[#C9A84C] font-semibold">Your Status</div>
            <div className="text-[11px] text-[#888]">Last updated: Today</div>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {([["avail", "Available", "lp-btn-green"], ["busy", "Busy", "lp-btn-amber"], ["unavail", "Unavailable", "lp-btn-red"]] as const).map(([k, lbl, cls]) => (
              <button key={k} onClick={() => setStatus(k)} className={`lp-btn ${cls}`} style={status === k ? { background: cls.includes("green") ? "rgba(44,122,77,.18)" : cls.includes("amber") ? "rgba(212,160,23,.18)" : "rgba(192,57,43,.18)", boxShadow: `0 0 18px ${cls.includes("green") ? "rgba(44,122,77,.55)" : cls.includes("amber") ? "rgba(212,160,23,.55)" : "rgba(192,57,43,.55)"}` } : {}}>{lbl}</button>
            ))}
          </div>
          <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mb-2">Max Active Cases: <span className="text-[#C9A84C] font-bold text-[14px]">{maxCases}</span></div>
          <input type="range" min={1} max={10} value={maxCases} onChange={e => setMaxCases(+e.target.value)} className="lp-slider" />
          <div className="mt-5 rounded-xl px-4 py-3 text-[12.5px]" style={{ background: status === "avail" ? "rgba(44,122,77,.1)" : status === "busy" ? "rgba(212,160,23,.1)" : "rgba(192,57,43,.1)", border: `1px solid ${status === "avail" ? "rgba(44,122,77,.4)" : status === "busy" ? "rgba(212,160,23,.4)" : "rgba(192,57,43,.4)"}`, color: status === "avail" ? "#5BC68C" : status === "busy" ? "#E5BB3F" : "#E57367" }}>
            {status === "avail" && "Accepting new pro bono cases."}
            {status === "busy" && "At capacity. New requests on hold."}
            {status === "unavail" && "Not accepting new cases right now."}
          </div>
          <button className="lp-btn lp-btn-gold-solid mt-5">Update Status</button>
        </div>

        <div className="lp-card p-6 lp-card-hover" style={{ borderColor: "#C9A84C", borderWidth: 2 }}>
          <div className="text-[11px] uppercase tracking-[.15em] text-[#C9A84C] font-semibold mb-2">Your Impact</div>
          <div className="flex items-center gap-6">
            <AnimatedPie size={170} label="Helped" data={[
              { label: "Resolved", value: 86, color: "#C9A84C" },
              { label: "Active", value: 8, color: "#7AA8DD" },
              { label: "Pending", value: 30, color: "#E5BB3F" },
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

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { Icon: Gavel, label: "Active Cases", val: 8, sub: "+2 this week", subColor: "#5BC68C" },
          { Icon: Clock, label: "Pending Requests", val: 4, sub: "2 high urgency", subColor: "#E57367", cls: "lp-kpi-red" },
          { Icon: CheckCircle2, label: "Completed", val: 24, sub: "+3 this month", subColor: "#5BC68C", cls: "lp-kpi-green" },
          { Icon: Star, label: "Avg Rating", val: 4.8, sub: "★ 38 reviews", subColor: "#C9A84C" },
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

      {/* Pending requests + active cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lp-card p-5 lp-glow-red lp-card-hover" style={{ borderColor: "rgba(192,57,43,.4)" }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="lp-display text-[20px] text-white font-bold">Pending Case Requests</h3>
            <button onClick={() => goto("cases-requests")} className="text-[11px] text-[#E57367] hover:text-[#F08A7E] uppercase tracking-[.12em]">View All</button>
          </div>
          <div className="space-y-3 max-h-[420px] overflow-y-auto lp-scroll pr-2">
            {pending.map(p => (
              <div key={p.id} className="rounded-xl p-4 transition-all duration-300 lp-card-hover lp-glow-red" style={{ background: "#0F0F0F", border: "1px solid rgba(192,57,43,.25)" }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-[14px] font-semibold text-white leading-tight">{p.title}</div>
                  <span className={`lp-pill ${p.urgency === "high" ? "lp-pill-urgent" : p.urgency === "med" ? "lp-pill-med" : "lp-pill-low"}`} style={{ height: 20, padding: "0 8px", fontSize: 9 }}>{p.urgency === "high" ? "High" : p.urgency === "med" ? "Med" : "Low"}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2"><span className="lp-chip">{p.cat}</span><span className="text-[11px] text-[#888]">{p.city} • {p.date}</span></div>
                <p className="text-[12px] text-[#aaa] line-clamp-2 mb-3">{p.summary}</p>
                <div className="flex gap-2">
                  <button className="lp-btn lp-btn-green lp-btn-sm">Accept</button>
                  <button className="lp-btn lp-btn-red lp-btn-sm">Decline</button>
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
                  <div className="text-[10.5px] text-[#888]">{c.cat} • Due {c.deadline}</div>
                </div>
                <span className={`lp-pill ${c.status === "progress" ? "lp-pill-progress" : c.status === "await" ? "lp-pill-await" : "lp-pill-pending"}`} style={{ width: 84, justifyContent: "center", height: 22, fontSize: 9, padding: "0 6px" }}>
                  {c.status === "progress" ? "In Progress" : c.status === "await" ? "Awaiting" : "Pending"}
                </span>
                <button className="lp-btn lp-btn-gold lp-btn-md">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activities */}
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
