import { useEffect, useRef, useState } from "react";

const links = ["Home", "How It Works", "Features", "For Lawyers", "For NGOs", "Know Your Rights"];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md border-b border-gold/25" : ""
      }`}
      style={{ background: scrolled ? "rgba(10,10,10,0.92)" : "transparent", height: 72 }}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-white">
          <span className="relative">
            H
            <svg className="absolute -top-1 left-1/2 -translate-x-1/2" width="14" height="10" viewBox="0 0 24 16" fill="none" stroke="hsl(43 53% 54%)" strokeWidth="0.8">
              <path d="M12 2v12M4 6h16M6 6l-3 5h6zM18 6l-3 5h6z"/>
            </svg>
          </span>
          aqDaar
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l} href="#" className="nav-link text-[13px] font-medium text-ivory">{l}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3" ref={ref}>
          <button className="btn-ghost hidden rounded-full px-5 py-2 text-sm md:inline-flex">Login</button>
          <button className="btn-gold hidden rounded-full px-5 py-2 text-sm font-semibold md:inline-flex">Get Started Free</button>

          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-surface text-ivory transition-colors hover:border-gold"
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
