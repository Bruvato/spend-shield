import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Pencil, 
  AlertCircle, 
  CheckCircle2,
  ShoppingBag,
  Utensils,
  Gamepad2,
  Film,
  Coffee
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

const mockSpendingGoals = [
  {
    id: 1,
    title: "Groceries",
    description: "Monthly food budget",
    icon: <ShoppingBag className="h-5 w-5" />,
    iconColor: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900",
    limit: 500,
    current: 325,
    periodEnd: "2025-03-31",
    status: "on-track",
    lastMonth: 485
  },
  {
    id: 2,
    title: "Dining Out",
    description: "Restaurants & takeout",
    icon: <Utensils className="h-5 w-5" />,
    iconColor: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-100 dark:bg-orange-900",
    limit: 250,
    current: 220,
    periodEnd: "2025-03-31",
    status: "warning",
    lastMonth: 305
  },
  {
    id: 3,
    title: "Entertainment",
    description: "Games, movies, etc.",
    icon: <Gamepad2 className="h-5 w-5" />,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900",
    limit: 150,
    current: 85,
    periodEnd: "2025-03-31",
    status: "on-track",
    lastMonth: 165
  },
  {
    id: 4,
    title: "Coffee",
    description: "Coffee shops",
    icon: <Coffee className="h-5 w-5" />,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-900",
    limit: 75,
    current: 42,
    periodEnd: "2025-03-31",
    status: "on-track",
    lastMonth: 80
  }
];

export function SpendingGoals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Spending Goals</h3>
          <p className="text-sm text-muted-foreground">Monitor and control your spending categories</p>
        </div>
        <Button variant="outline" size="sm">
          <PieChart className="mr-2 h-4 w-4" />
          Add Spending Goal
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {mockSpendingGoals.map((goal) => {
          const progressPercent = Math.round((goal.current / goal.limit) * 100);
          const periodEndDate = new Date(goal.periodEnd);
          const today = new Date();
          const daysLeft = Math.ceil((periodEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          const dailyBudget = Math.round((goal.limit - goal.current) / daysLeft);
          const lastMonthComparison = goal.lastMonth > goal.limit ? 
            `${Math.round((goal.lastMonth - goal.limit) / goal.limit * 100)}% over budget` : 
            `${Math.round((goal.limit - goal.lastMonth) / goal.limit * 100)}% under budget`;
          
          return (
            <Card key={goal.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${goal.iconBg}`}>
                      <span className={goal.iconColor}>{goal.icon}</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={
                    goal.status === "warning" ? "destructive" : 
                    goal.status === "on-track" ? "default" : "outline"
                  }>
                    {goal.status === "on-track" ? 
                      <CheckCircle2 className="h-3 w-3 mr-1" /> : 
                      <AlertCircle className="h-3 w-3 mr-1" />}
                    {goal.status === "on-track" ? "On Track" : "Warning"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium">
                    ${goal.current}
                  </div>
                  <div className="text-sm font-medium">
                    ${goal.limit}
                  </div>
                </div>
                <Progress 
                  value={progressPercent} 
                  className="h-2" 
                  indicatorClassName={
                    progressPercent > 90 ? "bg-red-500" : 
                    progressPercent > 75 ? "bg-amber-500" : 
                    "bg-green-500"
                  }
                />
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    {progressPercent > 90 ? (
                      <AlertCircle className="h-3 w-3 mr-1 text-red-500" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                    )}
                    <span>{progressPercent}% of limit used</span>
                  </div>
                  <div>{daysLeft} days remaining</div>
                </div>
                
                <Separator className="my-3" />
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Daily budget remaining:</span>
                    <span className="font-medium">${dailyBudget}/day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last month:</span>
                    <span className="font-medium">${goal.lastMonth} ({lastMonthComparison})</span>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs">Adjust Limit:</div>
                      <div className="text-xs font-medium">${goal.limit}</div>
                    </div>
                    <Slider defaultValue={[goal.limit]} max={goal.limit * 2} step={5} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <div className="flex w-full gap-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Pencil className="mr-2 h-3 w-3" />
                    <span>Edit</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <PieChart className="mr-2 h-3 w-3" />
                    <span>Details</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
