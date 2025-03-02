import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Utensils, 
  Home, 
  Car, 
  Ticket, 
  ShoppingCart, 
  Coffee, 
  Smartphone,
  CreditCard,
  Heart
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  budget: number;
  percentage: number;
  icon: React.ReactNode;
  color: string;
  progressColor: string;
  impulsePercentage: number;
}

const categories: SpendingCategory[] = [
  {
    id: "cat1",
    name: "Groceries",
    amount: 485.25,
    budget: 600,
    percentage: 81,
    icon: <ShoppingBag className="h-5 w-5" />,
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    progressColor: "bg-green-600",
    impulsePercentage: 10
  },
  {
    id: "cat2",
    name: "Dining Out",
    amount: 320.18,
    budget: 300,
    percentage: 107,
    icon: <Utensils className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    progressColor: "bg-orange-600",
    impulsePercentage: 35
  },
  {
    id: "cat3",
    name: "Housing",
    amount: 1200.00,
    budget: 1200,
    percentage: 100,
    icon: <Home className="h-5 w-5" />,
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    progressColor: "bg-cyan-600",
    impulsePercentage: 0
  },
  {
    id: "cat4",
    name: "Transportation",
    amount: 142.18,
    budget: 200,
    percentage: 71,
    icon: <Car className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    progressColor: "bg-blue-600",
    impulsePercentage: 5
  },
  {
    id: "cat5",
    name: "Entertainment",
    amount: 98.50,
    budget: 150,
    percentage: 66,
    icon: <Ticket className="h-5 w-5" />,
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    progressColor: "bg-indigo-600",
    impulsePercentage: 40
  },
  {
    id: "cat6",
    name: "Shopping",
    amount: 325.75,
    budget: 250,
    percentage: 130,
    icon: <ShoppingCart className="h-5 w-5" />,
    color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    progressColor: "bg-red-600",
    impulsePercentage: 65
  },
  {
    id: "cat7",
    name: "Coffee",
    amount: 58.25,
    budget: 80,
    percentage: 73,
    icon: <Coffee className="h-5 w-5" />,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    progressColor: "bg-amber-600",
    impulsePercentage: 30
  },
  {
    id: "cat8",
    name: "Electronics",
    amount: 199.99,
    budget: 100,
    percentage: 200,
    icon: <Smartphone className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    progressColor: "bg-purple-600",
    impulsePercentage: 100
  },
  {
    id: "cat9",
    name: "Health",
    amount: 145.30,
    budget: 200,
    percentage: 73,
    icon: <Heart className="h-5 w-5" />,
    color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    progressColor: "bg-pink-600",
    impulsePercentage: 10
  },
  {
    id: "cat10",
    name: "Bills",
    amount: 520.85,
    budget: 550,
    percentage: 95,
    icon: <CreditCard className="h-5 w-5" />,
    color: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
    progressColor: "bg-gray-600",
    impulsePercentage: 0
  }
];

export function SpendingCategories() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${category.color}`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${category.amount.toFixed(2)} / ${category.budget.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium">
                {category.percentage > 100 ? (
                  <span className="text-red-500">+{(category.percentage - 100)}%</span>
                ) : (
                  <span>{category.percentage}%</span>
                )}
              </div>
            </div>
            
            <Progress 
              value={Math.min(category.percentage, 100)} 
              className={category.percentage > 100 ? "bg-red-200" : ""}
              indicatorClassName={category.percentage > 100 ? "bg-red-600" : category.progressColor}
            />
            
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Budget: ${category.budget.toFixed(2)}</span>
              <span>
                Impulse: {category.impulsePercentage}%
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
