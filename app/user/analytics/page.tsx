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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpendingOverview } from "@/components/spending-overview";
import { SpendingAnalytics } from "@/components/analytics/spending-analytics";
import { ImpulseAnalytics } from "@/components/analytics/impulse-analytics";
import { SavingsProjections } from "@/components/analytics/savings-projections";
import { FinancialReports } from "@/components/analytics/financial-reports";
import { BudgetVariance } from "@/components/analytics/budget-variance";

export default function AnalyticsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-4 lg:ml-0">
              <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
              <p className="text-muted-foreground">
                Visualize your spending patterns and track your progress
              </p>
            </div>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <SpendingOverview />
            
            <Tabs defaultValue="spending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
                <TabsTrigger value="impulse">Impulse Trends</TabsTrigger>
                <TabsTrigger value="budget">Budget Variance</TabsTrigger>
                <TabsTrigger value="savings">Savings Projections</TabsTrigger>
                <TabsTrigger value="reports">Financial Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="spending" className="space-y-4">
                <SpendingAnalytics />
              </TabsContent>
              
              <TabsContent value="impulse" className="space-y-4">
                <ImpulseAnalytics />
              </TabsContent>
              
              <TabsContent value="budget" className="space-y-4">
                <BudgetVariance />
              </TabsContent>
              
              <TabsContent value="savings" className="space-y-4">
                <SavingsProjections />
              </TabsContent>
              
              <TabsContent value="reports" className="space-y-4">
                <FinancialReports />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
