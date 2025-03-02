import React from "react";
import { SpendingOverview } from "@/components/spending-overview";
import { FriendsTransactions } from "@/components/friends-transactions";
import { ImpulseWaitingList } from "@/components/impulse/impulse-waiting-list";
import { DailySpendingChart, DailySpendingDetails } from "@/components/spending";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  BarChart3, 
  Calculator, 
  Calendar, 
  Clock, 
  FileText, 
  PiggyBank, 
  Settings, 
  ShoppingCart, 
  Timer, 
  Users,
  TrendingUp,
  Target
} from "lucide-react";

export default function Page() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar className="hidden lg:flex" />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-4 lg:ml-0">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Track and control your spending habits with social accountability
              </p>
            </div>
          </header>
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <SpendingOverview />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailySpendingChart />
              <DailySpendingDetails />
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              <ImpulseWaitingList />
              <FriendsTransactions />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Quick Access</h2>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                <QuickAccessCard 
                  title="Analytics" 
                  description="View your financial insights"
                  icon={<BarChart3 className="h-5 w-5" />}
                  href="/user/analytics"
                  color="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                />
                
                <QuickAccessCard 
                  title="Goals" 
                  description="Track your financial goals"
                  icon={<Target className="h-5 w-5" />}
                  href="/user/goals"
                  color="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                />
                
                <QuickAccessCard 
                  title="Impulse Timer" 
                  description="Overcome impulse purchases"
                  icon={<Timer className="h-5 w-5" />}
                  href="/user/impulse/timer"
                  color="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                />
                
                <QuickAccessCard 
                  title="Spending Calculator" 
                  description="Calculate potential savings"
                  icon={<Calculator className="h-5 w-5" />}
                  href="/user/impulse/calculator"
                  color="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                />
                
                <QuickAccessCard 
                  title="Reflection Journal" 
                  description="Record spending reflections"
                  icon={<FileText className="h-5 w-5" />}
                  href="/user/impulse/journal"
                  color="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"
                />
                
                <QuickAccessCard 
                  title="Social Circle" 
                  description="Connect with friends"
                  icon={<Users className="h-5 w-5" />}
                  href="/user/social"
                  color="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300"
                />
                
                <QuickAccessCard 
                  title="Savings Projections" 
                  description="View long-term projections"
                  icon={<TrendingUp className="h-5 w-5" />}
                  href="/user/analytics?tab=savings"
                  color="bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300"
                />
                
                <QuickAccessCard 
                  title="Settings" 
                  description="Manage your preferences"
                  icon={<Settings className="h-5 w-5" />}
                  href="/user/settings"
                  color="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

function QuickAccessCard({ title, description, icon, href, color }: QuickAccessCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className={`rounded-full p-2 ${color}`}>
              {icon}
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
