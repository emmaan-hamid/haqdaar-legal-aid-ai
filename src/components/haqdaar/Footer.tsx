import { ArrowRight, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const informationLinks = ["Privacy Policy", "User Rights"];
const legalDomains = ["Labor Law", "Domestic Violence", "Property Fraud", "Police Misconduct"];

const VerticalLabel = ({ text }: { text: string }) => (
  <div
    className="hidden lg:flex items-center justify-center text-[10px] tracking-[0.45em] text-white/30 font-medium uppercase"
    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
  >
    {text}
  </div>
);

export const Footer = () => (
  <footer className="border-t border-white/10" style={{ background: "#121212" }}>
    <div className="mx-auto max-w-[1400px]">
      {/* TOP HALF — 3 equal columns separated by vertical 1px lines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x lg:divide-white/10">
        {/* Column 1: Brand + Information */}
        <div className="relative flex gap-4 px-8 py-14 lg:px-12 lg:py-16">
          <div className="flex-1 min-w-0">
            <div className="font-display text-3xl font-bold text-white tracking-tight">
              HaqDaar
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/65 max-w-xs">
              An AI-powered platform dedicated to empowering Pakistani citizens with legal literacy and free legal aid.
            </p>
            <ul className="mt-8 space-y-3">
              {informationLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-white/80 transition-colors duration-300 hover:text-gold"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <VerticalLabel text="Information" />
        </div>

        {/* Column 2: Newsletter + sub-info */}
        <div className="px-8 py-14 lg:px-12 lg:py-16 border-t border-b lg:border-0 border-white/10">
          <h3 className="font-display text-[26px] leading-tight font-semibold text-white">
            Subscribe To Our Newsletter
          </h3>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] p-1.5 pl-5 focus-within:border-gold/60 transition-colors duration-300"
          >
            <input
              type="email"
              placeholder="Enter Your Email ID"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            />
            <button
              type="submit"
              className="btn-gold inline-flex items-center gap-2 rounded-full px-5 h-10 text-[11px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
            >
              Submit Now
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-10 grid grid-cols-3 gap-5">
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

        {/* Column 3: Our Expertise */}
        <div className="relative flex gap-4 px-8 py-14 lg:px-12 lg:py-16">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-[26px] leading-tight font-semibold text-white">
              Our Expertise
            </h3>
            <ul className="mt-6 space-y-3">
              {legalDomains.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-white/80 transition-colors duration-300 hover:text-gold"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <VerticalLabel text="Our Expertise" />
        </div>
      </div>

      {/* BOTTOM HALF — 30 / 40 / 30 with vertical dividers */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr_3fr] border-t border-white/10 lg:divide-x lg:divide-white/10">
        <div className="px-8 py-6 lg:px-12 text-[12px] text-white/65">
          Emergency Support: <span className="text-white">0317-4288665</span> (Umang)
        </div>
        <div className="px-8 py-6 lg:px-12 flex items-center gap-4 justify-start lg:justify-center border-t border-b lg:border-0 border-white/10">
          <span className="text-[12px] font-semibold text-white">Social Media</span>
          <div className="flex items-center gap-2.5">
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
                className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
        <div className="px-8 py-6 lg:px-12 text-[12px] text-white/65 lg:text-right">
          Copyright @HaqDaar.com. All Rights Reserved 2026
        </div>
      </div>
    </div>
  </footer>
);
