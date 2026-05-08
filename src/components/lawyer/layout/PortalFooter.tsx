import { ArrowRight, Facebook, Twitter, Instagram, Youtube, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const BORDER = "1px solid rgba(201,168,76,.18)";

const ColLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-[13px] text-[#A8A39A] hover:text-[#C9A84C] transition-all duration-200 inline-block hover:translate-x-0.5">{children}</Link>
);

export const PortalFooter = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const reveal = (delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
  });
  return (
  <footer ref={ref} style={{ background: "#0B0A09", borderTop: BORDER }}>
    <div className="mx-auto max-w-[1400px] px-8 lg:px-12 pt-12 pb-8">
      {/* Top grid: 5 columns on lg */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Brand */}
        <div className="lg:col-span-3" style={reveal(0)}>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-lg grid place-items-center" style={{ background: "rgba(201,168,76,.12)", border: "1px solid rgba(201,168,76,.4)" }}>
              <Scale size={18} className="text-[#C9A84C]" />
            </div>
            <div>
              <div className="lp-display text-[20px] font-bold text-white leading-none">HaqDaar</div>
              <div className="text-[10px] text-[#C9A84C] tracking-[.2em] uppercase mt-0.5">Your Right, AI</div>
            </div>
          </div>
          <p className="text-[12.5px] text-[#A8A39A] leading-relaxed">
            Empowering justice for everyone. AI-driven legal assistance, transparent and accessible.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-[12.5px] text-[#A8A39A]">
            <Link to="/about" className="hover:text-[#C9A84C] transition-colors underline-offset-4 hover:underline">About Us</Link>
            <span className="text-[#3a3631]">|</span>
            <a href="#" className="hover:text-[#C9A84C] transition-colors underline-offset-4 hover:underline">Careers</a>
            <span className="text-[#3a3631]">|</span>
            <a href="#" className="hover:text-[#C9A84C] transition-colors underline-offset-4 hover:underline">Press</a>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2 text-[12.5px] text-[#A8A39A]">
            <a href="#" className="hover:text-[#C9A84C] transition-colors underline-offset-4 hover:underline">Privacy Policy</a>
            <span className="text-[#3a3631]">|</span>
            <a href="#" className="hover:text-[#C9A84C] transition-colors underline-offset-4 hover:underline">Terms Of Use</a>
          </div>
        </div>

        {/* Newsletter + contact blocks */}
        <div className="lg:col-span-4 lg:px-6" style={{ borderLeft: BORDER, borderRight: BORDER, ...reveal(120) }}>
          <h4 className="text-center text-white text-[15px] font-medium mb-4">Subscribe To Our Newsletter</h4>
          <form onSubmit={e => e.preventDefault()} className="space-y-3 max-w-[320px] mx-auto">
            <input type="email" placeholder="Enter Your Email ID" className="w-full px-4 h-11 rounded-full text-[13px] text-white placeholder:text-[#666] outline-none transition-all duration-300"
              style={{ background: "transparent", border: "1px solid rgba(201,168,76,.3)" }}
              onFocus={e => { e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.boxShadow = "0 0 14px rgba(201,168,76,.3)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,.3)"; e.currentTarget.style.boxShadow = ""; }}
            />
            <button type="submit" className="w-full h-11 rounded-full inline-flex items-center justify-center gap-2 text-[11.5px] font-bold uppercase tracking-[.2em] text-[#0A0A0A] transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "linear-gradient(180deg,#E5C975,#C9A84C)", boxShadow: "0 6px 20px -6px rgba(201,168,76,.6)" }}>
              Submit Now <ArrowRight size={13} />
            </button>
          </form>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-[12px] text-white font-semibold mb-1.5">Reg Office</div>
              <p className="text-[11px] text-[#A8A39A] leading-relaxed">24 Constitution Avenue<br />Islamabad, Pakistan<br />44000</p>
            </div>
            <div>
              <div className="text-[12px] text-white font-semibold mb-1.5">Contact No</div>
              <p className="text-[11px] text-[#A8A39A] leading-relaxed">+92 300 1234567<br />+92 51 1234567</p>
            </div>
            <div>
              <div className="text-[12px] text-white font-semibold mb-1.5">Email Id</div>
              <p className="text-[11px] text-[#A8A39A] leading-relaxed break-all">info@haqdaar.pk</p>
            </div>
          </div>
        </div>

        {/* Our Expertise */}
        <div className="lg:col-span-2" style={reveal(240)}>
          <h4 className="text-[12px] uppercase tracking-[.18em] text-[#C9A84C] font-bold mb-4">Our Expertise</h4>
          <ul className="space-y-2.5">
            <li><ColLink to="#">Child Abuse</ColLink></li>
            <li><ColLink to="#">Domestic Abuse</ColLink></li>
            <li><ColLink to="#">Employee Disputes</ColLink></li>
            <li><ColLink to="#">FIR</ColLink></li>
            <li><ColLink to="#">Police Misconduct</ColLink></li>
          </ul>
        </div>

        {/* Public Pages */}
        <div className="lg:col-span-3" style={reveal(320)}>
          <h4 className="text-[12px] uppercase tracking-[.18em] text-[#C9A84C] font-bold mb-4">Public Pages</h4>
          <ul className="space-y-2.5">
            <li><ColLink to="/about">About Us</ColLink></li>
            <li><ColLink to="/faq">FAQ</ColLink></li>
            <li><ColLink to="/contact">Contact Us</ColLink></li>
            <li><ColLink to="/browse-law">Browse Laws</ColLink></li>
            <li><ColLink to="/articles">Articles</ColLink></li>
          </ul>
        </div>
      </div>

      {/* Our Portals — full row below */}
      <div className="mt-10 pt-6" style={{ borderTop: BORDER, ...reveal(420) }}>
        <h4 className="text-[12px] uppercase tracking-[.18em] text-[#C9A84C] font-bold mb-4 text-center">Our Portals</h4>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            { label: "Admin Portal", to: "#" },
            { label: "NGO Portal", to: "/ngo" },
            { label: "Lawyer Portal", to: "/lawyer" },
          ].map(p => (
            <Link key={p.label} to={p.to} className="px-5 h-10 inline-flex items-center rounded-full text-[12.5px] text-[#E8E0D0] hover:text-[#C9A84C] transition-all duration-300 hover:scale-105"
              style={{ border: "1px solid rgba(201,168,76,.3)", background: "rgba(201,168,76,.04)" }}>
              {p.label}
            </Link>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="px-8 lg:px-12 py-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center" style={{ background: "#080706", borderTop: BORDER, ...reveal(520) }}>
      <div className="text-[12px] text-[#A8A39A]">
        Hire One Of Our Legal Experts This Very Day.<br />
        <span className="text-white">Emergency Call:</span> <a href="tel:+923174288665" className="text-[#C9A84C] hover:underline">+92-317-4288665</a>
      </div>
      <div className="flex flex-col items-center gap-2.5">
        <span className="text-[12px] text-[#A8A39A]">Follow Us</span>
        <div className="flex items-center gap-2.5">
          {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
            <a key={i} href="#" aria-label="social" className="w-8 h-8 rounded-full grid place-items-center text-[#C9A84C] transition-all duration-300 hover:scale-110"
              style={{ background: "rgba(201,168,76,.08)", border: "1px solid rgba(201,168,76,.35)" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 14px rgba(201,168,76,.5)"; e.currentTarget.style.background = "rgba(201,168,76,.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.background = "rgba(201,168,76,.08)"; }}>
              <Icon size={13} />
            </a>
          ))}
        </div>
      </div>
      <div className="text-[12px] text-[#A8A39A] md:text-right">
        Copyright @HaqDaar.com, All Rights Reserved 2026
      </div>
    </div>
  </footer>
  );
};
