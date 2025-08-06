import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Users, UserPlus, FileText, DollarSign, Printer, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data for analytics
const summaryData = {
  newMembers: { value: 0, change: 0.0, trend: "up" },
  newDependents: { value: 0, change: -100.0, trend: "down" },
  newPlans: { value: 0, change: -100.0, trend: "down" },
  revenue: { value: 0, change: -100.0, trend: "down" }
};

const memberGrowthData = [
  { month: "Jan", Members: 0, Dependents: 0 },
  { month: "Feb", Members: 0, Dependents: 0 },
  { month: "Mar", Members: 0, Dependents: 0 },
  { month: "Apr", Members: 0, Dependents: 0 },
  { month: "May", Members: 0, Dependents: 0 },
  { month: "Jun", Members: 0, Dependents: 0 },
  { month: "Jul", Members: 0, Dependents: 0 },
  { month: "Aug", Members: 1, Dependents: 0 },
  { month: "Sep", Members: 0, Dependents: 0 },
  { month: "Oct", Members: 0, Dependents: 0 },
  { month: "Nov", Members: 0, Dependents: 0 },
  { month: "Dec", Members: 0, Dependents: 0 }
];

const revenueData = [
  { month: "Jan", Revenue: 0 },
  { month: "Feb", Revenue: 0 },
  { month: "Mar", Revenue: 0 },
  { month: "Apr", Revenue: 0 },
  { month: "May", Revenue: 0 },
  { month: "Jun", Revenue: 0 },
  { month: "Jul", Revenue: 0 },
  { month: "Aug", Revenue: 0 },
  { month: "Sep", Revenue: 0 },
  { month: "Oct", Revenue: 0 },
  { month: "Nov", Revenue: 0 },
  { month: "Dec", Revenue: 0 }
];

const planDistributionData = [
  { name: "CATERING 6:18-100 (15000) C1", value: 1, members: 1, dependents: 0 },
  { name: "IVORY PLAN FAM 18-65(50000)", value: 1, members: 1, dependents: 0 }
];

const branchStatistics = [
  {
    branch: "Head Office",
    totalMembers: 3,
    newMembers: 1,
    totalDependents: 8,
    totalRevenue: "R 9725.00",
    payments: 0,
    paymentAmount: "R 0.00"
  }
];

const overallStats = {
  totalRevenue: "R 9725.00",
  averagePayment: "R 884.09",
  totalMembers: 3,
  totalDependents: 8,
  totalPlans: 245
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

export default function Analytics() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [selectedBranch, setSelectedBranch] = useState("Head Office");

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-4 justify-end">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="January">January</SelectItem>
            <SelectItem value="February">February</SelectItem>
            <SelectItem value="March">March</SelectItem>
            <SelectItem value="April">April</SelectItem>
            <SelectItem value="May">May</SelectItem>
            <SelectItem value="June">June</SelectItem>
            <SelectItem value="July">July</SelectItem>
            <SelectItem value="August">August</SelectItem>
            <SelectItem value="September">September</SelectItem>
            <SelectItem value="October">October</SelectItem>
            <SelectItem value="November">November</SelectItem>
            <SelectItem value="December">December</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handlePrintReport} className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print Report
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter by Branch:</span>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Head Office">Head Office</SelectItem>
              <SelectItem value="Branch 1">Branch 1</SelectItem>
              <SelectItem value="Branch 2">Branch 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NEW MEMBERS</CardTitle>
            <Users className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.newMembers.value}</div>
            <div className="flex items-center text-xs">
              {summaryData.newMembers.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {summaryData.newMembers.change}%
            </div>
            <p className="text-xs text-white/80 mt-2">Total Members: 3</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NEW DEPENDENTS</CardTitle>
            <UserPlus className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.newDependents.value}</div>
            <div className="flex items-center text-xs">
              <TrendingDown className="h-3 w-3 mr-1" />
              {summaryData.newDependents.change}%
            </div>
            <p className="text-xs text-white/80 mt-2">Total Dependents: 8</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NEW PLANS</CardTitle>
            <FileText className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.newPlans.value}</div>
            <div className="flex items-center text-xs">
              <TrendingDown className="h-3 w-3 mr-1" />
              {summaryData.newPlans.change}%
            </div>
            <p className="text-xs text-white/80 mt-2">Total Plans: 245</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">REVENUE</CardTitle>
            <DollarSign className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {summaryData.revenue.value}</div>
            <div className="flex items-center text-xs">
              <TrendingDown className="h-3 w-3 mr-1" />
              {summaryData.revenue.change}%
            </div>
            <p className="text-xs text-white/80 mt-2">Avg: R 0.00 (0 payments)</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member & Dependent Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Member & Dependent Growth</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly signups for 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={memberGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Members" fill="#8884d8" />
                <Bar dataKey="Dependents" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <p className="text-sm text-muted-foreground">Revenue generated for 2025</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Revenue" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funeral Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Funeral Plan Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">Current distribution of members across plans</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {planDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {planDistributionData.map((plan, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{plan.name}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {plan.members} members, {plan.dependents} dependents (%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Branch Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Branch Revenue</CardTitle>
            <p className="text-sm text-muted-foreground">Revenue distribution across branches</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[{ name: "Head Office", value: 9725 }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Branch Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>BRANCH</TableHead>
                  <TableHead>TOTAL MEMBERS</TableHead>
                  <TableHead>NEW MEMBERS ()</TableHead>
                  <TableHead>TOTAL DEPENDENTS</TableHead>
                  <TableHead>TOTAL REVENUE</TableHead>
                  <TableHead>PAYMENTS ()</TableHead>
                  <TableHead>PAYMENT AMOUNT ()</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branchStatistics.map((branch, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{branch.branch}</TableCell>
                    <TableCell>{branch.totalMembers}</TableCell>
                    <TableCell>{branch.newMembers}</TableCell>
                    <TableCell>{branch.totalDependents}</TableCell>
                    <TableCell>{branch.totalRevenue}</TableCell>
                    <TableCell>{branch.payments}</TableCell>
                    <TableCell>{branch.paymentAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Overall Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>METRIC</TableHead>
                  <TableHead>VALUE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Total Revenue</TableCell>
                  <TableCell>{overallStats.totalRevenue}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Average Payment</TableCell>
                  <TableCell>{overallStats.averagePayment}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Members</TableCell>
                  <TableCell>{overallStats.totalMembers}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Dependents</TableCell>
                  <TableCell>{overallStats.totalDependents}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Plans</TableCell>
                  <TableCell>{overallStats.totalPlans}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}