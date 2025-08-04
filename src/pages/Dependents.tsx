import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Archive, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddDependentModal } from "@/components/dependents/AddDependentModal";
import { EditDependentModal } from "@/components/dependents/EditDependentModal";

export default function Dependents() {
  const { policyNo } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("5");
  const [addDependentOpen, setAddDependentOpen] = useState(false);
  const [editDependentOpen, setEditDependentOpen] = useState(false);
  const [selectedDependent, setSelectedDependent] = useState<any>(null);

  // Mock dependents data
  const dependents = [
    {
      id: "181451",
      fullName: "Vovo Dzini",
      idNumber: "0202177478333",
      age: 23,
      status: "PROMOTED TO MEMBER",
      dateEntered: "2025-07-07",
      ageStatus: "COMPLETED"
    },
    {
      id: "181452", 
      fullName: "Sino doli",
      idNumber: "0909110984632",
      age: 34,
      status: "HAS OWN POLICY",
      dateEntered: "2025-07-07",
      ageStatus: "COMPLETED"
    }
  ];

  const filteredDependents = dependents.filter(dependent =>
    dependent.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dependent.idNumber.includes(searchTerm) ||
    dependent.id.includes(searchTerm)
  );

  const handleEditDependent = (dependent: any) => {
    setSelectedDependent(dependent);
    setEditDependentOpen(true);
  };

  const getStatusBadge = (status: string) => {
    if (status === "PROMOTED TO MEMBER") {
      return <Badge className="bg-slate-600 text-white">{status}</Badge>;
    }
    if (status === "HAS OWN POLICY") {
      return <Badge className="bg-green-600 text-white">{status}</Badge>;
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  const getAgeStatusBadge = (ageStatus: string) => {
    return <Badge className="bg-green-600 text-white text-xs">{ageStatus}<br />By: user</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(`/members/${policyNo}`)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-slate-600">Dependents</h1>
          <span className="text-lg text-muted-foreground">{policyNo}</span>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex gap-2">
          <TabsList className="grid w-auto grid-cols-3 bg-transparent p-0 gap-2">
            <TabsTrigger 
              value="all" 
              className="bg-slate-600 text-white data-[state=active]:bg-slate-700 gap-2 px-4 py-2 rounded-md"
            >
              <Archive className="h-4 w-4" />
              View All Dependents
              <Badge variant="secondary" className="ml-1">1</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="add"
              onClick={() => setAddDependentOpen(true)}
              className="bg-slate-600 text-white hover:bg-slate-700 gap-2 px-4 py-2 rounded-md"
            >
              <Plus className="h-4 w-4" />
              Add Dependent
            </TabsTrigger>
            <TabsTrigger 
              value="archived"
              onClick={() => navigate(`/members/${policyNo}/dependents/archived`)}
              className="bg-slate-600 text-white hover:bg-slate-700 gap-2 px-4 py-2 rounded-md"
            >
              <Archive className="h-4 w-4" />
              Archived
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
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
                    </SelectContent>
                  </Select>
                  <span className="text-sm">entries</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Search:</span>
                  <Input
                    placeholder="Search dependents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-600">
                    <TableHead className="text-white">Dependent ID</TableHead>
                    <TableHead className="text-white">Full Name</TableHead>
                    <TableHead className="text-white">ID</TableHead>
                    <TableHead className="text-white">Age Status</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Date Entered</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDependents.map((dependent) => (
                    <TableRow key={dependent.id}>
                      <TableCell className="font-medium">{dependent.id}</TableCell>
                      <TableCell>{dependent.fullName}</TableCell>
                      <TableCell>{dependent.idNumber}</TableCell>
                      <TableCell>{getAgeStatusBadge(dependent.ageStatus)}</TableCell>
                      <TableCell>{getStatusBadge(dependent.status)}</TableCell>
                      <TableCell>{dependent.dateEntered}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem 
                              onClick={() => handleEditDependent(dependent)}
                              className="gap-2"
                            >
                              <Edit className="h-4 w-4" />
                              Take Age Action
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" />
                              Edit as Member
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-red-600">
                              <Trash2 className="h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">
                  Showing page 1 of 1
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddDependentModal 
        isOpen={addDependentOpen}
        onClose={() => setAddDependentOpen(false)}
        policyNumber={policyNo || ""}
      />

      <EditDependentModal
        isOpen={editDependentOpen}
        onClose={() => setEditDependentOpen(false)}
        dependent={selectedDependent}
      />
    </div>
  );
}