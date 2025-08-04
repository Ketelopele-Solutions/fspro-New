import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer, Filter } from "lucide-react";

export function DashboardFilters() {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Select defaultValue="august">
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="august">August</SelectItem>
          <SelectItem value="september">September</SelectItem>
          <SelectItem value="october">October</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" className="gap-2">
        <Printer className="h-4 w-4" />
        Print Report
      </Button>

      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <span className="text-sm text-muted-foreground">Filter by Branch:</span>
        <Select defaultValue="all">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="branch1">Branch 1</SelectItem>
            <SelectItem value="branch2">Branch 2</SelectItem>
            <SelectItem value="branch3">Branch 3</SelectItem>
            <SelectItem value="branch4">Branch 4</SelectItem>
            <SelectItem value="branch5">Branch 5</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}