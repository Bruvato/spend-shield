"use client";

import { useEffect, useState } from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SavingsProjection } from "@/lib/data/models/analytics";
import { fetchData } from "@/lib/data/api/api-client";

export function SavingsProjectionChart() {
  const [data, setData] = useState<SavingsProjection | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const projectionData = await fetchData<SavingsProjection>('analytics/savings-projection');
        setData(projectionData);
      } catch (err) {
        setError("Failed to load savings projection data");
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
          <CardTitle>Savings Projection</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Savings Projection</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <p className="text-muted-foreground">
            {error || "No savings projection data available"}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Format the projection data for the chart
  const chartData = data.totalAfterYears.map(item => ({
    year: `Year ${item.years}`,
    amount: item.amount,
    yearValue: item.years
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Projection</CardTitle>
        <CardDescription>
          Based on your current savings rate of ${data.currentSavingsRate.toFixed(2)}/month
          with {data.investmentReturn * 100}% annual return
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }}
              />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Projected Savings']}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="amount"
                name="Projected Savings"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-md font-medium text-blue-800">Compound Interest Power</h3>
          <p className="text-sm text-blue-700 mt-1">
            With your current savings rate and investment strategy, your money will grow to 
            ${chartData[chartData.length - 1].amount.toFixed(2)} in {chartData[chartData.length - 1].yearValue} years.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
