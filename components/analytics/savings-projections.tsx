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
import { SavingsProjection } from "@/components/charts";

export function SavingsProjections() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Savings Projections</h2>
          <p className="text-muted-foreground">Track your progress toward financial goals</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="1year">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Projection Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="5years">5 Years</SelectItem>
              <SelectItem value="10years">10 Years</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450.00</div>
            <p className="text-xs text-muted-foreground">
              Total across all accounts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$500.00</div>
            <p className="text-xs text-muted-foreground">
              Current average monthly saving
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Projected 1 Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,750.00</div>
            <p className="text-xs text-muted-foreground">
              At current savings rate + interest
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Time to Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 years</div>
            <p className="text-xs text-muted-foreground">
              Until $30,000 emergency fund
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6">
        <SavingsProjection />
      </div>
    </div>
  );
}
