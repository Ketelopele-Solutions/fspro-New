import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Edit } from "lucide-react";

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: any;
}

export function EditMemberModal({ isOpen, onClose, member }: EditMemberModalProps) {
  const [changeFuneralPlan, setChangeFuneralPlan] = useState(false);

  const handleSave = () => {
    // Handle save logic here
    onClose();
  };

  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-600">
            <Edit className="h-5 w-5 text-blue-600" />
            Edit Member: {member.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Plan Display */}
          <div className="bg-blue-50 p-3 rounded-md flex items-center justify-between">
            <span className="text-sm text-blue-800">
              Current Plan: SECOND PLAN R 34.90 100k R10 (R5000)
            </span>
            <div className="flex items-center gap-2">
              <Switch 
                checked={changeFuneralPlan}
                onCheckedChange={setChangeFuneralPlan}
              />
              <span className="text-sm">Change Funeral Plan</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">POLICY NUMBER</Label>
              <Input defaultValue={member.policyNumber} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">TITLE</Label>
              <Select defaultValue="mr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mr">Mr</SelectItem>
                  <SelectItem value="mrs">Mrs</SelectItem>
                  <SelectItem value="ms">Ms</SelectItem>
                  <SelectItem value="dr">Dr</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">FIRST NAME</Label>
              <Input defaultValue="KHEHLA ALFRED" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">SURNAME</Label>
              <Input defaultValue="RADEBE" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">GENDER</Label>
              <Select defaultValue="male">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">BRANCH</Label>
              <Select defaultValue="harrismith">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="harrismith">Harrismith</SelectItem>
                  <SelectItem value="ladybrand">Ladybrand</SelectItem>
                  <SelectItem value="bethlehem">Bethlehem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">BIRTHDATE</Label>
              <Input defaultValue="1940/09/05 00:00" disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">ID NUMBER</Label>
              <Input defaultValue="4509056086087" disabled className="bg-muted" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">ADDRESS</Label>
            <Textarea defaultValue="4141 INTABAZWE" rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">PHONE NUMBER</Label>
              <Input defaultValue="0728553854" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">TEL (HOME)</Label>
              <Input defaultValue="0" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">PREMIUM (R)</Label>
              <Input defaultValue="140" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">DATE JOINED</Label>
              <Input defaultValue="2021/03/04 00:00" disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">ACTIVE DATE</Label>
              <Input defaultValue="2023/06/15 00:00" disabled className="bg-muted" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
            SAVE
          </Button>
          <Button variant="outline" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white">
            CANCEL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}