"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for monthly budget vs actual spending
const budgetData = [
  { 
    category: "Housing", 
    budget: 1200, 
    actual: 1150, 
    status: "under"
  },
  { 
    category: "Food", 
    budget: 500, 
    actual: 620, 
    status: "over"
  },
  { 
    category: "Transportation", 
    budget: 300, 
    actual: 295, 
    status: "under"
  },
  { 
    category: "Entertainment", 
    budget: 200, 
    actual: 340, 
    status: "over"
  },
  { 
    category: "Utilities", 
    budget: 250, 
    actual: 230, 
    status: "under"
  },
  { 
    category: "Shopping", 
    budget: 300, 
    actual: 415, 
    status: "over"
  }
];

export function MonthlyBudgetOverview() {
  // Calculate total budget and total spending
  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
  const totalActual = budgetData.reduce((sum, item) => sum + item.actual, 0);
  const difference = totalBudget - totalActual;
  const isOverBudget = difference < 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Monthly Budget Overview</CardTitle>
          <p className="text-sm text-muted-foreground">March 2025</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Total Budget: <span className="font-bold">${totalBudget}</span></p>
            <p className="text-sm font-medium">Spent: <span className="font-bold">${totalActual}</span></p>
          </div>
          <Badge className={isOverBudget ? "bg-red-500" : "bg-green-500"}>
            {isOverBudget 
              ? `$${Math.abs(difference).toFixed(2)} over budget` 
              : `$${difference.toFixed(2)} under budget`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={budgetData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `$${value}`} />
              <YAxis type="category" dataKey="category" width={80} />
              <Tooltip 
                formatter={(value) => [`$${value}`, '']} 
                labelFormatter={(value) => `Category: ${value}`}
              />
              <Legend />
              <Bar dataKey="budget" name="Budget" fill="#60a5fa" />
              <Bar 
                dataKey="actual" 
                name="Actual" 
                fill={(data) => data.status === "over" ? "#f87171" : "#4ade80"} 
              />
              <ReferenceLine x={0} stroke="#666" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
