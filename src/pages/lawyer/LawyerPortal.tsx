import { useEffect, useState } from "react";
import { LawyerCursor } from "@/components/lawyer/LawyerCursor";
import { Sidebar, type Section } from "@/components/lawyer/layout/Sidebar";
import { Topbar } from "@/components/lawyer/layout/Topbar";
import { EmergencyStrip } from "@/components/lawyer/layout/EmergencyStrip";
import { QuickExit } from "@/components/lawyer/layout/QuickExit";
import { PortalFooter } from "@/components/lawyer/layout/PortalFooter";
import { Dashboard } from "@/components/lawyer/screens/Dashboard";
import { CaseRequests, ActiveCases, CompletedCases } from "@/components/lawyer/screens/Cases";
import { CasesPageHeader, type CasesTab } from "@/components/lawyer/cases/CasesHeader";
import { Settings } from "@/components/lawyer/screens/Settings";
import { Messages } from "@/components/lawyer/screens/Messages";
import { Resources } from "@/components/lawyer/screens/Resources";
import { Impact } from "@/components/lawyer/screens/Impact";

const LawyerPortal = () => {
  const [section, setSection] = useState<Section>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const sidebarW = collapsed ? 72 : 260;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [section]);

  const inCases = section.startsWith("cases-");
  const tab: CasesTab = section === "cases-active" ? "active" : section === "cases-completed" ? "completed" : "requests";
  const setTab = (t: CasesTab) => setSection(t === "active" ? "cases-active" : t === "completed" ? "cases-completed" : "cases-requests");

  return (
    <div className="lp-root min-h-screen">
      <LawyerCursor />
      <Sidebar section={section} setSection={setSection} collapsed={collapsed} toggle={() => setCollapsed(c => !c)} />
      <Topbar sidebarW={sidebarW} />
      <main style={{ marginLeft: sidebarW, paddingTop: 88, paddingLeft: 28, paddingRight: 28, paddingBottom: 80, transition: "margin-left .3s cubic-bezier(.22,1,.36,1)" }}>
        {section === "dashboard" && <Dashboard goto={setSection} />}
        {inCases && (
          <div className="space-y-6">
            <CasesPageHeader tab={tab} onTab={setTab} />
            {tab === "requests" && <CaseRequests />}
            {tab === "active" && <ActiveCases />}
            {tab === "completed" && <CompletedCases />}
          </div>
        )}
        {section === "settings" && <Settings />}
        {section === "messages" && <Messages />}
        {section === "resources" && <Resources />}
        {section === "impact" && <Impact />}
      </main>
      <div style={{ marginLeft: sidebarW, transition: "margin-left .3s cubic-bezier(.22,1,.36,1)" }}>
        <PortalFooter />
      </div>
      <EmergencyStrip sidebarW={sidebarW} />
      <QuickExit />
    </div>
  );
};

export default LawyerPortal;
