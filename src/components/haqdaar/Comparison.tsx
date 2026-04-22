const cols = ["Feature", "HaqDaar", "Pakistan Law Bot", "NAZ Assist", "Rocket Lawyer"];

type Cell = { v: "yes" | "warn" | "no"; t?: string };
const rows: { feature: string; cells: Cell[] }[] = [
  { feature: "100% Free", cells: [{ v: "yes" }, { v: "warn", t: "Freemium" }, { v: "yes" }, { v: "no", t: "Paid" }] },
  { feature: "Pakistani Law Coverage", cells: [{ v: "yes" }, { v: "yes" }, { v: "yes" }, { v: "no" }] },
  { feature: "Works in Urdu", cells: [{ v: "yes" }, { v: "warn", t: "Partial" }, { v: "yes" }, { v: "no" }] },
  { feature: "Anonymous Submission", cells: [{ v: "yes" }, { v: "no" }, { v: "yes" }, { v: "no" }] },
  { feature: "AI Document Generation", cells: [{ v: "yes" }, { v: "warn", t: "Limited" }, { v: "no" }, { v: "yes" }] },
  { feature: "Volunteer Lawyer Matching", cells: [{ v: "yes" }, { v: "warn", t: "Paid only" }, { v: "yes" }, { v: "warn", t: "Paid" }] },
  { feature: "Quick Exit / Panic Button", cells: [{ v: "yes" }, { v: "no" }, { v: "no" }, { v: "no" }] },
  { feature: "Punishment Suggestion", cells: [{ v: "yes" }, { v: "no" }, { v: "no" }, { v: "no" }] },
  { feature: "Case Deadline Reminders", cells: [{ v: "yes" }, { v: "no" }, { v: "no" }, { v: "no" }] },
  { feature: "Nearby Police Station Finder", cells: [{ v: "yes" }, { v: "no" }, { v: "no" }, { v: "no" }] },
];

const Mark = ({ c }: { c: Cell }) => {
  const map = {
    yes: { sym: "✅", color: "#22C55E" },
    warn: { sym: "⚠️", color: "#F59E0B" },
    no: { sym: "❌", color: "#EF4444" },
  } as const;
  const m = map[c.v];
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px]" style={{ color: m.color }}>
      <span>{m.sym}</span>
      {c.t && <span className="text-ivory/80">{c.t}</span>}
    </span>
  );
};

export const Comparison = () => (
  <section className="border-t border-gold/15 py-24">
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
      <div className="reveal text-center">
        <div className="pill pill-gold inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold"/> WHY HAQDAAR
        </div>
        <h2 className="font-display mt-5 text-4xl font-bold text-white lg:text-5xl">
          The Only Platform Built for Pakistan's Reality
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15.5px] text-ivory/80">
          Every other option either costs money, works only in English, lacks Pakistani law,
          or does not protect your identity. HaqDaar does all of this — free.
        </p>
      </div>

      <div className="reveal mt-12 overflow-x-auto rounded-xl border border-gold/25">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr style={{ background: "hsl(43 53% 54% / 0.12)" }}>
              {cols.map((c, i) => (
                <th
                  key={c}
                  className="px-5 py-4 text-[13px] uppercase tracking-wider text-gold"
                  style={i === 1 ? { borderLeft: "3px solid hsl(43 53% 54%)" } : undefined}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.feature} style={{ background: i % 2 === 0 ? "#1A1A1A" : "#2D2D2D" }}>
                <td className="px-5 py-3.5 text-[14px] font-medium text-white">{r.feature}</td>
                {r.cells.map((cell, j) => (
                  <td
                    key={j}
                    className="px-5 py-3.5"
                    style={j === 0 ? { borderLeft: "3px solid hsl(43 53% 54%)", background: "hsl(43 53% 54% / 0.06)" } : undefined}
                  >
                    <Mark c={cell} />
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