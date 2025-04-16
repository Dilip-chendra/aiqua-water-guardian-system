
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { 
  AlertCircle, Bell, BellOff, BellRing, Check, Filter, 
  Info, Search, Settings, Trash2, Users, X 
} from "lucide-react";
import { cn } from "@/lib/utils";

type AlertSeverity = "info" | "warning" | "critical" | "resolved";

interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  severity: AlertSeverity;
  location: string;
  status: "unread" | "read" | "archived";
  affectedUsers?: number;
}

const severityIcons = {
  info: <Info className="h-5 w-5 text-blue-500" />,
  warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
  critical: <BellRing className="h-5 w-5 text-red-500" />,
  resolved: <Check className="h-5 w-5 text-green-500" />
};

const severityLabels = {
  info: "Information",
  warning: "Warning",
  critical: "Critical",
  resolved: "Resolved"
};

const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Elevated Turbidity Detected",
    description: "Turbidity levels at West River Inlet have increased to 2.4 NTU. Values still within acceptable range, but monitoring closely.",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    severity: "warning",
    location: "West River Inlet",
    status: "unread",
    affectedUsers: 240
  },
  {
    id: "2",
    title: "pH Level Stabilized",
    description: "pH levels at South Community Well have returned to normal range (7.0) after corrective measures. Will continue monitoring.",
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    severity: "resolved",
    location: "South Community Well",
    status: "read",
    affectedUsers: 510
  },
  {
    id: "3",
    title: "Scheduled Maintenance Planned",
    description: "Routine maintenance scheduled for North Treatment Plant on Friday from 10AM-2PM. No service disruption expected.",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    severity: "info",
    location: "North Treatment Plant",
    status: "read",
    affectedUsers: 720
  },
  {
    id: "4",
    title: "Critical: Contaminant Detected",
    description: "Higher than acceptable levels of lead detected in Industrial Zone Runoff. Emergency treatment protocols activated.",
    timestamp: new Date(Date.now() - 43200000), // 12 hours ago
    severity: "critical",
    location: "Industrial Zone Runoff",
    status: "unread",
    affectedUsers: 160
  },
  {
    id: "5",
    title: "Water Pressure Fluctuation",
    description: "Minor pressure fluctuations reported in East Water Supply. Technical team investigating. No action required.",
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    severity: "info",
    location: "East Water Supply",
    status: "archived",
    affectedUsers: 350
  },
  {
    id: "6",
    title: "Temperature Anomaly Detected",
    description: "Unusually high water temperature observed at Central Reservoir. Monitoring systems analyzing potential causes.",
    timestamp: new Date(Date.now() - 129600000), // 1.5 days ago
    severity: "warning",
    location: "Central Reservoir",
    status: "unread",
    affectedUsers: 540
  }
];

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const dismissAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? {...alert, status: "archived"} : alert
    ));
  };
  
  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? {...alert, status: "read"} : alert
    ));
  };
  
  const getFilteredAlerts = () => {
    return alerts.filter(alert => {
      // First apply tab filter
      if (activeTab === "unread" && alert.status !== "unread") return false;
      if (activeTab === "archived" && alert.status !== "archived") return false;
      
      // Then apply search filter if present
      if (searchQuery.trim() === "") return true;
      
      const query = searchQuery.toLowerCase();
      return (
        alert.title.toLowerCase().includes(query) ||
        alert.description.toLowerCase().includes(query) ||
        alert.location.toLowerCase().includes(query) ||
        severityLabels[alert.severity].toLowerCase().includes(query)
      );
    });
  };
  
  const filteredAlerts = getFilteredAlerts();
  
  // Count alerts by status
  const unreadCount = alerts.filter(a => a.status === "unread").length;
  const allCount = alerts.filter(a => a.status !== "archived").length;
  const archivedCount = alerts.filter(a => a.status === "archived").length;
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Water Quality Alerts</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage system notifications and quality alerts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Alert Center</CardTitle>
                {unreadCount > 0 && (
                  <Badge variant="destructive">{unreadCount} new</Badge>
                )}
              </div>
              <CardDescription>
                Notifications and alerts from all systems
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search alerts..." 
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="all" className="relative">
                    All
                    {allCount > 0 && (
                      <Badge variant="secondary" className="ml-1">{allCount}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="relative">
                    Unread
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-1">{unreadCount}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="archived" className="relative">
                    Archived
                    {archivedCount > 0 && (
                      <Badge variant="secondary" className="ml-1">{archivedCount}</Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                {["all", "unread", "archived"].map((tab) => (
                  <TabsContent key={tab} value={tab} className="m-0">
                    {filteredAlerts.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 px-4 text-center border rounded-md bg-muted/40">
                        <BellOff className="h-12 w-12 text-muted-foreground opacity-40 mb-3" />
                        <h3 className="font-medium mb-1">No alerts found</h3>
                        <p className="text-sm text-muted-foreground">
                          There are no {tab === "all" ? "" : tab} alerts to display
                        </p>
                      </div>
                    ) : (
                      <ScrollArea className="h-[calc(75vh-17rem)]">
                        <div className="space-y-3 pr-3">
                          {filteredAlerts.map((alert) => (
                            <Card 
                              key={alert.id} 
                              className={cn(
                                "border transition-all",
                                alert.status === "unread" && "bg-muted/40 border-primary/20 shadow-sm"
                              )}
                            >
                              <CardHeader className="py-3 px-4 flex flex-row items-start justify-between gap-2">
                                <div className="flex gap-3">
                                  <div>
                                    {severityIcons[alert.severity]}
                                  </div>
                                  
                                  <div>
                                    <CardTitle className="text-base font-medium">
                                      {alert.title}
                                      {alert.status === "unread" && (
                                        <Badge className="ml-2 bg-primary/10 text-primary-foreground/70 text-xs hover:bg-primary/15">
                                          New
                                        </Badge>
                                      )}
                                    </CardTitle>
                                    <CardDescription className="mt-1 flex items-center gap-2 flex-wrap">
                                      <Badge variant="outline" className="text-xs font-normal">
                                        {alert.location}
                                      </Badge>
                                      <Badge variant="outline" className={cn(
                                        "text-xs font-normal",
                                        alert.severity === "info" && "bg-blue-50 text-blue-700 border-blue-200",
                                        alert.severity === "warning" && "bg-amber-50 text-amber-700 border-amber-200",
                                        alert.severity === "critical" && "bg-red-50 text-red-700 border-red-200",
                                        alert.severity === "resolved" && "bg-green-50 text-green-700 border-green-200"
                                      )}>
                                        {severityLabels[alert.severity]}
                                      </Badge>
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(alert.timestamp).toLocaleString()}
                                      </span>
                                    </CardDescription>
                                  </div>
                                </div>
                                
                                {alert.status !== "archived" && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7"
                                    onClick={() => dismissAlert(alert.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </CardHeader>
                              
                              <CardContent className="py-0 px-4">
                                <p className="text-sm">{alert.description}</p>
                              </CardContent>
                              
                              <CardFooter className="pt-3 pb-3 px-4 flex justify-between">
                                {alert.affectedUsers && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Users className="h-3 w-3 mr-1" />
                                    <span>{alert.affectedUsers} users affected</span>
                                  </div>
                                )}
                                
                                <div className="flex gap-2">
                                  {alert.status === "unread" && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-7 text-xs"
                                      onClick={() => markAsRead(alert.id)}
                                    >
                                      Mark as read
                                    </Button>
                                  )}
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="h-7 text-xs"
                                  >
                                    View details
                                  </Button>
                                </div>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm">Notification Channels</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="in-app" className="font-normal">In-app notifications</Label>
                        </div>
                        <Switch id="in-app" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="email" className="font-normal">Email notifications</Label>
                        </div>
                        <Switch id="email" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="sms" className="font-normal">SMS notifications</Label>
                        </div>
                        <Switch id="sms" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm">Alert Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-red-500 h-3 w-3 p-0" />
                          <Label htmlFor="critical" className="font-normal">Critical alerts</Label>
                        </div>
                        <Switch id="critical" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-amber-400 h-3 w-3 p-0" />
                          <Label htmlFor="warning" className="font-normal">Warning alerts</Label>
                        </div>
                        <Switch id="warning" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-500 h-3 w-3 p-0" />
                          <Label htmlFor="info" className="font-normal">Informational updates</Label>
                        </div>
                        <Switch id="info" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-green-500 h-3 w-3 p-0" />
                          <Label htmlFor="resolved" className="font-normal">Resolved incidents</Label>
                        </div>
                        <Switch id="resolved" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm">Frequency Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Settings className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="summary" className="font-normal">Daily summary report</Label>
                        </div>
                        <Switch id="summary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Settings className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="digest" className="font-normal">Send as digest (batched)</Label>
                        </div>
                        <Switch id="digest" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Settings className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="quiet" className="font-normal">Quiet hours (10PM - 7AM)</Label>
                        </div>
                        <Switch id="quiet" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4 flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Alert History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="flex justify-between py-1 border-b text-muted-foreground">
                      <span>Last 7 days</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between py-1 border-b text-muted-foreground">
                      <span>Last 30 days</span>
                      <span className="font-medium">36</span>
                    </div>
                    <div className="flex justify-between py-1 border-b text-muted-foreground">
                      <span>Critical incidents (30d)</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between py-1 text-muted-foreground">
                      <span>Avg. resolution time</span>
                      <span className="font-medium">2.4 hours</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    View Full History
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Test Alert System
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear All Notifications
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Alert Rules
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Subscribers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
