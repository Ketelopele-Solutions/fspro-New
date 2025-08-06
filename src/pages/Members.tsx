import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, Users, User } from "lucide-react";
import { MembersTable } from "@/components/members/MembersTable";
import { AddMemberModal } from "@/components/members/AddMemberModal";
import { useNavigate } from "react-router-dom";

export default function Members() {
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const navigate = useNavigate();
  const membersTableRef = useRef<{ refreshMembers: () => void }>(null);

  return (
    <div className="space-y-6">
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
        <h1 className="text-3xl font-semibold">Members</h1>
      </div>

      <div className="flex gap-4">
        <Button 
          className="gap-2 bg-gray-800 hover:bg-gray-900"
          onClick={() => navigate("/members")}
        >
          <Users className="h-4 w-4" />
          View All Members
        </Button>
        <Button 
          variant="outline"
          className="gap-2"
          onClick={() => setAddMemberOpen(true)}
        >
          <UserPlus className="h-4 w-4" />
          Add Member
        </Button>
        <Button 
          variant="outline"
          className="gap-2"
          onClick={() => navigate("/field-agents")}
        >
          <User className="h-4 w-4" />
          Field Agents
        </Button>
      </div>

      <MembersTable ref={membersTableRef} />

      <AddMemberModal 
        open={addMemberOpen} 
        onOpenChange={setAddMemberOpen}
        onMemberAdded={() => {
          membersTableRef.current?.refreshMembers();
        }}
      />
    </div>
  );
}