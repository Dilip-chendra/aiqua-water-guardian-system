
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Download, Filter, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for charts
const qualityTrendData = [
  { month: 'Jan', pH: 7.2, turbidity: 1.3, temperature: 18.2, oxygen: 8.1 },
  { month: 'Feb', pH: 7.4, turbidity: 1.2, temperature: 18.5, oxygen: 8.3 },
  { month: 'Mar', pH: 7.3, turbidity: 1.5, temperature: 19.1, oxygen: 8.0 },
  { month: 'Apr', pH: 7.1, turbidity: 1.8, temperature: 19.5, oxygen: 7.8 },
  { month: 'May', pH: 7.0, turbidity: 2.0, temperature: 20.3, oxygen: 7.6 },
  { month: 'Jun', pH: 6.9, turbidity: 2.2, temperature: 21.5, oxygen: 7.3 },
  { month: 'Jul', pH: 6.8, turbidity: 2.4, temperature: 22.8, oxygen: 7.1 },
  { month: 'Aug', pH: 6.7, turbidity: 2.6, temperature: 23.2, oxygen: 6.9 },
  { month: 'Sep', pH: 6.9, turbidity: 2.3, temperature: 22.1, oxygen: 7.2 },
  { month: 'Oct', pH: 7.0, turbidity: 2.1, temperature: 21.0, oxygen: 7.5 },
  { month: 'Nov', pH: 7.2, turbidity: 1.8, temperature: 19.7, oxygen: 7.8 },
  { month: 'Dec', pH: 7.3, turbidity: 1.5, temperature: 18.8, oxygen: 8.0 }
];

const contaminantData = [
  { name: 'Nitrates', value: 32 },
  { name: 'Phosphates', value: 27 },
  { name: 'Chlorine', value: 18 },
  { name: 'Heavy Metals', value: 13 },
  { name: 'Pesticides', value: 10 }
];

const qualityDistributionData = [
  { name: 'Excellent', value: 45 },
  { name: 'Good', value: 30 },
  { name: 'Fair', value: 15 },
  { name: 'Poor', value: 8 },
  { name: 'Critical', value: 2 }
];

const riskAssessmentData = [
  { location: 'Central Reservoir', risk: 10 },
  { location: 'North Treatment', risk: 15 },
  { location: 'East Supply', risk: 25 },
  { location: 'West River', risk: 45 },
  { location: 'South Well', risk: 65 },
  { location: 'Industrial Zone', risk: 85 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const QUALITY_COLORS = ['#16a34a', '#4ade80', '#eab308', '#ef4444', '#b91c1c'];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Water Quality Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Advanced analysis and insights from water quality data
          </p>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Tabs defaultValue="monthly">
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>Date Range</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="central">Central Reservoir</SelectItem>
                <SelectItem value="north">North Treatment Plant</SelectItem>
                <SelectItem value="east">East Water Supply</SelectItem>
                <SelectItem value="west">West River Inlet</SelectItem>
                <SelectItem value="south">South Community Well</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Water Quality Parameters Over Time</CardTitle>
              <CardDescription>Tracking pH, turbidity, temperature and dissolved oxygen</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ph">
                <TabsList className="mb-4">
                  <TabsTrigger value="ph">pH Level</TabsTrigger>
                  <TabsTrigger value="turbidity">Turbidity</TabsTrigger>
                  <TabsTrigger value="temperature">Temperature</TabsTrigger>
                  <TabsTrigger value="oxygen">Dissolved Oxygen</TabsTrigger>
                </TabsList>
                <TabsContent value="ph" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={qualityTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis domain={[6.5, 7.5]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="pH" stroke="#0088FE" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="turbidity" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={qualityTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 'dataMax + 0.5']} />
                      <Tooltip />
                      <Line type="monotone" dataKey="turbidity" stroke="#00C49F" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="temperature" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={qualityTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis domain={[15, 25]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="temperature" stroke="#FFBB28" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="oxygen" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={qualityTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis domain={[6, 9]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="oxygen" stroke="#FF8042" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contaminant Distribution</CardTitle>
              <CardDescription>Breakdown of detected contaminants in samples</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contaminantData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contaminantData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Water Quality Distribution</CardTitle>
              <CardDescription>Classification of water sources by quality rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {qualityDistributionData.map((entry, index) => (
                  <div key={entry.name} className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full mb-1`} style={{ backgroundColor: QUALITY_COLORS[index] }}></div>
                    <span className="text-xs font-medium">{entry.name}</span>
                  </div>
                ))}
              </div>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={qualityDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${value}%`}
                    >
                      {qualityDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={QUALITY_COLORS[index % QUALITY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contamination Risk Assessment</CardTitle>
              <CardDescription>Risk level analysis by location (0-100)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={riskAssessmentData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="location" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="risk" barSize={20}>
                      {riskAssessmentData.map((entry, index) => {
                        let color = '#16a34a';
                        if (entry.risk > 20) color = '#4ade80';
                        if (entry.risk > 40) color = '#eab308';
                        if (entry.risk > 60) color = '#ef4444';
                        if (entry.risk > 80) color = '#b91c1c';
                        return <Cell key={`cell-${index}`} fill={color} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
