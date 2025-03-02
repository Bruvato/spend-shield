"use client";

import { useEffect, useState } from "react";
import { 
  ResponsiveContainer, 
  RadialBarChart, 
  RadialBar, 
  Legend, 
  Tooltip
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchData } from "@/lib/data/api/api-client";
import { SavingsGoal } from "@/lib/data/models/goals";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", 
  "#82CA9D", "#A4DE6C", "#D0ED57", "#FAA43A"
];

export function SavingsGoalsProgress() {
  const [data, setData] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const goals = await fetchData<SavingsGoal[]>('goals/savings');
        setData(goals);
      } catch (err) {
        setError("Failed to load savings goals data");
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
          <CardTitle>Savings Goals Progress</CardTitle>
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
          <CardTitle>Savings Goals Progress</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <p className="text-muted-foreground">
            {error || "No savings goals available"}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Format data for the Radial Bar Chart
  const chartData = data.map((goal, index) => ({
    name: goal.name,
    uv: goal.percentComplete,
    current: goal.current,
    target: goal.target,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goals Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="10%" 
              outerRadius="80%" 
              barSize={20} 
              data={chartData}
            >
              <RadialBar
                minAngle={15}
                label={{ 
                  position: 'insideStart', 
                  fill: '#fff',
                  formatter: (value: any) => `${value.uv}%` 
                }}
                background
                clockWise
                dataKey="uv"
              />
              <Legend 
                iconSize={10} 
                layout="vertical" 
                verticalAlign="middle" 
                wrapperStyle={{ right: 0, top: 0, bottom: 0 }}
                formatter={(value) => value}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  return [
                    `$${props.payload.current.toFixed(2)} of $${props.payload.target.toFixed(2)}`,
                    props.payload.name
                  ];
                }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
