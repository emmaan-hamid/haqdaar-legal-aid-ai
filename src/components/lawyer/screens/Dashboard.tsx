import { useEffect, useState } from "react";
import { Gavel, Clock, CheckCircle2, Star, Bell, MessageCircle, FileUp, AlertTriangle, Calendar, ShieldAlert, ShieldCheck, Scale } from "lucide-react";
import { AnimatedLine } from "../charts/AnimatedLine";
import { AvailabilityCockpit } from "../AvailabilityCockpit";

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

const ProBonoRing = ({ hours }: { hours: number }) => {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf: number; const start = performance.now();
    const step = (t: number) => { const k = Math.min(1, (t - start) / 1400); setP(1 - Math.pow(1 - k, 3)); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, []);
  const r = 78, c = 2 * Math.PI * r, target = 0.78;
  const offset = c - c * target * p;
  return (
    <div className="relative grid place-items-center" style={{ width: 220, height: 220 }}>
      <svg width="220" height="220" className="-rotate-90">
        <circle cx="110" cy="110" r={r} stroke="#222" strokeWidth="10" fill="none" />
        <circle cx="110" cy="110" r={r} stroke="#C9A84C" strokeWidth="10" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ filter: "drop-shadow(0 0 14px rgba(201,168,76,.7))", transition: "stroke-dashoffset .3s ease" }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="lp-display text-[44px] font-bold text-[#C9A84C] leading-none">{hours}<span className="text-[20px] ml-1">hrs</span></div>
          <div className="text-[10px] tracking-[.2em] text-[#888] mt-1 font-semibold">PRO BONO</div>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ msg }: { msg: string }) => msg ? (
  <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] px-4 py-2 rounded-full text-[12px]" style={{ background: "#1E1E1E", border: "1px solid #C9A84C", color: "#C9A84C" }}>{msg}</div>
) : null;

export const Dashboard = ({ goto }: { goto: (s: any) => void }) => {
  const helped = useCount(124);
  const resolved = useCount(86);
  const [removed, setRemoved] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [decline, setDecline] = useState<string | null>(null);
  const [reason, setReason] = useState("Outside specialization");
  const [notes, setNotes] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 1800); };
  const submitDecline = () => { if (decline) { setRemoved(r => [...r, decline]); showToast(`Declined ${decline} · ${reason}`); setDecline(null); setNotes(""); } };

  const pendingAll = [
    { id: "HD-2407", title: "Unpaid wages, factory workers", cat: "Labor Dispute", urgency: "high", city: "Faisalabad", date: "Today", summary: "Group of 12 workers report withheld salaries for 3 months. Documentation available." },
    { id: "HD-2408", title: "Domestic violence protection order", cat: "Domestic Violence", urgency: "high", city: "Lahore", date: "Today", summary: "Citizen seeking protection order. NGO Aurat Foundation involved." },
    { id: "HD-2409", title: "NADRA ID rejection appeal", cat: "NADRA Issues", urgency: "med", city: "Karachi", date: "Yesterday", summary: "ID application rejected without clear reason. Appeal documents ready." },
    { id: "HD-2410", title: "Property fraud, fake transfer", cat: "Property Fraud", urgency: "low", city: "Multan", date: "2 days", summary: "Forged transfer deed; FIR filed but no progress." },
  ];
  const pending = pendingAll.filter(p => !removed.includes(p.id));
  const activeCases = [
    { id: "HD-2401", title: "Wrongful termination", status: "progress", deadline: 5 },
    { id: "HD-2402", title: "Tenancy eviction notice", status: "await", deadline: 2 },
    { id: "HD-2403", title: "Police misconduct complaint", status: "progress", deadline: 8 },
    { id: "HD-2404", title: "Consumer fraud refund", status: "pending", deadline: 12 },
    { id: "HD-2405", title: "Inheritance dispute", status: "progress", deadline: 9 },
    { id: "HD-2406", title: "Workplace harassment claim", status: "await", deadline: 4 },
    { id: "HD-2411", title: "NADRA appeal hearing", status: "pending", deadline: 14 },
    { id: "HD-2412", title: "Domestic violence order", status: "progress", deadline: 1 },
    { id: "HD-2413", title: "Child custody mediation", status: "await", deadline: 6 },
    { id: "HD-2414", title: "Bonded labor release petition", status: "progress", deadline: 3 },
    { id: "HD-2415", title: "Unfair dismissal appeal", status: "pending", deadline: 11 },
    { id: "HD-2416", title: "Forced eviction injunction", status: "progress", deadline: 7 },
    { id: "HD-2417", title: "Wage theft class action", status: "await", deadline: 5 },
    { id: "HD-2418", title: "Property title dispute", status: "pending", deadline: 16 },
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
      <div className="rounded-2xl px-5 py-4 flex items-stretch gap-4" style={{ background: "rgba(212,160,23,.08)", border: "1px solid rgba(212,160,23,.5)" }}>
        <div className="w-10 h-10 rounded-full grid place-items-center shrink-0" style={{ background: "rgba(212,160,23,.18)", color: "#E5BB3F" }}>
          <ShieldAlert size={20} />
        </div>
        <div className="flex-1 min-w-0 self-center">
          <div className="text-[13px] font-semibold text-[#E5BB3F]">Verification Pending</div>
          <div className="text-[12px] text-[#C9C4B0] mt-0.5">Your Bar Council registration is under review. You can browse the platform but cannot accept cases yet.</div>
        </div>
        <div className="flex items-center"><button disabled className="lp-btn lp-btn-amber" style={{ opacity: .85, cursor: "not-allowed", pointerEvents: "none" }}>Under Review</button></div>
      </div>

      {/* Welcome */}
      <div className="lp-card lp-welcome rounded-2xl px-7 py-7 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl grid place-items-center shrink-0" style={{ background: "rgba(201,168,76,.15)", border: "1px solid rgba(201,168,76,.5)", color: "#C9A84C", boxShadow: "0 0 22px rgba(201,168,76,.3)" }}>
          <Scale size={26} />
        </div>
        <div className="flex-1">
          <div className="lp-display text-[36px] text-[#C9A84C] font-bold leading-[1.1]">Welcome, Irtiza Rayan.</div>
          <div className="lp-display text-[36px] text-[#C9A84C] font-bold leading-[1.1]">Your work changes lives.</div>
          <div className="text-white text-[14px] mt-3 leading-relaxed">Every case you take builds the rule of law. Continue making justice accessible to those who need it most.</div>
        </div>
      </div>

      {/* Cockpit + Pro Bono Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6">
        <AvailabilityCockpit initialMax={5} active={3} maxLimit={10} />

        {/* Pro Bono Ring */}
        <div className="lp-card p-6 lp-lift">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10.5px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Your Impact</div>
              <div className="lp-display text-[26px] font-bold text-white leading-tight mt-0.5">Pro Bono Ring</div>
            </div>
            <div className="lp-icon-sq"><ShieldCheck size={18} /></div>
          </div>
          <div className="grid place-items-center my-2"><ProBonoRing hours={412} /></div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="rounded-2xl p-4 text-center lp-mini-stat" style={{ background: "#0F0F0F", border: "1px solid rgba(201,168,76,.25)" }}>
              <div className="lp-display text-[28px] font-bold text-[#C9A84C] leading-none">{helped}</div>
              <div className="text-[10px] tracking-[.18em] text-[#888] mt-2 font-semibold">CITIZENS HELPED</div>
              <div className="mx-auto mt-2 h-[2px] w-10 rounded-full" style={{ background: "#C9A84C" }} />
            </div>
            <div className="rounded-2xl p-4 text-center lp-mini-stat green" style={{ background: "#0F0F0F", border: "1px solid rgba(44,122,77,.35)" }}>
              <div className="lp-display text-[28px] font-bold text-[#5BC68C] leading-none">{resolved}</div>
              <div className="text-[10px] tracking-[.18em] text-[#888] mt-2 font-semibold">CASES RESOLVED</div>
              <div className="mx-auto mt-2 h-[2px] w-10 rounded-full" style={{ background: "#5BC68C" }} />
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
          { Icon: Star, label: "Avg Rating", val: "4.8★", sub: "38 reviews", subColor: "#C9A84C" },
        ].map((k) => {
          const accent = k.cls?.includes("green") ? "#5BC68C" : k.cls?.includes("red") ? "#E57367" : "#C9A84C";
          const sqCls = k.cls?.includes("green") ? "green" : k.cls?.includes("red") ? "red" : "";
          return (
            <div key={k.label} className={`lp-kpi ${k.cls || ""}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[.12em] text-[#888] font-semibold">{k.label}</div>
                  <div className="lp-display text-[34px] font-bold mt-1 leading-none" style={{ color: accent }}>{k.val}</div>
                </div>
                <div className={`lp-icon-sq ${sqCls}`}><k.Icon size={18} /></div>
              </div>
              <div className="text-[10.5px] mt-2" style={{ color: k.subColor }}>{k.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Pending requests + active cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        <div className="lp-card p-6" style={{ borderColor: "rgba(201,168,76,.45)" }}>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-[10.5px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Incoming</div>
              <div className="lp-display text-[26px] text-white font-bold leading-tight mt-1">Pending Case Requests</div>
            </div>
            <button onClick={() => goto("cases-requests")} className="lp-page-link text-[11px] text-[#C9A84C] uppercase tracking-[.14em] font-semibold relative">
              View All
              <span className="lp-underline" />
            </button>
          </div>
          <div className="space-y-4 max-h-[460px] overflow-y-auto lp-scroll pr-2">
            {pending.map(p => (
              <div key={p.id} className="rounded-xl p-4 transition-all duration-300 lp-sub-glow" style={{ background: "#0F0F0F", border: "1px solid rgba(201,168,76,.3)" }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-[14px] font-semibold text-white leading-tight">{p.title}</div>
                  <span className={`lp-pill ${p.urgency === "high" ? "lp-pill-urgent" : p.urgency === "med" ? "lp-pill-med" : "lp-pill-low"}`} style={{ height: 20, padding: "0 8px", fontSize: 9 }}>{p.urgency === "high" ? "High" : p.urgency === "med" ? "Med" : "Low"}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2"><span className="lp-chip">{p.cat}</span><span className="text-[11px] text-[#888]">{p.city} · {p.date}</span></div>
                <p className="text-[12px] text-[#aaa] line-clamp-2 mb-3">{p.summary}</p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button className="lp-act-accept" style={{ height: 36 }} onClick={() => { setRemoved(r => [...r, p.id]); showToast(`Accepted ${p.id}`); }}>Accept</button>
                  <button className="lp-act-decline" style={{ height: 36 }} onClick={() => setDecline(p.id)}>Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-card p-6">
          <div className="flex items-end justify-between mb-2">
            <div>
              <div className="text-[10.5px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Ongoing</div>
              <div className="lp-display text-[28px] text-white font-bold leading-tight mt-1">Active Cases</div>
            </div>
            <button onClick={() => goto("cases-active")} className="lp-page-link text-[11px] text-[#C9A84C] uppercase tracking-[.14em] font-semibold relative">
              View All<span className="lp-underline" />
            </button>
          </div>
          <div className="h-px w-full mb-5" style={{ background: "rgba(201,168,76,.25)" }} />
          <div>
            <div className="grid grid-cols-[68px_1fr_92px_44px_64px] gap-3 px-3 py-3 text-[10px] uppercase tracking-[.14em] text-[#888] font-semibold rounded-lg" style={{ background: "#0F0F0F" }}>
              <div>Case ID</div><div>Title</div><div className="text-center">Status</div><div className="text-center">Due</div><div className="text-right">Action</div>
            </div>
            {activeCases.slice(0, 6).map((c) => (
              <div key={c.id}>
                <div className="h-px" style={{ background: "rgba(201,168,76,.15)" }} />
                <div className="grid grid-cols-[68px_1fr_92px_44px_64px] gap-3 items-center px-3 py-4 transition-all lp-row-hover">
                  <div className="text-[11px] text-[#C9A84C] font-mono">{c.id}</div>
                  <div className="text-[13.5px] text-white truncate font-medium">{c.title}</div>
                  <div className="flex justify-center">
                    <span className={`lp-pill ${c.status === "progress" ? "lp-pill-progress" : c.status === "await" ? "lp-pill-await" : "lp-pill-pending"}`} style={{ width: 86, justifyContent: "center", height: 22, fontSize: 9.5, padding: "0 8px" }}>
                      {c.status === "progress" ? "In Progress" : c.status === "await" ? "Awaiting" : "Pending"}
                    </span>
                  </div>
                  <div className="text-center text-[12px] font-semibold whitespace-nowrap" style={{ color: c.deadline < 3 ? "#E57367" : "#C9C4B0" }}>{c.deadline}d</div>
                  <div className="flex justify-end">
                    <button className="lp-btn-view" style={{ height: 26, minWidth: 58, padding: "0 12px", fontSize: 10.5 }} onClick={() => goto("cases-active")}>View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-1" />
        </div>
      </div>

      {/* Recent + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lp-card p-5" style={{ borderColor: "#C9A84C" }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#C9A84C]" />
              <h3 className="lp-display text-[20px] text-white font-bold">Recent Activities</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(201,168,76,.15)] text-[#C9A84C] font-semibold">{acts.length}</span>
            </div>
            <button className="lp-page-link text-[11px] text-[#C9A84C] uppercase tracking-[.14em] font-semibold relative">
              See All<span className="lp-underline" />
            </button>
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
                <div className="text-[10.5px] text-[#666]">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-card p-5 lp-no-hover">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-[10.5px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Trend</div>
              <div className="lp-display text-[22px] text-white font-bold leading-tight mt-0.5">This Quarter</div>
            </div>
          </div>
          <div className="lp-chart-glow lp-chart-bg p-3">
            <AnimatedLine
              labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]}
              series={[
                { name: "Resolved", color: "#5BC68C", data: [4, 6, 8, 7, 10, 12, 11, 14, 13] },
                { name: "Active", color: "#7AA8DD", data: [3, 5, 6, 8, 7, 9, 10, 11, 12] },
                { name: "New", color: "#C9A84C", data: [5, 7, 6, 9, 11, 10, 13, 12, 15] },
              ]}
              height={240}
            />
          </div>
          <div className="flex justify-center gap-5 mt-2 text-[11px] text-[#aaa]">
            <span><span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ background: "#5BC68C" }} />Resolved</span>
            <span><span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ background: "#7AA8DD" }} />Active</span>
            <span><span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ background: "#C9A84C" }} />New</span>
          </div>
        </div>
      </div>
      {decline && (
        <div className="lp-modal-overlay" onClick={() => setDecline(null)}>
          <div className="lp-modal m-auto max-w-[460px]" onClick={e => e.stopPropagation()}>
            <h3 className="lp-display text-[22px] text-white font-bold mb-1">Decline Reason</h3>
            <div className="text-[12px] text-[#888] mb-3">Case <span className="text-[#C9A84C] font-mono">{decline}</span></div>
            <select className="lp-input mb-3" value={reason} onChange={e => setReason(e.target.value)}>
              <option>Outside specialization</option><option>At capacity</option><option>Conflict of interest</option><option>Other</option>
            </select>
            <textarea className="lp-textarea" placeholder="Optional notes..." value={notes} onChange={e => setNotes(e.target.value)} />
            <div className="flex gap-2 justify-end mt-4">
              <button className="lp-btn lp-btn-gold" onClick={() => setDecline(null)}>Cancel</button>
              <button className="lp-btn lp-btn-red" onClick={submitDecline}>Submit Decline</button>
            </div>
          </div>
        </div>
      )}
      <Toast msg={toast} />
    </div>
  );
};
