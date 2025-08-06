import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMemberAdded?: () => void;
}

export function AddMemberModal({ open, onOpenChange, onMemberAdded }: AddMemberModalProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
    captureDate: new Date().toISOString().split('T')[0],
    dateJoined: new Date().toISOString().split('T')[0],
    fieldAgent: ""
  });

  const handleSave = async () => {
    if (!formData.firstName || !formData.surname || !formData.idNumber) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (First Name, Surname, ID Number)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
             // Generate a unique policy number
       const currentDate = new Date();
       const year = currentDate.getFullYear().toString().slice(-2);
       const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
       const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
       const policyNumber = `${year}${month}${randomNum}`;

       const { data, error } = await supabase
         .from('members')
         .insert([
           {
             policyno: policyNumber,
             firstname: formData.firstName,
             surname: formData.surname,
             id: formData.idNumber,
             birthdate: formData.birthDate,
             gender: formData.gender,
             title: formData.title,
             address: formData.address,
             branch: formData.branch,
             mobile: formData.phoneNumber,
             telh: formData.telHome,
             capture_date: formData.captureDate,
             datejoined: formData.dateJoined,
             premium: parseFloat(formData.premium) || 0,
             activedate: new Date().toISOString().split('T')[0],
             created_by: 'system',
             is_archived: false
           }
         ])
         .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Member added successfully!",
      });

      // Reset form
      setFormData({
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
        captureDate: new Date().toISOString().split('T')[0],
        dateJoined: new Date().toISOString().split('T')[0],
        fieldAgent: ""
      });

      onOpenChange(false);
      onMemberAdded?.();
         } catch (error) {
       console.error('Error adding member:', error);
       console.error('Error details:', JSON.stringify(error, null, 2));
       toast({
         title: "Error",
         description: `Failed to add member: ${error.message || 'Unknown error'}`,
         variant: "destructive",
       });
     } finally {
       setIsLoading(false);
     }
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
              placeholder="yyyy/mm/dd"
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
              value={formData.captureDate}
              onChange={(e) => setFormData({...formData, captureDate: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateJoined">DATE JOINED:</Label>
            <Input
              id="dateJoined"
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
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "SAVING..." : "SAVE"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}