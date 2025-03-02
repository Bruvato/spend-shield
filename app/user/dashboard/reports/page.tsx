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
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Calendar, 
  FileText, 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  Share2,
  Mail,
  Printer
} from "lucide-react";

interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  lastGenerated?: string;
  type: "monthly" | "financial" | "spending" | "savings";
}

const reports: ReportType[] = [
  {
    id: "monthly-summary",
    title: "Monthly Summary",
    description: "Comprehensive overview of your monthly finances",
    icon: <Calendar className="h-6 w-6" />,
    lastGenerated: "March 1, 2025",
    type: "monthly"
  },
  {
    id: "spending-breakdown",
    title: "Spending Breakdown",
    description: "Detailed analysis of your spending by category",
    icon: <PieChart className="h-6 w-6" />,
    lastGenerated: "February 28, 2025",
    type: "spending"
  },
  {
    id: "impulse-analysis",
    title: "Impulse Purchase Analysis",
    description: "Track and analyze your impulse spending habits",
    icon: <BarChart3 className="h-6 w-6" />,
    lastGenerated: "February 25, 2025",
    type: "spending"
  },
  {
    id: "savings-forecast",
    title: "Savings Forecast",
    description: "Projections for future savings based on current habits",
    icon: <TrendingUp className="h-6 w-6" />,
    lastGenerated: "February 20, 2025",
    type: "savings"
  }
];

export default function DashboardReportsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-4 lg:ml-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
              <p className="text-muted-foreground">
                Access and download your financial reports
              </p>
            </div>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Create New Report
            </Button>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Available Reports</h2>
              <p className="text-muted-foreground">Your recently generated financial reports</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report) => (
                <Card key={report.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4">
                        <div className="rounded-md bg-primary/10 p-2">
                          {report.icon}
                        </div>
                        <div>
                          <CardTitle>{report.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {report.description}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2 pt-0">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>Last generated: {report.lastGenerated}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t bg-muted/50">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Printer className="mr-2 h-4 w-4" />
                          Print
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Button>
                      </div>
                      <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button variant="outline">
                View All Reports
              </Button>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
