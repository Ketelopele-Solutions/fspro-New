import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

interface DeletePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export function DeletePlanModal({ isOpen, onClose, planName }: DeletePlanModalProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    // Simulate API call
    toast({
      title: "Success",
      description: "Funeral plan has been deleted successfully.",
      variant: "destructive"
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Delete Funeral Plan
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete the funeral plan "{planName}"? This action cannot be undone.
          </p>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete Plan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}