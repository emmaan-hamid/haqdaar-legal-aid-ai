import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/public/PublicLayout";
import { AlertCircle, Search, Users, MessageSquare, Brain, ShieldCheck, Building2, HeartHandshake, Scale } from "lucide-react";

const PROBLEMS = [
  { title: "People do not know their rights", desc: "Most citizens never read the laws that protect them, leaving them exposed to exploitation." },
  { title: "People cannot navigate legal processes", desc: "Even when rights exist, the procedures and language make justice feel out of reach." },
  { title: "People cannot find free legal help", desc: "Pro bono lawyers exist but stay invisible. Most never connect with the people who need them." },
];

const SOLUTION = [
  { n: "01", title: "Describe Your Problem", desc: "Type in plain Urdu or English. No legal terms required." },
  { n: "02", title: "AI Reads Pakistani Law", desc: "We classify your case, retrieve the law, and explain your rights." },
  { n: "03", title: "Act With Confidence", desc: "Get matched to a free lawyer. Generate documents. Track your case." },
];

const TEAM = [
  { name: "Eman Hamid", initials: "EH" },
  { name: "Muntaha Shahab", initials: "MS" },
  { name: "Tehreem Naveed", initials: "TN" },
];
const TEAM_ROLE = "Software Engineer";
const TEAM_DESC = "Full stack development, requirement gathering, and architecture across the platform.";

const PARTNERS = [
  { name: "AGHS Legal Aid Cell", note: "Legal aid services for women across Punjab.", Icon: ShieldCheck },
  { name: "Rozan", note: "Mental health, gender, and rights based programming.", Icon: HeartHandshake },
  { name: "Aurat Foundation", note: "Women's empowerment and citizen advocacy.", Icon: Building2 },
];

const PROBLEM_ICONS = [Search, AlertCircle, Users];
const SOLUTION_ICONS = [MessageSquare, Brain, Scale];

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
  return (
  <PublicLayout>
    <div ref={dotRef} className="haq-dot-follow" style={{ left: -100, top: -100 }} />
    <div className="lp-fade space-y-20">
      {/* Hero */}
      <div className="text-center space-y-4 pt-4">
        <h1 className="lp-display text-[44px] md:text-[60px] font-bold text-white leading-[1.05] max-w-4xl mx-auto">Justice Was Never Meant to Be Only for the Rich.</h1>
        <p className="text-[16px] text-[#E8E0D0] max-w-2xl mx-auto">HaqDaar is democratizing access to justice through AI. Free. Anonymous. For every Pakistani.</p>
      </div>

      {/* Problem */}
      <section className="space-y-8">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[.22em] text-[#C9A84C] font-semibold">The Problem</div>
          <h2 className="lp-display text-[40px] text-white font-bold mt-2">The Problem</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEMS.map((p, i) => {
            const Icon = PROBLEM_ICONS[i];
            return (
              <div key={p.title} className="haq-card">
                <div className="haq-card-icon mb-5"><Icon size={20} /></div>
                <h3 className="text-[18px] text-white font-semibold leading-snug">{p.title}</h3>
                <p className="text-[13.5px] text-[#B0B3B8] leading-relaxed mt-3">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Solution */}
      <section className="space-y-8">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[.22em] text-[#C9A84C] font-semibold">Our Solution</div>
          <h2 className="lp-display text-[40px] text-white font-bold mt-2">Our Solution</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTION.map((s, i) => {
            const Icon = SOLUTION_ICONS[i];
            return (
              <div key={s.n} className="haq-card">
                <span className="haq-step-num">{s.n}</span>
                <div className="haq-card-icon mb-5"><Icon size={20} /></div>
                <h3 className="text-[18px] text-white font-semibold">{s.title}</h3>
                <p className="text-[13.5px] text-[#B0B3B8] leading-relaxed mt-3">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[.22em] text-[#C9A84C] font-semibold">
            <span className="h-px w-10" style={{ background: "linear-gradient(90deg,transparent,#D4AF37)" }} />
            Our Team
            <span className="h-px w-10" style={{ background: "linear-gradient(90deg,#D4AF37,transparent)" }} />
          </div>
          <h2 className="lp-display text-[44px] text-white font-bold">The Team</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map(m => (
            <div key={m.name} className="haq-card text-center">
              <div className="haq-avatar">{m.initials}</div>
              <h3 className="text-[20px] text-white font-semibold mt-5">{m.name}</h3>
              <div className="text-[13px] text-[#D4AF37] mt-1">{TEAM_ROLE}</div>
              <div className="haq-divider" />
              <p className="text-[13px] text-[#B0B3B8] leading-relaxed">{TEAM_DESC}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="space-y-8" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div className="text-center max-w-[600px] mx-auto">
          <h2 className="lp-display text-[40px] text-white font-bold">Partner Organizations</h2>
          <p className="text-[15px] text-[#A0A0A0] mt-3">We work alongside organizations on the ground delivering rights based programming.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {PARTNERS.map(p => (
            <div key={p.name} className="haq-card">
              <div className="haq-card-icon mb-5"><p.Icon size={20} /></div>
              <div className="text-[19px] text-white font-medium">{p.name}</div>
              <div className="text-[14px] text-[#C0C0C0] mt-2 leading-relaxed">{p.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="haq-cta">
        <h2 className="haq-cta-title">Join the Movement</h2>
        <p className="haq-cta-sub">Help us deliver justice to every Pakistani.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 items-center">
          <Link to="/ngo" className="haq-btn-primary">Register as NGO Partner</Link>
          <Link to="/lawyer" className="haq-btn-secondary">Register as Volunteer Lawyer</Link>
        </div>
      </section>
    </div>
  </PublicLayout>
  );
};

export default About;