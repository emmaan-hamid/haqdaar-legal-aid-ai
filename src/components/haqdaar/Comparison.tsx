const cols = ["HaqDaar", "Pakistan Law Bot", "NAZ Assist", "Rocket Lawyer"];
type Cell = "ok" | "warn" | "no";
const rows: { feat: string; vals: [Cell, Cell, Cell, Cell]; notes?: (string | undefined)[] }[] = [
  { feat: "100% Free", vals: ["ok", "warn", "ok", "no"], notes: [, "Freemium", , "Paid"] },
  { feat: "Pakistani Law Coverage", vals: ["ok", "ok", "ok", "no"] },
  { feat: "Works in Urdu", vals: ["ok", "warn", "ok", "no"], notes: [, "Partial"] },
  { feat: "Anonymous Submission", vals: ["ok", "no", "ok", "no"] },
  { feat: "AI Document Generation", vals: ["ok", "warn", "no", "ok"], notes: [, "Limited"] },
  { feat: "Volunteer Lawyer Matching", vals: ["ok", "warn", "ok", "warn"], notes: [, "Paid only", , "Paid"] },
  { feat: "Quick Exit / Panic Button", vals: ["ok", "no", "no", "no"] },
  { feat: "Punishment Suggestion", vals: ["ok", "no", "no", "no"] },
  { feat: "Case Deadline Reminders", vals: ["ok", "no", "no", "no"] },
  { feat: "Nearby Police Station Finder", vals: ["ok", "no", "no", "no"] },
];

const Icon = ({ v, note }: { v: Cell; note?: string }) => {
  const map = {
    ok: { ch: "✓", color: "#22C55E" },
    warn: { ch: "!", color: "#F59E0B" },
    no: { ch: "✕", color: "#EF4444" },
  } as const;
  const m = map[v];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold"
        style={{ background: `${m.color}22`, color: m.color, border: `1px solid ${m.color}66` }}
      >
        {m.ch}
      </span>
      {note && <span className="text-[11.5px] text-ivory/70">{note}</span>}
    </span>
  );
};

export const Comparison = () => (
  <section className="border-t border-gold/15 py-24">
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
      <div className="reveal text-center">
        <div className="label-accent">Why HaqDaar</div>
        <h2 className="font-display mt-4 text-4xl font-bold text-white lg:text-5xl">
          The Only Platform Built for Pakistan's Reality
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] text-ivory/75">
          Every other option either costs money, works only in English, lacks Pakistani law, or does
          not protect your identity. HaqDaar does all of this — free.
        </p>
      </div>

      <div className="reveal mt-12 overflow-x-auto rounded-xl border border-gold/25" style={{ background: "#1A1A1A" }}>
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr style={{ background: "hsl(43 53% 54% / 0.12)" }}>
              <th className="px-5 py-4 text-[13px] font-semibold uppercase tracking-wider text-gold">Feature</th>
              {cols.map((c, i) => (
                <th
                  key={c}
                  className="px-5 py-4 text-center text-[13px] font-semibold uppercase tracking-wider text-gold"
                  style={i === 0 ? { borderLeft: "3px solid hsl(43 53% 54%)" } : undefined}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={r.feat} style={{ background: ri % 2 === 0 ? "#1A1A1A" : "#2D2D2D" }}>
                <td className="px-5 py-3.5 text-[14px] font-medium text-white">{r.feat}</td>
                {r.vals.map((v, ci) => (
                  <td
                    key={ci}
                    className="px-5 py-3.5 text-center"
                    style={ci === 0 ? { borderLeft: "3px solid hsl(43 53% 54%)" } : undefined}
                  >
                    <Icon v={v} note={r.notes?.[ci]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);
