"use client";

import React, { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  TrendingDown, 
  PiggyBank, 
  ShoppingBag, 
  Zap, 
  Target, 
  Share2,
  Calendar,
  FireExtinguisher,
  Clock,
  DollarSign,
  BadgeCheck
} from "lucide-react";
import { fetchData } from "@/lib/data/api/api-client";
import { Achievement } from "@/lib/data/models/goals";

const getCategoryColor = (category: string) => {
  switch (category) {
    case "impulse":
      return "bg-purple-100 text-purple-800";
    case "budget":
      return "bg-blue-100 text-blue-800";
    case "savings":
      return "bg-green-100 text-green-800";
    case "debt":
      return "bg-red-100 text-red-800";
    case "challenge":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const getIconByName = (name: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "trophy": <Award className="h-8 w-8" />,
    "piggy-bank": <PiggyBank className="h-8 w-8" />,
    "hourglass-end": <Clock className="h-8 w-8" />,
    "slash": <FireExtinguisher className="h-8 w-8" />,
    "tasks": <BadgeCheck className="h-8 w-8" />,
    "calendar-check": <Calendar className="h-8 w-8" />,
    "fire": <Zap className="h-8 w-8" />,
    "user-ninja": <Target className="h-8 w-8" />,
    "brain": <DollarSign className="h-8 w-8" />,
    "dove": <Share2 className="h-8 w-8" />,
  };

  return iconMap[name] || <Award className="h-8 w-8" />;
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setLoading(true);
        const data = await fetchData<Achievement[]>("goals/achievements");
        setAchievements(data);
      } catch (err) {
        setError("Failed to load achievements data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  const completedAchievements = achievements.filter(
    (achievement) => achievement.completed
  );
  const inProgressAchievements = achievements.filter(
    (achievement) => !achievement.completed
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading achievements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="p-4 max-w-md bg-red-50 text-red-800 rounded-md">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-2">Please try refreshing the page.</p>
        </div>
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
              <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
              <p className="text-muted-foreground">
                Track your financial wins and accomplishments
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Progress
            </Button>
          </header>
          
          <div className="flex-1 p-6 lg:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{achievements.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {completedAchievements.length} completed, {inProgressAchievements.length} in progress
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round((completedAchievements.length / achievements.length) * 100)}%</div>
                  <p className="text-xs text-muted-foreground">
                    Up from 25% last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-medium">Recent Achievement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-md font-bold">{completedAchievements[0]?.title}</div>
                  <p className="text-xs text-muted-foreground">
                    Completed on {completedAchievements[0]?.date}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Achievements</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <Card key={achievement.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-start space-x-4">
                          <div className={`rounded-md p-2 ${
                            achievement.completed 
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                              : "bg-primary/10"
                          }`}>
                            {getIconByName(achievement.icon)}
                          </div>
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {achievement.title}
                              {achievement.completed && (
                                <Award className="h-4 w-4 text-amber-500" />
                              )}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {achievement.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-medium">{achievement.progress}%</span>
                          </div>
                          <Progress 
                            value={achievement.progress} 
                            className="h-2" 
                            indicatorClassName={achievement.completed ? "bg-green-500" : "bg-primary"}
                          />
                          
                          {achievement.completed && (
                            <p className="text-xs text-muted-foreground flex items-center mt-2">
                              <Calendar className="h-3 w-3 mr-1" />
                              Completed on {achievement.date}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedAchievements.length > 0 ? (
                    completedAchievements.map((achievement) => (
                      <Card key={achievement.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-start space-x-4">
                            <div className="rounded-md bg-green-100 p-2 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              {getIconByName(achievement.icon)}
                            </div>
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {achievement.title}
                                <Award className="h-4 w-4 text-amber-500" />
                              </CardTitle>
                              <CardDescription className="mt-1">
                                {achievement.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Progress</span>
                              <span className="text-sm font-medium">100%</span>
                            </div>
                            <Progress 
                              value={100} 
                              className="h-2" 
                              indicatorClassName="bg-green-500"
                            />
                            
                            <p className="text-xs text-muted-foreground flex items-center mt-2">
                              <Calendar className="h-3 w-3 mr-1" />
                              Completed on {achievement.date}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-muted-foreground">
                        You haven't completed any achievements yet.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="in-progress" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inProgressAchievements.length > 0 ? (
                    inProgressAchievements.map((achievement) => (
                      <Card key={achievement.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-start space-x-4">
                            <div className="rounded-md bg-primary/10 p-2">
                              {getIconByName(achievement.icon)}
                            </div>
                            <div>
                              <CardTitle>{achievement.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {achievement.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Progress</span>
                              <span className="text-sm font-medium">{achievement.progress}%</span>
                            </div>
                            <Progress 
                              value={achievement.progress} 
                              className="h-2" 
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-muted-foreground">
                        All achievements completed! You're a financial master!
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
