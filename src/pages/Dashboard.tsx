import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { PaymentStatusChart } from "@/components/dashboard/PaymentStatusChart";
import { RecentMembersTable } from "@/components/dashboard/RecentMembersTable";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
      </div>

      <DashboardFilters />

      {/* Recent Activities Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActivityCard
            title="NEW MEMBERS"
            value="24"
            total="115"
            thisMonth="4"
            type="members"
            trend="down"
            trendValue="92.86%"
          />
          <ActivityCard
            title="NEW DEPENDENTS"
            value="18"
            total="86"
            thisMonth="0"
            type="dependents"
            trend="down"
            trendValue="100.0%"
          />
          <ActivityCard
            title="NEW PLANS"
            value="20"
            total="273"
            thisMonth="0"
            type="plans"
            trend="down"
            trendValue="100.0%"
          />
          <ActivityCard
            title="REVENUE"
            value="60627"
            total="RS691.92"
            thisMonth="11"
            type="revenue"
            trend="up"
            trendValue="30.28%"
          />
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentStatusChart />
        <RecentMembersTable />
      </div>
    </div>
  );
}