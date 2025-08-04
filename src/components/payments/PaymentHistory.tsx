import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Archive } from "lucide-react";

export function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");

  // Mock payment history data
  const paymentHistory = [
    {
      receiptNo: "AH-E1398099",
      captureDate: "July 31, 2025",
      amount: "R3000.00",
      method: "Cash",
      monthsPaid: "July 2025",
      funeralPlan: "BLACK PLAN 10-100(10000000)",
      id: 1
    },
    {
      receiptNo: "AH-FA386662",
      captureDate: "July 31, 2025",
      amount: "R400.00",
      method: "Cash",
      monthsPaid: "June 2025",
      funeralPlan: "N/A",
      id: 2
    },
    {
      receiptNo: "AH-b4608877",
      captureDate: "July 31, 2025",
      amount: "R400.00",
      method: "Cash",
      monthsPaid: "July 2025",
      funeralPlan: "N/A",
      id: 3
    }
  ];

  const filteredHistory = paymentHistory.filter(payment =>
    payment.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.funeralPlan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">entries</span>
          </div>
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
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.receiptNo}</TableCell>
                <TableCell>{payment.captureDate}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.monthsPaid}</TableCell>
                <TableCell>{payment.funeralPlan}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Archive className="h-3 w-3" />
                      Archive
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredHistory.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No payment history found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}