"use client";

import { useEffect, useState } from "react";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImpulseAnalytics } from "@/lib/data/models/analytics";
import { fetchData } from "@/lib/data/api/api-client";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", 
  "#82CA9D", "#A4DE6C", "#D0ED57", "#FAA43A"
];

export function ImpulseAnalysis() {
  const [data, setData] = useState<ImpulseAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const impulseData = await fetchData<ImpulseAnalytics>('analytics/impulse');
        setData(impulseData);
      } catch (err) {
        setError("Failed to load impulse analytics data");
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
          <CardTitle>Impulse Spending Analysis</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Impulse Spending Analysis</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">
            {error || "No impulse spending data available"}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Format data for the pie chart
  const pieData = [
    { name: "Impulse", value: data.totalImpulse },
    { name: "Regular", value: data.totalNormal }
  ];

  // Format data for the trend chart
  const trendData = data.byDay.map(day => ({
    date: day.date,
    amount: day.amount
  }));

  // Format data for the category chart
  const categoryData = data.byCategory.map(cat => ({
    name: cat.category,
    value: cat.amount,
    percentage: cat.percentage
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Impulse Spending Analysis</CardTitle>
        <CardDescription>
          {data.trend === 'increasing' 
            ? "Your impulse spending is trending upward." 
            : data.trend === 'decreasing'
              ? "Your impulse spending is trending downward. Great job!"
              : "Your impulse spending is stable."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trend">Trend</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="h-[350px] mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <div className="bg-slate-50 rounded-lg p-4 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-center mb-2">Impulse vs Regular Spending</h3>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 flex flex-col">
                <h3 className="text-lg font-semibold text-center mb-2">Spending Summary</h3>
                <div className="space-y-4 flex-1 flex flex-col justify-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Impulse Spending</p>
                    <p className="text-2xl font-bold">${data.totalImpulse.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Regular Spending</p>
                    <p className="text-2xl font-bold">${data.totalNormal.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Impulse Percentage</p>
                    <p className="text-2xl font-bold">{data.percentage.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="trend" className="h-[350px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={trendData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                <Legend />
                <Bar
                  dataKey="amount"
                  name="Impulse Amount"
                  fill="#FF8042"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  name="Trend Line"
                  stroke="#8884d8"
                  dot={false}
                  activeDot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="categories" className="h-[350px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                layout="vertical"
                data={categoryData}
                margin={{ top: 20, right: 20, bottom: 20, left: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip 
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Impulse Amount" 
                  fill="#FF8042"
                  radius={[0, 4, 4, 0]} 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
