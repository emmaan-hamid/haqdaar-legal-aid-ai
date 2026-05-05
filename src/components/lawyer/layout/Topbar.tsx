import { Bell, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Topbar = ({ sidebarW }: { sidebarW: number }) => {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | "Messages" | "Responses" | "Requests">("All");
  const notifs = [
    { type: "Requests", text: "New case request from Ali Raza", time: "2m" },
    { type: "Messages", text: "New message from Sara K.", time: "12m" },
    { type: "Responses", text: "Client responded to HD-2401", time: "1h" },
    { type: "Requests", text: "New case request — Property Fraud", time: "3h" },
    { type: "Messages", text: "Rozan helpline contact updated", time: "5h" },
  ];
  const visible = filter === "All" ? notifs : notifs.filter(n => n.type === filter);

  return (
    <header className="fixed top-0 right-0 z-30 flex items-center justify-between px-6" style={{ left: sidebarW, height: 64, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,168,76,0.22)", transition: "left .3s cubic-bezier(.22,1,.36,1)" }}>
      <div />
      <div className="flex-1 max-w-[360px] mx-6 relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
        <input className="lp-input pl-10" placeholder="Search cases, clients..." />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button onClick={() => setNotifOpen(o => !o)} className="relative grid place-items-center w-10 h-10 rounded-full" style={{ background: "#141414", border: "1px solid rgba(201,168,76,.3)", color: "#C9A84C", transition: "all .25s ease" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 14px rgba(201,168,76,.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ""; }}>
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold grid place-items-center px-1">{notifs.length}</span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-[320px] rounded-2xl p-3 shadow-2xl lp-fade" style={{ background: "#141414", border: "1px solid rgba(201,168,76,.4)" }}>
              <div className="flex gap-1 mb-2">
                {(["All", "Messages", "Responses", "Requests"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)} className="lp-tab" style={{ flex: 1, fontSize: 10, padding: "6px 4px", borderRadius: 8, background: filter === f ? "rgba(201,168,76,.15)" : "transparent", color: filter === f ? "#C9A84C" : "#888", textTransform: "uppercase", letterSpacing: ".06em", transition: "all .2s ease", border: "1px solid " + (filter === f ? "#C9A84C" : "transparent") }}>{f}</button>
                ))}
              </div>
              <div className="max-h-[280px] overflow-y-auto lp-scroll">
                {visible.map((n, i) => (
                  <div key={i} className="lp-act-row">
                    <div className="w-8 h-8 rounded-full grid place-items-center" style={{ background: "rgba(201,168,76,.12)", color: "#C9A84C" }}>●</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] text-white">{n.text}</div>
                      <div className="text-[10px] text-[#888]">{n.type} • {n.time} ago</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2 pl-1 pr-3 h-10 rounded-full" style={{ background: "#141414", border: "1px solid rgba(201,168,76,.3)", transition: "all .25s ease" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 14px rgba(201,168,76,.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ""; }}>
            <span className="w-8 h-8 rounded-full grid place-items-center font-bold text-[#0A0A0A] bg-[#C9A84C]">UA</span>
            <span className="text-[12px] text-white">Usman A.</span>
            <ChevronDown size={12} className="text-[#888]" />
          </button>
          {open && (
            <div className="absolute right-0 top-12 w-[220px] p-2 rounded-2xl shadow-2xl lp-fade" style={{ background: "#141414", border: "1px solid rgba(201,168,76,.4)" }}>
              {["My Profile", "Case Requests", "Active Cases", "Completed Cases", "Saved Documents", "Settings"].map(it => (
                <button key={it} className="w-full text-left px-3 py-2 rounded-lg text-[12.5px] text-[#E8E0D0] hover:bg-[rgba(201,168,76,.1)] hover:text-[#C9A84C] transition-colors">{it}</button>
              ))}
              <div className="h-px my-1 bg-[rgba(201,168,76,.2)]" />
              <button className="w-full text-left px-3 py-2 rounded-lg text-[12.5px] text-[#E57367] hover:bg-[rgba(192,57,43,.1)] transition-colors">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
