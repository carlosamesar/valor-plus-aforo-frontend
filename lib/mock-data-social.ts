import type { Post, Comment, SocialStats, UserProfile } from '@/types/social';

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    eventId: '1',
    userId: 'user-1',
    userName: 'María González',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    userRole: 'speaker',
    type: 'photo',
    content: '¡Increíble sesión sobre IA! Gracias a todos los que asistieron. #TechConf2024 #ArtificialIntelligence',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    hashtags: ['TechConf2024', 'ArtificialIntelligence'],
    mentions: [],
    likes: 47,
    comments: 12,
    shares: 5,
    isLiked: true,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isPinned: true
  },
  {
    id: 'post-2',
    eventId: '1',
    userId: 'user-2',
    userName: 'Carlos Ruiz',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    userRole: 'attendee',
    type: 'text',
    content: 'Networking increíble en esta conferencia. Ya hice 3 contactos súper valiosos para mi startup. Si alguien está interesado en @blockchain y @fintech, ¡conectemos! #networking',
    hashtags: ['networking'],
    mentions: ['blockchain', 'fintech'],
    likes: 23,
    comments: 8,
    shares: 2,
    isLiked: false,
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    isPinned: false
  },
  {
    id: 'post-3',
    eventId: '1',
    userId: 'user-3',
    userName: 'Ana Martínez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    userRole: 'organizer',
    type: 'link',
    content: '📢 ¡Recordatorio! El panel de Q&A con nuestros speakers comienza en 15 minutos en el Salón Principal. #TechConf2024',
    linkUrl: 'https://example.com/schedule',
    linkTitle: 'Ver agenda completa',
    hashtags: ['TechConf2024'],
    mentions: [],
    likes: 89,
    comments: 15,
    shares: 24,
    isLiked: true,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    isPinned: false
  },
  {
    id: 'post-4',
    eventId: '1',
    userId: 'user-4',
    userName: 'TechCorp',
    userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
    userRole: 'sponsor',
    type: 'photo',
    content: '¡Ven a nuestro stand y participa para ganar un iPhone 15 Pro! 🎁 #TechConf2024 #Giveaway #TechCorp',
    imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800',
    hashtags: ['TechConf2024', 'Giveaway', 'TechCorp'],
    mentions: [],
    likes: 156,
    comments: 42,
    shares: 67,
    isLiked: false,
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    isPinned: false
  },
  {
    id: 'post-5',
    eventId: '1',
    userId: 'user-5',
    userName: 'Luis Fernández',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis',
    userRole: 'attendee',
    type: 'text',
    content: 'Primera vez en #TechConf2024 y estoy impresionado. La calidad de los speakers y la organización es de primer nivel. 👏',
    hashtags: ['TechConf2024'],
    mentions: [],
    likes: 31,
    comments: 6,
    shares: 1,
    isLiked: true,
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    isPinned: false
  }
];

export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    userId: 'user-6',
    userName: 'Pedro Sánchez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    content: '¡Excelente presentación María! Me encantó el caso de uso con ML.',
    likes: 5,
    isLiked: false,
    timestamp: new Date(Date.now() - 3000000).toISOString()
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    userId: 'user-7',
    userName: 'Laura Torres',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    content: '¿Habrá replay de la sesión? No pude asistir 😢',
    likes: 2,
    isLiked: false,
    timestamp: new Date(Date.now() - 2800000).toISOString()
  }
];

export const mockSocialStats: SocialStats = {
  totalPosts: 347,
  totalLikes: 2156,
  totalComments: 892,
  activeUsers: 1284,
  trendingHashtags: [
    { tag: 'TechConf2024', count: 245 },
    { tag: 'AI', count: 123 },
    { tag: 'Networking', count: 89 },
    { tag: 'Innovation', count: 67 },
    { tag: 'Giveaway', count: 54 }
  ]
};

export const mockUserProfiles: UserProfile[] = [
  {
    id: 'user-1',
    name: 'María González',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    role: 'speaker',
    company: 'AI Labs',
    bio: 'AI Researcher | PhD in Machine Learning | Speaker',
    interests: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    socialLinks: {
      twitter: 'https://twitter.com/mariagonzalez',
      linkedin: 'https://linkedin.com/in/mariagonzalez'
    },
    isFollowing: true,
    followers: 2340,
    following: 456
  },
  {
    id: 'user-2',
    name: 'Carlos Ruiz',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    role: 'attendee',
    company: 'Startup Labs',
    bio: 'Founder @ Startup Labs | Blockchain enthusiast',
    interests: ['Blockchain', 'Fintech', 'Startups'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/carlosruiz',
      website: 'https://startuplabs.com'
    },
    isFollowing: false,
    followers: 567,
    following: 234
  }
];
