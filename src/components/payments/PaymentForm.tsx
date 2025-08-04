import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";

interface PaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
  memberData: {
    policyNumber: string;
    name: string;
  };
}

export function PaymentForm({ isOpen, onClose, memberData }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    paymentDate: "2025/08/04",
    captureDate: "2025/08/04 18:45:47",
    coverageEndDate: "2025/08/31",
    selectedPolicies: "",
    paymentMethod: "",
    selectedMonths: "",
    amountDue: "0.00",
    amountPaid: "0.00"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    console.log("Payment submitted:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Account Holder Payment Form
          </DialogTitle>
          <div className="text-sm text-muted-foreground">
            Account: {memberData.policyNumber} | Total Linked Policies: 2
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>PAYMENT DATE</Label>
              <Input
                type="date"
                value={formData.paymentDate}
                onChange={(e) => setFormData(prev => ({...prev, paymentDate: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <Label>CAPTURE DATE</Label>
              <Input
                value={formData.captureDate}
                onChange={(e) => setFormData(prev => ({...prev, captureDate: e.target.value}))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>COVERAGE END DATE</Label>
            <Input
              type="date"
              value={formData.coverageEndDate}
              onChange={(e) => setFormData(prev => ({...prev, coverageEndDate: e.target.value}))}
            />
          </div>

          <div className="space-y-2">
            <Label>SELECT POLICIES</Label>
            <Select value={formData.selectedPolicies} onValueChange={(value) => setFormData(prev => ({...prev, selectedPolicies: value}))}>
              <SelectTrigger>
                <SelectValue placeholder="Select policies..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="policy1">Policy 1 - {memberData.policyNumber}</SelectItem>
                <SelectItem value="policy2">Policy 2 - Related Policy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>PAYMENT METHOD</Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => setFormData(prev => ({...prev, paymentMethod: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="eft">EFT</SelectItem>
                  <SelectItem value="bank_deposit">Bank Deposit</SelectItem>
                  <SelectItem value="debit_order">Debit Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>SELECT MONTHS</Label>
              <Select value={formData.selectedMonths} onValueChange={(value) => setFormData(prev => ({...prev, selectedMonths: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select months..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="august_2025">August 2025</SelectItem>
                  <SelectItem value="september_2025">September 2025</SelectItem>
                  <SelectItem value="october_2025">October 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>AMOUNT DUE</Label>
              <Input
                value={formData.amountDue}
                onChange={(e) => setFormData(prev => ({...prev, amountDue: e.target.value}))}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label>AMOUNT PAID</Label>
              <Input
                value={formData.amountPaid}
                onChange={(e) => setFormData(prev => ({...prev, amountPaid: e.target.value}))}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Pay Now
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}