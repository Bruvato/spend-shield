"use client";

import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const mockData = {
  monthly: [
    { name: "Jan", income: 3200, expenses: 2800 },
    { name: "Feb", income: 3100, expenses: 2900 },
    { name: "Mar", income: 3600, expenses: 3100 },
    { name: "Apr", income: 3400, expenses: 3300 },
    { name: "May", income: 3800, expenses: 3200 },
    { name: "Jun", income: 3700, expenses: 3500 },
  ],
  quarterly: [
    { name: "Q1", income: 9900, expenses: 8800 },
    { name: "Q2", income: 10900, expenses: 10000 },
  ],
  yearly: [
    { name: "2023", income: 38000, expenses: 35000 },
    { name: "2024", income: 41000, expenses: 38000 },
    { name: "2025 (YTD)", income: 20900, expenses: 18800 },
  ]
};

type TimeFrame = "monthly" | "quarterly" | "yearly";

export function IncomeVsExpensesChart() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("monthly");
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Income vs Expenses</CardTitle>
        <Select 
          value={timeFrame} 
          onValueChange={(value) => setTimeFrame(value as TimeFrame)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Time Frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockData[timeFrame]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => [`$${value}`, '']} />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#4ade80" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
