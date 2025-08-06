import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddPlanModal({ isOpen, onClose }: AddPlanModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    planId: "",
    planName: "",
    planType: "",
    description: "",
    coverAmount: "",
    maxPremium: "",
    status: "Active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    toast({
      title: "Success",
      description: "Funeral plan has been added successfully.",
    });
    
    onClose();
    setFormData({
      planId: "",
      planName: "",
      planType: "",
      description: "",
      coverAmount: "",
      maxPremium: "",
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
          <DialogTitle>Add New Funeral Plan</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="planId">Plan ID</Label>
              <Input
                id="planId"
                value={formData.planId}
                onChange={(e) => handleInputChange("planId", e.target.value)}
                placeholder="Enter plan ID"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="planName">Plan Name</Label>
              <Input
                id="planName"
                value={formData.planName}
                onChange={(e) => handleInputChange("planName", e.target.value)}
                placeholder="Enter plan name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="planType">Plan Type</Label>
              <Input
                id="planType"
                value={formData.planType}
                onChange={(e) => handleInputChange("planType", e.target.value)}
                placeholder="Enter plan type"
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
              <Label htmlFor="maxPremium">Maximum Premium</Label>
              <Input
                id="maxPremium"
                value={formData.maxPremium}
                onChange={(e) => handleInputChange("maxPremium", e.target.value)}
                placeholder="Enter maximum premium"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Plan Status</Label>
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter plan description"
              rows={4}
              required
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Plan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}