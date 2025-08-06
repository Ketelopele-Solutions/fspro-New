import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, FileText, Plus, MoreHorizontal, Eye, Users, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddPlanModal } from "@/components/funeral-plans/AddPlanModal";

// Mock data for funeral plans matching the first screenshot
const mockPlans = [
  {
    id: "16988",
    name: "KGOMO FAMILY 18-65(10K) K10",
    typeDesc: "Single",
    coverAmount: "R1",
    ageRange: "18-65 yrs",
    coverage: "Family",
    status: "Inactive"
  },
  {
    id: "18602",
    name: "TOMSTONE 10:18-100 (10K)T2",
    typeDesc: "Society",
    coverAmount: "R10000",
    ageRange: "18-100 yrs",
    coverage: "Single",
    status: "Inactive"
  },
  {
    id: "1876",
    name: "SPECIAL B- 6 (5000)",
    typeDesc: "Single",
    coverAmount: "R5000",
    ageRange: "21-65 yrs",
    coverage: "Single",
    status: "Active"
  },
  {
    id: "19193",
    name: "IVORY PLAN FAM 18-65(50000)",
    typeDesc: "Single",
    coverAmount: "R50000",
    ageRange: "18-65 yrs",
    coverage: "Family",
    status: "Active"
  },
  {
    id: "20262",
    name: "STOKVEL 1+9 (7500)",
    typeDesc: "Stokvel",
    coverAmount: "R7500",
    ageRange: "N/A",
    coverage: "Group",
    status: "Inactive"
  }
];

export default function FuneralPlans() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("5");
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);

  const filteredPlans = mockPlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.typeDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (planId: string) => {
    navigate(`/funeral-plans/${planId}`);
  };

  const getStatusBadge = (status: string) => {
    if (status === "Active") {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Inactive</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    if (type === "Single") {
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Single</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{type}</Badge>;
    }
  };

  const getCoverageIcon = (coverage: string) => {
    if (coverage === "Family") {
      return <Users className="h-4 w-4 text-gray-600" />;
    } else {
      return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-semibold">Funeral Plans</h1>
      </div>

      {/* Action Tabs */}
      <div className="flex gap-4">
        <Button 
          className="gap-2 bg-gray-800 hover:bg-gray-900"
          onClick={() => navigate("/funeral-plans")}
        >
          <FileText className="h-4 w-4" />
          Funeral Plans
        </Button>
        <Button 
          variant="outline"
          className="gap-2"
          onClick={() => setIsAddPlanModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add New Plan
        </Button>
      </div>

      {/* Table Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">Show</span>
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
          <span className="text-sm">entries</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Search:</span>
          <Input
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      {/* Funeral Plans Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
              <TableHead className="text-primary-foreground">PLAN ID</TableHead>
              <TableHead className="text-primary-foreground">PLAN NAME</TableHead>
              <TableHead className="text-primary-foreground">PLAN TYPE DESC</TableHead>
              <TableHead className="text-primary-foreground">COVER AMOUNT</TableHead>
              <TableHead className="text-primary-foreground">AGE RANGE</TableHead>
              <TableHead className="text-primary-foreground">COVERAGE</TableHead>
              <TableHead className="text-primary-foreground">STATUS</TableHead>
              <TableHead className="text-primary-foreground">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlans.slice(0, parseInt(entriesPerPage)).map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.id}</TableCell>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{getTypeBadge(plan.typeDesc)}</TableCell>
                <TableCell>{plan.coverAmount}</TableCell>
                <TableCell>{plan.ageRange}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getCoverageIcon(plan.coverage)}
                    <span>{plan.coverage}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(plan.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(plan.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Plan Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing page 1 of 1
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
                 <Button variant="link" className="text-gray-600">Show All Columns</Button>
      </div>

      <AddPlanModal 
        isOpen={isAddPlanModalOpen} 
        onClose={() => setIsAddPlanModalOpen(false)} 
      />
    </div>
  );
}