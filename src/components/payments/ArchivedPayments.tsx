import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, RotateCcw, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ArchivedPaymentsProps {
  userRole?: "admin" | "employee";
}

export function ArchivedPayments({ userRole = "employee" }: ArchivedPaymentsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock archived payments data
  const archivedPayments = [
    {
      receiptNo: "AH-E1398099",
      dateTime: "July 31, 2025",
      amount: "R3000.00",
      method: "Cash",
      months: "July 2025",
      funeralPlan: "BLACK PLAN 10-100(10000000)",
      archivedBy: "Rachel",
      id: 1
    },
    {
      receiptNo: "AH-FA386662",
      dateTime: "July 31, 2025",
      amount: "R400.00",
      method: "Cash",
      months: "June 2025",
      funeralPlan: "N/A",
      archivedBy: "Rachel",
      id: 2
    },
    {
      receiptNo: "AH-b4608877",
      dateTime: "July 31, 2025",
      amount: "R400.00",
      method: "Cash",
      months: "July 2025",
      funeralPlan: "N/A",
      archivedBy: "Rachel",
      id: 3
    },
    {
      receiptNo: "AH-314F6239",
      dateTime: "July 14, 2025",
      amount: "R90000.00",
      method: "eft",
      months: "July 2025 August 2025",
      funeralPlan: "PLAN E SINGLE 19-65(20000)",
      archivedBy: "Rachel",
      id: 4
    },
    {
      receiptNo: "AH-4E11893D",
      dateTime: "July 31, 2025",
      amount: "R40.00",
      method: "Cash",
      months: "September 2025",
      funeralPlan: "Funeral plan 90",
      archivedBy: "Rachel",
      id: 5
    },
    {
      receiptNo: "AH-1270TCC7",
      dateTime: "July 15, 2025",
      amount: "R0.00",
      method: "eft",
      months: "January 2025",
      funeralPlan: "PLAN E SINGLE 19-65(20000)",
      archivedBy: "Rachel",
      id: 6
    },
    {
      receiptNo: "AH-32087895",
      dateTime: "July 23, 2025",
      amount: "R0.00",
      method: "Cash",
      months: "January 2025 February 2025 March 2025 April 2025 May 2025 June 2025 July 2025",
      funeralPlan: "PLAN E SINGLE 19-65(20000)",
      archivedBy: "Rachel",
      id: 7
    },
    {
      receiptNo: "175217389A284",
      dateTime: "July 10, 2025",
      amount: "R87.00",
      method: "Cash",
      months: "February 2025",
      funeralPlan: "Funeral plan 90",
      archivedBy: "ADMIN_Rachel",
      id: 8
    }
  ];

  const filteredPayments = archivedPayments.filter(payment =>
    payment.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.funeralPlan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRestore = (paymentId: number) => {
    console.log("Restoring payment:", paymentId);
    // Handle restore logic
  };

  const handleDelete = (paymentId: number) => {
    console.log("Deleting payment:", paymentId);
    // Handle delete logic
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Archived Payments</CardTitle>
        <div className="text-sm text-muted-foreground">Policy No: 25070010</div>
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>RECEIPT NO</TableHead>
              <TableHead>DATE & TIME</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>METHOD</TableHead>
              <TableHead>MONTHS</TableHead>
              <TableHead>FUNERAL PLAN</TableHead>
              <TableHead>ARCHIVED BY</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.receiptNo}</TableCell>
                <TableCell>{payment.dateTime}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell className="max-w-48 truncate">{payment.months}</TableCell>
                <TableCell>{payment.funeralPlan}</TableCell>
                <TableCell>{payment.archivedBy}</TableCell>
                <TableCell>
                  {userRole === "admin" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleRestore(payment.id)}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Restore
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(payment.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <span className="text-muted-foreground text-sm">View only</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredPayments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No archived payments found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}