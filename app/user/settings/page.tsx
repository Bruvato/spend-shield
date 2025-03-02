import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/settings/profile-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { PrivacySettings } from "@/components/settings/privacy-settings";
import { IntegrationSettings } from "@/components/settings/integration-settings";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="lg:hidden" />
              <div className="ml-4 lg:ml-0">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>
          </header>
          
          <div className="flex-1 space-y-6 p-6 lg:p-8">
            <Tabs defaultValue="profile" className="space-y-6">
              <div className="border-b">
                <TabsList className="-mb-px flex space-x-6">
                  <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-primary">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-primary">
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-primary">
                    Privacy
                  </TabsTrigger>
                  <TabsTrigger value="integrations" className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-primary">
                    Integrations
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="profile" className="space-y-6">
                <ProfileSettings />
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-6">
                <PrivacySettings />
              </TabsContent>
              
              <TabsContent value="integrations" className="space-y-6">
                <IntegrationSettings />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
