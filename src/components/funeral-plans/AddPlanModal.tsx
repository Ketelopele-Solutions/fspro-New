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
  const [isLoading, setIsLoading] = useState(false);
  
  // Generate unique plan ID
  const generatePlanId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `FP${timestamp}${random}`;
  };

  const [formData, setFormData] = useState({
    planId: generatePlanId(),
    planName: "",
    planType: "",
    description: "",
    coverAmount: "",
    maxPremium: "",
    status: "Active"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.planName || !formData.planType || !formData.coverAmount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Plan Name, Plan Type, Cover Amount)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Funeral plan has been added successfully.",
      });
      
      onClose();
      setFormData({
        planId: generatePlanId(),
        planName: "",
        planType: "",
        description: "",
        coverAmount: "",
        maxPremium: "",
        status: "Active"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add funeral plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Add New Funeral Plan</DialogTitle>
          <p className="text-sm text-gray-600">Create a new funeral plan with the details below.</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="planId" className="text-sm font-medium text-gray-700">Plan ID *</Label>
              <Input
                id="planId"
                value={formData.planId}
                readOnly
                className="bg-gray-50 text-gray-600 cursor-not-allowed"
                placeholder="Auto-generated"
              />
              <p className="text-xs text-gray-500">Automatically generated unique identifier</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="planName" className="text-sm font-medium text-gray-700">Plan Name *</Label>
              <Input
                id="planName"
                value={formData.planName}
                onChange={(e) => handleInputChange("planName", e.target.value)}
                placeholder="e.g., KGOMO FAMILY 18-65(10K) K10"
                required
                className="focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="planType" className="text-sm font-medium text-gray-700">Plan Type *</Label>
              <Select value={formData.planType} onValueChange={(value) => handleInputChange("planType", value)}>
                <SelectTrigger className="focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Society">Society</SelectItem>
                  <SelectItem value="Stokvel">Stokvel</SelectItem>
                  <SelectItem value="Group">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverAmount" className="text-sm font-medium text-gray-700">Cover Amount (R) *</Label>
              <Input
                id="coverAmount"
                value={formData.coverAmount}
                onChange={(e) => handleInputChange("coverAmount", e.target.value)}
                placeholder="e.g., 10000"
                required
                className="focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxPremium" className="text-sm font-medium text-gray-700">Maximum Premium (R)</Label>
              <Input
                id="maxPremium"
                value={formData.maxPremium}
                onChange={(e) => handleInputChange("maxPremium", e.target.value)}
                placeholder="e.g., 500"
                className="focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-gray-700">Plan Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
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
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter detailed description of the funeral plan..."
              rows={4}
              className="focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gray-800 hover:bg-gray-900" 
              disabled={isLoading}
            >
              {isLoading ? "Adding Plan..." : "Add Plan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}