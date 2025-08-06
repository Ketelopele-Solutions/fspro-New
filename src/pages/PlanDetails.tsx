import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Edit, Trash2, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { AddDependentSettingModal } from "@/components/funeral-plans/AddDependentSettingModal";
import { EditPlanModal } from "@/components/funeral-plans/EditPlanModal";
import { DeletePlanModal } from "@/components/funeral-plans/DeletePlanModal";

// Mock data for plan details
const mockPlanDetails = {
  id: "FP001",
  name: "Basic Funeral Plan",
  type: "Standard",
  description: "Essential funeral coverage for individuals and families",
  coverAmount: "R25,000",
  maxPremium: "R150",
  status: "Active"
};

const mockDependentSettings = [
  {
    dsid: "DS001",
    typeOfMember: "Spouse",
    preferences: "Full Coverage",
    numberOfMembers: 1,
    coverAmount: "R25,000",
    minAge: 18,
    maxAge: 65,
    status: "Active"
  },
  {
    dsid: "DS002",
    typeOfMember: "Child",
    preferences: "Partial Coverage",
    numberOfMembers: 5,
    coverAmount: "R15,000",
    minAge: 0,
    maxAge: 21,
    status: "Active"
  }
];

export default function PlanDetails() {
  const navigate = useNavigate();
  const { planId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [isAddSettingModalOpen, setIsAddSettingModalOpen] = useState(false);
  const [isEditPlanModalOpen, setIsEditPlanModalOpen] = useState(false);
  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);

  const filteredSettings = mockDependentSettings.filter(setting =>
    setting.typeOfMember.toLowerCase().includes(searchTerm.toLowerCase()) ||
    setting.dsid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/funeral-plans")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Plan Details - {mockPlanDetails.name}</h1>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="dependent-settings">Dependent Settings</TabsTrigger>
          <TabsTrigger value="edit-plan">Edit Plan</TabsTrigger>
          <TabsTrigger value="delete-plan">Delete Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-medium">Plan Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Plan ID</label>
                <p className="text-sm">{mockPlanDetails.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Plan Name</label>
                <p className="text-sm">{mockPlanDetails.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Plan Type</label>
                <p className="text-sm">{mockPlanDetails.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Cover Amount</label>
                <p className="text-sm">{mockPlanDetails.coverAmount}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Maximum Premium</label>
                <p className="text-sm">{mockPlanDetails.maxPremium}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Badge variant={mockPlanDetails.status === "Active" ? "default" : "secondary"}>
                  {mockPlanDetails.status}
                </Badge>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm">{mockPlanDetails.description}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="dependent-settings" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">Dependent Settings</h2>
            <Button onClick={() => setIsAddSettingModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Settings
            </Button>
          </div>

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
                placeholder="Search settings..."
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
                  <TableHead>DSID</TableHead>
                  <TableHead>Type of Member</TableHead>
                  <TableHead>Preferences</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSettings.map((setting) => (
                  <TableRow key={setting.dsid}>
                    <TableCell className="font-medium">{setting.dsid}</TableCell>
                    <TableCell>{setting.typeOfMember}</TableCell>
                    <TableCell>{setting.preferences}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="edit-plan" className="space-y-4">
          <h2 className="text-xl font-medium">Edit Plan</h2>
          <Button onClick={() => setIsEditPlanModalOpen(true)}>
            Open Edit Plan Form
          </Button>
        </TabsContent>

        <TabsContent value="delete-plan" className="space-y-4">
          <h2 className="text-xl font-medium">Delete Plan</h2>
          <p className="text-muted-foreground">This action cannot be undone. Please confirm deletion.</p>
          <Button variant="destructive" onClick={() => setIsDeletePlanModalOpen(true)}>
            Delete Plan
          </Button>
        </TabsContent>
      </Tabs>

      <AddDependentSettingModal 
        isOpen={isAddSettingModalOpen} 
        onClose={() => setIsAddSettingModalOpen(false)} 
      />
      
      <EditPlanModal 
        isOpen={isEditPlanModalOpen} 
        onClose={() => setIsEditPlanModalOpen(false)}
        plan={mockPlanDetails}
      />
      
      <DeletePlanModal 
        isOpen={isDeletePlanModalOpen} 
        onClose={() => setIsDeletePlanModalOpen(false)}
        planName={mockPlanDetails.name}
      />
    </div>
  );
}