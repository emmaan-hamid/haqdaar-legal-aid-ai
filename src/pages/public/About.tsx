import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/public/PublicLayout";
import { Shield, Users, Briefcase, FileText, Gavel, Building2, MessageSquareQuote, Check, Scale } from "lucide-react";

const EXPLAINS = [
  { Icon: Scale, title: "Child Abuse", desc: "Understand the laws that protect children from abuse, neglect, and exploitation. Know your rights and how to take legal action." },
  { Icon: Users, title: "Domestic Abuse", desc: "Learn about your legal protections against domestic violence and abuse. We help you understand the law and your options." },
  { Icon: Briefcase, title: "Employee Disputes", desc: "Facing issues at work? We explain your rights related to unfair treatment, harassment, wrongful termination, and workplace disputes." },
];

const MILESTONES = [
  { Icon: FileText, title: "Legal Awareness Campaigns", desc: "Community outreach and legal education programs conducted.", value: "12", year: "2026" },
  { Icon: Gavel, title: "People Empowered", desc: "Individuals guided with legal knowledge and rights awareness.", value: "2,450+", year: "2026" },
  { Icon: Building2, title: "Rights Explained", desc: "Legal topics simplified and explained in easy language.", value: "150+", year: "2026", highlight: true },
  { Icon: Users, title: "Support Queries Addressed", desc: "Legal queries received and responded with clear explanations.", value: "3,200+", year: "2026" },
  { Icon: Scale, title: "Trusted Legal Information", desc: "Accurate and reliable legal information shared for public benefit.", value: "98%", year: "2026" },
];

const TEAM = [
  { name: "Eman Hamid", initials: "EH", role: "Software Engineer", desc: "Designing, developing, implementing, testing, and integrating solutions that empower legal understanding for all." },
  { name: "Muntaha Shahab", initials: "MS", role: "Software Engineer", desc: "Designing, developing, implementing, testing, and integrating solutions that empower legal understanding for all." },
  { name: "Tehreem Naveed", initials: "TN", role: "Software Engineer", desc: "Designing, developing, implementing, testing, and integrating solutions that empower legal understanding for all." },
];

const TESTIMONIALS = [
  { name: "Ayesha Khan", city: "Lahore, Pakistan", initials: "AK" },
  { name: "Usman Ali", city: "Karachi, Pakistan", initials: "UA" },
  { name: "Sana Fatima", city: "Islamabad, Pakistan", initials: "SF" },
  { name: "Bilal Ahmed", city: "Rawalpindi, Pakistan", initials: "BA" },
];

const useDotFollow = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => { if (ref.current) { ref.current.style.left = e.clientX + "px"; ref.current.style.top = e.clientY + "px"; } };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return ref;
};

const About = () => {
  const dotRef = useDotFollow();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".haq-reveal,.haq-reveal-l,.haq-reveal-r");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); }
        else { e.target.classList.remove("in"); }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <PublicLayout>
      <div ref={dotRef} className="haq-dot-follow" style={{ left: -100, top: -100 }} />
      <div className="lp-fade space-y-20">
        {/* Page title */}
        <div className="text-center space-y-3 pt-2 haq-reveal">
          <h1 className="lp-display text-[44px] md:text-[56px] font-semibold text-white leading-tight">About Us</h1>
          <div className="flex items-center justify-center gap-2 text-[13px] text-[#A8A39A]">
            <Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <span className="text-white">About Us</span>
          </div>
        </div>

        {/* Hero: Justice image left, We Explain right, side panel "What We Explain" */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Image card */}
          <div className="lg:col-span-5 relative rounded-[20px] overflow-hidden haq-reveal-l" style={{ border: "1px solid rgba(201,168,76,.3)", minHeight: 460 }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(201,168,76,.18), transparent 60%), linear-gradient(180deg,#1a1410,#0a0908)" }} />
            <div className="absolute inset-0 grid place-items-center opacity-[.18]">
              <Scale size={280} className="text-[#C9A84C]" strokeWidth={0.6} />
            </div>
            {/* Associate Partner's overlay */}
            <div className="absolute left-5 right-5 bottom-5 rounded-xl px-5 py-4" style={{ border: "1px solid rgba(201,168,76,.5)", background: "rgba(10,10,10,.8)", backdropFilter: "blur(6px)" }}>
              <div className="text-[12px] text-white font-semibold mb-3">Associate Partner's</div>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { t: "Law Firm", s: "Legal Solutions" },
                  { t: "Justice", s: "" },
                  { t: "Attorney", s: "At Law" },
                  { t: "Lawyer", s: "" },
                ].map(p => (
                  <div key={p.t} className="text-[#C9A84C]">
                    <Scale size={18} className="mx-auto mb-1.5" />
                    <div className="text-[9px] uppercase tracking-[.12em] text-white font-semibold">{p.t}</div>
                    {p.s && <div className="text-[8px] uppercase tracking-[.1em] text-[#A8A39A]">{p.s}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center content + side panel */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 haq-reveal-r">
            <div className="space-y-5">
              <div className="haq-eyebrow">About Us</div>
              <h2 className="lp-display text-[34px] md:text-[40px] font-semibold text-white leading-[1.15]">
                We Explain <span className="text-[#C9A84C]">The Law.</span><br />
                You Understand Your <span className="text-[#C9A84C]">Rights.</span>
              </h2>
              <p className="text-[13.5px] text-[#A8A39A] leading-relaxed max-w-[480px]">
                At HaqDaar, we simplify complex legal matters and help you understand your rights in clear, easy-to-understand language. Whether you are facing a legal challenge or just need clarity, we are here to guide you with trusted legal knowledge.
              </p>
              <div className="space-y-5 pt-2">
                {EXPLAINS.map(e => (
                  <div key={e.title} className="haq-feature-row group">
                    <div className="haq-feature-ico transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(201,168,76,.5)]"><e.Icon size={20} /></div>
                    <div>
                      <div className="text-[15px] text-white font-semibold mb-1">{e.title}</div>
                      <p className="text-[12.5px] text-[#A8A39A] leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Explain side panel */}
            <div className="space-y-4 md:pl-5" style={{ borderLeft: "1px solid rgba(201,168,76,.2)" }}>
              <Scale size={26} className="text-[#C9A84C]" />
              <div className="text-[16px] text-white font-semibold">What We Explain</div>
              <p className="text-[12px] text-[#A8A39A] leading-relaxed">We provide clear legal explanations on:</p>
              <ul className="space-y-3">
                {[
                  { t: "FIR", d: "Your rights when filing or facing an FIR." },
                  { t: "Police Misconduct", d: "Know your rights against abuse of power and unlawful behavior." },
                ].map(i => (
                  <li key={i.t} className="flex gap-2">
                    <Check size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[12px] text-white font-semibold">{i.t}</div>
                      <div className="text-[11px] text-[#A8A39A] leading-relaxed">{i.d}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,.5),transparent)" }} />
              <div className="text-[13px] text-white font-semibold">This is not a consultation.</div>
              <p className="text-[11.5px] text-[#A8A39A] leading-relaxed">We discuss the problem and explain the relevant laws and your rights in simple terms.</p>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="space-y-10 pt-4 haq-reveal" style={{ borderTop: "1px solid rgba(201,168,76,.15)" }}>
          <div className="text-center space-y-3 pt-10">
            <div className="haq-eyebrow">| My HaqDaar Proposal |</div>
            <h2 className="lp-display text-[36px] md:text-[42px] font-semibold text-white">Success Of <span className="text-[#C9A84C]">Milestone</span> Year</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {MILESTONES.map(m => (
              <div key={m.title} className="text-center group transition-all duration-300 hover:-translate-y-1">
                <div className={`mx-auto w-16 h-16 rounded-xl grid place-items-center mb-4 transition-all duration-300 ${m.highlight ? "" : "group-hover:bg-[rgba(201,168,76,.1)]"}`}
                  style={m.highlight ? { background: "linear-gradient(180deg,#E5C975,#C9A84C)", color: "#0A0A0A", boxShadow: "0 0 26px rgba(201,168,76,.55)" } : { color: "#C9A84C", border: "1px solid rgba(201,168,76,.3)" }}>
                  <m.Icon size={24} />
                </div>
                <div className="text-[13px] text-white font-semibold leading-tight px-2">{m.title}</div>
                <p className="text-[11px] text-[#A8A39A] mt-2 px-2 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
          {/* Dotted timeline with dots + values */}
          <div className="relative pt-4">
            <div className="haq-milestone-line" />
            <div className="absolute inset-x-0 top-2 grid grid-cols-5">
              {MILESTONES.map((_, i) => (
                <div key={i} className="flex justify-center"><div className="haq-milestone-dot" /></div>
              ))}
            </div>
            <div className="grid grid-cols-5 mt-6 text-center">
              {MILESTONES.map(m => (
                <div key={m.value}>
                  <div className="lp-display text-[32px] md:text-[40px] font-bold text-white">{m.value}</div>
                  <div className="text-[11px] text-[#A8A39A] mt-1">{m.year}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team — with card swap (3D flip) animation */}
        <section className="space-y-10">
          <div className="text-center space-y-3 haq-reveal">
            <div className="haq-eyebrow">| Our Team |</div>
            <h2 className="lp-display text-[36px] md:text-[42px] font-semibold text-white">Meet Our <span className="text-[#C9A84C]">Team</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((m, i) => (
              <div key={m.name} className={`haq-flip ${i % 2 === 0 ? "haq-reveal-l" : "haq-reveal-r"}`} style={{ height: 250, transitionDelay: `${i * 120}ms` }}>
                <div className="haq-flip-inner">
                  {/* Front */}
                  <div className="haq-flip-face">
                    <div className="w-14 h-14 rounded-lg grid place-items-center mb-4" style={{ background: "rgba(201,168,76,.08)", border: "1px solid rgba(201,168,76,.4)", color: "#C9A84C" }}>
                      <Users size={22} />
                    </div>
                    <div className="lp-display text-[20px] text-[#C9A84C] font-semibold mb-3">{m.name}</div>
                    <p className="text-[12.5px] text-[#A8A39A] leading-relaxed max-w-[260px]">{m.desc}</p>
                    <div className="haq-divider mt-3" />
                  </div>
                  {/* Back */}
                  <div className="haq-flip-face haq-flip-back">
                    <div className="haq-avatar mb-3" style={{ width: 64, height: 64, fontSize: 22 }}>{m.initials}</div>
                    <div className="lp-display text-[22px] text-white font-semibold">{m.name}</div>
                    <div className="text-[12px] text-[#C9A84C] uppercase tracking-[.18em] mt-1">{m.role}</div>
                    <p className="text-[12px] text-[#E8E0D0] mt-3 max-w-[240px]">Building HaqDaar with care, code, and conviction.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What People Say */}
        <section className="space-y-10">
          <div className="text-center space-y-3 haq-reveal">
            <div className="haq-eyebrow">| What People Say |</div>
            <h2 className="lp-display text-[36px] md:text-[42px] font-semibold text-white">What Our <span className="text-[#C9A84C]">Community</span> Says</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="haq-qflip haq-reveal" style={{ height: 230, transitionDelay: `${i * 100}ms` }}>
                <div className="haq-qflip-inner">
                  <div className="haq-qflip-face">
                    <MessageSquareQuote size={22} className="text-[#C9A84C] mb-3" />
                    <p className="text-[12.5px] text-[#E8E0D0] leading-relaxed mb-5 flex-1">HaqDaar helped me understand my rights in a very difficult time. The explanation was clear, simple and easy to follow.</p>
                    <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid rgba(201,168,76,.15)" }}>
                      <div className="w-9 h-9 rounded-full grid place-items-center text-[#0A0A0A] text-[12px] font-bold" style={{ background: "linear-gradient(180deg,#F0D77D,#C9A84C)" }}>{t.initials}</div>
                      <div>
                        <div className="text-[13px] text-white font-semibold">{t.name}</div>
                        <div className="text-[11px] text-[#A8A39A]">{t.city}</div>
                      </div>
                    </div>
                  </div>
                  <div className="haq-qflip-face haq-qflip-back">
                    <div className="haq-avatar mb-3" style={{ width: 56, height: 56, fontSize: 18 }}>{t.initials}</div>
                    <div className="text-[14px] text-white font-semibold">{t.name}</div>
                    <div className="text-[11px] text-[#C9A84C] uppercase tracking-[.18em] mt-1">{t.city}</div>
                    <p className="text-[11.5px] text-[#E8E0D0] mt-3 max-w-[220px]">"Clarity, courage, and trusted guidance — every step of the way."</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default About;
