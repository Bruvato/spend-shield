"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit, Plus, ArrowUpDown } from "lucide-react";
import { fetchData } from "@/lib/data/api/api-client";
import { CategoryBudget } from "@/lib/data/models/budget";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryBudget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchData<CategoryBudget[]>("categories?withBudgets=true");
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-md mx-auto bg-red-50 text-red-800 rounded-md">
        <p className="font-semibold">Error</p>
        <p className="text-sm">{error}</p>
        <p className="text-sm mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-4 lg:ml-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Spending Categories</h1>
              <p className="text-muted-foreground">
                Manage your budget categories and allocation
              </p>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Category
            </Button>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Budget Categories</CardTitle>
                <CardDescription>
                  Manage your spending categories and track budget utilization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <Button variant="ghost" className="p-0 h-8 font-medium">
                          Category <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">Budget</TableHead>
                      <TableHead className="text-right">Spent</TableHead>
                      <TableHead className="text-right">Remaining</TableHead>
                      <TableHead className="text-center">Usage</TableHead>
                      <TableHead className="text-right">Transactions</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell className="text-right">${category.budget.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${category.spent.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <span className={category.remaining >= 0 ? "text-green-500" : "text-red-500"}>
                            ${Math.abs(category.remaining).toFixed(2)}
                            {category.remaining < 0 ? " over" : ""}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={category.percentUsed} 
                              max={100}
                              className="h-2" 
                              indicatorClassName={
                                category.percentUsed > 100 ? "bg-red-500" :
                                category.percentUsed > 90 ? "bg-amber-500" :
                                "bg-green-500"
                              }
                            />
                            <span className="text-xs">{category.percentUsed}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{category.transactions}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
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
