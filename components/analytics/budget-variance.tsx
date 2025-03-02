"use client";

import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MonthlyBudgetOverview } from "@/components/charts";
import { BudgetCategory } from "@/lib/data/models/budget";
import { fetchData } from "@/lib/data/api/api-client";

export function BudgetVariance() {
  const [budgetData, setBudgetData] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBudgetData = async () => {
      try {
        setLoading(true);
        const data = await fetchData<BudgetCategory[]>("budgets/variance");
        setBudgetData(data);
      } catch (err) {
        setError("Failed to load budget data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBudgetData();
  }, []);

  // Calculate stats
  const totalBudgeted = budgetData.reduce((sum, item) => sum + item.budgeted, 0);
  const totalActual = budgetData.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = totalBudgeted - totalActual;
  const totalVariancePercent = totalBudgeted > 0 ? (totalVariance / totalBudgeted) * 100 : 0;
  
  const overBudgetCount = budgetData.filter(item => item.status === "over").length;
  const underBudgetCount = budgetData.filter(item => item.status === "under").length;
  const onTrackCount = budgetData.filter(item => item.status === "on-track").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading budget data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-md">
        <p className="font-semibold">Error</p>
        <p className="text-sm">{error}</p>
        <p className="text-sm mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Budget Variance Analysis</h2>
          <p className="text-muted-foreground">Compare your actual spending against your budget</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="march">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="january">January 2025</SelectItem>
              <SelectItem value="february">February 2025</SelectItem>
              <SelectItem value="march">March 2025</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6">
        <MonthlyBudgetOverview />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudgeted.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Allocated for current month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalActual.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {(totalActual / totalBudgeted * 100).toFixed(1)}% of total budget
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Under Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${Math.max(0, totalVariance).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {totalVariancePercent.toFixed(1)}% under budget
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories Over Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{overBudgetCount}</div>
            <p className="text-xs text-muted-foreground">
              Out of {budgetData.length} total categories
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
