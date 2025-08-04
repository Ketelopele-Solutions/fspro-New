import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  title: string;
  value: string;
  total?: string;
  thisMonth?: string;
  type: "members" | "dependents" | "plans" | "revenue";
  trend?: "up" | "down";
  trendValue?: string;
}

export function ActivityCard({ title, value, total, thisMonth, type, trend, trendValue }: ActivityCardProps) {
  const cardColors = {
    members: "bg-activity-members",
    dependents: "bg-activity-dependents", 
    plans: "bg-activity-plans",
    revenue: "bg-activity-revenue"
  };

  return (
    <Card className={cn("text-white", cardColors[type])}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-6xl font-bold">{value}</div>
          {trend && trendValue && (
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs",
              trend === "up" ? "bg-white/20" : "bg-white/20"
            )}>
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {trendValue}
            </div>
          )}
        </div>
        
        <div className="space-y-1 mb-4">
          <div className="text-lg font-semibold">{title}</div>
          {total && (
            <div className="flex justify-between text-sm">
              <span>Total {title.split(' ')[1] || title}</span>
              <span>{total}</span>
            </div>
          )}
          {thisMonth && (
            <div className="flex justify-between text-sm">
              <span>This Month</span>
              <span>{thisMonth}</span>
            </div>
          )}
        </div>

        <Button 
          variant="outline" 
          size="sm"
          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          Details
        </Button>
      </CardContent>
    </Card>
  );
}