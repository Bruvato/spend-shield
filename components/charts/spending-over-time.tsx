"use client";

import { useEffect, useState } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchData } from "@/lib/data/api/api-client";

interface DailySpending {
  date: string;
  regularAmount: number;
  impulseAmount: number;
  total: number;
}

interface WeeklySpending {
  weekStart: string;
  amount: number;
}

interface MonthlySpending {
  month: string;
  amount: number;
}

type TimeRange = "weekly" | "monthly";

// Mock data for fallback/initial rendering
const mockDailyData: DailySpending[] = [
  { date: "2025-02-01", regularAmount: 65.30, impulseAmount: 0, total: 65.30 },
  { date: "2025-02-02", regularAmount: 42.75, impulseAmount: 0, total: 42.75 },
  { date: "2025-02-03", regularAmount: 55.40, impulseAmount: 15.95, total: 71.35 },
  { date: "2025-02-04", regularAmount: 38.25, impulseAmount: 0, total: 38.25 },
  { date: "2025-02-05", regularAmount: 49.60, impulseAmount: 12.99, total: 62.59 },
  { date: "2025-02-06", regularAmount: 35.45, impulseAmount: 0, total: 35.45 },
  { date: "2025-02-07", regularAmount: 85.20, impulseAmount: 45.75, total: 130.95 },
  { date: "2025-02-08", regularAmount: 95.35, impulseAmount: 0, total: 95.35 },
  { date: "2025-02-09", regularAmount: 32.15, impulseAmount: 0, total: 32.15 },
  { date: "2025-02-10", regularAmount: 45.40, impulseAmount: 0, total: 45.40 },
  { date: "2025-02-11", regularAmount: 52.25, impulseAmount: 20.15, total: 72.40 },
  { date: "2025-02-12", regularAmount: 48.75, impulseAmount: 0, total: 48.75 },
  { date: "2025-02-13", regularAmount: 35.10, impulseAmount: 0, total: 35.10 },
  { date: "2025-02-14", regularAmount: 75.85, impulseAmount: 59.99, total: 135.84 },
  { date: "2025-02-15", regularAmount: 90.25, impulseAmount: 0, total: 90.25 },
  { date: "2025-02-16", regularAmount: 41.15, impulseAmount: 0, total: 41.15 },
  { date: "2025-02-17", regularAmount: 39.50, impulseAmount: 25.70, total: 65.20 },
  { date: "2025-02-18", regularAmount: 48.30, impulseAmount: 0, total: 48.30 },
  { date: "2025-02-19", regularAmount: 53.70, impulseAmount: 18.45, total: 72.15 },
  { date: "2025-02-20", regularAmount: 39.65, impulseAmount: 0, total: 39.65 },
  { date: "2025-02-21", regularAmount: 52.50, impulseAmount: 58.30, total: 110.80 },
  { date: "2025-02-22", regularAmount: 55.25, impulseAmount: 40.00, total: 95.25 },
  { date: "2025-02-23", regularAmount: 32.25, impulseAmount: 0, total: 32.25 },
  { date: "2025-02-24", regularAmount: 30.25, impulseAmount: 12.50, total: 42.75 },
  { date: "2025-02-25", regularAmount: 43.25, impulseAmount: 35.25, total: 78.50 },
  { date: "2025-02-26", regularAmount: 55.30, impulseAmount: 0, total: 55.30 },
  { date: "2025-02-27", regularAmount: 42.18, impulseAmount: 5.25, total: 47.43 },
  { date: "2025-02-28", regularAmount: 46.80, impulseAmount: 199.99, total: 246.79 },
  { date: "2025-03-01", regularAmount: 85.42, impulseAmount: 0, total: 85.42 },
  { date: "2025-03-02", regularAmount: 30.50, impulseAmount: 0, total: 30.50 },
];

const mockWeeklyData: WeeklySpending[] = [
  { weekStart: "2025-01-05", amount: 312.45 },
  { weekStart: "2025-01-12", amount: 420.15 },
  { weekStart: "2025-01-19", amount: 285.75 },
  { weekStart: "2025-01-26", amount: 345.30 },
  { weekStart: "2025-02-02", amount: 375.60 },
  { weekStart: "2025-02-09", amount: 432.70 },
  { weekStart: "2025-02-16", amount: 421.90 },
  { weekStart: "2025-02-23", amount: 587.02 },
  { weekStart: "2025-03-02", amount: 115.92 },
];

const mockMonthlyData: MonthlySpending[] = [
  { month: "Oct 2024", amount: 1250.75 },
  { month: "Nov 2024", amount: 1450.30 },
  { month: "Dec 2024", amount: 1750.45 },
  { month: "Jan 2025", amount: 1320.85 },
  { month: "Feb 2025", amount: 1635.90 },
  { month: "Mar 2025", amount: 115.92 },
];

export function SpendingOverTime() {
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly");
  const [dailyData, setDailyData] = useState<DailySpending[]>(mockDailyData);
  const [weeklyData, setWeeklyData] = useState<WeeklySpending[]>(mockWeeklyData);
  const [monthlyData, setMonthlyData] = useState<MonthlySpending[]>(mockMonthlyData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch all time ranges at once for smoother experience when switching
        const spendingData = await fetchData<{
          byDay: DailySpending[],
          byWeek: WeeklySpending[],
          byMonth: MonthlySpending[]
        }>('analytics/spending');
        
        // Only update if we get valid data
        if (spendingData?.byDay?.length > 0) {
          setDailyData(spendingData.byDay);
        }
        if (spendingData?.byWeek?.length > 0) {
          setWeeklyData(spendingData.byWeek);
        }
        if (spendingData?.byMonth?.length > 0) {
          setMonthlyData(spendingData.byMonth);
        }
      } catch (err) {
        console.error("Failed to load spending data:", err);
        // We're not setting the error state here since we have fallback data
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Determine which data to display based on selected time range
  const getDisplayData = () => {
    switch (timeRange) {
      case "weekly":
        return weeklyData.map(item => ({
          date: item.weekStart,
          total: item.amount
        }));
      case "monthly":
        return monthlyData.map(item => ({
          date: item.month,
          total: item.amount
        }));
      default:
        return weeklyData.map(item => ({
          date: item.weekStart,
          total: item.amount
        }));
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-medium">Spending History</h3>
        <Select 
          value={timeRange} 
          onValueChange={(value) => setTimeRange(value as TimeRange)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="pt-4">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getDisplayData()}
              margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tickFormatter={(value) => `$${value}`} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']} 
                contentStyle={{ fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line 
                type="monotone" 
                dataKey="total" 
                name="Total Spending"
                stroke="#8884D8" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
