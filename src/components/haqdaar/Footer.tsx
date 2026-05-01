import { ArrowRight, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const informationLinks = ["Privacy Policy", "User Rights"];
const legalDomains = ["Labor Law", "Domestic Violence", "Property Fraud", "Police Misconduct"];

const BORDER = "1px solid #ffffff20";

const VerticalLabel = ({ text }: { text: string }) => (
  <div
    className="hidden lg:flex items-center justify-center text-[10px] tracking-[0.45em] text-white/30 font-medium uppercase shrink-0"
    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
  >
    {text}
  </div>
);

export const Footer = () => (
  <footer style={{ background: "#121212", borderTop: BORDER }}>
    <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
      {/* 3x2 Architectural Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* === ROW 1 === */}
        {/* R1C1: Brand + Information */}
        <div
          className="relative flex gap-4 px-8 lg:px-10"
          style={{
            paddingTop: 60,
            paddingBottom: 60,
            borderRight: BORDER,
            borderBottom: BORDER,
          }}
        >
          <div className="flex-1 min-w-0">
            <div className="font-display text-[28px] font-bold text-white tracking-tight leading-none">
              HaqDaar
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-white/65 max-w-xs">
              An AI-powered platform dedicated to empowering Pakistani citizens with legal literacy and free legal aid.
            </p>
            <ul className="mt-6 space-y-2.5">
              {informationLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[14px] text-white/80 transition-colors duration-300 hover:text-gold"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <VerticalLabel text="Information" />
        </div>

        {/* R1C2: Newsletter + sub-info */}
        <div
          className="px-8 lg:px-10"
          style={{
            paddingTop: 60,
            paddingBottom: 60,
            borderRight: BORDER,
            borderBottom: BORDER,
          }}
        >
          <h3 className="font-display text-[22px] leading-tight font-semibold text-white">
            Subscribe To Our Newsletter
          </h3>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-5 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] p-1 pl-4 focus-within:border-gold/60 transition-colors duration-300"
          >
            <input
              type="email"
              placeholder="Enter Your Email ID"
              className="flex-1 bg-transparent text-[13px] text-white placeholder:text-white/40 outline-none"
            />
            <button
              type="submit"
              className="btn-gold inline-flex items-center gap-1.5 rounded-full px-4 h-9 text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
            >
              Submit Now
              <ArrowRight size={12} />
            </button>
          </form>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Reg Office</div>
              <p className="mt-2 text-[13px] text-white/85 leading-relaxed">Lahore, Pakistan</p>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Contact No</div>
              <p className="mt-2 text-[13px] text-white/85 leading-relaxed">051-2890505</p>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Email Id</div>
              <p className="mt-2 text-[13px] text-white/85 leading-relaxed break-all">info@haqdaar.com.pk</p>
            </div>
          </div>
        </div>

        {/* R1C3: Our Expertise */}
        <div
          className="relative flex gap-4 px-8 lg:px-10"
          style={{
            paddingTop: 60,
            paddingBottom: 60,
            borderBottom: BORDER,
          }}
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-[22px] leading-tight font-semibold text-white">
              Our Expertise
            </h3>
            <ul className="mt-5 space-y-2.5">
              {legalDomains.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[14px] text-white/80 transition-colors duration-300 hover:text-gold"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <VerticalLabel text="Our Expertise" />
        </div>

        {/* === ROW 2 === */}
        {/* R2C1: Emergency */}
        <div
          className="px-8 lg:px-10 py-6 text-[14px] text-white/65 flex items-center"
          style={{ borderRight: BORDER }}
        >
          Emergency:&nbsp;<span className="text-white">0317-4288665</span>&nbsp;(Umang)
        </div>

        {/* R2C2: Social */}
        <div
          className="px-8 lg:px-10 py-6 flex items-center gap-3 justify-start lg:justify-center"
          style={{ borderRight: BORDER }}
        >
          <span className="text-[13px] font-semibold text-white">Social Media</span>
          <div className="flex items-center gap-2">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Twitter, label: "X" },
              { Icon: Instagram, label: "Threads" },
              { Icon: Youtube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-7 w-7 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10"
              >
                <Icon size={12} />
              </a>
            ))}
          </div>
        </div>

        {/* R2C3: Copyright */}
        <div className="px-8 lg:px-10 py-6 text-[14px] text-white/65 lg:text-right flex items-center lg:justify-end">
          © HaqDaar.com 2026 — All Rights Reserved
        </div>
      </div>
    </div>
  </footer>
);
