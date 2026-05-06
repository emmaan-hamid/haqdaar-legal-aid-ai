import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Download, Star } from "lucide-react";

const requests = [
  { id: "HD-2407", title: "Unpaid wages, factory workers", cat: "Labor Dispute", urgency: "high", city: "Faisalabad", date: "Today", summary: "12 workers report 3 months unpaid wages with documentation.", full: "Group of 12 textile workers at a factory in Faisalabad have not received salaries for the last 3 months. Owner refuses meetings.", laws: ["Payment of Wages Act 1936", "Industrial Relations Act 2012"], docs: ["pay_slips.pdf", "joint_letter.pdf"] },
  { id: "HD-2408", title: "Domestic violence protection order", cat: "Domestic Violence", urgency: "high", city: "Lahore", date: "Today", summary: "Citizen requesting urgent court protection order.", full: "Victim of repeated domestic abuse seeks court-issued protection. Aurat Foundation has been notified.", laws: ["Punjab Protection of Women Against Violence Act 2016"], docs: ["medical_report.pdf", "police_complaint.pdf"] },
  { id: "HD-2409", title: "NADRA ID rejection appeal", cat: "NADRA Issues", urgency: "med", city: "Karachi", date: "Yesterday", summary: "ID application rejected without clear reason. Appeal documents ready.", full: "Applicant rejected during biometric verification. Wants to file appeal.", laws: ["NADRA Ordinance 2000"], docs: ["rejection_letter.pdf"] },
  { id: "HD-2410", title: "Property fraud, fake transfer", cat: "Property Fraud", urgency: "low", city: "Multan", date: "2 days", summary: "Forged transfer deed; FIR filed but no progress.", full: "Property in Multan transferred without owner consent through forged documents.", laws: ["Pakistan Penal Code §420", "Land Revenue Act"], docs: ["fir_copy.pdf", "transfer_deed.pdf"] },
];

const Filters = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex flex-wrap gap-2 items-center">
    {["Category", "Date", "Urgency"].map(f => (
      <select key={f} className="lp-input" style={{ width: 140, height: 36 }}>
        <option>{f}</option>
        <option>All</option>
      </select>
    ))}
    <div className="relative flex-1 min-w-[160px]">
      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
      <input className="lp-input" style={{ paddingLeft: 56, height: 36, height: 36 }} placeholder="Search..." />
    </div>
    {children}
  </div>
);

export const CaseRequests = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [decline, setDecline] = useState<string | null>(null);
  return (
    <div className="lp-fade space-y-5">
      <div className="flex items-center gap-3">
        <h2 className="lp-display text-[28px] font-bold text-white">Case Requests</h2>
        <span className="text-[11px] px-2 py-1 rounded-full bg-[rgba(201,168,76,.15)] text-[#C9A84C] font-semibold">{requests.length} new</span>
      </div>
      <Filters />
      <div className="space-y-3">
        {requests.map(r => {
          const ex = open === r.id;
          return (
            <div key={r.id} className="lp-card p-5 lp-card-hover">
              <button className="w-full flex items-start justify-between gap-3" onClick={() => setOpen(ex ? null : r.id)}>
                <div className="text-left">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="lp-chip">{r.cat}</span>
                    <span className={`lp-pill ${r.urgency === "high" ? "lp-pill-urgent" : r.urgency === "med" ? "lp-pill-med" : "lp-pill-low"}`} style={{ height: 20, fontSize: 9 }}>{r.urgency === "high" ? "High" : r.urgency === "med" ? "Med" : "Low"}</span>
                    <span className="text-[11px] text-[#888]">{r.city} • {r.date}</span>
                  </div>
                  <div className="text-[15px] font-semibold text-white">{r.title}</div>
                  <p className="text-[12.5px] text-[#aaa] mt-1 max-w-2xl">{r.summary}</p>
                </div>
                {ex ? <ChevronUp size={18} className="text-[#C9A84C] mt-1" /> : <ChevronDown size={18} className="text-[#C9A84C] mt-1" />}
              </button>
              {ex && (
                <div className="mt-4 pt-4 border-t border-[rgba(201,168,76,.2)] space-y-3 lp-fade">
                  <div>
                    <div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Citizen's full description</div>
                    <p className="text-[12.5px] text-[#E8E0D0]">{r.full}</p>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Laws Retrieved</div>
                    <div className="flex flex-wrap gap-2">{r.laws.map(l => <span key={l} className="lp-chip">{l}</span>)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Documents</div>
                    <div className="flex flex-wrap gap-2">{r.docs.map(d => <span key={d} className="text-[11.5px] text-[#aaa] px-3 py-1 rounded-full border border-[#333]">{d}</span>)}</div>
                  </div>
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <button className="lp-btn lp-btn-green">Accept</button>
                <button className="lp-btn lp-btn-red" onClick={() => setDecline(r.id)}>Decline</button>
              </div>
            </div>
          );
        })}
      </div>
      {decline && (
        <div className="lp-modal-overlay" onClick={() => setDecline(null)}>
          <div className="lp-modal m-auto max-w-[460px]" onClick={e => e.stopPropagation()}>
            <h3 className="lp-display text-[22px] text-white font-bold mb-3">Decline Reason</h3>
            <select className="lp-input mb-3"><option>Outside specialization</option><option>At capacity</option><option>Conflict of interest</option><option>Other</option></select>
            <textarea className="lp-textarea" placeholder="Optional notes..." />
            <div className="flex gap-2 justify-end mt-4">
              <button className="lp-btn lp-btn-gold" onClick={() => setDecline(null)}>Cancel</button>
              <button className="lp-btn lp-btn-red" onClick={() => setDecline(null)}>Submit Decline</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const activeData = [
  { id: "HD-2401", title: "Wrongful termination", cat: "Labor", status: "progress", deadline: "5 days" },
  { id: "HD-2402", title: "Tenancy eviction notice", cat: "Property", status: "await", deadline: "2 days" },
  { id: "HD-2403", title: "Police misconduct complaint", cat: "Police", status: "progress", deadline: "8 days" },
  { id: "HD-2404", title: "Consumer fraud refund", cat: "Consumer", status: "pending", deadline: "12 days" },
];

export const ActiveCases = () => {
  const [detail, setDetail] = useState<typeof activeData[number] | null>(null);
  if (detail) return <CaseDetail c={detail} back={() => setDetail(null)} />;
  return (
    <div className="lp-fade space-y-5">
      <h2 className="lp-display text-[28px] font-bold text-white">Active Cases</h2>
      <div className="flex gap-2 mb-2">
        {["Incoming Requests", "Active Cases", "Completed Cases"].map((t, i) => (
          <button key={t} className="lp-btn lp-btn-gold" style={i === 1 ? { background: "rgba(201,168,76,.15)", boxShadow: "0 0 16px rgba(201,168,76,.5)" } : {}}>{t}</button>
        ))}
      </div>
      <Filters />
      <div className="lp-card overflow-hidden">
        <div className="grid grid-cols-[80px_1fr_120px_110px_90px_100px] gap-3 px-5 py-3 text-[10px] uppercase tracking-[.12em] text-[#888] font-semibold border-b border-[rgba(201,168,76,.2)]">
          <div>Case ID</div><div>Title</div><div>Category</div><div>Status</div><div>Deadline</div><div>Action</div>
        </div>
        {activeData.map(c => (
          <div key={c.id} className="grid grid-cols-[80px_1fr_120px_110px_90px_100px] gap-3 items-center px-5 py-3 text-[12.5px] border-b border-[rgba(201,168,76,.1)] hover:bg-[rgba(201,168,76,.04)] transition-colors">
            <div className="font-mono text-[#C9A84C]">{c.id}</div>
            <div className="text-white truncate">{c.title}</div>
            <div className="text-[#aaa]">{c.cat}</div>
            <span className={`lp-pill ${c.status === "progress" ? "lp-pill-progress" : c.status === "await" ? "lp-pill-await" : "lp-pill-pending"}`} style={{ width: 100, justifyContent: "center", fontSize: 9 }}>{c.status === "progress" ? "In Progress" : c.status === "await" ? "Awaiting" : "Pending"}</span>
            <div className={+c.deadline.split(" ")[0] < 3 ? "text-[#E57367]" : "text-[#aaa]"}>{c.deadline}</div>
            <button className="lp-btn lp-btn-gold lp-btn-sm" onClick={() => setDetail(c)}>View Full</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const CaseDetail = ({ c, back }: { c: any; back: () => void }) => {
  const [closeOpen, setCloseOpen] = useState(false);
  return (
    <div className="lp-fade space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="lp-display text-[28px] font-bold text-white">Case Detail</h2>
        <button onClick={back} className="lp-btn lp-btn-gold">Back</button>
      </div>
      <div className="lp-card p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[#C9A84C] text-[14px]">{c.id}</span>
          <span className="lp-chip">{c.cat}</span>
          <select className="lp-input" style={{ width: 200, height: 34 }}><option>In Progress</option><option>Awaiting Client Response</option><option>Awaiting Court Date</option><option>Resolved</option><option>Closed</option></select>
        </div>
        <h3 className="text-[22px] text-white font-semibold">{c.title}</h3>
        <div>
          <div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Citizen's Problem</div>
          <p className="text-[13px] text-[#E8E0D0]">Worker terminated without notice and without final settlement after 3 years of service.</p>
        </div>
        <div className="rounded-xl p-4" style={{ background: "rgba(201,168,76,.05)", border: "1px solid rgba(201,168,76,.25)" }}>
          <div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-2">AI Analysis</div>
          <p className="text-[12.5px] text-[#E8E0D0]">Strong case under Industrial & Commercial Employment Ordinance 1968. Citizen entitled to notice pay, gratuity, and back wages.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-2">Documents</div>
            <ul className="text-[12.5px] text-[#aaa] space-y-1"><li>• appointment_letter.pdf</li><li>• termination_notice.pdf</li><li>• salary_slips.pdf</li></ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-2">Lawyer Notes</div>
            <textarea className="lp-textarea" placeholder="Private notes..."></textarea>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="lp-btn lp-btn-gold">Request Document</button>
          <button className="lp-btn lp-btn-gold">Message Client</button>
          <button className="lp-btn lp-btn-gold">Upload Document</button>
          <button className="lp-btn lp-btn-green" onClick={() => setCloseOpen(true)}>Close Case</button>
        </div>
      </div>
      {closeOpen && (
        <div className="lp-modal-overlay" onClick={() => setCloseOpen(false)}>
          <div className="lp-modal m-auto max-w-[520px]" onClick={e => e.stopPropagation()}>
            <h3 className="lp-display text-[22px] text-white font-bold mb-4">Close Case</h3>
            <div className="space-y-3">
              <select className="lp-input"><option>Resolution: Settled</option><option>Resolution: Court Order</option><option>Resolution: Withdrawn</option></select>
              <textarea className="lp-textarea" placeholder="Outcome summary..."></textarea>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button className="lp-btn lp-btn-gold" onClick={() => setCloseOpen(false)}>Cancel</button>
              <button className="lp-btn lp-btn-green" onClick={() => setCloseOpen(false)}>Confirm Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const completed = [
  { id: "HD-2399", title: "Harassment workplace", cat: "Harassment", date: "12 Apr 2026", res: "Settled", rating: 5 },
  { id: "HD-2398", title: "Wrongful arrest", cat: "Police Misconduct", date: "08 Apr 2026", res: "Court Order", rating: 5 },
  { id: "HD-2397", title: "Consumer fraud refund", cat: "Consumer Rights", date: "01 Apr 2026", res: "Settled", rating: 4 },
  { id: "HD-2396", title: "Tenancy dispute", cat: "Property Fraud", date: "27 Mar 2026", res: "Withdrawn", rating: 4 },
];

export const CompletedCases = () => (
  <div className="lp-fade space-y-5">
    <h2 className="lp-display text-[28px] font-bold text-white">Completed Cases</h2>
    <Filters />
    <div className="lp-card overflow-hidden">
      <div className="grid grid-cols-[80px_1fr_140px_110px_110px_90px_110px] gap-3 px-5 py-3 text-[10px] uppercase tracking-[.12em] text-[#888] font-semibold border-b border-[rgba(201,168,76,.2)]">
        <div>Case ID</div><div>Title</div><div>Category</div><div>Resolution Date</div><div>Resolution</div><div>Rating</div><div>Action</div>
      </div>
      {completed.map(c => (
        <div key={c.id} className="grid grid-cols-[80px_1fr_140px_110px_110px_90px_110px] gap-3 items-center px-5 py-3 text-[12.5px] border-b border-[rgba(201,168,76,.1)] hover:bg-[rgba(201,168,76,.04)]">
          <div className="font-mono text-[#C9A84C]">{c.id}</div>
          <div className="text-white truncate">{c.title}</div>
          <div className="text-[#aaa]">{c.cat}</div>
          <div className="text-[#aaa]">{c.date}</div>
          <span className="lp-pill lp-pill-resolved" style={{ justifyContent: "center", fontSize: 9 }}>{c.res}</span>
          <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className={i < c.rating ? "lp-star filled" : "lp-star"} fill={i < c.rating ? "currentColor" : "none"} />)}</div>
          <button className="lp-btn lp-btn-gold lp-btn-sm">View</button>
        </div>
      ))}
    </div>
    <button className="lp-btn lp-btn-gold-solid"><Download size={12} /> Export PDF</button>
  </div>
);
