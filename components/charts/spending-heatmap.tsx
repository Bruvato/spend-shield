"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// Days of the week
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Time slots (24-hour format)
const timeSlots = [
  "12am-3am", "3am-6am", "6am-9am", "9am-12pm", 
  "12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"
];

// Mock data
const spendingHeatmapData = {
  march: [
    // Format: [day, timeSlot, amount]
    [0, 0, 0], [0, 1, 0], [0, 2, 15], [0, 3, 30], [0, 4, 45], [0, 5, 60], [0, 6, 80], [0, 7, 40],
    [1, 0, 0], [1, 1, 0], [1, 2, 25], [1, 3, 35], [1, 4, 50], [1, 5, 70], [1, 6, 100], [1, 7, 30],
    [2, 0, 0], [2, 1, 0], [2, 2, 20], [2, 3, 40], [2, 4, 65], [2, 5, 85], [2, 6, 95], [2, 7, 25],
    [3, 0, 0], [3, 1, 0], [3, 2, 30], [3, 3, 50], [3, 4, 70], [3, 5, 75], [3, 6, 90], [3, 7, 40],
    [4, 0, 0], [4, 1, 0], [4, 2, 35], [4, 3, 55], [4, 4, 80], [4, 5, 90], [4, 6, 120], [4, 7, 50],
    [5, 0, 10], [5, 1, 5], [5, 2, 20], [5, 3, 60], [5, 4, 100], [5, 5, 150], [5, 6, 200], [5, 7, 120],
    [6, 0, 15], [6, 1, 10], [6, 2, 25], [6, 3, 70], [6, 4, 110], [6, 5, 130], [6, 6, 150], [6, 7, 100]
  ],
  february: [
    // Similar pattern but with different values
    [0, 0, 5], [0, 1, 0], [0, 2, 20], [0, 3, 25], [0, 4, 40], [0, 5, 55], [0, 6, 75], [0, 7, 35],
    [1, 0, 0], [1, 1, 5], [1, 2, 15], [1, 3, 30], [1, 4, 45], [1, 5, 60], [1, 6, 90], [1, 7, 25],
    [2, 0, 0], [2, 1, 0], [2, 2, 10], [2, 3, 35], [2, 4, 60], [2, 5, 80], [2, 6, 90], [2, 7, 20],
    [3, 0, 0], [3, 1, 0], [3, 2, 25], [3, 3, 45], [3, 4, 65], [3, 5, 70], [3, 6, 85], [3, 7, 35],
    [4, 0, 0], [4, 1, 5], [4, 2, 30], [4, 3, 50], [4, 4, 75], [4, 5, 85], [4, 6, 110], [4, 7, 45],
    [5, 0, 5], [5, 1, 10], [5, 2, 15], [5, 3, 55], [5, 4, 95], [5, 5, 140], [5, 6, 180], [5, 7, 110],
    [6, 0, 10], [6, 1, 5], [6, 2, 20], [6, 3, 65], [6, 4, 100], [6, 5, 120], [6, 6, 140], [6, 7, 90]
  ],
  january: [
    // Similar pattern but with different values
    [0, 0, 0], [0, 1, 5], [0, 2, 10], [0, 3, 20], [0, 4, 35], [0, 5, 50], [0, 6, 70], [0, 7, 30],
    [1, 0, 0], [1, 1, 0], [1, 2, 20], [1, 3, 25], [1, 4, 40], [1, 5, 55], [1, 6, 85], [1, 7, 20],
    [2, 0, 0], [2, 1, 0], [2, 2, 15], [2, 3, 30], [2, 4, 55], [2, 5, 75], [2, 6, 85], [2, 7, 15],
    [3, 0, 0], [3, 1, 0], [3, 2, 20], [3, 3, 40], [3, 4, 60], [3, 5, 65], [3, 6, 80], [3, 7, 30],
    [4, 0, 0], [4, 1, 0], [4, 2, 25], [4, 3, 45], [4, 4, 70], [4, 5, 80], [4, 6, 100], [4, 7, 40],
    [5, 0, 0], [5, 1, 0], [5, 2, 10], [5, 3, 50], [5, 4, 90], [5, 5, 130], [5, 6, 170], [5, 7, 100],
    [6, 0, 5], [6, 1, 0], [6, 2, 15], [6, 3, 60], [6, 4, 95], [6, 5, 110], [6, 6, 130], [6, 7, 85]
  ]
};

type Month = "march" | "february" | "january";

export function SpendingHeatmap() {
  const [month, setMonth] = useState<Month>("march");
  
  // Define the heat color based on spending amount
  const getHeatColor = (amount: number) => {
    if (amount === 0) return "bg-gray-100";
    if (amount < 20) return "bg-green-100";
    if (amount < 50) return "bg-green-300";
    if (amount < 75) return "bg-yellow-300";
    if (amount < 100) return "bg-orange-300";
    if (amount < 150) return "bg-orange-500";
    return "bg-red-500";
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Spending Heatmap</CardTitle>
        <Select 
          value={month} 
          onValueChange={(value) => setMonth(value as Month)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="march">March</SelectItem>
            <SelectItem value="february">February</SelectItem>
            <SelectItem value="january">January</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[650px]">
            <div className="flex mb-2">
              <div className="w-24"></div>
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex-1 text-center text-xs font-medium text-muted-foreground">
                  {slot}
                </div>
              ))}
            </div>
            
            {daysOfWeek.map((day, dayIndex) => (
              <div key={dayIndex} className="flex mb-1 items-center">
                <div className="w-24 text-sm font-medium">{day}</div>
                {timeSlots.map((_, timeIndex) => {
                  // Find the corresponding data for this day and time slot
                  const cellData = spendingHeatmapData[month].find(
                    ([d, t]) => d === dayIndex && t === timeIndex
                  );
                  const amount = cellData ? cellData[2] : 0;
                  
                  return (
                    <div 
                      key={timeIndex} 
                      className={`flex-1 h-12 mx-1 rounded ${getHeatColor(amount)} relative group cursor-pointer`}
                    >
                      {amount > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium opacity-70">
                          ${amount}
                        </div>
                      )}
                      <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-1 p-2 bg-black text-white text-xs rounded shadow-lg whitespace-nowrap z-10 pointer-events-none">
                        {day}, {timeSlots[timeIndex]}: ${amount}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            
            <div className="mt-4 flex items-center justify-center">
              <div className="flex items-center">
                <div className="text-xs mr-1 text-muted-foreground">Less</div>
                <div className="h-3 w-3 bg-gray-100 mr-1"></div>
                <div className="h-3 w-3 bg-green-100 mr-1"></div>
                <div className="h-3 w-3 bg-green-300 mr-1"></div>
                <div className="h-3 w-3 bg-yellow-300 mr-1"></div>
                <div className="h-3 w-3 bg-orange-300 mr-1"></div>
                <div className="h-3 w-3 bg-orange-500 mr-1"></div>
                <div className="h-3 w-3 bg-red-500 mr-1"></div>
                <div className="text-xs text-muted-foreground">More</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
