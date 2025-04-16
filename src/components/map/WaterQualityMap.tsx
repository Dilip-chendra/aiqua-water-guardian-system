
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Mock data for different water sources
const waterSources = [
  {
    id: 1,
    name: "Central Reservoir",
    quality: "excellent",
    lat: 140,
    lng: 180,
    params: { ph: 7.1, turbidity: 0.8, temperature: 18.5 }
  },
  {
    id: 2,
    name: "North Treatment Plant",
    quality: "good",
    lat: 100,
    lng: 120,
    params: { ph: 7.3, turbidity: 1.2, temperature: 19.1 }
  },
  {
    id: 3,
    name: "East Water Supply",
    quality: "good",
    lat: 180,
    lng: 220,
    params: { ph: 7.0, turbidity: 1.5, temperature: 17.8 }
  },
  {
    id: 4,
    name: "West River Inlet",
    quality: "fair",
    lat: 120,
    lng: 80,
    params: { ph: 6.8, turbidity: 2.4, temperature: 21.2 }
  },
  {
    id: 5,
    name: "South Community Well",
    quality: "poor",
    lat: 200,
    lng: 150,
    params: { ph: 6.5, turbidity: 3.8, temperature: 22.5 }
  }
];

const qualityColors = {
  excellent: "bg-green-500",
  good: "bg-emerald-400",
  fair: "bg-amber-400",
  poor: "bg-red-500",
  critical: "bg-red-700"
};

interface WaterSourceMarkerProps {
  source: typeof waterSources[0];
  isSelected: boolean;
  onClick: () => void;
}

function WaterSourceMarker({ source, isSelected, onClick }: WaterSourceMarkerProps) {
  return (
    <div 
      className={cn(
        "absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer",
        qualityColors[source.quality as keyof typeof qualityColors],
        isSelected && "ring-4 ring-blue-500 ring-opacity-50 z-10"
      )}
      style={{ 
        left: source.lng, 
        top: source.lat 
      }}
      onClick={onClick}
    />
  );
}

export function WaterQualityMap() {
  const [selectedSource, setSelectedSource] = useState<typeof waterSources[0] | null>(null);
  const [activeView, setActiveView] = useState<"satellite" | "topology" | "infrastructure">("satellite");

  const handleMarkerClick = (source: typeof waterSources[0]) => {
    setSelectedSource(source);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Water Quality Map</CardTitle>
          <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)}>
            <TabsList className="grid grid-cols-3 h-8">
              <TabsTrigger value="satellite" className="text-xs">Satellite</TabsTrigger>
              <TabsTrigger value="topology" className="text-xs">Topology</TabsTrigger>
              <TabsTrigger value="infrastructure" className="text-xs">Infrastructure</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative aspect-video bg-muted rounded-md overflow-hidden border border-border">
          {/* Simplified map background based on active view */}
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
          {waterSources.map((source) => (
            <WaterSourceMarker 
              key={source.id}
              source={source}
              isSelected={selectedSource?.id === source.id}
              onClick={() => handleMarkerClick(source)}
            />
          ))}
          
          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 rounded-md p-2 text-xs">
            <div className="font-medium mb-1">Water Quality</div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Excellent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span>Good</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <span>Fair</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Poor</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-700"></div>
              <span>Critical</span>
            </div>
          </div>
          
          {/* Selected source info */}
          {selectedSource && (
            <div className="absolute top-2 right-2 bg-white rounded-md p-3 shadow-md text-xs w-48">
              <h3 className="font-medium">{selectedSource.name}</h3>
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>Quality:</span>
                  <span className="font-medium capitalize">{selectedSource.quality}</span>
                </div>
                <div className="flex justify-between">
                  <span>pH Level:</span>
                  <span>{selectedSource.params.ph}</span>
                </div>
                <div className="flex justify-between">
                  <span>Turbidity:</span>
                  <span>{selectedSource.params.turbidity} NTU</span>
                </div>
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span>{selectedSource.params.temperature}°C</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
