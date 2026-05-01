import { ArrowRight, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const informationLinks = ["About Us", "Our Mission", "Research", "Privacy Policy", "Terms of Use"];
const legalDomains = ["Labor Disputes", "Domestic Violence", "Property Fraud", "Police Misconduct", "Consumer Rights"];

const VerticalLabel = ({ text }: { text: string }) => (
  <div
    className="hidden lg:flex items-center justify-center text-[10px] tracking-[0.4em] text-gold/70 font-medium uppercase"
    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
  >
    {text}
  </div>
);

export const Footer = () => (
  <footer className="border-t border-gold/30" style={{ background: "#080808" }}>
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr_1fr]">
        {/* Section 1: Brand & Information */}
        <div className="relative flex gap-6 lg:pr-8 lg:border-r lg:border-white/10 pb-10 lg:pb-0">
          <div className="flex-1">
            <div className="font-display text-3xl font-bold text-white">HaqDaar</div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/80 max-w-xs">
              An AI-powered platform dedicated to empowering Pakistani citizens with legal literacy and free legal aid.
            </p>

            <ul className="mt-8 space-y-2.5">
              {informationLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="inline-block text-sm text-ivory/85 transition-colors duration-300 hover:text-gold"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <VerticalLabel text="Information" />
        </div>

        {/* Section 2: Newsletter & Contact */}
        <div className="lg:px-8 lg:border-r lg:border-white/10 py-10 lg:py-0 border-y lg:border-y-0 border-white/10">
          <h3 className="font-display text-2xl font-semibold text-white">
            Subscribe To Our Newsletter
          </h3>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-5 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter Your Email ID"
              className="flex-1 h-12 rounded-md border border-white/15 bg-white/[0.03] px-4 text-sm text-ivory placeholder:text-muted-foreground transition-all duration-300 focus:border-gold focus:outline-none focus:shadow-[0_0_0_3px_hsl(43_53%_54%/0.15)]"
            />
            <button
              type="submit"
              className="btn-gold inline-flex items-center justify-center gap-2 rounded-md px-5 h-12 text-xs font-semibold uppercase tracking-wider"
            >
              Submit Now
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="label-accent">Reg Office</div>
              <p className="mt-2 text-sm text-ivory/85 leading-relaxed">Lahore, Pakistan</p>
            </div>
            <div>
              <div className="label-accent">Contact No</div>
              <p className="mt-2 text-sm text-ivory/85 leading-relaxed">
                Emergency Helpline:<br />
                <span className="text-white">051-2890505</span> (Rozan)
              </p>
            </div>
            <div>
              <div className="label-accent">Email Id</div>
              <p className="mt-2 text-sm text-ivory/85 leading-relaxed break-all">
                support@haqdaar.com.pk
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Our Expertise */}
        <div className="relative flex gap-6 lg:pl-8 pt-10 lg:pt-0">
          <div className="flex-1">
            <h3 className="font-display text-2xl font-semibold text-white">Legal Domains</h3>
            <ul className="mt-6 space-y-2.5">
              {legalDomains.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="inline-block text-sm text-ivory/85 transition-colors duration-300 hover:text-gold"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>

            <p
              className="mt-8 text-[12px] leading-relaxed text-ivory/85"
              style={{
                background: "hsl(var(--emergency) / 0.08)",
                borderLeft: "3px solid hsl(var(--emergency))",
                padding: "10px 14px",
                borderRadius: 4,
              }}
            >
              In danger? Use Quick Exit or call Rozan: <span className="text-white">051-2890505</span>
            </p>
          </div>
          <VerticalLabel text="Our Expertise" />
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-white/10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-6 py-6 text-[12px] text-ivory/70 lg:grid-cols-3 lg:items-center lg:px-10">
        <div>Empowering 70% of Pakistan's population through technology</div>
        <div className="flex items-center justify-start lg:justify-center gap-3">
          <span className="text-ivory/60 mr-1">Social Media:</span>
          {[
            { Icon: Facebook, label: "Facebook" },
            { Icon: Twitter, label: "X" },
            { Icon: Linkedin, label: "LinkedIn" },
            { Icon: Youtube, label: "YouTube" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-ivory/80 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
        <div className="lg:text-right">Copyright @HaqDaar.com. All Rights Reserved 2026</div>
      </div>
    </div>
  </footer>
);
