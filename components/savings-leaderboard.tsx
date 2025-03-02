"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Medal,
  Award,
  ShieldCheck,
  CircleMinus,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchData } from "@/lib/data/api/api-client";

interface FriendSavings {
  id: string;
  name: string;
  avatarUrl: string;
  savingsAmount: number;
  savingsPercentage: number;
  rank: number;
  trend: "up" | "down" | "stable";
  streak: number;
}

// Mock data for initial rendering
const mockLeaderboardData: FriendSavings[] = [
  {
    id: "1",
    name: "Alex Chen",
    avatarUrl: "/avatars/alex.jpg",
    savingsAmount: 1248.5,
    savingsPercentage: 32,
    rank: 1,
    trend: "up",
    streak: 7,
  },
  {
    id: "2",
    name: "Jamie Smith",
    avatarUrl: "/avatars/jamie.jpg",
    savingsAmount: 985.75,
    savingsPercentage: 24,
    rank: 2,
    trend: "up",
    streak: 5,
  },
  {
    id: "3",
    name: "You",
    avatarUrl: "/avatars/user.jpg",
    savingsAmount: 752.3,
    savingsPercentage: 19,
    rank: 3,
    trend: "up",
    streak: 3,
  },
  {
    id: "4",
    name: "Taylor Reed",
    avatarUrl: "/avatars/taylor.jpg",
    savingsAmount: 645.2,
    savingsPercentage: 15,
    rank: 4,
    trend: "down",
    streak: 2,
  },
  {
    id: "5",
    name: "Jordan Lee",
    avatarUrl: "/avatars/jordan.jpg",
    savingsAmount: 452.5,
    savingsPercentage: 12,
    rank: 5,
    trend: "stable",
    streak: 1,
  },
];

// Helper function to render the appropriate medal icon based on rank
const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return <ShieldCheck className="h-5 w-5 text-blue-500" />;
  }
};

// Helper function to render trend icon
const getTrendIcon = (trend: "up" | "down" | "stable") => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    case "down":
      return <TrendingDown className="h-4 w-4 text-red-500 transform" />;
    case "stable":
      return <CircleMinus className="h-4 w-4 text-gray-500 transform" />;
  }
};

export function SavingsLeaderboard() {
  const [leaderboardData, setLeaderboardData] =
    useState<FriendSavings[]>(mockLeaderboardData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // In a real app, we'd fetch from an API endpoint
        // const response = await fetchData<{leaderboard: FriendSavings[]}>('social/savings-leaderboard');
        // if (response?.leaderboard?.length > 0) {
        //   setLeaderboardData(response.leaderboard);
        // }

        // For now, just simulate API delay with mock data
        setTimeout(() => {
          setLeaderboardData(mockLeaderboardData);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error("Failed to load savings leaderboard data:", err);
        setError("Unable to load leaderboard data");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Savings Leaderboard</CardTitle>
          <CardDescription>
            See how your savings compare to friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Savings Leaderboard</CardTitle>
          <CardDescription>
            See how your savings compare to friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Leaderboard</CardTitle>
        <CardDescription>
          See how your savings compare to friends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((friend) => (
            <div
              key={friend.id}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                friend.name === "You" ? "bg-slate-100 dark:bg-slate-800" : ""
              }`}
            >
              <div className="flex items-center justify-center h-8 w-8">
                {getRankIcon(friend.rank)}
              </div>
              <div className="flex items-center gap-3 flex-1">
                <Avatar>
                  <AvatarImage src={friend.avatarUrl} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{friend.name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>${friend.savingsAmount.toFixed(2)}</span>
                    <span className="text-xs">·</span>
                    <span>{friend.savingsPercentage}% of income</span>
                    {friend.streak > 0 && (
                      <>
                        <span className="text-xs">·</span>
                        <span>{friend.streak} week streak</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {getTrendIcon(friend.trend)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
