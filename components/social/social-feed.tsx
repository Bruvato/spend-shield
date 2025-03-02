"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SocialPost } from "./social-post";
import { SocialPostWithInteractions } from "@/lib/data/models/social";
import { Skeleton } from "@/components/ui/skeleton";

export function SocialFeed() {
  const [posts, setPosts] = useState<SocialPostWithInteractions[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/social/posts");
      const result = await response.json();
      
      if (result.success) {
        setPosts(result.data);
      } else {
        console.error("Error fetching posts:", result.error);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = async () => {
    if (!newPostContent.trim()) return;
    
    try {
      const response = await fetch("/api/social/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newPostContent,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPosts([result.data, ...posts]);
        setNewPostContent("");
      } else {
        console.error("Error creating post:", result.error);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch("/api/social/interactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: postId,
          type: "like",
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        updatePostInteractions(postId, result.data);
      } else {
        console.error("Error liking post:", result.error);
      }
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleDislike = async (postId: string) => {
    try {
      const response = await fetch("/api/social/interactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: postId,
          type: "dislike",
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        updatePostInteractions(postId, result.data);
      } else {
        console.error("Error disliking post:", result.error);
      }
    } catch (error) {
      console.error("Failed to dislike post:", error);
    }
  };

  const handleComment = async (postId: string, content: string) => {
    try {
      const response = await fetch("/api/social/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: postId,
          content,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        const updatedPosts = posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, result.data],
            };
          }
          return post;
        });
        
        setPosts(updatedPosts);
      } else {
        console.error("Error adding comment:", result.error);
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const updatePostInteractions = (postId: string, data: { action: string, type: string }) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        let likes = post.likes;
        let dislikes = post.dislikes;
        let userInteraction = post.userInteraction;
        
        // Handle action based on type and previous state
        if (data.action === "added") {
          if (data.type === "like") {
            likes += 1;
            userInteraction = "like";
          } else {
            dislikes += 1;
            userInteraction = "dislike";
          }
        } else if (data.action === "updated") {
          // Switching from like to dislike or vice versa
          if (data.type === "like") {
            likes += 1;
            dislikes -= 1;
            userInteraction = "like";
          } else {
            likes -= 1;
            dislikes += 1;
            userInteraction = "dislike";
          }
        } else if (data.action === "removed") {
          // Removing an interaction
          if (data.type === "like") {
            likes -= 1;
          } else {
            dislikes -= 1;
          }
          userInteraction = null;
        }
        
        return {
          ...post,
          likes,
          dislikes,
          userInteraction,
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-16" />
          </div>
        </Card>
        
        {[1, 2, 3].map(i => (
          <Card key={i} className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-16 w-full" />
            <div className="pt-4 flex justify-between">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>CU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input 
                placeholder="Share your financial victory..." 
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>
            <Button onClick={handleNewPost}>Post</Button>
          </div>
        </div>
      </div>
      
      {posts.map(post => (
        <SocialPost 
          key={post.id} 
          post={post} 
          onLike={handleLike} 
          onDislike={handleDislike} 
          onComment={handleComment} 
        />
      ))}
      
      <div className="flex justify-center">
        <Button variant="outline" className="w-full">Load More</Button>
      </div>
    </div>
  );
}
