import { useState } from "react";
import { Star, Upload, Check, X, FileCheck, AlertCircle } from "lucide-react";
import { AvailabilityCockpit } from "../AvailabilityCockpit";

const tabs = ["Profile", "Availability", "Specialization", "Certifications", "Reputation"] as const;
type Tab = typeof tabs[number];

export const Settings = () => {
  const [tab, setTab] = useState<Tab>("Profile");
  return (
    <div className="lp-fade space-y-5">
      <div>
        <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">Settings</div>
        <h2 className="lp-display text-[40px] font-bold text-white leading-tight mt-1">Lawyer Profile</h2>
      </div>
      <div className="flex flex-wrap gap-6 border-b border-[rgba(201,168,76,.2)]">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`lp-utab ${tab === t ? "active" : ""}`}>{t}</button>
        ))}
      </div>
      {tab === "Profile" && <Profile />}
      {tab === "Availability" && <Availability />}
      {tab === "Specialization" && <Specialization />}
      {tab === "Certifications" && <Certifications />}
      {tab === "Reputation" && <Reputation />}
    </div>
  );
};

const Profile = () => (
  <ProfileInner />
);

const ProfileInner = () => {
  const [lang, setLang] = useState("Both");
  const fields: [string, string][] = [
    ["Full Name", "Irtiza Rayan"],
    ["City", "Lahore"],
    ["District", "Lahore"],
    ["Bar Council Number", "PK 2024 8821"],
  ];
  return (
    <div className="lp-card p-6 lp-fade">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Avatar LEFT */}
        <div className="flex flex-col items-center gap-4 order-1">
          <div className="w-44 h-44 rounded-full grid place-items-center text-[#0A0A0A] text-5xl font-bold transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(180deg,#F0D77D,#C9A84C)", boxShadow: "0 0 36px rgba(201,168,76,.55), 0 12px 30px -8px rgba(0,0,0,.6)", fontFamily: "'Cormorant Garamond', serif" }}>IR</div>
          <button className="lp-btn lp-btn-gold">Change Photo</button>
        </div>
        {/* Forms RIGHT */}
        <div className="space-y-4 order-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(([l, v]) => (
              <div key={l}>
                <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mb-1.5">{l}</div>
                <input className="lp-input lp-field-zoom" defaultValue={v} />
              </div>
            ))}
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mb-1.5">Biography</div>
            <textarea className="lp-textarea lp-field-zoom" maxLength={500} defaultValue="Civil and labor law advocate with 8+ years working pro bono with marginalized communities across Punjab." />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mb-2">Languages</div>
            <div className="flex flex-wrap gap-3">
              {["Urdu", "English", "Both"].map(l => (
                <button key={l} onClick={() => setLang(l)} className={`lp-lang ${lang === l ? "selected" : ""}`}>{l}</button>
              ))}
            </div>
          </div>
          <button className="lp-btn lp-btn-gold-solid">Save Profile</button>
        </div>
      </div>
    </div>
  );
};

const Availability = () => (
  <div className="space-y-5 lp-fade">
    <AvailabilityCockpit initialMax={5} active={3} />
    <div className="lp-card p-6">
      <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mb-1.5">Typical Response Time</div>
      <select className="lp-input"><option>Within 24 hours</option><option>Within 48 hours</option><option>Within a week</option></select>
    </div>
  </div>
);

const Specialization = () => {
  const cats = ["Labor Dispute", "Property Fraud", "Domestic Violence", "Police Misconduct", "NADRA Issues", "Consumer Rights", "Harassment"];
  const [sel, setSel] = useState<string[]>(["Labor Dispute", "Police Misconduct", "Harassment"]);
  const [primary, setPrimary] = useState("Labor Dispute");
  return (
    <div className="lp-card p-6 space-y-4 lp-fade">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cats.map(c => {
          const isSel = sel.includes(c); const isPri = primary === c;
          return (
            <div key={c} className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-[rgba(201,168,76,.06)]" style={{ border: "1px solid " + (isSel ? "rgba(201,168,76,.5)" : "#222") }}>
              <button onClick={() => setSel(isSel ? sel.filter(x => x !== c) : [...sel, c])} className="flex items-center gap-3 flex-1">
                <span className={`lp-check-circle ${isSel ? "checked" : ""}`}>{isSel && <Check size={12} className="text-[#0A0A0A]" />}</span>
                <span className="text-[13px] text-white">{c}</span>
              </button>
              <button onClick={() => setPrimary(c)} disabled={!isSel} className={`lp-btn ${isPri ? "lp-btn-gold-solid" : "lp-btn-gold"} lp-btn-sm`} style={{ opacity: isSel ? 1 : .35 }}>{isPri ? "Primary" : "Set Primary"}</button>
            </div>
          );
        })}
      </div>
      <button className="lp-btn lp-btn-gold-solid">Save Specializations</button>
    </div>
  );
};

const Certifications = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const docs = [
    { name: "Bar Council ID", file: "barcouncil_id.pdf", date: "12 Jan 2026", status: "verified" },
    { name: "Law Degree", file: "llb_degree.pdf", date: "12 Jan 2026", status: "pending" },
    { name: "Practice License", file: "practice_2026.pdf", date: "20 Mar 2026", status: "rejected", reason: "Document blurry. Please re-upload a clear scan." },
    { name: "Additional Cert", file: "mediation.pdf", date: "01 Apr 2026", status: "verified" },
  ];
  return (
    <div className="lp-card p-6 space-y-4 lp-fade">
      <div className="space-y-3">
        {docs.map(d => (
          <div key={d.name} className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl" style={{ border: "1px solid #222" }}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <FileCheck size={18} className="text-[#C9A84C] shrink-0" />
              <div className="min-w-0">
                <div className="text-[13px] text-white">{d.name}</div>
                <div className="text-[11px] text-[#888] truncate">{d.file} • {d.date}</div>
                {d.status === "rejected" && <div className="text-[11px] text-[#E57367] mt-0.5 flex items-center gap-1"><AlertCircle size={11} /> {d.reason}</div>}
              </div>
            </div>
            <span className={`lp-doc-badge ${d.status === "verified" ? "lp-doc-verified" : d.status === "pending" ? "lp-doc-pending" : "lp-doc-rejected"}`} style={{ width: 90, justifyContent: "center" }}>{d.status}</span>
            {d.status === "rejected" ? <button className="lp-btn lp-btn-gold lp-btn-sm" style={{ width: 100 }}>Re upload</button> : <span style={{ width: 100 }} />}
            <button className="text-[11px] text-[#E57367] hover:text-[#F08A7E] transition-colors uppercase tracking-[.1em]">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={() => { setShowUpload(true); setPhase("idle"); }} className="lp-upload w-full">
        <Upload size={20} className="text-[#C9A84C] mx-auto mb-2" />
        <div className="text-[13px] text-white">Click to upload a new certification</div>
        <div className="text-[11px] text-[#888] mt-1">PDF or image, max 5MB</div>
      </button>
      {showUpload && (
        <div className="lp-modal-overlay" onClick={() => setShowUpload(false)}>
          <div className="lp-modal m-auto max-w-[480px]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="lp-display text-[22px] text-white font-bold">Upload Certification</h3>
              <button onClick={() => setShowUpload(false)}><X size={18} className="text-[#888]" /></button>
            </div>
            {phase === "idle" && (
              <div className="space-y-3">
                <div className="text-[12px] text-[#888]">Select document type</div>
                {["Bar Council ID", "Law Degree", "Additional Certification"].map(t => (
                  <button key={t} onClick={() => setPhase("loading")} className="w-full text-left px-4 py-3 rounded-xl text-[13px] text-white hover:bg-[rgba(201,168,76,.08)] transition-colors" style={{ border: "1px solid #222" }}>{t}</button>
                ))}
              </div>
            )}
            {phase === "loading" && (
              <div className="text-center py-8">
                <div className="text-[#C9A84C] text-[13px] mb-3">Uploading…</div>
                <div className="h-1.5 rounded-full bg-[#222] overflow-hidden">
                  <div style={{ width: "60%", height: "100%", background: "linear-gradient(90deg, #C9A84C, #f3d98a)", animation: "lp-shimmer-line 1.4s linear forwards", boxShadow: "0 0 14px #C9A84C" }} />
                </div>
                <button onClick={() => setPhase("done")} className="lp-btn lp-btn-gold mt-5">Simulate complete</button>
              </div>
            )}
            {phase === "done" && (
              <div className="text-center py-6">
                <div className="text-[#C9A84C] text-[14px] font-semibold mb-2" style={{ textShadow: "0 0 14px rgba(201,168,76,.6)" }}>Document uploaded</div>
                <div className="text-[12px] text-[#888]">Sent for verification.</div>
                <button onClick={() => setShowUpload(false)} className="lp-btn lp-btn-gold-solid mt-5">Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Reputation = () => {
  const reviews = [
    { name: "Ali R.", rating: 5, text: "Took my labor case at no cost and recovered 3 months wages. Truly grateful." },
    { name: "Sara K.", rating: 5, text: "Compassionate and professional. Walked me through every step." },
    { name: "Bilal H.", rating: 4, text: "Good communication. Case took longer than expected but resolved well." },
    { name: "Farah J.", rating: 1, text: "Did not respond to messages for two weeks. Disappointed.", bad: true },
    { name: "Omar T.", rating: 2, text: "Felt rushed during consultations.", bad: true },
  ];
  return (
    <div className="lp-card p-6 lp-card-hover lp-fade">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-[.12em] text-[#888]">Overall Rating</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} className="lp-star filled" fill="currentColor" />)}</div>
            <span className="lp-display text-[28px] font-bold text-[#C9A84C]">4.8</span>
            <span className="text-[12px] text-[#888]">38 reviews</span>
          </div>
        </div>
        <button className="lp-btn lp-btn-gold">View All</button>
      </div>
      <div className="space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-xl p-4 transition-all duration-300" style={{ background: r.bad ? "rgba(192,57,43,.06)" : "#0F0F0F", border: `1px solid ${r.bad ? "rgba(192,57,43,.3)" : "rgba(201,168,76,.15)"}` }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[13px] text-white font-semibold">{r.name}</div>
              <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={13} className={j < r.rating ? (r.rating <= 2 ? "lp-star low" : "lp-star filled") : "lp-star"} fill={j < r.rating ? "currentColor" : "none"} />)}</div>
            </div>
            <p className={`text-[12px] ${r.bad ? "text-[#E57367]" : "text-[#aaa]"}`}>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
