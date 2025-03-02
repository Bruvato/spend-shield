"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, BarChart, DollarSign, ArrowDownIcon, ArrowUpIcon, TrendingDown, ShoppingBag, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { CreditScoreDisplay } from "./credit-score";
import { SavingsLeaderboard } from "./savings-leaderboard";

// Mock data for the spending overview
const spendingData = {
  thisWeek: 275.42,
  lastWeek: 324.18,
  thisMonth: 1245.76,
  lastMonth: 1349.21,
  categories: [
    { name: "Groceries", amount: 325.45, percent: 26 },
    { name: "Dining", amount: 215.25, percent: 17 },
    { name: "Entertainment", amount: 187.50, percent: 15 },
    { name: "Shopping", amount: 324.80, percent: 26 },
    { name: "Transportation", amount: 98.25, percent: 8 },
    { name: "Other", amount: 94.51, percent: 8 },
  ],
  impulseSpending: {
    thisMonth: 437.25,
    lastMonth: 542.50,
    percentChange: -19.4
  }
};

export function SpendingOverview() {
  return (
    <Tabs defaultValue="week" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Spending Overview</h2>
        <TabsList>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="week" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${spendingData.thisWeek.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {spendingData.thisWeek < spendingData.lastWeek ? (
                  <span className="text-green-500 flex items-center">
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                    {Math.abs(((spendingData.thisWeek - spendingData.lastWeek) / spendingData.lastWeek * 100)).toFixed(1)}% from last week
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                    {Math.abs(((spendingData.thisWeek - spendingData.lastWeek) / spendingData.lastWeek * 100)).toFixed(1)}% from last week
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impulse Purchases</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(spendingData.thisWeek * 0.35).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">~35% of total spending</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Biggest Category</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Shopping</div>
              <p className="text-xs text-muted-foreground">
                ${spendingData.categories[3].amount.toFixed(2)} ({spendingData.categories[3].percent}%)
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Potential</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(spendingData.thisWeek * 0.35 * 0.7).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">If you reduced impulse buys by 70%</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <SavingsLeaderboard />
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>
                Where your money went this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spendingData.categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-full text-sm">{category.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">${category.amount.toFixed(2)}</div>
                      <Badge variant="outline">{category.percent}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="month" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${spendingData.thisMonth.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {spendingData.thisMonth < spendingData.lastMonth ? (
                  <span className="text-green-500 flex items-center">
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                    {Math.abs(((spendingData.thisMonth - spendingData.lastMonth) / spendingData.lastMonth * 100)).toFixed(1)}% from last month
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                    {Math.abs(((spendingData.thisMonth - spendingData.lastMonth) / spendingData.lastMonth * 100)).toFixed(1)}% from last month
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impulse Purchases</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${spendingData.impulseSpending.thisMonth.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                  {Math.abs(spendingData.impulseSpending.percentChange).toFixed(1)}% from last month
                </span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Trend</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Improving</div>
              <p className="text-xs text-muted-foreground">
                Spending is down across most categories
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(spendingData.impulseSpending.thisMonth * 0.7).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">If you reduced impulse buys by 70%</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Spending</CardTitle>
              <CardDescription>
                Your spending trend over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {/* Replace with actual chart component */}
              <div className="h-[200px] w-full bg-slate-50 dark:bg-slate-900 rounded-md flex items-center justify-center">
                <LineChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">Monthly trend chart will render here</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Impulse vs. Planned</CardTitle>
              <CardDescription>
                Breakdown of impulse purchases vs. planned spending
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {/* Replace with actual chart component */}
              <div className="h-[200px] w-full bg-slate-50 dark:bg-slate-900 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Planned: ${(spendingData.thisMonth - spendingData.impulseSpending.thisMonth).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Impulse: ${spendingData.impulseSpending.thisMonth.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
