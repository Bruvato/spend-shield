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
  DollarSign, 
  Pencil, 
  TrendingUp, 
  Calendar, 
  PiggyBank,
  GraduationCap,
  Home,
  Car
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const mockSavingsGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    description: "3 months of expenses",
    icon: <PiggyBank className="h-5 w-5" />,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    target: 6000,
    current: 4250,
    deadline: "2025-06-30",
    priority: "High",
    contributions: [
      { date: "2025-02-01", amount: 350 },
      { date: "2025-01-01", amount: 300 },
      { date: "2024-12-01", amount: 400 },
    ]
  },
  {
    id: 2,
    title: "Vacation Fund",
    description: "Summer vacation",
    icon: <Calendar className="h-5 w-5" />,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900",
    target: 2400,
    current: 800,
    deadline: "2025-08-15",
    priority: "Medium",
    contributions: [
      { date: "2025-02-01", amount: 200 },
      { date: "2025-01-01", amount: 150 },
      { date: "2024-12-01", amount: 200 },
    ]
  },
  {
    id: 3,
    title: "Home Down Payment",
    description: "20% down payment",
    icon: <Home className="h-5 w-5" />,
    iconColor: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900",
    target: 40000,
    current: 15000,
    deadline: "2027-01-01",
    priority: "Medium",
    contributions: [
      { date: "2025-02-01", amount: 800 },
      { date: "2025-01-01", amount: 800 },
      { date: "2024-12-01", amount: 700 },
    ]
  },
  {
    id: 4,
    title: "New Car Fund",
    description: "Replace current vehicle",
    icon: <Car className="h-5 w-5" />,
    iconColor: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-100 dark:bg-orange-900",
    target: 20000,
    current: 5500,
    deadline: "2026-06-30",
    priority: "Low",
    contributions: [
      { date: "2025-02-01", amount: 300 },
      { date: "2025-01-01", amount: 300 },
      { date: "2024-12-01", amount: 300 },
    ]
  }
];

export function SavingsGoals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Savings Goals</h3>
          <p className="text-sm text-muted-foreground">Track progress on your savings targets</p>
        </div>
        <Button variant="outline" size="sm">
          <PiggyBank className="mr-2 h-4 w-4" />
          Add Savings Goal
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {mockSavingsGoals.map((goal) => {
          const progressPercent = Math.round((goal.current / goal.target) * 100);
          const deadline = new Date(goal.deadline);
          const today = new Date();
          const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
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
                    goal.priority === "High" ? "destructive" : 
                    goal.priority === "Medium" ? "default" : "outline"
                  }>
                    {goal.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium">
                    ${goal.current.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium">
                    ${goal.target.toLocaleString()}
                  </div>
                </div>
                <Progress value={progressPercent} className="h-2" />
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <div>{progressPercent}% complete</div>
                  <div>{daysLeft} days remaining</div>
                </div>
                
                <Separator className="my-3" />
                
                <div className="space-y-1">
                  <div className="text-xs font-medium">Recent Contributions</div>
                  {goal.contributions.slice(0, 2).map((contribution, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="text-muted-foreground">{new Date(contribution.date).toLocaleDateString()}</div>
                      <div className="font-medium">+${contribution.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button variant="ghost" size="sm" className="w-full">
                  <TrendingUp className="mr-2 h-3 w-3" />
                  <span>View Details</span>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
