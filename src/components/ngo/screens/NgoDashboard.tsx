import { useEffect, useState } from "react";
import { Inbox, Clock, Gavel, Users, Bell, MessageCircle, FileUp, AlertTriangle, Calendar, ChevronRight, CheckCircle2, UserPlus, HeartHandshake } from "lucide-react";
import { AnimatedPie } from "@/components/lawyer/charts/AnimatedPie";
import { AvailabilityCockpit } from "@/components/lawyer/AvailabilityCockpit";

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

const Toast = ({ msg }: { msg: string }) => msg ? (
  <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] px-4 py-2 rounded-full text-[12px]" style={{ background: "#1E1E1E", border: "1px solid #C9A84C", color: "#C9A84C" }}>{msg}</div>
) : null;

export const NgoDashboard = ({ goto }: { goto: (s: any) => void }) => {
  const helped = useCount(312);
  const resolved = useCount(187);
  const [removed, setRemoved] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [reject, setReject] = useState<string | null>(null);
  const [reason, setReason] = useState("Outside our scope");
  const [notes, setNotes] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 1800); };
  const submitReject = () => { if (reject) { setRemoved(r => [...r, reject]); showToast(`Rejected ${reject} · ${reason}`); setReject(null); setNotes(""); } };

  const pendingAll = [
    { id: "HD-3107", title: "Domestic abuse shelter request", cat: "Domestic Violence", urgency: "high", city: "Lahore", date: "Today", summary: "Mother of two seeks emergency shelter and protection order. Police report attached." },
    { id: "HD-3108", title: "Wage theft, garment workers", cat: "Labor Dispute", urgency: "high", city: "Karachi", date: "Today", summary: "20 garment workers report 4 months unpaid overtime. Documentation available." },
    { id: "HD-3109", title: "NADRA card denial", cat: "NADRA Issues", urgency: "med", city: "Quetta", date: "Yesterday", summary: "Citizen denied ID card without written reason. Family of 5 affected." },
    { id: "HD-3110", title: "Property fraud complaint", cat: "Property Fraud", urgency: "low", city: "Multan", date: "2 days", summary: "Forged signature used to transfer ancestral land." },
  ];
  const pending = pendingAll.filter(p => !removed.includes(p.id));
  const active = [
    { id: "HD-3101", title: "Workplace harassment case", cat: "Harassment", status: "progress", deadline: "5 days", staff: "Ayesha M." },
    { id: "HD-3102", title: "Eviction defense", cat: "Property", status: "await", deadline: "2 days", staff: "Bilal K." },
    { id: "HD-3103", title: "Police misconduct complaint", cat: "Police", status: "progress", deadline: "8 days", staff: "Unassigned" },
    { id: "HD-3104", title: "Consumer fraud refund", cat: "Consumer", status: "pending", deadline: "12 days", staff: "Sana R." },
    { id: "HD-3111", title: "Child marriage prevention", cat: "Family", status: "progress", deadline: "3 days", staff: "Hina J." },
    { id: "HD-3112", title: "Bonded labor release", cat: "Labor", status: "await", deadline: "6 days", staff: "Imran T." },
    { id: "HD-3113", title: "NADRA appeal hearing", cat: "NADRA", status: "pending", deadline: "10 days", staff: "Sana R." },
    { id: "HD-3114", title: "Domestic violence shelter", cat: "Domestic Violence", status: "progress", deadline: "1 day", staff: "Ayesha M." },
    { id: "HD-3115", title: "Wage theft mediation", cat: "Labor", status: "progress", deadline: "7 days", staff: "Bilal K." },
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
      <div className="rounded-2xl px-5 py-4 flex items-stretch gap-4" style={{ background: "rgba(212,160,23,.08)", border: "1px solid rgba(212,160,23,.5)" }}>
        <div className="w-10 h-10 rounded-full grid place-items-center shrink-0" style={{ background: "rgba(212,160,23,.18)", color: "#E5BB3F" }}>
          <AlertTriangle size={20} />
        </div>
        <div className="flex-1 min-w-0 self-center">
          <div className="text-[13px] font-semibold text-[#E5BB3F]">Verification Pending</div>
          <div className="text-[12px] text-[#C9C4B0] mt-0.5">Your organization registration is under review. You can browse the platform but cannot manage cases yet.</div>
        </div>
        <div className="flex items-center"><button disabled className="lp-btn lp-btn-amber" style={{ opacity: .85, cursor: "not-allowed", pointerEvents: "none" }}>Under Review</button></div>
      </div>

      <div className="lp-card lp-welcome rounded-2xl px-7 py-7 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl grid place-items-center shrink-0" style={{ background: "rgba(201,168,76,.15)", border: "1px solid rgba(201,168,76,.5)", color: "#C9A84C", boxShadow: "0 0 22px rgba(201,168,76,.3)" }}>
          <HeartHandshake size={26} />
        </div>
        <div className="flex-1">
          <div className="lp-display text-[36px] text-[#C9A84C] font-bold leading-[1.1]">Welcome, Aurat Foundation.</div>
          <div className="lp-display text-[36px] text-[#C9A84C] font-bold leading-[1.1]">Your work changes lives.</div>
          <div className="text-white text-[14px] mt-3 leading-relaxed">Communities depend on your dedication. Continue empowering citizens through compassion and law.</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6">
        <AvailabilityCockpit
          initialMax={12}
          active={8}
          maxLimit={20}
          title="Operations Cockpit"
          capacityLabel="Active Case Capacity"
          labels={{ avail: "Active", busy: "Limited", unavail: "Closed" }}
          helperText={{
            avail: "Accepting new help requests across all categories.",
            busy: "Operating at limited capacity. New requests will queue.",
            unavail: "Temporarily not accepting new cases.",
          }}
        />

        <div className="lp-card p-6 lp-lift" style={{ borderColor: "#C9A84C", borderWidth: 2 }}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-[10.5px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Our Impact</div>
              <div className="lp-display text-[26px] font-bold text-white leading-tight mt-0.5">Lives Touched</div>
            </div>
            <div className="lp-icon-sq"><HeartHandshake size={18} /></div>
          </div>
          <div className="flex items-center gap-6">
            <AnimatedPie size={170} label="Cases" data={[
              { label: "Resolved", value: 187, color: "#C9A84C" },
              { label: "Active", value: 28, color: "#7AA8DD" },
              { label: "Pending", value: 12, color: "#E5BB3F" },
            ]} />
            <div className="space-y-3 flex-1">
              <div className="rounded-2xl p-3 lp-mini-stat" style={{ background: "#0F0F0F", border: "1px solid rgba(201,168,76,.25)" }}>
                <div className="lp-display text-[40px] text-[#C9A84C] font-bold leading-none">{helped}</div>
                <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mt-1">Citizens Helped</div>
              </div>
              <div className="rounded-2xl p-3 lp-mini-stat green" style={{ background: "#0F0F0F", border: "1px solid rgba(44,122,77,.35)" }}>
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
        ].map((k) => {
          const sqCls = k.cls?.includes("green") ? "green" : k.cls?.includes("red") ? "red" : "";
          const accent = k.cls?.includes("green") ? "#5BC68C" : k.cls?.includes("red") ? "#E57367" : "#C9A84C";
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        <div className="lp-card p-6" style={{ borderColor: "rgba(192,57,43,.4)" }}>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-[10.5px] uppercase tracking-[.2em] text-[#E57367] font-bold">Incoming</div>
              <div className="lp-display text-[26px] text-white font-bold leading-tight mt-1">Help Requests</div>
            </div>
            <button onClick={() => goto("cases-requests")} className="lp-page-link text-[11px] text-[#E57367] uppercase tracking-[.14em] font-semibold relative">
              View All<span className="lp-underline" />
            </button>
          </div>
          <div className="space-y-4 max-h-[460px] overflow-y-auto lp-scroll pr-2">
            {pending.map(p => (
              <div key={p.id} className="rounded-xl p-4 transition-colors duration-300" style={{ background: "#0F0F0F", border: "1px solid rgba(192,57,43,.25)" }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-[14px] font-semibold text-white leading-tight">{p.title}</div>
                  <span className={`lp-pill ${p.urgency === "high" ? "lp-pill-urgent" : p.urgency === "med" ? "lp-pill-med" : "lp-pill-low"}`} style={{ height: 20, padding: "0 8px", fontSize: 9 }}>{p.urgency === "high" ? "High" : p.urgency === "med" ? "Med" : "Low"}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2"><span className="lp-chip">{p.cat}</span><span className="text-[11px] text-[#888]">{p.city} · {p.date}</span></div>
                <p className="text-[12px] text-[#aaa] line-clamp-2 mb-3">{p.summary}</p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button className="lp-act-accept" style={{ height: 36 }} onClick={() => { setRemoved(r => [...r, p.id]); showToast(`Approved ${p.id}`); }}>Approve</button>
                  <button className="lp-act-decline" style={{ height: 36 }} onClick={() => setReject(p.id)}>Reject</button>
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
            {active.map((c) => {
              const dnum = parseInt(c.deadline);
              return (
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
                  <div className="text-center text-[12px] font-semibold whitespace-nowrap" style={{ color: dnum < 3 ? "#E57367" : "#C9C4B0" }}>{dnum}d</div>
                  <div className="flex justify-end">
                    <button onClick={() => goto("cases-active")} className="lp-btn-view" style={{ height: 26, minWidth: 58, padding: "0 12px", fontSize: 10.5 }}>View</button>
                  </div>
                </div>
              </div>
              );
            })}
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
      {reject && (
        <div className="lp-modal-overlay" onClick={() => setReject(null)}>
          <div className="lp-modal m-auto max-w-[460px]" onClick={e => e.stopPropagation()}>
            <h3 className="lp-display text-[22px] text-white font-bold mb-1">Reject Reason</h3>
            <div className="text-[12px] text-[#888] mb-3">Request <span className="text-[#C9A84C] font-mono">{reject}</span></div>
            <select className="lp-input mb-3" value={reason} onChange={e => setReason(e.target.value)}>
              <option>Outside our scope</option><option>At capacity</option><option>Insufficient documentation</option><option>Duplicate request</option><option>Other</option>
            </select>
            <textarea className="lp-textarea" placeholder="Optional notes..." value={notes} onChange={e => setNotes(e.target.value)} />
            <div className="flex gap-2 justify-end mt-4">
              <button className="lp-btn lp-btn-gold" onClick={() => setReject(null)}>Cancel</button>
              <button className="lp-btn lp-btn-red" onClick={submitReject}>Submit Reject</button>
            </div>
          </div>
        </div>
      )}
      <Toast msg={toast} />
    </div>
  );
};