import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  TrendingDown, 
  Calendar, 
  Clock,
  Filter 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImpulseAnalysis } from "@/components/charts";
import { DailySpendingChart } from "@/components/spending";

export function ImpulseAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Impulse Spending Trends</h2>
          <p className="text-muted-foreground">Track your impulse spending behavior over time</p>
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Impulse Spending Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$754.37</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium inline-flex items-center">
                <TrendingDown className="mr-1 h-3 w-3" />
                28.3%
              </span>
              {" "}from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Impulse % of Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium inline-flex items-center">
                <TrendingDown className="mr-1 h-3 w-3" />
                3.2%
              </span>
              {" "}from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avoided Impulse Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,230.75</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium inline-flex items-center">
                <TrendingDown className="mr-1 h-3 w-3" />
                42.1%
              </span>
              {" "}from previous period
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-1">
        <DailySpendingChart />
      </div>
      
      <div className="grid gap-6 md:grid-cols-1">
        <ImpulseAnalysis />
      </div>
    </div>
  );
}
