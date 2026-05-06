import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/browse-law", label: "Browse Law" },
  { to: "/articles", label: "Articles" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const PublicNav = () => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
        height: 64,
      }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between gap-4 px-6">
        <Link to="/" className="lp-display text-[24px] font-bold" style={{ color: "#C9A84C" }}>HaqDaar</Link>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-[13.5px] font-medium transition-colors ${isActive ? "text-[#C9A84C]" : "text-[#E8E0D0] hover:text-[#C9A84C]"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button className="lp-btn lp-btn-gold lp-btn-md">Login</button>
          <button className="lp-btn lp-btn-gold-solid lp-btn-md">Get Started Free</button>
        </div>
      </div>
      {onHome ? null : null}
    </header>
  );
};