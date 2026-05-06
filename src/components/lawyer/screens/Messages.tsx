import { useEffect, useRef, useState } from "react";
import { Search, Send, Paperclip, MoreVertical, Mail } from "lucide-react";

const convos = [
  { id: "c1", name: "Ali Raza", caseId: "HD-2401", last: "Thank you sir, I will send the documents", time: "2m", unread: 2, online: true },
  { id: "c2", name: "Sara Khan", caseId: "HD-2402", last: "When is the next hearing?", time: "1h", unread: 0, online: true },
  { id: "c3", name: "Aurat Foundation", caseId: "HD-2408", last: "We can assign a counselor", time: "3h", unread: 1, online: false },
  { id: "c4", name: "Bilal Hussain", caseId: "HD-2403", last: "Got the notice, thanks", time: "1d", unread: 0, online: false },
];

export const Messages = () => {
  const [active, setActive] = useState("c1");
  const [filter, setFilter] = useState<"All" | "Unread" | "Cases" | "NGOs">("All");
  const [menu, setMenu] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([
    { from: "client", text: "Assalam u alaikum sir, my employer terminated me without notice." },
    { from: "me", text: "Walaikum assalam. Please share your appointment letter and last salary slip." },
    { from: "client", text: "Yes sir, I'll upload them now." },
    { from: "me", text: "I have reviewed the documents. We have a strong case under ICEO 1968." },
    { from: "client", text: "Thank you sir, I will send the documents" },
  ]);
  const [typing, setTyping] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [msgs.length]);

  const filtered = convos.filter(c => filter === "All" ? true : filter === "Unread" ? c.unread > 0 : filter === "NGOs" ? c.name.includes("Foundation") : true);
  const cur = convos.find(c => c.id === active)!;
  const send = () => { if (!text.trim()) return; setMsgs([...msgs, { from: "me", text }]); setText(""); };

  return (
    <div className="lp-fade">
      <h2 className="lp-display text-[28px] font-bold text-white mb-4">Messages</h2>
      <div className="lp-card grid grid-cols-1 lg:grid-cols-[300px_1fr]" style={{ height: "calc(100vh - 230px)", minHeight: 480, overflow: "hidden" }}>
        {/* Left */}
        <div className="border-r border-[rgba(201,168,76,.18)] flex flex-col">
          <div className="p-3 border-b border-[rgba(201,168,76,.18)] space-y-2">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
              <input className="lp-input" style={{ paddingLeft: 56, height: 36 }} placeholder="Search conversations..." />
            </div>
            <div className="flex gap-1">{(["All", "Unread", "Cases", "NGOs"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className="lp-tab" style={{ flex: 1, fontSize: 10, padding: "5px 4px", borderRadius: 8, color: filter === f ? "#C9A84C" : "#888", background: filter === f ? "rgba(201,168,76,.12)" : "transparent", textTransform: "uppercase", letterSpacing: ".06em", border: "1px solid " + (filter === f ? "#C9A84C" : "transparent"), transition: "all .2s" }}>{f}</button>
            ))}</div>
          </div>
          <div className="flex-1 overflow-y-auto lp-scroll">
            {filtered.length === 0 && <div className="text-center text-[#666] text-[12px] mt-12">No conversations</div>}
            {filtered.map(c => (
              <button key={c.id} onClick={() => setActive(c.id)} className="w-full text-left px-3 py-3 flex gap-3 transition-all duration-200" style={{ background: active === c.id ? "rgba(201,168,76,.08)" : "transparent", borderLeft: active === c.id ? "3px solid #C9A84C" : "3px solid transparent" }}
                onMouseEnter={e => { if (active !== c.id) e.currentTarget.style.background = "rgba(201,168,76,.05)"; }}
                onMouseLeave={e => { if (active !== c.id) e.currentTarget.style.background = "transparent"; }}>
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C] grid place-items-center text-[#0A0A0A] font-bold text-[13px]">{c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                  {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#5BC68C] border-2 border-[#141414]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between"><span className="text-[12.5px] text-white font-semibold truncate">{c.name}</span><span className="text-[10px] text-[#666]">{c.time}</span></div>
                  <div className="flex items-center justify-between gap-2"><span className="text-[11px] text-[#888] truncate">{c.last}</span>{c.unread > 0 && <span className="text-[9px] bg-[#C9A84C] text-[#0A0A0A] font-bold rounded-full min-w-[16px] h-[16px] grid place-items-center px-1">{c.unread}</span>}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col">
          {!cur ? (
            <div className="flex-1 grid place-items-center text-[#666]"><div className="text-center"><Mail size={42} className="mx-auto mb-2 text-[#C9A84C] opacity-40" /><div className="text-[13px]">Select a conversation</div></div></div>
          ) : (
            <>
              <div className="px-5 py-3 border-b border-[rgba(201,168,76,.18)] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C9A84C] grid place-items-center text-[#0A0A0A] font-bold text-[12px]">{cur.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><span className="text-[14px] text-white font-semibold">{cur.name}</span><span className="lp-chip" style={{ height: 20, fontSize: 9 }}>{cur.caseId}</span><span className={`w-2 h-2 rounded-full ${cur.online ? "bg-[#5BC68C]" : "bg-[#555]"}`} /></div>
                  <div className="text-[11px] text-[#888]">{cur.online ? "Online" : "Last seen 2h ago"}</div>
                </div>
                <button className="lp-btn lp-btn-gold lp-btn-sm">View Case</button>
                <div className="relative">
                  <button onClick={() => setMenu(m => !m)} className="w-8 h-8 grid place-items-center rounded-full text-[#888] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,.1)] transition-colors"><MoreVertical size={16} /></button>
                  {menu && (
                    <div className="absolute right-0 top-10 w-40 p-2 rounded-xl shadow-2xl z-10 lp-fade" style={{ background: "#1E1E1E", border: "1px solid rgba(201,168,76,.3)" }}>
                      {["View Profile", "Search Chat", "Mute Notifications", "Archive", "Block"].map(o => (
                        <button key={o} className="w-full text-left px-3 py-1.5 text-[12px] text-[#E8E0D0] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,.08)] rounded-lg transition-colors" onClick={() => setMenu(false)}>{o}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto lp-scroll p-5 space-y-3">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[70%] px-4 py-2 text-[13px]" style={{
                      background: m.from === "me" ? "#C9A84C" : "#1E1E1E",
                      color: m.from === "me" ? "#0A0A0A" : "#E8E0D0",
                      border: m.from === "me" ? "none" : "1px solid rgba(201,168,76,.3)",
                      borderRadius: m.from === "me" ? "20px 20px 4px 20px" : "20px 20px 20px 4px"
                    }}>{m.text}</div>
                  </div>
                ))}
                {typing && (
                  <div className="flex items-center gap-2 text-[#888] text-[11px]">
                    <span className="lp-typing-dot" /><span className="lp-typing-dot" /><span className="lp-typing-dot" /> {cur.name} is typing...
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-[rgba(201,168,76,.18)] flex items-center gap-2">
                <button className="w-10 h-10 grid place-items-center rounded-full text-[#888] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,.1)] transition-colors"><Paperclip size={16} /></button>
                <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === "Enter") send(); }} className="lp-input flex-1" placeholder="Type a message..." />
                <button onClick={send} className="lp-btn lp-btn-gold-solid"><Send size={12} /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
