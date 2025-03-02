"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for daily transactions (will be fetched from API in real app)
const dailyTransactions = {
  "2025-03-02": [
    { id: "1", description: "Coffee Shop", amount: 5.75, category: "Food & Drink", time: "08:32 AM", isImpulse: false },
    { id: "2", description: "Grocery Store", amount: 24.75, category: "Groceries", time: "12:15 PM", isImpulse: false },
  ],
  "2025-03-01": [
    { id: "3", description: "Movie Tickets", amount: 28.50, category: "Entertainment", time: "7:20 PM", isImpulse: false },
    { id: "4", description: "Restaurant Dinner", amount: 42.35, category: "Food & Drink", time: "8:45 PM", isImpulse: false },
    { id: "5", description: "Vintage T-shirt", amount: 14.57, category: "Shopping", time: "3:12 PM", isImpulse: true },
  ],
  "2025-02-28": [
    { id: "6", description: "Gas Station", amount: 46.80, category: "Transportation", time: "5:30 PM", isImpulse: false },
    { id: "7", description: "New Headphones", amount: 199.99, category: "Electronics", time: "1:25 PM", isImpulse: true },
  ]
};

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  time: string;
  isImpulse: boolean;
}

interface DailyTransactions {
  [date: string]: Transaction[];
}

export function DailySpendingDetails() {
  const [activeDay, setActiveDay] = useState<string>("2025-03-02");
  
  // Calculate daily totals
  const calculateDailyTotal = (date: string) => {
    const transactions = dailyTransactions[date] || [];
    return transactions.reduce((sum, tx) => sum + tx.amount, 0);
  };
  
  const calculateImpulseTotal = (date: string) => {
    const transactions = dailyTransactions[date] || [];
    return transactions
      .filter(tx => tx.isImpulse)
      .reduce((sum, tx) => sum + tx.amount, 0);
  };
  
  // Format date for display
  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };
  
  // Get the active transactions
  const activeTransactions = dailyTransactions[activeDay] || [];
  const dailyTotal = calculateDailyTotal(activeDay);
  const impulseTotal = calculateImpulseTotal(activeDay);
  const regularTotal = dailyTotal - impulseTotal;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Daily Spending Details</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDateDisplay(activeDay)}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold">${dailyTotal.toFixed(2)}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              {impulseTotal > 0 && (
                <Badge variant="destructive" className="mr-2">
                  ${impulseTotal.toFixed(2)} impulse
                </Badge>
              )}
              <span>${regularTotal.toFixed(2)} regular</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="2025-03-02" onValueChange={setActiveDay}>
        <TabsList className="w-full justify-start px-6 overflow-auto">
          {Object.keys(dailyTransactions).map(date => (
            <TabsTrigger 
              key={date} 
              value={date}
              className="flex flex-col items-center"
            >
              <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span className="text-xs">{new Date(date).getDate()}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.keys(dailyTransactions).map(date => (
          <TabsContent key={date} value={date} className="p-0">
            <CardContent className="p-6">
              <div className="space-y-4">
                {dailyTransactions[date].map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.isImpulse ? 
                          'bg-destructive/10 text-destructive' : 
                          'bg-primary/10 text-primary'
                      }`}>
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <span>{transaction.time}</span>
                          <span>•</span>
                          <span>{transaction.category}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                      {transaction.isImpulse && (
                        <Badge variant="outline" className="text-destructive border-destructive">
                          Impulse
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </TabsContent>
        ))}
      </Tabs>
      
      <CardFooter className="flex justify-between border-t p-6">
        <div className="text-sm text-muted-foreground">
          Showing {activeTransactions.length} transactions
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-green-600">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>Income $0.00</span>
          </div>
          <div className="flex items-center text-red-600">
            <ArrowDown className="h-4 w-4 mr-1" />
            <span>Expense ${dailyTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
