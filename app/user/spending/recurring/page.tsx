import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2, Calendar, RefreshCw } from "lucide-react";

const recurringExpenses = [
  {
    id: "rec1",
    name: "Rent",
    amount: 1200,
    frequency: "Monthly",
    category: "Housing",
    nextDate: "April 1, 2025",
    status: "active"
  },
  {
    id: "rec2",
    name: "Netflix",
    amount: 17.99,
    frequency: "Monthly",
    category: "Entertainment",
    nextDate: "March 15, 2025",
    status: "active"
  },
  {
    id: "rec3",
    name: "Gym Membership",
    amount: 49.99,
    frequency: "Monthly",
    category: "Health & Fitness",
    nextDate: "March 5, 2025",
    status: "active"
  },
  {
    id: "rec4",
    name: "Phone Bill",
    amount: 85.00,
    frequency: "Monthly",
    category: "Bills & Utilities",
    nextDate: "March 18, 2025",
    status: "active"
  },
  {
    id: "rec5",
    name: "Car Insurance",
    amount: 98.50,
    frequency: "Monthly",
    category: "Insurance",
    nextDate: "March 22, 2025",
    status: "active"
  },
  {
    id: "rec6",
    name: "Internet",
    amount: 75.00,
    frequency: "Monthly",
    category: "Bills & Utilities",
    nextDate: "March 10, 2025",
    status: "active"
  },
  {
    id: "rec7",
    name: "Spotify",
    amount: 12.99,
    frequency: "Monthly",
    category: "Entertainment",
    nextDate: "March 8, 2025",
    status: "active"
  },
  {
    id: "rec8",
    name: "Adobe Creative Cloud",
    amount: 52.99,
    frequency: "Monthly",
    category: "Software",
    nextDate: "March 17, 2025",
    status: "paused"
  }
];

export default function RecurringExpensesPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-4 lg:ml-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Recurring Expenses</h1>
              <p className="text-muted-foreground">
                Track and manage your subscriptions and recurring payments
              </p>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Recurring
            </Button>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Monthly Recurring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,592.46</div>
                  <p className="text-xs text-muted-foreground">
                    <RefreshCw className="h-3 w-3 inline mr-1" />
                    8 active subscriptions
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$135.49</div>
                  <p className="text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    Due in the next 7 days
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Top Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Bills & Utilities</div>
                  <p className="text-xs text-muted-foreground">
                    $160.00/month (2 subscriptions)
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>All Recurring Expenses</CardTitle>
                <CardDescription>
                  Manage all your subscriptions and recurring payments in one place
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Name</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Next Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recurringExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense.name}</TableCell>
                        <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                        <TableCell>{expense.frequency}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{expense.nextDate}</TableCell>
                        <TableCell>
                          {expense.status === "active" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700">
                              Paused
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
