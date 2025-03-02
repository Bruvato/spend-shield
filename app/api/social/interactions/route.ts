import { NextResponse } from 'next/server';
import { handleApiRequest } from '@/lib/data/api/data-handler';
import { SocialPostInteraction } from '@/lib/data/models/social';

// In a real app, this would be in a database
const MOCK_INTERACTIONS: SocialPostInteraction[] = [];

export async function POST(request: Request) {
  return NextResponse.json(
    handleApiRequest(async () => {
      const data = await request.json();
      
      if (!data.post_id || !data.type || !['like', 'dislike'].includes(data.type)) {
        throw new Error('Invalid interaction data');
      }
      
      // In a real app, we would get the user_id from authentication
      const user_id = data.user_id || 'current_user';
      
      // Check if user already interacted with this post
      const existingInteraction = MOCK_INTERACTIONS.find(
        i => i.post_id === data.post_id && i.user_id === user_id
      );
      
      if (existingInteraction) {
        // If same type, remove the interaction (toggle off)
        if (existingInteraction.type === data.type) {
          const index = MOCK_INTERACTIONS.indexOf(existingInteraction);
          MOCK_INTERACTIONS.splice(index, 1);
          return { action: 'removed', type: data.type };
        } 
        // If different type, update the interaction (change from like to dislike or vice versa)
        else {
          existingInteraction.type = data.type;
          return { action: 'updated', type: data.type };
        }
      } else {
        // Add new interaction
        const newInteraction: SocialPostInteraction = {
          id: Date.now().toString(),
          post_id: data.post_id,
          user_id,
          type: data.type,
          created_at: new Date().toISOString()
        };
        
        MOCK_INTERACTIONS.push(newInteraction);
        return { action: 'added', type: data.type };
      }
    })
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const post_id = searchParams.get('post_id');
  const user_id = searchParams.get('user_id') || 'current_user';
  
  return NextResponse.json(
    handleApiRequest(() => {
      if (post_id) {
        // Get interactions for a specific post
        const interactions = MOCK_INTERACTIONS.filter(i => i.post_id === post_id);
        const likes = interactions.filter(i => i.type === 'like').length;
        const dislikes = interactions.filter(i => i.type === 'dislike').length;
        
        // Get user's interaction if any
        const userInteraction = MOCK_INTERACTIONS.find(
          i => i.post_id === post_id && i.user_id === user_id
        );
        
        return {
          likes,
          dislikes,
          userInteraction: userInteraction ? userInteraction.type : null
        };
      } else {
        // Get all interactions
        return MOCK_INTERACTIONS;
      }
    })
  );
}
