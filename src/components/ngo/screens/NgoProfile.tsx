import { useState } from "react";
import { Star, Upload, Check, X, FileCheck, AlertCircle, Eye } from "lucide-react";

const tabs = ["Profile", "Verification Documents", "Focus Areas", "Reputation"] as const;
type Tab = typeof tabs[number];

export const NgoProfile = () => {
  const [tab, setTab] = useState<Tab>("Profile");
  return (
    <div className="lp-fade space-y-5">
      <h2 className="lp-display text-[28px] font-bold text-white">NGO Profile & Verification</h2>
      <div className="flex flex-wrap gap-2 border-b border-[rgba(201,168,76,.2)] pb-1">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className="lp-btn lp-btn-gold lp-tab" style={tab === t ? { background: "rgba(201,168,76,.18)", boxShadow: "0 0 18px rgba(201,168,76,.5)" } : {}}>{t}</button>
        ))}
      </div>
      {tab === "Profile" && <ProfileTab />}
      {tab === "Verification Documents" && <DocsTab />}
      {tab === "Focus Areas" && <AreasTab />}
      {tab === "Reputation" && <ReputationTab />}
    </div>
  );
};

const ProfileTab = () => {
  const [preview, setPreview] = useState(false);
  return (
    <div className="lp-card p-6 lp-fade">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Logo LEFT */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-44 h-44 rounded-full grid place-items-center text-[#0A0A0A] text-5xl font-bold transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(180deg,#F0D77D,#C9A84C)", boxShadow: "0 0 36px rgba(201,168,76,.55), 0 12px 30px -8px rgba(0,0,0,.6)", fontFamily: "'Cormorant Garamond', serif" }}>AF</div>
          <button className="lp-btn lp-btn-gold">Upload Logo</button>
          <button onClick={() => setPreview(true)} className="lp-btn lp-btn-gold"><Eye size={12} /> Public Preview</button>
        </div>
        {/* Form RIGHT */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[["Organization Name", "Aurat Foundation"], ["Registration Number", "NGO-LHR-7821"], ["Founded Year", "1986"], ["Headquarters City", "Lahore, Punjab"], ["Office Hours", "Mon–Fri 9:00–17:00"], ["Contact Phone", "042-35870834"], ["Contact Email", "info@af.org.pk"], ["Website URL", "https://af.org.pk"]].map(([l, v]) => (
              <div key={l}>
                <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mb-1.5">{l}</div>
                <input className="lp-input lp-field-zoom" defaultValue={v} />
              </div>
            ))}
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mb-1.5">Mission Statement</div>
            <textarea className="lp-textarea lp-field-zoom" maxLength={500} defaultValue="To advance women's rights in Pakistan through legal aid, advocacy, and community education." />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mb-1.5">Services Offered</div>
            <textarea className="lp-textarea lp-field-zoom" defaultValue="Free legal aid, shelter referrals, counseling, advocacy training." />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mb-1.5">Eligibility / Who We Help</div>
            <textarea className="lp-textarea lp-field-zoom" defaultValue="Women, children, and marginalized communities across Pakistan." />
          </div>
          <button className="lp-btn lp-btn-gold-solid">Save Profile</button>
        </div>
      </div>
      {preview && (
        <div className="lp-modal-overlay" onClick={() => setPreview(false)}>
          <div className="lp-modal max-w-[520px]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3"><h3 className="lp-display text-[22px] text-white font-bold">Public Profile Preview</h3><button onClick={() => setPreview(false)}><X size={18} className="text-[#888]" /></button></div>
            <div className="text-center py-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#C9A84C] grid place-items-center text-[#0A0A0A] text-2xl font-bold mb-3">AF</div>
              <div className="text-white text-[18px] font-semibold">Aurat Foundation</div>
              <div className="text-[12px] text-[#888]">Lahore, Punjab • Founded 1986</div>
              <p className="text-[12.5px] text-[#E8E0D0] mt-3">Free legal aid, shelter referrals, counseling, and advocacy for women across Pakistan.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DocsTab = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const docs = [
    { name: "Registration Certificate", file: "ngo_registration.pdf", date: "12 Jan 2026", status: "verified" },
    { name: "Tax Exemption Certificate", file: "tax_exempt.pdf", date: "12 Jan 2026", status: "pending" },
    { name: "Additional Supporting Doc", file: "annual_report.pdf", date: "20 Mar 2026", status: "rejected", reason: "Document is blurry. Please re-upload a clear scan." },
  ];
  return (
    <div className="lp-card p-6 space-y-4 lp-fade">
      <div className="rounded-xl px-4 py-3 text-[12.5px]" style={{ background: "rgba(212,160,23,.1)", border: "1px solid rgba(212,160,23,.4)", color: "#E5BB3F" }}>Pending Admin Review</div>
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
        <div className="text-[13px] text-white">Click to upload a new document</div>
        <div className="text-[11px] text-[#888] mt-1">PDF or image, max 5MB</div>
      </button>
      {showUpload && (
        <div className="lp-modal-overlay" onClick={() => setShowUpload(false)}>
          <div className="lp-modal max-w-[480px]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="lp-display text-[22px] text-white font-bold">Upload Document</h3><button onClick={() => setShowUpload(false)}><X size={18} className="text-[#888]" /></button></div>
            {phase === "idle" && (
              <div className="space-y-3">
                <div className="text-[12px] text-[#888]">Select document type</div>
                {["Registration Certificate", "Tax Exemption Certificate", "Additional Supporting Document"].map(t => (
                  <button key={t} onClick={() => setPhase("loading")} className="w-full text-left px-4 py-3 rounded-xl text-[13px] text-white hover:bg-[rgba(201,168,76,.08)] transition-colors" style={{ border: "1px solid #222" }}>{t}</button>
                ))}
              </div>
            )}
            {phase === "loading" && (
              <div className="text-center py-8">
                <div className="text-[#C9A84C] text-[13px] mb-3">Loading...</div>
                <div className="h-1.5 rounded-full bg-[#222] overflow-hidden"><div style={{ width: "60%", height: "100%", background: "linear-gradient(90deg, #C9A84C, #f3d98a)", animation: "lp-shimmer-line 1.4s linear forwards", boxShadow: "0 0 14px #C9A84C" }} /></div>
                <button onClick={() => setPhase("done")} className="lp-btn lp-btn-gold mt-5">Simulate complete</button>
              </div>
            )}
            {phase === "done" && (
              <div className="text-center py-6">
                <div className="text-[#C9A84C] text-[14px] font-semibold mb-2">Upload Complete</div>
                <div className="text-[12px] text-[#888]">Document uploaded and sent for verification.</div>
                <button onClick={() => setShowUpload(false)} className="lp-btn lp-btn-gold-solid mt-5">Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AreasTab = () => {
  const cats = ["Labor Dispute", "Property Fraud", "Domestic Violence", "Police Misconduct", "NADRA Issues", "Consumer Rights", "Harassment"];
  const [sel, setSel] = useState<string[]>(["Domestic Violence", "Harassment", "Labor Dispute"]);
  const [primary, setPrimary] = useState("Domestic Violence");
  return (
    <div className="lp-card p-6 space-y-4 lp-fade">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cats.map(c => {
          const isSel = sel.includes(c); const isPri = primary === c;
          return (
            <div key={c} className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-[rgba(201,168,76,.06)]" style={{ border: "1px solid " + (isSel ? "rgba(201,168,76,.5)" : "#222") }}>
              <button onClick={() => setSel(isSel ? sel.filter(x => x !== c) : [...sel, c])} className="flex items-center gap-3 flex-1">
                <span className={`lp-check ${isSel ? "checked" : ""}`}>{isSel && <Check size={13} className="text-[#0A0A0A]" />}</span>
                <span className="text-[13px] text-white">{c}</span>
              </button>
              <button onClick={() => setPrimary(c)} disabled={!isSel} className={`lp-btn ${isPri ? "lp-btn-gold-solid" : "lp-btn-gold"} lp-btn-sm`} style={{ opacity: isSel ? 1 : .35 }}>{isPri ? "Primary" : "Set Primary"}</button>
            </div>
          );
        })}
      </div>
      <button className="lp-btn lp-btn-gold-solid">Save Focus Areas</button>
    </div>
  );
};

const ReputationTab = () => {
  const reviews = [
    { name: "Citizen A.", rating: 5, text: "Aurat Foundation team gave my mother safe shelter and legal help." },
    { name: "Citizen B.", rating: 5, text: "Compassionate, professional and quick to respond." },
    { name: "Citizen C.", rating: 4, text: "Helpful overall, communication could be faster." },
    { name: "Citizen D.", rating: 1, text: "Did not respond for two weeks.", bad: true },
  ];
  return (
    <div className="lp-card p-6 lp-card-hover lp-fade">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-[.12em] text-[#888]">Overall Rating</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} className="lp-star filled" fill="currentColor" />)}</div>
            <span className="lp-display text-[28px] font-bold text-[#C9A84C]">4.7</span>
            <span className="text-[12px] text-[#888]">94 reviews • 312 citizens helped</span>
          </div>
        </div>
        <button className="lp-btn lp-btn-gold">View All</button>
      </div>
      <div className="space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: r.bad ? "rgba(192,57,43,.06)" : "#0F0F0F", border: `1px solid ${r.bad ? "rgba(192,57,43,.3)" : "rgba(201,168,76,.15)"}` }}>
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