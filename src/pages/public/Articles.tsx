import { useEffect, useState } from "react";
import { Search, Bookmark, Download, X } from "lucide-react";
import { PublicLayout } from "@/components/public/PublicLayout";

const ALL = [
  { title: "How to File an FIR in Pakistan: A Step by Step Guide", cat: "Police", author: "Eman Hamid", date: "12 Mar 2026", read: "6 min", excerpt: "Refused at the police station? Know your rights under section 154 and what to do next." },
  { title: "Wrongful Termination: What Pakistani Labor Law Actually Says", cat: "Labor", author: "Muntaha Shahab", date: "02 Mar 2026", read: "8 min", excerpt: "Your employer cannot fire you without cause. Here is the law and the remedy." },
  { title: "Domestic Violence Protection Orders Explained", cat: "Women's Rights", author: "Tehreem Naveed", date: "20 Feb 2026", read: "5 min", excerpt: "How protection, residence, and monetary orders work under provincial law." },
  { title: "Tenancy Eviction Notices: When They Are Legal", cat: "Property", author: "Eman Hamid", date: "10 Feb 2026", read: "4 min", excerpt: "Landlords must follow the Rent Restriction Ordinance. Most do not." },
  { title: "Buying Online in Pakistan: Your Consumer Rights", cat: "Consumer", author: "Muntaha Shahab", date: "05 Feb 2026", read: "3 min", excerpt: "Refunds, defective goods, and complaints under the Consumer Protection Act." },
  { title: "Workplace Harassment: A Survivor's Legal Roadmap", cat: "Women's Rights", author: "Tehreem Naveed", date: "28 Jan 2026", read: "7 min", excerpt: "Inquiry committees, evidence, and what penalties the employer faces." },
  { title: "What is HaqDaar? An Introduction to AI Powered Legal Aid", cat: "Platform Updates", author: "HaqDaar Team", date: "15 Jan 2026", read: "4 min", excerpt: "Why we built HaqDaar and what it can do for every Pakistani citizen." },
];

const CATS = ["All", "Labor", "Property", "Women's Rights", "Consumer", "Police", "General", "Platform Updates"];
const SORTS = ["Most Recent", "Most Read"];

const Articles = () => {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Most Recent");
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<typeof ALL[number] | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState("");

  useEffect(() => { const t = setTimeout(() => setDebounced(q), 300); return () => clearTimeout(t); }, [q]);
  useEffect(() => { setPage(1); }, [cat, debounced, sort]);

  const filtered = ALL.filter(a => (cat === "All" || a.cat === cat) && (debounced === "" || a.title.toLowerCase().includes(debounced.toLowerCase())));
  const perPage = 6;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const items = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSave = (t: string) => { const s = new Set(saved); s.has(t) ? s.delete(t) : s.add(t); setSaved(s); };
  const download = (n: string) => { setToast("Preparing PDF..."); setTimeout(() => setToast(`Downloaded: ${n}.pdf`), 700); setTimeout(() => setToast(""), 2400); };

  return (
    <PublicLayout>
      <div className="lp-fade space-y-7">
        <div className="text-center space-y-2">
          <h1 className="lp-display text-[44px] md:text-[52px] font-bold text-white leading-tight">Know the Law Before You Need It</h1>
          <p className="text-[15px] text-[#E8E0D0] max-w-2xl mx-auto">Stories, guides, and updates on Pakistani law and legal rights.</p>
        </div>

        <div className="relative max-w-[600px] mx-auto">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C9A84C] pointer-events-none" />
          <input value={q} onChange={e => setQ(e.target.value)} className="lp-input pl-12" style={{ height: 56 }} placeholder="Search articles..." />
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} className="lp-btn lp-btn-gold lp-tab" style={cat === c ? { background: "rgba(201,168,76,.18)", boxShadow: "0 0 16px rgba(201,168,76,.5)" } : {}}>{c}</button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="lp-input" style={{ width: "auto", height: 36, paddingRight: 28 }}>
            {SORTS.map(s => <option key={s} value={s} style={{ background: "#141414" }}>{s}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.length === 0 && <div className="col-span-full text-center text-[#666] py-12">No articles match your filters.</div>}
          {items.map(a => (
            <article key={a.title} className="lp-card p-5 lp-card-hover space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="lp-chip">{a.cat}</span>
                <button onClick={() => toggleSave(a.title)} className="text-[#C9A84C] hover:scale-110 transition-transform">
                  <Bookmark size={16} fill={saved.has(a.title) ? "currentColor" : "none"} />
                </button>
              </div>
              <h3 className="text-[15.5px] text-white font-semibold leading-snug">{a.title}</h3>
              <p className="text-[12.5px] text-[#aaa] line-clamp-3">{a.excerpt}</p>
              <div className="text-[10.5px] text-[#888] flex flex-wrap gap-2"><span>{a.author}</span><span>•</span><span>{a.date}</span><span>•</span><span>{a.read} read</span></div>
              <div className="flex gap-2">
                <button onClick={() => setOpen(a)} className="lp-btn lp-btn-gold flex-1">Read Article</button>
                <button onClick={() => download(a.title)} className="lp-btn lp-btn-gold-solid"><Download size={11} /> PDF</button>
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 pt-3">
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
                  <span className="lp-chip">{open.cat}</span>
                  <h3 className="lp-display text-[28px] text-white font-bold mt-2 leading-tight">{open.title}</h3>
                  <div className="text-[11px] text-[#888] mt-2">{open.author} • {open.date} • {open.read} read</div>
                </div>
                <button onClick={() => setOpen(null)} className="text-[#888] hover:text-[#C9A84C]"><X size={20} /></button>
              </div>
              <p className="text-[13.5px] text-[#E8E0D0] leading-relaxed">{open.excerpt}</p>
              <p className="text-[13.5px] text-[#aaa] leading-relaxed mt-3">This article walks you through the law in plain language, explains your specific rights as a citizen, and outlines the exact procedure you can follow with or without a lawyer.</p>
              <div className="flex gap-2 mt-5">
                <button onClick={() => download(open.title)} className="lp-btn lp-btn-gold-solid"><Download size={12} /> Save for Later</button>
                <button className="lp-btn lp-btn-gold">Start Your Legal Query</button>
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

export default Articles;