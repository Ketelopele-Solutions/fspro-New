import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, UserPlus, Users } from "lucide-react";
import { MembersTable } from "@/components/members/MembersTable";
import { AddMemberModal } from "@/components/members/AddMemberModal";
import { useNavigate } from "react-router-dom";

export default function Members() {
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const navigate = useNavigate();

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

      <Tabs defaultValue="view-all" className="space-y-6">
        <TabsList className="grid w-fit grid-cols-3">
          <TabsTrigger value="view-all" className="gap-2">
            <Users className="h-4 w-4" />
            View All Members
          </TabsTrigger>
          <TabsTrigger 
            value="add-member" 
            className="gap-2"
            onClick={() => setAddMemberOpen(true)}
          >
            <UserPlus className="h-4 w-4" />
            Add Member
          </TabsTrigger>
          <TabsTrigger 
            value="field-agents" 
            className="gap-2"
            onClick={() => navigate("/field-agents")}
          >
            <Users className="h-4 w-4" />
            Field Agents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view-all" className="space-y-4">
          <MembersTable />
        </TabsContent>
      </Tabs>

      <AddMemberModal open={addMemberOpen} onOpenChange={setAddMemberOpen} />
    </div>
  );
}