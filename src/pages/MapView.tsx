
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Filter, ZoomIn, ZoomOut, Layers } from "lucide-react";

// Mock data for different water sources
const waterSources = [
  {
    id: 1,
    name: "Central Reservoir",
    quality: "excellent",
    lat: 140,
    lng: 180,
    params: { ph: 7.1, turbidity: 0.8, temperature: 18.5, contaminants: "None detected" }
  },
  {
    id: 2,
    name: "North Treatment Plant",
    quality: "good",
    lat: 100,
    lng: 120,
    params: { ph: 7.3, turbidity: 1.2, temperature: 19.1, contaminants: "Trace chlorine" }
  },
  {
    id: 3,
    name: "East Water Supply",
    quality: "good",
    lat: 180,
    lng: 220,
    params: { ph: 7.0, turbidity: 1.5, temperature: 17.8, contaminants: "Minimal nitrates" }
  },
  {
    id: 4,
    name: "West River Inlet",
    quality: "fair",
    lat: 120,
    lng: 80,
    params: { ph: 6.8, turbidity: 2.4, temperature: 21.2, contaminants: "Moderate sediment" }
  },
  {
    id: 5,
    name: "South Community Well",
    quality: "poor",
    lat: 200,
    lng: 150,
    params: { ph: 6.5, turbidity: 3.8, temperature: 22.5, contaminants: "Elevated minerals" }
  },
  {
    id: 6,
    name: "Industrial Zone Runoff",
    quality: "critical",
    lat: 160,
    lng: 100,
    params: { ph: 5.8, turbidity: 5.2, temperature: 23.1, contaminants: "Heavy metals detected" }
  }
];

const qualityColors = {
  excellent: "bg-green-500",
  good: "bg-emerald-400",
  fair: "bg-amber-400",
  poor: "bg-red-500",
  critical: "bg-red-700"
};

const MapView = () => {
  const [selectedSource, setSelectedSource] = useState<typeof waterSources[0] | null>(null);
  const [activeView, setActiveView] = useState<"satellite" | "topology" | "infrastructure">("satellite");
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleMarkerClick = (source: typeof waterSources[0]) => {
    setSelectedSource(source);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.25);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.25);
  };

  const filterOptions = ["All", "Excellent/Good", "Fair", "Poor/Critical"];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredSources = waterSources.filter(source => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Excellent/Good") return ["excellent", "good"].includes(source.quality);
    if (activeFilter === "Fair") return source.quality === "fair";
    if (activeFilter === "Poor/Critical") return ["poor", "critical"].includes(source.quality);
    return true;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Water Quality Map</h1>
          <p className="text-muted-foreground mt-1">
            Interactive visualization of water quality data across monitored locations
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="h-[75vh]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <CardTitle className="text-lg">Interactive Water Quality Map</CardTitle>
                <div className="flex items-center gap-2">
                  <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)}>
                    <TabsList className="grid grid-cols-3 h-8">
                      <TabsTrigger value="satellite" className="text-xs">Satellite</TabsTrigger>
                      <TabsTrigger value="topology" className="text-xs">Topology</TabsTrigger>
                      <TabsTrigger value="infrastructure" className="text-xs">Infrastructure</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="flex items-center gap-1 border rounded-md">
                    <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-medium px-1">{Math.round(zoomLevel * 100)}%</span>
                    <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                >
                  <Filter className="h-3 w-3 mr-1" />
                  Filter
                </Button>
                
                {filterOptions.map(filter => (
                  <Button 
                    key={filter}
                    variant={activeFilter === filter ? "secondary" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="relative bg-muted rounded-md overflow-hidden border border-border h-full transition-all duration-300">
                {/* Map background based on active view */}
                <div className="absolute inset-0">
                  {activeView === "satellite" && (
                    <div className="w-full h-full bg-teal-900 opacity-80 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuXyQxIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiPjxwYXRoIGQ9Ik0gLTEwLDEwIGwgMjAsLTIwIE0gMCwyMCBsIDIwLC0yMCBNIDEwLDMwIGwgMjAsLTIwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuXyQxKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
                  )}
                  {activeView === "topology" && (
                    <div className="w-full h-full bg-blue-100 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuXyQxIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiPjxwYXRoIGQ9Ik0gMCwxNSBRIDE1LDAsIDMwLDE1IFEgMTUsMzAsIDAsMTUgWiIgc3Ryb2tlPSIjOTJjZGQ1IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjcGF0dGVybl8kMSkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')]"></div>
                  )}
                  {activeView === "infrastructure" && (
                    <div className="w-full h-full bg-gray-100 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuXyQxIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiPjxwYXRoIGQ9Ik0gMCwwIEggNTAgViA1MCIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjcGF0dGVybl8kMSkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')]"></div>
                  )}
                </div>
                
                {/* Water source markers */}
                <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center', transition: 'transform 0.3s ease' }}>
                  {filteredSources.map((source) => (
                    <div 
                      key={source.id}
                      className={`absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer border-2 border-white transition-all duration-200 ${qualityColors[source.quality as keyof typeof qualityColors]} ${selectedSource?.id === source.id ? 'ring-4 ring-blue-400 ring-opacity-50 z-10 scale-125' : ''}`}
                      style={{ 
                        left: source.lng, 
                        top: source.lat 
                      }}
                      onClick={() => handleMarkerClick(source)}
                    />
                  ))}
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-md p-3 text-xs shadow-md">
                  <div className="font-medium mb-2">Water Quality Index</div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Excellent - Safe for all uses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      <span>Good - Safe for most uses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <span>Fair - May require treatment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Poor - Treatment required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-700"></div>
                      <span>Critical - Not safe for use</span>
                    </div>
                  </div>
                </div>
                
                {/* Map controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/90 backdrop-blur-sm shadow-md">
                    <Layers className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Selected source info */}
                {selectedSource && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-md p-4 shadow-md text-sm w-72">
                    <h3 className="font-medium text-base">{selectedSource.name}</h3>
                    <div className="mt-3 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${qualityColors[selectedSource.quality as keyof typeof qualityColors]}`}></div>
                        <span className="font-medium capitalize">{selectedSource.quality} Quality</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">pH Level:</span>
                          <span className="font-medium">{selectedSource.params.ph}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Turbidity:</span>
                          <span className="font-medium">{selectedSource.params.turbidity} NTU</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Temperature:</span>
                          <span className="font-medium">{selectedSource.params.temperature}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Contaminants:</span>
                          <span className="font-medium">{selectedSource.params.contaminants}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Button variant="outline" size="sm" className="w-full">View Detailed Analysis</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapView;
