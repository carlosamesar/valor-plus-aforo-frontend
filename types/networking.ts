export interface Attendee {
  id: string;
  name: string;
  avatar: string;
  company?: string;
  position?: string;
  bio?: string;
  interests: string[];
  industry?: string;
  location?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  isOnline: boolean;
  isConnected: boolean;
  connectionStatus: 'none' | 'pending' | 'connected';
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'meeting_request' | 'business_card';
  metadata?: any;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface Meeting {
  id: string;
  eventId: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar: string;
  attendeeId: string;
  attendeeName: string;
  attendeeAvatar: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number; // minutes
  location: string;
  status: 'pending' | 'confirmed' | 'declined' | 'completed' | 'cancelled';
  notes?: string;
}

export interface BusinessCard {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  company: string;
  position: string;
  email: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  bio?: string;
  qrCode: string;
}

export interface ConnectionRequest {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  fromUserCompany?: string;
  toUserId: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  timestamp: string;
}

export interface NetworkingStats {
  totalConnections: number;
  meetingsScheduled: number;
  messagesExchanged: number;
  cardsExchanged: number;
}
