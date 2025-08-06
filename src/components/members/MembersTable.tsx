import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id: string;
  policyno: string;
  firstname: string;
  surname: string;
  id: string;
  premium: number;
  mobile: string;
  activedate: string;
  is_archived: boolean;
  created_at: string;
}

export const MembersTable = forwardRef<{ refreshMembers: () => void }>((props, ref) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("5");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('is_archived', false)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      toast({
        title: "Error",
        description: `Failed to load members: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member =>
    `${member.firstname} ${member.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.policyno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.includes(searchTerm)
  );

  const getStatusBadge = (member: Member) => {
    // Check if member has an active date and is not archived
    if (member.activedate && !member.is_archived) {
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <Badge className="bg-green-100 text-green-800 border-green-200">ACTIVE</Badge>
        </div>
      );
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">WAITING PERIOD</Badge>;
    }
  };

  const handleViewDetails = (policyNo: string) => {
    navigate(`/members/${policyNo}`);
  };

  // Expose refresh function to parent component
  const refreshMembers = () => {
    fetchMembers();
  };

  useImperativeHandle(ref, () => ({
    refreshMembers
  }));

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
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Loading members...
                </TableCell>
              </TableRow>
            ) : filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No members found
                </TableCell>
              </TableRow>
            ) : (
                             filteredMembers.slice(0, parseInt(entriesPerPage)).map((member) => (
                 <TableRow key={member.id}>
                   <TableCell className="font-medium">{member.policyno}</TableCell>
                   <TableCell>{`${member.firstname} ${member.surname}`}</TableCell>
                   <TableCell>{member.id}</TableCell>
                   <TableCell>R{member.premium.toLocaleString()}</TableCell>
                   <TableCell>{"No Plan"}</TableCell>
                   <TableCell>{member.mobile}</TableCell>
                   <TableCell>{getStatusBadge(member)}</TableCell>
                   <TableCell>
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon">
                           <MoreHorizontal className="h-4 w-4" />
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                         <DropdownMenuItem onClick={() => handleViewDetails(member.policyno)}>
                           <Eye className="h-4 w-4 mr-2" />
                           Member Details
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                   </TableCell>
                 </TableRow>
               ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing page 1 of 5
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">4</Button>
          <Button variant="outline" size="sm">5</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
        <Button variant="link" className="text-gray-600">Show All Columns</Button>
      </div>
    </div>
  );
});