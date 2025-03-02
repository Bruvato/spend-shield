"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Clock, 
  Plus, 
  X, 
  Check, 
  ChevronRight, 
  Trash2, 
  DollarSign,
  Calendar
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface WaitlistItem {
  id: string;
  name: string;
  price: number;
  category: string;
  link: string;
  dateAdded: Date;
  waitingPeriod: number; // days
  daysRemaining: number;
  notes: string;
  image?: string;
}

// Mock data for waiting list items
const mockWaitlistItems: WaitlistItem[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    category: "Electronics",
    link: "https://example.com/headphones",
    dateAdded: new Date("2023-12-15"),
    waitingPeriod: 30,
    daysRemaining: 12,
    notes: "Want these for travel, but not sure if they're worth the price.",
    image: "/images/headphones.jpg"
  },
  {
    id: "2",
    name: "Designer Sneakers",
    price: 179.99,
    category: "Clothing",
    link: "https://example.com/sneakers",
    dateAdded: new Date("2023-12-20"),
    waitingPeriod: 21,
    daysRemaining: 7,
    notes: "Look great but expensive. Do I really need another pair?",
    image: "/images/sneakers.jpg"
  },
  {
    id: "3",
    name: "Smart Home Speaker",
    price: 129.99,
    category: "Electronics",
    link: "https://example.com/speaker",
    dateAdded: new Date("2023-12-22"),
    waitingPeriod: 14,
    daysRemaining: 2,
    notes: "Would be nice for the kitchen, but my phone does most of this already.",
    image: "/images/speaker.jpg"
  },
  {
    id: "4",
    name: "Limited Edition Watch",
    price: 599.99,
    category: "Accessories",
    link: "https://example.com/watch",
    dateAdded: new Date("2023-11-30"),
    waitingPeriod: 45,
    daysRemaining: 0,
    notes: "Beautiful design, but very expensive. Special occasion purchase?",
    image: "/images/watch.jpg"
  }
];

// Function to calculate different waiting list durations
const calculateRecommendedWaitingPeriod = (price: number): number => {
  if (price <= 50) return 7;
  if (price <= 100) return 14;
  if (price <= 250) return 21;
  if (price <= 500) return 30;
  return 45;
};

export function ImpulseWaitingList() {
  const [activeWaitlist, setActiveWaitlist] = useState<WaitlistItem[]>(mockWaitlistItems);
  const [completedWaitlist, setCompletedWaitlist] = useState<WaitlistItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    category: "",
    link: "",
    waitingPeriod: 30,
    notes: ""
  });

  const handleAddNewItem = () => {
    // In a real app, we'd submit this to a database
    console.log("Adding new item:", newItem);
    setShowAddForm(false);
    
    // Reset form
    setNewItem({
      name: "",
      price: 0,
      category: "",
      link: "",
      waitingPeriod: 30,
      notes: ""
    });
  };

  const handleBuyNow = (itemId: string) => {
    // Move item from active to completed
    const item = activeWaitlist.find(item => item.id === itemId);
    if (item) {
      setActiveWaitlist(activeWaitlist.filter(i => i.id !== itemId));
      setCompletedWaitlist([...completedWaitlist, item]);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    // Remove item from active list
    setActiveWaitlist(activeWaitlist.filter(item => item.id !== itemId));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Impulse Waiting List</CardTitle>
            <CardDescription>
              Add items you're tempted to buy and wait before deciding
            </CardDescription>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
            {showAddForm ? (
              <X className="h-4 w-4 mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            {showAddForm ? "Cancel" : "Add Item"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {showAddForm && (
          <Card className="mb-6 border border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Add New Item</CardTitle>
              <CardDescription>
                Items will have a recommended waiting period based on price
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Item Name</label>
                  <Input 
                    placeholder="What do you want to buy?" 
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price ($)</label>
                  <Input 
                    type="number" 
                    placeholder="0.00"
                    value={newItem.price || ""}
                    onChange={(e) => {
                      const price = parseFloat(e.target.value);
                      setNewItem({
                        ...newItem, 
                        price, 
                        waitingPeriod: calculateRecommendedWaitingPeriod(price)
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input 
                    placeholder="e.g. Clothing, Electronics" 
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Link (optional)</label>
                  <Input 
                    placeholder="URL to item" 
                    value={newItem.link}
                    onChange={(e) => setNewItem({...newItem, link: e.target.value})}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Waiting Period (days)</label>
                    <span className="text-sm text-muted-foreground">Recommended: {newItem.waitingPeriod} days</span>
                  </div>
                  <Input 
                    type="number" 
                    min="1"
                    max="90"
                    placeholder="30"
                    value={newItem.waitingPeriod || ""}
                    onChange={(e) => setNewItem({...newItem, waitingPeriod: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Notes (Why do you want this?)</label>
                  <Input 
                    placeholder="What's your motivation for buying this item?" 
                    value={newItem.notes}
                    onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button onClick={handleAddNewItem}>Add to Waiting List</Button>
            </CardFooter>
          </Card>
        )}

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active">
              Active ({activeWaitlist.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedWaitlist.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="space-y-4">
              {activeWaitlist.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Your waiting list is empty</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add items you're tempted to buy and give yourself time to decide
                  </p>
                  <Button className="mt-4" onClick={() => setShowAddForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Item
                  </Button>
                </div>
              ) : (
                activeWaitlist.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="p-4 sm:p-6 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge variant="secondary">${item.price.toFixed(2)}</Badge>
                              <Badge variant="outline">{item.category}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.daysRemaining === 0 ? (
                              <Badge className="bg-green-500">Ready to Decide</Badge>
                            ) : (
                              <Badge variant="outline" className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {item.daysRemaining} days left
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Cooling off period</span>
                            <span>{item.waitingPeriod - item.daysRemaining} of {item.waitingPeriod} days</span>
                          </div>
                          <Progress 
                            value={(item.waitingPeriod - item.daysRemaining) / item.waitingPeriod * 100} 
                            className="h-2"
                          />
                        </div>
                        
                        {item.notes && (
                          <p className="mt-4 text-sm text-muted-foreground">
                            "{item.notes}"
                          </p>
                        )}
                        
                        <div className="mt-6 flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={item.daysRemaining === 0 ? "default" : "outline"}
                            onClick={() => handleBuyNow(item.id)}
                            disabled={item.daysRemaining > 0}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Buy Now
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                          {item.link && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <ChevronRight className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {item.image && (
                        <div className="w-full h-48 sm:h-auto sm:w-48 bg-muted flex-shrink-0">
                          <div 
                            className="w-full h-full bg-cover bg-center" 
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="space-y-4">
              {completedWaitlist.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No items completed yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Items you decide to purchase or remove will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Completed items would go here */}
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      Completed items will be shown here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t bg-muted/50 flex justify-between">
        <div className="text-sm text-muted-foreground">
          <Clock className="h-4 w-4 inline mr-1" />
          Waiting helps avoid impulse spending
        </div>
        <div className="text-sm font-medium">
          Potential savings: ${activeWaitlist.reduce((total, item) => total + item.price, 0).toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  );
}
