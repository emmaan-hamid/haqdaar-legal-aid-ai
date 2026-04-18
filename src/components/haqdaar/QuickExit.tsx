export const QuickExit = () => (
  <button
    onClick={() => { window.location.href = "https://www.weather.com"; }}
    className="fixed bottom-6 right-6 z-[80] flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-white"
    style={{ background: "hsl(var(--emergency))", animation: "red-pulse 2.4s ease-in-out infinite" }}
    aria-label="Quick Exit"
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
    Quick Exit
  </button>
);
