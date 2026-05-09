import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Download, Star, FileText, Check } from "lucide-react";
import { CasesFilters, URGENCIES, STATUSES, OUTCOMES, matchFilters, type FilterState } from "../cases/CasesHeader";

const requests = [
  { id: "REQ 1042", title: "Wrongful termination from textile mill", cat: "Labor Dispute", urgency: "high", city: "Faisalabad", date: "Today", time: "2h ago", summary: "Worker dismissed without notice or final dues after 6 years of service. Requests reinstatement and unpaid wages.", full: "Client worked at Crescent Textile Mill, Faisalabad from 2018 to 2024 as a quality control operator. On 14 March 2026 he was verbally dismissed without written notice, severance, or final settlement of dues totaling PKR 218,000.", laws: ["Industrial Relations Act 2012, §33", "West Pakistan Industrial & Commercial Employment Standing Orders 1968", "Payment of Wages Act 1936"], docs: ["ID copy.pdf", "Employment letter.pdf", "Last payslip.jpg"] },
  { id: "REQ 1043", title: "Domestic violence protection order", cat: "Domestic Violence", urgency: "high", city: "Lahore", date: "Today", time: "4h ago", summary: "Citizen requesting urgent court protection order against spouse.", full: "Victim of repeated domestic abuse seeks court-issued protection. Aurat Foundation has been notified.", laws: ["Punjab Protection of Women Against Violence Act 2016"], docs: ["medical_report.pdf", "police_complaint.pdf"] },
  { id: "REQ 1044", title: "NADRA ID rejection appeal", cat: "NADRA Issues", urgency: "med", city: "Karachi", date: "Yesterday", time: "1d ago", summary: "ID application rejected without clear reason. Appeal documents ready.", full: "Applicant rejected during biometric verification. Wants to file appeal.", laws: ["NADRA Ordinance 2000"], docs: ["rejection_letter.pdf"] },
  { id: "REQ 1045", title: "Property fraud, fake transfer", cat: "Property Fraud", urgency: "low", city: "Multan", date: "2 days", time: "2d ago", summary: "Forged transfer deed; FIR filed but no progress.", full: "Property in Multan transferred without owner consent through forged documents.", laws: ["Pakistan Penal Code §420", "Land Revenue Act"], docs: ["fir_copy.pdf", "transfer_deed.pdf"] },
];

const Toast = ({ msg }: { msg: string }) => msg ? (
  <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] px-4 py-2 rounded-full text-[12px]" style={{ background: "#1E1E1E", border: "1px solid #C9A84C", color: "#C9A84C" }}>{msg}</div>
) : null;

export const CaseRequests = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [decline, setDecline] = useState<string | null>(null);
  const [removed, setRemoved] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [f, setF] = useState<FilterState>({ cat: "All Categories", date: "Any Date", sec: "All Urgency", q: "" });
  const visible = useMemo(() => matchFilters(requests.filter(r => !removed.includes(r.id)), f, {
    cat: r => r.cat, sec: r => r.urgency === "high" ? "High" : r.urgency === "med" ? "Medium" : "Low",
    text: r => `${r.title} ${r.summary} ${r.city} ${r.id}`,
  }), [f, removed]);
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2000); };
  const accept = (id: string) => { setRemoved(p => [...p, id]); showToast(`Accepted ${id}`); };
  const declineConfirm = () => { if (decline) { setRemoved(p => [...p, decline]); showToast(`Declined ${decline}`); setDecline(null); } };

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
                    <span>{r.id} · {r.time}</span>
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
                  <div><div className="text-[10.5px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold mb-1.5">Laws Retrieved</div><div className="flex flex-wrap gap-2">{r.laws.map(l => <span key={l} className="lp-cat-pill" style={{ height: 28, padding: "0 12px", fontSize: 10 }}>{l}</span>)}</div></div>
                  <div><div className="text-[10.5px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold mb-1.5">Uploaded Documents</div><div className="flex flex-wrap gap-2">{r.docs.map(d => <span key={d} className="inline-flex items-center gap-2 text-[11.5px] text-[#C9A84C] px-3 py-1.5 rounded-lg" style={{ border: "1px solid rgba(201,168,76,.4)" }}><FileText size={12} /> {d}</span>)}</div></div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 mt-4 max-w-[300px]">
                <button className="lp-act-accept" style={{ height: 38 }} onClick={() => accept(r.id)}><Check size={14} className="mr-1.5" />Accept</button>
                <button className="lp-act-decline" style={{ height: 38 }} onClick={() => setDecline(r.id)}>Decline</button>
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
              <button className="lp-btn lp-btn-red" onClick={declineConfirm}>Submit Decline</button>
            </div>
          </div>
        </div>
      )}
      <Toast msg={toast} />
    </div>
  );
};

const activeData = [
  { id: "HD 2401", title: "Wrongful termination", client: "Hassan Ali", cat: "Labor", status: "progress", deadline: "5d" },
  { id: "HD 2402", title: "Domestic violence protection", client: "Anonymous", cat: "Domestic Violence", status: "await", deadline: "2d" },
  { id: "HD 2403", title: "Tenancy eviction notice", client: "Saima Bibi", cat: "Property Fraud", status: "progress", deadline: "8d" },
  { id: "HD 2404", title: "Police misconduct complaint", client: "Faisal Khan", cat: "Police Misconduct", status: "pending", deadline: "12d" },
  { id: "HD 2405", title: "NADRA CNIC blocked", client: "Bilal Ahmed", cat: "NADRA Issues", status: "await", deadline: "6d" },
  { id: "HD 2406", title: "Workplace harassment", client: "Anonymous", cat: "Harassment", status: "progress", deadline: "4d" },
];

export const ActiveCases = () => {
  const [detail, setDetail] = useState<typeof activeData[number] | null>(null);
  const [f, setF] = useState<FilterState>({ cat: "All Categories", date: "Any Date", sec: "All Status", q: "" });
  const visible = useMemo(() => matchFilters(activeData, f, {
    cat: r => r.cat, sec: r => r.status === "progress" ? "In Progress" : r.status === "await" ? "Awaiting" : "Pending",
    text: r => `${r.title} ${r.client} ${r.id}`,
  }), [f]);
  if (detail) return <CaseDetail c={detail} back={() => setDetail(null)} />;
  return (
    <div className="lp-fade space-y-4">
      <div><span className="text-[11px] px-3 py-1 rounded-full font-bold tracking-wider align-middle" style={{ border: "1px solid #C9A84C", color: "#C9A84C" }}>{visible.length} ACTIVE</span></div>
      <CasesFilters second={{ label: "Status", options: STATUSES }} onFilter={setF} />
      <div className="lp-case-card p-0 overflow-hidden">
        <div className="overflow-x-auto lp-gold-scroll" style={{ maxHeight: 480, overflowY: "auto" }}>
          <table className="w-full text-[12.5px]" style={{ borderCollapse: "separate", borderSpacing: 0, minWidth: 820 }}>
            <thead className="sticky top-0 z-10" style={{ background: "#141414" }}>
              <tr className="text-[10px] uppercase tracking-[.14em] text-[#888] font-semibold">
                {["Case ID", "Title", "Client", "Category", "Status", "Deadline", "Action"].map(h => (
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
                    <td className="px-3 py-3 font-mono text-[12px] text-[#C9A84C] tracking-wide whitespace-nowrap">{c.id}</td>
                    <td className="px-3 py-3 text-white">{c.title}</td>
                    <td className="px-3 py-3 text-[#C9C4B0] whitespace-nowrap">{c.client}</td>
                    <td className="px-3 py-3 text-[#C9C4B0] whitespace-nowrap">{c.cat}</td>
                    <td className="px-2 py-3"><span className={`lp-stat-pill lp-stat-eq ${c.status === "progress" ? "lp-stat-progress" : c.status === "await" ? "lp-stat-await" : "lp-stat-pending"}`}>{c.status === "progress" ? "In Progress" : c.status === "await" ? "Awaiting" : "Pending"}</span></td>
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
    </div>
  );
};

const CaseDetail = ({ c, back }: { c: any; back: () => void }) => {
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
          <select className="lp-input" style={{ width: 220, height: 36 }}><option>In Progress</option><option>Awaiting Client Response</option><option>Awaiting Court Date</option><option>Resolved</option><option>Closed</option></select>
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
        <div className="flex flex-wrap gap-2.5 pt-2">
          <button className="lp-act-btn">Request Document</button>
          <button className="lp-act-btn">Message Client</button>
          <button className="lp-act-btn">Upload Document</button>
          <button className="lp-act-btn lp-act-btn-red" onClick={() => setCloseOpen(true)}>Close Case</button>
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
  { id: "HD 2299", title: "Unpaid wages recovery", cat: "Labor", date: "12 Mar 2026", res: "Settled", rating: 5 },
  { id: "HD 2287", title: "Domestic protection order", cat: "Domestic Violence", date: "02 Mar 2026", res: "Court Order", rating: 5 },
  { id: "HD 2271", title: "Consumer refund dispute", cat: "Consumer Rights", date: "24 Feb 2026", res: "Settled", rating: 4 },
  { id: "HD 2256", title: "NADRA appeal", cat: "NADRA Issues", date: "11 Feb 2026", res: "Resolved", rating: 5 },
  { id: "HD 2240", title: "Tenancy eviction defense", cat: "Property Fraud", date: "30 Jan 2026", res: "Court Order", rating: 4 },
  { id: "HD 2218", title: "Workplace harassment", cat: "Harassment", date: "18 Jan 2026", res: "Settled", rating: 5 },
];

export const CompletedCases = () => {
  const [f, setF] = useState<FilterState>({ cat: "All Categories", date: "Any Date", sec: "All Outcomes", q: "" });
  const [pdfState, setPdfState] = useState<{ id: string; phase: "loading" | "done" } | null>(null);
  const visible = useMemo(() => matchFilters(completed, f, {
    cat: r => r.cat, sec: r => r.res, text: r => `${r.title} ${r.id} ${r.cat}`,
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
          <table className="w-full text-[12.5px]" style={{ borderCollapse: "separate", borderSpacing: 0, minWidth: 860 }}>
            <thead className="sticky top-0 z-10" style={{ background: "#141414" }}>
              <tr className="text-[10px] uppercase tracking-[.14em] text-[#888] font-semibold">
                {["Case ID", "Title", "Category", "Resolved", "Outcome", "Rating", "Export"].map(h => (
                  <th key={h} className={`px-3 py-3 text-left ${h === "Export" ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
              <tr><td colSpan={7}><div className="h-px" style={{ background: "rgba(201,168,76,.2)" }} /></td></tr>
            </thead>
            <tbody>
              {visible.map(c => (
                <tr key={c.id} className="lp-row-hover" style={{ borderTop: "1px solid rgba(201,168,76,.08)" }}>
                  <td className="px-3 py-3 font-mono text-[12px] text-[#C9A84C] tracking-wide whitespace-nowrap">{c.id}</td>
                  <td className="px-3 py-3 text-white">{c.title}</td>
                  <td className="px-3 py-3 text-[#C9C4B0] whitespace-nowrap">{c.cat}</td>
                  <td className="px-3 py-3 text-[#C9C4B0] whitespace-nowrap">{c.date}</td>
                  <td className="px-2 py-3"><span className="lp-stat-pill lp-stat-eq lp-stat-resolved">{c.res}</span></td>
                  <td className="px-2 py-3"><div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className={i < c.rating ? "lp-star filled" : "lp-star"} fill={i < c.rating ? "currentColor" : "none"} />)}</div></td>
                  <td className="px-3 py-3 text-right"><button onClick={() => downloadPdf(c.id)} className="lp-btn-view"><Download size={11} className="mr-1" /> PDF</button></td>
                </tr>
              ))}
              {visible.length === 0 && <tr><td colSpan={7} className="px-5 py-8 text-center text-[#888] text-[13px]">No matching cases.</td></tr>}
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
