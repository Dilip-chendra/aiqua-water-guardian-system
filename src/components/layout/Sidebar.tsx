
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropletIcon,
  HomeIcon,
  MessageSquareIcon,
  MapPinIcon,
  BellIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
  BarChart3Icon,
  ShieldAlertIcon,
  InfoIcon
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "relative z-20 bg-sidebar h-screen flex-shrink-0 transition-all duration-300",
        collapsed ? "w-20" : "w-72",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 text-sidebar-foreground bg-sidebar-accent hover:bg-sidebar-accent/80 hover:text-sidebar-foreground"
        onClick={toggleSidebar}
      >
        {collapsed ? <MenuIcon size={20} /> : <XIcon size={20} />}
      </Button>

      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center">
          <DropletIcon className="h-8 w-8 text-sidebar-primary" />
          {!collapsed && (
            <h1 className="text-2xl font-bold ml-2 text-sidebar-foreground">AIQUA</h1>
          )}
        </div>
        <Separator className="bg-sidebar-border" />

        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-2 px-4">
            <NavItem
              icon={<HomeIcon size={20} />}
              label="Dashboard"
              href="/"
              active={pathname === "/"}
              collapsed={collapsed}
            />
            <NavItem
              icon={<BarChart3Icon size={20} />}
              label="Analytics"
              href="/analytics"
              active={pathname === "/analytics"}
              collapsed={collapsed}
            />
            <NavItem
              icon={<MapPinIcon size={20} />}
              label="Map View"
              href="/map"
              active={pathname === "/map"}
              collapsed={collapsed}
            />
            <NavItem
              icon={<MessageSquareIcon size={20} />}
              label="AI Assistant"
              href="/chat"
              active={pathname === "/chat"}
              collapsed={collapsed}
            />
            <NavItem
              icon={<BellIcon size={20} />}
              label="Alerts"
              href="/alerts"
              active={pathname === "/alerts"}
              collapsed={collapsed}
            />
            <NavItem
              icon={<ShieldAlertIcon size={20} />}
              label="Predictions"
              href="/predictions"
              active={pathname === "/predictions"}
              collapsed={collapsed}
            />
          </nav>

          <Separator className="my-4 bg-sidebar-border" />
          
          <nav className="grid gap-2 px-4">
            <NavItem
              icon={<SettingsIcon size={20} />}
              label="Settings"
              href="/settings"
              active={pathname === "/settings"}
              collapsed={collapsed}
            />
            <NavItem
              icon={<InfoIcon size={20} />}
              label="About"
              href="/about"
              active={pathname === "/about"}
              collapsed={collapsed}
            />
          </nav>
        </ScrollArea>
        
        <Separator className="bg-sidebar-border" />
        <div className="p-4">
          <div className="bg-sidebar-accent rounded-md p-2 text-sidebar-foreground/80 text-sm flex items-center">
            <DropletIcon className="h-4 w-4 mr-2 text-sidebar-primary" />
            {!collapsed && <span>AIQUA Guardian v1.0</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

function NavItem({ icon, label, href, active, collapsed }: NavItemProps) {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start h-12",
          collapsed ? "justify-center px-2" : "px-4", 
          active 
            ? "bg-sidebar-accent text-sidebar-primary font-medium" 
            : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}
      >
        <span className={collapsed ? "" : "mr-3"}>{icon}</span>
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
}
