import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentOverviewProps {
  memberData: {
    policyNumber: string;
    name: string;
  };
}

export function PaymentOverview({ memberData }: PaymentOverviewProps) {
  // Mock payment data - in real app this would come from API
  const paymentData = {
    latestPayment: "No payment history",
    paymentDate: "N/A",
    captureDate: "N/A",
    paymentMethod: "N/A",
    monthsPaid: "N/A",
    overdueMonths: "June 2025, July 2025, August 2025",
    paymentStatus: "Unpaid",
    amountDue: "R120.00",
    monthlyPremium: "R40.00"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xs text-blue-600">👤</span>
          </span>
          Member Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Policy Number</div>
            <div className="mt-1">{memberData.policyNumber}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Member Name</div>
            <div className="mt-1">{memberData.name}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Date Joined</div>
            <div className="mt-1">June 01, 2025</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Branch</div>
            <div className="mt-1">Bethlehem</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Latest Payment Amount</div>
            <div className="mt-1">{paymentData.latestPayment}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Payment Date</div>
            <div className="mt-1">{paymentData.paymentDate}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Capture Date</div>
            <div className="mt-1">{paymentData.captureDate}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Payment Method</div>
            <div className="mt-1">{paymentData.paymentMethod}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Months Paid</div>
            <div className="mt-1">{paymentData.monthsPaid}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Overdue Months</div>
            <div className="mt-1">{paymentData.overdueMonths}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Payment Status</div>
            <div className="mt-1">
              <Badge variant="destructive">{paymentData.paymentStatus}</Badge>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Amount Due</div>
            <div className="mt-1">{paymentData.amountDue}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Monthly Premium</div>
            <div className="mt-1">{paymentData.monthlyPremium}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}