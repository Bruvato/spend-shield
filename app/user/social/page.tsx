import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Send, Users, UserPlus, Bell, Search, Filter } from "lucide-react";
import { SocialFeed } from "@/components/social/social-feed";

export default function SocialPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="lg:hidden" />
              <div className="ml-4 lg:ml-0">
                <h1 className="text-3xl font-bold tracking-tight">Social</h1>
                <p className="text-muted-foreground">
                  Connect with friends for financial accountability
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Users className="h-5 w-5" />
              </Button>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Friend
              </Button>
            </div>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search friends or posts..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="feed" className="space-y-4">
              <TabsList>
                <TabsTrigger value="feed">Activity Feed</TabsTrigger>
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed" className="space-y-4">
                <SocialFeed />
              </TabsContent>
              
              <TabsContent value="friends" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <FriendCard 
                    name="Alex Johnson"
                    avatar="AJ"
                    subtitle="Friend since Jan 2025"
                    streak={12}
                    achievements={5}
                  />
                  
                  <FriendCard 
                    name="Morgan Smith"
                    avatar="MS"
                    subtitle="Friend since Feb 2025"
                    streak={8}
                    achievements={3}
                  />
                  
                  <FriendCard 
                    name="Jamie Taylor"
                    avatar="JT"
                    subtitle="Friend since Dec 2024"
                    streak={24}
                    achievements={8}
                  />
                  
                  <FriendCard 
                    name="Casey Williams"
                    avatar="CW"
                    subtitle="Friend since Feb 2025"
                    streak={4}
                    achievements={2}
                  />
                  
                  <FriendCard 
                    name="Riley Brown"
                    avatar="RB"
                    subtitle="Friend since Jan 2025"
                    streak={16}
                    achievements={6}
                  />
                  
                  <Card className="flex h-full items-center justify-center p-6">
                    <Button variant="ghost" className="h-full w-full flex flex-col items-center gap-2">
                      <UserPlus className="h-8 w-8" />
                      <span>Add New Friend</span>
                    </Button>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="challenges" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Active Challenges</h3>
                  <Button>Create Challenge</Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>30-Day No Impulse Buy</CardTitle>
                        <Badge>Active</Badge>
                      </div>
                      <CardDescription>Avoid all non-essential purchases for 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1 text-sm">
                            <span>Progress</span>
                            <span>18/30 days</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: "60%" }}></div>
                          </div>
                        </div>
                        
                        <div className="flex -space-x-2">
                          <Avatar className="border-2 border-background">
                            <AvatarFallback>AJ</AvatarFallback>
                          </Avatar>
                          <Avatar className="border-2 border-background">
                            <AvatarFallback>MS</AvatarFallback>
                          </Avatar>
                          <Avatar className="border-2 border-background">
                            <AvatarFallback>JT</AvatarFallback>
                          </Avatar>
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-xs">+2</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Coffee Budget Challenge</CardTitle>
                        <Badge variant="outline">Starting Soon</Badge>
                      </div>
                      <CardDescription>Limit coffee spending to $20/week for 4 weeks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1 text-sm">
                            <span>Starts in</span>
                            <span>2 days</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: "0%" }}></div>
                          </div>
                        </div>
                        
                        <div className="flex -space-x-2">
                          <Avatar className="border-2 border-background">
                            <AvatarFallback>RB</AvatarFallback>
                          </Avatar>
                          <Avatar className="border-2 border-background">
                            <AvatarFallback>MS</AvatarFallback>
                          </Avatar>
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-xs">+3</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Challenge</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="groups" className="flex items-center justify-center p-12">
                <div className="text-center max-w-md">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Coming Soon!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Group features are under development. Create and join financial accountability groups with shared goals and challenges.
                  </p>
                  <Button className="mt-4" variant="outline">Get Notified</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

interface FriendCardProps {
  name: string;
  avatar: string;
  subtitle: string;
  streak: number;
  achievements: number;
}

function FriendCard({ name, avatar, subtitle, streak, achievements }: FriendCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-xl">{avatar}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-lg">{name}</div>
            <div className="text-xs text-muted-foreground">{subtitle}</div>
            <div className="mt-3 flex justify-center gap-3">
              <div className="text-center">
                <div className="text-sm font-medium">{streak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">{achievements}</div>
                <div className="text-xs text-muted-foreground">Achievements</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-between p-4">
        <Button variant="ghost" size="sm">
          Message
        </Button>
        <Button variant="ghost" size="sm">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
