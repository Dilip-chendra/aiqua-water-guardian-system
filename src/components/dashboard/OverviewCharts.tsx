
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, LineChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const waterQualityData = [
  { day: "Mon", ph: 7.2, turbidity: 1.2, temperature: 18.5, oxygen: 8.2 },
  { day: "Tue", ph: 7.1, turbidity: 1.3, temperature: 18.7, oxygen: 8.0 },
  { day: "Wed", ph: 7.3, turbidity: 1.0, temperature: 19.1, oxygen: 8.3 },
  { day: "Thu", ph: 7.0, turbidity: 1.5, temperature: 19.4, oxygen: 7.8 },
  { day: "Fri", ph: 7.2, turbidity: 1.7, temperature: 19.2, oxygen: 7.9 },
  { day: "Sat", ph: 7.4, turbidity: 1.4, temperature: 18.9, oxygen: 8.1 },
  { day: "Sun", ph: 7.2, turbidity: 1.2, temperature: 18.6, oxygen: 8.2 },
];

const weeklyData = [
  { week: "W1", ph: 7.2, turbidity: 1.3, temperature: 18.6, oxygen: 8.1 },
  { week: "W2", ph: 7.1, turbidity: 1.5, temperature: 19.2, oxygen: 7.9 },
  { week: "W3", ph: 7.3, turbidity: 1.2, temperature: 18.8, oxygen: 8.0 },
  { week: "W4", ph: 7.0, turbidity: 1.6, temperature: 19.5, oxygen: 7.7 },
];

const monthlyData = [
  { month: "Jan", ph: 7.1, turbidity: 1.4, temperature: 17.5, oxygen: 8.3 },
  { month: "Feb", ph: 7.2, turbidity: 1.3, temperature: 18.0, oxygen: 8.2 },
  { month: "Mar", ph: 7.3, turbidity: 1.2, temperature: 18.5, oxygen: 8.1 },
  { month: "Apr", ph: 7.1, turbidity: 1.5, temperature: 19.0, oxygen: 8.0 },
  { month: "May", ph: 7.0, turbidity: 1.7, temperature: 20.0, oxygen: 7.8 },
  { month: "Jun", ph: 6.9, turbidity: 1.9, temperature: 21.5, oxygen: 7.6 },
];

export function WaterQualityOverviewChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Water Quality Overview</CardTitle>
        <CardDescription>
          Track key parameters over time to monitor water quality.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="daily" className="px-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={waterQualityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis 
                  yAxisId="left"
                  orientation="left"
                  tick={{ fontSize: 12 }}
                  domain={[6.5, 7.5]}
                  label={{ value: 'pH', angle: -90, position: 'insideLeft', dy: 40, fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tick={{ fontSize: 12 }}
                  domain={[0, 3]}
                  label={{ value: 'Turbidity (NTU)', angle: 90, position: 'insideRight', dx: -10, fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    borderColor: 'var(--border)',
                    fontSize: '12px'
                  }} 
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="ph" 
                  name="pH Level"
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="turbidity"
                  name="Turbidity (NTU)" 
                  stroke="var(--secondary)" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="weekly" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weeklyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis 
                  yAxisId="left"
                  orientation="left"
                  tick={{ fontSize: 12 }}
                  domain={[6.5, 7.5]}
                  label={{ value: 'pH', angle: -90, position: 'insideLeft', dy: 40, fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tick={{ fontSize: 12 }}
                  domain={[0, 3]}
                  label={{ value: 'Turbidity (NTU)', angle: 90, position: 'insideRight', dx: -10, fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    borderColor: 'var(--border)',
                    fontSize: '12px'
                  }} 
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="ph" 
                  name="pH Level"
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="turbidity"
                  name="Turbidity (NTU)" 
                  stroke="var(--secondary)" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis 
                  yAxisId="left"
                  orientation="left"
                  tick={{ fontSize: 12 }}
                  domain={[6.5, 7.5]}
                  label={{ value: 'pH', angle: -90, position: 'insideLeft', dy: 40, fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tick={{ fontSize: 12 }}
                  domain={[0, 3]}
                  label={{ value: 'Turbidity (NTU)', angle: 90, position: 'insideRight', dx: -10, fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    borderColor: 'var(--border)',
                    fontSize: '12px'
                  }} 
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="ph" 
                  name="pH Level"
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="turbidity"
                  name="Turbidity (NTU)" 
                  stroke="var(--secondary)" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export function TemperatureChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Trends</CardTitle>
        <CardDescription>Daily water temperature (°C)</CardDescription>
      </CardHeader>
      <CardContent className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={waterQualityData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis 
              domain={[16, 22]} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                borderColor: 'var(--border)',
                fontSize: '12px'
              }} 
            />
            <Area
              type="monotone"
              dataKey="temperature"
              name="Temperature (°C)"
              stroke="#0ea5e9"
              fill="#0ea5e9"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function DissolvedOxygenChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dissolved Oxygen</CardTitle>
        <CardDescription>Daily levels (mg/L)</CardDescription>
      </CardHeader>
      <CardContent className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={waterQualityData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis 
              domain={[7, 9]} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                borderColor: 'var(--border)',
                fontSize: '12px'
              }} 
            />
            <Bar
              dataKey="oxygen"
              name="Dissolved Oxygen (mg/L)"
              fill="#14b8a6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
