export const EmergencyStrip = ({ sidebarW }: { sidebarW: number }) => (
  <div className="fixed bottom-0 right-0 z-20 px-6 py-2 text-[11px] flex items-center justify-center gap-6 flex-wrap" style={{ left: sidebarW, background: "#080808", borderTop: "1px solid rgba(201,168,76,.18)", color: "#888", transition: "left .3s cubic-bezier(.22,1,.36,1)" }}>
    <span><span className="text-[#C9A84C] font-semibold">Rozan</span> 051-2890505</span>
    <span className="text-[#333]">|</span>
    <span><span className="text-[#C9A84C] font-semibold">Umang</span> 0317-4288665</span>
    <span className="text-[#333]">|</span>
    <span><span className="text-[#C9A84C] font-semibold">Police</span> 15</span>
  </div>
);
