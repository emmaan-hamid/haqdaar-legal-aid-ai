import { LayoutDashboard, FolderOpen, Settings, Heart, MessageSquare, BookOpen, LogOut, Menu, ChevronDown, Scale } from "lucide-react";

export type Section = "dashboard" | "cases-requests" | "cases-active" | "cases-completed" | "settings" | "impact" | "messages" | "resources";

export const Sidebar = ({ section, setSection, collapsed, toggle }: { section: Section; setSection: (s: Section) => void; collapsed: boolean; toggle: () => void }) => {
  const isCase = section.startsWith("cases-");
  const item = (id: Section, Icon: any, label: string) => {
    const active = section === id;
    return (
      <button onClick={() => setSection(id)} className={`lp-nav-item w-full text-left ${active ? "active" : ""}`} style={collapsed ? { justifyContent: "center", padding: "12px 0", margin: "3px 8px" } : {}} title={collapsed ? label : ""}>
        <Icon size={19} className={active ? "text-[#C9A84C]" : ""} />
        {!collapsed && <span>{label}</span>}
      </button>
    );
  };

  return (
    <aside className="fixed top-0 left-0 h-screen z-40 flex flex-col" style={{ width: collapsed ? 72 : 260, background: "#141414", borderRight: "1px solid rgba(201,168,76,0.22)", transition: "width .3s cubic-bezier(.22,1,.36,1)" }}>
      {/* Fixed header: hamburger only (logo lives outside in topbar) */}
      <div className="flex items-center px-4" style={{ height: 64, borderBottom: "1px solid rgba(201,168,76,0.15)", flexShrink: 0 }}>
        <button onClick={toggle} className="grid place-items-center w-9 h-9 rounded-xl shrink-0" style={{ background: "rgba(201,168,76,.1)", color: "#C9A84C", transition: "all .25s ease" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,.22)"; e.currentTarget.style.boxShadow = "0 0 14px rgba(201,168,76,.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(201,168,76,.1)"; e.currentTarget.style.boxShadow = "none"; }}>
          <Menu size={18} />
        </button>
      </div>

      <nav key={collapsed ? "c" : "e"} className="flex-1 overflow-hidden mt-3 lp-noscroll lp-side-anim" style={{ overflowY: "hidden" }}>
        {item("dashboard", LayoutDashboard, "Dashboard")}

        {/* My Cases group */}
        <button onClick={() => setSection("cases-requests")} className={`lp-nav-item w-full text-left ${isCase ? "active" : ""}`} style={collapsed ? { justifyContent: "center", padding: "12px 0", margin: "3px 8px" } : { marginTop: 8 }} title={collapsed ? "My Cases" : ""}>
          <FolderOpen size={19} />
          {!collapsed && (<><span className="flex-1">My Cases</span><ChevronDown size={14} className={isCase ? "rotate-180 transition-transform" : "transition-transform"} /></>)}
        </button>
        {!collapsed && isCase && (
          <div className="lp-fade" style={{ marginTop: 6, marginBottom: 6 }}>
            <button onClick={() => setSection("cases-requests")} className={`lp-nav-sub w-full text-left ${section === "cases-requests" ? "active" : ""}`}>Case Requests</button>
            <button onClick={() => setSection("cases-active")} className={`lp-nav-sub w-full text-left ${section === "cases-active" ? "active" : ""}`}>Active Cases</button>
            <button onClick={() => setSection("cases-completed")} className={`lp-nav-sub w-full text-left ${section === "cases-completed" ? "active" : ""}`}>Completed Cases</button>
          </div>
        )}

        {item("settings", Settings, "Availability & Settings")}
        {item("impact", Heart, "My Pro Bono Impact")}
        {item("messages", MessageSquare, "Messages")}
        {item("resources", BookOpen, "Legal Resources")}
      </nav>

      <div className="lp-side-divider" />
      <button className="lp-nav-item lp-glow-red mb-4" style={collapsed ? { justifyContent: "center", padding: "12px 0", margin: "3px 8px" } : {}}
        onMouseEnter={e => { e.currentTarget.style.color = "#E57367"; e.currentTarget.style.background = "rgba(192,57,43,.1)"; e.currentTarget.style.boxShadow = "0 0 18px rgba(192,57,43,.45)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = ""; e.currentTarget.style.background = ""; e.currentTarget.style.boxShadow = ""; }}>
        <LogOut size={19} />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
};
