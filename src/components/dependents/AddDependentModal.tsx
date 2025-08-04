import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddDependentModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyNumber: string;
}

export function AddDependentModal({ isOpen, onClose, policyNumber }: AddDependentModalProps) {
  const [dateEntered, setDateEntered] = useState<Date | undefined>(new Date());
  const [birthDate, setBirthDate] = useState<Date | undefined>();

  const handleSave = () => {
    // Handle save logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-600">
            <Plus className="h-5 w-5 text-blue-600" />
            Add Dependent
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">POLICY NUMBER</Label>
            <Input defaultValue={policyNumber} disabled className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">TITLE</Label>
            <Select>
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
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">FIRST NAME</Label>
            <Input />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">SURNAME</Label>
            <Input />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">GENDER</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">RELATIONSHIP TO MAIN MEMBER</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Relation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">TYPE OF MEMBER</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Type of Member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dependent">Dependent</SelectItem>
                <SelectItem value="beneficiary">Beneficiary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">DATE ENTERED</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateEntered && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateEntered ? format(dateEntered, "yyyy/MM/dd") : <span>yyyy/mm/dd</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateEntered}
                  onSelect={setDateEntered}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">ID NUMBER</Label>
            <Input />
            <div className="text-xs text-red-500">⚠</div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">BIRTH DATE</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !birthDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? format(birthDate, "yyyy/MM/dd") : <span>yyyy/mm/dd</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={setBirthDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="text-xs text-red-500">⚠</div>
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