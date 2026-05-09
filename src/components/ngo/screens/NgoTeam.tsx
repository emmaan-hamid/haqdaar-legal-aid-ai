import { useMemo, useState } from "react";
import { UserPlus, X, Search } from "lucide-react";

const initial = [
  { name: "Ayesha Malik", role: "Senior Counsel", cases: 8, status: "Active" },
  { name: "Bilal Khan", role: "Case Manager", cases: 5, status: "Active" },
  { name: "Sana Riaz", role: "Paralegal", cases: 4, status: "Active" },
  { name: "Hamza Ahmed", role: "Outreach", cases: 2, status: "Inactive" },
];

const ROLES = ["All Roles", "Senior Counsel", "Case Manager", "Paralegal", "Outreach"] as const;

export const NgoTeam = () => {
  const [staff, setStaff] = useState(initial);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(""); const [role, setRole] = useState("Paralegal");
  const [q, setQ] = useState("");
  const [filterRole, setFilterRole] = useState<typeof ROLES[number]>("All Roles");
  const visible = useMemo(() => staff.filter(s =>
    (filterRole === "All Roles" || s.role === filterRole) &&
    (!q.trim() || s.name.toLowerCase().includes(q.toLowerCase()) || s.role.toLowerCase().includes(q.toLowerCase()))
  ), [staff, q, filterRole]);

  return (
    <div className="lp-fade space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="lp-display text-[28px] font-bold text-white">Team Members</h2>
        <button onClick={() => setOpen(true)} className="lp-btn lp-btn-gold"><UserPlus size={12} /> Add Staff Member</button>
      </div>

      <div className="lp-card p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search by name or role..."
            className="lp-input"
            style={{ paddingLeft: 34, height: 38 }}
          />
        </div>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value as any)} className="lp-input" style={{ width: 200, height: 38 }}>
          {ROLES.map(r => <option key={r}>{r}</option>)}
        </select>
        <span className="text-[11px] px-3 py-1 rounded-full font-bold tracking-wider" style={{ border: "1px solid #C9A84C", color: "#C9A84C" }}>{visible.length} MEMBERS</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visible.length === 0 && <div className="lp-card p-6 text-center text-[#888] text-[13px] md:col-span-2">No matching members.</div>}
        {visible.map((s) => (
          <div key={s.name} className="lp-card lp-card-hover p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C9A84C] grid place-items-center text-[#0A0A0A] font-bold">{s.name.split(" ").map(p => p[0]).join("")}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] text-white font-semibold">{s.name}</div>
              <div className="text-[11px] text-[#888]">{s.role} • {s.cases} active cases</div>
            </div>
            <span className={`lp-pill ${s.status === "Active" ? "lp-pill-resolved" : "lp-pill-pending"}`} style={{ fontSize: 9 }}>{s.status}</span>
            <button onClick={() => setStaff(staff.filter(x => x.name !== s.name))} className="text-[11px] text-[#E57367] hover:text-[#F08A7E] uppercase tracking-[.1em]">Remove</button>
          </div>
        ))}
      </div>
      {open && (
        <div className="lp-modal-overlay" onClick={() => setOpen(false)}>
          <div className="lp-modal max-w-[460px]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="lp-display text-[22px] text-white font-bold">Add Staff Member</h3><button onClick={() => setOpen(false)}><X size={18} className="text-[#888]" /></button></div>
            <div className="space-y-3">
              <input className="lp-input" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
              <select className="lp-input" value={role} onChange={e => setRole(e.target.value)}><option>Paralegal</option><option>Case Manager</option><option>Senior Counsel</option><option>Outreach</option></select>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button className="lp-btn lp-btn-gold" onClick={() => setOpen(false)}>Cancel</button>
              <button className="lp-btn lp-btn-gold-solid" onClick={() => { if (name) { setStaff([...staff, { name, role, cases: 0, status: "Active" }]); setOpen(false); setName(""); } }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
