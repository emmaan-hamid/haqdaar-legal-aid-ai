import { useEffect, useState } from "react";
import { Search, Bookmark, Download, X } from "lucide-react";

const ALL = [
  { title: "Industrial & Commercial Employment Ordinance, 1968", type: "Pakistani Laws", cat: "Labor", desc: "Governs employment terms, termination procedures, and worker rights in Pakistan.", section: "Sec. 12 (Termination)", date: "12 Jan 2026", downloads: 1245 },
  { title: "Punjab Protection of Women Against Violence Act, 2016", type: "Pakistani Laws", cat: "Domestic Violence", desc: "Provides protection orders, residence orders, and monetary relief.", section: "Sec. 7", date: "10 Feb 2026", downloads: 980 },
  { title: "FIR Filing Template", type: "Legal Templates", cat: "Police", desc: "Standard format for First Information Report under CrPC §154.", section: "CrPC §154", date: "01 Mar 2026", downloads: 2104 },
  { title: "Tenancy Eviction Notice", type: "Legal Templates", cat: "Property", desc: "Editable notice template for tenancy termination under Rent Restriction Ordinance.", section: "RRO 1959", date: "20 Feb 2026", downloads: 765 },
  { title: "High Court Petition Procedure", type: "Court Procedures", cat: "Property", desc: "Step by step guide for filing constitutional petition.", section: "Art. 199", date: "05 Mar 2026", downloads: 543 },
  { title: "NADRA Appeal Guide", type: "Practice Guides", cat: "NADRA", desc: "How to appeal a rejected ID application with required documents.", section: "NADRA Ord. 2000", date: "11 Mar 2026", downloads: 432 },
  { title: "Ali Khan v. State (Landmark Labor)", type: "Landmark Cases", cat: "Labor", desc: "Supreme Court ruling expanding back wages eligibility.", section: "PLD 2019 SC 145", date: "22 Mar 2026", downloads: 311 },
  { title: "Consumer Protection Act, 2005", type: "Pakistani Laws", cat: "Consumer", desc: "Consumer rights, complaint procedures, and remedies.", section: "Sec. 13", date: "01 Apr 2026", downloads: 220 },
  { title: "Workplace Harassment Complaint", type: "Legal Templates", cat: "Harassment", desc: "Template under Protection Against Harassment of Women at the Workplace Act 2010.", section: "PAHWWA 2010", date: "10 Apr 2026", downloads: 612 },
];

const TYPES = ["All Resources", "Pakistani Laws", "Legal Templates", "Court Procedures", "Practice Guides", "Landmark Cases"];
const CATS = ["All", "Labor", "Property", "Domestic Violence", "Police", "NADRA", "Consumer", "Harassment"];

export const Resources = () => {
  const [type, setType] = useState("All Resources");
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<typeof ALL[number] | null>(null);
  const [toast, setToast] = useState("");
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  useEffect(() => { const t = setTimeout(() => setDebounced(q), 300); return () => clearTimeout(t); }, [q]);
  useEffect(() => { setPage(1); }, [type, cat, debounced]);

  const filtered = ALL.filter(r => (type === "All Resources" || r.type === type) && (cat === "All" || r.cat === cat) && (debounced === "" || r.title.toLowerCase().includes(debounced.toLowerCase())));
  const perPage = 3;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const items = filtered.slice((page - 1) * perPage, page * perPage);

  const openModal = (r: typeof ALL[number]) => setOpen(r);

  const download = (name: string) => {
    setToast("Preparing PDF...");
    setTimeout(() => setToast(`Downloaded: ${name}.pdf`), 700);
    setTimeout(() => setToast(""), 2400);
  };

  const toggleBm = (t: string) => { const s = new Set(bookmarked); s.has(t) ? s.delete(t) : s.add(t); setBookmarked(s); };

  return (
    <div className="lp-fade space-y-5 relative">
      <div>
        <h2 className="lp-display text-[28px] font-bold text-white">Legal Resources</h2>
        <p className="text-[12.5px] text-[#888] mt-1">Curated Pakistani laws, templates, and practice guides.</p>
      </div>
      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
        <input value={q} onChange={e => setQ(e.target.value)} className="lp-input" style={{ paddingLeft: 60, height: 46 }} placeholder="Search resources..." />
      </div>
      <div className="flex flex-wrap gap-6 border-b border-[rgba(201,168,76,.2)]">{TYPES.map(t => <button key={t} onClick={() => setType(t)} className={`lp-utab ${type === t ? "active" : ""}`}>{t}</button>)}</div>
      <div className="flex flex-wrap gap-5 border-b border-[rgba(201,168,76,.15)]">{CATS.map(c => <button key={c} onClick={() => setCat(c)} className={`lp-utab ${cat === c ? "active" : ""}`} style={{ fontSize: 12 }}>{c}</button>)}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 && <div className="col-span-full text-center text-[#666] py-12">No resources match your filters.</div>}
        {items.map(r => (
          <div key={r.title} className="lp-card p-5 lp-card-hover space-y-3">
            <div className="flex items-start justify-between gap-2">
              <span className="lp-chip">{r.type}</span>
              <button onClick={() => toggleBm(r.title)} className="text-[#C9A84C] hover:scale-110 transition-transform"><Bookmark size={16} fill={bookmarked.has(r.title) ? "currentColor" : "none"} /></button>
            </div>
            <h3 className="text-[15px] text-white font-semibold leading-snug">{r.title}</h3>
            <p className="text-[12px] text-[#aaa] line-clamp-3">{r.desc}</p>
            <div className="text-[10.5px] text-[#888] flex items-center gap-3 flex-wrap"><span className="text-[#C9A84C]">{r.section}</span><span>•</span><span>Updated {r.date}</span><span>•</span><span>{r.downloads} downloads</span></div>
            <div className="flex gap-2">
              <button onClick={() => openModal(r)} className="lp-btn lp-btn-gold flex-1">View Full Law</button>
              <button onClick={() => download(r.title)} className="lp-btn lp-btn-gold-solid flex-1"><Download size={11} /> PDF</button>
            </div>
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="lp-btn lp-btn-gold lp-page-link" style={page === 1 ? { opacity: .35 } : {}}>Previous</button>
        {Array.from({ length: pages }).map((_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} className="lp-btn lp-btn-gold lp-page-link" style={page === i + 1 ? { background: "rgba(201,168,76,.2)", boxShadow: "0 0 14px rgba(201,168,76,.5)" } : {}}>{i + 1}</button>
        ))}
        <button disabled={page === pages} onClick={() => setPage(page + 1)} className="lp-btn lp-btn-gold lp-page-link" style={page === pages ? { opacity: .35 } : {}}>Next</button>
      </div>

      {open && (
        <div className="lp-modal-overlay" onClick={() => setOpen(null)}>
          <div className="lp-modal" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="lp-chip">{open.type}</span>
                <h3 className="lp-display text-[24px] text-white font-bold mt-2">{open.title}</h3>
              </div>
              <button onClick={() => setOpen(null)} className="text-[#888] hover:text-[#C9A84C]"><X size={20} /></button>
            </div>
            <p className="text-[13px] text-[#E8E0D0] leading-relaxed">{open.desc}</p>
            <div className="mt-4 space-y-3">
              <div><div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Citation</div><div className="text-[12.5px] text-[#aaa]">{open.section}</div></div>
              <div><div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Key Sections</div>
                <ul className="text-[12.5px] text-[#aaa] space-y-1 list-disc pl-5">
                  <li>Definitions and applicability</li><li>Rights and protections granted</li><li>Procedural remedies and timelines</li><li>Penalties for non compliance</li>
                </ul>
              </div>
            </div>
            <button onClick={() => download(open.title)} className="lp-btn lp-btn-gold-solid mt-5"><Download size={12} /> Download PDF</button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] px-4 py-2 rounded-full text-[12px]" style={{ background: "#1E1E1E", border: "1px solid #C9A84C", color: "#C9A84C", boxShadow: "0 0 24px rgba(201,168,76,.4)" }}>{toast}</div>
      )}
    </div>
  );
};
