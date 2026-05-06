import { useEffect, useState } from "react";
import { Search, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/public/PublicLayout";

type Item = { q: string; a: string };
const DATA: { cat: string; items: Item[] }[] = [
  { cat: "General", items: [
    { q: "What is HaqDaar?", a: "HaqDaar is an AI powered legal aid platform for Pakistan that helps citizens understand their rights, generate legal documents, and connect with verified pro bono lawyers." },
    { q: "Is it free?", a: "Yes, HaqDaar is one hundred percent free for every citizen of Pakistan." },
    { q: "Who is it for?", a: "Any citizen who needs to understand the law or take legal action, especially women, workers, tenants, and consumers." },
    { q: "Is it available in Urdu?", a: "Yes, you can describe your problem and read your rights in both Urdu and English." },
  ]},
  { cat: "Privacy & Anonymity", items: [
    { q: "Is my data safe?", a: "Yes. Your data is encrypted, never sold, and you can submit cases without sharing personal details." },
    { q: "Can I submit without an account?", a: "Yes. Anonymous Mode lets you submit a case with zero personal data." },
    { q: "Will anyone know I used this platform?", a: "No. Quick Exit instantly redirects to a neutral site, and history can be cleared with one click." },
  ]},
  { cat: "AI & Legal Advice", items: [
    { q: "Can the AI give me legal advice?", a: "The AI explains the law and your rights in plain language, but final legal advice always comes from a verified lawyer." },
    { q: "How accurate is it?", a: "Our system is trained on Pakistani law and reviewed by partner lawyers. Accuracy improves continuously." },
    { q: "What laws does it know?", a: "Labor, property, domestic violence, police, NADRA, consumer, and harassment laws across Pakistan." },
  ]},
  { cat: "Documents", items: [
    { q: "What documents can I generate?", a: "FIR drafts, legal notices, labor court applications, NADRA appeals, tenancy notices, and harassment complaints." },
    { q: "How do I download them?", a: "Generated documents are available as PDF and Word, downloadable from your case page." },
    { q: "Can I edit a generated document?", a: "Yes. You can edit before downloading or take it to your matched lawyer for review." },
  ]},
  { cat: "Lawyers & NGOs", items: [
    { q: "How are lawyers verified?", a: "Each lawyer is verified through bar council credentials and NGO references before activation." },
    { q: "What if my lawyer does not respond?", a: "You can request a rematch at any time. Unresponsive lawyers are flagged in our system." },
    { q: "What happens if I rate a lawyer poorly?", a: "Ratings affect lawyer visibility. Verified low ratings trigger an internal review." },
  ]},
  { cat: "Account & Login", items: [
    { q: "How do I change my password?", a: "Go to Settings, then Security, and set a new password. A confirmation email is sent." },
    { q: "How do I delete my account?", a: "Settings, then Privacy, then Delete Account. All your data is permanently removed within seven days." },
  ]},
];

const FaqPage = () => {
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => { const t = setTimeout(() => setDebounced(q.toLowerCase()), 200); return () => clearTimeout(t); }, [q]);

  const matches = (s: string) => debounced === "" || s.toLowerCase().includes(debounced);

  const filteredCats = DATA.map(c => ({
    ...c,
    items: c.items.filter(i => matches(i.q) || matches(i.a)),
  })).filter(c => c.items.length > 0);

  return (
    <PublicLayout>
      <div className="lp-fade space-y-8">
        <div className="text-center space-y-2">
          <h1 className="lp-display text-[44px] md:text-[52px] font-bold text-white leading-tight">Frequently Asked Questions</h1>
          <p className="text-[15px] text-[#E8E0D0]">Everything you need to know before you start.</p>
        </div>

        <div className="relative max-w-[500px] mx-auto">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C9A84C] pointer-events-none" />
          <input value={q} onChange={e => setQ(e.target.value)} className="lp-input" style={{ paddingLeft: 70, height: 52 }} placeholder="Search for a question..." />
        </div>

        {filteredCats.length === 0 && (
          <div className="lp-card p-8 text-center max-w-[600px] mx-auto">
            <p className="text-[14px] text-[#E8E0D0] mb-3">No questions match your search.</p>
            <Link to="/contact" className="lp-btn lp-btn-gold-solid">Contact Support</Link>
          </div>
        )}

        <div className="space-y-8 max-w-[820px] mx-auto">
          {filteredCats.map(group => (
            <div key={group.cat} className="space-y-3">
              <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">{group.cat}</div>
              {group.items.map((it, idx) => {
                const key = `${group.cat}-${idx}`;
                const isOpen = openKey === key;
                return (
                  <div
                    key={key}
                    className="lp-card lp-card-hover overflow-hidden"
                    style={isOpen ? { borderColor: "#C9A84C", boxShadow: "0 0 0 1px rgba(201,168,76,.35), 0 18px 40px -20px rgba(201,168,76,.4)" } : {}}
                  >
                    <button onClick={() => setOpenKey(isOpen ? null : key)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
                      <span className={`text-[15px] font-semibold ${isOpen ? "text-[#C9A84C]" : "text-white"}`}>{it.q}</span>
                      <span className="text-[#C9A84C] shrink-0">{isOpen ? <Minus size={16} /> : <Plus size={16} />}</span>
                    </button>
                    <div className="grid overflow-hidden transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                      <div className="min-h-0">
                        <p className="px-5 pb-5 text-[13.5px] text-[#E8E0D0] leading-relaxed">{it.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="lp-card p-8 text-center max-w-[700px] mx-auto" style={{ background: "rgba(201,168,76,.08)" }}>
          <h3 className="text-[18px] font-semibold text-white">Still have questions?</h3>
          <p className="text-[13.5px] text-[#E8E0D0] mt-2">We are here to help — by people or by AI.</p>
          <div className="flex flex-wrap gap-3 justify-center mt-5">
            <Link to="/contact" className="lp-btn lp-btn-gold">Contact our support team</Link>
            <button className="lp-btn lp-btn-gold-solid">Try our AI instead</button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default FaqPage;