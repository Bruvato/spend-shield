import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoalsOverview } from "@/components/goals/goals-overview";
import { SavingsGoals } from "@/components/goals/savings-goals";
import { SpendingGoals } from "@/components/goals/spending-goals";
import { ImpulseControlGoals } from "@/components/goals/impulse-control-goals";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function GoalsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="lg:hidden" />
              <div className="ml-4 lg:ml-0">
                <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
                <p className="text-muted-foreground">
                  Set and track your financial goals
                </p>
              </div>
            </div>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              <span>New Goal</span>
            </Button>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <GoalsOverview />
            
            <Tabs defaultValue="savings" className="space-y-4">
              <TabsList>
                <TabsTrigger value="savings">Savings Goals</TabsTrigger>
                <TabsTrigger value="spending">Spending Goals</TabsTrigger>
                <TabsTrigger value="impulse">Impulse Control Goals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="savings" className="space-y-4">
                <SavingsGoals />
              </TabsContent>
              
              <TabsContent value="spending" className="space-y-4">
                <SpendingGoals />
              </TabsContent>
              
              <TabsContent value="impulse" className="space-y-4">
                <ImpulseControlGoals />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
