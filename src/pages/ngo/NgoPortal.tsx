import { useEffect, useRef, useState } from "react";
import { LawyerCursor } from "@/components/lawyer/LawyerCursor";
import { Topbar } from "@/components/lawyer/layout/Topbar";
import { EmergencyStrip } from "@/components/lawyer/layout/EmergencyStrip";
import { QuickExit } from "@/components/lawyer/layout/QuickExit";
import { PortalFooter } from "@/components/lawyer/layout/PortalFooter";
import { Messages } from "@/components/lawyer/screens/Messages";
import { Resources } from "@/components/lawyer/screens/Resources";
import { NgoSidebar, type NgoSection } from "@/components/ngo/layout/NgoSidebar";
import { NgoDashboard } from "@/components/ngo/screens/NgoDashboard";
import { NgoCaseRequests, NgoActiveCases, NgoCompletedCases } from "@/components/ngo/screens/NgoCases";
import { CasesPageHeader, type CasesTab } from "@/components/lawyer/cases/CasesHeader";
import { NgoProfile } from "@/components/ngo/screens/NgoProfile";
import { NgoTeam } from "@/components/ngo/screens/NgoTeam";
import { NgoImpact } from "@/components/ngo/screens/NgoImpact";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { AvailabilityPanel } from "@/components/shared/AvailabilityPanel";

const NgoPortal = () => {
  const [section, setSection] = useState<NgoSection>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const sidebarW = collapsed ? 72 : 260;
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [section]);
  useScrollReveal(mainRef, section);
  const inCases = section.startsWith("cases-");
  const tab: CasesTab = section === "cases-active" ? "active" : section === "cases-completed" ? "completed" : "requests";
  const setTab = (t: CasesTab) => setSection(t === "active" ? "cases-active" : t === "completed" ? "cases-completed" : "cases-requests");
  return (
    <div className="lp-root min-h-screen">
      <LawyerCursor />
      <NgoSidebar section={section} setSection={setSection} collapsed={collapsed} toggle={() => setCollapsed(c => !c)} />
      <Topbar sidebarW={sidebarW} name="Aurat Foundation" initials="AF" />
      <main ref={mainRef} style={{ marginLeft: sidebarW, paddingTop: 88, paddingLeft: 28, paddingRight: 28, paddingBottom: 80, transition: "margin-left .3s cubic-bezier(.22,1,.36,1)" }}>
        {section === "dashboard" && <NgoDashboard goto={setSection} />}
        {inCases && (
          <div className="space-y-6">
            <CasesPageHeader tab={tab} onTab={setTab} ngo />
            {tab === "requests" && <NgoCaseRequests />}
            {tab === "active" && <NgoActiveCases />}
            {tab === "completed" && <NgoCompletedCases />}
          </div>
        )}
        {section === "team" && <NgoTeam />}
        {section === "availability" && (
          <div className="space-y-5">
            <div>
              <div className="text-[11px] uppercase tracking-[.18em] text-[#C9A84C] font-semibold">Settings</div>
              <h2 className="lp-display text-[40px] font-bold text-white leading-tight mt-1">NGO Availability</h2>
            </div>
            <AvailabilityPanel variant="ngo" queue={{ pending: 4, active: 4, resolved: 4 }} />
          </div>
        )}
        {section === "profile" && <NgoProfile />}
        {section === "messages" && <Messages />}
        {section === "resources" && <Resources />}
        {section === "impact" && <NgoImpact />}
      </main>
      <div style={{ marginLeft: sidebarW, transition: "margin-left .3s cubic-bezier(.22,1,.36,1)" }}>
        <PortalFooter />
      </div>
      <EmergencyStrip sidebarW={sidebarW} />
      <QuickExit />
    </div>
  );
};

export default NgoPortal;