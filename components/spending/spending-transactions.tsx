import React from "react";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Utensils, 
  Home, 
  Car, 
  Ticket, 
  ShoppingCart, 
  Coffee, 
  Smartphone
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  isImpulse: boolean;
  categoryIcon: React.ReactNode;
  categoryColor: string;
}

const transactions: Transaction[] = [
  {
    id: "tx1",
    date: "2025-03-01",
    merchant: "Grocery Store",
    category: "Groceries",
    amount: 85.42,
    isImpulse: false,
    categoryIcon: <ShoppingBag className="h-4 w-4" />,
    categoryColor: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
  },
  {
    id: "tx2",
    date: "2025-02-28",
    merchant: "Restaurant",
    category: "Dining Out",
    amount: 46.80,
    isImpulse: false,
    categoryIcon: <Utensils className="h-4 w-4" />,
    categoryColor: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
  },
  {
    id: "tx3",
    date: "2025-02-28",
    merchant: "Online Electronics",
    category: "Electronics",
    amount: 199.99,
    isImpulse: true,
    categoryIcon: <Smartphone className="h-4 w-4" />,
    categoryColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
  },
  {
    id: "tx4",
    date: "2025-02-27",
    merchant: "Coffee Shop",
    category: "Coffee",
    amount: 5.25,
    isImpulse: false,
    categoryIcon: <Coffee className="h-4 w-4" />,
    categoryColor: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
  },
  {
    id: "tx5",
    date: "2025-02-26",
    merchant: "Gas Station",
    category: "Transportation",
    amount: 42.18,
    isImpulse: false,
    categoryIcon: <Car className="h-4 w-4" />,
    categoryColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
  },
  {
    id: "tx6",
    date: "2025-02-25",
    merchant: "Online Retailer",
    category: "Shopping",
    amount: 78.50,
    isImpulse: true,
    categoryIcon: <ShoppingCart className="h-4 w-4" />,
    categoryColor: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
  },
  {
    id: "tx7",
    date: "2025-02-24",
    merchant: "Movie Theater",
    category: "Entertainment",
    amount: 32.00,
    isImpulse: false,
    categoryIcon: <Ticket className="h-4 w-4" />,
    categoryColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
  },
  {
    id: "tx8",
    date: "2025-02-23",
    merchant: "Utility Company",
    category: "Housing",
    amount: 120.50,
    isImpulse: false,
    categoryIcon: <Home className="h-4 w-4" />,
    categoryColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
  },
];

export function SpendingTransactions() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[100px] text-center">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.merchant}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full ${transaction.categoryColor}`}>
                      {transaction.categoryIcon}
                    </div>
                    <span>{transaction.category}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  {transaction.isImpulse ? (
                    <Badge variant="destructive">Impulse</Badge>
                  ) : (
                    <Badge variant="outline">Planned</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
