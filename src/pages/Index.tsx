import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WaterQualityCard } from "@/components/dashboard/WaterQualityCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TemperatureChart, DissolvedOxygenChart, WaterQualityOverviewChart } from "@/components/dashboard/OverviewCharts";
import { WaterQualityMap } from "@/components/map/WaterQualityMap";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { AlertItem } from "@/components/alerts/AlertItem";
import { 
  DropletIcon, 
  ThermometerIcon, 
  EyeIcon, 
  FlaskConicalIcon, 
  ActivityIcon,
  ShieldCheckIcon,
  CloudRainIcon,
  GaugeIcon
} from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AIQUA Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Real-time water quality monitoring and predictions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Active Sensors"
            value="24"
            description="Reporting normally"
            icon={<CloudRainIcon className="h-4 w-4" />}
            trend={{ value: 2, label: "from last week", positive: true }}
          />
          <StatsCard 
            title="Water Sources"
            value="7"
            description="Monitored locations"
            icon={<GaugeIcon className="h-4 w-4" />}
          />
          <StatsCard 
            title="Daily Tests"
            value="384"
            description="Parameters monitored"
            icon={<ActivityIcon className="h-4 w-4" />}
            trend={{ value: 12, label: "from last week", positive: true }}
          />
          <StatsCard 
            title="Quality Score"
            value="92/100"
            description="Overall system health"
            icon={<ShieldCheckIcon className="h-4 w-4" />}
            trend={{ value: 3, label: "from last month", positive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <WaterQualityCard
            title="pH Level"
            value={7.2}
            unit="pH"
            minValue={6.5}
            maxValue={8.0}
            level="safe"
            icon={<FlaskConicalIcon className="h-4 w-4" />}
          />
          <WaterQualityCard
            title="Turbidity"
            value={1.4}
            unit="NTU"
            minValue={0}
            maxValue={5}
            level="safe"
            icon={<EyeIcon className="h-4 w-4" />}
          />
          <WaterQualityCard
            title="Temperature"
            value={18.6}
            unit="°C"
            minValue={10}
            maxValue={25}
            level="safe"
            icon={<ThermometerIcon className="h-4 w-4" />}
          />
          <WaterQualityCard
            title="Dissolved Oxygen"
            value={8.1}
            unit="mg/L"
            minValue={6}
            maxValue={12}
            level="safe"
            icon={<DropletIcon className="h-4 w-4" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WaterQualityOverviewChart />
          <div className="flex flex-col gap-6">
            <TemperatureChart />
            <DissolvedOxygenChart />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[500px]">
            <WaterQualityMap />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-1">AI Assistant</h2>
            <div className="h-[450px]">
              <ChatInterface />
            </div>
          </div>
        </div>
        
        <div className="mt-2">
          <h2 className="text-xl font-semibold mb-4">Latest Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AlertItem 
              title="Elevated Turbidity Detected"
              description="Turbidity levels at West River Inlet have increased to 2.4 NTU. Values still within acceptable range, but monitoring closely."
              timestamp={new Date(Date.now() - 3600000)} // 1 hour ago
              severity="warning"
              location="West River Inlet"
              onDismiss={() => {}}
              onViewDetails={() => {}}
            />
            <AlertItem 
              title="pH Level Stabilized"
              description="pH levels at South Community Well have returned to normal range (7.0) after corrective measures. Will continue monitoring."
              timestamp={new Date(Date.now() - 7200000)} // 2 hours ago
              severity="resolved"
              location="South Community Well"
              onDismiss={() => {}}
              onViewDetails={() => {}}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
