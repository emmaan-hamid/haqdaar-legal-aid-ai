import { useEffect, useRef, useState } from "react";
import { UserCircle2 } from "lucide-react";

const links = ["Home", "How It Works", "Features", "For Lawyers", "For NGOs", "Know Your Rights"];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[1000] backdrop-blur-md"
      style={{
        background: "rgba(26,26,26,0.96)",
        borderBottom: "1.5px solid rgba(201,168,76,0.6)",
        minHeight: 72,
      }}
    >
      <div className="relative mx-auto flex h-full min-h-[72px] w-full max-w-[1500px] items-center justify-between gap-4 px-6 lg:px-8">
        <a
          href="#"
          className="group flex flex-shrink-0 items-center gap-2 font-display tracking-tight text-white transition-colors duration-300 hover:text-gold"
          style={{ fontSize: 28, fontWeight: 800 }}
        >
          <svg width="22" height="18" viewBox="0 0 24 16" fill="none" stroke="hsl(43 53% 54%)" strokeWidth="1.4" className="transition-transform duration-300 group-hover:-translate-y-0.5">
            <path d="M12 2v12M4 6h16M6 6l-3 5h6zM18 6l-3 5h6z" />
          </svg>
          <span className="relative inline-block leading-none">
            HaqDaar
          </span>
        </a>

        <nav
          className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-9"
        >
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="nav-link whitespace-nowrap font-medium text-white/85"
              style={{ fontSize: 15.5, letterSpacing: "0.3px" }}
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3" ref={ref}>
          <button className="btn-ghost hidden rounded-full px-5 py-2 md:inline-flex" style={{ fontSize: 14.5 }}>Login</button>
          <button className="btn-gold hidden items-center gap-2 rounded-full px-5 py-2 font-semibold md:inline-flex" style={{ fontSize: 14.5 }}>
            Get Started Free
            <UserCircle2 size={16} className="ml-1" />
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-surface text-ivory transition-all duration-300 hover:scale-110 hover:border-gold hover:text-gold hover:shadow-[0_0_22px_-4px_hsl(43_53%_54%/0.6)]"
              aria-label="Profile"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>
              </svg>
            </button>
            {open && (
              <div className="absolute right-0 top-12 w-56 rounded-xl border border-gold/30 bg-surface/95 p-2 shadow-2xl backdrop-blur-md">
                {["My Cases", "Saved Documents", "Settings", "Logout"].map((item, i) => (
                  <button
                    key={item}
                    className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm text-ivory transition-colors hover:bg-elevated hover:text-white ${
                      i === 3 ? "mt-1 border-t border-gold/15 pt-3 text-emergency/90" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
