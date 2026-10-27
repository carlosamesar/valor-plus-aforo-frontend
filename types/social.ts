export type PostType = 'text' | 'photo' | 'link';

export interface Post {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole?: 'attendee' | 'speaker' | 'organizer' | 'sponsor';
  type: PostType;
  content: string;
  imageUrl?: string;
  linkUrl?: string;
  linkTitle?: string;
  hashtags: string[];
  mentions: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  timestamp: string;
  isPinned: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
}

export interface SocialStats {
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  activeUsers: number;
  trendingHashtags: HashtagStats[];
}

export interface HashtagStats {
  tag: string;
  count: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  role: 'attendee' | 'speaker' | 'organizer' | 'sponsor';
  company?: string;
  bio?: string;
  interests: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  isFollowing: boolean;
  followers: number;
  following: number;
}
