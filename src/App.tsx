
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import WhatsAppAccounts from "./pages/WhatsAppAccounts";
import BroadcastCampaigns from "./pages/BroadcastCampaigns";
import ChatbotBuilder from "./pages/ChatbotBuilder";
import LeadsCRM from "./pages/LeadsCRM";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/accounts" element={<WhatsAppAccounts />} />
            <Route path="/broadcasts" element={<BroadcastCampaigns />} />
            <Route path="/chatbots" element={<ChatbotBuilder />} />
            <Route path="/leads" element={<LeadsCRM />} />
            {/* Add more routes here as you build them */}
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
