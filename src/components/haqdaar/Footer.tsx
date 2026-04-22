import { Facebook, Twitter, Instagram, Linkedin, MessageCircle } from "lucide-react";

const quickLinks = [
  "Home", "How It Works", "Browse Pakistani Law", "Find a Lawyer or NGO",
  "Generate a Legal Document", "Submit Anonymously", "Articles & Blog",
  "FAQ", "About Us", "Contact Us",
];
const categories = [
  "Labor Dispute", "Property Fraud", "Domestic Violence", "Police Misconduct",
  "NADRA Issues", "Consumer Rights", "Harassment",
];
const socials = [Facebook, Twitter, Instagram, Linkedin, MessageCircle];

const ColHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="relative pb-2" style={{ marginBottom: 16 }}>
    <div
      className="font-bold text-gold"
      style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "1.5px" }}
    >
      {children}
    </div>
    <span className="absolute bottom-0 left-0 h-[2px] w-8 bg-gold"/>
  </div>
);

const FooterLink = ({ children }: { children: React.ReactNode }) => (
  <li>
    <a
      href="#"
      className="inline-block text-white/70 transition-colors duration-200 hover:text-gold"
      style={{ fontSize: 13, lineHeight: "2.2" }}
    >
      {children}
    </a>
  </li>
);

export const Footer = () => (
  <footer style={{ background: "#111111" }}>
    <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-8 lg:px-20 lg:py-[60px]">
      {/* COLUMN 1 — Brand (30% ~ 4 of 12) */}
      <div className="lg:col-span-4">
        <div className="flex items-center gap-2">
          <svg width="20" height="16" viewBox="0 0 24 16" fill="none" stroke="hsl(43 53% 54%)" strokeWidth="1.4">
            <path d="M12 2v12M4 6h16M6 6l-3 5h6zM18 6l-3 5h6z" />
          </svg>
          <span className="font-display text-gold" style={{ fontSize: 24, fontWeight: 800 }}>HaqDaar</span>
        </div>
        <p className="mt-3 italic text-white/80" style={{ fontSize: 13 }}>
          Know Your Rights. In Your Language. Resolved by AI.
        </p>
        <p className="mt-3 text-white/60" style={{ fontSize: 13, lineHeight: 1.7 }}>
          AI-Powered Legal Aid for Pakistan. Connecting citizens to their rights, volunteer lawyers,
          and legal documents — completely free.
        </p>
        <div className="my-5 h-px w-3/5 bg-gold/40"/>
        <div className="text-gold" style={{ fontSize: 12, letterSpacing: "1px", textTransform: "uppercase" }}>
          Pakistan's Most Urgent Legal Problem, Solved.
        </div>
        <div
          className="mt-3 inline-flex flex-wrap items-center gap-x-2 gap-y-1"
          style={{ fontSize: 12, color: "#F87171" }}
        >
          🚨 Rozan: <span className="text-white/80">051-2890505</span>
          <span className="text-gold/60">|</span>
          Umang: <span className="text-white/80">0317-4288665</span>
          <span className="text-gold/60">|</span>
          Police: <span className="text-white/80">15</span>
        </div>
      </div>

      {/* COLUMN 2 — Quick Links */}
      <div className="lg:col-span-3">
        <ColHeader>Quick Links</ColHeader>
        <ul>
          {quickLinks.map((l) => <FooterLink key={l}>{l}</FooterLink>)}
        </ul>
      </div>

      {/* COLUMN 3 — Legal Categories */}
      <div className="lg:col-span-2">
        <ColHeader>Legal Categories</ColHeader>
        <ul>
          {categories.map((l) => <FooterLink key={l}>{l}</FooterLink>)}
        </ul>
      </div>

      {/* COLUMN 4 — Contact + Newsletter + Social */}
      <div className="lg:col-span-3">
        <ColHeader>Contact Us</ColHeader>
        <ul className="text-white/70" style={{ fontSize: 13, lineHeight: "2.2" }}>
          <li>📧 support@haqdaar.pk</li>
          <li>📍 Lahore, Pakistan</li>
          <li>⏱ Response: Within 1-2 Business Days</li>
        </ul>

        <div className="my-5 h-px w-full bg-gold/20"/>

        <div className="text-gold" style={{ fontSize: 12, letterSpacing: "1px", textTransform: "uppercase" }}>
          Subscribe to Our Newsletter
        </div>
        <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 text-white placeholder:text-white/40 focus:outline-none"
            style={{
              background: "#2D2D2D",
              border: "1px solid rgba(201,168,76,0.4)",
              borderRadius: 4,
              padding: "10px 14px",
              fontSize: 13,
            }}
          />
          <button
            type="submit"
            className="font-bold transition-transform hover:-translate-y-0.5"
            style={{
              background: "#C9A84C",
              color: "#1A1A1A",
              borderRadius: 4,
              padding: "10px 18px",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-gold" style={{ fontSize: 12, letterSpacing: "1px", textTransform: "uppercase" }}>
          Social Media
        </div>
        <div className="mt-3 flex items-center gap-3.5">
          {socials.map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-gold transition-opacity hover:opacity-100"
              style={{ opacity: 0.7 }}
              aria-label="Social link"
            >
              <Icon size={20}/>
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* DIVIDER */}
    <div className="h-px w-full" style={{ background: "rgba(201,168,76,0.25)" }}/>

    {/* BOTTOM BAR */}
    <div style={{ background: "#0D0D0D" }}>
      <div
        className="mx-auto flex max-w-[1500px] flex-col items-center gap-3 px-6 py-4 text-center lg:flex-row lg:justify-between lg:px-20 lg:text-left"
        style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}
      >
        <div>© 2026 HaqDaar. All Rights Reserved.</div>
        <div>Department of Software Engineering, UMT — Spring 2026</div>
        <div className="flex items-center gap-2">
          <a href="#" className="hover:text-gold">Privacy Policy</a>
          <span className="text-gold/60">|</span>
          <a href="#" className="hover:text-gold">Terms of Use</a>
          <span className="text-gold/60">|</span>
          <a href="#" className="hover:text-gold">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
);
