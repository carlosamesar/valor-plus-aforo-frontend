import type { Attendee, Conversation, Message, Meeting, BusinessCard, ConnectionRequest, NetworkingStats } from '@/types/networking';

export const mockAttendees: Attendee[] = [
  {
    id: 'att-1',
    name: 'Laura Jiménez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    company: 'TechStartup Inc',
    position: 'CEO & Founder',
    bio: 'Emprendedora tech apasionada por IA y blockchain. Buscando inversores y partners estratégicos.',
    interests: ['IA', 'Blockchain', 'Fintech', 'Startups'],
    industry: 'Tecnología',
    location: 'Bogotá, Colombia',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/laurajimenez',
      twitter: 'https://twitter.com/laurajimenez'
    },
    isOnline: true,
    isConnected: true,
    connectionStatus: 'connected'
  },
  {
    id: 'att-2',
    name: 'Roberto Castillo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    company: 'InvestCorp',
    position: 'Senior Investment Analyst',
    bio: 'Analista de inversión especializado en startups tech. Siempre buscando el próximo unicornio.',
    interests: ['Inversión', 'Startups', 'SaaS', 'Deep Tech'],
    industry: 'Finanzas',
    location: 'Medellín, Colombia',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/robertocastillo'
    },
    isOnline: true,
    isConnected: false,
    connectionStatus: 'pending'
  },
  {
    id: 'att-3',
    name: 'Sofía Ramírez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    company: 'DataLab',
    position: 'Data Scientist',
    bio: 'PhD en Machine Learning. Consultora especializada en implementación de modelos de IA en producción.',
    interests: ['Machine Learning', 'Data Science', 'Python', 'MLOps'],
    industry: 'Tecnología',
    location: 'Cali, Colombia',
    isOnline: false,
    isConnected: false,
    connectionStatus: 'none'
  },
  {
    id: 'att-4',
    name: 'Miguel Torres',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel',
    company: 'CloudSystems',
    position: 'DevOps Engineer',
    bio: 'Experto en arquitectura cloud y CI/CD. Evangelista de Kubernetes y microservicios.',
    interests: ['DevOps', 'Cloud', 'Kubernetes', 'AWS'],
    industry: 'Tecnología',
    location: 'Bogotá, Colombia',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/migueltorres',
      website: 'https://migueltorres.dev'
    },
    isOnline: true,
    isConnected: true,
    connectionStatus: 'connected'
  },
  {
    id: 'att-5',
    name: 'Andrea López',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea',
    company: 'Marketing Pro',
    position: 'Growth Marketing Manager',
    bio: 'Especialista en growth hacking y marketing digital. Ayudo a startups a escalar.',
    interests: ['Marketing', 'Growth', 'SaaS', 'Analytics'],
    industry: 'Marketing',
    location: 'Barranquilla, Colombia',
    isOnline: true,
    isConnected: false,
    connectionStatus: 'none'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'att-1',
    participantName: 'Laura Jiménez',
    participantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    lastMessage: 'Perfecto! Nos vemos mañana a las 2pm',
    lastMessageTime: new Date(Date.now() - 1800000).toISOString(),
    unreadCount: 0,
    isOnline: true
  },
  {
    id: 'conv-2',
    participantId: 'att-4',
    participantName: 'Miguel Torres',
    participantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel',
    lastMessage: 'Claro, te comparto el link del repo',
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
    unreadCount: 2,
    isOnline: true
  },
  {
    id: 'conv-3',
    participantId: 'att-2',
    participantName: 'Roberto Castillo',
    participantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    lastMessage: 'Me interesa mucho tu propuesta',
    lastMessageTime: new Date(Date.now() - 7200000).toISOString(),
    unreadCount: 1,
    isOnline: false
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'att-1',
    receiverId: 'current-user',
    content: 'Hola! Vi tu perfil y me parece muy interesante tu experiencia en IA',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    isRead: true,
    type: 'text'
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'current-user',
    receiverId: 'att-1',
    content: 'Gracias Laura! Me encantaría saber más sobre tu startup',
    timestamp: new Date(Date.now() - 82800000).toISOString(),
    isRead: true,
    type: 'text'
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'att-1',
    receiverId: 'current-user',
    content: '¿Podríamos agendar una reunión para hablarlo con más detalle?',
    timestamp: new Date(Date.now() - 79200000).toISOString(),
    isRead: true,
    type: 'text'
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    senderId: 'current-user',
    receiverId: 'att-1',
    content: 'Perfecto! Nos vemos mañana a las 2pm',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    isRead: true,
    type: 'text'
  }
];

export const mockMeetings: Meeting[] = [
  {
    id: 'meet-1',
    eventId: '1',
    requesterId: 'current-user',
    requesterName: 'Tú',
    requesterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
    attendeeId: 'att-1',
    attendeeName: 'Laura Jiménez',
    attendeeAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    title: 'Reunión sobre oportunidades de inversión',
    description: 'Discutir propuesta de inversión para TechStartup Inc',
    date: new Date(Date.now() + 86400000).toISOString(),
    time: '14:00',
    duration: 30,
    location: 'Sala de reuniones 3A',
    status: 'confirmed',
    notes: 'Llevar pitch deck actualizado'
  },
  {
    id: 'meet-2',
    eventId: '1',
    requesterId: 'att-2',
    requesterName: 'Roberto Castillo',
    requesterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    attendeeId: 'current-user',
    attendeeName: 'Tú',
    attendeeAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
    title: 'Café networking',
    description: 'Conocernos y explorar sinergias',
    date: new Date(Date.now() + 172800000).toISOString(),
    time: '10:30',
    duration: 20,
    location: 'Café del evento - Nivel 2',
    status: 'pending'
  },
  {
    id: 'meet-3',
    eventId: '1',
    requesterId: 'current-user',
    requesterName: 'Tú',
    requesterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
    attendeeId: 'att-4',
    attendeeName: 'Miguel Torres',
    attendeeAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel',
    title: 'Asesoría técnica sobre arquitectura cloud',
    date: new Date(Date.now() - 86400000).toISOString(),
    time: '16:00',
    duration: 45,
    location: 'Sala técnica B',
    status: 'completed'
  }
];

export const mockBusinessCard: BusinessCard = {
  id: 'card-current',
  userId: 'current-user',
  name: 'Juan Pérez',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
  company: 'MyCompany',
  position: 'Software Engineer',
  email: 'juan.perez@mycompany.com',
  phone: '+57 300 123 4567',
  website: 'https://juanperez.dev',
  linkedin: 'https://linkedin.com/in/juanperez',
  twitter: '@juanperez',
  bio: 'Full-stack developer apasionado por crear productos innovadores',
  qrCode: 'BIZCARD-CURRENT-USER-' + Date.now()
};

export const mockConnectionRequests: ConnectionRequest[] = [
  {
    id: 'req-1',
    fromUserId: 'att-2',
    fromUserName: 'Roberto Castillo',
    fromUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    fromUserCompany: 'InvestCorp',
    toUserId: 'current-user',
    message: 'Hola! Me gustaría conectar contigo. Vi tu presentación y me pareció excelente.',
    status: 'pending',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'req-2',
    fromUserId: 'att-5',
    fromUserName: 'Andrea López',
    fromUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea',
    fromUserCompany: 'Marketing Pro',
    toUserId: 'current-user',
    message: 'Trabajemos juntos!',
    status: 'pending',
    timestamp: new Date(Date.now() - 7200000).toISOString()
  }
];

export const mockNetworkingStats: NetworkingStats = {
  totalConnections: 12,
  meetingsScheduled: 5,
  messagesExchanged: 47,
  cardsExchanged: 8
};
