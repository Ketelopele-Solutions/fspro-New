import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserPlus, Users, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FieldAgents() {
  const navigate = useNavigate();
  const [addAgentOpen, setAddAgentOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate("/members")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-semibold">Field Agents</h1>
      </div>

      <div className="flex gap-4">
        <Button variant="default" className="gap-2">
          <Users className="h-4 w-4" />
          Field Agents
        </Button>
        <Button variant="outline" className="gap-2">
          <Link className="h-4 w-4" />
          Agent Referrals
        </Button>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setAddAgentOpen(true)}
        >
          <UserPlus className="h-4 w-4" />
          Add Field Agent
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Field Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No data available in table</p>
          </div>
        </CardContent>
      </Card>

      {/* Add Field Agent Modal */}
      <Dialog open={addAgentOpen} onOpenChange={setAddAgentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add Field Agent
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">FULL NAME</Label>
              <Input id="fullName" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">PHONE NUMBER</Label>
              <Input id="phoneNumber" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">ID NUMBER</Label>
              <Input id="idNumber" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compensationType">COMPENSATION TYPE</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Compensation Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commission">Commission</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">LOCATION</Label>
              <Input id="location" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compensationValue">COMPENSATION VALUE</Label>
              <Input id="compensationValue" />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setAddAgentOpen(false)}>
              <span className="mr-2">✕</span>
              CANCEL
            </Button>
            <Button onClick={() => setAddAgentOpen(false)}>
              <span className="mr-2">💾</span>
              SAVE AGENT
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}