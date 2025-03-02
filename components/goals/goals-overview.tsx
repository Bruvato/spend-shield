import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, DollarSign, AlarmClock, Star } from "lucide-react";

export function GoalsOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Goals Overview</h2>
        <p className="text-muted-foreground">Track your progress towards financial goals</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <div>2 savings</div>
              <div>2 spending</div>
              <div>1 impulse</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <Progress value={67} className="mt-2" />
            <div className="mt-1 text-xs text-muted-foreground">
              3 goals on track, 2 need attention
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 days</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Emergency fund: 3-month target
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Goal Highlights</CardTitle>
          <CardDescription>Your top goals and their current progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <DollarSign className="h-5 w-5 text-blue-700 dark:text-blue-300" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Emergency Fund</h3>
                    <p className="text-sm text-muted-foreground">$6,000 target (3 months expenses)</p>
                  </div>
                  <div className="text-sm font-medium">$4,250</div>
                </div>
                <Progress value={71} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>+$350 this month</span>
                  </div>
                  <div>71% complete</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Target className="h-5 w-5 text-green-700 dark:text-green-300" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Reduce Impulse Spending</h3>
                    <p className="text-sm text-muted-foreground">30% reduction target</p>
                  </div>
                  <div className="text-sm font-medium">42%</div>
                </div>
                <Progress value={42} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>Exceeding target!</span>
                  </div>
                  <div>42% reduction achieved</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <AlarmClock className="h-5 w-5 text-purple-700 dark:text-purple-300" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Vacation Fund</h3>
                    <p className="text-sm text-muted-foreground">$2,400 target by August</p>
                  </div>
                  <div className="text-sm font-medium">$800</div>
                </div>
                <Progress value={33} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>+$200 this month</span>
                  </div>
                  <div>33% complete</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
