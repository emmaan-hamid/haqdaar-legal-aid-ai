import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Download, Star, FileText, Check } from "lucide-react";
import { CasesFilters, URGENCIES, STATUSES, OUTCOMES, matchFilters, type FilterState } from "@/components/lawyer/cases/CasesHeader";

const STAFF = ["Ayesha M.", "Bilal K.", "Sana R.", "Hamza A.", "Unassigned"];

const requests = [
  { id: "HD-3107", title: "Domestic abuse shelter request", cat: "Domestic Violence", urgency: "high", city: "Lahore", date: "Today", summary: "Mother of two seeks emergency shelter and protection order.", full: "Survivor of repeated abuse, requires immediate shelter placement and a court protection order.", laws: ["Punjab Protection of Women Against Violence Act 2016"], docs: ["medical_report.pdf", "police_complaint.pdf"] },
  { id: "HD-3108", title: "Wage theft, garment workers", cat: "Labor Dispute", urgency: "high", city: "Karachi", date: "Today", summary: "20 garment workers report 4 months unpaid overtime.", full: "Group of 20 garment factory workers report systematic non-payment of overtime over 4 months.", laws: ["Payment of Wages Act 1936"], docs: ["pay_slips.pdf"] },
  { id: "HD-3109", title: "NADRA card denial", cat: "NADRA Issues", urgency: "med", city: "Quetta", date: "Yesterday", summary: "Citizen denied ID card without written reason.", full: "Application denied at NADRA centre with no official letter. Family of 5 affected.", laws: ["NADRA Ordinance 2000"], docs: ["application_receipt.pdf"] },
  { id: "HD-3110", title: "Property fraud complaint", cat: "Property Fraud", urgency: "low", city: "Multan", date: "2 days", summary: "Forged signature used to transfer ancestral land.", full: "Ancestral land transferred via forged signature. FIR filed; no progress.", laws: ["Pakistan Penal Code §420"], docs: ["fir_copy.pdf"] },
];

export const NgoCaseRequests = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [reject, setReject] = useState<string | null>(null);
  const [removed, setRemoved] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [f, setF] = useState<FilterState>({ cat: "All Categories", date: "Any Date", sec: "All Urgency", q: "" });
  const visible = useMemo(() => matchFilters(requests.filter(r => !removed.includes(r.id)), f, {
    cat: r => r.cat, sec: r => r.urgency === "high" ? "High" : r.urgency === "med" ? "Medium" : "Low",
    text: r => `${r.title} ${r.summary} ${r.city} ${r.id}`,
  }), [f, removed]);
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2000); };
  const approve = (id: string) => { setRemoved(p => [...p, id]); showToast(`Approved ${id}`); };
  const rejectConfirm = () => { if (reject) { setRemoved(p => [...p, reject]); showToast(`Rejected ${reject}`); setReject(null); } };
  return (
    <div className="lp-fade space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-[11px] px-3 py-1 rounded-full font-bold tracking-wider" style={{ border: "1px solid #C9A84C", color: "#C9A84C" }}>{visible.length} NEW</span>
      </div>
      <CasesFilters second={{ label: "Urgency", options: URGENCIES }} onFilter={setF} />
      <div className="space-y-3 max-h-[620px] overflow-y-auto lp-gold-scroll pr-2">
        {visible.length === 0 && <div className="lp-card p-6 text-center text-[#888] text-[13px]">No matching requests.</div>}
        {visible.map(r => {
          const ex = open === r.id;
          return (
            <div key={r.id} className="lp-case-card" style={{ padding: 18 }}>
              <button className="w-full text-left" onClick={() => setOpen(ex ? null : r.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="lp-cat-pill" style={{ height: 26, fontSize: 10 }}>{r.cat}</span>
                    <span className={`lp-urg-pill ${r.urgency === "high" ? "lp-urg-high" : r.urgency === "med" ? "lp-urg-med" : "lp-urg-low"}`} style={{ height: 22, fontSize: 9.5 }}>{r.urgency === "high" ? "High" : r.urgency === "med" ? "Medium" : "Low"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#888]">
                    <span>{r.id} · {r.date}</span>
                    {ex ? <ChevronUp size={16} className="text-[#C9A84C]" /> : <ChevronDown size={16} className="text-[#C9A84C]" />}
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="text-[15.5px] font-semibold text-white leading-tight">{r.title}</div>
                  <div className="text-[11.5px] text-[#888] mt-0.5">{r.city}</div>
                </div>
                <p className="text-[12px] text-[#C9C4B0] mt-2 leading-relaxed line-clamp-2">{r.summary}</p>
              </button>
              {ex && (
                <div className="mt-4 pt-4 border-t border-[rgba(201,168,76,.2)] space-y-4 lp-fade">
                  <div><div className="text-[10.5px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold mb-1.5">AI Analysis</div><p className="text-[12.5px] text-[#E8E0D0] leading-relaxed">{r.full}</p></div>
                  <div><div className="text-[10.5px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold mb-1.5">Laws Retrieved</div><div className="flex flex-wrap gap-2">{r.laws.map(l => <span key={l} className="lp-cat-pill" style={{ height: 28, fontSize: 10 }}>{l}</span>)}</div></div>
                  <div><div className="text-[10.5px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold mb-1.5">Uploaded Documents</div><div className="flex flex-wrap gap-2">{r.docs.map(d => <span key={d} className="inline-flex items-center gap-2 text-[11.5px] text-[#C9A84C] px-3 py-1.5 rounded-lg" style={{ border: "1px solid rgba(201,168,76,.4)" }}><FileText size={12} /> {d}</span>)}</div></div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 mt-4 max-w-[300px]">
                <button className="lp-act-accept" style={{ height: 38 }} onClick={() => approve(r.id)}><Check size={14} className="mr-1.5" />Approve</button>
                <button className="lp-act-decline" style={{ height: 38 }} onClick={() => setReject(r.id)}>Reject</button>
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
              <button className="lp-btn lp-btn-red" onClick={rejectConfirm}>Submit Reject</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] px-4 py-2 rounded-full text-[12px]" style={{ background: "#1E1E1E", border: "1px solid #C9A84C", color: "#C9A84C" }}>{toast}</div>}
    </div>
  );
};

const activeData = [
  { id: "HD-3101", title: "Workplace harassment case", cat: "Harassment", status: "progress", deadline: "5d", staff: "Ayesha M." },
  { id: "HD-3102", title: "Eviction defense", cat: "Property Fraud", status: "await", deadline: "2d", staff: "Bilal K." },
  { id: "HD-3103", title: "Police misconduct complaint", cat: "Police Misconduct", status: "progress", deadline: "8d", staff: "Unassigned" },
  { id: "HD-3104", title: "Consumer fraud refund", cat: "Consumer Rights", status: "pending", deadline: "12d", staff: "Sana R." },
];

export const NgoActiveCases = () => {
  const [detail, setDetail] = useState<typeof activeData[number] | null>(null);
  const [rows, setRows] = useState(activeData);
  const [toast, setToast] = useState("");
  const [f, setF] = useState<FilterState>({ cat: "All Categories", date: "Any Date", sec: "All Status", q: "" });
  const visible = useMemo(() => matchFilters(rows, f, {
    cat: r => r.cat, sec: r => r.status === "progress" ? "In Progress" : r.status === "await" ? "Awaiting" : "Pending",
    text: r => `${r.title} ${r.staff} ${r.id}`,
  }), [f, rows]);
  if (detail) return <NgoCaseDetail c={detail} back={() => setDetail(null)} />;
  const assign = (id: string, s: string) => { setRows(rows.map(r => r.id === id ? { ...r, staff: s } : r)); setToast(`Assigned ${s} to ${id}`); setTimeout(() => setToast(""), 2200); };
  return (
    <div className="lp-fade space-y-4">
      <div><span className="text-[11px] px-3 py-1 rounded-full font-bold tracking-wider align-middle" style={{ border: "1px solid #C9A84C", color: "#C9A84C" }}>{visible.length} ACTIVE</span></div>
      <CasesFilters second={{ label: "Status", options: STATUSES }} onFilter={setF} />
      <div className="lp-case-card p-0 overflow-hidden">
        <div className="overflow-x-auto lp-gold-scroll" style={{ maxHeight: 480, overflowY: "auto" }}>
          <table className="w-full text-[12.5px]" style={{ borderCollapse: "separate", borderSpacing: 0, minWidth: 920 }}>
            <thead className="sticky top-0 z-10" style={{ background: "#141414" }}>
              <tr className="text-[10px] uppercase tracking-[.14em] text-[#888] font-semibold">
                {["Case ID", "Title", "Category", "Status", "Assigned", "Deadline", "Action"].map(h => (
                  <th key={h} className={`px-3 py-3 text-left ${h === "Action" ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
              <tr><td colSpan={7}><div className="h-px" style={{ background: "rgba(201,168,76,.2)" }} /></td></tr>
            </thead>
            <tbody>
              {visible.map(c => {
                const dnum = parseInt(c.deadline);
                return (
                  <tr key={c.id} className="lp-row-hover" style={{ borderTop: "1px solid rgba(201,168,76,.08)" }}>
                    <td className="px-3 py-3 font-mono text-[12px] text-[#C9A84C] whitespace-nowrap">{c.id}</td>
                    <td className="px-3 py-3 text-white">{c.title}</td>
                    <td className="px-3 py-3 text-[#C9C4B0] whitespace-nowrap">{c.cat}</td>
                    <td className="px-2 py-3"><span className={`lp-stat-pill lp-stat-eq ${c.status === "progress" ? "lp-stat-progress" : c.status === "await" ? "lp-stat-await" : "lp-stat-pending"}`}>{c.status === "progress" ? "In Progress" : c.status === "await" ? "Awaiting" : "Pending"}</span></td>
                    <td className="px-2 py-3"><select value={c.staff} onChange={e => assign(c.id, e.target.value)} className="lp-filter-select" style={{ height: 30, fontSize: 11, minWidth: 110 }}>{STAFF.map(s => <option key={s}>{s}</option>)}</select></td>
                    <td className="px-2 py-3 font-semibold whitespace-nowrap" style={{ color: dnum < 3 ? "#E57367" : "#C9C4B0" }}>{c.deadline}</td>
                    <td className="px-3 py-3 text-right"><button onClick={() => setDetail(c)} className="lp-btn-view">View</button></td>
                  </tr>
                );
              })}
              {visible.length === 0 && <tr><td colSpan={7} className="px-5 py-8 text-center text-[#888] text-[13px]">No matching cases.</td></tr>}
            </tbody>
          </table>
        </div>
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
        <button onClick={back} className="lp-act-btn">Back</button>
      </div>
      <div className="lp-card p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[#C9A84C] text-[14px]">{c.id}</span>
          <span className="lp-chip">{c.cat}</span>
          <select className="lp-input" style={{ width: 220, height: 36 }}><option>In Progress</option><option>Awaiting Client</option><option>Resolved</option><option>Closed</option></select>
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
        <div className="flex flex-wrap gap-2.5 pt-2">
          <button className="lp-act-btn">Request Document</button>
          <button className="lp-act-btn">Message Client</button>
          <button className="lp-act-btn">Upload Document</button>
          <button className="lp-act-btn lp-act-btn-red" onClick={() => setCloseOpen(true)}>Close Case</button>
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
              <button className="lp-act-btn" onClick={() => setCloseOpen(false)}>Cancel</button>
              <button className="lp-act-btn lp-act-btn-red" onClick={() => setCloseOpen(false)}>Confirm Close</button>
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

export const NgoCompletedCases = () => {
  const [f, setF] = useState<FilterState>({ cat: "All Categories", date: "Any Date", sec: "All Outcomes", q: "" });
  const [pdfState, setPdfState] = useState<{ id: string; phase: "loading" | "done" } | null>(null);
  const visible = useMemo(() => matchFilters(completed, f, {
    cat: r => r.cat, sec: r => r.res, text: r => `${r.title} ${r.id} ${r.cat} ${r.staff}`,
  }), [f]);
  const downloadPdf = (id: string) => {
    setPdfState({ id, phase: "loading" });
    setTimeout(() => setPdfState({ id, phase: "done" }), 1400);
    setTimeout(() => setPdfState(null), 3200);
  };
  return (
    <div className="lp-fade space-y-4">
      <div><span className="text-[11px] px-3 py-1 rounded-full font-bold tracking-wider align-middle" style={{ border: "1px solid #5BC68C", color: "#5BC68C" }}>{visible.length} COMPLETED</span></div>
      <CasesFilters second={{ label: "Outcome", options: OUTCOMES }} onFilter={setF} />
      <div className="lp-case-card p-0 overflow-hidden">
        <div className="overflow-x-auto lp-gold-scroll" style={{ maxHeight: 480, overflowY: "auto" }}>
          <table className="w-full text-[12.5px]" style={{ borderCollapse: "separate", borderSpacing: 0, minWidth: 960 }}>
            <thead className="sticky top-0 z-10" style={{ background: "#141414" }}>
              <tr className="text-[10px] uppercase tracking-[.14em] text-[#888] font-semibold">
                {["Case ID", "Title", "Category", "Resolved", "Outcome", "Rating", "Staff", "Export"].map(h => (
                  <th key={h} className={`px-3 py-3 text-left ${h === "Export" ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
              <tr><td colSpan={8}><div className="h-px" style={{ background: "rgba(201,168,76,.2)" }} /></td></tr>
            </thead>
            <tbody>
              {visible.map(c => (
                <tr key={c.id} className="lp-row-hover" style={{ borderTop: "1px solid rgba(201,168,76,.08)" }}>
                  <td className="px-3 py-3 font-mono text-[12px] text-[#C9A84C] whitespace-nowrap">{c.id}</td>
                  <td className="px-3 py-3 text-white">{c.title}</td>
                  <td className="px-3 py-3 text-[#C9C4B0] whitespace-nowrap">{c.cat}</td>
                  <td className="px-3 py-3 text-[#C9C4B0] whitespace-nowrap">{c.date}</td>
                  <td className="px-2 py-3"><span className="lp-stat-pill lp-stat-eq lp-stat-resolved">{c.res}</span></td>
                  <td className="px-2 py-3"><div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className={i < c.rating ? "lp-star filled" : "lp-star"} fill={i < c.rating ? "currentColor" : "none"} />)}</div></td>
                  <td className="px-3 py-3 text-[#C9C4B0] whitespace-nowrap">{c.staff}</td>
                  <td className="px-3 py-3 text-right"><button onClick={() => downloadPdf(c.id)} className="lp-btn-view"><Download size={11} className="mr-1" /> PDF</button></td>
                </tr>
              ))}
              {visible.length === 0 && <tr><td colSpan={8} className="px-5 py-8 text-center text-[#888] text-[13px]">No matching cases.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      {pdfState && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 rounded-xl text-[12px] flex items-center gap-3" style={{ background: "#141414", border: "1px solid #C9A84C", boxShadow: "0 12px 40px -10px rgba(201,168,76,.4)" }}>
          {pdfState.phase === "loading" ? (
            <><div className="w-3 h-3 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" /><span className="text-[#C9A84C]">Downloading {pdfState.id}.pdf…</span></>
          ) : (
            <><Check size={14} className="text-[#5BC68C]" /><span className="text-[#5BC68C]">Successfully downloaded {pdfState.id}.pdf</span></>
          )}
        </div>
      )}
    </div>
  );
};
