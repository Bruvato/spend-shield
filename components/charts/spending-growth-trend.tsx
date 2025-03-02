"use client";

import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for spending growth trends
const mockData = {
  weekly: [
    { name: "Week 1", actual: 380, baseline: 350, delta: 8.6 },
    { name: "Week 2", actual: 410, baseline: 350, delta: 17.1 },
    { name: "Week 3", actual: 375, baseline: 350, delta: 7.1 },
    { name: "Week 4", actual: 430, baseline: 350, delta: 22.9 },
    { name: "Week 5", actual: 420, baseline: 350, delta: 20.0 },
    { name: "Week 6", actual: 390, baseline: 350, delta: 11.4 },
    { name: "Week 7", actual: 400, baseline: 350, delta: 14.3 },
    { name: "Week 8", actual: 450, baseline: 350, delta: 28.6 },
  ],
  monthly: [
    { name: "Jul", actual: 1500, baseline: 1400, delta: 7.1 },
    { name: "Aug", actual: 1600, baseline: 1400, delta: 14.3 },
    { name: "Sep", actual: 1550, baseline: 1400, delta: 10.7 },
    { name: "Oct", actual: 1700, baseline: 1400, delta: 21.4 },
    { name: "Nov", actual: 1800, baseline: 1400, delta: 28.6 },
    { name: "Dec", actual: 2000, baseline: 1400, delta: 42.9 },
    { name: "Jan", actual: 1700, baseline: 1400, delta: 21.4 },
    { name: "Feb", actual: 1600, baseline: 1400, delta: 14.3 },
    { name: "Mar", actual: 1650, baseline: 1400, delta: 17.9 },
  ],
  quarterly: [
    { name: "Q1 2024", actual: 4500, baseline: 4200, delta: 7.1 },
    { name: "Q2 2024", actual: 4800, baseline: 4200, delta: 14.3 },
    { name: "Q3 2024", actual: 5100, baseline: 4200, delta: 21.4 },
    { name: "Q4 2024", actual: 5500, baseline: 4200, delta: 31.0 },
    { name: "Q1 2025", actual: 5300, baseline: 4200, delta: 26.2 },
  ]
};

type TimeFrame = "weekly" | "monthly" | "quarterly";

export function SpendingGrowthTrend() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("monthly");
  
  // Calculate average delta for selected timeframe
  const averageDelta = (mockData[timeFrame].reduce((sum, item) => sum + item.delta, 0) / mockData[timeFrame].length).toFixed(1);
  
  // Determine trend direction
  const trendDirection = Number(averageDelta) > 0 ? "increase" : "decrease";
  
  // Calculate moving average
  const calculateMovingAverage = (data: typeof mockData.monthly, period: number = 3) => {
    return data.map((item, index, array) => {
      if (index < period - 1) return { ...item, ma: null };
      
      let sum = 0;
      for (let i = 0; i < period; i++) {
        sum += array[index - i].actual;
      }
      
      return {
        ...item,
        ma: Number((sum / period).toFixed(2))
      };
    });
  };
  
  const dataWithMA = calculateMovingAverage(mockData[timeFrame]);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Spending Growth Trend</CardTitle>
          <p className="text-sm text-muted-foreground">
            <span className={trendDirection === "increase" ? "text-red-500" : "text-green-500"}>
              {averageDelta}% {trendDirection}
            </span> from baseline
          </p>
        </div>
        <Select 
          value={timeFrame} 
          onValueChange={(value) => setTimeFrame(value as TimeFrame)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dataWithMA}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "actual") return [`$${value}`, "Actual"];
                  if (name === "baseline") return [`$${value}`, "Baseline"];
                  if (name === "ma") return [`$${value}`, "Moving Avg (3)"];
                  return [value, name];
                }}
              />
              <Legend />
              <ReferenceLine 
                y={mockData[timeFrame][0].baseline} 
                stroke="#8884d8" 
                strokeDasharray="3 3" 
                label={{ value: "Baseline", position: "insideTopLeft" }} 
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#f87171" 
                name="Actual" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="ma" 
                stroke="#60a5fa" 
                name="Moving Avg (3)" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                connectNulls 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
