import { useEffect, useState } from "react";
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
import { NgoProfile } from "@/components/ngo/screens/NgoProfile";
import { NgoTeam } from "@/components/ngo/screens/NgoTeam";
import { NgoImpact } from "@/components/ngo/screens/NgoImpact";

const NgoPortal = () => {
  const [section, setSection] = useState<NgoSection>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const sidebarW = collapsed ? 72 : 260;
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [section]);
  return (
    <div className="lp-root min-h-screen">
      <LawyerCursor />
      <NgoSidebar section={section} setSection={setSection} collapsed={collapsed} toggle={() => setCollapsed(c => !c)} />
      <Topbar sidebarW={sidebarW} />
      <main style={{ marginLeft: sidebarW, paddingTop: 88, paddingLeft: 28, paddingRight: 28, paddingBottom: 80, transition: "margin-left .3s cubic-bezier(.22,1,.36,1)" }}>
        {section === "dashboard" && <NgoDashboard goto={setSection} />}
        {section === "cases-requests" && <NgoCaseRequests />}
        {section === "cases-active" && <NgoActiveCases />}
        {section === "cases-completed" && <NgoCompletedCases />}
        {section === "team" && <NgoTeam />}
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