
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
import Templates from "./pages/Templates";
import ConversationPage from "./pages/ConversationPage"; // Updated import
import TeamManagement from "./pages/TeamManagement";
import Analytics from "./pages/Analytics";
import Tickets from "./pages/Tickets";
import Settings from "./pages/Settings";

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
            <Route path="/templates" element={<Templates />} />
            <Route path="/conversations" element={<ConversationPage />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
