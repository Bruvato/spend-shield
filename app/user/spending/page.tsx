import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpendingCategories } from "@/components/spending/spending-categories";
import { SpendingTrends } from "@/components/spending/spending-trends";
import { SpendingTransactions } from "@/components/spending/spending-transactions";
import { DailySpendingChart } from "@/components/spending/daily-spending-chart";
import { Plus, Download, Filter, LineChart } from "lucide-react";

export default function SpendingPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="lg:hidden" />
              <div className="ml-4 lg:ml-0">
                <h1 className="text-3xl font-bold tracking-tight">Spending</h1>
                <p className="text-muted-foreground">
                  Track and manage your spending patterns
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </div>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,240.50</div>
                  <div className="flex items-center pt-1 text-xs text-muted-foreground">
                    <LineChart className="mr-1 h-3 w-3 text-green-500" />
                    <span className="text-green-500 font-medium">12% less</span>
                    <span className="ml-1">than last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <div className="flex items-center pt-1 text-xs text-muted-foreground">
                    <LineChart className="mr-1 h-3 w-3 text-red-500" />
                    <span className="text-red-500 font-medium">8% more</span>
                    <span className="ml-1">than last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Transaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$72.01</div>
                  <div className="flex items-center pt-1 text-xs text-muted-foreground">
                    <LineChart className="mr-1 h-3 w-3 text-green-500" />
                    <span className="text-green-500 font-medium">18% less</span>
                    <span className="ml-1">than last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="transactions" className="space-y-4">
              <TabsList>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">Recent Transactions</h2>
                    <p className="text-sm text-muted-foreground">
                      Your spending activity for the current month
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
                <SpendingTransactions />
              </TabsContent>
              
              <TabsContent value="categories" className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold tracking-tight">Spending by Category</h2>
                  <p className="text-sm text-muted-foreground">
                    Breakdown of your spending across different categories
                  </p>
                </div>
                <SpendingCategories />
              </TabsContent>
              
              <TabsContent value="trends" className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold tracking-tight">Spending Trends</h2>
                  <p className="text-sm text-muted-foreground">
                    Analyze your spending patterns over time
                  </p>
                </div>
                <SpendingTrends />
              </TabsContent>
            </Tabs>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">Daily Spending Breakdown</h2>
                <p className="text-sm text-muted-foreground">
                  Track your daily spending patterns and impulse purchases
                </p>
              </div>
              <DailySpendingChart />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
