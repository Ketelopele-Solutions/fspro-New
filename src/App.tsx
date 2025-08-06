import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import MemberDetails from "./pages/MemberDetails";
import Dependents from "./pages/Dependents";
import ArchivedDependents from "./pages/ArchivedDependents";
import FieldAgents from "./pages/FieldAgents";
import Archives from "./pages/Archives";
import ArchivedMemberDetails from "./pages/ArchivedMemberDetails";
import AccountHolders from "./pages/AccountHolders";
import PaymentsHistory from "./pages/PaymentsHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/members/:policyNo" element={<MemberDetails />} />
            <Route path="/members/:policyNo/dependents" element={<Dependents />} />
            <Route path="/members/:policyNo/dependents/archived" element={<ArchivedDependents />} />
            <Route path="/field-agents" element={<FieldAgents />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/archives/members/:policyNo" element={<ArchivedMemberDetails />} />
            <Route path="/account-holders" element={<AccountHolders />} />
            <Route path="/funeral-plans" element={<div>Funeral Plans Page</div>} />
            <Route path="/payments" element={<PaymentsHistory />} />
            <Route path="/analytics" element={<div>Analytics Page</div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
