import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, ArrowLeft, PiggyBank, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function SavingsCalculatorPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar className="hidden lg:flex" />
        <SidebarInset className="flex-1 p-6 lg:p-8">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/user/impulse">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Savings Calculator</h1>
                <p className="text-muted-foreground">
                  See the impact of reducing impulse purchases over time
                </p>
              </div>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Calculator className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Calculate Your Savings</CardTitle>
                      <CardDescription>
                        See how much you could save by reducing impulse purchases
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Monthly impulse spending ($)
                    </label>
                    <Input type="number" placeholder="200" />
                    <p className="text-xs text-muted-foreground">
                      Your estimated monthly spending on unplanned purchases
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Reduction percentage
                      </label>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                    <Slider defaultValue={[70]} min={10} max={90} step={10} />
                    <p className="text-xs text-muted-foreground">
                      How much of your impulse spending you plan to reduce
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Time period
                      </label>
                      <span className="text-sm font-medium">10 years</span>
                    </div>
                    <Tabs defaultValue="10" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="1">1 yr</TabsTrigger>
                        <TabsTrigger value="5">5 yrs</TabsTrigger>
                        <TabsTrigger value="10">10 yrs</TabsTrigger>
                        <TabsTrigger value="20">20 yrs</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Annual investment return (%)
                    </label>
                    <Input type="number" placeholder="7" />
                    <p className="text-xs text-muted-foreground">
                      Estimated annual return if you invest the saved money
                    </p>
                  </div>
                  
                  <Button className="w-full">Calculate Savings</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <PiggyBank className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Your Results</CardTitle>
                      <CardDescription>
                        The impact of your savings over time
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg bg-muted p-6 text-center">
                    <h3 className="text-lg font-medium text-muted-foreground">Total Savings After 10 Years</h3>
                    <div className="mt-2 text-5xl font-bold">$21,983</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      If you invest your monthly savings of $140
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground">Monthly Savings</h4>
                      <div className="mt-1 text-2xl font-bold">$140</div>
                    </div>
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground">Yearly Savings</h4>
                      <div className="mt-1 text-2xl font-bold">$1,680</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="mb-2 text-sm font-medium">What you could buy instead:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        A down payment on a home
                      </li>
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        A brand new car (paid in full)
                      </li>
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        Multiple international vacations
                      </li>
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        One year of college tuition
                      </li>
                    </ul>
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className="h-[200px] w-full rounded-md bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Savings growth chart</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <p className="text-sm text-muted-foreground">
                    Small changes in spending habits can lead to significant financial growth over time. Reducing impulse purchases is one of the most effective ways to improve your financial future.
                  </p>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Tips for Reducing Impulse Spending</CardTitle>
                <CardDescription>
                  Practical strategies to help you save more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="font-medium">Use the 24-Hour Rule</h3>
                    <p className="text-sm text-muted-foreground">
                      For any non-essential purchase, wait at least 24 hours before buying. This simple delay can 
                      reduce impulse purchases by up to 50%.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Unsubscribe from Retail Emails</h3>
                    <p className="text-sm text-muted-foreground">
                      Marketing emails trigger the fear of missing out and create artificial urgency. 
                      Unsubscribing can significantly reduce temptation.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Use Cash for Discretionary Spending</h3>
                    <p className="text-sm text-muted-foreground">
                      Studies show people spend 12-18% less when using cash instead of cards. The physical act of 
                      handing over money makes spending more tangible.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Create Shopping Lists</h3>
                    <p className="text-sm text-muted-foreground">
                      Never shop without a list, and stick to it strictly. This single habit can reduce unplanned 
                      purchases by up to 40%.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Visualize Long-Term Goals</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep visual reminders of your financial goals. When tempted to make an impulse purchase, 
                      ask if it aligns with these priorities.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Track Every Purchase</h3>
                    <p className="text-sm text-muted-foreground">
                      Use this app to log all purchases. Awareness is the first step to changing behavior, and 
                      tracking makes you more mindful of spending patterns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
