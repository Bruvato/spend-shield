"use client";

import { useEffect, useState } from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchData } from "@/lib/data/api/api-client";
import { CategoryBudget } from "@/lib/data/models/budget";

export function BudgetProgress() {
  const [data, setData] = useState<CategoryBudget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const budgetData = await fetchData<CategoryBudget[]>('budgets');
        setData(budgetData);
      } catch (err) {
        setError("Failed to load budget data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget Progress</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (error || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget Progress</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <p className="text-muted-foreground">
            {error || "No budget data available"}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Format data for the chart
  const chartData = data.map(category => ({
    name: category.name,
    budget: category.budget,
    spent: category.spent,
    remaining: category.remaining,
    percentUsed: category.percentUsed
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `$${value}`} />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={100}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "budget") return [`$${value.toFixed(2)}`, "Budget"];
                  if (name === "spent") return [`$${value.toFixed(2)}`, "Spent"];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar 
                dataKey="budget" 
                fill="#8884d8" 
                name="Budget" 
                radius={[0, 4, 4, 0]}
              />
              <Bar 
                dataKey="spent" 
                fill="#82ca9d" 
                name="Spent" 
                radius={[0, 4, 4, 0]}
              />
              <ReferenceLine x={0} stroke="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
