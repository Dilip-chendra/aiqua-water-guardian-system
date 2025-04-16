
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container h-full py-6 px-4 md:px-6">
          {children}
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
