"use client";

import { useEffect, useState } from "react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchData } from "@/lib/data/api/api-client";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", 
  "#82CA9D", "#A4DE6C", "#D0ED57", "#FAA43A", "#F2726F"
];

interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
}

// Mock data for initial rendering
const mockCategoryData: CategorySpending[] = [
  { category: "Food & Dining", amount: 450.75, percentage: 27.5 },
  { category: "Shopping", amount: 325.30, percentage: 19.9 },
  { category: "Transportation", amount: 275.20, percentage: 16.8 },
  { category: "Entertainment", amount: 190.50, percentage: 11.6 },
  { category: "Utilities", amount: 165.80, percentage: 10.1 },
  { category: "Other", amount: 228.35, percentage: 14.1 },
];

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, index }: any) => {
  if (percent < 0.05) return null; // Don't show labels for very small slices
  
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return percent > 0.1 ? (
    <text 
      x={x} 
      y={y} 
      fill="#fff" 
      textAnchor="middle" 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export function SpendingByCategory() {
  const [data, setData] = useState<CategorySpending[]>(mockCategoryData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchData<{byCategory: CategorySpending[]}>('analytics/spending');
        if (response?.byCategory?.length > 0) {
          setData(response.byCategory);
        }
      } catch (err) {
        // Fall back to mock data, but log the error
        console.error("Failed to load spending by category data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-[350px] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="h-[350px] flex items-center justify-center">
        <p className="text-muted-foreground">
          {error || "No spending data available"}
        </p>
      </div>
    );
  }

  // Format data for the pie chart
  const chartData = data.map(item => ({
    name: item.category,
    value: item.amount,
    percentage: item.percentage
  }));

  return (
    <div className="h-[350px] pt-6">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 25, right: 10, left: 10, bottom: 30 }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="40%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={95}
            innerRadius={40}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']}
            contentStyle={{ fontSize: '12px' }}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: '12px', paddingTop: '25px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
