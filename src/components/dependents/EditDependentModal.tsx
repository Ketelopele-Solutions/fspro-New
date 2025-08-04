import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";

interface EditDependentModalProps {
  isOpen: boolean;
  onClose: () => void;
  dependent: any;
}

export function EditDependentModal({ isOpen, onClose, dependent }: EditDependentModalProps) {
  const handleSave = () => {
    // Handle save logic here
    onClose();
  };

  if (!dependent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-600">
            <Edit className="h-5 w-5 text-blue-600" />
            Edit Dependent: {dependent.fullName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">DEPENDENT ID</Label>
            <Input defaultValue={dependent.id} disabled className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">FULL NAME</Label>
            <Input defaultValue={dependent.fullName} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">ID NUMBER</Label>
            <Input defaultValue={dependent.idNumber} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">AGE</Label>
            <Input defaultValue={dependent.age} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">STATUS</Label>
            <Input defaultValue={dependent.status} disabled className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">DATE ENTERED</Label>
            <Input defaultValue={dependent.dateEntered} disabled className="bg-muted" />
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