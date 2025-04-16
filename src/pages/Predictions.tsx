
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from "recharts";
import { 
  AlertTriangle, 
  BarChart4, 
  BrainCircuit, 
  Calendar, 
  ChevronUp, 
  CloudRain, 
  Download, 
  Droplet, 
  FlaskConical, 
  Gauge, 
  LineChart as LineChartIcon,
  RefreshCw, 
  Save, 
  ShieldAlert, 
  Sliders, 
  ThermometerIcon, 
  Upload 
} from "lucide-react";
import { useState } from "react";

// Mock data for predictions
const contaminationPredictions = [
  { day: "Mon", actual: 0.8, predicted: 0.85 },
  { day: "Tue", actual: 1.2, predicted: 1.15 },
  { day: "Wed", actual: 1.5, predicted: 1.55 },
  { day: "Thu", actual: 1.3, predicted: 1.4 },
  { day: "Fri", actual: 1.1, predicted: 1.2 },
  { day: "Sat", actual: null, predicted: 1.4 },
  { day: "Sun", actual: null, predicted: 1.7 },
  { day: "Mon", actual: null, predicted: 2.1 },
  { day: "Tue", actual: null, predicted: 2.3 },
  { day: "Wed", actual: null, predicted: 2.0 },
];

const temperaturePredictions = [
  { day: "Mon", actual: 18.5, predicted: 18.3 },
  { day: "Tue", actual: 18.8, predicted: 18.6 },
  { day: "Wed", actual: 19.1, predicted: 19.0 },
  { day: "Thu", actual: 19.3, predicted: 19.2 },
  { day: "Fri", actual: 19.6, predicted: 19.5 },
  { day: "Sat", actual: null, predicted: 19.8 },
  { day: "Sun", actual: null, predicted: 20.0 },
  { day: "Mon", actual: null, predicted: 20.3 },
  { day: "Tue", actual: null, predicted: 20.5 },
  { day: "Wed", actual: null, predicted: 20.4 },
];

const phPredictions = [
  { day: "Mon", actual: 7.1, predicted: 7.15 },
  { day: "Tue", actual: 7.0, predicted: 7.05 },
  { day: "Wed", actual: 6.9, predicted: 6.95 },
  { day: "Thu", actual: 6.85, predicted: 6.9 },
  { day: "Fri", actual: 6.8, predicted: 6.85 },
  { day: "Sat", actual: null, predicted: 6.8 },
  { day: "Sun", actual: null, predicted: 6.75 },
  { day: "Mon", actual: null, predicted: 6.7 },
  { day: "Tue", actual: null, predicted: 6.65 },
  { day: "Wed", actual: null, predicted: 6.6 },
];

const anomalyRisk = [
  { month: "Jan", risk: 25 },
  { month: "Feb", risk: 18 },
  { month: "Mar", risk: 22 },
  { month: "Apr", risk: 30 },
  { month: "May", risk: 40 },
  { month: "Jun", risk: 55 },
  { month: "Jul", risk: 68 },
  { month: "Aug", risk: 75 },
  { month: "Sep", risk: 60 },
  { month: "Oct", risk: 45 },
  { month: "Nov", risk: 30 },
  { month: "Dec", risk: 20 },
];

// Risk scenarios
const riskScenarios = [
  {
    id: 1,
    name: "Heavy Rainfall",
    description: "Prediction of water quality impact after significant precipitation",
    probability: 65,
    impact: "medium",
    parameters: {
      turbidity: "+120%",
      pH: "-5%",
      dissolvedOxygen: "-15%",
      temperature: "-8%"
    }
  },
  {
    id: 2,
    name: "Industrial Discharge",
    description: "Potential contamination from nearby industrial facilities",
    probability: 30,
    impact: "high",
    parameters: {
      turbidity: "+45%",
      pH: "-12%",
      dissolvedOxygen: "-30%",
      temperature: "+10%"
    }
  },
  {
    id: 3,
    name: "Algal Bloom",
    description: "Summer conditions favorable for algal growth in reservoirs",
    probability: 80,
    impact: "medium",
    parameters: {
      turbidity: "+25%",
      pH: "+15%",
      dissolvedOxygen: "-40%",
      temperature: "+5%"
    }
  }
];

// Custom parameters for what-if analysis
const initialParameters = {
  temperature: 19.5,
  rainfall: 25,
  industrialActivity: 40,
  seasonalFactors: 50,
  bacteriaLevels: 30
};

// Location options
const locations = [
  "Central Reservoir",
  "North Treatment Plant",
  "East Water Supply",
  "West River Inlet",
  "South Community Well",
  "Industrial Zone Runoff"
];

const Predictions = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [timeframe, setTimeframe] = useState("10-day");
  const [parameters, setParameters] = useState(initialParameters);
  const [autoUpdate, setAutoUpdate] = useState(true);
  
  // Function to update a parameter
  const updateParameter = (param: keyof typeof initialParameters, value: number) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };
  
  // Calculate overall prediction confidence
  const predictionConfidence = 78;
  
  // Calculate predicted risk level
  const predictedRiskLevel = 
    parameters.rainfall > 60 || parameters.industrialActivity > 70 
      ? "high"
      : parameters.temperature > 22 || parameters.bacteriaLevels > 50
        ? "medium"
        : "low";
  
  const riskColorMap = {
    low: "text-green-500",
    medium: "text-amber-500",
    high: "text-red-500"
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Predictive Analytics</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered predictions and water quality forecasting
          </p>
        </div>
        
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7-day">7-Day Forecast</SelectItem>
                <SelectItem value="10-day">10-Day Forecast</SelectItem>
                <SelectItem value="30-day">30-Day Forecast</SelectItem>
                <SelectItem value="seasonal">Seasonal</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Upload className="h-4 w-4" />
              <span>Import Data</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Prediction Confidence</CardTitle>
              <CardDescription>
                Overall AI model accuracy and reliability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Confidence Score</span>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{predictionConfidence}%</span>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      <ChevronUp className="h-3 w-3 mr-1" />
                      2.3%
                    </Badge>
                  </div>
                </div>
                <Progress value={predictionConfidence} className="h-2" />
                
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data Coverage</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Model Version</span>
                    <span className="font-medium">v2.4.1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Trained</span>
                    <span className="font-medium">2 days ago</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Validation Accuracy</span>
                    <span className="font-medium">86.5%</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4 gap-1.5">
                <BrainCircuit className="h-4 w-4" />
                <span>Model Details</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Quality Parameter Projections</CardTitle>
              <CardDescription>
                Predicted trends for key water quality indicators
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-1">
              <div className="space-y-4 pt-1">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <FlaskConical className="h-3.5 w-3.5 text-blue-500" />
                      <span>pH Level</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">6.8</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium text-amber-500">6.6</span>
                    </div>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Droplet className="h-3.5 w-3.5 text-emerald-500" />
                      <span>Turbidity</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">1.3 NTU</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium text-amber-500">2.1 NTU</span>
                    </div>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <ThermometerIcon className="h-3.5 w-3.5 text-red-500" />
                      <span>Temperature</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">19.3°C</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium text-emerald-500">19.8°C</span>
                    </div>
                  </div>
                  <Progress value={66} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="h-3.5 w-3.5 text-purple-500" />
                      <span>Dissolved Oxygen</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">7.5 mg/L</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium text-emerald-500">7.8 mg/L</span>
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-3">
              <Button variant="outline" size="sm" className="w-full mt-3 gap-1.5">
                <LineChartIcon className="h-4 w-4" />
                <span>View Detailed Trends</span>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Risk Assessment</CardTitle>
              <CardDescription>
                Projected water quality risks and anomalies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-full">
                    <ShieldAlert className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Contamination Risk</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700">Medium</Badge>
                      <span className="text-sm text-muted-foreground">Next 7 days</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Potential Issues:</h4>
                  
                  <div className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Rising Turbidity</span>
                      <p className="text-muted-foreground">Projected to increase by 60% in the next 72 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">pH Fluctuation</span>
                      <p className="text-muted-foreground">Downward trend detected, may reach 6.6 by day 10</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm">
                    <CloudRain className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Weather Impact</span>
                      <p className="text-muted-foreground">Forecasted rainfall may affect water quality</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4 gap-1.5">
                <BarChart4 className="h-4 w-4" />
                <span>Detailed Risk Analysis</span>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Forecasted Parameters</CardTitle>
              <CardDescription>AI predictions for key water quality indicators over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="turbidity">
                <TabsList className="mb-4">
                  <TabsTrigger value="turbidity">Turbidity</TabsTrigger>
                  <TabsTrigger value="temperature">Temperature</TabsTrigger>
                  <TabsTrigger value="ph">pH Level</TabsTrigger>
                </TabsList>
                
                <TabsContent value="turbidity" className="mt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={contaminationPredictions} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="#0ea5e9" 
                          fillOpacity={1} 
                          fill="url(#colorActual)" 
                          name="Actual"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="predicted" 
                          stroke="#8b5cf6" 
                          fillOpacity={1} 
                          fill="url(#colorPredicted)"
                          strokeDasharray="5 5"
                          name="Predicted"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="border rounded-md p-3 mt-4 bg-muted/50 text-sm">
                    <div className="font-medium mb-1">Analysis:</div>
                    <p>Turbidity is projected to increase by approximately 0.9 NTU over the next 10 days. This increase may be caused by forecasted rainfall and potential runoff from the western watershed region.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="temperature" className="mt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={temperaturePredictions} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                        <XAxis dataKey="day" />
                        <YAxis domain={[18, 21]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="#0ea5e9" 
                          name="Actual"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="predicted" 
                          stroke="#8b5cf6" 
                          strokeDasharray="5 5"
                          name="Predicted"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="border rounded-md p-3 mt-4 bg-muted/50 text-sm">
                    <div className="font-medium mb-1">Analysis:</div>
                    <p>Water temperature shows a gradual upward trend, rising approximately 1.1°C over the next 10 days. This is consistent with seasonal patterns and forecasted air temperature increases.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="ph" className="mt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={phPredictions} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                        <XAxis dataKey="day" />
                        <YAxis domain={[6.5, 7.5]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="#0ea5e9" 
                          name="Actual"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="predicted" 
                          stroke="#8b5cf6" 
                          strokeDasharray="5 5"
                          name="Predicted"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="border rounded-md p-3 mt-4 bg-muted/50 text-sm">
                    <div className="font-medium mb-1">Analysis:</div>
                    <p>pH levels are projected to decrease gradually from 7.1 to 6.6 over the forecast period. This change is within acceptable parameters but should be monitored as it approaches the lower recommended limit of 6.5.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>What-If Scenario Analysis</CardTitle>
              <CardDescription>Adjust parameters to simulate different conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="temperature">Temperature (°C)</Label>
                      <span className="text-sm font-medium">{parameters.temperature}°C</span>
                    </div>
                    <Slider 
                      id="temperature"
                      min={10} 
                      max={30} 
                      step={0.5}
                      value={[parameters.temperature]}
                      onValueChange={(value) => updateParameter('temperature', value[0])}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="rainfall">Rainfall Intensity (%)</Label>
                      <span className="text-sm font-medium">{parameters.rainfall}%</span>
                    </div>
                    <Slider 
                      id="rainfall"
                      min={0} 
                      max={100} 
                      step={5}
                      value={[parameters.rainfall]}
                      onValueChange={(value) => updateParameter('rainfall', value[0])}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="industrial">Industrial Activity (%)</Label>
                      <span className="text-sm font-medium">{parameters.industrialActivity}%</span>
                    </div>
                    <Slider 
                      id="industrial"
                      min={0} 
                      max={100} 
                      step={5}
                      value={[parameters.industrialActivity]}
                      onValueChange={(value) => updateParameter('industrialActivity', value[0])}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="seasonal">Seasonal Factors (%)</Label>
                      <span className="text-sm font-medium">{parameters.seasonalFactors}%</span>
                    </div>
                    <Slider 
                      id="seasonal"
                      min={0} 
                      max={100} 
                      step={5}
                      value={[parameters.seasonalFactors]}
                      onValueChange={(value) => updateParameter('seasonalFactors', value[0])}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="bacteria">Bacteria Levels (%)</Label>
                      <span className="text-sm font-medium">{parameters.bacteriaLevels}%</span>
                    </div>
                    <Slider 
                      id="bacteria"
                      min={0} 
                      max={100} 
                      step={5}
                      value={[parameters.bacteriaLevels]}
                      onValueChange={(value) => updateParameter('bacteriaLevels', value[0])}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="auto-update" 
                      checked={autoUpdate}
                      onCheckedChange={setAutoUpdate}
                    />
                    <Label htmlFor="auto-update">Auto-update predictions</Label>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Sliders className="h-4 w-4 mr-2" />
                    Reset Parameters
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 bg-muted/50">
                  <div className="text-sm font-medium mb-3">Prediction Results:</div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Predicted Risk Level:</span>
                      <Badge className={`${riskColorMap[predictedRiskLevel as keyof typeof riskColorMap]} capitalize`}>
                        {predictedRiskLevel}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Turbidity:</span>
                        <span className="font-medium">+{Math.round(parameters.rainfall * 0.05 + parameters.industrialActivity * 0.03)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">pH Level:</span>
                        <span className="font-medium">{parameters.industrialActivity > 60 ? "-" : "+"}{Math.round(Math.abs(50 - parameters.industrialActivity) * 0.02 + 3)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Temperature:</span>
                        <span className="font-medium">+{(parameters.temperature * 0.01).toFixed(1)}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bacteria:</span>
                        <span className="font-medium">+{Math.round(parameters.bacteriaLevels * 0.8 + parameters.rainfall * 0.2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contaminants:</span>
                        <span className="font-medium">+{Math.round(parameters.industrialActivity * 0.6 + parameters.rainfall * 0.3)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Treatment Need:</span>
                        <span className="font-medium">{predictedRiskLevel === "high" ? "Significant" : predictedRiskLevel === "medium" ? "Moderate" : "Minimal"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Scenario
                  </Button>
                  
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Scenario
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Scenarios</CardTitle>
              <CardDescription>Potential risk events and their impact on water quality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {riskScenarios.map((scenario) => (
                  <Card key={scenario.id} className={`border-l-4 ${
                    scenario.impact === 'high' 
                      ? 'border-l-red-500' 
                      : scenario.impact === 'medium' 
                        ? 'border-l-amber-500' 
                        : 'border-l-green-500'
                  }`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-medium">{scenario.name}</CardTitle>
                        <Badge variant="outline" className={`
                          ${scenario.impact === 'high' 
                            ? 'bg-red-50 text-red-700 border-red-200' 
                            : scenario.impact === 'medium' 
                              ? 'bg-amber-50 text-amber-700 border-amber-200' 
                              : 'bg-green-50 text-green-700 border-green-200'
                          } capitalize
                        `}>
                          {scenario.impact} impact
                        </Badge>
                      </div>
                      <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-3">
                        <div className="text-sm flex justify-between mb-1">
                          <span>Probability:</span>
                          <span className="font-medium">{scenario.probability}%</span>
                        </div>
                        <Progress value={scenario.probability} className="h-1.5" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        {Object.entries(scenario.parameters).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">{key}:</span>
                            <span className={`font-medium ${value.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        View Mitigation Plan
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Predictions;
