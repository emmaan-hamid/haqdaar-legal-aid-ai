const quickLinks = [
  "Home", "How It Works", "Browse Pakistani Law", "Find a Lawyer or NGO",
  "Generate a Legal Document", "Submit Anonymously", "Articles & Blog",
  "FAQ", "About Us", "Contact Us",
];
const categories = [
  "Labor Dispute", "Property Fraud", "Domestic Violence", "Police Misconduct",
  "NADRA Issues", "Consumer Rights", "Harassment",
];

const ColHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="relative pb-2">
    <div
      className="text-gold"
      style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}
    >
      {children}
    </div>
    <div className="mt-1 h-[2px] w-8 bg-gold" />
  </div>
);

const SocialIcon = ({ d, label }: { d: string; label: string }) => (
  <a
    href="#"
    aria-label={label}
    className="text-gold transition-opacity duration-200"
    style={{ opacity: 0.7 }}
    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
  </a>
);

export const Footer = () => (
  <footer style={{ background: "#111111" }}>
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-20" style={{ paddingTop: 60, paddingBottom: 40 }}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[3fr_2fr_2fr_3fr]">
        {/* COL 1 */}
        <div>
          <div className="flex items-center gap-2 text-gold" style={{ fontSize: 24, fontWeight: 800, fontFamily: "Cormorant Garamond, serif" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v18M5 6h14M7 6l-3 6h6zM17 6l-3 6h6z"/><path d="M8 21h8"/>
            </svg>
            HaqDaar
          </div>
          <p className="mt-3 italic text-white/80" style={{ fontSize: 13 }}>
            Know Your Rights. In Your Language. Resolved by AI.
          </p>
          <p className="mt-4 text-white/60" style={{ fontSize: 13, lineHeight: 1.7 }}>
            AI-Powered Legal Aid for Pakistan. Connecting citizens to their rights, volunteer lawyers,
            and legal documents — completely free.
          </p>
          <div className="my-5 h-px w-3/5 bg-gold/30" />
          <div className="text-gold" style={{ fontSize: 12, letterSpacing: "1px", textTransform: "uppercase" }}>
            Pakistan's Most Urgent Legal Problem, Solved.
          </div>
          <div className="mt-3 text-[12px]" style={{ color: "#fca5a5" }}>
            🚨 Rozan: 051-2890505 &nbsp;|&nbsp; Umang: 0317-4288665 &nbsp;|&nbsp; Police: 15
          </div>
        </div>

        {/* COL 2 */}
        <div>
          <ColHeader>Quick Links</ColHeader>
          <ul className="mt-4 space-y-1.5">
            {quickLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-white/70 transition-colors duration-200 hover:text-gold" style={{ fontSize: 13, lineHeight: 2.2 }}>{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3 */}
        <div>
          <ColHeader>Legal Categories</ColHeader>
          <ul className="mt-4 space-y-1.5">
            {categories.map((l) => (
              <li key={l}>
                <a href="#" className="text-white/70 transition-colors duration-200 hover:text-gold" style={{ fontSize: 13, lineHeight: 2.2 }}>{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 4 */}
        <div>
          <ColHeader>Contact Us</ColHeader>
          <ul className="mt-4 space-y-1.5 text-white/70" style={{ fontSize: 13, lineHeight: 2.2 }}>
            <li>📧 support@haqdaar.pk</li>
            <li>📍 Lahore, Pakistan</li>
            <li>⏱ Response: Within 1-2 Business Days</li>
          </ul>

          <div className="my-5 h-px w-full bg-gold/20" />

          <div className="text-gold" style={{ fontSize: 12, letterSpacing: "1px", textTransform: "uppercase" }}>
            Subscribe to Our Newsletter
          </div>
          <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 text-white outline-none"
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
              className="font-bold"
              style={{
                background: "#C9A84C", color: "#1A1A1A",
                borderRadius: 4, padding: "10px 18px", fontSize: 13,
              }}
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-gold" style={{ fontSize: 12, letterSpacing: "1px", textTransform: "uppercase" }}>
            Social Media
          </div>
          <div className="mt-3 flex items-center gap-3.5">
            <SocialIcon label="Facebook" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.4v7A10 10 0 0 0 22 12z"/>
            <SocialIcon label="Twitter" d="M18.244 2H21.5l-7.5 8.57L22.5 22H16.08l-5.02-6.56L5.3 22H2.04l8-9.14L1.5 2h6.59l4.54 6.01L18.244 2zm-1.13 18h1.83L7.97 4H6.04l11.07 16z"/>
            <SocialIcon label="Instagram" d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 2.16c-3.14 0-3.5 0-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.26.82-.38.38-.62.75-.82 1.26-.15.39-.33.97-.38 2.04C2.7 8.5 2.7 8.86 2.7 12s0 3.5.06 4.74c.05 1.07.23 1.65.38 2.04.2.51.44.88.82 1.26.38.38.75.62 1.26.82.39.15.97.33 2.04.38 1.24.06 1.6.07 4.74.07s3.5 0 4.74-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.26-.82.38-.38.62-.75.82-1.26.15-.39.33-.97.38-2.04.06-1.24.07-1.6.07-4.74s0-3.5-.07-4.74c-.05-1.07-.23-1.65-.38-2.04a3.4 3.4 0 0 0-.82-1.26 3.4 3.4 0 0 0-1.26-.82c-.39-.15-.97-.33-2.04-.38C15.5 4.36 15.14 4.36 12 4.36zM12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2zm0 7.6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5.84-7.78a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0z"/>
            <SocialIcon label="LinkedIn" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.06c.53-1 1.83-2.05 3.77-2.05C21.7 8.65 22 11.1 22 14v7h-4v-6.2c0-1.5 0-3.4-2.07-3.4-2.07 0-2.4 1.6-2.4 3.3V21h-4V9z"/>
            <SocialIcon label="WhatsApp" d="M20.5 3.5A10.5 10.5 0 0 0 4.06 16.36L3 21l4.78-1.05A10.5 10.5 0 1 0 20.5 3.5zm-8.5 17a8.5 8.5 0 0 1-4.34-1.18l-.31-.18-2.83.62.6-2.76-.2-.32A8.5 8.5 0 1 1 12 20.5zm4.6-6.36c-.25-.13-1.5-.74-1.74-.82-.23-.09-.4-.13-.57.13-.17.25-.65.82-.8.99-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.49-.42-.42-.57-.43h-.49c-.17 0-.45.06-.69.32-.24.25-.91.89-.91 2.18s.93 2.53 1.06 2.7c.13.17 1.84 2.81 4.46 3.94.62.27 1.1.43 1.48.55.62.2 1.18.17 1.62.1.49-.07 1.5-.61 1.71-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.3z"/>
          </div>
        </div>
      </div>
    </div>

    {/* divider */}
    <div className="h-px w-full" style={{ background: "rgba(201,168,76,0.25)" }} />

    {/* bottom bar */}
    <div style={{ background: "#0D0D0D", padding: "16px 24px" }}>
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left lg:px-14">
        <div className="text-white/45" style={{ fontSize: 12 }}>© 2026 HaqDaar. All Rights Reserved.</div>
        <div className="text-white/45" style={{ fontSize: 12 }}>
          Department of Software Engineering, UMT — Spring 2026
        </div>
        <div className="text-white/45" style={{ fontSize: 12 }}>
          <a href="#" className="hover:text-gold">Privacy Policy</a>
          <span className="mx-2 text-gold">|</span>
          <a href="#" className="hover:text-gold">Terms of Use</a>
          <span className="mx-2 text-gold">|</span>
          <a href="#" className="hover:text-gold">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
);
