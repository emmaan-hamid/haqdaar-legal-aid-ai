import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Download, Star } from "lucide-react";

const STAFF = ["Ayesha M.", "Bilal K.", "Sana R.", "Hamza A.", "Unassigned"];

const requests = [
  { id: "HD-3107", title: "Domestic abuse shelter request", cat: "Domestic Violence", urgency: "high", city: "Lahore", date: "Today", summary: "Mother of two seeks emergency shelter and protection order.", full: "Survivor of repeated abuse, requires immediate shelter placement and a court protection order.", laws: ["Punjab Protection of Women Against Violence Act 2016"], docs: ["medical_report.pdf", "police_complaint.pdf"] },
  { id: "HD-3108", title: "Wage theft, garment workers", cat: "Labor Dispute", urgency: "high", city: "Karachi", date: "Today", summary: "20 garment workers report 4 months unpaid overtime.", full: "Group of 20 garment factory workers report systematic non-payment of overtime over 4 months.", laws: ["Payment of Wages Act 1936"], docs: ["pay_slips.pdf"] },
  { id: "HD-3109", title: "NADRA card denial", cat: "NADRA Issues", urgency: "med", city: "Quetta", date: "Yesterday", summary: "Citizen denied ID card without written reason.", full: "Application denied at NADRA centre with no official letter. Family of 5 affected.", laws: ["NADRA Ordinance 2000"], docs: ["application_receipt.pdf"] },
  { id: "HD-3110", title: "Property fraud complaint", cat: "Property Fraud", urgency: "low", city: "Multan", date: "2 days", summary: "Forged signature used to transfer ancestral land.", full: "Ancestral land transferred via forged signature. FIR filed; no progress.", laws: ["Pakistan Penal Code §420"], docs: ["fir_copy.pdf"] },
];

const Filters = () => (
  <div className="flex flex-wrap gap-2 items-center">
    {["Category", "Date", "Urgency"].map(f => (
      <select key={f} className="lp-input" style={{ width: 140, height: 36 }}><option>{f}</option><option>All</option></select>
    ))}
    <div className="relative flex-1 min-w-[160px]">
      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
      <input className="lp-input" style={{ paddingLeft: 56, height: 36 }} placeholder="Search..." />
    </div>
  </div>
);

export const NgoCaseRequests = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [reject, setReject] = useState<string | null>(null);
  return (
    <div className="lp-fade space-y-5">
      <div className="flex items-center gap-3">
        <h2 className="lp-display text-[28px] font-bold text-white">Incoming Requests</h2>
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
                  <div><div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Citizen's full description</div><p className="text-[12.5px] text-[#E8E0D0]">{r.full}</p></div>
                  <div><div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Laws Retrieved</div><div className="flex flex-wrap gap-2">{r.laws.map(l => <span key={l} className="lp-chip">{l}</span>)}</div></div>
                  <div><div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Documents</div><div className="flex flex-wrap gap-2">{r.docs.map(d => <span key={d} className="text-[11.5px] text-[#aaa] px-3 py-1 rounded-full border border-[#333]">{d}</span>)}</div></div>
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <button className="lp-btn lp-btn-green">Approve</button>
                <button className="lp-btn lp-btn-red" onClick={() => setReject(r.id)}>Reject</button>
              </div>
            </div>
          );
        })}
      </div>
      {reject && (
        <div className="lp-modal-overlay" onClick={() => setReject(null)}>
          <div className="lp-modal max-w-[460px]" onClick={e => e.stopPropagation()}>
            <h3 className="lp-display text-[22px] text-white font-bold mb-3">Reject Reason</h3>
            <select className="lp-input mb-3"><option>Outside our focus areas</option><option>At capacity</option><option>Conflict of interest</option><option>Other</option></select>
            <textarea className="lp-textarea" placeholder="Optional notes..." />
            <div className="flex gap-2 justify-end mt-4">
              <button className="lp-btn lp-btn-gold" onClick={() => setReject(null)}>Cancel</button>
              <button className="lp-btn lp-btn-red" onClick={() => setReject(null)}>Submit Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const activeData = [
  { id: "HD-3101", title: "Workplace harassment case", cat: "Harassment", status: "progress", deadline: "5 days", staff: "Ayesha M." },
  { id: "HD-3102", title: "Eviction defense", cat: "Property", status: "await", deadline: "2 days", staff: "Bilal K." },
  { id: "HD-3103", title: "Police misconduct complaint", cat: "Police", status: "progress", deadline: "8 days", staff: "Unassigned" },
  { id: "HD-3104", title: "Consumer fraud refund", cat: "Consumer", status: "pending", deadline: "12 days", staff: "Sana R." },
];

export const NgoActiveCases = () => {
  const [detail, setDetail] = useState<typeof activeData[number] | null>(null);
  const [rows, setRows] = useState(activeData);
  const [toast, setToast] = useState("");
  if (detail) return <NgoCaseDetail c={detail} back={() => setDetail(null)} />;
  const assign = (id: string, s: string) => { setRows(rows.map(r => r.id === id ? { ...r, staff: s } : r)); setToast(`Assigned ${s} to ${id}`); setTimeout(() => setToast(""), 2200); };
  return (
    <div className="lp-fade space-y-5">
      <h2 className="lp-display text-[28px] font-bold text-white">Active Cases</h2>
      <Filters />
      <div className="lp-card overflow-hidden">
        <div className="grid grid-cols-[80px_1fr_110px_100px_120px_80px_90px] gap-3 px-5 py-3 text-[10px] uppercase tracking-[.12em] text-[#888] font-semibold border-b border-[rgba(201,168,76,.2)]">
          <div>Case ID</div><div>Title</div><div>Category</div><div>Status</div><div>Assigned Staff</div><div>Deadline</div><div>Action</div>
        </div>
        {rows.map(c => (
          <div key={c.id} className="grid grid-cols-[80px_1fr_110px_100px_120px_80px_90px] gap-3 items-center px-5 py-3 text-[12.5px] border-b border-[rgba(201,168,76,.1)] hover:bg-[rgba(201,168,76,.04)] transition-colors">
            <div className="font-mono text-[#C9A84C]">{c.id}</div>
            <div className="text-white truncate">{c.title}</div>
            <div className="text-[#aaa]">{c.cat}</div>
            <span className={`lp-pill ${c.status === "progress" ? "lp-pill-progress" : c.status === "await" ? "lp-pill-await" : "lp-pill-pending"}`} style={{ width: 90, justifyContent: "center", fontSize: 8, height: 20 }}>{c.status === "progress" ? "In Progress" : c.status === "await" ? "Awaiting" : "Pending"}</span>
            <select value={c.staff} onChange={e => assign(c.id, e.target.value)} className="lp-input" style={{ height: 30, fontSize: 11, padding: "0 10px" }}>{STAFF.map(s => <option key={s}>{s}</option>)}</select>
            <div className={+c.deadline.split(" ")[0] < 3 ? "text-[#E57367]" : "text-[#aaa]"}>{c.deadline}</div>
            <button className="lp-btn lp-btn-gold-solid" style={{ height: 28, fontSize: 11 }} onClick={() => setDetail(c)}>View</button>
          </div>
        ))}
      </div>
      {toast && <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] px-4 py-2 rounded-full text-[12px]" style={{ background: "#1E1E1E", border: "1px solid #C9A84C", color: "#C9A84C" }}>{toast}</div>}
    </div>
  );
};

const NgoCaseDetail = ({ c, back }: { c: any; back: () => void }) => {
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
          <select className="lp-input" style={{ width: 200, height: 34 }}><option>In Progress</option><option>Awaiting Client</option><option>Resolved</option><option>Closed</option></select>
        </div>
        <h3 className="text-[22px] text-white font-semibold">{c.title}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Assigned Staff</div>
            <select className="lp-input" defaultValue={c.staff}>{STAFF.map(s => <option key={s}>{s}</option>)}</select>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Deadline</div>
            <div className="text-[13px] text-[#E8E0D0]">{c.deadline}</div>
          </div>
        </div>
        <div className="rounded-xl p-4" style={{ background: "rgba(201,168,76,.05)", border: "1px solid rgba(201,168,76,.25)" }}>
          <div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-2">AI Analysis</div>
          <p className="text-[12.5px] text-[#E8E0D0]">Strong case with documentary evidence. Citizen entitled to remedies under applicable Pakistani statutes.</p>
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
          <div className="lp-modal max-w-[520px]" onClick={e => e.stopPropagation()}>
            <h3 className="lp-display text-[22px] text-white font-bold mb-4">Close Case</h3>
            <div className="space-y-3">
              <select className="lp-input"><option>Resolution: Settled</option><option>Resolution: Court Order</option><option>Resolution: Withdrawn</option></select>
              <textarea className="lp-textarea" placeholder="Outcome summary..." />
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button className="lp-btn lp-btn-green" style={{ minWidth: 130 }} onClick={() => setCloseOpen(false)}>Cancel</button>
              <button className="lp-btn lp-btn-green" style={{ minWidth: 130 }} onClick={() => setCloseOpen(false)}>Confirm Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const completed = [
  { id: "HD-3099", title: "Harassment workplace", cat: "Harassment", date: "12 Apr 2026", res: "Settled", rating: 5, staff: "Ayesha M." },
  { id: "HD-3098", title: "Wrongful arrest", cat: "Police Misconduct", date: "08 Apr 2026", res: "Court Order", rating: 5, staff: "Bilal K." },
  { id: "HD-3097", title: "Consumer fraud refund", cat: "Consumer Rights", date: "01 Apr 2026", res: "Settled", rating: 4, staff: "Sana R." },
  { id: "HD-3096", title: "Tenancy dispute", cat: "Property Fraud", date: "27 Mar 2026", res: "Withdrawn", rating: 4, staff: "Hamza A." },
];

export const NgoCompletedCases = () => (
  <div className="lp-fade space-y-5">
    <h2 className="lp-display text-[28px] font-bold text-white">Completed Cases</h2>
    <Filters />
    <div className="lp-card overflow-hidden">
      <div className="grid grid-cols-[70px_1fr_120px_100px_100px_70px_120px_80px] gap-3 px-5 py-3 text-[10px] uppercase tracking-[.12em] text-[#888] font-semibold border-b border-[rgba(201,168,76,.2)]">
        <div>Case ID</div><div>Title</div><div>Category</div><div>Date</div><div>Resolution</div><div>Rating</div><div>Assigned Staff</div><div>Action</div>
      </div>
      {completed.map(c => (
        <div key={c.id} className="grid grid-cols-[70px_1fr_120px_100px_100px_70px_120px_80px] gap-3 items-center px-5 py-3 text-[12.5px] border-b border-[rgba(201,168,76,.1)] hover:bg-[rgba(201,168,76,.04)]">
          <div className="font-mono text-[#C9A84C]">{c.id}</div>
          <div className="text-white truncate">{c.title}</div>
          <div className="text-[#aaa]">{c.cat}</div>
          <div className="text-[#aaa]">{c.date}</div>
          <span className="lp-pill lp-pill-resolved" style={{ justifyContent: "center", fontSize: 9 }}>{c.res}</span>
          <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className={i < c.rating ? "lp-star filled" : "lp-star"} fill={i < c.rating ? "currentColor" : "none"} />)}</div>
          <div className="text-[#aaa] truncate">{c.staff}</div>
          <button className="lp-btn lp-btn-gold lp-btn-sm">View</button>
        </div>
      ))}
    </div>
    <button className="lp-btn lp-btn-gold-solid"><Download size={12} /> Download</button>
  </div>
);