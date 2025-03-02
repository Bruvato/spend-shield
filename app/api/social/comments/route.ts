import { NextResponse } from 'next/server';
import { handleApiRequest } from '@/lib/data/api/data-handler';
import { SocialPostComment } from '@/lib/data/models/social';

// In a real app, this would be in a database
const MOCK_COMMENTS: Record<string, SocialPostComment[]> = {
  "1": [
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
  "2": [
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
  "3": [
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
  ]
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const post_id = searchParams.get('post_id');
  
  return NextResponse.json(
    handleApiRequest(() => {
      if (post_id) {
        // Get comments for a specific post
        return MOCK_COMMENTS[post_id] || [];
      } else {
        // Get all comments (flattened)
        return Object.values(MOCK_COMMENTS).flat();
      }
    })
  );
}

export async function POST(request: Request) {
  return NextResponse.json(
    handleApiRequest(async () => {
      const data = await request.json();
      
      if (!data.post_id || !data.content) {
        throw new Error('Invalid comment data');
      }
      
      // In a real app, we would get this from authentication
      const user_id = data.user_id || 'current_user';
      
      const newComment: SocialPostComment = {
        id: `c${Date.now()}`,
        post_id: data.post_id,
        user_id,
        content: data.content,
        created_at: new Date().toISOString(),
        user: {
          id: user_id,
          name: "Current User", // In a real app, we would get this from authentication
          avatar: "CU"
        }
      };
      
      // Initialize the post's comments array if it doesn't exist
      if (!MOCK_COMMENTS[data.post_id]) {
        MOCK_COMMENTS[data.post_id] = [];
      }
      
      // Add the new comment
      MOCK_COMMENTS[data.post_id].push(newComment);
      
      return newComment;
    })
  );
}
