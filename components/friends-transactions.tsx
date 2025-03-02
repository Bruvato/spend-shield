"use client";

import React, { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Send,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

// Define interfaces for our data types
interface User {
  id: string;
  name: string;
  avatar_url: string;
}

interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  category: string;
  created_at: string;
  is_impulsive: boolean;
  reflection?: string;
  user?: User;
  likes?: number;
  dislikes?: number;
  comments?: TransactionComment[];
  userInteraction?: "like" | "dislike" | null;
}

interface TransactionComment {
  id: string;
  transaction_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: User;
}

interface FriendTransaction {
  transaction: Transaction;
  user: User;
}

export function FriendsTransactions() {
  const [transactions, setTransactions] = useState<FriendTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "impulsive">("all");
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchFriendsTransactions() {
      try {
        setIsLoading(true);

        // Get current user
        const {
          data: { user },
        } = await supabaseClient().auth.getUser();

        if (!user) return;

        // First get friends of current user
        const { data: friendsData } = await supabaseClient()
          .from("friends")
          .select("friend_id")
          .eq("user_id", user.id);

        if (!friendsData || friendsData.length === 0) {
          setIsLoading(false);
          return;
        }

        const friendIds = friendsData.map((f) => f.friend_id);

        // Then get their transactions with user data
        const { data: transactionsData, error } = await supabaseClient()
          .from("transactions")
          .select(
            `
            *,
            user:user_id(id, name, avatar_url)
          `
          )
          .in("user_id", friendIds)
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) {
          console.error("Error fetching transactions:", error);
          return;
        }

        // Transform to the format we need
        const formattedTransactions = transactionsData.map((t) => ({
          transaction: {
            id: t.id,
            user_id: t.user_id,
            amount: t.amount,
            description: t.description,
            category: t.category,
            created_at: t.created_at,
            is_impulsive: t.is_impulsive,
            reflection: t.reflection,
          },
          user: t.user,
        }));

        setTransactions(formattedTransactions);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFriendsTransactions();
  }, []);

  // For demo purposes, create some mock data if no real data is available
  useEffect(() => {
    if (!isLoading && transactions.length === 0) {
      const mockTransactions: FriendTransaction[] = [
        {
          transaction: {
            id: "1",
            user_id: "101",
            amount: 129.99,
            description: "New headphones",
            category: "Electronics",
            created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
            is_impulsive: true,
            reflection:
              "I already have headphones but these looked cool. Probably should have waited for a sale.",
            likes: 1,
            dislikes: 0,
            comments: [
              {
                id: "tc1",
                transaction_id: "1",
                user_id: "current_user",
                content: "Those look really nice though!",
                created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                user: {
                  id: "current_user",
                  name: "You",
                  avatar_url: "",
                },
              },
            ],
            userInteraction: "like",
          },
          user: {
            id: "101",
            name: "Alex Johnson",
            avatar_url: "",
          },
        },
        {
          transaction: {
            id: "2",
            user_id: "102",
            amount: 54.5,
            description: "Dinner at Italian restaurant",
            category: "Dining",
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
            is_impulsive: false,
          },
          user: {
            id: "102",
            name: "Sam Taylor",
            avatar_url: "",
          },
        },
        {
          transaction: {
            id: "3",
            user_id: "103",
            amount: 89.99,
            description: "Limited edition sneakers",
            category: "Clothing",
            created_at: new Date(
              Date.now() - 1000 * 60 * 60 * 24
            ).toISOString(),
            is_impulsive: true,
            reflection:
              "I already have so many shoes. This was just FOMO from seeing them online.",
          },
          user: {
            id: "103",
            name: "Jamie Williams",
            avatar_url: "",
          },
        },
        {
          transaction: {
            id: "4",
            user_id: "104",
            amount: 12.99,
            description: "Monthly subscription",
            category: "Entertainment",
            created_at: new Date(
              Date.now() - 1000 * 60 * 60 * 48
            ).toISOString(),
            is_impulsive: false,
          },
          user: {
            id: "104",
            name: "Riley Chen",
            avatar_url: "",
          },
        },
        {
          transaction: {
            id: "5",
            user_id: "101",
            amount: 199.99,
            description: "Gaming keyboard",
            category: "Electronics",
            created_at: new Date(
              Date.now() - 1000 * 60 * 60 * 72
            ).toISOString(),
            is_impulsive: true,
            reflection:
              "I bought this without researching other options. My old keyboard still works fine.",
          },
          user: {
            id: "101",
            name: "Alex Johnson",
            avatar_url: "",
          },
        },
      ];

      setTransactions(mockTransactions);
    }
  }, [isLoading, transactions]);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.transaction.is_impulsive);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();

    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else if (diffMins > 0) {
      return `${diffMins}m ago`;
    } else {
      return "Just now";
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      Electronics: "bg-blue-100 text-blue-800",
      Clothing: "bg-purple-100 text-purple-800",
      Dining: "bg-orange-100 text-orange-800",
      Entertainment: "bg-pink-100 text-pink-800",
      Groceries: "bg-green-100 text-green-800",
      Travel: "bg-amber-100 text-amber-800",
      Health: "bg-red-100 text-red-800",
    };

    return categoryColors[category] || "bg-gray-100 text-gray-800";
  };

  const handleLike = (transaction_id: string) => {
    setTransactions((prev) =>
      prev.map((item) => {
        if (item.transaction.id === transaction_id) {
          const currentInteraction = item.transaction.userInteraction;

          let likes = item.transaction.likes || 0;
          let dislikes = item.transaction.dislikes || 0;

          // If already liked, remove like
          if (currentInteraction === "like") {
            likes -= 1;
            return {
              ...item,
              transaction: {
                ...item.transaction,
                likes,
                userInteraction: null,
              },
            };
          }
          // If disliked, switch to like
          else if (currentInteraction === "dislike") {
            likes += 1;
            dislikes -= 1;
            return {
              ...item,
              transaction: {
                ...item.transaction,
                likes,
                dislikes,
                userInteraction: "like",
              },
            };
          }
          // If no interaction, add like
          else {
            likes += 1;
            return {
              ...item,
              transaction: {
                ...item.transaction,
                likes,
                userInteraction: "like",
              },
            };
          }
        }
        return item;
      })
    );
  };

  const handleDislike = (transaction_id: string) => {
    setTransactions((prev) =>
      prev.map((item) => {
        if (item.transaction.id === transaction_id) {
          const currentInteraction = item.transaction.userInteraction;

          let likes = item.transaction.likes || 0;
          let dislikes = item.transaction.dislikes || 0;

          // If already disliked, remove dislike
          if (currentInteraction === "dislike") {
            dislikes -= 1;
            return {
              ...item,
              transaction: {
                ...item.transaction,
                dislikes,
                userInteraction: null,
              },
            };
          }
          // If liked, switch to dislike
          else if (currentInteraction === "like") {
            likes -= 1;
            dislikes += 1;
            return {
              ...item,
              transaction: {
                ...item.transaction,
                likes,
                dislikes,
                userInteraction: "dislike",
              },
            };
          }
          // If no interaction, add dislike
          else {
            dislikes += 1;
            return {
              ...item,
              transaction: {
                ...item.transaction,
                dislikes,
                userInteraction: "dislike",
              },
            };
          }
        }
        return item;
      })
    );
  };

  const toggleComments = (transaction_id: string) => {
    setShowComments((prev) => ({
      ...prev,
      [transaction_id]: !prev[transaction_id],
    }));
  };

  const handleCommentChange = (transaction_id: string, text: string) => {
    setCommentText((prev) => ({
      ...prev,
      [transaction_id]: text,
    }));
  };

  const addComment = (transaction_id: string) => {
    const text = commentText[transaction_id];
    if (!text || text.trim() === "") return;

    setTransactions((prev) =>
      prev.map((item) => {
        if (item.transaction.id === transaction_id) {
          const newComment: TransactionComment = {
            id: `tc${Date.now()}`,
            transaction_id,
            user_id: "current_user",
            content: text,
            created_at: new Date().toISOString(),
            user: {
              id: "current_user",
              name: "You",
              avatar_url: "",
            },
          };

          return {
            ...item,
            transaction: {
              ...item.transaction,
              comments: [
                ...(item.transaction.comments || []),
                newComment,
              ],
            },
          };
        }
        return item;
      })
    );

    // Clear the comment text for this transaction
    setCommentText((prev) => ({
      ...prev,
      [transaction_id]: "",
    }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-64" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-48" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Friends' Spending Activity</CardTitle>
            <CardDescription>
              See how your friends are spending and their reflections
            </CardDescription>
          </div>
          <Tabs
            defaultValue="all"
            className="w-auto"
            onValueChange={(value) => setFilter(value as "all" | "impulsive")}
          >
            <TabsList className="grid w-56 grid-cols-2">
              <TabsTrigger value="all">All Purchases</TabsTrigger>
              <TabsTrigger value="impulsive">Impulse Buys</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-2">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No transactions to display</h3>
            <p className="text-muted-foreground mt-1">
              Your friends haven't shared any spending activity yet.
            </p>
          </div>
        ) : (
          filteredTransactions.map(({ transaction, user }) => (
            <div
              key={transaction.id}
              className="border rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{formatTimeAgo(transaction.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold">
                    {formatCurrency(transaction.amount)}
                  </span>
                  <Badge
                    variant="outline"
                    className={`mt-1 ${getCategoryColor(transaction.category)}`}
                  >
                    {transaction.category}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-base">{transaction.description}</p>
                {transaction.is_impulsive && (
                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded-md p-3">
                    <h4 className="text-sm font-medium text-amber-800 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Impulse Purchase Reflection
                    </h4>
                    <p className="text-sm mt-1 text-amber-700">
                      {transaction.reflection || "No reflection provided"}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  <Button
                    variant={
                      transaction.userInteraction === "like"
                        ? "default"
                        : "ghost"
                    }
                    size="sm"
                    className="text-xs"
                    onClick={() => handleLike(transaction.id)}
                  >
                    <ThumbsUp className="h-3.5 w-3.5 mr-1" />{" "}
                    {transaction.userInteraction === "like"
                      ? "Supported"
                      : "Support"}{" "}
                    {transaction.likes ? ` (${transaction.likes})` : ""}
                  </Button>
                  {transaction.is_impulsive && (
                    <Button
                      variant={
                        transaction.userInteraction === "dislike"
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      className="text-xs"
                      onClick={() => handleDislike(transaction.id)}
                    >
                      <ThumbsDown className="h-3.5 w-3.5 mr-1" />{" "}
                      {transaction.userInteraction === "dislike"
                        ? "Not Recommended"
                        : "Don't recommend"}{" "}
                      {transaction.dislikes ? ` (${transaction.dislikes})` : ""}
                    </Button>
                  )}
                  <Button
                    variant={showComments[transaction.id] ? "default" : "ghost"}
                    size="sm"
                    className="text-xs"
                    onClick={() => toggleComments(transaction.id)}
                  >
                    <MessageSquare className="h-3.5 w-3.5 mr-1" />{" "}
                    {transaction.comments?.length
                      ? `Comments (${transaction.comments.length})`
                      : "Comment"}
                  </Button>
                </div>

                {showComments[transaction.id] && (
                  <div className="border-t pt-3">
                    {transaction.comments && transaction.comments.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {transaction.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {comment.user.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-secondary p-2 rounded-md flex-1">
                              <div className="flex justify-between">
                                <span className="text-xs font-medium">
                                  {comment.user.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(comment.created_at)}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a comment..."
                        size="sm"
                        value={commentText[transaction.id] || ""}
                        onChange={(e) => handleCommentChange(transaction.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addComment(transaction.id);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addComment(transaction.id)}
                      >
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline">View More</Button>
      </CardFooter>
    </Card>
  );
}
