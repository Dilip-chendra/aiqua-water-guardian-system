import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Placeholder components for routes
const PlaceholderPage = ({ title }: { title: string }) => (
  <DashboardLayout>
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">
          This page is under development.
        </p>
      </div>
      <div className="flex items-center justify-center h-96 border rounded-lg bg-muted/20">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            This feature will be available in a future update.
          </p>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

const Analytics = () => <PlaceholderPage title="Analytics" />;
const MapView = () => <PlaceholderPage title="Map View" />;
const Chat = () => <PlaceholderPage title="AI Assistant" />;
const Alerts = () => <PlaceholderPage title="Alerts" />;
const Predictions = () => <PlaceholderPage title="Predictions" />;
const Settings = () => <PlaceholderPage title="Settings" />;
const About = () => <PlaceholderPage title="About AIQUA" />;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
