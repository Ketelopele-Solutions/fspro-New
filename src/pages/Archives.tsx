import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Archives() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("5");

  // Mock archived members data
  const archivedMembers = [
    {
      policyNo: "",
      fullName: "John Doe",
      type: "Member",
      status: "LAPSED",
      branch: "Head Office",
      dateArchived: "2025-08-01 14:44",
      archivedBy: "system_auto_archive"
    },
    {
      policyNo: "25080008",
      fullName: "RR RR",
      type: "Member", 
      status: "ARCHIVED",
      branch: "Harrismith",
      dateArchived: "2025-08-04 09:50",
      archivedBy: "ADMIN_Rachel"
    },
    {
      policyNo: "25080012",
      fullName: "Test One",
      type: "Member",
      status: "ARCHIVED", 
      branch: "Bethlehem",
      dateArchived: "2025-08-04 09:49",
      archivedBy: "ADMIN_Rachel"
    },
    {
      policyNo: "25080014",
      fullName: "Test Two",
      type: "Member",
      status: "ARCHIVED",
      branch: "Harrismith", 
      dateArchived: "2025-08-04 09:49",
      archivedBy: "ADMIN_Rachel"
    },
    {
      policyNo: "25080015",
      fullName: "Test Three",
      type: "Member",
      status: "ARCHIVED",
      branch: "Makeneng",
      dateArchived: "2025-08-04 09:49", 
      archivedBy: "ADMIN_Rachel"
    }
  ];

  const filteredMembers = archivedMembers.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.policyNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === "LAPSED") {
      return <Badge variant="destructive" className="bg-red-500 text-white">{status}</Badge>;
    }
    return <Badge variant="secondary" className="bg-slate-500 text-white">{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-semibold text-slate-600">Archives</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <Button 
              variant="default"
              className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2"
            >
              📁 Archived Members
            </Button>
          </div>

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
                placeholder="Search archived members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-600">
                <TableHead className="text-white">Policy No</TableHead>
                <TableHead className="text-white">Full Name</TableHead>
                <TableHead className="text-white">Type</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Branch</TableHead>
                <TableHead className="text-white">Date Archived</TableHead>
                <TableHead className="text-white">Archived By</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-blue-600">
                    No archived members found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{member.policyNo}</TableCell>
                    <TableCell>{member.fullName}</TableCell>
                    <TableCell>{member.type}</TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell>{member.branch}</TableCell>
                    <TableCell>{member.dateArchived}</TableCell>
                    <TableCell>{member.archivedBy}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => navigate(`/archives/members/${member.policyNo || 'no-policy'}`)}
                          >
                            👁️ Member Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">
              Showing page 1 of 1
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
                  <PaginationNext href="#" className="pointer-events-none opacity-50" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}