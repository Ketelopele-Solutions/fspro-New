import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="h-16 bg-header border-b border-sidebar-border flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-header-foreground hover:bg-sidebar-accent/20" />
      </div>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-header-foreground hover:bg-sidebar-accent/20"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            30
          </Badge>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-sm">
              BM
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}