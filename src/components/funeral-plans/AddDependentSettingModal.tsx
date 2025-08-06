import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddDependentSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDependentSettingModal({ isOpen, onClose }: AddDependentSettingModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    dsid: "",
    typeOfMember: "",
    numberOfMembers: "",
    coverAmount: "",
    minAge: "",
    maxAge: "",
    status: "Active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    toast({
      title: "Success",
      description: "Dependent setting has been added successfully.",
    });
    
    onClose();
    setFormData({
      dsid: "",
      typeOfMember: "",
      numberOfMembers: "",
      coverAmount: "",
      minAge: "",
      maxAge: "",
      status: "Active"
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Dependent Settings</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dsid">DSID</Label>
              <Input
                id="dsid"
                value={formData.dsid}
                onChange={(e) => handleInputChange("dsid", e.target.value)}
                placeholder="Enter DSID"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="typeOfMember">Type of Member</Label>
              <Input
                id="typeOfMember"
                value={formData.typeOfMember}
                onChange={(e) => handleInputChange("typeOfMember", e.target.value)}
                placeholder="Enter member type"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="numberOfMembers">Number of Members</Label>
              <Input
                id="numberOfMembers"
                type="number"
                value={formData.numberOfMembers}
                onChange={(e) => handleInputChange("numberOfMembers", e.target.value)}
                placeholder="Enter number of members"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverAmount">Cover Amount</Label>
              <Input
                id="coverAmount"
                value={formData.coverAmount}
                onChange={(e) => handleInputChange("coverAmount", e.target.value)}
                placeholder="Enter cover amount"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="minAge">Minimum Age</Label>
              <Input
                id="minAge"
                type="number"
                value={formData.minAge}
                onChange={(e) => handleInputChange("minAge", e.target.value)}
                placeholder="Enter minimum age"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxAge">Maximum Age</Label>
              <Input
                id="maxAge"
                type="number"
                value={formData.maxAge}
                onChange={(e) => handleInputChange("maxAge", e.target.value)}
                placeholder="Enter maximum age"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Settings
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}