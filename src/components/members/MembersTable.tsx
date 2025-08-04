import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const members = [
  {
    policyNo: "789020",
    fullName: "MANTILETSANE MOLAHLEHI",
    id: "4204080417086",
    premium: "R470.00",
    plan: "BLACK PLAN FAM 66-75 (30K)",
    mobile: "0655302214",
    status: "ACTIVE"
  },
  {
    policyNo: "789023",
    fullName: "KHEHLA ALFRED RADEBE",
    id: "4205055269089",
    premium: "R180.00", 
    plan: "KGOMO PLAN 14-18-100 (10K) K10",
    mobile: "0725953564",
    status: "ACTIVE"
  },
  {
    policyNo: "25040002",
    fullName: "nomhle mbiba",
    id: "0202141057097",
    premium: "R0.00",
    plan: "No Plan",
    mobile: "0655302219",
    status: "WAITING PERIOD"
  },
  {
    policyNo: "25070003",
    fullName: "Bhilili Mtebele",
    id: "0202145678975",
    premium: "R470.00",
    plan: "BLACK PLAN FAM 66-75 (30K)",
    mobile: "0835740057",
    status: "ACTIVE"
  },
  {
    policyNo: "25070008",
    fullName: "TEBOHO JOHANNES SEKHOSANA",
    id: "8908065883080",
    premium: "R280.00",
    plan: "BLACK PLAN FAM 18-65 (30K)",
    mobile: "0655302219",
    status: "WAITING PERIOD"
  }
];

export function MembersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("5");
  const navigate = useNavigate();

  const filteredMembers = members.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.policyNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-status-active text-status-active-foreground">ACTIVE</Badge>;
      case "WAITING PERIOD":
        return <Badge className="bg-status-waiting text-status-waiting-foreground">WAITING PERIOD</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewDetails = (policyNo: string) => {
    navigate(`/members/${policyNo}`);
  };

  return (
    <div className="space-y-4">
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
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      {/* Members Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
              <TableHead className="text-primary-foreground">POLICY NO</TableHead>
              <TableHead className="text-primary-foreground">FULL NAME</TableHead>
              <TableHead className="text-primary-foreground">ID</TableHead>
              <TableHead className="text-primary-foreground">PREMIUM</TableHead>
              <TableHead className="text-primary-foreground">PLAN</TableHead>
              <TableHead className="text-primary-foreground">MOBILE</TableHead>
              <TableHead className="text-primary-foreground">STATUS</TableHead>
              <TableHead className="text-primary-foreground">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.slice(0, parseInt(entriesPerPage)).map((member) => (
              <TableRow key={member.policyNo}>
                <TableCell className="font-medium">{member.policyNo}</TableCell>
                <TableCell>{member.fullName}</TableCell>
                <TableCell>{member.id}</TableCell>
                <TableCell>{member.premium}</TableCell>
                <TableCell>{member.plan}</TableCell>
                <TableCell>{member.mobile}</TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(member.policyNo)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Member Details
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
          Showing page 1 of 7
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">4</Button>
          <Button variant="outline" size="sm">5</Button>
          <Button variant="outline" size="sm">6</Button>
          <Button variant="outline" size="sm">7</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
        <Button variant="link" className="text-primary">Show All Columns</Button>
      </div>
    </div>
  );
}