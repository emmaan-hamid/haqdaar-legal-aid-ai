import { Linkedin, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Col = ({ title, links }: { title: string; links: { label: string; to: string }[] }) => (
  <div>
    <h4 className="text-white font-semibold text-[13px] mb-4 tracking-wide">{title}</h4>
    <ul className="space-y-2.5">
      {links.map(l => (
        <li key={l.label}>
          <Link to={l.to} className="text-[12.5px] text-[#888] hover:text-[#C9A84C] transition-all duration-200 inline-block hover:translate-x-1">{l.label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export const PortalFooter = () => (
  <footer style={{ background: "#0F0E0D", borderTop: "1px solid rgba(201,168,76,.2)" }}>
    {/* Main 4-column */}
    <div className="px-12 pt-14 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <div className="lp-display text-[26px] font-bold text-[#C9A84C] mb-3">HaqDaar</div>
        <div className="text-white font-semibold text-[13px] mb-2">Access to justice for every citizen of Pakistan.</div>
        <p className="text-[#888] text-[12px] leading-relaxed">An AI powered platform connecting verified lawyers, NGOs, and citizens for free legal aid.</p>
      </div>
      <Col title="Platform" links={[
        { label: "Lawyer Portal", to: "/lawyer" },
        { label: "NGO Portal", to: "/ngo" },
        { label: "About Us", to: "/about" },
        { label: "Contact", to: "/contact" },
      ]} />
      <Col title="Legal Resources" links={[
        { label: "Browse Pakistani Laws", to: "/browse-law" },
        { label: "Articles & Blog", to: "/articles" },
        { label: "FAQs", to: "/faq" },
        { label: "Contact Us", to: "/contact" },
      ]} />
      <div>
        <h4 className="text-white font-semibold text-[13px] mb-4">Contact</h4>
        <a href="mailto:support@haqdaar.pk" className="text-[12.5px] text-[#888] hover:text-[#C9A84C] transition-colors">support@haqdaar.pk</a>
        <div className="flex gap-2 mt-4">
          {[Linkedin, Instagram, Twitter, Facebook].map((Icon, i) => (
            <a key={i} href="#" aria-label="social" className="w-9 h-9 rounded-full grid place-items-center text-[#888] transition-all duration-200" style={{ border: "1px solid #2a2a2a" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#C9A84C"; e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.boxShadow = "0 0 14px rgba(201,168,76,.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.boxShadow = ""; }}>
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* Three portal cards strip */}
    <div className="px-12 py-6 grid grid-cols-1 md:grid-cols-3 gap-4" style={{ background: "#141310", borderTop: "1px solid rgba(255,255,255,.05)" }}>
      {[
        { title: "Admin Portal", sub: "Verify lawyers & moderate", href: "#" },
        { title: "NGO Portal", sub: "Manage volunteer outreach", href: "/ngo" },
        { title: "Lawyer Portal", sub: "Take cases pro bono", href: "/lawyer" },
      ].map(c => (
        <a key={c.title} href={c.href} className="rounded-2xl p-5 text-center transition-all duration-300 lp-card-hover" style={{ background: "#0F0E0D", border: "1px solid #C9A84C" }}>
          <div className="w-10 h-10 mx-auto mb-3 rounded-full grid place-items-center" style={{ background: "rgba(201,168,76,.12)", color: "#C9A84C" }}>◈</div>
          <div className="text-[12px] uppercase tracking-[.15em] font-semibold text-[#C9A84C]">{c.title}</div>
          <div className="text-[11px] text-[#888] mt-1">{c.sub}</div>
        </a>
      ))}
    </div>

    {/* Explore links */}
    <div className="px-12 py-5 flex flex-wrap items-center justify-center gap-6 text-[12px]" style={{ background: "#0c0b0a", borderTop: "1px solid rgba(255,255,255,.04)" }}>
      {[
        { label: "About Us", to: "/about" },
        { label: "FAQs", to: "/faq" },
        { label: "Contact", to: "/contact" },
        { label: "Articles", to: "/articles" },
        { label: "Browse Laws", to: "/browse-law" },
      ].map(l => (
        <Link key={l.label} to={l.to} className="text-[#888] hover:text-[#C9A84C] transition-colors">{l.label}</Link>
      ))}
    </div>

    {/* Bottom bar */}
    <div className="px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11.5px] text-[#888]" style={{ background: "#0A0908", borderTop: "1px solid rgba(255,255,255,.04)" }}>
      <span>© 2026 HaqDaar. Built for the people of Pakistan.</span>
      <span className="text-center">Not a law firm. An access to justice platform. <a href="#" className="hover:text-[#C9A84C]">Privacy Policy</a> | <a href="#" className="hover:text-[#C9A84C]">Terms</a></span>
    </div>

    {/* Emergency strip */}
    <div className="px-6 py-3 flex flex-wrap items-center justify-center gap-6 text-[11px]" style={{ background: "#050504" }}>
      <span><span className="text-[#C9A84C] font-bold">Rozan</span> <span className="text-white">051 2890505</span></span>
      <span className="text-[#333]">|</span>
      <span><span className="text-[#C9A84C] font-bold">Umang</span> <span className="text-white">0317 4288665</span></span>
      <span className="text-[#333]">|</span>
      <span><span className="text-[#C9A84C] font-bold">Police</span> <span className="text-white">15</span></span>
    </div>
  </footer>
);
