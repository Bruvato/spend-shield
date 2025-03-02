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
import { ImpulseWaitingList } from "@/components/impulse/impulse-waiting-list";

export default function WaitingListsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-4 lg:ml-0">
              <h1 className="text-3xl font-bold tracking-tight">Waiting Lists</h1>
              <p className="text-muted-foreground">
                Hold off on impulse purchases with timed waiting periods
              </p>
            </div>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Active Waiting Lists</CardTitle>
                <CardDescription>
                  Items you're considering purchasing but giving yourself time to reconsider
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImpulseWaitingList />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
