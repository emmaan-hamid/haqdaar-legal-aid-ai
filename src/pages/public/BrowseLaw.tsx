import { useEffect, useState } from "react";
import { Search, Bookmark, Download, X } from "lucide-react";
import { PublicLayout } from "@/components/public/PublicLayout";

const ALL = [
  { title: "Industrial & Commercial Employment Ordinance, 1968", type: "Pakistani Laws", cat: "Labor", desc: "Governs employment terms, termination procedures, and worker rights in Pakistan.", section: "Sec. 12 (Termination)", date: "12 Jan 2026", downloads: 1245 },
  { title: "Punjab Protection of Women Against Violence Act, 2016", type: "Pakistani Laws", cat: "Domestic Violence", desc: "Provides protection orders, residence orders, and monetary relief.", section: "Sec. 7", date: "10 Feb 2026", downloads: 980 },
  { title: "Code of Criminal Procedure, 1898 (FIR Registration)", type: "Pakistani Laws", cat: "Police", desc: "Procedure for registering an FIR under section 154, including refusal remedies.", section: "Sec. 154", date: "01 Mar 2026", downloads: 2104 },
  { title: "Rent Restriction Ordinance, 1959", type: "Pakistani Laws", cat: "Property", desc: "Tenant protections, eviction grounds, and fair rent determination.", section: "RRO 1959", date: "20 Feb 2026", downloads: 765 },
  { title: "NADRA Ordinance, 2000", type: "Pakistani Laws", cat: "NADRA", desc: "Issuance, correction, and appeal procedures for the National Identity Card.", section: "Sec. 18", date: "11 Mar 2026", downloads: 432 },
  { title: "Consumer Protection Act, 2005", type: "Pakistani Laws", cat: "Consumer", desc: "Consumer rights, complaint procedures, and remedies before consumer courts.", section: "Sec. 13", date: "01 Apr 2026", downloads: 220 },
  { title: "Protection Against Harassment of Women at the Workplace Act, 2010", type: "Pakistani Laws", cat: "Harassment", desc: "Definition of harassment, inquiry committees, and penalties.", section: "PAHWWA 2010", date: "10 Apr 2026", downloads: 612 },
];

const CATS = ["All", "Labor", "Property", "Domestic Violence", "Police", "NADRA", "Consumer", "Harassment"];

const BrowseLaw = () => {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<typeof ALL[number] | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState("");

  useEffect(() => { const t = setTimeout(() => setDebounced(q), 300); return () => clearTimeout(t); }, [q]);
  useEffect(() => { setPage(1); }, [cat, debounced]);

  const filtered = ALL.filter(r => (cat === "All" || r.cat === cat) && (debounced === "" || r.title.toLowerCase().includes(debounced.toLowerCase()) || r.desc.toLowerCase().includes(debounced.toLowerCase())));
  const perPage = 4;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const items = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleBm = (t: string) => { const s = new Set(bookmarked); s.has(t) ? s.delete(t) : s.add(t); setBookmarked(s); };
  const download = (n: string) => { setToast("Preparing PDF..."); setTimeout(() => setToast(`Downloaded: ${n}.pdf`), 700); setTimeout(() => setToast(""), 2400); };

  return (
    <PublicLayout>
      <div className="lp-fade space-y-7">
        <div className="text-center space-y-2">
          <h1 className="lp-display text-[44px] md:text-[52px] font-bold text-white leading-tight">Browse Pakistani Law Before You Need It</h1>
          <p className="text-[15px] text-[#E8E0D0] max-w-2xl mx-auto">Search, read, and understand Pakistani laws in plain English and Urdu.</p>
        </div>

        <div className="relative max-w-[600px] mx-auto">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C9A84C] pointer-events-none" />
          <input value={q} onChange={e => setQ(e.target.value)} className="lp-input" style={{ paddingLeft: 70 }} style={{ height: 56 }} placeholder="Search by keyword, law name, or topic..." />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} className="lp-btn lp-btn-gold lp-tab" style={cat === c ? { background: "rgba(201,168,76,.18)", boxShadow: "0 0 16px rgba(201,168,76,.5)" } : {}}>{c}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 && <div className="text-center text-[#666] py-12">No laws match your filters.</div>}
            {items.map(r => (
              <div key={r.title} className="lp-card p-5 lp-card-hover space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="lp-chip">{r.cat}</span>
                    <span className="text-[11px] text-[#C9A84C]">{r.section}</span>
                  </div>
                  <button onClick={() => toggleBm(r.title)} className="text-[#C9A84C] hover:scale-110 transition-transform">
                    <Bookmark size={16} fill={bookmarked.has(r.title) ? "currentColor" : "none"} />
                  </button>
                </div>
                <h3 className="text-[16px] text-white font-semibold leading-snug">{r.title}</h3>
                <p className="text-[13px] text-[#aaa]">{r.desc}</p>
                <div className="text-[10.5px] text-[#888] flex gap-3"><span>Updated {r.date}</span><span>•</span><span>{r.downloads} downloads</span></div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setOpen(r)} className="lp-btn lp-btn-gold">Read More</button>
                  <button onClick={() => download(r.title)} className="lp-btn lp-btn-gold-solid"><Download size={11} /> Save for Later</button>
                  <button className="lp-btn lp-btn-gold">I Have This Problem</button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-center gap-2 pt-3">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="lp-btn lp-btn-gold lp-page-link" style={page === 1 ? { opacity: .35 } : {}}>Previous</button>
              {Array.from({ length: pages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className="lp-btn lp-btn-gold lp-page-link" style={page === i + 1 ? { background: "rgba(201,168,76,.2)", boxShadow: "0 0 14px rgba(201,168,76,.5)" } : {}}>{i + 1}</button>
              ))}
              <button disabled={page === pages} onClick={() => setPage(page + 1)} className="lp-btn lp-btn-gold lp-page-link" style={page === pages ? { opacity: .35 } : {}}>Next</button>
            </div>
          </div>

          <aside className="lp-card lp-card-hover p-6 h-fit space-y-3" style={{ background: "rgba(201,168,76,0.08)" }}>
            <div className="w-12 h-12 rounded-full grid place-items-center" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3v18M5 7h14M4 12l3-5 3 5M14 12l3-5 3 5"/></svg>
            </div>
            <h3 className="text-[16px] text-white font-semibold">Have a specific problem?</h3>
            <p className="text-[13px] text-[#E8E0D0]">Let our AI analyze it for you. Free, anonymous, in under 10 seconds.</p>
            <button className="lp-btn lp-btn-gold-solid w-full">Describe My Problem</button>
          </aside>
        </div>

        {open && (
          <div className="lp-modal-overlay" onClick={() => setOpen(null)}>
            <div className="lp-modal" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="lp-chip">{open.cat}</span>
                  <h3 className="lp-display text-[26px] text-white font-bold mt-2">{open.title}</h3>
                </div>
                <button onClick={() => setOpen(null)} className="text-[#888] hover:text-[#C9A84C]"><X size={20} /></button>
              </div>
              <p className="text-[13.5px] text-[#E8E0D0] leading-relaxed">{open.desc}</p>
              <div className="mt-4 space-y-3">
                <div><div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Citation</div><div className="text-[12.5px] text-[#aaa]">{open.section}</div></div>
                <div>
                  <div className="text-[10px] uppercase tracking-[.12em] text-[#C9A84C] font-semibold mb-1">Plain Language Summary</div>
                  <p className="text-[12.5px] text-[#aaa] leading-relaxed">This law protects your rights and outlines the legal procedure you can follow. Read in both English and Urdu for full clarity.</p>
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                <button onClick={() => download(open.title)} className="lp-btn lp-btn-gold-solid"><Download size={12} /> Download PDF</button>
                <button className="lp-btn lp-btn-gold">I Have This Problem</button>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] px-4 py-2 rounded-full text-[12px]" style={{ background: "#1E1E1E", border: "1px solid #C9A84C", color: "#C9A84C", boxShadow: "0 0 24px rgba(201,168,76,.4)" }}>{toast}</div>
        )}
      </div>
    </PublicLayout>
  );
};

export default BrowseLaw;