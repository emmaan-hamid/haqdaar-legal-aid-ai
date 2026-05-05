import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PortalProvider } from "@/context/PortalContext";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollToTop } from "@/components/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import CaseRequests from "./pages/cases/CaseRequests";
import ActiveCases from "./pages/cases/ActiveCases";
import CompletedCases from "./pages/cases/CompletedCases";
import CaseDetail from "./pages/cases/CaseDetail";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Resources from "./pages/Resources";
import Impact from "./pages/Impact";
import NotFound from "./pages/NotFound";
import NgoDashboard from "./pages/ngo/NgoDashboard";
import NgoIncomingRequests from "./pages/ngo/NgoIncomingRequests";
import NgoActiveCases from "./pages/ngo/NgoActiveCases";
import NgoCompletedCases from "./pages/ngo/NgoCompletedCases";
import NgoCaseDetail from "./pages/ngo/NgoCaseDetail";
import NgoProfile from "./pages/ngo/NgoProfile";
import NgoTeam from "./pages/ngo/NgoTeam";
import NgoImpact from "./pages/ngo/NgoImpact";
import { PublicLayout } from "./components/public/PublicLayout";
import BrowseLaw from "./pages/public/BrowseLaw";
import PublicArticles from "./pages/public/Articles";
import Faq from "./pages/public/Faq";
import Contact from "./pages/public/Contact";
import About from "./pages/public/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner theme="dark" />
      <BrowserRouter>
        <PortalProvider>
          <ScrollToTop />
          <CustomCursor />
          <Routes>
            <Route path="/" element={<PortalLayout><Dashboard /></PortalLayout>} />
            <Route path="/cases" element={<Navigate to="/cases/requests" replace />} />
            <Route path="/cases/requests" element={<PortalLayout><CaseRequests /></PortalLayout>} />
            <Route path="/cases/active" element={<PortalLayout><ActiveCases /></PortalLayout>} />
            <Route path="/cases/active/:id" element={<PortalLayout><CaseDetail /></PortalLayout>} />
            <Route path="/cases/completed" element={<PortalLayout><CompletedCases /></PortalLayout>} />
            <Route path="/settings" element={<PortalLayout><Settings /></PortalLayout>} />
            <Route path="/messages" element={<PortalLayout><Messages /></PortalLayout>} />
            <Route path="/resources" element={<PortalLayout><Resources /></PortalLayout>} />
            <Route path="/impact" element={<PortalLayout><Impact /></PortalLayout>} />
            <Route path="/ngo" element={<PortalLayout><NgoDashboard /></PortalLayout>} />
            <Route path="/ngo/cases" element={<Navigate to="/ngo/cases/requests" replace />} />
            <Route path="/ngo/cases/requests" element={<PortalLayout><NgoIncomingRequests /></PortalLayout>} />
            <Route path="/ngo/cases/active" element={<PortalLayout><NgoActiveCases /></PortalLayout>} />
            <Route path="/ngo/cases/active/:id" element={<PortalLayout><NgoCaseDetail /></PortalLayout>} />
            <Route path="/ngo/cases/completed" element={<PortalLayout><NgoCompletedCases /></PortalLayout>} />
            <Route path="/ngo/profile" element={<PortalLayout><NgoProfile /></PortalLayout>} />
            <Route path="/ngo/team" element={<PortalLayout><NgoTeam /></PortalLayout>} />
            <Route path="/ngo/messages" element={<PortalLayout><Messages /></PortalLayout>} />
            <Route path="/ngo/resources" element={<PortalLayout><Resources /></PortalLayout>} />
            <Route path="/ngo/impact" element={<PortalLayout><NgoImpact /></PortalLayout>} />
            <Route path="/home" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/browse-law" element={<PublicLayout><BrowseLaw /></PublicLayout>} />
            <Route path="/articles" element={<PublicLayout><PublicArticles /></PublicLayout>} />
            <Route path="/faq" element={<PublicLayout><Faq /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/logout" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PortalProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
