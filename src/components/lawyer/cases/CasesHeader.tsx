import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export type CasesTab = "requests" | "active" | "completed";

export const CATEGORIES = [
  "All Categories",
  "Labor Dispute",
  "Property Fraud",
  "Domestic Violence",
  "Police Misconduct",
  "NADRA Issues",
  "Consumer Rights",
  "Harassment",
];
export const URGENCIES = ["All Urgency", "High", "Medium", "Low"];
export const STATUSES = ["All Status", "In Progress", "Awaiting", "Pending", "Resolved"];
export const OUTCOMES = ["All Outcomes", "Settled", "Court Order", "Resolved", "Withdrawn"];
export const DATES = ["Any Date", "Today", "This Week", "This Month", "This Year"];

export const CasesPageHeader = ({
  tab,
  onTab,
  ngo = false,
}: { tab: CasesTab; onTab: (t: CasesTab) => void; ngo?: boolean }) => {
  const tabs: { id: CasesTab; label: string }[] = [
    { id: "requests", label: ngo ? "Incoming Requests" : "Case Requests" },
    { id: "active", label: "Active Cases" },
    { id: "completed", label: "Completed Cases" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <div className="lp-page-eyebrow mb-2">My Cases</div>
        <h1 className="lp-page-title">Case Management</h1>
      </div>
      <div className="flex items-end gap-8 border-b border-[rgba(201,168,76,.18)]">
        {tabs.map(t => (
          <button key={t.id} onClick={() => onTab(t.id)} className={`lp-tab-link ${tab === t.id ? "active" : ""}`}>{t.label}</button>
        ))}
      </div>
    </div>
  );
};

const FilterDropdown = ({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} className="lp-filter-select flex items-center justify-between gap-3 w-full">
        <span className="truncate">{value}</span>
        <ChevronDown size={14} className={`text-[#C9A84C] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-30 left-0 right-0 mt-2 rounded-xl py-1 lp-fade lp-gold-scroll" style={{ background: "#141414", border: "1px solid rgba(201,168,76,.4)", boxShadow: "0 20px 50px -10px rgba(0,0,0,.7)", maxHeight: 280, overflowY: "auto" }}>
          {options.map(o => (
            <button key={o} onClick={() => { onChange(o); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-[12.5px] text-[#E8E0D0] hover:bg-[rgba(201,168,76,.1)] hover:text-[#C9A84C] transition-colors">{o}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export const CasesFilters = ({ second }: { second: { label: string; options: string[] } }) => {
  const [cat, setCat] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(DATES[0]);
  const [sec, setSec] = useState(second.options[0]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_180px_180px_1fr] gap-3">
      <FilterDropdown value={cat} options={CATEGORIES} onChange={setCat} />
      <FilterDropdown value={date} options={DATES} onChange={setDate} />
      <FilterDropdown value={sec} options={second.options} onChange={setSec} />
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
        <input className="lp-filter-select w-full" style={{ paddingLeft: 56 }} placeholder="Search cases..." />
      </div>
    </div>
  );
};