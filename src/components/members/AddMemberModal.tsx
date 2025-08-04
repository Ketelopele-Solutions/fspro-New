import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus } from "lucide-react";

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMemberModal({ open, onOpenChange }: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    funeralPlan: "",
    premium: "0.00",
    firstName: "",
    surname: "",
    idNumber: "",
    birthDate: "",
    gender: "",
    title: "",
    address: "",
    branch: "",
    phoneNumber: "",
    telHome: "",
    captureDate: "",
    dateJoined: "",
    fieldAgent: ""
  });

  const handleSave = () => {
    // Handle saving the member data
    console.log("Saving member:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add Member
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="funeralPlan">FUNERAL PLAN:</Label>
            <Select value={formData.funeralPlan} onValueChange={(value) => setFormData({...formData, funeralPlan: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select Funeral Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black-plan">Black Plan FAM 66-75 (30K)</SelectItem>
                <SelectItem value="kgomo-plan">Kgomo Plan 14-18-100 (10K)</SelectItem>
                <SelectItem value="after-tears">After Tears Package</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="premium">PREMIUM (R):</Label>
            <Input
              id="premium"
              value={formData.premium}
              onChange={(e) => setFormData({...formData, premium: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName">FIRST NAME:</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="surname">SURNAME:</Label>
            <Input
              id="surname"
              value={formData.surname}
              onChange={(e) => setFormData({...formData, surname: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idNumber">ID NUMBER:</Label>
            <Input
              id="idNumber"
              value={formData.idNumber}
              onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">BIRTH DATE:</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">GENDER:</Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">TITLE:</Label>
            <Select value={formData.title} onValueChange={(value) => setFormData({...formData, title: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select Title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mr">Mr</SelectItem>
                <SelectItem value="mrs">Mrs</SelectItem>
                <SelectItem value="ms">Ms</SelectItem>
                <SelectItem value="dr">Dr</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="address">ADDRESS:</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch">BRANCH:</Label>
            <Select value={formData.branch} onValueChange={(value) => setFormData({...formData, branch: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="branch1">Branch 1</SelectItem>
                <SelectItem value="branch2">Branch 2</SelectItem>
                <SelectItem value="branch3">Branch 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">PHONE NUMBER:</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telHome">TEL (HOME):</Label>
            <Input
              id="telHome"
              value={formData.telHome}
              onChange={(e) => setFormData({...formData, telHome: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="captureDate">CAPTURE DATE:</Label>
            <Input
              id="captureDate"
              type="date"
              value={formData.captureDate}
              onChange={(e) => setFormData({...formData, captureDate: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateJoined">DATE JOINED:</Label>
            <Input
              id="dateJoined"
              type="date"
              value={formData.dateJoined}
              onChange={(e) => setFormData({...formData, dateJoined: e.target.value})}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="fieldAgent">FIELD AGENT (REFERRAL):</Label>
            <Select value={formData.fieldAgent} onValueChange={(value) => setFormData({...formData, fieldAgent: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select Field Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent1">Agent 1</SelectItem>
                <SelectItem value="agent2">Agent 2</SelectItem>
                <SelectItem value="agent3">Agent 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            CANCEL
          </Button>
          <Button onClick={handleSave}>
            SAVE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}