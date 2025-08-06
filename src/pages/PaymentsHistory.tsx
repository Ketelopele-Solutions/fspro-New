import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowLeft, History } from "lucide-react";

const PaymentsHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  // Mock data for all payments history
  const allPayments = [
    {
      policyNumber: "789016",
      name: "MOKOENAAa None",
      receiptNumber: "1751459509712",
      typeOfMember: "Member",
      amountPaid: "R565.00",
      paymentMethod: "Other",
      paymentDate: "2025-07-02",
      status: "OVERDUE"
    },
    {
      policyNumber: "789016",
      name: "MOKOENAAa None",
      receiptNumber: "1751461692765",
      typeOfMember: "Member",
      amountPaid: "R565.00",
      paymentMethod: "Other",
      paymentDate: "2025-07-02",
      status: "OVERDUE"
    },
    {
      policyNumber: "789016",
      name: "MOKOENAAa None",
      receiptNumber: "1751452033146",
      typeOfMember: "Member",
      amountPaid: "R1130.00",
      paymentMethod: "Other",
      paymentDate: "2025-07-03",
      status: "OVERDUE"
    },
    {
      policyNumber: "789016",
      name: "MOKOENAAa None",
      receiptNumber: "1751482529127",
      typeOfMember: "Member",
      amountPaid: "R565.00",
      paymentMethod: "Other",
      paymentDate: "2025-07-03",
      status: "OVERDUE"
    }
  ];

  const filteredPayments = allPayments.filter(payment =>
    payment.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.receiptNumber.includes(searchTerm) ||
    payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPaymentHistory = (policyNumber: string) => {
    navigate(`/members/${policyNumber}`);
  };

  const getStatusBadge = (status: string) => {
    const variant = status === "OVERDUE" ? "destructive" : 
                   status === "PAID" ? "default" : 
                   "secondary";
    return <Badge variant={variant}>{status}</Badge>;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-slate-700">All Payments History</h1>
      </div>

      <Tabs defaultValue="all-payments" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all-payments" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            All Payments History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-payments">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <Select value={entriesPerPage.toString()} onValueChange={(value) => setEntriesPerPage(parseInt(value))}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span>entries</span>
                </div>
                <div className="w-72">
                  <Input
                    placeholder="Search:"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Receipt Number</TableHead>
                    <TableHead>Type of Member</TableHead>
                    <TableHead>Amount Paid</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.slice(0, entriesPerPage).map((payment, index) => (
                    <TableRow key={`${payment.receiptNumber}-${index}`}>
                      <TableCell className="font-medium text-blue-600">
                        {payment.policyNumber}
                      </TableCell>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell>{payment.receiptNumber}</TableCell>
                      <TableCell>{payment.typeOfMember}</TableCell>
                      <TableCell className="font-medium text-green-600">
                        {payment.amountPaid}
                      </TableCell>
                      <TableCell>{payment.paymentMethod}</TableCell>
                      <TableCell>{payment.paymentDate}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border">
                            <DropdownMenuItem 
                              onClick={() => handleViewPaymentHistory(payment.policyNumber)}
                              className="flex items-center gap-2"
                            >
                              <History className="h-4 w-4" />
                              View Payment History
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredPayments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No payment records found matching your search.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsHistory;