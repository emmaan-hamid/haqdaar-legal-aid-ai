import { useEffect, useRef, useState } from "react";

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
        background: "#1A1A1A",
        minHeight: 72,
        borderBottom: "1.5px solid rgba(201, 168, 76, 0.6)",
      }}
    >
      <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between" style={{ minHeight: 72, paddingLeft: 24, paddingRight: 24 }}>
        <a
          href="#"
          className="group relative z-10 flex items-center gap-2 font-display tracking-tight text-white transition-colors duration-300 hover:text-gold"
          style={{ fontSize: 28, fontWeight: 800 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(43 53% 54%)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3v18M5 6h14M7 6l-3 6h6zM17 6l-3 6h6z"/>
            <path d="M8 21h8"/>
          </svg>
          <span className="leading-none">HaqDaar</span>
        </a>

        <nav className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
          <div className="pointer-events-auto flex items-center gap-7 xl:gap-9">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="nav-link whitespace-nowrap font-medium text-white/85 transition-colors duration-200 hover:text-gold"
                style={{ fontSize: 15.5, fontWeight: 500, letterSpacing: "0.3px" }}
              >
                {l}
              </a>
            ))}
          </div>
        </nav>

        <div className="relative z-10 flex flex-shrink-0 items-center gap-3" ref={ref}>
          <button className="btn-ghost hidden rounded px-4 py-2 md:inline-flex" style={{ fontSize: 14.5, borderRadius: 4 }}>Login</button>
          <button className="btn-gold hidden items-center gap-2 rounded px-4 py-2 font-bold md:inline-flex" style={{ fontSize: 14.5, borderRadius: 4 }}>
            Get Started Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
              <circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>
            </svg>
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
