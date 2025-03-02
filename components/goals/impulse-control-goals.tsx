import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  ShoppingCart, 
  ShoppingBag, 
  AlarmClock, 
  CreditCard, 
  ArrowDownIcon, 
  ArrowUpIcon, 
  SmartphoneIcon 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ImpulseControlGoal {
  id: string;
  title: string;
  category: string;
  categoryIcon: React.ReactNode;
  targetAmount: number;
  currentAmount: number;
  progress: number;
  daysRemaining: number;
  status: "on-track" | "at-risk" | "completed";
  streakDays: number;
  reflectionCount: number;
}

const impulseGoals: ImpulseControlGoal[] = [
  {
    id: "icg1",
    title: "Reduce Coffee Shop Spending",
    category: "Food & Drink",
    categoryIcon: <ShoppingBag className="h-4 w-4" />,
    targetAmount: 50,
    currentAmount: 22.75,
    progress: 45,
    daysRemaining: 16,
    status: "on-track",
    streakDays: 8,
    reflectionCount: 4
  },
  {
    id: "icg2",
    title: "Limit Online Shopping",
    category: "Shopping",
    categoryIcon: <ShoppingCart className="h-4 w-4" />,
    targetAmount: 100,
    currentAmount: 75.50,
    progress: 76,
    daysRemaining: 9,
    status: "at-risk",
    streakDays: 3,
    reflectionCount: 2
  },
  {
    id: "icg3",
    title: "No Unnecessary Subscriptions",
    category: "Entertainment",
    categoryIcon: <CreditCard className="h-4 w-4" />,
    targetAmount: 0,
    currentAmount: 0,
    progress: 100,
    daysRemaining: 21,
    status: "completed",
    streakDays: 30,
    reflectionCount: 0
  },
  {
    id: "icg4",
    title: "Delay Tech Purchases",
    category: "Electronics",
    categoryIcon: <SmartphoneIcon className="h-4 w-4" />,
    targetAmount: 300,
    currentAmount: 0,
    progress: 100,
    daysRemaining: 27,
    status: "on-track",
    streakDays: 27,
    reflectionCount: 3
  }
];

export function ImpulseControlGoals() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-1">
              <ArrowUpIcon className="mr-1 h-3 w-3 inline text-green-500" />
              <span className="text-green-500">1 new</span> this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <ArrowUpIcon className="mr-1 h-3 w-3 inline text-green-500" />
              <span className="text-green-500">12%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$328.25</div>
            <p className="text-xs text-muted-foreground mt-1">
              <ArrowUpIcon className="mr-1 h-3 w-3 inline text-green-500" />
              <span className="text-green-500">$98.50</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17 days</div>
            <p className="text-xs text-muted-foreground mt-1">
              <ArrowDownIcon className="mr-1 h-3 w-3 inline text-red-500" />
              <span className="text-red-500">3 days</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {impulseGoals.filter(goal => goal.status !== "completed").map((goal) => (
            <Card key={goal.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{goal.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center mt-1">
                        <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                          {goal.categoryIcon}
                        </div>
                        <span>{goal.category}</span>
                      </div>
                    </CardDescription>
                  </div>
                  
                  <Badge 
                    variant={
                      goal.status === "on-track" ? "outline" : 
                      goal.status === "at-risk" ? "destructive" : 
                      "secondary"
                    }
                  >
                    {goal.status === "on-track" ? "On Track" : 
                     goal.status === "at-risk" ? "At Risk" : 
                     "Completed"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    
                    <Progress 
                      value={goal.progress} 
                      indicatorClassName={
                        goal.status === "on-track" ? "bg-green-600" : 
                        goal.status === "at-risk" ? "bg-amber-600" : 
                        "bg-blue-600"
                      }
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Target</span>
                      <p className="font-medium">${goal.targetAmount}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Current</span>
                      <p className="font-medium">${goal.currentAmount}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Days Left</span>
                      <p className="font-medium">{goal.daysRemaining}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <AlarmClock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>
                        <span className="font-medium">{goal.streakDays} day</span> streak
                      </span>
                    </div>
                    
                    {goal.reflectionCount > 0 && (
                      <div className="text-muted-foreground">
                        {goal.reflectionCount} reflection{goal.reflectionCount !== 1 && 's'}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <div className="flex justify-between w-full">
                  <Button variant="outline" size="sm">Add Reflection</Button>
                  <Button variant="default" size="sm">Details</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {impulseGoals.filter(goal => goal.status === "completed").map((goal) => (
            <Card key={goal.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{goal.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center mt-1">
                        <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                          {goal.categoryIcon}
                        </div>
                        <span>{goal.category}</span>
                      </div>
                    </CardDescription>
                  </div>
                  
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">100%</span>
                    </div>
                    
                    <Progress value={100} indicatorClassName="bg-green-600" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Target</span>
                      <p className="font-medium">${goal.targetAmount}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Saved</span>
                      <p className="font-medium">${goal.targetAmount - goal.currentAmount}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Streak</span>
                      <p className="font-medium">{goal.streakDays} days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <div className="flex justify-between w-full">
                  <Button variant="outline" size="sm">View Reflections</Button>
                  <Button variant="secondary" size="sm">Create Similar</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="suggested" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suggested Impulse Control Goals</CardTitle>
              <CardDescription>
                Based on your spending patterns, we recommend these goals to help manage impulse purchases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                      <ShoppingBag className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">Reduce Online Clothing Purchases</h3>
                      <p className="text-sm text-muted-foreground">Potential savings: ~$95/month</p>
                    </div>
                  </div>
                  <Button size="sm">Add Goal</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                      <CreditCard className="h-5 w-5 text-amber-700 dark:text-amber-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">24-Hour Purchase Delay Rule</h3>
                      <p className="text-sm text-muted-foreground">For items over $50</p>
                    </div>
                  </div>
                  <Button size="sm">Add Goal</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <SmartphoneIcon className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tech Purchasing Freeze</h3>
                      <p className="text-sm text-muted-foreground">Potential savings: ~$150/month</p>
                    </div>
                  </div>
                  <Button size="sm">Add Goal</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
