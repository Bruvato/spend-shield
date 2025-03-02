"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface DailySpendingData {
  date: string;
  day: string;
  total: number;
  impulse: number;
  regular: number;
}

// Mock data for the charts with realistic values
const mockCurrentWeekData: DailySpendingData[] = [
  { day: "Monday", date: "2025-02-24", total: 42.75, impulse: 12.50, regular: 30.25 },
  { day: "Tuesday", date: "2025-02-25", total: 78.50, impulse: 35.25, regular: 43.25 },
  { day: "Wednesday", date: "2025-02-26", total: 55.30, impulse: 0, regular: 55.30 },
  { day: "Thursday", date: "2025-02-27", total: 47.43, impulse: 5.25, regular: 42.18 },
  { day: "Friday", date: "2025-02-28", total: 246.79, impulse: 199.99, regular: 46.80 },
  { day: "Saturday", date: "2025-03-01", total: 85.42, impulse: 0, regular: 85.42 },
  { day: "Sunday", date: "2025-03-02", total: 30.50, impulse: 0, regular: 30.50 },
];

const mockPreviousWeekData: DailySpendingData[] = [
  { day: "Monday", date: "2025-02-17", total: 65.20, impulse: 25.70, regular: 39.50 },
  { day: "Tuesday", date: "2025-02-18", total: 48.30, impulse: 0, regular: 48.30 },
  { day: "Wednesday", date: "2025-02-19", total: 72.15, impulse: 18.45, regular: 53.70 },
  { day: "Thursday", date: "2025-02-20", total: 39.65, impulse: 0, regular: 39.65 },
  { day: "Friday", date: "2025-02-21", total: 110.80, impulse: 58.30, regular: 52.50 },
  { day: "Saturday", date: "2025-02-22", total: 95.25, impulse: 40.00, regular: 55.25 },
  { day: "Sunday", date: "2025-02-23", total: 32.25, impulse: 0, regular: 32.25 },
];

export function DailySpendingChart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentWeekData, setCurrentWeekData] = useState<DailySpendingData[]>(mockCurrentWeekData);
  const [previousWeekData, setPreviousWeekData] = useState<DailySpendingData[]>(mockPreviousWeekData);
  
  // Find the maximum value to scale the chart properly
  const maxValue = Math.max(
    ...currentWeekData.map(d => d.total),
    ...previousWeekData.map(d => d.total)
  );
  
  // Round up to nearest 50 for a cleaner y-axis scale
  const chartMax = Math.ceil(maxValue / 50) * 50 || 300; // Default to 300 if no data
  
  const renderBarChart = (data: DailySpendingData[]) => {
    if (data.length === 0) {
      return (
        <div className="h-[300px] w-full flex items-center justify-center">
          <p className="text-muted-foreground">No data available for this week</p>
        </div>
      );
    }
    
    // Format data for recharts
    const formattedData = data.map(item => ({
      name: item.day.substring(0, 3), // Mon, Tue, etc.
      regular: item.regular,
      impulse: item.impulse,
      total: item.total,
      // Add full day name for tooltip
      fullDay: item.day,
      date: item.date
    }));
    
    return (
      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={formattedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              formatter={(value, name) => [`$${Number(value).toFixed(2)}`, name === 'regular' ? 'Regular Spending' : name === 'impulse' ? 'Impulse Spending' : 'Total']}
              labelFormatter={(label, items) => {
                const item = items[0]?.payload;
                return item ? `${item.fullDay} (${item.date})` : label;
              }}
            />
            <Legend />
            <Bar dataKey="regular" stackId="a" fill="#0088FE" name="Regular" />
            <Bar dataKey="impulse" stackId="a" fill="#FF8042" name="Impulse" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Daily Spending</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Daily Spending</CardTitle>
          <div className="text-sm text-muted-foreground">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-sm mr-1"></span> Regular
            <span className="inline-block w-3 h-3 bg-red-500 rounded-sm mx-1 ml-3"></span> Impulse
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current">
          <TabsList className="mb-2">
            <TabsTrigger value="current">Current Week</TabsTrigger>
            <TabsTrigger value="previous">Previous Week</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            {renderBarChart(currentWeekData)}
          </TabsContent>
          
          <TabsContent value="previous">
            {renderBarChart(previousWeekData)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
