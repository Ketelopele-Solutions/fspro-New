import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MoreHorizontal, RotateCcw, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ArchivedDependents() {
  const { policyNo } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("5");

  // Mock archived dependents data - empty for now as shown in screenshot
  const archivedDependents: any[] = [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(`/members/${policyNo}/dependents`)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-slate-600">Archived Dependents</h1>
          <span className="text-sm text-muted-foreground">Policy No: {policyNo}</span>
        </div>
      </div>

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
                placeholder="Search archived dependents..."
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
                <TableHead className="text-white">Date Archived</TableHead>
                <TableHead className="text-white">Archived By</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {archivedDependents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-blue-600">
                    No archived dependents found for this member.
                  </TableCell>
                </TableRow>
              ) : (
                archivedDependents.map((dependent) => (
                  <TableRow key={dependent.id}>
                    <TableCell className="font-medium">{dependent.id}</TableCell>
                    <TableCell>{dependent.name}</TableCell>
                    <TableCell>{dependent.relationship}</TableCell>
                    <TableCell>{dependent.dateArchived}</TableCell>
                    <TableCell>{dependent.archivedBy}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem className="gap-2 text-green-600">
                            <RotateCcw className="h-4 w-4" />
                            Restore
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Delete Permanently
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
    </div>
  );
}