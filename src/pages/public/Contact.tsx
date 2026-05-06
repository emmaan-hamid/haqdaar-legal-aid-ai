import { useMemo, useState } from "react";
import { Check, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/public/PublicLayout";

const CATEGORIES = ["General Question", "Technical Issue", "Partnership/NGO Onboarding", "Lawyer Onboarding", "Media/Press", "Feedback"];

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cat, setCat] = useState(CATEGORIES[0]);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState<string | null>(null);

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const msgValid = msg.length >= 20;
  const canSubmit = emailValid && msgValid;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const ref = `HD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSent(ref);
  };

  return (
    <PublicLayout>
      <div className="lp-fade space-y-10 relative" style={{ paddingTop: 40, paddingBottom: 40 }}>
        {/* Radial glow + curve */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", left: "50%", top: 80, width: 600, height: 600, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(212,175,55,.18), transparent 60%)", filter: "blur(40px)" }} />
          <svg style={{ position: "absolute", right: -80, bottom: -80, opacity: 0.15 }} width="380" height="280" viewBox="0 0 380 280" fill="none">
            <path d="M0 240 Q120 160 220 200 T380 120" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M20 280 Q160 180 260 220 T380 160" stroke="#D4AF37" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="text-center space-y-3 relative">
          <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[.22em] text-[#D4AF37] font-semibold">
            <span className="h-1 w-1 rounded-full bg-[#D4AF37] inline-block" style={{ boxShadow: "0 0 8px #D4AF37" }} />
            Get In Touch
            <span className="h-1 w-1 rounded-full bg-[#D4AF37] inline-block" style={{ boxShadow: "0 0 8px #D4AF37" }} />
          </div>
          <h1 className="lp-display text-[48px] md:text-[56px] font-bold text-white leading-tight">Get In Touch</h1>
          <p className="text-[15px] text-[#A0A0A0]">We respond within 1 to 2 business days.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1080px] mx-auto relative">
          <div className="haq-card">
            {sent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full grid place-items-center mx-auto" style={{ background: "rgba(212,175,55,.15)", color: "#D4AF37" }}>
                  <Check size={26} />
                </div>
                <h3 className="lp-display text-[24px] text-white font-bold">Your message has been received</h3>
                <p className="text-[13.5px] text-[#E8E0D0]">Reference: <span className="text-[#D4AF37] font-semibold">{sent}</span></p>
                <p className="text-[12.5px] text-[#888]">We will respond within 1 to 2 business days.</p>
                <button onClick={() => { setSent(null); setName(""); setEmail(""); setMsg(""); }} className="haq-btn-secondary">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h3 className="lp-display text-[26px] text-white font-bold mb-2">Send us a message</h3>
                <div>
                  <label className="text-[11px] uppercase tracking-[.14em] text-[#888]">Full Name (Optional)</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="haq-input mt-1.5" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[.14em] text-[#888]">Email Address</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} className="haq-input mt-1.5" placeholder="you@example.com" type="email" />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[.14em] text-[#888]">Inquiry Category</label>
                  <select value={cat} onChange={e => setCat(e.target.value)} className="haq-input mt-1.5">
                    {CATEGORIES.map(c => <option key={c} value={c} style={{ background: "#141414" }}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[.14em] text-[#888] flex items-center justify-between">
                    <span>Message</span>
                    <span className={msgValid ? "text-[#5BC68C]" : "text-[#888]"}>{msg.length}/20 min</span>
                  </label>
                  <textarea value={msg} onChange={e => setMsg(e.target.value)} className="haq-textarea mt-1.5" placeholder="Tell us how we can help..." rows={5} />
                </div>
                <button type="submit" disabled={!canSubmit} className="haq-btn-primary w-full" style={{ opacity: canSubmit ? 1 : .5 }}>Send Message</button>
              </form>
            )}
          </div>

          <div className="haq-card space-y-5">
            <div>
              <h3 className="lp-display text-[26px] text-white font-bold">Contact Information</h3>
              <div className="h-px w-16 mt-2" style={{ background: "linear-gradient(90deg,#D4AF37,transparent)", boxShadow: "0 0 8px rgba(212,175,55,.5)" }} />
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full grid place-items-center shrink-0" style={{ border: "1px solid rgba(212,175,55,.5)", color: "#D4AF37" }}><Mail size={16} /></div>
                <div>
                  <div className="text-[11px] uppercase tracking-[.12em] text-[#888]">Email</div>
                  <a href="mailto:contact@haqdaar.pk" className="text-[14px] text-[#D4AF37] hover:underline">contact@haqdaar.pk</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full grid place-items-center shrink-0" style={{ border: "1px solid rgba(212,175,55,.5)", color: "#D4AF37" }}><MapPin size={16} /></div>
                <div>
                  <div className="text-[11px] uppercase tracking-[.12em] text-[#888]">Office</div>
                  <div className="text-[14px] text-white">Lahore, Pakistan</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full grid place-items-center shrink-0" style={{ border: "1px solid rgba(212,175,55,.5)", color: "#D4AF37" }}><Clock size={16} /></div>
                <div>
                  <div className="text-[11px] uppercase tracking-[.12em] text-[#888]">Response Time</div>
                  <div className="text-[14px] text-white">1 to 2 business days</div>
                </div>
              </div>
            </div>
            <div className="pt-4" style={{ borderTop: "1px solid rgba(212,175,55,.2)", boxShadow: "0 -1px 8px rgba(212,175,55,.15)" }}>
              <div className="text-[12px] uppercase tracking-[.14em] text-white font-semibold mb-3">Quick Links</div>
              <div className="flex flex-col gap-2 text-[13.5px]">
                <Link to="/faq" className="text-[#D4AF37] hover:text-white hover:underline transition-colors">FAQs</Link>
                <Link to="/browse-law" className="text-[#D4AF37] hover:text-white hover:underline transition-colors">Browse Law</Link>
                <Link to="/about" className="text-[#D4AF37] hover:text-white hover:underline transition-colors">About Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Contact;