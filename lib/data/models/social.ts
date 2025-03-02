export interface SocialPost {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  badge?: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface SocialPostInteraction {
  id: string;
  post_id: string;
  user_id: string;
  type: 'like' | 'dislike';
  created_at: string;
}

export interface SocialPostComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface SocialPostWithInteractions extends SocialPost {
  likes: number;
  dislikes: number;
  comments: SocialPostComment[];
  userInteraction?: 'like' | 'dislike' | null;
}
