import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, AlertTriangle, Check, Calendar, Bell } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const spendingLimits = [
  {
    id: "limit1",
    category: "Dining Out",
    limit: 300,
    spent: 220.45,
    remaining: 79.55,
    period: "Monthly",
    resetDate: "April 1, 2025",
    notifications: true,
    status: "active"
  },
  {
    id: "limit2",
    category: "Entertainment",
    limit: 150,
    spent: 135.90,
    remaining: 14.10,
    period: "Monthly",
    resetDate: "April 1, 2025",
    notifications: true,
    status: "warning"
  },
  {
    id: "limit3",
    category: "Shopping",
    limit: 250,
    spent: 268.32,
    remaining: -18.32,
    period: "Monthly",
    resetDate: "April 1, 2025",
    notifications: true,
    status: "exceeded"
  },
  {
    id: "limit4",
    category: "Groceries",
    limit: 600,
    spent: 385.45,
    remaining: 214.55,
    period: "Monthly",
    resetDate: "April 1, 2025",
    notifications: false,
    status: "active"
  },
  {
    id: "limit5",
    category: "Transportation",
    limit: 200,
    spent: 112.25,
    remaining: 87.75,
    period: "Monthly",
    resetDate: "April 1, 2025",
    notifications: true,
    status: "active"
  },
  {
    id: "limit6",
    category: "Coffee Shops",
    limit: 75,
    spent: 64.25,
    remaining: 10.75,
    period: "Monthly",
    resetDate: "April 1, 2025",
    notifications: true,
    status: "warning"
  }
];

export default function SpendingLimitsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-4 lg:ml-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Spending Limits</h1>
              <p className="text-muted-foreground">
                Set and manage limits on your spending categories
              </p>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Limit
            </Button>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">
                    Across different categories
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$388.38</div>
                  <p className="text-xs text-muted-foreground">
                    Total remaining across all limits
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-500">3</div>
                  <p className="text-xs text-muted-foreground">
                    Categories requiring attention
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Category Spending Limits</CardTitle>
                <CardDescription>
                  Set budget caps for different spending categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Limit</TableHead>
                      <TableHead className="text-right">Spent</TableHead>
                      <TableHead className="text-right">Remaining</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Alerts</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {spendingLimits.map((limit) => (
                      <TableRow key={limit.id}>
                        <TableCell className="font-medium">{limit.category}</TableCell>
                        <TableCell className="text-right">${limit.limit.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${limit.spent.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <span className={limit.remaining >= 0 ? "text-green-500" : "text-red-500"}>
                            {limit.remaining >= 0 ? "$" : "-$"}{Math.abs(limit.remaining).toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-24">
                              <Progress 
                                value={(limit.spent / limit.limit) * 100} 
                                max={100}
                                className="h-2" 
                                indicatorClassName={
                                  limit.status === "exceeded" ? "bg-red-500" :
                                  limit.status === "warning" ? "bg-amber-500" :
                                  "bg-green-500"
                                }
                              />
                            </div>
                            
                            {limit.status === "exceeded" && (
                              <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
                                Exceeded
                              </Badge>
                            )}
                            {limit.status === "warning" && (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700">
                                Warning
                              </Badge>
                            )}
                            {limit.status === "active" && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
                                Active
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{limit.period}</TableCell>
                        <TableCell>
                          <Switch id={`notify-${limit.id}`} checked={limit.notifications} />
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
            
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure alerts for your spending limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Warning threshold</p>
                      <p className="text-xs text-muted-foreground">Get notified when spending reaches 80% of limit</p>
                    </div>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Limit reached</p>
                      <p className="text-xs text-muted-foreground">Get notified when you reach 100% of a spending limit</p>
                    </div>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <div>
                      <p className="text-sm font-medium">Weekly summary</p>
                      <p className="text-xs text-muted-foreground">Receive a weekly summary of your spending limits status</p>
                    </div>
                  </div>
                  <Switch checked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <div>
                      <p className="text-sm font-medium">Push notifications</p>
                      <p className="text-xs text-muted-foreground">Enable push notifications on your device</p>
                    </div>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="ml-auto">Save Preferences</Button>
              </CardFooter>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
