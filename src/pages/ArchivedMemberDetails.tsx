import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";

export default function ArchivedMemberDetails() {
  const { policyNo } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("5");
  const [activeTab, setActiveTab] = useState("details");

  // Mock data
  const memberDetails = {
    policyNumber: "25080012",
    name: "Test One",
    branch: "Bethlehem",
    idNumber: "9908038980211",
    contact: "0712161743",
    dateJoined: "April 01, 2025",
    dateArchived: "2025-08-04 09:49",
    archivedBy: "ADMIN_Rachel",
    archiveReason: "Member archived by user",
    funeralPlan: {
      planName: "Funeral plan 90",
      coverAmount: "R400",
      monthlyPremium: "R40"
    }
  };

  const archivedPayments = [
    {
      paymentReference: "AHP-1270?CC7",
      amount: "R/A",
      paymentDate: "2025-07-15 00:00:00",
      month: "N/A",
      dateArchived: "2025-07-29 16:11",
      archivedBy: "Rachel"
    },
    {
      paymentReference: "AHP-314F6259",
      amount: "R/A",
      paymentDate: "2025-07-14 00:00:00",
      month: "N/A",
      dateArchived: "2025-07-31 16:38",
      archivedBy: "Rachel"
    },
    {
      paymentReference: "AHP-32D87695",
      amount: "R/A",
      paymentDate: "2025-07-23 00:00:00",
      month: "N/A",
      dateArchived: "2025-07-29 16:11",
      archivedBy: "Rachel"
    },
    {
      paymentReference: "AHP-4E11893D",
      amount: "R/A", 
      paymentDate: "2025-07-31 00:00:00",
      month: "N/A",
      dateArchived: "2025-07-31 16:37",
      archivedBy: "Rachel"
    },
    {
      paymentReference: "AHP-B4D58677",
      amount: "R/A",
      paymentDate: "2025-07-31 00:00:00", 
      month: "N/A",
      dateArchived: "2025-07-31 16:47",
      archivedBy: "Rachel"
    }
  ];

  const archivedDependents = [
    {
      dependentId: "181441",
      name: "Sk Madzunya",
      relationship: "Child",
      dateOfBirth: "2000-02-05",
      dateArchived: "2025-08-04 13:17",
      archivedBy: "ADMIN_Rachel"
    },
    {
      dependentId: "181443",
      name: "R D",
      relationship: "Child", 
      dateOfBirth: "2000-02-02",
      dateArchived: "2025-08-04 13:17",
      archivedBy: "ADMIN_Rachel"
    },
    {
      dependentId: "181444",
      name: "RR RR",
      relationship: "Other",
      dateOfBirth: "1999-12-22",
      dateArchived: "2025-08-04 13:17", 
      archivedBy: "ADMIN_Rachel"
    },
    {
      dependentId: "181445",
      name: "JUSTICE Madzunya",
      relationship: "Child",
      dateOfBirth: "1999-08-08",
      dateArchived: "2025-08-04 13:17",
      archivedBy: "ADMIN_Rachel"
    },
    {
      dependentId: "181446", 
      name: "JUSTICE Madzunya",
      relationship: "Child",
      dateOfBirth: "1999-08-08",
      dateArchived: "2025-08-04 13:17",
      archivedBy: "ADMIN_Rachel"
    }
  ];

  const handleRestore = () => {
    toast.success("Member restored successfully");
    navigate("/archives");
  };

  const handleDelete = () => {
    toast.success("Member deleted permanently");
    navigate("/archives");
  };

  const filteredPayments = archivedPayments.filter(payment =>
    payment.paymentReference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDependents = archivedDependents.filter(dependent =>
    dependent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dependent.dependentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate("/archives")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Archives
        </Button>
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-slate-600">Archived Member Details</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">{memberDetails.policyNumber}</span>
            <Badge variant="secondary" className="bg-slate-500 text-white text-xs">ARCHIVED</Badge>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="details" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white">
            📄 Details
          </TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white">
            💳 Payments <Badge variant="secondary" className="ml-1 bg-blue-500 text-white">1</Badge>
          </TabsTrigger>
          <TabsTrigger value="dependents" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white">
            👥 Dependents <Badge variant="secondary" className="ml-1 bg-blue-500 text-white">24</Badge>
          </TabsTrigger>
          <TabsTrigger value="restore" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white">
            🔄 Restore
          </TabsTrigger>
          <TabsTrigger value="delete" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white">
            🗑️ Delete
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Member Information</h3>
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">POLICY NUMBER</label>
                      <p className="text-blue-600">{memberDetails.policyNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">NAME</label>
                      <p>{memberDetails.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">BRANCH</label>
                      <p className="text-blue-600">{memberDetails.branch}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">ID NUMBER</label>
                      <p>{memberDetails.idNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">CONTACT</label>
                      <p>{memberDetails.contact}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">DATE JOINED</label>
                      <p className="text-blue-600">{memberDetails.dateJoined}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">DATE ARCHIVED</label>
                      <p>{memberDetails.dateArchived}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">ARCHIVED BY</label>
                      <p className="text-blue-600">{memberDetails.archivedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">ARCHIVE REASON</label>
                      <p>{memberDetails.archiveReason}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Funeral Plan Information</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">PLAN NAME</label>
                      <p>{memberDetails.funeralPlan.planName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">COVER AMOUNT</label>
                      <p>{memberDetails.funeralPlan.coverAmount}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">MONTHLY PREMIUM</label>
                      <p>{memberDetails.funeralPlan.monthlyPremium}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
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
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-600">
                    <TableHead className="text-white">Payment Reference</TableHead>
                    <TableHead className="text-white">Amount</TableHead>
                    <TableHead className="text-white">Payment Date</TableHead>
                    <TableHead className="text-white">Month</TableHead>
                    <TableHead className="text-white">Date Archived</TableHead>
                    <TableHead className="text-white">Archived By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{payment.paymentReference}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.paymentDate}</TableCell>
                      <TableCell>{payment.month}</TableCell>
                      <TableCell>{payment.dateArchived}</TableCell>
                      <TableCell>{payment.archivedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">
                  Showing page 1 of 4
                </span>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dependents">
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
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Relationship</TableHead>
                    <TableHead className="text-white">Date of Birth</TableHead>
                    <TableHead className="text-white">Date Archived</TableHead>
                    <TableHead className="text-white">Archived By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDependents.map((dependent, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{dependent.dependentId}</TableCell>
                      <TableCell>{dependent.name}</TableCell>
                      <TableCell>{dependent.relationship}</TableCell>
                      <TableCell>{dependent.dateOfBirth}</TableCell>
                      <TableCell>{dependent.dateArchived}</TableCell>
                      <TableCell>{dependent.archivedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">
                  Showing page 1 of 5
                </span>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restore">
          <div className="flex justify-center items-center py-12">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3">
                  🔄 Yes, Restore
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="text-center">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl">❓</span>
                  </div>
                  <AlertDialogTitle className="text-xl">Restore Member</AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Are you sure you want to restore this member?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center gap-2">
                  <AlertDialogAction 
                    onClick={handleRestore}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-6"
                  >
                    Yes, Restore
                  </AlertDialogAction>
                  <AlertDialogCancel className="px-6">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TabsContent>

        <TabsContent value="delete">
          <div className="flex justify-center items-center py-12">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="px-8 py-3">
                  🗑️ Yes, Delete Permanently
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="text-center">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-2xl text-yellow-600">⚠️</span>
                  </div>
                  <AlertDialogTitle className="text-xl text-slate-600">Delete Member Permanently</AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    <strong>This action cannot be undone!</strong>
                    <br /><br />
                    The member and all associated data will be permanently deleted.
                    <br /><br />
                    Are you absolutely sure you want to proceed?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center gap-2">
                  <AlertDialogAction 
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-6"
                  >
                    Yes, Delete Permanently
                  </AlertDialogAction>
                  <AlertDialogCancel className="px-6">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}