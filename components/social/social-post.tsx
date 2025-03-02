"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThumbsUp, ThumbsDown, MessageSquare, Send } from "lucide-react";
import { SocialPostWithInteractions, SocialPostComment } from "@/lib/data/models/social";

interface SocialPostProps {
  post: SocialPostWithInteractions;
  onLike: (postId: string) => void;
  onDislike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

export function SocialPost({ post, onLike, onDislike, onComment }: SocialPostProps) {
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    onLike(post.id);
  };

  const handleDislike = () => {
    onDislike(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment("");
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={`/avatars/${post.user.avatar}.png`} alt={post.user.name} />
            <AvatarFallback>{post.user.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{post.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(post.created_at).toLocaleString()}
                </div>
              </div>
              {post.badge && <Badge>{post.badge}</Badge>}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <div className="border-t w-full pt-4 flex justify-between">
          <Button 
            variant={post.userInteraction === "like" ? "default" : "ghost"} 
            size="sm" 
            className="gap-1"
            onClick={handleLike}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button 
            variant={post.userInteraction === "dislike" ? "default" : "ghost"} 
            size="sm" 
            className="gap-1"
            onClick={handleDislike}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{post.dislikes}</span>
          </Button>
          <Button 
            variant={showComments ? "default" : "ghost"} 
            size="sm" 
            className="gap-1" 
            onClick={toggleComments}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments.length}</span>
          </Button>
        </div>

        {showComments && (
          <div className="w-full">
            <div className="space-y-3 mt-1 mb-3">
              {post.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
            
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1"
              />
              <Button type="submit" size="sm" variant="ghost">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

interface CommentItemProps {
  comment: SocialPostComment;
}

function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex gap-2">
      <Avatar className="h-6 w-6">
        <AvatarFallback className="text-xs">{comment.user.avatar}</AvatarFallback>
      </Avatar>
      <div className="bg-secondary p-2 rounded-md flex-1">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium">{comment.user.name}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(comment.created_at).toLocaleString()}
          </span>
        </div>
        <p className="text-sm mt-1">{comment.content}</p>
      </div>
    </div>
  );
}
