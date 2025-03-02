import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, ArrowLeft, Play, Pause, RefreshCw } from "lucide-react";
import Link from "next/link";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function CooldownTimerPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="flex items-center gap-2 ml-4 lg:ml-0">
              <Button variant="outline" size="icon" asChild>
                <Link href="/user/impulse">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Cool-down Timer</h1>
                <p className="text-muted-foreground">
                  Take a moment before deciding to make an impulse purchase
                </p>
              </div>
            </div>
          </header>
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <Card className="mx-auto max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Timer className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4 text-2xl">Impulse Cool-down</CardTitle>
                <CardDescription>
                  When tempted to make an impulse purchase, start this timer and wait until it ends before deciding
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-8 mt-4 text-7xl font-bold">15:00</div>
                
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline">5 min</Button>
                  <Button variant="default">15 min</Button>
                  <Button variant="outline">30 min</Button>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-4">
                  <Button size="lg" className="h-14 w-14 rounded-full p-0">
                    <Play className="h-6 w-6" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 w-14 rounded-full p-0">
                    <Pause className="h-6 w-6" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 w-14 rounded-full p-0">
                    <RefreshCw className="h-6 w-6" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <div className="text-center text-sm text-muted-foreground">
                  <p>While waiting, ask yourself:</p>
                  <ul className="mt-2 list-inside list-disc text-left">
                    <li>Do I really need this item?</li>
                    <li>Will I still want this in a month?</li>
                    <li>Does this align with my financial goals?</li>
                    <li>Am I buying this because of an emotion?</li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Why Cool Down?</CardTitle>
                <CardDescription>
                  The science behind taking a pause before making purchases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Breaks the dopamine cycle</h3>
                  <p className="text-sm text-muted-foreground">
                    Shopping triggers dopamine, creating a rush that can lead to impulsive decisions. 
                    A cool-down period helps your brain chemistry return to normal, allowing for more rational thinking.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Creates mental distance</h3>
                  <p className="text-sm text-muted-foreground">
                    Stepping away from a potential purchase helps you evaluate it more objectively.
                    This mental distance reduces the emotional attachment and urgency that often drives impulse buying.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Reduces shopping regret</h3>
                  <p className="text-sm text-muted-foreground">
                    Studies show that implementing a waiting period before purchases significantly reduces buyer's remorse
                    and increases overall satisfaction with purchases that are ultimately made.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
