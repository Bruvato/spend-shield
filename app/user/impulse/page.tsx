import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { ImpulseWaitingList } from "@/components/impulse-waiting-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, TrendingDown, Clock, PiggyBank } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function ImpulseControlPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-4 lg:ml-0">
              <h1 className="text-3xl font-bold tracking-tight">Impulse Control</h1>
              <p className="text-muted-foreground">
                Tools to help you resist impulse purchases and make mindful spending decisions
              </p>
            </div>
          </header>
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <ImpulseWaitingList />
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Decision Journal Card */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Decision Journal</CardTitle>
                    <CardDescription>Record your purchase decisions</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Document your thoughts before making a purchase to identify patterns and improve decision-making.
                  </p>
                  <Button className="w-full" variant="outline">Open Journal</Button>
                </CardContent>
              </Card>
              
              {/* Savings Calculator Card */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Savings Calculator</CardTitle>
                    <CardDescription>See the long-term impact</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Calculate how much you could save by avoiding impulse purchases and investing the money instead.
                  </p>
                  <Button className="w-full" variant="outline">Calculate Savings</Button>
                </CardContent>
              </Card>
              
              {/* Cool-down Timer Card */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Cool-down Timer</CardTitle>
                    <CardDescription>Take a moment before buying</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set a timer to cool down before making an impulse purchase. Often the urge will pass.
                  </p>
                  <Button className="w-full" variant="outline">Start Timer</Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Spending Psychology Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Spending Psychology Tips</CardTitle>
                <CardDescription>
                  Understanding the psychology behind impulse spending can help you resist it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="triggers">
                  <TabsList className="mb-4">
                    <TabsTrigger value="triggers">Common Triggers</TabsTrigger>
                    <TabsTrigger value="techniques">Resistance Techniques</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits of Waiting</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="triggers" className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Emotional Shopping</h3>
                      <p className="text-sm text-muted-foreground">
                        Shopping when you're feeling sad, stressed, or bored often leads to purchases you don't need.
                        Notice your emotional state before making a purchase.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Sale FOMO</h3>
                      <p className="text-sm text-muted-foreground">
                        Fear of missing out on limited-time offers creates artificial urgency.
                        Remember that most sales repeat and the item will likely be available later.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Social Media Influence</h3>
                      <p className="text-sm text-muted-foreground">
                        Seeing others with new products can trigger a desire to keep up.
                        Consider unfollowing accounts that make you feel like you need to spend money.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="techniques" className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">The 30-Day Rule</h3>
                      <p className="text-sm text-muted-foreground">
                        For non-essential purchases, wait 30 days before buying. If you still want it then, it may be worth it.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">The 10/10 Rule</h3>
                      <p className="text-sm text-muted-foreground">
                        For items over $100, ask yourself if it will still be important in 10 days and if you'll use it 10 times.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Browse Without Buying</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow yourself to browse online stores but set a rule that you can't purchase anything during that session.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="benefits" className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Financial Freedom</h3>
                      <p className="text-sm text-muted-foreground">
                        Reducing impulse spending can lead to increased savings, less debt, and greater financial security.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Reduced Clutter</h3>
                      <p className="text-sm text-muted-foreground">
                        Fewer impulse purchases means less stuff accumulating in your home that you don't really need or use.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">More Meaningful Purchases</h3>
                      <p className="text-sm text-muted-foreground">
                        When you wait to buy something, you often appreciate it more and make better choices about what's truly important.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
