import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Download } from "lucide-react";
import { SpendingAnalytics } from "@/components/analytics/spending-analytics";
import { ImpulseAnalytics } from "@/components/analytics/impulse-analytics";

export default function DashboardAnalyticsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-4 lg:ml-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Analytics</h1>
              <p className="text-muted-foreground">
                Key financial metrics and insights
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                March 2025
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Spending Analysis</h2>
              <p className="text-muted-foreground">Overview of your spending patterns</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <SpendingAnalytics />
            </div>
            
            <div className="pt-4 space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Impulse Spending</h2>
              <p className="text-muted-foreground">Trends in your impulse purchases</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <ImpulseAnalytics />
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline">
                View Detailed Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
