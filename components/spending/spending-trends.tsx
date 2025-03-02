import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SpendingTrends() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <Tabs defaultValue="month">
          <div className="flex items-center justify-between">
            <CardTitle>Spending Trends</CardTitle>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-4 pb-0">
        <div className="h-[350px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3">
              <div className="w-full h-[300px] relative">
                {/* This is a placeholder for a chart component */}
                <svg className="w-full h-full" viewBox="0 0 800 300">
                  {/* X-axis */}
                  <line x1="50" y1="250" x2="750" y2="250" stroke="currentColor" strokeOpacity="0.2" />
                  
                  {/* Y-axis */}
                  <line x1="50" y1="50" x2="50" y2="250" stroke="currentColor" strokeOpacity="0.2" />
                  
                  {/* Y-axis labels */}
                  <text x="30" y="250" textAnchor="end" className="text-xs" fill="currentColor" fillOpacity="0.6">$0</text>
                  <text x="30" y="200" textAnchor="end" className="text-xs" fill="currentColor" fillOpacity="0.6">$500</text>
                  <text x="30" y="150" textAnchor="end" className="text-xs" fill="currentColor" fillOpacity="0.6">$1000</text>
                  <text x="30" y="100" textAnchor="end" className="text-xs" fill="currentColor" fillOpacity="0.6">$1500</text>
                  <text x="30" y="50" textAnchor="end" className="text-xs" fill="currentColor" fillOpacity="0.6">$2000</text>
                  
                  {/* X-axis labels (months) */}
                  <text x="100" y="270" textAnchor="middle" className="text-xs" fill="currentColor" fillOpacity="0.6">Mar</text>
                  <text x="200" y="270" textAnchor="middle" className="text-xs" fill="currentColor" fillOpacity="0.6">Apr</text>
                  <text x="300" y="270" textAnchor="middle" className="text-xs" fill="currentColor" fillOpacity="0.6">May</text>
                  <text x="400" y="270" textAnchor="middle" className="text-xs" fill="currentColor" fillOpacity="0.6">Jun</text>
                  <text x="500" y="270" textAnchor="middle" className="text-xs" fill="currentColor" fillOpacity="0.6">Jul</text>
                  <text x="600" y="270" textAnchor="middle" className="text-xs" fill="currentColor" fillOpacity="0.6">Aug</text>
                  <text x="700" y="270" textAnchor="middle" className="text-xs" fill="currentColor" fillOpacity="0.6">Sep</text>
                  
                  {/* Horizontal grid lines */}
                  <line x1="50" y1="200" x2="750" y2="200" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
                  <line x1="50" y1="150" x2="750" y2="150" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
                  <line x1="50" y1="100" x2="750" y2="100" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
                  <line x1="50" y1="50" x2="750" y2="50" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
                  
                  {/* Vertical grid lines */}
                  <line x1="100" y1="50" x2="100" y2="250" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
                  <line x1="200" y1="50" x2="200" y2="250" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
                  <line x1="300" y1="50" x2="300" y2="250" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
                  <line x1="400" y1="50" x2="400" y2="250" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
                  <line x1="500" y1="50" x2="500" y2="250" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
                  <line x1="600" y1="50" x2="600" y2="250" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
                  <line x1="700" y1="50" x2="700" y2="250" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
                  
                  {/* Total spending line (blue) */}
                  <path 
                    d="M100,200 L200,190 L300,180 L400,210 L500,170 L600,150 L700,120" 
                    fill="none"
                    stroke="#0066cc"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Data points for total spending */}
                  <circle cx="100" cy="200" r="4" fill="#0066cc" />
                  <circle cx="200" cy="190" r="4" fill="#0066cc" />
                  <circle cx="300" cy="180" r="4" fill="#0066cc" />
                  <circle cx="400" cy="210" r="4" fill="#0066cc" />
                  <circle cx="500" cy="170" r="4" fill="#0066cc" />
                  <circle cx="600" cy="150" r="4" fill="#0066cc" />
                  <circle cx="700" cy="120" r="4" fill="#0066cc" />
                  
                  {/* Impulse spending line (red) */}
                  <path 
                    d="M100,220 L200,230 L300,210 L400,240 L500,200 L600,220 L700,190" 
                    fill="none"
                    stroke="#cc0033"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="6 3"
                  />
                  
                  {/* Data points for impulse spending */}
                  <circle cx="100" cy="220" r="4" fill="#cc0033" />
                  <circle cx="200" cy="230" r="4" fill="#cc0033" />
                  <circle cx="300" cy="210" r="4" fill="#cc0033" />
                  <circle cx="400" cy="240" r="4" fill="#cc0033" />
                  <circle cx="500" cy="200" r="4" fill="#cc0033" />
                  <circle cx="600" cy="220" r="4" fill="#cc0033" />
                  <circle cx="700" cy="190" r="4" fill="#cc0033" />
                </svg>
              </div>
              
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                  <span className="text-sm">Total Spending</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                  <span className="text-sm">Impulse Spending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
