export const QuickExit = () => (
  <button
    onClick={() => { window.location.replace("https://www.weather.com"); }}
    className="fixed flex items-center gap-1.5 font-bold text-white"
    style={{
      top: 18,
      right: 24,
      zIndex: 10000,
      background: "#DC2626",
      fontSize: 13,
      fontWeight: 700,
      padding: "8px 16px",
      borderRadius: 4,
      animation: "qe-pulse 3s ease-in-out infinite",
      boxShadow: "0 4px 14px -2px rgba(220,38,38,0.5)",
    }}
    aria-label="Quick Exit"
  >
    ✕ Quick Exit
  </button>
);
