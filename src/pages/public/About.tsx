import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/public/PublicLayout";

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
  { name: "Eman Hamid", role: "Software Engineering Student", bio: "Full stack development, requirements gathering, deployment." },
  { name: "Muntaha Shahab", role: "Software Engineering Student", bio: "Backend, AI integration, testing, and documentation." },
  { name: "Tehreem Naveed", role: "Software Engineering Student", bio: "UI design, frontend implementation, and quality assurance." },
];

const TECH = ["XLM RoBERTa", "GPT 4", "ChromaDB", "LangChain", "Django", "Next.js"];
const PARTNERS = [
  { name: "AGHS Legal Aid Cell", note: "Legal aid for women" },
  { name: "Rozan", note: "Mental health and rights" },
  { name: "Aurat Foundation", note: "Women's empowerment" },
];

const About = () => (
  <PublicLayout>
    <div className="lp-fade space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 pt-4">
        <h1 className="lp-display text-[44px] md:text-[60px] font-bold text-white leading-[1.05] max-w-4xl mx-auto">Justice Was Never Meant to Be Only for the Rich.</h1>
        <p className="text-[16px] text-[#E8E0D0] max-w-2xl mx-auto">HaqDaar is democratizing access to justice through AI. Free. Anonymous. For every Pakistani.</p>
      </div>

      {/* Problem */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">The Problem</div>
          <h2 className="lp-display text-[36px] text-white font-bold mt-2">Justice in Pakistan is Inaccessible</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROBLEMS.map((p, i) => (
            <div key={p.title} className="lp-card lp-card-hover p-6 space-y-3">
              <div className="w-11 h-11 rounded-xl grid place-items-center font-semibold text-[#C9A84C]" style={{ background: "rgba(201,168,76,.12)", border: "1px solid rgba(201,168,76,.4)" }}>0{i + 1}</div>
              <h3 className="text-[17px] text-white font-semibold">{p.title}</h3>
              <p className="text-[13px] text-[#E8E0D0] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solution */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">Our Solution</div>
          <h2 className="lp-display text-[36px] text-white font-bold mt-2">Three Steps. No Legal Knowledge Needed.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SOLUTION.map(s => (
            <div key={s.n} className="lp-card lp-card-hover p-6 space-y-3">
              <div className="lp-display text-[36px] font-bold text-[#C9A84C] leading-none">{s.n}</div>
              <h3 className="text-[17px] text-white font-semibold">{s.title}</h3>
              <p className="text-[13px] text-[#E8E0D0] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">The Team</div>
          <h2 className="lp-display text-[36px] text-white font-bold mt-2">Built by Software Engineering Students</h2>
          <p className="text-[13.5px] text-[#888] mt-2 max-w-2xl mx-auto">From requirements gathering to deployment, each member holds equal importance across development, testing, and design.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TEAM.map(m => (
            <div key={m.name} className="lp-card lp-card-hover p-6 text-center space-y-3">
              <div className="w-20 h-20 rounded-full mx-auto grid place-items-center text-[#C9A84C] lp-display text-[24px] font-bold" style={{ background: "rgba(201,168,76,.1)", border: "2px solid #C9A84C" }}>
                {m.name.split(" ").map(s => s[0]).join("")}
              </div>
              <h3 className="text-[17px] text-white font-semibold">{m.name}</h3>
              <div className="text-[12px] text-[#888]">{m.role}</div>
              <p className="text-[12.5px] text-[#E8E0D0]">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">Powered By</div>
          <h2 className="lp-display text-[36px] text-white font-bold mt-2">Modern Open Tech</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TECH.map(t => (
            <div key={t} className="lp-card lp-card-hover p-5 text-center text-[13px] font-semibold text-white">{t}</div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">Partner Organizations</div>
          <h2 className="lp-display text-[36px] text-white font-bold mt-2">Pilot Testing With</h2>
          <p className="text-[13.5px] text-[#888] mt-2">We are actively partnering with these organizations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PARTNERS.map(p => (
            <div key={p.name} className="lp-card lp-card-hover p-6 text-center space-y-2">
              <div className="text-[16px] text-white font-semibold">{p.name}</div>
              <div className="text-[12.5px] text-[#888]">{p.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-card p-10 text-center space-y-4" style={{ background: "rgba(201,168,76,.08)" }}>
        <h2 className="lp-display text-[28px] text-white font-bold">Join the Movement</h2>
        <p className="text-[14px] text-[#E8E0D0] max-w-xl mx-auto">Whether you can give time, expertise, or organizational support — there is a place for you.</p>
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <Link to="/lawyer" className="lp-btn lp-btn-gold">Register as Volunteer Lawyer</Link>
          <Link to="/ngo" className="lp-btn lp-btn-gold-solid">Register as NGO Partner</Link>
        </div>
      </section>
    </div>
  </PublicLayout>
);

export default About;