import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart,
  PieChart, 
  LineChart,
  TrendingDown, 
  TrendingUp, 
  Calendar,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  SpendingByCategory, 
  SpendingOverTime, 
  SpendingHeatmap, 
  CategoryComparisonChart, 
  SpendingGrowthTrend 
} from "@/components/charts";

export function SpendingAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Spending Analysis</h2>
          <p className="text-muted-foreground">Track your spending patterns and identify areas for improvement</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="3months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardContent className="pt-6">
            <SpendingOverTime />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Breakdown of your expenses</CardDescription>
            </div>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <SpendingByCategory />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <SpendingGrowthTrend />
        <CategoryComparisonChart />
      </div>
      
      <SpendingHeatmap />
    </div>
  );
}
