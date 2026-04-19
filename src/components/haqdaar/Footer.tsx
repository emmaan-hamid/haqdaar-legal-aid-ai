const cols = [
  { label: "Platform", links: ["How It Works", "Features", "Anonymous Submission", "Document Generator", "Case Tracker", "For Lawyers", "For NGOs"] },
  { label: "Legal Resources", links: ["Know Your Rights", "Pakistani Law Database", "Document Templates", "FAQs", "Labor Law Guide", "Women's Rights Guide", "Tenant Rights Guide"] },
];

export const Footer = () => (
  <footer className="border-t border-gold/30" style={{ background: "#080808" }}>
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-4 lg:px-10">
      <div className="lg:pr-6 lg:border-r lg:border-gold/15">
        <div className="font-display text-2xl font-bold text-white">HaqDaar</div>
        <p className="mt-3 text-sm leading-relaxed text-ivory/85">Democratizing justice through AI for every Pakistani.</p>
        <div className="mt-5 flex gap-3">
          {["X", "in", "ig"].map((s) => (
            <a key={s} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-xs text-ivory hover:border-gold hover:text-white">{s}</a>
          ))}
        </div>
        <p
          className="mt-6 text-[12px] leading-relaxed text-ivory/85"
          style={{
            background: "hsl(var(--emergency) / 0.08)",
            borderLeft: "3px solid hsl(var(--emergency))",
            padding: "10px 14px",
            borderRadius: 4,
          }}
        >
          In danger? Use Quick Exit or call Rozan: <span className="text-ivory">051-2890505</span>
        </p>
      </div>

      {cols.map((c) => (
        <div key={c.label} className="lg:pr-6 lg:border-r lg:border-gold/15">
          <div className="label-accent">{c.label}</div>
          <ul className="mt-4 space-y-2.5">
            {c.links.map((l) => (
              <li key={l}><a href="#" className="text-sm text-ivory/85 hover:text-white">{l}</a></li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <div className="label-accent">Contact</div>
        <ul className="mt-4 space-y-2.5 text-sm text-ivory/85">
          <li>contact@haqdaar.pk</li>
          <li>Lahore, Pakistan</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gold/15">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-6 text-[12px] text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>© 2026 HaqDaar. Built for the people of Pakistan.</div>
        <div className="flex gap-4">
          <span>Not a law firm. An access to justice platform.</span>
          <a href="#" className="hover:text-ivory">Privacy Policy</a>
          <a href="#" className="hover:text-ivory">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);
