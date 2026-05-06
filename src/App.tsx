import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import LawyerPortal from "./pages/lawyer/LawyerPortal.tsx";
import NgoPortal from "./pages/ngo/NgoPortal.tsx";
import BrowseLaw from "./pages/public/BrowseLaw.tsx";
import Articles from "./pages/public/Articles.tsx";
import FaqPage from "./pages/public/Faq.tsx";
import Contact from "./pages/public/Contact.tsx";
import About from "./pages/public/About.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lawyer" element={<LawyerPortal />} />
          <Route path="/ngo" element={<NgoPortal />} />
          <Route path="/browse-law" element={<BrowseLaw />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
