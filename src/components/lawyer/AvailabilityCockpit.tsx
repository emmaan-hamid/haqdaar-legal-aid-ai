import { useEffect, useState } from "react";

type Status = "avail" | "busy" | "unavail";

export const AvailabilityCockpit = ({
  initialStatus = "avail",
  initialMax = 5,
  active = 3,
  labels = { avail: "Available", busy: "Busy", unavail: "Unavailable" },
  helperText = {
    avail: "Accepting new requests. Citizens may reach you instantly.",
    busy: "Limited intake. New requests will queue.",
    unavail: "Paused. No new requests until you reactivate.",
  },
  title = "Availability Cockpit",
  capacityLabel = "Case Capacity",
}: {
  initialStatus?: Status;
  initialMax?: number;
  active?: number;
  labels?: Record<Status, string>;
  helperText?: Record<Status, string>;
  title?: string;
  capacityLabel?: string;
}) => {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [maxCases, setMaxCases] = useState(initialMax);
  useEffect(() => {
    if (active >= maxCases && status !== "unavail") setStatus("unavail");
  }, [active, maxCases]); // eslint-disable-line
  const dot = status === "avail" ? "#5BC68C" : status === "busy" ? "#E5BB3F" : "#E57367";

  return (
    <div className="lp-card p-6 lp-lift h-full flex flex-col">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-start gap-3">
          <span className="mt-1.5 inline-block w-2.5 h-2.5 rounded-full" style={{ background: dot, boxShadow: `0 0 10px ${dot}` }} />
          <div>
            <div className="text-[10.5px] uppercase tracking-[.2em] text-[#C9A84C] font-bold">Live Status</div>
            <div className="lp-display text-[26px] font-bold text-white leading-tight mt-0.5">{title}</div>
          </div>
        </div>
        <div className="text-[11px] text-[#888]">Updated · just now</div>
      </div>

      <div className="rounded-2xl p-1.5 flex gap-1 mb-5" style={{ background: "#0F0F0F", border: "1px solid rgba(201,168,76,.18)" }}>
        {([
          ["avail", labels.avail, "#5BC68C"],
          ["busy", labels.busy, "#E5BB3F"],
          ["unavail", labels.unavail, "#E57367"],
        ] as const).map(([k, lbl, col]) => {
          const sel = status === k;
          return (
            <button key={k} onClick={() => setStatus(k as Status)}
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-[12.5px] font-semibold transition-all"
              style={{
                color: sel ? col : "#E8E0D0",
                border: `1px solid ${sel ? col : "transparent"}`,
                background: sel ? `${col}15` : "transparent",
                boxShadow: sel ? `0 0 22px ${col}66, inset 0 0 12px ${col}22` : "none",
              }}
              onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = col; e.currentTarget.style.color = col; } }}
              onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = "#E8E0D0"; } }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: col }} /> {lbl}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl p-5" style={{ background: "#0F0F0F", border: "1px solid rgba(201,168,76,.2)" }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-[10.5px] uppercase tracking-[.2em] text-[#888] font-semibold">{capacityLabel}</div>
            <div className="text-[12.5px] text-[#C9C4B0] mt-1">Currently handling {active} of {maxCases}</div>
          </div>
          <div className="text-right">
            <div className="lp-display text-[34px] font-bold text-[#C9A84C] leading-none">{maxCases}</div>
            <div className="text-[9.5px] uppercase tracking-[.18em] text-[#888] mt-1">Max Slots</div>
          </div>
        </div>
        <input type="range" min={1} max={20} value={maxCases} onChange={e => setMaxCases(+e.target.value)} className="lp-slider" />
        <div className="flex justify-between text-[10px] text-[#666] mt-2 px-1">
          {Array.from({ length: 10 }, (_, i) => Math.round(((i + 1) / 10) * 20)).map((n, i) => (
            <span key={i} style={n === maxCases ? { color: "#C9A84C", fontWeight: 700 } : {}}>{n}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 gap-3">
        <div className="text-[12px] flex-1" style={{ color: dot }}>{helperText[status]}</div>
        <button className="lp-btn lp-btn-gold-solid" style={{ height: 38, padding: "0 22px" }}>Save</button>
      </div>
    </div>
  );
};