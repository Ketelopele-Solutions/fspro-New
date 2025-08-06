import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowLeft, Eye, UserMinus } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const AccountHolders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Mock data for account holders
  const accountHolders = [
    {
      accountNo: "AH-2508-0002",
      name: "JJ",
      surname: "JJ",
      cellphone: "0609129775"
    },
    {
      accountNo: "AH-2508-0001",
      name: "EUNICE",
      surname: "EUNICE",
      cellphone: "0726373636"
    },
    {
      accountNo: "AH-2507-0025",
      name: "D",
      surname: "D",
      cellphone: "0726373636"
    },
    {
      accountNo: "AH-2507-0024",
      name: "BOY",
      surname: "BOY",
      cellphone: "0609129775"
    },
    {
      accountNo: "AH-2507-0023",
      name: "ZAZA",
      surname: "ZAZA",
      cellphone: "0609129775"
    },
    {
      accountNo: "AH-2507-0022",
      name: "I",
      surname: "I",
      cellphone: "0726373636"
    },
    {
      accountNo: "AH-2507-0021",
      name: "F",
      surname: "F",
      cellphone: "0726373636"
    },
    {
      accountNo: "AH-2507-0020",
      name: "EDEN",
      surname: "EUNICE",
      cellphone: "0726373636"
    },
    {
      accountNo: "AH-2507-0019",
      name: "MS",
      surname: "MS",
      cellphone: "0726373636"
    }
  ];

  const filteredAccountHolders = accountHolders.filter(holder =>
    holder.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holder.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holder.cellphone.includes(searchTerm)
  );

  const handleViewMemberDetails = (accountNo: string) => {
    navigate(`/members/${accountNo}`);
  };

  const handleDemoteToMember = (accountNo: string, name: string) => {
    toast.success(`${name} has been demoted to regular member`);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-slate-700">All Account Holders</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <Select value={entriesPerPage.toString()} onValueChange={(value) => setEntriesPerPage(parseInt(value))}>
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
              <span>entries</span>
            </div>
            <div className="w-72">
              <Input
                placeholder="Search account holders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ACCOUNT NO</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>SURNAME</TableHead>
                <TableHead>CELLPHONE</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccountHolders.slice(0, entriesPerPage).map((holder) => (
                <TableRow key={holder.accountNo}>
                  <TableCell className="font-medium text-blue-600">
                    {holder.accountNo}
                  </TableCell>
                  <TableCell>{holder.name}</TableCell>
                  <TableCell>{holder.surname}</TableCell>
                  <TableCell>{holder.cellphone}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background border">
                        <DropdownMenuItem 
                          onClick={() => handleViewMemberDetails(holder.accountNo)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Member Details
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem 
                              onSelect={(e) => e.preventDefault()}
                              className="flex items-center gap-2"
                            >
                              <UserMinus className="h-4 w-4" />
                              Demote to Member
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Demote Account Holder</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to demote {holder.name} {holder.surname} to a regular member? 
                                This will remove their account holder privileges.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDemoteToMember(holder.accountNo, holder.name)}
                              >
                                Demote to Member
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAccountHolders.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No account holders found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountHolders;