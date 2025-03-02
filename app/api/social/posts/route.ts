import { NextResponse } from 'next/server';
import { handleApiRequest } from '@/lib/data/api/data-handler';
import { SocialPost, SocialPostWithInteractions } from '@/lib/data/models/social';

// Mock data for social posts
const MOCK_POSTS: SocialPostWithInteractions[] = [
  {
    id: "1",
    user_id: "101",
    content: "Just completed my 30-day no impulse spending challenge! Saved $342 that would have gone to random purchases.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    badge: "Milestone",
    user: {
      id: "101",
      name: "Alex Johnson",
      avatar: "AJ"
    },
    likes: 24,
    dislikes: 0,
    comments: [
      {
        id: "c1",
        post_id: "1",
        user_id: "102",
        content: "Amazing! How did you manage to avoid those temptations?",
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        user: {
          id: "102",
          name: "Morgan Smith",
          avatar: "MS"
        }
      },
      {
        id: "c2",
        post_id: "1",
        user_id: "103",
        content: "I need to try this challenge too!",
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        user: {
          id: "103",
          name: "Jamie Taylor",
          avatar: "JT"
        }
      }
    ],
    userInteraction: null
  },
  {
    id: "2",
    user_id: "102",
    content: "Used the impulse timer for my online shopping cart today. Ended up removing 3 items I didn't really need. This app is seriously changing my habits!",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    badge: "Impulse Win",
    user: {
      id: "102",
      name: "Morgan Smith",
      avatar: "MS"
    },
    likes: 18,
    dislikes: 0,
    comments: [
      {
        id: "c3",
        post_id: "2",
        user_id: "101",
        content: "The impulse timer is a game changer!",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
        user: {
          id: "101",
          name: "Alex Johnson",
          avatar: "AJ"
        }
      }
    ],
    userInteraction: null
  },
  {
    id: "3",
    user_id: "103",
    content: "Hit my emergency fund goal today! 🎉 6 months of expenses saved up. Anyone else working on their emergency fund?",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    badge: "Goal Reached",
    user: {
      id: "103",
      name: "Jamie Taylor",
      avatar: "JT"
    },
    likes: 32,
    dislikes: 0,
    comments: [
      {
        id: "c4",
        post_id: "3",
        user_id: "104",
        content: "Congrats! I'm at 4 months so far, hoping to hit 6 by summer.",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(),
        user: {
          id: "104",
          name: "Casey Williams",
          avatar: "CW"
        }
      }
    ],
    userInteraction: null
  }
];

export async function GET() {
  return NextResponse.json(
    handleApiRequest(() => {
      return MOCK_POSTS;
    })
  );
}

export async function POST(request: Request) {
  return NextResponse.json(
    handleApiRequest(async () => {
      const data = await request.json();
      
      // In a real app, we would save this to the database
      const newPost: SocialPostWithInteractions = {
        id: Date.now().toString(),
        user_id: data.user_id || "current_user",
        content: data.content,
        created_at: new Date().toISOString(),
        badge: data.badge,
        user: {
          id: data.user_id || "current_user",
          name: "Current User", // In a real app, we would get this from authentication
          avatar: "CU"
        },
        likes: 0,
        dislikes: 0,
        comments: [],
        userInteraction: null
      };
      
      // For mock purposes, we'll add it to the top of the array
      MOCK_POSTS.unshift(newPost);
      
      return newPost;
    })
  );
}
