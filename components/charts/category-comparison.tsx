"use client";

import { useState } from "react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  ResponsiveContainer, 
  Tooltip
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for category comparison
const currentMonthData = [
  { category: "Food", amount: 650, fullMark: 1000 },
  { category: "Transportation", amount: 300, fullMark: 1000 },
  { category: "Entertainment", amount: 450, fullMark: 1000 },
  { category: "Shopping", amount: 400, fullMark: 1000 },
  { category: "Bills", amount: 550, fullMark: 1000 },
  { category: "Health", amount: 200, fullMark: 1000 },
];

const previousMonthData = [
  { category: "Food", amount: 600, fullMark: 1000 },
  { category: "Transportation", amount: 320, fullMark: 1000 },
  { category: "Entertainment", amount: 350, fullMark: 1000 },
  { category: "Shopping", amount: 380, fullMark: 1000 },
  { category: "Bills", amount: 550, fullMark: 1000 },
  { category: "Health", amount: 180, fullMark: 1000 },
];

const nationalAverageData = [
  { category: "Food", amount: 580, fullMark: 1000 },
  { category: "Transportation", amount: 350, fullMark: 1000 },
  { category: "Entertainment", amount: 300, fullMark: 1000 },
  { category: "Shopping", amount: 320, fullMark: 1000 },
  { category: "Bills", amount: 530, fullMark: 1000 },
  { category: "Health", amount: 250, fullMark: 1000 },
];

const friendsAverageData = [
  { category: "Food", amount: 620, fullMark: 1000 },
  { category: "Transportation", amount: 280, fullMark: 1000 },
  { category: "Entertainment", amount: 480, fullMark: 1000 },
  { category: "Shopping", amount: 430, fullMark: 1000 },
  { category: "Bills", amount: 520, fullMark: 1000 },
  { category: "Health", amount: 210, fullMark: 1000 },
];

type ComparisonType = "previous" | "national" | "friends";

export function CategoryComparisonChart() {
  const [comparisonType, setComparisonType] = useState<ComparisonType>("previous");
  
  // Get comparison data based on selected type
  const getComparisonData = () => {
    switch (comparisonType) {
      case "previous":
        return previousMonthData;
      case "national":
        return nationalAverageData;
      case "friends":
        return friendsAverageData;
      default:
        return previousMonthData;
    }
  };
  
  // Get comparison label
  const getComparisonLabel = () => {
    switch (comparisonType) {
      case "previous":
        return "Previous Month";
      case "national":
        return "National Average";
      case "friends":
        return "Friends Average";
      default:
        return "Previous Month";
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={comparisonType} onValueChange={(value) => setComparisonType(value as ComparisonType)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="previous">Previous Month</TabsTrigger>
            <TabsTrigger value="national">National Avg</TabsTrigger>
            <TabsTrigger value="friends">Friends Avg</TabsTrigger>
          </TabsList>
          <TabsContent value={comparisonType}>
            <div className="h-[400px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={currentMonthData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Radar
                    name="Current Month"
                    dataKey="amount"
                    stroke="#f87171"
                    fill="#f87171"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name={getComparisonLabel()}
                    dataKey="amount"
                    stroke="#60a5fa"
                    fill="#60a5fa"
                    fillOpacity={0.6}
                    data={getComparisonData()}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
