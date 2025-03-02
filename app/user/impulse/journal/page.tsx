import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookText, Plus, ArrowLeft, FileText, Calendar, Search, Filter } from "lucide-react";
import Link from "next/link";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

// Sample journal entries for display
const journalEntries = [
  {
    id: "1",
    date: "2023-12-18",
    item: "Smart Watch",
    price: 299.99,
    category: "Electronics",
    emotion: "Excitement",
    impulse: true,
    reasoning: "I've been wanting a fitness tracker for a while, but this was a much more expensive model than I planned. I was drawn to all the extra features and the sleek design.",
    decision: "Decided not to buy",
    reflection: "After waiting a week, I realized I only needed basic fitness tracking. I bought a simpler model for $79 and saved over $200."
  },
  {
    id: "2",
    date: "2023-12-10",
    item: "Designer Jacket",
    price: 189.99,
    category: "Clothing",
    emotion: "Insecurity",
    impulse: true,
    reasoning: "Saw a friend wearing something similar and thought it looked really good. Felt like my current jackets weren't stylish enough.",
    decision: "Decided to buy",
    reflection: "I've only worn it twice in three weeks. It was an emotional purchase that didn't align with my personal style. Regret spending this much."
  },
  {
    id: "3",
    date: "2023-12-05",
    item: "Kitchen Stand Mixer",
    price: 349.99,
    category: "Home",
    emotion: "Contentment",
    impulse: false,
    reasoning: "I've researched this for months and waited for a sale. I bake weekly and have been using a hand mixer that's becoming difficult to use for thick doughs.",
    decision: "Decided to buy",
    reflection: "Excellent purchase that I use 2-3 times per week. Saved $150 by waiting for a holiday sale. No regrets."
  }
];

export default function DecisionJournalPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar className="hidden lg:flex" />
        <SidebarInset className="flex-1 p-6 lg:p-8">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/user/impulse">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Decision Journal</h1>
                <p className="text-muted-foreground">
                  Record and reflect on your purchase decisions
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Tabs defaultValue="journal" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="journal">Journal Entries</TabsTrigger>
                    <TabsTrigger value="new">New Entry</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative w-40 md:w-60">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-8" placeholder="Search entries..." />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="journal" className="space-y-6">
                  {journalEntries.map((entry) => (
                    <Card key={entry.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{entry.item}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{entry.date}</span>
                              <span className="mx-1">•</span>
                              <span>${entry.price.toFixed(2)}</span>
                              <span className="mx-1">•</span>
                              <span>{entry.category}</span>
                            </CardDescription>
                          </div>
                          <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                            entry.decision === "Decided not to buy" 
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          }`}>
                            {entry.decision}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Emotional State</h4>
                            <p className="text-sm">{entry.emotion}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Initial Reasoning</h4>
                            <p className="text-sm text-muted-foreground">{entry.reasoning}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Reflection</h4>
                            <p className="text-sm text-muted-foreground">{entry.reflection}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {entry.impulse ? "Impulse Purchase" : "Planned Purchase"}
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="new">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>New Journal Entry</CardTitle>
                          <CardDescription>
                            Record details about a purchase decision
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Item Name</label>
                          <Input placeholder="What did you consider buying?" />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Price ($)</label>
                          <Input type="number" placeholder="0.00" />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Category</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="electronics">Electronics</SelectItem>
                              <SelectItem value="home">Home</SelectItem>
                              <SelectItem value="entertainment">Entertainment</SelectItem>
                              <SelectItem value="food">Food</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Emotional State</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="How were you feeling?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="excited">Excited</SelectItem>
                              <SelectItem value="bored">Bored</SelectItem>
                              <SelectItem value="stressed">Stressed</SelectItem>
                              <SelectItem value="sad">Sad</SelectItem>
                              <SelectItem value="content">Content</SelectItem>
                              <SelectItem value="insecure">Insecure</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Type of Purchase</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Planned or Impulse?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="impulse">Impulse</SelectItem>
                              <SelectItem value="planned">Planned</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Decision</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="What did you decide?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="buy">Decided to buy</SelectItem>
                              <SelectItem value="wait">Still deciding</SelectItem>
                              <SelectItem value="no-buy">Decided not to buy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Initial Reasoning</label>
                          <Textarea 
                            placeholder="Why did you want to buy this item initially?"
                            className="min-h-[100px]"
                          />
                          <p className="text-xs text-muted-foreground">
                            Be honest about your motivations and what attracted you to this item
                          </p>
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Reflection</label>
                          <Textarea 
                            placeholder="Looking back, how do you feel about this decision?"
                            className="min-h-[100px]"
                          />
                          <p className="text-xs text-muted-foreground">
                            For past purchases: Do you still use it? Was it worth it? For non-purchases: Are you glad you didn't buy it?
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Journal Entry</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Benefits of Decision Journaling</CardTitle>
                <CardDescription>
                  How recording purchase decisions can improve your financial habits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="font-medium">Identifies Spending Triggers</h3>
                    <p className="text-sm text-muted-foreground">
                      By recording your emotional state at the time of purchases, you'll start to recognize patterns
                      in what triggers your impulse spending.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Improves Decision-Making</h3>
                    <p className="text-sm text-muted-foreground">
                      The act of documenting your thought process forces you to think more critically about why
                      you're making a purchase.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Reduces Buyer's Remorse</h3>
                    <p className="text-sm text-muted-foreground">
                      Reflection helps you make more thoughtful purchase decisions, leading to higher satisfaction
                      and less regret about spending.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Builds Self-Awareness</h3>
                    <p className="text-sm text-muted-foreground">
                      Regular journaling increases your awareness of spending habits that might otherwise go unnoticed
                      in your day-to-day life.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Tracks Progress Over Time</h3>
                    <p className="text-sm text-muted-foreground">
                      As your journal grows, you'll be able to see improvements in your decision-making and
                      celebrate your financial growth.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Provides Accountability</h3>
                    <p className="text-sm text-muted-foreground">
                      Having a record of your purchases creates a sense of accountability to yourself and your
                      financial goals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
