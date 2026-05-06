import { useState } from "react";
import { UserPlus, X } from "lucide-react";

const initial = [
  { name: "Ayesha Malik", role: "Senior Counsel", cases: 8, status: "Active" },
  { name: "Bilal Khan", role: "Case Manager", cases: 5, status: "Active" },
  { name: "Sana Riaz", role: "Paralegal", cases: 4, status: "Active" },
  { name: "Hamza Ahmed", role: "Outreach", cases: 2, status: "Inactive" },
];

export const NgoTeam = () => {
  const [staff, setStaff] = useState(initial);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(""); const [role, setRole] = useState("Paralegal");
  return (
    <div className="lp-fade space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="lp-display text-[28px] font-bold text-white">Team Members</h2>
        <button onClick={() => setOpen(true)} className="lp-btn lp-btn-gold"><UserPlus size={12} /> Add Staff Member</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staff.map((s, i) => (
          <div key={s.name} className="lp-card lp-card-hover p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C9A84C] grid place-items-center text-[#0A0A0A] font-bold">{s.name.split(" ").map(p => p[0]).join("")}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] text-white font-semibold">{s.name}</div>
              <div className="text-[11px] text-[#888]">{s.role} • {s.cases} active cases</div>
            </div>
            <span className={`lp-pill ${s.status === "Active" ? "lp-pill-resolved" : "lp-pill-pending"}`} style={{ fontSize: 9 }}>{s.status}</span>
            <button onClick={() => setStaff(staff.filter((_, j) => j !== i))} className="text-[11px] text-[#E57367] hover:text-[#F08A7E] uppercase tracking-[.1em]">Remove</button>
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