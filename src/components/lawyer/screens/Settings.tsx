import { useState } from "react";
import { Star, Upload, Check, X, FileCheck, AlertCircle, MessageCircle, Phone, Video, Calendar, Clock, Edit3, Plus, Folder, User, CheckCircle2, Shield, ChevronDown } from "lucide-react";
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

const Availability = () => {
  const [mode, setMode] = useState("In-App Chat");
  const [emergency, setEmergency] = useState(true);
  const days = [
    { d: "Monday", on: true, from: "09:00 AM", to: "06:00 PM", meeting: { title: "Client Consultation", time: "10:30 AM – 11:30 AM" } },
    { d: "Tuesday", on: false, from: "--:-- --", to: "--:-- --" },
    { d: "Wednesday", on: false, from: "--:-- --", to: "--:-- --" },
    { d: "Thursday", on: false, from: "--:-- --", to: "--:-- --" },
    { d: "Friday", on: true, from: "09:30 AM", to: "05:30 PM" },
    { d: "Saturday", on: true, from: "10:00 AM", to: "02:00 PM" },
    { d: "Sunday", on: false, from: "--:-- --", to: "--:-- --" },
  ];
  const modes = [
    { k: "In-App Chat", icon: MessageCircle },
    { k: "Voice Call", icon: Phone },
    { k: "Video Consultation", icon: Video },
    { k: "WhatsApp", icon: MessageCircle },
  ];

  return (
    <div className="lp-fade relative">
      <div className="lp-av-glow" />
      <div className="lp-av-grain" />
      <div className="lp-av-enter grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-5 relative">
        {/* LEFT COLUMN === Cockpit */}
        <div className="from-left aspect-square max-w-[560px]">
          <AvailabilityCockpit initialMax={5} active={3} />
        </div>

        {/* RIGHT === Response */}
        <div className="from-right lp-card lp-av-card p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Response</div>
            <Clock size={14} className="text-[#C9A84C]" />
          </div>
          <div className="lp-display text-[20px] font-bold text-white leading-tight mb-3">Typical Response Time</div>
          <div className="relative">
            <select className="lp-input appearance-none pr-10 cursor-none">
              <option>Within 24 hours</option><option>Within 48 hours</option><option>Within a week</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A84C] pointer-events-none" />
          </div>
          <div className="text-[11px] text-[#888] mt-3 leading-relaxed">Citizens see your usual response window before sending a request. Faster response improves matching priority.</div>
        </div>

        {/* LEFT === Working Hours (full width left column row 2) */}
        <div className="from-left lp-card lp-av-card p-5 lg:row-start-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#C9A84C]" />
              <div>
                <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Working Hours</div>
                <div className="lp-display text-[18px] font-bold text-white leading-tight">Availability Schedule</div>
              </div>
            </div>
            <button className="lp-btn lp-btn-gold lp-btn-sm">Set Unavailable Dates</button>
          </div>
          <div className="space-y-2">
            {days.map((day, i) => (
              <div key={day.d}>
                <div className="grid grid-cols-[24px_110px_90px_1fr_1fr_36px] items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-[rgba(201,168,76,.04)]" style={{ border: "1px solid #1f1f1f" }}>
                  <span className={`lp-check-circle ${day.on ? "checked" : ""}`}>{day.on && <Check size={11} className="text-[#0A0A0A]" />}</span>
                  <span className="text-[12.5px] text-white">{day.d}</span>
                  <span className={`text-[10.5px] flex items-center gap-1.5 ${day.on ? "text-[#5BC68C]" : "text-[#888]"}`}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: day.on ? "#5BC68C" : "#666" }} />
                    {day.on ? "Available" : "Unavailable"}
                  </span>
                  <div className="relative">
                    <select className="lp-input cursor-none" style={{ height: 30, fontSize: 11 }} defaultValue={day.from}><option>{day.from}</option></select>
                  </div>
                  <div className="relative">
                    <select className="lp-input cursor-none" style={{ height: 30, fontSize: 11 }} defaultValue={day.to}><option>{day.to}</option></select>
                  </div>
                  <button className="grid place-items-center w-8 h-8 rounded-md text-[#C9A84C] transition-all hover:bg-[rgba(201,168,76,.1)] hover:shadow-[0_0_12px_rgba(201,168,76,.4)]">
                    {day.on ? <Edit3 size={13} /> : <Plus size={13} />}
                  </button>
                </div>
                {day.meeting && (
                  <div className="ml-9 mt-2 mb-1 rounded-xl p-3 relative overflow-hidden" style={{ background: "rgba(201,168,76,.05)", border: "1px solid rgba(201,168,76,.25)" }}>
                    <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r" style={{ background: "linear-gradient(180deg,#F0D77D,#C9A84C)", boxShadow: "0 0 10px rgba(201,168,76,.6)" }} />
                    <div className="flex items-center justify-between pl-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-[.18em] text-[#C9A84C] font-bold">Meeting Scheduled</div>
                        <div className="text-[12px] text-white mt-0.5">{day.meeting.title}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11.5px] text-[#C9A84C] flex items-center gap-1.5"><Clock size={11} /> {day.meeting.time}</div>
                        <div className="text-[9.5px] text-[#888] mt-0.5">This time slot is not available for new bookings.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl p-3 flex items-center justify-between" style={{ background: "#0F0F0F", border: "1px solid rgba(201,168,76,.15)" }}>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#C9A84C]" />
              <div>
                <div className="text-[10px] uppercase tracking-[.18em] text-[#C9A84C] font-bold">Schedule Summary</div>
                <div className="text-[11px] text-[#aaa]">You are available <span className="text-[#5BC68C] font-semibold">4 days</span> this week</div>
              </div>
            </div>
            <div className="text-right text-[10.5px]">
              <div className="text-[#5BC68C] flex items-center gap-1.5 justify-end"><span className="w-1.5 h-1.5 rounded-full bg-[#5BC68C]" /> Next Available: Tomorrow, 09:30 AM</div>
              <div className="text-[#888] mt-0.5">Time Zone: (PKT) Pakistan Standard Time</div>
            </div>
          </div>
        </div>

        {/* RIGHT === Consultation Modes */}
        <div className="from-right lp-card lp-av-card p-5">
          <div className="flex items-center gap-2 mb-3"><MessageCircle size={14} className="text-[#C9A84C]" />
            <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Consultation Modes</div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {modes.map(({ k, icon: Icon }) => (
              <button key={k} onClick={() => setMode(k)} className={`lp-av-tile ${mode === k ? "selected" : ""}`}>
                <div className="flex items-center gap-2">
                  <Icon size={15} className="tile-icon" />
                  <span className="text-[11.5px] text-white">{k}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT === AI Match Priority */}
        <div className="from-right lp-card lp-av-card p-5">
          <div className="flex items-center gap-2 mb-4"><Star size={14} className="text-[#C9A84C]" fill="currentColor" />
            <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">AI Match Priority</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-[88px] h-[88px] shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#222" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#gold)" strokeWidth="6" strokeLinecap="round" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * (1 - 0.85)} style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)", filter: "drop-shadow(0 0 6px rgba(201,168,76,.6))" }} />
                <defs><linearGradient id="gold" x1="0" x2="1"><stop offset="0%" stopColor="#F0D77D" /><stop offset="100%" stopColor="#C9A84C" /></linearGradient></defs>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="lp-display text-[22px] font-bold text-[#C9A84C] leading-none">85</div>
                  <div className="text-[8px] text-[#888] tracking-[.2em]">/100</div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {[["Match Score", 85, "85/100"], ["Visibility Increase", 34, "+34%"], ["Trust Rating", 92, "4.6/5"]].map(([l, v, r]) => (
                <div key={l as string}>
                  <div className="flex justify-between text-[10.5px] mb-1"><span className="text-[#aaa]">{l}</span><span className="text-[#C9A84C]">{r}</span></div>
                  <div className="h-1 rounded-full bg-[#222] overflow-hidden">
                    <div style={{ width: `${v}%`, height: "100%", background: "linear-gradient(90deg,#C9A84C,#F0D77D)", boxShadow: "0 0 8px rgba(201,168,76,.5)", transition: "width 1.4s cubic-bezier(.22,1,.36,1)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10.5px] text-[#888] mt-3">High priority lawyers get more client matches.</div>
        </div>

        {/* RIGHT === Current Queue Status */}
        <div className="from-right lp-card lp-av-card p-5">
          <div className="flex items-center gap-2 mb-3"><User size={14} className="text-[#C9A84C]" />
            <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Current Queue Status</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[[Folder, 3, "Pending Requests"], [User, 2, "Active Consultations"], [CheckCircle2, 11, "Resolved Today"]].map(([Icon, n, l]: any, i) => (
              <div key={i} className="lp-av-tile text-center">
                <Icon size={18} className="tile-icon mx-auto mb-1" />
                <div className="lp-display text-[22px] font-bold text-[#C9A84C] leading-none">{n}</div>
                <div className="text-[9.5px] text-[#888] mt-1 leading-tight">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT === Emergency Availability */}
        <div className="from-right lp-card lp-av-card p-5">
          <div className="flex items-center gap-2 mb-3"><Shield size={14} className="text-[#C9A84C]" />
            <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Emergency Availability</div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[12.5px] text-white font-semibold">Available for urgent legal matters</div>
              <div className="text-[10.5px] text-[#888] mt-1 leading-relaxed">You will be shown in priority listing for FIR, Arrest, Domestic Abuse and other urgent cases.</div>
            </div>
            <button onClick={() => setEmergency(e => !e)} className={`lp-av-toggle ${emergency ? "on" : ""}`}><span className="knob" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
