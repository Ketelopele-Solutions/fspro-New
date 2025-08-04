import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const recentMembers = [
  {
    fullName: "Ketel Opile",
    policyNumber: "25080001",
    dateJoined: "30 Aug 2025",
    status: "New"
  },
  {
    fullName: "CC DD",
    policyNumber: "25080004", 
    dateJoined: "30 Aug 2025",
    status: "Active"
  },
  {
    fullName: "AA BB",
    policyNumber: "25080003",
    dateJoined: "30 Aug 2025",
    status: "Active"
  },
  {
    fullName: "AA BB",
    policyNumber: "25080002",
    dateJoined: "30 Aug 2025",
    status: "Active"
  },
  {
    fullName: "Naye Bizo",
    policyNumber: "25070086",
    dateJoined: "31 Jul 2025",
    status: "Active"
  }
];

export function RecentMembersTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recently Joined Members</CardTitle>
        <Button variant="link" className="text-primary">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">FULL NAME</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">POLICY NUMBER</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">DATE JOINED</th>
              </tr>
            </thead>
            <tbody>
              {recentMembers.map((member) => (
                <tr key={member.policyNumber} className="border-b border-border/50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {member.fullName}
                      {member.status === "New" && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          New
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{member.policyNumber}</td>
                  <td className="p-3 text-muted-foreground">{member.dateJoined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}