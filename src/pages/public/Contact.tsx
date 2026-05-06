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
      <div className="lp-fade space-y-7">
        <div className="text-center space-y-2">
          <h1 className="lp-display text-[44px] md:text-[52px] font-bold text-white leading-tight">Get in Touch</h1>
          <p className="text-[15px] text-[#E8E0D0]">We respond within 1 to 2 business days.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1080px] mx-auto">
          <div className="lp-card p-7">
            {sent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full grid place-items-center mx-auto" style={{ background: "rgba(201,168,76,.15)", color: "#C9A84C" }}>
                  <Check size={26} />
                </div>
                <h3 className="lp-display text-[24px] text-white font-bold">Your message has been received</h3>
                <p className="text-[13.5px] text-[#E8E0D0]">Reference: <span className="text-[#C9A84C] font-semibold">{sent}</span></p>
                <p className="text-[12.5px] text-[#888]">We will respond within 1 to 2 business days.</p>
                <button onClick={() => { setSent(null); setName(""); setEmail(""); setMsg(""); }} className="lp-btn lp-btn-gold">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h3 className="lp-display text-[24px] text-white font-bold">Send us a message</h3>
                <div>
                  <label className="text-[11px] uppercase tracking-[.12em] text-[#888]">Full Name (Optional)</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="lp-input mt-1" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[.12em] text-[#888]">Email</label>
                  <div className="relative mt-1">
                    <input value={email} onChange={e => setEmail(e.target.value)} className="lp-input pr-10" placeholder="you@example.com" type="email" />
                    {email && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px]" style={{ color: emailValid ? "#5BC68C" : "#E57367" }}>
                        {emailValid ? "Valid" : "Invalid"}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[.12em] text-[#888]">Inquiry Category</label>
                  <select value={cat} onChange={e => setCat(e.target.value)} className="lp-input mt-1">
                    {CATEGORIES.map(c => <option key={c} value={c} style={{ background: "#141414" }}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[.12em] text-[#888] flex items-center justify-between">
                    <span>Message</span>
                    <span className={msgValid ? "text-[#5BC68C]" : "text-[#888]"}>{msg.length}/20 min</span>
                  </label>
                  <textarea value={msg} onChange={e => setMsg(e.target.value)} className="lp-textarea mt-1" placeholder="Tell us how we can help..." rows={5} />
                </div>
                <button type="submit" disabled={!canSubmit} className="lp-btn lp-btn-gold-solid w-full" style={{ height: 44, opacity: canSubmit ? 1 : .5 }}>Send Message</button>
              </form>
            )}
          </div>

          <div className="lp-card p-7 space-y-5">
            <h3 className="lp-display text-[24px] text-white font-bold">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full grid place-items-center shrink-0" style={{ background: "rgba(201,168,76,.12)", color: "#C9A84C" }}><Mail size={16} /></div>
                <div>
                  <div className="text-[11px] uppercase tracking-[.12em] text-[#888]">Email</div>
                  <a href="mailto:contact@haqdaar.pk" className="text-[14px] text-[#C9A84C] hover:underline">contact@haqdaar.pk</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full grid place-items-center shrink-0" style={{ background: "rgba(201,168,76,.12)", color: "#C9A84C" }}><MapPin size={16} /></div>
                <div>
                  <div className="text-[11px] uppercase tracking-[.12em] text-[#888]">Office</div>
                  <div className="text-[14px] text-white">Lahore, Pakistan</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full grid place-items-center shrink-0" style={{ background: "rgba(201,168,76,.12)", color: "#C9A84C" }}><Clock size={16} /></div>
                <div>
                  <div className="text-[11px] uppercase tracking-[.12em] text-[#888]">Response Time</div>
                  <div className="text-[14px] text-white">1 to 2 business days</div>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-[rgba(201,168,76,.15)]">
              <div className="text-[11px] uppercase tracking-[.12em] text-[#888] mb-2">Quick Links</div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
                <Link to="/faq" className="text-[#E8E0D0] hover:text-[#C9A84C]">FAQ</Link>
                <Link to="/about" className="text-[#E8E0D0] hover:text-[#C9A84C]">About Us</Link>
                <Link to="/articles" className="text-[#E8E0D0] hover:text-[#C9A84C]">Articles</Link>
                <Link to="/browse-law" className="text-[#E8E0D0] hover:text-[#C9A84C]">Browse Law</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Contact;