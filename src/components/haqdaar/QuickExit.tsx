export const QuickExit = () => (
  <button
    onClick={() => { window.location.replace("https://www.weather.com"); }}
    className="fixed right-6 top-[18px] z-[10000] flex items-center gap-2 text-[13px] font-bold text-white"
    style={{ background: "#DC2626", padding: "8px 16px", borderRadius: 4, animation: "qe-pulse 3s ease-in-out infinite" }}
    aria-label="Quick Exit"
  >
    <span aria-hidden>✕</span> Quick Exit
  </button>
);
