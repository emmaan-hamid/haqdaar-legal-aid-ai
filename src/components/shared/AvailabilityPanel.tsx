import { useMemo, useState } from "react";
import { Star, Check, X, MessageCircle, Phone, Calendar, Clock, Edit3, Plus, Trash2, Folder, User, CheckCircle2, Shield, ChevronDown, Users } from "lucide-react";
import { AvailabilityCockpit } from "@/components/lawyer/AvailabilityCockpit";

type Mode = "In-App Chat" | "Voice Call" | "Meeting Consultation" | "WhatsApp";
type Slot = { id: string; from: string; to: string };
type DayKey = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
type Day = { key: DayKey; label: string; on: boolean; slots: Slot[]; meetings?: { title: string; from: string; to: string }[] };

const TIME_OPTIONS = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "08:00 PM",
];

const RESPONSE_OPTIONS = ["Within 1 hour", "Within 4 hours", "Within 24 hours", "Within 48 hours", "Within a week"];

const newId = () => Math.random().toString(36).slice(2, 9);

const lawyerDefaults: Day[] = [
  { key: "Mon", label: "Monday", on: true, slots: [{ id: newId(), from: "09:00 AM", to: "12:00 PM" }, { id: newId(), from: "02:00 PM", to: "06:00 PM" }], meetings: [{ title: "Client Consultation", from: "10:30 AM", to: "11:30 AM" }] },
  { key: "Tue", label: "Tuesday", on: false, slots: [] },
  { key: "Wed", label: "Wednesday", on: true, slots: [{ id: newId(), from: "10:00 AM", to: "01:00 PM" }] },
  { key: "Thu", label: "Thursday", on: false, slots: [] },
  { key: "Fri", label: "Friday", on: true, slots: [{ id: newId(), from: "09:30 AM", to: "05:30 PM" }] },
  { key: "Sat", label: "Saturday", on: true, slots: [{ id: newId(), from: "10:00 AM", to: "02:00 PM" }] },
  { key: "Sun", label: "Sunday", on: false, slots: [] },
];

const ngoDefaults: Day[] = [
  { key: "Mon", label: "Monday", on: true, slots: [{ id: newId(), from: "09:00 AM", to: "05:00 PM" }], meetings: [{ title: "Volunteer Coordination", from: "11:00 AM", to: "12:00 PM" }] },
  { key: "Tue", label: "Tuesday", on: true, slots: [{ id: newId(), from: "09:00 AM", to: "05:00 PM" }] },
  { key: "Wed", label: "Wednesday", on: true, slots: [{ id: newId(), from: "10:00 AM", to: "04:00 PM" }] },
  { key: "Thu", label: "Thursday", on: true, slots: [{ id: newId(), from: "09:00 AM", to: "05:00 PM" }] },
  { key: "Fri", label: "Friday", on: true, slots: [{ id: newId(), from: "09:00 AM", to: "03:00 PM" }] },
  { key: "Sat", label: "Saturday", on: false, slots: [] },
  { key: "Sun", label: "Sunday", on: false, slots: [] },
];

export type AvailabilityProps = {
  variant: "lawyer" | "ngo";
  queue: { pending: number; active: number; resolved: number };
};

export const AvailabilityPanel = ({ variant, queue }: AvailabilityProps) => {
  const isNgo = variant === "ngo";
  const [days, setDays] = useState<Day[]>(isNgo ? ngoDefaults : lawyerDefaults);
  const [response, setResponse] = useState("Within 24 hours");
  const [responseSaved, setResponseSaved] = useState("Within 24 hours");
  const [modes, setModes] = useState<Mode[]>(["In-App Chat"]);
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [savedNumbers, setSavedNumbers] = useState<{ phone?: string; whatsapp?: string }>({});
  const [emergency, setEmergency] = useState(true);
  const [emergencySaved, setEmergencySaved] = useState(true);
  const [toast, setToast] = useState("");
  const [editing, setEditing] = useState<string | null>(null);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  const toggleMode = (m: Mode) => setModes(p => p.includes(m) ? p.filter(x => x !== m) : [...p, m]);
  const toggleDay = (k: DayKey) => setDays(p => p.map(d => d.key === k ? { ...d, on: !d.on, slots: !d.on && d.slots.length === 0 ? [{ id: newId(), from: "09:00 AM", to: "05:00 PM" }] : d.slots } : d));
  const addSlot = (k: DayKey) => setDays(p => p.map(d => d.key === k ? { ...d, on: true, slots: [...d.slots, { id: newId(), from: "09:00 AM", to: "05:00 PM" }] } : d));
  const updateSlot = (k: DayKey, sid: string, field: "from" | "to", v: string) => setDays(p => p.map(d => d.key === k ? { ...d, slots: d.slots.map(s => s.id === sid ? { ...s, [field]: v } : s) } : d));
  const removeSlot = (k: DayKey, sid: string) => setDays(p => p.map(d => d.key === k ? { ...d, slots: d.slots.filter(s => s.id !== sid) } : d));

  const availableDays = days.filter(d => d.on && d.slots.length > 0).length;
  const nextAvail = useMemo(() => {
    const todayIdx = (new Date().getDay() + 6) % 7;
    for (let i = 1; i <= 7; i++) {
      const d = days[(todayIdx + i) % 7];
      if (d?.on && d.slots.length) return `${i === 1 ? "Tomorrow" : d.label}, ${d.slots[0].from}`;
    }
    return "—";
  }, [days]);

  const savedModesText = modes.length ? modes.join(", ") : "None selected";

  const saveModes = () => {
    if (modes.includes("Voice Call") && !phone.trim()) return showToast("Enter phone number");
    if (modes.includes("WhatsApp") && !whatsapp.trim()) return showToast("Enter WhatsApp number");
    setSavedNumbers({ phone: modes.includes("Voice Call") ? phone : undefined, whatsapp: modes.includes("WhatsApp") ? whatsapp : undefined });
    showToast("Consultation modes saved");
  };

  const saveAllSchedule = () => {
    setEditing(null);
    showToast("Schedule, response time & emergency settings saved");
    setResponseSaved(response);
    setEmergencySaved(emergency);
  };

  return (
    <div className="lp-fade relative">
      <div className="lp-av-glow" />
      <div className="lp-av-grain" />
      <div className="lp-av-enter grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-5 relative">
        {/* LEFT: Cockpit */}
        <div className="from-left aspect-square max-w-[560px]">
          <AvailabilityCockpit
            initialMax={isNgo ? 8 : 5}
            active={queue.active}
            maxLimit={isNgo ? 15 : 10}
            title={isNgo ? "Intake Cockpit" : "Availability Cockpit"}
            capacityLabel={isNgo ? "Case Intake Capacity" : "Case Capacity"}
          />
        </div>

        {/* RIGHT: Response Time */}
        <div className="from-right lp-card lp-av-card p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Response</div>
            <Clock size={14} className="text-[#C9A84C]" />
          </div>
          <div className="lp-display text-[20px] font-bold text-white leading-tight mb-3">Typical Response Time</div>
          <div className="relative">
            <select value={response} onChange={e => setResponse(e.target.value)} className="lp-input appearance-none pr-10 cursor-none">
              {RESPONSE_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A84C] pointer-events-none" />
          </div>
          <div className="text-[11px] text-[#888] mt-2 leading-relaxed">Saved: <span className="text-[#C9A84C]">{responseSaved}</span></div>
          <button onClick={() => { setResponseSaved(response); showToast(`Response time saved: ${response}`); }} className="lp-btn lp-btn-gold-solid mt-3" style={{ height: 32, fontSize: 11 }}>Save Response Time</button>
        </div>

        {/* LEFT: Working Hours (multi-slot) */}
        <div className="from-left lp-card lp-av-card p-5 lg:row-start-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#C9A84C]" />
              <div>
                <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Working Hours</div>
                <div className="lp-display text-[18px] font-bold text-white leading-tight">Availability Schedule</div>
              </div>
            </div>
            <button className="lp-btn lp-btn-gold lp-btn-sm" onClick={() => showToast("Set unavailable dates – coming soon")}>Set Unavailable Dates</button>
          </div>

          <div className="space-y-2">
            {days.map(day => {
              const isEdit = editing === day.key;
              return (
                <div key={day.key} className="rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-[rgba(201,168,76,.04)]" style={{ border: "1px solid #1f1f1f" }}>
                  <div className="grid grid-cols-[24px_110px_100px_1fr_36px] items-center gap-3">
                    <button onClick={() => toggleDay(day.key)} className={`lp-check-circle ${day.on ? "checked" : ""}`}>{day.on && <Check size={11} className="text-[#0A0A0A]" />}</button>
                    <span className="text-[12.5px] text-white">{day.label}</span>
                    <span className={`text-[10.5px] flex items-center gap-1.5 ${day.on ? "text-[#5BC68C]" : "text-[#888]"}`}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: day.on ? "#5BC68C" : "#666" }} />
                      {day.on ? "Available" : "Unavailable"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {day.on && day.slots.length === 0 && <span className="text-[10.5px] text-[#888]">No time slots — click + to add.</span>}
                      {day.on && day.slots.map(s => (
                        <span key={s.id} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10.5px] text-[#E8E0D0]" style={{ background: "rgba(201,168,76,.08)", border: "1px solid rgba(201,168,76,.25)" }}>
                          {isEdit ? (
                            <>
                              <select value={s.from} onChange={e => updateSlot(day.key, s.id, "from", e.target.value)} className="bg-transparent text-[10px] text-white outline-none cursor-none">{TIME_OPTIONS.map(t => <option key={t} className="bg-[#141414]">{t}</option>)}</select>
                              <span className="text-[#888]">–</span>
                              <select value={s.to} onChange={e => updateSlot(day.key, s.id, "to", e.target.value)} className="bg-transparent text-[10px] text-white outline-none cursor-none">{TIME_OPTIONS.map(t => <option key={t} className="bg-[#141414]">{t}</option>)}</select>
                              <button onClick={() => removeSlot(day.key, s.id)} className="ml-1 text-[#E57367] hover:scale-110 transition-transform"><Trash2 size={10} /></button>
                            </>
                          ) : (
                            <><Clock size={10} className="text-[#C9A84C]" /> {s.from} – {s.to}</>
                          )}
                        </span>
                      ))}
                      {!day.on && <span className="text-[10.5px] text-[#666]">Off</span>}
                    </div>
                    <div className="flex items-center justify-end gap-1">
                      {day.on && <button onClick={() => addSlot(day.key)} title="Add time slot" className="grid place-items-center w-7 h-7 rounded-md text-[#C9A84C] transition-all hover:bg-[rgba(201,168,76,.1)] hover:shadow-[0_0_12px_rgba(201,168,76,.4)]"><Plus size={12} /></button>}
                      <button onClick={() => setEditing(isEdit ? null : day.key)} title="Edit" className="grid place-items-center w-7 h-7 rounded-md text-[#C9A84C] transition-all hover:bg-[rgba(201,168,76,.1)] hover:shadow-[0_0_12px_rgba(201,168,76,.4)]">
                        {isEdit ? <Check size={12} /> : <Edit3 size={12} />}
                      </button>
                    </div>
                  </div>
                  {day.meetings?.map((m, i) => (
                    <div key={i} className="ml-9 mt-2 mb-1 rounded-xl p-3 relative overflow-hidden" style={{ background: "rgba(201,168,76,.05)", border: "1px solid rgba(201,168,76,.25)" }}>
                      <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r" style={{ background: "linear-gradient(180deg,#F0D77D,#C9A84C)", boxShadow: "0 0 10px rgba(201,168,76,.6)" }} />
                      <div className="flex items-center justify-between pl-2">
                        <div>
                          <div className="text-[10px] uppercase tracking-[.18em] text-[#C9A84C] font-bold">Meeting Scheduled</div>
                          <div className="text-[12px] text-white mt-0.5">{m.title}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[11.5px] text-[#C9A84C] flex items-center gap-1.5"><Clock size={11} /> {m.from} – {m.to}</div>
                          <div className="text-[9.5px] text-[#888] mt-0.5">Slot reserved — not bookable.</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Schedule Summary + Save All in same row */}
          <div className="mt-4 rounded-xl p-3 flex items-center justify-between gap-4 flex-wrap" style={{ background: "#0F0F0F", border: "1px solid rgba(201,168,76,.15)" }}>
            <div className="flex items-center gap-2 min-w-0">
              <Calendar size={14} className="text-[#C9A84C] shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[.18em] text-[#C9A84C] font-bold">Schedule Summary</div>
                <div className="text-[11px] text-[#aaa]">Available <span className="text-[#5BC68C] font-semibold">{availableDays} days</span> · Next: <span className="text-[#5BC68C]">{nextAvail}</span></div>
              </div>
            </div>
            <button onClick={saveAllSchedule} className="lp-btn lp-btn-gold-solid" style={{ height: 32, padding: "0 18px", fontSize: 11 }}>Save All Changes</button>
          </div>

          {/* Mini timetable */}
          <div className="mt-4 rounded-xl p-3" style={{ background: "#0F0F0F", border: "1px solid rgba(201,168,76,.15)" }}>
            <div className="text-[10px] uppercase tracking-[.18em] text-[#C9A84C] font-bold mb-2">This Week Timetable</div>
            <div className="grid grid-cols-7 gap-1.5">
              {days.map(d => (
                <div key={d.key} className="rounded-md p-2 text-center" style={{ background: d.on ? "rgba(91,198,140,.06)" : "#0A0A0A", border: `1px solid ${d.on ? "rgba(91,198,140,.25)" : "#1a1a1a"}` }}>
                  <div className="text-[9px] uppercase tracking-[.15em] text-[#888] font-semibold">{d.key}</div>
                  {d.on ? (
                    <div className="mt-1 space-y-0.5">
                      {d.slots.map(s => <div key={s.id} className="text-[8.5px] text-[#5BC68C] leading-tight">{s.from}<br />{s.to}</div>)}
                      {d.meetings?.map((m, i) => <div key={i} className="text-[8px] text-[#C9A84C] leading-tight mt-0.5" title={m.title}>● {m.from}</div>)}
                    </div>
                  ) : (
                    <div className="text-[9px] text-[#666] mt-2">Free</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Consultation Modes */}
        <div className="from-right lp-card lp-av-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle size={14} className="text-[#C9A84C]" />
            <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Consultation Modes</div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {([
              { k: "In-App Chat", icon: MessageCircle },
              { k: "Voice Call", icon: Phone },
              { k: "Meeting Consultation", icon: Users },
              { k: "WhatsApp", icon: MessageCircle },
            ] as { k: Mode; icon: any }[]).map(({ k, icon: Icon }) => {
              const sel = modes.includes(k);
              return (
                <button key={k} onClick={() => toggleMode(k)} className={`lp-av-tile ${sel ? "selected" : ""}`}>
                  <div className="flex items-center gap-2">
                    <Icon size={15} className="tile-icon" />
                    <span className="text-[11.5px] text-white">{k}</span>
                    {sel && <Check size={12} className="ml-auto text-[#5BC68C]" />}
                  </div>
                </button>
              );
            })}
          </div>
          {(modes.includes("Voice Call") || modes.includes("WhatsApp")) && (
            <div className="mt-3 space-y-2">
              {modes.includes("Voice Call") && (
                <div>
                  <div className="text-[10px] uppercase tracking-[.15em] text-[#888] mb-1">Phone Number</div>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+92 300 0000000" className="lp-input" style={{ height: 34, fontSize: 12 }} />
                </div>
              )}
              {modes.includes("WhatsApp") && (
                <div>
                  <div className="text-[10px] uppercase tracking-[.15em] text-[#888] mb-1">WhatsApp Number</div>
                  <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+92 300 0000000" className="lp-input" style={{ height: 34, fontSize: 12 }} />
                </div>
              )}
            </div>
          )}
          <div className="mt-3 text-[10.5px] text-[#888]">Saved: <span className="text-[#C9A84C]">{savedModesText}</span></div>
          {(savedNumbers.phone || savedNumbers.whatsapp) && (
            <div className="mt-1 text-[10.5px] text-[#888] space-y-0.5">
              {savedNumbers.phone && <div>📞 {savedNumbers.phone}</div>}
              {savedNumbers.whatsapp && <div>💬 {savedNumbers.whatsapp}</div>}
            </div>
          )}
          <button onClick={saveModes} className="lp-btn lp-btn-gold-solid mt-3 w-full" style={{ height: 32, fontSize: 11 }}>Save Consultation Modes</button>
        </div>

        {/* RIGHT: AI Match Priority (lawyer) / Outreach Priority (ngo) */}
        <div className="from-right lp-card lp-av-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star size={14} className="text-[#C9A84C]" fill="currentColor" />
            <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">{isNgo ? "Outreach Priority" : "AI Match Priority"}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-[88px] h-[88px] shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#222" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#avg)" strokeWidth="6" strokeLinecap="round" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * (1 - (isNgo ? 0.78 : 0.85))} style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)", filter: "drop-shadow(0 0 6px rgba(201,168,76,.6))" }} />
                <defs><linearGradient id="avg" x1="0" x2="1"><stop offset="0%" stopColor="#F0D77D" /><stop offset="100%" stopColor="#C9A84C" /></linearGradient></defs>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="lp-display text-[22px] font-bold text-[#C9A84C] leading-none">{isNgo ? 78 : 85}</div>
                  <div className="text-[8px] text-[#888] tracking-[.2em]">/100</div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {(isNgo
                ? [["Reach Score", 78, "78/100"], ["Visibility", 41, "+41%"], ["Trust Rating", 90, "4.5/5"]]
                : [["Match Score", 85, "85/100"], ["Visibility Increase", 34, "+34%"], ["Trust Rating", 92, "4.6/5"]]
              ).map(([l, v, r]) => (
                <div key={l as string}>
                  <div className="flex justify-between text-[10.5px] mb-1"><span className="text-[#aaa]">{l}</span><span className="text-[#C9A84C]">{r}</span></div>
                  <div className="h-1 rounded-full bg-[#222] overflow-hidden">
                    <div style={{ width: `${v}%`, height: "100%", background: "linear-gradient(90deg,#C9A84C,#F0D77D)", boxShadow: "0 0 8px rgba(201,168,76,.5)", transition: "width 1.4s cubic-bezier(.22,1,.36,1)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Current Queue Status — uses real case counts */}
        <div className="from-right lp-card lp-av-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <User size={14} className="text-[#C9A84C]" />
            <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Current Queue Status</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              [Folder, queue.pending, isNgo ? "Incoming Requests" : "Pending Requests"],
              [User, queue.active, isNgo ? "Active Cases" : "Active Consultations"],
              [CheckCircle2, queue.resolved, isNgo ? "Resolved Cases" : "Resolved Today"],
            ].map(([Icon, n, l]: any, i) => (
              <div key={i} className="lp-av-tile text-center">
                <Icon size={18} className="tile-icon mx-auto mb-1" />
                <div className="lp-display text-[22px] font-bold text-[#C9A84C] leading-none">{n}</div>
                <div className="text-[9.5px] text-[#888] mt-1 leading-tight">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Emergency Availability with save */}
        <div className="from-right lp-card lp-av-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={14} className="text-[#C9A84C]" />
            <div className="text-[10px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Emergency Availability</div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[12.5px] text-white font-semibold">{isNgo ? "Available for urgent referrals" : "Available for urgent legal matters"}</div>
              <div className="text-[10.5px] text-[#888] mt-1 leading-relaxed">Priority listing for FIR, Arrest, Domestic Abuse and other urgent cases.</div>
            </div>
            <button onClick={() => setEmergency(e => !e)} className={`lp-av-toggle ${emergency ? "on" : ""}`}><span className="knob" /></button>
          </div>
          <div className="mt-3 text-[10.5px] text-[#888]">Saved: <span className={emergencySaved ? "text-[#5BC68C]" : "text-[#888]"}>{emergencySaved ? "ON" : "OFF"}</span></div>
          <button onClick={() => { setEmergencySaved(emergency); showToast(`Emergency availability ${emergency ? "enabled" : "disabled"}`); }} className="lp-btn lp-btn-gold-solid mt-3 w-full" style={{ height: 32, fontSize: 11 }}>Save Emergency Setting</button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] px-5 py-2.5 rounded-full text-[12px] flex items-center gap-2" style={{ background: "#141414", border: "1px solid #C9A84C", color: "#C9A84C", boxShadow: "0 12px 36px -10px rgba(201,168,76,.5)" }}>
          <Check size={13} className="text-[#5BC68C]" /> {toast}
        </div>
      )}
    </div>
  );
};
