"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Calendar, Trash2, PiggyBank, BarChart3, TrendingUp } from "lucide-react";
import { fetchData } from "@/lib/data/api/api-client";
import { SavingsGoal } from "@/lib/data/models/goals";

export default function SavingsGoalsPage() {
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSavingsGoals = async () => {
      try {
        setLoading(true);
        const data = await fetchData<SavingsGoal[]>("goals/savings");
        setSavingsGoals(data);
      } catch (err) {
        setError("Failed to load savings goals data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSavingsGoals();
  }, []);

  // Filter goals by status
  const onTrackGoals = savingsGoals.filter(goal => goal.status === "on-track");
  const atRiskGoals = savingsGoals.filter(goal => goal.status === "at-risk");
  const completedGoals = savingsGoals.filter(goal => goal.status === "completed");
  
  // Calculate totals
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.target, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading savings goals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-md mx-auto bg-red-50 text-red-800 rounded-md">
        <p className="font-semibold">Error</p>
        <p className="text-sm">{error}</p>
        <p className="text-sm mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-4 lg:ml-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
              <p className="text-muted-foreground">
                Track and manage your financial savings targets
              </p>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <PiggyBank className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalSaved.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    Across {savingsGoals.length} active goals
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-medium">Monthly Contributions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,050</div>
                  <p className="text-xs text-muted-foreground">
                    Total monthly allocation
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-medium">Progress</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">
                    Average completion rate
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Active Goals</h2>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {savingsGoals.map((goal) => (
                  <Card key={goal.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{goal.name}</CardTitle>
                          <CardDescription>Target: ${goal.target.toLocaleString()}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                              ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                            </span>
                            <span 
                              className={`text-sm font-medium ${
                                goal.status === "on-track" ? "text-green-500" : "text-amber-500"
                              }`}
                            >
                              {goal.percentComplete}%
                            </span>
                          </div>
                          <Progress 
                            value={goal.percentComplete} 
                            className="h-2"
                            indicatorClassName={
                              goal.status === "on-track" ? "bg-green-500" : "bg-amber-500"
                            }
                          />
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <div className="space-y-1">
                            <p className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>Target date: {goal.deadline}</span>
                            </p>
                            <p className="flex items-center gap-1 text-muted-foreground">
                              <PiggyBank className="h-3 w-3" />
                              <span>Contributing: {goal.contributions}</span>
                            </p>
                          </div>
                          <div 
                            className={`px-2 py-1 rounded-md ${
                              goal.status === "on-track" 
                                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                                : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}
                          >
                            {goal.status === "on-track" ? "On Track" : "At Risk"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button variant="outline" className="w-full">
                        Make a Contribution
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
