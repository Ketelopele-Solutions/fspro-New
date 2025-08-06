import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BaseLayout } from "./components/layout/BaseLayout";
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
import FuneralPlans from "./pages/FuneralPlans";
import PlanDetails from "./pages/PlanDetails";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BaseLayout>
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
            <Route path="/funeral-plans" element={<FuneralPlans />} />
            <Route path="/funeral-plans/:planId" element={<PlanDetails />} />
            <Route path="/payments" element={<PaymentsHistory />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
