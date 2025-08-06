import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddPlanModal } from "@/components/funeral-plans/AddPlanModal";

// Mock data for funeral plans
const mockPlans = [
  {
    id: "FP001",
    name: "Basic Funeral Plan",
    type: "Standard",
    description: "Essential funeral coverage for individuals and families",
    coverAmount: "R25,000",
    ageRange: "18-65",
    coverage: "Individual + 5 Dependents",
    status: "Active"
  },
  {
    id: "FP002", 
    name: "Premium Funeral Plan",
    type: "Premium",
    description: "Comprehensive funeral coverage with extended benefits",
    coverAmount: "R50,000",
    ageRange: "18-70",
    coverage: "Individual + 8 Dependents",
    status: "Active"
  },
  {
    id: "FP003",
    name: "Family Funeral Plan",
    type: "Family",
    description: "Large family coverage with multiple member support",
    coverAmount: "R35,000", 
    ageRange: "21-60",
    coverage: "Individual + 12 Dependents",
    status: "Inactive"
  }
];

export default function FuneralPlans() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);

  const filteredPlans = mockPlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (planId: string) => {
    navigate(`/funeral-plans/${planId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Funeral Plans</h1>
      </div>

      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Funeral Plans</TabsTrigger>
          <TabsTrigger value="add-plan">Add New Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">entries</span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan ID</TableHead>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Plan Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Cover Amount</TableHead>
                  <TableHead>Age Range</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.id}</TableCell>
                    <TableCell>{plan.name}</TableCell>
                    <TableCell>{plan.type}</TableCell>
                    <TableCell className="max-w-xs truncate">{plan.description}</TableCell>
                    <TableCell>{plan.coverAmount}</TableCell>
                    <TableCell>{plan.ageRange}</TableCell>
                    <TableCell>{plan.coverage}</TableCell>
                    <TableCell>
                      <Badge variant={plan.status === "Active" ? "default" : "secondary"}>
                        {plan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(plan.id)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        Plan Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing 1 to {filteredPlans.length} of {filteredPlans.length} entries</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="add-plan" className="space-y-4">
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            <h2 className="text-xl font-medium">Add New Funeral Plan</h2>
          </div>
          
          <Button onClick={() => setIsAddPlanModalOpen(true)}>
            Open Add Plan Form
          </Button>
        </TabsContent>
      </Tabs>

      <AddPlanModal 
        isOpen={isAddPlanModalOpen} 
        onClose={() => setIsAddPlanModalOpen(false)} 
      />
    </div>
  );
}