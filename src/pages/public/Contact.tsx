import { useEffect, useMemo, useState } from "react";
import { MessageCircle, MapPin, Phone, ArrowRight, Scale } from "lucide-react";
import { PublicLayout } from "@/components/public/PublicLayout";
import lahore from "@/assets/branch-lahore.jpg";
import karachi from "@/assets/branch-karachi.jpg";
import islamabad from "@/assets/branch-islamabad.jpg";
import gujranwala from "@/assets/branch-gujranwala.jpg";
import { Link } from "react-router-dom";

const CASE_TAGS = ["FIR", "Police Misconduct", "Child Abuse", "Domestic Abuse", "Employee Disputes"];
const CATS = ["Select Category", "FIR", "Police Misconduct", "Domestic Abuse", "Child Abuse", "Employee Disputes", "Other"];

const BRANCHES = [
  { city: "Lahore Branch", img: lahore, line: "Our Office For All Civil Laws", active: false },
  { city: "Karachi Branch", img: karachi, line: "Our Office For All Civil Laws", active: false },
  { city: "Islamabad Branch", img: islamabad, line: "Our Office For All Civil Laws", active: true },
  { city: "Gujranwala Branch", img: gujranwala, line: "Our Office For All Civil Laws", active: false },
];

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cat, setCat] = useState(CATS[0]);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState<string | null>(null);

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const canSubmit = emailValid && msg.trim().length >= 10;

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".haq-reveal,.haq-reveal-l,.haq-reveal-r");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); else e.target.classList.remove("in"); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSent(`HD-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  return (
    <PublicLayout>
      <div className="lp-fade space-y-12">
        {/* Page title */}
        <div className="text-center space-y-2 pt-1 haq-reveal">
          <div className="flex items-center justify-center gap-2 mb-2 opacity-70">
            <Scale size={18} className="text-[#C9A84C]" />
          </div>
          <h1 className="lp-display text-[34px] md:text-[44px] font-semibold text-white leading-tight">Contact Us</h1>
          <div className="flex items-center justify-center gap-2 text-[12px] text-[#A8A39A]">
            <Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <span className="text-white">Contact Us</span>
          </div>
        </div>

        {/* Two column: branch info LEFT, form RIGHT */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT */}
          <div className="space-y-6 haq-reveal-l">
            <div>
              <div className="text-[10.5px] uppercase tracking-[.28em] text-[#C9A84C] font-semibold mb-3">| Contact Us</div>
              <h2 className="lp-display text-[28px] md:text-[34px] font-semibold text-white leading-tight">
                Our <span className="text-[#C9A84C]">Branch</span> Office
              </h2>
              <div className="lp-display text-[18px] text-[#C9A84C] mt-2">Islamabad Head Office</div>
            </div>

            <ul className="space-y-5">
              {[
                { Icon: MessageCircle, t: "Chat To Us", v: "info@haqdaar.pk" },
                { Icon: MapPin, t: "Visit Our Office Branch", v: "24 Constitution Avenue,\nIslamabad, Pakistan 44000" },
                { Icon: Phone, t: "Call Us", v: "+92 300 1234567" },
              ].map(c => (
                <li key={c.t} className="flex items-start gap-4 group transition-transform duration-300 hover:translate-x-1">
                  <div className="w-11 h-11 rounded-full grid place-items-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(201,168,76,.5)]"
                    style={{ background: "rgba(201,168,76,.08)", border: "1px solid rgba(201,168,76,.45)", color: "#C9A84C" }}>
                    <c.Icon size={16} />
                  </div>
                  <div>
                    <div className="text-[13.5px] text-white font-semibold">{c.t}</div>
                    <div className="text-[12px] text-[#A8A39A] mt-0.5 whitespace-pre-line leading-relaxed">{c.v}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Case tags card */}
            <div className="rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,.15)]"
              style={{ background: "linear-gradient(180deg, rgba(20,16,12,.85), rgba(10,9,8,.85))", border: "1px solid rgba(201,168,76,.3)" }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="text-[12.5px] text-white font-semibold leading-relaxed">
                  Choose Our Lawyer According<br />Your Cases
                </div>
                <Scale size={28} className="text-[#C9A84C] ml-auto" />
              </div>
              <div className="flex flex-wrap gap-2">
                {CASE_TAGS.map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-[11px] text-[#E8E0D0] transition-all duration-200 hover:text-[#C9A84C] hover:scale-105"
                    style={{ background: "rgba(201,168,76,.06)", border: "1px solid rgba(201,168,76,.35)" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - form */}
          <div className="rounded-2xl p-6 md:p-8 haq-reveal-r"
            style={{ background: "linear-gradient(180deg, rgba(20,16,12,.85), rgba(10,9,8,.9))", border: "1px solid rgba(201,168,76,.3)", boxShadow: "0 30px 80px -30px rgba(0,0,0,.7)" }}>
            {sent ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full grid place-items-center mx-auto" style={{ background: "rgba(201,168,76,.15)", color: "#C9A84C" }}>
                  <ArrowRight size={26} />
                </div>
                <h3 className="lp-display text-[24px] text-white font-bold">Message Received</h3>
                <p className="text-[13px] text-[#E8E0D0]">Reference: <span className="text-[#C9A84C] font-semibold">{sent}</span></p>
                <button onClick={() => { setSent(null); setName(""); setEmail(""); setPhone(""); setMsg(""); }}
                  className="px-5 h-10 rounded-full text-[12px] text-[#C9A84C]" style={{ border: "1px solid #C9A84C" }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h3 className="lp-display text-[26px] md:text-[30px] text-white font-semibold leading-tight">
                  Reach To <span className="text-[#C9A84C]">Connect</span><br />With Us
                </h3>
                <p className="text-[12px] text-[#A8A39A] leading-relaxed">
                  We are here to listen, understand, and guide you. Fill out the form and our team will get back to you shortly.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <Field label="Enter Your Name"><input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="contact-field" /></Field>
                  <Field label="Enter Email ID"><input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Id" type="email" className="contact-field" /></Field>
                  <Field label="Enter Your Mobile Number"><input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your Number" className="contact-field" /></Field>
                  <Field label="Choose Case Type">
                    <select value={cat} onChange={e => setCat(e.target.value)} className="contact-field">
                      {CATS.map(c => <option key={c} value={c} style={{ background: "#141414" }}>{c}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Enter Your Message">
                  <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Your Message" rows={4} className="contact-field" />
                </Field>
                <button type="submit" disabled={!canSubmit}
                  className="w-full h-12 rounded-full inline-flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[.22em] text-[#0A0A0A] transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(180deg,#E5C975,#C9A84C)", boxShadow: "0 12px 32px -10px rgba(201,168,76,.6)", opacity: canSubmit ? 1 : .5 }}>
                  Submit Now <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Branch cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BRANCHES.map((b, i) => (
            <div key={b.city} className="haq-reveal" style={{ transitionDelay: `${i * 110}ms` }}>
              <div className={`relative rounded-2xl overflow-hidden p-3 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-15px_rgba(201,168,76,.45)]`}
                style={{ background: "rgba(20,16,12,.85)", border: `1px solid ${b.active ? "#C9A84C" : "rgba(201,168,76,.25)"}` }}>
                <div className="rounded-xl overflow-hidden mb-3" style={{ height: 96 }}>
                  <img src={b.img} alt={b.city} loading="lazy" width={640} height={512}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                </div>
                <div className="px-1 pb-1.5">
                  <div className="text-[13.5px] text-white font-semibold">
                    <span className={b.active ? "text-[#C9A84C]" : ""}>{b.city.split(" ")[0]}</span> Branch
                  </div>
                  <div className="text-[10.5px] text-[#A8A39A] mt-1">{b.line}</div>
                  <a href="#" className="inline-flex items-center gap-1 mt-2 text-[11px] text-[#C9A84C] font-semibold uppercase tracking-[.14em] story-link">
                    Locate Us <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </PublicLayout>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <div className="text-[11px] text-white mb-1.5 font-medium">{label}</div>
    {children}
  </label>
);

export default Contact;
